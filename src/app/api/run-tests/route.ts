import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// Prevent concurrent test runs (works in single-server / dev environments)
let isRunning = false;

// Strip ANSI escape codes so raw terminal output renders cleanly in the browser
const ANSI_RE = /\x1B\[[0-9;]*[mGKHFJhlns]|\x1B[()][AB01]/g;
const stripAnsi = (s: string) => s.replace(ANSI_RE, '');

type Suite = 'wdio' | 'playwright' | 'cypress';

function getSuiteCommand(suite: Suite): { cmd: string; args: string[] } | null {
  switch (suite) {
    case 'playwright':
      return { cmd: 'npx', args: ['playwright', 'test', '--reporter=list'] };
    case 'wdio':
      return { cmd: 'npm', args: ['test'] };
    case 'cypress':
      return { cmd: 'npx', args: ['cypress', 'run', '--headless'] };
    default:
      return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const suite = searchParams.get('suite') as Suite | null;

  if (!suite || !['wdio', 'playwright', 'cypress'].includes(suite)) {
    return Response.json({ error: 'Invalid suite. Use wdio, playwright, or cypress.' }, { status: 400 });
  }

  if (isRunning) {
    return Response.json({ error: 'A test run is already in progress. Please wait.' }, { status: 429 });
  }

  const suiteDir = path.join(process.cwd(), 'tests', suite);

  // Check the suite directory and node_modules exist
  if (!fs.existsSync(suiteDir)) {
    return Response.json({ error: `Test suite directory not found: tests/${suite}` }, { status: 503 });
  }

  const nodeBin = path.join(suiteDir, 'node_modules', '.bin');
  const hasNodeModules = fs.existsSync(nodeBin);
  if (!hasNodeModules) {
    return Response.json(
      { error: `Dependencies not installed. Run 'npm install' in tests/${suite} first.` },
      { status: 503 }
    );
  }

  const suiteCmd = getSuiteCommand(suite);
  if (!suiteCmd) {
    return Response.json({ error: 'Invalid suite' }, { status: 400 });
  }

  isRunning = true;

  const encoder = new TextEncoder();

  const send = (
    controller: ReadableStreamDefaultController,
    payload: Record<string, unknown>
  ) => {
    try {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
    } catch {
      // controller may already be closed
    }
  };

  const stream = new ReadableStream({
    start(controller) {
      const proc = spawn(suiteCmd.cmd, suiteCmd.args, {
        cwd: suiteDir,
        env: {
          ...process.env,
          // Force plain output — no colours that survive ANSI stripping as garbage
          FORCE_COLOR: '0',
          NO_COLOR: '1',
          CI: 'true',
        },
        shell: false,
      });

      const handleData = (chunk: Buffer, isError = false) => {
        const text = stripAnsi(chunk.toString());
        // Split into individual lines so the client can colour them independently
        for (const line of text.split('\n')) {
          send(controller, { line, isError });
        }
      };

      proc.stdout.on('data', (chunk: Buffer) => handleData(chunk));
      proc.stderr.on('data', (chunk: Buffer) => handleData(chunk, true));

      proc.on('close', (code) => {
        isRunning = false;
        send(controller, { done: true, exitCode: code ?? 1 });
        controller.close();
      });

      proc.on('error', (err) => {
        isRunning = false;
        send(controller, { line: `[Error starting test runner: ${err.message}]`, isError: true });
        send(controller, { done: true, exitCode: 1 });
        controller.close();
      });

      // Kill the child if the client disconnects
      request.signal.addEventListener('abort', () => {
        isRunning = false;
        proc.kill('SIGTERM');
        controller.close();
      });

      // Safety timeout — kill after 3 minutes
      const timeout = setTimeout(() => {
        if (!proc.killed) {
          isRunning = false;
          send(controller, { line: '[Timeout: test run exceeded 3 minutes]', isError: true });
          send(controller, { done: true, exitCode: 1 });
          proc.kill('SIGTERM');
          controller.close();
        }
      }, 180_000);

      proc.on('close', () => clearTimeout(timeout));
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // disable nginx buffering if behind a proxy
    },
  });
}

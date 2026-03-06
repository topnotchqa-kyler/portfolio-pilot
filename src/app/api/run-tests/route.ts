import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// Allow up to 5 minutes for test runs on Vercel (requires Pro plan or higher)
export const maxDuration = 300;

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

// On Vercel, extract @sparticuz/chromium to /tmp and return the executable path.
// The path is then forwarded to the playwright test process via CHROMIUM_PATH so
// playwright.config.ts can use it as the browser executable.
//
// How executablePath(dir) works:
//   1. Looks for  {dir}/chromium.br  (the Brotli-compressed binary source)
//   2. Extracts it to  {dir}/chromium  (the runnable executable)
//   3. Returns  {dir}/chromium
//
// The .br file ships inside the npm package at bin/chromium.br, but /var/task
// (where node_modules lives on Vercel) is read-only — extraction must happen
// in /tmp.  We therefore copy the .br file into /tmp first, then extract.
//
// NOTE: @sparticuz/chromium must be listed in next.config.ts serverExternalPackages
// so Next.js does NOT bundle it.  When bundled, __dirname inside the package
// points to the bundle directory, not node_modules, breaking binary resolution.
async function resolveChromiumPath(): Promise<{ path?: string; error?: string }> {
  if (!process.env.VERCEL) return {};
  try {
    const { default: chromium } = await import('@sparticuz/chromium');

    // Copy chromium.br from the (read-only) package directory to writable /tmp
    // so executablePath can extract it there.  Skip if already present from a
    // prior warm-Lambda invocation.
    const tmpBr = '/tmp/chromium.br';
    if (!fs.existsSync(tmpBr)) {
      const pkgBr = path.join(
        process.cwd(),
        'node_modules', '@sparticuz', 'chromium', 'bin', 'chromium.br'
      );
      fs.copyFileSync(pkgBr, tmpBr);
    }

    // executablePath('/tmp') finds /tmp/chromium.br, extracts to /tmp/chromium,
    // and returns /tmp/chromium as the executable path.
    const execPath = await chromium.executablePath('/tmp');
    return { path: execPath || undefined };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
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

  // Build the spawn environment. For Playwright on Vercel, extract Chromium first
  // so the test process can find the browser via CHROMIUM_PATH.
  const spawnEnv: NodeJS.ProcessEnv = {
    ...process.env,
    // Force plain output — no colours that survive ANSI stripping as garbage
    FORCE_COLOR: '0',
    NO_COLOR: '1',
    CI: 'true',
  };

  // For Playwright on Vercel, resolve the @sparticuz/chromium binary path before
  // spawning so we can forward it via CHROMIUM_PATH and report any resolution
  // errors directly in the SSE stream.
  let chromiumDiagnostic: { line: string; isError: boolean } | undefined;
  if (suite === 'playwright') {
    const { path: chromiumPath, error: chromiumError } = await resolveChromiumPath();
    if (chromiumPath) {
      spawnEnv.CHROMIUM_PATH = chromiumPath;
      chromiumDiagnostic = { line: `[Chromium] Resolved @sparticuz/chromium → ${chromiumPath}`, isError: false };
    } else if (process.env.VERCEL) {
      const msg = chromiumError
        ? `[Chromium] @sparticuz/chromium resolution failed: ${chromiumError}`
        : '[Chromium] @sparticuz/chromium returned an empty path — tests will fail.';
      chromiumDiagnostic = { line: msg, isError: true };
    }
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
      // Emit chromium resolution status as the first SSE message so it's
      // always visible at the top of the test output on Vercel.
      if (chromiumDiagnostic) {
        send(controller, chromiumDiagnostic);
      }

      const proc = spawn(suiteCmd.cmd, suiteCmd.args, {
        cwd: suiteDir,
        env: spawnEnv,
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

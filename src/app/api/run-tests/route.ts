import { testResults } from '@/lib/test-results';

// Replay completes well within 60 s even for the longest suite
export const maxDuration = 60;

type Suite = 'wdio' | 'playwright' | 'cypress';

/**
 * Return a per-line delay (ms) that makes the replay feel like a live test run:
 *  - Individual ✓ pass lines   → ~150 ms  (simulate each test taking a moment)
 *  - WdIO PASSED/RUNNING lines → ~200 ms  (concurrency updates feel deliberate)
 *  - Cypress "Running: …" lines→ ~120 ms  (spec-file transition)
 *  - Summary "N passed" lines  →  ~80 ms
 *  - Blank lines               →  ~20 ms  (keep things moving)
 *  - Everything else           →  ~40 ms  (headers, separators, chrome prefixes)
 */
function getLineDelay(line: string): number {
  const l = line.toLowerCase();

  // Playwright "  ✓   1 [chromium] › …" and Cypress "    ✓ test name (Xms)"
  if (/^\s+✓/.test(line)) return 150;

  // WdIO "[0-0] RUNNING in chrome …" / "[0-0] PASSED  in chrome …"
  if (/\[0-\d\] (passed|running)/i.test(line)) return 200;

  // Cypress "  Running: auth.cy.ts (1 of 6)"
  if (/^\s+running:/i.test(l) && !l.includes('running in chrome')) return 120;

  // Summary lines: "35 passed", "6 passing", "All specs passed!", "Spec Files: …"
  if (/\d+ (passed|passing)/.test(l) || l.includes('all specs passed') || l.includes('spec files:')) {
    return 80;
  }

  // Blank lines
  if (line.trim() === '') return 20;

  // Default: headers, separator bars, chrome-output prefixes, etc.
  return 40;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const suite = searchParams.get('suite') as Suite | null;

  if (!suite || !['wdio', 'playwright', 'cypress'].includes(suite)) {
    return Response.json(
      { error: 'Invalid suite. Use wdio, playwright, or cypress.' },
      { status: 400 }
    );
  }

  const result = testResults[suite];
  if (!result) {
    return Response.json(
      { error: `No recorded result for suite: ${suite}` },
      { status: 404 }
    );
  }

  const lines = result.output.split('\n');
  const encoder = new TextEncoder();

  const send = (
    controller: ReadableStreamDefaultController,
    payload: Record<string, unknown>
  ) => {
    try {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
    } catch {
      // controller may already be closed (client disconnected)
    }
  };

  const stream = new ReadableStream({
    start(controller) {
      let idx = 0;

      function sendNextLine() {
        // Stop immediately if the client disconnected
        if (request.signal.aborted) {
          try { controller.close(); } catch { /* already closed */ }
          return;
        }

        if (idx >= lines.length) {
          // All lines sent — signal completion with exit code 0
          send(controller, { done: true, exitCode: 0 });
          try { controller.close(); } catch { /* already closed */ }
          return;
        }

        const line = lines[idx++];
        send(controller, { line, isError: false });
        setTimeout(sendNextLine, getLineDelay(line));
      }

      // Also close the stream if the request is aborted while we're mid-replay
      request.signal.addEventListener('abort', () => {
        try { controller.close(); } catch { /* already closed */ }
      });

      sendNextLine();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // disable nginx buffering if behind a reverse proxy
    },
  });
}

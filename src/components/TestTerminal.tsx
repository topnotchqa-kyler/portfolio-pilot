'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2, Copy, Check, RotateCcw } from 'lucide-react';
import type { SuiteResult } from '@/lib/test-results';

type RunStatus = 'idle' | 'running' | 'passed' | 'failed';

interface TestTerminalProps {
  suite: 'wdio' | 'playwright' | 'cypress';
  initialResult: SuiteResult;
}

function getLineClass(line: string): string {
  const l = line.toLowerCase();
  if (
    l.includes(' passing') ||
    l.includes('passed') ||
    l.includes('all specs passed') ||
    l.trim().startsWith('✓')
  ) {
    return 'text-green-400';
  }
  if (
    l.includes(' failing') ||
    l.includes('failed') ||
    l.trim().startsWith('✗') ||
    l.trim().startsWith('×') ||
    l.includes('[error') ||
    l.startsWith('[error')
  ) {
    return 'text-red-400';
  }
  if (
    l.startsWith('[0-') ||
    l.startsWith('[chrome') ||
    l.includes('running') ||
    l.includes('spec ran') ||
    l.includes('running:') ||
    l.startsWith('  running:')
  ) {
    return 'text-sky-300';
  }
  if (l.startsWith('$ ') || l.startsWith('> ')) {
    return 'text-yellow-300';
  }
  if (l.startsWith('--') || l.startsWith('==') || l.startsWith('┌') || l.startsWith('│') || l.startsWith('└')) {
    return 'text-zinc-600';
  }
  return 'text-zinc-300';
}

const STATUS_CONFIG: Record<RunStatus, { label: string; dotClass: string; textClass: string }> = {
  idle:    { label: 'Ready',      dotClass: 'bg-zinc-500',                        textClass: 'text-zinc-400' },
  running: { label: 'Running…',   dotClass: 'bg-yellow-400 animate-pulse',        textClass: 'text-yellow-300' },
  passed:  { label: 'All Passed', dotClass: 'bg-green-400',                       textClass: 'text-green-400' },
  failed:  { label: 'Failed',     dotClass: 'bg-red-400',                         textClass: 'text-red-400' },
};

export function TestTerminal({ suite, initialResult }: TestTerminalProps) {
  const [status, setStatus]       = useState<RunStatus>(initialResult.status as RunStatus);
  const [lines, setLines]         = useState<string[]>(initialResult.output.split('\n'));
  const [durationMs, setDurationMs] = useState(initialResult.durationMs);
  const [lastRunTs, setLastRunTs] = useState(new Date(initialResult.timestamp));
  const [copied, setCopied]       = useState(false);
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);

  // Auto-scroll to bottom while running
  useEffect(() => {
    if (status === 'running' && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, status]);

  // Cleanup stream reader on unmount
  useEffect(() => {
    return () => {
      readerRef.current?.cancel().catch(() => {});
    };
  }, []);

  const handleRun = useCallback(async () => {
    if (status === 'running') return;

    setStatus('running');
    setErrorMsg(null);
    setLines(['$ npm test', '']);
    const startTime = Date.now();

    try {
      const response = await fetch(`/api/run-tests?suite=${suite}`);

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${response.status}`);
      }

      const reader = response.body!.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE events are separated by double newlines
        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';

        for (const part of parts) {
          // Match SSE "data: ..." line — use [^] instead of the ES2018 `s` flag
          const match = part.match(/^data: ([^]+)$/m);
          if (!match) continue;
          try {
            const data = JSON.parse(match[1]);
            if (data.done) {
              const elapsed = Date.now() - startTime;
              setDurationMs(elapsed);
              setLastRunTs(new Date());
              setStatus(data.exitCode === 0 ? 'passed' : 'failed');
            } else if (typeof data.line === 'string') {
              setLines(prev => [...prev, data.line]);
            }
          } catch {
            // ignore malformed event
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setErrorMsg(msg);
      setStatus(initialResult.status as RunStatus);
      setLines(initialResult.output.split('\n'));
      setDurationMs(initialResult.durationMs);
    }
  }, [suite, status, initialResult]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [lines]);

  const handleReset = useCallback(() => {
    readerRef.current?.cancel().catch(() => {});
    setStatus(initialResult.status as RunStatus);
    setLines(initialResult.output.split('\n'));
    setDurationMs(initialResult.durationMs);
    setLastRunTs(new Date(initialResult.timestamp));
    setErrorMsg(null);
  }, [initialResult]);

  const { label, dotClass, textClass } = STATUS_CONFIG[status];

  const durationLabel =
    durationMs < 1000
      ? `${durationMs}ms`
      : `${(durationMs / 1000).toFixed(1)}s`;

  return (
    <div className="rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950 font-mono text-sm shadow-2xl">
      {/* Terminal chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-700 gap-3">
        {/* Traffic lights (decorative) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
          <span className={`font-semibold text-xs shrink-0 ${textClass}`}>{label}</span>
          {status !== 'running' && (
            <span className="text-zinc-500 text-xs truncate">
              {durationLabel} · {lastRunTs.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            title="Restore pre-recorded output"
            aria-label="Restore pre-recorded output"
            className="h-7 w-7 p-0 text-zinc-500 hover:text-zinc-200"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            title="Copy output"
            aria-label={copied ? 'Output copied' : 'Copy output'}
            className="h-7 w-7 p-0 text-zinc-500 hover:text-zinc-200"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
          </Button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={status === 'running'}
            className="h-7 px-3 gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold ml-1"
          >
            {status === 'running' ? (
              <><Loader2 className="w-3 h-3 animate-spin" /> Running…</>
            ) : (
              <><Play className="w-3 h-3" /> Run Tests</>
            )}
          </Button>
        </div>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="px-4 py-2 bg-amber-950/60 border-b border-amber-800/50 text-amber-300 text-xs">
          ⚠ {errorMsg} — showing last recorded run.
        </div>
      )}

      {/* Output area */}
      <div
        ref={scrollRef}
        className="h-[26rem] overflow-y-auto p-4 leading-relaxed"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap min-h-[1.25rem] ${getLineClass(line)}`}
          >
            {line || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  );
}

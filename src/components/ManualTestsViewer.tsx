'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { manualTestCases, MANUAL_CATEGORIES } from '@/lib/manual-tests';
import type { ManualCategory } from '@/lib/manual-tests';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

const CATEGORY_BADGE_COLORS: Record<ManualCategory, string> = {
  'Navigation':    'bg-sky-500/15    text-sky-400    border-sky-500/30',
  'Store & Cart':  'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Checkout':      'bg-violet-500/15  text-violet-400  border-violet-500/30',
  'Authentication':'bg-amber-500/15   text-amber-400   border-amber-500/30',
  'Contact Form':  'bg-pink-500/15    text-pink-400    border-pink-500/30',
  'Blog':          'bg-orange-500/15  text-orange-400  border-orange-500/30',
};

const ID_COLORS: Record<string, string> = {
  NAV:   'bg-sky-500/20    text-sky-300    border-sky-500/40',
  STORE: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  CHK:   'bg-violet-500/20  text-violet-300  border-violet-500/40',
  AUTH:  'bg-amber-500/20   text-amber-300   border-amber-500/40',
  CONT:  'bg-pink-500/20    text-pink-300    border-pink-500/40',
  BLOG:  'bg-orange-500/20  text-orange-300  border-orange-500/40',
};

function getIdColor(id: string): string {
  const prefix = id.split('-')[0];
  return ID_COLORS[prefix] ?? 'bg-zinc-500/20 text-zinc-300 border-zinc-500/40';
}

interface ManualTestsViewerProps {
  defaultCategory?: ManualCategory;
}

export function ManualTestsViewer({ defaultCategory = 'Navigation' }: ManualTestsViewerProps) {
  const totalCases = manualTestCases.length;
  const totalSteps = manualTestCases.reduce((sum, tc) => sum + tc.steps.length, 0);

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
          <span className="font-semibold text-foreground">{totalCases}</span>
          <span className="text-muted-foreground">test cases</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
          <span className="font-semibold text-foreground">{totalSteps}</span>
          <span className="text-muted-foreground">total steps</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
          <span className="font-semibold text-foreground">{MANUAL_CATEGORIES.length}</span>
          <span className="text-muted-foreground">functional areas</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>💡</span>
          <span>Use browser print (Ctrl+P) to export a clean copy</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={slugify(defaultCategory)}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
          {MANUAL_CATEGORIES.map((cat) => {
            const count = manualTestCases.filter((tc) => tc.category === cat).length;
            return (
              <TabsTrigger
                key={cat}
                value={slugify(cat)}
                className="text-xs px-3 py-1.5 data-[state=active]:bg-background"
              >
                {cat}
                <span className="ml-1.5 text-[10px] opacity-60">{count}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {MANUAL_CATEGORIES.map((cat) => {
          const cases = manualTestCases.filter((tc) => tc.category === cat);
          const badgeClass = CATEGORY_BADGE_COLORS[cat];

          return (
            <TabsContent key={cat} value={slugify(cat)} className="mt-6 space-y-8">
              {cases.map((tc) => (
                <div key={tc.id} className="space-y-2">
                  {/* Case header */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs font-semibold ${getIdColor(tc.id)}`}
                    >
                      {tc.id}
                    </span>
                    <span className="font-semibold text-sm">{tc.subCategory}</span>
                    <span
                      className={`ml-auto inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium ${badgeClass}`}
                    >
                      {cat}
                    </span>
                  </div>

                  {/* Steps table */}
                  <div className="rounded-md border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="w-8 px-3 py-2 text-left text-xs font-medium text-muted-foreground">#</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground w-[50%]">Action / Step</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Expected Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tc.steps.map((step, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                          >
                            <td className="px-3 py-2.5 text-xs text-muted-foreground font-mono align-top">
                              {idx + 1}
                            </td>
                            <td className="px-3 py-2.5 text-sm align-top">
                              {step.action}
                            </td>
                            <td className="px-3 py-2.5 text-sm text-muted-foreground align-top">
                              {step.expected}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

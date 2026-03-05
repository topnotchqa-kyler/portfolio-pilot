import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { projectsData } from '@/lib/data';
import { testResults } from '@/lib/test-results';
import { TestTerminal } from '@/components/TestTerminal';
import { ManualTestsViewer } from '@/components/ManualTestsViewer';
import { manualTestCases, MANUAL_CATEGORIES } from '@/lib/manual-tests';

// ---------------------------------------------------------------------------
// Per-suite metadata shown on the detail page
// ---------------------------------------------------------------------------

type CoverageRow = { area: string; count: number; unit: string };

type SuiteMeta = {
  headline: string;
  pattern: string;
  framework: string;
  language: string;
  browser: string;
  runCommand: string;
  coverage: CoverageRow[];
};

const SUITE_META: Record<string, SuiteMeta> = {
  wdio: {
    headline: 'Behavior-Driven E2E Test Suite',
    pattern: 'BDD — Gherkin feature files + Cucumber step definitions',
    framework: 'WebdriverIO v8',
    language: 'TypeScript',
    browser: 'Chrome via ChromeDriver',
    runCommand: 'npm test',
    coverage: [
      { area: 'Navigation',     count: 7,  unit: 'scenarios' },
      { area: 'Store & Cart',   count: 4,  unit: 'scenarios' },
      { area: 'Checkout',       count: 4,  unit: 'scenarios' },
      { area: 'Authentication', count: 4,  unit: 'scenarios' },
      { area: 'Contact Form',   count: 4,  unit: 'scenarios' },
      { area: 'Blog',           count: 4,  unit: 'scenarios' },
    ],
  },
  playwright: {
    headline: 'Page Object Model E2E Test Suite',
    pattern: 'POM — Page Object Model with spec files',
    framework: 'Playwright v1',
    language: 'TypeScript',
    browser: 'Chromium (bundled)',
    runCommand: 'npx playwright test',
    coverage: [
      { area: 'Navigation',     count: 9,  unit: 'tests' },
      { area: 'Store & Cart',   count: 5,  unit: 'tests' },
      { area: 'Checkout',       count: 5,  unit: 'tests' },
      { area: 'Authentication', count: 5,  unit: 'tests' },
      { area: 'Contact Form',   count: 6,  unit: 'tests' },
      { area: 'Blog',           count: 5,  unit: 'tests' },
    ],
  },
  cypress: {
    headline: 'Page Object Model E2E Test Suite',
    pattern: 'POM — Page Object Model with custom commands',
    framework: 'Cypress v13',
    language: 'TypeScript',
    browser: 'Electron / Chrome (headless)',
    runCommand: 'npx cypress run --headless',
    coverage: [
      { area: 'Navigation',     count: 9,  unit: 'tests' },
      { area: 'Store & Cart',   count: 5,  unit: 'tests' },
      { area: 'Checkout',       count: 7,  unit: 'tests' },
      { area: 'Authentication', count: 6,  unit: 'tests' },
      { area: 'Contact Form',   count: 8,  unit: 'tests' },
      { area: 'Blog',           count: 6,  unit: 'tests' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === parseInt(id, 10));

  if (!project) notFound();

  // Manual test case collection page
  if (project.manualTestsSlug) {
    const totalCases = manualTestCases.length;
    const totalSteps = manualTestCases.reduce((sum, tc) => sum + tc.steps.length, 0);

    return (
      <main className="container mx-auto py-12 px-4 max-w-5xl" data-testid="project-detail-page">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground mb-10 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
          <div className="relative w-20 h-20 shrink-0 rounded-xl bg-muted overflow-hidden p-2">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold font-headline mb-1">{project.title}</h1>
            <p className="text-muted-foreground text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold font-mono">{totalCases}</p>
              <p className="text-sm text-muted-foreground mt-1">Test Cases</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold font-mono">{totalSteps}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Steps</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 sm:col-span-1">
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold font-mono">{MANUAL_CATEGORIES.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Functional Areas</p>
            </CardContent>
          </Card>
        </div>

        {/* Test case viewer */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Test Cases</h2>
          <ManualTestsViewer />
        </div>
      </main>
    );
  }

  // Non-test-suite projects just show a minimal page
  if (!project.testSuiteSlug) {
    return (
      <main className="container mx-auto py-16 px-4">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <h1 className="text-4xl font-bold font-headline mb-4">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex gap-3 mt-8">
          {project.githubUrl && (
            <Button asChild variant="outline">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> View on GitHub
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
              </Link>
            </Button>
          )}
        </div>
      </main>
    );
  }

  const slug = project.testSuiteSlug;
  const meta = SUITE_META[slug];
  const result = testResults[slug];
  const totalCount = meta.coverage.reduce((sum, r) => sum + r.count, 0);
  const unitLabel = meta.coverage[0]?.unit ?? 'tests';

  return (
    <main className="container mx-auto py-12 px-4 max-w-5xl" data-testid="project-detail-page">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground mb-10 text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
        <div className="relative w-20 h-20 shrink-0 rounded-xl bg-muted overflow-hidden p-2">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold font-headline">{project.title}</h1>
          </div>
          <p className="text-muted-foreground">{meta.headline}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </div>
        {project.githubUrl && (
          <Button asChild variant="outline" className="shrink-0">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" /> View on GitHub
            </Link>
          </Button>
        )}
      </div>

      {/* Info cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* About */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">About This Suite</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              {(
                [
                  ['Pattern',   meta.pattern],
                  ['Framework', meta.framework],
                  ['Language',  meta.language],
                  ['Browser',   meta.browser],
                  ['Run with',  meta.runCommand],
                ] as [string, string][]
              ).map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="text-muted-foreground w-24 shrink-0">{label}</dt>
                  <dd className="font-mono text-xs bg-muted rounded px-1.5 py-0.5 leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {/* Coverage table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Test Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <tbody>
                {meta.coverage.map((row) => (
                  <tr key={row.area} className="border-b border-border last:border-0">
                    <td className="py-1.5 pr-4 text-muted-foreground">{row.area}</td>
                    <td className="py-1.5 text-right font-mono font-medium">
                      {row.count}
                      <span className="text-muted-foreground font-normal text-xs ml-1">{row.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border">
                  <td className="pt-2 font-semibold">Total</td>
                  <td className="pt-2 text-right font-mono font-bold">
                    {totalCount}
                    <span className="text-muted-foreground font-normal text-xs ml-1">{unitLabel}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Interactive terminal */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Live Test Runner</h2>
          <span className="text-xs text-muted-foreground">
            Click <span className="font-semibold text-emerald-500">Run Tests</span> to execute the suite against this site in real time
          </span>
        </div>
        <TestTerminal suite={slug} initialResult={result} />
        <p className="mt-3 text-xs text-muted-foreground">
          Requires the dev server and test dependencies to be running on the host.{' '}
          {slug === 'playwright'
            ? 'Playwright manages its own Chromium — no extra setup needed.'
            : `${project.title} requires Chrome to be installed on the server.`}
        </p>
      </div>
    </main>
  );
}

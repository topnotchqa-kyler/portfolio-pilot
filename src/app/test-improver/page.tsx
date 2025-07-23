import TestImproverClient from './TestImproverClient';

export default function TestImproverPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">AI Test Improver</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Provide your production code and test code to get AI-powered recommendations for improving your test suite.
        </p>
      </div>
      <TestImproverClient />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb } from 'lucide-react';
import { getTestRecommendations } from './actions';

const formSchema = z.object({
  productionCode: z.string().min(20, 'Production code must be at least 20 characters.'),
  testCode: z.string().min(20, 'Test code must be at least 20 characters.'),
  language: z.string().min(1, 'Please select a language.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function TestImproverClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productionCode: '',
      testCode: '',
      language: 'javascript',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const result = await getTestRecommendations(values);

    if (result.success) {
      setRecommendations(result.recommendations ?? null);
    } else {
      setError(result.error ?? null);
    }
    setIsLoading(false);
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="productionCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Production Code</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your production code here..." {...field} rows={12} className="font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="testCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Test Code</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your test code here..." {...field} rows={12} className="font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Recommendations'
              )}
            </Button>
          </form>
        </Form>
        {error && (
          <Alert variant="destructive" className="mt-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {recommendations && (
          <Card className="mt-8 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Lightbulb className="text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {recommendations}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

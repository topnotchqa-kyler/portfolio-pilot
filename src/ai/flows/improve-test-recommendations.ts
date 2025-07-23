'use server';

/**
 * @fileOverview An AI tool that analyzes automated tests and suggests improvements or additions.
 *
 * - improveTestRecommendations - A function that suggests improvements or additions for automated tests.
 * - ImproveTestRecommendationsInput - The input type for the improveTestRecommendations function.
 * - ImproveTestRecommendationsOutput - The return type for the improveTestRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveTestRecommendationsInputSchema = z.object({
  testCode: z.string().describe('The code of the automated test to analyze.'),
  productionCode: z.string().describe('The production code that the test is testing.'),
  language: z.string().describe('The programming language of the code.'),
});
export type ImproveTestRecommendationsInput = z.infer<
  typeof ImproveTestRecommendationsInputSchema
>;

const ImproveTestRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('The recommendations for improving or adding to the automated tests.'),
});
export type ImproveTestRecommendationsOutput = z.infer<
  typeof ImproveTestRecommendationsOutputSchema
>;

export async function improveTestRecommendations(
  input: ImproveTestRecommendationsInput
): Promise<ImproveTestRecommendationsOutput> {
  return improveTestRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveTestRecommendationsPrompt',
  input: {schema: ImproveTestRecommendationsInputSchema},
  output: {schema: ImproveTestRecommendationsOutputSchema},
  prompt: `You are an AI tool that analyzes automated tests and suggests improvements or additions.

You will be provided with the code of the automated test and the production code that the test is testing.

Your task is to provide recommendations for improving or adding to the automated tests to ensure thorough test coverage and maintain high-quality code.

Test Code:
{{testCode}}

Production Code:
{{productionCode}}

Language:
{{language}}`,
});

const improveTestRecommendationsFlow = ai.defineFlow(
  {
    name: 'improveTestRecommendationsFlow',
    inputSchema: ImproveTestRecommendationsInputSchema,
    outputSchema: ImproveTestRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

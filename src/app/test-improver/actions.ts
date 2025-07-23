'use server';

import { z } from 'zod';
import { improveTestRecommendations } from '@/ai/flows/improve-test-recommendations';

const formSchema = z.object({
  productionCode: z.string().min(1),
  testCode: z.string().min(1),
  language: z.string().min(1),
});

export async function getTestRecommendations(values: z.infer<typeof formSchema>): Promise<{ success: boolean; recommendations?: string; error?: string }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid input.' };
  }

  try {
    const result = await improveTestRecommendations(validatedFields.data);
    return { success: true, recommendations: result.recommendations };
  } catch (error) {
    console.error('AI recommendation failed:', error);
    return { success: false, error: 'Failed to get recommendations from the AI. Please try again later.' };
  }
}

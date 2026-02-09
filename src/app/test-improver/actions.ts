
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
    // Error is handled by returning failure state to the client
    return { success: false, error: 'The AI service is currently unavailable. Please try again later.' };
  }
}

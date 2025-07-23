'use server';

import { generateImage } from '@/ai/flows/generate-image-flow';

export async function generateProductImage(prompt: string): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  try {
    const result = await generateImage(prompt);
    return { success: true, imageUrl: result };
  } catch (error) {
    console.error('AI image generation failed:', error);
    return { success: false, error: 'Failed to generate image. Please try again later.' };
  }
}

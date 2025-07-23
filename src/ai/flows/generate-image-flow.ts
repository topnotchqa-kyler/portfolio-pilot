'use server';

/**
 * @fileOverview An AI tool that generates an image from a text prompt.
 *
 * - generateImage - A function that generates an image based on a text prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.string().describe('The text prompt for image generation.');
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.string().describe("The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'.");
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (prompt) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `a professional, high-quality product photograph of a single item on a clean, neutral background: ${prompt}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    
    const imageUrl = media.url;
    if (!imageUrl) {
        throw new Error('Image generation failed to produce an image.');
    }

    return imageUrl;
  }
);

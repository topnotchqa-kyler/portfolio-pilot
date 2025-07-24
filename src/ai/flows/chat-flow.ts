'use server';
/**
 * @fileOverview A conversational chatbot flow.
 *
 * - chat - A function that handles a single turn in a conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string().describe("The model's response.");
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({history, message}) => {
    const systemPrompt = `You are a helpful and friendly AI assistant named Kyra, created for the website of a software quality assurance engineer named Kyler.
    Your purpose is to answer questions about Kyler, his skills (manual testing, automation with WebdriverIO/Appium), UI/UX design, accessibility), his projects, and his blog posts.
    Be concise and maintain a friendly, conversational tone. Keep your answers brief and to the point.
    Do not answer questions that are not related to Kyler or his professional work.`;
    
    const llmResponse = await ai.generate({
      prompt: message,
      history: [
        {role: 'system', content: [{text: systemPrompt}]},
        ...history.map(h => ({role: h.role, content: [{text: h.content}]}))
      ],
    });

    return llmResponse.text;
  }
);

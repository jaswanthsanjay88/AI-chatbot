import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30; // Max time for response streaming

export async function POST(req: Request) {
  const { messages } = await req.json(); // Get chat messages from request

  const result = streamText({
    model: openai('gpt-3.5-turbo'), // Choose your model (e.g., gpt-3.5-turbo, gpt-4)
    messages, // Pass the messages to the model
  });

  return result.toDataStreamResponse(); // Return the stream
}

'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant tags for item listings based on image and description.
 *
 * - suggestItemTags - A function that handles the tag suggestion process.
 * - SuggestItemTagsInput - The input type for the suggestItemTags function.
 * - SuggestItemTagsOutput - The return type for the suggestItemTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestItemTagsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('The description of the item.'),
});
export type SuggestItemTagsInput = z.infer<typeof SuggestItemTagsInputSchema>;

const SuggestItemTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the item.'),
  category: z.string().describe('The suggested category for the item.'),
});
export type SuggestItemTagsOutput = z.infer<typeof SuggestItemTagsOutputSchema>;

export async function suggestItemTags(input: SuggestItemTagsInput): Promise<SuggestItemTagsOutput> {
  return suggestItemTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestItemTagsPrompt',
  input: {schema: SuggestItemTagsInputSchema},
  output: {schema: SuggestItemTagsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant tags and a category for clothing items based on their image and description.

  Analyze the following information to determine appropriate tags and category.

  Description: {{{description}}}
  Photo: {{media url=photoDataUri}}

  Provide a list of tags that are relevant to the item, and a single category that best describes the item.
  Tags should be descriptive and help users find the item when searching.
  Category should be from the following list: Tops, Bottoms, Dresses, Outerwear, Shoes, Accessories.

  Return the tags as an array of strings, and the category as a single string.`,
});

const suggestItemTagsFlow = ai.defineFlow(
  {
    name: 'suggestItemTagsFlow',
    inputSchema: SuggestItemTagsInputSchema,
    outputSchema: SuggestItemTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

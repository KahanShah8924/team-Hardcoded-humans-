'use server';

import { suggestItemTags } from '@/ai/flows/suggest-item-tags';
import type { SuggestItemTagsInput } from '@/ai/flows/suggest-item-tags';

export async function getSuggestions(input: SuggestItemTagsInput) {
  try {
    const result = await suggestItemTags(input);
    return result;
  } catch (error) {
    console.error('AI suggestion failed:', error);
    throw new Error('Failed to get suggestions from AI.');
  }
}

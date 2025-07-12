'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getSuggestions } from './actions';
import { Sparkles, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ItemCategory, ItemCondition } from '@/types';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  photo: z.any().refine(file => file instanceof File, 'Photo is required.'),
  category: z.enum(['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories']),
  size: z.string().min(1, 'Size is required.'),
  condition: z.enum(['New', 'Like New', 'Good', 'Fair']),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const categories: ItemCategory[] = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
const conditions: ItemCondition[] = ['New', 'Like New', 'Good', 'Fair'];

export function AddItemForm() {
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      size: '',
      tags: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast({
      title: 'Item Listed!',
      description: 'Your item has been successfully submitted for review.',
    });
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSuggest = async () => {
    const description = form.getValues('description');
    const photo = form.getValues('photo');

    if (!description || !photo) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a description and a photo to get suggestions.',
      });
      return;
    }
    
    if (!(photo instanceof File)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Photo',
        description: 'Please upload a valid image file.',
      });
      return;
    }

    setIsSuggesting(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onloadend = async () => {
        const photoDataUri = reader.result as string;
        const result = await getSuggestions({ description, photoDataUri });
        if (result.tags) {
          form.setValue('tags', result.tags.join(', '));
        }
        if (result.category) {
          const categoryTyped = result.category as ItemCategory;
          if (categories.includes(categoryTyped)) {
            form.setValue('category', categoryTyped);
          }
        }
        toast({
          title: 'Suggestions applied!',
          description: 'We\'ve filled in the category and tags for you.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'AI Suggestion Failed',
        description: 'Could not get suggestions. Please try again.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const tags = form.watch('tags')?.split(',').map(t => t.trim()).filter(Boolean) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handlePhotoChange} />
              </FormControl>
              {photoPreview && <img src={photoPreview} alt="Preview" className="mt-4 rounded-md max-h-64" />}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Vintage Blue Denim Jacket" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your item in detail..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
            <Button type="button" variant="outline" onClick={handleSuggest} disabled={isSuggesting}>
              {isSuggesting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Suggest with AI
            </Button>
            <FormDescription>
              Use AI to suggest a category and tags based on your photo and description.
            </FormDescription>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., M, 10, 42" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {conditions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="vintage, denim, jacket" {...field} />
              </FormControl>
              <FormDescription>
                Comma-separated tags. These help others find your item.
              </FormDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg">List Item</Button>
      </form>
    </Form>
  );
}

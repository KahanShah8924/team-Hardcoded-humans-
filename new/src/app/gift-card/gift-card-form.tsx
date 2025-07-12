'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React from 'react';
import Image from 'next/image';

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
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  design: z.string({ required_error: 'Please select a design.' }),
  amount: z.string({ required_error: 'Please select an amount.' }),
  recipientName: z.string().min(2, 'Name must be at least 2 characters.'),
  recipientEmail: z.string().email('Please enter a valid email.'),
  senderName: z.string().min(2, 'Name must be at least 2 characters.'),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const designs = [
  { id: 'design-1', src: 'https://placehold.co/300x200.png', alt: 'Abstract colorful design', hint: 'abstract colorful' },
  { id: 'design-2', src: 'https://placehold.co/300x200.png', alt: 'Minimalist clean design', hint: 'minimalist clean' },
  { id: 'design-3', src: 'https://placehold.co/300x200.png', alt: 'Happy birthday design', hint: 'birthday celebration' },
  { id: 'design-4', src: 'https://placehold.co/300x200.png', alt: 'Thank you design', hint: 'thank you' },
];

const amounts = ['25', '50', '100', '200'];

export function GiftCardForm() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: '',
      recipientEmail: '',
      senderName: '',
      message: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    toast({
      title: 'Gift Card Sent!',
      description: `The gift card has been sent to ${values.recipientEmail}.`,
    });
    form.reset();
  };
  
  const selectedDesignSrc = designs.find(d => d.id === form.watch('design'))?.src;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {selectedDesignSrc && (
            <div className="w-full flex justify-center">
                <Image src={selectedDesignSrc} alt="Selected gift card design" width={300} height={200} className="rounded-lg shadow-md" data-ai-hint={designs.find(d => d.id === form.watch('design'))?.hint}/>
            </div>
        )}

        <FormField
          control={form.control}
          name="design"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">1. Choose a Design</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {designs.map(design => (
                    <FormItem key={design.id} className="relative">
                      <FormControl>
                         <RadioGroupItem value={design.id} className="sr-only" />
                      </FormControl>
                       <Label
                        htmlFor={design.id}
                        className={cn(
                          'cursor-pointer rounded-lg border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground',
                          field.value === design.id && 'border-primary'
                        )}
                      >
                         <Image src={design.src} alt={design.alt} width={300} height={200} className="rounded-md" data-ai-hint={design.hint}/>
                         {field.value === design.id && (
                            <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Check className="h-4 w-4" />
                            </div>
                         )}
                      </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">2. Select an Amount</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {amounts.map(amount => (
                    <FormItem key={amount}>
                      <FormControl>
                         <RadioGroupItem value={amount} id={amount} className="sr-only" />
                      </FormControl>
                      <Label
                        htmlFor={amount}
                        className={cn(
                          'flex items-center justify-center cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 text-lg font-bold hover:bg-accent hover:text-accent-foreground',
                          field.value === amount && 'border-primary'
                        )}
                      >
                       ${amount}
                      </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
             <h2 className="text-lg font-semibold">3. Recipient Info</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient's Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jane@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Happy Birthday!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <Button type="submit" size="lg" className="w-full">Purchase Gift Card</Button>
      </form>
    </Form>
  );
}

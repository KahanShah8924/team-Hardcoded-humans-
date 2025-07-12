import { GiftCardForm } from './gift-card-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

export default function GiftCardPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Gift className="h-12 w-12 text-primary" />
            </div>
          <CardTitle className="text-3xl font-headline">Give the Gift of Style</CardTitle>
          <CardDescription>
            Send a digital gift card to a friend or loved one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GiftCardForm />
        </CardContent>
      </Card>
    </div>
  );
}

import { AddItemForm } from './add-item-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddNewItemPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">List a New Item</CardTitle>
          <CardDescription>
            Fill out the details below to add your clothing to the marketplace. Good photos and descriptions help!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddItemForm />
        </CardContent>
      </Card>
    </div>
  );
}

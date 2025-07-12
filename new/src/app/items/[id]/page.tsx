import Image from 'next/image';
import { mockItems } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRightLeft, Coins, Star } from 'lucide-react';

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = mockItems.find((i) => i.id === params.id);

  if (!item || !item.user) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {item.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative bg-card rounded-lg overflow-hidden border">
                    <Image src={src} alt={`${item.title} image ${index + 1}`} fill className="object-cover" data-ai-hint="fashion clothes" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{item.title}</h1>
            <Badge variant="outline">{item.status}</Badge>
          </div>

          <p className="text-muted-foreground">{item.description}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div><span className="font-semibold">Category:</span> {item.category}</div>
            <div><span className="font-semibold">Size:</span> {item.size}</div>
            <div><span className="font-semibold">Condition:</span> {item.condition}</div>
            <div><span className="font-semibold">Points:</span> {item.points}</div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <Separator />
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
               <Image src={item.user.avatarUrl} alt={item.user.name} width={40} height={40} className="rounded-full" data-ai-hint="user avatar"/>
               <div>
                  <CardTitle className="text-base">Listed by {item.user.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 
                    <span>5.0 (23 reviews)</span>
                  </div>
               </div>
            </CardHeader>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Request Swap
            </Button>
            <Button size="lg" variant="accent" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <Coins className="mr-2 h-4 w-4" />
              Redeem with {item.points} Points
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

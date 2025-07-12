'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Item } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/items/${item.id}`} aria-label={item.title}>
        <CardHeader className="p-0">
          <div className="aspect-square relative">
            <Image
              src={item.images[0]}
              alt={item.title}
              fill
              data-ai-hint="fashion clothes"
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-headline text-lg font-semibold truncate">{item.title}</h3>
          <p className="text-sm text-muted-foreground">Size: {item.size}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Badge variant={item.condition === 'New' || item.condition === 'Like New' ? 'default' : 'secondary'}>
            {item.condition}
          </Badge>
        </CardFooter>
      </Link>
    </Card>
  );
}


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { mockItems } from '@/lib/mock-data';
import ItemCard from '@/components/item-card';
import { Input } from '@/components/ui/input';
import SnapAndSearch from '@/components/snap-and-search';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { toast } = useToast();

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: 'Subscribed!',
      description: "You've been added to our mailing list.",
    });
    const form = event.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Sale Banner Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/20 relative">
          <Image
            src="https://placehold.co/1200x400.png"
            layout="fill"
            objectFit="cover"
            alt="Sale background"
            className="opacity-20 -z-10"
            data-ai-hint="fashion sale"
          />
          <div className="container px-4 md:px-6 text-center relative">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-primary-foreground">
              Upto 50% Off on Select Items!
            </h1>
            <Button asChild size="lg" className="mt-6">
              <Link href="/items">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Product Categories */}
        <section className="w-full py-8">
          <div className="container flex flex-wrap justify-center items-center gap-2 md:gap-8">
            <Button variant="link" asChild>
              <Link href="/items?category=Tops">Tops</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/items?category=Jeans">Jeans</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/items?category=Dresses">Dresses</Link>
            </Button>
          </div>
        </section>

        {/* Seasonal Picks Section */}
        <section id="seasonal-picks" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Seasonal Picks
            </h2>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                <CarouselItem className="md:basis-1/2">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 flex flex-col md:flex-row">
                      <Image
                        src="https://placehold.co/400x400.png"
                        width={400}
                        height={400}
                        alt="Summer Collection"
                        className="w-full h-auto md:w-1/2 object-cover"
                        data-ai-hint="summer fashion"
                      />
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="font-headline text-2xl font-bold">Summer Collection</h3>
                        <p className="text-muted-foreground mt-2 mb-4">
                          Bright, breezy, and beautiful styles for the sunny days.
                        </p>
                        <Button asChild>
                          <Link href="/items?season=summer">Shop Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 flex flex-col md:flex-row">
                      <Image
                        src="https://placehold.co/400x400.png"
                        width={400}
                        height={400}
                        alt="Winter Collection"
                        className="w-full h-auto md:w-1/2 object-cover"
                        data-ai-hint="winter fashion"
                      />
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="font-headline text-2xl font-bold">Winter Collection</h3>
                        <p className="text-muted-foreground mt-2 mb-4">
                          Cozy up with our warm and stylish winter essentials.
                        </p>
                        <Button asChild>
                          <Link href="/items?season=winter">Shop Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-2" />
              <CarouselNext className="absolute right-2" />
            </Carousel>
          </div>
        </section>

        {/* Hues on the Horizon Section */}
        <section id="hues-on-the-horizon" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Hues on the Horizon
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="h-10 w-full rounded-md bg-gradient-to-r from-red-200 via-purple-200 to-blue-200" />
                  </CardHeader>
                  <CardContent className="text-center">
                    <Image
                      src="https://placehold.co/300x300.png"
                      width={300}
                      height={300}
                      alt="Matching Clothing"
                      className="rounded-md mx-auto"
                      data-ai-hint="colorful fashion"
                    />
                    <Button className="mt-4" asChild>
                      <Link href={`/items?color=${i}`}>Shop Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Snap & Search It Section */}
        <SnapAndSearch />

        {/* Most Favorited Section */}
        <section id="most-favorited" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Most Favorited
            </h2>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {mockItems.map((item) => (
                  <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1">
                      <ItemCard item={item} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 hidden sm:flex" />
              <CarouselNext className="absolute right-2 hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Prints That Pop Section */}
        <section id="prints-that-pop" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Prints That Pop
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {['Polka Dots', 'Gingham', 'Florals', 'Denim', 'Stripes'].map((print) => (
                <Link href={`/items?print=${print.toLowerCase()}`} key={print}>
                  <Card className="relative overflow-hidden group">
                    <Image
                      src="https://placehold.co/300x300.png"
                      width={300}
                      height={300}
                      alt={print}
                      data-ai-hint={`${print.toLowerCase()} pattern`}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <h3 className="font-headline text-white text-xl sm:text-2xl font-bold text-center p-2">{print}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Get 50% Clean Out Fees Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-accent text-accent-foreground">
          <div className="container text-center px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get 50% Off Clean-Out Fees!
            </h2>
            <p className="max-w-2xl mx-auto mt-4 mb-6">
              Let us inspect, price, and ship your items from your doorstep. You get 50% off our
              standard fees on your first two sales!
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/items/new">Start Selling</Link>
            </Button>
          </div>
        </section>

        {/* Trending Outfit Add-ons Section */}
        <section id="trending-addons" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Trending Outfit Add-ons
            </h2>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {mockItems
                  .filter((i) => i.category === 'Accessories' || i.category === 'Shoes')
                  .map((item) => (
                    <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                      <div className="p-1">
                        <ItemCard item={item} />
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 hidden sm:flex" />
              <CarouselNext className="absolute right-2 hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Top Brands Spotlight Section */}
        <section id="top-brands" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Top Brands Spotlight
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
              {['Nike', 'Levi’s', 'Zara', 'GAP', 'Forever 21'].map((brand) => (
                <Link href={`/items?brand=${brand}`} key={brand}>
                  <Image
                    src={`https://placehold.co/120x60.png?text=${brand}`}
                    width={120}
                    height={60}
                    alt={brand}
                    data-ai-hint="brand logo"
                    className="grayscale hover:grayscale-0 transition-all"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter & Gift Cards Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="font-headline text-3xl font-bold">Stay Connected</h2>
              <p className="text-muted-foreground mt-2">Get updates on new arrivals and sales.</p>
              <form
                className="flex w-full max-w-sm items-center space-x-2 mt-4 mx-auto md:mx-0"
                onSubmit={handleSubscribe}
              >
                <Input type="email" placeholder="Email" required />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <h3 className="font-headline text-2xl font-bold">Give the Gift of Style</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  The perfect gift for the fashion-lover in your life.
                </p>
                <Button asChild>
                  <Link href="/gift-card">Buy Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Awareness Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/20">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Thrift More. Waste Less.
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find it. Flaunt it. Set it free. Join our mission for a more sustainable future.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" variant="outline" className="bg-background">
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

    
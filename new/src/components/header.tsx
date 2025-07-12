import Link from 'next/link';
import { Button } from './ui/button';
import { Recycle, PlusCircle } from 'lucide-react';

export default function Header() {
  const user = null; // Placeholder for user state

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              ReWear
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="/#featured-items" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Browse
          </Link>
          <Link href="/items/new" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            List an Item
          </Link>
        </nav>
        <div className="flex items-center justify-end space-x-2">
          {user ? (
            <>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

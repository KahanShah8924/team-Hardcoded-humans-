import Link from 'next/link';
import { Recycle, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Recycle className="h-6 w-6 text-primary mr-2" />
            <span className="font-headline text-xl font-bold">ReWear</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4 md:mb-0 text-sm font-medium">
            <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="/#featured-items" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ReWear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

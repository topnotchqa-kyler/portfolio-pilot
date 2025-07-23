import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Pilcrow, User } from 'lucide-react';
import { checkAuth } from '@/lib/auth';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/store', label: 'Store' },
  { href: '/contact', label: 'Contact' },
];

export default async function Header() {
  const isLoggedIn = await checkAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
          <div className="p-2 bg-primary text-primary-foreground rounded-md">
            <Pilcrow />
          </div>
          <span>Kyler's Testing Playground</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {isLoggedIn ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg mb-4">
                  <Pilcrow className="h-6 w-6" />
                  <span>Kyler's Testing Playground</span>
                </Link>
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                ))}
                 {isLoggedIn ? (
                    <Button asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                ) : (
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

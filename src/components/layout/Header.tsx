
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Shapes, User } from 'lucide-react';
import { checkAuth } from '@/lib/auth';

const navLinks = [
  { href: '/', label: 'Home', testId: 'nav-home-link' },
  { href: '/about', label: 'About', testId: 'nav-about-link' },
  { href: '/projects', label: 'Projects', testId: 'nav-projects-link' },
  { href: '/blog', label: 'Blog', testId: 'nav-blog-link' },
  { href: '/store', label: 'Store', testId: 'nav-store-link' },
  { href: '/contact', label: 'Contact', testId: 'nav-contact-link' },
];

export default async function Header() {
  const isLoggedIn = await checkAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="header">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg" data-testid="header-logo-link">
          <div className="p-2 bg-primary text-primary-foreground rounded-md">
            <Shapes className="h-5 w-5" />
          </div>
          <span>Kyler's Testing Playground</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium" data-testid="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground" data-testid={link.testId}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {isLoggedIn ? (
              <Button asChild>
                <Link href="/dashboard" data-testid="header-dashboard-button">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/login" data-testid="header-login-button">Login</Link>
              </Button>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" data-testid="mobile-nav-trigger">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" data-testid="mobile-nav-sheet">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg mb-4" data-testid="mobile-nav-logo-link">
                    <Shapes className="h-6 w-6" />
                    <span>Kyler's Testing Playground</span>
                  </Link>
                </SheetClose>
                {navLinks.map(link => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-foreground" data-testid={`mobile-${link.testId}`}>
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                 {isLoggedIn ? (
                    <SheetClose asChild>
                      <Button asChild>
                          <Link href="/dashboard" data-testid="mobile-header-dashboard-button">Dashboard</Link>
                      </Button>
                    </SheetClose>
                ) : (
                    <SheetClose asChild>
                      <Button asChild>
                          <Link href="/login" data-testid="mobile-header-login-button">Login</Link>
                      </Button>
                    </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

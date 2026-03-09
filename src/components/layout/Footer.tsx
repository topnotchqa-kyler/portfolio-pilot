
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-card" data-testid="footer">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 px-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kyler's Testing Playground. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Generated with Firebase Studio
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/topnotchqa-kyler" aria-label="GitHub" data-testid="footer-github-link">
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
<Link href="https://www.linkedin.com/in/kyler-chavez/" aria-label="LinkedIn" data-testid="footer-linkedin-link">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

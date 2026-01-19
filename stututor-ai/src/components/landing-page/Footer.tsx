import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo & Description */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StuTutor</span>
            </div>
            <p className="max-w-xs text-center text-sm text-muted-foreground md:text-left">
              AI-powered learning platform that transforms your PDFs into interactive study sessions.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#how-it-works" className="text-muted-foreground transition-colors hover:text-foreground">
              How it Works
            </a>
            <a href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <Link href="/login" className="text-muted-foreground transition-colors hover:text-foreground">
              Sign In
            </Link>
            <Link href="/signup" className="text-muted-foreground transition-colors hover:text-foreground">
              Get Started
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} StuTutor. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built with AI</span>
            <span className="text-border">|</span>
            <span>Made for Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

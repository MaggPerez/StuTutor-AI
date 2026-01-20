'use client'
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const links = [
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#features', label: 'Features' },
  { href: '/login', label: 'Sign In', isLink: true },
  { href: '/signup', label: 'Get Started', isLink: true },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="border-t border-border bg-card/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo & Description */}
          <motion.div
            className="flex flex-col items-center gap-4 md:items-start"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 transition-transform hover:scale-105">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StuTutor</span>
            </div>
            <p className="max-w-xs text-center text-sm text-muted-foreground md:text-left">
              AI-powered learning platform that transforms your PDFs into interactive study sessions.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
            variants={itemVariants}
          >
            {links.map((link, index) => (
              <div key={index} className="transition-transform hover:-translate-y-0.5">
                {link.isLink ? (
                  <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} StuTutor. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built with AI</span>
            <span className="text-border">|</span>
            <span>Made for Students</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

'use client'
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, FileText, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ModeToggle } from '@/components/ModeToggle';

const navLinks = [
  { href: '#toolkit', label: 'Toolkit' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#features', label: 'Features' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const Hero = () => {
  return (
    <>
      {/* Sticky Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">StuTutor</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="gap-1.5">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <section className="relative min-h-screen overflow-hidden bg-background pt-16">
        {/* Hero Content */}
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Text Content */}
            <motion.div
              className="relative z-10 space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Pill Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                AI-Powered Learning Platform
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Learn Smarter with
                  <span className="mt-2 block bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
                    Your AI Study Companion
                  </span>
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  Upload any PDF, and let AI transform it into an interactive learning experience. Ask questions, get summaries, and master your material faster.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="w-full gap-2 text-base font-semibold sm:w-auto transition-transform hover:scale-105 active:scale-95">
                    Start Learning Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="w-full gap-2 text-base font-semibold sm:w-auto transition-transform hover:scale-105 active:scale-95">
                    <Play className="h-4 w-4" />
                    See How It Works
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: '100%', label: 'Free to Use' },
                  { value: 'AI', label: 'Powered Responses' },
                  { value: '24/7', label: 'Always Available' }
                ].map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
                    <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Element */}
            <motion.div
              className="relative lg:h-[600px]"
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Main Card */}
              <div className="relative z-10 rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/10 transition-transform hover:-translate-y-1">
                {/* Browser Header */}
                <div className="mb-6 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive/60"></div>
                  <div className="h-3 w-3 rounded-full bg-chart-4/60"></div>
                  <div className="h-3 w-3 rounded-full bg-chart-2/60"></div>
                </div>

                {/* Chat Interface Preview */}
                <div className="space-y-4">
                  {/* PDF Preview */}
                  <motion.div
                    className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Advanced_Chemistry.pdf</p>
                      <p className="text-sm text-muted-foreground">42 pages • Ready to learn</p>
                    </div>
                  </motion.div>

                  {/* Chat Messages */}
                  <div className="space-y-3">
                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                        Explain the key concepts of chemical bonding
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm text-secondary-foreground">
                        <p className="mb-2">Chemical bonding involves three main types:</p>
                        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                          <li>Ionic bonds - electron transfer</li>
                          <li>Covalent bonds - electron sharing</li>
                          <li>Metallic bonds - electron sea model</li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  {/* Input Preview */}
                  <motion.div
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="flex-1 text-sm text-muted-foreground">Ask a follow-up question...</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                      <ArrowRight className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements - Static, no infinite animations */}
              <motion.div
                className="absolute -left-4 top-12 z-20 hidden rounded-xl border border-border bg-card p-3 shadow-lg lg:block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-chart-2/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-chart-2" />
                  </div>
                  <span className="text-xs font-medium">AI Understanding</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-24 z-20 hidden rounded-xl border border-border bg-card p-3 shadow-lg lg:block"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-chart-3/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-chart-3" />
                  </div>
                  <span className="text-xs font-medium">PDF Analyzed</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background Decorations - Static blobs, no animations */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -right-32 top-1/2 h-[400px] w-[400px] rounded-full bg-chart-3/10 blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-chart-2/10 blur-[120px]" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>
      </section>
    </>
  );
};

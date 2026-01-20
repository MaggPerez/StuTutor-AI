'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, CheckCircle2, FileText, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob" 
        />
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.5 }}
           transition={{ duration: 2, delay: 0.5 }}
           className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" 
        />
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.5 }}
           transition={{ duration: 2, delay: 1 }}
           className="absolute bottom-20 left-1/2 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" 
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit mx-auto lg:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">AI Tutor v2.0 is live</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              Study Smarter, <br />
              Not <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Harder</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Upload your course materials and let our AI create personalized study guides, flashcards, and quizzes instantly. It's like having a private tutor 24/7.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-4"
            >
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 rounded-full text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base bg-background/50 backdrop-blur-sm border-2 hover:scale-105 active:scale-95 transition-all">
                  View Demo
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground mt-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Mockup - Right Side */}
          <motion.div 
             initial={{ opacity: 0, x: 20, rotateY: -20, rotateX: 10 }}
             animate={{ opacity: 1, x: 0, rotateY: -10, rotateX: 5 }}
             transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
             className="relative mx-auto w-full max-w-[600px] lg:max-w-none perspective-[2000px]"
          >
            {/* Main Interface Card */}
            <div className="relative z-10 bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-4 transform transition-transform duration-500 hover:rotate-y-0 hover:rotate-x-0">
              
              {/* Fake Window Controls */}
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <div className="ml-auto w-32 h-2 rounded-full bg-muted" />
              </div>

              {/* Chat UI Mockup */}
              <div className="space-y-4">
                {/* AI Message */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
                      I've analyzed your PDF "Introduction to Physics". Here are 3 key concepts you should focus on:
                    </div>
                    <div className="flex gap-2">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                        className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium"
                      >
                        Newton's Laws
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.7 }}
                        className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium"
                      >
                        Thermodynamics
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* User Message */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2 }}
                  className="flex gap-3 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 rounded-full bg-purple-500" />
                  </div>
                  <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none text-sm shadow-md">
                    Can you create a quiz for Newton's Second Law?
                  </div>
                </motion.div>

                {/* AI Message - Generating */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-none w-full space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Generating Quiz...</span>
                      <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-foreground/10 rounded-full animate-pulse" />
                      <div className="h-2 w-1/2 bg-foreground/10 rounded-full animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -right-12 top-10 bg-card p-3 rounded-xl shadow-xl border border-border/50 animate-bounce-slow hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Summarized</div>
                    <div className="text-sm font-bold">45 Pages</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                className="absolute -left-8 bottom-20 bg-card p-3 rounded-xl shadow-xl border border-border/50 animate-bounce-slow animation-delay-2000 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Study Guide</div>
                    <div className="text-sm font-bold">Ready</div>
                  </div>
                </div>
              </motion.div>

            </div>
            
            {/* Glow behind */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 transform rotate-6 scale-95" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

'use client'
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

const trustIndicators = [
  'No credit card required',
  'Free forever plan',
  'Instant setup'
];

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Main CTA Card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-8 text-center shadow-2xl shadow-primary/10 lg:p-16"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Badge */}
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Start Learning Today
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              variants={itemVariants}
            >
              Ready to transform how you learn?
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
              variants={itemVariants}
            >
              Join thousands of students who are already studying smarter with AI-powered tutoring. Upload your first PDF and experience the difference.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link href="/signup">
                <Button size="lg" className="h-14 gap-2 px-10 text-lg font-semibold transition-transform hover:scale-105 active:scale-95">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <svg
                    className="h-5 w-5 text-chart-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{indicator}</span>
                </div>
              ))}
            </motion.div>

            {/* Decorative Elements - Static */}
            <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-primary/20 blur-[80px]" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-chart-3/20 blur-[80px]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

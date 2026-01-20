'use client'
import {
  MessageSquare,
  BookOpen,
  Zap,
  Shield,
  Brain,
  FileSearch,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Chat naturally with AI about your documents. Ask questions the way you would ask a tutor.',
    size: 'large',
    gradient: 'from-primary/20 to-chart-3/20',
  },
  {
    icon: BookOpen,
    title: 'Smart Summaries',
    description: 'Get concise summaries of any section or the entire document.',
    size: 'small',
    gradient: 'from-chart-2/20 to-chart-5/20',
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'No waiting. Get answers in real-time.',
    size: 'small',
    gradient: 'from-chart-4/20 to-chart-3/20',
  },
  {
    icon: Brain,
    title: 'Deep Understanding',
    description: 'AI comprehends context, not just keywords. Get answers that truly understand your questions.',
    size: 'medium',
    gradient: 'from-chart-3/20 to-primary/20',
  },
  {
    icon: FileSearch,
    title: 'Content Analysis',
    description: 'Automatically extract key concepts, themes, and important information from your documents.',
    size: 'medium',
    gradient: 'from-chart-5/20 to-chart-2/20',
  },
  {
    icon: Clock,
    title: 'Chat History',
    description: 'All conversations saved. Pick up where you left off.',
    size: 'small',
    gradient: 'from-primary/20 to-chart-5/20',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your documents are encrypted and protected.',
    size: 'small',
    gradient: 'from-chart-2/20 to-primary/20',
  },
  {
    icon: Sparkles,
    title: 'Study Materials',
    description: 'Generate practice questions, flashcards, and study guides tailored to your learning needs.',
    size: 'large',
    gradient: 'from-chart-4/20 to-chart-2/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

export const Features = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            variants={headerVariants}
            className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            Features
          </motion.p>
          <motion.h2
            variants={headerVariants}
            className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Everything you need to excel
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-lg text-muted-foreground"
          >
            Powerful AI-driven tools designed to accelerate your learning
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const sizeClasses = {
                small: 'lg:col-span-1',
                medium: 'sm:col-span-2 lg:col-span-2',
                large: 'sm:col-span-2',
              };

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 ${sizeClasses[feature.size as keyof typeof sizeClasses]}`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className={`mb-2 font-bold text-foreground ${feature.size === 'large' ? 'text-xl' : 'text-lg'}`}>
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-muted-foreground ${feature.size === 'small' ? 'text-sm' : ''}`}>
                      {feature.description}
                    </p>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Background Decoration - Static */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-chart-3/5 blur-[100px]" />
      </div>
    </section>
  );
};

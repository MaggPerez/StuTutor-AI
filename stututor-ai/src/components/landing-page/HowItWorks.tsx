'use client';

import { Upload, Cpu, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "Upload Your Materials",
    description: "Drag and drop your PDFs, lecture slides, or notes. We support all major formats.",
    icon: Upload,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "AI Analysis",
    description: "Our advanced models read and understand your documents, extracting key concepts and creating a knowledge graph.",
    icon: Cpu,
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Start Learning",
    description: "Chat with your documents, take generated quizzes, and master the subject matter.",
    icon: GraduationCap,
    color: "bg-green-500",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium uppercase tracking-wider mb-4">
            Workflow
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            From PDF to Mastery in Minutes
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block origin-top" 
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  
                  {/* Content Side */}
                  <div className={cn(
                    "flex-1 text-center md:text-left",
                    isEven ? "md:pr-16 md:text-right" : "md:pl-16"
                  )}>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">
                      {step.description}
                    </p>
                  </div>

                  {/* Center Icon */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.2 + 0.3 }}
                    className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-background border-4 border-muted shadow-xl shrink-0"
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg", step.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </motion.div>

                  {/* Empty Side for layout balance */}
                  <div className="flex-1 hidden md:block" />
                  
                </motion.div>
              );
            })}
          </div>
          
          {/* Bottom Connector */}
           <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 1 }}
             className="absolute left-[50%] -bottom-12 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
           >
            <div className="w-2 h-2 rounded-full bg-border" />
            <div className="w-2 h-2 rounded-full bg-border" />
            <div className="w-2 h-2 rounded-full bg-border" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

'use client';

import { Upload, Cpu, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <section id="how-it-works" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium uppercase tracking-wider mb-4">
            Workflow
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            From PDF to Mastery in Minutes
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div key={step.id} className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}>
                  
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
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-background border-4 border-muted shadow-xl shrink-0">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg", step.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Empty Side for layout balance */}
                  <div className="flex-1 hidden md:block" />
                  
                </div>
              );
            })}
          </div>
          
          {/* Bottom Connector */}
           <div className="absolute left-[50%] -bottom-12 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-border" />
            <div className="w-2 h-2 rounded-full bg-border" />
            <div className="w-2 h-2 rounded-full bg-border" />
          </div>

        </div>
      </div>
    </section>
  );
};
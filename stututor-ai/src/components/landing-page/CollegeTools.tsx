'use client';

import { 
  BookOpen, 
  ClipboardList, 
  LayoutDashboard, 
  TrendingUp, 
  Calculator,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const tools = [
  {
    icon: BookOpen,
    title: "Course Manager",
    description: "Keep all your syllabi, lecture notes, and materials organized by class.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: ClipboardList,
    title: "Assignment Tracker",
    description: "Track due dates, status, and priorities so you never miss a deadline.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description: "Get a daily overview of your tasks, upcoming exams, and study goals.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: TrendingUp,
    title: "Grade Tracker",
    description: "Visualize your academic performance and identify areas for improvement.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Calculator,
    title: "GPA Calculator",
    description: "Forecast your semester GPA and simulate 'what-if' scenarios.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export const CollegeTools = () => {
  return (
    <section id="student-hub" className="min-h-screen flex flex-col justify-center py-20 bg-background border-b border-border/50">
      <div className="container mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            All-in-One Student Hub
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Manage Your Entire College Life
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond just AI tutoring, StuTutor provides a complete suite of tools to organize your academic journey.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div key={index} variants={item} className="h-full">
                <Card className="h-full border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group cursor-default">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Learn more <ArrowRight className="ml-1 w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

'use client'
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Calculator,
  CalendarDays,
  GraduationCap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    icon: LayoutDashboard,
    title: 'Smart Dashboard',
    description: 'Your personalized command center with quick insights, recent activity, and upcoming tasks at a glance.',
    color: 'bg-primary',
    lightColor: 'bg-primary/10',
    textColor: 'text-primary',
  },
  {
    icon: BookOpen,
    title: 'Course Manager',
    description: 'Organize all your courses in one place. Track progress, materials, and schedules effortlessly.',
    color: 'bg-chart-2',
    lightColor: 'bg-chart-2/10',
    textColor: 'text-chart-2',
  },
  {
    icon: ClipboardList,
    title: 'Assignment Tracker',
    description: 'Never miss a deadline. Track assignments, due dates, and submission status across all courses.',
    color: 'bg-chart-3',
    lightColor: 'bg-chart-3/10',
    textColor: 'text-chart-3',
  },
  {
    icon: TrendingUp,
    title: 'Grade Tracker',
    description: 'Monitor your academic performance in real-time. Visualize grade trends and identify areas to improve.',
    color: 'bg-chart-4',
    lightColor: 'bg-chart-4/10',
    textColor: 'text-chart-4',
  },
  {
    icon: Calculator,
    title: 'GPA Calculator',
    description: 'Calculate your GPA instantly. Plan ahead and see how future grades will impact your overall standing.',
    color: 'bg-chart-5',
    lightColor: 'bg-chart-5/10',
    textColor: 'text-chart-5',
  },
  {
    icon: CalendarDays,
    title: 'Schedule Calendar',
    description: 'View all assignments and deadlines in a beautiful calendar view. Sync with Google Calendar to stay organized across all your devices.',
    color: 'bg-chart-1',
    lightColor: 'bg-chart-1/10',
    textColor: 'text-chart-1',
  },
];

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
    transition: { duration: 0.4 }
  }
};

export const PlatformShowcase = () => {
  return (
    <section id="toolkit" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <GraduationCap className="h-4 w-4" />
            Built for College Students
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Your complete academic toolkit
          </h2>
          <p className="text-lg text-muted-foreground">
            More than just an AI tutor. StuTutor is a full-featured platform designed to help you manage and excel in your college journey.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="mx-auto max-w-6xl">
          {/* Top Row - 3 items */}
          <motion.div
            className="mb-4 grid gap-4 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {capabilities.slice(0, 3).map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Icon */}
                  <div className={`mb-4 inline-flex rounded-xl ${item.lightColor} p-3 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 ${item.textColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Hover Accent */}
                  <div className={`absolute -bottom-1 left-0 h-1 w-0 ${item.color} transition-all duration-300 group-hover:w-full`} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Row - 3 items */}
          <motion.div
            className="grid gap-4 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {capabilities.slice(3, 6).map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Icon */}
                  <div className={`mb-4 inline-flex rounded-xl ${item.lightColor} p-3 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 ${item.textColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Hover Accent */}
                  <div className={`absolute -bottom-1 left-0 h-1 w-0 ${item.color} transition-all duration-300 group-hover:w-full`} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Visual Accent - App Preview Hint */}
        <motion.div
          className="mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-2xl border border-border bg-gradient-to-br from-card via-card to-secondary/30 p-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} shadow-lg transition-transform hover:scale-110`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              All tools seamlessly integrated into one powerful platform
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration - Static */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-chart-2/5 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/3 h-[400px] w-[400px] rounded-full bg-chart-3/5 blur-[120px]" />
      </div>
    </section>
  );
};

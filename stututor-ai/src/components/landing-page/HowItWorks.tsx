'use client'
import { UserPlus, LayoutDashboard, Brain, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Your Account',
    description: 'Sign up in seconds and land on your dashboard — a central hub showing your courses, upcoming assignments, and everything you need for the semester at a glance.',
    features: ['Free to get started', 'Google sign-in supported', 'No setup required'],
  },
  {
    icon: LayoutDashboard,
    title: 'Set Up Your Semester',
    description: 'Add your courses and track your assignments with due dates. The calendar view keeps your whole schedule visible so nothing slips through the cracks.',
    features: ['Add and manage courses', 'Track assignments & deadlines', 'Weekly calendar view'],
  },
  {
    icon: Brain,
    title: 'Study Smarter with AI',
    description: 'Fire up the AI tutor to chat through concepts, generate a quiz on what you\'re studying, or paste your notes and get a clean summary — all without leaving the platform.',
    features: ['AI chat tutor with PDF support', 'Quiz generator from any topic', 'Instant study note summaries'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-secondary/30 py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Up and running in three steps
          </h2>
          <p className="text-lg text-muted-foreground">
            From sign-up to studying with AI — it takes minutes, not hours
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Line - Static */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent lg:left-1/2 lg:block" />

          <motion.div
            className="space-y-12 lg:space-y-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col lg:flex-row lg:items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Step Number Circle */}
                  <div className="absolute left-8 z-10 hidden -translate-x-1/2 lg:left-1/2 lg:block">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-[calc(50%-4rem)] ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 lg:p-8">
                      {/* Mobile Step Number */}
                      <div className="mb-4 flex items-center gap-4 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div className="h-px flex-1 bg-border"></div>
                      </div>

                      {/* Icon */}
                      <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="mb-3 text-xl font-bold text-foreground lg:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mb-6 leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-chart-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden w-[calc(50%-4rem)] lg:block"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Background Decoration - Static */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-48 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -left-48 bottom-0 h-[400px] w-[400px] rounded-full bg-chart-2/5 blur-[100px]" />
      </div>
    </section>
  );
};

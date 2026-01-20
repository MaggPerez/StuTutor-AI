'use client'
import { Upload, Brain, Lightbulb, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Document',
    description: 'Drag and drop any PDF document into StuTutor. Our system instantly processes and indexes your content for intelligent analysis.',
    features: ['Supports PDFs up to 50MB', 'Instant processing', 'Secure cloud storage'],
  },
  {
    icon: Brain,
    title: 'AI Analyzes Content',
    description: 'Our advanced AI reads and comprehends your entire document, building a deep understanding of the concepts, structure, and key information.',
    features: ['Context-aware understanding', 'Concept mapping', 'Key point extraction'],
  },
  {
    icon: Lightbulb,
    title: 'Learn Interactively',
    description: 'Ask questions in natural language and receive intelligent, contextual answers. Generate summaries, study notes, and practice questions on demand.',
    features: ['Natural conversation', 'Instant answers', 'Personalized learning'],
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const cardVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? -50 : 50
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 }
  })
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-secondary/30 py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            variants={headerVariants}
            className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            How It Works
          </motion.p>
          <motion.h2
            variants={headerVariants}
            className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Three steps to smarter studying
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="text-lg text-muted-foreground"
          >
            Transform any PDF into an interactive learning experience in seconds
          </motion.p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Line */}
          <motion.div
            className="absolute left-8 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-primary via-primary/50 to-transparent lg:left-1/2 lg:block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
          />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col lg:flex-row lg:items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Step Number Circle */}
                  <motion.div
                    className="absolute left-8 z-10 hidden -translate-x-1/2 lg:left-1/2 lg:block"
                    variants={circleVariants}
                  >
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`w-full lg:w-[calc(50%-4rem)] ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}
                    custom={isEven}
                    variants={cardVariants}
                  >
                    <motion.div
                      className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 lg:p-8"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Mobile Step Number */}
                      <div className="mb-4 flex items-center gap-4 lg:hidden">
                        <motion.div
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                          {index + 1}
                        </motion.div>
                        <div className="h-px flex-1 bg-border"></div>
                      </div>

                      {/* Icon */}
                      <motion.div
                        className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 transition-colors group-hover:bg-primary/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className="h-8 w-8 text-primary" />
                      </motion.div>

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
                          <motion.li
                            key={featureIndex}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                            custom={featureIndex}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={featureVariants}
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + featureIndex * 0.1 }}
                            >
                              <CheckCircle2 className="h-4 w-4 text-chart-2" />
                            </motion.div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Decorative Gradient */}
                      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </motion.div>
                  </motion.div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden w-[calc(50%-4rem)] lg:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -right-48 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-48 bottom-0 h-[400px] w-[400px] rounded-full bg-chart-2/5 blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>
    </section>
  );
};

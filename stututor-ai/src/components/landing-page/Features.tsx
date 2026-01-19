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

export const Features = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Everything you need to excel
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful AI-driven tools designed to accelerate your learning
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const sizeClasses = {
                small: 'lg:col-span-1',
                medium: 'sm:col-span-2 lg:col-span-2',
                large: 'sm:col-span-2',
              };

              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 ${sizeClasses[feature.size as keyof typeof sizeClasses]}`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
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
                  <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-chart-3/5 blur-[100px]"></div>
      </div>
    </section>
  );
};

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, MessageCircle, GraduationCap } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Upload Your PDF',
    description: 'Simply drag and drop your PDF or select it from your device. We support documents up to 10MB.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: 2,
    icon: MessageCircle,
    title: 'Ask Questions',
    description: 'Chat with your AI tutor about the document. Ask anything and get instant, intelligent responses.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: 3,
    icon: GraduationCap,
    title: 'Learn & Master',
    description: 'Get summaries, study notes, practice questions, and deep insights to master your material.',
    color: 'from-green-500 to-green-600',
  },
];

export const HowItWorks = () => {
  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start Learning in 3 Simple Steps
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Get started in seconds and unlock the full potential of AI-powered learning
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector Line (hidden on mobile) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent md:block" />
                  )}

                  <Card className="relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="p-6">
                      {/* Step Number Badge */}
                      <div className="mb-4 flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="h-8 w-8 rounded-full p-0 text-center text-sm font-bold"
                        >
                          {step.number}
                        </Badge>
                        <div
                          className={`rounded-lg bg-gradient-to-br ${step.color} p-2.5 shadow-lg`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="mb-3 text-xl font-bold text-foreground">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>

                    {/* Gradient Accent */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`}
                    />
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3">
              <svg
                className="h-5 w-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-foreground">
                No credit card required • No signup needed • Start learning immediately
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

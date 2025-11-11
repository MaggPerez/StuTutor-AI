import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  BookOpen,
  Lightbulb,
  FileSearch,
  Zap,
  Brain,
  Clock,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Interactive AI Chat',
    description: 'Ask questions about your PDF and get instant, accurate answers powered by advanced AI.',
    badge: 'Core Feature',
  },
  {
    icon: BookOpen,
    title: 'Smart Summaries',
    description: 'Get comprehensive summaries of your entire document or specific sections in seconds.',
    badge: 'Popular',
  },
  {
    icon: Lightbulb,
    title: 'Study Questions',
    description: 'Generate practice questions and quizzes to test your understanding of the material.',
    badge: 'Learning',
  },
  {
    icon: FileSearch,
    title: 'Deep Analysis',
    description: 'AI analyzes your PDF to extract key concepts, themes, and important information.',
    badge: 'AI-Powered',
  },
  {
    icon: Brain,
    title: 'Smart Notes',
    description: 'Automatically create organized study notes with key points and takeaways.',
    badge: 'Productivity',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get answers and insights in real-time without waiting. Fast and efficient.',
    badge: 'Performance',
  },
  {
    icon: Clock,
    title: 'Chat History',
    description: 'Access all your previous conversations and PDFs anytime. Never lose your work.',
    badge: 'Convenience',
  },
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Your PDFs and conversations are stored securely with enterprise-grade encryption.',
    badge: 'Security',
  },
];

export const Features = () => {
  return (
    <div className="bg-accent/30 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Master Your PDFs
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Powerful AI features designed to help you learn faster and understand better
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Hover Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            And many more features to enhance your learning experience
          </p>
        </div>
      </div>
    </div>
  );
};
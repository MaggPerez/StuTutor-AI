'use client';

import { 
  Brain, 
  FileText, 
  Sparkles, 
  Zap, 
  Layout, 
  Clock 
} from 'lucide-react';

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to excel
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform turns your static documents into dynamic learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Large Card - Main Feature */}
          <div className="md:col-span-2 row-span-2 group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain className="w-64 h-64" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Context-Aware Intelligence</h3>
                <p className="text-muted-foreground max-w-md">
                  Unlike generic chatbots, StuTutor deeply understands your specific course materials. It connects concepts across different lectures and textbooks to give you a comprehensive answer.
                </p>
              </div>
              <div className="bg-muted/50 rounded-2xl p-4 mt-8 border border-border/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm font-medium">AI Analysis</div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-foreground/10 rounded-full" />
                  <div className="h-2 w-5/6 bg-foreground/10 rounded-full" />
                  <div className="h-2 w-4/6 bg-foreground/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Tall Card */}
          <div className="md:col-span-1 row-span-2 group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
             <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="w-48 h-48" />
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Summaries</h3>
              <p className="text-muted-foreground mb-8">
                Get the gist of 100-page readings in seconds. Bullet points, key takeaways, and action items.
              </p>
              
              <div className="mt-auto space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div className="space-y-1.5 w-full">
                      <div className="h-1.5 w-3/4 bg-foreground/10 rounded-full" />
                      <div className="h-1.5 w-full bg-foreground/10 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold">Quiz Generation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Turn any topic into a practice test instantly to check your knowledge retention.
            </p>
          </div>

          {/* Small Card 2 */}
          <div className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold">24/7 Availability</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Study at your own pace, anytime. Your AI tutor never sleeps or gets tired.
            </p>
          </div>

          {/* Small Card 3 */}
          <div className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 hover:shadow-xl transition-all duration-300">
             <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Layout className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold">Organized Dashboard</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Keep all your courses, notes, and chat history in one clean, searchable place.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

'use client';

import * as React from 'react';
import { 
  Brain, 
  FileText, 
  Sparkles, 
  Zap, 
  Layout, 
  Clock,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Features = () => {
  // State for AI Analysis
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

  const handleAnalyze = () => {
    if (isAnalyzing || showResult) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  // State for Instant Summaries
  const [isSummarizing, setIsSummarizing] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);

  const handleSummarize = () => {
    if (isSummarizing || showSummary) return;
    setIsSummarizing(true);
    setTimeout(() => {
      setIsSummarizing(false);
      setShowSummary(true);
    }, 2000);
  };

  return (
    <section id="features" className="min-h-screen flex flex-col justify-center py-24 bg-muted/30">
      <div className="container mx-auto px-4 h-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to excel
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform turns your static documents into dynamic learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr h-full">
          
          {/* Large Card - Main Feature */}
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Brain className="w-64 h-64" />
            </div>
            <div className="relative z-10 flex-1 flex flex-col">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Context-Aware Intelligence</h3>
                <p className="text-muted-foreground max-w-md">
                  Unlike generic chatbots, StuTutor deeply understands your specific course materials. It connects concepts across different lectures and textbooks to give you a comprehensive answer.
                </p>
              </div>

              {/* Interactive AI Analysis Demo */}
              <div className="mt-auto pt-8">
                <div className="bg-muted/50 rounded-2xl p-6 border border-border/50 backdrop-blur-sm shadow-sm relative overflow-hidden">
                  
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-medium">AI Analysis</div>
                    </div>
                    {!showResult && !isAnalyzing && (
                      <Button 
                        size="sm" 
                        onClick={handleAnalyze} 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                      >
                        Analyze Document
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3 min-h-[80px] flex flex-col justify-center">
                    {!isAnalyzing && !showResult && (
                      <div className="space-y-2 opacity-50">
                        <div className="h-2 w-full bg-foreground/10 rounded-full" />
                        <div className="h-2 w-5/6 bg-foreground/10 rounded-full" />
                        <div className="h-2 w-4/6 bg-foreground/10 rounded-full" />
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="flex flex-col items-center justify-center py-2 text-primary animate-pulse">
                        <Loader2 className="w-6 h-6 animate-spin mb-2" />
                        <span className="text-xs font-medium">Analyzing patterns...</span>
                      </div>
                    )}

                    {showResult && (
                      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex gap-2 mb-2">
                           <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Key Concept Detected</span>
                           <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">High Importance</span>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          "The text emphasizes <span className="font-semibold text-primary">Neural Plasticity</span> as the mechanism for learning. It correlates with Chapter 3's discussion on synaptic efficacy."
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Decorative glow for result */}
                  {showResult && (
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-in fade-in duration-1000" />
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Tall Card - Instant Summaries */}
          <div className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
             {/* Fixed background icon position */}
             <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <FileText className="w-64 h-64 transform rotate-12" />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                {!showSummary && !isSummarizing && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleSummarize}
                    className="h-8 text-xs border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-900 dark:hover:bg-blue-950/50"
                  >
                    Summarize
                  </Button>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">Instant Summaries</h3>
              <p className="text-muted-foreground mb-8">
                Get the gist of 100-page readings in seconds. Bullet points, key takeaways, and action items.
              </p>
              
              <div className="mt-auto space-y-4 min-h-[160px] flex flex-col justify-end">
                
                {/* Default Skeleton State */}
                {!isSummarizing && !showSummary && (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/30 backdrop-blur-sm transition-transform hover:scale-105 duration-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <div className="space-y-2 w-full">
                          <div className="h-1.5 w-3/4 bg-foreground/10 rounded-full" />
                          <div className="h-1.5 w-full bg-foreground/10 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Loading State */}
                {isSummarizing && (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-blue-500 animate-pulse">
                    <Loader2 className="w-8 h-8 animate-spin mb-3" />
                    <span className="text-sm font-medium">Generating summary...</span>
                  </div>
                )}

                {/* Result State */}
                {showSummary && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-3">
                    <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                         <p className="text-sm text-foreground/90">
                           <span className="font-semibold text-blue-600 dark:text-blue-400">Core Thesis:</span> The industrial revolution shifted global economic power.
                         </p>
                      </div>
                    </div>
                     <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                         <p className="text-sm text-foreground/90">
                           <span className="font-semibold text-blue-600 dark:text-blue-400">Key Date:</span> 1760 - 1840 marked the transition period.
                         </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                         <p className="text-sm text-foreground/90">
                           <span className="font-semibold text-blue-600 dark:text-blue-400">Impact:</span> Standard of living increased consistently for the first time.
                         </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Bottom Row - Smaller Cards balanced to take remaining height if needed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:col-span-3">
            
            {/* Small Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-center min-h-[180px]">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold">Quiz Generation</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Turn any topic into a practice test instantly to check your knowledge retention before exams.
              </p>
            </div>

            {/* Small Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-center min-h-[180px]">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-lg font-bold">24/7 Availability</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Study at your own pace, anytime. Your AI tutor never sleeps, ensuring help is always a click away.
              </p>
            </div>

            {/* Small Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-center min-h-[180px]">
               <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                  <Layout className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold">Organized Dashboard</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Keep all your courses, notes, and chat history in one clean, searchable place for easy access.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

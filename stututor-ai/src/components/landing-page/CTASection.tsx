"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

export function CTASection() {
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} className="py-32 px-6 md:px-16 w-full flex justify-center items-center bg-background border-t border-border/10">
      <div className="max-w-4xl w-full flex flex-col items-center text-center cta-content">
        <div className="mb-6 animate-pulse inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>

        <h2 className="font-sans font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
          Ready to accelerate?
        </h2>

        <p className="font-serif italic text-muted-foreground text-xl md:text-2xl mb-12 max-w-2xl text-center">
          Join the centralized academic hub and let the intelligent protocol automate your workflow.
        </p>

        {/* Massive CTA Button */}
        <button className="magnetic-btn relative overflow-hidden bg-primary text-primary-foreground font-sans font-semibold text-lg md:text-xl px-12 py-6 rounded-[3rem] w-full sm:w-auto shadow-[0_0_30px_-5px_var(--primary)] group">
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10 flex items-center gap-2">
            Get started by signing up
          </span>
        </button>
      </div>
    </section>
  );
}

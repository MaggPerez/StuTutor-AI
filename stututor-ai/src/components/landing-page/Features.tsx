"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MousePointer2, Settings, DownloadCloud } from "lucide-react";

// --- Sub-components for Cards ---

function DiagnosticShuffler() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState([
    { id: 1, title: "Course Hub", desc: "Syllabi & Materials" },
    { id: 2, title: "Assignment Tracker", desc: "Deadlines sync" },
    { id: 3, title: "Lecture Vault", desc: "Audio & Notes" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center translate-y-4">
      {cards.map((card, i) => {
        const isTop = i === 0;
        const isMiddle = i === 1;
        const isBottom = i === 2;

        return (
          <div
            key={card.id}
            className="absolute w-64 p-4 rounded-xl border border-border bg-card shadow-lg flex flex-col gap-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              zIndex: 3 - i,
              transform: `translateY(${i * 12}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.2,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Settings className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-foreground">{card.title}</h4>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">{card.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TelemetryTypewriter() {
  const [text, setText] = useState("");
  const fullText = "> Generating quiz from Lecture 4...\n> Extracting key terms...\n> Action: Flashcards prepared.\n> Ready for review.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          index = 0;
        }, 5000); // Wait and then could restart, but keeping it simple
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48 bg-background/50 rounded-xl p-4 font-mono text-xs sm:text-sm text-muted-foreground border border-border/50 relative overflow-hidden flex flex-col justify-end">
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] uppercase tracking-wider text-primary">Live AI Feed</span>
      </div>
      <div className="whitespace-pre-wrap mt-8">
        {text}
        <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle" />
      </div>
    </div>
  );
}

function CursorScheduler() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Reset
      tl.set(".custom-cursor", { x: 0, y: 0, scale: 1, opacity: 0 });
      tl.set(".day-cell", { backgroundColor: "transparent", color: "var(--muted-foreground)" });
      tl.set(".save-btn-sim", { scale: 1 });

      // Animate Cursor Entry
      tl.to(".custom-cursor", { opacity: 1, duration: 0.3 })
        .to(".custom-cursor", { x: 100, y: 40, duration: 1, ease: "power2.inOut" })

        // Click action
        .to(".custom-cursor", { scale: 0.8, duration: 0.1 })
        .to(".day-cell.target-day", { backgroundColor: "var(--primary)", color: "var(--primary-foreground)", duration: 0.2 }, "-=0.1")
        .to(".custom-cursor", { scale: 1, duration: 0.1 })

        // Move to Save
        .to(".custom-cursor", { x: 100, y: 100, duration: 1, ease: "power2.inOut", delay: 0.2 })

        // Click Save
        .to(".custom-cursor", { scale: 0.8, duration: 0.1 })
        .to(".save-btn-sim", { scale: 0.95, duration: 0.1 }, "-=0.1")
        .to(".custom-cursor", { scale: 1, duration: 0.1 })
        .to(".save-btn-sim", { scale: 1, duration: 0.1 })

        // Exit
        .to(".custom-cursor", { opacity: 0, duration: 0.3, delay: 0.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div ref={containerRef} className="relative w-full h-48 bg-background/30 rounded-xl p-4 flex flex-col items-center justify-center overflow-hidden border border-border/50">
      <div className="flex gap-2 relative z-10 block">
        {days.map((d, i) => (
          <div key={i} className={`day-cell w-8 h-8 rounded-md border border-border flex items-center justify-center font-mono text-xs ${i === 2 ? "target-day" : ""}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="mt-8 save-btn-sim px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-sans font-medium relative z-10 border border-border block">
        Generate Path
      </div>

      {/* Animated Cursor */}
      <div className="custom-cursor absolute top-4 left-4 z-20 pointer-events-none drop-shadow-md">
        <MousePointer2 className="w-6 h-6 text-foreground fill-foreground/20" />
      </div>
    </div>
  );
}

// --- Main Feature Section ---

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Card 1 */}
        <div className="feature-card bg-card border border-border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between overflow-hidden">
          <div className="mb-8">
            <h3 className="font-sans font-bold text-xl md:text-2xl text-foreground mb-2">Centralized Hub</h3>
            <p className="font-serif text-muted-foreground text-lg italic">A unified space for your college journey.</p>
          </div>
          <DiagnosticShuffler />
        </div>

        {/* Card 2 */}
        <div className="feature-card bg-card border border-border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between overflow-hidden">
          <div className="mb-8">
            <h3 className="font-sans font-bold text-xl md:text-2xl text-foreground mb-2">AI Document Tools</h3>
            <p className="font-serif text-muted-foreground text-lg italic">Generate quizzes, notes, & flashcards instantly.</p>
          </div>
          <TelemetryTypewriter />
        </div>

        {/* Card 3 */}
        <div className="feature-card bg-card border border-border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between overflow-hidden">
          <div className="mb-8">
            <h3 className="font-sans font-bold text-xl md:text-2xl text-foreground mb-2">Adaptive Roadmaps</h3>
            <p className="font-serif text-muted-foreground text-lg italic">Intelligent scheduling tailored to your courses.</p>
          </div>
          <CursorScheduler />
        </div>

      </div>
    </section>
  );
}

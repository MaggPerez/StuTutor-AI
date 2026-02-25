"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2, // slight delay for load
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden"
    >
      {/* Background with Dark Water/Architectural Shadows Theme */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940&auto=format&fit=crop"
          alt="Dark architectural geometry"
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Hero Content pushed to bottom-left */}
      <div className="max-w-4xl z-10">
        <h1 className="flex flex-col gap-2 mb-8">
          <span className="hero-element font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            Intelligence beyond
          </span>
          <span className="hero-element text-drama text-primary text-6xl md:text-8xl lg:text-9xl mt-2">
            the classroom.
          </span>
        </h1>

        <p className="hero-element font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          The centralized college productivity app where users can manage their courses and school material with an AI suite built for modern academia.
        </p>

        <div className="hero-element flex flex-col sm:flex-row items-center gap-4">
          <button className="magnetic-btn relative overflow-hidden bg-primary text-primary-foreground font-sans font-medium px-8 py-4 rounded-[2rem] w-full sm:w-auto text-lg group">
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10">Get started by signing up</span>
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Sparkles, Menu } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Morphing Logic: start transparent, become glassmorphic on scroll
            ScrollTrigger.create({
                start: "top -50",
                end: 99999,
                toggleClass: {
                    targets: navRef.current,
                    className: "scrolled-nav",
                },
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl rounded-[2rem] px-6 py-4 flex items-center justify-between transition-all duration-300 border border-transparent
        data-[scrolled=true]:bg-background/60 data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:border-border/50 data-[scrolled=true]:shadow-lg"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
        .scrolled-nav {
          background-color: color-mix(in srgb, var(--background) 60%, transparent);
          backdrop-filter: blur(16px);
          border-color: var(--border);
          box-shadow: var(--shadow-md);
        }
        .scrolled-nav .brand-text {
          color: var(--primary);
        }
      `}} />
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="brand-text font-sans font-bold text-xl tracking-tight transition-colors duration-300 text-foreground">
                    StuTutor
                </span>
            </div>

            <div className="hidden md:flex items-center gap-8 font-mono text-sm text-muted-foreground">
                <Link href="#features" className="hover:text-primary transition-colors smooth-transition hover:-translate-y-[1px]">Platform</Link>
                <Link href="#philosophy" className="hover:text-primary transition-colors smooth-transition hover:-translate-y-[1px]">Methodology</Link>
                <Link href="#protocol" className="hover:text-primary transition-colors smooth-transition hover:-translate-y-[1px]">Protocol</Link>
            </div>

            <div className="flex items-center gap-4">
                <button className="magnetic-btn relative overflow-hidden bg-primary text-primary-foreground font-sans font-medium px-6 py-2 rounded-[2rem] group hidden md:block">
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <span className="relative z-10">Get Started</span>
                </button>
                <button className="md:hidden text-foreground">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}

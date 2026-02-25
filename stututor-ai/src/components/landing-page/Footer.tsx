"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#05050A] rounded-t-[4rem] text-muted-foreground px-6 py-16 md:px-16 md:py-24 mt-0 border-t border-border/10 relative overflow-hidden">

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 relative z-10 block">

        {/* Brand Area */}
        <div className="md:col-span-2 flex flex-col justify-between items-start h-full">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-sans font-bold text-2xl text-foreground">StuTutor</span>
            </div>
            <p className="font-serif italic text-lg max-w-sm mb-8">
              Intelligence beyond the classroom. The centralized college productivity app.
            </p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 bg-card/30 border border-border/30 rounded-full px-4 py-2 mt-auto">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="font-mono text-xs text-foreground/80 tracking-widest uppercase">System Operational</span>
          </div>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-foreground font-semibold mb-2">Platform</h4>
          <Link href="#features" className="hover:text-primary transition-colors hover:translate-y-[-1px] max-w-fit">Features</Link>
          <Link href="#philosophy" className="hover:text-primary transition-colors hover:translate-y-[-1px] max-w-fit">Methodology</Link>
          <Link href="#protocol" className="hover:text-primary transition-colors hover:translate-y-[-1px] max-w-fit">Protocol</Link>
          <Link href="#" className="hover:text-primary transition-colors hover:translate-y-[-1px] max-w-fit">Pricing</Link>
        </div>

        {/* Legal / Socials */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-foreground font-semibold mb-2">Legal Docs</h4>
          <Link href="#" className="hover:text-primary transition-colors hover:translate-y-[-1px] max-w-fit">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors hover:translate-y-[-1px] max-w-fit">Terms of Service</Link>
          <Link href="#" className="hover:text-primary transition-colors hover:translate-y-[-1px] max-w-fit">Data Security</Link>

          <div className="mt-8 text-xs font-mono opacity-50">
            &copy; {new Date().getFullYear()} StuTutor. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

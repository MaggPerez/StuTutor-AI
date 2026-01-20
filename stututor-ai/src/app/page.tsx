'use client';

import * as React from 'react';
import { LandingNavbar } from '@/components/landing-page/Navbar';
import { Hero } from '@/components/landing-page/Hero';
import { CollegeTools } from '@/components/landing-page/CollegeTools';
import { Features } from '@/components/landing-page/Features';
import { HowItWorks } from '@/components/landing-page/HowItWorks';
import { CTA } from '@/components/landing-page/CTA';
import { Footer } from '@/components/landing-page/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <LandingNavbar />
      <main className="flex-1">
        <Hero />
        <CollegeTools />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
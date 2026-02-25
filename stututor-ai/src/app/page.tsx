import { Navbar } from '@/components/landing-page/Navbar';
import { Hero } from '@/components/landing-page/Hero';
import { Features } from '@/components/landing-page/Features';
import { Philosophy } from '@/components/landing-page/Philosophy';
import { Protocol } from '@/components/landing-page/Protocol';
import { CTASection } from '@/components/landing-page/CTASection';
import { Footer } from '@/components/landing-page/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <CTASection />
      <Footer />
    </div>
  );
}

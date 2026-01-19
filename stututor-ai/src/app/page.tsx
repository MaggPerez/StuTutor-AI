import { Hero } from '@/components/landing-page/Hero';
import { HowItWorks } from '@/components/landing-page/HowItWorks';
import { Features } from '@/components/landing-page/Features';
import { CTASection } from '@/components/landing-page/CTASection';
import { Footer } from '@/components/landing-page/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}

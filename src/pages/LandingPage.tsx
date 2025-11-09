import { Hero } from '@/components/landing/Hero';
import { UploadSection } from '@/components/landing/UploadSection';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <UploadSection />
      <Features />
    </div>
  );
};

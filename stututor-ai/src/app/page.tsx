import React from 'react'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/landing-page/Hero'
import { Features } from '@/components/landing-page/Features'
import { HowItWorks } from '@/components/landing-page/HowItWorks'


export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      {/* <UploadSection /> */}
      <Features />
    </div>
  )
}

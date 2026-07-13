import React from 'react'
import HeroSection from './HeroSection'
import CompanyLogoCarousel from './CompanyLogoCarousel'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <CompanyLogoCarousel />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default LandingPage

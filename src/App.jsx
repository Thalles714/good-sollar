import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import HeroSection from './components/sections/HeroSection'
import BenefitsSection from './components/sections/BenefitsSection'
import ServicesSection from './components/sections/ServicesSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import AboutSection from './components/sections/AboutSection'
import DifferentiatorsSection from './components/sections/DifferentiatorsSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ServicesSection />
        <HowItWorksSection />
        <AboutSection />
        <DifferentiatorsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

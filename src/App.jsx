import useMotionReady from './hooks/useMotionReady'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import HeroSection from './components/sections/HeroSection'
import PorqueSolarSection from './components/sections/PorqueSolarSection'
import ServicesSection from './components/sections/ServicesSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import AboutSection from './components/sections/AboutSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  useMotionReady()

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary-800 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo-principal">
        <HeroSection />
        <PorqueSolarSection />
        <ServicesSection />
        <HowItWorksSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

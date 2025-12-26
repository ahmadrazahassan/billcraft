'use client'

import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { TemplatesShowcase } from '@/components/landing/templates-showcase'
import { Pricing } from '@/components/landing/pricing'
import { Testimonials } from '@/components/landing/testimonials'
import { FAQ } from '@/components/landing/faq'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { user, loading, mounted } = useAuth()
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Ultra perfect authentication logic for homepage
  useEffect(() => {
    // Only redirect if we're sure about auth state (not loading and mounted)
    if (mounted && !loading && user) {
      // If user is logged in and visits homepage, don't auto-redirect
      // Let them stay on homepage but header will show Dashboard button
      // This gives users choice and better UX
    }
  }, [user, loading, mounted, router])

  // Show loading state while checking authentication
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <motion.div 
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <p className="text-slate-600 font-medium">Loading BillCraft...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Smooth scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />
      
      <main className="relative">
        {/* Hero - No transition wrapper */}
        <Hero />

        {/* Features - No transition wrapper for instant scrolling */}
        <Features />

        {/* Templates - No transition wrapper for instant scrolling */}
        <TemplatesShowcase />

        {/* Pricing - No transition wrapper for instant scrolling */}
        <Pricing />

        {/* Testimonials - No transition wrapper for instant scrolling */}
        <Testimonials />

        {/* FAQ - No transition wrapper for instant scrolling */}
        <FAQ />
      </main>
      
      {/* Footer - No transition wrapper for instant scrolling */}
      <Footer />
    </div>
  )
} 
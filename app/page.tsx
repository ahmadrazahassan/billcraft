'use client'

import { useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { TemplatesShowcase } from '@/components/landing/templates-showcase'
import { Pricing } from '@/components/landing/pricing'
import { Testimonials } from '@/components/landing/testimonials'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { LenisProvider } from '@/components/lenis-provider'
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
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="w-3 h-3 bg-blue-500 rounded-full"
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
    <LenisProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Smooth scroll progress indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-50 origin-left"
          style={{ scaleX }}
        />
        
        {/* Background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-secondary/30 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/10 rounded-full animate-pulse delay-2000" />
          <div className="absolute top-1/2 right-10 w-2 h-2 bg-secondary/20 rounded-full animate-pulse delay-500" />
          <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary/30 rounded-full animate-pulse delay-1500" />
        </div>

        <Header />
        
        <main className="relative">
          {/* Hero with enhanced animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Hero />
          </motion.div>

          {/* Features with scroll animations */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Features />
          </motion.div>

          {/* Templates with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
          <TemplatesShowcase />
          </motion.div>

          {/* Pricing with scale animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
          <Pricing />
          </motion.div>

          {/* Testimonials with slide animation */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
          <Testimonials />
        </motion.div>
      </main>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
      <Footer />
        </motion.div>
    </div>
    </LenisProvider>
  )
} 
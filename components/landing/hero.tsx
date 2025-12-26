'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText } from 'lucide-react'
import { useRef } from 'react'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 md:pt-24 lg:pt-28"
    >
      {/* Enhanced animated background elements */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/8 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-primary/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      <div className="container mx-auto container-padding relative z-10 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8 mt-4 md:mt-6 lg:mt-8">
              {/* Main Headline with enhanced animations */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="space-y-6"
              >
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight">
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="inline-block"
                  >
                  Professional
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-primary relative inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Invoice
                    <motion.svg 
                      className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" 
                      viewBox="0 0 100 10" 
                      preserveAspectRatio="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 1.0, ease: "easeInOut" }}
                    >
                      <motion.path 
                        d="M0,8 Q50,0 100,8" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        fill="none"
                      />
                    </motion.svg>
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 bg-primary/40 rounded-full"
                      animate={{ 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: 2
                      }}
                    />
                  </motion.span>
            <br />
                  <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="inline-block"
                  >
                  Generation
                  </motion.span>
            <br />
                  <motion.span 
                    className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
            Made Simple
                  </motion.span>
                </h1>
              </motion.div>

                        {/* 3-Month Free Trial Highlight with enhanced animation */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 1.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div 
                  className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.15) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.25)'
                  }}
                >
                  <div className="flex items-center justify-center lg:justify-start space-x-4 mb-3">
                    <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-2.5">
                      <span className="text-orange-600 font-bold text-xl">3M</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Free Trial</h3>
                      <p className="text-orange-600 text-sm font-medium">Full Professional Access</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">$45 Value</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">No Credit Card</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">Instant Access</span>
                    </div>
                  </div>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                 
                </p>
              </motion.div>



          {/* CTA Buttons with stagger animation */}
          <motion.div
                initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                  className="btn-primary px-8 py-4 text-lg font-medium group shadow-lg hover:shadow-xl transform transition-all duration-200 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Get 3-Month Free Trial</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
              </Button>
            </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                <Link href="/pricing">
              <Button 
                    variant="outline" 
                size="lg" 
                    className="px-8 py-4 text-lg font-medium border-2 border-foreground/20 hover:border-primary bg-white/80 hover:bg-white hover:text-primary backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                    <FileText className="mr-2 h-5 w-5" />
                    View Pricing
              </Button>
            </Link>
            </motion.div>
          </motion.div>

              {/* Modern Companies Section with stagger */}
          <motion.div
                initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.9 }}
                className="pt-6"
              >
                <p className="text-xs text-muted-foreground mb-4 text-center lg:text-left uppercase tracking-wider font-medium">
                  Trusted by Industry Leaders
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 items-center opacity-70">
                  {[
                    { name: 'Google', icon: 'G', gradient: 'from-blue-500 to-red-500' },
                    { name: 'Microsoft', icon: 'M', gradient: 'from-blue-600 to-blue-800' },
                    { name: 'Shopify', icon: 'S', gradient: 'from-green-500 to-green-700' },
                    { name: 'Stripe', icon: 'S', gradient: 'from-purple-600 to-indigo-600' },
                    { name: 'Adobe', icon: 'A', gradient: 'from-red-600 to-red-800' }
                  ].map((company, index) => (
                    <motion.div
                      key={company.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 2.1 + index * 0.1 }}
                      className="flex flex-col items-center space-y-2 group cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div 
                        className={`w-10 h-10 bg-gradient-to-br ${company.gradient} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200`}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 10,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <span className="text-white font-bold text-sm">{company.icon}</span>
                      </motion.div>
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{company.name}</span>
                    </motion.div>
                  ))}
              </div>
              </motion.div>
            </div>
            
            {/* Right Content - Enhanced Invoice Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative">
                {/* Main featured invoice mockup with advanced animations */}
                <motion.div 
                  className="professional-card p-8 bg-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 0,
                    transition: { duration: 0.3 }
                  }}
                  initial={{ rotate: 5, scale: 0.9 }}
                  animate={{ rotate: 2, scale: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ 
                      duration: 2,
                      delay: 2.5,
                      ease: "linear"
                    }}
                  />
                  <div className="space-y-6">
                    {/* Header with stagger animations */}
                    <div className="flex justify-between items-start relative z-10">
                      <div className="space-y-2">
                        <motion.div 
                          className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.6, delay: 2.0 }}
                          whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                        >
                          <FileText className="h-6 w-6 text-white" />
                        </motion.div>
                        <motion.h3 
                          className="font-semibold text-lg text-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 2.2 }}
                        >
                          BillCraft Invoice
                        </motion.h3>
                        <motion.p 
                          className="text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 2.4 }}
                        >
                          #INV-2024-001
                        </motion.p>
                      </div>
                      <div className="text-right">
                        <motion.h2 
                          className="text-3xl font-bold text-primary"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 2.1 }}
                        >
                          INVOICE
                        </motion.h2>
                        <motion.div 
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-2xl text-xs font-medium mt-2 inline-block"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 2.6 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          ● Paid
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Client Info with skeleton animations */}
                    <div className="space-y-3 py-4 border-y border-border/50 relative z-10">
                      {[3/4, 1/2, 2/3].map((width, index) => (
                        <motion.div 
                          key={index}
                          className="h-3 bg-gray-200 rounded-full"
                          style={{ width: `${width * 100}%` }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 2.8 + index * 0.1 }}
                        />
                      ))}
                    </div>
                    
                    {/* Invoice Items with stagger */}
                    <div className="space-y-4 relative z-10">
                      {[
                        { service: 'Design Service', amount: '$1,250.00' },
                        { service: 'Consultation', amount: '$500.00' }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex justify-between items-center py-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 3.1 + index * 0.2 }}
                        >
                          <span className="text-muted-foreground">{item.service}</span>
                          <span className="font-semibold">{item.amount}</span>
                        </motion.div>
                      ))}
                      <motion.div 
                        className="border-t border-border pt-4 flex justify-between items-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 3.5 }}
                      >
                        <span className="font-bold text-xl">Total</span>
                        <motion.span 
                          className="font-bold text-2xl text-primary"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 3.7 }}
                        >
                          $1,750.00
                        </motion.span>
                      </motion.div>
            </div>
            
                    {/* Payment Status */}
                    <motion.div 
                      className="text-center pt-2 relative z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 3.9 }}
                    >
                      <div className="text-xs text-muted-foreground">Payment received • Thank you!</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            </div>
        </div>
      </div>
    </section>
  )
} 
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, FileText } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 md:pt-24 lg:pt-28">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-primary/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto container-padding relative z-10 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8 mt-4 md:mt-6 lg:mt-8">
              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6"
              >
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight">
                  Professional
                  <br />
                  <span className="text-primary relative">
                    Invoice
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </span>
            <br />
                  Generation
            <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
            Made Simple
                  </span>
                </h1>
              </motion.div>

                        {/* 3-Month Free Trial Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
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



          {/* CTA Buttons */}
          <motion.div
                initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                    className="btn-primary px-8 py-4 text-lg font-medium group shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                    Get 3-Month Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
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

              {/* Modern Companies Section */}
          <motion.div
                initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pt-6"
              >
                <p className="text-xs text-muted-foreground mb-4 text-center lg:text-left uppercase tracking-wider font-medium">
                  Trusted by Industry Leaders
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 items-center opacity-70">
                  {/* Google */}
                  <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">G</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Google</span>
                  </div>
                  
                  {/* Microsoft */}
                  <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Microsoft</span>
                  </div>
                  
                  {/* Shopify */}
                  <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Shopify</span>
                  </div>
                  
                  {/* Stripe */}
                  <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Stripe</span>
                  </div>
                  
                  {/* Adobe */}
                  <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">Adobe</span>
                  </div>
              </div>
              </motion.div>
            </div>
            
            {/* Right Content - Clean Invoice Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative">
                {/* Main featured invoice mockup */}
                <motion.div 
                  className="professional-card p-8 bg-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg text-foreground">BillCraft Invoice</h3>
                        <p className="text-sm text-muted-foreground">#INV-2024-001</p>
                      </div>
                      <div className="text-right">
                        <h2 className="text-3xl font-bold text-primary">INVOICE</h2>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-2xl text-xs font-medium mt-2">
                          ● Paid
                        </div>
                      </div>
                    </div>
                    
                    {/* Client Info */}
                    <div className="space-y-3 py-4 border-y border-border/50">
                      <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-2/3"></div>
                    </div>
                    
                    {/* Invoice Items */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Design Service</span>
                        <span className="font-semibold">$1,250.00</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Consultation</span>
                        <span className="font-semibold">$500.00</span>
                      </div>
                      <div className="border-t border-border pt-4 flex justify-between items-center">
                        <span className="font-bold text-xl">Total</span>
                        <span className="font-bold text-2xl text-primary">$1,750.00</span>
              </div>
            </div>
            
                    {/* Payment Status */}
                    <div className="text-center pt-2">
                      <div className="text-xs text-muted-foreground">Payment received • Thank you!</div>
                    </div>
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
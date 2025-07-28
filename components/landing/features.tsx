'use client'

import { motion } from 'framer-motion'
import { Bot, Clock, Download, Shield, Globe, Smartphone } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'Smart Templates',
    description: 'Choose from beautiful, professional invoice templates designed to impress your clients and get you paid faster.',
    color: 'text-primary'
  },
  {
    icon: Clock,
    title: 'Lightning Fast',
    description: 'Create professional invoices in under 30 seconds. Our streamlined interface gets you paid faster.',
    color: 'text-secondary'
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description: 'Export beautiful, print-ready PDF invoices with your branding. Compatible with all accounting software.',
    color: 'text-primary'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Bank-level security with 99.9% uptime. Your data is encrypted and backed up automatically.',
    color: 'text-secondary'
  },
  {
    icon: Globe,
    title: 'Multi-Currency Support',
    description: 'Work with clients worldwide. Support for 50+ currencies with real-time exchange rates.',
    color: 'text-primary'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Create and manage invoices on any device. Fully responsive design that works everywhere.',
    color: 'text-secondary'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <br />
              <span className="text-primary">Manage Invoices</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to simplify your billing process and help you get paid faster.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-8 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-white/50 ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to streamline your invoicing?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of businesses already using BillCraft to manage their invoices efficiently.
              </p>
              <motion.a
                href="/auth/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
              >
                Start 3-Month Free Trial
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
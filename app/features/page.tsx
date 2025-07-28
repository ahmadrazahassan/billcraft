'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Bot, Clock, Download, Shield, Globe, Smartphone, Zap, Users, BarChart3, FileCheck, CreditCard, Bell } from 'lucide-react'

const mainFeatures = [
  {
    icon: Bot,
    title: 'Professional Invoice Generation',
    description: 'Generate professional invoices instantly with beautiful templates. Intuitive interface helps you create polished invoices with client information, pricing, and details in minutes.',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: Clock,
    title: 'Lightning Fast Creation',
    description: 'Create beautiful invoices in under 30 seconds. Our streamlined interface and smart design ensure you get paid faster than ever before.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description: 'Export stunning, print-ready PDF invoices with your custom branding. Compatible with all accounting software and payment systems.',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  }
]

const additionalFeatures = [
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your data is protected with enterprise-grade encryption and 99.9% uptime guarantee.',
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
  },
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'Set up automatic reminders, recurring invoices, and payment notifications.',
    color: 'text-primary'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite team members, assign roles, and collaborate on invoices seamlessly.',
    color: 'text-secondary'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track your business performance with detailed reports and insights.',
    color: 'text-primary'
  },
  {
    icon: FileCheck,
    title: 'Custom Branding',
    description: 'Add your logo, colors, and business information to create professional invoices that match your brand.',
    color: 'text-secondary'
  },
  {
    icon: CreditCard,
    title: 'Payment Integration',
    description: 'Accept payments directly through invoices with Stripe, PayPal, and more.',
    color: 'text-primary'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Stay informed with real-time notifications for payments, overdue invoices, and more.',
    color: 'text-secondary'
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Powerful Features for
                <br />
                <span className="text-primary">Modern Businesses</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Everything you need to create, send, and manage professional invoices. 
                Built for freelancers, small businesses, and growing enterprises.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {mainFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-card p-8 text-center group hover:shadow-2xl transition-all duration-300"
                    >
                      <div className={`inline-flex p-4 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-8 w-8 ${feature.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-20 relative">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Complete Invoice
                  <br />
                  <span className="text-secondary">Management Suite</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From creation to payment, we&apos;ve got every aspect of your invoicing workflow covered.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="glass-card p-6 group hover:shadow-xl transition-all duration-300"
                    >
                      <div className={`inline-flex p-3 rounded-xl bg-white/50 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center glass-card p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Invoicing?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of businesses already using BillCraft to streamline their invoice management.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.a
                  href="/auth/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Start 3-Month Free Trial
                </motion.a>
                <motion.a
                  href="/pricing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-button text-gray-700 hover:text-primary font-semibold rounded-2xl transition-colors"
                >
                  View Pricing
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 
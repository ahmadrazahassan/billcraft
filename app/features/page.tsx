'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Bot, Zap, Shield, Globe, BarChart3, Users, Rocket, Clock, Download, Smartphone, CreditCard, FileCheck, Bell, Brain, Lock, Workflow, TrendingUp, Database, Palette, Eye, ArrowRight, CheckCircle, Award, Target, MessageSquare } from 'lucide-react'

const coreFeatures = [
  {
    icon: Bot,
    title: 'AI-Powered Intelligence',
    description: 'Advanced AI automatically fills invoice details, suggests pricing, and optimizes workflows for maximum efficiency.',
    color: 'bg-blue-500',
    stats: '90% time saved'
  },
  {
    icon: Zap,
    title: 'Lightning Speed',
    description: 'Generate professional invoices in under 15 seconds with instant PDF export and real-time processing.',
    color: 'bg-yellow-500',
    stats: '15 sec generation'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SOC 2 compliance, and advanced security protocols protect your sensitive data.',
    color: 'bg-green-500',
    stats: 'SOC 2 certified'
  },
  {
    icon: Globe,
    title: 'Global Multi-Currency',
    description: 'Support for 150+ currencies with real-time exchange rates and automatic tax calculations.',
    color: 'bg-purple-500',
    stats: '150+ currencies'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights with predictive analytics, cash flow forecasting, and performance metrics.',
    color: 'bg-pink-500',
    stats: 'Real-time insights'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless team features with role-based permissions, real-time collaboration, and activity tracking.',
    color: 'bg-orange-500',
    stats: 'Unlimited users'
  }
]

const advancedFeatures = [
  {
    icon: Clock,
    title: 'Automated Scheduling',
    description: 'Set up recurring invoices, automatic reminders, and payment follow-ups.',
    color: 'bg-emerald-500'
  },
  {
    icon: Download,
    title: 'Professional Export',
    description: 'Export to PDF, Excel, CSV with custom branding and white-label options.',
    color: 'bg-cyan-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Fully responsive mobile app with offline capabilities and push notifications.',
    color: 'bg-indigo-500'
  },
  {
    icon: CreditCard,
    title: 'Payment Integration',
    description: 'Accept payments through Stripe, PayPal, and 20+ other payment gateways.',
    color: 'bg-rose-500'
  },
  {
    icon: FileCheck,
    title: 'Custom Templates',
    description: 'Beautiful invoice templates with drag-and-drop customization and brand matching.',
    color: 'bg-violet-500'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Intelligent notification system with customizable alerts and automation rules.',
    color: 'bg-amber-500'
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'AI learns your business patterns to suggest optimal pricing and terms.',
    color: 'bg-teal-500'
  },
  {
    icon: Lock,
    title: 'Data Protection',
    description: 'GDPR compliant with encrypted storage and secure data processing.',
    color: 'bg-slate-500'
  },
  {
    icon: Workflow,
    title: 'Business Automation',
    description: 'Automate entire workflows from quote to payment with smart triggers.',
    color: 'bg-lime-500'
  }
]

const integrations = [
  {
    name: 'QuickBooks',
    category: 'Accounting',
    description: 'Seamless sync with QuickBooks Online and Desktop',
    logo: '📊'
  },
  {
    name: 'Stripe',
    category: 'Payments',
    description: 'Accept credit cards and online payments instantly',
    logo: '💳'
  },
  {
    name: 'Slack',
    category: 'Communication',
    description: 'Get invoice notifications in your Slack channels',
    logo: '💬'
  },
  {
    name: 'Zapier',
    category: 'Automation',
    description: 'Connect with 5,000+ apps for unlimited automation',
    logo: '⚡'
  },
  {
    name: 'Google Workspace',
    category: 'Productivity',
    description: 'Sync with Google Drive, Calendar, and Gmail',
    logo: '🔗'
  },
  {
    name: 'Salesforce',
    category: 'CRM',
    description: 'Import contacts and sync invoice data automatically',
    logo: '☁️'
  }
]

export default function FeaturesPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 overflow-hidden">
      <Header />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 0.8, 1], rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

        {/* Hero Section */}
      <motion.section style={{ y }} className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
                className="inline-flex items-center justify-center mb-8"
              >
                        <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-full px-8 py-4 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-slate-800 text-lg font-bold">Revolutionary Features</span>
                <Award className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.h1 
            initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-6xl md:text-8xl font-black text-slate-900 mb-8"
              >
            The Future of
                <br />
            <span className="text-blue-600">Invoicing</span>
              </motion.h1>
              
              <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-2xl text-slate-600 mb-12 max-w-4xl mx-auto"
          >
            Experience AI-powered invoicing with real-time analytics.
              </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="/auth/signup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.1, y: -8 }}
              className="px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-full shadow-2xl transition-all duration-300"
                >
                  <span className="flex items-center">
                <Rocket className="w-7 h-7 mr-3" />
                Start Free Trial
                  </span>
            </motion.a>
            <motion.a
              href="/pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.1, y: -8 }}
              className="px-12 py-6 bg-white/80 backdrop-blur-2xl border-2 border-white/30 text-slate-800 text-xl font-bold rounded-full shadow-2xl transition-all duration-300"
                >
                  <span className="flex items-center">
                <Eye className="w-7 h-7 mr-3" />
                    View Pricing
                  </span>
            </motion.a>
          </div>
          </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-black text-center text-slate-900 mb-20"
          >
            Core <span className="text-blue-600">Capabilities</span>
          </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coreFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                  initial={{ opacity: 0, y: 80 }}
                      whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  whileHover={{ y: -20, scale: 1.05 }}
                  className="group"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-700">
                    <motion.div 
                      className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mb-6 shadow-xl`}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                          </motion.div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{feature.description}</p>
                    
                    <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm font-semibold text-slate-700">{feature.stats}</span>
                    </div>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </div>
        </section>

      {/* Advanced Features */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
              <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Advanced <span className="text-emerald-600">Capabilities</span>
                </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional tools for growing businesses with enterprise-grade features.
                </p>
              </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                      className="group"
                    >
                  <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500">
                        <div className="flex items-start space-x-4">
                      <motion.div 
                        className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                          <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </div>
        </section>

      {/* Integrations */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Powerful <span className="text-purple-600">Integrations</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect with your favorite tools and streamline your entire business workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
            <motion.div
                key={integration.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{integration.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{integration.name}</h3>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full mb-2 inline-block">
                        {integration.category}
                      </span>
                      <p className="text-slate-600 text-sm">{integration.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Simple <span className="text-cyan-600">Pricing</span>
                </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the plan that works best for your business size and needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$9',
                period: '/month',
                description: 'Perfect for freelancers and small businesses',
                features: ['Up to 50 invoices/month', 'Basic templates', 'Email support', 'Mobile app access'],
                color: 'border-blue-200',
                button: 'bg-blue-600 hover:bg-blue-700'
              },
              {
                name: 'Professional',
                price: '$29',
                period: '/month',
                description: 'Best for growing businesses and teams',
                features: ['Unlimited invoices', 'Custom branding', 'Priority support', 'Advanced analytics', 'Team collaboration'],
                color: 'border-purple-200 ring-2 ring-purple-500',
                button: 'bg-purple-600 hover:bg-purple-700',
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$99',
                period: '/month',
                description: 'For large teams with advanced needs',
                features: ['Everything in Professional', 'White-label solution', 'API access', 'Dedicated support', 'Custom integrations'],
                color: 'border-emerald-200',
                button: 'bg-emerald-600 hover:bg-emerald-700'
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white/90 backdrop-blur-2xl border-2 ${plan.color} rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-slate-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-slate-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="/auth/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full ${plan.button} text-white py-4 rounded-2xl font-bold text-center block transition-all duration-300`}
                >
                  Get Started
                </motion.a>
              </motion.div>
            ))}
              </div>
          </div>
        </section>

      <Footer />
    </div>
  )
} 

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from '@/hooks/use-lenis'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  Layers, 
  Zap, 
  Crown, 
  Building2, 
  ArrowRight,
  Rocket,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  X,
  Plus,
  Minus,
  Gift,
  Timer,
  Globe,
  Lock,
  Headphones,
  BarChart3,
  Palette,
  Layout
} from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    originalPrice: { monthly: 0, yearly: 0 },
    period: 'for 3 months',
    description: 'Perfect for freelancers and individuals just getting started. Try all professional features completely free for 3 months.',
    shortDesc: 'Complete 3-month free trial',
    icon: Rocket,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    bgGradient: 'from-emerald-50 via-teal-50 to-cyan-50',
    features: [
      { name: 'All Professional features included', icon: CheckCircle },
      { name: 'Unlimited invoices & clients', icon: CheckCircle },
      { name: 'AI-powered automation', icon: Palette },
      { name: '25+ Beautiful templates', icon: CheckCircle },
      { name: 'Payment integrations', icon: CheckCircle },
      { name: 'Team collaboration', icon: Users },
      { name: 'Priority email support', icon: Headphones },
      { name: 'No credit card required', icon: Shield }
    ],
    buttonText: 'Start 3-Month Free Trial',
    buttonStyle: 'gradient',
    popular: false,
    badge: '3 Months Free',
    savings: 'No commitment required',
    href: '/auth/signup?plan=free&trial=true'
  },
  {
    name: 'Professional',
    price: { monthly: 10, yearly: 7 },
    originalPrice: { monthly: 10, yearly: 10 },
    period: 'per month',
    description: 'Best for growing businesses that need advanced features, AI automation, and team collaboration. Includes 3-month free trial.',
    shortDesc: 'Advanced features + AI automation',
    icon: Layers,
    gradient: 'from-indigo-600 via-purple-600 to-violet-700',
    bgGradient: 'from-indigo-50 via-purple-50 to-violet-50',
    features: [
      { name: 'Unlimited invoices & clients', icon: CheckCircle },
      { name: 'AI-powered form filling & automation', icon: Palette },
      { name: 'Custom branding & 25+ templates', icon: CheckCircle },
      { name: 'Multi-currency support (50+ currencies)', icon: Globe },
      { name: 'Advanced analytics & reports', icon: BarChart3 },
      { name: 'Payment integration (Stripe, PayPal)', icon: CheckCircle },
      { name: 'Automated reminders & follow-ups', icon: Timer },
      { name: 'Team collaboration (up to 5 users)', icon: Users },
      { name: 'Priority email support', icon: Headphones },
      { name: 'Invoice approval workflow', icon: CheckCircle }
    ],
    buttonText: 'Start 3-Month Free Trial',
    buttonStyle: 'gradient',
    popular: true,
    badge: 'Most Popular',
    savings: '30% off yearly',
    href: '/auth/signup?plan=professional&trial=true'
  },
  {
    name: 'Enterprise',
    price: { monthly: 20, yearly: 15 },
    originalPrice: { monthly: 20, yearly: 20 },
    period: 'per month',
    description: 'For large teams and enterprises that need advanced security, integrations, and dedicated support. Includes 3-month free trial.',
    shortDesc: 'Enterprise-grade security & integrations',
    icon: Crown,
    gradient: 'from-purple-600 via-indigo-700 to-blue-800',
    bgGradient: 'from-purple-50 via-indigo-50 to-blue-50',
    features: [
      { name: 'Everything in Professional', icon: CheckCircle },
      { name: 'Unlimited team members', icon: Users },
      { name: 'Advanced roles & permissions', icon: Shield },
      { name: 'API access & webhooks', icon: CheckCircle },
      { name: 'SSO integration (SAML, OAuth)', icon: Lock },
      { name: 'Advanced security & compliance', icon: Shield },
      { name: 'Custom integrations & white-label', icon: CheckCircle },
      { name: 'Dedicated account manager', icon: Users },
      { name: 'Advanced reporting & analytics', icon: BarChart3 },
      { name: '24/7 priority support', icon: Headphones },
      { name: 'Custom training & onboarding', icon: CheckCircle },
      { name: 'SLA guarantee', icon: CheckCircle }
    ],
    buttonText: 'Start 3-Month Free Trial',
    buttonStyle: 'gradient',
    popular: false,
    badge: 'Enterprise',
    savings: '25% off yearly',
    href: '/auth/signup?plan=enterprise&trial=true'
  }
]

const faqs = [
  {
    question: 'Is there really a 3-month free trial?',
    answer: 'Yes! All paid plans come with a generous 3-month free trial. No credit card required to start. Experience all premium features completely free.',
    icon: Gift
  },
  {
    question: 'Can I change or cancel my plan anytime?',
    answer: 'Absolutely! Upgrade or downgrade anytime. Changes take effect immediately with prorated billing. Cancel with one click - no hidden fees or cancellation charges.',
    icon: CheckCircle
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are secure and encrypted.',
    icon: Shield
  },
  {
    question: 'How does the AI automation work?',
    answer: 'Our AI analyzes your business patterns and automatically fills forms, suggests pricing, generates professional content, and provides smart insights to save you hours of work.',
    icon: Palette
  },
  {
    question: 'Do you offer discounts for nonprofits or students?',
    answer: 'Yes! We offer 50% discounts for qualifying nonprofits and educational institutions. Contact our support team with your organization details.',
    icon: Users
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Your data security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with GDPR, SOC 2, and other major privacy standards.',
    icon: Lock
  },
  {
    question: 'Can I integrate with my existing tools?',
    answer: 'Yes! We integrate with popular accounting software (QuickBooks, Xero), CRMs (Salesforce, HubSpot), and payment processors (Stripe, PayPal). Enterprise plans include custom integrations.',
    icon: CheckCircle
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'Starter gets email support, Professional gets priority email support, and Enterprise gets 24/7 phone support with a dedicated account manager and custom training.',
    icon: Headphones
  }
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const { scrollTo } = useLenis()

  const handlePlanClick = (plan: any) => {
    if (plan.href) {
      window.location.href = plan.href
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Ultra-Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-300/25 to-pink-300/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Header />
      
      <main className="pt-16 relative z-10">
        {/* Ultra-Modern Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-5xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center justify-center mb-8"
              >
                <div className="bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-violet-600/90 backdrop-blur-3xl border border-white/10 rounded-full px-8 py-4 shadow-2xl shadow-purple-500/25 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-50 animate-pulse"></div>
                  <div className="relative flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                    <span className="text-white text-lg font-bold tracking-wide">Simple & Transparent Pricing</span>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900 mb-8 tracking-tighter leading-none"
              >
                Choose Your Plan
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="max-w-4xl mx-auto mb-12"
              >
                <p className="text-2xl md:text-3xl text-slate-600/90 font-medium leading-relaxed tracking-wide mb-4">
                  Start with our{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-bold">free plan</span> or unlock advanced features with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold">3-month free trial</span>
                </p>
                <p className="text-lg text-slate-500 font-normal">
                  No credit card required • Cancel anytime • Upgrade or downgrade instantly
                </p>
              </motion.div>
              
              {/* Ultra-Modern Pricing Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
                className="inline-flex items-center bg-white/80 backdrop-blur-2xl p-2 rounded-[2rem] mb-16 border border-white/40 shadow-2xl shadow-gray-500/10"
              >
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-8 py-4 rounded-[1.5rem] font-bold text-lg transition-all duration-500 ${
                    !isYearly 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/25' 
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-white/60'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-8 py-4 rounded-[1.5rem] font-bold text-lg transition-all duration-500 relative ${
                    isYearly 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/25' 
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-white/60'
                  }`}
                >
                  Annual
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg"
                  >
                    Save 20%
                  </motion.div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Ultra-Modern Pricing Cards */}
        <section id="pricing-plans" className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => {
                  const Icon = plan.icon
                  const currentPrice = isYearly ? plan.price.yearly : plan.price.monthly
                  const originalPrice = isYearly ? plan.originalPrice.yearly : plan.originalPrice.monthly
                  
                  return (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className={`relative ${plan.popular ? 'scale-105 lg:scale-110' : ''}`}
                      whileHover={{ scale: plan.popular ? 1.15 : 1.05, y: -10 }}
                    >
                      {/* Popular Badge */}
                      {plan.popular && (
                        <motion.div 
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                          className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                        >
                          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl shadow-indigo-500/25 border border-white/20 backdrop-blur-sm">
                            ⚡ Most Popular
                        </div>
                        </motion.div>
                      )}

                      {/* Ultra-Modern Pricing Card */}
                      <div className={`relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 h-full transition-all duration-700 border-2 shadow-2xl overflow-hidden group ${
                        plan.popular 
                          ? 'border-indigo-200/50 shadow-indigo-500/20 hover:shadow-indigo-500/30' 
                          : 'border-white/30 shadow-gray-500/10 hover:shadow-gray-500/20'
                      }`}>
                        
                        {/* Glassmorphism Background */}
                        <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${plan.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-700`}></div>
                        
                        {/* Header */}
                        <div className="relative z-10 text-center mb-8">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`inline-flex p-5 rounded-[1.5rem] mb-6 bg-gradient-to-r ${plan.gradient} shadow-2xl`}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </motion.div>
                          
                          <h3 className="text-2xl font-black text-slate-900 mb-3">
                            {plan.name}
                          </h3>
                          
                          <div className="mb-4">
                            <div className="flex items-baseline justify-center space-x-2">
                              <span className="text-5xl font-black bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
                              ${currentPrice}
                            </span>
                              {originalPrice > currentPrice && isYearly && (
                                <span className="text-xl text-slate-400 line-through">
                                ${originalPrice}
                              </span>
                            )}
                            </div>
                            <div className="text-slate-600 mt-2 font-semibold">
                              {plan.period}
                            </div>
                            {isYearly && plan.savings && (
                              <div className="text-emerald-600 text-sm font-bold mt-1">
                                💰 {plan.savings}
                              </div>
                            )}
                          </div>
                          
                          <p className="text-slate-700 font-medium leading-relaxed">
                            {plan.shortDesc}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="relative z-10 space-y-4 mb-8">
                          {plan.features.slice(0, 8).map((feature, featureIndex) => (
                            <motion.div 
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                              className="flex items-center space-x-4"
                            >
                              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-slate-700 font-medium text-base leading-relaxed">
                                {feature.name}
                              </span>
                            </motion.div>
                          ))}
                          {plan.features.length > 8 && (
                            <div className="text-sm text-indigo-600 font-bold mt-4 text-center">
                              +{plan.features.length - 8} more premium features
                            </div>
                          )}
                        </div>

                        {/* CTA Button */}
                        <div className="relative z-10">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePlanClick(plan)}
                            className={`w-full py-5 rounded-[1.5rem] font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-3xl ${
                            plan.popular
                                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white shadow-indigo-500/25'
                                : plan.name === 'Starter'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/25'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-purple-500/25'
                          }`}
                        >
                          {plan.buttonText}
                            <ArrowRight className="inline-block ml-3 h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ultra-Modern FAQ Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-purple-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                  Everything you need to know about our pricing and features
                </p>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-2xl border border-white/30 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-500/10 hover:shadow-gray-500/20 transition-all duration-500"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/60 transition-all duration-300"
                    >
                      <span className="font-bold text-slate-900 text-lg flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4"></div>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <Plus className="h-6 w-6 text-slate-600" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/30"
                        >
                          <div className="p-6 pt-4">
                            <p className="text-slate-700 leading-relaxed text-base font-medium">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ultra-Modern CTA Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[3rem] p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-indigo-500/25">
                {/* Advanced Background Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-8 left-8 w-48 h-48 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-8 right-8 w-56 h-56 bg-pink-300 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-cyan-300 rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-bold mb-8 border border-white/30"
                  >
                    🚀 Ready to Transform Your Business?
                  </motion.div>
                  
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                    Start Your Free Trial Today
                  </h2>
                  
                  <p className="text-white/90 text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                    Join thousands of businesses creating professional invoices with our modern platform. 
                    <span className="font-bold"> 3 months completely free</span> – no credit card required.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlanClick({ href: '/auth/signup?plan=professional&trial=true' })}
                      className="bg-white text-indigo-700 font-bold text-xl px-12 py-5 rounded-[1.5rem] shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                    >
                      Start Free Trial
                      <ArrowRight className="inline-block ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-xl px-10 py-5 rounded-[1.5rem] backdrop-blur-sm transition-all duration-300"
                    >
                      Watch Demo
                    </motion.button>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-8 text-white/80 text-base">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">No credit card required</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                        <Timer className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">3 months completely free</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">Cancel anytime</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 
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
  Star, 
  Zap, 
  Crown, 
  Building2, 
  ArrowRight,
  Sparkles,
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
  BarChart3
} from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    originalPrice: { monthly: 0, yearly: 0 },
    period: 'forever',
    description: 'Perfect for freelancers and individuals just getting started with professional invoicing.',
    shortDesc: 'Essential features for getting started',
    icon: Rocket,
    gradient: 'from-slate-500 via-slate-600 to-slate-700',
    bgGradient: 'from-slate-50 via-gray-50 to-slate-100',
    features: [
      { name: 'Up to 5 invoices per month', icon: CheckCircle },
      { name: 'Professional PDF export', icon: CheckCircle },
      { name: '5+ Beautiful templates', icon: CheckCircle },
      { name: 'Basic client management', icon: CheckCircle },
      { name: 'Email support', icon: CheckCircle },
      { name: 'Mobile app access', icon: CheckCircle }
    ],
    buttonText: 'Get Started Free',
    buttonStyle: 'outline',
    popular: false,
    badge: 'Free Forever',
    savings: null
  },
  {
    name: 'Professional',
    price: { monthly: 15, yearly: 12 },
    originalPrice: { monthly: 15, yearly: 15 },
    period: 'per month',
    description: 'Best for growing businesses that need advanced features, AI automation, and team collaboration.',
    shortDesc: 'Advanced features + AI automation',
    icon: Star,
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
    features: [
      { name: 'Unlimited invoices & clients', icon: CheckCircle },
      { name: 'AI-powered form filling & automation', icon: Sparkles },
      { name: 'Custom branding & 10+ templates', icon: CheckCircle },
      { name: 'Multi-currency support (50+ currencies)', icon: Globe },
      { name: 'Advanced analytics & reports', icon: BarChart3 },
      { name: 'Payment integration (Stripe, PayPal)', icon: CheckCircle },
      { name: 'Automated reminders & follow-ups', icon: Timer },
      { name: 'Team collaboration (up to 3 users)', icon: Users },
      { name: 'Priority email support', icon: Headphones },
      { name: 'Invoice approval workflow', icon: CheckCircle }
    ],
    buttonText: 'Start 3-Month Free Trial',
    buttonStyle: 'gradient',
    popular: true,
    badge: 'Most Popular',
    savings: '20% off yearly'
  },
  {
    name: 'Enterprise',
    price: { monthly: 49, yearly: 39 },
    originalPrice: { monthly: 49, yearly: 49 },
    period: 'per month',
    description: 'For large teams and enterprises that need advanced security, integrations, and dedicated support.',
    shortDesc: 'Enterprise-grade security & integrations',
    icon: Crown,
    gradient: 'from-purple-600 via-purple-700 to-indigo-800',
    bgGradient: 'from-purple-50 via-indigo-50 to-purple-100',
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
    buttonText: 'Contact Sales',
    buttonStyle: 'outline',
    popular: false,
    badge: 'Enterprise',
    savings: '20% off yearly'
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
    icon: Sparkles
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

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30" />
      
      {/* Professional Background Elements */}
      <div className="absolute top-1/3 left-20 w-40 h-40 bg-blue-50 rounded-full blur-2xl opacity-40" />
      <div className="absolute bottom-1/3 right-20 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-30" />
      
      <Header />
      
      <main className="pt-20 relative">
        {/* Compact Hero Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-4">
                Simple Pricing
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Choose the plan that fits your business. <span className="font-semibold text-blue-600">3 months free trial</span> on all paid plans.
              </p>
              
              {/* Smooth Scroll to Plans Button */}
              <div className="mb-8">
                <Button
                  onClick={() => scrollTo('#pricing-plans', { offset: -100, duration: 1.2 })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Plans <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              {/* Modern Toggle */}
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-2xl mb-12">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    !isYearly 
                      ? 'bg-white text-slate-900 shadow-md' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                    isYearly 
                      ? 'bg-white text-slate-900 shadow-md' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Annual
                  {isYearly && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-md font-bold">
                      20%
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modern Pricing Cards */}
        <section id="pricing-plans" className="py-12 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => {
                  const Icon = plan.icon
                  const currentPrice = isYearly ? plan.price.yearly : plan.price.monthly
                  const originalPrice = isYearly ? plan.originalPrice.yearly : plan.originalPrice.monthly
                  
                  return (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`relative ${plan.popular ? 'scale-105' : ''}`}
                    >
                      {/* Popular Badge */}
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                            Most Popular
                          </span>
                        </div>
                      )}

                      {/* Card */}
                      <div className={`bg-white rounded-2xl border-2 p-6 h-full transition-all duration-300 hover:shadow-lg ${
                        plan.popular ? 'border-blue-600' : 'border-slate-200'
                      }`}>
                        
                        {/* Header */}
                        <div className="text-center mb-6">
                          <div className={`inline-flex p-3 rounded-2xl mb-4 ${
                            plan.popular 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          
                          <h3 className="text-xl font-bold text-slate-900 mb-2">
                            {plan.name}
                          </h3>
                          
                          <div className="mb-3">
                            <span className="text-4xl font-black text-slate-900">
                              ${currentPrice}
                            </span>
                            {originalPrice > currentPrice && (
                              <span className="text-lg text-slate-400 line-through ml-2">
                                ${originalPrice}
                              </span>
                            )}
                            <div className="text-sm text-slate-600 mt-1">
                              {plan.period}
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-600">
                            {plan.shortDesc}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 mb-6">
                          {plan.features.slice(0, 6).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-3">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-slate-700">
                                {feature.name}
                              </span>
                            </div>
                          ))}
                          {plan.features.length > 6 && (
                            <div className="text-xs text-slate-500 pt-2">
                              +{plan.features.length - 6} more features
                            </div>
                          )}
                        </div>

                        {/* CTA Button */}
                        <Button
                          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                            plan.popular
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                          }`}
                        >
                          {plan.buttonText}
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Compact FAQ Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Questions?
                </h2>
                <p className="text-slate-600">
                  Get answers to common questions about pricing and features.
                </p>
              </motion.div>

              <div className="space-y-3">
                {faqs.slice(0, 5).map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-medium text-slate-900 text-sm">
                        {faq.question}
                      </span>
                      <Plus className={`h-4 w-4 text-slate-400 transition-transform ${
                        expandedFaq === index ? 'rotate-45' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t"
                        >
                          <div className="p-4 pt-3">
                            <p className="text-sm text-slate-600 leading-relaxed">
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
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                {/* Modern Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                  <div className="absolute top-4 left-4 w-32 h-32 bg-blue-500 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-4 right-4 w-40 h-40 bg-purple-500 rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Ready to get started?
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                    Start Your Free Trial
                  </h2>
                  
                  <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                    Get full access to all Professional features for 3 months. 
                    No credit card required.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 px-6 py-4 rounded-xl font-medium"
                    >
                      View Demo
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>No credit card</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4 text-blue-400" />
                      <span>3 months free</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-purple-400" />
                      <span>Cancel anytime</span>
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
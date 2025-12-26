'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
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
    planId: 'free',
    trialDays: 90,
    stripePriceId: null
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
    planId: 'professional',
    trialDays: 90,
    stripePriceId: 'price_professional_monthly' // Replace with actual Stripe price ID
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
    planId: 'enterprise',
    trialDays: 90,
    stripePriceId: 'price_enterprise_monthly' // Replace with actual Stripe price ID
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
  const router = useRouter()
  const { user } = useAuth()

  /**
   * Professional plan selection handler
   * Constructs dynamic URLs with plan metadata for signup/upgrade flow
   * Follows enterprise SaaS patterns (Stripe, Vercel, Linear)
   */
  const handlePlanSelection = (plan: any) => {
    const billingCycle = isYearly ? 'yearly' : 'monthly'
    const price = isYearly ? plan.price.yearly : plan.price.monthly
    
    // Build comprehensive query parameters
    const params = new URLSearchParams({
      plan: plan.planId,
      billing: billingCycle,
      trial: 'true',
      trial_days: plan.trialDays.toString(),
      price: price.toString(),
      currency: 'USD',
      return_url: window.location.origin + '/dashboard',
      cancel_url: window.location.origin + '/pricing'
    })

    // If user is logged in, go to checkout/upgrade flow
    // If not logged in, go to signup with plan pre-selected
    if (user) {
      // User is authenticated - redirect to checkout/upgrade
      router.push(`/api/checkout?${params.toString()}`)
    } else {
      // User not authenticated - redirect to signup with plan details
      router.push(`/auth/signup?${params.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements - Matching Homepage */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[32rem] h-[32rem] bg-primary/3 rounded-full blur-3xl"></div>
      </div>
      
      <Header />
      
      {/* Trial Banner for logged-in users */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/20"
        >
          <div className="container mx-auto px-6 py-3 text-center">
            <p className="text-sm font-medium text-foreground">
              <Gift className="inline h-4 w-4 mr-2" />
              You're currently on the <strong>Free Trial</strong> plan. Upgrade anytime to unlock more features.
            </p>
          </div>
        </motion.div>
      )}
      
      <main className="pt-16 relative z-10">
        {/* Hero Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center justify-center mb-8"
              >
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/20 rounded-full px-6 py-3 shadow-xl relative overflow-hidden"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
                  <div className="relative flex items-center space-x-2.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-foreground text-base font-bold tracking-wide">Simple & Transparent Pricing</span>
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-tight"
              >
                Choose Your
                <br />
                <span className="text-primary">Perfect Plan</span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="max-w-3xl mx-auto mb-10"
              >
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-3">
                  Start with our{' '}
                  <span className="text-primary font-bold">3-month free trial</span> and experience all professional features
                </p>
                <p className="text-sm text-muted-foreground">
                  No credit card required • Cancel anytime • Upgrade or downgrade instantly
                </p>
              </motion.div>
              
              {/* Pricing Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
                className="inline-flex items-center bg-card border-2 border-border p-2 rounded-full mb-16 shadow-sm"
              >
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                    !isYearly 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                    isYearly 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>Yearly</span>
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary">
                    Save 20%
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section id="pricing-plans" className="py-12 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => {
                  const Icon = plan.icon
                  const currentPrice = isYearly ? plan.price.yearly : plan.price.monthly
                  const originalPrice = isYearly ? plan.originalPrice.yearly : plan.originalPrice.monthly
                  
                  return (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`relative ${plan.popular ? 'md:scale-105' : ''}`}
                      whileHover={{ y: -5 }}
                    >
                      {/* Popular Badge */}
                      {plan.popular && (
                        <motion.div 
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                        >
                          <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-md">
                            <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                            <span>Most Popular</span>
                        </div>
                        </motion.div>
                      )}

                      {/* Pricing Card - Glassmorphism */}
                      <div className={`relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] p-6 h-full transition-all duration-300 border-2 shadow-xl hover:shadow-2xl overflow-hidden ${
                        plan.popular 
                          ? 'border-primary/50 shadow-primary/10' 
                          : 'border-white/20 dark:border-gray-700/20 hover:border-primary/30'
                      }`}
                      style={{
                        boxShadow: plan.popular 
                          ? '0 20px 40px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.1)' 
                          : '0 10px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
                      >
                        
                        {/* Subtle Background Gradient */}
                        <div className={`absolute inset-0 rounded-[2.5rem] ${plan.name === 'Free' ? 'bg-gradient-to-br from-primary/5 to-transparent' : plan.name === 'Professional' ? 'bg-gradient-to-br from-primary/8 to-transparent' : 'bg-gradient-to-br from-accent/5 to-transparent'} opacity-50`}></div>
                        
                        {/* Header */}
                        <div className="relative z-10 text-center mb-6">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className={`inline-flex p-3 rounded-2xl mb-4 ${plan.name === 'Free' ? 'bg-primary/10' : plan.name === 'Professional' ? 'bg-primary/10' : 'bg-accent/10'}`}
                          >
                            <Icon className={`h-6 w-6 ${plan.name === 'Enterprise' ? 'text-accent' : 'text-primary'}`} />
                          </motion.div>
                          
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {plan.name}
                          </h3>
                          
                          <div className="mb-3">
                            <div className="flex items-baseline justify-center space-x-1">
                              <span className="text-4xl font-bold text-foreground">
                              ${currentPrice}
                            </span>
                              {originalPrice > currentPrice && isYearly && (
                                <span className="text-lg text-muted-foreground line-through">
                                ${originalPrice}
                              </span>
                            )}
                            </div>
                            <div className="text-muted-foreground mt-1 text-sm">
                              /{plan.period}
                            </div>
                            {isYearly && plan.savings && (
                              <div className="text-primary text-xs font-bold mt-1">
                                {plan.savings}
                              </div>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="relative z-10 space-y-2.5 mb-6">
                          {plan.features.slice(0, 6).map((feature, featureIndex) => (
                            <div 
                              key={featureIndex}
                              className="flex items-start space-x-2.5"
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                                  <Check className="h-2.5 w-2.5 text-primary font-bold" />
                                </div>
                              </div>
                              <span className="text-foreground text-xs leading-relaxed">
                                {feature.name}
                              </span>
                            </div>
                          ))}
                          {plan.features.length > 6 && (
                            <div className="text-xs text-primary font-semibold pt-2 text-center">
                              +{plan.features.length - 6} more features
                            </div>
                          )}
                        </div>

                        {/* CTA Button */}
                        <div className="relative z-10">
                          <Button
                            onClick={() => handlePlanSelection(plan)}
                            className={`w-full rounded-full py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg ${
                              plan.name === 'Enterprise'
                                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            }`}
                          >
                            {plan.buttonText}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Bottom Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-10"
              >
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/20 rounded-[2rem] p-6 max-w-3xl mx-auto shadow-lg"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-semibold">3 Months Free Trial</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="font-semibold">No Credit Card Required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="font-semibold">Cancel Anytime</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Frequently Asked
                  <br />
                  <span className="text-primary">Questions</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything you need to know about our pricing and features
                </p>
              </motion.div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/20 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
                    >
                      <span className="font-semibold text-foreground text-base flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/20 dark:border-gray-700/20"
                        >
                          <div className="p-5 pt-4">
                            <p className="text-muted-foreground leading-relaxed text-sm">
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

        {/* CTA Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-3xl border-2 border-white/20 dark:border-gray-700/20 rounded-[3rem] p-10 md:p-12 text-center overflow-hidden shadow-2xl"
              style={{
                boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.15)',
                backdropFilter: 'blur(24px) saturate(200%)',
                WebkitBackdropFilter: 'blur(24px) saturate(200%)',
              }}
              >
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent rounded-[3rem]"></div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="inline-flex items-center bg-primary/10 backdrop-blur-sm text-primary px-5 py-2.5 rounded-full text-base font-bold mb-6 border border-primary/20"
                  >
                Ready to Get Started?
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                    Start Your Free Trial Today
                  </h2>
                  
                  <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of businesses creating professional invoices. 
                    <span className="font-bold text-primary"> 3 months completely free</span> – no credit card required.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Button
                      onClick={() => handlePlanSelection(plans[1])}
                      size="lg"
                      className="btn-primary px-10 py-5 text-lg font-bold shadow-lg hover:shadow-xl rounded-full"
                    >
                      Start Free Trial
                      <ArrowRight className="inline-block ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="font-medium">No credit card required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="font-medium">3 months free</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="font-medium">Cancel anytime</span>
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
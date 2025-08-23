'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: 'for 3 months',
    description: 'Perfect for freelancers just getting started. Try all professional features completely free for 3 months.',
    icon: Zap,
    iconColor: 'text-emerald-500',
    glassColor: 'from-emerald-500/10 to-emerald-600/5',
    features: [
      'All Professional features included',
      'Unlimited invoices & customers',
      'AI-powered automation',
      '25+ Beautiful templates',
      'Payment integrations',
      'Team collaboration',
      'Priority email support',
      'No credit card required'
    ],
    buttonText: 'Start 3-Month Free Trial',
    buttonVariant: 'default' as const,
    buttonClass: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white',
    popular: false,
    trialBadge: true
  },
  {
    name: 'Professional',
    monthlyPrice: 10,
    yearlyPrice: 8, // 20% discount for yearly
    period: 'per month',
    description: 'Everything you need to scale your business with advanced automation. Includes 3-month free trial.',
    icon: Star,
    iconColor: 'text-orange-500',
    glassColor: 'from-orange-500/15 to-orange-600/10',
    features: [
      'Unlimited invoices & customers',
      'AI-powered automation workflows',
      'Custom branding & 25+ templates',
      'Multi-currency support (50+ currencies)',
      'Advanced analytics dashboard',
      'Priority email support',
      'Payment integrations (Stripe, PayPal)',
      'Automated reminders & follow-ups'
    ],
    buttonText: 'Start 3-Month Free Trial',
    buttonVariant: 'default' as const,
    buttonClass: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white',
    popular: true,
    trialBadge: true
  },
  {
    name: 'Enterprise',
    monthlyPrice: 20,
    yearlyPrice: 16, // 20% discount for yearly
    period: 'per month',
    description: 'Advanced features and dedicated support for growing businesses. Includes 3-month free trial.',
    icon: Crown,
    iconColor: 'text-purple-500',
    glassColor: 'from-purple-500/10 to-purple-600/5',
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Advanced team permissions',
      'API access & webhooks',
      'SSO & security features',
      'Custom integrations & white-label',
      'Dedicated account manager',
      '24/7 priority support'
    ],
    buttonText: 'Start 3-Month Free Trial',
    buttonVariant: 'default' as const,
    buttonClass: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white',
    popular: false,
    trialBadge: true
  }
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const handlePlanClick = (plan: any) => {
    if (plan.name === 'Free') {
      // Handle free trial signup
      window.location.href = '/auth/signup?plan=free&trial=true'
    } else if (plan.name === 'Professional') {
      // Handle professional trial signup
      window.location.href = '/auth/signup?plan=professional&trial=true'
    } else if (plan.name === 'Enterprise') {
      // Handle enterprise trial signup
      window.location.href = '/auth/signup?plan=enterprise&trial=true'
    }
  }

  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-purple-400/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">Perfect Plan</span>
            </h2>
            
            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center mt-8 mb-8"
            >
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/30 rounded-full p-1 shadow-lg">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                      !isYearly 
                        ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                      isYearly 
                        ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <span>Yearly</span>
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group cursor-pointer ${
                  plan.popular ? 'lg:scale-105 z-10' : ''
                }`}
                onClick={() => handlePlanClick(plan)}
              >
                {/* Glassmorphism Card */}
                <div 
                  className="relative h-full bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    background: `linear-gradient(135deg, ${plan.glassColor})`,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: plan.popular 
                      ? '0 25px 50px -12px rgba(249, 115, 22, 0.4), 0 0 0 1px rgba(249, 115, 22, 0.1)'
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
                  }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                  {/* Trial Badge */}
                  {plan.trialBadge && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        3M FREE
                      </div>
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`bg-white/30 backdrop-blur-sm rounded-2xl p-4 ${plan.iconColor}`}>
                      <plan.icon className="h-8 w-8" />
                    </div>
                  </div>

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    {plan.name === 'Free' ? (
                      <>
                        <span className="text-5xl font-bold text-gray-900">
                          $0
                        </span>
                        <span className="text-gray-600 ml-2 text-lg">
                          /{plan.period}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl font-bold text-gray-900">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-gray-600 ml-2 text-lg">
                          /month{isYearly ? ' (billed yearly)' : ''}
                        </span>
                        {isYearly && plan.monthlyPrice > plan.yearlyPrice && (
                          <div className="mt-2">
                            <span className="text-sm text-gray-500 line-through">
                              ${plan.monthlyPrice}/month
                            </span>
                            <span className="ml-2 text-sm font-semibold text-green-600">
                              Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                    <p className="text-gray-700 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-green-600 font-bold" />
                          </div>
                      </div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                    className={`w-full rounded-2xl py-4 text-base font-semibold transition-all duration-300 hover:scale-105 ${plan.buttonClass} shadow-lg hover:shadow-xl`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-white/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">3 Months Free Trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Cancel Anytime</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 text-lg">
              ✨ All plans include: SSL security, 99.9% uptime, email support, and regular updates
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, User, Building2, Rocket } from 'lucide-react'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: 'for 3 months',
    description: 'Perfect for freelancers just getting started. Try all professional features completely free for 3 months.',
    icon: User,
    iconColor: 'text-primary',
    glassColor: 'bg-primary/5',
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
    buttonClass: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    popular: false,
    trialBadge: true
  },
  {
    name: 'Professional',
    monthlyPrice: 10,
    yearlyPrice: 8, // 20% discount for yearly
    period: 'per month',
    description: 'Everything you need to scale your business with advanced automation. Includes 3-month free trial.',
    icon: Building2,
    iconColor: 'text-primary',
    glassColor: 'bg-primary/10',
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
    buttonClass: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    popular: true,
    trialBadge: true
  },
  {
    name: 'Enterprise',
    monthlyPrice: 20,
    yearlyPrice: 16, // 20% discount for yearly
    period: 'per month',
    description: 'Advanced features and dedicated support for growing businesses. Includes 3-month free trial.',
    icon: Rocket,
    iconColor: 'text-accent',
    glassColor: 'bg-accent/5',
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
    buttonClass: 'bg-accent hover:bg-accent/90 text-accent-foreground',
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

  /**
   * Professional plan selection handler
   * Constructs dynamic URLs with plan metadata for signup/upgrade flow
   * Follows enterprise SaaS patterns (Stripe, Vercel, Linear)
   */
  const handlePlanClick = (plan: any) => {
    const billingCycle = isYearly ? 'yearly' : 'monthly'
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
    
    // Map plan names to plan IDs
    const planIdMap: { [key: string]: string } = {
      'Free': 'free',
      'Professional': 'professional',
      'Enterprise': 'enterprise'
    }
    
    const planId = planIdMap[plan.name] || 'free'
    const trialDays = 90 // 3 months = 90 days
    
    // Build comprehensive query parameters
    const params = new URLSearchParams({
      plan: planId,
      billing: billingCycle,
      trial: 'true',
      trial_days: trialDays.toString(),
      price: price.toString(),
      currency: 'USD',
      return_url: window.location.origin + '/dashboard',
      cancel_url: window.location.origin + '/pricing'
    })

    // Redirect to signup with plan pre-selected
    window.location.href = `/auth/signup?${params.toString()}`
  }

  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden bg-background">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Choose Your
              <br />
              <span className="text-primary">Perfect Plan</span>
            </h2>
            
            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center mt-8 mb-8"
            >
              <div className="relative bg-card border-2 border-border rounded-full p-1 shadow-sm">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`relative px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                      !isYearly 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`relative px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
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
                {/* Card */}
                <div 
                  className={`relative h-full bg-card border-2 rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    plan.popular ? 'border-primary' : 'border-border hover:border-primary/30'
                  } ${plan.glassColor}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-md">
                        <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                  {/* Trial Badge */}
                  {plan.trialBadge && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                        3M FREE
                      </div>
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`${plan.glassColor} border-2 border-${plan.iconColor.replace('text-', 'border-')}/20 rounded-2xl p-4 ${plan.iconColor}`}>
                      <plan.icon className="h-8 w-8" />
                    </div>
                  </div>

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    {plan.name === 'Free' ? (
                      <>
                        <span className="text-5xl font-bold text-foreground">
                          $0
                        </span>
                        <span className="text-muted-foreground ml-2 text-lg">
                          /{plan.period}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl font-bold text-foreground">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-muted-foreground ml-2 text-lg">
                          /month{isYearly ? ' (billed yearly)' : ''}
                        </span>
                        {isYearly && plan.monthlyPrice > plan.yearlyPrice && (
                          <div className="mt-2">
                            <span className="text-sm text-muted-foreground line-through">
                              ${plan.monthlyPrice}/month
                            </span>
                            <span className="ml-2 text-sm font-semibold text-primary">
                              Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                    <p className="text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary font-bold" />
                          </div>
                      </div>
                        <span className="text-foreground text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                    className={`w-full rounded-[2rem] py-4 text-base font-bold transition-all duration-300 hover:scale-105 ${plan.buttonClass} shadow-md hover:shadow-lg`}
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
            <div className="bg-card border-2 border-border rounded-[2rem] p-8 max-w-2xl mx-auto shadow-sm">
              <div className="flex items-center justify-center space-x-6 text-sm text-foreground">
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
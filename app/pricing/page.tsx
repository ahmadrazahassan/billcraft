'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap, Crown, Building2 } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for freelancers and individuals just getting started with invoicing.',
    icon: Zap,
    features: [
      'Up to 5 invoices per month',
      'Basic PDF export',
      'Email support',
      'Professional design',
      'Basic invoice tracking',
      'Mobile app access'
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline' as const,
    popular: false,
    color: 'primary'
  },
  {
    name: 'Professional',
    price: '$15',
    period: 'per month',
    description: 'Best for growing businesses that need advanced features and automation tools.',
    icon: Star,
    features: [
      'Unlimited invoices',
      'Advanced automation tools',
      'Custom branding & design',
      'Multi-currency support',
      'Advanced analytics & reports',
      'Priority email support',
      'Automated reminders',
      'Payment integration (Stripe, PayPal)',
      'Team collaboration (up to 3 users)',
      'Invoice approval workflow'
    ],
    buttonText: 'Start 3-Month Free Trial',
    buttonVariant: 'default' as const,
    popular: true,
    color: 'secondary'
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: 'per month',
    description: 'For large teams and businesses that need advanced security, control, and integrations.',
    icon: Crown,
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Advanced team roles & permissions',
      'API access & webhooks',
      'SSO integration (SAML, OAuth)',
      'Advanced security & compliance',
      'Custom integrations',
      'Dedicated account manager',
      'White-label solution',
      'Advanced reporting & analytics',
      '24/7 priority support',
      'Custom training & onboarding'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline' as const,
    popular: false,
    color: 'primary'
  }
]

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all paid plans come with a 3 months free trial. No credit card required to start.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for international customers.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely! You can cancel your subscription at any time with just one click. No hidden fees or cancellation charges.'
  },
  {
    question: 'Do you offer discounts for nonprofits?',
    answer: 'Yes, we offer a 50% discount on all paid plans for qualifying nonprofit organizations. Contact our support team for details.'
  }
]

export default function PricingPage() {
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
                Simple, Transparent
                <br />
                <span className="text-primary">Pricing</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Choose the perfect plan for your business. Start free and scale as you grow.
                No hidden fees, no surprises.
              </p>
              
              {/* Billing Toggle */}
              <div className="inline-flex items-center space-x-4 glass-card p-2 rounded-2xl mb-12">
                <span className="px-4 py-2 rounded-xl bg-primary text-white font-medium">Monthly</span>
                <span className="px-4 py-2 text-gray-600">Annual (Save 20%)</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => {
                  const Icon = plan.icon
                  return (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative glass-card p-8 ${
                        plan.popular 
                          ? 'ring-2 ring-primary transform lg:scale-105 shadow-2xl' 
                          : 'hover:shadow-xl'
                      } transition-all duration-300`}
                    >
                      {/* Popular Badge */}
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                            <Star className="h-3 w-3" />
                            <span>Most Popular</span>
                          </div>
                        </div>
                      )}

                      {/* Plan Icon */}
                      <div className="text-center mb-8">
                        <div className={`inline-flex p-3 rounded-2xl ${plan.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'} mb-4`}>
                          <Icon className={`h-8 w-8 ${plan.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {plan.name}
                        </h3>
                        <div className="mb-4">
                          <span className="text-4xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                          <span className="text-gray-600 ml-1">
                            {plan.period}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {plan.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <Check className="h-4 w-4 text-secondary" />
                            </div>
                            <span className="text-gray-600 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button
                        variant={plan.buttonVariant}
                        className={`w-full rounded-2xl py-3 font-medium transition-all duration-300 ${
                          plan.popular 
                            ? 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                            : plan.buttonVariant === 'outline'
                              ? 'border-primary text-primary hover:bg-primary hover:text-white'
                              : ''
                        }`}
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Frequently Asked
                  <br />
                  <span className="text-secondary">Questions</span>
                </h2>
                <p className="text-xl text-gray-600">
                  Everything you need to know about our pricing and plans.
                </p>
              </motion.div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center glass-card p-12"
            >
              <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join over 10,000 businesses already using BillCraft to manage their invoices efficiently.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.a
                  href="/auth/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                </motion.a>
                <motion.a
                  href="/features"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-button text-gray-700 hover:text-primary font-semibold rounded-2xl transition-colors"
                >
                  View Features
                </motion.a>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                No credit card required • 3 months free trial • Cancel anytime
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 
'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  Users,
  Shield,
  Zap,
  Crown,
  Calendar,
  Globe,
  Headphones,
  ArrowRight
} from 'lucide-react'
import { PricingService } from '@/lib/pricing'

interface ContactForm {
  name: string
  email: string
  company: string
  jobTitle: string
  phone: string
  teamSize: string
  industry: string
  useCase: string
  message: string
  plan: string
  interval: string
}

// Loading component for Suspense fallback
function ContactPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <div className="w-32 h-8 bg-slate-200 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="w-96 h-12 bg-slate-200 rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="w-80 h-6 bg-slate-200 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// Main contact component that uses search params
function ContactPageContent() {
  const searchParams = useSearchParams()
  const { success, error: showError } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const planId = searchParams?.get('plan') || 'enterprise'
  const interval = searchParams?.get('interval') || 'monthly'
  const userId = searchParams?.get('userId') || ''

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    teamSize: '',
    industry: '',
    useCase: '',
    message: '',
    plan: planId,
    interval: interval
  })

  const plan = PricingService.getPlan(planId)
  const isEnterprise = planId === 'enterprise'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In production, send this to your backend API
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        success({
          title: "Message sent successfully!",
          description: "Our team will get back to you within 24 hours.",
        })
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Contact form submission failed:', error)
      showError({
        title: "Failed to send message",
        description: "Please try again or email us directly at enterprise@billcraft.com",
      })
    } finally {
    setIsSubmitting(false)
    }
  }

  if (submitted) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
                <CheckCircle className="h-10 w-10 text-white" />
        </div>
              
              <div>
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-green-800 to-emerald-900 bg-clip-text text-transparent mb-4">
                  Thank You!
                </h1>
                <p className="text-xl text-slate-600 font-medium">
                  We've received your message and will get back to you within 24 hours.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-3xl border border-white/50 rounded-[2rem] p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-slate-900 mb-4">What happens next?</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-indigo-600">1</span>
                    </div>
                    <p className="text-slate-700">Our enterprise team reviews your requirements</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-purple-600">2</span>
                    </div>
                    <p className="text-slate-700">We schedule a personalized demo and consultation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-green-600">3</span>
                    </div>
                    <p className="text-slate-700">Custom proposal tailored to your business needs</p>
                    </div>
                </div>
              </div>

              <Button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-[1.5rem] px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Return to Homepage
              </Button>
              </motion.div>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200 px-6 py-2 font-bold mb-6">
              <Building2 className="h-4 w-4 mr-2" />
              {isEnterprise ? 'Enterprise Sales' : 'Get in Touch'}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-6">
              {isEnterprise ? 'Let\'s Scale Together' : 'Contact Our Team'}
            </h1>
            
            <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
              {isEnterprise 
                ? 'Ready to transform your invoicing with enterprise-grade features? Let\'s discuss your needs and create a custom solution.'
                : 'Have questions about BillCraft? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
              }
            </p>

            {plan && (
              <div className="mt-8 inline-flex items-center space-x-4 bg-white/60 backdrop-blur-3xl border border-white/50 rounded-[1.5rem] px-6 py-4 shadow-xl">
                <Crown className="h-6 w-6 text-purple-600" />
                <span className="font-bold text-slate-900">
                  Interested in {plan.displayName} 
                  {interval === 'yearly' ? ` (${PricingService.formatPrice(plan.yearlyPrice)}/month, billed yearly)` : ` (${PricingService.formatPrice(plan.monthlyPrice)}/month)`}
                </span>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] p-10">
                  <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                      <Label htmlFor="name" className="text-base font-bold text-slate-700 mb-3 block">Full Name *</Label>
                      <Input
                        id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        className="h-14 bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                      <Label htmlFor="email" className="text-base font-bold text-slate-700 mb-3 block">Work Email *</Label>
                      <Input
                        id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        className="h-14 bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                          placeholder="john@company.com"
                        />
                    </div>
                    
                      <div>
                      <Label htmlFor="company" className="text-base font-bold text-slate-700 mb-3 block">Company *</Label>
                      <Input
                        id="company"
                          name="company"
                        required
                          value={formData.company}
                          onChange={handleInputChange}
                        className="h-14 bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                          placeholder="Your Company"
                        />
                      </div>

                    <div>
                      <Label htmlFor="jobTitle" className="text-base font-bold text-slate-700 mb-3 block">Job Title</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="h-14 bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                        placeholder="CEO, CTO, etc."
                      />
                    </div>

                      <div>
                      <Label htmlFor="phone" className="text-base font-bold text-slate-700 mb-3 block">Phone Number</Label>
                      <Input
                        id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                        className="h-14 bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                          placeholder="+1 (555) 123-4567"
                        />
                    </div>

                      <div>
                      <Label htmlFor="teamSize" className="text-base font-bold text-slate-700 mb-3 block">Team Size</Label>
                        <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                          onChange={handleInputChange}
                        className="h-14 w-full px-4 py-3 bg-white/70 border border-white/50 rounded-[1.25rem] text-lg font-medium focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl"
                      >
                        <option value="">Select team size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-1000">201-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                        </select>
                      </div>

                      <div>
                      <Label htmlFor="industry" className="text-base font-bold text-slate-700 mb-3 block">Industry</Label>
                        <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                          onChange={handleInputChange}
                        className="h-14 w-full px-4 py-3 bg-white/70 border border-white/50 rounded-[1.25rem] text-lg font-medium focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl"
                      >
                        <option value="">Select industry</option>
                        <option value="technology">Technology</option>
                        <option value="consulting">Consulting</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="retail">Retail</option>
                        <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="useCase" className="text-base font-bold text-slate-700 mb-3 block">Primary Use Case</Label>
                      <select
                        id="useCase"
                        name="useCase"
                        value={formData.useCase}
                        onChange={handleInputChange}
                        className="h-14 w-full px-4 py-3 bg-white/70 border border-white/50 rounded-[1.25rem] text-lg font-medium focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl"
                      >
                        <option value="">Select use case</option>
                        <option value="invoicing">Invoice Management</option>
                        <option value="billing">Recurring Billing</option>
                        <option value="automation">Workflow Automation</option>
                        <option value="integration">System Integration</option>
                        <option value="compliance">Compliance & Security</option>
                        <option value="analytics">Advanced Analytics</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    </div>
                    
                    <div>
                    <Label htmlFor="message" className="text-base font-bold text-slate-700 mb-3 block">Message *</Label>
                    <Textarea
                      id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                      className="bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium resize-none"
                      placeholder="Tell us about your specific needs, challenges, or questions..."
                      />
                    </div>
                    
                  <Button
                      type="submit"
                      disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-[1.5rem] py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                        <Send className="h-5 w-5 mr-3" />
                          Send Message
                        </>
                      )}
                  </Button>
                  </form>
              </Card>
            </motion.div>
            
            {/* Contact Info & Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] p-8">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-[1rem] flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Email</p>
                      <p className="text-slate-600 font-medium">enterprise@billcraft.com</p>
                </div>
              </div>

                    <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-[1rem] flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Phone</p>
                      <p className="text-slate-600 font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-[1rem] flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                      </div>
                    <div>
                      <p className="font-bold text-slate-900">Response Time</p>
                      <p className="text-slate-600 font-medium">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Enterprise Features */}
              {isEnterprise && (
                <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] p-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Enterprise Benefits</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-slate-700 font-medium">Enterprise-grade security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-700 font-medium">Dedicated account manager</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <span className="text-slate-700 font-medium">Custom integrations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <span className="text-slate-700 font-medium">Priority implementation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Headphones className="h-5 w-5 text-indigo-600" />
                      <span className="text-slate-700 font-medium">24/7 priority support</span>
                    </div>
                  </div>
                </Card>
              )}
              </motion.div>
          </div>
        </div>
              </div>

      <Footer />
    </div>
  )
}

// Default export with Suspense boundary
export default function ContactPage() {
  return (
    <Suspense fallback={<ContactPageLoading />}>
      <ContactPageContent />
    </Suspense>
  )
} 
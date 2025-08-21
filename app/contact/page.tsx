'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { 
  MessageSquare, Phone, Mail, MapPin, Clock, Send, CheckCircle, 
  Globe, Building, Users, Zap, Shield, Star, Award, Heart,
  Calendar, Rocket, Brain, Eye, Target, TrendingUp, Database,
  ArrowRight, Download, Smartphone, CreditCard, FileCheck
} from 'lucide-react'

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    action: 'Start Chat',
    available: '24/7 Available',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our experts',
    action: '+1 (555) 123-4567',
    available: 'Mon-Fri 9AM-6PM PST',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    hoverColor: 'hover:from-emerald-600 hover:to-emerald-700'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us a detailed message',
    action: 'hello@billcraft.com',
    available: '< 2 hour response',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700'
  },
  {
    icon: Calendar,
    title: 'Schedule Demo',
    description: 'Book a personalized walkthrough',
    action: 'Book Meeting',
    available: 'Next available slot',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    hoverColor: 'hover:from-orange-600 hover:to-orange-700'
  }
]

const officeLocations = [
  {
    city: 'San Francisco',
    country: 'United States',
    type: 'Global Headquarters',
    address: '123 Market Street, Suite 500',
    postal: 'San Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    email: 'sf@billcraft.com',
    timezone: 'PST (UTC-8)',
    employees: 85,
    image: '🏢',
    specialties: ['Product Development', 'Engineering', 'Customer Success']
  },
  {
    city: 'New York',
    country: 'United States', 
    type: 'East Coast Hub',
    address: '456 Broadway, Floor 12',
    postal: 'New York, NY 10013',
    phone: '+1 (555) 234-5678',
    email: 'ny@billcraft.com',
    timezone: 'EST (UTC-5)',
    employees: 45,
    image: '🗽',
    specialties: ['Sales', 'Marketing', 'Business Development']
  },
  {
    city: 'London',
    country: 'United Kingdom',
    type: 'European Headquarters',
    address: '789 Oxford Street',
    postal: 'London W1C 1LA, UK',
    phone: '+44 20 7123 4567',
    email: 'london@billcraft.com',
    timezone: 'GMT (UTC+0)',
    employees: 60,
    image: '🇬🇧',
    specialties: ['EMEA Operations', 'Compliance', 'Localization']
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    type: 'APAC Headquarters',
    address: '321 Orchard Road, Level 25',
    postal: 'Singapore 238866',
    phone: '+65 6123 4567',
    email: 'singapore@billcraft.com',
    timezone: 'SGT (UTC+8)',
    employees: 35,
    image: '🇸🇬',
    specialties: ['APAC Expansion', 'Partnerships', 'Support']
  }
]

const faqs = [
  {
    question: 'How quickly can I get started?',
    answer: 'You can create your account and send your first invoice in under 5 minutes. Our onboarding process is designed to be simple and intuitive.'
  },
  {
    question: 'Do you offer migration from other platforms?',
    answer: 'Yes! We provide free migration assistance for customers switching from QuickBooks, FreshBooks, or any other invoicing platform.'
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We integrate with Stripe, PayPal, Square, and 20+ other payment gateways to accept credit cards, bank transfers, and digital wallets.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-grade encryption, are SOC 2 compliant, and store all data in secure, encrypted databases with regular backups.'
  },
  {
    question: 'Can I customize my invoices?',
    answer: 'Yes! We offer dozens of professional templates, custom branding options, and a drag-and-drop editor for complete customization.'
  },
  {
    question: 'Do you offer enterprise features?',
    answer: 'Yes, our Enterprise plan includes white-label solutions, API access, dedicated support, custom integrations, and advanced security features.'
  }
]

const benefits = [
  {
    icon: Zap,
    title: '10x Faster Setup',
    description: 'Get started in minutes, not hours'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption & compliance'
  },
  {
    icon: Globe,
    title: 'Global Support',
    description: '24/7 multilingual customer care'
  },
  {
    icon: Award,
    title: '99.99% Uptime',
    description: 'Reliable service you can count on'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: 'general',
    subject: '',
    message: '',
    urgency: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-pink-400/15 to-orange-400/15 rounded-full blur-2xl"
        />
        </div>
        
      {/* Hero Section */}
      <motion.section 
        style={{ y, opacity }}
        className="relative pt-32 pb-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
              className="inline-flex items-center justify-center mb-8"
            >
            <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-full px-8 py-4 shadow-2xl">
                <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-slate-800 text-lg font-bold">We're Here to Help</span>
                <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
            initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight"
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">Touch</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-2xl text-slate-600 mb-12 max-w-4xl mx-auto"
            >
            Have questions? Need support? Want to see a demo? Our team is standing by to help you succeed.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
            <motion.a
              href="#contact-form"
              whileHover={{ scale: 1.08, y: -4 }}
              className="px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-bold rounded-full shadow-2xl transition-all duration-300"
              >
                <span className="flex items-center">
                <Send className="w-7 h-7 mr-3" />
                  Send Message
                </span>
            </motion.a>
            <motion.a
              href="#contact-methods"
              whileHover={{ scale: 1.08, y: -4 }}
              className="px-12 py-6 bg-white/80 backdrop-blur-2xl border-2 border-white/30 text-slate-700 hover:text-blue-600 text-xl font-bold rounded-full shadow-2xl transition-all duration-300"
              >
                <span className="flex items-center">
                <Phone className="w-7 h-7 mr-3" />
                View Options
                </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <section id="contact-methods" className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Choose Your <span className="text-blue-600">Preferred Method</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We offer multiple ways to connect with our team. Pick what works best for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
              <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -15, scale: 1.03 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-8 h-full shadow-xl hover:shadow-3xl transition-all duration-500">
                    <motion.div 
                      className={`w-20 h-20 ${method.color} ${method.hoverColor} rounded-[1.5rem] flex items-center justify-center mb-6 shadow-2xl transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{method.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{method.description}</p>
                    
                    <div className="space-y-3">
                      <div className="text-lg font-bold text-blue-600">{method.action}</div>
                      <div className="text-sm text-slate-500 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {method.available}
                    </div>
                    </div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[3rem] p-12 shadow-2xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Send Us a Message</h2>

              {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 placeholder-slate-400"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Email Address *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 placeholder-slate-400"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Company
                        </label>
                        <input
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 placeholder-slate-400"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 placeholder-slate-400"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Inquiry Type
                        </label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="sales">Sales & Pricing</option>
                          <option value="support">Technical Support</option>
                          <option value="demo">Schedule Demo</option>
                          <option value="partnerships">Partnerships</option>
                          <option value="press">Media & Press</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Priority Level
                        </label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full p-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                        >
                          <option value="low">Low - General Question</option>
                          <option value="normal">Normal - Standard Inquiry</option>
                          <option value="high">High - Urgent Issue</option>
                          <option value="critical">Critical - System Down</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Subject *
                      </label>
                      <input
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 placeholder-slate-400"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full p-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 placeholder-slate-400 resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-6 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 mr-3" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    Message Sent Successfully!
                  </h3>
                    <p className="text-slate-600 mb-8 text-lg">
                      Thank you for reaching out. Our team will get back to you within 2 hours during business hours.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    whileHover={{ scale: 1.05 }}
                      className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-white/50 text-slate-700 hover:text-blue-600 font-bold rounded-2xl transition-all duration-300"
                  >
                    Send Another Message
                  </motion.button>
                  </motion.div>
              )}
              </div>
            </motion.div>
            
            {/* Benefits & Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Why Choose Us */}
              <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Award className="w-7 h-7 mr-3 text-blue-600" />
                  Why Choose BillCraft?
                </h3>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                          <h4 className="font-bold text-slate-900 mb-1">{benefit.title}</h4>
                          <p className="text-slate-600 text-sm">{benefit.description}</p>
                    </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Brain className="w-7 h-7 mr-3 text-purple-600" />
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0"
                    >
                      <h4 className="font-bold text-slate-900 mb-2">{faq.question}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.a
                  href="/faq"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm mt-4 transition-colors duration-300"
                >
                  View All FAQs
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Our Global <span className="text-emerald-600">Offices</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Visit us in person or reach out to your nearest office for localized support and expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">{office.image}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{office.city}</h3>
                        <p className="text-slate-600 font-medium">{office.country}</p>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full mt-2">
                          {office.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-slate-900">{office.employees}</div>
                      <div className="text-sm text-slate-500">Team Members</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-slate-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600">
                        <p>{office.address}</p>
                        <p>{office.postal}</p>
                      </div>
                    </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{office.phone}</span>
                    </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{office.email}</span>
                    </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-slate-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{office.timezone}</span>
                  </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 text-sm">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {office.specialties.map((specialty) => (
                        <span key={specialty} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-[3rem] p-16 relative overflow-hidden"
          >
        <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl" />
        </div>
        
            <div className="relative">
          <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center mb-8"
              >
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3">
                  <span className="text-white font-bold">Ready to Get Started?</span>
                  </div>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                Join 50,000+ Businesses Using BillCraft
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Start your free trial today and see why thousands of businesses trust us with their invoicing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="/auth/signup"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="px-12 py-6 bg-white text-slate-900 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <span className="flex items-center">
                    <Rocket className="w-6 h-6 mr-3" />
                    Start 3-Month Free Trial
                  </span>
                </motion.a>
                <motion.a
                  href="/demo"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="px-12 py-6 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <span className="flex items-center">
                    <Calendar className="w-6 h-6 mr-3" />
                    Schedule Demo
                  </span>
                </motion.a>
              </div>
              
              <div className="flex items-center justify-center space-x-8 mt-12 text-white/70 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Setup in under 5 minutes
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 

'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  Headphones,
  Building,
  Globe,
  Calendar,
  ArrowRight,
  Star,
  Heart,
  Zap,
  Shield
} from 'lucide-react'

const contactOptions = [
  {
    title: 'Sales Inquiries',
    description: 'Questions about pricing, plans, or getting started',
    icon: Users,
    color: 'from-blue-500 to-indigo-600',
    contact: {
      email: 'sales@billcraft.com',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri 9AM-6PM PST'
    },
    responseTime: 'Within 2 hours'
  },
  {
    title: 'Technical Support',
    description: 'Get help with your account, integrations, or technical issues',
    icon: Headphones,
    color: 'from-green-500 to-emerald-600',
    contact: {
      email: 'support@billcraft.com',
      phone: '+1 (555) 123-4568',
      hours: '24/7 Support'
    },
    responseTime: 'Within 1 hour'
  },
  {
    title: 'Partnerships',
    description: 'Interested in becoming a partner or integration',
    icon: Building,
    color: 'from-purple-500 to-pink-600',
    contact: {
      email: 'partners@billcraft.com',
      phone: '+1 (555) 123-4569',
      hours: 'Mon-Fri 9AM-5PM PST'
    },
    responseTime: 'Within 24 hours'
  },
  {
    title: 'Media & Press',
    description: 'Press inquiries, interviews, and media requests',
    icon: Globe,
    color: 'from-orange-500 to-red-600',
    contact: {
      email: 'press@billcraft.com',
      phone: '+1 (555) 123-4570',
      hours: 'Mon-Fri 9AM-5PM PST'
    },
    responseTime: 'Within 4 hours'
  }
]

const offices = [
  {
    city: 'San Francisco',
    country: 'USA',
    type: 'Headquarters',
    address: '123 Market Street, Suite 100',
    postal: 'San Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    email: 'sf@billcraft.com',
    image: '🏢',
    timezone: 'PST (UTC-8)',
    employees: 45
  },
  {
    city: 'New York',
    country: 'USA',
    type: 'East Coast Office',
    address: '456 Broadway, Floor 12',
    postal: 'New York, NY 10013',
    phone: '+1 (555) 123-4571',
    email: 'ny@billcraft.com',
    image: '🗽',
    timezone: 'EST (UTC-5)',
    employees: 25
  },
  {
    city: 'London',
    country: 'UK',
    type: 'European Headquarters',
    address: '789 Oxford Street',
    postal: 'London W1C 1LA, UK',
    phone: '+44 20 1234 5678',
    email: 'london@billcraft.com',
    image: '🇬🇧',
    timezone: 'GMT (UTC+0)',
    employees: 30
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    type: 'APAC Hub',
    address: '321 Orchard Road, Level 15',
    postal: 'Singapore 238866',
    phone: '+65 1234 5678',
    email: 'singapore@billcraft.com',
    image: '🇸🇬',
    timezone: 'SGT (UTC+8)',
    employees: 20
  }
]

const faqs = [
  {
    question: 'How quickly will I receive a response?',
    answer: 'Response times vary by inquiry type. Sales and support typically respond within 1-2 hours during business hours, while other inquiries are answered within 24 hours.'
  },
  {
    question: 'Do you offer phone support?',
    answer: 'Yes! We offer phone support for technical issues and sales inquiries. Our support team is available 24/7, while sales is available during business hours.'
  },
  {
    question: 'Can I schedule a demo?',
    answer: 'Absolutely! Use our contact form or call our sales team to schedule a personalized demo of BillCraft tailored to your business needs.'
  },
  {
    question: 'Where are your offices located?',
    answer: 'We have offices in San Francisco (HQ), New York, London, and Singapore. You can visit us or reach out to your nearest office for local support.'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Let's Start a
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Conversation
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Whether you have questions, need support, or want to explore partnerships, 
              our team is here to help you succeed with BillCraft.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              How Can We Help?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the best way to reach us based on your inquiry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${option.color} rounded-lg mb-4`}>
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {option.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {option.description}
                    </p>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center justify-center">
                        <Mail className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="text-slate-700">{option.contact.email}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="text-slate-700">{option.contact.phone}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Clock className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="text-slate-700">{option.contact.hours}</span>
                      </div>
                    </div>
                    
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {option.responseTime}
                    </Badge>
                    
                    <Button className={`w-full mt-4 bg-gradient-to-r ${option.color} text-white hover:shadow-lg`}>
                      Contact {option.title.split(' ')[0]}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {!isSubmitted ? (
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Company
                          </label>
                          <Input
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full"
                            placeholder="Your Company"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Inquiry Type
                          </label>
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="sales">Sales</option>
                            <option value="support">Technical Support</option>
                            <option value="partnerships">Partnerships</option>
                            <option value="press">Media & Press</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="How can we help you?"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-green-700 mb-6">
                      Thank you for reaching out. We've received your message and will get back to you soon.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-100"
                    >
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
            
            {/* Contact Info & FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    Quick Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-slate-500 mr-3" />
                      <div>
                        <p className="font-medium text-slate-900">Email</p>
                        <p className="text-slate-600">hello@billcraft.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-slate-500 mr-3" />
                      <div>
                        <p className="font-medium text-slate-900">Phone</p>
                        <p className="text-slate-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-slate-500 mr-3" />
                      <div>
                        <p className="font-medium text-slate-900">Support Hours</p>
                        <p className="text-slate-600">24/7 for urgent issues</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQs */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0">
                        <h4 className="font-medium text-slate-900 mb-2">{faq.question}</h4>
                        <p className="text-sm text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Global Offices
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Visit us in person or reach out to your nearest office for local support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{office.image}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{office.city}</h3>
                    <p className="text-slate-600 font-medium mb-2">{office.country}</p>
                    <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                      {office.type}
                    </Badge>
                    
                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                        <div className="text-left">
                          <p>{office.address}</p>
                          <p>{office.postal}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-slate-500" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-slate-500" />
                        <span>{office.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-slate-500" />
                        <span>{office.timezone}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-500">
                      {office.employees} team members
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of businesses already using BillCraft to streamline 
              their invoicing and improve their cash flow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold">
                <Star className="w-5 h-5 mr-2" />
                Start 3-Month Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </div>
            
            <p className="text-slate-400 mt-6">
              No credit card required • 3 months free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
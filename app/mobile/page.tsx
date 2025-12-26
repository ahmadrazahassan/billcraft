'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Smartphone, 
  Download, 
  Star, 
  Zap, 
  Camera, 
  Wifi, 
  Bell, 
  Shield,
  ArrowRight,
  Play,
  Apple,
  Chrome,
  Users,
  Clock,
  FileText,
  CreditCard,
  BarChart3,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Camera,
    title: 'Scan & Create',
    description: 'Scan receipts and business cards to instantly create invoices with AI-powered data extraction'
  },
  {
    icon: Wifi,
    title: 'Offline Mode',
    description: 'Create and edit invoices without internet connection. Sync automatically when back online'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get instant alerts for payment updates, due dates, and client interactions'
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Accept payments on-the-go with built-in payment processing and secure checkout'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Monitor your business performance with interactive charts and insights'
  },
  {
    icon: FileText,
    title: 'Template Library',
    description: 'Access 50+ professional invoice templates optimized for mobile viewing'
  }
]

const screenshots = [
  {
    title: 'Dashboard',
    description: 'Overview of your business at a glance',
    image: '📊'
  },
  {
    title: 'Create Invoice',
    description: 'Streamlined invoice creation flow',
    image: '📄'
  },
  {
    title: 'Client Management',
    description: 'Manage clients and contact details',
    image: '👥'
  },
  {
    title: 'Payment Tracking',
    description: 'Track payments and follow up',
    image: '💳'
  },
  {
    title: 'Analytics',
    description: 'Business insights and reporting',
    image: '📈'
  }
]

const testimonials = [
  {
    name: 'Sarah Martinez',
    role: 'Freelance Designer',
    avatar: '👩‍🎨',
    rating: 5,
    comment: 'The mobile app has revolutionized how I handle invoicing. I can create and send invoices right from client meetings!'
  },
  {
    name: 'David Chen',
    role: 'Consultant',
    avatar: '👨‍💼',
    rating: 5,
    comment: 'Offline mode is a game-changer. I can work on invoices during flights and everything syncs perfectly when I land.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Small Business Owner',
    avatar: '👩‍💻',
    rating: 5,
    comment: 'The scanning feature saves me hours. Just snap a photo of receipts and the app extracts all the details automatically.'
  }
]

const stats = [
  { label: 'App Downloads', value: '100K+', icon: Download },
  { label: 'App Store Rating', value: '4.9★', icon: Star },
  { label: 'Countries Available', value: '150+', icon: Chrome },
  { label: 'Monthly Active Users', value: '50K+', icon: Users }
]

export default function MobilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
                <Smartphone className="w-4 h-4 mr-2" />
                Coming Soon - iOS & Android
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                Invoice on the
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                  Go with Mobile
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Create, send, and manage invoices from anywhere. The full power of BillCraft 
                in your pocket with offline capabilities and AI-powered features.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                  <Apple className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Get on Google Play
                </Button>
              </div>
              
              <div className="mt-8 flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-blue-500 mr-1" />
                  <span>100K+ Downloads</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-80 h-96 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full" />
                  <div className="pt-8 px-6 h-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-2">📱</div>
                      <h3 className="font-bold text-slate-900">BillCraft Mobile</h3>
                      <p className="text-sm text-slate-600">Professional Invoicing</p>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="bg-white/70 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Recent Invoices</span>
                          <Badge className="text-xs bg-green-100 text-green-700">3 Paid</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-slate-200 rounded w-full" />
                          <div className="h-2 bg-slate-200 rounded w-3/4" />
                          <div className="h-2 bg-slate-200 rounded w-1/2" />
                        </div>
                      </div>
                      
                      <div className="bg-white/70 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">This Month</span>
                          <span className="text-lg font-bold text-green-600">$12,450</span>
                        </div>
                        <div className="h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white text-center">
                      <Zap className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">Create Invoice</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features in Your Pocket
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your business finances, optimized for mobile
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/70 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Beautifully Designed Experience
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Intuitive interface designed for efficiency and ease of use
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 mb-4 aspect-[3/4] flex items-center justify-center text-6xl shadow-lg">
                  {screenshot.image}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{screenshot.title}</h3>
                <p className="text-sm text-slate-600">{screenshot.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What Users Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of professionals who love our mobile app
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-6 italic">"{testimonial.comment}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
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
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20" />
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Get Notified When We Launch
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Be the first to experience the future of mobile invoicing. 
              Join our waitlist and get exclusive early access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold">
                <Bell className="w-5 h-5 mr-2" />
                Join Waitlist
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-slate-300">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                <span>Free for early adopters</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                <span>No credit card required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
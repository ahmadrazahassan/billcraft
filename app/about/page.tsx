'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Target, Lightbulb, Heart, Shield, Users, Rocket, Zap, Calendar, Award, Brain, Globe, Building, MapPin, Mail, Phone, CheckCircle, TrendingUp, Clock, Eye, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Customer Obsession',
    description: 'Every decision starts with our customers. We build features that solve real problems.',
    color: 'bg-blue-500',
    stats: '99.8% satisfaction'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We leverage cutting-edge AI and technology to make invoicing simple.',
    color: 'bg-yellow-500',
    stats: '50+ features/year'
  },
  {
    icon: Heart,
    title: 'Simplicity',
    description: 'Beautiful design and intuitive interfaces make work enjoyable.',
    color: 'bg-pink-500',
    stats: '4.9/5 usability'
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Bank-grade encryption and SOC 2 compliance protect your data.',
    color: 'bg-green-500',
    stats: 'SOC 2 certified'
  }
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    avatar: '👩‍💼',
    bio: 'Former VP Product at Stripe. Stanford MBA, passionate about empowering entrepreneurs worldwide.',
    color: 'bg-blue-500',
    expertise: ['Product Strategy', 'Business Development', 'Team Leadership']
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-founder',
    avatar: '👨‍💻',
    bio: 'Ex-Google Principal Engineer. MIT CS, loves clean architecture and scalable systems.',
    color: 'bg-green-500',
    expertise: ['System Architecture', 'AI/ML', 'Team Building']
  },
  {
    name: 'Emily Watson',
    role: 'Head of Design',
    avatar: '👩‍🎨',
    bio: 'Award-winning designer from Apple. RISD graduate, believes great design should be invisible.',
    color: 'bg-purple-500',
    expertise: ['Product Design', 'Design Systems', 'User Research']
  },
  {
    name: 'Dr. Alex Kim',
    role: 'Head of AI',
    avatar: '👨‍🔬',
    bio: 'PhD from Stanford. Former OpenAI researcher leading our intelligent automation systems.',
    color: 'bg-cyan-500',
    expertise: ['Machine Learning', 'NLP', 'Computer Vision']
  },
  {
    name: 'Maria Gonzalez',
    role: 'Head of Customer Success',
    avatar: '👩‍💼',
    bio: 'Customer advocate with deep business operations background. Ensures every customer succeeds.',
    color: 'bg-orange-500',
    expertise: ['Customer Success', 'Business Operations', 'Account Management']
  },
  {
    name: 'James Thompson',
    role: 'VP of Engineering',
    avatar: '👨‍🔧',
    bio: 'Infrastructure expert who scaled platforms serving millions. Former Netflix engineer.',
    color: 'bg-teal-500',
    expertise: ['Infrastructure', 'DevOps', 'Security']
  }
]

const milestones = [
  {
    year: '2022',
    quarter: 'Q1',
    title: 'Company Founded',
    description: 'Started with a simple idea: make invoicing delightful for small businesses.',
    icon: Rocket,
    color: 'bg-blue-500',
    metrics: ['$500K pre-seed', '2 co-founders', 'First prototype']
  },
  {
    year: '2022',
    quarter: 'Q4',
    title: '1,000 Users',
    description: 'Reached our first thousand customers and launched automation features.',
    icon: Users,
    color: 'bg-green-500',
    metrics: ['1K+ users', '10K+ invoices', '99.5% uptime']
  },
  {
    year: '2023',
    quarter: 'Q2',
    title: 'Series A Funding',
    description: 'Raised $10M Series A led by Sequoia Capital to accelerate growth.',
    icon: TrendingUp,
    color: 'bg-purple-500',
    metrics: ['$10M Series A', 'Sequoia led', '15 employees']
  },
  {
    year: '2023',
    quarter: 'Q4',
    title: '10,000 Users',
    description: 'Crossed 10K users and launched enterprise features and mobile apps.',
    icon: Award,
    color: 'bg-orange-500',
    metrics: ['10K+ users', '500K+ invoices', '50+ integrations']
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Global Expansion',
    description: 'Launched in 25+ countries with multi-currency and localized features.',
    icon: Globe,
    color: 'bg-cyan-500',
    metrics: ['25+ countries', 'Multi-currency', 'Global team']
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'AI Revolution',
    description: 'Launched advanced AI features including smart automation and analytics.',
    icon: Brain,
    color: 'bg-pink-500',
    metrics: ['AI-powered', '90% automation', 'Smart insights']
  }
]

const offices = [
  {
    city: 'San Francisco',
    country: 'USA',
    type: 'Headquarters',
    address: '123 Market Street, San Francisco, CA 94105',
    employees: 45,
    image: '🏢'
  },
  {
    city: 'New York',
    country: 'USA', 
    type: 'East Coast Hub',
    address: '456 Broadway, New York, NY 10013',
    employees: 25,
    image: '🗽'
  },
  {
    city: 'London',
    country: 'UK',
    type: 'European HQ',
    address: '789 Oxford Street, London W1C 1LA',
    employees: 30,
    image: '🇬🇧'
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    type: 'APAC Hub',
    address: '321 Orchard Road, Singapore 238866',
    employees: 20,
    image: '🇸🇬'
  }
]

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 overflow-hidden">
      <Header />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
          <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div 
          animate={{ scale: [1, 0.7, 1], rotate: [360, 0] }}
          transition={{ duration: 35, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
        </div>
        
      {/* Hero Section */}
      <motion.section style={{ y }} className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
              className="inline-flex items-center justify-center mb-8"
            >
            <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-full px-8 py-4 shadow-2xl">
                <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-blue-600" />
                <span className="text-slate-800 text-lg font-bold">Building the Future</span>
                <Award className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
            initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl md:text-8xl font-black text-slate-900 mb-8"
            >
              Transforming How
              <br />
            <span className="text-blue-600">Businesses Get Paid</span>
            </motion.h1>
            
            <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-2xl text-slate-600 mb-12 max-w-4xl mx-auto"
            >
              We're on a mission to make invoicing delightful for millions of businesses worldwide. 
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.a
              href="/auth/signup"
              whileHover={{ scale: 1.08, y: -4 }}
              className="px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-2xl transition-all duration-300"
              >
                <span className="flex items-center">
                <Rocket className="w-6 h-6 mr-3" />
                  Join Our Mission
                </span>
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.08, y: -4 }}
              className="px-12 py-6 bg-white/80 backdrop-blur-2xl border-2 border-white/30 text-slate-700 hover:text-blue-600 text-lg font-bold rounded-full shadow-2xl transition-all duration-300"
              >
                <span className="flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                Contact Us
                </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Our Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide every decision and feature we build.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
            <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <div className="flex items-start space-x-6">
            <motion.div
                        className={`flex-shrink-0 w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
            </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{value.title}</h3>
                        <p className="text-slate-600 leading-relaxed mb-4">{value.description}</p>
                        <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full">
                          <span className="text-sm font-semibold text-slate-700">{value.stats}</span>
                </div>
              </div>
          </div>
            </div>
          </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Meet Our <span className="text-emerald-600">Team</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              World-class entrepreneurs and engineers passionate about helping businesses thrive.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-6 text-center shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className={`h-20 ${member.color} rounded-2xl mb-4 relative`}>
                    <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                      </div>
                  
                  <div className="relative -mt-12 mb-4">
                    <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl mx-auto">
                      {member.avatar}
                      </div>
                    </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="font-semibold mb-3 text-blue-600">{member.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
        />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-12 shadow-3xl border-2 border-white/20">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ready to Shape the Future?
            </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join us in building the most intelligent invoicing platform ever created.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-12 py-6 bg-white text-slate-900 text-xl font-bold rounded-full shadow-2xl"
              >
                <span className="flex items-center">
                  <Rocket className="w-6 h-6 mr-3" />
                  Start Your Journey
                </span>
              </motion.button>
                    </div>
                  </motion.div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Our <span className="text-purple-600">Journey</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From a simple idea to serving thousands of businesses worldwide.
            </p>
          </motion.div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              return (
              <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1">
                    <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-8 shadow-xl">
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 ${milestone.color} rounded-2xl flex items-center justify-center mr-4`}>
                          <Icon className="w-6 h-6 text-white" />
                    </div>
                        <div>
                          <span className="text-sm font-bold text-slate-500">{milestone.year} {milestone.quarter}</span>
                          <h3 className="text-2xl font-bold text-slate-900">{milestone.title}</h3>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-6">{milestone.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {milestone.metrics.map((metric) => (
                          <span key={metric} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-full">
                            {metric}
                          </span>
                        ))}
                      </div>
                      </div>
                    </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-slate-900 mb-8">
              Global <span className="text-emerald-600">Presence</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're building a world-class team across four continents to serve our global customer base.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-2xl border-2 border-white/30 rounded-[2rem] p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 text-center">
                  <div className="text-6xl mb-4">{office.image}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{office.city}</h3>
                    <p className="text-slate-600 font-medium mb-3">{office.country}</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                      {office.type}
                  </span>
                  
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center justify-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-center">{office.address}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{office.employees} team members</span>
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
            className="bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-[3rem] p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            </div>
            
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                Ready to Join Our Mission?
            </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Whether you're looking to streamline your business or join our incredible team, 
                we'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="/auth/signup"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="px-12 py-6 bg-white text-slate-900 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <span className="flex items-center">
                <Rocket className="w-6 h-6 mr-3" />
                Start Your Journey
                  </span>
                </motion.a>
                <motion.a
                  href="/careers"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="px-12 py-6 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  <span className="flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Join Our Team
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 

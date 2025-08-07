'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Target, 
  Lightbulb, 
  Heart, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  Award, 
  Rocket, 
  Star,
  ArrowRight,
  Quote,
  Calendar,
  MapPin,
  Building,
  ChevronDown,
  Play,
  Pause,
  Twitter,
  Linkedin,
  Github,
  Mail,
  CheckCircle,
  Sparkles,
  Layers,
  Code,
  Palette,
  Database,
  Brain,
  UserCheck,
  Server,
  FileText
} from 'lucide-react'



const values = [
  {
    icon: Target,
    title: 'Customer Obsession',
    description: 'Every decision we make starts with our customers. We build features that solve real problems and deliver genuine value to businesses worldwide.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    stats: '99.8% satisfaction'
  },
  {
    icon: Lightbulb,
    title: 'Relentless Innovation',
    description: 'We leverage cutting-edge AI, modern technology, and user research to make invoicing simple, fast, and intelligently automated.',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    stats: '50+ new features/year'
  },
  {
    icon: Heart,
    title: 'Elegant Simplicity',
    description: 'Complex problems deserve beautiful solutions. We believe exceptional design and intuitive interfaces make work not just productive, but enjoyable.',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    stats: '4.9/5 usability score'
  },
  {
    icon: Shield,
    title: 'Uncompromising Security',
    description: 'Your data is sacred. We implement enterprise-grade security, maintain SOC 2 compliance, and ensure complete transparency in our practices.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    stats: 'SOC 2 Type II certified'
  }
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    avatar: '👩‍💼',
    bio: 'Former VP Product at Stripe. Built payment systems used by millions of businesses. Stanford MBA, passionate about empowering entrepreneurs.',
    expertise: ['Product Strategy', 'Business Development', 'Team Leadership'],
    social: {
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarah-chen',
      email: 'sarah@billcraft.com'
    },
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-founder',
    avatar: '👨‍💻',
    bio: 'Ex-Google Principal Engineer. Led engineering teams at scale and shipped products used by billions. MIT CS, loves clean architecture.',
    expertise: ['System Architecture', 'AI/ML', 'Team Building'],
    social: {
      twitter: 'https://twitter.com/mrodriguez',
      linkedin: 'https://linkedin.com/in/michael-rodriguez',
      github: 'https://github.com/mrodriguez'
    },
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    name: 'Emily Watson',
    role: 'Head of Design',
    avatar: '👩‍🎨',
    bio: 'Award-winning designer from Apple. Previously led design for iOS Apps. RISD graduate, believes great design should be invisible yet powerful.',
    expertise: ['Product Design', 'Design Systems', 'User Research'],
    social: {
      twitter: 'https://twitter.com/emilywatson',
      linkedin: 'https://linkedin.com/in/emily-watson'
    },
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Dr. Alex Kim',
    role: 'Head of AI',
    avatar: '👨‍🔬',
    bio: 'PhD Computer Science from Stanford. Former OpenAI researcher. Leading our automated invoice generation and intelligent workflow systems.',
    expertise: ['Machine Learning', 'NLP', 'Computer Vision'],
    social: {
      linkedin: 'https://linkedin.com/in/alex-kim-phd',
      github: 'https://github.com/alexkim'
    },
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Maria Gonzalez',
    role: 'Head of Customer Success',
    avatar: '👩‍💼',
    bio: 'Customer advocate with deep small business operations background. Ensures every customer succeeds and grows with BillCraft.',
    expertise: ['Customer Success', 'Business Operations', 'Account Management'],
    social: {
      linkedin: 'https://linkedin.com/in/maria-gonzalez',
      email: 'maria@billcraft.com'
    },
    gradient: 'from-orange-500 to-red-600'
  },
  {
    name: 'James Thompson',
    role: 'VP of Engineering',
    avatar: '👨‍🔧',
    bio: 'Infrastructure expert who scaled platforms serving millions. Former Netflix engineer. Keeps BillCraft fast, reliable, and secure.',
    expertise: ['Infrastructure', 'DevOps', 'Security'],
    social: {
      linkedin: 'https://linkedin.com/in/james-thompson',
      github: 'https://github.com/jthompson'
    },
    gradient: 'from-teal-500 to-cyan-600'
  }
]

const milestones = [
  {
    year: '2022',
    quarter: 'Q1',
    title: 'Company Founded',
    description: 'Started with a simple idea: make invoicing delightful for small businesses. Raised pre-seed funding.',
    icon: Rocket,
    color: 'from-blue-500 to-indigo-600',
    metrics: ['$500K pre-seed', '2 co-founders', 'First prototype']
  },
  {
    year: '2022',
    quarter: 'Q4',
    title: '1,000 Users',
    description: 'Reached our first thousand happy customers and launched advanced automation features with AI-powered workflows.',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    metrics: ['1K+ users', '10K+ invoices', '99.5% uptime']
  },
  {
    year: '2023',
    quarter: 'Q2',
    title: 'Series A Funding',
    description: 'Raised $10M Series A led by Sequoia Capital to accelerate growth and expand internationally.',
    icon: Award,
    color: 'from-purple-500 to-pink-600',
    metrics: ['$10M Series A', 'Sequoia led', '15 employees']
  },
  {
    year: '2023',
    quarter: 'Q4',
    title: '10,000 Users',
    description: 'Crossed 10,000+ users milestone and launched enterprise features, API, and mobile apps.',
    icon: Star,
    color: 'from-yellow-500 to-orange-600',
    metrics: ['10K+ users', '500K+ invoices', '50+ integrations']
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Global Expansion',
    description: 'Launched in 25+ countries with multi-currency support and localized features for international markets.',
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
    metrics: ['25+ countries', 'Multi-currency', 'Global team']
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'AI Revolution',
    description: 'Launched advanced AI features including smart invoice generation, automated follow-ups, and predictive analytics.',
    icon: Brain,
    color: 'from-indigo-500 to-purple-600',
    metrics: ['AI-powered', '90% automation', 'Smart insights']
  }
]



const offices = [
  {
    city: 'San Francisco',
    country: 'USA',
    address: '123 Market Street, San Francisco, CA 94105',
    type: 'Headquarters',
    employees: 45,
    image: '🏢'
  },
  {
    city: 'New York',
    country: 'USA', 
    address: '456 Broadway, New York, NY 10013',
    type: 'East Coast Hub',
    employees: 25,
    image: '🗽'
  },
  {
    city: 'London',
    country: 'UK',
    address: '789 Oxford Street, London W1C 1LA',
    type: 'European Headquarters',
    employees: 30,
    image: '🇬🇧'
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '321 Orchard Road, Singapore 238866',
    type: 'APAC Hub',
    employees: 20,
    image: '🇸🇬'
  }
]

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Advanced Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <motion.div 
            style={{ y, opacity }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-orange-400/20 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8"
            >
              <Badge className="bg-white/90 text-slate-700 border-0 px-6 py-2 text-lg font-medium">
                <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                Building the Future of Business
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight"
            >
              Transforming How
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Businesses Get Paid
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              We're on a mission to make invoicing delightful for millions of businesses worldwide. 
              Join us in building the most intelligent, beautiful, and powerful invoicing platform ever created.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
                <Rocket className="w-6 h-6 mr-3" />
                Join Our Mission
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-6 text-lg font-semibold rounded-2xl">
                <Play className="w-6 h-6 mr-3" />
                Watch Our Story
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Impact Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200">
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              Our Impact
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              Transforming Business Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every day, we help thousands of businesses streamline their invoicing process with AI-powered automation and professional tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Serving businesses across multiple countries with localized features and multi-currency support for international commerce.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI helps automate invoice creation, smart form filling, and provides intelligent business insights to save time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with enterprise-grade security, data encryption, and reliable infrastructure to keep your business data safe and secure.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of businesses already using BillCraft to streamline their invoicing process.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section with Advanced Design */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Values</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The foundational principles that guide every decision we make and every feature we build
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className={`flex-shrink-0 p-4 bg-gradient-to-r ${value.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          {value.description}
                        </p>
                        <Badge className={`${value.bgColor} border-0 text-slate-700 font-medium`}>
                          {value.stats}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Journey</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From a simple idea to serving thousands of businesses worldwide
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />
              
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year + milestone.quarter}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                      <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 group">
                        <CardContent className="p-8">
                          <div className="flex items-center space-x-3 mb-4">
                            <Badge className={`bg-gradient-to-r ${milestone.color} text-white border-0 px-3 py-1`}>
                              {milestone.year} {milestone.quarter}
                            </Badge>
                            <h3 className="text-xl font-bold text-slate-900">
                              {milestone.title}
                            </h3>
                          </div>
                          <p className="text-slate-600 mb-6 leading-relaxed">
                            {milestone.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {milestone.metrics.map((metric, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="relative flex-shrink-0 w-16 h-16 bg-white rounded-full border-4 border-slate-200 shadow-lg flex items-center justify-center z-10">
                      <div className={`p-3 bg-gradient-to-r ${milestone.color} rounded-full`}>
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Team</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              World-class entrepreneurs, engineers, and designers united by our passion for helping businesses thrive
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Header with gradient */}
                    <div className={`h-24 bg-gradient-to-r ${member.gradient} relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    
                    {/* Avatar */}
                    <div className="relative -mt-12 text-center">
                      <div className="inline-block p-2 bg-white rounded-full shadow-lg">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center text-3xl">
                          {member.avatar}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 pt-4">
                      <h3 className="text-xl font-bold text-slate-900 text-center mb-1">
                        {member.name}
                      </h3>
                      <p className={`text-center font-semibold mb-4 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                        {member.role}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 text-center">
                        {member.bio}
                      </p>
                      
                      {/* Expertise tags */}
                      <div className="flex flex-wrap gap-1 mb-4 justify-center">
                        {member.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Social links */}
                      <div className="flex justify-center space-x-3">
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="p-2 bg-slate-100 hover:bg-blue-100 rounded-lg transition-colors">
                            <Twitter className="w-4 h-4 text-blue-600" />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="p-2 bg-slate-100 hover:bg-blue-100 rounded-lg transition-colors">
                            <Linkedin className="w-4 h-4 text-blue-600" />
                          </a>
                        )}
                        {member.social.github && (
                          <a href={member.social.github} className="p-2 bg-slate-100 hover:bg-gray-100 rounded-lg transition-colors">
                            <Github className="w-4 h-4 text-gray-700" />
                          </a>
                        )}
                        {member.social.email && (
                          <a href={`mailto:${member.social.email}`} className="p-2 bg-slate-100 hover:bg-green-100 rounded-lg transition-colors">
                            <Mail className="w-4 h-4 text-green-600" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Presence</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our team spans across four continents, bringing diverse perspectives and 24/7 support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{office.image}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{office.city}</h3>
                    <p className="text-slate-600 font-medium mb-3">{office.country}</p>
                    <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                      {office.type}
                    </Badge>
                    <p className="text-sm text-slate-600 mb-4">{office.address}</p>
                    <div className="flex items-center justify-center text-sm text-slate-500">
                      <Users className="w-4 h-4 mr-2" />
                      {office.employees} team members
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Heart className="w-8 h-8 text-white mr-3" />
              <span className="text-white font-semibold text-lg">Join Our Mission</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Shape the Future?
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Whether you're a customer, partner, or potential team member, we'd love to hear from you. 
              Let's build something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl">
                <Rocket className="w-6 h-6 mr-3" />
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-6 text-lg font-semibold rounded-2xl">
                <Users className="w-6 h-6 mr-3" />
                Join Our Team
              </Button>
            </div>
            
            <p className="text-slate-400 mt-8">
              No credit card required • 3 months free trial • Join 25,000+ happy customers
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
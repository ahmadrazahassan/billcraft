'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Building2,
  Code,
  Users,
  Globe,
  Star,
  ArrowRight,
  Check,
  Zap,
  Target,
  TrendingUp,
  Award,
  Network,
  Briefcase,
  FileText,
  Mail,
  ExternalLink,
  CheckCircle,
  Heart,
  Rocket
} from 'lucide-react'

const partnerTiers = [
  {
    name: 'Technology Partners',
    description: 'Seamless integrations with leading business tools and platforms',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    partners: [
      { name: 'Stripe', logo: '💳', category: 'Payments', status: 'Live' },
      { name: 'QuickBooks', logo: '📊', category: 'Accounting', status: 'Live' },
      { name: 'Salesforce', logo: '☁️', category: 'CRM', status: 'Live' },
      { name: 'Slack', logo: '💬', category: 'Communication', status: 'Live' },
      { name: 'Zapier', logo: '⚡', category: 'Automation', status: 'Live' },
      { name: 'HubSpot', logo: '🎯', category: 'Marketing', status: 'Live' }
    ],
    benefits: ['API access', 'Co-marketing opportunities', 'Technical support', 'Revenue sharing']
  },
  {
    name: 'Channel Partners',
    description: 'Resellers and consultants helping businesses adopt BillCraft',
    icon: Network,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    partners: [
      { name: 'KPMG', logo: '🏢', category: 'Consulting', status: 'Live' },
      { name: 'Deloitte', logo: '💼', category: 'Advisory', status: 'Live' },
      { name: 'PwC', logo: '🔍', category: 'Audit', status: 'Live' },
      { name: 'EY', logo: '📈', category: 'Strategy', status: 'Live' }
    ],
    benefits: ['Sales training', 'Lead sharing', 'Commission structure', 'Marketing support']
  },
  {
    name: 'Solution Partners',
    description: 'Implementation specialists and custom solution providers',
    icon: Building2,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    partners: [
      { name: 'Accenture', logo: '🚀', category: 'Implementation', status: 'Live' },
      { name: 'IBM Services', logo: '💻', category: 'Enterprise', status: 'Live' },
      { name: 'Cognizant', logo: '🔧', category: 'Custom Dev', status: 'Live' }
    ],
    benefits: ['Certification program', 'Implementation guides', 'Priority support', 'Partner portal']
  }
]

const successStories = [
  {
    company: 'TechFlow Solutions',
    partnerType: 'Technology Partner',
    challenge: 'Needed seamless integration between their project management tool and invoicing',
    solution: 'Built custom BillCraft integration using our API, reducing manual work by 80%',
    results: ['500+ joint customers', '$2M+ in processed invoices', '95% customer satisfaction'],
    logo: '🔄',
    testimonial: 'The BillCraft API made it incredibly easy to build our integration. Our customers love the seamless workflow.',
    author: 'Sarah Kim, CTO'
  },
  {
    company: 'Business Advisory Group',
    partnerType: 'Channel Partner',
    challenge: 'Clients struggled with invoice management and cash flow tracking',
    solution: 'Became certified BillCraft reseller, offering implementation and training services',
    results: ['150+ client implementations', '40% increase in client retention', '$500K additional revenue'],
    logo: '📊',
    testimonial: 'BillCraft has become a key part of our service offering. Clients see immediate value.',
    author: 'Michael Rodriguez, Partner'
  },
  {
    company: 'Enterprise Solutions Inc',
    partnerType: 'Solution Partner',
    challenge: 'Large enterprise needed custom invoicing workflow for complex billing scenarios',
    solution: 'Developed enterprise-grade solution using BillCraft platform and APIs',
    results: ['$10M+ in annual billings', '99.9% uptime', '50% faster processing'],
    logo: '🏗️',
    testimonial: 'BillCrafts flexibility allowed us to build exactly what our enterprise client needed.',
    author: 'David Chen, Solution Architect'
  }
]

const partnershipPrograms = [
  {
    title: 'Technology Partner Program',
    description: 'Build integrations and reach new customers through our marketplace',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Free API access and documentation',
      'Technical support and guidance',
      'Co-marketing opportunities',
      'Revenue sharing on referrals',
      'Partner marketplace listing',
      'Priority bug fixes and features'
    ],
    requirements: [
      'Active business with relevant product',
      'Technical team for integration',
      'Commitment to support customers',
      'Marketing collaboration'
    ],
    cta: 'Apply to Integrate'
  },
  {
    title: 'Channel Partner Program',
    description: 'Resell BillCraft and earn commissions while helping businesses grow',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    features: [
      'Competitive commission structure',
      'Sales training and certification',
      'Lead sharing and referrals',
      'Marketing materials and support',
      'Partner portal access',
      'Quarterly business reviews'
    ],
    requirements: [
      'Established customer base',
      'Sales and support capabilities',
      'Local market presence',
      'Commitment to quotas'
    ],
    cta: 'Become a Reseller'
  },
  {
    title: 'Solution Partner Program',
    description: 'Deliver custom implementations and consulting services',
    icon: Building2,
    color: 'from-purple-500 to-pink-600',
    features: [
      'Certification and training programs',
      'Implementation methodologies',
      'Priority technical support',
      'Custom development guidance',
      'Joint go-to-market strategy',
      'Success manager assignment'
    ],
    requirements: [
      'Proven implementation experience',
      'Certified technical team',
      'Customer success track record',
      'Professional services capability'
    ],
    cta: 'Join as Solution Partner'
  }
]

const partnerBenefits = [
  {
    icon: TrendingUp,
    title: 'Grow Your Revenue',
    description: 'Earn commissions, unlock new revenue streams, and expand your market reach',
    stats: 'Up to 30% commission'
  },
  {
    icon: Users,
    title: 'Access New Customers',
    description: 'Tap into our growing customer base and benefit from our marketing efforts',
    stats: '25,000+ potential customers'
  },
  {
    icon: Rocket,
    title: 'Scale Your Business',
    description: 'Leverage our platform to offer more value and grow faster',
    stats: '3x average partner growth'
  },
  {
    icon: Award,
    title: 'Industry Recognition',
    description: 'Get recognized as a certified partner and build your reputation',
    stats: 'Partner certification'
  },
  {
    icon: Heart,
    title: 'Dedicated Support',
    description: 'Get priority support, training, and dedicated partner success manager',
    stats: '24/7 partner support'
  },
  {
    icon: Globe,
    title: 'Global Opportunities',
    description: 'Expand internationally with our global partner network',
    stats: '25+ countries'
  }
]

export default function PartnersPage() {
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
              <Users className="w-4 h-4 mr-2" />
              Partner Ecosystem
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Partner with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                BillCraft
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Join our thriving partner ecosystem and help businesses around the world 
              streamline their invoicing while growing your own revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                <Users className="w-5 h-5 mr-2" />
                Become a Partner
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                <FileText className="w-5 h-5 mr-2" />
                Partner Portal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Partner with BillCraft?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join a rapidly growing ecosystem and unlock new opportunities for your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 mb-3 leading-relaxed">
                      {benefit.description}
                    </p>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      {benefit.stats}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Partner Categories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Multiple ways to partner with us and create value for your customers
            </p>
          </motion.div>

          <div className="space-y-12">
            {partnerTiers.map((tier, tierIndex) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: tierIndex * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-xl"
              >
                <div className="flex items-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${tier.color} rounded-xl mr-6`}>
                    {React.createElement(tier.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                    <p className="text-slate-600">{tier.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Partners List */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Current Partners</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {tier.partners.map((partner, index) => (
                        <div key={partner.name} className="bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors">
                          <div className="text-2xl mb-2">{partner.logo}</div>
                          <p className="font-medium text-slate-900 text-sm">{partner.name}</p>
                          <p className="text-xs text-slate-500">{partner.category}</p>
                          <Badge className="mt-2 text-xs bg-green-100 text-green-700 border-green-200">
                            {partner.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Partner Benefits</h4>
                    <div className="space-y-3">
                      {tier.benefits.map((benefit, idx) => (
                        <div key={benefit} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-slate-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Programs */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Partnership Programs
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Structured programs designed to help you succeed and grow with BillCraft
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnershipPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl mb-6`}>
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {program.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">What You Get:</h4>
                        <div className="space-y-2">
                          {program.features.map((feature, idx) => (
                            <div key={feature} className="flex items-start">
                              <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Requirements:</h4>
                        <div className="space-y-2">
                          {program.requirements.map((req, idx) => (
                            <div key={req} className="flex items-start">
                              <Target className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-600">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button className={`w-full mt-6 bg-gradient-to-r ${program.color} text-white hover:shadow-lg`}>
                      {program.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Partner Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how our partners are growing their businesses with BillCraft
            </p>
          </motion.div>

          <div className="space-y-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="text-4xl">{story.logo}</div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{story.company}</h3>
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              {story.partnerType}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Challenge:</h4>
                            <p className="text-slate-600">{story.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Solution:</h4>
                            <p className="text-slate-600">{story.solution}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Results:</h4>
                        <div className="space-y-3 mb-6">
                          {story.results.map((result, idx) => (
                            <div key={result} className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-2" />
                              <span className="text-sm text-slate-600">{result}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-sm text-slate-600 italic mb-2">"{story.testimonial}"</p>
                          <p className="text-xs text-slate-500 font-medium">— {story.author}</p>
                        </div>
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
              Ready to Partner with Us?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join our growing ecosystem of partners and start creating value 
              for your customers while growing your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold">
                <Users className="w-5 h-5 mr-2" />
                Apply to Partner
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Contact Partner Team
              </Button>
            </div>
            
            <p className="text-slate-400 mt-6">
              Questions? Email us at partners@billcraft.com
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
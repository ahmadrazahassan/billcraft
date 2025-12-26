'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Briefcase, 
  Heart, 
  Users, 
  Globe, 
  Rocket, 
  Star,
  Coffee,
  Gamepad2,
  Dumbbell,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Award,
  Target,
  Zap
} from 'lucide-react'

const openPositions = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote / San Francisco',
    type: 'Full-time',
    level: 'Senior',
    salary: '$120k - $180k',
    description: 'Join our frontend team to build beautiful, responsive interfaces using React, TypeScript, and Next.js.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'UI/UX design sense', 'Performance optimization'],
    benefits: ['Equity package', 'Health insurance', 'Remote work', '4 weeks PTO']
  },
  {
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote / New York',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: '$110k - $170k',
    description: 'Build scalable APIs and microservices using Node.js, Python, and cloud technologies.',
    requirements: ['3+ years backend experience', 'API design', 'Database optimization', 'Cloud platforms (AWS/GCP)'],
    benefits: ['Stock options', 'Health + dental', 'Flexible hours', 'Learning budget']
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Hybrid / Los Angeles',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$90k - $140k',
    description: 'Design intuitive user experiences for our invoicing platform and help shape our design system.',
    requirements: ['3+ years UX/UI design', 'Figma expertise', 'Design systems', 'User research'],
    benefits: ['Creative freedom', 'Design conference budget', 'Health benefits', 'Mental health support']
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    salary: '$130k - $190k',
    description: 'Build and maintain our infrastructure, CI/CD pipelines, and monitoring systems.',
    requirements: ['Kubernetes experience', 'CI/CD expertise', 'Infrastructure as code', 'Monitoring & observability'],
    benefits: ['Top-tier salary', 'Unlimited PTO', 'Home office stipend', 'Professional development']
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Austin / Remote',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$70k - $110k',
    description: 'Help our customers succeed with BillCraft and drive product adoption across our user base.',
    requirements: ['SaaS customer success experience', 'Communication skills', 'Data analysis', 'Problem solving'],
    benefits: ['Commission structure', 'Career growth path', 'Travel opportunities', 'Team events']
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    level: 'Mid-Senior',
    salary: '$80k - $130k',
    description: 'Lead our content marketing efforts and help grow our brand presence across digital channels.',
    requirements: ['Digital marketing experience', 'Content creation', 'SEO/SEM knowledge', 'Analytics tools'],
    benefits: ['Creative autonomy', 'Marketing budget', 'Conference attendance', 'Flexible schedule']
  }
]

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision insurance for you and your family',
    features: ['100% premium coverage', 'Mental health support', 'Fitness stipend', 'Annual health checkups']
  },
  {
    icon: Rocket,
    title: 'Growth & Learning',
    description: 'Invest in your professional development with our learning budget',
    features: ['$2,000 learning budget', 'Conference attendance', 'Internal mentorship', 'Skill workshops']
  },
  {
    icon: Globe,
    title: 'Remote-First Culture',
    description: 'Work from anywhere with flexible hours and strong remote collaboration',
    features: ['Global remote work', 'Flexible schedules', 'Home office setup', 'Co-working stipend']
  },
  {
    icon: Coffee,
    title: 'Work-Life Balance',
    description: 'We believe in sustainable work practices and personal time',
    features: ['Unlimited PTO', 'Sabbatical program', 'No weekend work', 'Family leave']
  },
  {
    icon: DollarSign,
    title: 'Competitive Compensation',
    description: 'Fair pay with equity upside and performance bonuses',
    features: ['Market-rate salaries', 'Equity packages', 'Performance bonuses', 'Transparent pay scales']
  },
  {
    icon: Users,
    title: 'Amazing Team',
    description: 'Work with passionate, talented people who care about what they build',
    features: ['Diverse team', 'Collaborative culture', 'Team retreats', 'Social events']
  }
]

const values = [
  {
    icon: Target,
    title: 'Customer Obsession',
    description: 'We start with the customer and work backwards to build solutions that truly matter.'
  },
  {
    icon: Rocket,
    title: 'Move Fast',
    description: 'We ship early and iterate quickly, learning from real user feedback.'
  },
  {
    icon: Users,
    title: 'Own It',
    description: 'Take ownership of your work and see projects through from start to finish.'
  },
  {
    icon: TrendingUp,
    title: 'Raise the Bar',
    description: 'Continuously improve yourself, your team, and the products we build.'
  }
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    avatar: '👩‍💼',
    bio: 'Former VP at Stripe. Built payment systems used by millions of businesses worldwide.'
  },
  {
    name: 'Alex Rodriguez',
    role: 'CTO & Co-founder',
    avatar: '👨‍💻',
    bio: 'Ex-Google engineer. Led engineering teams at scale and shipped products used by billions.'
  },
  {
    name: 'Maya Patel',
    role: 'Head of Product',
    avatar: '👩‍🎨',
    bio: 'Previously at Airbnb. Creates beautiful experiences that users love.'
  },
  {
    name: 'David Kim',
    role: 'VP of Engineering',
    avatar: '👨‍🔬',
    bio: 'Former tech lead at Uber. Expert in distributed systems and team building.'
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-green-100 text-green-700 border-green-200 px-4 py-2">
              <Briefcase className="w-4 h-4 mr-2" />
              We're Hiring!
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Join the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
                Business Finance
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Help us build the next generation of invoicing and business management tools. 
              Work with an amazing team, solve interesting problems, and make a real impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 text-lg">
                <Briefcase className="w-5 h-5 mr-2" />
                View Open Positions
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                <Users className="w-5 h-5 mr-2" />
                Meet the Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide how we work, make decisions, and treat each other
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/70 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why You'll Love Working Here
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We offer comprehensive benefits and a culture that supports your growth and well-being
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 mb-4">{benefit.description}</p>
                    <ul className="space-y-2">
                      {benefit.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find your next opportunity and help us build the future of business finance
            </p>
          </motion.div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <h3 className="text-xl font-bold text-slate-900">{position.title}</h3>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {position.department}
                          </Badge>
                          <Badge variant="outline" className="border-slate-300 text-slate-600">
                            {position.level}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {position.type}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {position.salary}
                          </div>
                        </div>
                        
                        <p className="text-slate-600 mb-4">{position.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-slate-900 mb-2">Requirements:</h4>
                            <div className="flex flex-wrap gap-2">
                              {position.requirements.map((req, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-slate-900 mb-2">Benefits:</h4>
                            <div className="flex flex-wrap gap-2">
                              {position.benefits.map((benefit, idx) => (
                                <Badge key={idx} className="text-xs bg-green-100 text-green-700 border-green-200">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:ml-6">
                        <Button className="w-full lg:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The passionate leaders building the future of business finance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{member.avatar}</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-slate-600">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-green-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20" />
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Don't see the perfect role? We're always looking for exceptional talent. 
              Send us your resume and let's start a conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold">
                <Briefcase className="w-5 h-5 mr-2" />
                Send Your Resume
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg">
                <Users className="w-5 h-5 mr-2" />
                Learn About Our Culture
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
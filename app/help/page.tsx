'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  HelpCircle,
  Search,
  Book,
  FileText,
  MessageCircle,
  ArrowRight,
  Star,
  Clock,
  Users,
  Zap,
  Shield,
  CreditCard,
  Settings,
  Smartphone,
  Globe,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Mail,
  Phone
} from 'lucide-react'

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'Everything you need to know to get up and running',
    icon: Zap,
    color: 'from-blue-500 to-indigo-600',
    articles: 12,
    popular: true,
    topics: [
      'Creating your first invoice',
      'Setting up your account',
      'Adding clients and products',
      'Customizing invoice templates'
    ]
  },
  {
    title: 'Billing & Payments',
    description: 'Learn about invoicing, payments, and managing transactions',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-600',
    articles: 18,
    popular: true,
    topics: [
      'Payment gateway setup',
      'Recurring invoices',
      'Late payment reminders',
      'Refunds and credits'
    ]
  },
  {
    title: 'Account Settings',
    description: 'Manage your account, preferences, and team settings',
    icon: Settings,
    color: 'from-purple-500 to-pink-600',
    articles: 8,
    popular: false,
    topics: [
      'Profile management',
      'Team permissions',
      'Notification settings',
      'Data export'
    ]
  },
  {
    title: 'Mobile App',
    description: 'Using BillCraft on your mobile device',
    icon: Smartphone,
    color: 'from-orange-500 to-red-600',
    articles: 6,
    popular: false,
    topics: [
      'Mobile app download',
      'Creating invoices on mobile',
      'Offline functionality',
      'Push notifications'
    ]
  },
  {
    title: 'Integrations',
    description: 'Connect BillCraft with your favorite tools',
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
    articles: 15,
    popular: true,
    topics: [
      'QuickBooks integration',
      'Stripe payment setup',
      'Zapier automations',
      'API documentation'
    ]
  },
  {
    title: 'Security & Privacy',
    description: 'Keep your data safe and understand our privacy practices',
    icon: Shield,
    color: 'from-indigo-500 to-purple-600',
    articles: 10,
    popular: false,
    topics: [
      'Two-factor authentication',
      'Data encryption',
      'GDPR compliance',
      'Account security'
    ]
  }
]

const popularArticles = [
  {
    title: 'How to create your first invoice in 5 minutes',
    category: 'Getting Started',
    readTime: '5 min read',
    rating: 4.9,
    views: 15420,
    description: 'Step-by-step guide to creating and sending your first professional invoice'
  },
  {
    title: 'Setting up automatic payment reminders',
    category: 'Billing & Payments',
    readTime: '3 min read',
    rating: 4.8,
    views: 12330,
    description: 'Never chase payments again with automated reminder sequences'
  },
  {
    title: 'Customizing your invoice templates',
    category: 'Getting Started',
    readTime: '7 min read',
    rating: 4.7,
    views: 9880,
    description: 'Make your invoices stand out with custom branding and layouts'
  },
  {
    title: 'QuickBooks integration setup guide',
    category: 'Integrations',
    readTime: '10 min read',
    rating: 4.6,
    views: 8750,
    description: 'Sync your BillCraft invoices with QuickBooks for seamless accounting'
  },
  {
    title: 'Understanding payment processing fees',
    category: 'Billing & Payments',
    readTime: '4 min read',
    rating: 4.5,
    views: 7220,
    description: 'Learn about different payment methods and their associated costs'
  }
]

const faqs = [
  {
    question: 'How much does BillCraft cost?',
    answer: 'BillCraft offers flexible pricing starting from $9/month for individuals up to enterprise plans. We also offer a 3 months free trial with no credit card required.',
    category: 'Pricing'
  },
  {
    question: 'Can I customize my invoice templates?',
    answer: 'Yes! BillCraft offers 10+ professional templates that you can fully customize with your branding, colors, logo, and layout preferences.',
    category: 'Features'
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We support all major payment methods including credit cards, bank transfers, PayPal, Stripe, and many regional payment providers.',
    category: 'Payments'
  },
  {
    question: 'Is my data secure with BillCraft?',
    answer: 'Absolutely. We use bank-level encryption, are SOC 2 Type II certified, and follow strict security protocols to protect your data.',
    category: 'Security'
  },
  {
    question: 'Can I use BillCraft on my mobile device?',
    answer: 'Yes! We have native mobile apps for iOS and Android, plus our web app is fully responsive and works great on mobile browsers.',
    category: 'Mobile'
  },
  {
    question: 'Do you offer customer support?',
    answer: 'We provide 24/7 customer support via chat, email, and phone. Plus extensive documentation and help resources.',
    category: 'Support'
  }
]



const supportOptions = [
  {
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    availability: '24/7',
    responseTime: 'Under 2 minutes',
    icon: MessageCircle,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Email Support',
    description: 'Send us detailed questions and get comprehensive answers',
    availability: '24/7',
    responseTime: 'Under 4 hours',
    icon: Mail,
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Phone Support',
    description: 'Talk directly with our technical specialists',
    availability: 'Business hours',
    responseTime: 'Immediate',
    icon: Phone,
    color: 'from-purple-500 to-pink-600'
  },

]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
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
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              How Can We
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Help You?
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Find answers, get support, and learn how to make the most of BillCraft 
              with our comprehensive help center.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
              <Input
                placeholder="Search for help articles and guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-6 py-6 text-lg border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {['Getting Started', 'Payments', 'Invoicing', 'Integrations', 'Mobile App'].map((tag) => (
                <Button key={tag} variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:bg-slate-50">
                  {tag}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find the help you need organized by topic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      {category.popular && (
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {category.topics.slice(0, 3).map((topic) => (
                        <div key={topic} className="text-sm text-slate-500 hover:text-blue-600 cursor-pointer">
                          • {topic}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{category.articles} articles</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Popular Articles
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The most helpful articles based on user feedback and views
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge variant="outline" className="border-slate-300 text-slate-600">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-sm text-slate-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center text-sm text-slate-500">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {article.rating}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {article.description}
                        </p>
                        
                        <div className="text-sm text-slate-500">
                          {article.views.toLocaleString()} views
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="ml-6 border-slate-300 text-slate-700 hover:bg-slate-50">
                        Read
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Quick answers to the most common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {faq.question}
                          </h3>
                          <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                            {faq.category}
                          </Badge>
                        </div>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>
                    
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our support team is here to help you succeed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
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
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Available:</span>
                        <span className="text-slate-700 font-medium">{option.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Response:</span>
                        <span className="text-slate-700 font-medium">{option.responseTime}</span>
                      </div>
                    </div>
                    
                    <Button className={`w-full mt-4 bg-gradient-to-r ${option.color} text-white hover:shadow-lg`}>
                      Get Help
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
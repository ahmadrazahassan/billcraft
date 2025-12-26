'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Zap, 
  CreditCard, 
  Mail, 
  Calendar, 
  FileText, 
  Database, 
  Smartphone, 
  Globe, 
  Users, 
  Lock,
  ArrowRight,
  Check,
  Star,
  Cloud,
  Workflow,
  Shield
} from 'lucide-react'

const integrationCategories = [
  {
    title: 'Payment Processing',
    description: 'Accept payments instantly with leading payment providers',
    icon: CreditCard,
    color: 'from-green-400 to-emerald-500',
    integrations: [
      { name: 'Stripe', logo: '💳', status: 'Live', features: ['Instant payments', 'Global reach', 'Advanced analytics'] },
      { name: 'PayPal', logo: '💰', status: 'Live', features: ['Easy setup', 'Buyer protection', 'Mobile payments'] },
      { name: 'Square', logo: '⬜', status: 'Live', features: ['In-person payments', 'Inventory sync', 'Real-time reporting'] },
      { name: 'Razorpay', logo: '⚡', status: 'Beta', features: ['UPI payments', 'Multi-currency', 'Smart routing'] }
    ]
  },
  {
    title: 'Accounting & Finance',
    description: 'Sync your invoices with popular accounting platforms',
    icon: Database,
    color: 'from-blue-400 to-indigo-500',
    integrations: [
      { name: 'QuickBooks', logo: '📊', status: 'Live', features: ['Auto-sync transactions', 'Real-time updates', 'Tax reporting'] },
      { name: 'Xero', logo: '📈', status: 'Live', features: ['Bank reconciliation', 'Multi-currency', 'Custom reports'] },
      { name: 'FreshBooks', logo: '📋', status: 'Live', features: ['Time tracking', 'Expense management', 'Client portal'] },
      { name: 'Sage', logo: '🏦', status: 'Coming Soon', features: ['Enterprise features', 'Advanced reporting', 'Multi-entity'] }
    ]
  },
  {
    title: 'Communication',
    description: 'Stay connected with clients through automated notifications',
    icon: Mail,
    color: 'from-purple-400 to-pink-500',
    integrations: [
      { name: 'Mailchimp', logo: '📧', status: 'Live', features: ['Email campaigns', 'Automation', 'Analytics'] },
      { name: 'SendGrid', logo: '📬', status: 'Live', features: ['Transactional emails', 'Templates', 'Delivery optimization'] },
      { name: 'Twilio', logo: '📱', status: 'Beta', features: ['SMS notifications', 'Voice calls', 'WhatsApp integration'] },
      { name: 'Slack', logo: '💬', status: 'Live', features: ['Team notifications', 'Invoice alerts', 'Workflow automation'] }
    ]
  },
  {
    title: 'CRM & Sales',
    description: 'Integrate with your customer relationship management tools',
    icon: Users,
    color: 'from-orange-400 to-red-500',
    integrations: [
      { name: 'Salesforce', logo: '☁️', status: 'Live', features: ['Lead management', 'Opportunity tracking', 'Custom objects'] },
      { name: 'HubSpot', logo: '🎯', status: 'Live', features: ['Contact sync', 'Deal pipeline', 'Marketing automation'] },
      { name: 'Pipedrive', logo: '🔄', status: 'Live', features: ['Sales pipeline', 'Activity tracking', 'Revenue forecasting'] },
      { name: 'Zoho CRM', logo: '🏢', status: 'Beta', features: ['Contact management', 'Sales automation', 'Analytics'] }
    ]
  },
  {
    title: 'Cloud Storage',
    description: 'Backup and manage your documents with cloud storage solutions',
    icon: Cloud,
    color: 'from-teal-400 to-cyan-500',
    integrations: [
      { name: 'Google Drive', logo: '💾', status: 'Live', features: ['Auto-backup', 'Collaborative editing', 'Version control'] },
      { name: 'Dropbox', logo: '📦', status: 'Live', features: ['File sync', 'Share permissions', 'Smart sync'] },
      { name: 'OneDrive', logo: '☁️', status: 'Live', features: ['Office integration', 'Real-time collaboration', 'Advanced security'] },
      { name: 'Box', logo: '📁', status: 'Beta', features: ['Enterprise security', 'Workflow automation', 'Content management'] }
    ]
  },
  {
    title: 'Project Management',
    description: 'Connect with your favorite project management tools',
    icon: FileText,
    color: 'from-yellow-400 to-orange-500',
    integrations: [
      { name: 'Asana', logo: '🎯', status: 'Live', features: ['Task tracking', 'Time logging', 'Project billing'] },
      { name: 'Trello', logo: '📋', status: 'Live', features: ['Board integration', 'Card automation', 'Time tracking'] },
      { name: 'Monday.com', logo: '📊', status: 'Beta', features: ['Workflow automation', 'Time tracking', 'Resource management'] },
      { name: 'Notion', logo: '📝', status: 'Coming Soon', features: ['Database sync', 'Template automation', 'Collaborative workspace'] }
    ]
  }
]

const features = [
  {
    icon: Zap,
    title: 'One-Click Setup',
    description: 'Connect your tools in seconds with our pre-built integrations'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and OAuth 2.0 authentication for all connections'
  },
  {
    icon: Workflow,
    title: 'Smart Automation',
    description: 'Create custom workflows that trigger actions across your entire tech stack'
  },
  {
    icon: Globe,
    title: 'API Access',
    description: 'Build custom integrations with our comprehensive REST API'
  }
]

export default function IntegrationsPage() {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              200+ Integrations Available
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Connect Everything
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                In One Place
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Seamlessly integrate BillCraft with your favorite tools and streamline your 
              entire business workflow. From payments to project management, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Browse Integrations
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                <Globe className="w-5 h-5 mr-2" />
                API Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Integrations?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built for reliability, designed for simplicity, secured for enterprise
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/70 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
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

      {/* Integration Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Popular Integration Categories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover integrations by category and find the perfect tools for your workflow
            </p>
          </motion.div>

          <div className="space-y-12">
            {integrationCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-xl"
              >
                <div className="flex items-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl mr-6`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{category.title}</h3>
                    <p className="text-slate-600">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.integrations.map((integration, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{integration.logo}</span>
                            <div>
                              <h4 className="font-semibold text-slate-900">{integration.name}</h4>
                              <Badge 
                                className={`text-xs ${
                                  integration.status === 'Live' ? 'bg-green-100 text-green-700 border-green-200' :
                                  integration.status === 'Beta' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                  'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                              >
                                {integration.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {integration.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-slate-600">
                              <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-4 border-slate-300 text-slate-700 hover:bg-slate-50"
                          disabled={integration.status === 'Coming Soon'}
                        >
                          {integration.status === 'Coming Soon' ? 'Coming Soon' : 'Connect'}
                          {integration.status !== 'Coming Soon' && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20" />
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Connect Your Tools?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Start integrating BillCraft with your favorite tools today and streamline 
              your entire business workflow in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold">
                <Zap className="w-5 h-5 mr-2" />
                Start Integrating
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg">
                <Globe className="w-5 h-5 mr-2" />
                API Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
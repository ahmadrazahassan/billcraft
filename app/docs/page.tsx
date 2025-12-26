'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Book,
  Search,
  Code,
  Terminal,
  FileText,
  ArrowRight,
  Copy,
  ExternalLink,
  Download,
  Play,
  Layers,
  Zap,
  Shield,
  Globe,
  Users,
  ChevronRight,
  ChevronDown,
  Hash,
  Eye,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Lock
} from 'lucide-react'

const docCategories = [
  {
    title: 'Getting Started',
    description: 'Quick start guides and basic concepts',
    icon: Zap,
    color: 'from-blue-500 to-indigo-600',
    docs: [
      { title: 'Introduction to BillCraft API', time: '5 min', difficulty: 'Beginner' },
      { title: 'Authentication & API Keys', time: '3 min', difficulty: 'Beginner' },
      { title: 'Making Your First API Call', time: '10 min', difficulty: 'Beginner' },
      { title: 'Understanding Rate Limits', time: '5 min', difficulty: 'Beginner' }
    ]
  },
  {
    title: 'API Reference',
    description: 'Complete API endpoints and parameters',
    icon: Code,
    color: 'from-green-500 to-emerald-600',
    docs: [
      { title: 'Invoices API', time: '15 min', difficulty: 'Intermediate' },
      { title: 'Clients API', time: '10 min', difficulty: 'Intermediate' },
      { title: 'Payments API', time: '12 min', difficulty: 'Advanced' },
      { title: 'Webhooks API', time: '8 min', difficulty: 'Advanced' }
    ]
  },
  {
    title: 'SDKs & Libraries',
    description: 'Language-specific implementations',
    icon: Layers,
    color: 'from-purple-500 to-pink-600',
    docs: [
      { title: 'JavaScript SDK', time: '12 min', difficulty: 'Intermediate' },
      { title: 'Python SDK', time: '10 min', difficulty: 'Intermediate' },
      { title: 'PHP SDK', time: '8 min', difficulty: 'Intermediate' },
      { title: 'Ruby SDK', time: '10 min', difficulty: 'Intermediate' }
    ]
  },
  {
    title: 'Integrations',
    description: 'Connect with third-party services',
    icon: Globe,
    color: 'from-orange-500 to-red-600',
    docs: [
      { title: 'Stripe Integration', time: '15 min', difficulty: 'Intermediate' },
      { title: 'QuickBooks Sync', time: '20 min', difficulty: 'Advanced' },
      { title: 'Zapier Setup', time: '8 min', difficulty: 'Beginner' },
      { title: 'Custom Webhooks', time: '18 min', difficulty: 'Advanced' }
    ]
  },
  {
    title: 'Security',
    description: 'Security best practices and compliance',
    icon: Shield,
    color: 'from-indigo-500 to-purple-600',
    docs: [
      { title: 'API Security Overview', time: '10 min', difficulty: 'Intermediate' },
      { title: 'OAuth 2.0 Implementation', time: '25 min', difficulty: 'Advanced' },
      { title: 'Data Encryption', time: '12 min', difficulty: 'Advanced' },
      { title: 'GDPR Compliance', time: '15 min', difficulty: 'Intermediate' }
    ]
  },
  {
    title: 'Advanced',
    description: 'Advanced features and customizations',
    icon: Terminal,
    color: 'from-cyan-500 to-blue-600',
    docs: [
      { title: 'Custom Templates', time: '20 min', difficulty: 'Advanced' },
      { title: 'Bulk Operations', time: '15 min', difficulty: 'Advanced' },
      { title: 'Advanced Filtering', time: '12 min', difficulty: 'Intermediate' },
      { title: 'Performance Optimization', time: '18 min', difficulty: 'Advanced' }
    ]
  }
]

const codeExamples = [
  {
    title: 'Create an Invoice',
    language: 'JavaScript',
    description: 'Basic example of creating a new invoice using the API',
    code: `const billcraft = require('billcraft-api');

const client = new billcraft.Client('your-api-key');

const invoice = await client.invoices.create({
  client_id: 'client_123',
  items: [
    {
      name: 'Web Development',
      quantity: 1,
      price: 1500.00,
      description: 'Frontend development services'
    }
  ],
  due_date: '2024-02-15',
  notes: 'Thank you for your business!'
});

console.log('Invoice created:', invoice.id);`
  },
  {
    title: 'Retrieve Payments',
    language: 'Python',
    description: 'Fetch all payments for a specific invoice',
    code: `import billcraft

client = billcraft.Client('your-api-key')

# Get payments for an invoice
payments = client.payments.list(
    invoice_id='inv_123',
    status='completed'
)

for payment in payments:
    print(f"Payment {payment.id}: \${payment.amount}")`
  },
  {
    title: 'Handle Webhooks',
    language: 'PHP',
    description: 'Process webhook events securely',
    code: `<?php
require_once 'vendor/autoload.php';

use BillCraft\\Webhook;

$webhook = new Webhook('your-webhook-secret');

$payload = file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_BILLCRAFT_SIGNATURE'];

try {
    $event = $webhook->constructEvent($payload, $sig_header);
    
    if ($event['type'] === 'invoice.paid') {
        $invoice = $event['data']['object'];
        // Handle paid invoice
        updateOrderStatus($invoice['id'], 'paid');
    }
    
    http_response_code(200);
} catch (Exception $e) {
    http_response_code(400);
    echo $e->getMessage();
}`
  }
]

const quickLinks = [
  { title: 'API Changelog', icon: FileText, href: '/docs/changelog' },
  { title: 'GitHub Repository', icon: Code, href: 'https://github.com/billcraft' },
  { title: 'Postman Collection', icon: Download, href: '/api/postman' },
  { title: 'OpenAPI Spec', icon: FileText, href: '/api/openapi.json' }
]

const popularDocs = [
  {
    title: 'Authentication Guide',
    description: 'Learn how to authenticate with the BillCraft API',
    category: 'Getting Started',
    readTime: '5 min',
    views: 25420,
    lastUpdated: '2024-01-15'
  },
  {
    title: 'Invoice Management',
    description: 'Complete guide to creating and managing invoices',
    category: 'API Reference',
    readTime: '15 min',
    views: 18350,
    lastUpdated: '2024-01-12'
  },
  {
    title: 'Webhook Implementation',
    description: 'Set up webhooks to receive real-time events',
    category: 'Advanced',
    readTime: '12 min',
    views: 15720,
    lastUpdated: '2024-01-10'
  },
  {
    title: 'JavaScript SDK Tutorial',
    description: 'Get started with our JavaScript SDK',
    category: 'SDKs',
    readTime: '10 min',
    views: 12890,
    lastUpdated: '2024-01-08'
  }
]

const apiEndpoints = [
  {
    method: 'GET',
    endpoint: '/v1/invoices',
    description: 'List all invoices',
    authenticated: true,
    rateLimit: '100/min'
  },
  {
    method: 'POST',
    endpoint: '/v1/invoices',
    description: 'Create a new invoice',
    authenticated: true,
    rateLimit: '50/min'
  },
  {
    method: 'GET',
    endpoint: '/v1/invoices/{id}',
    description: 'Retrieve a specific invoice',
    authenticated: true,
    rateLimit: '200/min'
  },
  {
    method: 'PUT',
    endpoint: '/v1/invoices/{id}',
    description: 'Update an existing invoice',
    authenticated: true,
    rateLimit: '50/min'
  },
  {
    method: 'DELETE',
    endpoint: '/v1/invoices/{id}',
    description: 'Delete an invoice',
    authenticated: true,
    rateLimit: '25/min'
  }
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
              <Book className="w-4 h-4 mr-2" />
              Developer Documentation
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Build with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                BillCraft API
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Everything you need to integrate BillCraft into your application. 
              From quick start guides to advanced API references.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-6 py-6 text-lg border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Search
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Quick Start
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                <Download className="w-5 h-5 mr-2" />
                API Reference
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:shadow-lg transition-all duration-300">
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.title}
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Documentation Categories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find the documentation you need organized by topic and skill level
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg mb-4`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {category.docs.map((doc, idx) => (
                        <div key={doc.title} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700 hover:text-blue-600 cursor-pointer">
                            {doc.title}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs border-slate-300 text-slate-500">
                              {doc.time}
                            </Badge>
                            <Badge 
                              className={`text-xs ${
                                doc.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 border-green-200' :
                                doc.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                'bg-red-100 text-red-700 border-red-200'
                              }`}
                            >
                              {doc.difficulty}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 group-hover:border-blue-500 group-hover:text-blue-600">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Code Examples
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ready-to-use code snippets to get you started quickly
            </p>
          </motion.div>

          <Tabs defaultValue="javascript" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="php">PHP</TabsTrigger>
            </TabsList>

            {codeExamples.map((example, index) => (
              <TabsContent key={example.language.toLowerCase()} value={example.language.toLowerCase()}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{example.title}</h3>
                          <p className="text-sm text-slate-600">{example.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(example.code)}
                          className="border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      
                      <div className="relative">
                        <pre className="bg-slate-900 text-green-400 p-6 overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Popular Documentation */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Popular Docs */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Popular Documentation
                </h2>
                <p className="text-lg text-slate-600">
                  The most viewed and helpful documentation pages
                </p>
              </motion.div>

              <div className="space-y-6">
                {popularDocs.map((doc, index) => (
                  <motion.div
                    key={doc.title}
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
                                {doc.category}
                              </Badge>
                              <div className="flex items-center text-sm text-slate-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {doc.readTime}
                              </div>
                              <div className="flex items-center text-sm text-slate-500">
                                <Eye className="w-4 h-4 mr-1" />
                                {doc.views.toLocaleString()}
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {doc.title}
                            </h3>
                            
                            <p className="text-slate-600 mb-3 leading-relaxed">
                              {doc.description}
                            </p>
                            
                            <div className="text-sm text-slate-500">
                              Last updated: {new Date(doc.lastUpdated).toLocaleDateString('en-US')}
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
            
            {/* API Reference Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 sticky top-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                      <Terminal className="w-5 h-5 mr-2 text-blue-600" />
                      API Quick Reference
                    </h3>
                    
                    <div className="space-y-4">
                      {apiEndpoints.map((endpoint, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={`text-xs ${
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-700 border-green-200' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                              endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                              'bg-red-100 text-red-700 border-red-200'
                            }`}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono text-slate-700">{endpoint.endpoint}</code>
                          </div>
                          <p className="text-xs text-slate-600 mb-2">{endpoint.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <span className="flex items-center">
                              <Lock className="w-3 h-3 mr-1" />
                              {endpoint.authenticated ? 'Auth required' : 'Public'}
                            </span>
                            <span>{endpoint.rateLimit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      View Full API Reference
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
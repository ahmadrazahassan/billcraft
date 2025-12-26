'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code, 
  Zap, 
  Shield, 
  Globe, 
  BookOpen, 
  Key, 
  Server, 
  Database,
  ArrowRight,
  Copy,
  Download,
  Play,
  Terminal,
  Layers,
  Lock,
  Clock,
  CheckCircle
} from 'lucide-react'

const endpoints = [
  {
    method: 'GET',
    endpoint: '/invoices',
    description: 'Retrieve all invoices',
    parameters: ['limit', 'offset', 'status'],
    response: 'Array of invoice objects'
  },
  {
    method: 'POST',
    endpoint: '/invoices',
    description: 'Create a new invoice',
    parameters: ['client_id', 'items', 'due_date'],
    response: 'Created invoice object'
  },
  {
    method: 'GET',
    endpoint: '/invoices/{id}',
    description: 'Retrieve a specific invoice',
    parameters: ['id (required)'],
    response: 'Invoice object'
  },
  {
    method: 'PUT',
    endpoint: '/invoices/{id}',
    description: 'Update an existing invoice',
    parameters: ['id (required)', 'fields to update'],
    response: 'Updated invoice object'
  },
  {
    method: 'DELETE',
    endpoint: '/invoices/{id}',
    description: 'Delete an invoice',
    parameters: ['id (required)'],
    response: 'Success confirmation'
  }
]

const sdks = [
  {
    language: 'JavaScript',
    logo: '🟨',
    installation: 'npm install billcraft-api',
    example: `const BillCraft = require('billcraft-api');
const client = new BillCraft('your-api-key');

// Create an invoice
const invoice = await client.invoices.create({
  client_id: 'client_123',
  items: [{ name: 'Service', amount: 100 }],
  due_date: '2024-02-15'
});`
  },
  {
    language: 'Python',
    logo: '🐍',
    installation: 'pip install billcraft-python',
    example: `import billcraft

client = billcraft.Client('your-api-key')

# Create an invoice
invoice = client.invoices.create(
    client_id='client_123',
    items=[{'name': 'Service', 'amount': 100}],
    due_date='2024-02-15'
)`
  },
  {
    language: 'PHP',
    logo: '🐘',
    installation: 'composer require billcraft/php-sdk',
    example: `<?php
require_once 'vendor/autoload.php';

$client = new BillCraft\\Client('your-api-key');

// Create an invoice
$invoice = $client->invoices->create([
    'client_id' => 'client_123',
    'items' => [['name' => 'Service', 'amount' => 100]],
    'due_date' => '2024-02-15'
]);`
  },
  {
    language: 'Ruby',
    logo: '💎',
    installation: 'gem install billcraft-ruby',
    example: `require 'billcraft'

client = BillCraft::Client.new('your-api-key')

# Create an invoice
invoice = client.invoices.create(
  client_id: 'client_123',
  items: [{ name: 'Service', amount: 100 }],
  due_date: '2024-02-15'
)`
  }
]

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-50ms response times with global CDN deployment'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'OAuth 2.0, API keys, and rate limiting for maximum protection'
  },
  {
    icon: Globe,
    title: 'RESTful Design',
    description: 'Clean, predictable URLs and standard HTTP methods'
  },
  {
    icon: Code,
    title: 'Developer-First',
    description: 'Comprehensive SDKs, webhooks, and detailed documentation'
  }
]

const stats = [
  { label: 'API Calls/Month', value: '50M+', icon: Server },
  { label: 'Uptime SLA', value: '99.9%', icon: CheckCircle },
  { label: 'Avg Response', value: '<50ms', icon: Clock },
  { label: 'Endpoints', value: '40+', icon: Database }
]

export default function APIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200 px-4 py-2">
              <Code className="w-4 h-4 mr-2" />
              API v2.0 Now Available
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Build with the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                BillCraft API
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              The most powerful invoicing API for developers. Create, manage, and automate 
              invoices with our RESTful API. Production-ready with enterprise-grade security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                View Docs
              </Button>
            </div>
          </motion.div>
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mb-4">
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
              Why Developers Choose BillCraft
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built for scale, designed for simplicity, secured for enterprise
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mb-4">
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

      {/* Quick Start Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose your language and start building with our comprehensive SDKs
            </p>
          </motion.div>

          <Tabs defaultValue="javascript" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/70 backdrop-blur-sm">
              {sdks.map((sdk) => (
                <TabsTrigger 
                  key={sdk.language.toLowerCase()} 
                  value={sdk.language.toLowerCase()}
                  className="flex items-center space-x-2"
                >
                  <span>{sdk.logo}</span>
                  <span>{sdk.language}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {sdks.map((sdk) => (
              <TabsContent key={sdk.language.toLowerCase()} value={sdk.language.toLowerCase()}>
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Installation</h3>
                        <div className="bg-slate-900 rounded-lg p-4 text-green-400 font-mono text-sm flex items-center justify-between">
                          <code>{sdk.installation}</code>
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Example Usage</h3>
                        <div className="bg-slate-900 rounded-lg p-4 text-green-400 font-mono text-sm relative">
                          <pre className="whitespace-pre-wrap">{sdk.example}</pre>
                          <Button size="sm" variant="ghost" className="absolute top-2 right-2 text-slate-400 hover:text-white">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Core API Endpoints
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Essential endpoints to get you started with invoice management
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <Badge className={`${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-700 border-green-200' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                            'bg-red-100 text-red-700 border-red-200'
                          }`}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-lg font-mono text-slate-900">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-slate-600 mb-3">{endpoint.description}</p>
                        <div className="text-sm text-slate-500">
                          <span className="font-medium">Parameters:</span> {endpoint.parameters.join(', ')}
                        </div>
                        <div className="text-sm text-slate-500">
                          <span className="font-medium">Returns:</span> {endpoint.response}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        <Terminal className="w-4 h-4 mr-2" />
                        Try It
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20" />
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Get your API keys, explore our documentation, and start integrating 
              BillCraft into your application today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold">
                <Key className="w-5 h-5 mr-2" />
                Get API Keys
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download Postman Collection
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
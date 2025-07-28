'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  FileText, 
  Scale, 
  Shield, 
  CreditCard, 
  Users, 
  Globe,
  Clock,
  Mail,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Gavel,
  Database
} from 'lucide-react'

const sections = [
  {
    title: 'Acceptance of Terms',
    icon: CheckCircle,
    content: 'By creating an account or using BillCraft, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. These terms constitute a legally binding agreement between you and BillCraft.'
  },
  {
    title: 'Description of Service',
    icon: FileText,
    content: 'BillCraft is a cloud-based invoicing platform that allows users to create, send, and manage invoices and business documents. We provide tools for payment processing, client management, reporting, and business analytics. Our service is provided on a subscription basis with various pricing tiers.'
  },
  {
    title: 'User Accounts',
    icon: Users,
    content: 'You must provide accurate and complete information when creating your account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'
  },
  {
    title: 'Acceptable Use',
    icon: Shield,
    content: 'You may use BillCraft only for lawful business purposes. You may not use our service to send spam, distribute malware, violate intellectual property rights, or engage in any fraudulent or illegal activities. We reserve the right to suspend accounts that violate these terms.'
  },
  {
    title: 'Payment Terms',
    icon: CreditCard,
    content: 'Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We may change our pricing with 30 days\' notice. Failure to pay fees may result in service suspension or termination.'
  },
  {
    title: 'Data Ownership',
    icon: Database,
    content: 'You retain ownership of all data you upload to BillCraft. We do not claim ownership of your invoices, client information, or other business data. You grant us a limited license to use your data solely to provide our services to you.'
  },
  {
    title: 'Service Availability',
    icon: Globe,
    content: 'We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We may perform maintenance, updates, or modifications that may temporarily affect service availability. We will provide notice of planned maintenance when possible.'
  },
  {
    title: 'Intellectual Property',
    icon: Scale,
    content: 'BillCraft owns all intellectual property rights in our platform, including software, designs, trademarks, and documentation. You may not copy, modify, distribute, or reverse engineer our platform. Your license to use BillCraft terminates when your subscription ends.'
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    content: 'We take data security seriously and implement industry-standard security measures. Our Privacy Policy governs how we collect, use, and protect your information. By using our service, you consent to our privacy practices as described in our Privacy Policy.'
  },
  {
    title: 'Limitation of Liability',
    icon: XCircle,
    content: 'BillCraft\'s liability is limited to the amount paid for our service in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages. Some jurisdictions do not allow limitation of liability, so these limits may not apply to you.'
  },
  {
    title: 'Termination',
    icon: AlertTriangle,
    content: 'Either party may terminate this agreement at any time. We may terminate your account for violation of these terms, non-payment, or other cause. Upon termination, your access to the service will cease, but you may export your data for 30 days after termination.'
  },
  {
    title: 'Governing Law',
    icon: Gavel,
    content: 'These terms are governed by the laws of the State of California, United States. Any disputes will be resolved through binding arbitration in San Francisco, California, except for claims that may be brought in small claims court.'
  }
]

const highlights = [
  {
    icon: CheckCircle,
    title: 'Fair Terms',
    description: 'Reasonable terms that protect both parties'
  },
  {
    icon: Shield,
    title: 'Data Protection',
    description: 'Your data remains yours, always'
  },
  {
    icon: Clock,
    title: '30-Day Notice',
    description: 'We provide advance notice of any changes'
  },
  {
    icon: Scale,
    title: 'Legal Compliance',
    description: 'Compliant with applicable laws and regulations'
  }
]

export default function TermsPage() {
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
              <Scale className="w-4 h-4 mr-2" />
              Last Updated: January 15, 2024
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Terms of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Service
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              These terms govern your use of BillCraft and outline the rights and responsibilities 
              of both you and BillCraft. Please read them carefully.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-600" />
                <span>Legal Agreement</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-600" />
                <span>Questions? legal@billcraft.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Key Highlights
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The important points you should know about our terms
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/70 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{highlight.title}</h3>
                    <p className="text-sm text-slate-600">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Terms Summary</h3>
                      <p className="text-slate-700 leading-relaxed">
                        By using BillCraft, you agree to use our service responsibly for legitimate business purposes. 
                        You keep ownership of your data, we protect your privacy, and either party can end the agreement 
                        at any time. We limit our liability and resolve disputes through arbitration in California.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h2>
                        <p className="text-slate-700 leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Clauses */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-blue-600" />
                    Additional Terms
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Force Majeure</h3>
                      <p className="text-slate-700 leading-relaxed">
                        Neither party shall be liable for any failure or delay in performance under this Agreement 
                        due to circumstances beyond their reasonable control, including but not limited to acts of 
                        God, natural disasters, terrorism, or government actions.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Severability</h3>
                      <p className="text-slate-700 leading-relaxed">
                        If any provision of these terms is found to be unenforceable or invalid, the remaining 
                        provisions will continue in full force and effect. The invalid provision will be replaced 
                        with a valid provision that best reflects the original intent.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Entire Agreement</h3>
                      <p className="text-slate-700 leading-relaxed">
                        These Terms of Service, together with our Privacy Policy and any other legal notices 
                        published by us on the service, constitute the entire agreement between you and BillCraft 
                        concerning the use of the service.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Updates to Terms</h3>
                      <p className="text-slate-700 leading-relaxed">
                        We may modify these terms from time to time. We will provide notice of material changes 
                        by email and by posting the updated terms on our website. Continued use of the service 
                        after changes become effective constitutes acceptance of the new terms.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Contact Information</h3>
                      <p className="text-slate-700 leading-relaxed">
                        If you have any questions about these Terms of Service, please contact us at 
                        legal@billcraft.com or write to us at BillCraft Legal Department, 123 Market Street, 
                        Suite 400, San Francisco, CA 94103.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Effective Date */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200/50">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Effective Date</h3>
                  <p className="text-slate-600">
                    These Terms of Service are effective as of January 15, 2024, and were last updated on January 15, 2024.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
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
              Questions About These Terms?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Our legal team is available to clarify any questions you may have 
              about these terms or your rights and obligations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:legal@billcraft.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-semibold transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Legal Team
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-lg font-semibold transition-colors duration-200"
              >
                <Gavel className="w-5 h-5 mr-2" />
                General Contact
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Users, 
  Globe,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  AlertTriangle
} from 'lucide-react'

const sections = [
  {
    title: 'Information We Collect',
    icon: Database,
    content: [
      {
        subtitle: 'Account Information',
        description: 'When you create an account, we collect your name, email address, company name, and billing information.'
      },
      {
        subtitle: 'Invoice Data',
        description: 'We store your invoices, client information, and transaction data to provide our services.'
      },
      {
        subtitle: 'Usage Information',
        description: 'We collect information about how you use our platform, including features accessed and time spent.'
      },
      {
        subtitle: 'Device Information',
        description: 'We collect device identifiers, browser type, operating system, and IP address for security and analytics.'
      }
    ]
  },
  {
    title: 'How We Use Your Information',
    icon: Eye,
    content: [
      {
        subtitle: 'Service Provision',
        description: 'To provide, maintain, and improve our invoicing platform and related services.'
      },
      {
        subtitle: 'Communication',
        description: 'To send you important updates, security alerts, and respond to your inquiries.'
      },
      {
        subtitle: 'Analytics & Improvement',
        description: 'To analyze usage patterns and improve our platform\'s functionality and user experience.'
      },
      {
        subtitle: 'Legal Compliance',
        description: 'To comply with legal obligations, resolve disputes, and enforce our agreements.'
      }
    ]
  },
  {
    title: 'Information Sharing',
    icon: Users,
    content: [
      {
        subtitle: 'Service Providers',
        description: 'We share data with trusted service providers who help us operate our platform (payment processors, hosting providers).'
      },
      {
        subtitle: 'Legal Requirements',
        description: 'We may disclose information when required by law, court order, or government request.'
      },
      {
        subtitle: 'Business Transfers',
        description: 'In case of merger, acquisition, or sale, your information may be transferred to the new entity.'
      },
      {
        subtitle: 'Never Sold',
        description: 'We never sell your personal information to third parties for marketing purposes.'
      }
    ]
  },
  {
    title: 'Data Security',
    icon: Lock,
    content: [
      {
        subtitle: 'Encryption',
        description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.'
      },
      {
        subtitle: 'Access Controls',
        description: 'Strict access controls ensure only authorized personnel can access your data on a need-to-know basis.'
      },
      {
        subtitle: 'Security Monitoring',
        description: '24/7 security monitoring and regular security audits to detect and prevent unauthorized access.'
      },
      {
        subtitle: 'Compliance',
        description: 'We maintain SOC 2 Type II certification and follow industry best practices for data protection.'
      }
    ]
  },
  {
    title: 'Your Rights & Choices',
    icon: Shield,
    content: [
      {
        subtitle: 'Access & Portability',
        description: 'You can access and export your data at any time through your account settings.'
      },
      {
        subtitle: 'Correction & Updates',
        description: 'You can update your account information and data directly in your dashboard.'
      },
      {
        subtitle: 'Deletion',
        description: 'You can delete your account and data, with a 30-day recovery period for accidental deletions.'
      },
      {
        subtitle: 'Communication Preferences',
        description: 'You can opt out of marketing communications while still receiving important service updates.'
      }
    ]
  },
  {
    title: 'International Data Transfers',
    icon: Globe,
    content: [
      {
        subtitle: 'Global Infrastructure',
        description: 'We use cloud infrastructure providers with data centers worldwide to ensure optimal performance.'
      },
      {
        subtitle: 'Adequacy Decisions',
        description: 'We ensure adequate protection for data transfers to countries outside your region.'
      },
      {
        subtitle: 'Standard Contractual Clauses',
        description: 'When required, we use Standard Contractual Clauses approved by relevant authorities.'
      },
      {
        subtitle: 'Data Localization',
        description: 'We offer data residency options for customers with specific regional requirements.'
      }
    ]
  }
]

const principles = [
  {
    icon: Lock,
    title: 'Security First',
    description: 'Bank-level security protects your data'
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Clear communication about data practices'
  },
  {
    icon: Shield,
    title: 'User Control',
    description: 'You own and control your data'
  },
  {
    icon: CheckCircle,
    title: 'Compliance',
    description: 'GDPR, CCPA, and SOC 2 compliant'
  }
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-green-100 text-green-700 border-green-200 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Last Updated: January 15, 2024
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Privacy
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
                Policy
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Your privacy is fundamental to everything we do. This policy explains how we collect, 
              use, and protect your information when you use BillCraft.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-green-600" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                <span>Legal Document</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-purple-600" />
                <span>Questions? privacy@billcraft.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Four core principles guide how we handle your data
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/70 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-4">
                      <principle.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{principle.title}</h3>
                    <p className="text-sm text-slate-600">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Quick Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200/50">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Quick Summary</h3>
                      <p className="text-slate-700 leading-relaxed">
                        We collect only the information necessary to provide our invoicing services. 
                        We use bank-level security to protect your data, never sell it to third parties, 
                        and give you full control over your information. You can export or delete your 
                        data at any time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Detailed Sections */}
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                    </div>
                    
                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="border-l-4 border-blue-200 pl-6">
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.subtitle}</h3>
                          <p className="text-slate-700 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-blue-600" />
                    Additional Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Data Retention</h3>
                      <p className="text-slate-700 leading-relaxed">
                        We retain your data for as long as your account is active. After account deletion, 
                        we may retain certain information for legal or business purposes for up to 7 years, 
                        as required by applicable laws.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Children's Privacy</h3>
                      <p className="text-slate-700 leading-relaxed">
                        Our service is not intended for children under 13. We do not knowingly collect 
                        personal information from children under 13. If we learn we have collected such 
                        information, we will delete it immediately.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Changes to This Policy</h3>
                      <p className="text-slate-700 leading-relaxed">
                        We may update this privacy policy from time to time. We will notify you of any 
                        material changes by email and by posting the new policy on our website. Changes 
                        become effective 30 days after notification.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Contact Information</h3>
                      <p className="text-slate-700 leading-relaxed">
                        If you have questions about this privacy policy or our data practices, please 
                        contact us at privacy@billcraft.com or write to us at BillCraft Privacy Team, 
                        123 Market Street, Suite 400, San Francisco, CA 94103.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-green-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20" />
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Questions About Your Privacy?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Our privacy team is here to help. We're committed to transparency 
              and protecting your data rights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@billcraft.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-semibold transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Privacy Team
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-lg font-semibold transition-colors duration-200"
              >
                <Shield className="w-5 h-5 mr-2" />
                Security Center
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  X, 
  FileText, 
  DollarSign, 
  Users, 
  Calendar,
  MessageSquare,
  Send,
  Lightbulb,
  Minimize2,
  Maximize2,
  Wand2,
  Building2,
  Mail,
  Phone,
  MapPin,
  Hash,
  Clock,
  Zap,
  RefreshCw,
  Check,
  Copy,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChatInterface } from './chat-interface'
import { useToast } from '@/hooks/use-toast'

interface InvoiceAIAssistantProps {
  isOpen: boolean
  onClose: () => void
  invoiceData?: any
  context?: 'create' | 'list' | 'view'
  onUpdateInvoiceData?: (data: any) => void
}

const smartActions = [
  {
    icon: Wand2,
    title: "Auto-Fill Company Info",
    description: "Generate complete company details",
    action: "auto_fill_company",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Users,
    title: "Generate Client Details",
    description: "Create professional client information",
    action: "auto_fill_client",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: FileText,
    title: "Smart Invoice Items",
    description: "AI-powered service descriptions",
    action: "auto_fill_items",
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: DollarSign,
    title: "Calculate Totals",
    description: "Optimize pricing and terms",
    action: "calculate_totals",
    color: "from-orange-500 to-red-500"
  }
]

const quickPrompts = [
  {
    icon: FileText,
    title: "Professional Invoice Template",
    prompt: "Help me create a professional invoice with industry best practices",
    category: "Templates"
  },
  {
    icon: DollarSign,
    title: "Payment Terms Optimization",
    prompt: "What are the best payment terms to ensure faster payment from clients?",
    category: "Payments"
  },
  {
    icon: Users,
    title: "Client Communication",
    prompt: "How should I professionally follow up on overdue invoices?",
    category: "Communication"
  },
  {
    icon: Calendar,
    title: "Invoice Timing Strategy",
    prompt: "When is the optimal time to send invoices for maximum payment speed?",
    category: "Strategy"
  },
  {
    icon: Lightbulb,
    title: "Professional Design Tips",
    prompt: "Give me tips to make my invoices look more professional and trustworthy",
    category: "Design"
  },
  {
    icon: Building2,
    title: "Business Best Practices",
    prompt: "What business information should I include to look more credible?",
    category: "Business"
  }
]

export function InvoiceAIAssistant({ 
  isOpen, 
  onClose, 
  invoiceData,
  context = 'create',
  onUpdateInvoiceData
}: InvoiceAIAssistantProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [showQuickPrompts, setShowQuickPrompts] = useState(true)
  const [activeTab, setActiveTab] = useState<'chat' | 'actions'>('actions')
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const getSystemInstruction = () => {
    const baseInstruction = `You are an expert AI assistant for BillCraft, specializing in professional invoicing and business billing. You help users:

- Create professional, compelling invoices
- Generate realistic business and client information
- Optimize payment terms and pricing strategies
- Provide industry-specific service descriptions
- Ensure legal compliance and best practices
- Improve cash flow and collection rates

When users ask for auto-generation, provide realistic, professional data that sounds authentic and industry-appropriate. Be specific, detailed, and business-focused.`

    if (context === 'create' && invoiceData) {
      return `${baseInstruction}

Current invoice context:
- Company: ${invoiceData.company?.name || 'Not specified'}
- Client: ${invoiceData.client?.name || 'Not specified'}
- Items: ${invoiceData.items?.length || 0} items
- Total: $${invoiceData.total || 0} ${invoiceData.currency || 'USD'}
- Status: ${invoiceData.status || 'draft'}

Provide specific, actionable advice based on this invoice data. When suggesting auto-fill data, make it realistic and professional.`
    }

    return baseInstruction
  }

  const handleSmartAction = async (action: string) => {
    if (!onUpdateInvoiceData) {
      toast({
        title: "Feature not available",
        description: "Auto-fill is only available in invoice creation mode",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate AI processing

      switch (action) {
        case 'auto_fill_company':
          const companyData = {
            name: "Creative Solutions Studio",
            address: "1234 Innovation Drive",
            city: "San Francisco, CA 94102",
            email: "hello@creativesolutions.com",
            phone: "+1 (555) 123-4567",
            website: "www.creativesolutions.com"
          }
          onUpdateInvoiceData({
            ...invoiceData,
            company: companyData
          })
          toast({
            title: "Company info generated!",
            description: "Professional company details have been added"
          })
          break

        case 'auto_fill_client':
          const clientData = {
            name: "TechCorp Industries",
            address: "567 Business Blvd",
            city: "New York, NY 10001",
            email: "accounting@techcorp.com"
          }
          onUpdateInvoiceData({
            ...invoiceData,
            client: clientData
          })
          toast({
            title: "Client info generated!",
            description: "Professional client details have been added"
          })
          break

        case 'auto_fill_items':
          const itemsData = [
            {
              id: "1",
              description: "Website Design & Development - Modern, responsive design with SEO optimization",
              quantity: 1,
              rate: 2500.00,
              amount: 2500.00
            },
            {
              id: "2",
              description: "Content Management System - Custom CMS with user-friendly interface",
              quantity: 1,
              rate: 1200.00,
              amount: 1200.00
            },
            {
              id: "3",
              description: "SEO Optimization & Analytics Setup - 3 months of optimization",
              quantity: 3,
              rate: 300.00,
              amount: 900.00
            }
          ]
          onUpdateInvoiceData({
            ...invoiceData,
            items: itemsData
          })
          toast({
            title: "Invoice items generated!",
            description: "Professional service descriptions have been added"
          })
          break

        case 'calculate_totals':
          if (invoiceData.items && invoiceData.items.length > 0) {
            const subtotal = invoiceData.items.reduce((sum: number, item: any) => sum + item.amount, 0)
            const tax = subtotal * 0.085 // 8.5% tax
            const total = subtotal + tax
            
            onUpdateInvoiceData({
              ...invoiceData,
              subtotal,
              tax,
              total,
              terms: "Payment due within 30 days. Late payments subject to 1.5% monthly service charge.",
              notes: "Thank you for your business! We appreciate the opportunity to work with you."
            })
            toast({
              title: "Totals calculated!",
              description: `Total: $${total.toFixed(2)} with optimized terms`
            })
          } else {
            toast({
              title: "No items to calculate",
              description: "Please add invoice items first",
              variant: "destructive"
            })
          }
          break
      }
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`w-full ${isMinimized ? 'max-w-md h-16' : 'max-w-5xl h-[85vh]'} bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-white/20`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 backdrop-blur-sm border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Invoice AI Assistant</h2>
                  {!isMinimized && (
                    <p className="text-sm text-slate-600">AI-powered invoice creation and optimization</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-slate-500 hover:text-slate-700 h-8 w-8 p-0"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                  className="text-slate-500 hover:text-slate-700 h-8 w-8 p-0"
              >
                  <X className="h-4 w-4" />
              </Button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex h-full"
              >
                {/* Sidebar */}
                <div className="w-80 bg-slate-50/50 backdrop-blur-sm border-r border-white/20 flex flex-col">
                  {/* Tab Navigation */}
                  <div className="p-4">
                    <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-xl p-1">
                      <Button
                        variant={activeTab === 'actions' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('actions')}
                        className={`flex-1 h-8 text-xs ${activeTab === 'actions' 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                          : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Wand2 className="h-3 w-3 mr-1" />
                        Smart Actions
                      </Button>
                  <Button
                        variant={activeTab === 'chat' ? 'default' : 'ghost'}
                    size="sm"
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 h-8 text-xs ${activeTab === 'chat' 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                          : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Quick Help
                  </Button>
                </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                    {activeTab === 'actions' ? (
                      <div className="space-y-3">
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-slate-900 mb-2">AI-Powered Actions</h3>
                          <p className="text-xs text-slate-600">Let AI generate professional invoice content for you</p>
                        </div>

                        {smartActions.map((action, index) => (
                          <motion.div
                            key={action.action}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="p-3 hover:shadow-lg transition-all duration-200 cursor-pointer group bg-white/60 backdrop-blur-sm border-white/20"
                              onClick={() => handleSmartAction(action.action)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                                  <action.icon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                                    {action.title}
                                  </h4>
                                  <p className="text-xs text-slate-600 leading-relaxed">
                                    {action.description}
                                  </p>
                                </div>
                                {isGenerating && (
                                  <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                                )}
                              </div>
                            </Card>
                          </motion.div>
                        ))}

                        <Separator className="my-4" />

                        {/* Current Invoice Status */}
                        {invoiceData && (
                          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                            <h4 className="text-sm font-semibold text-slate-900 mb-2">Current Invoice</h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Company:</span>
                                <span className="text-slate-900 font-medium">
                                  {invoiceData.company?.name || 'Not set'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Client:</span>
                                <span className="text-slate-900 font-medium">
                                  {invoiceData.client?.name || 'Not set'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Items:</span>
                                <span className="text-slate-900 font-medium">
                                  {invoiceData.items?.length || 0}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Total:</span>
                                <span className="text-slate-900 font-bold">
                                  ${invoiceData.total?.toFixed(2) || '0.00'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                <div className="space-y-3">
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-slate-900 mb-2">Quick Help Topics</h3>
                          <p className="text-xs text-slate-600">Get instant expert advice on invoicing</p>
                        </div>

                  {quickPrompts.map((prompt, index) => (
                    <motion.div
                      key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                            <Card className="p-3 hover:shadow-md transition-all duration-200 cursor-pointer group bg-white/60 backdrop-blur-sm border-white/20">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                            <prompt.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-900 text-sm mb-1">
                              {prompt.title}
                            </h4>
                                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {prompt.prompt}
                            </p>
                                  <Badge variant="secondary" className="mt-2 text-xs">
                              {prompt.category}
                                  </Badge>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                    )}
                  </div>
                </div>
              
                {/* Chat Interface */}
                <div className="flex-1 flex flex-col bg-white/30 backdrop-blur-sm">
                <ChatInterface
                  title=""
                    placeholder="Ask me anything about invoicing, or request AI auto-fill..."
                  systemInstruction={getSystemInstruction()}
                    className="h-full border-none shadow-none rounded-none bg-transparent"
                    showHeader={false}
                    height="large"
                />
              </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 
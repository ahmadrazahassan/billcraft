'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Zap,
  Stars,
  Lightbulb,
  FileText,
  DollarSign,
  Users,
  Settings,
  RotateCcw,
  Copy,
  ThumbsUp,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  BarChart3,
  Calculator,
  CreditCard,
  Building,
  Mail,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useChat } from '@/hooks/use-chat'
import { Card } from '@/components/ui/card'

interface FloatingAIAssistantProps {
  position?: 'bottom-right' | 'bottom-left'
  showOnAllPages?: boolean
}

interface QuickAction {
  icon: any
  label: string
  description: string
  color: string
  action: string
}

type ContextualMode = 'general' | 'dashboard' | 'invoice' | 'landing' | 'analytics' | 'clients' | 'settings'

export function FloatingAIAssistant({
  position = 'bottom-right',
  showOnAllPages = true
}: FloatingAIAssistantProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')
  const [showQuickActions, setShowQuickActions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Smart context detection based on current path
  const getContextualMode = (): ContextualMode => {
    if (!pathname) return 'general'
    
    if (pathname.includes('/dashboard/analytics')) return 'analytics'
    if (pathname.includes('/dashboard/clients')) return 'clients'
    if (pathname.includes('/dashboard/settings')) return 'settings'
    if (pathname.includes('/dashboard/invoices')) return 'invoice'
    if (pathname.includes('/dashboard')) return 'dashboard'
    if (pathname === '/' || pathname.includes('/features') || pathname.includes('/pricing')) return 'landing'
    
    return 'general'
  }

  const contextualMode = getContextualMode()

  // Smart contextual system instructions
  const getSystemInstruction = () => {
    const baseInstruction = "You are BillCraft AI, an advanced intelligent assistant for professional invoicing and business management."
    
    const contextInstructions = {
      general: "Help users with general business questions, invoicing best practices, and navigation guidance. Be welcoming and guide them to relevant features.",
      dashboard: "Focus on dashboard features, analytics insights, invoice management, business metrics, and workflow optimization. Help users understand their data and improve efficiency.",
      invoice: "Assist with invoice creation, form filling, client management, payment terms, professional formatting, and invoice optimization. Provide practical tips for better invoicing.",
      landing: "Help users understand BillCraft features, pricing plans, benefits, and guide them through getting started. Focus on conversion and onboarding.",
      analytics: "Help interpret business analytics, revenue trends, payment patterns, and provide insights for business growth and financial optimization.",
      clients: "Assist with client management, relationship building, communication strategies, client retention, and professional client interactions.",
      settings: "Help with account configuration, preferences, integrations, security settings, and platform customization for optimal workflow."
    }

    return `${baseInstruction} ${contextInstructions[contextualMode]} Be professional, helpful, and provide actionable insights. Keep responses concise but comprehensive. Use context-specific language and examples.`
  }

  const { messages, isLoading, sendMessage, clearMessages } = useChat({
    systemInstruction: getSystemInstruction()
  })

  // Smart quick actions based on context
  const getQuickActions = (): QuickAction[] => {
    const contextActions = {
      general: [
        {
          icon: Lightbulb,
          label: "Getting Started",
          description: "Learn how to use BillCraft",
          color: "from-blue-400 to-indigo-500",
          action: "How do I get started with BillCraft? Show me the basics."
        },
        {
          icon: FileText,
          label: "Create Invoice",
          description: "Guide me through invoice creation",
          color: "from-green-400 to-emerald-500",
          action: "Walk me through creating my first professional invoice step by step."
        },
        {
          icon: DollarSign,
          label: "Payment Tips",
          description: "Best payment practices",
          color: "from-yellow-400 to-orange-500",
          action: "What are the best payment terms and practices for my invoices?"
        },
        {
          icon: Users,
          label: "Client Management",
          description: "Manage clients effectively",
          color: "from-purple-400 to-pink-500",
          action: "How can I better manage my client relationships and communications?"
        }
      ],
      dashboard: [
        {
          icon: BarChart3,
          label: "Dashboard Overview",
          description: "Understand your metrics",
          color: "from-blue-400 to-cyan-500",
          action: "Explain my dashboard metrics and what they mean for my business."
        },
        {
          icon: TrendingUp,
          label: "Revenue Insights",
          description: "Analyze revenue trends",
          color: "from-green-400 to-emerald-500",
          action: "Help me understand my revenue trends and how to improve them."
        },
        {
          icon: FileText,
          label: "Quick Invoice",
          description: "Create invoice fast",
          color: "from-indigo-400 to-purple-500",
          action: "I need to create an invoice quickly. What's the fastest way?"
        },
        {
          icon: Settings,
          label: "Optimize Workflow",
          description: "Improve efficiency",
          color: "from-orange-400 to-red-500",
          action: "How can I optimize my invoicing workflow for better efficiency?"
        }
      ],
      invoice: [
        {
          icon: Zap,
          label: "Auto-Fill Data",
          description: "Generate invoice data",
          color: "from-blue-400 to-cyan-500",
          action: "Help me generate realistic data for my invoice fields automatically."
        },
        {
          icon: Building,
          label: "Professional Format",
          description: "Optimize design",
          color: "from-green-400 to-teal-500",
          action: "How can I make my invoice look more professional and impressive?"
        },
        {
          icon: Calculator,
          label: "Pricing Strategy",
          description: "Set optimal prices",
          color: "from-yellow-400 to-amber-500",
          action: "What's the best pricing strategy for my services and how should I structure my rates?"
        },
        {
          icon: Mail,
          label: "Client Communication",
          description: "Professional messaging",
          color: "from-pink-400 to-rose-500",
          action: "Help me write professional follow-up messages and payment reminders."
        }
      ],
      landing: [
        {
          icon: Sparkles,
          label: "Feature Overview",
          description: "Explore BillCraft",
          color: "from-blue-400 to-indigo-500",
          action: "What makes BillCraft special? Show me the key features and benefits."
        },
        {
          icon: FileText,
                          label: "Start 3-Month Free Trial",
          description: "Begin your journey",
          color: "from-green-400 to-emerald-500",
          action: "I'm ready to start! Guide me through setting up my account and first invoice."
        },
        {
          icon: DollarSign,
          label: "Pricing Plans",
          description: "Choose the right plan",
          color: "from-purple-400 to-pink-500",
          action: "Explain the pricing plans and help me choose the best one for my business."
        },
        {
          icon: Users,
          label: "Business Benefits",
          description: "Learn ROI impact",
          color: "from-cyan-400 to-blue-500",
          action: "How will BillCraft help grow my business and improve my cash flow?"
        }
      ],
      analytics: [
        {
          icon: BarChart3,
          label: "Revenue Analysis",
          description: "Deep dive into earnings",
          color: "from-green-400 to-emerald-500",
          action: "Analyze my revenue data and provide insights for growth opportunities."
        },
        {
          icon: Stars,
          label: "Performance Metrics",
          description: "Understand KPIs",
          color: "from-blue-400 to-indigo-500",
          action: "Explain my key performance indicators and what they mean for my business."
        },
        {
          icon: TrendingUp,
          label: "Growth Strategies",
          description: "Scale your business",
          color: "from-purple-400 to-pink-500",
          action: "Based on my analytics, what strategies can help me grow my business?"
        },
        {
          icon: CreditCard,
          label: "Payment Patterns",
          description: "Optimize collections",
          color: "from-orange-400 to-red-500",
          action: "Help me understand my payment patterns and improve collection rates."
        }
      ],
      clients: [
        {
          icon: Users,
          label: "Client Insights",
          description: "Understand your clients",
          color: "from-blue-400 to-indigo-500",
          action: "Help me better understand my client base and identify growth opportunities."
        },
        {
          icon: Mail,
          label: "Communication Tips",
          description: "Professional outreach",
          color: "from-green-400 to-emerald-500",
          action: "Give me tips for professional client communication and relationship building."
        },
        {
          icon: DollarSign,
          label: "Payment Follow-up",
          description: "Collect efficiently",
          color: "from-yellow-400 to-orange-500",
          action: "Help me create effective payment follow-up strategies for overdue invoices."
        },
        {
          icon: Building,
          label: "Client Retention",
          description: "Keep clients happy",
          color: "from-purple-400 to-pink-500",
          action: "What are the best practices for retaining clients and encouraging repeat business?"
        }
      ],
      settings: [
        {
          icon: Settings,
          label: "Account Setup",
          description: "Optimize configuration",
          color: "from-blue-400 to-indigo-500",
          action: "Help me optimize my account settings for the best invoicing experience."
        },
        {
          icon: Building,
          label: "Brand Customization",
          description: "Personalize invoices",
          color: "from-green-400 to-emerald-500",
          action: "How can I customize my invoices to match my brand and look professional?"
        },
        {
          icon: CreditCard,
          label: "Payment Integration",
          description: "Setup payment methods",
          color: "from-purple-400 to-pink-500",
          action: "Guide me through setting up payment integrations and collection methods."
        },
        {
          icon: Mail,
          label: "Notifications Setup",
          description: "Configure alerts",
          color: "from-orange-400 to-red-500",
          action: "Help me configure notifications and automated reminders for better workflow."
        }
      ]
    }

    return contextActions[contextualMode] || contextActions.general
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!isMinimized && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isMinimized])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setIsTyping(true)
    const success = await sendMessage(input)
    setIsTyping(false)
    
    if (success) {
      setInput('')
      if (isSoundEnabled) {
        // Play a subtle notification sound (you can implement this)
      }
    }
  }

  const handleQuickAction = async (action: string) => {
    setInput(action)
    setShowQuickActions(false)
    setIsTyping(true)
    await sendMessage(action)
    setIsTyping(false)
  }

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({ title: "Copied to clipboard", duration: 2000 })
    } catch (error) {
      toast({ title: "Failed to copy", variant: "destructive" })
    }
  }

  const getContextualTitle = () => {
    const titles = {
      general: "🚀 BillCraft AI Assistant",
      dashboard: "📊 Dashboard Assistant",
      invoice: "📄 Invoice Creation Helper",
      landing: "✨ Welcome to BillCraft",
      analytics: "📈 Analytics Advisor",
      clients: "👥 Client Manager",
      settings: "⚙️ Settings Guide"
    }
    return titles[contextualMode] || titles.general
  }

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  }

  return (
    <div className="fixed z-50">
      {/* Floating Button - Shows when closed OR minimized */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed ${positionClasses[position]}`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
            >
              {/* Main Button - Perfect Circle Style */}
              <Button
                onClick={() => {
                  if (isMinimized) {
                    setIsMinimized(false)
                  } else {
                    setIsOpen(true)
                    setIsMinimized(false)
                  }
                }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 shadow-2xl border-0 relative overflow-hidden group transition-all duration-300"
              >
                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Chat Icon with animation */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <MessageCircle className="h-7 w-7 text-white" />
                </motion.div>
                
                {/* Pulse rings - now circular */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                  animate={{
                    scale: [1, 1.8, 2.2],
                    opacity: [0.8, 0.2, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-indigo-400/50"
                  animate={{
                    scale: [1, 1.5, 1.9],
                    opacity: [0.6, 0.3, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.8
                  }}
                />
              </Button>

              {/* Smart notification badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                  messages.length > 0 
                    ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                    : 'bg-gradient-to-r from-green-400 to-emerald-500'
                }`}
              >
                {messages.length > 0 ? (
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white text-xs font-bold"
                  >
                    {messages.length > 9 ? '9+' : messages.length}
                  </motion.span>
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${
              position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'
            } w-96 h-[32rem] transition-all duration-300`}
          >
            <Card className={`h-full shadow-2xl border-0 overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-900/95 text-white' 
                : 'bg-white/95 text-slate-900'
            } backdrop-blur-xl flex flex-col`}>
              
              {/* Enhanced Header - Fixed Position */}
              <div className={`flex-shrink-0 p-4 border-b ${
                isDarkMode ? 'border-slate-700/50 bg-slate-800/50' : 'border-slate-200/50 bg-gradient-to-r from-blue-50/80 to-indigo-50/80'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-9 h-9 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <Sparkles className="h-5 w-5 text-white" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                      />
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        BillCraft AI
                      </h3>
                      {!isMinimized && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
                        >
                          {getContextualTitle()}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  
                  {/* Header Controls */}
                  <div className="flex items-center space-x-1">
                    {!isMinimized && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsDarkMode(!isDarkMode)}
                          className={`h-8 w-8 p-0 ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                          className={`h-8 w-8 p-0 ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearMessages}
                          className={`h-8 w-8 p-0 ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(true)}
                      className={`h-8 w-8 p-0 ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area - Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                      {messages.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center justify-center h-full text-center py-6"
                        >
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                            isDarkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                          }`}>
                            <Bot className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                          </div>
                          <h4 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {getContextualTitle()}
                          </h4>
                          <p className={`text-sm mb-4 max-w-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            Your intelligent assistant for {contextualMode === 'general' ? 'BillCraft' : contextualMode} tasks. 
                            How can I help you today?
                          </p>
                          
                          <Button
                            onClick={() => setShowQuickActions(!showQuickActions)}
                            variant="outline"
                            className={`${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-800' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            {showQuickActions ? 'Hide' : 'Show'} Quick Actions
                          </Button>

                          {/* Context-Aware Quick Actions */}
                          <AnimatePresence>
                            {showQuickActions && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="w-full mt-4 space-y-2"
                              >
                                {getQuickActions().map((action, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <Button
                                      onClick={() => handleQuickAction(action.action)}
                                      variant="ghost"
                                      className={`w-full justify-start text-left h-auto p-3 ${
                                        isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                                      }`}
                                    >
                                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                                        <action.icon className="h-4 w-4 text-white" />
                                      </div>
                                      <div className="text-left">
                                        <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                          {action.label}
                                        </div>
                                        <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                          {action.description}
                                        </div>
                                      </div>
                                    </Button>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ) : (
                        <AnimatePresence>
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`flex items-start space-x-2 max-w-[85%] group ${
                                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                              }`}>
                                {/* Avatar */}
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  message.role === 'user' 
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                                    : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                                }`}>
                                  {message.role === 'user' ? (
                                    <User className="h-3 w-3 text-white" />
                                  ) : (
                                    <Bot className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                
                                {/* Message bubble */}
                                <div className="relative">
                                  <div className={`rounded-2xl px-3 py-2 shadow-sm ${
                                    message.role === 'user'
                                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                                      : isDarkMode
                                        ? 'bg-slate-800 text-slate-100 border border-slate-700'
                                        : 'bg-white text-slate-900 border border-slate-200'
                                  }`}>
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                    <div className="flex items-center justify-between mt-1">
                                      <p className={`text-xs ${
                                        message.role === 'user' 
                                          ? 'text-emerald-100' 
                                          : isDarkMode ? 'text-slate-400' : 'text-slate-500'
                                      }`}>
                                        {new Date(message.timestamp).toLocaleTimeString([], { 
                                          hour: '2-digit', 
                                          minute: '2-digit' 
                                        })}
                                      </p>
                                      
                                      {/* Message actions */}
                                      {message.role === 'assistant' && (
                                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyMessage(message.content)}
                                            className="h-5 w-5 p-0 hover:bg-slate-100"
                                          >
                                            <Copy className="h-2.5 w-2.5" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 hover:bg-green-100"
                                          >
                                            <ThumbsUp className="h-2.5 w-2.5" />
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}
                      
                      {/* Enhanced loading indicator */}
                      {(isLoading || isTyping) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                              <Bot className="h-3 w-3 text-white" />
                            </div>
                            <div className={`rounded-2xl px-3 py-2 ${
                              isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
                            }`}>
                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                  <motion.div
                                    className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                  />
                                  <motion.div
                                    className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                  />
                                  <motion.div
                                    className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                  />
                                </div>
                                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                  BillCraft AI is thinking...
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>

              
              {/* Enhanced Input Section - Fixed Position */}
              <div className={`flex-shrink-0 p-4 border-t ${
                isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white/50'
              } backdrop-blur-sm`}>
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask BillCraft AI anything..."
                      disabled={isLoading || isTyping}
                      className={`rounded-xl border-slate-200/50 focus:bg-white/90 transition-all text-sm h-10 pr-10 ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:bg-slate-700' 
                          : 'bg-white/70'
                      }`}
                    />
                    {input && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setInput('')}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading || isTyping}
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 h-10 w-10 p-0 shadow-md"
                  >
                    {(isLoading || isTyping) ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
                
                {/* Enhanced footer info */}
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                    ⚡ Powered by Advanced AI
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {contextualMode.charAt(0).toUpperCase() + contextualMode.slice(1)} Mode
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 
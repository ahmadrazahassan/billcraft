'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useChat } from '@/hooks/use-chat'
import { AIService } from '@/lib/ai-service'

interface FloatingAIAssistantProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  showOnAllPages?: boolean
}

interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const contextualModes = {
  '/dashboard': 'dashboard',
  '/dashboard/invoices': 'invoice',
  '/dashboard/invoices/create': 'invoice',
  '/dashboard/clients': 'clients',
  '/dashboard/analytics': 'analytics',
  '/dashboard/settings': 'settings',
  '/': 'landing',
  '/pricing': 'landing',
  '/features': 'landing'
}

// Get contextual mode based on current path
const getContextualMode = (pathname: string): string => {
  for (const [path, mode] of Object.entries(contextualModes)) {
    if (pathname.startsWith(path)) {
      return mode
    }
  }
  return 'general'
}

export function FloatingAIAssistant({
  position = 'bottom-right',
  showOnAllPages = true
}: FloatingAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [contextualSuggestions, setContextualSuggestions] = useState<string[]>([])
  const pathname = usePathname()
  const { toast } = useToast()

  const contextualMode = getContextualMode(pathname)

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  // Enhanced system instructions with context awareness
  const getSystemInstruction = () => {
    const baseInstruction = "You are BillCraft AI, the world's most advanced professional invoicing and business management expert."
    
    const contextInstructions = {
      general: "Help users with general business questions, invoicing best practices, and navigation guidance. Be welcoming and guide them to relevant features.",
      dashboard: "Focus on dashboard features, analytics insights, invoice management, business metrics, and workflow optimization. Help users understand their data and improve efficiency.",
      invoice: "Assist with invoice creation, form filling, client management, payment terms, professional formatting, and invoice optimization. You can auto-fill forms with structured data when users provide business information.",
      landing: "Help users understand BillCraft features, pricing plans, benefits, and guide them through getting started. Focus on conversion and onboarding.",
      analytics: "Help interpret business analytics, revenue trends, payment patterns, and provide insights for business growth and financial optimization.",
      clients: "Assist with client management, relationship building, communication strategies, client retention, and professional client interactions.",
      settings: "Help with account configuration, preferences, integrations, security settings, and platform customization for optimal workflow."
    }

    return `${baseInstruction} ${contextInstructions[contextualMode as keyof typeof contextInstructions]} Be professional, helpful, and provide actionable insights. Keep responses concise but comprehensive.`
  }

  // Generate contextual suggestions based on current page
  useEffect(() => {
    const suggestions = {
      dashboard: [
        "How can I improve my invoice collection rate?",
        "Show me tips for better cash flow management",
        "What analytics should I track for my business?"
      ],
      invoice: [
        "Fill professional company information",
        "Generate client details for my invoice",
        "Create service items with competitive pricing",
        "What are the best payment terms?"
      ],
      clients: [
        "How to build better client relationships?",
        "Tips for professional client communication",
        "How to handle difficult clients?"
      ],
      analytics: [
        "Help me understand my revenue trends",
        "What KPIs should I monitor?",
        "How to improve payment timing?"
      ],
      landing: [
        "Tell me about BillCraft features",
        "Which pricing plan is right for me?",
        "How does BillCraft save time?"
      ],
      general: [
        "How can BillCraft help my business?",
        "Show me invoicing best practices",
        "Help me get started"
      ]
    }

    setContextualSuggestions(suggestions[contextualMode as keyof typeof suggestions] || suggestions.general)
  }, [contextualMode])

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || isLoading) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    if (!messageText) setInput('')
    setIsLoading(true)

    try {
      const { response } = await AIService.sendMessage(
        textToSend,
        undefined, // No specific invoice context for floating assistant
        messages.map(msg => ({ role: msg.role, content: msg.content }))
      )

      const assistantMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])
      
      // Show toast for successful interaction
      if (contextualMode === 'invoice') {
        toast({
          title: "AI Response Ready",
          description: "I've provided guidance for your invoice. Check the chat for details!",
          duration: 3000,
        })
      }
      
    } catch (error) {
      console.error('AI Error:', error)
      const errorMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
  }

  if (!showOnAllPages && pathname.startsWith('/auth')) return null

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`fixed ${positionClasses[position]} w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group`}
          >
            <div className="relative">
              <Bot className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Ask BillCraft AI
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed ${positionClasses[position]} w-96 ${isMinimized ? 'h-16' : 'h-[500px]'} bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 flex flex-col transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white/90">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">BillCraft AI</h3>
                  <p className="text-xs text-slate-500 capitalize">{contextualMode} Mode</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-slate-900 mb-2">
                        Hello! I'm your AI assistant for {contextualMode} tasks.
                      </p>
                      <p className="text-xs text-slate-600 mb-4">
                        Try one of these suggestions:
                      </p>
                      <div className="space-y-2">
                        {contextualSuggestions.slice(0, 2).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => sendMessage(suggestion)}
                            className="w-full text-left p-2 bg-white rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-xs text-slate-700"
                          >
                            💡 {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' ? 'bg-slate-700' : 'bg-purple-600'
                        }`}>
                          {message.role === 'user' ? (
                            <span className="text-xs text-white font-medium">U</span>
                          ) : (
                            <Bot className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                          <div className={`inline-block max-w-[85%] p-2 rounded-lg text-xs ${
                            message.role === 'user' 
                              ? 'bg-slate-700 text-white' 
                              : 'bg-white border border-slate-200 text-slate-900'
                          }`}>
                            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <p className={`text-xs text-slate-500 mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {isLoading && (
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="inline-block bg-white border border-slate-200 p-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-200 bg-white">
                  <div className="relative">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      placeholder={`Ask about ${contextualMode}...`}
                      className="min-h-[60px] max-h-[100px] resize-none border-slate-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg bg-white text-xs pr-12"
                    />
                    <Button
                      onClick={() => sendMessage()}
                      disabled={isLoading || !input.trim()}
                      size="sm"
                      className="absolute right-2 bottom-2 w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-slate-500">Press Enter to send</p>
                    {messages.length > 0 && (
                      <button
                        onClick={clearMessages}
                        className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        Clear chat
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 
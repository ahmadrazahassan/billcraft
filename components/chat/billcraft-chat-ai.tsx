'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User, 
  Loader2,
  MessageCircle,
  Copy,
  RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useChat } from '@/hooks/use-chat'

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(241, 245, 249, 0.3);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.4);
    border-radius: 3px;
    transition: all 0.2s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.7);
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:active {
    background: rgba(100, 116, 139, 0.8);
  }
  
  /* For Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(148, 163, 184, 0.4) rgba(241, 245, 249, 0.3);
  }
`

interface BillCraftChatAIProps {
  isOpen: boolean
  onClose: () => void
  position?: 'center' | 'right' | 'left'
  invoiceData?: any
  onUpdateInvoiceData?: (data: any) => void
}

interface ChatHistory {
  id: string
  messages: any[]
  timestamp: string
  title: string
}

export function BillCraftChatAI({ 
  isOpen, 
  onClose,
  position = 'right',
  invoiceData,
  onUpdateInvoiceData
}: BillCraftChatAIProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const systemInstruction = `You are BillCraft Chat AI, an expert assistant for professional invoicing and business operations. 

You help users with:
- Creating and optimizing professional invoices
- Business communication and client management
- Payment terms and collection strategies
- Invoice design and presentation tips
- Financial best practices
- Automated form filling and data generation

Be concise, professional, and actionable. When users ask for data generation, provide realistic, business-appropriate examples. Always focus on helping users create better invoices and manage their business more effectively.

Current context: ${invoiceData ? `User is creating invoice ${invoiceData.invoiceNumber || 'new'} for ${invoiceData.client?.name || 'a client'}` : 'General assistance'}`

  const { messages, isLoading, sendMessage, clearMessages } = useChat({
    systemInstruction
  })

  // Inject custom scrollbar styles
  useEffect(() => {
    const styleId = 'billcraft-chat-scrollbar-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = scrollbarStyles
      document.head.appendChild(style)
    }
    
    return () => {
      // Cleanup styles when component unmounts (optional)
      const existingStyle = document.getElementById(styleId)
      if (existingStyle && !document.querySelector('[data-billcraft-chat]')) {
        existingStyle.remove()
      }
    }
  }, [])

  // Save chat history to localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('billcraft-chat-history')
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Error loading chat history:', error)
      }
    }
  }, [])

  // Save current chat when messages change
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      const updatedHistory = chatHistory.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages, timestamp: new Date().toISOString() }
          : chat
      )
      setChatHistory(updatedHistory)
      localStorage.setItem('billcraft-chat-history', JSON.stringify(updatedHistory))
    }
  }, [messages, currentChatId, chatHistory])

  // Auto-scroll to bottom with improved behavior
  useEffect(() => {
    if (!isMinimized && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isMinimized, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Create new chat if none exists
    if (!currentChatId) {
      const newChatId = Date.now().toString()
      const newChat: ChatHistory = {
        id: newChatId,
        messages: [],
        timestamp: new Date().toISOString(),
        title: input.slice(0, 30) + (input.length > 30 ? '...' : '')
      }
      setChatHistory(prev => [newChat, ...prev])
      setCurrentChatId(newChatId)
    }

    const success = await sendMessage(input)
    if (success) {
      setInput('')
      inputRef.current?.focus()
    }
  }

  const startNewChat = () => {
    clearMessages()
    setCurrentChatId(null)
    setInput('')
  }

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({ title: "Copied to clipboard", duration: 2000 })
    } catch (error) {
      toast({ title: "Failed to copy", variant: "destructive", duration: 2000 })
    }
  }

  const positionClasses = {
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    right: 'top-4 right-4 bottom-4',
    left: 'top-4 left-4 bottom-4'
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          data-billcraft-chat
          className={`fixed ${positionClasses[position]} ${
            position === 'center' ? 'w-[480px] h-[600px]' : 'w-[420px]'
          } ${isMinimized ? 'h-16' : position === 'center' ? 'h-[600px]' : 'max-h-[calc(100vh-2rem)]'} 
          bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300`}
        >
          {/* Enhanced Header with Better Button Visibility */}
          <div className="p-4 border-b border-slate-200/50 bg-gradient-to-r from-blue-50/80 to-indigo-50/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">BillCraft Chat AI</h3>
                  {!isMinimized && (
                    <p className="text-xs text-slate-600">Your professional invoicing assistant</p>
                  )}
                </div>
              </div>
              
              {/* Enhanced Header Buttons with Better Visibility */}
              <div className="flex items-center space-x-2">
                {!isMinimized && messages.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startNewChat}
                    className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-100"
                  >
                    <RotateCcw className="h-4 w-4 text-slate-600" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0 border-slate-300 hover:border-slate-400 hover:bg-slate-100"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4 text-slate-600" />
                  ) : (
                    <Minimize2 className="h-4 w-4 text-slate-600" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 border-red-300 hover:border-red-400 hover:bg-red-50 text-red-600 hover:text-red-700"
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
                className="flex flex-col"
                style={{ height: position === 'center' ? '536px' : 'calc(100vh - 8rem)' }}
              >
                {/* Messages Area - Scrollable Middle Section */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-8 min-h-[200px]">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                          <MessageCircle className="h-8 w-8 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2 text-lg">Welcome to BillCraft Chat AI</h4>
                        <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                          I'm your professional invoicing assistant. Ask me anything about creating invoices, managing clients, payment terms, or business best practices.
                        </p>
                      </div>
                    ) : (
                      <>
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
                                      : 'bg-white/90 backdrop-blur-sm text-slate-900 border border-slate-200/50'
                                  }`}>
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                    <div className="flex items-center justify-between mt-1">
                                      <p className={`text-xs ${
                                        message.role === 'user' ? 'text-emerald-100' : 'text-slate-400'
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
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {/* Enhanced Loading indicator */}
                        {isLoading && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="flex items-start space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Bot className="h-3 w-3 text-white" />
                              </div>
                              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 border border-slate-200/50">
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
                                  <span className="text-xs text-slate-500">BillCraft AI is thinking...</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>
                </div>

                {/* Fixed Input Section at Bottom */}
                <div className="flex-shrink-0 p-4 border-t bg-white/50 backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask BillCraft Chat AI anything about invoicing..."
                        disabled={isLoading}
                        className="rounded-xl border-slate-200/50 bg-white/70 backdrop-blur-sm focus:bg-white/90 transition-all text-sm h-10 pr-10"
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
                      disabled={!input.trim() || isLoading}
                      className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 h-10 w-10 p-0 shadow-md"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                  
                  {/* Chat info */}
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span>Powered by BillCraft AI</span>
                    {chatHistory.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {chatHistory.length} saved chats
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 
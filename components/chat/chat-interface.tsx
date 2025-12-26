'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Trash2, 
  Bot, 
  User, 
  Loader2,
  MessageSquare,
  Sparkles,
  Minimize2,
  Maximize2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Zap,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useChat, ChatMessage } from '@/hooks/use-chat'
import { useToast } from '@/hooks/use-toast'

interface ChatInterfaceProps {
  systemInstruction?: string
  placeholder?: string
  className?: string
  title?: string
  onMinimize?: () => void
  isMinimizable?: boolean
  height?: 'compact' | 'normal' | 'large'
  showHeader?: boolean
}

export function ChatInterface({
  systemInstruction = "You are BillCraft Chat AI, a helpful assistant for BillCraft invoice management system. Help users with invoice-related questions and provide clear, concise answers.",
  placeholder = "Ask me anything about invoicing...",
  className = "",
  title = "BillCraft Chat AI",
  onMinimize,
  isMinimizable = false,
  height = 'normal',
  showHeader = true
}: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  
  const { messages, isLoading, sendMessage, clearMessages } = useChat({
    systemInstruction
  })

  const heightClasses = {
    compact: 'h-64',
    normal: 'h-80',
    large: 'h-96'
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isMinimized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const success = await sendMessage(input)
    if (success) {
      setInput('')
      inputRef.current?.focus()
    }
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
    if (onMinimize) onMinimize()
  }

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({ title: "Copied to clipboard", duration: 2000 })
    } catch (error) {
      toast({ title: "Failed to copy", variant: "destructive", duration: 2000 })
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Parse markdown formatting (bold, italic, etc.)
  const parseMarkdown = (text: string) => {
    // Split by bold markers (**text**)
    const parts = text.split(/\*\*(.+?)\*\*/g)
    
    return parts.map((part, index) => {
      // Odd indices are the bold text
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold">{part}</strong>
      }
      // Even indices are regular text, check for italic (*text*)
      const italicParts = part.split(/\*(.+?)\*/g)
      return italicParts.map((italicPart, italicIndex) => {
        if (italicIndex % 2 === 1) {
          return <em key={`${index}-${italicIndex}`} className="italic">{italicPart}</em>
        }
        return italicPart
      })
    })
  }

  const quickSuggestions = [
    "Help me create a professional invoice",
    "What payment terms should I use?",
    "How to follow up on unpaid invoices?",
    "Generate invoice description"
  ]

  return (
    <Card className={`flex flex-col ${isMinimized ? 'h-12' : heightClasses[height]} ${className} overflow-hidden transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-xl`}>
      {/* Header */}
      {showHeader && (
        <motion.div 
          className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 backdrop-blur-sm"
          animate={{ opacity: isMinimized ? 0.7 : 1 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
              {!isMinimized && (
                <p className="text-xs text-slate-500">AI-powered assistance</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {!isMinimized && messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                className="text-slate-500 hover:text-red-600 h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
            {isMinimizable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMinimize}
                className="text-slate-500 hover:text-slate-700 h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col flex-1"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-3">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-slate-600 text-sm font-medium mb-2">AI Assistant Ready</p>
                  <p className="text-slate-400 text-xs mb-4">Ask me anything about invoicing and business</p>
                  
                  {/* Quick suggestions */}
                  <div className="space-y-1 w-full max-w-xs">
                    {quickSuggestions.slice(0, 2).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => setInput(suggestion)}
                        className="w-full text-xs h-7 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
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
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                            : 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="h-2.5 w-2.5 text-white" />
                          ) : (
                            <Bot className="h-2.5 w-2.5 text-white" />
                          )}
                        </div>
                        
                        {/* Message bubble */}
                        <div className="relative">
                          <div className={`rounded-2xl px-3 py-2 shadow-sm ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                              : 'bg-white/90 backdrop-blur-sm text-slate-900 border border-slate-200/50'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{parseMarkdown(message.content)}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className={`text-xs ${
                                message.role === 'user' ? 'text-emerald-100' : 'text-slate-400'
                              }`}>
                                {formatTimestamp(message.timestamp)}
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
              )}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Bot className="h-2.5 w-2.5 text-white" />
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
                        <span className="text-xs text-slate-500">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    disabled={isLoading}
                    className="rounded-xl border-slate-200/50 bg-white/70 backdrop-blur-sm focus:bg-white/90 transition-all text-sm h-9"
                  />
                  {input && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setInput('')}
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0 text-slate-400 hover:text-slate-600"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 h-9 w-9 p-0 shadow-md"
                >
                  {isLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
} 
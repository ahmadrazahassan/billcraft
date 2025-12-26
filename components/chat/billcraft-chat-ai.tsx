'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Send, 
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
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useChat, ChatMessage } from '@/hooks/use-chat'
import { useToast } from '@/hooks/use-toast'

interface BillCraftChatAIProps {
  isOpen: boolean
  onClose: () => void
  position?: 'left' | 'right' | 'center'
  title?: string
  context?: string
  className?: string
}

const quickSuggestions = [
  "Help me create a professional client profile",
  "What information should I include for this client?",
  "Generate sample client details",
  "How do I organize client information?"
]

export function BillCraftChatAI({
  isOpen,
  onClose,
  position = 'right',
  title = "BillCraft AI Assistant",
  context = "client management",
  className = ""
}: BillCraftChatAIProps) {
  const [input, setInput] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  
  const systemInstruction = `You are BillCraft AI, an expert assistant for ${context}. Help users with professional guidance, form filling, and business best practices. Provide clear, actionable advice.`
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearMessages 
  } = useChat({ 
    initialMessages: [], 
    systemInstruction 
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setShowSuggestions(false)
    
    try {
      await sendMessage(userMessage)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied",
      description: "Message copied to clipboard"
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

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-4'
      case 'center':
        return 'left-1/2 transform -translate-x-1/2'
      case 'right':
      default:
        return 'right-4'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className={`fixed top-4 ${getPositionClasses()} w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="h-full bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-white/80 capitalize">{context} Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-96"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {messages.length === 0 && showSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <div className="text-center text-gray-500 text-sm mb-4">
                          <Sparkles className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                          How can I help with {context}?
                        </div>
                        {quickSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left p-3 text-sm text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors border border-gray-200 hover:border-blue-200"
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                            message.role === 'user' 
                              ? 'bg-blue-500' 
                              : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                          }`}>
                            {message.role === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className={`rounded-2xl px-4 py-3 ${
                            message.role === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <div className="text-sm whitespace-pre-wrap">{parseMarkdown(message.content)}</div>
                            {message.role === 'assistant' && (
                              <div className="flex items-center space-x-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyMessage(message.content)}
                                  className="h-6 w-6 p-0 hover:bg-gray-200"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 hover:bg-gray-200"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 hover:bg-gray-200"
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                            <span className="text-sm text-gray-500">Thinking...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-100">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Ask me anything..."
                          disabled={isLoading}
                          className="pr-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 rounded-xl"
                        />
                        {input && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setInput('')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-200"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={!input.trim() || isLoading}
                        className="h-10 w-10 p-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
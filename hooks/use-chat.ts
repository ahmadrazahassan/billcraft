import { useState, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface UseChatOptions {
  systemInstruction?: string
  initialMessages?: ChatMessage[]
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(options.initialMessages || [])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const sendMessage = useCallback(async (content: string): Promise<boolean> => {
    if (!content.trim()) return false

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Convert messages to Gemini format
      const history = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history,
          systemInstruction: options.systemInstruction
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        timestamp: data.timestamp
      }

      setMessages(prev => [...prev, assistantMessage])
      return true

    } catch (error: any) {
      console.error('Chat error:', error)
      toast({
        title: 'Chat Error',
        description: error.message || 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
      
      // Remove the user message if sending failed
      setMessages(prev => prev.slice(0, -1))
      return false
    } finally {
      setIsLoading(false)
    }
  }, [messages, options.systemInstruction, toast])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const removeMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
  }, [])

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    removeMessage
  }
} 
'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Sparkles, Zap } from 'lucide-react'
import { ChatInterface } from '@/components/chat/chat-interface'
import { Card } from '@/components/ui/card'

export default function ChatPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl"></div>
        <div className="relative p-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                AI Chat Assistant
              </h1>
              <p className="text-slate-600 mt-1 text-lg">
                Get help with invoicing, billing, and business questions
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <Sparkles className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Smart Assistance</h3>
            <p className="text-sm text-slate-600">
              Get intelligent help with invoice creation, client management, and billing workflows.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <Zap className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Instant Answers</h3>
            <p className="text-sm text-slate-600">
              Get immediate responses to your business questions, powered by Gemini AI.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <MessageSquare className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Conversational</h3>
            <p className="text-sm text-slate-600">
              Have natural conversations about your invoicing needs and get personalized advice.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <ChatInterface
          title="BillCraft AI Assistant"
          placeholder="Ask me about invoices, payments, clients, or any business questions..."
          systemInstruction="You are a helpful assistant for BillCraft, an invoice management system. Help users with:
          - Invoice creation and management
          - Payment tracking and follow-ups
          - Client management best practices
          - Business workflow optimization
          - General invoicing and billing questions
          
          Be professional, concise, and provide actionable advice. If asked about features BillCraft doesn't have, suggest alternatives or workarounds."
          className="h-[600px]"
        />
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-6 bg-slate-50">
          <h3 className="font-semibold text-slate-900 mb-3">💡 Tips for better conversations:</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Ask specific questions about invoice creation, payment tracking, or client management</li>
            <li>• Include context about your business type or situation for more relevant advice</li>
            <li>• Ask for step-by-step guidance for complex tasks</li>
            <li>• Request best practices for professional invoicing and getting paid faster</li>
          </ul>
        </Card>
      </motion.div>
    </div>
  )
} 
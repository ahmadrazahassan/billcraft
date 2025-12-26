'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Wand2, 
  FileText, 
  Send, 
  Loader2, 
  Check,
  X,
  Zap,
  Building2,
  Users,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAIFormFill } from '@/hooks/use-ai-form-fill'
import { useRouter } from 'next/navigation'

interface QuickInvoiceAIProps {
  onInvoiceGenerated?: (invoiceData: any) => void
  compact?: boolean
  className?: string
}

export function QuickInvoiceAI({ 
  onInvoiceGenerated, 
  compact = false, 
  className = "" 
}: QuickInvoiceAIProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedData, setGeneratedData] = useState<any>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const { fillForm, calculateTotals, generateInvoiceNumber } = useAIFormFill()
  const router = useRouter()

  const generateQuickInvoice = async () => {
    setIsGenerating(true)
    
    try {
      // Generate all invoice data at once
      const data = await fillForm('all', { 
        context: 'professional_services' 
      })
      
      // Calculate totals
      const totals = calculateTotals(data.items || [], 8.5, 0)
      
      // Create complete invoice data
      const completeInvoiceData = {
        invoiceNumber: generateInvoiceNumber(),
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'draft',
        currency: 'USD',
        ...data,
        ...totals
      }

      setGeneratedData(completeInvoiceData)
      setShowSuccess(true)
      
      if (onInvoiceGenerated) {
        onInvoiceGenerated(completeInvoiceData)
      }

      // Auto-hide success message
      setTimeout(() => setShowSuccess(false), 3000)
      
    } catch (error) {
      console.error('Quick invoice generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const openInEditor = () => {
    if (generatedData) {
      // Store in localStorage temporarily and navigate to create page
      localStorage.setItem('tempInvoiceData', JSON.stringify(generatedData))
      router.push('/dashboard/invoices/create?ai=true')
    }
  }

  if (compact) {
    return (
      <Card className={`p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-200/50 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Quick AI Invoice</h3>
              <p className="text-xs text-slate-600">Generate complete invoice instantly</p>
            </div>
          </div>
          
          <Button
            onClick={generateQuickInvoice}
            disabled={isGenerating}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 h-8"
          >
            {isGenerating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
        
        <AnimatePresence>
          {showSuccess && generatedData && (
          <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-blue-200/50"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span className="text-slate-600">Invoice generated: {generatedData.invoiceNumber}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={openInEditor}
                  className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700"
                >
                  Edit
                </Button>
              </div>
          </motion.div>
        )}
        </AnimatePresence>
      </Card>
    )
  }

  return (
    <Card className={`p-6 bg-gradient-to-br from-white to-blue-50/30 border-blue-200/50 ${className}`}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <motion.div
              animate={{ 
                rotate: isGenerating ? 360 : 0,
                scale: isGenerating ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                duration: isGenerating ? 1 : 0.3,
                repeat: isGenerating ? Infinity : 0,
                ease: "linear"
              }}
            >
              <Wand2 className="h-8 w-8 text-white" />
            </motion.div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">AI Invoice Generator</h3>
        <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
          Let AI create a complete professional invoice with realistic company details, client information, and services in seconds.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-slate-700">Company Info</p>
        </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-emerald-600" />
      </div>
            <p className="text-xs font-medium text-slate-700">Client Details</p>
              </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-slate-700">Service Items</p>
          </div>
      </div>

        <Button
          onClick={generateQuickInvoice}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Generating Invoice...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Complete Invoice
            </>
          )}
        </Button>

        <AnimatePresence>
          {showSuccess && generatedData && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <h4 className="font-semibold text-green-900 text-center mb-2">
                Invoice Generated Successfully!
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Invoice Number:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {generatedData.invoiceNumber}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Company:</span>
                  <span className="text-green-900 font-medium">{generatedData.company?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Client:</span>
                  <span className="text-green-900 font-medium">{generatedData.client?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total:</span>
                  <span className="text-green-900 font-bold">${generatedData.total?.toFixed(2)}</span>
                </div>
            </div>

              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={openInEditor}
                  className="flex-1 border-green-300 text-green-700 hover:bg-green-100"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Edit Invoice
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowSuccess(false)}
                  className="text-green-600 hover:text-green-700 hover:bg-green-100"
                >
                  <X className="h-4 w-4" />
                </Button>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
} 
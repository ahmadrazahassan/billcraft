'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ArrowLeft,
  Save,
  Send,
  Eye,
  Download,
  Plus,
  Trash2,
  Calendar,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Hash,
  DollarSign,
  Sparkles,
  Bot,
  Upload,
  ImageIcon,
  Paperclip,
  X,
  Loader2,
  Copy,
  MessageCircle,
  Users,
  Package,
  Minimize2,
  Maximize2,
  Printer
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { InvoiceData } from '@/lib/sample-invoice-data'
import { userService, invoiceService } from '@/lib/database'
import { AIService, AIUtils } from '@/lib/ai-service'

// Import template components
import { MinimalWhiteTemplate } from '@/components/templates/minimal-white'
import { CreativePurpleTemplate } from '@/components/templates/creative-purple'
import { MinimalBlackTemplate } from '@/components/templates/minimal-black'
import { ModernBlueTemplate } from '@/components/templates/modern-blue'
import { CorporateNavyTemplate } from '@/components/templates/corporate-navy'
import { ClassicGreenTemplate } from '@/components/templates/classic-green'
import { ModernOrangeTemplate } from '@/components/templates/modern-orange'
import { CorporateRedTemplate } from '@/components/templates/corporate-red'
import { CreativeTealTemplate } from '@/components/templates/creative-teal'
import { ClassicBrownTemplate } from '@/components/templates/classic-brown'

// Template configurations
const templateComponents = {
  'minimal-white': MinimalWhiteTemplate,
  'creative-purple': CreativePurpleTemplate,
  'minimal-black': MinimalBlackTemplate,
  'modern-blue': ModernBlueTemplate,
  'corporate-navy': CorporateNavyTemplate,
  'classic-green': ClassicGreenTemplate,
  'modern-orange': ModernOrangeTemplate,
  'corporate-red': CorporateRedTemplate,
  'creative-teal': CreativeTealTemplate,
  'classic-brown': ClassicBrownTemplate,
}

const templateNames = {
  'minimal-white': 'Minimal Clean',
  'creative-purple': 'Creative Studio',
  'minimal-black': 'Minimal Dark',
  'modern-blue': 'Modern Professional',
  'corporate-navy': 'Corporate Elite',
  'classic-green': 'Classic Business',
  'modern-orange': 'Modern Vibrant',
  'corporate-red': 'Corporate Power',
  'creative-teal': 'Creative Flow',
  'classic-brown': 'Classic Elegance',
}

// Initial invoice data
const initialInvoiceData: InvoiceData = {
  invoiceNumber: "INV-2024-001",
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  status: "draft",
  company: {
    name: "",
    address: "",
    city: "",
    email: "",
    phone: "",
    website: ""
  },
  client: {
    name: "",
    address: "",
    city: "",
    email: ""
  },
  items: [{
    id: "1",
    description: "",
    quantity: 1,
    rate: 0,
    amount: 0
  }],
  tax: 0,
  subtotal: 0,
  total: 0,
  notes: "",
  terms: "",
  currency: "USD"
}

// AI Message type
interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  attachments?: Array<{ name: string, url: string, type: string }>
}

export default function CreateInvoicePage(): JSX.Element {
  // State management
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceData)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern-blue')
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [taxRate, setTaxRate] = useState<number>(0)
  const [discountAmount, setDiscountAmount] = useState<number>(0)
  const [savedInvoiceId, setSavedInvoiceId] = useState<string | null>(null)

  // AI Chat State
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false)
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([])
  const [aiInput, setAiInput] = useState<string>('')
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const aiMessagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Hooks
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast, success, error, info } = useToast()

  // Template component
  const TemplateComponent = templateComponents[selectedTemplate as keyof typeof templateComponents]

  // Effects
  useEffect(() => {
    const templateParam = searchParams.get('template')
    if (templateParam && templateComponents[templateParam as keyof typeof templateComponents]) {
      setSelectedTemplate(templateParam)
      toast({
        title: "Template Selected!",
        description: `Using ${templateNames[templateParam as keyof typeof templateNames]} template.`,
      })
    }

    // Check for AI-generated invoice data
    const aiGenerated = searchParams.get('ai_generated')
    if (aiGenerated === 'true') {
      try {
        const aiData = localStorage.getItem('ai_generated_invoice')
        if (aiData) {
          const parsedData = JSON.parse(aiData)
          const updatedInvoiceData = AIUtils.mergeInvoiceData(invoiceData, parsedData)
          setInvoiceData(updatedInvoiceData)
          
          // Set tax rate if provided
          if (parsedData.totals?.taxRate) {
            setTaxRate(parsedData.totals.taxRate)
          }
          
          localStorage.removeItem('ai_generated_invoice') // Clean up
          
          success({
            title: "AI Invoice Loaded!",
            description: "Your AI-generated invoice is ready for customization.",
            duration: 5000,
          })
        }
      } catch (error) {
        console.error('Error loading AI-generated invoice:', error)
      }
    }
  }, [searchParams, toast, invoiceData])

  useEffect(() => {
    calculateTotals()
  }, [invoiceData.items, taxRate, discountAmount])



  // Utility functions
  const updateCompanyData = (field: string, value: string): void => {
    setInvoiceData(prev => ({
      ...prev,
      company: { ...prev.company, [field]: value }
    }))
  }

  const updateClientData = (field: string, value: string): void => {
    setInvoiceData(prev => ({
      ...prev,
      client: { ...prev.client, [field]: value }
    }))
  }

  const updateInvoiceData = (field: keyof InvoiceData, value: any): void => {
    setInvoiceData(prev => ({ ...prev, [field]: value }))
  }

  const updateItem = (index: number, field: string, value: any): void => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { 
          ...item, 
          [field]: value, 
          amount: field === 'quantity' || field === 'rate' 
            ? (field === 'quantity' ? value : item.quantity) * (field === 'rate' ? value : item.rate)
            : item.amount
        } : item
      )
    }))
  }

  const addItem = (): void => {
    const newItem = {
      id: String(invoiceData.items.length + 1),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const removeItem = (index: number): void => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }))
    }
  }

  const calculateTotals = (): void => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
    const tax = subtotal * (taxRate / 100)
    const total = subtotal + tax - discountAmount
    
    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      tax,
      taxRate,
      total,
      discountAmount
    }))
  }

  // AI Functions
  const scrollToBottomOfAI = (): void => {
    setTimeout(() => {
      if (aiMessagesEndRef.current) {
        aiMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setSelectedFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number): void => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const sendAIMessage = async (messageText?: string): Promise<void> => {
    const textToSend = messageText || aiInput.trim()
    if ((!textToSend && selectedFiles.length === 0) || isAiLoading) return

    const messageId = Date.now().toString()
    const userMessage: AIMessage = {
      id: messageId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
      attachments: selectedFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }))
    }

    setAiMessages(prev => [...prev, userMessage])
    if (!messageText) setAiInput('')
    setIsAiLoading(true)
    scrollToBottomOfAI()

    try {
      // Use the enhanced AI service with current invoice context
      const { response, structuredData } = await AIService.sendMessage(
        textToSend,
        invoiceData,
        aiMessages.map(msg => ({ role: msg.role, content: msg.content }))
      )

      const assistantMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      }

      setAiMessages(prev => [...prev, assistantMessage])

      // Handle structured data for auto-filling form
      if (structuredData) {
        try {
          const updatedInvoiceData = AIUtils.mergeInvoiceData(invoiceData, structuredData)
          setInvoiceData(updatedInvoiceData)

          // Update tax rate and discount if provided
          if (structuredData.totals?.taxRate !== undefined) {
            setTaxRate(structuredData.totals.taxRate)
          }
          if (structuredData.totals?.discountAmount !== undefined) {
            setDiscountAmount(structuredData.totals.discountAmount)
          }

          // Show success message for form auto-fill
          success({
            title: "Form Auto-Filled!",
            description: "I've extracted the information and filled the relevant fields for you.",
            duration: 4000,
          })
        } catch (fillError) {
          console.error('Form fill error:', fillError)
          toast({
            title: "Partial Success",
            description: "I understood your request but couldn't auto-fill all fields. Please check and adjust as needed.",
            variant: "destructive",
            duration: 4000,
          })
        }
      }
      
    } catch (error) {
      console.error('AI Error:', error)
      const errorMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `I apologize, but I encountered an error. Please try again.`,
        timestamp: new Date().toISOString()
      }
      setAiMessages(prev => [...prev, errorMessage])
    } finally {
      setIsAiLoading(false)
      setSelectedFiles([])
      scrollToBottomOfAI()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendAIMessage()
    }
  }

  const clearAIChat = (): void => {
    setAiMessages([])
    setAiInput('')
    setSelectedFiles([])
  }

  // Action handlers
  const handleSave = async (): Promise<void> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save invoices.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      let currentUser = await userService.getCurrentUser(user.uid)
      if (!currentUser) {
        currentUser = await userService.debugCreateUser(user)
        toast({
          title: "User Synced!",
          description: "Your account has been synced with the database.",
        })
      }

      let invoiceNumber = invoiceData.invoiceNumber
      if (!savedInvoiceId) {
        invoiceNumber = await invoiceService.generateInvoiceNumber(currentUser.id)
        setInvoiceData(prev => ({ ...prev, invoiceNumber }))
      }

      const invoiceDataToSave = {
        userId: currentUser.id,
        clientId: null,
        invoiceNumber: invoiceNumber,
        issueDate: invoiceData.date,
        dueDate: invoiceData.dueDate,
        template: selectedTemplate,
        company: invoiceData.company,
        client: invoiceData.client,
        items: invoiceData.items,
        subtotal: invoiceData.subtotal,
        taxRate: taxRate,
        tax: invoiceData.tax,
        discountAmount: discountAmount,
        total: invoiceData.total,
        currency: invoiceData.currency,
        notes: invoiceData.notes,
        terms: invoiceData.terms
      }

      const savedInvoice = await invoiceService.createInvoice(invoiceDataToSave)
      setSavedInvoiceId(savedInvoice.id)

      toast({
        title: "Invoice Saved Successfully!",
        description: `Invoice ${savedInvoice.invoice_number} has been saved to your account.`,
      })

    } catch (error: any) {
      console.error('Database save error:', error)
      toast({
        title: "Save Failed",
        description: error.message || "Could not save invoice. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSend = async (): Promise<void> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to send invoices.",
        variant: "destructive",
      })
      return
    }

    if (!invoiceData.client.email) {
      toast({
        title: "Client Email Required",
        description: "Please add a client email address to send the invoice.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)
    try {
      if (!savedInvoiceId) {
        await handleSave()
      }

      if (savedInvoiceId) {
        await invoiceService.updateInvoiceStatus(savedInvoiceId, 'sent')
      }

      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Invoice Sent Successfully!",
        description: `Invoice sent to ${invoiceData.client.email}`,
      })
      
      router.push('/dashboard/invoices')
    } catch (error: any) {
      console.error('Send error:', error)
      toast({
        title: "Send Failed",
        description: error.message || "Could not send invoice. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleDownloadPDF = async (): Promise<void> => {
    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default
      
      if (!TemplateComponent) {
        throw new Error('Template component not found')
      }

      // Find the hidden full-size template container
      const pdfContainer = document.getElementById('pdf-template-container') as HTMLElement
      if (!pdfContainer) {
        throw new Error('PDF template container not found')
      }

      // Make the container visible temporarily for capture
      pdfContainer.style.visibility = 'visible'
      pdfContainer.style.position = 'absolute'
      pdfContainer.style.top = '-9999px'
      pdfContainer.style.left = '-9999px'

      // Wait for layout to settle and images to load
      await new Promise(resolve => setTimeout(resolve, 500))

      // Wait for any images to load
      const images = pdfContainer.querySelectorAll('img')
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve) => {
          img.onload = () => resolve(undefined)
          img.onerror = () => resolve(undefined)
          setTimeout(() => resolve(undefined), 3000) // Fallback timeout
        })
      }))

      // Capture the full-size template at high quality
      const canvas = await html2canvas(pdfContainer, {
        scale: 2.5, // Very high quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels
        height: pdfContainer.scrollHeight,
        windowWidth: 1200,
        windowHeight: 1600,
        removeContainer: false,
        ignoreElements: (element) => {
          return element.classList.contains('no-pdf') || 
                 element.classList.contains('absolute') ||
                 element.getAttribute('data-html2canvas-ignore') === 'true'
        }
      })

      // Hide the container again
      pdfContainer.style.visibility = 'hidden'

      // Create PDF with proper A4 dimensions
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const imgData = canvas.toDataURL('image/png', 1.0)
      
      let heightLeft = imgHeight
      let position = 0

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pageHeight

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
        heightLeft -= pageHeight
      }

      // Save the PDF with a professional filename
      const filename = `${invoiceData.company.name || 'Invoice'}-${invoiceData.invoiceNumber || 'Draft'}.pdf`.replace(/[^a-zA-Z0-9-_]/g, '_')
      pdf.save(filename)

      success({
        title: "Professional PDF Downloaded!",
        description: "High-quality invoice PDF has been generated with perfect formatting.",
      })
    } catch (error) {
      console.error('Error downloading PDF:', error)
      toast({
        title: "Download Failed",
        description: "Could not download PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Render guards
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to create invoices.</p>
          <Button onClick={() => router.push('/auth/login')}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/invoices')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Create Invoice</h1>
                <p className="text-sm text-slate-500">Design your professional invoice</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isPreviewMode 
                    ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Eye className="w-4 h-4 mr-1.5 inline" />
                {isPreviewMode ? 'Edit Mode' : 'Live Preview'}
              </button>
              
              <button
                onClick={() => setIsAIOpen(!isAIOpen)}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all text-sm font-medium shadow-sm"
              >
                <Bot className="w-4 h-4 mr-1.5 inline" />
                BillCraft AI
              </button>
              
              <button
                onClick={handleDownloadPDF}
                disabled={isSending}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all text-sm font-medium shadow-sm"
              >
                <Download className="w-4 h-4 mr-1.5 inline" />
                Download
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-1.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-all text-sm font-medium shadow-sm"
              >
                <Save className="w-4 h-4 mr-1.5 inline" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
              
              <button
                onClick={handleSend}
                disabled={isSending}
                className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all text-sm font-medium shadow-sm"
              >
                <Send className="w-4 h-4 mr-1.5 inline" />
                {isSending ? 'Sending...' : 'Send Invoice'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid gap-8 transition-all duration-500 ${isPreviewMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Form Section */}
          {!isPreviewMode && (
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                <div className="p-8 space-y-8">
                  {/* Company Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Company Information</h3>
                        <p className="text-sm text-slate-500">Your business details</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Company Name</Label>
                        <Input
                          value={invoiceData.company.name}
                          onChange={(e) => updateCompanyData('name', e.target.value)}
                          placeholder="Enter company name"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Email</Label>
                        <Input
                          type="email"
                          value={invoiceData.company.email}
                          onChange={(e) => updateCompanyData('email', e.target.value)}
                          placeholder="company@email.com"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Phone</Label>
                        <Input
                          type="tel"
                          value={invoiceData.company.phone}
                          onChange={(e) => updateCompanyData('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Website</Label>
                        <Input
                          type="url"
                          value={invoiceData.company.website}
                          onChange={(e) => updateCompanyData('website', e.target.value)}
                          placeholder="www.company.com"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Address</Label>
                        <Input
                          value={invoiceData.company.address}
                          onChange={(e) => updateCompanyData('address', e.target.value)}
                          placeholder="123 Business Street, City, State 12345"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Invoice Details</h3>
                        <p className="text-sm text-slate-500">Invoice number and dates</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Invoice Number</Label>
                        <Input
                          value={invoiceData.invoiceNumber}
                          onChange={(e) => updateInvoiceData('invoiceNumber', e.target.value)}
                          placeholder="INV-001"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white/80"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Issue Date</Label>
                        <Input
                          type="date"
                          value={invoiceData.date}
                          onChange={(e) => updateInvoiceData('date', e.target.value)}
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white/80"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Due Date</Label>
                        <Input
                          type="date"
                          value={invoiceData.dueDate}
                          onChange={(e) => updateInvoiceData('dueDate', e.target.value)}
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white/80"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Client Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Client Information</h3>
                        <p className="text-sm text-slate-500">Bill to details</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Client Name</Label>
                        <Input
                          value={invoiceData.client.name}
                          onChange={(e) => updateClientData('name', e.target.value)}
                          placeholder="Client or Company Name"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500/20 bg-white/80"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Email</Label>
                        <Input
                          type="email"
                          value={invoiceData.client.email}
                          onChange={(e) => updateClientData('email', e.target.value)}
                          placeholder="client@example.com"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500/20 bg-white/80"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Address</Label>
                        <Input
                          value={invoiceData.client.address}
                          onChange={(e) => updateClientData('address', e.target.value)}
                          placeholder="Client's business address"
                          className="h-8 text-sm rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500/20 bg-white/80"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Invoice Items */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Hash className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">Invoice Items</h3>
                          <p className="text-sm text-slate-500">Products and services</p>
                        </div>
                      </div>
                      <button
                        onClick={addItem}
                        className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-medium shadow-lg flex items-center space-x-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Item</span>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {invoiceData.items.map((item, index) => (
                        <div key={item.id} className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/60 backdrop-blur-sm">
                          <div className="grid grid-cols-12 gap-3 items-end">
                            <div className="col-span-12 md:col-span-5 space-y-1">
                              <Label className="text-xs font-medium text-slate-600">Description</Label>
                              <Input
                                value={item.description}
                                onChange={(e) => updateItem(index, 'description', e.target.value)}
                                placeholder="Product or service description"
                                className="h-7 text-xs rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/90"
                              />
                            </div>
                            <div className="col-span-4 md:col-span-2 space-y-1">
                              <Label className="text-xs font-medium text-slate-600">Qty</Label>
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                value={item.quantity}
                                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                className="h-7 text-xs rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/90"
                              />
                            </div>
                            <div className="col-span-4 md:col-span-2 space-y-1">
                              <Label className="text-xs font-medium text-slate-600">Rate</Label>
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500 text-xs">$</span>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={item.rate}
                                  onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                                  className="h-7 text-xs rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/90 pl-6"
                                />
                              </div>
                            </div>
                            <div className="col-span-3 md:col-span-2 space-y-1">
                              <Label className="text-xs font-medium text-slate-600">Amount</Label>
                              <div className="h-7 px-2 bg-slate-200/60 rounded-lg border border-slate-200 flex items-center font-bold text-slate-900 text-xs">
                                ${(item.quantity * item.rate).toFixed(2)}
                              </div>
                            </div>
                            <div className="col-span-1 flex justify-end">
                              <button
                                onClick={() => removeItem(index)}
                                disabled={invoiceData.items.length <= 1}
                                className="w-7 h-7 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50 transition-colors flex items-center justify-center"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Totals */}
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200/60 rounded-2xl p-6 border border-slate-200/60 backdrop-blur-sm">
                      <h4 className="text-base font-bold text-slate-900 mb-4">Invoice Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Subtotal</span>
                          <span className="text-sm font-bold text-slate-900">${invoiceData.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Tax</span>
                            <div className="flex items-center space-x-1">
                              <input
                                type="number"
                                value={taxRate}
                                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                className="w-12 h-6 px-1 border border-slate-300 rounded text-xs text-center bg-white focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                                step="0.1"
                                min="0"
                                max="100"
                              />
                              <span className="text-xs text-slate-500">%</span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-slate-900">${invoiceData.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Discount</span>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-slate-500">$</span>
                              <input
                                type="number"
                                value={discountAmount}
                                onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                                className="w-16 h-6 px-1 border border-slate-300 rounded text-xs text-center bg-white focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <span className="text-sm font-bold text-red-600">-${discountAmount.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-slate-300 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-900">Total</span>
                            <span className="text-xl font-bold text-purple-600">${invoiceData.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes and Terms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Notes</Label>
                        <Textarea
                          value={invoiceData.notes}
                          onChange={(e) => updateInvoiceData('notes', e.target.value)}
                          placeholder="Additional notes..."
                          className="h-20 text-sm rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white/80 resize-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Payment Terms</Label>
                        <Textarea
                          value={invoiceData.terms}
                          onChange={(e) => updateInvoiceData('terms', e.target.value)}
                          placeholder="Payment terms..."
                          className="h-20 text-sm rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white/80 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Section */}
          <div className={`${isPreviewMode ? 'col-span-1' : 'lg:col-span-1'} transition-all duration-500`}>
            <div className="sticky top-32">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
                {/* Preview Header */}
                <div className="p-6 bg-amber-50 text-slate-800 border-b border-amber-100">
                  <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center">
                          <Eye className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">Live Preview</h3>
                          <p className="text-sm text-slate-600">Real-time invoice preview</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600 font-medium">Live</span>
                        </div>
                                              <button
                          onClick={() => setIsPreviewMode(!isPreviewMode)}
                          className="p-1.5 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                        >
                          {isPreviewMode ? <Minimize2 className="w-4 h-4 text-slate-600" /> : <Maximize2 className="w-4 h-4 text-slate-600" />}
                        </button>
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="p-4 bg-slate-100">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div 
                      className={`transition-all duration-500 overflow-auto ${
                        isPreviewMode ? 'max-h-[800px]' : 'max-h-[700px]'
                      }`}
                      data-preview-template="true"
                      style={{
                        width: '100%',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      {TemplateComponent && (
                        <div className="relative bg-white flex justify-center">
                          <div style={{ 
                            width: isPreviewMode ? '794px' : '600px',
                            transform: isPreviewMode ? 'scale(1)' : 'scale(0.85)', 
                            transformOrigin: 'top center',
                            backgroundColor: '#ffffff',
                            padding: '40px',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            minHeight: '600px',
                            margin: '20px auto'
                          }}>
                            <TemplateComponent data={invoiceData} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preview Actions */}
                <div className="p-4 bg-slate-50/80 backdrop-blur-sm border-t border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-600 font-medium">Auto-updating</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleDownloadPDF}
                        disabled={isSending}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all text-xs font-medium shadow-sm flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all text-xs font-medium shadow-sm flex items-center space-x-1"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">${invoiceData.total.toFixed(2)}</div>
                    <div className="text-xs text-slate-500 font-medium">Total Amount</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{invoiceData.items.length}</div>
                    <div className="text-xs text-slate-500 font-medium">Line Items</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Full-Size Template for PDF Generation */}
      <div 
        id="pdf-template-container"
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          width: '794px',
          backgroundColor: '#ffffff',
          padding: '40px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          visibility: 'hidden'
        }}
      >
        {TemplateComponent && <TemplateComponent data={invoiceData} />}
      </div>

      {/* AI Chatbot */}
      <AnimatePresence>
        {isAIOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={(e) => e.target === e.currentTarget && setIsAIOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: 400, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 400, scale: 0.9 }}
              className="fixed right-6 top-6 bottom-6 w-[420px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
            >
              {/* AI Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-sm">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">BillCraft AI</h3>
                    <p className="text-xs text-slate-500">Expert Invoicing Assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Smart Mode</span>
                  </div>
                  <button
                    onClick={clearAIChat}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors text-slate-600 hover:text-slate-900"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsAIOpen(false)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors text-slate-600 hover:text-slate-900"
                    title="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>



              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {aiMessages.length === 0 ? (
                  <div className="flex items-start space-x-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 mb-2">
                        Hello! I'm BillCraft AI, your expert invoicing assistant! ✨
                      </p>
                      <p className="text-xs text-slate-600 mb-3">
                        I can help you with invoice creation, data extraction, and professional formatting. Just ask me anything about invoicing!
                      </p>
                    </div>
                  </div>
                ) : (
                  aiMessages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-slate-700' 
                          : 'bg-purple-600'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                        <div className={`inline-block max-w-[85%] p-3 rounded-2xl ${
                          message.role === 'user' 
                            ? 'bg-slate-700 text-white' 
                            : 'bg-white border border-slate-200 text-slate-900'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                        <p className={`text-xs text-slate-500 mt-1 px-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {/* Loading indicator */}
                {isAiLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block bg-white border border-slate-200 p-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-slate-600">Analyzing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={aiMessagesEndRef} />
              </div>



              {/* Input Area */}
              <div className="p-4 border-t border-slate-200 bg-white">
                {/* File Preview */}
                {selectedFiles.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-slate-100 rounded-lg px-3 py-2 text-xs">
                        <span className="text-slate-600 truncate max-w-[120px]">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <Textarea
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me to help with your invoice... (Press Enter to send, Shift+Enter for new line)"
                    className="min-h-[80px] max-h-[120px] resize-none border-slate-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl bg-white placeholder:text-slate-400 text-sm leading-relaxed pr-20"
                  />
                  <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Attach file"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Upload image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => sendAIMessage()}
                      disabled={isAiLoading || (!aiInput.trim() && selectedFiles.length === 0)}
                      className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="mt-3 flex items-center justify-center">
                  <p className="text-xs text-slate-500 flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Powered by BillCraft AI</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 
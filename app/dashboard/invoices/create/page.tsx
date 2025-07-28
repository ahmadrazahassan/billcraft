'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  Bot
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
import { BillCraftChatAI } from '@/components/chat/billcraft-chat-ai'
import { userService, invoiceService } from '@/lib/database'


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

export default function CreateInvoicePage() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceData)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern-blue')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [taxRate, setTaxRate] = useState(8.5)
  const [isChatAIOpen, setIsChatAIOpen] = useState(false)
  const [savedInvoiceId, setSavedInvoiceId] = useState<string | null>(null)

  
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    // Check if template is specified in URL
    const templateParam = searchParams.get('template')
    if (templateParam && templateComponents[templateParam as keyof typeof templateComponents]) {
      setSelectedTemplate(templateParam)
      toast({
        title: "Template Selected!",
        description: `Using ${templateNames[templateParam as keyof typeof templateNames]} template.`,
      })
    }
  }, [searchParams, toast])

  const TemplateComponent = templateComponents[selectedTemplate as keyof typeof templateComponents]

  // Enhanced state update functions with immediate preview updates
  const updateCompanyData = (field: string, value: string) => {
    setInvoiceData(prev => {
      const newData = {
      ...prev,
      company: { ...prev.company, [field]: value }
      }
      return newData
    })
  }

  const updateClientData = (field: string, value: string) => {
    setInvoiceData(prev => {
      const newData = {
      ...prev,
      client: { ...prev.client, [field]: value }
      }
      return newData
    })
  }

  const updateInvoiceData = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => {
      const newData = { ...prev, [field]: value }
      // Force immediate re-render for notes and terms
      if (field === 'notes' || field === 'terms') {
        console.log(`Updating ${field}:`, value)
      }
      return newData
    })
  }

  const updateItem = (index: number, field: string, value: any) => {
    setInvoiceData(prev => {
      const newData = {
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
      }
      return newData
    })
  }

  const addItem = () => {
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

  const removeItem = (index: number) => {
    if (invoiceData.items.length > 1) {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
    }
  }

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
    const tax = subtotal * (taxRate / 100)
    const total = subtotal + tax - (invoiceData.discountAmount || 0)
    
    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      tax,
      taxRate,
      total
    }))
  }

  // Enhanced useEffect with better dependency management
  useEffect(() => {
    calculateTotals()
  }, [invoiceData.items, taxRate, invoiceData.discountAmount])

  // Force preview updates - especially for notes and terms
  useEffect(() => {
    // Force re-render of template component when notes or terms change
    const timeoutId = setTimeout(() => {
      // This ensures the preview updates immediately after state changes
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [invoiceData.notes, invoiceData.terms, invoiceData])

  // Add a separate state to force re-renders
  const [forceUpdate, setForceUpdate] = useState(0)
  
  useEffect(() => {
    setForceUpdate(prev => prev + 1)
  }, [invoiceData.notes, invoiceData.terms])


  const handleSave = async () => {
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
      // Get current user from Supabase
      let currentUser = await userService.getCurrentUser(user.uid)
      if (!currentUser) {
        console.log('User not found, attempting to create...')
        // Try to create the user if not found
        try {
          currentUser = await userService.debugCreateUser(user)
      toast({
            title: "User Synced!",
            description: "Your account has been synced with the database.",
          })
        } catch (syncError) {
          console.error('Failed to sync user:', syncError)
          throw new Error('Failed to sync user account. Please sign out and sign in again.')
        }
      }

      // Generate invoice number if this is a new invoice
      let invoiceNumber = invoiceData.invoiceNumber
      if (!savedInvoiceId) {
        invoiceNumber = await invoiceService.generateInvoiceNumber(currentUser.id)
        setInvoiceData(prev => ({ ...prev, invoiceNumber }))
      }

      // Prepare invoice data for database
      const invoiceDataToSave = {
        userId: currentUser.id,
        clientId: null, // Will implement client selection later
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
        discountAmount: invoiceData.discountAmount || 0,
        total: invoiceData.total,
        currency: invoiceData.currency,
        notes: invoiceData.notes,
        terms: invoiceData.terms
      }

      // Save to database
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

  const handleSend = async () => {
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
      // Save the invoice first if not already saved
      if (!savedInvoiceId) {
        await handleSave()
      }

      // Update invoice status to 'sent' if we have a saved invoice
      if (savedInvoiceId) {
        await invoiceService.updateInvoiceStatus(savedInvoiceId, 'sent')
      }

      // TODO: Implement actual email sending (SendGrid, Resend, etc.)
      // For now, just simulate the sending process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Invoice Sent Successfully!",
        description: `Invoice sent to ${invoiceData.client.email}`,
      })
      
      // Redirect to invoices list
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

  const handleDownloadPDF = async () => {
    try {
      // Import libraries dynamically for high-quality PDF generation
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default
      
      if (!TemplateComponent) {
        throw new Error('Template component not found')
      }

      // Find the preview element that contains the actual styled template
      const previewElement = document.querySelector('[data-preview-template]') as HTMLElement
      if (!previewElement) {
        throw new Error('Preview element not found')
      }

      // Temporarily remove the scale transform to capture at full size
      const originalTransform = previewElement.style.transform
      const originalScale = previewElement.style.scale
      previewElement.style.transform = 'none'
      previewElement.style.scale = '1'

      // Wait a moment for the DOM to update
      await new Promise(resolve => setTimeout(resolve, 100))

      // Wait for all images and fonts to load
      await new Promise(resolve => {
        const images = previewElement.querySelectorAll('img')
        let loadedImages = 0
        const totalImages = images.length

        if (totalImages === 0) {
          setTimeout(() => resolve(undefined), 500)
          return
        }

        images.forEach(img => {
          if (img.complete) {
            loadedImages++
            if (loadedImages === totalImages) {
              setTimeout(() => resolve(undefined), 300)
            }
          } else {
            img.onload = () => {
              loadedImages++
              if (loadedImages === totalImages) {
                setTimeout(() => resolve(undefined), 300)
              }
            }
            img.onerror = () => {
              loadedImages++
              if (loadedImages === totalImages) {
                setTimeout(() => resolve(undefined), 300)
              }
            }
          }
        })

        // Fallback timeout
        setTimeout(() => resolve(undefined), 3000)
      })

      // Convert to high-quality canvas with exact template styling
      const canvas = await html2canvas(previewElement, {
        scale: 2, // High quality but not too slow
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: previewElement.scrollWidth,
        height: previewElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: previewElement.scrollWidth,
        windowHeight: previewElement.scrollHeight,
        ignoreElements: (element) => {
          // Ignore any overlay elements
          return element.tagName === 'BUTTON' || element.classList.contains('no-pdf')
        },
        onclone: (clonedDoc) => {
          // Ensure all styles are preserved in the cloned document
          const clonedElement = clonedDoc.querySelector('[data-preview-template]') as HTMLElement
          if (clonedElement) {
            clonedElement.style.transform = 'none'
            clonedElement.style.scale = '1'
            clonedElement.style.width = previewElement.scrollWidth + 'px'
            clonedElement.style.height = previewElement.scrollHeight + 'px'
            // Ensure all images are visible
            const clonedImages = clonedElement.querySelectorAll('img')
            clonedImages.forEach(img => {
              img.style.display = 'block'
              img.style.visibility = 'visible'
            })
          }
        }
      })

      // Restore the original transform
      previewElement.style.transform = originalTransform
      previewElement.style.scale = originalScale

      // Create PDF with exact dimensions
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgData = canvas.toDataURL('image/png', 1.0) // Maximum quality
      
      let heightLeft = imgHeight
      let position = 0

      // Add the first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pageHeight

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
        heightLeft -= pageHeight
      }

      // Download the PDF with exact template styling
      pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`)

      toast({
        title: "Perfect PDF Downloaded!",
        description: "Invoice PDF with exact styling and logo has been downloaded.",
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
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/invoices')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Create Invoice</h1>
                <p className="text-sm text-slate-600">
                  Using {templateNames[selectedTemplate as keyof typeof templateNames]} template
                </p>
              </div>
            </div>

                          <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsChatAIOpen(true)}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-indigo-100"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  BillCraft Chat AI
                </Button>
                <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                onClick={handleSend}
                disabled={isSending}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSending ? 'Sending...' : 'Send Invoice'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Modern Form Section */}
          {!isPreviewMode && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="xl:col-span-5 space-y-6"
            >
              {/* Company Information */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                  <div>
                      <h3 className="text-lg font-semibold text-slate-900">Business Information</h3>
                      <p className="text-sm text-slate-600">Your company details</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">Company Name</Label>
                    <Input
                      id="companyName"
                      value={invoiceData.company.name}
                      onChange={(e) => updateCompanyData('name', e.target.value)}
                        placeholder="Enter company name"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail" className="text-sm font-medium text-slate-700">Email Address</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={invoiceData.company.email}
                      onChange={(e) => updateCompanyData('email', e.target.value)}
                        placeholder="business@company.com"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone" className="text-sm font-medium text-slate-700">Phone Number</Label>
                    <Input
                      id="companyPhone"
                      value={invoiceData.company.phone}
                      onChange={(e) => updateCompanyData('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite" className="text-sm font-medium text-slate-700">Website</Label>
                    <Input
                      id="companyWebsite"
                      value={invoiceData.company.website || ''}
                      onChange={(e) => updateCompanyData('website', e.target.value)}
                        placeholder="www.company.com"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="companyAddress" className="text-sm font-medium text-slate-700">Business Address</Label>
                    <Input
                      id="companyAddress"
                      value={invoiceData.company.address}
                      onChange={(e) => updateCompanyData('address', e.target.value)}
                        placeholder="123 Business St, City, State 12345"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyCity" className="text-sm font-medium text-slate-700">City</Label>
                      <Input
                        id="companyCity"
                        value={invoiceData.company.city}
                        onChange={(e) => updateCompanyData('city', e.target.value)}
                        placeholder="New York"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Client Information */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                  <div>
                      <h3 className="text-lg font-semibold text-slate-900">Client Information</h3>
                      <p className="text-sm text-slate-600">Bill to details</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName" className="text-sm font-medium text-slate-700">Client Name</Label>
                    <Input
                      id="clientName"
                      value={invoiceData.client.name}
                      onChange={(e) => updateClientData('name', e.target.value)}
                        placeholder="Client or Company Name"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail" className="text-sm font-medium text-slate-700">Client Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={invoiceData.client.email}
                      onChange={(e) => updateClientData('email', e.target.value)}
                        placeholder="client@example.com"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="clientAddress" className="text-sm font-medium text-slate-700">Client Address</Label>
                    <Input
                      id="clientAddress"
                      value={invoiceData.client.address}
                      onChange={(e) => updateClientData('address', e.target.value)}
                        placeholder="Client's business address"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientCity" className="text-sm font-medium text-slate-700">City</Label>
                      <Input
                        id="clientCity"
                        value={invoiceData.client.city}
                        onChange={(e) => updateClientData('city', e.target.value)}
                        placeholder="Client city"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Invoice Details */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-xl">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                  <div>
                      <h3 className="text-lg font-semibold text-slate-900">Invoice Details</h3>
                      <p className="text-sm text-slate-600">Invoice number and dates</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceNumber" className="text-sm font-medium text-slate-700">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => updateInvoiceData('invoiceNumber', e.target.value)}
                        placeholder="INV-001"
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoiceDate" className="text-sm font-medium text-slate-700">Issue Date</Label>
                    <Input
                      id="invoiceDate"
                      type="date"
                      value={invoiceData.date}
                      onChange={(e) => updateInvoiceData('date', e.target.value)}
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate" className="text-sm font-medium text-slate-700">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => updateInvoiceData('dueDate', e.target.value)}
                        className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Enhanced Items Section */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-xl">
                        <Hash className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Invoice Items</h3>
                        <p className="text-sm text-slate-600">Add products or services</p>
                      </div>
                    </div>
                    <Button 
                      onClick={addItem} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                  </Button>
                </div>
                  <div className="space-y-4">
                  {invoiceData.items.map((item, index) => (
                      <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="grid grid-cols-12 gap-4 items-end">
                          <div className="col-span-12 md:col-span-5 space-y-2">
                            <Label htmlFor={`desc-${index}`} className="text-sm font-medium text-slate-700">Description</Label>
                        <Input
                          id={`desc-${index}`}
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                              placeholder="Product or service description"
                              className="h-10 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                          <div className="col-span-4 md:col-span-2 space-y-2">
                            <Label htmlFor={`qty-${index}`} className="text-sm font-medium text-slate-700">Quantity</Label>
                        <Input
                          id={`qty-${index}`}
                          type="number"
                              min="0"
                              step="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                              className="h-10 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                          <div className="col-span-4 md:col-span-2 space-y-2">
                            <Label htmlFor={`rate-${index}`} className="text-sm font-medium text-slate-700">Rate ($)</Label>
                        <Input
                          id={`rate-${index}`}
                          type="number"
                              min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                              className="h-10 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                          <div className="col-span-3 md:col-span-2 space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Amount</Label>
                            <div className="h-10 px-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center font-semibold text-slate-900">
                              ${(item.quantity * item.rate).toFixed(2)}
                        </div>
                      </div>
                          <div className="col-span-1 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(index)}
                              disabled={invoiceData.items.length <= 1}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-10 w-10 p-0 rounded-xl"
                        >
                              <Trash2 className="h-4 w-4" />
                        </Button>
                          </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </Card>

              {/* Enhanced Totals & Notes */}
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                    </div>
                  <div>
                      <h3 className="text-lg font-semibold text-slate-900">Totals & Additional Info</h3>
                      <p className="text-sm text-slate-600">Tax, discounts, and notes</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="taxRate" className="text-sm font-medium text-slate-700">Tax Rate (%)</Label>
                        <Input
                          id="taxRate"
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={taxRate}
                          onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                          className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discountAmount" className="text-sm font-medium text-slate-700">Discount Amount ($)</Label>
                        <Input
                          id="discountAmount"
                          type="number"
                          min="0"
                          step="0.01"
                          value={invoiceData.discountAmount || 0}
                          onChange={(e) => updateInvoiceData('discountAmount', parseFloat(e.target.value) || 0)}
                          className="h-11 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between text-slate-700">
                      <span>Subtotal:</span>
                        <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
                    </div>
                      <div className="flex justify-between text-slate-700">
                      <span>Tax ({taxRate}%):</span>
                        <span className="font-semibold">${invoiceData.tax.toFixed(2)}</span>
                    </div>
                    {invoiceData.discountAmount && invoiceData.discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                          <span className="font-semibold">-${invoiceData.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                      <div className="border-t border-slate-200 pt-3">
                        <div className="flex justify-between text-lg font-bold text-slate-900">
                      <span>Total:</span>
                          <span className="text-blue-600">${invoiceData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium text-slate-700">Notes</Label>
                    <Textarea
                      id="notes"
                      value={invoiceData.notes || ''}
                        onChange={(e) => {
                          const value = e.target.value
                          updateInvoiceData('notes', value)
                          setForceUpdate(prev => prev + 1)
                        }}
                        onInput={(e) => {
                          const value = (e.target as HTMLTextAreaElement).value
                          updateInvoiceData('notes', value)
                        }}
                      placeholder="Thank you for your business!"
                        rows={4}
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                    />
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="terms" className="text-sm font-medium text-slate-700">Payment Terms</Label>
                    <Textarea
                      id="terms"
                      value={invoiceData.terms || ''}
                        onChange={(e) => {
                          const value = e.target.value
                          updateInvoiceData('terms', value)
                          setForceUpdate(prev => prev + 1)
                        }}
                        onInput={(e) => {
                          const value = (e.target as HTMLTextAreaElement).value
                          updateInvoiceData('terms', value)
                        }}
                        placeholder="Payment due within 30 days..."
                        rows={4}
                        className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Enhanced Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={isPreviewMode ? 'xl:col-span-12' : 'xl:col-span-7'}
          >
            <div className="sticky top-24">
              <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <Eye className="h-5 w-5 text-blue-600" />
                </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Live Preview</h4>
                        <p className="text-sm text-slate-600">Real-time invoice preview</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-600">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-4">
                  <div 
                    className={`bg-white rounded-xl shadow-sm transition-all duration-300 ${
                      isPreviewMode ? 'transform scale-100' : 'transform scale-90'
                    }`}
                  data-preview-template
                    key={`preview-${invoiceData.invoiceNumber}-${invoiceData.items.length}-${invoiceData.notes?.length || 0}-${invoiceData.terms?.length || 0}-${forceUpdate}`}
                >
                  {TemplateComponent && <TemplateComponent data={invoiceData} />}
                </div>
              </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BillCraft Chat AI */}
      <BillCraftChatAI
        isOpen={isChatAIOpen}
        onClose={() => setIsChatAIOpen(false)}
        position="right"
        invoiceData={invoiceData}
        onUpdateInvoiceData={setInvoiceData}
      />

    </div>
  )
} 
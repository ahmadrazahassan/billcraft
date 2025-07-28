'use client'

import { useState, useCallback } from 'react'
import { useToast } from './use-toast'

interface AIFormFillOptions {
  context?: string
  existingData?: any
}

interface GeneratedData {
  company?: {
    name: string
    address: string
    city: string
    email: string
    phone: string
    website?: string
  }
  client?: {
    name: string
    address: string
    city: string
    email: string
  }
  items?: Array<{
    id: string
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  terms?: string
  notes?: string
}

export function useAIFormFill() {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateCompanyData = useCallback(async (): Promise<GeneratedData['company']> => {
    const companies = [
      {
        name: "Creative Solutions Studio",
        address: "1234 Innovation Drive",
        city: "San Francisco, CA 94102",
        email: "hello@creativesolutions.com",
        phone: "+1 (555) 123-4567",
        website: "www.creativesolutions.com"
      },
      {
        name: "Digital Marketing Pro",
        address: "567 Business Avenue",
        city: "Austin, TX 78701",
        email: "contact@digitalmarketingpro.com",
        phone: "+1 (512) 555-8901",
        website: "www.digitalmarketingpro.com"
      },
      {
        name: "TechFlow Consulting",
        address: "890 Tech Boulevard",
        city: "Seattle, WA 98101",
        email: "info@techflowconsulting.com",
        phone: "+1 (206) 555-2345",
        website: "www.techflowconsulting.com"
      },
      {
        name: "Brand Architects LLC",
        address: "432 Design Street",
        city: "New York, NY 10001",
        email: "studio@brandarchitects.com",
        phone: "+1 (212) 555-6789",
        website: "www.brandarchitects.com"
      }
    ]
    
    await new Promise(resolve => setTimeout(resolve, 800))
    return companies[Math.floor(Math.random() * companies.length)]
  }, [])

  const generateClientData = useCallback(async (): Promise<GeneratedData['client']> => {
    const clients = [
      {
        name: "TechCorp Industries",
        address: "567 Business Blvd",
        city: "New York, NY 10001",
        email: "accounting@techcorp.com"
      },
      {
        name: "Global Enterprises Ltd",
        address: "123 Corporate Plaza",
        city: "Los Angeles, CA 90210",
        email: "billing@globalenterprises.com"
      },
      {
        name: "Innovation Labs Inc",
        address: "789 Research Park",
        city: "Boston, MA 02101",
        email: "finance@innovationlabs.com"
      },
      {
        name: "Future Systems Corp",
        address: "456 Technology Way",
        city: "Chicago, IL 60601",
        email: "accounts@futuresystems.com"
      },
      {
        name: "NextGen Solutions",
        address: "321 Digital Drive",
        city: "Miami, FL 33101",
        email: "payments@nextgensolutions.com"
      }
    ]
    
    await new Promise(resolve => setTimeout(resolve, 800))
    return clients[Math.floor(Math.random() * clients.length)]
  }, [])

  const generateInvoiceItems = useCallback(async (context?: string): Promise<GeneratedData['items']> => {
    const serviceCategories = {
      design: [
        {
          id: "1",
          description: "Brand Identity Design - Complete logo, color palette, and typography system",
          quantity: 1,
          rate: 2500.00,
          amount: 2500.00
        },
        {
          id: "2",
          description: "Website UI/UX Design - Modern, responsive design with user experience optimization",
          quantity: 1,
          rate: 3200.00,
          amount: 3200.00
        },
        {
          id: "3",
          description: "Marketing Collateral Design - Business cards, brochures, and digital assets",
          quantity: 5,
          rate: 300.00,
          amount: 1500.00
        }
      ],
      development: [
        {
          id: "1",
          description: "Custom Web Application Development - Full-stack solution with modern frameworks",
          quantity: 1,
          rate: 8500.00,
          amount: 8500.00
        },
        {
          id: "2",
          description: "API Integration & Backend Services - Third-party integrations and database optimization",
          quantity: 1,
          rate: 2800.00,
          amount: 2800.00
        },
        {
          id: "3",
          description: "Quality Assurance & Testing - Comprehensive testing and bug fixes",
          quantity: 20,
          rate: 120.00,
          amount: 2400.00
        }
      ],
      consulting: [
        {
          id: "1",
          description: "Strategic Business Consulting - Market analysis and growth strategy development",
          quantity: 40,
          rate: 200.00,
          amount: 8000.00
        },
        {
          id: "2",
          description: "Digital Transformation Consulting - Technology roadmap and implementation guidance",
          quantity: 25,
          rate: 250.00,
          amount: 6250.00
        },
        {
          id: "3",
          description: "Process Optimization Review - Workflow analysis and efficiency improvements",
          quantity: 15,
          rate: 180.00,
          amount: 2700.00
        }
      ],
      marketing: [
        {
          id: "1",
          description: "SEO Strategy & Implementation - Comprehensive search engine optimization package",
          quantity: 1,
          rate: 1800.00,
          amount: 1800.00
        },
        {
          id: "2",
          description: "Social Media Management - Content creation and platform management (3 months)",
          quantity: 3,
          rate: 800.00,
          amount: 2400.00
        },
        {
          id: "3",
          description: "Google Ads Campaign Setup & Management - PPC advertising optimization",
          quantity: 1,
          rate: 1200.00,
          amount: 1200.00
        }
      ]
    }

    const categories = Object.keys(serviceCategories)
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)]
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    return serviceCategories[selectedCategory as keyof typeof serviceCategories]
  }, [])

  const generateTermsAndNotes = useCallback(async (): Promise<{ terms: string; notes: string }> => {
    const termsOptions = [
      "Payment due within 30 days of invoice date. Late payments subject to 1.5% monthly service charge. Thank you for your business!",
      "Net 15 payment terms. Payment accepted via bank transfer, check, or credit card. Please include invoice number with payment.",
      "Payment due upon receipt. Late fees of 2% per month apply to overdue balances. We appreciate your prompt payment.",
      "30-day payment terms. For questions about this invoice, please contact our billing department. Thank you for choosing our services."
    ]

    const notesOptions = [
      "Thank you for your business! We look forward to continuing our partnership and delivering exceptional results.",
      "We appreciate the opportunity to work with you. Please don't hesitate to reach out if you have any questions.",
      "Thank you for choosing our services. We're committed to delivering excellence and exceeding your expectations.",
      "It's been a pleasure working with you on this project. We look forward to future collaborations!"
    ]

    await new Promise(resolve => setTimeout(resolve, 600))
    
    return {
      terms: termsOptions[Math.floor(Math.random() * termsOptions.length)],
      notes: notesOptions[Math.floor(Math.random() * notesOptions.length)]
    }
  }, [])

  const fillForm = useCallback(async (
    type: 'company' | 'client' | 'items' | 'terms' | 'all',
    options: AIFormFillOptions = {}
  ) => {
    setIsGenerating(true)
    
    try {
      let result: Partial<GeneratedData> = {}

      switch (type) {
        case 'company':
          result.company = await generateCompanyData()
          toast({
            title: "Company info generated!",
            description: "Professional company details have been added.",
            duration: 3000
          })
          break

        case 'client':
          result.client = await generateClientData()
          toast({
            title: "Client info generated!",
            description: "Professional client details have been added.",
            duration: 3000
          })
          break

        case 'items':
          result.items = await generateInvoiceItems(options.context)
          toast({
            title: "Invoice items generated!",
            description: "Professional service descriptions have been added.",
            duration: 3000
          })
          break

        case 'terms':
          const termsAndNotes = await generateTermsAndNotes()
          result.terms = termsAndNotes.terms
          result.notes = termsAndNotes.notes
          toast({
            title: "Terms & notes generated!",
            description: "Professional payment terms and notes have been added.",
            duration: 3000
          })
          break

        case 'all':
          const [company, client, items, allTermsAndNotes] = await Promise.all([
            generateCompanyData(),
            generateClientData(), 
            generateInvoiceItems(options.context),
            generateTermsAndNotes()
          ])
          
          result = {
            company,
            client,
            items,
            terms: allTermsAndNotes.terms,
            notes: allTermsAndNotes.notes
          }
          
          toast({
            title: "Complete invoice generated!",
            description: "All invoice details have been professionally generated.",
            duration: 4000
          })
          break

        default:
          throw new Error('Invalid fill type')
      }

      return result
    } catch (error) {
      console.error('AI form fill error:', error)
      toast({
        title: "Generation failed",
        description: "Unable to generate data. Please try again.",
        variant: "destructive",
        duration: 3000
      })
      throw error
    } finally {
      setIsGenerating(false)
    }
  }, [generateCompanyData, generateClientData, generateInvoiceItems, generateTermsAndNotes, toast])

  const calculateTotals = useCallback((items: GeneratedData['items'], taxRate: number = 8.5, discountAmount: number = 0) => {
    if (!items || items.length === 0) return { subtotal: 0, tax: 0, total: 0 }

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
    const tax = subtotal * (taxRate / 100)
    const total = subtotal + tax - discountAmount

    return { subtotal, tax, total }
  }, [])

  const generateInvoiceNumber = useCallback(() => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    return `INV-${year}${month}-${random}`
  }, [])

  return {
    fillForm,
    calculateTotals,
    generateInvoiceNumber,
    isGenerating
  }
} 
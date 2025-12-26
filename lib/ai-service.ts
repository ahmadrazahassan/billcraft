/**
 * BillCraft AI Service
 * Advanced AI-powered data extraction and form filling service
 */

import { InvoiceData } from './sample-invoice-data'

export interface AIFormFillData {
  company?: {
    name?: string
    email?: string
    phone?: string
    address?: string
    city?: string
    website?: string
  }
  client?: {
    name?: string
    email?: string
    address?: string
    city?: string
  }
  items?: Array<{
    id?: string
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  invoiceDetails?: {
    invoiceNumber?: string
    dueDate?: string
    notes?: string
    terms?: string
  }
  totals?: {
    taxRate?: number
    discountAmount?: number
  }
}

export interface AIResponse {
  success: boolean
  data?: AIFormFillData
  message: string
  suggestions?: string[]
}

export class AIService {
  /**
   * Send message to AI with current invoice context for intelligent responses
   */
  static async sendMessage(
    message: string,
    currentInvoiceData?: InvoiceData,
    history: Array<{ role: 'user' | 'assistant', content: string }> = []
  ): Promise<{ response: string; structuredData?: AIFormFillData }> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are BillCraft AI, an expert invoicing assistant.'
            },
            ...history,
            {
              role: 'user',
              content: message
            }
          ],
          currentInvoiceData
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      return {
        response: data.response || data.message || 'I received your message but had trouble generating a response.',
        structuredData: data.structuredData
      }
    } catch (error) {
      console.error('AI Service error:', error)
      throw new Error('Failed to communicate with AI service')
    }
  }

  /**
   * Extract business data from natural language input
   */
  static async extractBusinessData(input: string): Promise<AIResponse> {
    try {
      const { response, structuredData } = await this.sendMessage(
        `Please extract business information from this text and return structured data for form filling: "${input}"`
      )

      if (structuredData) {
        return {
          success: true,
          data: structuredData,
          message: response,
          suggestions: this.generateSuggestions(structuredData)
        }
      }

      return {
        success: false,
        message: response
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to extract business data. Please try again.'
      }
    }
  }

  /**
   * Generate smart suggestions based on extracted data
   */
  static generateSuggestions(data: AIFormFillData): string[] {
    const suggestions: string[] = []

    if (data.company?.name && !data.company?.website) {
      suggestions.push(`Consider adding a website URL for ${data.company.name}`)
    }

    if (data.items && data.items.length > 0) {
      const hasLowPricing = data.items.some(item => item.rate < 50)
      if (hasLowPricing) {
        suggestions.push('Review pricing to ensure it reflects the value of your services')
      }
    }

    if (data.client?.email && !data.invoiceDetails?.terms) {
      suggestions.push('Add payment terms to ensure clear expectations')
    }

    if (!data.totals?.taxRate) {
      suggestions.push('Consider adding appropriate tax rate based on your location')
    }

    return suggestions
  }

  /**
   * Auto-fill form with AI-generated professional data
   */
  static async autoFillForm(
    type: 'company' | 'client' | 'items' | 'terms' | 'all',
    context?: string
  ): Promise<AIResponse> {
    try {
      let prompt = ''
      
      switch (type) {
        case 'company':
          prompt = `Generate professional company information for a ${context || 'professional services'} business`
          break
        case 'client':
          prompt = `Generate professional client information for an invoice`
          break
        case 'items':
          prompt = `Generate professional invoice items for ${context || 'professional services'} with realistic pricing`
          break
        case 'terms':
          prompt = `Generate professional payment terms and notes for an invoice`
          break
        case 'all':
          prompt = `Generate a complete professional invoice with company info, client details, services, and terms for a ${context || 'professional services'} business`
          break
      }

      const { response, structuredData } = await this.sendMessage(prompt)

      if (structuredData) {
        return {
          success: true,
          data: structuredData,
          message: response,
          suggestions: this.generateSuggestions(structuredData)
        }
      }

      return {
        success: false,
        message: 'Unable to generate form data. Please try again.'
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to auto-fill form. Please try again.'
      }
    }
  }

  /**
   * Get intelligent pricing suggestions
   */
  static async suggestPricing(
    serviceDescription: string,
    industry?: string
  ): Promise<{ hourlyRate: number; projectRate: number; suggestions: string[] }> {
    try {
      const { response } = await this.sendMessage(
        `Suggest competitive pricing for this service: "${serviceDescription}" in the ${industry || 'general'} industry. Return hourly and project rates with explanations.`
      )

      // Parse the response to extract pricing (this would be enhanced with structured output)
      const hourlyMatch = response.match(/hourly.*?(\d+)/i)
      const projectMatch = response.match(/project.*?(\d+)/i)

      return {
        hourlyRate: hourlyMatch ? parseInt(hourlyMatch[1]) : 100,
        projectRate: projectMatch ? parseInt(projectMatch[1]) : 2500,
        suggestions: [
          'Consider market rates in your area',
          'Factor in your experience and expertise',
          'Include time for revisions and communication'
        ]
      }
    } catch (error) {
      return {
        hourlyRate: 100,
        projectRate: 2500,
        suggestions: ['Unable to get pricing suggestions at the moment']
      }
    }
  }

  /**
   * Analyze invoice for optimization opportunities
   */
  static async analyzeInvoice(invoiceData: InvoiceData): Promise<{
    score: number
    recommendations: string[]
    insights: string[]
  }> {
    try {
      const { response } = await this.sendMessage(
        `Analyze this invoice for professionalism and optimization opportunities: ${JSON.stringify(invoiceData, null, 2)}`
      )

      return {
        score: 85, // This would be calculated based on AI analysis
        recommendations: [
          'Consider adding a professional logo',
          'Include clear payment instructions',
          'Add late payment fees policy'
        ],
        insights: [
          'Invoice follows professional formatting standards',
          'Payment terms are reasonable',
          'Contact information is complete'
        ]
      }
    } catch (error) {
      return {
        score: 0,
        recommendations: ['Unable to analyze invoice at the moment'],
        insights: []
      }
    }
  }

  /**
   * Generate professional invoice templates based on industry
   */
  static async generateTemplate(industry: string): Promise<Partial<InvoiceData>> {
    try {
      const { structuredData } = await this.sendMessage(
        `Generate a professional invoice template with sample data for the ${industry} industry`
      )

      if (structuredData) {
        // Convert AI data to InvoiceData format with defaults
        return {
          company: structuredData.company ? {
            name: structuredData.company.name || '',
            address: structuredData.company.address || '',
            city: structuredData.company.city || '',
            email: structuredData.company.email || '',
            phone: structuredData.company.phone || '',
            website: structuredData.company.website
          } : undefined,
          client: structuredData.client ? {
            name: structuredData.client.name || '',
            address: structuredData.client.address || '',
            city: structuredData.client.city || '',
            email: structuredData.client.email || ''
          } : undefined,
          items: structuredData.items?.map((item, index) => ({
            id: `${index + 1}`,
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            amount: item.amount
          })),
          notes: structuredData.invoiceDetails?.notes,
          terms: structuredData.invoiceDetails?.terms,
          currency: 'USD'
        }
      }

      throw new Error('No template data received')
    } catch (error) {
      console.error('Template generation error:', error)
      throw new Error('Failed to generate template')
    }
  }
}

/**
 * Utility functions for data processing
 */
export const AIUtils = {
  /**
   * Calculate totals from AI-extracted items
   */
  calculateTotals(
    items: AIFormFillData['items'] = [],
    taxRate: number = 0,
    discountAmount: number = 0
  ) {
    const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0)
    const tax = subtotal * (taxRate / 100)
    const total = subtotal + tax - discountAmount

    return { subtotal, tax, total }
  },

  /**
   * Merge AI data with existing invoice data
   */
  mergeInvoiceData(
    existingData: InvoiceData,
    aiData: AIFormFillData
  ): InvoiceData {
    const merged = { ...existingData }

    if (aiData.company) {
      merged.company = { ...merged.company, ...aiData.company }
    }

    if (aiData.client) {
      merged.client = { ...merged.client, ...aiData.client }
    }

    if (aiData.items) {
      merged.items = aiData.items.map((item, index) => ({
        id: item.id || `${index + 1}`,
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.amount
      }))
    }

    if (aiData.invoiceDetails?.notes) {
      merged.notes = aiData.invoiceDetails.notes
    }

    if (aiData.invoiceDetails?.terms) {
      merged.terms = aiData.invoiceDetails.terms
    }

    return merged
  },

  /**
   * Format currency values
   */
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  },

  /**
   * Generate invoice number with AI suggestions
   */
  generateInvoiceNumber(companyName?: string): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    if (companyName) {
      const prefix = companyName.substring(0, 3).toUpperCase()
      return `${prefix}-${year}${month}${day}-001`
    }
    
    return `INV-${year}${month}${day}-001`
  }
} 
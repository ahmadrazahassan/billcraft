export interface InvoiceData {
  // Invoice Details
  invoiceNumber: string
  date: string
  dueDate: string
  status: 'draft' | 'sent' | 'paid' | 'overdue'

  // Company Information
  company: {
    name: string
    address: string
    city: string
    email: string
    phone: string
    website?: string
    logo?: string
  }

  // Client Information
  client: {
    name: string
    address: string
    city: string
    email: string
  }

  // Items
  items: Array<{
    id: string
    description: string
    quantity: number
    rate: number
    amount: number
  }>

  // Tax and Totals
  tax: number
  subtotal: number
  discountAmount?: number
  total: number

  // Additional Information
  notes?: string
  terms?: string
  currency: string

  // Legacy compatibility
  companyName?: string
  companyAddress?: string
  companyCity?: string
  companyEmail?: string
  companyPhone?: string
  companyWebsite?: string
  clientName?: string
  clientAddress?: string
  clientCity?: string
  clientEmail?: string
  invoiceDate?: string
  taxRate?: number
  taxAmount?: number
}

export const sampleInvoiceData: InvoiceData = {
  // Invoice Details
  invoiceNumber: "INV-2025-001",
  date: "2025-01-15",
  dueDate: "2025-02-14",
  status: "sent",

  // Company Information
  company: {
    name: "Layerium cloud",
    address: "Pakistan",
    city: "LHR",
    email: "layeriumcloud@admin.com",
    phone: "+923407685083",
    website: "www.layeriumcloud.com"
  },

  // Client Information
  client: {
    name: "Acme Corporation",
    address: "456 Client Street",
    city: "Los Angeles, CA 90210",
    email: "accounting@acme.com"
  },

  // Items
  items: [
    {
      id: "1",
      description: "Website Design & Development",
      quantity: 1,
      rate: 2500.00,
      amount: 2500.00
    },
    {
      id: "2",
      description: "SEO Optimization Package",
      quantity: 1,
      rate: 800.00,
      amount: 800.00
    },
    {
      id: "3",
      description: "Monthly Maintenance (3 months)",
      quantity: 3,
      rate: 200.00,
      amount: 600.00
    }
  ],

  // Tax and Totals
  tax: 331.50,
  subtotal: 3900.00,
  total: 4231.50,

  // Additional Information
  notes: "Thank you for your business! Please remit payment within 30 days.",
  terms: "Payment is due within 30 days of invoice date. Late payments may incur a 1.5% monthly service charge.",
  currency: "USD",

  // Legacy compatibility
  companyName: "BillCraft Solutions",
  companyAddress: "123 Business Avenue",
  companyCity: "New York, NY 10001",
  companyEmail: "hello@billcraft.com",
  companyPhone: "+1 (555) 123-4567",
  companyWebsite: "www.billcraft.com",
  clientName: "Acme Corporation",
  clientAddress: "456 Client Street",
  clientCity: "Los Angeles, CA 90210",
  clientEmail: "accounting@acme.com",
  invoiceDate: "2025-01-15",
  taxRate: 8.5,
  taxAmount: 331.50
}

export const generateSampleData = (templateId: string): InvoiceData => {
  // Generate different sample data based on template
  const baseData = { ...sampleInvoiceData }
  
  switch (templateId) {
    case 'corporate-navy':
      return {
        ...baseData,
        company: { ...baseData.company, name: "Elite Corporate Solutions" },
        client: { ...baseData.client, name: "Fortune Enterprise Ltd." },
        items: [
          {
            id: "1",
            description: "Strategic Consulting Services",
            quantity: 40,
            rate: 250.00,
            amount: 10000.00
          },
          {
            id: "2",
            description: "Business Process Optimization",
            quantity: 1,
            rate: 5000.00,
            amount: 5000.00
          }
        ],
        subtotal: 15000.00,
        tax: 1275.00,
        total: 16275.00,
        companyName: "Elite Corporate Solutions",
        clientName: "Fortune Enterprise Ltd.",
        taxAmount: 1275.00
      }
    
    case 'creative-purple':
      return {
        ...baseData,
        company: { ...baseData.company, name: "Purple Creative Studio" },
        client: { ...baseData.client, name: "Innovative Brands Co." },
        items: [
          {
            id: "1",
            description: "Brand Identity Design",
            quantity: 1,
            rate: 3500.00,
            amount: 3500.00
          },
          {
            id: "2",
            description: "Logo Animation",
            quantity: 1,
            rate: 1200.00,
            amount: 1200.00
          },
          {
            id: "3",
            description: "Marketing Collateral Design",
            quantity: 5,
            rate: 300.00,
            amount: 1500.00
          }
        ],
        subtotal: 6200.00,
        tax: 527.00,
        total: 6727.00,
        companyName: "Purple Creative Studio",
        clientName: "Innovative Brands Co.",
        taxAmount: 527.00
      }

    case 'minimal-white':
      return {
        ...baseData,
        company: { ...baseData.company, name: "Minimal Design Co." },
        client: { ...baseData.client, name: "Clean Tech Solutions" },
        items: [
          {
            id: "1",
            description: "UI/UX Design",
            quantity: 20,
            rate: 150.00,
            amount: 3000.00
          }
        ],
        subtotal: 3000.00,
        tax: 255.00,
        total: 3255.00,
        companyName: "Minimal Design Co.",
        clientName: "Clean Tech Solutions",
        taxAmount: 255.00
      }

    default:
      return baseData
  }
} 
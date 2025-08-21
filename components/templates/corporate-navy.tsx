import { Building2, Phone, Mail, Globe, Award } from 'lucide-react'

interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  company: {
    name: string
    address: string
    city: string
    phone: string
    email: string
  }
  client: {
    name: string
    address: string
    city: string
  }
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  subtotal: number
  tax: number
  total: number
}

interface CorporateNavyTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function CorporateNavyTemplate({ data, isPreview = false }: CorporateNavyTemplateProps) {
  return (
    <div className="bg-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8 text-slate-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{data.company.name}</h1>
              <p className="text-slate-300">Professional Services</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold mb-2">INVOICE</h2>
            <div className="bg-white text-slate-900 px-4 py-2 rounded-lg">
              <p className="text-sm font-semibold">#{data.invoiceNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-slate-50 px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
              <p className="text-slate-900 font-medium">{data.company.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
              <p className="text-slate-900 font-medium">{data.company.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Address</p>
              <p className="text-slate-900 font-medium">{data.company.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Certified</p>
              <p className="text-slate-900 font-medium">ISO 9001</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4 pb-2 border-b border-slate-200">
              Invoice Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Issue Date:</span>
                <span className="font-semibold text-slate-900">{data.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Due Date:</span>
                <span className="font-semibold text-slate-900">{data.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Terms:</span>
                <span className="font-semibold text-slate-900">Net 30</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4 pb-2 border-b border-slate-200">
              Bill To
            </h3>
            <div className="space-y-1">
              <p className="text-lg font-bold text-slate-900">{data.client.name}</p>
              <p className="text-slate-600">{data.client.address}</p>
              <p className="text-slate-600">{data.client.city}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <div className="bg-slate-900 text-white rounded-t-lg">
            <div className="grid grid-cols-12 gap-4 px-6 py-4">
              <div className="col-span-6 text-sm font-semibold uppercase tracking-wide">Description</div>
              <div className="col-span-2 text-center text-sm font-semibold uppercase tracking-wide">Qty</div>
              <div className="col-span-2 text-right text-sm font-semibold uppercase tracking-wide">Rate</div>
              <div className="col-span-2 text-right text-sm font-semibold uppercase tracking-wide">Amount</div>
            </div>
          </div>
          <div className="border-l border-r border-b border-slate-200 rounded-b-lg">
            {data.items.map((item, index) => (
              <div key={index} className={`grid grid-cols-12 gap-4 px-6 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="col-span-6">
                  <p className="font-semibold text-slate-900">{item.description}</p>
                </div>
                <div className="col-span-2 text-center text-slate-600">{item.quantity}</div>
                <div className="col-span-2 text-right text-slate-600">${item.rate.toFixed(2)}</div>
                <div className="col-span-2 text-right font-bold text-slate-900">${item.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="bg-slate-50 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">${data.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tax (10%)</span>
                  <span className="font-semibold text-slate-900">${data.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-900">Total Due</span>
                    <span className="text-2xl font-bold text-slate-900">${data.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="bg-slate-900 text-white rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-3">Payment Terms & Conditions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="mb-2">- Payment is due within 30 days of invoice date</p>
              <p className="mb-2">- Late payments subject to 1.5% monthly charge</p>
              <p>- All work performed is subject to our standard terms</p>
            </div>
            <div>
              <p className="mb-2">- Wire transfers preferred for international clients</p>
              <p className="mb-2">- Questions? Contact our accounting department</p>
              <p>- Thank you for choosing our professional services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
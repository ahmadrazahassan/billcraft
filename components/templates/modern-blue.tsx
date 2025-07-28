import { FileText, Phone, Mail, MapPin, Calendar } from 'lucide-react'

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
  notes?: string
  terms?: string
}

interface ModernBlueTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function ModernBlueTemplate({ data, isPreview = false }: ModernBlueTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{data.company.name}</h1>
            <p className="text-slate-600">{data.company.address}</p>
            <p className="text-slate-600">{data.company.city}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">INVOICE</h2>
          <div className="space-y-1">
            <p className="text-slate-600">Invoice #{data.invoiceNumber}</p>
            <p className="text-slate-600">Date: {data.date}</p>
            <p className="text-slate-600">Due: {data.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Company Contact Info */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-blue-600" />
            <span className="text-slate-700">{data.company.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <span className="text-slate-700">{data.company.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-slate-700">Est. 2024</span>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600">
          Bill To
        </h3>
        <div className="space-y-1">
          <p className="text-xl font-semibold text-slate-900">{data.client.name}</p>
          <p className="text-slate-600">{data.client.address}</p>
          <p className="text-slate-600">{data.client.city}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Description</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Qty</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Rate</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.items.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-900">{item.description}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{item.quantity}</td>
                  <td className="px-6 py-4 text-right text-slate-600">${item.rate.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-900">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-900">${data.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Tax</span>
              <span className="font-semibold text-slate-900">${data.tax.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-blue-600 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">${data.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 pt-6">
        <div className="text-center text-slate-600">
          <p className="mb-2">{data.notes || 'Thank you for your business!'}</p>
          <p className="text-sm">{data.terms || 'Payment is due within 30 days of invoice date.'}</p>
        </div>
      </div>
    </div>
  )
} 
import { FileText, Building, Phone, Mail } from 'lucide-react'

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

interface ClassicGreenTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function ClassicGreenTemplate({ data, isPreview = false }: ClassicGreenTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto border-2 border-slate-200">
      {/* Header */}
      <div className="border-b-4 border-green-600 pb-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
              <Building className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{data.company.name}</h1>
              <p className="text-green-600 font-semibold text-lg">BUSINESS SOLUTIONS</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-green-600 mb-2">INVOICE</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-bold text-lg">#{data.invoiceNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company & Invoice Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-green-600">
            FROM
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-slate-900 font-semibold">{data.company.name}</p>
                <p className="text-slate-600 text-sm">{data.company.address}</p>
                <p className="text-slate-600 text-sm">{data.company.city}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-600" />
              <p className="text-slate-900">{data.company.phone}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <p className="text-slate-900">{data.company.email}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-green-600">
            INVOICE DETAILS
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Invoice Date:</span>
                <span className="font-semibold text-slate-900">{data.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Due Date:</span>
                <span className="font-semibold text-green-600">{data.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Payment Terms:</span>
                <span className="font-semibold text-slate-900">Net 30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-green-600">
          BILL TO
        </h3>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <p className="text-xl font-bold text-slate-900 mb-2">{data.client.name}</p>
          <p className="text-slate-600">{data.client.address}</p>
          <p className="text-slate-600">{data.client.city}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-green-600">
          DESCRIPTION OF SERVICES
        </h3>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">DESCRIPTION</th>
                <th className="px-6 py-4 text-center font-bold">QTY</th>
                <th className="px-6 py-4 text-right font-bold">RATE</th>
                <th className="px-6 py-4 text-right font-bold">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className={`border-b border-slate-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{item.description}</p>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600">{item.quantity}</td>
                  <td className="px-6 py-4 text-right text-slate-600">${item.rate.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-96">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Subtotal</span>
                <span className="font-semibold text-slate-900">${data.subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Tax (10%)</span>
                <span className="font-semibold text-slate-900">${data.tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-green-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">TOTAL DUE</span>
                <span className="text-2xl font-bold text-white">${data.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-bold text-green-800 mb-3">PAYMENT INSTRUCTIONS</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-slate-700 mb-2"><strong>Bank Transfer:</strong></p>
            <p className="text-slate-600">Account: 1234567890</p>
            <p className="text-slate-600">Routing: 987654321</p>
            <p className="text-slate-600">Swift: ABCD1234</p>
          </div>
          <div>
            <p className="text-slate-700 mb-2"><strong>Terms:</strong></p>
            <p className="text-slate-600">- Payment due within 30 days</p>
            <p className="text-slate-600">- Late fees may apply</p>
            <p className="text-slate-600">- Thank you for your business!</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
import { Circle, Square, Triangle, Hexagon, Eye, Layers } from 'lucide-react'

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

interface MinimalGlassTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function MinimalGlassTemplate({ data, isPreview = false }: MinimalGlassTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-slate-100 to-gray-200 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Subtle Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-gray-100/30"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl"></div>

      {/* Floating Geometric Elements */}
      <div className="absolute top-20 right-32 w-8 h-8 border-2 border-gray-300/40 rounded-full"></div>
      <div className="absolute top-40 left-20 w-6 h-6 border-2 border-gray-400/30 transform rotate-45"></div>
      <div className="absolute bottom-32 right-20 w-10 h-10 border-2 border-gray-300/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>

      {/* Header */}
      <div className="relative z-10 mb-16">
        <div className="bg-white/70 backdrop-blur-2xl rounded-2xl p-10 border border-white/40 shadow-2xl shadow-black/5">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-20 h-20 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 flex items-center justify-center shadow-xl">
                  <Layers className="h-10 w-10 text-gray-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <Eye className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-wide">{data.company.name}</h1>
                <p className="text-gray-600 font-medium">Minimal Design Studio</p>
                <p className="text-gray-500 text-sm mt-2">{data.company.address}</p>
                <p className="text-gray-500 text-sm">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/60 backdrop-blur-xl rounded-xl p-6 border border-gray-200/40 shadow-lg">
                <h2 className="text-2xl font-light text-gray-800 mb-3 tracking-widest">INVOICE</h2>
                <div className="space-y-1 text-sm font-medium text-gray-600">
                  <p>#{data.invoiceNumber}</p>
                  <p>Date: {data.date}</p>
                  <p>Due: {data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Client */}
      <div className="relative z-10 mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
              <Circle className="h-5 w-5 mr-3 text-gray-500" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border border-gray-200/30">
                <span className="text-gray-600 font-medium text-sm">Phone:</span>
                <span className="text-gray-800 font-medium">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border border-gray-200/30">
                <span className="text-gray-600 font-medium text-sm">Email:</span>
                <span className="text-gray-800 font-medium">{data.company.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
              <Square className="h-5 w-5 mr-3 text-gray-500" />
              Bill To
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-light text-gray-800">{data.client.name}</p>
              <p className="text-gray-600 text-sm">{data.client.address}</p>
              <p className="text-gray-600 text-sm">{data.client.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/70 backdrop-blur-2xl rounded-xl border border-white/40 shadow-lg overflow-hidden">
          <div className="bg-white/50 backdrop-blur-sm p-6 border-b border-gray-200/30">
            <h3 className="text-xl font-medium text-gray-800 flex items-center">
              <Triangle className="h-6 w-6 mr-3 text-gray-600" />
              Services & Products
            </h3>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/30 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Qty</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Rate</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/30">
                {data.items.map((item, index) => (
                  <tr key={index} className="bg-white/20 hover:bg-white/30 transition-colors duration-200">
                    <td className="px-6 py-4 text-gray-800 font-medium">{item.description}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-800">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/70 backdrop-blur-2xl rounded-xl p-8 border border-white/40 shadow-lg">
          <div className="flex justify-end">
            <div className="w-80 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-300/30">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-lg font-medium text-gray-800">${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-300/30">
                <span className="text-gray-600 font-medium">Tax</span>
                <span className="text-lg font-medium text-gray-800">${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-white">Total Amount</span>
                  <span className="text-2xl font-light text-white">${data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-white/60 backdrop-blur-xl rounded-xl p-8 border border-white/30 shadow-lg text-center">
          <h4 className="text-xl font-medium text-gray-800 mb-4 flex items-center justify-center">
            <Hexagon className="h-5 w-5 mr-3" />
            Minimal Excellence
          </h4>
          <p className="text-gray-600 mb-6 text-lg font-light">
            {data.notes || 'Thank you for your business. Simplicity is the ultimate sophistication.'}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200/30">
              <p className="font-medium text-gray-800 mb-2 flex items-center justify-center">
                <Circle className="h-4 w-4 mr-2" />
                Payment Terms
              </p>
              <p className="text-gray-600 text-sm">{data.terms || 'Net 30 days'}</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200/30">
              <p className="font-medium text-gray-800 mb-2 flex items-center justify-center">
                <Square className="h-4 w-4 mr-2" />
                Support
              </p>
              <p className="text-gray-600 text-sm">Clean, simple support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

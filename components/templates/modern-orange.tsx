import { Zap, Circle, Triangle, Square } from 'lucide-react'

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

interface ModernOrangeTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function ModernOrangeTemplate({ data, isPreview = false }: ModernOrangeTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto relative">
      {/* Geometric Background Elements */}
      <div className="absolute top-0 right-0 text-orange-100">
        <Circle className="h-32 w-32 -translate-y-16 translate-x-16" />
      </div>
      <div className="absolute top-20 right-20 text-orange-200">
        <Triangle className="h-16 w-16" />
      </div>
      <div className="absolute bottom-0 left-0 text-orange-100">
        <Square className="h-24 w-24 -translate-y-12 -translate-x-12" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">{data.company.name}</h1>
            </div>
            <div className="ml-15 space-y-1 text-slate-600">
              <p>{data.company.address}</p>
              <p>{data.company.city}</p>
              <p className="font-semibold text-orange-600">{data.company.phone}</p>
              <p className="font-semibold text-orange-600">{data.company.email}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-orange-500 text-white rounded-2xl p-6 transform -rotate-2">
              <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
              <p className="text-orange-100">#{data.invoiceNumber}</p>
            </div>
            <div className="mt-4 space-y-1 text-sm text-slate-600">
              <p>Date: {data.date}</p>
              <p>Due: {data.dueDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="relative z-10 mb-10">
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
            <div className="w-6 h-6 bg-orange-500 rounded-full mr-3"></div>
            Billed To
          </h3>
          <div className="ml-9">
            <p className="text-xl font-bold text-slate-900 mb-1">{data.client.name}</p>
            <p className="text-slate-600">{data.client.address}</p>
            <p className="text-slate-600">{data.client.city}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="relative z-10 mb-10">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
            <Zap className="h-4 w-4 text-white" />
          </div>
          Project Details
        </h3>
        
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div key={index} className="group">
              <div className="bg-white border-2 border-slate-100 hover:border-orange-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        index % 3 === 0 ? 'bg-orange-500' : 
                        index % 3 === 1 ? 'bg-orange-400' : 'bg-orange-300'
                      }`}></div>
                      <h4 className="text-lg font-semibold text-slate-900">{item.description}</h4>
                    </div>
                    <div className="ml-6 flex items-center space-x-6 text-sm">
                      <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-slate-600">
                        Rate: ${item.rate.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-500">${item.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="relative z-10 mb-10">
        <div className="flex justify-end">
          <div className="w-80">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">${data.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tax</span>
                  <span className="font-semibold text-slate-900">${data.tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-orange-500 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-900">Total</span>
                    <span className="text-3xl font-bold text-orange-500">${data.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-slate-900 text-white rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold mb-2">Thank You!</h4>
            <p className="text-slate-300">We appreciate your business and look forward to working with you again.</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-semibold">Payment Terms: Net 30</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span className="text-sm font-semibold">Questions? Get in touch!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
import { Palette, Zap, Camera } from 'lucide-react'

interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  currency: string
  company: {
    name: string
    address: string
    city: string
    phone: string
    email: string
    website?: string
    logo?: string
  }
  client: {
    name: string
    address: string
    city: string
    email: string
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

// Currency symbol helper
const getCurrencySymbol = (currencyCode: string): string => {
  const currencyMap: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'PKR': '₨',
    'INR': '₹',
  }
  return currencyMap[currencyCode] || '$'
}

interface CreativePurpleTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function CreativePurpleTemplate({ data, isPreview = false }: CreativePurpleTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 border-4 border-purple-200 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-100 rounded-full -translate-y-12 -translate-x-12"></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 flex items-center justify-center transform rotate-12 overflow-hidden">
                {data.company.logo ? (
                  <img 
                    src={data.company.logo} 
                    alt={`${data.company.name} logo`}
                    className="w-full h-full object-contain"
                    style={{ maxWidth: '100%', maxHeight: '100%', backgroundColor: 'transparent' }}
                  />
                ) : (
                  <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center">
                    <Palette className="h-10 w-10 text-white" />
                  </div>
                )}
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{data.company.name}</h1>
              <p className="text-purple-600 font-semibold">Creative Studio</p>
              <p className="text-slate-600 text-sm mt-1">Bringing ideas to life</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-purple-600 mb-3">INVOICE</h2>
              <div className="space-y-1 text-sm">
                <p className="text-slate-900 font-semibold">#{data.invoiceNumber}</p>
                <p className="text-slate-600">Issued: {data.date}</p>
                <p className="text-slate-600">Due: {data.dueDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-10">
        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                <Zap className="h-5 w-5 text-purple-600 mr-2" />
                Get In Touch
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">{data.company.address}</p>
                <p className="text-slate-600">{data.company.city}</p>
                <p className="text-purple-600 font-semibold">{data.company.phone}</p>
                <p className="text-purple-600 font-semibold">{data.company.email}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                <Camera className="h-5 w-5 text-purple-600 mr-2" />
                Bill To
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-lg font-bold text-slate-900">{data.client.name}</p>
                <p className="text-slate-600">{data.client.address}</p>
                <p className="text-slate-600">{data.client.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          Creative Services
        </h3>
        
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div key={index} className="bg-white border-2 border-purple-100 rounded-2xl p-6 hover:border-purple-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.description}</h4>
                  <div className="flex items-center space-x-6 text-sm text-slate-600">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                      Qty: {item.quantity}
                    </span>
                    <span>Rate: {currencySymbol}{item.rate.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">{currencySymbol}{item.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="mb-10">
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <div className="flex justify-end">
            <div className="w-80 space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900">{currencySymbol}{data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">Tax</span>
                <span className="font-semibold text-slate-900">{currencySymbol}{data.tax.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-purple-600 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-slate-900">Total Amount</span>
                  <span className="text-3xl font-bold text-purple-600">{currencySymbol}{data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center bg-purple-600 text-white rounded-2xl p-6">
        <h4 className="text-xl font-bold mb-2">Thank You for Choosing Us!</h4>
        <p className="text-purple-100 mb-4">Your creative vision is our inspiration</p>
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div>
            <p className="font-semibold">Payment Terms</p>
            <p className="text-purple-200">Net 30 days</p>
          </div>
          <div>
            <p className="font-semibold">Questions?</p>
            <p className="text-purple-200">Let's chat!</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
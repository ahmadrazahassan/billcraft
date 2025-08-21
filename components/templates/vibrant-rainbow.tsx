import { Palette, Sparkles, Rainbow, Sun, Star, Zap, Phone, Mail } from 'lucide-react'

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

interface VibrantRainbowTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function VibrantRainbowTemplate({ data, isPreview = false }: VibrantRainbowTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-red-50 via-yellow-50 via-green-50 via-blue-50 via-indigo-50 to-purple-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Rainbow Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-300/20 via-yellow-300/20 to-green-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-300/20 via-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-pink-300/15 to-orange-300/15 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Floating Rainbow Elements */}
      <div className="absolute top-20 left-20 w-8 h-8 bg-red-400 rounded-full animate-bounce"></div>
      <div className="absolute top-32 right-32 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-32 w-10 h-10 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-20 w-7 h-7 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-transparent bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200 shadow-2xl">
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <Rainbow className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-spin">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-600 via-green-600 via-blue-600 to-purple-600 mb-2 animate-pulse">
                    {data.company.name}
                  </h1>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 font-bold text-lg">Colorful Creations</p>
                  <p className="text-slate-600 font-medium">{data.company.address}</p>
                  <p className="text-slate-600 font-medium">{data.company.city}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-2xl p-6 text-white shadow-2xl">
                  <h2 className="text-3xl font-black mb-3">INVOICE</h2>
                  <div className="space-y-1 text-sm font-bold bg-white/20 rounded-xl p-3">
                    <p className="flex items-center"><Star className="h-4 w-4 mr-2" />#{data.invoiceNumber}</p>
                    <p>Date: {data.date}</p>
                    <p>Due: {data.dueDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Client */}
      <div className="relative z-10 mb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 border-2 border-transparent bg-gradient-to-r from-red-200 to-orange-200 shadow-lg">
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4 flex items-center">
                <Sun className="h-6 w-6 mr-3 text-orange-500" />
                Rainbow Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 font-bold">{data.company.phone}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 font-bold">{data.company.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 border-2 border-transparent bg-gradient-to-r from-blue-200 to-purple-200 shadow-lg">
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 flex items-center">
                <Palette className="h-6 w-6 mr-3 text-purple-500" />
                Colorful Client
              </h3>
              <div className="space-y-2">
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  {data.client.name}
                </p>
                <p className="text-slate-600 font-semibold">{data.client.address}</p>
                <p className="text-slate-600 font-semibold">{data.client.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl border-2 border-transparent bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200 shadow-2xl overflow-hidden">
          <div className="bg-white m-1 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 p-6">
              <h3 className="text-2xl font-black text-white flex items-center">
                <Zap className="h-7 w-7 mr-3" />
                Spectrum of Services
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {data.items.map((item, index) => {
                  const colors = [
                    'from-red-50 to-orange-50 border-red-200',
                    'from-yellow-50 to-green-50 border-yellow-200', 
                    'from-green-50 to-blue-50 border-green-200',
                    'from-blue-50 to-indigo-50 border-blue-200',
                    'from-indigo-50 to-purple-50 border-indigo-200',
                    'from-purple-50 to-pink-50 border-purple-200'
                  ]
                  const colorClass = colors[index % colors.length]
                  
                  return (
                    <div key={index} className={`bg-gradient-to-r ${colorClass} rounded-xl p-4 border-2 hover:scale-102 transition-all duration-300 transform`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-2 ${index % 6 === 0 ? 'bg-red-400' : index % 6 === 1 ? 'bg-yellow-400' : index % 6 === 2 ? 'bg-green-400' : index % 6 === 3 ? 'bg-blue-400' : index % 6 === 4 ? 'bg-indigo-400' : 'bg-purple-400'}`}></div>
                            {item.description}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white px-3 py-1 rounded-full font-black">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-slate-600 font-bold bg-white px-3 py-1 rounded-full border border-slate-200">
                              Rate: ${item.rate.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-600 via-green-600 via-blue-600 to-purple-600">
                            ${item.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border-2 border-transparent bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200 shadow-2xl">
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-end">
              <div className="w-96 space-y-4">
                <div className="flex justify-between items-center py-3 border-b-2 border-red-200">
                  <span className="text-slate-600 font-bold">Subtotal</span>
                  <span className="text-xl font-black text-slate-900">${data.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-blue-200">
                  <span className="text-slate-600 font-bold">Tax</span>
                  <span className="text-xl font-black text-slate-900">${data.tax.toFixed(2)}</span>
                </div>
                <div className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-xl p-4 shadow-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-white">Total Amount</span>
                    <span className="text-3xl font-black text-white">${data.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-red-600 via-yellow-600 via-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h4 className="text-2xl font-black mb-4 flex items-center justify-center">
            <Rainbow className="h-6 w-6 mr-3" />
            Bringing Color to Your World
          </h4>
          <p className="text-red-100 mb-6 text-lg font-medium">
            {data.notes || 'Thank you for adding color to our world! Every project is a new adventure in creativity.'}
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <p className="font-black mb-2 flex items-center justify-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Payment Terms
              </p>
              <p className="text-red-100 font-medium">{data.terms || 'Payment due within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <p className="font-black mb-2 flex items-center justify-center">
                <Sun className="h-4 w-4 mr-2" />
                Bright Support
              </p>
              <p className="text-red-100 font-medium">Colorful support always</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Leaf, TreePine, Flower2, Mountain, Sun, Recycle, Phone, Mail } from 'lucide-react'

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

interface ForestGreenTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function ForestGreenTemplate({ data, isPreview = false }: ForestGreenTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Nature Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-200/20 to-emerald-200/20 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-200/20 to-green-200/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

      {/* Decorative Forest Elements */}
      <div className="absolute top-16 left-20 w-12 h-12 text-green-300/30">
        <TreePine className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-32 w-10 h-10 text-emerald-300/40">
        <Flower2 className="w-full h-full" />
      </div>
      <div className="absolute top-32 right-16 w-8 h-8 text-teal-300/30">
        <Leaf className="w-full h-full animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-green-200/50 shadow-2xl shadow-green-500/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30">
                  <TreePine className="h-14 w-14 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sun className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-3">
                  {data.company.name}
                </h1>
                <p className="text-green-600 font-semibold text-lg">Eco-Friendly Solutions</p>
                <p className="text-slate-600 italic">{data.company.address}</p>
                <p className="text-slate-600 italic">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 text-white shadow-2xl shadow-green-500/30">
                <h2 className="text-4xl font-bold mb-4">INVOICE</h2>
                <div className="space-y-2 text-sm font-medium bg-white/20 rounded-xl p-4">
                  <p className="flex items-center"><Leaf className="h-4 w-4 mr-2" />#{data.invoiceNumber}</p>
                  <p className="flex items-center"><Mountain className="h-4 w-4 mr-2" />{data.date}</p>
                  <p className="flex items-center"><Flower2 className="h-4 w-4 mr-2" />{data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Client */}
      <div className="relative z-10 mb-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 shadow-xl">
            <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
              <Mountain className="h-7 w-7 mr-3" />
              Contact Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{data.company.email}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-xl">
                <Recycle className="w-5 h-5 text-teal-500" />
                <span className="text-slate-700 font-medium">100% Sustainable</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50 shadow-xl">
            <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center">
              <Flower2 className="h-7 w-7 mr-3" />
              Growing Together
            </h3>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                {data.client.name}
              </p>
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-slate-600 font-medium">{data.client.address}</p>
                <p className="text-slate-600 font-medium">{data.client.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl border-2 border-green-200/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8">
            <h3 className="text-3xl font-bold text-white flex items-center">
              <TreePine className="h-8 w-8 mr-4" />
              Sustainable Services
            </h3>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200/30 hover:border-emerald-300/50 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                        <Leaf className="h-5 w-5 text-green-500 mr-2" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-6">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                          Quantity: {item.quantity}
                        </span>
                        <span className="text-slate-600 font-semibold bg-white px-4 py-2 rounded-full border border-green-200">
                          Rate: ${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                        ${item.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 border-2 border-emerald-200/50 shadow-2xl">
          <div className="flex justify-end">
            <div className="w-full max-w-lg space-y-6">
              <div className="flex justify-between items-center py-4 border-b-2 border-green-200">
                <span className="text-lg text-slate-600 font-semibold">Subtotal</span>
                <span className="text-2xl font-bold text-slate-900">${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b-2 border-emerald-200">
                <span className="text-lg text-slate-600 font-semibold">Tax</span>
                <span className="text-2xl font-bold text-slate-900">${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white flex items-center">
                    <TreePine className="h-6 w-6 mr-2" />
                    Total Amount
                  </span>
                  <span className="text-4xl font-bold text-white">
                    ${data.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white text-center shadow-2xl">
          <h4 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Leaf className="h-8 w-8 mr-3" />
            Growing a Better Future
          </h4>
          <p className="text-green-100 mb-8 text-xl">
            {data.notes || 'Thank you for choosing sustainable solutions. Together, we\'re making a difference.'}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="font-bold mb-2 text-xl flex items-center justify-center">
                <Mountain className="h-5 w-5 mr-2" />
                Payment Terms
              </p>
              <p className="text-green-100 text-lg">{data.terms || 'Payment within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="font-bold mb-2 text-xl flex items-center justify-center">
                <Recycle className="h-5 w-5 mr-2" />
                Eco-Support
              </p>
              <p className="text-green-100 text-lg">Sustainable support 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

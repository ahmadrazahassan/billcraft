import { Crown, Heart, Diamond, Star, Flower, Gift, Phone, Mail } from 'lucide-react'

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

interface ElegantRoseGoldTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function ElegantRoseGoldTemplate({ data, isPreview = false }: ElegantRoseGoldTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Elegant Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-200/20 to-amber-200/20 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-rose-200/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

      {/* Decorative Border */}
      <div className="absolute inset-4 border-2 border-rose-300/30 rounded-3xl pointer-events-none"></div>
      <div className="absolute inset-6 border border-amber-300/20 rounded-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-rose-200/50 shadow-2xl shadow-rose-500/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-rose-400 via-pink-400 to-amber-400 rounded-full flex items-center justify-center shadow-2xl shadow-rose-500/30">
                  <Crown className="h-14 w-14 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                  <Diamond className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 mb-3">
                  {data.company.name}
                </h1>
                <p className="text-rose-600 font-semibold text-lg">Luxury Services</p>
                <p className="text-slate-600 italic">{data.company.address}</p>
                <p className="text-slate-600 italic">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-8 text-white shadow-2xl shadow-rose-500/30">
                <h2 className="text-4xl font-bold mb-4 tracking-wider">INVOICE</h2>
                <div className="space-y-2 text-sm font-medium bg-white/20 rounded-xl p-4">
                  <p className="flex items-center"><Star className="h-4 w-4 mr-2" />#{data.invoiceNumber}</p>
                  <p className="flex items-center"><Flower className="h-4 w-4 mr-2" />{data.date}</p>
                  <p className="flex items-center"><Heart className="h-4 w-4 mr-2" />{data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative z-10 mb-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-200/50 shadow-xl">
            <h3 className="text-2xl font-bold text-rose-700 mb-6 flex items-center">
              <Gift className="h-7 w-7 mr-3" />
              Contact Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-rose-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-amber-400 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{data.company.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-xl">
            <h3 className="text-2xl font-bold text-amber-700 mb-6 flex items-center">
              <Heart className="h-7 w-7 mr-3" />
              Billed To
            </h3>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600">
                {data.client.name}
              </p>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-slate-600 font-medium">{data.client.address}</p>
                <p className="text-slate-600 font-medium">{data.client.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-8">
            <h3 className="text-3xl font-bold text-white flex items-center">
              <Diamond className="h-8 w-8 mr-4" />
              Premium Services
            </h3>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 rounded-2xl p-6 border-2 border-rose-200/30 hover:border-rose-300/50 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                        <Star className="h-5 w-5 text-rose-500 mr-2" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-6">
                        <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                          Quantity: {item.quantity}
                        </span>
                        <span className="text-slate-600 font-semibold bg-white px-4 py-2 rounded-full border border-rose-200">
                          Rate: ${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600">
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

      {/* Totals Section */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border-2 border-amber-200/50 shadow-2xl">
          <div className="flex justify-end">
            <div className="w-full max-w-lg space-y-6">
              <div className="flex justify-between items-center py-4 border-b-2 border-rose-200">
                <span className="text-lg text-slate-600 font-semibold">Subtotal</span>
                <span className="text-2xl font-bold text-slate-900">${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b-2 border-pink-200">
                <span className="text-lg text-slate-600 font-semibold">Tax</span>
                <span className="text-2xl font-bold text-slate-900">${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white flex items-center">
                    <Crown className="h-6 w-6 mr-2" />
                    Total Amount
                  </span>
                  <span className="text-4xl font-black text-white">
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
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 rounded-3xl p-8 text-white text-center shadow-2xl">
          <h4 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Heart className="h-8 w-8 mr-3" />
            With Gratitude & Elegance
          </h4>
          <p className="text-rose-100 mb-8 text-xl">
            {data.notes || 'Thank you for choosing our premium services. Your trust means everything to us.'}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="font-bold mb-2 text-xl flex items-center justify-center">
                <Diamond className="h-5 w-5 mr-2" />
                Payment Terms
              </p>
              <p className="text-rose-100 text-lg">{data.terms || 'Payment requested within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="font-bold mb-2 text-xl flex items-center justify-center">
                <Gift className="h-5 w-5 mr-2" />
                Questions?
              </p>
              <p className="text-rose-100 text-lg">We're here to assist you always</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

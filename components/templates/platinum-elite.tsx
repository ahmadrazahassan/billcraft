import { Crown, Award, Diamond, Star, Trophy, Medal, Phone, Mail } from 'lucide-react'

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

interface PlatinumEliteTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function PlatinumEliteTemplate({ data, isPreview = false }: PlatinumEliteTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-zinc-50 to-stone-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Platinum Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-slate-300/20 to-zinc-300/20 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-stone-300/20 to-slate-300/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

      {/* Elegant Border Frame */}
      <div className="absolute inset-4 border-4 border-slate-300/30 rounded-3xl pointer-events-none shadow-inner"></div>
      <div className="absolute inset-6 border-2 border-zinc-300/20 rounded-2xl pointer-events-none"></div>
      <div className="absolute inset-8 border border-stone-300/15 rounded-xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 border-2 border-slate-200/50 shadow-2xl shadow-slate-500/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-slate-600 via-zinc-600 to-stone-600 rounded-full flex items-center justify-center shadow-2xl shadow-slate-500/40">
                  <Crown className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-xl">
                  <Diamond className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-zinc-700 to-stone-700 mb-4">
                  {data.company.name}
                </h1>
                <p className="text-slate-600 font-bold text-xl">Platinum Elite Services</p>
                <p className="text-slate-500 italic text-lg">{data.company.address}</p>
                <p className="text-slate-500 italic text-lg">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-slate-600 via-zinc-600 to-stone-600 rounded-3xl p-8 text-white shadow-2xl shadow-slate-500/40">
                <h2 className="text-4xl font-black mb-4 tracking-widest">INVOICE</h2>
                <div className="space-y-3 text-base font-bold bg-white/20 rounded-2xl p-5">
                  <p className="flex items-center"><Crown className="h-5 w-5 mr-2" />#{data.invoiceNumber}</p>
                  <p className="flex items-center"><Award className="h-5 w-5 mr-2" />{data.date}</p>
                  <p className="flex items-center"><Trophy className="h-5 w-5 mr-2" />{data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative z-10 mb-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <h3 className="text-3xl font-black text-slate-700 mb-8 flex items-center">
              <Medal className="h-8 w-8 mr-4" />
              Elite Contact
            </h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-zinc-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-700 font-bold text-lg">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                <div className="w-12 h-12 bg-gradient-to-br from-zinc-500 to-stone-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-700 font-bold text-lg">{data.company.email}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <span className="text-slate-700 font-bold">Premium Elite Status</span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-zinc-200/50 shadow-xl">
            <h3 className="text-3xl font-black text-zinc-700 mb-8 flex items-center">
              <Star className="h-8 w-8 mr-4" />
              Distinguished Client
            </h3>
            <div className="space-y-4">
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-stone-700">
                {data.client.name}
              </p>
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
                <p className="text-slate-600 font-bold text-lg">{data.client.address}</p>
                <p className="text-slate-600 font-bold text-lg">{data.client.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-600 via-zinc-600 to-stone-600 p-10">
            <h3 className="text-4xl font-black text-white flex items-center">
              <Diamond className="h-10 w-10 mr-5" />
              Platinum Services
            </h3>
          </div>
          
          <div className="p-10">
            <div className="space-y-8">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-slate-50 via-zinc-50 to-stone-50 rounded-3xl p-8 border-2 border-slate-200/40 hover:border-zinc-300/60 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-2xl font-black text-slate-900 mb-4 flex items-center">
                        <Award className="h-6 w-6 text-slate-600 mr-3" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-8">
                        <span className="bg-gradient-to-r from-slate-600 to-zinc-600 text-white px-6 py-3 rounded-2xl font-black text-lg">
                          Quantity: {item.quantity}
                        </span>
                        <span className="text-slate-600 font-black bg-white px-6 py-3 rounded-2xl border-2 border-slate-200 text-lg">
                          Rate: ${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-zinc-700 to-stone-700">
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
      <div className="relative z-10 mb-12">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 border-2 border-zinc-200/50 shadow-2xl">
          <div className="flex justify-end">
            <div className="w-full max-w-2xl space-y-8">
              <div className="flex justify-between items-center py-6 border-b-2 border-slate-300">
                <span className="text-2xl text-slate-600 font-black">Subtotal</span>
                <span className="text-3xl font-black text-slate-900">${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-6 border-b-2 border-zinc-300">
                <span className="text-2xl text-slate-600 font-black">Tax</span>
                <span className="text-3xl font-black text-slate-900">${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-slate-600 via-zinc-600 to-stone-600 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-white flex items-center">
                    <Crown className="h-8 w-8 mr-3" />
                    Total Amount
                  </span>
                  <span className="text-5xl font-black text-white">
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
        <div className="bg-gradient-to-r from-slate-700 via-zinc-700 to-stone-700 rounded-3xl p-10 text-white text-center shadow-2xl">
          <h4 className="text-4xl font-black mb-6 flex items-center justify-center">
            <Trophy className="h-10 w-10 mr-4" />
            Platinum Excellence
          </h4>
          <p className="text-slate-200 mb-10 text-2xl font-medium">
            {data.notes || 'Thank you for choosing our platinum elite services. Excellence is our standard.'}
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
              <p className="font-black mb-3 text-2xl flex items-center justify-center">
                <Diamond className="h-6 w-6 mr-3" />
                Payment Terms
              </p>
              <p className="text-slate-200 text-xl font-medium">{data.terms || 'Payment within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
              <p className="font-black mb-3 text-2xl flex items-center justify-center">
                <Medal className="h-6 w-6 mr-3" />
                Elite Support
              </p>
              <p className="text-slate-200 text-xl font-medium">24/7 Platinum Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Crown, Star, Diamond, Trophy, Medal, Gift, Phone, Mail } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface GoldenLuxuryTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function GoldenLuxuryTemplate({ data, isPreview = false }: GoldenLuxuryTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Golden Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>

      {/* Luxury Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, gold 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, gold 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Luxury Elements */}
      <div className="absolute top-16 right-24 w-6 h-6 text-yellow-400/60">
        <Star className="w-full h-full animate-pulse" />
      </div>
      <div className="absolute bottom-24 left-20 w-8 h-8 text-amber-400/50">
        <Diamond className="w-full h-full animate-bounce" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-gradient-to-br from-white via-yellow-50 to-amber-50 backdrop-blur-2xl rounded-3xl p-10 border-2 border-yellow-300/30 shadow-2xl shadow-yellow-500/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/40">
                  <Crown className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                  <Diamond className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 mb-4">
                  {data.company.name}
                </h1>
                <p className="text-yellow-700 font-bold text-2xl">Luxury Services</p>
                <p className="text-amber-600 italic text-lg">{data.company.address}</p>
                <p className="text-amber-600 italic text-lg">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl shadow-yellow-500/40">
                <h2 className="text-5xl font-black mb-4 tracking-wider">INVOICE</h2>
                <div className="space-y-3 text-lg font-bold bg-white/20 rounded-2xl p-5">
                  <p className="flex items-center"><Crown className="h-6 w-6 mr-3" />#{data.invoiceNumber}</p>
                  <p className="flex items-center"><Star className="h-6 w-6 mr-3" />{data.date}</p>
                  <p className="flex items-center"><Trophy className="h-6 w-6 mr-3" />{data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative z-10 mb-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gradient-to-br from-white to-yellow-50 backdrop-blur-xl rounded-3xl p-8 border-2 border-yellow-300/40 shadow-xl">
            <h3 className="text-3xl font-black text-yellow-700 mb-8 flex items-center">
              <Gift className="h-8 w-8 mr-4" />
              Golden Contact
            </h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="text-yellow-800 font-bold text-xl">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="text-amber-800 font-bold text-xl">{data.company.email}</span>
              </div>
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                <Medal className="w-8 h-8 text-orange-600" />
                <span className="text-orange-800 font-bold text-lg">Premium Gold Status</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-amber-50 backdrop-blur-xl rounded-3xl p-8 border-2 border-amber-300/40 shadow-xl">
            <h3 className="text-3xl font-black text-amber-700 mb-8 flex items-center">
              <Trophy className="h-8 w-8 mr-4" />
              Esteemed Client
            </h3>
            <div className="space-y-4">
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-orange-700">
                {data.client.name}
              </p>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
                <p className="text-amber-700 font-bold text-xl">{data.client.address}</p>
                <p className="text-amber-700 font-bold text-xl">{data.client.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative z-10 mb-12">
        <div className="bg-gradient-to-br from-white to-yellow-50 backdrop-blur-2xl rounded-3xl border-4 border-yellow-300/40 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 p-10">
            <h3 className="text-4xl font-black text-white flex items-center">
              <Diamond className="h-10 w-10 mr-5" />
              Luxury Services Portfolio
            </h3>
          </div>
          
          <div className="p-10">
            <div className="space-y-8">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-yellow-300/40 hover:border-amber-400/60 transition-all duration-300 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-2xl font-black text-yellow-900 mb-4 flex items-center">
                        <Star className="h-7 w-7 text-yellow-600 mr-3" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-8">
                        <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-2xl font-black text-lg">
                          Quantity: {item.quantity}
                        </span>
                        <span className="text-amber-700 font-black bg-white px-6 py-3 rounded-2xl border-3 border-amber-200 text-lg">
                          Rate: {currencySymbol}${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 via-amber-700 to-orange-700">
                        {currencySymbol}${item.amount.toFixed(2)}
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
        <div className="bg-gradient-to-br from-white to-amber-50 backdrop-blur-2xl rounded-3xl p-10 border-2 border-amber-300/40 shadow-2xl">
          <div className="flex justify-end">
            <div className="w-full max-w-2xl space-y-8">
              <div className="flex justify-between items-center py-6 border-b-2 border-yellow-300">
                <span className="text-3xl text-yellow-700 font-black">Subtotal</span>
                <span className="text-4xl font-black text-yellow-900">{currencySymbol}${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-6 border-b-2 border-amber-300">
                <span className="text-3xl text-amber-700 font-black">Tax</span>
                <span className="text-4xl font-black text-amber-900">{currencySymbol}${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-white flex items-center">
                    <Crown className="h-8 w-8 mr-3" />
                    Total Amount
                  </span>
                  <span className="text-6xl font-black text-white">
                    {currencySymbol}${data.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl p-10 text-white text-center shadow-2xl">
          <h4 className="text-4xl font-black mb-6 flex items-center justify-center">
            <Trophy className="h-10 w-10 mr-4" />
            Luxury Redefined
          </h4>
          <p className="text-yellow-100 mb-10 text-2xl font-medium">
            {data.notes || 'Thank you for choosing our luxury services. Excellence is our legacy, your satisfaction is our crown jewel.'}
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/40">
              <p className="font-black mb-3 text-2xl flex items-center justify-center">
                <Diamond className="h-7 w-7 mr-3" />
                Payment Terms
              </p>
              <p className="text-yellow-100 text-xl font-medium">{data.terms || 'Payment within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/40">
              <p className="font-black mb-3 text-2xl flex items-center justify-center">
                <Crown className="h-7 w-7 mr-3" />
                Royal Support
              </p>
              <p className="text-yellow-100 text-xl font-medium">24/7 Luxury Concierge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

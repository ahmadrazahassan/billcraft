import { Palette, Sparkles, Camera, Brush, Zap, Heart, Phone, Mail } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface CoralModernTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function CoralModernTemplate({ data, isPreview = false }: CoralModernTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Modern Coral Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-red-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-300/15 to-red-300/15 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/85 backdrop-blur-lg rounded-3xl p-8 border border-orange-200/50 shadow-2xl shadow-orange-500/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 flex items-center justify-center shadow-2xl shadow-orange-500/30 transform rotate-3">
                  {data.company.logo ? (
                    <img 
                      src={data.company.logo} 
                      alt={`${data.company.name} logo`}
                      className="w-full h-full object-contain"
                      style={{ maxWidth: '100%', maxHeight: '100%', backgroundColor: 'transparent' }}
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Palette className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-2">
                  {data.company.name}
                </h1>
                <p className="text-orange-600 font-bold text-lg">Creative Studio</p>
                <p className="text-slate-600 font-medium">{data.company.address}</p>
                <p className="text-slate-600 font-medium">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-2xl transform -rotate-1">
                <h2 className="text-3xl font-black mb-3">INVOICE</h2>
                <div className="space-y-1 text-sm font-bold bg-white/20 rounded-xl p-3">
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
      <div className="relative z-10 mb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/50 shadow-lg transform rotate-1">
            <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
              <Camera className="h-6 w-6 mr-3" />
              Studio Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-bold">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-bold">{data.company.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg transform -rotate-1">
            <h3 className="text-xl font-bold text-pink-700 mb-4 flex items-center">
              <Brush className="h-6 w-6 mr-3" />
              Creative Partner
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
                {data.client.name}
              </p>
              <p className="text-slate-600 font-semibold">{data.client.address}</p>
              <p className="text-slate-600 font-semibold">{data.client.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-orange-200/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6">
            <h3 className="text-2xl font-black text-white flex items-center">
              <Zap className="h-7 w-7 mr-3" />
              Creative Services
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-xl p-4 border border-orange-200/30 hover:border-red-300/50 transition-all duration-300 transform hover:scale-102">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                        <Heart className="h-5 w-5 text-red-500 mr-2" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full font-black">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-slate-600 font-bold bg-white px-3 py-1 rounded-full border border-orange-200">
                          Rate: {currencySymbol}${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
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

      {/* Totals */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-red-200/50 shadow-2xl transform rotate-1">
          <div className="flex justify-end">
            <div className="w-96 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-orange-200">
                <span className="text-slate-600 font-bold">Subtotal</span>
                <span className="text-xl font-black text-slate-900">{currencySymbol}${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-red-200">
                <span className="text-slate-600 font-bold">Tax</span>
                <span className="text-xl font-black text-slate-900">{currencySymbol}${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl p-4 shadow-lg transform -rotate-1">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-white">Total Amount</span>
                  <span className="text-3xl font-black text-white">{currencySymbol}${data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h4 className="text-2xl font-black mb-4 flex items-center justify-center">
            <Sparkles className="h-6 w-6 mr-3" />
            Creative Excellence Delivered
          </h4>
          <p className="text-orange-100 mb-6 text-lg font-medium">
            {data.notes || 'Thank you for trusting us with your creative vision. Let\'s make magic together!'}
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 transform rotate-1">
              <p className="font-black mb-2 flex items-center justify-center">
                <Camera className="h-4 w-4 mr-2" />
                Payment Terms
              </p>
              <p className="text-orange-100 font-medium">{data.terms || 'Payment due within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 transform -rotate-1">
              <p className="font-black mb-2 flex items-center justify-center">
                <Brush className="h-4 w-4 mr-2" />
                Creative Support
              </p>
              <p className="text-orange-100 font-medium">Always here to inspire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

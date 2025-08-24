import { Sun, Calendar, Phone, Mail, MapPin, Star, Sparkles } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface GradientSunsetTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function GradientSunsetTemplate({ data, isPreview = false }: GradientSunsetTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/30 to-pink-200/30 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
                  <Sun className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {data.company.name}
                </h1>
                <p className="text-slate-600 font-semibold">{data.company.address}</p>
                <p className="text-slate-600">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
                <h2 className="text-3xl font-black mb-3">INVOICE</h2>
                <div className="space-y-1 text-sm font-medium">
                  <p>#{data.invoiceNumber}</p>
                  <p>Date: {data.date}</p>
                  <p>Due: {data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Bill To */}
      <div className="relative z-10 mb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Phone className="h-6 w-6 text-orange-500 mr-3" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-slate-700 font-medium">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pink-500" />
                <span className="text-slate-700 font-medium">{data.company.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-purple-500" />
                <span className="text-slate-700 font-medium">Professional Services</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Calendar className="h-6 w-6 text-pink-500 mr-3" />
              Bill To
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                {data.client.name}
              </p>
              <p className="text-slate-600 font-medium">{data.client.address}</p>
              <p className="text-slate-600 font-medium">{data.client.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Star className="h-7 w-7 mr-3" />
              Services & Products
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.description}</h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-slate-600 font-medium">Rate: {currencySymbol}${item.rate.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
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
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
          <div className="flex justify-end">
            <div className="w-96 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-orange-200">
                <span className="text-slate-600 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-slate-900">{currencySymbol}${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-orange-200">
                <span className="text-slate-600 font-medium">Tax</span>
                <span className="text-xl font-bold text-slate-900">{currencySymbol}${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total Amount</span>
                  <span className="text-3xl font-black text-white">{currencySymbol}${data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl p-8 text-white text-center shadow-xl">
          <h4 className="text-2xl font-bold mb-3 flex items-center justify-center">
            <Star className="h-6 w-6 mr-2" />
            Thank You for Your Business!
          </h4>
          <p className="text-orange-100 mb-6 text-lg">
            {data.notes || 'We appreciate your trust in our services and look forward to working with you again.'}
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="font-bold mb-1">Payment Terms</p>
              <p className="text-orange-100">{data.terms || 'Payment due within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="font-bold mb-1">Questions?</p>
              <p className="text-orange-100">Contact us anytime!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

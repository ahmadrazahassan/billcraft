import { Waves, Anchor, Compass, Ship, Fish, Shell, Phone, Mail } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface OceanWaveTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function OceanWaveTemplate({ data, isPreview = false }: OceanWaveTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Ocean Wave Background */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 w-full h-32 text-blue-200/30" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
        <svg className="absolute top-0 w-full h-32 text-cyan-200/20 transform rotate-180" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-16 h-16 text-blue-300/40">
        <Shell className="w-full h-full animate-pulse" />
      </div>
      <div className="absolute bottom-32 left-16 w-12 h-12 text-teal-300/40">
        <Fish className="w-full h-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-blue-200/50 shadow-2xl shadow-blue-500/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <Waves className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                  <Anchor className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 mb-2">
                  {data.company.name}
                </h1>
                <p className="text-blue-600 font-semibold text-lg">Ocean Services</p>
                <p className="text-slate-600">{data.company.address}</p>
                <p className="text-slate-600">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl p-6 text-white shadow-2xl">
                <h2 className="text-3xl font-bold mb-3">INVOICE</h2>
                <div className="space-y-1 text-sm font-medium bg-white/20 rounded-xl p-3">
                  <p className="flex items-center"><Compass className="h-4 w-4 mr-2" />#{data.invoiceNumber}</p>
                  <p>Issued: {data.date}</p>
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
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-cyan-200/50 shadow-lg">
            <h3 className="text-xl font-bold text-cyan-700 mb-4 flex items-center">
              <Ship className="h-6 w-6 mr-3" />
              Navigation Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{data.company.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 shadow-lg">
            <h3 className="text-xl font-bold text-teal-700 mb-4 flex items-center">
              <Anchor className="h-6 w-6 mr-3" />
              Destination
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                {data.client.name}
              </p>
              <p className="text-slate-600 font-medium">{data.client.address}</p>
              <p className="text-slate-600 font-medium">{data.client.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-blue-200/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Waves className="h-7 w-7 mr-3" />
              Ocean Services & Solutions
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 rounded-xl p-4 border border-blue-200/30 hover:border-cyan-300/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-2 flex items-center">
                        <Fish className="h-5 w-5 text-cyan-500 mr-2" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full font-bold">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-slate-600 font-medium bg-white px-3 py-1 rounded-full border border-blue-200">
                          Rate: {currencySymbol}${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
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
        <div className="bg-white/85 backdrop-blur-lg rounded-2xl p-8 border border-cyan-200/50 shadow-2xl">
          <div className="flex justify-end">
            <div className="w-96 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-blue-200">
                <span className="text-slate-600 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-slate-900">{currencySymbol}${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-cyan-200">
                <span className="text-slate-600 font-medium">Tax</span>
                <span className="text-xl font-bold text-slate-900">{currencySymbol}${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-xl p-4 shadow-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white flex items-center">
                    <Waves className="h-5 w-5 mr-2" />
                    Total Amount
                  </span>
                  <span className="text-3xl font-bold text-white">{currencySymbol}${data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h4 className="text-2xl font-bold mb-4 flex items-center justify-center">
            <Ship className="h-6 w-6 mr-3" />
            Smooth Sailing Ahead
          </h4>
          <p className="text-blue-100 mb-6 text-lg">
            {data.notes || 'Thank you for navigating with us. Your journey to success continues here.'}
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <p className="font-bold mb-2 flex items-center justify-center">
                <Anchor className="h-4 w-4 mr-2" />
                Payment Terms
              </p>
              <p className="text-blue-100">{data.terms || 'Payment due within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <p className="font-bold mb-2 flex items-center justify-center">
                <Compass className="h-4 w-4 mr-2" />
                Support
              </p>
              <p className="text-blue-100">We're here to guide you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

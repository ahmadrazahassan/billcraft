import { Cpu, Zap, Code, Database, Wifi, Monitor, Phone, Mail } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface SilverTechTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function SilverTechTemplate({ data, isPreview = false }: SilverTechTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Tech Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-slate-300/20 to-gray-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-zinc-300/20 to-slate-300/20 rounded-full blur-3xl"></div>

      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(71, 85, 105, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(71, 85, 105, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(71, 85, 105, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(71, 85, 105, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
        }}></div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute top-20 right-24 w-6 h-6 text-slate-400/60">
        <Cpu className="w-full h-full animate-pulse" />
      </div>
      <div className="absolute bottom-32 left-20 w-8 h-8 text-gray-400/50">
        <Database className="w-full h-full animate-bounce" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-10 border border-slate-300/50 shadow-2xl shadow-slate-500/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-gray-600 rounded-xl flex items-center justify-center shadow-2xl shadow-slate-500/30">
                  <Monitor className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-slate-500 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-gray-700 mb-3">
                  {data.company.name}
                </h1>
                <p className="text-slate-600 font-bold text-xl">Technology Solutions</p>
                <p className="text-gray-600 font-medium text-lg">{data.company.address}</p>
                <p className="text-gray-600 font-medium text-lg">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-slate-600 to-gray-600 rounded-2xl p-8 text-white shadow-2xl shadow-slate-500/30">
                <h2 className="text-4xl font-bold mb-4 font-mono">INVOICE</h2>
                <div className="space-y-2 text-base font-mono bg-white/20 rounded-xl p-4">
                  <p className="flex items-center"><Code className="h-5 w-5 mr-2" />#{data.invoiceNumber}</p>
                  <p>DATE: {data.date}</p>
                  <p>DUE: {data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Client Information */}
      <div className="relative z-10 mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8 border border-slate-300/50 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-700 mb-6 flex items-center font-mono">
              <Wifi className="h-7 w-7 mr-3" />
              [SYSTEM_INFO]
            </h3>
            <div className="space-y-4 font-mono">
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-500 rounded-lg flex items-center justify-center shadow-md">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-800 font-bold text-lg">TEL: {data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-zinc-500 rounded-lg flex items-center justify-center shadow-md">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-800 font-bold text-lg">MAIL: {data.company.email}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <Database className="w-6 h-6 text-zinc-600" />
                <span className="text-zinc-800 font-bold">STATUS: ONLINE</span>
              </div>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/50 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center font-mono">
              <Cpu className="h-7 w-7 mr-3" />
              [CLIENT_DATA]
            </h3>
            <div className="space-y-4">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-gray-700 font-mono">
                {data.client.name}
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 font-mono">
                <p className="text-gray-700 font-bold text-lg">ADDR: {data.client.address}</p>
                <p className="text-gray-700 font-bold text-lg">CITY: {data.client.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-300/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-600 to-gray-600 p-8">
            <h3 className="text-3xl font-bold text-white flex items-center font-mono">
              <Monitor className="h-8 w-8 mr-4" />
              [TECH_SERVICES]
            </h3>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200/50 hover:border-gray-300/60 transition-all duration-300 shadow-md font-mono">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                        <Code className="h-6 w-6 text-slate-600 mr-3" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-6 text-sm">
                        <span className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-4 py-2 rounded-lg font-bold">
                          QTY: {item.quantity}
                        </span>
                        <span className="text-gray-700 font-bold bg-white px-4 py-2 rounded-lg border border-gray-200">
                          RATE: {currencySymbol}${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-gray-700 font-mono">
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
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-10 border border-gray-300/50 shadow-2xl">
          <div className="flex justify-end">
            <div className="w-full max-w-lg space-y-6 font-mono">
              <div className="flex justify-between items-center py-4 border-b-2 border-slate-300">
                <span className="text-xl text-slate-600 font-bold">SUBTOTAL:</span>
                <span className="text-2xl font-bold text-slate-900">{currencySymbol}${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b-2 border-gray-300">
                <span className="text-xl text-gray-600 font-bold">TAX_CALC:</span>
                <span className="text-2xl font-bold text-gray-900">{currencySymbol}${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white flex items-center">
                    <Monitor className="h-6 w-6 mr-2" />
                    TOTAL_SUM:
                  </span>
                  <span className="text-4xl font-bold text-white">
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
        <div className="bg-gradient-to-r from-slate-700 to-gray-700 rounded-2xl p-10 text-white text-center shadow-2xl">
          <h4 className="text-3xl font-bold mb-6 flex items-center justify-center font-mono">
            <Database className="h-8 w-8 mr-3" />
            [TECH_EXCELLENCE]
          </h4>
          <p className="text-slate-200 mb-8 text-xl font-mono">
            {data.notes || 'System processing complete. Thank you for choosing our tech solutions.'}
          </p>
          <div className="grid md:grid-cols-2 gap-8 font-mono">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="font-bold mb-3 text-xl flex items-center justify-center">
                <Cpu className="h-5 w-5 mr-2" />
                [PAYMENT_TERMS]
              </p>
              <p className="text-slate-200 text-lg">{data.terms || 'Payment due in 30 cycles'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="font-bold mb-3 text-xl flex items-center justify-center">
                <Wifi className="h-5 w-5 mr-2" />
                [TECH_SUPPORT]
              </p>
              <p className="text-slate-200 text-lg">24/7 System monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

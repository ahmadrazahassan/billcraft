import { Zap, Power, Battery, Cpu, Wifi } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface ElectricBlueTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function ElectricBlueTemplate({ data, isPreview = false }: ElectricBlueTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Electric Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Electric Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Floating Electric Elements */}
      <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-16 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 left-32 w-8 h-8 border-2 border-blue-400 rounded-full animate-bounce"></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-blue-800/80 backdrop-blur-2xl rounded-2xl p-8 border border-blue-400/30 shadow-2xl shadow-blue-500/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                  <Zap className="h-3 w-3 text-blue-900" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-2">
                  {data.company.name}
                </h1>
                <p className="text-blue-300 font-bold text-lg">Electric Solutions</p>
                <p className="text-blue-400 text-sm">{data.company.address}</p>
                <p className="text-blue-400 text-sm">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white shadow-2xl shadow-blue-500/40">
                <h2 className="text-3xl font-black mb-3">INVOICE</h2>
                <div className="space-y-1 text-sm font-bold bg-white/20 rounded-lg p-3">
                  <p className="flex items-center"><Power className="h-4 w-4 mr-2" />#{data.invoiceNumber}</p>
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
          <div className="bg-blue-800/70 backdrop-blur-xl rounded-xl p-6 border border-blue-400/30 shadow-lg">
            <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center">
              <Wifi className="h-6 w-6 mr-3" />
              Power Source
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-700/50 rounded-lg border border-blue-400/20">
                <Battery className="h-5 w-5 text-blue-300" />
                <span className="text-blue-200 font-medium">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-700/50 rounded-lg border border-blue-400/20">
                <Cpu className="h-5 w-5 text-cyan-300" />
                <span className="text-blue-200 font-medium">{data.company.email}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-700/50 rounded-lg border border-blue-400/20">
                <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                <span className="text-blue-200 font-medium">High Voltage</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-800/70 backdrop-blur-xl rounded-xl p-6 border border-cyan-400/30 shadow-lg">
            <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center">
              <Power className="h-6 w-6 mr-3" />
              Connected Client
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                {data.client.name}
              </p>
              <p className="text-blue-300 font-medium">{data.client.address}</p>
              <p className="text-blue-300 font-medium">{data.client.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="relative z-10 mb-10">
        <div className="bg-blue-800/80 backdrop-blur-2xl rounded-xl border border-blue-400/30 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
            <h3 className="text-2xl font-black text-white flex items-center">
              <Zap className="h-7 w-7 mr-3" />
              Electric Services
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {data.items.map((item, index) => (
                <div key={index} className="bg-blue-700/50 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20 hover:border-cyan-400/40 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-blue-200 mb-2 flex items-center">
                        <Zap className="h-5 w-5 text-yellow-400 mr-2 animate-pulse" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full font-bold">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-blue-300 font-medium bg-blue-800/50 px-3 py-1 rounded-full border border-blue-400/30">
                          Rate: {currencySymbol}${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
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
        <div className="bg-blue-800/80 backdrop-blur-2xl rounded-xl p-8 border border-cyan-400/30 shadow-2xl">
          <div className="flex justify-end">
            <div className="w-96 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-blue-400/30">
                <span className="text-blue-300 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-blue-200">{currencySymbol}${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-cyan-400/30">
                <span className="text-cyan-300 font-medium">Tax</span>
                <span className="text-xl font-bold text-blue-200">{currencySymbol}${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-4 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-white flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Total Power
                  </span>
                  <span className="text-3xl font-black text-white">{currencySymbol}${data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white text-center shadow-2xl">
          <h4 className="text-2xl font-black mb-4 flex items-center justify-center">
            <Power className="h-6 w-6 mr-3" />
            Powered by Excellence
          </h4>
          <p className="text-blue-100 mb-6 text-lg font-medium">
            {data.notes || 'Thank you for choosing our electric solutions. Stay charged, stay connected!'}
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
              <p className="font-black mb-2 flex items-center justify-center">
                <Battery className="h-4 w-4 mr-2" />
                Payment Terms
              </p>
              <p className="text-blue-100 font-medium">{data.terms || 'Payment due within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
              <p className="font-black mb-2 flex items-center justify-center">
                <Wifi className="h-4 w-4 mr-2" />
                Electric Support
              </p>
              <p className="text-blue-100 font-medium">24/7 High-voltage support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

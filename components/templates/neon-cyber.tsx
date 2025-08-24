import { Zap, Code, Terminal, Cpu, Shield, Wifi } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface NeonCyberTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function NeonCyberTemplate({ data, isPreview = false }: NeonCyberTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-slate-900 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Neon Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <Terminal className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full animate-pulse shadow-lg shadow-pink-500/50"></div>
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2 tracking-wider">
                  {data.company.name}
                </h1>
                <p className="text-cyan-300 font-mono text-sm tracking-wide">{data.company.address}</p>
                <p className="text-purple-300 font-mono text-sm tracking-wide">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
                <h2 className="text-3xl font-black text-cyan-400 mb-3 tracking-widest">INVOICE</h2>
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-purple-300">ID: #{data.invoiceNumber}</p>
                  <p className="text-cyan-300">INIT: {data.date}</p>
                  <p className="text-pink-300">DUE: {data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Client Info */}
      <div className="relative z-10 mb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center font-mono tracking-wide">
              <Wifi className="h-6 w-6 mr-3" />
              [NETWORK_INFO]
            </h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center space-x-3 text-cyan-300">
                <Code className="h-4 w-4" />
                <span>TEL: {data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-purple-300">
                <Shield className="h-4 w-4" />
                <span>EMAIL: {data.company.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-pink-300">
                <Cpu className="h-4 w-4" />
                <span>STATUS: ONLINE</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg shadow-purple-500/10">
            <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center font-mono tracking-wide">
              <Terminal className="h-6 w-6 mr-3" />
              [CLIENT_DATA]
            </h3>
            <div className="space-y-2 font-mono">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {data.client.name}
              </p>
              <p className="text-cyan-300 text-sm">{data.client.address}</p>
              <p className="text-purple-300 text-sm">{data.client.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="relative z-10 mb-10">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 p-6 border-b border-cyan-500/30">
            <h3 className="text-2xl font-bold text-cyan-400 flex items-center font-mono tracking-wider">
              <Zap className="h-7 w-7 mr-3" />
              [SERVICES_MATRIX]
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {data.items.map((item, index) => (
                <div key={index} className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-cyan-300 mb-2 font-mono">{item.description}</h4>
                      <div className="flex items-center space-x-4 text-sm font-mono">
                        <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full font-bold">
                          QTY: {item.quantity}
                        </span>
                        <span className="text-purple-300">RATE: {currencySymbol}${item.rate.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 font-mono">
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
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          <div className="flex justify-end">
            <div className="w-96 space-y-4 font-mono">
              <div className="flex justify-between items-center py-3 border-b border-cyan-500/30">
                <span className="text-cyan-300 tracking-wide">SUBTOTAL:</span>
                <span className="text-xl font-bold text-white">{currencySymbol}${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-purple-500/30">
                <span className="text-purple-300 tracking-wide">TAX_CALC:</span>
                <span className="text-xl font-bold text-white">{currencySymbol}${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/40">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-cyan-400 tracking-wider">TOTAL_AMOUNT:</span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
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
        <div className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3 font-mono tracking-wider">
              [TRANSMISSION_COMPLETE]
            </h4>
            <p className="text-cyan-200 text-lg font-mono">
              {data.notes || 'Thank you for interfacing with our systems.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm font-mono">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
              <p className="font-bold text-purple-400 mb-2">[PAYMENT_PROTOCOL]</p>
              <p className="text-purple-200">{data.terms || 'Execute payment within 30 cycles'}</p>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
              <p className="font-bold text-cyan-400 mb-2">[SUPPORT_CHANNEL]</p>
              <p className="text-cyan-200">Connection available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

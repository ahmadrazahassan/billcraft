import { Shield, Building, Award, Lock, Target, CheckCircle } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface DarkProfessionalTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function DarkProfessionalTemplate({ data, isPreview = false }: DarkProfessionalTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-slate-900 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Subtle Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{data.company.name}</h1>
                <p className="text-blue-400 font-semibold">Professional Services</p>
                <p className="text-slate-400 text-sm">{data.company.address}</p>
                <p className="text-slate-400 text-sm">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-slate-700/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/40">
                <h2 className="text-3xl font-bold text-blue-400 mb-3">INVOICE</h2>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300 font-medium">#{data.invoiceNumber}</p>
                  <p className="text-slate-400">Date: {data.date}</p>
                  <p className="text-slate-400">Due: {data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Client Info */}
      <div className="relative z-10 mb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/40 shadow-lg">
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-3" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/40 rounded-lg">
                <span className="text-blue-400 font-medium">Phone:</span>
                <span className="text-slate-300">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/40 rounded-lg">
                <span className="text-blue-400 font-medium">Email:</span>
                <span className="text-slate-300">{data.company.email}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/40 rounded-lg">
                <span className="text-green-400 font-medium">Status:</span>
                <span className="text-green-300">Verified Business</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/40 shadow-lg">
            <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center">
              <Target className="h-6 w-6 mr-3" />
              Bill To
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">{data.client.name}</p>
              <p className="text-slate-400">{data.client.address}</p>
              <p className="text-slate-400">{data.client.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="relative z-10 mb-10">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
          <div className="bg-slate-700/60 p-6 border-b border-slate-600/40">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Award className="h-7 w-7 mr-3 text-blue-400" />
              Professional Services
            </h3>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-700/40">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-blue-400">Service Description</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-blue-400">Qty</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-blue-400">Rate</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-blue-400">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {data.items.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/20">
                    <td className="px-6 py-4 text-white font-medium">{item.description}</td>
                    <td className="px-6 py-4 text-center text-slate-300">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-slate-300">{currencySymbol}${item.rate.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-bold text-blue-400">{currencySymbol}${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="relative z-10 mb-10">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 shadow-xl">
          <div className="flex justify-end">
            <div className="w-80 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-700/40">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-white">{currencySymbol}${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700/40">
                <span className="text-slate-400 font-medium">Tax</span>
                <span className="text-xl font-bold text-white">{currencySymbol}${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total Amount</span>
                  <span className="text-3xl font-bold text-white">{currencySymbol}${data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 shadow-xl text-center">
          <h4 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
            <Lock className="h-6 w-6 mr-3 text-blue-400" />
            Professional Invoice
          </h4>
          <p className="text-slate-300 mb-6 text-lg">
            {data.notes || 'Thank you for your business. This invoice is protected and verified.'}
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
              <p className="font-bold text-blue-400 mb-2">Payment Terms</p>
              <p className="text-slate-300">{data.terms || 'Net 30 days'}</p>
            </div>
            <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
              <p className="font-bold text-indigo-400 mb-2">Support</p>
              <p className="text-slate-300">24/7 Professional Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

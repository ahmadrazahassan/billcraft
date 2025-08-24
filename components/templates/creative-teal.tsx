import { Waves, Droplet, Sun, Wind } from 'lucide-react'
import { InvoiceData, getCurrencySymbol, TemplateLogo } from './template-utils'

interface CreativeTealTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function CreativeTealTemplate({ data, isPreview = false }: CreativeTealTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto relative overflow-hidden">
      {/* Flowing Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32">
        <svg className="w-full h-full" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C100,20 200,100 400,60 L400,0 L0,0 Z" fill="#f0fdfa" />
          <path d="M0,80 C100,40 200,120 400,80 L400,0 L0,0 Z" fill="#ccfbf1" opacity="0.7" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center">
                <Waves className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-200 rounded-full flex items-center justify-center">
                <Droplet className="h-4 w-4 text-teal-600" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{data.company.name}</h1>
              <p className="text-teal-600 font-semibold text-lg">Creative Flow Studio</p>
              <p className="text-slate-600 italic">Where creativity meets excellence</p>
            </div>
          </div>
          <div className="text-right">
            <div className="relative">
              <div className="bg-teal-50 rounded-3xl p-8 border-2 border-teal-200">
                <h2 className="text-3xl font-bold text-teal-600 mb-4">INVOICE</h2>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-900 font-bold">#{data.invoiceNumber}</p>
                  <p className="text-slate-600">Created: {data.date}</p>
                  <p className="text-slate-600">Due: {data.dueDate}</p>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-teal-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Flow */}
      <div className="relative z-10 mb-12">
        <div className="bg-teal-50 rounded-3xl p-8 border border-teal-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Wind className="h-24 w-24 text-teal-600" />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Sun className="h-6 w-6 text-teal-500 mr-3" />
                Connect With Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                  <p className="text-slate-700">{data.company.address}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                  <p className="text-slate-700">{data.company.city}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <p className="text-teal-600 font-semibold">{data.company.phone}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <p className="text-teal-600 font-semibold">{data.company.email}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Droplet className="h-6 w-6 text-teal-500 mr-3" />
                Flowing To
              </h3>
              <div className="bg-white rounded-2xl p-6 border border-teal-200">
                <p className="text-2xl font-bold text-slate-900 mb-3">{data.client.name}</p>
                <div className="space-y-1 text-slate-600">
                  <p>{data.client.address}</p>
                  <p>{data.client.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Services */}
      <div className="relative z-10 mb-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-4">
            <Waves className="h-5 w-5 text-white" />
          </div>
          Creative Services Flow
        </h3>
        
        <div className="space-y-6">
          {data.items.map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-white border-2 border-teal-100 hover:border-teal-300 rounded-3xl p-8 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  {index % 4 === 0 && <Waves className="h-full w-full text-teal-600" />}
                  {index % 4 === 1 && <Sun className="h-full w-full text-teal-600" />}
                  {index % 4 === 2 && <Wind className="h-full w-full text-teal-600" />}
                  {index % 4 === 3 && <Droplet className="h-full w-full text-teal-600" />}
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className={`w-4 h-4 rounded-full ${
                        index % 3 === 0 ? 'bg-teal-500' : 
                        index % 3 === 1 ? 'bg-teal-400' : 'bg-teal-300'
                      }`}></div>
                      <h4 className="text-xl font-bold text-slate-900">{item.description}</h4>
                    </div>
                    <div className="ml-8 flex items-center space-x-8">
                      <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-semibold">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-slate-600">
                        Rate: {currencySymbol}${item.rate.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-teal-500">{currencySymbol}${item.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              {/* Connecting Line */}
              {index < data.items.length - 1 && (
                <div className="flex justify-center my-4">
                  <div className="w-1 h-6 bg-teal-200 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="relative z-10 mb-12">
        <div className="flex justify-end">
          <div className="w-96">
            <div className="bg-teal-50 rounded-3xl p-8 border-2 border-teal-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600 font-semibold">Subtotal</span>
                  <span className="font-bold text-slate-900">{currencySymbol}${data.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600 font-semibold">Tax</span>
                  <span className="font-bold text-slate-900">{currencySymbol}${data.tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-teal-400 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-900">Total Flow</span>
                    <span className="text-4xl font-bold text-teal-500">{currencySymbol}${data.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Footer */}
      <div className="relative z-10">
        <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-16">
            <svg className="w-full h-full" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,60 L0,40 C100,20 200,50 400,30 L400,60 Z" fill="#14b8a6" opacity="0.3" />
            </svg>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-3 flex items-center">
                <Waves className="h-6 w-6 text-teal-400 mr-3" />
                Thank You for the Creative Journey!
              </h4>
              <p className="text-slate-300 mb-4">Your vision flows through every pixel of our work</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Droplet className="h-4 w-4 text-teal-400" />
                  <span>Payment Terms: Net 30</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-teal-400" />
                  <span>Questions? Let's flow together!</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-teal-500 text-white px-6 py-4 rounded-2xl">
                <p className="font-bold">Creative Excellence</p>
                <p className="text-teal-100 text-sm">Delivered with passion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
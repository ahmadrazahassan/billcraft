import { Shield, Target, Award, Briefcase } from 'lucide-react'

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
}

interface CorporateRedTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function CorporateRedTemplate({ data, isPreview = false }: CorporateRedTemplateProps) {
  return (
    <div className="bg-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-red-600 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Shield className="h-32 w-32" />
        </div>
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
              <Target className="h-10 w-10 text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{data.company.name}</h1>
              <p className="text-red-100 text-lg font-semibold">EXECUTIVE SERVICES</p>
              <p className="text-red-200 text-sm mt-1">Excellence in Business Solutions</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-bold mb-4">INVOICE</h2>
            <div className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-xl">
              #{data.invoiceNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Executive Info Bar */}
      <div className="bg-slate-50 border-b-4 border-red-600 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">Secure</p>
              <p className="text-slate-900 font-bold">Confidential</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">Certified</p>
              <p className="text-slate-900 font-bold">ISO 27001</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">Experience</p>
              <p className="text-slate-900 font-bold">20+ Years</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">Results</p>
              <p className="text-slate-900 font-bold">Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="bg-red-50 border-l-6 border-red-600 p-6 rounded-r-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 text-red-600 mr-2" />
                INVOICE INFORMATION
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-semibold">Issue Date:</span>
                  <span className="font-bold text-slate-900">{data.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-semibold">Due Date:</span>
                  <span className="font-bold text-red-600">{data.dueDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-semibold">Payment Terms:</span>
                  <span className="font-bold text-slate-900">Net 30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-semibold">Priority:</span>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">HIGH</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-red-600 flex items-center">
              <Target className="h-5 w-5 text-red-600 mr-2" />
              CLIENT INFORMATION
            </h3>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <p className="text-2xl font-bold text-slate-900 mb-3">{data.client.name}</p>
              <div className="space-y-1 text-slate-600">
                <p>{data.client.address}</p>
                <p>{data.client.city}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">Account Status</p>
                <p className="text-green-600 font-bold">Active Premium</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-red-600 flex items-center">
            <Briefcase className="h-6 w-6 text-red-600 mr-3" />
            EXECUTIVE SERVICES BREAKDOWN
          </h3>
          
          <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-red-600 text-white">
              <div className="grid grid-cols-12 gap-4 px-6 py-4">
                <div className="col-span-6 font-bold text-sm uppercase tracking-wide">Service Description</div>
                <div className="col-span-2 text-center font-bold text-sm uppercase tracking-wide">Units</div>
                <div className="col-span-2 text-right font-bold text-sm uppercase tracking-wide">Rate</div>
                <div className="col-span-2 text-right font-bold text-sm uppercase tracking-wide">Total</div>
              </div>
            </div>
            
            {data.items.map((item, index) => (
              <div key={index} className={`grid grid-cols-12 gap-4 px-6 py-5 border-b border-slate-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-red-50'
              }`}>
                <div className="col-span-6">
                  <h4 className="font-bold text-slate-900 mb-1">{item.description}</h4>
                  <p className="text-xs text-slate-600 uppercase tracking-wide">Professional Service</p>
                </div>
                <div className="col-span-2 text-center">
                  <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full font-bold text-sm">
                    {item.quantity}
                  </span>
                </div>
                <div className="col-span-2 text-right text-slate-600 font-semibold">${item.rate.toFixed(2)}</div>
                <div className="col-span-2 text-right font-bold text-slate-900 text-lg">${item.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-96">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-slate-700">Subtotal</span>
                  <span className="font-bold text-slate-900">${data.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-slate-700">Tax (10%)</span>
                  <span className="font-bold text-slate-900">${data.tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-red-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-900">TOTAL DUE</span>
                    <span className="text-3xl font-bold text-red-600">${data.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Footer */}
        <div className="bg-slate-900 text-white rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-3 flex items-center">
                <Award className="h-6 w-6 text-red-400 mr-3" />
                Executive Payment Terms
              </h4>
              <div className="space-y-2 text-slate-300">
                <p>- Payment due within 30 days of invoice date</p>
                <p>- Wire transfers preferred for amounts over $10,000</p>
                <p>- Late payments subject to 2% monthly penalty</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-red-600 text-white px-6 py-4 rounded-lg">
                <p className="text-sm font-bold mb-1">PRIORITY ACCOUNT</p>
                <p className="text-xs">Expedited Processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
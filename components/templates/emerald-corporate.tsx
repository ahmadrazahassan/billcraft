import { Building, Shield, Briefcase, Target, CheckCircle, Award, Phone, Mail } from 'lucide-react'

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
  notes?: string
  terms?: string
}

interface EmeralCorporateTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function EmeraldCorporateTemplate({ data, isPreview = false }: EmeralCorporateTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Corporate Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-200/20 to-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>

      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-10 border border-emerald-200/50 shadow-2xl shadow-emerald-500/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                  <Building className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-700 mb-3">
                  {data.company.name}
                </h1>
                <p className="text-emerald-600 font-bold text-xl">Corporate Solutions</p>
                <p className="text-green-600 font-medium text-lg">{data.company.address}</p>
                <p className="text-green-600 font-medium text-lg">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl p-8 text-white shadow-2xl shadow-emerald-500/30">
                <h2 className="text-4xl font-bold mb-4">INVOICE</h2>
                <div className="space-y-2 text-base font-semibold bg-white/20 rounded-xl p-4">
                  <p className="flex items-center"><Target className="h-5 w-5 mr-2" />#{data.invoiceNumber}</p>
                  <p>Issued: {data.date}</p>
                  <p>Due: {data.dueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Client Information */}
      <div className="relative z-10 mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200/50 shadow-lg">
            <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center">
              <Briefcase className="h-7 w-7 mr-3" />
              Corporate Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-md">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-emerald-800 font-bold text-lg">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-800 font-bold text-lg">{data.company.email}</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-teal-50 rounded-xl border border-teal-200">
                <Award className="w-6 h-6 text-teal-600" />
                <span className="text-teal-800 font-bold">Certified Business Partner</span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-green-200/50 shadow-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
              <Target className="h-7 w-7 mr-3" />
              Valued Client
            </h3>
            <div className="space-y-4">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-700">
                {data.client.name}
              </p>
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <p className="text-green-700 font-bold text-lg">{data.client.address}</p>
                <p className="text-green-700 font-bold text-lg">{data.client.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-emerald-200/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-8">
            <h3 className="text-3xl font-bold text-white flex items-center">
              <Shield className="h-8 w-8 mr-4" />
              Professional Services
            </h3>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200/50 hover:border-green-300/60 transition-all duration-300 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-emerald-900 mb-3 flex items-center">
                        <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-xl font-bold">
                          Quantity: {item.quantity}
                        </span>
                        <span className="text-green-700 font-bold bg-white px-4 py-2 rounded-xl border border-green-200">
                          Rate: ${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-700">
                        ${item.amount.toFixed(2)}
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
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-10 border border-green-200/50 shadow-2xl">
          <div className="flex justify-end">
            <div className="w-full max-w-lg space-y-6">
              <div className="flex justify-between items-center py-4 border-b-2 border-emerald-200">
                <span className="text-xl text-emerald-600 font-bold">Subtotal</span>
                <span className="text-2xl font-bold text-emerald-900">${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b-2 border-green-200">
                <span className="text-xl text-green-600 font-bold">Tax</span>
                <span className="text-2xl font-bold text-green-900">${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white flex items-center">
                    <Building className="h-6 w-6 mr-2" />
                    Total Amount
                  </span>
                  <span className="text-4xl font-bold text-white">
                    ${data.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-emerald-700 to-green-700 rounded-2xl p-10 text-white text-center shadow-2xl">
          <h4 className="text-3xl font-bold mb-6 flex items-center justify-center">
            <Award className="h-8 w-8 mr-3" />
            Corporate Excellence
          </h4>
          <p className="text-emerald-100 mb-8 text-xl">
            {data.notes || 'Thank you for choosing our corporate services. Your success drives our commitment to excellence.'}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="font-bold mb-3 text-xl flex items-center justify-center">
                <Shield className="h-5 w-5 mr-2" />
                Payment Terms
              </p>
              <p className="text-emerald-100 text-lg">{data.terms || 'Payment within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="font-bold mb-3 text-xl flex items-center justify-center">
                <Target className="h-5 w-5 mr-2" />
                Corporate Support
              </p>
              <p className="text-emerald-100 text-lg">Professional support 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

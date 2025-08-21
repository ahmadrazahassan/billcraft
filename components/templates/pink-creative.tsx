import { Heart, Flower, Flower2, Star, Sparkles, Camera, Phone, Mail } from 'lucide-react'

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

interface PinkCreativeTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function PinkCreativeTemplate({ data, isPreview = false }: PinkCreativeTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-8 max-w-4xl mx-auto relative overflow-hidden min-h-screen">
      {/* Creative Pink Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-300/30 to-rose-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-fuchsia-300/30 to-pink-300/30 rounded-full blur-3xl"></div>

      {/* Floating Creative Elements */}
      <div className="absolute top-20 right-24 w-8 h-8 text-pink-300/60 animate-bounce">
        <Flower2 className="w-full h-full" />
      </div>
      <div className="absolute bottom-32 left-20 w-6 h-6 text-rose-300/50 animate-pulse">
        <Flower className="w-full h-full" />
      </div>
      <div className="absolute top-40 left-32 w-4 h-4 text-fuchsia-300/40 animate-ping">
        <Star className="w-full h-full" />
      </div>

      {/* Decorative Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #ec4899 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-pink-200/50 shadow-2xl shadow-pink-500/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/40 transform rotate-12">
                  <Heart className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 mb-2">
                  {data.company.name}
                </h1>
                <p className="text-pink-600 font-bold text-lg">Creative Pink Studio</p>
                <p className="text-rose-600 font-medium">{data.company.address}</p>
                <p className="text-rose-600 font-medium">{data.company.city}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 rounded-2xl p-6 text-white shadow-2xl transform -rotate-3">
                <h2 className="text-3xl font-black mb-3">INVOICE</h2>
                <div className="space-y-1 text-sm font-bold bg-white/20 rounded-xl p-3">
                  <p className="flex items-center"><Heart className="h-4 w-4 mr-2" />#{data.invoiceNumber}</p>
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg transform rotate-1">
            <h3 className="text-xl font-bold text-pink-700 mb-4 flex items-center">
              <Camera className="h-6 w-6 mr-3" />
              Creative Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-pink-800 font-bold">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-rose-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-fuchsia-400 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-rose-800 font-bold">{data.company.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-200/50 shadow-lg transform -rotate-1">
            <h3 className="text-xl font-bold text-rose-700 mb-4 flex items-center">
              <Flower className="h-6 w-6 mr-3" />
              Lovely Client
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-fuchsia-600">
                {data.client.name}
              </p>
              <p className="text-rose-600 font-semibold">{data.client.address}</p>
              <p className="text-rose-600 font-semibold">{data.client.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-pink-200/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 p-6">
            <h3 className="text-2xl font-black text-white flex items-center">
              <Flower2 className="h-7 w-7 mr-3" />
              Creative Services
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {data.items.map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-pink-50 via-rose-50 to-fuchsia-50 rounded-xl p-4 border border-pink-200/30 hover:border-rose-300/50 transition-all duration-300 transform hover:scale-102">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-pink-900 mb-2 flex items-center">
                        <Heart className="h-5 w-5 text-pink-500 mr-2" />
                        {item.description}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full font-black">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-rose-600 font-bold bg-white px-3 py-1 rounded-full border border-pink-200">
                          Rate: ${item.rate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-fuchsia-600">
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

      {/* Totals */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-fuchsia-200/50 shadow-2xl transform rotate-1">
          <div className="flex justify-end">
            <div className="w-96 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-pink-200">
                <span className="text-pink-600 font-bold">Subtotal</span>
                <span className="text-xl font-black text-pink-900">${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-rose-200">
                <span className="text-rose-600 font-bold">Tax</span>
                <span className="text-xl font-black text-rose-900">${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 rounded-xl p-4 shadow-lg transform -rotate-1">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-white">Total Amount</span>
                  <span className="text-3xl font-black text-white">${data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h4 className="text-2xl font-black mb-4 flex items-center justify-center">
            <Heart className="h-6 w-6 mr-3" />
            Made with Love & Creativity
          </h4>
          <p className="text-pink-100 mb-6 text-lg font-medium">
            {data.notes || 'Thank you for choosing our creative services. Every project is crafted with love and attention to detail!'}
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 transform rotate-1">
              <p className="font-black mb-2 flex items-center justify-center">
                <Flower className="h-4 w-4 mr-2" />
                Payment Terms
              </p>
              <p className="text-pink-100 font-medium">{data.terms || 'Payment due within 30 days'}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 transform -rotate-1">
              <p className="font-black mb-2 flex items-center justify-center">
                <Flower2 className="h-4 w-4 mr-2" />
                Creative Support
              </p>
              <p className="text-pink-100 font-medium">Always here with love</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Coffee, Leaf, BookOpen, Crown } from 'lucide-react'

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

interface ClassicBrownTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function ClassicBrownTemplate({ data, isPreview = false }: ClassicBrownTemplateProps) {
  return (
    <div className="bg-amber-50 p-8 max-w-4xl mx-auto border border-amber-200">
      {/* Elegant Header */}
      <div className="border-b-4 border-amber-600 pb-8 mb-10 relative">
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-amber-200 rounded-full opacity-30"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-2 border-amber-300 opacity-20"></div>
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-amber-700 rounded-lg flex items-center justify-center">
                <Crown className="h-10 w-10 text-amber-100" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">{data.company.name}</h1>
              <p className="text-amber-700 font-semibold text-lg tracking-wide">CLASSIC ELEGANCE</p>
              <p className="text-amber-600 italic">Timeless Quality & Service</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-amber-700 text-amber-50 rounded-lg p-6 border-4 border-amber-200">
              <h2 className="text-3xl font-serif font-bold mb-3">INVOICE</h2>
              <div className="bg-amber-100 text-amber-900 px-4 py-2 rounded font-bold">
                #{data.invoiceNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classic Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div>
          <div className="bg-white border-2 border-amber-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-serif font-bold text-amber-900 mb-4 pb-2 border-b border-amber-200 flex items-center">
              <Coffee className="h-5 w-5 text-amber-600 mr-2" />
              Our Establishment
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-amber-900">{data.company.name}</p>
                  <p className="text-amber-700 text-sm">{data.company.address}</p>
                  <p className="text-amber-700 text-sm">{data.company.city}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <p className="text-amber-800 font-medium">{data.company.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <p className="text-amber-800 font-medium">{data.company.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-amber-100 border-2 border-amber-300 rounded-lg p-6">
            <h3 className="text-lg font-serif font-bold text-amber-900 mb-4 pb-2 border-b border-amber-400 flex items-center">
              <BookOpen className="h-5 w-5 text-amber-700 mr-2" />
              Invoice Particulars
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-amber-700 font-medium">Date Issued:</span>
                <span className="font-bold text-amber-900">{data.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-700 font-medium">Payment Due:</span>
                <span className="font-bold text-amber-900">{data.dueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-700 font-medium">Terms:</span>
                <span className="font-bold text-amber-900">Net 30 Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-700 font-medium">Reference:</span>
                <span className="bg-amber-700 text-amber-100 px-3 py-1 rounded font-bold text-xs">
                  CLASSIC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Distinguished Client */}
      <div className="mb-10">
        <div className="bg-white border-2 border-amber-200 rounded-lg p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5">
            <Leaf className="h-32 w-32 text-amber-600" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-6 pb-3 border-b-2 border-amber-300 flex items-center">
              <Crown className="h-6 w-6 text-amber-600 mr-3" />
              Distinguished Client
            </h3>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-2xl font-serif font-bold text-amber-900 mb-3">{data.client.name}</p>
              <div className="space-y-1 text-amber-700">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                  {data.client.address}
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                  {data.client.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Rendered */}
      <div className="mb-10">
        <h3 className="text-xl font-serif font-bold text-amber-900 mb-6 pb-3 border-b-2 border-amber-600 flex items-center">
          <BookOpen className="h-6 w-6 text-amber-600 mr-3" />
          Services Rendered with Distinction
        </h3>
        
        <div className="bg-white border-2 border-amber-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-amber-700 text-amber-50">
            <div className="grid grid-cols-12 gap-4 px-8 py-4">
              <div className="col-span-6 font-serif font-bold">Description of Services</div>
              <div className="col-span-2 text-center font-serif font-bold">Quantity</div>
              <div className="col-span-2 text-right font-serif font-bold">Rate</div>
              <div className="col-span-2 text-right font-serif font-bold">Amount</div>
            </div>
          </div>
          
          {data.items.map((item, index) => (
            <div key={index} className={`grid grid-cols-12 gap-4 px-8 py-6 border-b border-amber-200 ${
              index % 2 === 0 ? 'bg-white' : 'bg-amber-50'
            }`}>
              <div className="col-span-6">
                <h4 className="font-serif font-bold text-amber-900 mb-2">{item.description}</h4>
                <p className="text-xs text-amber-600 italic">Premium Service</p>
              </div>
              <div className="col-span-2 text-center">
                <span className="bg-amber-200 text-amber-800 px-4 py-2 rounded-full font-bold">
                  {item.quantity}
                </span>
              </div>
              <div className="col-span-2 text-right text-amber-700 font-semibold">
                ${item.rate.toFixed(2)}
              </div>
              <div className="col-span-2 text-right font-serif font-bold text-amber-900 text-lg">
                ${item.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elegant Totals */}
      <div className="flex justify-end mb-10">
        <div className="w-96">
          <div className="bg-amber-100 border-2 border-amber-300 rounded-lg p-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-amber-300">
                <span className="font-serif text-amber-800 font-semibold">Subtotal</span>
                <span className="font-bold text-amber-900">${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-amber-300">
                <span className="font-serif text-amber-800 font-semibold">Tax</span>
                <span className="font-bold text-amber-900">${data.tax.toFixed(2)}</span>
              </div>
              <div className="bg-amber-700 text-amber-50 rounded-lg p-4 -m-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-serif font-bold">TOTAL</span>
                  <span className="text-3xl font-serif font-bold">${data.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classic Footer */}
      <div className="bg-amber-700 text-amber-50 rounded-lg p-8 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 opacity-10">
          <Coffee className="h-24 w-24" />
        </div>
        <div className="relative z-10 text-center">
          <h4 className="text-2xl font-serif font-bold mb-4 flex items-center justify-center">
            <Crown className="h-6 w-6 mr-3" />
            With Our Compliments
          </h4>
          <p className="text-amber-200 mb-6 font-serif italic text-lg">
            "Excellence is not a skill, it is an attitude we have perfected over time"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <Leaf className="h-6 w-6 mx-auto mb-2 text-amber-300" />
              <p className="font-semibold">Est. 1892</p>
              <p className="text-amber-200">Heritage of Excellence</p>
            </div>
            <div className="text-center">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-amber-300" />
              <p className="font-semibold">Payment Terms</p>
              <p className="text-amber-200">Net 30 Days</p>
            </div>
            <div className="text-center">
              <Coffee className="h-6 w-6 mx-auto mb-2 text-amber-300" />
              <p className="font-semibold">Thank You</p>
              <p className="text-amber-200">For Your Trust</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
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

interface MinimalBlackTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function MinimalBlackTemplate({ data, isPreview = false }: MinimalBlackTemplateProps) {
  return (
    <div className="bg-slate-900 text-white p-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-20">
        <div>
          <h1 className="text-3xl font-light text-white mb-12 tracking-wide">{data.company.name}</h1>
          <div className="space-y-2 text-sm text-slate-400">
            <p>{data.company.address}</p>
            <p>{data.company.city}</p>
            <p className="text-white font-medium">{data.company.phone}</p>
            <p className="text-white font-medium">{data.company.email}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-7xl font-thin text-white mb-6 tracking-wider">INVOICE</h2>
          <div className="space-y-3 text-sm">
            <div className="bg-white text-slate-900 px-4 py-2 rounded-sm">
              <p className="font-bold">{data.invoiceNumber}</p>
            </div>
            <p className="text-slate-300">{data.date}</p>
            <p className="text-slate-300">Due {data.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-20">
        <div className="w-full h-px bg-white mb-8"></div>
        <h3 className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Bill To</h3>
        <div className="space-y-2">
          <p className="text-2xl font-light text-white">{data.client.name}</p>
          <p className="text-slate-300">{data.client.address}</p>
          <p className="text-slate-300">{data.client.city}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-20">
        <div className="w-full h-px bg-white mb-12"></div>
        
        <div className="space-y-8">
          {data.items.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-start justify-between py-6 border-b border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex-1">
                  <h4 className="text-xl font-light text-white mb-3">{item.description}</h4>
                  <div className="flex items-center space-x-8 text-sm text-slate-400">
                    <span>Quantity {item.quantity}</span>
                    <span>Rate ${item.rate.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-light text-white">${item.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-20">
        <div className="w-96 space-y-6">
          <div className="flex justify-between items-center py-3 text-slate-300">
            <span className="tracking-wide">Subtotal</span>
            <span className="font-light">${data.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3 text-slate-300">
            <span className="tracking-wide">Tax</span>
            <span className="font-light">${data.tax.toFixed(2)}</span>
          </div>
          <div className="w-full h-px bg-white"></div>
          <div className="flex justify-between items-center py-6">
            <span className="text-2xl font-light text-white tracking-wide">Total</span>
            <span className="text-4xl font-thin text-white">${data.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-px bg-white mb-12"></div>
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4">Thank You</p>
        <p className="text-sm text-slate-300 font-light">Payment due within 30 days of invoice date</p>
      </div>
    </div>
  )
} 
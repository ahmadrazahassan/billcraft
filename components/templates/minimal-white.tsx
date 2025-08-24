interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  currency: string
  company: {
    name: string
    address: string
    city: string
    phone: string
    email: string
    website?: string
    logo?: string
  }
  client: {
    name: string
    address: string
    city: string
    email: string
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

// Currency symbol helper
const getCurrencySymbol = (currencyCode: string): string => {
  const currencyMap: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'PKR': '₨',
    'INR': '₹',
  }
  return currencyMap[currencyCode] || '$'
}

interface MinimalWhiteTemplateProps {
  data: InvoiceData
  isPreview?: boolean
}

export function MinimalWhiteTemplate({ data, isPreview = false }: MinimalWhiteTemplateProps) {
  const currencySymbol = getCurrencySymbol(data.currency)
  
  return (
    <div className="bg-white p-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-16">
        <div>
          <div className="flex items-center space-x-4 mb-8">
            {data.company.logo && (
              <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
                <img 
                  src={data.company.logo} 
                  alt={`${data.company.name} logo`}
                  className="w-full h-full object-contain"
                  style={{ maxWidth: '100%', maxHeight: '100%', backgroundColor: 'transparent' }}
                />
              </div>
            )}
            <h1 className="text-2xl font-light text-slate-900">{data.company.name}</h1>
          </div>
          <div className="space-y-1 text-sm text-slate-600">
            <p>{data.company.address}</p>
            <p>{data.company.city}</p>
            <p>{data.company.phone}</p>
            <p>{data.company.email}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-6xl font-thin text-slate-900 mb-4">INVOICE</h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p>{data.invoiceNumber}</p>
            <p>{data.date}</p>
            <p>Due {data.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-16">
        <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-4">Bill To</h3>
        <div className="space-y-1 text-slate-900">
          <p className="text-lg font-medium">{data.client.name}</p>
          <p className="text-sm text-slate-600">{data.client.address}</p>
          <p className="text-sm text-slate-600">{data.client.city}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-16">
        <div className="border-b border-slate-200 pb-4 mb-8">
          <div className="grid grid-cols-12 gap-4 text-xs uppercase tracking-widest text-slate-400">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
        </div>
        
        <div className="space-y-6">
          {data.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6">
                <p className="text-slate-900 font-medium">{item.description}</p>
              </div>
              <div className="col-span-2 text-center text-slate-600">{item.quantity}</div>
              <div className="col-span-2 text-right text-slate-600">{currencySymbol}{item.rate.toFixed(2)}</div>
              <div className="col-span-2 text-right text-slate-900 font-medium">{currencySymbol}{item.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-16">
        <div className="w-80 space-y-4">
          <div className="flex justify-between items-center py-2 text-slate-600">
            <span>Subtotal</span>
            <span>{currencySymbol}{data.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 text-slate-600">
            <span>Tax</span>
            <span>{currencySymbol}{data.tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-900 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-slate-900">Total</span>
              <span className="text-2xl font-light text-slate-900">{currencySymbol}{data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Thank You</p>
        <p className="text-sm text-slate-600">Payment due within 30 days</p>
      </div>
    </div>
  )
} 
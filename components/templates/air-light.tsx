// Air Light Template - Weightless Apple-Inspired Design
import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const AirLight: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white p-20 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Airy Header */}
        <div className="text-center mb-16">
          {data.company.logo && (
            <div className="flex justify-center mb-6">
              <TemplateLogo logo={data.company.logo} companyName={data.company.name} size="lg" />
            </div>
          )}
          <h1 className="text-2xl font-light text-zinc-700 mb-6">{data.company.name}</h1>
          <div className="text-sm text-zinc-500 space-y-1">
            <p>{data.company.address} • {data.company.city}</p>
            <p>{data.company.email}</p>
          </div>
        </div>

        {/* Invoice Info - Centered */}
        <div className="text-center mb-16 py-8 border-t border-b border-zinc-100">
          <h2 className="text-4xl font-extralight text-zinc-800 mb-4">Invoice</h2>
          <p className="text-sm text-zinc-600">#{data.invoiceNumber}</p>
          <p className="text-sm text-zinc-500 mt-2">{data.date} — Due {data.dueDate}</p>
        </div>

        {/* Bill To - Centered */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4">Billed To</p>
          <p className="font-medium text-zinc-900 mb-2">{data.client.name}</p>
          <p className="text-sm text-zinc-600">{data.client.address}</p>
          <p className="text-sm text-zinc-600">{data.client.city}</p>
          <p className="text-sm text-zinc-600 mt-2">{data.client.email}</p>
        </div>

        {/* Items - Airy Table */}
        <div className="mb-16">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left py-4 text-xs uppercase tracking-widest text-zinc-400 font-normal">Item</th>
                <th className="text-center py-4 text-xs uppercase tracking-widest text-zinc-400 font-normal w-20">Qty</th>
                <th className="text-right py-4 text-xs uppercase tracking-widest text-zinc-400 font-normal w-32">Rate</th>
                <th className="text-right py-4 text-xs uppercase tracking-widest text-zinc-400 font-normal w-32">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b border-zinc-50">
                  <td className="py-5 text-sm text-zinc-700">{item.description}</td>
                  <td className="py-5 text-sm text-center text-zinc-600">{item.quantity}</td>
                  <td className="py-5 text-sm text-right text-zinc-600">
                    <CurrencyDisplay amount={item.rate} currency={data.currency} />
                  </td>
                  <td className="py-5 text-sm text-right text-zinc-800 font-medium">
                    <CurrencyDisplay amount={item.amount} currency={data.currency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals - Airy */}
        <div className="flex justify-end mb-16">
          <div className="w-80 space-y-3">
            <div className="flex justify-between text-sm text-zinc-600">
              <span>Subtotal</span>
              <span><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between text-sm text-zinc-600">
              <span>Tax</span>
              <span><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between text-xl font-light text-zinc-900 pt-4 border-t border-zinc-200">
              <span>Total</span>
              <span><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
            </div>
          </div>
        </div>

        {/* Footer - Airy */}
        {(data.notes || data.terms) && (
          <div className="text-center text-sm text-zinc-500 space-y-4 pt-8 border-t border-zinc-100">
            {data.notes && <p>{data.notes}</p>}
            {data.terms && <p className="text-xs">{data.terms}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

// Zen Space - Calm Balanced Centered Design
import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const ZenSpace: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-zinc-50 p-16 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-3xl mx-auto bg-white p-12 rounded-lg shadow-sm">
        {/* Centered Zen Header */}
        <div className="text-center mb-12">
          {data.company.logo && (
            <div className="flex justify-center mb-4">
              <TemplateLogo logo={data.company.logo} companyName={data.company.name} size="md" />
            </div>
          )}
          <h1 className="text-xl font-medium text-zinc-700">{data.company.name}</h1>
          <div className="text-xs text-zinc-500 mt-3">
            <p>{data.company.address} • {data.company.city}</p>
            <p className="mt-1">{data.company.email}</p>
          </div>
        </div>

        {/* Zen Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="h-px w-16 bg-zinc-300"></div>
          <div className="mx-4">
            <h2 className="text-2xl font-light text-zinc-700">Invoice</h2>
          </div>
          <div className="h-px w-16 bg-zinc-300"></div>
        </div>

        {/* Invoice Details - Balanced */}
        <div className="flex justify-center gap-12 mb-12 text-sm">
          <div className="text-center">
            <p className="text-xs text-zinc-400 mb-1">Number</p>
            <p className="font-medium text-zinc-800">#{data.invoiceNumber}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-400 mb-1">Date</p>
            <p className="text-zinc-700">{data.date}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-400 mb-1">Due Date</p>
            <p className="text-zinc-700">{data.dueDate}</p>
          </div>
        </div>

        {/* Bill To - Centered */}
        <div className="text-center mb-12 py-6 bg-zinc-50 rounded">
          <p className="text-xs uppercase tracking-wider text-zinc-400 mb-3">Bill To</p>
          <p className="font-medium text-zinc-900">{data.client.name}</p>
          <p className="text-sm text-zinc-600 mt-1">{data.client.address}</p>
          <p className="text-sm text-zinc-600">{data.client.city}</p>
          <p className="text-sm text-zinc-600 mt-1">{data.client.email}</p>
        </div>

        {/* Items - Zen Table */}
        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left py-3 text-xs uppercase tracking-wider text-zinc-500">Description</th>
                <th className="text-center py-3 text-xs uppercase tracking-wider text-zinc-500 w-16">Qty</th>
                <th className="text-right py-3 text-xs uppercase tracking-wider text-zinc-500 w-28">Rate</th>
                <th className="text-right py-3 text-xs uppercase tracking-wider text-zinc-500 w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b border-zinc-100">
                  <td className="py-4 text-sm text-zinc-700">{item.description}</td>
                  <td className="py-4 text-sm text-center text-zinc-600">{item.quantity}</td>
                  <td className="py-4 text-sm text-right text-zinc-600">
                    <CurrencyDisplay amount={item.rate} currency={data.currency} />
                  </td>
                  <td className="py-4 text-sm text-right text-zinc-800">
                    <CurrencyDisplay amount={item.amount} currency={data.currency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals - Centered */}
        <div className="flex justify-center mb-12">
          <div className="w-72 space-y-2">
            <div className="flex justify-between text-sm text-zinc-600 py-2">
              <span>Subtotal</span>
              <span><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between text-sm text-zinc-600 py-2">
              <span>Tax</span>
              <span><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between text-lg font-medium text-zinc-900 py-3 border-t-2 border-zinc-300">
              <span>Total</span>
              <span><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
            </div>
          </div>
        </div>

        {/* Footer - Zen */}
        {(data.notes || data.terms) && (
          <div className="text-center text-xs text-zinc-500 space-y-3 pt-8 border-t border-zinc-200">
            {data.notes && <p>{data.notes}</p>}
            {data.terms && <p>{data.terms}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

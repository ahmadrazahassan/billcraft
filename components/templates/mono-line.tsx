// ============================================================================
// MONO LINE TEMPLATE - Single Accent Line Minimalism
// ============================================================================

import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const MonoLine: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white p-16 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Single Accent Line */}
      <div className="w-full h-1 bg-zinc-900 mb-12"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-16">
        <div>
          {data.company.logo && (
            <div className="mb-4">
              <TemplateLogo logo={data.company.logo} companyName={data.company.name} size="md" />
            </div>
          )}
          <h1 className="text-2xl font-bold text-zinc-900">{data.company.name}</h1>
          <div className="text-sm text-zinc-600 mt-3 space-y-0.5">
            <p>{data.company.address}</p>
            <p>{data.company.city}</p>
            <p className="mt-2">{data.company.email}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold text-zinc-900 mb-3">INVOICE</h2>
          <div className="text-sm text-zinc-600">
            <p className="font-bold text-zinc-900">#{data.invoiceNumber}</p>
            <p className="mt-2">Date: {data.date}</p>
            <p>Due: {data.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Bill To with Accent */}
      <div className="mb-12 pl-4 border-l-4 border-zinc-900">
        <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Bill To</p>
        <div className="text-sm">
          <p className="font-semibold text-zinc-900 mb-1">{data.client.name}</p>
          <p className="text-zinc-600">{data.client.address}</p>
          <p className="text-zinc-600">{data.client.city}</p>
          <p className="text-zinc-600 mt-1">{data.client.email}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-zinc-900">
              <th className="text-left py-3 text-xs uppercase tracking-wider text-zinc-900 font-bold">Description</th>
              <th className="text-right py-3 text-xs uppercase tracking-wider text-zinc-900 font-bold w-20">Qty</th>
              <th className="text-right py-3 text-xs uppercase tracking-wider text-zinc-900 font-bold w-32">Rate</th>
              <th className="text-right py-3 text-xs uppercase tracking-wider text-zinc-900 font-bold w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="border-b border-zinc-200">
                <td className="py-3 text-sm text-zinc-900">{item.description}</td>
                <td className="py-3 text-sm text-right text-zinc-600">{item.quantity}</td>
                <td className="py-3 text-sm text-right text-zinc-600">
                  <CurrencyDisplay amount={item.rate} currency={data.currency} />
                </td>
                <td className="py-3 text-sm text-right text-zinc-900 font-medium">
                  <CurrencyDisplay amount={item.amount} currency={data.currency} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-80">
          <div className="flex justify-between py-2 text-sm border-b border-zinc-200">
            <span className="text-zinc-600">Subtotal</span>
            <span className="text-zinc-900"><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
          </div>
          <div className="flex justify-between py-2 text-sm border-b border-zinc-200">
            <span className="text-zinc-600">Tax</span>
            <span className="text-zinc-900"><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
          </div>
          <div className="flex justify-between py-3 text-lg font-bold border-t-4 border-zinc-900 mt-2">
            <span className="text-zinc-900">TOTAL</span>
            <span className="text-zinc-900"><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {data.notes && (
        <div className="mb-6 pl-4 border-l-2 border-zinc-300">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Notes</p>
          <p className="text-sm text-zinc-600">{data.notes}</p>
        </div>
      )}
      {data.terms && (
        <div className="pl-4 border-l-2 border-zinc-300">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Terms</p>
          <p className="text-sm text-zinc-600">{data.terms}</p>
        </div>
      )}
    </div>
  )
}

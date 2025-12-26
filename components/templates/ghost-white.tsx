// ============================================================================
// GHOST WHITE TEMPLATE - Ultra Minimal Stripe-Inspired
// ============================================================================

import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const GhostWhite: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white p-16 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Ultra Minimal Header */}
      <div className="flex justify-between items-start mb-20">
        <div>
          {data.company.logo && (
            <div className="mb-6">
              <TemplateLogo logo={data.company.logo} companyName={data.company.name} size="md" />
            </div>
          )}
          <h1 className="text-xl font-medium text-black mb-4">{data.company.name}</h1>
          <div className="text-sm text-zinc-600 space-y-0.5">
            <p>{data.company.address}</p>
            <p>{data.company.city}</p>
            <p className="mt-2">{data.company.email}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-5xl font-light text-black mb-4">Invoice</h2>
          <div className="text-sm text-zinc-600 space-y-1">
            <p className="font-medium text-black">#{data.invoiceNumber}</p>
            <p className="mt-3">{data.date}</p>
            <p>Due {data.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Bill To - Minimal */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-3">Bill To</p>
        <div className="text-sm text-zinc-900">
          <p className="font-medium text-base mb-1">{data.client.name}</p>
          <p className="text-zinc-600">{data.client.address}</p>
          <p className="text-zinc-600">{data.client.city}</p>
          <p className="text-zinc-600 mt-1">{data.client.email}</p>
        </div>
      </div>

      {/* Items - Ultra Clean Table */}
      <div className="mb-16">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-4 text-xs uppercase tracking-widest text-zinc-400 font-medium">Description</th>
              <th className="text-right py-4 text-xs uppercase tracking-widest text-zinc-400 font-medium w-20">Qty</th>
              <th className="text-right py-4 text-xs uppercase tracking-widest text-zinc-400 font-medium w-32">Rate</th>
              <th className="text-right py-4 text-xs uppercase tracking-widest text-zinc-400 font-medium w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="border-b border-zinc-100">
                <td className="py-4 text-sm text-zinc-900">{item.description}</td>
                <td className="py-4 text-sm text-right text-zinc-600">{item.quantity}</td>
                <td className="py-4 text-sm text-right text-zinc-600">
                  <CurrencyDisplay amount={item.rate} currency={data.currency} />
                </td>
                <td className="py-4 text-sm text-right text-black font-medium">
                  <CurrencyDisplay amount={item.amount} currency={data.currency} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals - Minimal */}
      <div className="flex justify-end mb-16">
        <div className="w-80">
          <div className="flex justify-between py-3 text-sm border-b border-zinc-100">
            <span className="text-zinc-600">Subtotal</span>
            <span className="text-black"><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
          </div>
          <div className="flex justify-between py-3 text-sm border-b border-zinc-100">
            <span className="text-zinc-600">Tax</span>
            <span className="text-black"><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
          </div>
          <div className="flex justify-between py-4 text-lg font-medium border-t-2 border-black mt-2">
            <span className="text-black">Total</span>
            <span className="text-black"><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
          </div>
        </div>
      </div>

      {/* Notes - Minimal */}
      {data.notes && (
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Notes</p>
          <p className="text-sm text-zinc-600">{data.notes}</p>
        </div>
      )}

      {/* Terms - Minimal */}
      {data.terms && (
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Terms</p>
          <p className="text-sm text-zinc-600">{data.terms}</p>
        </div>
      )}
    </div>
  )
}

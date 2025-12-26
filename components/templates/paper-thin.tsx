// Paper Thin - Digital Paper Minimal Design
import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const PaperThin: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white p-16 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="flex justify-between items-start mb-14">
        <div>
          {data.company.logo && <div className="mb-4"><TemplateLogo logo={data.company.logo} companyName={data.company.name} size="md" /></div>}
          <h1 className="text-xl font-medium text-zinc-800">{data.company.name}</h1>
          <div className="text-sm text-zinc-500 mt-2 space-y-0.5">
            <p>{data.company.address}</p>
            <p>{data.company.city}</p>
            <p className="mt-1">{data.company.email}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-light text-zinc-800">Invoice</h2>
          <p className="text-sm text-zinc-600 mt-2">#{data.invoiceNumber}</p>
          <p className="text-sm text-zinc-500 mt-1">{data.date}</p>
          <p className="text-sm text-zinc-500">Due: {data.dueDate}</p>
        </div>
      </div>

      <div className="mb-12 p-4 bg-zinc-50 rounded">
        <p className="text-xs uppercase tracking-wider text-zinc-400 mb-2">Bill To</p>
        <p className="font-medium text-zinc-900">{data.client.name}</p>
        <p className="text-sm text-zinc-600">{data.client.address}</p>
        <p className="text-sm text-zinc-600">{data.client.city}</p>
        <p className="text-sm text-zinc-600 mt-1">{data.client.email}</p>
      </div>

      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-3 text-xs uppercase tracking-wider text-zinc-500">Description</th>
              <th className="text-right py-3 text-xs uppercase tracking-wider text-zinc-500 w-20">Qty</th>
              <th className="text-right py-3 text-xs uppercase tracking-wider text-zinc-500 w-28">Rate</th>
              <th className="text-right py-3 text-xs uppercase tracking-wider text-zinc-500 w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="border-b border-zinc-100">
                <td className="py-3 text-sm text-zinc-800">{item.description}</td>
                <td className="py-3 text-sm text-right text-zinc-600">{item.quantity}</td>
                <td className="py-3 text-sm text-right text-zinc-600"><CurrencyDisplay amount={item.rate} currency={data.currency} /></td>
                <td className="py-3 text-sm text-right text-zinc-800 font-medium"><CurrencyDisplay amount={item.amount} currency={data.currency} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-12">
        <div className="w-72">
          <div className="flex justify-between py-2 text-sm border-b border-zinc-100">
            <span className="text-zinc-600">Subtotal</span>
            <span className="text-zinc-800"><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
          </div>
          <div className="flex justify-between py-2 text-sm border-b border-zinc-100">
            <span className="text-zinc-600">Tax</span>
            <span className="text-zinc-800"><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
          </div>
          <div className="flex justify-between py-3 text-base font-medium border-t-2 border-zinc-800 mt-2">
            <span className="text-zinc-900">Total</span>
            <span className="text-zinc-900"><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
          </div>
        </div>
      </div>

      {data.notes && <div className="mb-6"><p className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Notes</p><p className="text-sm text-zinc-600">{data.notes}</p></div>}
      {data.terms && <div><p className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Terms</p><p className="text-sm text-zinc-600">{data.terms}</p></div>}
    </div>
  )
}

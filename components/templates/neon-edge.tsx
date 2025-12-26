// Neon Edge - Cyberpunk Electric Blue
import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const NeonEdge: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-slate-900 p-16 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="bg-white p-12 rounded-2xl shadow-2xl border-4 border-cyan-400">
        {/* Neon Header */}
        <div className="flex justify-between items-start mb-12 pb-6 border-b-2 border-cyan-400">
          <div>
            {data.company.logo && <div className="mb-4"><TemplateLogo logo={data.company.logo} companyName={data.company.name} size="lg" /></div>}
            <h1 className="text-2xl font-bold text-slate-900">{data.company.name}</h1>
            <div className="text-sm text-slate-600 mt-2">
              <p>{data.company.address}</p>
              <p>{data.company.city}</p>
              <p className="mt-1">{data.company.email}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-black text-cyan-500 tracking-tight">INVOICE</h2>
            <p className="text-sm font-bold text-slate-900 mt-2">#{data.invoiceNumber}</p>
            <p className="text-sm text-slate-600 mt-1">{data.date}</p>
            <p className="text-sm text-slate-600">Due: {data.dueDate}</p>
          </div>
        </div>

        {/* Bill To with Neon Accent */}
        <div className="mb-12 p-6 bg-cyan-50 rounded-xl border-l-4 border-cyan-500">
          <p className="text-xs uppercase tracking-widest text-cyan-700 font-bold mb-2">Bill To</p>
          <p className="font-bold text-slate-900 text-base">{data.client.name}</p>
          <p className="text-sm text-slate-700">{data.client.address}</p>
          <p className="text-sm text-slate-700">{data.client.city}</p>
          <p className="text-sm text-slate-700 mt-1">{data.client.email}</p>
        </div>

        {/* Items with Neon Style */}
        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-500 text-white">
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-bold">Description</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-bold w-20">Qty</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-bold w-32">Rate</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-bold w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b border-cyan-100 hover:bg-cyan-50">
                  <td className="py-3 px-4 text-sm text-slate-900">{item.description}</td>
                  <td className="py-3 px-4 text-sm text-right text-slate-700">{item.quantity}</td>
                  <td className="py-3 px-4 text-sm text-right text-slate-700"><CurrencyDisplay amount={item.rate} currency={data.currency} /></td>
                  <td className="py-3 px-4 text-sm text-right text-slate-900 font-bold"><CurrencyDisplay amount={item.amount} currency={data.currency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals with Neon Accent */}
        <div className="flex justify-end mb-12">
          <div className="w-80">
            <div className="flex justify-between py-2 text-sm border-b border-slate-200">
              <span className="text-slate-700">Subtotal</span>
              <span className="text-slate-900 font-medium"><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-slate-200">
              <span className="text-slate-700">Tax</span>
              <span className="text-slate-900 font-medium"><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-4 text-xl font-black bg-cyan-500 text-white px-4 rounded-lg mt-3">
              <span>TOTAL</span>
              <span><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
            </div>
          </div>
        </div>

        {/* Footer */}
        {data.notes && <div className="mb-6 p-4 bg-slate-50 rounded-lg"><p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Notes</p><p className="text-sm text-slate-700">{data.notes}</p></div>}
        {data.terms && <div className="p-4 bg-slate-50 rounded-lg"><p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Terms</p><p className="text-sm text-slate-700">{data.terms}</p></div>}
      </div>
    </div>
  )
}

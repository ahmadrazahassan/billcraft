// Cyber Neon - Cyberpunk Matrix Inspired
import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const CyberNeon: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-slate-950 p-16 font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
      <div className="bg-slate-900 p-12 rounded-2xl border-2 border-cyan-400 shadow-2xl shadow-cyan-500/50">
        <div className="flex justify-between items-start mb-12 pb-6 border-b-2 border-cyan-400">
          <div>
            {data.company.logo && <div className="mb-4"><TemplateLogo logo={data.company.logo} companyName={data.company.name} size="lg" /></div>}
            <h1 className="text-2xl font-bold text-cyan-400">{data.company.name}</h1>
            <div className="text-sm text-cyan-300 mt-2">
              <p>{data.company.address}</p>
              <p>{data.company.city}</p>
              <p className="mt-1">{data.company.email}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-black text-cyan-400 tracking-tight">INVOICE</h2>
            <p className="text-sm font-bold text-cyan-300 mt-2">#{data.invoiceNumber}</p>
            <p className="text-sm text-cyan-500 mt-1">{data.date}</p>
            <p className="text-sm text-cyan-500">Due: {data.dueDate}</p>
          </div>
        </div>

        <div className="mb-12 p-6 bg-cyan-950/50 rounded-xl border-2 border-cyan-500">
          <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">// BILL TO</p>
          <p className="font-bold text-cyan-300">{data.client.name}</p>
          <p className="text-sm text-cyan-400">{data.client.address}</p>
          <p className="text-sm text-cyan-400">{data.client.city}</p>
          <p className="text-sm text-cyan-400 mt-1">{data.client.email}</p>
        </div>

        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-500 text-slate-900">
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-black">Description</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-black w-20">Qty</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-black w-32">Rate</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider font-black w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b border-cyan-800">
                  <td className="py-3 px-4 text-sm text-cyan-300">{item.description}</td>
                  <td className="py-3 px-4 text-sm text-right text-cyan-400">{item.quantity}</td>
                  <td className="py-3 px-4 text-sm text-right text-cyan-400"><CurrencyDisplay amount={item.rate} currency={data.currency} /></td>
                  <td className="py-3 px-4 text-sm text-right text-cyan-300 font-bold"><CurrencyDisplay amount={item.amount} currency={data.currency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-12">
          <div className="w-80">
            <div className="flex justify-between py-2 text-sm border-b border-cyan-800">
              <span className="text-cyan-400">Subtotal</span>
              <span className="text-cyan-300"><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-cyan-800">
              <span className="text-cyan-400">Tax</span>
              <span className="text-cyan-300"><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-4 text-xl font-black bg-cyan-500 text-slate-900 px-4 rounded-lg mt-2">
              <span>TOTAL</span>
              <span><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
            </div>
          </div>
        </div>

        {data.notes && <div className="mb-6 p-4 bg-cyan-950/50 rounded-xl border border-cyan-700"><p className="text-xs uppercase tracking-widest text-cyan-400 mb-1">// NOTES</p><p className="text-sm text-cyan-400">{data.notes}</p></div>}
        {data.terms && <div className="p-4 bg-cyan-950/50 rounded-xl border border-cyan-700"><p className="text-xs uppercase tracking-widest text-cyan-400 mb-1">// TERMS</p><p className="text-sm text-cyan-400">{data.terms}</p></div>}
      </div>
    </div>
  )
}

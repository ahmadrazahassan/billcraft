// Diamond Black - Pure Luxury VIP Treatment
import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const DiamondBlack: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-zinc-50 p-16 font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>
      <div className="bg-white p-16 shadow-2xl border-t-4 border-black">
        <div className="flex justify-between items-start mb-16 pb-8 border-b-2 border-black">
          <div>
            {data.company.logo && <div className="mb-6"><TemplateLogo logo={data.company.logo} companyName={data.company.name} size="lg" /></div>}
            <h1 className="text-3xl font-bold text-black">{data.company.name}</h1>
            <div className="text-sm text-zinc-700 mt-4 space-y-1">
              <p>{data.company.address}</p>
              <p>{data.company.city}</p>
              <p className="mt-2">{data.company.email}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-bold text-black tracking-tight">INVOICE</h2>
            <p className="text-base font-bold text-black mt-4">#{data.invoiceNumber}</p>
            <p className="text-sm text-zinc-700 mt-2">{data.date}</p>
            <p className="text-sm text-zinc-700">Due: {data.dueDate}</p>
          </div>
        </div>

        <div className="mb-16 p-8 bg-zinc-50 border-l-8 border-black">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">Bill To</p>
          <p className="font-bold text-black text-lg">{data.client.name}</p>
          <p className="text-sm text-zinc-700 mt-2">{data.client.address}</p>
          <p className="text-sm text-zinc-700">{data.client.city}</p>
          <p className="text-sm text-zinc-700 mt-2">{data.client.email}</p>
        </div>

        <div className="mb-16">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold">Description</th>
                <th className="text-right py-4 px-6 text-xs uppercase tracking-widest font-bold w-24">Qty</th>
                <th className="text-right py-4 px-6 text-xs uppercase tracking-widest font-bold w-36">Rate</th>
                <th className="text-right py-4 px-6 text-xs uppercase tracking-widest font-bold w-36">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b-2 border-zinc-200">
                  <td className="py-4 px-6 text-base text-black">{item.description}</td>
                  <td className="py-4 px-6 text-base text-right text-zinc-700">{item.quantity}</td>
                  <td className="py-4 px-6 text-base text-right text-zinc-700"><CurrencyDisplay amount={item.rate} currency={data.currency} /></td>
                  <td className="py-4 px-6 text-base text-right text-black font-bold"><CurrencyDisplay amount={item.amount} currency={data.currency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-16">
          <div className="w-96">
            <div className="flex justify-between py-3 text-base border-b-2 border-zinc-300">
              <span className="text-zinc-700">Subtotal</span>
              <span className="text-black font-semibold"><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-3 text-base border-b-2 border-zinc-300">
              <span className="text-zinc-700">Tax</span>
              <span className="text-black font-semibold"><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-5 text-2xl font-bold bg-black text-white px-6 mt-4">
              <span>TOTAL</span>
              <span><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
            </div>
          </div>
        </div>

        {data.notes && <div className="mb-8 p-6 bg-zinc-50 border-l-4 border-zinc-400"><p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Notes</p><p className="text-sm text-zinc-700">{data.notes}</p></div>}
        {data.terms && <div className="p-6 bg-zinc-50 border-l-4 border-zinc-400"><p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Terms</p><p className="text-sm text-zinc-700">{data.terms}</p></div>}
      </div>
    </div>
  )
}

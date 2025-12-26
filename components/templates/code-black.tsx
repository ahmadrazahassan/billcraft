// Code Black - Developer Terminal Inspired
import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const CodeBlack: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-[#0D1117] p-16 font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
      <div className="bg-[#161B22] p-12 rounded-lg border border-[#30363D]">
        <div className="flex justify-between items-start mb-12 pb-6 border-b border-[#21262D]">
          <div>
            {data.company.logo && <div className="mb-4"><TemplateLogo logo={data.company.logo} companyName={data.company.name} size="md" /></div>}
            <h1 className="text-xl font-bold text-[#C9D1D9]">{data.company.name}</h1>
            <div className="text-sm text-[#8B949E] mt-2 space-y-0.5">
              <p>{data.company.address}</p>
              <p>{data.company.city}</p>
              <p className="mt-1">{data.company.email}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-[#58A6FF]">INVOICE</h2>
            <p className="text-sm text-[#C9D1D9] mt-2">#{data.invoiceNumber}</p>
            <p className="text-sm text-[#8B949E] mt-1">{data.date}</p>
            <p className="text-sm text-[#8B949E]">Due: {data.dueDate}</p>
          </div>
        </div>

        <div className="mb-12 p-4 bg-[#0D1117] rounded border border-[#30363D]">
          <p className="text-xs uppercase tracking-wider text-[#58A6FF] mb-2">// BILL TO</p>
          <p className="font-semibold text-[#C9D1D9]">{data.client.name}</p>
          <p className="text-sm text-[#8B949E]">{data.client.address}</p>
          <p className="text-sm text-[#8B949E]">{data.client.city}</p>
          <p className="text-sm text-[#8B949E] mt-1">{data.client.email}</p>
        </div>

        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#238636]">
                <th className="text-left py-3 text-xs uppercase tracking-wider text-[#238636] font-bold">Description</th>
                <th className="text-right py-3 text-xs uppercase tracking-wider text-[#238636] font-bold w-20">Qty</th>
                <th className="text-right py-3 text-xs uppercase tracking-wider text-[#238636] font-bold w-32">Rate</th>
                <th className="text-right py-3 text-xs uppercase tracking-wider text-[#238636] font-bold w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b border-[#21262D]">
                  <td className="py-3 text-sm text-[#C9D1D9]">{item.description}</td>
                  <td className="py-3 text-sm text-right text-[#8B949E]">{item.quantity}</td>
                  <td className="py-3 text-sm text-right text-[#8B949E]"><CurrencyDisplay amount={item.rate} currency={data.currency} /></td>
                  <td className="py-3 text-sm text-right text-[#C9D1D9] font-bold"><CurrencyDisplay amount={item.amount} currency={data.currency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-12">
          <div className="w-80">
            <div className="flex justify-between py-2 text-sm border-b border-[#21262D]">
              <span className="text-[#8B949E]">Subtotal</span>
              <span className="text-[#C9D1D9]"><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-[#21262D]">
              <span className="text-[#8B949E]">Tax</span>
              <span className="text-[#C9D1D9]"><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold bg-[#238636] text-white px-4 rounded mt-2">
              <span>TOTAL</span>
              <span><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
            </div>
          </div>
        </div>

        {data.notes && <div className="mb-6 p-4 bg-[#0D1117] rounded border border-[#30363D]"><p className="text-xs uppercase tracking-wider text-[#58A6FF] mb-1">// NOTES</p><p className="text-sm text-[#8B949E]">{data.notes}</p></div>}
        {data.terms && <div className="p-4 bg-[#0D1117] rounded border border-[#30363D]"><p className="text-xs uppercase tracking-wider text-[#58A6FF] mb-1">// TERMS</p><p className="text-sm text-[#8B949E]">{data.terms}</p></div>}
      </div>
    </div>
  )
}

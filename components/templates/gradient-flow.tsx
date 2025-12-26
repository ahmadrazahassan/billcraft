// Gradient Flow - Smooth Gradients Fluid Design
import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

export const GradientFlow: React.FC<{ data: InvoiceData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 p-16 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="bg-white p-12 rounded-3xl shadow-xl">
        <div className="flex justify-between items-start mb-12">
          <div>
            {data.company.logo && <div className="mb-4"><TemplateLogo logo={data.company.logo} companyName={data.company.name} size="lg" /></div>}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{data.company.name}</h1>
            <div className="text-sm text-gray-600 mt-2">
              <p>{data.company.address}</p>
              <p>{data.company.city}</p>
              <p className="mt-1">{data.company.email}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">INVOICE</h2>
            <p className="text-sm font-semibold text-gray-900 mt-2">#{data.invoiceNumber}</p>
            <p className="text-sm text-gray-600 mt-1">{data.date}</p>
            <p className="text-sm text-gray-600">Due: {data.dueDate}</p>
          </div>
        </div>

        <div className="mb-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
          <p className="text-xs uppercase tracking-wider text-purple-700 font-semibold mb-2">Bill To</p>
          <p className="font-semibold text-gray-900">{data.client.name}</p>
          <p className="text-sm text-gray-700">{data.client.address}</p>
          <p className="text-sm text-gray-700">{data.client.city}</p>
          <p className="text-sm text-gray-700 mt-1">{data.client.email}</p>
        </div>

        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-purple-900 font-bold rounded-tl-xl">Description</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-purple-900 font-bold w-20">Qty</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-purple-900 font-bold w-32">Rate</th>
                <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-purple-900 font-bold w-32 rounded-tr-xl">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{item.description}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-700">{item.quantity}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-700"><CurrencyDisplay amount={item.rate} currency={data.currency} /></td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900 font-semibold"><CurrencyDisplay amount={item.amount} currency={data.currency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-12">
          <div className="w-80">
            <div className="flex justify-between py-2 text-sm border-b border-gray-200">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-900"><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-gray-200">
              <span className="text-gray-700">Tax</span>
              <span className="text-gray-900"><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 rounded-xl mt-2">
              <span>TOTAL</span>
              <span><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
            </div>
          </div>
        </div>

        {data.notes && <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"><p className="text-xs uppercase tracking-wider text-purple-700 mb-1">Notes</p><p className="text-sm text-gray-700">{data.notes}</p></div>}
        {data.terms && <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"><p className="text-xs uppercase tracking-wider text-purple-700 mb-1">Terms</p><p className="text-sm text-gray-700">{data.terms}</p></div>}
      </div>
    </div>
  )
}

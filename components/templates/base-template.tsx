// ============================================================================
// BASE TEMPLATE SYSTEM
// ============================================================================
// Shared components and layouts for all 25 templates
// Ensures consistency and maintainability
// ============================================================================

import React from 'react'
import { InvoiceData, CurrencyDisplay, TemplateLogo } from './template-utils'

// ============================================================================
// SHARED LAYOUT COMPONENTS
// ============================================================================

interface SectionProps {
  children: React.ReactNode
  className?: string
}

export const Section: React.FC<SectionProps> = ({ children, className = '' }) => (
  <div className={`mb-8 ${className}`}>{children}</div>
)

export const SectionTitle: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ 
  children, 
  className = '',
  style
}) => (
  <h3 className={`font-semibold text-sm uppercase tracking-wider mb-2 ${className}`} style={style}>{children}</h3>
)

// ============================================================================
// HEADER LAYOUTS
// ============================================================================

interface HeaderProps {
  data: InvoiceData
  primaryColor: string
  textColor: string
  layout?: 'split' | 'stacked' | 'centered'
}

export const TemplateHeader: React.FC<HeaderProps> = ({ 
  data, 
  primaryColor, 
  textColor,
  layout = 'split'
}) => {
  if (layout === 'centered') {
    return (
      <div className="text-center mb-12">
        {data.company.logo && (
          <div className="flex justify-center mb-4">
            <TemplateLogo logo={data.company.logo} companyName={data.company.name} size="xl" />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          {data.company.name}
        </h1>
        <div className="text-sm" style={{ color: textColor }}>
          <p>{data.company.address}</p>
          <p>{data.company.city}</p>
          <p className="mt-2">{data.company.email} • {data.company.phone}</p>
        </div>
      </div>
    )
  }

  if (layout === 'stacked') {
    return (
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          {data.company.logo && (
            <TemplateLogo logo={data.company.logo} companyName={data.company.name} size="lg" />
          )}
          <div>
            <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
              {data.company.name}
            </h1>
          </div>
        </div>
        <div className="text-sm" style={{ color: textColor }}>
          <p>{data.company.address}</p>
          <p>{data.company.city}</p>
          <p className="mt-1">{data.company.email} • {data.company.phone}</p>
        </div>
      </div>
    )
  }

  // Default 'split' layout
  return (
    <div className="flex justify-between items-start mb-12">
      <div>
        {data.company.logo && (
          <div className="mb-4">
            <TemplateLogo logo={data.company.logo} companyName={data.company.name} size="lg" />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
          {data.company.name}
        </h1>
        <div className="text-sm" style={{ color: textColor }}>
          <p>{data.company.address}</p>
          <p>{data.company.city}</p>
          <p className="mt-1">{data.company.email}</p>
          <p>{data.company.phone}</p>
        </div>
      </div>
      <div className="text-right">
        <h2 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          INVOICE
        </h2>
        <div className="text-sm" style={{ color: textColor }}>
          <p className="font-medium">#{data.invoiceNumber}</p>
          <p className="mt-2">Date: {data.date}</p>
          <p>Due: {data.dueDate}</p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// BILL TO SECTION
// ============================================================================

interface BillToProps {
  data: InvoiceData
  textColor: string
  borderColor: string
  accentColor?: string
}

export const BillToSection: React.FC<BillToProps> = ({ 
  data, 
  textColor, 
  borderColor,
  accentColor 
}) => (
  <div className="mb-8 p-4 rounded" style={{ 
    borderLeft: accentColor ? `4px solid ${accentColor}` : `1px solid ${borderColor}`,
    backgroundColor: '#FAFAFA'
  }}>
    <SectionTitle className="text-xs" style={{ color: textColor }}>
      BILL TO
    </SectionTitle>
    <div style={{ color: textColor }}>
      <p className="font-semibold text-base mb-1">{data.client.name}</p>
      <p className="text-sm">{data.client.address}</p>
      <p className="text-sm">{data.client.city}</p>
      <p className="text-sm mt-1">{data.client.email}</p>
    </div>
  </div>
)

// ============================================================================
// ITEMS TABLE
// ============================================================================

interface ItemsTableProps {
  data: InvoiceData
  primaryColor: string
  textColor: string
  borderColor: string
  headerBg?: string
}

export const ItemsTable: React.FC<ItemsTableProps> = ({ 
  data, 
  primaryColor, 
  textColor, 
  borderColor,
  headerBg = '#F9FAFB'
}) => (
  <div className="mb-8">
    <table className="w-full">
      <thead>
        <tr style={{ backgroundColor: headerBg, borderBottom: `2px solid ${borderColor}` }}>
          <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" 
              style={{ color: primaryColor }}>
            Description
          </th>
          <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wide" 
              style={{ color: primaryColor }}>
            Qty
          </th>
          <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wide" 
              style={{ color: primaryColor }}>
            Rate
          </th>
          <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wide" 
              style={{ color: primaryColor }}>
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {data.items.map((item, index) => (
          <tr key={index} style={{ borderBottom: `1px solid ${borderColor}` }}>
            <td className="py-3 px-4 text-sm" style={{ color: textColor }}>
              {item.description}
            </td>
            <td className="py-3 px-4 text-sm text-right" style={{ color: textColor }}>
              {item.quantity}
            </td>
            <td className="py-3 px-4 text-sm text-right" style={{ color: textColor }}>
              <CurrencyDisplay amount={item.rate} currency={data.currency} />
            </td>
            <td className="py-3 px-4 text-sm text-right font-medium" style={{ color: textColor }}>
              <CurrencyDisplay amount={item.amount} currency={data.currency} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ============================================================================
// TOTALS SECTION
// ============================================================================

interface TotalsProps {
  data: InvoiceData
  primaryColor: string
  textColor: string
  borderColor: string
  accentColor?: string
}

export const TotalsSection: React.FC<TotalsProps> = ({ 
  data, 
  primaryColor, 
  textColor, 
  borderColor,
  accentColor 
}) => (
  <div className="flex justify-end mb-8">
    <div className="w-80">
      <div className="flex justify-between py-2 text-sm" style={{ 
        borderBottom: `1px solid ${borderColor}`,
        color: textColor 
      }}>
        <span>Subtotal</span>
        <span><CurrencyDisplay amount={data.subtotal} currency={data.currency} /></span>
      </div>
      <div className="flex justify-between py-2 text-sm" style={{ 
        borderBottom: `1px solid ${borderColor}`,
        color: textColor 
      }}>
        <span>Tax</span>
        <span><CurrencyDisplay amount={data.tax} currency={data.currency} /></span>
      </div>
      <div className="flex justify-between py-3 text-lg font-bold" style={{ 
        borderTop: `2px solid ${accentColor || primaryColor}`,
        color: primaryColor,
        marginTop: '4px'
      }}>
        <span>TOTAL</span>
        <span><CurrencyDisplay amount={data.total} currency={data.currency} /></span>
      </div>
    </div>
  </div>
)

// ============================================================================
// FOOTER NOTES
// ============================================================================

interface FooterProps {
  data: InvoiceData
  textColor: string
  borderColor: string
}

export const FooterNotes: React.FC<FooterProps> = ({ data, textColor, borderColor }) => (
  <>
    {data.notes && (
      <div className="mb-6 p-4 rounded" style={{ 
        backgroundColor: '#F9FAFB',
        border: `1px solid ${borderColor}`
      }}>
        <SectionTitle style={{ color: textColor }}>Notes</SectionTitle>
        <p className="text-sm" style={{ color: textColor }}>{data.notes}</p>
      </div>
    )}
    {data.terms && (
      <div className="p-4 rounded" style={{ 
        backgroundColor: '#F9FAFB',
        border: `1px solid ${borderColor}`
      }}>
        <SectionTitle style={{ color: textColor }}>Terms & Conditions</SectionTitle>
        <p className="text-sm" style={{ color: textColor }}>{data.terms}</p>
      </div>
    )}
  </>
)

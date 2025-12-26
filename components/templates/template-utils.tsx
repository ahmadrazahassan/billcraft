// Template utility functions and types for invoice templates

// Standard invoice data interface for all templates
export interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  currency: string
  company: {
    name: string
    address: string
    city: string
    phone: string
    email: string
    website?: string
    logo?: string
  }
  client: {
    name: string
    address: string
    city: string
    email: string
  }
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  subtotal: number
  tax: number
  total: number
  notes?: string
  terms?: string
}

// Currency symbol helper
export const getCurrencySymbol = (currencyCode: string): string => {
  const currencyMap: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'PKR': '₨',
    'INR': '₹',
  }
  return currencyMap[currencyCode] || '$'
}

// Professional logo component for clean PNG display
interface LogoProps {
  logo?: string
  companyName: string
  fallbackIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const TemplateLogo: React.FC<LogoProps> = ({ 
  logo, 
  companyName, 
  fallbackIcon, 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  if (logo) {
    return (
      <div className={`${sizeClasses[size]} flex items-center justify-center overflow-hidden ${className}`}>
        <img 
          src={logo} 
          alt={`${companyName} logo`}
          className="w-full h-full object-contain"
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            backgroundColor: 'transparent',
            filter: 'none' // Ensure no filters are applied
          }}
        />
      </div>
    )
  }

  return fallbackIcon ? (
    <div className={className}>
      {fallbackIcon}
    </div>
  ) : null
}

// Currency display component
interface CurrencyDisplayProps {
  amount: number
  currency: string
  className?: string
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ 
  amount, 
  currency, 
  className = '' 
}) => {
  const symbol = getCurrencySymbol(currency)
  return (
    <span className={className}>
      {symbol}{amount.toFixed(2)}
    </span>
  )
}

/**
 * Enterprise-grade URL Builder Service
 * Follows patterns from Stripe, Vercel, Linear, and other top SaaS companies
 * Provides comprehensive tracking, analytics, and state management through URLs
 */

export interface URLParams {
  // Core parameters
  source?: string
  medium?: string
  campaign?: string
  
  // Plan & billing
  plan?: 'free' | 'professional' | 'enterprise'
  billing?: 'monthly' | 'yearly'
  price?: string
  currency?: string
  trial?: string
  trial_days?: string
  
  // Navigation & flow
  return_url?: string
  cancel_url?: string
  redirect?: string
  next?: string
  
  // Feature flags & experiments
  feature?: string
  variant?: string
  experiment?: string
  
  // User context
  email?: string
  name?: string
  company?: string
  
  // Tracking & analytics
  ref?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  
  // Session & state
  session_id?: string
  state?: string
  nonce?: string
  
  // Custom metadata
  [key: string]: string | undefined
}

/**
 * Build a comprehensive URL with query parameters
 */
export function buildURL(basePath: string, params: URLParams = {}): string {
  const searchParams = new URLSearchParams()
  
  // Add all defined parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value)
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `${basePath}?${queryString}` : basePath
}

/**
 * Build signup URL with comprehensive tracking
 */
export function buildSignupURL(params: {
  plan?: 'free' | 'professional' | 'enterprise'
  billing?: 'monthly' | 'yearly'
  trial?: boolean
  source?: string
  ref?: string
  email?: string
  returnUrl?: string
}): string {
  const urlParams: URLParams = {
    plan: params.plan || 'free',
    billing: params.billing || 'monthly',
    trial: params.trial ? 'true' : undefined,
    trial_days: params.trial ? '90' : undefined,
    source: params.source,
    ref: params.ref,
    email: params.email,
    return_url: params.returnUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
    cancel_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/pricing`,
    currency: 'USD',
    timestamp: new Date().getTime().toString()
  }
  
  return buildURL('/auth/signup', urlParams)
}

/**
 * Build login URL with return path
 */
export function buildLoginURL(params: {
  returnUrl?: string
  source?: string
  email?: string
  ref?: string
} = {}): string {
  const urlParams: URLParams = {
    return_url: params.returnUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
    source: params.source,
    email: params.email,
    ref: params.ref,
    timestamp: new Date().getTime().toString()
  }
  
  return buildURL('/auth/login', urlParams)
}

/**
 * Build checkout URL with full plan details
 */
export function buildCheckoutURL(params: {
  plan: 'free' | 'professional' | 'enterprise'
  billing: 'monthly' | 'yearly'
  price: number
  trial?: boolean
  source?: string
}): string {
  const urlParams: URLParams = {
    plan: params.plan,
    billing: params.billing,
    trial: params.trial ? 'true' : 'false',
    trial_days: params.trial ? '90' : '0',
    price: params.price.toString(),
    currency: 'USD',
    source: params.source || 'dashboard',
    return_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
    cancel_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/pricing`,
    timestamp: new Date().getTime().toString()
  }
  
  return buildURL('/api/checkout', urlParams)
}

/**
 * Build dashboard navigation URL with tracking
 */
export function buildDashboardURL(params: {
  path: string
  source?: string
  action?: string
  ref?: string
}): string {
  const urlParams: URLParams = {
    source: params.source,
    action: params.action,
    ref: params.ref,
    timestamp: new Date().getTime().toString()
  }
  
  return buildURL(`/dashboard${params.path}`, urlParams)
}

/**
 * Build pricing page URL with pre-selected plan
 */
export function buildPricingURL(params: {
  plan?: 'free' | 'professional' | 'enterprise'
  billing?: 'monthly' | 'yearly'
  source?: string
  highlight?: string
}): string {
  const urlParams: URLParams = {
    plan: params.plan,
    billing: params.billing,
    source: params.source,
    highlight: params.highlight,
    timestamp: new Date().getTime().toString()
  }
  
  return buildURL('/pricing', urlParams)
}

/**
 * Parse URL parameters from current location
 */
export function parseURLParams(searchParams: URLSearchParams): URLParams {
  const params: URLParams = {}
  
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return params
}

/**
 * Get current origin (works on server and client)
 */
export function getOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}

/**
 * Build UTM tracking URL
 */
export function buildUTMURL(basePath: string, params: {
  source: string
  medium: string
  campaign: string
  content?: string
  term?: string
}): string {
  const urlParams: URLParams = {
    utm_source: params.source,
    utm_medium: params.medium,
    utm_campaign: params.campaign,
    utm_content: params.content,
    utm_term: params.term
  }
  
  return buildURL(basePath, urlParams)
}

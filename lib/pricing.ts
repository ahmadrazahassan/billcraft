// Pricing Plans Configuration and Management
export interface PricingPlan {
  id: string
  name: string
  displayName: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  yearlyDiscount: number
  features: string[]
  limits: {
    invoices: number | 'unlimited'
    clients: number | 'unlimited'
    teamMembers: number | 'unlimited'
    storage: string
    integrations: number | 'unlimited'
  }
  stripePriceId: {
    monthly: string
    yearly: string
  }
  popular: boolean
  enterprise: boolean
  trialDays: number
}

export const PRICING_PLANS: Record<string, PricingPlan> = {
  free: {
    id: 'free',
    name: 'free',
    displayName: 'Free Trial',
    description: 'Perfect for freelancers just getting started. Try all professional features completely free for 3 months.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyDiscount: 0,
    features: [
      'All Professional features included',
      'Unlimited invoices & clients',
      'AI-powered automation',
      '25+ Beautiful templates',
      'Payment integrations',
      'Team collaboration (up to 5 users)',
      'Priority email support',
      'No credit card required'
    ],
    limits: {
      invoices: 'unlimited',
      clients: 'unlimited',
      teamMembers: 5,
      storage: '10GB',
      integrations: 'unlimited'
    },
    stripePriceId: {
      monthly: '',
      yearly: ''
    },
    popular: false,
    enterprise: false,
    trialDays: 90 // 3 months
  },
  professional: {
    id: 'professional',
    name: 'professional',
    displayName: 'Professional',
    description: 'Best for growing businesses that need advanced features, AI automation, and team collaboration.',
    monthlyPrice: 10,
    yearlyPrice: 7,
    yearlyDiscount: 30,
    features: [
      'Unlimited invoices & clients',
      'AI-powered form filling & automation',
      'Custom branding & 25+ templates',
      'Multi-currency support (50+ currencies)',
      'Advanced analytics & reports',
      'Payment integration (Stripe, PayPal)',
      'Automated reminders & follow-ups',
      'Team collaboration (up to 5 users)',
      'Priority email support',
      'Invoice approval workflow'
    ],
    limits: {
      invoices: 'unlimited',
      clients: 'unlimited',
      teamMembers: 5,
      storage: '100GB',
      integrations: 'unlimited'
    },
    stripePriceId: {
      monthly: 'price_professional_monthly', // Replace with actual Stripe price IDs
      yearly: 'price_professional_yearly'
    },
    popular: true,
    enterprise: false,
    trialDays: 90 // 3 months
  },
  enterprise: {
    id: 'enterprise',
    name: 'enterprise',
    displayName: 'Enterprise',
    description: 'For large teams and enterprises that need advanced security, integrations, and dedicated support.',
    monthlyPrice: 20,
    yearlyPrice: 15,
    yearlyDiscount: 25,
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Advanced roles & permissions',
      'API access & webhooks',
      'SSO integration (SAML, OAuth)',
      'Advanced security & compliance',
      'Custom integrations & white-label',
      'Dedicated account manager',
      'Advanced reporting & analytics',
      '24/7 priority support',
      'Custom training & onboarding',
      'SLA guarantee'
    ],
    limits: {
      invoices: 'unlimited',
      clients: 'unlimited',
      teamMembers: 'unlimited',
      storage: '1TB',
      integrations: 'unlimited'
    },
    stripePriceId: {
      monthly: 'price_enterprise_monthly', // Replace with actual Stripe price IDs
      yearly: 'price_enterprise_yearly'
    },
    popular: false,
    enterprise: true,
    trialDays: 90 // 3 months
  }
}

export interface SubscriptionDetails {
  planId: string
  interval: 'monthly' | 'yearly'
  status: 'trial' | 'active' | 'canceled' | 'past_due' | 'expired'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  trialEnd?: Date
  cancelAtPeriodEnd: boolean
  stripeSubscriptionId?: string
  stripeCustomerId?: string
}

export class PricingService {
  static getPlan(planId: string): PricingPlan | null {
    return PRICING_PLANS[planId] || null
  }

  static getAllPlans(): PricingPlan[] {
    return Object.values(PRICING_PLANS)
  }

  static getPublicPlans(): PricingPlan[] {
    return Object.values(PRICING_PLANS).filter(plan => !plan.enterprise || plan.id === 'enterprise')
  }

  static calculateYearlySavings(planId: string): number {
    const plan = this.getPlan(planId)
    if (!plan) return 0
    
    const monthlyTotal = plan.monthlyPrice * 12
    const yearlyTotal = plan.yearlyPrice * 12
    return monthlyTotal - yearlyTotal
  }

  static formatPrice(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }

  static generateCheckoutUrl(planId: string, interval: 'monthly' | 'yearly', userId: string): string {
    const plan = this.getPlan(planId)
    if (!plan) throw new Error(`Plan ${planId} not found`)

    // For enterprise plans, redirect to contact
    if (plan.enterprise && planId === 'enterprise') {
      return `/contact?plan=enterprise&interval=${interval}&userId=${userId}`
    }

    // For free plan, redirect to signup with trial
    if (planId === 'free') {
      return `/auth/signup?plan=free&trial=true&userId=${userId}`
    }

    // For paid plans, create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/api/checkout/create-session?planId=${planId}&interval=${interval}&userId=${userId}`
  }

  static generateManageUrl(customerId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/api/billing/create-portal-session?customerId=${customerId}`
  }

  static isTrialActive(subscription: SubscriptionDetails): boolean {
    if (!subscription.trialEnd) return false
    return new Date() < subscription.trialEnd && subscription.status === 'trial'
  }

  static getTrialDaysRemaining(subscription: SubscriptionDetails): number {
    if (!this.isTrialActive(subscription)) return 0
    
    const now = new Date()
    const trialEnd = subscription.trialEnd!
    const diffTime = trialEnd.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return Math.max(0, diffDays)
  }

  static canAccessFeature(userPlan: string, feature: string): boolean {
    const plan = this.getPlan(userPlan)
    if (!plan) return false
    
    // Define feature access matrix
    const featureAccess: Record<string, string[]> = {
      'ai_automation': ['professional', 'enterprise'],
      'custom_branding': ['professional', 'enterprise'],
      'api_access': ['enterprise'],
      'sso': ['enterprise'],
      'unlimited_team': ['enterprise'],
      'dedicated_support': ['enterprise'],
      'white_label': ['enterprise']
    }
    
    return featureAccess[feature]?.includes(userPlan) ?? true
  }

  static getUpgradeRecommendation(currentPlan: string, usage: any): string | null {
    if (currentPlan === 'enterprise') return null
    
    const plan = this.getPlan(currentPlan)
    if (!plan) return 'professional'
    
    // Recommend upgrade based on usage patterns
    if (usage.teamMembers > plan.limits.teamMembers) {
      return currentPlan === 'free' ? 'professional' : 'enterprise'
    }
    
    if (usage.needsApi || usage.needsSSO) {
      return 'enterprise'
    }
    
    if (currentPlan === 'free') {
      return 'professional'
    }
    
    return null
  }
}

// Export utility functions
export const {
  getPlan,
  getAllPlans,
  getPublicPlans,
  calculateYearlySavings,
  formatPrice,
  generateCheckoutUrl,
  generateManageUrl,
  isTrialActive,
  getTrialDaysRemaining,
  canAccessFeature,
  getUpgradeRecommendation
} = PricingService

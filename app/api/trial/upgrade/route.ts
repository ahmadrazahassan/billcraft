import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId, newPlan, paymentMethodId, promoCode } = await request.json()

    // Validate required fields
    if (!userId || !newPlan) {
      return NextResponse.json(
        { error: 'User ID and plan are required' },
        { status: 400 }
      )
    }

    // Validate plan type
    const validPlans = ['professional', 'enterprise']
    const planPricing = {
      professional: { price: 15, features: 'All Professional features' },
      enterprise: { price: 49, features: 'All Enterprise features' }
    }

    if (!validPlans.includes(newPlan)) {
      return NextResponse.json(
        { error: 'Invalid plan type. Valid plans: professional, enterprise' },
        { status: 400 }
      )
    }

    // Apply promo code discount if provided
    let discount = 0
    let finalPrice = planPricing[newPlan as keyof typeof planPricing].price

    if (promoCode) {
      const validPromoCodes: { [key: string]: number } = {
        'WELCOME30': 0.3,  // 30% off
        'FIRSTMONTH': 1.0, // 100% off first month
        'SAVE20': 0.2      // 20% off
      }

      if (validPromoCodes[promoCode]) {
        discount = validPromoCodes[promoCode]
        finalPrice = finalPrice * (1 - discount)
      }
    }

    // Simulate payment processing
    const paymentResult = await processPayment({
      userId,
      amount: finalPrice,
      paymentMethodId,
      plan: newPlan,
      currency: 'USD'
    })

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: 'Payment processing failed', details: paymentResult.error },
        { status: 400 }
      )
    }

    // Create subscription record
    const subscription = {
      userId: userId,
      plan: newPlan,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      price: finalPrice,
      originalPrice: planPricing[newPlan as keyof typeof planPricing].price,
      discount: discount,
      promoCode: promoCode || null,
      paymentMethodId: paymentMethodId,
      features: getFeaturesByPlan(newPlan),
      trialUpgrade: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // End trial period
    const trialEnd = {
      userId: userId,
      status: 'converted',
      endedAt: new Date().toISOString(),
      convertedToPlan: newPlan,
      finalTrialUsage: {
        invoicesCreated: 25,
        customersAdded: 12,
        paymentsProcessed: 8
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully upgraded to ${newPlan} plan!`,
      subscription: subscription,
      trialEnd: trialEnd,
      payment: {
        transactionId: paymentResult.transactionId,
        amount: finalPrice,
        currency: 'USD',
        status: 'completed'
      },
      nextBillingDate: subscription.endDate,
      welcome: {
        message: "Welcome to BillCraft Pro! Your trial has been converted to a paid subscription.",
        features: getFeaturesByPlan(newPlan)
      }
    })

  } catch (error: any) {
    console.error('Trial upgrade error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to upgrade trial. Please try again.',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// GET endpoint for upgrade options and pricing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const currentPlan = searchParams.get('currentPlan') || 'professional'

    const upgradeOptions = {
      professional: {
        price: 15,
        originalPrice: 15,
        features: [
          'Unlimited invoices',
          'Advanced automation',
          'Custom branding',
          'Multi-currency support',
          'Advanced analytics',
          'Priority support',
          'Team collaboration (up to 3 users)',
          'Payment integrations'
        ],
        savings: '90 days of free access during trial',
        popular: true
      },
      enterprise: {
        price: 49,
        originalPrice: 49,
        features: [
          'Everything in Professional',
          'Unlimited team members',
          'API access & webhooks',
          'SSO integration',
          'Advanced security',
          'Dedicated support',
          'White-label solution',
          'Custom integrations'
        ],
        savings: '90 days of free access during trial',
        popular: false
      }
    }

    const promoCodes = [
      {
        code: 'WELCOME30',
        discount: 30,
        description: '30% off your first month',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        code: 'FIRSTMONTH',
        discount: 100,
        description: 'First month completely free',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    return NextResponse.json({
      upgradeOptions,
      promoCodes,
      trialValue: {
        message: "You've saved $45+ during your 3-month trial!",
        estimatedSavings: currentPlan === 'professional' ? 45 : 147
      },
      urgency: {
        daysLeft: 7, // This would be calculated from actual trial data
        message: "Your trial ends soon. Upgrade now to keep all your data and settings."
      }
    })

  } catch (error: any) {
    console.error('Upgrade options error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch upgrade options',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// Payment result type
interface PaymentResult {
  success: boolean
  transactionId?: string
  message?: string
  error?: string
}

// Helper function to simulate payment processing
async function processPayment(paymentData: any): Promise<PaymentResult> {
  // In a real implementation, integrate with Stripe, PayPal, etc.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `txn_${Date.now()}`,
        message: 'Payment processed successfully'
      })
    }, 1000)
  })
}

// Helper function to get features by plan
function getFeaturesByPlan(plan: string) {
  const features = {
    professional: {
      unlimitedInvoices: true,
      advancedAutomation: true,
      customBranding: true,
      multiCurrency: true,
      analytics: true,
      prioritySupport: true,
      teamCollaboration: true,
      apiAccess: false,
      ssoIntegration: false,
      whiteLabel: false,
      maxUsers: 3
    },
    enterprise: {
      unlimitedInvoices: true,
      advancedAutomation: true,
      customBranding: true,
      multiCurrency: true,
      analytics: true,
      prioritySupport: true,
      teamCollaboration: true,
      apiAccess: true,
      ssoIntegration: true,
      whiteLabel: true,
      maxUsers: -1 // unlimited
    }
  }

  return features[plan as keyof typeof features] || features.professional
} 
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { PricingService } from '@/lib/pricing'

export async function POST(request: NextRequest) {
  try {
    const { planId, interval, userId, returnUrl } = await request.json()

    // Validate required parameters
    if (!planId || !interval || !userId) {
      return NextResponse.json(
        { error: 'Missing required parameters: planId, interval, userId' },
        { status: 400 }
      )
    }

    // Get the plan details
    const plan = PricingService.getPlan(planId)
    if (!plan) {
      return NextResponse.json(
        { error: `Plan ${planId} not found` },
        { status: 404 }
      )
    }

    // Handle free plan (redirect to signup)
    if (planId === 'free') {
      const signupUrl = `/auth/signup?plan=free&trial=true&userId=${userId}`
      return NextResponse.json({ url: signupUrl })
    }

    // Handle enterprise plan (redirect to contact)
    if (plan.enterprise && planId === 'enterprise') {
      const contactUrl = `/contact?plan=enterprise&interval=${interval}&userId=${userId}`
      return NextResponse.json({ url: contactUrl })
    }

    // For paid plans, we would normally create a Stripe checkout session
    // This is a simplified version - in production, you'd integrate with Stripe
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = returnUrl || `${baseUrl}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/pricing`

    // Mock checkout session response
    // In production, replace this with actual Stripe integration:
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: userEmail,
      line_items: [{
        price: plan.stripePriceId[interval],
        quantity: 1,
      }],
      subscription_data: {
        trial_period_days: plan.trialDays,
        metadata: {
          userId,
          planId,
          interval
        }
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        planId,
        interval
      }
    })
    return NextResponse.json({ url: session.url })
    */

    // Mock response for demonstration
    const mockCheckoutUrl = `${baseUrl}/checkout/demo?planId=${planId}&interval=${interval}&userId=${userId}&amount=${interval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice}`
    
    return NextResponse.json({ 
      url: mockCheckoutUrl,
      sessionId: `cs_test_${Date.now()}`,
      plan: {
        id: planId,
        name: plan.displayName,
        price: interval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice,
        interval,
        trialDays: plan.trialDays
      }
    })

  } catch (error) {
    console.error('Checkout session creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const planId = searchParams.get('planId')
  const interval = searchParams.get('interval')
  const userId = searchParams.get('userId')

  if (!planId || !interval || !userId) {
    return NextResponse.redirect(new URL('/pricing?error=missing_params', request.url))
  }

  try {
    const checkoutUrl = PricingService.generateCheckoutUrl(planId, interval as 'monthly' | 'yearly', userId)
    return NextResponse.redirect(new URL(checkoutUrl, request.url))
  } catch (error) {
    console.error('Checkout URL generation failed:', error)
    return NextResponse.redirect(new URL('/pricing?error=checkout_failed', request.url))
  }
}

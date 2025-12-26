import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { customerId, returnUrl } = await request.json()

    // Validate required parameters
    if (!customerId) {
      return NextResponse.json(
        { error: 'Missing required parameter: customerId' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const defaultReturnUrl = `${baseUrl}/dashboard/billing`

    // In production, you would create a Stripe billing portal session:
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || defaultReturnUrl,
    })
    return NextResponse.json({ url: session.url })
    */

    // Mock response for demonstration
    const mockPortalUrl = `${baseUrl}/billing/portal/demo?customerId=${customerId}&returnUrl=${encodeURIComponent(returnUrl || defaultReturnUrl)}`
    
    return NextResponse.json({ 
      url: mockPortalUrl,
      sessionId: `bps_test_${Date.now()}`,
      customerId
    })

  } catch (error) {
    console.error('Billing portal session creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get('customerId')
  const returnUrl = searchParams.get('returnUrl')

  if (!customerId) {
    return NextResponse.redirect(new URL('/dashboard/billing?error=missing_customer', request.url))
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const portalUrl = `${baseUrl}/billing/portal/demo?customerId=${customerId}&returnUrl=${encodeURIComponent(returnUrl || `${baseUrl}/dashboard/billing`)}`
    
    return NextResponse.redirect(new URL(portalUrl, request.url))
  } catch (error) {
    console.error('Billing portal URL generation failed:', error)
    return NextResponse.redirect(new URL('/dashboard/billing?error=portal_failed', request.url))
  }
}

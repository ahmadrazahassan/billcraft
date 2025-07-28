import { NextRequest, NextResponse } from 'next/server'
import { verifyIdToken, isFirebaseAdminAvailable } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    // Check if Firebase Admin is configured
    if (!isFirebaseAdminAvailable()) {
      return NextResponse.json({
        error: 'Firebase Admin not configured',
        message: 'Trial system requires Firebase Admin SDK configuration',
        missingEnvVars: [
          'FIREBASE_PROJECT_ID',
          'FIREBASE_CLIENT_EMAIL',
          'FIREBASE_PRIVATE_KEY'
        ]
      }, { status: 503 })
    }

    // Get authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    let decodedToken
    
    try {
      decodedToken = await verifyIdToken(token)
    } catch (error: any) {
      if (error.message.includes('not configured')) {
        return NextResponse.json(
          { error: 'Firebase Admin not configured', details: error.message },
          { status: 503 }
        )
      }
      return NextResponse.json(
        { error: 'Invalid authorization token' },
        { status: 401 }
      )
    }

    const { plan = 'professional' } = await request.json()
    const userId = decodedToken.uid
    
    // Start trial (3 months from now)
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 3)

    const trialData = {
      userId: userId,
      plan: plan,
      status: 'active',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      features: {
        unlimitedInvoices: true,
        advancedAutomation: true,
        customBranding: true,
        multiCurrency: true,
        analytics: true,
        prioritySupport: true,
        teamCollaboration: plan === 'enterprise',
        apiAccess: plan === 'enterprise',
        ssoIntegration: plan === 'enterprise',
        whiteLabel: plan === 'enterprise'
      },
      usage: {
        invoicesCreated: 0,
        customersAdded: 0,
        paymentsProcessed: 0
      },
      createdAt: startDate.toISOString(),
      updatedAt: startDate.toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Trial started successfully',
      trial: trialData
    })

  } catch (error: any) {
    console.error('Trial start error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to start trial',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check if user can start a trial
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    // Check if user has already used a trial
    // In a real implementation, you would check your database
    const hasUsedTrial = false // This would be a database query

    return NextResponse.json({
      eligible: !hasUsedTrial,
      availablePlans: ['professional', 'enterprise'],
      trialDuration: '3 months',
      message: hasUsedTrial 
        ? 'User has already used their free trial'
        : 'User is eligible for a 3-month free trial'
    })

  } catch (error: any) {
    console.error('Trial eligibility check error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to check trial eligibility',
        details: error.message 
      },
      { status: 500 }
    )
  }
} 
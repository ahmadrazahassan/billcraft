import { NextRequest, NextResponse } from 'next/server'
import { verifyIdToken, getAdminAuthInstance, isFirebaseAdminAvailable } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
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

    const userId = decodedToken.uid

    // Get user creation date from Firebase Auth
    let userCreationDate = new Date()
    
    try {
      const adminAuth = getAdminAuthInstance()
      if (adminAuth) {
        const userRecord = await adminAuth.getUser(userId)
        userCreationDate = new Date(userRecord.metadata.creationTime)
      }
    } catch (error) {
      console.warn('Could not fetch user creation date, using current date as fallback')
      // Fallback to current date if user record can't be found
      userCreationDate = new Date()
    }

    // Calculate trial dates based on actual account creation
    const trialStartDate = userCreationDate
    const trialEndDate = new Date(userCreationDate)
    trialEndDate.setMonth(trialEndDate.getMonth() + 3) // 3 months trial

    const currentDate = new Date()
    const remaining = trialEndDate.getTime() - currentDate.getTime()
    const elapsed = currentDate.getTime() - trialStartDate.getTime()
    const totalDuration = trialEndDate.getTime() - trialStartDate.getTime()
    
    const progressPercentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
    const daysRemaining = Math.max(0, Math.ceil(remaining / (1000 * 60 * 60 * 24)))
    const isExpired = remaining <= 0

    const trialData = {
      userId: userId,
      plan: 'professional',
      status: isExpired ? 'expired' : 'active',
      startDate: trialStartDate.toISOString(),
      endDate: trialEndDate.toISOString(),
      remainingDays: daysRemaining,
      features: {
        unlimitedInvoices: !isExpired,
        advancedAutomation: !isExpired,
        customBranding: !isExpired,
        multiCurrency: !isExpired,
        analytics: !isExpired,
        prioritySupport: !isExpired,
        teamCollaboration: false,
        apiAccess: false,
        ssoIntegration: false,
        whiteLabel: false
      },
      usage: {
        invoicesCreated: 0, // This would come from actual database
        customersAdded: 0,
        paymentsProcessed: 0,
        reportsGenerated: 0
      },
      createdAt: trialStartDate.toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      trial: {
        ...trialData,
        progressPercentage: Math.round(progressPercentage),
        isExpired: isExpired,
        isExpiringSoon: daysRemaining <= 7 && daysRemaining > 0
      },
      trialMetrics: {
        totalDays: 90,
        daysElapsed: Math.ceil(elapsed / (1000 * 60 * 60 * 24)),
        daysRemaining: daysRemaining,
        progressPercentage: Math.round(progressPercentage)
      },
      upgradeRecommendation: daysRemaining <= 7 && daysRemaining > 0 ? {
        message: "Your trial is ending soon! Upgrade now to continue enjoying all features.",
        urgency: "high",
        suggestedPlan: "professional"
      } : isExpired ? {
        message: "Your trial has expired. Upgrade now to continue using BillCraft.",
        urgency: "critical",
        suggestedPlan: "professional"
      } : null
    })

  } catch (error: any) {
    console.error('Trial status error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch trial status',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// POST endpoint to update trial status (e.g., pause, resume, cancel)
export async function POST(request: NextRequest) {
  try {
    // Check if Firebase Admin is configured
    if (!isFirebaseAdminAvailable()) {
      return NextResponse.json({
        error: 'Firebase Admin not configured',
        message: 'Trial system requires Firebase Admin SDK configuration'
      }, { status: 503 })
    }

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

    const { action, reason } = await request.json()
    const userId = decodedToken.uid

    // Validate action
    const validActions = ['pause', 'resume', 'cancel', 'extend']
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: `Invalid action. Valid actions: ${validActions.join(', ')}` },
        { status: 400 }
      )
    }

    // In a real implementation, update trial status in database
    const updatedTrial = {
      userId: userId,
      status: action === 'cancel' ? 'cancelled' : action === 'pause' ? 'paused' : 'active',
      action: action,
      reason: reason || '',
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: `Trial ${action}d successfully`,
      trial: updatedTrial
    })

  } catch (error: any) {
    console.error('Trial status update error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to update trial status',
        details: error.message 
      },
      { status: 500 }
    )
  }
} 
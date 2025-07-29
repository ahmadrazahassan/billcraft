import { NextRequest, NextResponse } from 'next/server'
import { verifyIdToken, isFirebaseAdminAvailable } from '@/lib/firebase-admin'
import { userService, trialService } from '@/lib/database'

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

    const firebaseUid = decodedToken.uid

    // First, get the user from Supabase to get the internal user ID
    const user = await userService.getCurrentUser(firebaseUid)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      )
    }

    // Get detailed trial status using the enhanced service
    const { trial, metrics, recommendations } = await trialService.getDetailedTrialStatus(user.id)

    if (!trial) {
      // No trial exists, suggest starting one
      return NextResponse.json({
        trial: null,
        trialMetrics: null,
        recommendations: {
          action: 'start_trial',
          message: 'Start your free 90-day trial to access all features',
          urgency: 'low',
          suggestedPlan: 'professional'
        }
      })
    }

    // Auto-run trial cleanup to ensure expired trials are marked correctly
    await trialService.cleanupExpiredTrials()

    // Prepare the response with enterprise-grade trial data
    const trialResponse = {
      id: trial.id,
      userId: trial.user_id,
      plan: trial.plan,
      status: trial.status,
      startDate: trial.start_date,
      endDate: trial.end_date,
      remainingDays: metrics.daysRemaining,
      hoursRemaining: metrics.hoursRemaining,
      progressPercentage: metrics.progressPercentage,
      isExpired: metrics.isExpired,
      isExpiringSoon: metrics.isExpiringSoon,
      isExpiringSoonCritical: metrics.isExpiringSoonCritical,
      isInGracePeriod: metrics.isInGracePeriod,
      features: trial.features,
      usage: trial.usage_stats,
      createdAt: trial.created_at,
      updatedAt: trial.updated_at
    }

    return NextResponse.json({
      trial: trialResponse,
      trialMetrics: {
        totalDays: metrics.totalDays,
        daysElapsed: metrics.daysElapsed,
        daysRemaining: metrics.daysRemaining,
        hoursRemaining: metrics.hoursRemaining,
        progressPercentage: metrics.progressPercentage,
        timeRemaining: metrics.remaining,
        timeElapsed: metrics.elapsed
      },
      upgradeRecommendation: recommendations
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

// Handle POST requests for trial actions (cancel, extend, etc.)
export async function POST(request: NextRequest) {
  try {
    // Check if Firebase Admin is configured
    if (!isFirebaseAdminAvailable()) {
      return NextResponse.json({
        error: 'Firebase Admin not configured'
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
    const decodedToken = await verifyIdToken(token)
    const firebaseUid = decodedToken.uid

    // Get the user from Supabase
    const user = await userService.getCurrentUser(firebaseUid)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      )
    }

    const { action, reason, additionalDays } = await request.json()

    switch (action) {
      case 'cancel':
        await trialService.updateTrialStatus(user.id, 'cancelled')
        return NextResponse.json({
          success: true,
          message: 'Trial cancelled successfully'
        })

      case 'extend':
        if (!additionalDays || additionalDays <= 0) {
      return NextResponse.json(
            { error: 'Valid additionalDays required for extension' },
        { status: 400 }
      )
    }
        const extendedTrial = await trialService.extendTrial(user.id, additionalDays, reason)
        if (!extendedTrial) {
          return NextResponse.json(
            { error: 'Trial not found or could not be extended' },
            { status: 404 }
          )
        }
    return NextResponse.json({
      success: true,
          message: `Trial extended by ${additionalDays} days`,
          trial: extendedTrial
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: cancel, extend' },
          { status: 400 }
        )
    }

  } catch (error: any) {
    console.error('Trial action error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to perform trial action',
        details: error.message 
      },
      { status: 500 }
    )
  }
} 
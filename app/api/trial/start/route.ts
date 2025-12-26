import { NextRequest, NextResponse } from 'next/server'
import { verifyIdToken, isFirebaseAdminAvailable } from '@/lib/firebase-admin'
import { userService, trialService } from '@/lib/database'

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
    const firebaseUid = decodedToken.uid
    
    // Get the user from Supabase to get the internal user ID
    const user = await userService.getCurrentUser(firebaseUid)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found in database. Please sync your account first.' },
        { status: 404 }
      )
    }

    // Check if user already has an active trial
    const existingTrial = await trialService.getActiveTrial(user.id)
    if (existingTrial && existingTrial.status === 'active') {
      const metrics = trialService.calculateTrialMetrics(existingTrial)
      if (!metrics.isExpired) {
        return NextResponse.json({
          success: false,
          error: 'User already has an active trial',
          trial: {
            id: existingTrial.id,
            plan: existingTrial.plan_type,
            status: existingTrial.status,
            startDate: existingTrial.trial_start,
            endDate: existingTrial.trial_end,
            daysRemaining: metrics.daysRemaining
          }
        }, { status: 409 })
      }
    }

    // Validate plan
    if (!['professional', 'enterprise'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be "professional" or "enterprise"' },
        { status: 400 }
      )
    }

    // Start the trial using the enhanced service
    const trial = await trialService.startTrial(user.id, plan as 'professional' | 'enterprise')
    const metrics = trialService.calculateTrialMetrics(trial)

    return NextResponse.json({
      success: true,
      message: `${plan} trial started successfully`,
      trial: {
        id: trial.id,
        userId: trial.user_id,
        plan: trial.plan_type,
        status: trial.status,
        startDate: trial.trial_start,
        endDate: trial.trial_end,
        features: trial.features_used,
        usage: trial.usage_stats,
        daysRemaining: metrics.daysRemaining,
        totalDays: metrics.totalDays,
        createdAt: trial.created_at,
        updatedAt: trial.updated_at
      }
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
    // Check if Firebase Admin is configured
    if (!isFirebaseAdminAvailable()) {
      return NextResponse.json({
        error: 'Firebase Admin not configured'
      }, { status: 503 })
    }

    // Get authorization header for user identification
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
      return NextResponse.json({
        eligible: false,
        reason: 'User not found in database'
      })
    }

    // Check if user has already used a trial
    const existingTrial = await trialService.getTrialByUserId(user.id)
    const hasUsedTrial = existingTrial !== null

    let eligibilityStatus = 'eligible'
    let message = 'User is eligible for a 3-month free trial'

    if (hasUsedTrial) {
      const activeTriaL = await trialService.getActiveTrial(user.id)
      if (activeTriaL && activeTriaL.status === 'active') {
        const metrics = trialService.calculateTrialMetrics(activeTriaL)
        if (!metrics.isExpired) {
          eligibilityStatus = 'active_trial'
          message = `User already has an active ${activeTriaL.plan_type} trial with ${metrics.daysRemaining} days remaining`
        } else {
          eligibilityStatus = 'trial_used'
          message = 'User has already used their free trial'
        }
      } else {
        eligibilityStatus = 'trial_used'
        message = 'User has already used their free trial'
      }
    }

    return NextResponse.json({
      eligible: eligibilityStatus === 'eligible',
      status: eligibilityStatus,
      availablePlans: ['professional', 'enterprise'],
      trialDuration: '90 days',
      message: message,
      existingTrial: existingTrial ? {
        plan: existingTrial.plan_type,
        status: existingTrial.status,
        startDate: existingTrial.trial_start,
        endDate: existingTrial.trial_end
      } : null
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
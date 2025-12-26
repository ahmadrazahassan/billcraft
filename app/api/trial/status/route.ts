import { NextRequest, NextResponse } from 'next/server'
import { verifyIdToken, isFirebaseAdminAvailable } from '@/lib/firebase-admin'
import { userService, trialService } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    // Check if Firebase Admin is configured
    if (!isFirebaseAdminAvailable()) {
      return NextResponse.json({
        error: 'Firebase Admin not configured',
        message: 'Trial system requires Firebase Admin SDK configuration'
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
      return NextResponse.json(
        { error: 'Invalid authorization token' },
        { status: 401 }
      )
    }

    const firebaseUid = decodedToken.uid
    
    // Get the user from Supabase to get the internal user ID
    const user = await userService.getCurrentUser(firebaseUid)
    if (!user) {
        return NextResponse.json(
        { error: 'User not found in database. Please sync your account first.' },
        { status: 404 }
      )
    }

    // Get detailed trial status with metrics
    const trialStatus = await trialService.getDetailedTrialStatus(user.id)

    return NextResponse.json({
      success: true,
      ...trialStatus
    })

  } catch (error: any) {
    console.error('Trial status check failed:', error)
    return NextResponse.json(
      { error: 'Failed to check trial status', details: error.message },
      { status: 500 }
    )
  }
}

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

    const { action, plan = 'professional' } = await request.json()

    switch (action) {
      case 'cancel':
        // Cancel the trial
        const updatedTrial = await trialService.updateTrialStatus(user.id, 'cancelled')
        if (!updatedTrial) {
          return NextResponse.json(
            { error: 'No active trial found to cancel' },
            { status: 404 }
          )
        }
        return NextResponse.json({ success: true, trial: updatedTrial })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use /api/trial/start for starting trials.' },
          { status: 400 }
        )
    }

  } catch (error: any) {
    console.error('Trial action failed:', error)
    return NextResponse.json(
      { error: 'Failed to process trial action', details: error.message },
      { status: 500 }
    )
  }
}
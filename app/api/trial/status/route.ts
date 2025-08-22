import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { PricingService } from '@/lib/pricing'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authorization = request.headers.get('authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    // Extract token and validate user
    const token = authorization.replace('Bearer ', '')
    
    // In production, you would verify the Firebase token here
    // For now, we'll mock the user data
    const userId = 'mock_user_id' // Extract from verified token
    
    // Get trial data from database
    const { data: trialData, error } = await supabase
      .from('user_trials')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch trial data' },
        { status: 500 }
      )
    }

    // If no trial data exists, create one
    if (!trialData) {
      const now = new Date()
      const trialEnd = new Date(now)
      trialEnd.setDate(trialEnd.getDate() + 90) // 90 days trial

      const newTrial = {
        user_id: userId,
        plan_id: 'free',
        status: 'active',
        trial_start: now.toISOString(),
        trial_end: trialEnd.toISOString(),
        trial_days: 90,
        created_at: now.toISOString(),
        updated_at: now.toISOString()
      }

      const { data: insertedTrial, error: insertError } = await supabase
        .from('user_trials')
        .insert(newTrial)
        .select()
        .single()

      if (insertError) {
        console.error('Failed to create trial:', insertError)
        return NextResponse.json(
          { error: 'Failed to create trial' },
          { status: 500 }
        )
      }

      const remainingDays = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

      return NextResponse.json({
        trial: {
          ...insertedTrial,
          remainingDays,
          isActive: true
        }
      })
    }

    // Calculate remaining days
    const now = new Date()
    const trialEnd = new Date(trialData.trial_end)
    const remainingTime = trialEnd.getTime() - now.getTime()
    const remainingDays = Math.max(0, Math.ceil(remainingTime / (1000 * 60 * 60 * 24)))
    const isActive = remainingDays > 0 && trialData.status === 'active'

    return NextResponse.json({
      trial: {
        ...trialData,
        remainingDays,
        isActive
      }
    })

  } catch (error) {
    console.error('Trial status check failed:', error)
    return NextResponse.json(
      { error: 'Failed to check trial status' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      )
    }

    switch (action) {
      case 'start':
        // Start a new trial
        const now = new Date()
        const trialEnd = new Date(now)
        trialEnd.setDate(trialEnd.getDate() + 90)

        const { data: newTrial, error: startError } = await supabase
          .from('user_trials')
          .upsert({
            user_id: userId,
            plan_id: 'free',
            status: 'active',
            trial_start: now.toISOString(),
            trial_end: trialEnd.toISOString(),
            trial_days: 90,
            updated_at: now.toISOString()
          }, {
            onConflict: 'user_id'
          })
          .select()
          .single()

        if (startError) {
          return NextResponse.json(
            { error: 'Failed to start trial' },
            { status: 500 }
          )
        }

        return NextResponse.json({ trial: newTrial })

      case 'cancel':
        // Cancel the trial
        const { error: cancelError } = await supabase
          .from('user_trials')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)

        if (cancelError) {
          return NextResponse.json(
            { error: 'Failed to cancel trial' },
            { status: 500 }
          )
        }

        return NextResponse.json({ success: true })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Trial action failed:', error)
    return NextResponse.json(
      { error: 'Failed to process trial action' },
      { status: 500 }
    )
  }
}
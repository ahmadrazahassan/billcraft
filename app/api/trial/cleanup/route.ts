import { NextRequest, NextResponse } from 'next/server'
import { trialService } from '@/lib/database'

// API endpoint for automatic trial cleanup
// This can be called by scheduled jobs (cron, Vercel cron, etc.)
export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication for scheduled jobs
    const authHeader = request.headers.get('Authorization')
    const cronSecret = process.env.CRON_SECRET
    
    // If CRON_SECRET is set, verify it for security
    if (cronSecret) {
      if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    console.log('🧹 Starting scheduled trial cleanup...')
    
    // Run the cleanup process
    const expiredCount = await trialService.cleanupExpiredTrials()
    
    const response = {
      success: true,
      message: 'Trial cleanup completed',
      expiredTrialsCount: expiredCount,
      timestamp: new Date().toISOString()
    }
    
    console.log('✅ Trial cleanup completed:', response)
    
    return NextResponse.json(response)

  } catch (error: any) {
    console.error('❌ Trial cleanup failed:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Trial cleanup failed',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Also support GET for manual testing
export async function GET(request: NextRequest) {
  try {
    console.log('🧹 Manual trial cleanup requested...')
    
    const expiredCount = await trialService.cleanupExpiredTrials()
    
    return NextResponse.json({
      success: true,
      message: 'Manual trial cleanup completed',
      expiredTrialsCount: expiredCount,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('❌ Manual trial cleanup failed:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Trial cleanup failed',
        details: error.message 
      },
      { status: 500 }
    )
  }
} 
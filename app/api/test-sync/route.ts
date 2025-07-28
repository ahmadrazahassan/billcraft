import { NextRequest, NextResponse } from 'next/server'
import { userService } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 TEST-SYNC: Starting direct sync test')
    
    // Log environment variables directly in this API route
    console.log('🔧 TEST-SYNC: Environment check in API route:')
    console.log('  - SUPABASE_SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('  - SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
    console.log('  - SUPABASE_SERVICE_ROLE_KEY first 20:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) || 'NOT SET')
    
    const { firebaseUser } = await request.json()
    
    if (!firebaseUser || !firebaseUser.uid) {
      return NextResponse.json({
        success: false,
        error: 'Firebase user data is required',
        debug: {
          envVarPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          envVarLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0
        }
      }, { status: 400 })
    }
    
    console.log('🔧 TEST-SYNC: Attempting to sync user:', firebaseUser.uid)
    
    // Try to sync the user
    const supabaseUser = await userService.syncUser(firebaseUser)
    
    console.log('🔧 TEST-SYNC: Sync successful:', supabaseUser.id)
    
    return NextResponse.json({
      success: true,
      message: 'User sync test successful',
      user: {
        id: supabaseUser.id,
        firebase_uid: supabaseUser.firebase_uid,
        email: supabaseUser.email,
        full_name: supabaseUser.full_name,
        plan: supabaseUser.plan,
        trial_ends_at: supabaseUser.trial_ends_at
      },
      debug: {
        envVarPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        envVarLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('🔧 TEST-SYNC: Failed:', error)
    
    return NextResponse.json({
      success: false,
      error: 'User sync test failed',
      details: error.message,
      debug: {
        envVarPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        envVarLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
        errorStack: error.stack
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 
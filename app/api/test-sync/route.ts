import { NextRequest, NextResponse } from 'next/server'
import { userService } from '@/lib/database'

// Helper function to implement fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number = 5000): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

// Enhanced diagnostics function
async function performDiagnostics() {
  const diagnostics = {
    environment: {
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
      supabaseAnonKeyPresent: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseServiceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseServiceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
      timestamp: new Date().toISOString()
    },
    connectivity: {
      internetAccess: false,
      supabaseReachable: false,
      dnsResolution: false
    },
    recommendations: [] as string[]
  }

  // Test internet connectivity
  try {
    const response = await fetchWithTimeout('https://httpbin.org/get', { 
      method: 'GET'
    }, 5000)
    diagnostics.connectivity.internetAccess = response.ok
  } catch (error) {
    console.warn('Internet connectivity test failed:', error)
    diagnostics.recommendations.push('Check internet connection')
  }

  // Test DNS resolution for Supabase
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yuplzhbijgxaizguurdg.supabase.co'
    const response = await fetchWithTimeout(url + '/health', { 
      method: 'GET'
    }, 5000)
    diagnostics.connectivity.dnsResolution = true
    diagnostics.connectivity.supabaseReachable = response.ok
  } catch (error: any) {
    console.warn('Supabase connectivity test failed:', error.message)
    if (error.message.includes('getaddrinfo')) {
      diagnostics.recommendations.push('DNS resolution issue - check network settings')
    } else if (error.message.includes('timeout')) {
      diagnostics.recommendations.push('Network timeout - check firewall/proxy settings')
    } else {
      diagnostics.recommendations.push('Supabase unreachable - check URL and network')
    }
  }

  // Environment validation
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    diagnostics.recommendations.push('Set NEXT_PUBLIC_SUPABASE_URL in .env.local')
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    diagnostics.recommendations.push('Set NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    diagnostics.recommendations.push('Set SUPABASE_SERVICE_ROLE_KEY in .env.local')
  }

  return diagnostics
}

// GET endpoint for diagnostics
export async function GET() {
  console.log('🔧 TEST-SYNC: Running diagnostics...')
  
  const diagnostics = await performDiagnostics()
  
  return NextResponse.json({
    service: 'BillCraft Sync Test',
    status: 'diagnostics',
    diagnostics,
    instructions: {
      setup: 'Create .env.local file with required environment variables',
      documentation: 'See ENVIRONMENT_SETUP_COMPLETE.md for detailed instructions',
      testEndpoint: 'POST to this endpoint with firebaseUser data to test sync'
    }
  })
}

// Enhanced POST endpoint with better error handling
export async function POST(request: NextRequest) {
  try {
    console.log('🔧 TEST-SYNC: Starting comprehensive sync test')
    
    // Perform diagnostics first
    const diagnostics = await performDiagnostics()
    console.log('🔧 TEST-SYNC: Diagnostics completed:', diagnostics)
    
    // Parse request body
    let firebaseUser
    try {
      const body = await request.json()
      firebaseUser = body.firebaseUser
    } catch (parseError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid JSON in request body',
        expectedFormat: {
          firebaseUser: {
            uid: 'firebase_user_id',
            email: 'user@example.com', 
            displayName: 'User Name'
          }
        }
      }, { status: 400 })
    }
    
    // Validate required data
    if (!firebaseUser || !firebaseUser.uid) {
      return NextResponse.json({
        success: false,
        error: 'Firebase user data is required',
        diagnostics,
        expectedFormat: {
          firebaseUser: {
            uid: 'firebase_user_id',
            email: 'user@example.com', 
            displayName: 'User Name'
          }
        }
      }, { status: 400 })
    }
    
    console.log('🔧 TEST-SYNC: Attempting to sync user:', firebaseUser.uid)
    
    // Check if we have basic connectivity before attempting sync
    if (!diagnostics.connectivity.internetAccess) {
      return NextResponse.json({
        success: false,
        error: 'No internet connectivity detected',
        diagnostics,
        recommendations: diagnostics.recommendations
      }, { status: 503 })
    }
    
    if (!diagnostics.environment.supabaseServiceKeyPresent) {
      return NextResponse.json({
        success: false,
        error: 'Supabase service key not configured',
        diagnostics,
        instructions: {
          message: 'Create .env.local file with SUPABASE_SERVICE_ROLE_KEY',
          documentation: 'See ENVIRONMENT_SETUP_COMPLETE.md for setup instructions'
        }
      }, { status: 500 })
    }
    
    // Try to sync the user with enhanced error handling
    let supabaseUser
    try {
      supabaseUser = await userService.syncUser(firebaseUser)
    console.log('🔧 TEST-SYNC: Sync successful:', supabaseUser.id)
    } catch (syncError: any) {
      console.error('🔧 TEST-SYNC: Sync failed:', syncError)
      
      // Provide specific guidance based on error type
      let guidance = 'Unknown sync error occurred'
      let statusCode = 500
      
      if (syncError.message.includes('fetch failed')) {
        guidance = 'Network connection failed. Check internet connection and firewall settings.'
        statusCode = 503
      } else if (syncError.message.includes('timeout')) {
        guidance = 'Request timed out. Check network speed and Supabase service status.'
        statusCode = 504
      } else if (syncError.message.includes('service role key')) {
        guidance = 'Database configuration error. Verify SUPABASE_SERVICE_ROLE_KEY in .env.local'
        statusCode = 500
      } else if (syncError.message.includes('DNS')) {
        guidance = 'DNS resolution failed. Check network settings and DNS servers.'
        statusCode = 503
      }
      
      return NextResponse.json({
        success: false,
        error: 'User sync failed',
        errorType: syncError.name,
        errorMessage: syncError.message,
        guidance,
        diagnostics,
        troubleshooting: {
          documentation: 'See ENVIRONMENT_SETUP_COMPLETE.md',
          nextSteps: [
            'Check .env.local file exists and has correct values',
            'Restart development server after env changes', 
            'Verify internet connectivity',
            'Check Supabase dashboard is accessible'
          ]
        },
        timestamp: new Date().toISOString()
      }, { status: statusCode })
    }
    
    // Success response with comprehensive information
    return NextResponse.json({
      success: true,
      message: 'User sync test successful! 🎉',
      user: {
        id: supabaseUser.id,
        firebase_uid: supabaseUser.firebase_uid,
        email: supabaseUser.email,
        full_name: supabaseUser.full_name,
        plan: supabaseUser.plan,
        trial_ends_at: supabaseUser.trial_ends_at,
        created_at: supabaseUser.created_at
      },
      diagnostics,
      nextSteps: [
        'User sync is working correctly',
        'Your Firebase authentication is properly connected to Supabase',
        'Trial system is operational',
        'Ready for production use'
      ],
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('🔧 TEST-SYNC: Unexpected error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Unexpected error occurred',
      errorType: error.name,
      errorMessage: error.message,
      guidance: 'This is an unexpected error. Please check the server logs and environment configuration.',
      troubleshooting: {
        documentation: 'See ENVIRONMENT_SETUP_COMPLETE.md for complete setup guide',
        support: 'Check console logs for detailed error information'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const envCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
      anonKeyFirst10: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) || 'NOT SET',
      serviceKeyFirst10: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 10) || 'NOT SET',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Environment variables check',
      envCheck
    })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
} 
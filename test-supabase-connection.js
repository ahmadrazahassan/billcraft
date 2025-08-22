// Test Supabase Connection
// Run this with: node test-supabase-connection.js

require('dotenv').config({ path: '.env.local' })

async function testSupabaseConnection() {
  console.log('🔄 Testing Supabase Connection...\n')
  
  // Check environment variables
  console.log('📋 Environment Variables:')
  console.log('- NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ SET' : '❌ NOT SET')
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET' : '❌ NOT SET')
  console.log('- SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ SET' : '❌ NOT SET')
  console.log()

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL')
    return
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY')
    return
  }

  try {
    // Test basic connectivity
    console.log('🌐 Testing Basic Connectivity...')
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const response = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      console.log('✅ Supabase URL is reachable')
    } else {
      console.error('❌ Supabase URL returned error:', response.status, response.statusText)
      return
    }

    // Test service role key
    console.log('🔑 Testing Service Role Key...')
    const serviceResponse = await fetch(`${url}/rest/v1/users?select=count`, {
      method: 'GET',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (serviceResponse.ok) {
      console.log('✅ Service role key is working')
    } else {
      console.error('❌ Service role key error:', serviceResponse.status, serviceResponse.statusText)
      return
    }

    console.log('\n🎉 All tests passed! Supabase is properly configured.')
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message)
  }
}

testSupabaseConnection()

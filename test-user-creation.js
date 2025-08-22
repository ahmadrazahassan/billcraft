// Test User Creation in Supabase
require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

async function testUserCreation() {
  console.log('🧪 Testing User Creation in Supabase...\n')
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Missing environment variables')
    return
  }
  
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      }
    }
  })
  
  try {
    // Test creating a user
    const testUserData = {
      firebase_uid: 'test-' + Date.now(),
      email: 'test@billcraft.com',
      full_name: 'Test User',
      plan: 'trial',
      trial_ends_at: new Date(Date.now() + 90*24*60*60*1000).toISOString() // 90 days from now
    }
    
    console.log('🔄 Creating test user...')
    const { data, error } = await supabase
      .from('users')
      .insert(testUserData)
      .select()
      .single()
    
    if (error) {
      console.error('❌ Failed to create user:', error.message)
      return
    }
    
    console.log('✅ User created successfully!')
    console.log('  ID:', data.id)
    console.log('  Email:', data.email)
    console.log('  Plan:', data.plan)
    
    // Clean up - delete the test user
    console.log('\n🧹 Cleaning up test user...')
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', data.id)
    
    if (deleteError) {
      console.warn('⚠️ Failed to cleanup test user:', deleteError.message)
    } else {
      console.log('✅ Test user cleaned up')
    }
    
    console.log('\n🎉 User creation test passed! Your database is working perfectly.')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testUserCreation()


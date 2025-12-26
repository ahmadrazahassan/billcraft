// Check current environment variables
require('dotenv').config({ path: '.env.local' })

console.log('🔍 Current Environment Variables:')
console.log()
console.log('NEXT_PUBLIC_SUPABASE_URL:')
console.log('  Value:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET')
console.log('  Length:', process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0)
console.log()

console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:')
console.log('  Present:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
console.log('  Length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0)
console.log('  Starts with:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...' || 'NOT SET')
console.log()

console.log('SUPABASE_SERVICE_ROLE_KEY:')
console.log('  Present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
console.log('  Length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
console.log('  Starts with:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + '...' || 'NOT SET')
console.log()

// Check if URL looks like an old deleted project
if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('yuplzhbijgxaizguurdg')) {
  console.log('⚠️  WARNING: You are still using the OLD deleted Supabase project URL!')
  console.log('   This URL will not work: https://yuplzhbijgxaizguurdg.supabase.co')
  console.log('   You need to create a NEW project and update your .env.local')
}

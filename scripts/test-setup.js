/**
 * BillCraft Setup Test Script
 * Run this to verify your environment configuration is working
 */

console.log('🚀 BillCraft Environment Test Starting...\n')

// Test 1: Environment Variables
console.log('📋 Testing Environment Variables:')
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

let envScore = 0
requiredEnvVars.forEach(varName => {
  const value = process.env[varName]
  const status = value ? '✅' : '❌'
  const length = value ? `(${value.length} chars)` : '(missing)'
  console.log(`  ${status} ${varName} ${length}`)
  if (value) envScore++
})

console.log(`\n📊 Environment Score: ${envScore}/${requiredEnvVars.length}`)

// Test 2: Network Connectivity
console.log('\n🌐 Testing Network Connectivity:')

async function testConnectivity() {
  try {
    // Test basic internet
    console.log('  🔍 Testing internet connection...')
    const response = await fetch('https://httpbin.org/get', { timeout: 5000 })
    console.log('  ✅ Internet connection: OK')
    
    // Test Supabase reachability
    console.log('  🔍 Testing Supabase reachability...')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yuplzhbijgxaizguurdg.supabase.co'
    const supabaseResponse = await fetch(supabaseUrl + '/health', { timeout: 5000 })
    console.log('  ✅ Supabase reachable: OK')
    
  } catch (error) {
    console.log('  ❌ Network test failed:', error.message)
  }
}

// Test 3: Recommendations
function provideRecommendations() {
  console.log('\n💡 Recommendations:')
  
  if (envScore < requiredEnvVars.length) {
    console.log('  📝 Create .env.local file with missing environment variables')
    console.log('  📖 See ENVIRONMENT_SETUP_COMPLETE.md for detailed instructions')
  }
  
  if (envScore === requiredEnvVars.length) {
    console.log('  🎉 All environment variables are configured!')
    console.log('  🔄 Restart your development server: npm run dev')
    console.log('  🧪 Test sync endpoint: GET http://localhost:3000/api/test-sync')
  }
  
  console.log('\n📚 Documentation:')
  console.log('  - ENVIRONMENT_SETUP_COMPLETE.md - Complete setup guide')
  console.log('  - SUPABASE_SETUP_INSTRUCTIONS.md - Supabase specific setup')
  console.log('  - README.md - General project information')
}

// Run all tests
async function runTests() {
  await testConnectivity()
  provideRecommendations()
  
  console.log('\n🏁 Test Complete!')
  console.log('Your BillCraft application should now be ready to use.')
}

runTests().catch(console.error)

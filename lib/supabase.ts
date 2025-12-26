import { createClient } from '@supabase/supabase-js'

// Environment validation - MUST be set for new project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Environment diagnostics
console.log('🔍 SUPABASE ENVIRONMENT CHECK:')
console.log('- URL:', supabaseUrl)
console.log('- Anon Key Present:', !!supabaseAnonKey)
console.log('- Anon Key Length:', supabaseAnonKey.length)
console.log('- Service Key Present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
console.log('- Service Key Length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)

// Client-side Supabase client (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Network connectivity test
async function testNetworkConnectivity(url: string): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // Reduced timeout
    
    // Test Supabase REST API endpoint instead of /health
    const response = await fetch(url + '/rest/v1/', {
      method: 'GET',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    // Accept both 200 (success) and 400/401 (auth issues) as connectivity success
    return response.status < 500
  } catch (error) {
    console.warn('⚠️ Network connectivity test failed:', error)
    return false
  }
}

// Enhanced admin client with network diagnostics
export const getSupabaseAdmin = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  console.log('🔍 Getting Supabase Admin Client:')
  console.log('- Service Key Present:', !!serviceKey)
  console.log('- Service Key Length:', serviceKey?.length || 0)
  console.log('- URL:', supabaseUrl)
  
  // Environment is already validated at the top of file
  
  if (!serviceKey) {
    const errorMsg = `❌ SUPABASE SERVICE KEY MISSING! 
    Environment check:
    - SUPABASE_SERVICE_ROLE_KEY: ${serviceKey ? 'SET' : 'NOT SET'}
    - Length: ${serviceKey?.length || 0}
    
    Please update your .env.local file with your new Supabase credentials:
    NEXT_PUBLIC_SUPABASE_URL=your_new_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_new_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_new_service_role_key`
    
    console.error(errorMsg)
    throw new Error('Supabase service role key not configured. Please add SUPABASE_SERVICE_ROLE_KEY to your environment variables.')
  }

  try {
    console.log('✅ Creating Supabase Admin client...')
    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: {
          'User-Agent': 'BillCraft/1.0.0',
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`
        }
      }
    })
    console.log('✅ Supabase Admin client created successfully')
    return adminClient
  } catch (error) {
    console.error('❌ Failed to create Supabase Admin client:', error)
    throw error
  }
}

// Check if Supabase Admin is available
export const isSupabaseAdminAvailable = () => {
  return !!process.env.SUPABASE_SERVICE_ROLE_KEY
}

// Complete TypeScript interface for BillCraft database
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          firebase_uid: string
          email: string
          full_name: string | null
          company_name: string | null
          plan: 'trial' | 'professional' | 'enterprise'
          trial_ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          firebase_uid: string
          email: string
          full_name?: string | null
          company_name?: string | null
          plan?: 'trial' | 'professional' | 'enterprise'
          trial_ends_at?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
          company_name?: string | null
          plan?: 'trial' | 'professional' | 'enterprise'
          trial_ends_at?: string | null
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string | null
          address: string | null
          city: string | null
          phone: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          email?: string | null
          address?: string | null
          city?: string | null
          phone?: string | null
          notes?: string | null
        }
        Update: {
          name?: string
          email?: string | null
          address?: string | null
          city?: string | null
          phone?: string | null
          notes?: string | null
        }
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          client_id: string | null
          invoice_number: string
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          template: string
          issue_date: string
          due_date: string
          company_name: string | null
          company_email: string | null
          company_phone: string | null
          company_address: string | null
          company_city: string | null
          company_website: string | null
          client_name: string | null
          client_email: string | null
          client_address: string | null
          client_city: string | null
          subtotal: number
          tax_rate: number
          tax_amount: number
          discount_amount: number
          total: number
          currency: string
          notes: string | null
          terms: string | null
          sent_at: string | null
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          client_id?: string | null
          invoice_number: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          template?: string
          issue_date: string
          due_date: string
          company_name?: string | null
          company_email?: string | null
          company_phone?: string | null
          company_address?: string | null
          company_city?: string | null
          company_website?: string | null
          client_name?: string | null
          client_email?: string | null
          client_address?: string | null
          client_city?: string | null
          subtotal?: number
          tax_rate?: number
          tax_amount?: number
          discount_amount?: number
          total?: number
          currency?: string
          notes?: string | null
          terms?: string | null
        }
        Update: {
          client_id?: string | null
          invoice_number?: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          template?: string
          issue_date?: string
          due_date?: string
          company_name?: string | null
          company_email?: string | null
          company_phone?: string | null
          company_address?: string | null
          company_city?: string | null
          company_website?: string | null
          client_name?: string | null
          client_email?: string | null
          client_address?: string | null
          client_city?: string | null
          subtotal?: number
          tax_rate?: number
          tax_amount?: number
          discount_amount?: number
          total?: number
          currency?: string
          notes?: string | null
          terms?: string | null
          sent_at?: string | null
          paid_at?: string | null
        }
      }
      invoice_items: {
        Row: {
          id: string
          invoice_id: string
          description: string
          quantity: number
          rate: number
          amount: number
          sort_order: number
          created_at: string
        }
        Insert: {
          invoice_id: string
          description: string
          quantity?: number
          rate?: number
          amount?: number
          sort_order?: number
        }
        Update: {
          description?: string
          quantity?: number
          rate?: number
          amount?: number
          sort_order?: number
        }
      }
      user_trials: {
        Row: {
          id: string
          user_id: string
          plan_type: 'professional' | 'enterprise'
          status: 'active' | 'expired' | 'cancelled' | 'converted'
          trial_start: string
          trial_end: string
          trial_days: number
          original_end_date: string | null
          extension_days: number
          extension_reason: string | null
          converted_to_plan: string | null
          converted_at: string | null
          stripe_subscription_id: string | null
          invoices_created: number
          clients_created: number
          features_used: any
          last_activity_at: string
          usage_stats: any
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          plan_type?: 'professional' | 'enterprise'
          status?: 'active' | 'expired' | 'cancelled' | 'converted'
          trial_start?: string
          trial_end: string
          trial_days?: number
          original_end_date?: string | null
          extension_days?: number
          extension_reason?: string | null
          converted_to_plan?: string | null
          converted_at?: string | null
          stripe_subscription_id?: string | null
          invoices_created?: number
          clients_created?: number
          features_used?: any
          last_activity_at?: string
          usage_stats?: any
        }
        Update: {
          plan_type?: 'professional' | 'enterprise'
          status?: 'active' | 'expired' | 'cancelled' | 'converted'
          trial_start?: string
          trial_end?: string
          trial_days?: number
          original_end_date?: string | null
          extension_days?: number
          extension_reason?: string | null
          converted_to_plan?: string | null
          converted_at?: string | null
          stripe_subscription_id?: string | null
          invoices_created?: number
          clients_created?: number
          features_used?: any
          last_activity_at?: string
          usage_stats?: any
        }
      }
    }
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Typed Supabase client
export type SupabaseClient = ReturnType<typeof createClient<Database>> 
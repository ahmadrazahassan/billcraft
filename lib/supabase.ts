import { createClient } from '@supabase/supabase-js'

// Environment validation with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yuplzhbijgxaizguurdg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

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
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(url + '/health', {
      method: 'GET',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    return response.ok
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
  
  // Validate environment variables
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not configured. Please add it to your environment variables.')
  }
  
  if (!serviceKey) {
    const errorMsg = `❌ SUPABASE SERVICE KEY MISSING! 
    Environment check:
    - SUPABASE_SERVICE_ROLE_KEY: ${serviceKey ? 'SET' : 'NOT SET'}
    - Length: ${serviceKey?.length || 0}
    
    Create a .env.local file with:
    NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here`
    
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
          'User-Agent': 'BillCraft/1.0.0'
        },
        fetch: (url, options = {}) => {
          // Add timeout and better error handling to fetch requests
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
          
          return fetch(url, {
            ...options,
            signal: options.signal || controller.signal,
            headers: {
              'Content-Type': 'application/json',
              ...options.headers
            }
          }).finally(() => {
            clearTimeout(timeoutId)
          })
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
      trials: {
        Row: {
          id: string
          user_id: string
          plan: 'professional' | 'enterprise'
          status: 'active' | 'expired' | 'cancelled' | 'converted'
          start_date: string
          end_date: string
          features: any
          usage_stats: any
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          plan: 'professional' | 'enterprise'
          status?: 'active' | 'expired' | 'cancelled' | 'converted'
          start_date: string
          end_date: string
          features?: any
          usage_stats?: any
        }
        Update: {
          plan?: 'professional' | 'enterprise'
          status?: 'active' | 'expired' | 'cancelled' | 'converted'
          start_date?: string
          end_date?: string
          features?: any
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
import { supabase, getSupabaseAdmin } from '@/lib/supabase'
import { Tables, Inserts, Updates } from '@/lib/supabase'

// User services
export const userService = {
  // Debug function to manually create user (for troubleshooting)
  async debugCreateUser(firebaseUser: any): Promise<Tables<'users'>> {
    try {
      console.log('Debug: Creating user for Firebase UID:', firebaseUser.uid)
      
      const trialEndDate = new Date()
      trialEndDate.setMonth(trialEndDate.getMonth() + 3) // 3 months trial
      
      const userData: Inserts<'users'> = {
        firebase_uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        full_name: firebaseUser.displayName || '',
        plan: 'trial',
        trial_ends_at: trialEndDate.toISOString()
      }
      
      console.log('Debug: Inserting user data:', userData)
      
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert(userData)
        .select()
        .single()
      
      if (error) {
        console.error('Debug: Error creating user:', error)
        throw error
      }
      
      console.log('Debug: User created successfully:', data)
      return data
    } catch (error) {
      console.error('Debug: Error in debugCreateUser:', error)
      throw error
    }
  },

  // Get current user by Firebase UID
  async getCurrentUser(firebaseUid: string): Promise<Tables<'users'> | null> {
    try {
      console.log('🔍 DATABASE: Getting current user for Firebase UID:', firebaseUid)
      console.log('🔍 DATABASE: Environment check in getCurrentUser:')
      console.log('  - SUPABASE_SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
      console.log('  - SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
      
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('firebase_uid', firebaseUid)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          // User not found, return null
          console.log('User not found in Supabase for Firebase UID:', firebaseUid)
          return null
        }
        console.error('Error fetching user from Supabase:', error)
        throw error
      }
      
      console.log('User found in Supabase:', data?.id)
      return data
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  },

  // Create new user
  async createUser(userData: Inserts<'users'>): Promise<Tables<'users'>> {
    try {
      console.log('🔍 DATABASE: Creating new user in Supabase:', userData)
      console.log('🔍 DATABASE: Environment check in createUser:')
      console.log('  - SUPABASE_SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
      console.log('  - SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
      
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert(userData)
        .select()
        .single()
      
      if (error) {
        console.error('Error creating user in Supabase:', error)
        throw error
      }
      
      console.log('User created successfully in Supabase:', data?.id)
      return data
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  // Update user
  async updateUser(firebaseUid: string, updates: Updates<'users'>): Promise<Tables<'users'>> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('firebase_uid', firebaseUid)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  },

  // Sync user with Supabase (create if doesn't exist) - with retry logic
  async syncUser(firebaseUser: any): Promise<Tables<'users'>> {
    console.log('🔍 DATABASE: Starting syncUser function')
    console.log('🔍 DATABASE: Environment check in syncUser:')
    console.log('  - SUPABASE_SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('  - SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
    console.log('  - SUPABASE_SERVICE_ROLE_KEY first 20 chars:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) || 'NOT SET')
    
    const maxRetries = 3
    let lastError: any
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Syncing user with Supabase (attempt ${attempt}/${maxRetries}) for:`, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName
        })
        
        // Check if user already exists
      let user = await this.getCurrentUser(firebaseUser.uid)
      
      if (!user) {
          console.log('User does not exist in Supabase, creating new user...')
          
        // Create new user
        const trialEndDate = new Date()
        trialEndDate.setMonth(trialEndDate.getMonth() + 3) // 3 months trial
        
          const userData: Inserts<'users'> = {
          firebase_uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || '',
          plan: 'trial',
          trial_ends_at: trialEndDate.toISOString()
          }
          
          user = await this.createUser(userData)
          console.log('✅ User successfully created in Supabase:', user.id)
        } else {
          console.log('✅ User already exists in Supabase:', user.id)
          
          // Optionally update user info if it has changed
          const needsUpdate = 
            user.email !== firebaseUser.email ||
            user.full_name !== firebaseUser.displayName
          
          if (needsUpdate) {
            console.log('User info has changed, updating...')
            user = await this.updateUser(firebaseUser.uid, {
              email: firebaseUser.email || user.email,
              full_name: firebaseUser.displayName || user.full_name
            })
            console.log('✅ User updated in Supabase')
          }
      }
      
      return user
        
      } catch (error: any) {
        lastError = error
        console.error(`❌ Sync attempt ${attempt} failed:`, error)
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          console.error('🚨 All sync attempts failed, throwing error')
      throw error
        }
        
        // Wait before retrying (exponential backoff)
        const waitTime = Math.pow(2, attempt) * 1000 // 2s, 4s, 8s
        console.log(`⏳ Waiting ${waitTime}ms before retry...`)
        await new Promise(resolve => setTimeout(resolve, waitTime))
      }
    }
    
    // This should never be reached, but just in case
    throw lastError || new Error('Sync failed for unknown reason')
  }
}

// Client services
export const clientService = {
  // Get all clients for a user
  async getClients(userId: string): Promise<Tables<'clients'>[]> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching clients:', error)
      throw error
    }
  },

  // Get single client
  async getClient(id: string): Promise<Tables<'clients'> | null> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error fetching client:', error)
      throw error
    }
  },

  // Create new client
  async createClient(client: Inserts<'clients'>): Promise<Tables<'clients'>> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('clients')
        .insert(client)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating client:', error)
      throw error
    }
  },

  // Update client
  async updateClient(id: string, updates: Updates<'clients'>): Promise<Tables<'clients'>> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('clients')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating client:', error)
      throw error
    }
  },

  // Delete client
  async deleteClient(id: string): Promise<void> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { error } = await supabaseAdmin
        .from('clients')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting client:', error)
      throw error
    }
  }
}

// Invoice services
export const invoiceService = {
  // Get all invoices for a user with client info and items
  async getInvoices(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients(id, name, email),
          invoice_items(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching invoices:', error)
      throw error
    }
  },

  // Get single invoice with all related data
  async getInvoice(id: string): Promise<any | null> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients(id, name, email),
          invoice_items(*)
        `)
        .eq('id', id)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error fetching invoice:', error)
      throw error
    }
  },

  // Create new invoice with items
  async createInvoice(invoiceData: any): Promise<Tables<'invoices'>> {
    try {
      console.log('🔍 Creating invoice with admin client...')
      const supabaseAdmin = getSupabaseAdmin()
      
      // First, create the invoice
      const { data: invoice, error: invoiceError } = await supabaseAdmin
        .from('invoices')
        .insert({
          user_id: invoiceData.userId,
          client_id: invoiceData.clientId,
          invoice_number: invoiceData.invoiceNumber,
          status: 'draft',
          template: invoiceData.template || 'modern-blue',
          issue_date: invoiceData.issueDate,
          due_date: invoiceData.dueDate,
          company_name: invoiceData.company?.name,
          company_email: invoiceData.company?.email,
          company_phone: invoiceData.company?.phone,
          company_address: invoiceData.company?.address,
          company_city: invoiceData.company?.city,
          company_website: invoiceData.company?.website,
          client_name: invoiceData.client?.name,
          client_email: invoiceData.client?.email,
          client_address: invoiceData.client?.address,
          client_city: invoiceData.client?.city,
          subtotal: invoiceData.subtotal || 0,
          tax_rate: invoiceData.taxRate || 0,
          tax_amount: invoiceData.tax || 0,
          discount_amount: invoiceData.discountAmount || 0,
          total: invoiceData.total || 0,
          currency: invoiceData.currency || 'USD',
          notes: invoiceData.notes,
          terms: invoiceData.terms
        })
        .select()
        .single()

      if (invoiceError) {
        console.error('Error creating invoice:', invoiceError)
        throw invoiceError
      }

      console.log('✅ Invoice created successfully:', invoice.id)

      // Then, create the invoice items
      if (invoiceData.items && invoiceData.items.length > 0) {
        const items = invoiceData.items.map((item: any, index: number) => ({
          invoice_id: invoice.id,
          description: item.description || '',
          quantity: item.quantity || 1,
          rate: item.rate || 0,
          amount: item.amount || (item.quantity * item.rate),
          sort_order: index
        }))

        const { error: itemsError } = await supabaseAdmin
          .from('invoice_items')
          .insert(items)

        if (itemsError) {
          console.error('Error creating invoice items:', itemsError)
          throw itemsError
        }

        console.log('✅ Invoice items created successfully')
      }

      return invoice
    } catch (error) {
      console.error('Error creating invoice:', error)
      throw error
    }
  },

  // Update invoice
  async updateInvoice(id: string, updates: any): Promise<Tables<'invoices'>> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('invoices')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating invoice:', error)
      throw error
    }
  },

  // Update invoice status
  async updateInvoiceStatus(id: string, status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'): Promise<Tables<'invoices'>> {
    try {
      const updateData: any = { status, updated_at: new Date().toISOString() }
      
      if (status === 'sent') {
        updateData.sent_at = new Date().toISOString()
      } else if (status === 'paid') {
        updateData.paid_at = new Date().toISOString()
      }

      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('invoices')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating invoice status:', error)
      throw error
    }
  },

  // Delete invoice (also deletes items due to cascade)
  async deleteInvoice(id: string): Promise<void> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { error } = await supabaseAdmin
        .from('invoices')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error deleting invoice:', error)
      throw error
    }
  },

  // Generate next invoice number for user
  async generateInvoiceNumber(userId: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('invoice_number')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) throw error

      if (!data || data.length === 0) {
        return 'INV-2024-001'
      }

      const lastInvoice = data[0]
      const match = lastInvoice.invoice_number.match(/INV-(\d{4})-(\d{3})/)
      
      if (match) {
        const year = new Date().getFullYear()
        const currentYear = parseInt(match[1])
        let number = parseInt(match[2])
        
        if (year === currentYear) {
          number += 1
        } else {
          number = 1
        }
        
        return `INV-${year}-${number.toString().padStart(3, '0')}`
      }
      
      return 'INV-2024-001'
    } catch (error) {
      console.error('Error generating invoice number:', error)
      return `INV-${new Date().getFullYear()}-001`
    }
  }
}

// Trial services
export const trialService = {
  // Get active trial for user
  async getActiveTrial(userId: string): Promise<Tables<'trials'> | null> {
    try {
      const { data, error } = await supabase
        .from('trials')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error fetching trial:', error)
      throw error
    }
  },

  // Start new trial
  async startTrial(userId: string, plan: 'professional' | 'enterprise' = 'professional'): Promise<Tables<'trials'>> {
    try {
      const startDate = new Date()
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 3) // 3 months

      const features = {
        unlimitedInvoices: true,
        advancedAutomation: true,
        customBranding: true,
        multiCurrency: true,
        analytics: true,
        prioritySupport: true,
        teamCollaboration: plan === 'enterprise',
        apiAccess: plan === 'enterprise',
        ssoIntegration: plan === 'enterprise',
        whiteLabel: plan === 'enterprise'
      }

      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('trials')
        .insert({
          user_id: userId,
          plan,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          features,
          usage_stats: {
            invoicesCreated: 0,
            customersAdded: 0,
            paymentsProcessed: 0
          }
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error starting trial:', error)
      throw error
    }
  },

  // Update trial status
  async updateTrialStatus(userId: string, status: 'active' | 'expired' | 'cancelled' | 'converted'): Promise<Tables<'trials'> | null> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('trials')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('user_id', userId)
        .eq('status', 'active')
        .select()
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }
      return data
    } catch (error) {
      console.error('Error updating trial status:', error)
      throw error
    }
  }
}

// Statistics service
export const statsService = {
  // Get dashboard stats for user
  async getDashboardStats(userId: string) {
    try {
      const [invoicesResult, clientsResult] = await Promise.all([
        supabase
          .from('invoices')
          .select('id, status, total')
          .eq('user_id', userId),
        supabase
          .from('clients')
          .select('id')
          .eq('user_id', userId)
      ])

      if (invoicesResult.error) throw invoicesResult.error
      if (clientsResult.error) throw clientsResult.error

      const invoices = invoicesResult.data || []
      const clients = clientsResult.data || []

      const totalInvoices = invoices.length
      const totalClients = clients.length
      const totalRevenue = invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.total, 0)
      const pendingInvoices = invoices.filter(inv => inv.status === 'sent').length

      return {
        totalInvoices,
        totalClients,
        totalRevenue,
        pendingInvoices,
        recentInvoices: invoices.slice(0, 5),
        recentClients: clients.slice(0, 5)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  }
} 
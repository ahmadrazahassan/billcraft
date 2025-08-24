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

  // Enhanced network connectivity test
  async testSupabaseConnectivity(): Promise<boolean> {
    try {
      console.log('🔗 Testing Supabase connectivity...')
      
      // Simple connectivity test - just try to connect
      const supabaseAdmin = getSupabaseAdmin()
      
      // Test with a simple query that should work even on empty tables
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('count')
        .limit(1)
      
      // Accept both success and "table not found" as valid connectivity
      if (error) {
        // PGRST116 = row not found, PGRST106 = table not found - both are OK for connectivity test
        if (error.code === 'PGRST116' || error.code === 'PGRST106') {
          console.log('✅ Supabase connectivity test passed (table response received)')
          return true
        }
        console.warn('🔗 Supabase connectivity test failed:', error.code, error.message)
        return false
      }
      
      console.log('✅ Supabase connectivity test passed')
      return true
    } catch (error: any) {
      console.warn('🔗 Supabase connectivity test failed:', error.name, error.message)
      return false
    }
  },

  // Get current user by Firebase UID with enhanced error handling
  async getCurrentUser(firebaseUid: string): Promise<Tables<'users'> | null> {
    try {
      console.log('🔍 DATABASE: Getting current user for Firebase UID:', firebaseUid)
      console.log('🔍 DATABASE: Environment check in getCurrentUser:')
      console.log('  - SUPABASE_SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
      console.log('  - SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
      
      // Skip connectivity test - it's causing issues. Go straight to the query.
      console.log('🔍 Skipping connectivity test - attempting direct query...')
      
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
        
        // Enhance error information
        const enhancedError = {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          originalError: error
        }
        
        console.error('Error fetching user from Supabase:', enhancedError)
        throw new Error(`Database query failed: ${error.message} (Code: ${error.code})`)
      }
      
      console.log('User found in Supabase:', data?.id)
      return data
    } catch (error: any) {
      console.error('Error fetching user:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      
      // Provide more specific error messages
      if (error.message.includes('fetch failed')) {
        throw new Error('Network connection failed. Please check your internet connection and try again.')
      } else if (error.message.includes('timeout')) {
        throw new Error('Request timed out. Please check your connection and try again.')
      } else if (error.message.includes('service role key')) {
        throw new Error('Database configuration error. Please check your environment variables.')
      }
      
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
        // Handle race condition: if user already exists, fetch the existing user
        if (error.code === '23505' && error.message.includes('firebase_uid')) {
          console.log('🔄 User already exists (race condition), fetching existing user...')
          const existingUser = await this.getCurrentUser(userData.firebase_uid)
          if (existingUser) {
            console.log('✅ Found existing user:', existingUser.id)
            return existingUser
          }
        }
        
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

  // Sync user with Supabase (create if doesn't exist) - with retry logic and race condition protection
  async syncUser(firebaseUser: any): Promise<Tables<'users'>> {
    console.log('🔍 DATABASE: Starting syncUser function')
    console.log('🔍 DATABASE: Environment check in syncUser:')
    console.log('  - SUPABASE_SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('  - SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0)
    console.log('  - SUPABASE_SERVICE_ROLE_KEY first 20 chars:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) || 'NOT SET')
    
    const maxRetries = 3
    let lastError: any
    
    // Create a unique key for this sync operation to prevent concurrent syncs for the same user
    const syncKey = `sync_${firebaseUser.uid}`
    if ((globalThis as any)[syncKey]) {
      console.log('🔄 Sync already in progress for this user, waiting...')
      return (globalThis as any)[syncKey]
    }
    
    // Set sync in progress flag
    const syncPromise = this._performSync(firebaseUser, maxRetries)
    ;(globalThis as any)[syncKey] = syncPromise
    
    try {
      const result = await syncPromise
      return result
    } finally {
      // Clear the sync flag
      delete (globalThis as any)[syncKey]
    }
  },

  async _performSync(firebaseUser: any, maxRetries: number): Promise<Tables<'users'>> {
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
          
          // Create new user with atomic operation
          const trialEndDate = new Date()
          trialEndDate.setMonth(trialEndDate.getMonth() + 3) // 3 months trial
          
          const userData: Inserts<'users'> = {
            firebase_uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            full_name: firebaseUser.displayName || '',
            plan: 'trial',
            trial_ends_at: trialEndDate.toISOString()
          }
          
          try {
            user = await this.createUser(userData)
            console.log('✅ User successfully created in Supabase:', user.id)
          } catch (createError: any) {
            // If user creation fails due to unique constraint (race condition), try to fetch existing user
            if (createError.code === '23505' && createError.message.includes('firebase_uid')) {
              console.log('🔄 Race condition detected - user already exists, fetching...')
              user = await this.getCurrentUser(firebaseUser.uid)
              if (!user) {
                throw new Error('Failed to create or retrieve user after race condition')
              }
            } else {
              throw createError
            }
          }
          
          // Create trial record for new user (only if user was actually created)
          if (user) {
            try {
              console.log('🚀 Creating trial record for new user:', user.id)
              const existingTrial = await trialService.getActiveTrial(user.id)
              if (!existingTrial) {
                await trialService.startTrial(user.id, 'professional')
                console.log('✅ Trial record created successfully for user:', user.id)
              } else {
                console.log('✅ Trial already exists for user:', user.id)
              }
            } catch (trialError: any) {
              console.error('❌ Failed to create trial record:', trialError)
              // Don't throw error here - user creation was successful, trial creation is supplementary
            }
          }
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
      console.log('🔍 CLIENT SERVICE: Getting clients for userId:', userId)
      const supabaseAdmin = getSupabaseAdmin()
      
      const { data, error } = await supabaseAdmin
        .from('clients')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      console.log('🔍 CLIENT SERVICE: Query result:', { data, error })
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
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
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
      
      // Track client creation in trial usage stats
      try {
        await trialService.incrementUsage(client.user_id, 'customersAdded')
      } catch (usageError) {
        console.warn('Failed to update trial usage for client creation:', usageError)
        // Don't throw - client creation was successful
      }
      
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
      console.log('🔍 INVOICE SERVICE: Getting invoices for userId:', userId)
      const supabaseAdmin = getSupabaseAdmin()
      
      const { data, error } = await supabaseAdmin
        .from('invoices')
        .select(`
          *,
          clients(id, name, email),
          invoice_items(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      console.log('🔍 INVOICE SERVICE: Query result:', { data: data?.length, error })
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
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
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

      // Track invoice creation in trial usage stats
      try {
        await trialService.incrementUsage(invoiceData.userId, 'invoicesCreated')
      } catch (usageError) {
        console.warn('Failed to update trial usage for invoice creation:', usageError)
        // Don't throw - invoice creation was successful
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
      
      // Track payment in trial usage stats when invoice is marked as paid
      if (status === 'paid' && data.user_id) {
        try {
          await trialService.incrementUsage(data.user_id, 'paymentsProcessed')
        } catch (usageError) {
          console.warn('Failed to update trial usage for payment:', usageError)
          // Don't throw - status update was successful
        }
      }
      
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
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('invoices')
        .select('invoice_number')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) throw error

      if (!data || data.length === 0) {
        return `INV-${new Date().getFullYear()}-001`
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
      
      return `INV-${new Date().getFullYear()}-001`
    } catch (error) {
      console.error('Error generating invoice number:', error)
      return `INV-${new Date().getFullYear()}-001`
    }
  }
}

// Trial services
export const trialService = {
  // Get active trial for user
  async getActiveTrial(userId: string): Promise<Tables<'user_trials'> | null> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('user_trials')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }
      
      // Auto-check if trial should be expired
      if (data) {
        const now = new Date()
        const endDate = new Date(data.end_date)
        
        if (now > endDate) {
          // Trial has expired, update status automatically
          console.log('🔄 Auto-expiring trial:', data.id)
          await this.updateTrialStatus(data.user_id, 'expired')
          return { ...data, status: 'expired' as any }
        }
      }
      
      return data
    } catch (error) {
      console.error('Error fetching active trial:', error)
      throw error
    }
  },

  // Get trial by user ID (any status)
  async getTrialByUserId(userId: string): Promise<Tables<'user_trials'> | null> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('user_trials')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }
      
      return data
    } catch (error) {
      console.error('Error fetching trial by user ID:', error)
      throw error
    }
  },

  // Calculate precise trial metrics with timezone support
  calculateTrialMetrics(trial: Tables<'user_trials'>) {
    const now = new Date()
    const startDate = new Date(trial.trial_start)
    const endDate = new Date(trial.trial_end)
    
    // Total trial duration in milliseconds
    const totalDuration = endDate.getTime() - startDate.getTime()
    
    // Time elapsed since start
    const elapsed = Math.max(0, now.getTime() - startDate.getTime())
    
    // Time remaining (can be negative if expired)
    const remaining = endDate.getTime() - now.getTime()
    
    // Calculate days with precise decimal precision
    const totalDays = Math.ceil(totalDuration / (1000 * 60 * 60 * 24))
    const daysElapsed = Math.floor(elapsed / (1000 * 60 * 60 * 24))
    const daysRemaining = Math.max(0, Math.ceil(remaining / (1000 * 60 * 60 * 24)))
    
    // Calculate hours remaining for today
    const hoursRemaining = Math.max(0, Math.ceil(remaining / (1000 * 60 * 60)))
    
    // Progress percentage (0-100)
    const progressPercentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
    
    // Determine status flags
    const isExpired = remaining <= 0
    const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0
    const isExpiringSoonCritical = daysRemaining <= 2 && daysRemaining > 0
    const isInGracePeriod = isExpired && Math.abs(remaining) <= (3 * 24 * 60 * 60 * 1000) // 3 days grace
    
    return {
      totalDays,
      daysElapsed,
      daysRemaining,
      hoursRemaining,
      progressPercentage: Math.round(progressPercentage * 100) / 100, // 2 decimal precision
      isExpired,
      isExpiringSoon,
      isExpiringSoonCritical,
      isInGracePeriod,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      remaining: remaining,
      elapsed: elapsed
    }
  },

  // Start new trial
  async startTrial(userId: string, plan: 'professional' | 'enterprise' = 'professional'): Promise<Tables<'user_trials'>> {
    try {
      // Check if user already has an active trial
      const existingTrial = await this.getActiveTrial(userId)
      if (existingTrial && existingTrial.status === 'active') {
        const metrics = this.calculateTrialMetrics(existingTrial)
        if (!metrics.isExpired) {
          console.log('User already has active trial:', existingTrial.id)
          return existingTrial
        }
      }

      const startDate = new Date()
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 3) // Exactly 3 months from start
      
      // Set to end of day for the end date (23:59:59)
      endDate.setHours(23, 59, 59, 999)

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
        .from('user_trials')
        .insert({
          user_id: userId,
          plan_type: plan,
          status: 'active',
          trial_start: startDate.toISOString(),
          trial_end: endDate.toISOString(),
          trial_days: 90, // 3 months = 90 days
          features_used: features,
          usage_stats: {
            invoicesCreated: 0,
            customersAdded: 0,
            paymentsProcessed: 0,
            reportsGenerated: 0,
            lastUsageUpdate: startDate.toISOString()
          }
        })
        .select()
        .single()
      
      if (error) throw error
      
      console.log('✅ Trial started successfully:', data.id, 'for user:', userId)
      return data
    } catch (error) {
      console.error('Error starting trial:', error)
      throw error
    }
  },

  // Update trial status with automatic cleanup
  async updateTrialStatus(userId: string, status: 'active' | 'expired' | 'cancelled' | 'converted'): Promise<Tables<'user_trials'> | null> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      
      const updateData: any = { 
        status, 
        updated_at: new Date().toISOString() 
      }
      
      // Add specific timestamps based on status
      if (status === 'expired') {
        updateData.expired_at = new Date().toISOString()
      } else if (status === 'converted') {
        updateData.converted_at = new Date().toISOString()
      } else if (status === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString()
      }

      const { data, error } = await supabaseAdmin
        .from('user_trials')
        .update(updateData)
        .eq('user_id', userId)
        .eq('status', 'active') // Only update if currently active
        .select()
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }
      
      console.log('✅ Trial status updated:', data.id, 'to', status)
      return data
    } catch (error) {
      console.error('Error updating trial status:', error)
      throw error
    }
  },

  // Update trial usage statistics
  async updateUsageStats(userId: string, stats: {
    invoicesCreated?: number
    customersAdded?: number  
    paymentsProcessed?: number
    reportsGenerated?: number
  }): Promise<Tables<'user_trials'> | null> {
    try {
      const trial = await this.getActiveTrial(userId)
      if (!trial) return null

      const currentStats = trial.usage_stats || {}
      const updatedStats = {
        ...currentStats,
        ...stats,
        lastUsageUpdate: new Date().toISOString()
      }

      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('user_trials')
        .update({ 
          usage_stats: updatedStats,
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
      console.error('Error updating usage stats:', error)
      throw error
    }
  },

  // Increment usage counter
  async incrementUsage(userId: string, type: 'invoicesCreated' | 'customersAdded' | 'paymentsProcessed' | 'reportsGenerated'): Promise<boolean> {
    try {
      const trial = await this.getActiveTrial(userId)
      if (!trial) return false

      const currentStats = trial.usage_stats || {}
      const currentCount = currentStats[type] || 0
      
      await this.updateUsageStats(userId, {
        [type]: currentCount + 1
      })
      
      return true
    } catch (error) {
      console.error('Error incrementing usage:', error)
      return false
    }
  },

  // Check and update all expired trials (for scheduled cleanup)
  async cleanupExpiredTrials(): Promise<number> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const now = new Date().toISOString()
      
      const { data, error } = await supabaseAdmin
        .from('user_trials')
        .update({ 
          status: 'expired',
          updated_at: now
        })
        .eq('status', 'active')
        .lt('trial_end', now)
        .select('id')
      
      if (error) throw error
      
      const expiredCount = data?.length || 0
      if (expiredCount > 0) {
        console.log(`🧹 Auto-expired ${expiredCount} trials`)
      }
      
      return expiredCount
    } catch (error) {
      console.error('Error during trial cleanup:', error)
      throw error
    }
  },

  // Extend trial (for customer support scenarios)
  async extendTrial(userId: string, additionalDays: number, reason?: string): Promise<Tables<'user_trials'> | null> {
    try {
      const trial = await this.getTrialByUserId(userId)
      if (!trial) return null

      const currentEndDate = new Date(trial.trial_end)
      const newEndDate = new Date(currentEndDate.getTime() + (additionalDays * 24 * 60 * 60 * 1000))
      newEndDate.setHours(23, 59, 59, 999) // End of day

      const supabaseAdmin = getSupabaseAdmin()
      const { data, error } = await supabaseAdmin
        .from('user_trials')
        .update({ 
          trial_end: newEndDate.toISOString(),
          status: 'active', // Reactivate if was expired
          updated_at: new Date().toISOString(),
          extension_reason: reason || `Extended by ${additionalDays} days`
        })
        .eq('user_id', userId)
        .eq('id', trial.id)
        .select()
        .single()
      
      if (error) throw error
      
      console.log(`✅ Trial extended by ${additionalDays} days for user:`, userId)
      return data
    } catch (error) {
      console.error('Error extending trial:', error)
      throw error
    }
  },

  // Get detailed trial status with all metrics
  async getDetailedTrialStatus(userId: string): Promise<{
    trial: Tables<'user_trials'> | null
    metrics: any
    recommendations: any
  }> {
    try {
      const trial = await this.getTrialByUserId(userId)
      
      if (!trial) {
        return {
          trial: null,
          metrics: null,
          recommendations: {
            action: 'start_trial',
            message: 'Start your free trial to access all features',
            urgency: 'low'
          }
        }
      }

      const metrics = this.calculateTrialMetrics(trial)
      
      // Generate recommendations based on trial state
      let recommendations: any = null
      
      if (metrics.isInGracePeriod) {
        recommendations = {
          action: 'upgrade_urgent',
          message: 'Your trial has expired but you still have access. Upgrade now to keep your data!',
          urgency: 'critical',
          suggestedPlan: trial.plan_type
        }
      } else if (metrics.isExpiringSoonCritical) {
        recommendations = {
          action: 'upgrade_now',
          message: `Only ${metrics.daysRemaining} days left! Upgrade now to avoid losing access.`,
          urgency: 'high',
          suggestedPlan: trial.plan_type
        }
      } else if (metrics.isExpiringSoon) {
        recommendations = {
          action: 'consider_upgrade',
          message: `${metrics.daysRemaining} days remaining in your trial. Consider upgrading soon.`,
          urgency: 'medium',
          suggestedPlan: trial.plan_type
        }
      } else if (metrics.isExpired && !metrics.isInGracePeriod) {
        recommendations = {
          action: 'upgrade_required',
          message: 'Your trial has expired. Upgrade to continue using BillCraft.',
          urgency: 'critical',
          suggestedPlan: 'professional'
        }
      }

      return {
        trial,
        metrics,
        recommendations
      }
    } catch (error) {
      console.error('Error getting detailed trial status:', error)
      throw error
    }
  }
}

// Statistics service
export const statsService = {
  // Get dashboard stats for user
  async getDashboardStats(userId: string) {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const [invoicesResult, clientsResult] = await Promise.all([
        supabaseAdmin
          .from('invoices')
          .select('id, status, total')
          .eq('user_id', userId),
        supabaseAdmin
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

 
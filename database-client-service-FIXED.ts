// ============================================================================
// FIXED CLIENT SERVICE - Copy these functions to lib/database.ts
// ============================================================================
// 
// This file contains the CORRECTED client service functions with proper
// address field mapping between frontend ('address') and database ('address_line_1')
// 
// INSTRUCTIONS:
// 1. Open lib/database.ts
// 2. Find the "// Client services" section (around line 328)
// 3. Replace the entire clientService object with the code below
// 4. Save and test
// 
// ============================================================================

import { getSupabaseAdmin } from './lib/supabase'

// Client services (FIXED VERSION)
export const clientService = {
  // Get all clients for a user (WITH ADDRESS MAPPING)
  async getClients(userId: string): Promise<any[]> {
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
      
      // 🚀 FIX: Map address_line_1 to address for frontend compatibility
      return (data || []).map(client => ({
        ...client,
        address: client.address_line_1 || '', // Map DB field to frontend field
        // Keep both for flexibility
      }))
    } catch (error) {
      console.error('Error fetching clients:', error)
      throw error
    }
  },

  // Get single client (WITH ADDRESS MAPPING)
  async getClient(id: string): Promise<any | null> {
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
      
      // 🚀 FIX: Map address_line_1 to address for frontend compatibility
      return data ? {
        ...data,
        address: data.address_line_1 || ''
      } : null
    } catch (error) {
      console.error('Error fetching client:', error)
      throw error
    }
  },

  // Create new client (WITH ADDRESS MAPPING)
  async createClient(clientData: any): Promise<any> {
    try {
      console.log('🔍 CLIENT SERVICE: Creating client with data:', clientData)
      
      const supabaseAdmin = getSupabaseAdmin()
      
      // 🚀 FIX: Map 'address' from frontend to 'address_line_1' for database
      const mappedData: any = {
        user_id: clientData.user_id,
        name: clientData.name,
        email: clientData.email || null,
        phone: clientData.phone || null,
        website: clientData.website || null,
        company_name: clientData.company || clientData.company_name || null,
        
        // Map 'address' to 'address_line_1' for database
        address_line_1: clientData.address || clientData.address_line_1 || null,
        address_line_2: clientData.address_line_2 || null,
        city: clientData.city || null,
        state: clientData.state || null,
        zip_code: clientData.zip_code || null,
        country: clientData.country || 'US',
        
        notes: clientData.notes || null,
        tags: clientData.tags || null,
        is_active: clientData.is_active !== undefined ? clientData.is_active : true
      }
      
      console.log('🔍 CLIENT SERVICE: Mapped data for DB:', mappedData)
      
      const { data, error } = await supabaseAdmin
        .from('clients')
        .insert(mappedData)
        .select()
        .single()
      
      if (error) {
        console.error('🔍 CLIENT SERVICE: Error creating client:', error)
        throw error
      }
      
      console.log('🔍 CLIENT SERVICE: Client created successfully:', data)
      
      // 🚀 FIX: Map address_line_1 back to address for frontend
      return {
        ...data,
        address: data.address_line_1 || ''
      }
    } catch (error) {
      console.error('Error creating client:', error)
      throw error
    }
  },

  // Update client (WITH ADDRESS MAPPING)
  async updateClient(id: string, updates: any): Promise<any> {
    try {
      console.log('🔍 CLIENT SERVICE: Updating client:', id, 'with:', updates)
      
      const supabaseAdmin = getSupabaseAdmin()
      
      // 🚀 FIX: Map 'address' to 'address_line_1' if present
      const mappedUpdates: any = {
        ...updates,
        updated_at: new Date().toISOString()
      }
      
      // Map address field
      if (updates.address !== undefined) {
        mappedUpdates.address_line_1 = updates.address
        delete mappedUpdates.address // Remove as it doesn't exist in DB
      }
      
      // Map company field to company_name
      if (updates.company !== undefined) {
        mappedUpdates.company_name = updates.company
        delete mappedUpdates.company
      }
      
      console.log('🔍 CLIENT SERVICE: Mapped updates for DB:', mappedUpdates)
      
      const { data, error } = await supabaseAdmin
        .from('clients')
        .update(mappedUpdates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('🔍 CLIENT SERVICE: Error updating client:', error)
        throw error
      }
      
      console.log('🔍 CLIENT SERVICE: Client updated successfully:', data)
      
      // 🚀 FIX: Map back for frontend
      return {
        ...data,
        address: data.address_line_1 || ''
      }
    } catch (error) {
      console.error('Error updating client:', error)
      throw error
    }
  },

  // Delete client (NO CHANGES NEEDED)
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
  },

  // 🚀 BONUS: Search clients (NEW FUNCTION - OPTIONAL)
  async searchClients(userId: string, searchTerm: string = '', limit: number = 50): Promise<any[]> {
    try {
      console.log('🔍 CLIENT SERVICE: Searching clients for userId:', userId, 'term:', searchTerm)
      const supabaseAdmin = getSupabaseAdmin()
      
      let query = supabaseAdmin
        .from('clients')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
      
      // If search term provided, filter by multiple fields
      if (searchTerm && searchTerm.trim() !== '') {
        const term = `%${searchTerm}%`
        query = query.or(`name.ilike.${term},email.ilike.${term},phone.ilike.${term},address_line_1.ilike.${term},city.ilike.${term},company_name.ilike.${term}`)
      }
      
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) throw error
      
      // Map address_line_1 to address for frontend
      return (data || []).map(client => ({
        ...client,
        address: client.address_line_1 || ''
      }))
    } catch (error) {
      console.error('Error searching clients:', error)
      throw error
    }
  },

  // 🚀 BONUS: Get client statistics (NEW FUNCTION - OPTIONAL)
  async getClientStats(userId: string): Promise<{
    total: number,
    active: number,
    withInvoices: number,
    recentlyAdded: number
  }> {
    try {
      const supabaseAdmin = getSupabaseAdmin()
      
      // Get total clients
      const { count: total } = await supabaseAdmin
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
      
      // Get active clients
      const { count: active } = await supabaseAdmin
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_active', true)
      
      // Get clients with invoices
      const { data: clientsWithInvoices } = await supabaseAdmin
        .from('invoices')
        .select('client_id')
        .eq('user_id', userId)
        .not('client_id', 'is', null)
      
      const uniqueClients = new Set(clientsWithInvoices?.map(i => i.client_id) || [])
      
      // Get recently added (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      const { count: recentlyAdded } = await supabaseAdmin
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', thirtyDaysAgo.toISOString())
      
      return {
        total: total || 0,
        active: active || 0,
        withInvoices: uniqueClients.size,
        recentlyAdded: recentlyAdded || 0
      }
    } catch (error) {
      console.error('Error fetching client stats:', error)
      return {
        total: 0,
        active: 0,
        withInvoices: 0,
        recentlyAdded: 0
      }
    }
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Example 1: Get all clients (with address mapping)
const clients = await clientService.getClients(userId)
console.log(clients[0].address) // ✅ Will show address from address_line_1

// Example 2: Create client (address automatically mapped)
const newClient = await clientService.createClient({
  user_id: userId,
  name: "John Doe",
  email: "john@example.com",
  address: "123 Main St",  // ✅ Will be saved to address_line_1
  city: "New York"
})

// Example 3: Search clients (NEW!)
const results = await clientService.searchClients(userId, "john")

// Example 4: Get statistics (NEW!)
const stats = await clientService.getClientStats(userId)
console.log(`Total: ${stats.total}, Active: ${stats.active}`)
*/

// ============================================================================
// TESTING CHECKLIST
// ============================================================================

/*
✅ Test 1: Create a new client with address "123 Test St"
   - Verify it saves successfully
   - Check Supabase: should be in address_line_1 column

✅ Test 2: Fetch all clients
   - Verify each client has an 'address' field
   - Verify address contains the correct value

✅ Test 3: Select client in invoice creation
   - Verify address auto-populates
   - Verify it's the correct address

✅ Test 4: Search by address
   - Type "Test" in search box
   - Verify client with "123 Test St" appears

✅ Test 5: Update client address
   - Change address to "456 New St"
   - Verify it saves correctly
   - Verify it displays correctly
*/

// End of Fixed Client Service

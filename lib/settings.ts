import { supabase } from './supabase'

export interface UserSettings {
  profile: {
    displayName: string
    email: string
    phone: string
    avatar: string
    bio: string
    jobTitle: string
    location: string
  }
  business: {
    companyName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    website: string
    taxId: string
    logo: string
    industry: string
    employeeCount: string
  }
  preferences: {
    currency: string
    language: string
    timezone: string
    dateFormat: string
    numberFormat: string
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
    invoicePrefix: string
    defaultTax: string
    defaultPaymentTerms: string
    autoSave: boolean
    darkMode: boolean
    compactMode: boolean
    allowAnalytics: boolean
  }
  security: {
    twoFactorEnabled: boolean
    loginAlerts: boolean
    sessionTimeout: string
    allowedIPs: string[]
    apiAccess: boolean
  }
}

export async function saveUserSettings(userId: string, settings: Partial<UserSettings>) {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }

    // Check if settings already exist
    const { data: existingSettings, error: fetchError } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    const settingsData = {
      user_id: userId,
      profile: settings.profile || {},
      business: settings.business || {},
      preferences: settings.preferences || {},
      security: settings.security || {},
      updated_at: new Date().toISOString()
    }

    if (existingSettings) {
      // Update existing settings
      const { error } = await supabase
        .from('user_settings')
        .update({
          profile: { ...existingSettings.profile, ...settings.profile },
          business: { ...existingSettings.business, ...settings.business },
          preferences: { ...existingSettings.preferences, ...settings.preferences },
          security: { ...existingSettings.security, ...settings.security },
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)

      if (error) throw error
    } else {
      // Create new settings
      const { error } = await supabase
        .from('user_settings')
        .insert(settingsData)

      if (error) throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Error saving user settings:', error)
    throw error
  }
}

export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  try {
    if (!userId) {
      return null
    }

    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    if (!data) {
      return null
    }

    return {
      profile: data.profile || {},
      business: data.business || {},
      preferences: data.preferences || {},
      security: data.security || {}
    }
  } catch (error) {
    console.error('Error fetching user settings:', error)
    return null
  }
}

export async function deleteUserSettings(userId: string) {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }

    const { error } = await supabase
      .from('user_settings')
      .delete()
      .eq('user_id', userId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error deleting user settings:', error)
    throw error
  }
}

// Default settings for new users
export const getDefaultSettings = (): UserSettings => ({
  profile: {
    displayName: '',
    email: '',
    phone: '',
    avatar: '',
    bio: '',
    jobTitle: '',
    location: ''
  },
  business: {
    companyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    website: '',
    taxId: '',
    logo: '',
    industry: '',
    employeeCount: ''
  },
  preferences: {
    currency: 'USD',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US',
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    invoicePrefix: 'INV',
    defaultTax: '0',
    defaultPaymentTerms: '30',
    autoSave: true,
    darkMode: false,
    compactMode: false,
    allowAnalytics: true
  },
  security: {
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: '30',
    allowedIPs: [],
    apiAccess: false
  }
})

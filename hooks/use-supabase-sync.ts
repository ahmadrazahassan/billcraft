'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { userService } from '@/lib/database'
import { useToast } from '@/hooks/use-toast'

interface UseSupabaseSyncReturn {
  isLoading: boolean
  isUserSynced: boolean | null
  syncUser: () => Promise<boolean>
  checkSyncStatus: () => Promise<boolean>
}

export function useSupabaseSync(): UseSupabaseSyncReturn {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isUserSynced, setIsUserSynced] = useState<boolean | null>(null)

  const checkSyncStatus = async (): Promise<boolean> => {
    if (!user) {
      setIsUserSynced(false)
      return false
    }

    try {
      console.log('🔍 Checking Supabase sync status for user:', user.uid)
      const supabaseUser = await userService.getCurrentUser(user.uid)
      const synced = !!supabaseUser
      setIsUserSynced(synced)
      
      if (synced) {
        console.log('✅ User is synced with Supabase:', supabaseUser.id)
      } else {
        console.log('❌ User is not synced with Supabase')
      }
      
      return synced
    } catch (error) {
      console.error('❌ Error checking sync status:', error)
      setIsUserSynced(false)
      return false
    }
  }

  const syncUser = async (): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Sync Failed",
        description: "No user logged in.",
        variant: "destructive"
      })
      return false
    }

    setIsLoading(true)
    
    try {
      console.log('🔄 Starting manual Supabase sync for user:', user.uid)
      
      const supabaseUser = await userService.syncUser(user)
      setIsUserSynced(true)
      
      console.log('✅ Manual sync completed successfully:', supabaseUser.id)
      
      toast({
        title: "✅ Account Synced!",
        description: "Your account has been successfully synced.",
      })
      
      return true
      
    } catch (error: any) {
      console.error('❌ Manual sync failed:', error)
      setIsUserSynced(false)
      
      // Provide specific error messages
      let errorMessage = "Could not sync your account. Please try again."
      
      if (error.message?.includes('service role key not configured')) {
        errorMessage = "Supabase configuration is missing. Please contact support."
      } else if (error.message?.includes('Network error')) {
        errorMessage = "Network error. Please check your internet connection."
      }
      
      toast({
        title: "Sync Failed",
        description: errorMessage,
        variant: "destructive"
      })
      
      return false
      
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isUserSynced,
    syncUser,
    checkSyncStatus
  }
} 
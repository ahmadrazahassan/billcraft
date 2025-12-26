'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { userService } from '@/lib/database'

interface AuthContextType {
  user: User | null
  loading: boolean
  mounted: boolean
  login: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (displayName: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted to true after component mounts on client
    setMounted(true)
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Firebase auth state changed:', user ? { uid: user.uid, email: user.email, displayName: user.displayName } : 'signed out')
      setUser(user)
      
      // Sync user with Supabase when they sign in
      if (user) {
        // Small delay to ensure all Firebase operations are complete
        setTimeout(async () => {
          try {
            console.log('🔄 Starting Supabase sync for user via API:', user.uid)
            
            // Use API route for sync (server-side)
            const response = await fetch('/api/test-sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                firebaseUser: {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  emailVerified: user.emailVerified
                }
              })
            })
            
            const result = await response.json()
            
            if (result.success) {
              if (result.user.id) {
                console.log('✅ Auth state sync completed successfully:', result.user.id)
              } else {
                console.log('✅ User already synced in Supabase')
              }
            } else {
              throw new Error(result.error || 'Auth state sync failed')
            }
            
          } catch (error: any) {
            console.error('❌ Critical error syncing user with Supabase:', error)
            
            // Check if it's a missing service key error
            if (error.message?.includes('service role key not configured')) {
              console.error('🔧 Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
              console.error('Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local file and restart the server')
            } else {
              console.error('💡 You can manually sync from the dashboard if needed')
            }
            
            // Don't prevent the user from being logged in to Firebase,
            // but log the error for debugging
            console.error('User will remain logged into Firebase, but Supabase sync failed.')
          }
        }, 1000) // 1 second delay to ensure profile updates are complete
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      // Add additional scopes if needed
      provider.addScope('email')
      provider.addScope('profile')
      
      // Configure the provider
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      
      const result = await signInWithPopup(auth, provider)
      console.log('Google sign-in successful:', result.user.uid)
      
      // The onAuthStateChanged listener will handle the Supabase sync
      
    } catch (error) {
      console.error('Google sign-in failed:', error)
      throw error
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      console.log('🚀 Starting signup process for:', email)
      
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      console.log('✅ Firebase user created:', user.uid)
      
      await updateProfile(user, { displayName: name })
      console.log('✅ Firebase profile updated with displayName:', name)
      
      // Sync via API route (server-side) instead of direct database call
      let syncAttempts = 0
      const maxSyncAttempts = 3
      let syncSuccess = false
      
      while (syncAttempts < maxSyncAttempts && !syncSuccess) {
        try {
          syncAttempts++
          console.log(`🔄 Sync attempt ${syncAttempts}/${maxSyncAttempts}: Syncing via API route...`)
          
          const response = await fetch('/api/test-sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firebaseUser: {
                uid: user.uid,
                email: user.email,
                displayName: name,
                emailVerified: user.emailVerified
              }
            })
          })
          
          const result = await response.json()
          
          if (result.success) {
            console.log('✅ API sync completed successfully:', result.user.id)
            syncSuccess = true
          } else {
            throw new Error(result.error || 'API sync failed')
          }
          
        } catch (syncError: any) {
          console.error(`❌ Sync attempt ${syncAttempts} failed:`, syncError)
          
          if (syncAttempts < maxSyncAttempts) {
            console.log('⏳ Waiting 2 seconds before retry...')
            await new Promise(resolve => setTimeout(resolve, 2000))
          } else {
            console.error('🚨 All sync attempts failed during signup')
            // Don't throw - let the auth state listener handle it as backup
          }
        }
      }
      
      if (!syncSuccess) {
        console.log('⚠️ Manual sync failed, but auth state listener will retry')
      }
      
      console.log('🎉 Signup process completed!')
      
    } catch (error) {
      console.error('❌ Signup failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      throw error
    }
  }

  const updateUserProfile = async (displayName: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName })
      }
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    mounted,
    login,
    signInWithGoogle,
    signup,
    logout,
    resetPassword,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 
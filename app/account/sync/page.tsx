'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useSupabaseSync } from '@/hooks/use-supabase-sync'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  User,
  Database,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export default function AccountSyncPage() {
  const { user } = useAuth()
  const { isLoading, isUserSynced, syncUser, checkSyncStatus } = useSupabaseSync()
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    if (user && !hasChecked) {
      checkSyncStatus()
      setHasChecked(true)
    }
  }, [user, hasChecked, checkSyncStatus])

  const handleSync = async () => {
    const success = await syncUser()
    if (success) {
      // Refresh the status
      await checkSyncStatus()
    }
  }

  const handleCheckStatus = async () => {
    await checkSyncStatus()
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <Card className="p-8 text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to access account sync settings.
          </p>
          <Button asChild>
            <Link href="/auth/login">Log In</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Sync</h1>
        <p className="text-gray-600 mt-2">
          Manage your account synchronization between Firebase and Supabase.
        </p>
      </div>

      {/* User Info */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Account Information
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Display Name:</span>
            <span className="font-medium">{user.displayName || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Firebase UID:</span>
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {user.uid}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email Verified:</span>
            <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
              {user.emailVerified ? 'Verified' : 'Not Verified'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Sync Status */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Sync Status
        </h2>

        {!hasChecked ? (
          <div className="flex items-center space-x-3 py-4">
            <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-gray-600">Checking sync status...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {isUserSynced ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-amber-500" />
                )}
                <div>
                  <p className="font-medium">
                    {isUserSynced ? 'Account Synced' : 'Sync Required'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isUserSynced 
                      ? 'Your account is properly synchronized with Supabase.'
                      : 'Your account needs to be synchronized with Supabase to access all features.'
                    }
                  </p>
                </div>
              </div>
              <Badge variant={isUserSynced ? 'default' : 'destructive'}>
                {isUserSynced ? 'Synced' : 'Not Synced'}
              </Badge>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleCheckStatus}
                variant="outline"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Check Status
              </Button>

              {!isUserSynced && (
                <Button 
                  onClick={handleSync}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Sync Account
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Help & Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">About Account Sync</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            <strong>What is account sync?</strong><br />
            Account sync ensures your Firebase authentication data is properly 
            synchronized with our Supabase database. This is required for features 
            like invoice management, client storage, and dashboard analytics.
          </p>
          <p>
            <strong>When do I need to sync?</strong><br />
            Sync is typically automatic during signup. You may need to manually 
            sync if you encounter issues accessing dashboard features or if your 
            account was created before our latest updates.
          </p>
          <p>
            <strong>Is it safe?</strong><br />
            Yes, the sync process only transfers your basic profile information 
            (email, name, and unique identifier) to enable app functionality. 
            No sensitive data is involved.
          </p>
        </div>
      </Card>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { userService } from '@/lib/database'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

export default function DebugFixPage() {
  const { user } = useAuth()
  const [envCheck, setEnvCheck] = useState<any>(null)
  const [syncResult, setSyncResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkEnvironment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug-env')
      const result = await response.json()
      setEnvCheck(result.envCheck)
    } catch (error) {
      setEnvCheck({ error: 'Failed to check environment' })
    } finally {
      setLoading(false)
    }
  }

  const forceSync = async () => {
    if (!user) {
      setSyncResult({ error: 'No user logged in' })
      return
    }

    setLoading(true)
    try {
      console.log('🔄 FORCE SYNC: Starting for user:', user.uid)
      
      // First try the direct API test
      const apiResponse = await fetch('/api/test-sync', {
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
      
      const apiResult = await apiResponse.json()
      console.log('🔧 API Test Result:', apiResult)
      
      if (apiResult.success) {
        setSyncResult({ 
          success: true, 
          user: apiResult.user,
          message: 'Sync successful via API!',
          debug: apiResult.debug
        })
      } else {
        setSyncResult({ 
          success: false, 
          error: apiResult.error,
          details: apiResult.debug,
          apiTest: apiResult
        })
      }
      
    } catch (error: any) {
      console.error('❌ FORCE SYNC: Failed:', error)
      setSyncResult({ 
        success: false, 
        error: error.message,
        details: error 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">🔧 Debug & Fix Page</h1>
        <p className="text-gray-600">Diagnose and fix Supabase sync issues</p>
      </div>

      {/* User Status */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Current User</h2>
        {user ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="default">Logged In</Badge>
              <span>{user.email}</span>
            </div>
            <div className="text-sm text-gray-600">
              <div>Firebase UID: {user.uid}</div>
              <div>Display Name: {user.displayName || 'Not set'}</div>
            </div>
          </div>
        ) : (
          <Badge variant="destructive">Not Logged In</Badge>
        )}
      </Card>

      {/* Environment Check */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Environment Variables</h2>
          <Button onClick={checkEnvironment} disabled={loading} size="sm">
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Check'}
          </Button>
        </div>
        
        {envCheck && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {envCheck.hasSupabaseUrl ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-red-500" />}
              <span>Supabase URL: {envCheck.hasSupabaseUrl ? 'SET' : 'MISSING'}</span>
            </div>
            <div className="flex items-center gap-2">
              {envCheck.hasSupabaseAnonKey ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-red-500" />}
              <span>Anon Key: {envCheck.hasSupabaseAnonKey ? 'SET' : 'MISSING'}</span>
            </div>
            <div className="flex items-center gap-2">
              {envCheck.hasSupabaseServiceKey ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-red-500" />}
              <span>Service Key: {envCheck.hasSupabaseServiceKey ? 'SET' : 'MISSING'}</span>
            </div>
            
            <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
              <pre>{JSON.stringify(envCheck, null, 2)}</pre>
            </div>
          </div>
        )}
      </Card>

      {/* Force Sync */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Force User Sync</h2>
          <Button 
            onClick={forceSync} 
            disabled={loading || !user}
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Syncing...
              </>
            ) : (
              'Force Sync Now'
            )}
          </Button>
        </div>

        {syncResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={syncResult.success ? 'default' : 'destructive'}>
                {syncResult.success ? 'Success' : 'Failed'}
              </Badge>
            </div>
            <pre className="text-sm">{JSON.stringify(syncResult, null, 2)}</pre>
          </div>
        )}
      </Card>

      {/* Quick Instructions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Fix Steps</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-blue-50 rounded">
            <strong>1. Check Environment Variables Above</strong>
            <p>All three should show green checkmarks</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded">
            <strong>2. If Service Key is Missing:</strong>
            <p>Add to .env.local and restart: <code>npm run dev</code></p>
          </div>
          <div className="p-3 bg-green-50 rounded">
            <strong>3. Force Sync</strong>
            <p>Use the "Force Sync Now" button above</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 
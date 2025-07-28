import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'

interface TrialData {
  userId: string
  plan: string
  status: 'active' | 'expired' | 'cancelled' | 'converted'
  startDate: string
  endDate: string
  remainingDays: number
  progressPercentage: number
  features: Record<string, boolean>
  usage: {
    invoicesCreated: number
    customersAdded: number
    paymentsProcessed: number
    reportsGenerated: number
  }
  isExpired: boolean
  isExpiringSoon: boolean
}

interface TrialActions {
  startTrial: (plan: string) => Promise<boolean>
  upgradeTrial: (plan: string, paymentMethodId?: string) => Promise<boolean>
  cancelTrial: (reason?: string) => Promise<boolean>
  checkEligibility: () => Promise<boolean>
  refreshTrialData: () => Promise<void>
}

interface UseTrialReturn {
  trial: TrialData | null
  loading: boolean
  error: string | null
  actions: TrialActions
  isTrialActive: boolean
  daysRemaining: number
  trialValue: number
}

export function useTrial(): UseTrialReturn {
  const { user } = useAuth()
  const [trial, setTrial] = useState<TrialData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate trial value based on plan
  const getTrialValue = useCallback((plan: string) => {
    const planPricing = {
      professional: 15,
      enterprise: 49
    }
    return (planPricing[plan as keyof typeof planPricing] || 15) * 3 // 3 months
  }, [])

  // Fetch trial status
  const fetchTrialStatus = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/trial/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setTrial(data.trial)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch trial status')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Trial fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  // Start trial
  const startTrial = useCallback(async (plan: string): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/trial/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan, userId: user.uid })
      })

      if (response.ok) {
        const data = await response.json()
        setTrial(data.trial)
        return true
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to start trial')
        return false
      }
    } catch (err) {
      setError('Failed to start trial')
      console.error('Trial start error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [user])

  // Upgrade trial
  const upgradeTrial = useCallback(async (plan: string, paymentMethodId?: string): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/trial/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          userId: user.uid, 
          newPlan: plan, 
          paymentMethodId 
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Trial would be converted to subscription
        setTrial(null)
        return true
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to upgrade trial')
        return false
      }
    } catch (err) {
      setError('Failed to upgrade trial')
      console.error('Trial upgrade error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [user])

  // Cancel trial
  const cancelTrial = useCallback(async (reason?: string): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/trial/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          action: 'cancel',
          reason: reason || 'User requested cancellation'
        })
      })

      if (response.ok) {
        await fetchTrialStatus() // Refresh trial data
        return true
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to cancel trial')
        return false
      }
    } catch (err) {
      setError('Failed to cancel trial')
      console.error('Trial cancel error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [user, fetchTrialStatus])

  // Check trial eligibility
  const checkEligibility = useCallback(async (): Promise<boolean> => {
    if (!user) return false

    try {
      const response = await fetch(`/api/trial/start?userId=${user.uid}`)
      
      if (response.ok) {
        const data = await response.json()
        return data.eligible
      }
      return false
    } catch (err) {
      console.error('Eligibility check error:', err)
      return false
    }
  }, [user])

  // Refresh trial data
  const refreshTrialData = useCallback(async (): Promise<void> => {
    await fetchTrialStatus()
  }, [fetchTrialStatus])

  // Load trial data on component mount and user change
  useEffect(() => {
    if (user) {
      fetchTrialStatus()
    } else {
      setTrial(null)
    }
  }, [user, fetchTrialStatus])

  // Calculate derived values
  const isTrialActive = trial?.status === 'active' && !trial?.isExpired
  const daysRemaining = trial?.remainingDays || 0
  const trialValue = trial ? getTrialValue(trial.plan) : 0

  const actions: TrialActions = {
    startTrial,
    upgradeTrial,
    cancelTrial,
    checkEligibility,
    refreshTrialData
  }

  return {
    trial,
    loading,
    error,
    actions,
    isTrialActive,
    daysRemaining,
    trialValue
  }
} 
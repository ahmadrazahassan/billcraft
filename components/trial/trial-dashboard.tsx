'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  FileText, 
  CreditCard, 
  Star,
  Zap,
  AlertCircle,
  CheckCircle,
  Crown,
  ArrowRight
} from 'lucide-react'

interface TrialData {
  plan: string
  status: string
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
}

interface TrialDashboardProps {
  userId?: string
  onUpgrade?: (plan: string) => void
}

export function TrialDashboard({ userId, onUpgrade }: TrialDashboardProps) {
  const [trialData, setTrialData] = useState<TrialData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  useEffect(() => {
    fetchTrialStatus()
  }, [userId])

  const fetchTrialStatus = async () => {
    try {
      // In a real implementation, fetch from your API
      const mockData: TrialData = {
        plan: 'professional',
        status: 'active',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        remainingDays: 60,
        progressPercentage: 33,
        features: {
          unlimitedInvoices: true,
          advancedAutomation: true,
          customBranding: true,
          multiCurrency: true,
          analytics: true,
          prioritySupport: true,
        },
        usage: {
          invoicesCreated: 25,
          customersAdded: 12,
          paymentsProcessed: 8,
          reportsGenerated: 5
        }
      }
      
      setTrialData(mockData)
    } catch (error) {
      console.error('Failed to fetch trial status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = (plan: string) => {
    if (onUpgrade) {
      onUpgrade(plan)
    }
    setShowUpgradeModal(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!trialData) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Trial Found</h3>
          <p className="text-gray-600 mb-4">Start your 3-month free trial today!</p>
          <Button onClick={() => handleUpgrade('professional')}>
            Start Free Trial
          </Button>
        </div>
      </Card>
    )
  }

  const isExpiringSoon = trialData.remainingDays <= 7

  return (
    <div className="space-y-6">
      {/* Trial Status Header */}
      <Card className={`border-2 ${isExpiringSoon ? 'border-orange-300 bg-orange-50' : 'border-blue-300 bg-blue-50'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${isExpiringSoon ? 'bg-orange-100' : 'bg-blue-100'}`}>
                {isExpiringSoon ? (
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                ) : (
                  <Zap className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  3-Month Free Trial
                </h2>
                <p className="text-gray-600 capitalize">
                  {trialData.plan} Plan • {trialData.status}
                </p>
              </div>
            </div>
            <Badge 
              className={`${
                isExpiringSoon 
                  ? 'bg-orange-100 text-orange-700 border-orange-200' 
                  : 'bg-green-100 text-green-700 border-green-200'
              }`}
            >
              {trialData.remainingDays} days left
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Trial Progress</span>
              <span>{trialData.progressPercentage}% complete</span>
            </div>
            <Progress 
              value={trialData.progressPercentage} 
              className={`h-3 ${isExpiringSoon ? 'bg-orange-200' : 'bg-blue-200'}`}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Started: {new Date(trialData.startDate).toLocaleDateString()}</span>
              <span>Ends: {new Date(trialData.endDate).toLocaleDateString()}</span>
            </div>
          </div>

          {isExpiringSoon && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-200"
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  Your trial is ending soon! Upgrade now to keep all your data and continue using all features.
                </span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Usage Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Invoices</p>
                <p className="text-xl font-bold">{trialData.usage.invoicesCreated}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Customers</p>
                <p className="text-xl font-bold">{trialData.usage.customersAdded}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Payments</p>
                <p className="text-xl font-bold">{trialData.usage.paymentsProcessed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Reports</p>
                <p className="text-xl font-bold">{trialData.usage.reportsGenerated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Your Trial Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(trialData.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm capitalize">
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <Crown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Love BillCraft? Make it Permanent!
            </h3>
            <p className="text-gray-600 mb-6">
              You've saved ${trialData.plan === 'professional' ? '45' : '147'} during your 3-month trial. 
              Upgrade now to keep all your data and continue growing your business.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Button 
                onClick={() => handleUpgrade('professional')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Star className="w-4 h-4 mr-2" />
                Upgrade to Professional
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleUpgrade('enterprise')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Enterprise
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              30-day money-back guarantee • Cancel anytime • Keep your data
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
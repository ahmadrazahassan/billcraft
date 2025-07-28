'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  Download, 
  Settings,
  AlertCircle,
  CheckCircle2,
  Clock,
  Star,
  Zap,
  Shield,
  Users,
  FileText,
  TrendingUp,
  Gift,
  ArrowUpRight,
  User,
  Mail,
  Phone,
  Building2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'

const plans = [
  {
    name: 'Free Trial',
    price: '$0',
    period: '3 months',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 invoices per month',
      '5 client accounts',
      'Basic templates',
      'Email support',
      'Export to PDF'
    ],
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50',
    icon: Gift,
    popular: false
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'month',
    description: 'Everything you need to scale',
    features: [
      'Unlimited invoices',
      'Unlimited clients',
      'Premium templates',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access'
    ],
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    icon: Crown,
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'month',
    description: 'For large teams and businesses',
    features: [
      'Everything in Professional',
      'Multi-user accounts',
      'Advanced integrations',
      'Custom workflows',
      '24/7 phone support',
      'Dedicated account manager',
      'SSO integration'
    ],
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50',
    icon: Building2,
    popular: false
  }
]

export default function BillingPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [currentPlan, setCurrentPlan] = useState('trial')
  const [trialDaysLeft, setTrialDaysLeft] = useState(0)
  const [trialData, setTrialData] = useState<any>(null)

  useEffect(() => {
    const fetchTrialStatus = async () => {
      if (!user) return
      
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/trial/status', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setTrialData(data.trial)
          setTrialDaysLeft(data.trial.remainingDays)
          setCurrentPlan(data.trial.status === 'active' ? 'trial' : 'expired')
        } else {
          // Fallback: calculate based on user creation date
          const accountCreationDate = new Date(user.metadata.creationTime || Date.now())
          const now = new Date()
          const trialEndDate = new Date(accountCreationDate)
          trialEndDate.setMonth(trialEndDate.getMonth() + 3) // 3 months trial
          
          const remainingTime = trialEndDate.getTime() - now.getTime()
          const remainingDays = Math.max(0, Math.ceil(remainingTime / (1000 * 60 * 60 * 24)))
          
          setTrialDaysLeft(remainingDays)
          setCurrentPlan(remainingDays > 0 ? 'trial' : 'expired')
        }
      } catch (error) {
        console.error('Failed to fetch trial status:', error)
        // Fallback calculation
        if (user.metadata.creationTime) {
          const accountCreationDate = new Date(user.metadata.creationTime)
          const now = new Date()
          const trialEndDate = new Date(accountCreationDate)
          trialEndDate.setMonth(trialEndDate.getMonth() + 3)
          
          const remainingTime = trialEndDate.getTime() - now.getTime()
          const remainingDays = Math.max(0, Math.ceil(remainingTime / (1000 * 60 * 60 * 24)))
          
          setTrialDaysLeft(remainingDays)
          setCurrentPlan(remainingDays > 0 ? 'trial' : 'expired')
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchTrialStatus()
    } else {
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-3xl animate-pulse w-1/2"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-2xl animate-pulse w-1/3"></div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-sm border border-slate-200 animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="h-80 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-sm border border-slate-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50 rounded-3xl"></div>
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-orange-900 to-amber-900 bg-clip-text text-transparent">
                    Subscription & Billing
                  </h1>
                  <p className="text-slate-600 mt-1 text-lg">
                    Manage your subscription and billing details
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3 mt-6 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Badge variant="secondary" className="rounded-full px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                {trialDaysLeft} days left in trial
              </Badge>
              <Button className="rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Plan Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Current Plan</h3>
                  <Badge className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                    <Gift className="h-3 w-3 mr-1" />
                    Free Trial
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                    <Calendar className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-green-900">{trialDaysLeft}</p>
                    <p className="text-sm text-green-700">Days Remaining</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-blue-900">0</p>
                    <p className="text-sm text-blue-700">Invoices Created</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-purple-900">0</p>
                    <p className="text-sm text-purple-700">Active Clients</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                      <AlertCircle className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-amber-900 mb-2">Trial Ending Soon</h4>
                      <p className="text-sm text-amber-700 mb-4">
                        Your free trial will end in {trialDaysLeft} days. Upgrade to continue using all features without interruption.
                      </p>
                      <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl">
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade to Professional
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Available Plans */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Available Plans</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                        plan.popular 
                          ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50' 
                          : 'border-slate-200 bg-white/50 hover:border-slate-300'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-3 py-1">
                            <Star className="h-3 w-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}>
                          <plan.icon className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h4>
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                          <span className="text-slate-600">/{plan.period}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">{plan.description}</p>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full rounded-xl ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
                            : 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-900'
                        }`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {currentPlan === 'trial' && plan.name === 'Free Trial' ? 'Current Plan' : 'Choose Plan'}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Billing Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Billing Info</h3>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Settings className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">{user?.displayName || 'No name set'}</p>
                        <p className="text-sm text-slate-600">Account holder</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">{user?.email || 'No email set'}</p>
                        <p className="text-sm text-slate-600">Billing email</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">No payment method</p>
                        <p className="text-sm text-slate-600">Add a card to upgrade</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Billing History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Billing History</h3>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
                
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">No billing history yet</h4>
                  <p className="text-sm text-slate-600">
                    Your billing history will appear here once you upgrade to a paid plan.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
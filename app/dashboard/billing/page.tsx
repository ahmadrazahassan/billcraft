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
  Layers,
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
  Building2,
  Rocket
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
    description: 'Perfect for getting started - All Professional features included',
    features: [
      'All Professional features included',
      'Unlimited invoices & clients',
      'AI-powered automation',
      '25+ Beautiful templates',
      'Payment integrations',
      'Team collaboration (up to 5 users)',
      'Priority email support',
      'No credit card required'
    ],
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    icon: Gift,
    popular: false
  },
  {
    name: 'Professional',
    price: '$10',
    period: 'month',
    description: 'Everything you need to scale your business',
    features: [
      'Unlimited invoices & clients',
      'AI-powered form filling & automation',
      'Custom branding & 25+ templates',
      'Multi-currency support (50+ currencies)',
      'Advanced analytics & reports',
      'Payment integration (Stripe, PayPal)',
      'Automated reminders & follow-ups',
      'Team collaboration (up to 5 users)',
      'Priority email support',
      'Invoice approval workflow'
    ],
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-50 to-purple-50',
    icon: Layers,
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$20',
    period: 'month',
    description: 'For large teams and enterprises',
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Advanced roles & permissions',
      'API access & webhooks',
      'SSO integration (SAML, OAuth)',
      'Advanced security & compliance',
      'Custom integrations & white-label',
      'Dedicated account manager',
      'Advanced reporting & analytics',
      '24/7 priority support',
      'Custom training & onboarding',
      'SLA guarantee'
    ],
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50',
    icon: Crown,
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
            <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">Current Plan</h3>
                  <Badge className="rounded-[1rem] bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 px-4 py-2 font-bold shadow-lg">
                    <Gift className="h-4 w-4 mr-2" />
                    Free Trial
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-8 rounded-[1.5rem] bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Calendar className="h-10 w-10 text-green-600 mx-auto mb-4" />
                    <p className="text-3xl font-black text-green-900">{trialDaysLeft}</p>
                    <p className="text-sm text-green-700 font-bold">Days Remaining</p>
                  </div>
                  
                  <div className="text-center p-8 rounded-[1.5rem] bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <FileText className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
                    <p className="text-3xl font-black text-indigo-900">0</p>
                    <p className="text-sm text-indigo-700 font-bold">Invoices Created</p>
                  </div>
                  
                  <div className="text-center p-8 rounded-[1.5rem] bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Users className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                    <p className="text-3xl font-black text-purple-900">0</p>
                    <p className="text-sm text-purple-700 font-bold">Active Clients</p>
                  </div>
                </div>

                <div className="mt-10 p-8 bg-gradient-to-r from-orange-50 to-pink-50 rounded-[1.5rem] border border-orange-200 shadow-lg">
                  <div className="flex items-start space-x-6">
                    <motion.div 
                      className="p-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-[1rem] shadow-lg"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <AlertCircle className="h-8 w-8 text-orange-600" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-black text-orange-900 mb-3 text-lg">Trial Ending Soon</h4>
                      <p className="text-sm text-orange-700 mb-6 font-medium leading-relaxed">
                        Your free trial will end in {trialDaysLeft} days. Upgrade to continue using all features without interruption.
                      </p>
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-[1rem] shadow-xl hover:shadow-2xl transition-all duration-300 font-bold px-6 py-3">
                        <Crown className="h-5 w-5 mr-2" />
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
            <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
              <div className="p-10">
                <h3 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-8">Available Plans</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`relative p-8 rounded-[2rem] border-2 transition-all duration-500 hover:shadow-xl ${
                        plan.popular 
                          ? 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl' 
                          : 'border-white/50 bg-white/60 hover:border-white/70 backdrop-blur-2xl'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[1rem] px-4 py-2 shadow-xl font-bold">
                            <Layers className="h-4 w-4 mr-2" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <div className="text-center mb-8">
                        <motion.div 
                          className={`w-20 h-20 mx-auto mb-6 rounded-[1.5rem] bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-xl`}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <plan.icon className="h-10 w-10 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-black text-slate-900 mb-3">{plan.name}</h4>
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                          <span className="text-slate-600 font-medium">/{plan.period}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-3 font-medium">{plan.description}</p>
                      </div>
                      
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-4 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full rounded-[1.5rem] py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white' 
                            : 'border border-white/50 bg-white/70 hover:bg-white/90 text-slate-900 backdrop-blur-2xl'
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
        <div className="space-y-10">
          {/* Billing Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">Billing Info</h3>
                  <Button variant="outline" size="sm" className="rounded-[1rem] border-white/50 bg-white/60 hover:bg-white/80 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-bold">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-[1.5rem] bg-white/60 border border-white/40 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <User className="h-6 w-6 text-indigo-600" />
                      <div>
                        <p className="font-bold text-slate-900">{user?.displayName || 'No name set'}</p>
                        <p className="text-sm text-slate-600 font-medium">Account holder</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-[1.5rem] bg-white/60 border border-white/40 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="font-bold text-slate-900">{user?.email || 'No email set'}</p>
                        <p className="text-sm text-slate-600 font-medium">Billing email</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-[1.5rem] bg-white/60 border border-white/40 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-6 w-6 text-violet-600" />
                      <div>
                        <p className="font-bold text-slate-900">No payment method</p>
                        <p className="text-sm text-slate-600 font-medium">Add a card to upgrade</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-8 rounded-[1.5rem] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 font-bold py-3">
                  <CreditCard className="h-5 w-5 mr-2" />
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
            <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">Billing History</h3>
                  <Button variant="outline" size="sm" className="rounded-[1rem] border-white/50 bg-white/60 hover:bg-white/80 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-bold">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                <div className="text-center py-16">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <FileText className="h-10 w-10 text-indigo-600" />
                  </div>
                    <h4 className="font-black text-slate-900 mb-3 text-lg">No billing history yet</h4>
                    <p className="text-sm text-slate-600 font-medium">
                    Your billing history will appear here once you upgrade to a paid plan.
                  </p>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
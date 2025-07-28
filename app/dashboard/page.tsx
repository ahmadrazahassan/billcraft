'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/auth-context'
import { userService, invoiceService, clientService } from '@/lib/database'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import {
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Plus,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Calendar,
  Zap,
  Star,
  BarChart3,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Target,
  Activity,
  CreditCard,
  Settings,
  Bell,
  Search
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalRevenue: number
  totalInvoices: number
  totalClients: number
  pendingInvoices: number
  monthlyRevenue: number
  unpaidAmount: number
  averageInvoiceValue: number
  conversionRate: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalInvoices: 0,
    totalClients: 0,
    pendingInvoices: 0,
    monthlyRevenue: 0,
    unpaidAmount: 0,
    averageInvoiceValue: 0,
    conversionRate: 0
  })
  const [recentInvoices, setRecentInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [syncStatus, setSyncStatus] = useState<'checking' | 'synced' | 'needs-sync'>('checking')
  const [isSyncing, setIsSyncing] = useState(false)
  const [supabaseUser, setSupabaseUser] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // Check if user exists in Supabase via API
      console.log('🔍 Checking user sync status via API...')
      
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
      
      if (!result.success) {
        console.log('❌ User not synced with Supabase')
        setSyncStatus('needs-sync')
        setLoading(false)
        return
      }

      const currentUser = result.user
      console.log('✅ User found in Supabase:', currentUser.id)
      setSupabaseUser(currentUser)
      setSyncStatus('synced')

      // Load dashboard data using the regular services
      const [invoices, clients] = await Promise.all([
        invoiceService.getInvoices(currentUser.id),
        clientService.getClients(currentUser.id)
      ])

      // Calculate comprehensive stats
      const totalRevenue = invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.total, 0)
      
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const monthlyRevenue = invoices
        .filter(inv => {
          const invoiceDate = new Date(inv.created_at)
          return inv.status === 'paid' && 
                 invoiceDate.getMonth() === currentMonth && 
                 invoiceDate.getFullYear() === currentYear
        })
        .reduce((sum, inv) => sum + inv.total, 0)

      const unpaidAmount = invoices
        .filter(inv => inv.status === 'sent')
        .reduce((sum, inv) => sum + inv.total, 0)

      const averageInvoiceValue = invoices.length > 0 
        ? invoices.reduce((sum, inv) => sum + inv.total, 0) / invoices.length 
        : 0

      const paidInvoices = invoices.filter(inv => inv.status === 'paid').length
      const conversionRate = invoices.length > 0 ? (paidInvoices / invoices.length) * 100 : 0
      
      setStats({
        totalRevenue,
        totalInvoices: invoices.length,
        totalClients: clients.length,
        pendingInvoices: invoices.filter(inv => inv.status === 'sent').length,
        monthlyRevenue,
        unpaidAmount,
        averageInvoiceValue,
        conversionRate
      })

      setRecentInvoices(invoices.slice(0, 4))

    } catch (error) {
      console.error('❌ Error loading dashboard:', error)
      setSyncStatus('needs-sync')
      toast({
        title: "Error Loading Dashboard",
        description: "Could not load your dashboard data. Please try syncing your account.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleManualSync = async () => {
    if (!user) return

    try {
      setIsSyncing(true)
      console.log('🔄 Starting manual sync via API...')
      
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
        console.log('✅ Manual sync completed via API:', result.user.id)
        setSupabaseUser(result.user)
        setSyncStatus('synced')
        
        toast({
          title: "✅ Account Synced!",
          description: "Your account has been successfully synced.",
        })

        await loadDashboardData()
      } else {
        throw new Error(result.error || 'Manual sync failed')
      }
      
    } catch (error: any) {
      console.error('❌ Manual sync failed:', error)
      setSyncStatus('needs-sync')
      
      toast({
        title: "Sync Failed",
        description: error.message || "Could not sync your account. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSyncing(false)
    }
  }

  if (loading && syncStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 flex items-center justify-center p-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <RefreshCw className="h-10 w-10 animate-spin text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-full mx-auto animate-ping opacity-30"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Loading Dashboard</h3>
          <p className="text-gray-600 text-lg">Preparing your business insights...</p>
        </motion.div>
      </div>
    )
  }

  if (syncStatus === 'needs-sync') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 flex items-center justify-center p-6">
        <motion.div 
          className="max-w-lg w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="p-10 text-center bg-white/30 backdrop-blur-2xl border-white/30 shadow-2xl rounded-3xl">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <AlertCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Account Sync Required</h2>
            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              Your account needs to be synced with our database to access your personalized dashboard and all features.
            </p>
            <Button 
              onClick={handleManualSync}
              disabled={isSyncing}
              className="w-full h-14 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 hover:from-violet-600 hover:via-blue-600 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-6 w-6 animate-spin mr-3" />
                  Syncing Account...
                </>
              ) : (
                <>
                  <CheckCircle className="h-6 w-6 mr-3" />
                  Sync My Account
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-6">
              This is a one-time setup process that takes just a few seconds.
            </p>
          </Card>
        </motion.div>
      </div>
    )
  }

  const quickActions = [
    {
      title: 'Create Invoice',
      description: 'Generate professional invoices',
      icon: FileText,
      href: '/dashboard/invoices/create',
      gradient: 'from-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Manage Clients',
      description: 'Add and organize clients',
      icon: Users,
      href: '/dashboard/clients',
      gradient: 'from-emerald-500 to-teal-500',
      hoverGradient: 'from-emerald-600 to-teal-600'
    },
    {
      title: 'Settings',
      description: 'Customize your account',
      icon: Settings,
      href: '/dashboard/settings',
      gradient: 'from-orange-500 to-red-500',
      hoverGradient: 'from-orange-600 to-red-600'
    }
  ]

  const statsData = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: `+${((stats.monthlyRevenue / (stats.totalRevenue || 1)) * 100).toFixed(1)}%`,
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-emerald-400 to-teal-500',
      bg: 'from-emerald-50/60 to-teal-50/60',
      description: 'This month'
    },
    {
      title: 'Active Invoices',
      value: stats.totalInvoices.toString(),
      change: `${stats.pendingInvoices} pending`,
      trend: stats.pendingInvoices > 0 ? 'neutral' : 'up',
      icon: FileText,
      gradient: 'from-blue-400 to-indigo-500',
      bg: 'from-blue-50/60 to-indigo-50/60',
      description: 'Total created'
    },
    {
      title: 'Total Clients',
      value: stats.totalClients.toString(),
      change: 'Growing',
      trend: 'up',
      icon: Users,
      gradient: 'from-purple-400 to-violet-500',
      bg: 'from-purple-50/60 to-violet-50/60',
      description: 'Active clients'
    },
    {
      title: 'Success Rate',
      value: `${stats.conversionRate.toFixed(1)}%`,
      change: 'Payment rate',
      trend: stats.conversionRate >= 70 ? 'up' : stats.conversionRate >= 50 ? 'neutral' : 'down',
      icon: Target,
      gradient: 'from-orange-400 to-pink-500',
      bg: 'from-orange-50/60 to-pink-50/60',
      description: 'Conversion'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20">
      <div className="max-w-7xl mx-auto p-8 space-y-10">
        {/* Advanced Header */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl xl:text-5xl font-black bg-gradient-to-r from-gray-900 via-violet-900 to-blue-900 bg-clip-text text-transparent leading-tight">
                    Welcome back!
                  </h1>
                  <p className="text-xl font-semibold text-gray-700">
                    {user?.displayName?.split(' ')[0] || 'User'} 👋
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium text-sm">{currentTime.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="font-medium text-sm">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="mt-6 xl:mt-0 flex items-center space-x-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button variant="outline" className="h-11 px-6 rounded-xl bg-white/50 backdrop-blur-lg border-white/40 hover:bg-white/70 hover:border-white/60 transition-all duration-300 font-medium">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button asChild className="h-11 px-6 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 hover:from-violet-600 hover:via-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                <Link href="/dashboard/invoices/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Advanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Card className="relative overflow-hidden bg-white/25 backdrop-blur-xl border-white/30 shadow-xl hover:shadow-2xl transition-all duration-400 rounded-2xl h-36">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-40`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                
                <div className="relative p-6 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline space-x-2 mb-1">
                        <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                        <div className={`flex items-center text-xs font-semibold ${
                          stat.trend === 'up' ? 'text-emerald-600' : 
                          stat.trend === 'down' ? 'text-red-500' : 'text-amber-600'
                        }`}>
                          <ArrowUpRight className={`h-3 w-3 mr-1 ${
                            stat.trend === 'down' ? 'rotate-90' : stat.trend === 'neutral' ? 'rotate-45' : ''
                          }`} />
                          {stat.change}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{stat.description}</p>
                    </div>
                    
                    <motion.div 
                      className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <stat.icon className="h-5 w-5 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="w-full bg-white/25 rounded-full h-2 backdrop-blur-sm overflow-hidden">
                      <motion.div 
                        className={`h-2 bg-gradient-to-r ${stat.gradient} rounded-full shadow-sm`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.max(20, (index + 1) * 25))}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content - Enhanced Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Quick Actions - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="xl:col-span-2"
          >
            <Card className="bg-white/25 backdrop-blur-xl border-white/30 shadow-xl rounded-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Quick Actions</h3>
                    <p className="text-gray-600">Streamline your workflow</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="group"
                    >
                      <Link href={action.href}>
                        <Card className="p-5 bg-white/30 hover:bg-white/50 border-white/40 hover:shadow-lg transition-all duration-300 rounded-xl cursor-pointer backdrop-blur-md group-hover:border-white/60">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <motion.div 
                              className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} group-hover:bg-gradient-to-r group-hover:${action.hoverGradient} shadow-md group-hover:shadow-lg transition-all duration-300`}
                              whileHover={{ scale: 1.05 }}
                            >
                              <action.icon className="h-5 w-5 text-white" />
                            </motion.div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                                {action.title}
                              </h4>
                              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                                {action.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Invoices - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Card className="bg-white/25 backdrop-blur-xl border-white/30 shadow-xl rounded-2xl overflow-hidden h-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Recent Invoices</h3>
                    <p className="text-sm text-gray-600">Latest billing activity</p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="bg-white/40 hover:bg-white/60 border-white/50 rounded-xl font-medium text-xs">
                    <Link href="/dashboard/invoices">
                      <Eye className="h-3 w-3 mr-2" />
                      View All
                    </Link>
                  </Button>
                </div>
                
                <AnimatePresence mode="wait">
                  {recentInvoices.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">No invoices yet</h4>
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        Create your first professional invoice
                      </p>
                      <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-md px-6 py-2 font-medium text-sm">
                        <Link href="/dashboard/invoices/create">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Invoice
                        </Link>
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {recentInvoices.map((invoice, index) => (
                        <motion.div 
                          key={invoice.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.01, x: 3 }}
                          className="group"
                        >
                          <Link href={`/dashboard/invoices/${invoice.id}`}>
                            <Card className="p-4 bg-white/30 hover:bg-white/50 rounded-xl transition-all duration-300 cursor-pointer group backdrop-blur-md border-white/40 hover:border-white/60 hover:shadow-md">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                                    <FileText className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                                      {invoice.invoice_number}
                                    </p>
                                    <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                                      {invoice.client_name || 'No client'}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-gray-900 text-sm">
                                    ${invoice.total.toFixed(2)}
                                  </p>
                                  <Badge 
                                    variant={
                                      invoice.status === 'paid' ? 'default' :
                                      invoice.status === 'sent' ? 'secondary' :
                                      'outline'
                                    }
                                    className="rounded-lg font-medium text-xs"
                                  >
                                    {invoice.status}
                                  </Badge>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
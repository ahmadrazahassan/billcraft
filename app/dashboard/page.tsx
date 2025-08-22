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
  Layers,
  BarChart3,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Target,
  Activity,
  CreditCard,
  Settings,
  Bell,
  Search,
  Sparkles,
  Rocket
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl backdrop-blur-3xl">
              <RefreshCw className="h-12 w-12 animate-spin text-white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-[2rem] mx-auto animate-ping opacity-30"></div>
          </div>
          <h3 className="text-4xl font-black bg-gradient-to-r from-indigo-900 via-purple-800 to-violet-900 bg-clip-text text-transparent mb-4">Loading Dashboard</h3>
          <p className="text-xl text-slate-600 font-medium">Preparing your business insights...</p>
        </motion.div>
      </div>
    )
  }

  if (syncStatus === 'needs-sync') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <motion.div 
          className="max-w-lg w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="p-12 text-center bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem]">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
              <AlertCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-4">Account Sync Required</h2>
            <p className="text-slate-600 mb-10 leading-relaxed text-lg font-medium">
              Your account needs to be synced with our database to access your personalized dashboard and all features.
            </p>
            <Button 
              onClick={handleManualSync}
              disabled={isSyncing}
              className="w-full h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white font-bold rounded-[1.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
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
            <p className="text-sm text-slate-500 mt-6 font-medium">
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
      gradient: 'from-indigo-500 to-purple-600',
      hoverGradient: 'from-indigo-600 to-purple-700'
    },
    {
      title: 'Manage Clients',
      description: 'Add and organize clients',
      icon: Users,
      href: '/dashboard/clients',
      gradient: 'from-emerald-500 to-teal-600',
      hoverGradient: 'from-emerald-600 to-teal-700'
    },
    {
      title: 'Settings',
      description: 'Customize your account',
      icon: Settings,
      href: '/dashboard/settings',
      gradient: 'from-orange-500 to-pink-600',
      hoverGradient: 'from-orange-600 to-pink-700'
    }
  ]

  const statsData = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: `+${((stats.monthlyRevenue / (stats.totalRevenue || 1)) * 100).toFixed(1)}%`,
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'from-emerald-50/80 to-teal-50/80',
      description: 'This month'
    },
    {
      title: 'Active Invoices',
      value: stats.totalInvoices.toString(),
      change: `${stats.pendingInvoices} pending`,
      trend: stats.pendingInvoices > 0 ? 'neutral' : 'up',
      icon: FileText,
      gradient: 'from-indigo-500 to-purple-600',
      bg: 'from-indigo-50/80 to-purple-50/80',
      description: 'Total created'
    },
    {
      title: 'Total Clients',
      value: stats.totalClients.toString(),
      change: 'Growing',
      trend: 'up',
      icon: Users,
      gradient: 'from-purple-500 to-violet-600',
      bg: 'from-purple-50/80 to-violet-50/80',
      description: 'Active clients'
    },
    {
      title: 'Success Rate',
      value: `${stats.conversionRate.toFixed(1)}%`,
      change: 'Payment rate',
      trend: stats.conversionRate >= 70 ? 'up' : stats.conversionRate >= 50 ? 'neutral' : 'down',
      icon: Target,
      gradient: 'from-orange-500 to-pink-600',
      bg: 'from-orange-50/80 to-pink-50/80',
      description: 'Conversion'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Ultra-Modern Header */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-6 mb-6">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-[1.5rem] flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Layers className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-5xl xl:text-6xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent leading-tight">
                    Welcome back!
                  </h1>
                  <p className="text-2xl font-bold text-slate-700 mt-2">
                    {user?.displayName?.split(' ')[0] || 'User'} 👋
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-8 mt-6">
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-2xl rounded-[1rem] border border-white/40 shadow-lg">
                  <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
                  <span className="font-bold text-sm text-slate-700">{currentTime.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-2xl rounded-[1rem] border border-white/40 shadow-lg">
                  <Clock className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-bold text-sm text-slate-700">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="mt-8 xl:mt-0 flex items-center space-x-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button variant="outline" className="h-14 px-8 rounded-[1.25rem] bg-white/60 backdrop-blur-3xl border-white/50 hover:bg-white/80 hover:border-white/70 transition-all duration-300 font-bold shadow-lg hover:shadow-xl">
                <Bell className="h-5 w-5 mr-3" />
                Notifications
              </Button>
              <Button asChild className="h-14 px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white rounded-[1.25rem] shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg">
                <Link href="/dashboard/invoices/create">
                  <Rocket className="h-5 w-5 mr-3" />
                  Create Invoice
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Ultra-Modern Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group cursor-pointer"
            >
              <Card className="relative overflow-hidden bg-white/40 backdrop-blur-3xl border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem] h-44">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-50`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                
                <div className="relative p-7 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">
                        {stat.title}
                      </p>
                      <div className="flex items-baseline space-x-3 mb-2">
                        <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                        <div className={`flex items-center text-xs font-bold ${
                          stat.trend === 'up' ? 'text-emerald-600' : 
                          stat.trend === 'down' ? 'text-red-500' : 'text-amber-600'
                        }`}>
                          <ArrowUpRight className={`h-4 w-4 mr-1 ${
                            stat.trend === 'down' ? 'rotate-90' : stat.trend === 'neutral' ? 'rotate-45' : ''
                          }`} />
                          {stat.change}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 font-bold">{stat.description}</p>
                    </div>
                    
                    <motion.div 
                      className={`p-4 rounded-[1.25rem] bg-gradient-to-r ${stat.gradient} shadow-xl`}
                      whileHover={{ scale: 1.15, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="w-full bg-white/30 rounded-full h-3 backdrop-blur-sm overflow-hidden shadow-inner">
                      <motion.div 
                        className={`h-3 bg-gradient-to-r ${stat.gradient} rounded-full shadow-sm`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.max(25, (index + 1) * 25))}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1.2, ease: "easeOut" }}
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
          {/* Ultra-Modern Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="xl:col-span-2"
          >
            <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-2">Quick Actions</h3>
                    <p className="text-lg text-slate-600 font-bold">Streamline your workflow</p>
                  </div>
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[1.25rem] flex items-center justify-center shadow-xl"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Zap className="h-7 w-7 text-white" />
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <Link href={action.href}>
                        <Card className="p-7 bg-white/40 hover:bg-white/60 border-white/50 hover:shadow-xl transition-all duration-400 rounded-[1.75rem] cursor-pointer backdrop-blur-md group-hover:border-white/70 hover:shadow-indigo-500/10">
                          <div className="flex flex-col items-center text-center space-y-4">
                            <motion.div 
                              className={`p-4 rounded-[1.25rem] bg-gradient-to-r ${action.gradient} group-hover:bg-gradient-to-r group-hover:${action.hoverGradient} shadow-xl group-hover:shadow-2xl transition-all duration-400`}
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <action.icon className="h-6 w-6 text-white" />
                            </motion.div>
                            <div>
                              <h4 className="font-black text-lg text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                                {action.title}
                              </h4>
                              <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors font-medium">
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

          {/* Ultra-Modern Recent Invoices */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden h-full">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-2">Recent Invoices</h3>
                    <p className="text-sm text-slate-600 font-bold">Latest billing activity</p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="bg-white/50 hover:bg-white/70 border-white/60 rounded-[1rem] font-bold text-sm px-4 py-2 hover:shadow-lg transition-all duration-300">
                    <Link href="/dashboard/invoices">
                      <Eye className="h-4 w-4 mr-2" />
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
                      className="text-center py-16"
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-100/80 to-purple-100/80 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-lg">
                        <FileText className="h-10 w-10 text-indigo-600" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-3">No invoices yet</h4>
                      <p className="text-slate-600 mb-8 text-sm leading-relaxed font-medium">
                        Create your first professional invoice
                      </p>
                      <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white rounded-[1rem] shadow-xl px-8 py-3 font-bold text-sm hover:shadow-2xl transition-all duration-300">
                        <Link href="/dashboard/invoices/create">
                          <Rocket className="h-4 w-4 mr-2" />
                          Create Invoice
                        </Link>
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {recentInvoices.map((invoice, index) => (
                        <motion.div 
                          key={invoice.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="group"
                        >
                          <Link href={`/dashboard/invoices/${invoice.id}`}>
                            <Card className="p-5 bg-white/40 hover:bg-white/60 rounded-[1.5rem] transition-all duration-400 cursor-pointer group backdrop-blur-md border-white/50 hover:border-white/70 hover:shadow-xl hover:shadow-indigo-500/10">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <motion.div 
                                    className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[1rem] flex items-center justify-center shadow-lg"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                  >
                                    <FileText className="h-5 w-5 text-white" />
                                  </motion.div>
                                  <div>
                                    <p className="font-black text-slate-900 group-hover:text-indigo-700 transition-colors text-base">
                                      {invoice.invoice_number}
                                    </p>
                                    <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors font-medium">
                                      {invoice.client_name || 'No client'}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-black text-slate-900 text-lg">
                                    ${invoice.total.toFixed(2)}
                                  </p>
                                  <Badge 
                                    variant={
                                      invoice.status === 'paid' ? 'default' :
                                      invoice.status === 'sent' ? 'secondary' :
                                      'outline'
                                    }
                                    className="rounded-[0.75rem] font-bold text-xs mt-1"
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
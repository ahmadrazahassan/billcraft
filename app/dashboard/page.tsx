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
  Layers,
  BarChart3,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Target,
  Activity,
  CreditCard,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import { buildDashboardURL, buildCheckoutURL } from '@/lib/url-builder'
import { useRouter } from 'next/navigation'

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
  const { success, error: showError } = useToast()
  const router = useRouter()
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
      showError({
        title: "Error Loading Dashboard",
        description: "Could not load your dashboard data. Please try syncing your account.",
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
        
        success({
          title: "Account Synced!",
          description: "Your account has been successfully synced.",
        })

        await loadDashboardData()
      } else {
        throw new Error(result.error || 'Manual sync failed')
      }
      
    } catch (error: any) {
      console.error('❌ Manual sync failed:', error)
      setSyncStatus('needs-sync')
      
      showError({
        title: "Sync Failed",
        description: error.message || "Could not sync your account. Please try again.",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  if (loading && syncStatus === 'checking') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-primary rounded-[1.5rem] flex items-center justify-center mx-auto shadow-lg">
              <RefreshCw className="h-10 w-10 animate-spin text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Loading Dashboard</h3>
          <p className="text-base text-muted-foreground">Preparing your business insights...</p>
        </motion.div>
      </div>
    )
  }

  if (syncStatus === 'needs-sync') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 text-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/20 shadow-lg rounded-[2.5rem]" style={{backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)'}}>
            <div className="w-16 h-16 bg-primary/10 rounded-[1.25rem] flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Account Sync Required</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
              Your account needs to be synced with our database to access your personalized dashboard and all features.
            </p>
            <Button 
              onClick={handleManualSync}
              disabled={isSyncing}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-[1.25rem] shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                  Syncing Account...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Sync My Account
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              This is a one-time setup process that takes just a few seconds.
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  const quickActions = [
    {
      title: 'Create Invoice',
      description: 'Generate professional invoices',
      icon: FileText,
      href: buildDashboardURL({ path: '/invoices/create', source: 'dashboard_quick_actions', action: 'create_invoice' }),
      gradient: 'from-primary via-orange-500 to-orange-600'
    },
    {
      title: 'Manage Clients',
      description: 'Add and organize clients',
      icon: Users,
      href: buildDashboardURL({ path: '/clients', source: 'dashboard_quick_actions', action: 'manage_clients' }),
      gradient: 'from-orange-500 via-orange-600 to-primary'
    },
    {
      title: 'Settings',
      description: 'Customize your account',
      icon: Settings,
      href: buildDashboardURL({ path: '/settings', source: 'dashboard_quick_actions', action: 'open_settings' }),
      gradient: 'from-primary via-orange-500 to-orange-600'
    }
  ]

  const statsData = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: `+${((stats.monthlyRevenue / (stats.totalRevenue || 1)) * 100).toFixed(1)}%`,
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-primary via-orange-500 to-orange-600',
      bg: 'from-primary/5 via-orange-50/50 to-orange-100/30',
      description: 'This month'
    },
    {
      title: 'Active Invoices',
      value: stats.totalInvoices.toString(),
      change: `${stats.pendingInvoices} pending`,
      trend: stats.pendingInvoices > 0 ? 'neutral' : 'up',
      icon: FileText,
      gradient: 'from-orange-500 via-orange-600 to-primary',
      bg: 'from-orange-50/50 via-orange-100/30 to-primary/5',
      description: 'Total created'
    },
    {
      title: 'Total Clients',
      value: stats.totalClients.toString(),
      change: 'Growing',
      trend: 'up',
      icon: Users,
      gradient: 'from-primary via-orange-500 to-orange-600',
      bg: 'from-primary/5 via-orange-50/50 to-orange-100/30',
      description: 'Active clients'
    },
    {
      title: 'Success Rate',
      value: `${stats.conversionRate.toFixed(1)}%`,
      change: 'Payment rate',
      trend: stats.conversionRate >= 70 ? 'up' : stats.conversionRate >= 50 ? 'neutral' : 'down',
      icon: BarChart3,
      gradient: 'from-orange-500 via-orange-600 to-primary',
      bg: 'from-orange-50/50 via-orange-100/30 to-primary/5',
      description: 'Conversion'
    }
  ]

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Ultra-Modern Header */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-2">
                  Welcome back, {user?.displayName?.split(' ')[0] || 'User'}!
                </h1>
                <p className="text-base md:text-lg text-muted-foreground font-medium">
                  Here's what's happening with your business today
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex items-center px-4 py-2.5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[1.25rem] border-2 border-white/20 dark:border-gray-700/20 shadow-sm" style={{backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)'}}>
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-semibold text-sm text-foreground">{currentTime.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center px-4 py-2.5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[1.25rem] border-2 border-white/20 dark:border-gray-700/20 shadow-sm" style={{backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)'}}>
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-semibold text-sm text-foreground">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="mt-6 xl:mt-0 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button asChild className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-[1.25rem] shadow-md hover:shadow-lg transition-all duration-300 font-semibold">
                <Link href={buildDashboardURL({ path: '/invoices/create', source: 'dashboard_header', action: 'create_invoice_cta' })}>
                  <Plus className="h-5 w-5 mr-2" />
                  Create Invoice
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Modern Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2rem] p-6 border-2 border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300" style={{backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)'}}>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-30 rounded-[2rem]`}></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        {stat.title}
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                      <div className={`flex items-center text-xs font-medium ${
                        stat.trend === 'up' ? 'text-emerald-600' : 
                        stat.trend === 'down' ? 'text-red-500' : 'text-amber-600'
                      }`}>
                        <ArrowUpRight className={`h-3 w-3 mr-1 ${
                          stat.trend === 'down' ? 'rotate-90' : stat.trend === 'neutral' ? 'rotate-45' : ''
                        }`} />
                        {stat.change}
                      </div>
                    </div>
                    
                    <motion.div 
                      className={`p-3 rounded-[1rem] bg-gradient-to-r ${stat.gradient} shadow-md`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.icon className="h-5 w-5 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="w-full bg-white/30 dark:bg-gray-800/30 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className={`h-2 bg-gradient-to-r ${stat.gradient} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(25, (index + 1) * 25))}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content - Enhanced Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-6">
          {/* Modern Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="xl:col-span-2"
          >
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 border-2 border-white/20 dark:border-gray-700/20 shadow-lg" style={{backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)'}}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-1">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">Streamline your workflow</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                  >
                    <Link href={action.href}>
                      <div className="p-6 bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60 border-2 border-white/30 dark:border-gray-700/30 hover:border-white/50 dark:hover:border-gray-600/50 rounded-[1.75rem] cursor-pointer transition-all duration-300 hover:shadow-lg group">
                        <div className="flex flex-col items-center text-center space-y-3">
                          <motion.div 
                            className={`p-3 rounded-[1rem] bg-gradient-to-r ${action.gradient} shadow-md`}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <action.icon className="h-5 w-5 text-white" />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-base text-foreground mb-1">
                              {action.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Modern Recent Invoices */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 border-2 border-white/20 dark:border-gray-700/20 shadow-lg" style={{backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)'}}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Recent Invoices</h3>
                  <p className="text-sm text-muted-foreground">Latest billing activity</p>
                </div>
                <Button variant="outline" size="sm" asChild className="bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 border-2 border-white/30 dark:border-gray-700/30 rounded-[1rem] font-medium text-xs px-3 py-2 hover:shadow-md transition-all duration-300">
                  <Link href={buildDashboardURL({ path: '/invoices', source: 'dashboard_recent_invoices', action: 'view_all' })}>
                    <Eye className="h-3 w-3 mr-1.5" />
                    View All
                  </Link>
                </Button>
              </div>
                
              <AnimatePresence mode="wait">
                {recentInvoices.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-[1.25rem] flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">No invoices yet</h4>
                    <p className="text-sm text-muted-foreground mb-6">
                      Create your first professional invoice
                    </p>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-[1rem] shadow-md px-6 py-2 font-medium text-sm hover:shadow-lg transition-all duration-300">
                      <Link href={buildDashboardURL({ path: '/invoices/create', source: 'dashboard_empty_state', action: 'create_first_invoice' })}>
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ x: 4 }}
                      >
                        <Link href={buildDashboardURL({ path: `/invoices/${invoice.id}`, source: 'dashboard_recent_invoices', action: 'view_invoice', ref: invoice.invoice_number })}>
                          <div className="p-4 bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-[1.5rem] transition-all duration-300 cursor-pointer border-2 border-white/30 dark:border-gray-700/30 hover:border-white/50 dark:hover:border-gray-600/50 hover:shadow-md group">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <motion.div 
                                  className="w-10 h-10 bg-gradient-to-r from-primary via-orange-500 to-orange-600 rounded-[1rem] flex items-center justify-center shadow-sm"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <FileText className="h-5 w-5 text-white" />
                                </motion.div>
                                <div>
                                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                                    {invoice.invoice_number}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {invoice.client_name || 'No client'}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-foreground text-sm">
                                  ${invoice.total.toFixed(2)}
                                </p>
                                <Badge 
                                  variant={
                                    invoice.status === 'paid' ? 'default' :
                                    invoice.status === 'sent' ? 'secondary' :
                                    'outline'
                                  }
                                  className="rounded-[0.5rem] font-medium text-xs mt-1"
                                >
                                  {invoice.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
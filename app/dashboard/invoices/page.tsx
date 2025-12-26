'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Mail,
  Copy,
  Trash2,
  Calendar,
  DollarSign,
  Layers,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  ChevronRight,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Zap,
  Crown,
  Rocket,
  Send,
  RefreshCw,
  ExternalLink,
  BarChart3,
  CalendarDays,
  TrendingDown,
  Activity,
  Banknote,
  Target,
  MessageSquare,
  Settings2,
  ChevronDown,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Select } from '@/components/ui/select'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { userService, invoiceService } from '@/lib/database'
import { AIService } from '@/lib/ai-service'

const statusConfig = {
  draft: {
    label: 'Draft',
    color: 'bg-slate-50 text-slate-700 border-slate-200/60',
    gradient: 'from-slate-500 to-gray-600',
    icon: Edit,
    dotColor: 'bg-slate-400'
  },
  sent: {
    label: 'Sent',
    color: 'bg-blue-50 text-blue-700 border-blue-200/60',
    gradient: 'from-blue-500 to-indigo-600',
    icon: Send,
    dotColor: 'bg-blue-500'
  },
  paid: {
    label: 'Paid',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    gradient: 'from-emerald-500 to-teal-600',
    icon: CheckCircle2,
    dotColor: 'bg-emerald-500'
  },
  overdue: {
    label: 'Overdue',
    color: 'bg-red-50 text-red-700 border-red-200/60',
    gradient: 'from-red-500 to-rose-600',
    icon: AlertCircle,
    dotColor: 'bg-red-500'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-gray-50 text-gray-700 border-gray-200/60',
    gradient: 'from-gray-500 to-slate-600',
    icon: X,
    dotColor: 'bg-gray-400'
  }
}

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [isLoading, setIsLoading] = useState(true)
  const [invoices, setInvoices] = useState<any[]>([])
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState('all')

  const { user } = useAuth()
  const { toast } = useToast()

  // Load invoices and stats from database
  useEffect(() => {
    if (user) {
      loadInvoicesAndStats()
    } else {
      setIsLoading(false)
    }
  }, [user])

  const loadInvoicesAndStats = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      
      // Get current user via API route (like other pages)
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
        console.log('❌ User not synced, redirecting to sync')
        toast({
          title: "Account Sync Required",
          description: "Please sync your account to view invoices.",
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }

      const currentUser = result.user
      console.log('✅ User found, loading invoices for:', currentUser.id)

      // Load invoices
      const userInvoices = await invoiceService.getInvoices(currentUser.id)
      setInvoices(userInvoices)

    } catch (error) {
      console.error('Error loading invoices:', error)
      toast({
        title: "Error Loading Invoices",
        description: "Could not load your invoices. Please try refreshing the page.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate stats from real invoice data
  const stats = useMemo(() => {
    const totalInvoices = invoices.length
    const draftInvoices = invoices.filter(inv => inv.status === 'draft')
    const paidInvoices = invoices.filter(inv => inv.status === 'paid')
    const pendingInvoices = invoices.filter(inv => inv.status === 'sent')
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue')
    
    const totalRevenue = paidInvoices.reduce((sum, inv) => sum + inv.total, 0)
    const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.total, 0)
    const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.total, 0)
    const draftAmount = draftInvoices.reduce((sum, inv) => sum + inv.total, 0)
    
    const successRate = totalInvoices > 0 ? (paidInvoices.length / totalInvoices) * 100 : 0
    
    // Calculate this month's data
    const thisMonth = new Date()
    thisMonth.setDate(1)
    const thisMonthInvoices = invoices.filter(inv => new Date(inv.created_at) >= thisMonth)
    const thisMonthRevenue = thisMonthInvoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0)

    return {
      totalInvoices,
      totalRevenue: thisMonthRevenue, // Show this month's revenue
      pendingAmount,
      overdueAmount,
      draftAmount,
      successRate,
      draftCount: draftInvoices.length,
      paidCount: paidInvoices.length,
      pendingCount: pendingInvoices.length,
      overdueCount: overdueInvoices.length,
      avgInvoiceValue: totalInvoices > 0 ? totalRevenue / totalInvoices : 0
    }
  }, [invoices])

  // Enhanced stats cards with real data
  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'This month',
      icon: Banknote,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      bgGradient: 'from-emerald-50/50 via-teal-50/30 to-cyan-50/50',
      change: '+12.5%',
      changeType: 'positive',
      description: `${stats.paidCount} invoices paid`
    },
    {
      title: 'Pending Payments',
      value: `$${stats.pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: `${stats.pendingCount} invoices`,
      icon: Clock,
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      bgGradient: 'from-amber-50/50 via-orange-50/30 to-red-50/50',
      change: stats.pendingCount > 0 ? 'Action needed' : 'All clear',
      changeType: stats.pendingCount > 0 ? 'warning' : 'positive',
      description: 'Awaiting payment'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate.toFixed(1)}%`,
      subtitle: 'Payment rate',
      icon: Target,
      gradient: 'from-violet-500 via-purple-500 to-indigo-600',
      bgGradient: 'from-violet-50/50 via-purple-50/30 to-indigo-50/50',
      change: stats.successRate >= 80 ? 'Excellent' : stats.successRate >= 60 ? 'Good' : 'Needs improvement',
      changeType: stats.successRate >= 80 ? 'positive' : stats.successRate >= 60 ? 'neutral' : 'negative',
      description: `${stats.paidCount}/${stats.totalInvoices} paid`
    },
    {
      title: 'Draft Invoices',
      value: `${stats.draftCount}`,
      subtitle: `$${stats.draftAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total value`,
      icon: Edit,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      bgGradient: 'from-blue-50/50 via-indigo-50/30 to-purple-50/50',
      change: stats.draftCount > 0 ? 'Ready to send' : 'All sent',
      changeType: stats.draftCount > 0 ? 'neutral' : 'positive',
      description: 'Work in progress'
    }
  ]

  // Enhanced filtering and sorting
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = searchQuery === '' || 
        invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
      
      // Date range filter
      let matchesDate = true
      if (dateRange !== 'all') {
        const invoiceDate = new Date(invoice.created_at)
        const now = new Date()
        
        switch (dateRange) {
          case 'today':
            matchesDate = invoiceDate.toDateString() === now.toDateString()
            break
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            matchesDate = invoiceDate >= weekAgo
            break
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            matchesDate = invoiceDate >= monthAgo
            break
          case 'quarter':
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
            matchesDate = invoiceDate >= quarterAgo
            break
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate
    }).sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          break
        case 'amount':
          comparison = b.total - a.total
          break
        case 'client':
          comparison = (a.client_name || '').localeCompare(b.client_name || '')
          break
        case 'status':
          comparison = a.status.localeCompare(b.status)
          break
        case 'due_date':
          comparison = new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [invoices, searchQuery, statusFilter, dateRange, sortBy, sortOrder])

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysUntilDue = (dueDateString: string) => {
    const dueDate = new Date(dueDateString)
    const today = new Date()
    const timeDiff = dueDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  }

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-20 bg-gradient-to-r from-indigo-100 via-purple-100 to-violet-100 rounded-[2.5rem]"></div>
          <div className="h-8 bg-gradient-to-r from-indigo-100 via-purple-100 to-violet-100 rounded-[1.5rem] w-1/2"></div>
        </div>

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-52 bg-gradient-to-br from-white/60 to-indigo-50/60 rounded-[2.5rem] backdrop-blur-2xl shadow-xl"></div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-8">
          <div className="h-28 bg-gradient-to-br from-white/60 to-purple-50/60 rounded-[2.5rem] backdrop-blur-2xl shadow-xl"></div>
          <div className="h-96 bg-gradient-to-br from-white/60 to-violet-50/60 rounded-[2.5rem] backdrop-blur-2xl shadow-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-violet-50/80 rounded-[2.5rem] backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]"></div>
        
        <div className="relative p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <div className="flex items-center space-x-4 mb-3">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-indigo-500/30">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <Layers className="h-3 w-3 text-white" />
                  </div>
                </motion.div>
                
                <div>
                  <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent leading-tight">
                    Invoices
                  </h1>
                  <p className="text-slate-600 mt-2 text-xl font-bold">
                    Manage your billing with precision and style
                  </p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-8 text-sm text-slate-600">
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-2xl rounded-[1rem] border border-white/40 shadow-lg">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                  <span className="font-bold">{stats.totalInvoices} Total</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-2xl rounded-[1rem] border border-white/40 shadow-lg">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                  <span className="font-bold">{stats.pendingCount} Pending</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-2xl rounded-[1rem] border border-white/40 shadow-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-bold">{stats.overdueCount} Overdue</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
                className="rounded-[1.25rem] border-white/50 bg-white/70 backdrop-blur-3xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {viewMode === 'table' ? <Grid3X3 className="h-5 w-5" /> : <List className="h-5 w-5" />}
              </Button>
              
              <Button 
                variant="outline" 
                className="rounded-[1.25rem] border-white/50 bg-white/70 backdrop-blur-3xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={loadInvoicesAndStats}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Refresh
              </Button>
              
              <Button 
                variant="outline" 
                className="rounded-[1.25rem] border-white/50 bg-white/70 backdrop-blur-3xl hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="h-5 w-5 mr-2" />
                Export
              </Button>
              
              <Button 
                asChild 
                className="rounded-[1.25rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 shadow-xl shadow-indigo-500/30 transition-all duration-300 text-lg font-bold px-8"
              >
                <Link href="/dashboard/invoices/create">
                  <Rocket className="h-5 w-5 mr-3" />
                  Create Invoice
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Ultra-Modern Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group cursor-pointer"
          >
            <Card className="relative overflow-hidden bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-700 rounded-[2.5rem] min-h-[220px]">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-70`}></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.9),transparent_70%)]"></div>
              
              <div className="relative p-6 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 truncate">{stat.title}</p>
                    <div className="space-y-1">
                      <p className="text-3xl font-black text-slate-900 leading-none truncate">{stat.value}</p>
                      <p className="text-xs text-slate-600 font-bold truncate">{stat.subtitle}</p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className={`p-3 rounded-[1.25rem] bg-gradient-to-br ${stat.gradient} shadow-xl shrink-0 ml-3`}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2.5 py-1 rounded-[0.625rem] font-bold shrink-0 ${
                        stat.changeType === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                        stat.changeType === 'negative' ? 'bg-red-100 text-red-700' :
                        stat.changeType === 'warning' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {stat.change}
                    </Badge>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">{stat.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="p-8">
            <div className="space-y-4">
              {/* Main Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      placeholder="Search by invoice number, client name, or amount..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 bg-white/70 border-white/50 rounded-[1.5rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-indigo-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`h-14 px-6 rounded-[1.5rem] border-white/50 bg-white/70 backdrop-blur-3xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl font-bold ${showFilters ? 'bg-indigo-50 border-indigo-200' : ''}`}
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                    <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-200/60 pt-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
                        <select 
                          className="w-full px-4 py-3 border border-white/50 rounded-[1.25rem] text-sm bg-white/70 backdrop-blur-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 focus:bg-white/90 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="all">All Status</option>
                          <option value="draft">Draft</option>
                          <option value="sent">Sent</option>
                          <option value="paid">Paid</option>
                          <option value="overdue">Overdue</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Date Range</label>
                        <select 
                          className="w-full px-4 py-3 border border-white/50 rounded-[1.25rem] text-sm bg-white/70 backdrop-blur-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 focus:bg-white/90 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                          value={dateRange}
                          onChange={(e) => setDateRange(e.target.value)}
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                          <option value="quarter">This Quarter</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Sort By</label>
                        <select 
                          className="w-full px-4 py-3 border border-white/50 rounded-[1.25rem] text-sm bg-white/70 backdrop-blur-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 focus:bg-white/90 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="date">Date Created</option>
                          <option value="amount">Amount</option>
                          <option value="client">Client Name</option>
                          <option value="status">Status</option>
                          <option value="due_date">Due Date</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Order</label>
                        <select 
                          className="w-full px-4 py-3 border border-white/50 rounded-[1.25rem] text-sm bg-white/70 backdrop-blur-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 focus:bg-white/90 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        >
                          <option value="desc">Descending</option>
                          <option value="asc">Ascending</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Filter Tags */}
              <div className="flex flex-wrap gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant="secondary" 
                    className={`rounded-[1rem] transition-colors cursor-pointer px-4 py-2 font-bold shadow-lg hover:shadow-xl ${
                      statusFilter === 'draft' 
                        ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200' 
                        : 'hover:bg-indigo-100 hover:text-indigo-700'
                    }`}
                    onClick={() => setStatusFilter('draft')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Drafts
                  </Badge>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant="secondary" 
                    className={`rounded-[1rem] transition-colors cursor-pointer px-4 py-2 font-bold shadow-lg hover:shadow-xl ${
                      statusFilter === 'sent' 
                        ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200' 
                        : 'hover:bg-emerald-100 hover:text-emerald-700'
                    }`}
                    onClick={() => setStatusFilter('sent')}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Pending
                  </Badge>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant="secondary" 
                    className={`rounded-[1rem] transition-colors cursor-pointer px-4 py-2 font-bold shadow-lg hover:shadow-xl ${
                      statusFilter === 'overdue' 
                        ? 'bg-red-100 text-red-700 ring-2 ring-red-200' 
                        : 'hover:bg-red-100 hover:text-red-700'
                    }`}
                    onClick={() => setStatusFilter('overdue')}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Overdue
                  </Badge>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant="secondary" 
                    className={`rounded-[1rem] transition-colors cursor-pointer px-4 py-2 font-bold shadow-lg hover:shadow-xl ${
                      statusFilter === 'paid' 
                        ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200' 
                        : 'hover:bg-emerald-100 hover:text-emerald-700'
                    }`}
                    onClick={() => setStatusFilter('paid')}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Paid
                  </Badge>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge 
                    variant="secondary" 
                    className={`rounded-[1rem] transition-colors cursor-pointer px-4 py-2 font-bold shadow-lg hover:shadow-xl ${
                      statusFilter === 'all' 
                        ? 'bg-slate-100 text-slate-700 ring-2 ring-slate-200' 
                        : 'hover:bg-slate-100 hover:text-slate-700'
                    }`}
                    onClick={() => setStatusFilter('all')}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    All Invoices
                  </Badge>
                </motion.div>
              </div>
              
              {/* Results Count */}
              {(searchQuery || statusFilter !== 'all' || dateRange !== 'all') && (
                <div className="flex items-center justify-between text-sm text-slate-600 pt-2 border-t border-slate-200/60">
                  <span>
                    Showing {filteredInvoices.length} of {invoices.length} invoices
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setStatusFilter('all')
                      setDateRange('all')
                    }}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-[1rem] px-4 py-2 font-bold transition-all duration-300"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Enhanced Invoice Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/50 bg-gradient-to-r from-white/60 to-indigo-50/40 hover:bg-white/70">
                    <TableHead 
                      className="text-slate-700 font-black py-8 px-8 cursor-pointer hover:text-slate-900 transition-colors"
                      onClick={() => handleSort('invoice_number')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Invoice</span>
                        {sortBy === 'invoice_number' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-slate-700 font-black py-8 cursor-pointer hover:text-slate-900 transition-colors"
                      onClick={() => handleSort('client')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Client</span>
                        {sortBy === 'client' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-slate-700 font-black py-8 cursor-pointer hover:text-slate-900 transition-colors"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Amount</span>
                        {sortBy === 'amount' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-slate-700 font-black py-8 cursor-pointer hover:text-slate-900 transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Status</span>
                        {sortBy === 'status' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-slate-700 font-black py-8 cursor-pointer hover:text-slate-900 transition-colors"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Created</span>
                        {sortBy === 'date' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-slate-700 font-black py-8 cursor-pointer hover:text-slate-900 transition-colors"
                      onClick={() => handleSort('due_date')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Due Date</span>
                        {sortBy === 'due_date' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-96">
                        <motion.div 
                          className="flex flex-col items-center justify-center text-center py-20"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                                                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
                          <FileText className="h-16 w-16 text-indigo-600" />
                        </div>
                        <h3 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-4">
                          {searchQuery || statusFilter !== 'all' || dateRange !== 'all'
                            ? 'No matching invoices found' 
                            : 'Ready to create your first invoice?'
                          }
                        </h3>
                        <p className="text-slate-600 mb-8 max-w-md leading-relaxed text-xl font-medium">
                          {searchQuery || statusFilter !== 'all' || dateRange !== 'all'
                            ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                            : 'Start building professional invoices that will impress your clients and get you paid faster.'
                          }
                        </p>
                          {!searchQuery && statusFilter === 'all' && dateRange === 'all' && (
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Button 
                                asChild 
                                size="lg"
                                className="rounded-[1.5rem] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl px-10 py-4 font-bold text-lg"
                              >
                                <Link href="/dashboard/invoices/create">
                                  <Rocket className="h-6 w-6 mr-3" />
                                  Create Your First Invoice
                                </Link>
                              </Button>
                              <Button 
                                asChild 
                                variant="outline" 
                                size="lg"
                                className="rounded-[1.5rem] border-indigo-200 hover:bg-indigo-50 px-10 py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                <Link href="/dashboard/templates">
                                  <Layers className="h-6 w-6 mr-3" />
                                  Browse Templates
                                </Link>
                              </Button>
                            </div>
                          )}
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInvoices.map((invoice, index) => {
                      const daysUntilDue = getDaysUntilDue(invoice.due_date)
                      const isOverdue = daysUntilDue < 0
                      const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0
                      
                      return (
                        <motion.tr
                          key={invoice.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="group hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/20 transition-all duration-500 border-b border-white/30"
                        >
                          <TableCell className="py-8 px-8">
                            <div className="flex items-center space-x-4">
                              <motion.div 
                                className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-[1.25rem] flex items-center justify-center shadow-lg"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                              >
                                <FileText className="h-8 w-8 text-indigo-600" />
                              </motion.div>
                              <div>
                                <p className="font-black text-slate-900 text-lg">{invoice.invoice_number}</p>
                                <p className="text-sm text-slate-500 capitalize font-medium">
                                  {invoice.template.replace('-', ' ')} Template
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell className="py-8">
                            <div>
                              <p className="font-black text-slate-900 text-lg">{invoice.client_name || 'No Client'}</p>
                              <p className="text-sm text-slate-500 font-medium">{invoice.client_email || ''}</p>
                            </div>
                          </TableCell>
                          
                          <TableCell className="py-8">
                            <div className="text-right">
                              <p className="font-black text-slate-900 text-xl">{formatCurrency(invoice.total)}</p>
                              <p className="text-sm text-slate-500 font-medium">{invoice.currency}</p>
                            </div>
                          </TableCell>
                          
                          <TableCell className="py-8">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${statusConfig[invoice.status as keyof typeof statusConfig]?.dotColor}`}></div>
                              <Badge className={`${statusConfig[invoice.status as keyof typeof statusConfig]?.color} font-bold px-4 py-2 rounded-[0.75rem]`}>
                                {statusConfig[invoice.status as keyof typeof statusConfig]?.label || invoice.status}
                              </Badge>
                            </div>
                          </TableCell>
                          
                          <TableCell className="py-8">
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {formatDate(invoice.created_at)}
                              </p>
                              <p className="text-xs text-slate-500 font-medium">
                                {new Date(invoice.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </TableCell>
                          
                          <TableCell className="py-8">
                            <div>
                              <p className={`text-sm font-bold ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-amber-600' : 'text-slate-900'}`}>
                                {formatDate(invoice.due_date)}
                              </p>
                              <p className={`text-xs font-medium ${isOverdue ? 'text-red-500' : isDueSoon ? 'text-amber-500' : 'text-slate-500'}`}>
                                {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : 
                                 isDueSoon ? `${daysUntilDue} days left` : 
                                 `${daysUntilDue} days`}
                              </p>
                            </div>
                          </TableCell>
                          
                          <TableCell className="py-8">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <DropdownMenu>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-12 w-12 p-0 rounded-[1rem] hover:bg-indigo-100 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenu>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            /* Grid View Coming Soon */
            <div className="p-8">
              <motion.div 
                className="flex flex-col items-center justify-center text-center py-24"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="w-36 h-36 bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <Grid3X3 className="h-18 w-18 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-4">Grid View Coming Soon</h3>
                <p className="text-slate-600 mb-8 max-w-md text-xl leading-relaxed font-medium">
                  We're crafting a beautiful grid layout for your invoices. For now, enjoy the enhanced table view with all its powerful features!
                </p>
                <Button 
                  onClick={() => setViewMode('table')}
                  size="lg"
                  className="rounded-[1.5rem] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-10 py-4 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <List className="h-6 w-6 mr-3" />
                  Switch to Table View
                </Button>
              </motion.div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
} 
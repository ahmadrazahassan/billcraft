'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  MoreHorizontal,
  Building2,
  Calendar,
  TrendingUp,
  DollarSign,
  FileText,
  Download,
  SortAsc,
  Grid3X3,
  List,
  RefreshCw,
  ChevronRight,
  Clock,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { userService, clientService } from '@/lib/database'





export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [isLoading, setIsLoading] = useState(true)
  const [clients, setClients] = useState<any[]>([])
  
  const { user } = useAuth()
  const { toast } = useToast()

  // Load clients from database
  useEffect(() => {
    if (user) {
      loadClients()
    } else {
      setIsLoading(false)
    }
  }, [user])

  const loadClients = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      
      // Get current user via the same method as other pages
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
        console.log('❌ User not synced')
        toast({
          title: "Account Sync Required",
          description: "Please sync your account to view clients.",
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }

      const currentUser = result.user
      console.log('✅ User found, loading clients for:', currentUser.id)
      console.log('👤 Current user details:', currentUser)

      // Load clients from database
      console.log('🔍 About to call clientService.getClients with userId:', currentUser.id)
      
      // Debug: First test if we can query the database at all
      try {
        const { data: testUsers, error: testError } = await (await import('@/lib/supabase')).supabase
          .from('users')
          .select('*')
          .eq('firebase_uid', user.uid)
        
        console.log('🧪 Test query - Users with Firebase UID:', testUsers)
        console.log('🧪 Test query error:', testError)
      } catch (testQueryError) {
        console.log('🚨 Test query completely failed:', testQueryError)
      }
      
      const userClients = await clientService.getClients(currentUser.id)
      console.log('📋 Loaded clients:', userClients)
      console.log('📊 Clients array length:', userClients.length)
      
      if (userClients.length === 0) {
        console.log('⚠️ No clients found for user:', currentUser.id)
        console.log('🔍 Let me check all clients in database...')
        
        // Debug: Let's see what's in the clients table
        try {
          const { data: allClients, error } = await (await import('@/lib/supabase')).supabase
            .from('clients')
            .select('*')
          
          console.log('🗃️ All clients in database:', allClients)
          console.log('❌ Clients query error:', error)
        } catch (debugError) {
          console.log('🚨 Debug query failed:', debugError)
        }
      }
      
      setClients(userClients)

    } catch (error) {
      console.error('Error loading clients:', error)
      toast({
        title: "Error Loading Clients",
        description: "Could not load your clients. Please try refreshing the page.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate real stats from clients data
const statsCards = [
  {
    title: 'Total Clients',
      value: clients.length.toString(),
    icon: Users,
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    description: 'Active client accounts'
  },
  {
    title: 'Active Projects',
    value: '0',
    icon: Building2,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    description: 'Ongoing client work'
  },
  {
    title: 'Revenue Generated',
    value: '$0.00',
    icon: DollarSign,
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50',
    description: 'Total client revenue'
  },
  {
    title: 'New This Month',
      value: (() => {
        const thisMonth = new Date()
        thisMonth.setDate(1)
        return clients.filter((client: any) => new Date(client.created_at) >= thisMonth).length.toString()
      })(),
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    description: 'Recent acquisitions'
  }
]

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-3xl animate-pulse w-1/2"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-2xl animate-pulse w-1/3"></div>
        </div>

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="h-40 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-sm border border-slate-200 animate-pulse"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-20 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-sm border border-slate-200 animate-pulse"></div>
          <div className="h-96 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-sm border border-slate-200 animate-pulse"></div>
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
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-3xl"></div>
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-orange-900 to-red-900 bg-clip-text text-transparent">
                    Clients
                  </h1>
                  <p className="text-slate-600 mt-1 text-lg">
                    Manage your client relationships and grow your business
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
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
                    className="rounded-2xl border-white/20 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                  >
                    {viewMode === 'table' ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
                  </Button>
                </motion.div>
                <Button 
                  variant="outline" 
                  onClick={loadClients}
                  className="rounded-2xl border-white/20 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" className="rounded-2xl border-white/20 bg-white/50 backdrop-blur-sm hover:bg-white/70">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <Button asChild className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg">
                <Link href="/dashboard/clients/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <Card className="relative overflow-hidden bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-40`}></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-600 mb-1">{stat.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                  </div>
                  <motion.div 
                    className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
                
                <div className="flex items-center justify-end">
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
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
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search clients by name, company, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white/50 border-white/20 rounded-2xl text-lg placeholder:text-slate-400 focus:bg-white/80 transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>
              
              {/* Client Count */}
              <div className="flex items-center space-x-3 text-slate-600">
                <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-2xl border border-white/20">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {clients.length} client{clients.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Enhanced Client Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden">
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20 bg-gradient-to-r from-slate-50/50 to-white/50">
                    <TableHead className="text-slate-700 font-semibold py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span>Client</span>
                        <SortAsc className="h-4 w-4 text-slate-400" />
                      </div>
                    </TableHead>
                    <TableHead className="text-slate-700 font-semibold py-4">Company</TableHead>
                    <TableHead className="text-slate-700 font-semibold py-4">Contact</TableHead>
                    <TableHead className="text-slate-700 font-semibold py-4">Location</TableHead>
                    <TableHead className="text-slate-700 font-semibold py-4">Projects</TableHead>
                    <TableHead className="text-slate-700 font-semibold py-4">Revenue</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.length === 0 ? (
                    /* Enhanced Empty State */
                  <TableRow>
                    <TableCell colSpan={7} className="h-96">
                      <motion.div 
                        className="flex flex-col items-center justify-center text-center py-16"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <Users className="h-12 w-12 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                          {searchQuery 
                            ? 'No matching clients found' 
                            : 'Ready to add your first client?'
                          }
                        </h3>
                        <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
                          {searchQuery 
                            ? 'Try adjusting your search criteria to find the client you\'re looking for.'
                            : 'Start building strong client relationships that will drive your business forward.'
                          }
                        </p>
                        {!searchQuery && (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg">
                              <Link href="/dashboard/clients/create">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Client
                              </Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-2xl border-orange-200 hover:bg-orange-50">
                              <Link href="/dashboard/invoices/create">
                                <FileText className="h-4 w-4 mr-2" />
                                Create Invoice
                              </Link>
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    </TableCell>
                  </TableRow>
                  ) : (
                    /* Display Real Clients */
                    clients
                      .filter(client => 
                        searchQuery === '' || 
                        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (client.email && client.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (client.company && client.company.toLowerCase().includes(searchQuery.toLowerCase()))
                      )
                      .map((client, index) => (
                        <motion.tr
                          key={client.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-white/20 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 transition-all duration-300 cursor-pointer group"
                        >
                          <TableCell className="py-6 px-6">
                            <div className="flex items-center space-x-4">
                              <motion.div 
                                className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-white/20"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {client.name.charAt(0).toUpperCase()}
                              </motion.div>
                              <div>
                                <div className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {client.name}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">
                                  Client since {new Date(client.created_at).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="flex items-center">
                              <Building2 className="h-4 w-4 mr-2 text-slate-400" />
                              <span className="text-slate-700 font-medium">
                                {client.company || 'Individual'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="space-y-2">
                              {client.email && (
                                <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                                  <Mail className="h-3 w-3 mr-2 text-blue-500" />
                                  <span className="font-medium">{client.email}</span>
                                </div>
                              )}
                              {client.phone && (
                                <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                                  <Phone className="h-3 w-3 mr-2 text-green-500" />
                                  <span className="font-medium">{client.phone}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                              <span className="text-slate-700 font-medium">
                                {client.city || client.address || 'Not specified'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <Badge variant="secondary" className="rounded-full bg-blue-100 text-blue-700 border-blue-200 font-medium">
                              <Calendar className="h-3 w-3 mr-1" />
                              0 Projects
                            </Badge>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="font-bold text-lg text-slate-900">
                              $0.00
                            </div>
                            <div className="text-xs text-slate-500">Total Revenue</div>
                          </TableCell>
                          <TableCell className="py-6">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="rounded-xl opacity-60 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-100 hover:text-blue-600"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            /* Grid View */
            <div className="p-6">
              <motion.div 
                className="flex flex-col items-center justify-center text-center py-20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Grid3X3 className="h-12 w-12 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Grid view coming soon</h3>
                <p className="text-slate-600 mb-8 max-w-md">
                  We're working on a beautiful grid layout for your clients. For now, enjoy the enhanced table view!
                </p>
                <Button 
                  onClick={() => setViewMode('table')}
                  className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  <List className="h-4 w-4 mr-2" />
                  Switch to Table View
                </Button>
              </motion.div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Recent Client Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Recent Client Activity</h3>
              <Badge variant="secondary" className="rounded-full">
                <Clock className="h-3 w-3 mr-1" />
                Live Updates
              </Badge>
            </div>
            
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-slate-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Activity feed coming soon</h4>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Track client interactions, project updates, and important milestones all in one place.
                </p>
                <Button variant="outline" className="rounded-2xl">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Up Notifications
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
} 
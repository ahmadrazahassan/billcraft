'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin,
  Eye, 
  Edit, 
  MoreHorizontal,
  Building2,
  Globe,
  Calendar,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  FileText,
  ChevronRight,
  Star,
  Crown,
  Zap,
  Clock,
  Download,
  SortAsc,
  Grid3X3,
  List,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar } from '@/components/ui/avatar'

const statsCards = [
  {
    title: 'Total Clients',
    value: '0',
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
    value: '0',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    description: 'Recent acquisitions'
  }
]



export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search clients by name, company, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white/50 border-white/20 rounded-2xl text-lg placeholder:text-slate-400 focus:bg-white/80 transition-all duration-300"
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex gap-3">
                <select 
                  className="px-4 py-3 border border-white/20 rounded-2xl text-sm bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 focus:bg-white/80 transition-all duration-300 min-w-[140px]"
                >
                  <option value="all">All Clients</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="vip">VIP</option>
                </select>
                
                <Button variant="outline" className="h-12 px-4 rounded-2xl border-white/20 bg-white/50 backdrop-blur-sm hover:bg-white/70">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
            
            {/* Quick Filter Tags */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/20">
              <Badge variant="secondary" className="rounded-full hover:bg-blue-100 transition-colors cursor-pointer">
                <Star className="h-3 w-3 mr-1" />
                VIP Clients
              </Badge>
              <Badge variant="secondary" className="rounded-full hover:bg-green-100 transition-colors cursor-pointer">
                <Zap className="h-3 w-3 mr-1" />
                Active Projects
              </Badge>
              <Badge variant="secondary" className="rounded-full hover:bg-orange-100 transition-colors cursor-pointer">
                <Clock className="h-3 w-3 mr-1" />
                Recent
              </Badge>
              <Badge variant="secondary" className="rounded-full hover:bg-purple-100 transition-colors cursor-pointer">
                <Crown className="h-3 w-3 mr-1" />
                High Value
              </Badge>
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
                  {/* Enhanced Empty State */}
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
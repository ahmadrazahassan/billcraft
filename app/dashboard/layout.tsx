'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Layout,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Home,
  TrendingUp,
  User,
  Bell,
  Search,
  Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'


const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Home,
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Overview & Analytics'
  },
  { 
    name: 'Invoices', 
    href: '/dashboard/invoices', 
    icon: FileText,
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Manage Invoices'
  },
  { 
    name: 'Templates', 
    href: '/dashboard/templates', 
    icon: Layout,
    gradient: 'from-purple-500 to-violet-600',
    description: 'Invoice Templates'
  },
  { 
    name: 'Clients', 
    href: '/dashboard/clients', 
    icon: Users,
    gradient: 'from-orange-500 to-red-600',
    description: 'Client Management'
  },
  { 
    name: 'Billing', 
    href: '/dashboard/billing', 
    icon: Crown,
    gradient: 'from-yellow-500 to-orange-600',
    description: 'Subscription & Billing'
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings,
    gradient: 'from-slate-500 to-gray-600',
    description: 'Account Settings'
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Default to collapsed

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    try {
      await logout()
      router.replace('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <motion.div
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <p className="text-slate-600 font-medium">Loading Dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div 
              className="fixed inset-y-0 left-0 flex flex-col w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <motion.div 
                  className="flex items-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent ml-3">
                    BillCraft
                  </h2>
                </motion.div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200"
            >
                  <X className="h-5 w-5" />
            </Button>
          </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
              <Link
                href={item.href}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                          isActive 
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-blue-500/25` 
                            : 'text-slate-700 hover:bg-white/60 hover:shadow-md'
                        }`}
                onClick={() => setSidebarOpen(false)}
              >
                        <div className="relative z-10 flex items-center w-full">
                          <item.icon className={`h-5 w-5 mr-4 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                          <div className="flex-1">
                            <div className={`font-semibold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {item.name}
                            </div>
                            <div className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
              </Link>
                    </motion.div>
                  )
                })}
          </nav>

              {/* Mobile User Section */}
              <div className="p-4 border-t border-white/10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-center p-3 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white/50 backdrop-blur-sm border border-white/20">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
            <Button
              variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-2xl py-3"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
                </motion.div>
          </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

             {/* Desktop sidebar */}
      <motion.div 
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col z-40 transition-all duration-500 ease-in-out ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-80'
        }`}
        layout
      >
        <div className="flex flex-col flex-grow bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          {/* Desktop Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <AnimatePresence mode="wait">
             {!sidebarCollapsed && (
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                 className="flex items-center"
               >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      BillCraft
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">Professional Invoicing</p>
                 </div>
               </motion.div>
             )}
            </AnimatePresence>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             <Button
               variant="ghost"
               size="sm"
               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 group"
              >
                <motion.div
                  animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
                  ) : (
                    <ChevronLeft className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
                  )}
                </motion.div>
             </Button>
            </motion.div>
           </div>

          {/* Desktop Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
               <motion.div
                 key={item.name}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 2 }}
               >
                 <Link
                   href={item.href}
                    className={`flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                     sidebarCollapsed ? 'justify-center' : ''
                    } ${
                      isActive 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-blue-500/20` 
                        : 'text-slate-700 hover:bg-white/60 hover:shadow-md hover:shadow-slate-200/50'
                    }`}
                  >
                    <div className="relative z-10 flex items-center w-full">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <item.icon className={`h-6 w-6 ${sidebarCollapsed ? '' : 'mr-4'} ${
                          isActive ? 'text-white' : 'text-slate-600'
                        }`} />
                      </motion.div>
                      
                      <AnimatePresence mode="wait">
                   {!sidebarCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1"
                          >
                            <div className={`font-semibold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                       {item.name}
                     </div>
                            <div className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                              {item.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <motion.div 
                        className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl"
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-slate-300">{item.description}</div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                      </motion.div>
                    )}

                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   )}
                 </Link>
               </motion.div>
              )
            })}
           </nav>

          {/* Desktop User Section */}
          <div className="p-4 border-t border-white/10">
            <AnimatePresence mode="wait">
             {!sidebarCollapsed ? (
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                 className="space-y-3"
               >
                  <div className="flex items-center p-3 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white/50 backdrop-blur-sm border border-white/20 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                     {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                   </div>
                   <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                       {user.displayName || 'User'}
                     </p>
                     <p className="text-xs text-slate-500 truncate">{user.email}</p>
                   </div>
                 </div>
                 <Button
                   variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-2xl py-3 transition-all duration-300"
                   onClick={handleSignOut}
                 >
                   <LogOut className="h-4 w-4 mr-3" />
                   Sign Out
                 </Button>
               </motion.div>
             ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg relative group">
                   {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    <motion.div 
                      className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl"
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                    >
                     <div className="font-medium">{user.displayName || 'User'}</div>
                      <div className="text-xs text-slate-300">{user.email}</div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                    </motion.div>
                 </div>
                 <Button
                   variant="ghost"
                   size="sm"
                    className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-2xl relative group transition-all duration-300"
                   onClick={handleSignOut}
                 >
                   <LogOut className="h-4 w-4" />
                    <motion.div 
                      className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl"
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                    >
                     Sign Out
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                    </motion.div>
                 </Button>
                </motion.div>
             )}
            </AnimatePresence>
           </div>
         </div>
      </motion.div>

             {/* Main content */}
      <div className={`transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-80'}`}>
        {/* Top bar for mobile */}
        <motion.div 
          className="sticky top-0 z-30 lg:hidden bg-white/95 backdrop-blur-xl border-b border-white/20 px-4 py-4 shadow-sm"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
                className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
            </Button>
            </motion.div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg mr-2">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                BillCraft
              </h1>
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>
        </motion.div>

        {/* Page content */}
        <main className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
          {children}
          </motion.div>
        </main>

      </div>
    </div>
  )
} 
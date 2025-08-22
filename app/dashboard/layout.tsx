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
  Layers,
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <motion.div
              className="w-4 h-4 bg-indigo-600 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-4 h-4 bg-purple-600 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-4 h-4 bg-violet-600 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <p className="text-slate-700 font-bold text-lg">Loading Dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
              className="fixed inset-y-0 left-0 flex flex-col w-80 bg-white/60 backdrop-blur-3xl shadow-2xl border-r border-white/30"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Ultra-Modern Mobile Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/20">
                <motion.div 
                  className="flex items-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[1.5rem] flex items-center justify-center shadow-xl">
                    <Layers className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent ml-4">
                    BillCraft
                  </h2>
                </motion.div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
                  className="p-3 hover:bg-white/30 rounded-[1rem] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                  <X className="h-6 w-6" />
            </Button>
          </div>

              {/* Ultra-Modern Mobile Navigation */}
              <nav className="flex-1 px-6 py-8 space-y-3">
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
                        className={`flex items-center px-6 py-4 text-sm font-bold rounded-[1.5rem] transition-all duration-400 group relative overflow-hidden ${
                          isActive 
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl shadow-indigo-500/30` 
                            : 'text-slate-700 hover:bg-white/70 hover:shadow-lg'
                        }`}
                onClick={() => setSidebarOpen(false)}
              >
                        <div className="relative z-10 flex items-center w-full">
                          <item.icon className={`h-6 w-6 mr-5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                          <div className="flex-1">
                            <div className={`font-black text-base ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {item.name}
                            </div>
                            <div className={`text-xs font-medium ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        )}
              </Link>
                    </motion.div>
                  )
                })}
          </nav>

              {/* Ultra-Modern Mobile User Section */}
              <div className="p-6 border-t border-white/20">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center p-4 rounded-[1.5rem] bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 rounded-[1.25rem] flex items-center justify-center text-white text-base font-black shadow-xl">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 truncate font-medium">{user.email}</p>
                    </div>
                  </div>
            <Button
              variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-[1.5rem] py-4 font-bold text-sm transition-all duration-300"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
                </motion.div>
          </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

             {/* Desktop sidebar - Ultra Smooth & Modern */}
      <motion.div 
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col z-40 transition-all duration-700 ease-out ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'
        }`}
        layout
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div 
          className="flex flex-col flex-grow bg-gradient-to-b from-white/95 via-slate-50/90 to-white/95 backdrop-blur-3xl border-r border-slate-200/30 shadow-2xl shadow-slate-900/5"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}
          transition={{ duration: 0.4 }}
        >
          {/* Ultra-Modern Header */}
          <motion.div 
            className="flex items-center justify-between px-6 py-7 border-b border-slate-200/30 bg-gradient-to-r from-slate-50/50 to-white/50 backdrop-blur-sm"
            whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
             {!sidebarCollapsed && (
               <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                 className="flex items-center space-x-3"
               >
                  <motion.div 
                    className="w-11 h-11 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[14px] flex items-center justify-center shadow-lg shadow-indigo-500/20"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Layers className="h-5 w-5 text-white" />
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                      BillCraft
                    </h2>
                 </motion.div>
               </motion.div>
             )}
            </AnimatePresence>
            
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
             <Button
               variant="ghost"
               size="sm"
               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-3 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 rounded-xl transition-all duration-500 border border-transparent hover:border-slate-200/50 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <motion.div
                  animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-5 w-5 text-slate-600" />
                  ) : (
                    <ChevronLeft className="h-5 w-5 text-slate-600" />
                  )}
                </motion.div>
             </Button>
            </motion.div>
           </motion.div>

          {/* Ultra-Smooth Navigation */}
          <nav className="flex-1 px-5 py-8 space-y-1.5">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
               <motion.div
                 key={item.name}
                 initial={{ opacity: 0, x: -25, scale: 0.95 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.08, 
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ 
                    x: 4, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
               >
                 <Link
                   href={item.href}
                    className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-[16px] transition-all duration-500 group relative overflow-hidden ${
                     sidebarCollapsed ? 'justify-center' : ''
                    } ${
                      isActive 
                        ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/20 border border-slate-700/50' 
                        : 'text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-white hover:text-slate-900 hover:shadow-md hover:shadow-slate-900/5 hover:border hover:border-slate-200/50 border border-transparent'
                    }`}
                  >
                    {/* Active item animated background */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    
                    <motion.div
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: isActive ? 5 : 2,
                        transition: { type: "spring", stiffness: 400, damping: 17 }
                      }}
                      className="relative z-10"
                    >
                      <item.icon className={`h-5 w-5 transition-all duration-300 ${sidebarCollapsed ? '' : 'mr-3'} ${
                        isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                      }`} />
                    </motion.div>
                    
                    <AnimatePresence mode="wait">
                 {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -15, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -15, scale: 0.9 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className={`font-semibold relative z-10 transition-all duration-300 ${
                            isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'
                          }`}
                        >
                     {item.name}
                   </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Enhanced Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <motion.div 
                        className="absolute left-full ml-4 px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm rounded-[12px] opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap z-50 shadow-xl shadow-slate-900/20 border border-slate-700/50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="font-semibold">{item.name}</span>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45 rounded-sm"></div>
                      </motion.div>
                    )}

                    {/* Hover effect overlay */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/0 via-slate-50/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[16px]" />
                    )}
                 </Link>
               </motion.div>
              )
            })}
           </nav>

          {/* Ultra-Modern User Section */}
          <motion.div 
            className="p-5 border-t border-slate-200/30 bg-gradient-to-r from-slate-50/30 to-white/30 backdrop-blur-sm"
            whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.6)" }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
             {!sidebarCollapsed ? (
               <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 25, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                 className="space-y-4"
               >
                  <motion.div 
                    className="flex items-center p-4 rounded-[16px] bg-gradient-to-r from-slate-50 to-white hover:from-white hover:to-slate-50 transition-all duration-500 border border-slate-200/50 hover:border-slate-300/50 hover:shadow-lg hover:shadow-slate-900/5 group"
                    whileHover={{ scale: 1.02, y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="w-11 h-11 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[12px] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                     {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                   </motion.div>
                   <motion.div 
                     className="ml-4 flex-1 min-w-0"
                     whileHover={{ x: 2 }}
                     transition={{ duration: 0.2 }}
                   >
                      <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-slate-800 transition-colors duration-300">
                       {user.displayName || 'User'}
                     </p>
                     <p className="text-xs text-slate-500 truncate group-hover:text-slate-600 transition-colors duration-300">{user.email}</p>
                   </motion.div>
                 </motion.div>
                 <motion.div
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   transition={{ duration: 0.2 }}
                 >
                   <Button
                     variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-25 rounded-[16px] py-3 text-sm font-semibold transition-all duration-500 border border-transparent hover:border-red-200/50 hover:shadow-md hover:shadow-red-900/5"
                     onClick={handleSignOut}
                   >
                     <LogOut className="h-4 w-4 mr-3" />
                     Sign Out
                   </Button>
                 </motion.div>
               </motion.div>
             ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col items-center space-y-4"
                >
                  <motion.div 
                    className="w-11 h-11 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[12px] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20 relative group"
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                   {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    <motion.div 
                      className="absolute left-full ml-4 px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm rounded-[12px] opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap z-50 shadow-xl shadow-slate-900/20 border border-slate-700/50"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="font-semibold">{user.displayName || 'User'}</div>
                      <div className="text-xs text-slate-300">{user.email}</div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45 rounded-sm"></div>
                    </motion.div>
                 </motion.div>
                 <motion.div
                   whileHover={{ scale: 1.08 }}
                   whileTap={{ scale: 0.92 }}
                   transition={{ type: "spring", stiffness: 400, damping: 17 }}
                 >
                   <Button
                     variant="ghost"
                     size="sm"
                      className="p-3 text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-25 rounded-[12px] transition-all duration-500 group relative border border-transparent hover:border-red-200/50 hover:shadow-md hover:shadow-red-900/5"
                     onClick={handleSignOut}
                   >
                     <LogOut className="h-4 w-4" />
                      <motion.div 
                        className="absolute left-full ml-4 px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm rounded-[12px] opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap z-50 shadow-xl shadow-slate-900/20 border border-slate-700/50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                       <span className="font-semibold">Sign Out</span>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45 rounded-sm"></div>
                      </motion.div>
                   </Button>
                 </motion.div>
                </motion.div>
             )}
            </AnimatePresence>
           </motion.div>
         </motion.div>
      </motion.div>

             {/* Main content */}
      <div className={`transition-all duration-700 ease-out ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        {/* Ultra-Modern Mobile Top Bar */}
        <motion.div 
          className="sticky top-0 z-30 lg:hidden bg-white/70 backdrop-blur-3xl border-b border-white/30 px-6 py-5 shadow-lg"
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
                className="p-4 hover:bg-white/30 rounded-[1.25rem] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Menu className="h-6 w-6" />
            </Button>
            </motion.div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[1rem] flex items-center justify-center shadow-xl mr-3">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
                BillCraft
              </h1>
            </div>
            <div className="w-14" /> {/* Spacer */}
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
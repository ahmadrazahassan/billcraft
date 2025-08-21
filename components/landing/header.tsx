'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, FileText, ArrowRight, User, LogOut, BarChart3 } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading, mounted, logout } = useAuth()
  const router = useRouter()

  const handleAuthButtonClick = (path: string) => {
    if (loading || !mounted) return

    if (user) {
      // User is already logged in, redirect to dashboard
      router.push('/dashboard')
      return
    } else {
      // User not logged in, proceed to auth page
      router.push(path)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleDashboardClick = () => {
    router.push('/dashboard')
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between h-14 relative">
                    {/* Professional Logo */}
          <Link href="/" className="flex items-center space-x-3 group z-10">
            <div 
              className="flex items-center space-x-3 px-4 py-2.5 bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm border border-orange-200/15 dark:border-orange-700/15 rounded-full shadow-xs group-hover:shadow-sm group-hover:bg-white/15 dark:group-hover:bg-gray-900/15 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 1px 6px 0 rgba(249, 115, 22, 0.02)',
              }}
            >
              <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 shadow-sm">
                <FileText className="h-4 w-4 text-white" />
            </div>
              <span className="text-xl font-sans font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 tracking-tight">
                BillCraft
              </span>
            </div>
          </Link>

                    {/* Enhanced Centered Navigation */}
          <nav className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div 
              className="flex items-center space-x-1 px-2 py-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full shadow-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 2px 16px 0 rgba(31, 38, 135, 0.08)',
              }}
            >
            <Link 
              href="/templates" 
                className="px-4 py-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:shadow-lg transition-all duration-300 font-medium text-base"
            >
              Templates
            </Link>
            <Link 
              href="/pricing" 
                className="px-4 py-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:shadow-lg transition-all duration-300 font-medium text-base"
            >
              Pricing
            </Link>
            <Link 
              href="/features" 
                className="px-4 py-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-violet-600 hover:shadow-lg transition-all duration-300 font-medium text-base"
            >
              Features
            </Link>
            <Link 
              href="/about" 
                className="px-4 py-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:shadow-lg transition-all duration-300 font-medium text-base"
            >
              About
            </Link>
            </div>
          </nav>

          {/* Minimal Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2 z-10">
            {!mounted || loading ? (
              // Show loading state or skeleton while mounting/loading
              <>
                    <div className="w-16 h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-full animate-pulse" />
                    <div className="w-20 h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-full animate-pulse" />
              </>
            ) : user ? (
              // User is logged in - show Dashboard button and user menu
              <>
                <Button 
                  onClick={handleDashboardClick}
                  className="px-4 py-1.5 font-medium group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full shadow-md transition-all duration-300 text-sm"
                >
                  <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
                  Dashboard
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <div 
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-sm"
                >
                  <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xs font-medium text-white">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {user.displayName || user.email?.split('@')[0]}
                </span>
                </div>
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="font-medium rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-all duration-300 shadow-sm p-1.5"
                  size="sm"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              // User not logged in - show auth buttons
              <>
              <Button 
                variant="ghost" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white/30 dark:bg-gray-800/30 hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 font-medium rounded-full transition-all duration-300 text-sm px-3 py-1.5 shadow-xs"
                  onClick={() => handleAuthButtonClick('/auth/login')}
              >
                Sign In
              </Button>
                <Button 
                  className="px-4 py-1.5 font-medium group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full shadow-md transition-all duration-300 text-sm"
                  onClick={() => handleAuthButtonClick('/auth/signup')}
                >
                  Get Free Trial
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              </>
            )}
          </div>

          {/* Minimal Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/40 dark:border-gray-700/40 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 shadow-sm"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Minimal Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden mt-3 mx-3 mb-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-md overflow-hidden"
          >
            <nav className="py-4 px-3 space-y-2.5">
              <Link 
                href="/templates" 
                className="block px-5 py-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:shadow-lg transition-all duration-300 font-medium text-center text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                href="/pricing" 
                className="block px-5 py-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:shadow-lg transition-all duration-300 font-medium text-center text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/features" 
                className="block px-5 py-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-violet-600 hover:shadow-lg transition-all duration-300 font-medium text-center text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/about" 
                className="block px-5 py-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:shadow-lg transition-all duration-300 font-medium text-center text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="pt-3 mt-3 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
                {!mounted || loading ? (
                  // Show loading state for mobile
                  <>
                    <div className="w-full h-9 bg-gray-200/50 dark:bg-gray-700/50 rounded-full animate-pulse" />
                    <div className="w-full h-9 bg-gray-200/50 dark:bg-gray-700/50 rounded-full animate-pulse" />
                  </>
                ) : user ? (
                  // User is logged in - mobile version
                  <>
                    <div 
                      className="w-full px-3 py-2.5 text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full mb-2"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-xs font-medium text-white">
                            {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {user.displayName || user.email?.split('@')[0]}
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleDashboardClick()
                      }}
                      className="w-full font-medium group justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full shadow-md py-2 text-sm"
                    >
                      <BarChart3 className="mr-1.5 h-4 w-4" />
                      Dashboard
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleLogout()
                      }}
                      className="w-full justify-center font-medium rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-all duration-300 py-2 text-sm"
                    >
                      <LogOut className="mr-1.5 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  // User not logged in - mobile version
                  <>
                  <Button 
                    variant="ghost" 
                      className="w-full justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white/30 dark:bg-gray-800/30 hover:bg-white/60 dark:hover:bg-gray-800/60 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 font-medium rounded-full transition-all duration-300 py-2 text-sm shadow-xs"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleAuthButtonClick('/auth/login')
                      }}
                  >
                    Sign In
                  </Button>
                    <Button 
                      className="w-full font-medium group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full shadow-md py-2 text-sm"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleAuthButtonClick('/auth/signup')
                      }}
                    >
                      Get Free Trial
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
} 
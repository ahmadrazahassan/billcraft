'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, FileText, ArrowRight, User, LogOut, BarChart3 } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { buildSignupURL, buildLoginURL, buildDashboardURL, buildPricingURL } from '@/lib/url-builder'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { user, loading, mounted, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY

      // Hide header when scrolling down past 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlHeader)
    return () => window.removeEventListener('scroll', controlHeader)
  }, [lastScrollY])

  const handleAuthButtonClick = (type: 'login' | 'signup') => {
    if (loading || !mounted) return

    if (user) {
      // User is already logged in, redirect to dashboard
      router.push(buildDashboardURL({ path: '', source: 'header', action: 'already_logged_in' }))
      return
    } else {
      // User not logged in, proceed to auth page
      if (type === 'login') {
        router.push(buildLoginURL({ source: 'header', returnUrl: '/dashboard' }))
      } else {
        router.push(buildSignupURL({ source: 'header', trial: true, plan: 'professional' }))
      }
    }
  }

  const handleTrialButtonClick = () => {
    if (loading || !mounted) return

    if (user) {
      // User is already logged in, redirect to dashboard
      router.push(buildDashboardURL({ path: '', source: 'header_trial_cta', action: 'already_logged_in' }))
      return
    } else {
      // User not logged in, start trial signup
      router.push(buildSignupURL({
        plan: 'professional',
        trial: true,
        source: 'header_trial_cta',
        ref: 'start_free_trial_button'
      }))
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
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -100
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="container mx-auto px-6 py-4 pointer-events-none">
        {/* Modern pill-shaped container with glassmorphism */}
        <div
          className="max-w-4xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-3xl border border-white/20 dark:border-gray-700/20 rounded-full shadow-2xl pointer-events-auto"
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(24px) saturate(200%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          }}
        >
          <div className="flex items-center justify-between gap-6 h-16 px-8 relative">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg group-hover:scale-105 transition-transform duration-200">
                <FileText className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
                BillCraft
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link
                href="/templates"
                className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 font-medium text-sm"
              >
                Templates
              </Link>
              <Link
                href="/pricing"
                className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 font-medium text-sm"
              >
                Pricing
              </Link>
              <Link
                href="/features"
                className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 font-medium text-sm"
              >
                Features
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 font-medium text-sm"
              >
                About
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {!mounted || loading ? (
                <>
                  <div className="w-20 h-9 bg-gray-200/50 dark:bg-gray-700/50 rounded-full animate-pulse" />
                  <div className="w-32 h-9 bg-gray-200/50 dark:bg-gray-700/50 rounded-full animate-pulse" />
                </>
              ) : user ? (
                <>
                  <Button
                    onClick={handleDashboardClick}
                    className="px-4 py-2 font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full transition-all duration-200 text-sm h-9"
                  >
                    <BarChart3 className="mr-1.5 h-4 w-4" />
                    Dashboard
                  </Button>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/40 dark:bg-gray-800/40 rounded-full">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="ml-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 p-1.5"
                      title="Sign out"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 font-medium rounded-full transition-all duration-200 text-sm px-5 py-2 h-9"
                    onClick={() => handleAuthButtonClick('login')}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="px-5 py-2 font-medium bg-primary hover:bg-primary/90 text-white border-0 rounded-full transition-all duration-200 text-sm h-9 shadow-sm hover:shadow-md"
                    onClick={handleTrialButtonClick}
                  >
                    Get Started Today
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 rounded-full hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
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
                        handleAuthButtonClick('login')
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full font-medium group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full shadow-md py-2 text-sm"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleTrialButtonClick()
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
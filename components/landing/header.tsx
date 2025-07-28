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
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm"
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-primary rounded-2xl group-hover:bg-primary/90 transition-colors duration-200">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                BillCraft
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/templates" 
              className="px-4 py-2 rounded-2xl text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
            >
              Templates
            </Link>
            <Link 
              href="/pricing" 
              className="px-4 py-2 rounded-2xl text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
            >
              Pricing
            </Link>
            <Link 
              href="/features" 
              className="px-4 py-2 rounded-2xl text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
            >
              Features
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 rounded-2xl text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
            >
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {!mounted || loading ? (
              // Show loading state or skeleton while mounting/loading
              <>
                <div className="w-20 h-9 bg-muted/50 rounded-2xl animate-pulse" />
                <div className="w-28 h-9 bg-muted/50 rounded-2xl animate-pulse" />
              </>
            ) : user ? (
              // User is logged in - show Dashboard button and user menu
              <>
                <Button 
                  onClick={handleDashboardClick}
                  className="btn-primary px-5 py-2 font-medium group"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-2xl">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user.displayName || user.email?.split('@')[0]}
                </span>
                </div>
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="font-medium rounded-2xl border-border hover:border-primary"
                  size="sm"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              // User not logged in - show auth buttons
              <>
              <Button 
                variant="ghost" 
                  className="text-foreground hover:text-primary hover:bg-muted font-medium rounded-2xl"
                  onClick={() => handleAuthButtonClick('/auth/login')}
              >
                Sign In
              </Button>
                <Button 
                  className="btn-primary px-5 py-2 font-medium group"
                  onClick={() => handleAuthButtonClick('/auth/signup')}
                >
                  Get 3-Month Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-2xl hover:bg-muted transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <nav className="py-4 space-y-2">
              <Link 
                href="/templates" 
                className="block px-4 py-3 rounded-2xl text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                href="/pricing" 
                className="block px-4 py-3 rounded-2xl text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/features" 
                className="block px-4 py-3 rounded-2xl text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-3 rounded-2xl text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="pt-3 border-t border-border space-y-2">
                {!mounted || loading ? (
                  // Show loading state for mobile
                  <>
                    <div className="w-full h-10 bg-muted/50 rounded-2xl animate-pulse" />
                    <div className="w-full h-10 bg-muted/50 rounded-2xl animate-pulse" />
                  </>
                ) : user ? (
                  // User is logged in - mobile version
                  <>
                    <div className="w-full px-4 py-3 text-center bg-muted/30 rounded-2xl mb-2">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {user.displayName || user.email?.split('@')[0]}
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleDashboardClick()
                      }}
                      className="w-full btn-primary font-medium group justify-start"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                      <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleLogout()
                      }}
                      className="w-full justify-start font-medium rounded-2xl border-border hover:border-primary"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  // User not logged in - mobile version
                  <>
                  <Button 
                    variant="ghost" 
                      className="w-full justify-start text-foreground hover:text-primary hover:bg-muted font-medium rounded-2xl"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleAuthButtonClick('/auth/login')
                      }}
                  >
                    Sign In
                  </Button>
                    <Button 
                      className="w-full btn-primary font-medium group"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleAuthButtonClick('/auth/signup')
                      }}
                    >
                      Get 3-Month Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
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
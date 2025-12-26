'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Layout,
  Layers,
  Home,
  Crown,
  UserCircle
} from 'lucide-react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Navigation links with icons
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Invoices",
      href: "/dashboard/invoices",
      icon: (
        <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Templates",
      href: "/dashboard/templates",
      icon: (
        <Layout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Clients",
      href: "/dashboard/clients",
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Billing",
      href: "/dashboard/billing",
      icon: (
        <Crown className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ]

  // Redirect if not authenticated
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <motion.div
              className="w-4 h-4 bg-primary rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-4 h-4 bg-primary rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-4 h-4 bg-primary rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <p className="text-foreground font-bold text-lg">Loading Dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {/* User Profile */}
            <SidebarLink
              link={{
                label: user.displayName || user.email || "User",
                href: "/dashboard/settings",
                icon: (
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                ),
              }}
            />
            {/* Logout Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center justify-start gap-2 group/sidebar py-2 w-full text-left mt-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="text-red-600 dark:text-red-400 h-5 w-5 flex-shrink-0" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-red-600 dark:text-red-400 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              >
                Logout
              </motion.span>
            </button>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  )
}

// Logo Component
const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        BillCraft
      </motion.span>
    </Link>
  )
}

// Logo Icon Component (collapsed state)
const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  )
}

// Dashboard content wrapper
const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <div className="p-4 md:p-6 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex-1 w-full overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

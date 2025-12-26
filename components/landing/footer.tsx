'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Mail, 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram,
  Heart
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/billcraft", label: "Twitter" },
    { icon: Github, href: "https://github.com/billcraft", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/billcraft", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/billcraft", label: "Instagram" }
  ]

  const quickLinks = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Templates", href: "/templates" },
    { label: "About", href: "/about" }
  ]

  const supportLinks = [
    { label: "Help Center", href: "/help" },
    { label: "Documentation", href: "/docs" },
    { label: "Contact", href: "/contact" }
  ]

  const legalLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" }
  ]



  return (
    <footer className="relative overflow-hidden py-12 px-6 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-950/50">
      <div className="container mx-auto max-w-6xl">
        {/* Modern Glassmorphism Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-3xl border border-white/20 dark:border-gray-700/20 rounded-[3rem] shadow-2xl overflow-hidden"
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(24px) saturate(200%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          }}
        >
          {/* Main Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 group mb-4">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg group-hover:scale-105 transition-transform duration-200">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  BillCraft
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Professional invoicing made simple and beautiful.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <a href="mailto:hello@billcraft.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                  hello@billcraft.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2.5 bg-white/40 dark:bg-gray-800/40 hover:bg-orange-500 hover:text-white rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 px-8 md:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>&copy; {currentYear} BillCraft.</span>
                <span className="hidden md:inline">Made with</span>
                <Heart className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
              </div>
              <div className="flex gap-6">
                {legalLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 
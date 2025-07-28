'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink,
  Zap,
  Users,
  Heart,
  ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/billcraft", label: "Twitter", color: "hover:bg-blue-500 hover:text-white" },
    { icon: Github, href: "https://github.com/billcraft", label: "GitHub", color: "hover:bg-gray-800 hover:text-white" },
    { icon: Linkedin, href: "https://linkedin.com/company/billcraft", label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white" },
    { icon: Instagram, href: "https://instagram.com/billcraft", label: "Instagram", color: "hover:bg-pink-500 hover:text-white" }
  ]



  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      {/* Advanced Background Pattern */}
      <div className="absolute inset-0">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        
        {/* Subtle Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">


          {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Company Section - Enhanced */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Premium Brand Section */}
                <div className="relative">
                  <Link href="/" className="flex items-center space-x-4 group">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className="relative p-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl shadow-2xl group-hover:shadow-blue-500/25"
                    >
                      <FileText className="h-8 w-8 text-white relative z-10" />
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl" />
                    </motion.div>
                    <div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                        BillCraft
                      </span>
                      <p className="text-slate-400 text-sm">Professional Invoicing Excellence</p>
                    </div>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full opacity-30" />
                  <p className="text-slate-300 text-lg leading-relaxed pl-4">
                    Empowering businesses with intelligent invoicing solutions. 
                    Create, send, and track professional invoices with advanced automation and analytics.
                  </p>
                  </div>

                {/* Enhanced Contact Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
                    Get in Touch
                  </h4>
                  {[
                    { icon: Mail, text: "hello@billcraft.com", href: "mailto:hello@billcraft.com", color: "hover:text-blue-400" },
                    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567", color: "hover:text-green-400" },
                    { icon: MapPin, text: "San Francisco, CA", href: "#", color: "hover:text-purple-400" }
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex items-center space-x-4 text-slate-300 ${contact.color} transition-all duration-200 group`}
                    >
                      <div className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl group-hover:bg-slate-700/50 group-hover:border-slate-600/50 transition-all duration-200">
                        <contact.icon className="h-4 w-4" />
                  </div>
                      <div className="flex-1">
                        <span className="block">{contact.text}</span>
                  </div>
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.a>
                  ))}
              </div>
              </motion.div>
            </div>

            {/* Advanced Navigation Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Product Column - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  {/* Column Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 -m-4 p-4" />
                  
                  <div className="relative z-10">
                    <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mr-3">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      Product
                    </h4>
                <ul className="space-y-4">
                      {[
                        { label: "Features", href: "/features", badge: "New", badgeColor: "bg-green-500/20 text-green-400 border-green-500/30" },
                        { label: "Pricing", href: "/pricing", badge: null },
                        { label: "Templates", href: "/templates", badge: "50+", badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                        { label: "Integrations", href: "/integrations", badge: null },
                        { label: "API Docs", href: "/api", badge: "v2.0", badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                        { label: "Mobile App", href: "/mobile", badge: "Soon", badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30" }
                      ].map((link, index) => (
                        <li key={index}>
                          <Link 
                            href={link.href}
                            className="flex items-center justify-between text-slate-300 hover:text-white transition-all duration-200 group py-2 px-3 rounded-lg hover:bg-slate-800/30"
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 flex items-center">
                              <div className="w-1 h-1 bg-slate-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors duration-200" />
                              {link.label}
                            </span>
                            {link.badge && (
                              <Badge className={`text-xs ${link.badgeColor || 'bg-slate-700/50 text-slate-400 border-slate-600/50'}`}>
                                {link.badge}
                              </Badge>
                            )}
                          </Link>
                        </li>
                      ))}
              </ul>
                  </div>
              </motion.div>

                {/* Company Column - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 -m-4 p-4" />
                  
                  <div className="relative z-10">
                    <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                      <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg mr-3">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      Company
                    </h4>
                <ul className="space-y-4">
                      {[
                        { label: "About Us", href: "/about" },
                        { label: "Careers", href: "/careers", badge: "Hiring" },
                        { label: "Blog", href: "/blog" },
                        { label: "Press Kit", href: "/press" },
                        { label: "Partners", href: "/partners" },
                        { label: "Contact Us", href: "/contact" }
                      ].map((link, index) => (
                        <li key={index}>
                          <Link 
                            href={link.href}
                            className="flex items-center justify-between text-slate-300 hover:text-white transition-all duration-200 group py-2 px-3 rounded-lg hover:bg-slate-800/30"
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 flex items-center">
                              <div className="w-1 h-1 bg-slate-600 rounded-full mr-3 group-hover:bg-green-400 transition-colors duration-200" />
                              {link.label}
                            </span>
                            {link.badge && (
                              <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                                {link.badge}
                              </Badge>
                            )}
                          </Link>
                        </li>
                      ))}
              </ul>
                  </div>
              </motion.div>

                {/* Support Column - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 -m-4 p-4" />
                  
                  <div className="relative z-10">
                    <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                      <div className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg mr-3">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                      Support
                    </h4>
                <ul className="space-y-4">
                      {[
                        { label: "Help Center", href: "/help" },
                        { label: "Documentation", href: "/docs" }
                      ].map((link, index) => (
                        <li key={index}>
                          <Link 
                            href={link.href}
                            className="flex items-center justify-between text-slate-300 hover:text-white transition-all duration-200 group py-2 px-3 rounded-lg hover:bg-slate-800/30"
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 flex items-center">
                              <div className="w-1 h-1 bg-slate-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors duration-200" />
                              {link.label}
                            </span>
                          </Link>
                        </li>
                      ))}
              </ul>
                  </div>
              </motion.div>
              </div>
            </div>
            </div>
          </div>

        {/* Premium Bottom Section */}
        <div className="border-t border-slate-700/50 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              
              {/* Copyright & Legal - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row items-center gap-6"
              >
                <div className="flex items-center text-slate-400">
                <p>&copy; {currentYear} BillCraft. All rights reserved.</p>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Terms of Service", href: "/terms" }
                  ].map((link, index) => (
                    <Link 
                      key={index}
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm relative group"
                    >
                      {link.label}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full" />
                </Link>
                  ))}
                </div>
              </motion.div>

              {/* Premium Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                <span className="text-slate-400 text-sm">Connect with us:</span>
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 ${social.color} rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-current/20 hover:border-current/50`}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 
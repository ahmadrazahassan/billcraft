'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Building2, 
  Bell, 
  Palette, 
  Shield, 
  CreditCard,
  Settings as SettingsIcon,
  Save,
  Upload,
  Eye,
  EyeOff,
  Globe,
  Mail,
  Phone,
  MapPin,
  Camera,
  Lock,
  Smartphone,
  Monitor,
  Zap,
  Check,
  X,
  Loader2,
  Crown,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { saveUserSettings, getUserSettings } from '@/lib/settings'

export default function SettingsPage() {
  const { user, updateUserProfile } = useAuth()
  const { success, error: showError } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Profile form state
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    avatar: '',
    bio: '',
    jobTitle: '',
    location: ''
  })

  // Business form state
  const [businessData, setBusinessData] = useState({
    companyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    website: '',
    taxId: '',
    logo: '',
    industry: '',
    employeeCount: ''
  })

  // Advanced settings state
  const [settingsData, setSettingsData] = useState({
    currency: 'USD',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US',
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    invoicePrefix: 'INV',
    defaultTax: '0',
    defaultPaymentTerms: '30',
    autoSave: true,
    darkMode: false,
    compactMode: false,
    allowAnalytics: true
  })

  // Security settings
  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: '30',
    allowedIPs: [] as string[],
    apiAccess: false
  })

  // Load settings on component mount
  useEffect(() => {
    loadUserSettings()
  }, [])

  const loadUserSettings = async () => {
    try {
      if (!user?.uid) return
      const settings = await getUserSettings(user.uid)
      if (settings) {
        setProfileData(prev => ({ ...prev, ...settings.profile }))
        setBusinessData(prev => ({ ...prev, ...settings.business }))
        setSettingsData(prev => ({ ...prev, ...settings.preferences }))
        setSecurityData(prev => ({ ...prev, ...settings.security }))
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  // Track changes
  useEffect(() => {
    setHasChanges(true)
  }, [profileData, businessData, settingsData, securityData])

  const handleSaveAllSettings = async () => {
    setIsSaving(true)
    try {
      if (!user?.uid) {
        throw new Error('User not authenticated')
      }
      
      const allSettings = {
        profile: profileData,
        business: businessData,
        preferences: settingsData,
        security: securityData
      }
      
      await saveUserSettings(user.uid, allSettings)
      
      if (profileData.displayName !== user?.displayName) {
        await updateUserProfile(profileData.displayName)
      }
      
      setHasChanges(false)
      success({
        title: "Settings saved successfully!",
        description: "All your settings have been synchronized to the cloud.",
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      showError({
        title: "Save failed",
        description: "Failed to save settings. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTabSave = async (tabData: any, tabName: string) => {
    setIsLoading(true)
    try {
      if (!user?.uid) {
        throw new Error('User not authenticated')
      }
      
      const allSettings = {
        profile: profileData,
        business: businessData,
        preferences: settingsData,
        security: securityData,
        [tabName]: tabData
      }
      
      await saveUserSettings(user.uid, allSettings)
      
      success({
        title: `${tabName.charAt(0).toUpperCase() + tabName.slice(1)} updated`,
        description: "Changes saved successfully.",
      })
    } catch (error) {
      showError({
        title: "Error",
        description: "Failed to save changes. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Tab configuration
  const tabs = [
    { id: 'profile', name: 'Profile', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'business', name: 'Business', icon: Building2, color: 'from-purple-500 to-pink-500' },
    { id: 'preferences', name: 'Preferences', icon: Palette, color: 'from-orange-500 to-red-500' },
    { id: 'security', name: 'Security', icon: Shield, color: 'from-green-500 to-emerald-500' }
  ]

  return (
    <div className="space-y-12 relative max-w-7xl mx-auto">
      {/* Ultra-subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

            {/* Ultra-Modern Header */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-violet-50/90 rounded-[4rem] backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.2),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.2),transparent_60%)]"></div>
        
        <div className="relative p-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center space-x-6 mb-6">
              <motion.div 
                className="relative"
                whileHover={{ 
                  scale: 1.08, 
                  rotate: 8,
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                  <SettingsIcon className="h-10 w-10 text-white" />
                </div>
                <motion.div 
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-[1rem] flex items-center justify-center shadow-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </motion.div>
              </motion.div>
              
      <div>
                <motion.h1 
                  className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent leading-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Settings
                </motion.h1>
              </div>
      </div>


          </motion.div>
        </div>
      </motion.div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
        {/* Ultra-Rounded Tab Navigation */}
        <motion.div 
          className="bg-white/50 backdrop-blur-3xl border border-white/60 shadow-2xl rounded-[4rem] p-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.6, 
            duration: 0.8, 
            ease: [0.25, 0.1, 0.25, 1] 
          }}
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.3 }
          }}
        >
          <TabsList className="grid w-full grid-cols-4 bg-transparent gap-3 h-auto p-0">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id
              return (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.7 + index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15 
                    }
                  }}
                  whileTap={{ 
                    scale: 0.96,
                    transition: { duration: 0.1 }
                  }}
                >
                  <TabsTrigger 
                    value={tab.id}
                    className={`relative w-full h-auto p-8 rounded-[2.5rem] transition-all duration-700 font-bold text-lg data-[state=active]:shadow-2xl ${
                      isActive 
                        ? `bg-gradient-to-br ${tab.color} text-white shadow-xl shadow-indigo-500/30` 
                        : 'text-slate-600 hover:bg-white/70 hover:text-slate-900 hover:shadow-xl'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <motion.div
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: 8,
                          transition: { 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 15 
                          }
                        }}
                        animate={isActive ? {
                          scale: [1, 1.1, 1],
                          transition: { 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }
                        } : {}}
                      >
                        <div className={`p-3 rounded-[1.5rem] ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                          <tab.icon className={`h-7 w-7 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        </div>
                      </motion.div>
                      <span className="text-base font-black">{tab.name}</span>
                    </div>
                    
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/10 to-white/5 rounded-[2.5rem]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.5,
                          type: "spring",
                          stiffness: 300
                        }}
                      />
                    )}
                    
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 border-2 border-white/30 rounded-[2.5rem]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </TabsTrigger>
                </motion.div>
              )
            })}
        </TabsList>
        </motion.div>

                {/* Ultra-Rounded Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
            className="space-y-10"
          >
            <Card className="relative overflow-hidden bg-white/50 backdrop-blur-3xl border-white/60 shadow-2xl rounded-[4rem] p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-purple-50/60"></div>
              <div className="relative space-y-10">
                {/* Ultra-Modern Profile Header */}
                <div className="text-center">
                  <motion.div
                    className="relative inline-block"
                    whileHover={{ 
                      scale: 1.08,
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="w-40 h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40 mx-auto"
                      animate={{
                        boxShadow: [
                          "0 25px 50px -12px rgba(99, 102, 241, 0.4)",
                          "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
                          "0 25px 50px -12px rgba(99, 102, 241, 0.4)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-5xl font-black text-white">
                      {profileData.displayName?.charAt(0) || profileData.email?.charAt(0) || 'U'}
                    </span>
                    </motion.div>
                    <motion.button
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 10,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-orange-500/40 border-4 border-white"
                    >
                      <Camera className="h-7 w-7 text-white" />
                    </motion.button>
                  </motion.div>
                  <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-black text-slate-900">Profile Information</h3>
                    <p className="text-slate-600 font-bold mt-3 text-lg">Manage your personal details and preferences</p>
                  </motion.div>
              </div>

                {/* Ultra-Rounded Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.4, 
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label htmlFor="displayName" className="text-lg font-black text-slate-700 mb-4 block">Full Name</Label>
                  <Input
                    id="displayName"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                        className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-indigo-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                        placeholder="Enter your full name"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label htmlFor="email" className="text-lg font-black text-slate-700 mb-4 block">Email Address</Label>
                      <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                          className="h-16 bg-slate-100/80 border-slate-200/60 rounded-[2rem] text-xl font-semibold text-slate-600 px-6"
                  />
                        <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                          <Lock className="h-6 w-6 text-slate-400" />
                </div>
                      </div>
                      <p className="text-base text-slate-500 mt-3 font-bold">🔒 Email address is secured and cannot be changed</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label htmlFor="jobTitle" className="text-lg font-black text-slate-700 mb-4 block">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={profileData.jobTitle}
                        onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                        className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-indigo-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                        placeholder="e.g., CEO, Freelancer, Consultant"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.5, 
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label htmlFor="phone" className="text-lg font-black text-slate-700 mb-4 block">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-indigo-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                        placeholder="+1 (555) 123-4567"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label htmlFor="location" className="text-lg font-black text-slate-700 mb-4 block">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-indigo-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                        placeholder="City, Country"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label htmlFor="bio" className="text-lg font-black text-slate-700 mb-4 block">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="min-h-[140px] bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-indigo-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold resize-none p-6"
                        placeholder="Tell us about yourself..."
                      />
                    </motion.div>
                  </motion.div>
              </div>

                {/* Save Button at Bottom */}
                <motion.div 
                  className="flex justify-center pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                <Button 
                    onClick={() => handleTabSave(profileData, 'profile')}
                  disabled={isLoading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-[2rem] px-12 py-4 text-xl font-black shadow-2xl shadow-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 disabled:opacity-50 hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                        Saving Profile...
                      </>
                    ) : (
                      <>
                        <Save className="h-6 w-6 mr-3" />
                        Save Profile Changes
                      </>
                    )}
                </Button>
                </motion.div>
            </div>
          </Card>
          </motion.div>
        </TabsContent>

        {/* Ultra-Rounded Business Tab */}
        <TabsContent value="business">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
            className="space-y-10"
          >
            <Card className="relative overflow-hidden bg-white/50 backdrop-blur-3xl border-white/60 shadow-2xl rounded-[4rem] p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-orange-50/60"></div>
              <div className="relative space-y-10">
                {/* Ultra-Modern Business Header */}
                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-purple-500/40 mx-auto mb-8"
                    whileHover={{ 
                      scale: 1.08, 
                      rotate: 8,
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 25px 50px -12px rgba(168, 85, 247, 0.4)",
                        "0 25px 50px -12px rgba(236, 72, 153, 0.4)",
                        "0 25px 50px -12px rgba(168, 85, 247, 0.4)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Building2 className="h-12 w-12 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-black text-slate-900">Business Information</h3>
                    <p className="text-slate-600 font-bold mt-3 text-lg">Configure your business details for professional invoicing</p>
                  </motion.div>
              </div>

                {/* Ultra-Rounded Business Form */}
                <div className="space-y-10">
                  {/* Company Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <motion.div 
                      className="lg:col-span-2"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.4, 
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Label htmlFor="companyName" className="text-lg font-black text-slate-700 mb-4 block">Company Name</Label>
                  <Input
                    id="companyName"
                    value={businessData.companyName}
                    onChange={(e) => setBusinessData({ ...businessData, companyName: e.target.value })}
                        className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                        placeholder="Your Company Name"
                      />
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.5, 
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Label htmlFor="industry" className="text-lg font-black text-slate-700 mb-4 block">Industry</Label>
                      <select
                        id="industry"
                        value={businessData.industry}
                        onChange={(e) => setBusinessData({ ...businessData, industry: e.target.value })}
                        className="h-16 w-full px-6 py-4 bg-white/80 border border-white/60 rounded-[2rem] text-xl font-semibold focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl"
                      >
                        <option value="">Select Industry</option>
                        <option value="technology">💻 Technology</option>
                        <option value="consulting">🤝 Consulting</option>
                        <option value="design">🎨 Design</option>
                        <option value="marketing">📢 Marketing</option>
                        <option value="finance">💰 Finance</option>
                        <option value="healthcare">🏥 Healthcare</option>
                        <option value="education">🎓 Education</option>
                        <option value="retail">🛍️ Retail</option>
                        <option value="other">🔧 Other</option>
                      </select>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.6, 
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Label htmlFor="employeeCount" className="text-lg font-black text-slate-700 mb-4 block">Company Size</Label>
                      <select
                        id="employeeCount"
                        value={businessData.employeeCount}
                        onChange={(e) => setBusinessData({ ...businessData, employeeCount: e.target.value })}
                        className="h-16 w-full px-6 py-4 bg-white/80 border border-white/60 rounded-[2rem] text-xl font-semibold focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl"
                      >
                        <option value="">Select Size</option>
                        <option value="1">👤 Just me</option>
                        <option value="2-10">👥 2-10 employees</option>
                        <option value="11-50">🏢 11-50 employees</option>
                        <option value="51-200">🏬 51-200 employees</option>
                        <option value="200+">🏭 200+ employees</option>
                      </select>
                    </motion.div>
                </div>

                  {/* Business Address Section */}
                  <div className="space-y-8">
                    <motion.h4 
                      className="text-2xl font-black text-slate-800 flex items-center justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <MapPin className="h-6 w-6 mr-3 text-purple-600" />
                      Business Address
                    </motion.h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <motion.div 
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Label htmlFor="address" className="text-lg font-black text-slate-700 mb-4 block">Street Address</Label>
                  <Input
                    id="address"
                    value={businessData.address}
                    onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                          className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                          placeholder="123 Business Street"
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Label htmlFor="city" className="text-lg font-black text-slate-700 mb-4 block">City</Label>
                  <Input
                    id="city"
                    value={businessData.city}
                    onChange={(e) => setBusinessData({ ...businessData, city: e.target.value })}
                          className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                          placeholder="City"
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Label htmlFor="state" className="text-lg font-black text-slate-700 mb-4 block">State/Province</Label>
                  <Input
                    id="state"
                    value={businessData.state}
                    onChange={(e) => setBusinessData({ ...businessData, state: e.target.value })}
                          className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                          placeholder="State/Province"
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Label htmlFor="zipCode" className="text-lg font-black text-slate-700 mb-4 block">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    value={businessData.zipCode}
                    onChange={(e) => setBusinessData({ ...businessData, zipCode: e.target.value })}
                          className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                          placeholder="12345"
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Label htmlFor="country" className="text-lg font-black text-slate-700 mb-4 block">Country</Label>
                  <select
                    id="country"
                    value={businessData.country}
                    onChange={(e) => setBusinessData({ ...businessData, country: e.target.value })}
                          className="h-16 w-full px-6 py-4 bg-white/80 border border-white/60 rounded-[2rem] text-xl font-semibold focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl"
                  >
                    <option value="">Select Country</option>
                          <option value="US">🇺🇸 United States</option>
                          <option value="CA">🇨🇦 Canada</option>
                          <option value="GB">🇬🇧 United Kingdom</option>
                          <option value="AU">🇦🇺 Australia</option>
                          <option value="DE">🇩🇪 Germany</option>
                          <option value="FR">🇫🇷 France</option>
                          <option value="JP">🇯🇵 Japan</option>
                          <option value="IN">🇮🇳 India</option>
                  </select>
                      </motion.div>
                    </div>
                </div>

                  {/* Contact & Legal Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Label htmlFor="website" className="text-lg font-black text-slate-700 mb-4 block">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
                  <Input
                    id="website"
                    value={businessData.website}
                    onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
                          className="h-16 pl-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold"
                          placeholder="https://yourcompany.com"
                  />
                </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Label htmlFor="taxId" className="text-lg font-black text-slate-700 mb-4 block">Tax ID/VAT Number</Label>
                  <Input
                    id="taxId"
                    value={businessData.taxId}
                    onChange={(e) => setBusinessData({ ...businessData, taxId: e.target.value })}
                        className="h-16 bg-white/80 border-white/60 rounded-[2rem] text-xl placeholder:text-slate-400 focus:bg-white/95 focus:border-purple-400 transition-all duration-500 shadow-xl focus:shadow-2xl font-semibold px-6"
                        placeholder="123-45-6789"
                  />
                    </motion.div>
                </div>
              </div>

                {/* Save Button at Bottom */}
                <motion.div 
                  className="flex justify-center pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                <Button 
                    onClick={() => handleTabSave(businessData, 'business')}
                  disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-[2rem] px-12 py-4 text-xl font-black shadow-2xl shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 disabled:opacity-50 hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                        Saving Business Info...
                      </>
                    ) : (
                      <>
                        <Save className="h-6 w-6 mr-3" />
                        Save Business Changes
                      </>
                    )}
                </Button>
                </motion.div>
            </div>
          </Card>
          </motion.div>
        </TabsContent>

        {/* Ultra-Rounded Preferences Tab */}
        <TabsContent value="preferences">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
            className="space-y-10"
          >
            {/* Ultra-Rounded Preferences */}
            <Card className="relative overflow-hidden bg-white/50 backdrop-blur-3xl border-white/60 shadow-2xl rounded-[4rem] p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-red-50/40 to-pink-50/60"></div>
              <div className="relative space-y-8">
                {/* Preferences Header */}
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-orange-500/30 mx-auto mb-6"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Palette className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-slate-900">Workspace Preferences</h3>
                  <p className="text-slate-600 font-medium mt-2">Customize your BillCraft experience to match your workflow</p>
                </div>

                {/* Enhanced Preferences Grid */}
                <div className="space-y-8">
                  {/* Localization Settings */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-black text-slate-800 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-orange-600" />
                      Regional Settings
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Label htmlFor="currency" className="text-base font-bold text-slate-700 mb-3 block">Currency</Label>
                    <select
                      id="currency"
                      value={settingsData.currency}
                      onChange={(e) => setSettingsData({ ...settingsData, currency: e.target.value })}
                          className="h-14 w-full px-4 py-3 bg-white/70 border border-white/50 rounded-[1.25rem] text-lg font-medium focus:bg-white/90 focus:border-orange-300 transition-all duration-300 shadow-lg focus:shadow-xl"
                        >
                          <option value="USD">💵 USD - US Dollar</option>
                          <option value="EUR">💶 EUR - Euro</option>
                          <option value="GBP">💷 GBP - British Pound</option>
                          <option value="CAD">🍁 CAD - Canadian Dollar</option>
                          <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
                          <option value="JPY">💴 JPY - Japanese Yen</option>
                          <option value="INR">🇮🇳 INR - Indian Rupee</option>
                    </select>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Label htmlFor="language" className="text-base font-bold text-slate-700 mb-3 block">Language</Label>
                    <select
                      id="language"
                      value={settingsData.language}
                      onChange={(e) => setSettingsData({ ...settingsData, language: e.target.value })}
                          className="h-14 w-full px-4 py-3 bg-white/70 border border-white/50 rounded-[1.25rem] text-lg font-medium focus:bg-white/90 focus:border-orange-300 transition-all duration-300 shadow-lg focus:shadow-xl"
                        >
                          <option value="en">🇺🇸 English</option>
                          <option value="es">🇪🇸 Spanish</option>
                          <option value="fr">🇫🇷 French</option>
                          <option value="de">🇩🇪 German</option>
                          <option value="it">🇮🇹 Italian</option>
                          <option value="pt">🇵🇹 Portuguese</option>
                          <option value="ja">🇯🇵 Japanese</option>
                    </select>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Label htmlFor="timezone" className="text-base font-bold text-slate-700 mb-3 block">Timezone</Label>
                    <select
                      id="timezone"
                      value={settingsData.timezone}
                      onChange={(e) => setSettingsData({ ...settingsData, timezone: e.target.value })}
                          className="h-14 w-full px-4 py-3 bg-white/70 border border-white/50 rounded-[1.25rem] text-lg font-medium focus:bg-white/90 focus:border-orange-300 transition-all duration-300 shadow-lg focus:shadow-xl"
                        >
                          <option value="UTC">🌍 UTC - Universal Time</option>
                          <option value="America/New_York">🗽 Eastern Time (ET)</option>
                          <option value="America/Chicago">🏙️ Central Time (CT)</option>
                          <option value="America/Denver">🏔️ Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">🌴 Pacific Time (PT)</option>
                          <option value="Europe/London">🇬🇧 London Time</option>
                          <option value="Europe/Berlin">🇩🇪 Central European Time</option>
                          <option value="Asia/Tokyo">🇯🇵 Japan Standard Time</option>
                          <option value="Asia/Mumbai">🇮🇳 India Standard Time</option>
                    </select>
                      </motion.div>
                  </div>
                </div>

            {/* Invoice Preferences */}
              <div className="space-y-6">
                    <h4 className="text-xl font-black text-slate-800 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-orange-600" />
                      Invoice Defaults
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Label htmlFor="invoicePrefix" className="text-base font-bold text-slate-700 mb-3 block">Invoice Prefix</Label>
                    <Input
                      id="invoicePrefix"
                      value={settingsData.invoicePrefix}
                      onChange={(e) => setSettingsData({ ...settingsData, invoicePrefix: e.target.value })}
                          className="h-14 bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-orange-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                      placeholder="INV"
                    />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Label htmlFor="defaultTax" className="text-base font-bold text-slate-700 mb-3 block">Default Tax Rate (%)</Label>
                    <Input
                      id="defaultTax"
                      type="number"
                      value={settingsData.defaultTax}
                      onChange={(e) => setSettingsData({ ...settingsData, defaultTax: e.target.value })}
                          className="h-14 bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-orange-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                      placeholder="0"
                    />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Label htmlFor="defaultPaymentTerms" className="text-base font-bold text-slate-700 mb-3 block">Payment Terms (days)</Label>
                    <Input
                      id="defaultPaymentTerms"
                      type="number"
                      value={settingsData.defaultPaymentTerms}
                      onChange={(e) => setSettingsData({ ...settingsData, defaultPaymentTerms: e.target.value })}
                          className="h-14 bg-white/70 border-white/50 rounded-[1.25rem] text-lg placeholder:text-slate-400 focus:bg-white/90 focus:border-orange-300 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
                      placeholder="30"
                    />
                      </motion.div>
                  </div>
                </div>

            {/* Notification Preferences */}
              <div className="space-y-6">
                    <h4 className="text-xl font-black text-slate-800 flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-orange-600" />
                      Notifications & Privacy
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div className="flex items-center justify-between p-6 bg-white/60 rounded-[1.5rem] border border-white/40 hover:bg-white/80 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[12px] flex items-center justify-center">
                              <Mail className="h-6 w-6 text-white" />
                            </div>
                <div>
                              <p className="font-bold text-slate-900">Email Notifications</p>
                              <p className="text-sm text-slate-600">Invoice updates and alerts</p>
                            </div>
                          </div>
                          <Switch
                            checked={settingsData.emailNotifications}
                            onCheckedChange={(checked: boolean) => setSettingsData({ ...settingsData, emailNotifications: checked })}
                          />
                </div>

                        <div className="flex items-center justify-between p-6 bg-white/60 rounded-[1.5rem] border border-white/40 hover:bg-white/80 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-[12px] flex items-center justify-center">
                              <Smartphone className="h-6 w-6 text-white" />
                            </div>
                    <div>
                              <p className="font-bold text-slate-900">SMS Notifications</p>
                              <p className="text-sm text-slate-600">Critical alerts via SMS</p>
                    </div>
                          </div>
                          <Switch
                            checked={settingsData.smsNotifications}
                            onCheckedChange={(checked: boolean) => setSettingsData({ ...settingsData, smsNotifications: checked })}
                          />
                  </div>

                        <div className="flex items-center justify-between p-6 bg-white/60 rounded-[1.5rem] border border-white/40 hover:bg-white/80 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-[12px] flex items-center justify-center">
                              <Sparkles className="h-6 w-6 text-white" />
                            </div>
                    <div>
                              <p className="font-bold text-slate-900">Marketing Emails</p>
                              <p className="text-sm text-slate-600">Tips, updates, and news</p>
                    </div>
                          </div>
                          <Switch
                        checked={settingsData.marketingEmails}
                            onCheckedChange={(checked: boolean) => setSettingsData({ ...settingsData, marketingEmails: checked })}
                      />
                  </div>
                      </motion.div>

                      <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex items-center justify-between p-6 bg-white/60 rounded-[1.5rem] border border-white/40 hover:bg-white/80 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-[12px] flex items-center justify-center">
                              <Zap className="h-6 w-6 text-white" />
                </div>
                            <div>
                              <p className="font-bold text-slate-900">Auto-Save</p>
                              <p className="text-sm text-slate-600">Automatically save changes</p>
              </div>
                          </div>
                          <Switch
                            checked={settingsData.autoSave}
                            onCheckedChange={(checked: boolean) => setSettingsData({ ...settingsData, autoSave: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between p-6 bg-white/60 rounded-[1.5rem] border border-white/40 hover:bg-white/80 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-[12px] flex items-center justify-center">
                              <Monitor className="h-6 w-6 text-white" />
            </div>
                            <div>
                              <p className="font-bold text-slate-900">Dark Mode</p>
                              <p className="text-sm text-slate-600">Use dark theme interface</p>
          </div>
                          </div>
                          <Switch
                            checked={settingsData.darkMode}
                            onCheckedChange={(checked: boolean) => setSettingsData({ ...settingsData, darkMode: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between p-6 bg-white/60 rounded-[1.5rem] border border-white/40 hover:bg-white/80 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[12px] flex items-center justify-center">
                              <Eye className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">Analytics</p>
                              <p className="text-sm text-slate-600">Help improve our service</p>
                            </div>
                          </div>
                          <Switch
                            checked={settingsData.allowAnalytics}
                            onCheckedChange={(checked: boolean) => setSettingsData({ ...settingsData, allowAnalytics: checked })}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Save Button at Bottom */}
                <motion.div 
                  className="flex justify-center pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
              <Button 
                    onClick={() => handleTabSave(settingsData, 'preferences')}
                disabled={isLoading}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-[2rem] px-12 py-4 text-xl font-black shadow-2xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 disabled:opacity-50 hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                        Saving Preferences...
                      </>
                    ) : (
                      <>
                        <Save className="h-6 w-6 mr-3" />
                        Save Preferences
                      </>
                    )}
              </Button>
                </motion.div>
            </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Ultra-Rounded Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
            className="space-y-10"
          >
            <Card className="relative overflow-hidden bg-white/50 backdrop-blur-3xl border-white/60 shadow-2xl rounded-[4rem] p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-emerald-50/40 to-teal-50/60"></div>
              <div className="relative space-y-8">
                {/* Security Header */}
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-green-500/30 mx-auto mb-6"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Shield className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-slate-900">Security & Privacy</h3>
                  <p className="text-slate-600 font-medium mt-2">Protect your account with advanced security features</p>
              </div>

                {/* Enhanced Security Settings */}
                <div className="space-y-8">
                  {/* Authentication Section */}
              <div className="space-y-6">
                    <h4 className="text-xl font-black text-slate-800 flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-green-600" />
                      Authentication
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div 
                        className="p-6 bg-white/60 rounded-[2rem] border border-white/40 hover:bg-white/80 transition-all duration-300 space-y-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[1rem] flex items-center justify-center">
                            <Lock className="h-7 w-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-black text-lg text-slate-900">Password</h5>
                      <p className="text-sm text-slate-600">Last changed 3 months ago</p>
                    </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full rounded-[1rem] border-green-200 hover:bg-green-50 hover:border-green-300 text-green-700 hover:text-green-800 font-semibold"
                        >
                      Change Password
                    </Button>
                      </motion.div>

                      <motion.div 
                        className="p-6 bg-white/60 rounded-[2rem] border border-white/40 hover:bg-white/80 transition-all duration-300 space-y-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-[1rem] flex items-center justify-center">
                            <Smartphone className="h-7 w-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-black text-lg text-slate-900">Two-Factor Auth</h5>
                            <p className="text-sm text-slate-600">
                              {securityData.twoFactorEnabled ? (
                                <span className="text-green-600 font-semibold">✅ Enabled</span>
                              ) : (
                                <span className="text-amber-600 font-semibold">⚠️ Not enabled</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant={securityData.twoFactorEnabled ? "outline" : "default"}
                          className={`w-full rounded-[1rem] font-semibold ${
                            securityData.twoFactorEnabled 
                              ? "border-red-200 hover:bg-red-50 hover:border-red-300 text-red-700 hover:text-red-800"
                              : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          }`}
                          onClick={() => setSecurityData({ ...securityData, twoFactorEnabled: !securityData.twoFactorEnabled })}
                        >
                          {securityData.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                        </Button>
                      </motion.div>
                  </div>
                </div>

                  {/* Session Management */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-black text-slate-800 flex items-center">
                      <Monitor className="h-5 w-5 mr-2 text-green-600" />
                      Session Management
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div 
                        className="p-6 bg-white/60 rounded-[2rem] border border-white/40 hover:bg-white/80 transition-all duration-300 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-[1rem] flex items-center justify-center">
                            <Monitor className="h-7 w-7 text-white" />
                    </div>
                          <div className="flex-1">
                            <h5 className="font-black text-lg text-slate-900">Active Sessions</h5>
                            <p className="text-sm text-slate-600">3 active devices</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full rounded-[1rem] border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 hover:text-blue-800 font-semibold"
                        >
                          View All Sessions
                    </Button>
                      </motion.div>

                      <motion.div 
                        className="p-6 bg-white/60 rounded-[2rem] border border-white/40 hover:bg-white/80 transition-all duration-300 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-[1rem] flex items-center justify-center">
                            <Bell className="h-7 w-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-black text-lg text-slate-900">Login Alerts</h5>
                            <p className="text-sm text-slate-600">Get notified of new logins</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">Enable Alerts</span>
                          <Switch
                            checked={securityData.loginAlerts}
                            onCheckedChange={(checked: boolean) => setSecurityData({ ...securityData, loginAlerts: checked })}
                          />
                        </div>
                      </motion.div>
                  </div>
                </div>

                  {/* Advanced Security */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-black text-slate-800 flex items-center">
                      <Crown className="h-5 w-5 mr-2 text-green-600" />
                      Advanced Security
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Label htmlFor="sessionTimeout" className="text-base font-bold text-slate-700 mb-3 block">Session Timeout (minutes)</Label>
                        <select
                          id="sessionTimeout"
                          value={securityData.sessionTimeout}
                          onChange={(e) => setSecurityData({ ...securityData, sessionTimeout: e.target.value })}
                          className="h-14 w-full px-4 py-3 bg-white/70 border border-white/50 rounded-[1.25rem] text-lg font-medium focus:bg-white/90 focus:border-green-300 transition-all duration-300 shadow-lg focus:shadow-xl"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="480">8 hours</option>
                          <option value="0">Never</option>
                        </select>
                      </motion.div>

                      <motion.div 
                        className="p-6 bg-white/60 rounded-[2rem] border border-white/40 hover:bg-white/80 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                      >
                  <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-[8px] flex items-center justify-center">
                              <Zap className="h-5 w-5 text-white" />
                            </div>
                    <div>
                              <p className="font-bold text-slate-900 text-sm">API Access</p>
                              <p className="text-xs text-slate-600">Enable API usage</p>
                    </div>
                          </div>
                          <Switch
                            checked={securityData.apiAccess}
                            onCheckedChange={(checked: boolean) => setSecurityData({ ...securityData, apiAccess: checked })}
                          />
                        </div>
                      </motion.div>

                      <motion.div 
                        className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-[2rem] border border-red-200 space-y-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-[8px] flex items-center justify-center">
                            <X className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-red-900 text-sm">Danger Zone</p>
                            <p className="text-xs text-red-700">Irreversible actions</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 rounded-[1rem] font-semibold"
                        >
                          Delete Account
                    </Button>
                      </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
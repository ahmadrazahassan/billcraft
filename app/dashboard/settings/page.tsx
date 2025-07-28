'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'

export default function SettingsPage() {
  const { user, updateUserProfile } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Profile form state
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    avatar: ''
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
    logo: ''
  })

  // Settings state
  const [settingsData, setSettingsData] = useState({
    currency: 'USD',
    language: 'en',
    timezone: 'UTC',
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    invoicePrefix: 'INV',
    defaultTax: '0',
    defaultPaymentTerms: '30'
  })

  const handleProfileSave = async () => {
    setIsLoading(true)
    try {
      if (profileData.displayName !== user?.displayName) {
        await updateUserProfile(profileData.displayName)
      }
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBusinessSave = async () => {
    setIsLoading(true)
    try {
      // Here you would save business data to your database
      toast({
        title: "Business settings updated",
        description: "Your business information has been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update business settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreferencesSave = async () => {
    setIsLoading(true)
    try {
      // Here you would save preferences to your database
      toast({
        title: "Preferences updated",
        description: "Your preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="p-6 bg-white border-slate-200">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-semibold text-blue-700">
                      {profileData.displayName?.charAt(0) || profileData.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Upload className="h-3 w-3" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Profile Picture</h3>
                  <p className="text-sm text-slate-600">Upload a professional photo</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="displayName">Full Name</Label>
                  <Input
                    id="displayName"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="mt-1 bg-slate-50"
                  />
                  <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleProfileSave}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card className="p-6 bg-white border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Business Information</h3>
                <p className="text-sm text-slate-600">This information will appear on your invoices</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={businessData.companyName}
                    onChange={(e) => setBusinessData({ ...businessData, companyName: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    value={businessData.address}
                    onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={businessData.city}
                    onChange={(e) => setBusinessData({ ...businessData, city: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={businessData.state}
                    onChange={(e) => setBusinessData({ ...businessData, state: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    value={businessData.zipCode}
                    onChange={(e) => setBusinessData({ ...businessData, zipCode: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    value={businessData.country}
                    onChange={(e) => setBusinessData({ ...businessData, country: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={businessData.website}
                    onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
                    className="mt-1"
                    placeholder="https://your-website.com"
                  />
                </div>

                <div>
                  <Label htmlFor="taxId">Tax ID/VAT Number</Label>
                  <Input
                    id="taxId"
                    value={businessData.taxId}
                    onChange={(e) => setBusinessData({ ...businessData, taxId: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleBusinessSave}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            {/* General Preferences */}
            <Card className="p-6 bg-white border-slate-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">General Preferences</h3>
                  <p className="text-sm text-slate-600">Customize your BillCraft experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <select
                      id="currency"
                      value={settingsData.currency}
                      onChange={(e) => setSettingsData({ ...settingsData, currency: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={settingsData.language}
                      onChange={(e) => setSettingsData({ ...settingsData, language: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={settingsData.timezone}
                      onChange={(e) => setSettingsData({ ...settingsData, timezone: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Invoice Preferences */}
            <Card className="p-6 bg-white border-slate-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Invoice Preferences</h3>
                  <p className="text-sm text-slate-600">Set default values for new invoices</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                    <Input
                      id="invoicePrefix"
                      value={settingsData.invoicePrefix}
                      onChange={(e) => setSettingsData({ ...settingsData, invoicePrefix: e.target.value })}
                      className="mt-1"
                      placeholder="INV"
                    />
                  </div>

                  <div>
                    <Label htmlFor="defaultTax">Default Tax Rate (%)</Label>
                    <Input
                      id="defaultTax"
                      type="number"
                      value={settingsData.defaultTax}
                      onChange={(e) => setSettingsData({ ...settingsData, defaultTax: e.target.value })}
                      className="mt-1"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="defaultPaymentTerms">Default Payment Terms (days)</Label>
                    <Input
                      id="defaultPaymentTerms"
                      type="number"
                      value={settingsData.defaultPaymentTerms}
                      onChange={(e) => setSettingsData({ ...settingsData, defaultPaymentTerms: e.target.value })}
                      className="mt-1"
                      placeholder="30"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Notification Preferences */}
            <Card className="p-6 bg-white border-slate-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Notifications</h3>
                  <p className="text-sm text-slate-600">Choose how you want to be notified</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">Email Notifications</p>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsData.emailNotifications}
                        onChange={(e) => setSettingsData({ ...settingsData, emailNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">Marketing Emails</p>
                      <p className="text-sm text-slate-600">Receive updates and tips</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsData.marketingEmails}
                        onChange={(e) => setSettingsData({ ...settingsData, marketingEmails: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button 
                onClick={handlePreferencesSave}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="p-6 bg-white border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Security Settings</h3>
                <p className="text-sm text-slate-600">Manage your account security</p>
              </div>

              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">Password</p>
                      <p className="text-sm text-slate-600">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600">Not enabled</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">Active Sessions</p>
                      <p className="text-sm text-slate-600">Manage your active sessions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Sessions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
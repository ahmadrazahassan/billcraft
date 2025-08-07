'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Save, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  FileText, 
  Loader2,
  Bot,
  Zap,
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCw,
  Plus,
  X,
  Info,
  AlertCircle,
  CheckCircle2,
  Crown,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { BillCraftChatAI } from '@/components/chat/billcraft-chat-ai'
import { userService, clientService } from '@/lib/database'

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  company: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  notes: z.string().optional()
})

type ClientForm = z.infer<typeof clientSchema>

const GlassInput = ({ 
  id, 
  type = 'text', 
  label, 
  icon: Icon, 
  register, 
  error, 
  value,
  placeholder,
  isOptional = false,
  rows
}: any) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value && value.length > 0

  return (
    <div className="relative group">
      <div 
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
          error 
            ? 'ring-2 ring-red-400/60 shadow-lg shadow-red-200/60' 
            : isFocused 
              ? 'ring-2 ring-blue-500/70 shadow-xl shadow-blue-200/70 scale-[1.02]' 
              : 'ring-2 ring-blue-400/60 shadow-lg shadow-blue-200/60 hover:ring-blue-500/70 hover:shadow-xl hover:shadow-blue-300/70 hover:scale-[1.01]'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid rgba(59, 130, 246, 0.5)'
        }}
      >
        <div className="flex items-start p-4">
          <div className={`mr-4 p-2 rounded-xl transition-all duration-300 ${
            error 
              ? 'bg-red-100/80 text-red-500' 
              : isFocused 
                ? 'bg-blue-100/80 text-blue-600 scale-110' 
                : 'bg-white/60 text-gray-500'
          }`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 relative">
            {type === 'textarea' ? (
              <textarea
                id={id}
                rows={rows || 3}
                className="w-full bg-transparent border-0 outline-none text-gray-800 text-lg placeholder-transparent peer font-medium resize-none"
                placeholder={placeholder || label}
                {...register}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            ) : (
              <input
                id={id}
                type={type}
                className="w-full bg-transparent border-0 outline-none text-gray-800 text-lg placeholder-transparent peer font-medium"
                placeholder={placeholder || label}
                {...register}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            )}
            <label
              htmlFor={id}
              className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium flex items-center ${
                isFocused || hasValue 
                  ? '-top-6 text-sm text-blue-600 font-semibold' 
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
              }`}
            >
              {label}
              {isOptional && (
                <Badge variant="secondary" className="ml-2 text-xs rounded-full">
                  Optional
                </Badge>
              )}
            </label>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="text-sm text-red-600 mt-2 ml-1 flex items-center font-medium"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CreateClientPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isChatAIOpen, setIsChatAIOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<ClientForm>({
    resolver: zodResolver(clientSchema)
  })

  const watchedName = watch('name', '')
  const watchedEmail = watch('email', '')
  const watchedCompany = watch('company', '')
  const watchedPhone = watch('phone', '')
  const watchedAddress = watch('address', '')
  const watchedCity = watch('city', '')
  const watchedWebsite = watch('website', '')
  const watchedNotes = watch('notes', '')

  const onSubmit = async (data: ClientForm) => {
    setIsLoading(true)
    try {
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Get current user from database
      const currentUser = await userService.getCurrentUser(user.uid)
      if (!currentUser) {
        throw new Error('User not found in database')
      }

      // Create client data
      const clientData = {
        user_id: currentUser.id,
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        notes: data.notes || null
      }

      // Create the client
      const newClient = await clientService.createClient(clientData)
      
      setShowSuccess(true)
      toast({
        title: "🎉 Client Created!",
        description: `${data.name} has been added to your client database.`,
      })
      
      // Wait a bit to show success animation, then redirect
      setTimeout(() => {
        router.push('/dashboard/clients')
      }, 2000)
      
    } catch (error: any) {
      console.error('Error creating client:', error)
      toast({
        title: "Failed to create client",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }



  const clearForm = () => {
    reset()
    toast({
      title: "Form Cleared",
      description: "All fields have been reset.",
    })
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <CheckCircle2 className="h-12 w-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Client Created Successfully!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-lg mb-8"
          >
            Redirecting you to your clients dashboard...
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center space-x-2"
          >
            <motion.div 
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div 
              className="w-2 h-2 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-emerald-400/15 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              asChild
              className="rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/70 border-white/20"
            >
              <Link href="/dashboard/clients">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Clients
              </Link>
            </Button>
            
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsChatAIOpen(true)}
                  className="rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm hover:from-purple-500/20 hover:to-blue-500/20 border-purple-300/30"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  AI Assistant
                </Button>
              </motion.div>

            </div>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-3 mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <User className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add New Client
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Create a new client profile to streamline your invoicing process. Use AI assistance for quick setup.
            </motion.p>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card 
            className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassInput
                      id="name"
                      label="Full Name"
                      icon={User}
                      register={register('name')}
                      error={errors.name}
                      value={watchedName}
                      placeholder="Enter client's full name"
                    />

                    <GlassInput
                      id="email"
                      type="email"
                      label="Email Address"
                      icon={Mail}
                      register={register('email')}
                      error={errors.email}
                      value={watchedEmail}
                      placeholder="client@example.com"
                      isOptional={true}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassInput
                      id="company"
                      label="Company Name"
                      icon={Building2}
                      register={register('company')}
                      error={errors.company}
                      value={watchedCompany}
                      placeholder="Enter company name"
                      isOptional={true}
                    />

                    <GlassInput
                      id="phone"
                      type="tel"
                      label="Phone Number"
                      icon={Phone}
                      register={register('phone')}
                      error={errors.phone}
                      value={watchedPhone}
                      placeholder="+1 (555) 123-4567"
                      isOptional={true}
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Location & Contact</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <GlassInput
                      id="address"
                      label="Address"
                      icon={MapPin}
                      register={register('address')}
                      error={errors.address}
                      value={watchedAddress}
                      placeholder="Street address"
                      isOptional={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <GlassInput
                        id="city"
                        label="City & State"
                        icon={Building2}
                        register={register('city')}
                        error={errors.city}
                        value={watchedCity}
                        placeholder="City, State ZIP"
                        isOptional={true}
                      />

                      <GlassInput
                        id="website"
                        type="url"
                        label="Website"
                        icon={Globe}
                        register={register('website')}
                        error={errors.website}
                        value={watchedWebsite}
                        placeholder="https://example.com"
                        isOptional={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
                  </div>

                  <GlassInput
                    id="notes"
                    type="textarea"
                    label="Notes"
                    icon={FileText}
                    register={register('notes')}
                    error={errors.notes}
                    value={watchedNotes}
                    placeholder="Add any additional notes about this client..."
                    isOptional={true}
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearForm}
                    className="flex-1 h-14 text-lg font-semibold rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/70 border-white/20"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Clear Form
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Creating Client...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Create Client
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Chat Assistant */}
      <BillCraftChatAI
        isOpen={isChatAIOpen}
        onClose={() => setIsChatAIOpen(false)}
        position="right"
      />
    </div>
  )
} 
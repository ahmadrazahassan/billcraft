'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  FileText, 
  Loader2, 
  Eye, 
  EyeOff, 
  X,
  Shield,
  Zap,
  Users,
  Sparkles,
  Lock,
  Mail,
  User,
  Star,
  Crown
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupForm = z.infer<typeof signupSchema>

const GlassInput = ({ 
  id, 
  type = 'text', 
  label, 
  icon: Icon, 
  register, 
  error, 
  value,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword 
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
        <div className="flex items-center p-4">
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
            <input
              id={id}
              type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
              className="w-full bg-transparent border-0 outline-none text-gray-800 text-lg placeholder-transparent peer font-medium"
              placeholder={label}
              {...register}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <label
              htmlFor={id}
              className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${
                isFocused || hasValue 
                  ? '-top-6 text-sm text-blue-600 font-semibold' 
                  : 'top-1/2 -translate-y-1/2 text-gray-500'
              }`}
            >
              {label}
            </label>
          </div>
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="ml-3 p-2 rounded-xl bg-white/60 text-gray-500 hover:bg-white/80 hover:text-gray-700 transition-all duration-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
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
            <X className="h-4 w-4 mr-1" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}



export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { user, loading, signup, signInWithGoogle } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema)
  })

  const watchedPassword = watch('password', '')
  const watchedName = watch('name', '')
  const watchedEmail = watch('email', '')
  const watchedConfirmPassword = watch('confirmPassword', '')

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  // Enhanced loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <motion.div 
              className="w-4 h-4 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-4 h-4 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div 
              className="w-4 h-4 bg-orange-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
        </div>
          <p className="text-gray-700 font-semibold text-lg">Initializing BillCraft...</p>
        </motion.div>
      </div>
    )
  }

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true)
    try {
      await signup(data.email, data.password, data.name)
      toast({
        title: "🎉 Welcome to BillCraft!",
        description: "Your account has been created successfully. Let's get started!",
      })
      router.replace('/dashboard')
    } catch (error: any) {
      toast({
        title: "Account creation failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      await signInWithGoogle()
      toast({
        title: "🎉 Welcome to BillCraft!",
        description: "Your account has been created successfully with Google.",
      })
      router.replace('/dashboard')
    } catch (error: any) {
      toast({
        title: "Google sign-in failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-orange-400/15 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative flex flex-col lg:flex-row min-h-screen">
      {/* Left side - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm"
        >
          {/* Header */}
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center space-x-3 group mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FileText className="h-7 w-7 text-white" />
              </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BillCraft
              </span>
            </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <h1 className="text-4xl font-bold text-gray-900">Join BillCraft</h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Create professional invoices in minutes with our powerful platform
                </p>
              </motion.div>

              {/* 3-Month Trial Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <div 
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-white font-semibold text-sm shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(234, 88, 12, 0.9) 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Free 3 months trial</span>
                </div>
              </motion.div>
          </div>

          {/* Google Sign Up Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
                className="w-full h-14 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#374151'
                }}
              >
            {isGoogleLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin mr-3" />
            ) : (
                  <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
                <span>{isGoogleLoading ? 'Creating account...' : 'Continue with Google'}</span>
              </Button>
            </motion.div>

          {/* Divider */}
            <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-gray-500 font-medium">
                  Or continue with email
                </span>
            </div>
            </div>

          {/* Signup Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <GlassInput
                  id="name"
                label="Full Name"
                icon={User}
                register={register('name')}
                error={errors.name}
                value={watchedName}
              />

              <GlassInput
                  id="email"
                  type="email"
                label="Email Address"
                icon={Mail}
                register={register('email')}
                error={errors.email}
                value={watchedEmail}
              />

              <GlassInput
                  id="password"
                  label="Password"
                  icon={Lock}
                  register={register('password')}
                  error={errors.password}
                  value={watchedPassword}
                  showPasswordToggle={true}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

              <GlassInput
                  id="confirmPassword"
                label="Confirm Password"
                icon={Shield}
                register={register('confirmPassword')}
                error={errors.confirmPassword}
                value={watchedConfirmPassword}
                showPasswordToggle={true}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <Button
              type="submit"
              disabled={isLoading || isGoogleLoading}
                className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin mr-3" />
                ) : (
                  <ArrowRight className="h-6 w-6 mr-3" />
                )}
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </motion.form>

          {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-8"
            >
              <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                  Sign in
              </Link>
            </p>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </p>
            </motion.div>
        </motion.div>
      </div>

        {/* Right side - Hero Section */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative">
          <div
            className="absolute inset-4 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
          
        <motion.div
            initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-lg text-center space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Start Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Success Story
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join thousands of businesses creating professional invoices with our award-winning platform
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20"
              >
                <Star className="h-8 w-8 text-yellow-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20"
              >
                <Users className="h-8 w-8 text-blue-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">50k+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20"
              >
                <Zap className="h-8 w-8 text-green-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20"
              >
                <Crown className="h-8 w-8 text-purple-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">3M</div>
                <div className="text-sm text-gray-600">Free Trial</div>
              </motion.div>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-500 text-sm">
                ✨ Start your 3-month free trial • No credit card required
              </p>
          </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
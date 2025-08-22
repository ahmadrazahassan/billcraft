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
  Lock,
  Mail,
  Layers,
  Users,
  Zap,
  Shield,
  Crown,
  Palette,
  Rocket
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

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
        className={`relative overflow-hidden rounded-[1.5rem] transition-all duration-700 border-2 ${
          error 
            ? 'border-red-400/60 shadow-2xl shadow-red-200/30 bg-red-50/30' 
            : isFocused 
              ? 'border-indigo-500/70 shadow-2xl shadow-indigo-300/30 scale-[1.02] bg-indigo-50/40' 
              : 'border-white/40 shadow-xl shadow-gray-300/20 hover:border-indigo-400/60 hover:shadow-2xl hover:shadow-indigo-200/30 hover:scale-[1.01] bg-white/40'
        }`}
        style={{
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
        }}
      >
        <div className="flex items-center p-5">
          <div className={`mr-4 p-3 rounded-[1rem] transition-all duration-500 ${
            error 
              ? 'bg-red-100/80 text-red-600 shadow-lg' 
              : isFocused 
                ? 'bg-indigo-100/90 text-indigo-700 scale-110 shadow-lg' 
                : 'bg-white/70 text-slate-600 group-hover:bg-indigo-50/70 group-hover:text-indigo-600'
          }`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 relative">
            <input
              id={id}
              type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
              className="w-full bg-transparent border-0 outline-none text-slate-800 text-lg placeholder-transparent peer font-semibold"
              placeholder={label}
              {...register}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <label
              htmlFor={id}
              className={`absolute left-0 transition-all duration-500 pointer-events-none font-bold ${
                isFocused || hasValue 
                  ? '-top-7 text-sm text-indigo-700 scale-95' 
                  : 'top-1/2 -translate-y-1/2 text-slate-600 text-lg'
              }`}
            >
              {label}
            </label>
          </div>
          {showPasswordToggle && (
            <motion.button
              type="button"
              onClick={onTogglePassword}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 p-3 rounded-[1rem] bg-white/80 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </motion.button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="mt-3 ml-2 flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-sm text-red-600 font-semibold">
            {error.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { user, loading, login, signInWithGoogle } = useAuth()
  const { success, error } = useToast()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const watchedEmail = watch('email', '')
  const watchedPassword = watch('password', '')

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
          <p className="text-gray-700 font-semibold text-lg">Connecting to BillCraft...</p>
        </motion.div>
      </div>
    )
  }

  // Don't render form if user is already logged in
  if (user) {
    return null
  }

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      success({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      })
      router.replace('/dashboard')
    } catch (error: any) {
      error({
        title: "Error signing in",
        description: error.message || "Invalid email or password.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      await signInWithGoogle()
      success({
        title: "Welcome back!",
        description: "You have been signed in with Google successfully.",
      })
      router.replace('/dashboard')
    } catch (error: any) {
      error({
        title: "Error signing in with Google",
        description: error.message || "Failed to sign in with Google.",
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Ultra-Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-300/25 to-violet-300/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative flex flex-col lg:flex-row min-h-screen">
      {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg"
        >
          {/* Ultra-Modern Header */}
            <div className="text-center mb-10">
              <Link href="/" className="inline-flex items-center space-x-4 group mb-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-[1.5rem] shadow-2xl shadow-indigo-500/25"
                >
                  <FileText className="h-8 w-8 text-white" />
                </motion.div>
                <span className="text-4xl font-black bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-700 bg-clip-text text-transparent">
                BillCraft
              </span>
            </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-800 to-purple-900 leading-tight">
                  Welcome Back
                </h1>
                <p className="text-slate-600 text-xl leading-relaxed font-medium max-w-md mx-auto">
                  Sign in to continue creating stunning professional invoices with our modern platform
                </p>
              </motion.div>
          </div>

          {/* Ultra-Modern Google Sign In Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 text-lg font-bold rounded-[1.5rem] transition-all duration-500 bg-white/70 backdrop-blur-2xl border-2 border-white/40 text-slate-800 shadow-2xl hover:shadow-3xl hover:bg-white/80 hover:border-white/60"
              >
                <div className="flex items-center justify-center space-x-4">
            {isGoogleLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
                    <svg className="h-7 w-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
                  <span className="text-xl font-bold">
                    {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
                  </span>
                </div>
              </motion.button>
            </motion.div>

          {/* Ultra-Modern Divider */}
            <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-indigo-200/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white/90 backdrop-blur-2xl border border-white/40 px-6 py-3 rounded-[1.5rem] text-slate-600 font-bold text-lg shadow-xl">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Ultra-Modern Login Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
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

              <div className="flex items-center justify-between pt-2">
              <Link
                href="/auth/forgot-password"
                  className="text-indigo-600 hover:text-indigo-700 font-bold text-lg transition-all duration-300 hover:underline decoration-2 underline-offset-4"
              >
                  Forgot password?
              </Link>
            </div>

              <motion.button
              type="submit"
              disabled={isLoading || isGoogleLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-16 text-xl font-black rounded-[1.5rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
                <div className="flex items-center justify-center space-x-4">
              {isLoading ? (
                    <Loader2 className="h-7 w-7 animate-spin" />
              ) : (
                    <ArrowRight className="h-7 w-7" />
              )}
                  <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                </div>
              </motion.button>
            </motion.form>

          {/* Ultra-Modern Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-10"
            >
              <p className="text-slate-600 text-lg">
              Don't have an account?{' '}
              <Link
                href="/auth/signup"
                  className="font-black text-indigo-600 hover:text-indigo-700 transition-all duration-300 hover:underline decoration-2 underline-offset-4"
              >
                Sign up for free
              </Link>
            </p>
              
              {/* Ultra-Modern Trial Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6"
              >
                <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-[1.5rem] bg-gradient-to-r from-emerald-500/90 via-teal-500/90 to-cyan-500/90 backdrop-blur-2xl text-white font-black text-lg shadow-2xl shadow-emerald-500/25 border border-white/20">
                  <Rocket className="h-5 w-5" />
                  <span>New users get 3 months free</span>
          </div>
              </motion.div>
            </motion.div>
        </motion.div>
      </div>

      {/* Ultra-Modern Right Side - Hero Section */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative">
          <div
            className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-indigo-100/40 via-purple-100/40 to-violet-100/40 backdrop-blur-3xl border border-white/30 shadow-2xl"
          />
          
        <motion.div
            initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-lg text-center space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-800 to-purple-900 leading-tight">
                Continue Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-700">
                  Journey
                </span>
          </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Welcome back to BillCraft. Your professional invoicing platform awaits with powerful features.
          </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.08, y: -5 }}
                className="p-6 rounded-[1.5rem] bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                <Shield className="h-10 w-10 text-emerald-600 mb-4 mx-auto" />
                <div className="text-3xl font-black text-slate-900 mb-2">Secure</div>
                <div className="text-slate-600 font-semibold">Bank-level encryption</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.08, y: -5 }}
                className="p-6 rounded-[1.5rem] bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                <Zap className="h-10 w-10 text-blue-600 mb-4 mx-auto" />
                <div className="text-3xl font-black text-slate-900 mb-2">Fast</div>
                <div className="text-slate-600 font-semibold">Lightning quick</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.08, y: -5 }}
                className="p-6 rounded-[1.5rem] bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                <Layers className="h-10 w-10 text-purple-600 mb-4 mx-auto" />
                <div className="text-3xl font-black text-slate-900 mb-2">Rated</div>
                <div className="text-slate-600 font-semibold">4.9/5 stars</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.08, y: -5 }}
                className="p-6 rounded-[1.5rem] bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                <Users className="h-10 w-10 text-indigo-600 mb-4 mx-auto" />
                <div className="text-3xl font-black text-slate-900 mb-2">50k+</div>
                <div className="text-slate-600 font-semibold">Happy users</div>
              </motion.div>
            </div>

            <div className="text-center pt-6">
              <p className="text-slate-500 text-lg font-bold">
                🚀 Access your dashboard instantly • Secure & reliable
              </p>
            </div>
          </motion.div>
          </div>
      </div>
    </div>
  )
} 
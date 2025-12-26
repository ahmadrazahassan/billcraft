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
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { buildSignupURL, parseURLParams } from '@/lib/url-builder'

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
        className={`relative overflow-hidden rounded-full transition-all duration-300 border-2 ${
          error 
            ? 'border-red-400 bg-red-50/50' 
            : isFocused 
              ? 'border-primary bg-primary/5' 
              : 'border-border bg-white/60 dark:bg-gray-900/60 hover:border-primary/50'
        }`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="flex items-center px-4 h-11">
          <div className={`mr-3 transition-all duration-300 ${
            error 
              ? 'text-red-600' 
              : isFocused 
                ? 'text-primary' 
                : 'text-muted-foreground'
          }`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 relative">
            <input
              id={id}
              type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
              className="w-full bg-transparent border-0 outline-none text-foreground text-sm placeholder-transparent peer"
              placeholder={label}
              {...register}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <label
              htmlFor={id}
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                isFocused || hasValue 
                  ? '-top-6 text-xs text-primary font-medium' 
                  : 'top-1/2 -translate-y-1/2 text-muted-foreground text-sm'
              }`}
            >
              {label}
            </label>
          </div>
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="ml-3 text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-2 ml-4 flex items-center space-x-1.5"
          >
            <div className="w-1 h-1 bg-red-500 rounded-full" />
            <p className="text-xs text-red-600 font-medium">
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[32rem] h-[32rem] bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <Header />

      <div className="relative flex min-h-screen pt-16">
      {/* Login Form - Centered */}
        <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
        >
          {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground text-sm">
                  Sign in to your account to continue
                </p>
              </motion.div>
          </div>

          {/* Google Sign In Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full h-12 text-sm font-semibold rounded-full transition-all duration-300 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/20 text-foreground shadow-lg hover:shadow-xl"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="flex items-center justify-center space-x-3">
            {isGoogleLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
                  <span className="text-sm font-semibold">
                    {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
                  </span>
                </div>
              </motion.button>
            </motion.div>

          {/* Divider */}
            <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 py-1 text-muted-foreground text-xs font-medium">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
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

              <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                  className="text-primary hover:text-primary/80 font-medium text-sm transition-all duration-300"
              >
                  Forgot password?
              </Link>
            </div>

              <Button
              type="submit"
              disabled={isLoading || isGoogleLoading}
                className="w-full h-11 text-sm font-semibold rounded-full btn-primary shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
                  {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </motion.form>

          {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6"
            >
              <p className="text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link
                href={buildSignupURL({ source: 'login_page', ref: 'login_to_signup_link' })}
                  className="font-semibold text-primary hover:text-primary/80 transition-all duration-300"
              >
                Sign up for free
              </Link>
            </p>
              
              {/* Trial Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
                  <Rocket className="h-3.5 w-3.5" />
                  <span>New users get 3 months free</span>
          </div>
              </motion.div>
            </motion.div>
        </motion.div>
      </div>

      </div>

      <Footer />
    </div>
  )
} 
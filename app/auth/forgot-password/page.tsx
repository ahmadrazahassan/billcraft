'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/auth-context'
import { FileText, Mail, ArrowLeft, CheckCircle } from 'lucide-react'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { resetPassword } = useAuth()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true)
    try {
      await resetPassword(data.email)
      setEmailSent(true)
      toast({
        title: "Reset email sent!",
        description: "Check your email for password reset instructions.",
      })
    } catch (error: any) {
      toast({
        title: "Error sending reset email",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    const email = getValues('email')
    if (!email) return
    
    setIsLoading(true)
    try {
      await resetPassword(email)
      toast({
        title: "Email resent!",
        description: "Check your email for password reset instructions.",
      })
    } catch (error: any) {
      toast({
        title: "Error resending email",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative">
        {/* Back to login */}
        <Link 
          href="/auth/login"
          className="absolute -top-16 left-0 flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to login</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8"
        >
          {!emailSent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary rounded-xl">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Forgot password?
                </h1>
                <p className="text-gray-600">
                  No worries! Enter your email and we&apos;ll send you reset instructions.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 glass-card border-white/20"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send reset instructions'}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-secondary rounded-xl">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Check your email
                </h1>
                <p className="text-gray-600 mb-6">
                  We&apos;ve sent password reset instructions to your email address.
                </p>
                
                <div className="space-y-4">
                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Resending...' : 'Resend email'}
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
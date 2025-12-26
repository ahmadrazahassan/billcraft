"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"

const getToastIcon = (variant?: string) => {
  switch (variant) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-emerald-600" />
    case "destructive":
      return <XCircle className="h-5 w-5 text-red-600" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-600" />
    case "info":
      return <Info className="h-5 w-5 text-blue-600" />
    default:
      return null
  }
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const icon = getToastIcon(variant as string)
        
        return (
          <Toast key={id} variant={variant as any} {...props}>
            <div className="flex items-start gap-3 w-full">
              {icon && (
                <div className="flex-shrink-0 mt-0.5">
                  {icon}
                </div>
              )}
              <div className="flex-1 grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

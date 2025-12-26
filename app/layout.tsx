import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { FloatingAIAssistant } from '@/components/chat/floating-ai-assistant'

// Clean, professional font configuration
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://billcraft.com'),
  title: 'BillCraft - Professional Invoice Generator',
  description: 'Create professional invoices instantly with our modern, easy-to-use invoice generator',
  keywords: ['invoice', 'billing', 'generator', 'business', 'professional', 'automation'],
  authors: [{ name: 'BillCraft Team' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'BillCraft - Professional Invoice Generator',
    description: 'Create professional invoices instantly with our modern, easy-to-use invoice generator',
    url: 'https://billcraft.com',
    siteName: 'BillCraft',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BillCraft - Professional Invoice Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BillCraft - Professional Invoice Generator',
    description: 'Create professional invoices instantly with our modern, easy-to-use invoice generator',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster />
          
          {/* Global Floating AI Assistant - Shows on all pages */}
          <FloatingAIAssistant 
            position="bottom-right"
            showOnAllPages={true}
          />
        </AuthProvider>
      </body>
    </html>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  Edit3,
  Heart,
  Copy,
  Check,
  Crown,
  Zap,
  Building2,
  Palette,
  Layout,
  ArrowRight,
  Download,
  CheckCircle,
  Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { TemplatePreviewModal } from '@/components/templates/template-preview-modal'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

// Import all 30 new template components
import { GhostWhite } from '@/components/templates/ghost-white'
import { MonoLine } from '@/components/templates/mono-line'
import { AirLight } from '@/components/templates/air-light'
import { ZenSpace } from '@/components/templates/zen-space'
import { PaperThin } from '@/components/templates/paper-thin'

import { NeonEdge } from '@/components/templates/neon-edge'
import { SiliconValley } from '@/components/templates/silicon-valley'
import { CodeBlack } from '@/components/templates/code-black'
import { GradientFlow } from '@/components/templates/gradient-flow'
import { GlassMorph } from '@/components/templates/glass-morph'

import { SunsetOrange } from '@/components/templates/sunset-orange'
import { ElectricPurple } from '@/components/templates/electric-purple'
import { CoralReef } from '@/components/templates/coral-reef'
import { EmeraldCity } from '@/components/templates/emerald-city'
import { MidnightBlue } from '@/components/templates/midnight-blue'

import { DiamondBlack } from '@/components/templates/diamond-black'
import { RoseGold } from '@/components/templates/rose-gold'
import { PlatinumEdge } from '@/components/templates/platinum-edge'
import { ChampagneGold } from '@/components/templates/champagne-gold'
import { ObsidianPro } from '@/components/templates/obsidian-pro'

import { ExecutiveNavy } from '@/components/templates/executive-navy'
import { BoardroomGray } from '@/components/templates/boardroom-gray'
import { TrustBlue } from '@/components/templates/trust-blue'
import { ForestCorporate } from '@/components/templates/forest-corporate'
import { SteelProfessional } from '@/components/templates/steel-professional'

import { CyberNeon } from '@/components/templates/cyber-neon'
import { QuantumViolet } from '@/components/templates/quantum-violet'
import { HologramBlue } from '@/components/templates/hologram-blue'
import { NeuralNetwork } from '@/components/templates/neural-network'
import { SpaceOdyssey } from '@/components/templates/space-odyssey'

import { generateSampleData } from '@/lib/sample-invoice-data'
import { MediumTemplatePreview } from '@/components/templates/optimized-template-preview'

const templateComponents = {
  // Ultra-Minimal (5)
  'ghost-white': GhostWhite,
  'mono-line': MonoLine,
  'air-light': AirLight,
  'zen-space': ZenSpace,
  'paper-thin': PaperThin,

  // Modern-Tech (5)
  'neon-edge': NeonEdge,
  'silicon-valley': SiliconValley,
  'code-black': CodeBlack,
  'gradient-flow': GradientFlow,
  'glass-morph': GlassMorph,

  // Creative-Bold (5)
  'sunset-orange': SunsetOrange,
  'electric-purple': ElectricPurple,
  'coral-reef': CoralReef,
  'emerald-city': EmeraldCity,
  'midnight-blue': MidnightBlue,

  // Luxury-Premium (5)
  'diamond-black': DiamondBlack,
  'rose-gold': RoseGold,
  'platinum-edge': PlatinumEdge,
  'champagne-gold': ChampagneGold,
  'obsidian-pro': ObsidianPro,

  // Corporate-Pro (5)
  'executive-navy': ExecutiveNavy,
  'boardroom-gray': BoardroomGray,
  'trust-blue': TrustBlue,
  'forest-corporate': ForestCorporate,
  'steel-professional': SteelProfessional,

  // Futuristic (5)
  'cyber-neon': CyberNeon,
  'quantum-violet': QuantumViolet,
  'hologram-blue': HologramBlue,
  'neural-network': NeuralNetwork,
  'space-odyssey': SpaceOdyssey,
}

// Template data with different categories and styles
const templateCategories = [
  { id: 'all', name: 'All Templates', icon: Layout },
  { id: 'modern', name: 'Modern', icon: Layers },
  { id: 'classic', name: 'Classic', icon: FileText },
  { id: 'minimal', name: 'Minimal', icon: Zap },
  { id: 'corporate', name: 'Corporate', icon: Building2 },
  { id: 'creative', name: 'Creative', icon: Palette }
]

const invoiceTemplates = [
  // Ultra-Minimal Category (5 templates)
  {
    id: 'ghost-white',
    name: 'Ghost White',
    category: 'minimal',
    description: 'Invisible design. Maximum impact. Stripe-level minimalism.',
    color: 'gray',
    isPremium: false,
    isPopular: true,
    features: ['Ultra-clean', 'Maximum whitespace', 'Perfect typography'],
    preview: '/templates/ghost-white.jpg'
  },
  {
    id: 'mono-line',
    name: 'Mono Line',
    category: 'minimal',
    description: 'Single accent line. Pure monochrome elegance.',
    color: 'gray',
    isPremium: false,
    isPopular: true,
    features: ['Monochrome', 'Geometric precision', 'Swiss design'],
    preview: '/templates/mono-line.jpg'
  },
  {
    id: 'air-light',
    name: 'Air Light',
    category: 'minimal',
    description: 'Weightless design. Breathable space. Apple-inspired.',
    color: 'gray',
    isPremium: false,
    isPopular: true,
    features: ['Airy layout', 'Subtle borders', 'Premium feel'],
    preview: '/templates/air-light.jpg'
  },
  {
    id: 'zen-space',
    name: 'Zen Space',
    category: 'minimal',
    description: 'Calm. Balanced. Perfectly centered. Notion-like.',
    color: 'gray',
    isPremium: false,
    isPopular: false,
    features: ['Centered layout', 'Balanced spacing', 'Zen aesthetic'],
    preview: '/templates/zen-space.jpg'
  },
  {
    id: 'paper-thin',
    name: 'Paper Thin',
    category: 'minimal',
    description: 'Digital paper. Minimal ink. Maximum clarity.',
    color: 'gray',
    isPremium: false,
    isPopular: false,
    features: ['Paper-like', 'Minimal design', 'Universal appeal'],
    preview: '/templates/paper-thin.jpg'
  },

  // Modern-Tech Category (5 templates)
  {
    id: 'neon-edge',
    name: 'Neon Edge',
    category: 'modern',
    description: 'Cyberpunk vibes. Electric blue accents. Future-ready.',
    color: 'cyber',
    isPremium: true,
    isPopular: true,
    features: ['Neon accents', 'Tech aesthetic', 'Bold colors'],
    preview: '/templates/neon-edge.jpg'
  },
  {
    id: 'silicon-valley',
    name: 'Silicon Valley',
    category: 'modern',
    description: 'Startup DNA. VC-approved. Y Combinator aesthetic.',
    color: 'blue',
    isPremium: false,
    isPopular: true,
    features: ['Startup vibe', 'Modern layout', 'Tech-forward'],
    preview: '/templates/silicon-valley.jpg'
  },
  {
    id: 'code-black',
    name: 'Code Black',
    category: 'modern',
    description: 'Developer-grade. Terminal-inspired. GitHub dark mode.',
    color: 'black',
    isPremium: true,
    isPopular: true,
    features: ['Code aesthetic', 'Monospace font', 'Developer-friendly'],
    preview: '/templates/code-black.jpg'
  },
  {
    id: 'gradient-flow',
    name: 'Gradient Flow',
    category: 'modern',
    description: 'Smooth gradients. Fluid design. Instagram-worthy.',
    color: 'gradient',
    isPremium: false,
    isPopular: true,
    features: ['Gradient accents', 'Fluid design', 'Modern aesthetic'],
    preview: '/templates/gradient-flow.jpg'
  },
  {
    id: 'glass-morph',
    name: 'Glass Morph',
    category: 'modern',
    description: 'Frosted glass. Blur effects. iOS 15 inspired.',
    color: 'glass',
    isPremium: true,
    isPopular: true,
    features: ['Glass effect', 'Blur backdrop', 'Premium feel'],
    preview: '/templates/glass-morph.jpg'
  },

  // Creative-Bold Category (5 templates)
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    category: 'creative',
    description: 'Warm sunset vibes. Bold orange energy. Stand out.',
    color: 'orange',
    isPremium: false,
    isPopular: true,
    features: ['Bold orange', 'Energetic', 'Eye-catching'],
    preview: '/templates/sunset-orange.jpg'
  },
  {
    id: 'electric-purple',
    name: 'Electric Purple',
    category: 'creative',
    description: 'Vibrant purple power. Creative confidence. Agency-grade.',
    color: 'purple',
    isPremium: false,
    isPopular: true,
    features: ['Bold purple', 'Creative energy', 'Agency-ready'],
    preview: '/templates/electric-purple.jpg'
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    category: 'creative',
    description: 'Ocean-inspired coral. Fresh and vibrant. Tropical energy.',
    color: 'coral',
    isPremium: false,
    isPopular: true,
    features: ['Coral pink', 'Fresh design', 'Vibrant energy'],
    preview: '/templates/coral-reef.jpg'
  },
  {
    id: 'emerald-city',
    name: 'Emerald City',
    category: 'creative',
    description: 'Rich emerald green. Nature meets modern. Eco-friendly.',
    color: 'emerald',
    isPremium: false,
    isPopular: false,
    features: ['Emerald green', 'Eco-friendly', 'Fresh aesthetic'],
    preview: '/templates/emerald-city.jpg'
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    category: 'creative',
    description: 'Deep midnight blue. Mysterious elegance. Night sky.',
    color: 'navy',
    isPremium: false,
    isPopular: false,
    features: ['Deep blue', 'Elegant', 'Professional'],
    preview: '/templates/midnight-blue.jpg'
  },

  // Luxury-Premium Category (5 templates)
  {
    id: 'diamond-black',
    name: 'Diamond Black',
    category: 'corporate',
    description: 'Pure luxury. Black diamond elegance. VIP treatment.',
    color: 'black',
    isPremium: true,
    isPopular: true,
    features: ['Luxury black', 'Premium feel', 'VIP-grade'],
    preview: '/templates/diamond-black.jpg'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    category: 'creative',
    description: 'Elegant rose gold. Feminine luxury. Instagram aesthetic.',
    color: 'rosegold',
    isPremium: true,
    isPopular: true,
    features: ['Rose gold', 'Elegant', 'Feminine'],
    preview: '/templates/rose-gold.jpg'
  },
  {
    id: 'platinum-edge',
    name: 'Platinum Edge',
    category: 'corporate',
    description: 'Platinum sophistication. Silver elegance. Executive-level.',
    color: 'platinum',
    isPremium: true,
    isPopular: true,
    features: ['Platinum style', 'Sophisticated', 'Executive'],
    preview: '/templates/platinum-edge.jpg'
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    category: 'corporate',
    description: 'Champagne elegance. Gold accents. Celebration-worthy.',
    color: 'gold',
    isPremium: true,
    isPopular: true,
    features: ['Gold accents', 'Elegant', 'Celebratory'],
    preview: '/templates/champagne-gold.jpg'
  },
  {
    id: 'obsidian-pro',
    name: 'Obsidian Pro',
    category: 'corporate',
    description: 'Dark obsidian. Professional luxury. High-end appeal.',
    color: 'black',
    isPremium: true,
    isPopular: false,
    features: ['Dark luxury', 'Professional', 'High-end'],
    preview: '/templates/obsidian-pro.jpg'
  },

  // Corporate-Pro Category (5 templates)
  {
    id: 'executive-navy',
    name: 'Executive Navy',
    category: 'corporate',
    description: 'Navy blue authority. C-suite approved. Fortune 500.',
    color: 'navy',
    isPremium: false,
    isPopular: true,
    features: ['Navy blue', 'Executive', 'Professional'],
    preview: '/templates/executive-navy.jpg'
  },
  {
    id: 'boardroom-gray',
    name: 'Boardroom Gray',
    category: 'corporate',
    description: 'Sophisticated gray. Meeting room ready. Enterprise-grade.',
    color: 'gray',
    isPremium: false,
    isPopular: true,
    features: ['Professional gray', 'Enterprise', 'Boardroom-ready'],
    preview: '/templates/boardroom-gray.jpg'
  },
  {
    id: 'trust-blue',
    name: 'Trust Blue',
    category: 'corporate',
    description: 'Trustworthy blue. Bank-approved. Financial grade.',
    color: 'blue',
    isPremium: false,
    isPopular: true,
    features: ['Trust blue', 'Financial', 'Bank-grade'],
    preview: '/templates/trust-blue.jpg'
  },
  {
    id: 'forest-corporate',
    name: 'Forest Corporate',
    category: 'corporate',
    description: 'Deep forest green. Stability and growth. Traditional trust.',
    color: 'forest',
    isPremium: false,
    isPopular: false,
    features: ['Forest green', 'Stable', 'Traditional'],
    preview: '/templates/forest-corporate.jpg'
  },
  {
    id: 'steel-professional',
    name: 'Steel Professional',
    category: 'corporate',
    description: 'Steel gray strength. Industrial professional. Engineering-grade.',
    color: 'gray',
    isPremium: false,
    isPopular: false,
    features: ['Steel gray', 'Industrial', 'Strong'],
    preview: '/templates/steel-professional.jpg'
  },

  // Futuristic Category (5 templates)
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    category: 'modern',
    description: 'Cyberpunk future. Neon lights. Matrix-inspired.',
    color: 'cyber',
    isPremium: true,
    isPopular: true,
    features: ['Cyberpunk', 'Neon', 'Futuristic'],
    preview: '/templates/cyber-neon.jpg'
  },
  {
    id: 'quantum-violet',
    name: 'Quantum Violet',
    category: 'modern',
    description: 'Quantum computing vibes. Violet energy. Next-gen tech.',
    color: 'purple',
    isPremium: true,
    isPopular: true,
    features: ['Quantum', 'Violet', 'Next-gen'],
    preview: '/templates/quantum-violet.jpg'
  },
  {
    id: 'hologram-blue',
    name: 'Hologram Blue',
    category: 'modern',
    description: 'Holographic effects. 3D vibes. Sci-fi aesthetic.',
    color: 'blue',
    isPremium: true,
    isPopular: false,
    features: ['Holographic', '3D feel', 'Sci-fi'],
    preview: '/templates/hologram-blue.jpg'
  },
  {
    id: 'neural-network',
    name: 'Neural Network',
    category: 'modern',
    description: 'AI-inspired. Neural patterns. Machine learning aesthetic.',
    color: 'blue',
    isPremium: true,
    isPopular: false,
    features: ['AI-inspired', 'Neural', 'Tech-forward'],
    preview: '/templates/neural-network.jpg'
  },
  {
    id: 'space-odyssey',
    name: 'Space Odyssey',
    category: 'modern',
    description: 'Space exploration. Cosmic design. Interstellar vibes.',
    color: 'navy',
    isPremium: true,
    isPopular: false,
    features: ['Space theme', 'Cosmic', 'Futuristic'],
    preview: '/templates/space-odyssey.jpg'
  }
]

const colorSchemes = {
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  gray: 'bg-slate-50 border-slate-200 text-slate-700',
  navy: 'bg-blue-900 border-blue-800 text-blue-100',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
  green: 'bg-green-50 border-green-200 text-green-700',
  orange: 'bg-orange-50 border-orange-200 text-orange-700',
  black: 'bg-gradient-to-br from-slate-800 to-indigo-900 border-slate-600 text-slate-100',
  red: 'bg-red-50 border-red-200 text-red-700',
  teal: 'bg-teal-50 border-teal-200 text-teal-700',
  brown: 'bg-amber-50 border-amber-200 text-amber-700',
  gradient: 'bg-gradient-to-br from-orange-50 to-pink-50 border-orange-200 text-orange-700',
  cyber: 'bg-gradient-to-br from-indigo-900 to-cyan-900 border-cyan-500 text-cyan-300',
  rosegold: 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 text-rose-700',
  darkblue: 'bg-gradient-to-br from-blue-800 to-indigo-800 border-blue-400 text-blue-300',
  ocean: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-blue-700',
  forest: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-green-700',
  coral: 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 text-orange-700',
  platinum: 'bg-gradient-to-br from-slate-50 to-zinc-50 border-slate-200 text-slate-700',
  rainbow: 'bg-gradient-to-r from-red-50 via-yellow-50 via-green-50 via-blue-50 to-purple-50 border-purple-200 text-purple-700',
  glass: 'bg-white/70 backdrop-blur border-gray-200 text-gray-700',
  electric: 'bg-gradient-to-br from-cyan-600 to-blue-700 border-blue-400 text-blue-100',
  gold: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 text-yellow-700',
  pink: 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 text-pink-700',
  emerald: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 text-emerald-700',
  silver: 'bg-gradient-to-br from-slate-100 to-gray-100 border-slate-200 text-slate-700'
}

export default function PublicTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [favoriteTemplates, setFavoriteTemplates] = useState<string[]>([])
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredTemplates = invoiceTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (templateId: string) => {
    setFavoriteTemplates(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const handleUseTemplate = (templateId: string) => {
    if (user) {
      // User is logged in, go to dashboard to use template
      router.push(`/dashboard/invoices/create?template=${templateId}`)
      toast({
        title: "Template Selected!",
        description: "Redirecting to create invoice with your selected template.",
      })
    } else {
      // User not logged in, redirect to signup
      router.push('/auth/signup')
      toast({
        title: "Sign up to Continue",
        description: "Create an account to use this template.",
      })
    }
  }

  const handlePreviewTemplate = (template: any) => {
    setPreviewTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleCopyTemplate = async (templateId: string) => {
    try {
      const templateUrl = `${window.location.origin}/templates?template=${templateId}`
      await navigator.clipboard.writeText(templateUrl)
      toast({
        title: "Template Link Copied!",
        description: "Template link has been copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy template link. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-6 py-12">
            <div className="space-y-6">
              <div className="h-8 bg-slate-200 rounded-lg animate-pulse w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 bg-slate-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements - Matching Homepage */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[32rem] h-[32rem] bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <Header />
      <main className="pt-16 relative z-10">
        <div className="container mx-auto px-6 py-12">
          {/* Ultra-Modern Hero Section - Advanced Aesthetic Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative text-center mb-20 overflow-hidden"
          >
            {/* Advanced Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0,0,0) 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }}></div>
            </div>

            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center justify-center mb-8"
            >
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/20 rounded-full px-5 py-2.5 shadow-lg relative overflow-hidden"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
                <div className="relative flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-foreground text-sm font-semibold tracking-wide">25+ Premium Templates Available</span>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-tight"
            >
              Invoice
              <br />
              <span className="text-primary">Templates</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Discover our premium collection of{' '}
                <span className="text-primary font-bold">modern</span>,{' '}
                <span className="text-primary font-bold">aesthetic</span>, and{' '}
                <span className="text-primary font-bold">professional</span> invoice templates
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Each design features beautiful styling, smooth animations, and pixel-perfect aesthetics
              </p>
            </motion.div>

            {/* Statistics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-5 border-2 border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="relative">
                  <div className="text-3xl font-bold text-primary mb-2">{invoiceTemplates.length}</div>
                  <div className="text-foreground font-semibold text-sm">Total Templates</div>
                  <div className="w-8 h-0.5 bg-primary rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-5 border-2 border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="relative">
                  <div className="text-3xl font-bold text-primary mb-2">{invoiceTemplates.filter(t => t.isPopular).length}</div>
                  <div className="text-foreground font-semibold text-sm">Popular Designs</div>
                  <div className="w-8 h-0.5 bg-primary rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-5 border-2 border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="relative">
                  <div className="text-3xl font-bold text-primary mb-2">{invoiceTemplates.filter(t => t.isPremium).length}</div>
                  <div className="text-foreground font-semibold text-sm">Premium Quality</div>
                  <div className="w-8 h-0.5 bg-primary rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-5 border-2 border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <div className="relative">
                  <div className="text-3xl font-bold text-primary mb-2">15</div>
                  <div className="text-foreground font-semibold text-sm">Latest & Modern</div>
                  <div className="w-8 h-0.5 bg-primary rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2rem] p-6 border-2 border-white/20 dark:border-gray-700/20 shadow-lg"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[2rem]"></div>

              <div className="relative space-y-6">
                {/* Search Section */}
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search templates by name, style, or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-14 pr-6 bg-white/80 dark:bg-gray-800/80 border-2 border-white/30 dark:border-gray-700/30 rounded-full text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1.5 border-2 border-white/30 dark:border-gray-700/30 shadow-sm">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'grid'
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-700/50 hover:text-foreground'
                            }`}
                        >
                          <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'list'
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-700/50 hover:text-foreground'
                            }`}
                        >
                          <List className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Tabs */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Filter by Category</div>
                  <div className="flex flex-wrap gap-2">
                    {templateCategories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <motion.button
                          key={category.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`group relative px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-foreground border-white/30 dark:border-gray-700/30 hover:border-primary/50 shadow-sm hover:shadow-md'
                            }`}
                        >
                          <div className="relative flex items-center space-x-2">
                            <IconComponent className="h-4 w-4" />
                            <span>{category.name}</span>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Stats & Results */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-white/20 dark:border-gray-700/20 gap-3">
                  <div className="text-sm font-semibold text-foreground">
                    Showing <span className="text-lg font-bold text-primary">{filteredTemplates.length}</span> of {invoiceTemplates.length} templates
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                      <Crown className="h-3.5 w-3.5 text-primary" />
                      <span className="font-bold text-primary text-xs">{invoiceTemplates.filter(t => t.isPremium).length}</span>
                      <span className="text-primary font-medium text-xs">Premium</span>
                    </div>
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-secondary/10 rounded-full border border-secondary/20">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span className="font-bold text-secondary text-xs">{invoiceTemplates.filter(t => t.isPopular).length}</span>
                      <span className="text-secondary font-medium text-xs">Popular</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Templates Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
                : 'space-y-3'
              }
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={viewMode === 'grid' ? '' : 'max-w-none'}
                >
                  <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 group overflow-hidden rounded-[2rem] hover:scale-[1.02]"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    {/* Template Preview */}
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden rounded-t-[2rem]">
                      <div className={`absolute inset-0 ${colorSchemes[template.color as keyof typeof colorSchemes]} opacity-10`}></div>

                      {/* Template Preview Container */}
                      <div className="absolute inset-0 p-2">
                        <div className="w-full h-full rounded-lg overflow-hidden bg-white shadow-sm border border-white/60 relative">
                          <MediumTemplatePreview templateId={template.id} className="w-full h-full" />
                        </div>
                      </div>

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background text-foreground border-background hover:bg-muted rounded-full text-xs"
                          onClick={() => handlePreviewTemplate(template)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUseTemplate(template.id)}
                          className="rounded-full text-xs"
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          {user ? 'Use' : 'Start'}
                        </Button>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {template.isPopular && (
                          <div className="bg-secondary/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md border border-secondary/30">
                            <div className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-white rounded-full"></div>
                              <span>Popular</span>
                            </div>
                          </div>
                        )}
                        {template.isPremium && (
                          <div className="bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md border border-primary/30">
                            <div className="flex items-center space-x-1">
                              <Crown className="h-2.5 w-2.5" />
                              <span>Premium</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(template.id)}
                        className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-white/50 dark:border-gray-700/50 hover:scale-110"
                      >
                        <Heart
                          className={`h-3.5 w-3.5 transition-all duration-300 ${favoriteTemplates.includes(template.id)
                            ? 'text-red-500 fill-current scale-110'
                            : 'text-slate-400 hover:text-red-400'
                            }`}
                        />
                      </button>
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          {template.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {template.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUseTemplate(template.id)}
                          className="flex-1 rounded-full text-xs font-semibold"
                        >
                          {user ? 'Use Template' : 'Get Started'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePreviewTemplate(template)}
                          className="rounded-full text-xs"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12 mb-12"
          >
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/20 rounded-[3rem] p-8 md:p-10 relative overflow-hidden shadow-xl"
              style={{
                backdropFilter: 'blur(24px) saturate(200%)',
                WebkitBackdropFilter: 'blur(24px) saturate(200%)',
              }}
            >
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent rounded-[3rem]"></div>

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="inline-flex items-center justify-center mb-4"
                >
                  <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2">
                    <span className="text-primary font-semibold text-sm">Ready to Get Started?</span>
                  </div>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Create Stunning Invoices
                </h2>
                <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join thousands of businesses using BillCraft to create professional invoices.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {!user && (
                    <>
                      <Button
                        asChild
                        size="lg"
                        className="btn-primary rounded-full px-8 shadow-lg hover:shadow-xl"
                      >
                        <Link href="/auth/signup">
                          Get Started Free
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8"
                      >
                        <Link href="/auth/login">
                          Sign In
                        </Link>
                      </Button>
                    </>
                  )}
                  {user && (
                    <Button
                      asChild
                      size="lg"
                      className="btn-primary rounded-full px-8 shadow-lg hover:shadow-xl"
                    >
                      <Link href="/dashboard">
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-muted-foreground text-xs">
                  <div className="flex items-center">
                    <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                    No credit card required
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                    {invoiceTemplates.length}+ Templates
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                    Setup in 5 minutes
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Preview Modal */}
        {previewTemplate && (
          <TemplatePreviewModal
            isOpen={isPreviewOpen}
            onClose={() => {
              setIsPreviewOpen(false)
              setPreviewTemplate(null)
            }}
            template={previewTemplate}
          />
        )}
      </main>
      <Footer />
    </div>
  )
} 
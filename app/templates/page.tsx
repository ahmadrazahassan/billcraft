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

// Import template components (ALL TEMPLATES NOW WORKING!)
import { MinimalWhiteTemplate } from '@/components/templates/minimal-white'
import { CreativePurpleTemplate } from '@/components/templates/creative-purple'
import { MinimalBlackTemplate } from '@/components/templates/minimal-black'
import { ModernBlueTemplate } from '@/components/templates/modern-blue'
import { CorporateNavyTemplate } from '@/components/templates/corporate-navy'
import { ClassicGreenTemplate } from '@/components/templates/classic-green'
import { ModernOrangeTemplate } from '@/components/templates/modern-orange'
import { CorporateRedTemplate } from '@/components/templates/corporate-red'
import { CreativeTealTemplate } from '@/components/templates/creative-teal'
import { ClassicBrownTemplate } from '@/components/templates/classic-brown'
import { GradientSunsetTemplate } from '@/components/templates/gradient-sunset'
import { NeonCyberTemplate } from '@/components/templates/neon-cyber'
import { ElegantRoseGoldTemplate } from '@/components/templates/elegant-rose-gold'
import { DarkProfessionalTemplate } from '@/components/templates/dark-professional'
import { OceanWaveTemplate } from '@/components/templates/ocean-wave'
import { ForestGreenTemplate } from '@/components/templates/forest-green'
import { CoralModernTemplate } from '@/components/templates/coral-modern'
import { PlatinumEliteTemplate } from '@/components/templates/platinum-elite'
import { VibrantRainbowTemplate } from '@/components/templates/vibrant-rainbow'
import { MinimalGlassTemplate } from '@/components/templates/minimal-glass'
import { ElectricBlueTemplate } from '@/components/templates/electric-blue'
import { GoldenLuxuryTemplate } from '@/components/templates/golden-luxury'
import { PinkCreativeTemplate } from '@/components/templates/pink-creative'
import { EmeraldCorporateTemplate } from '@/components/templates/emerald-corporate'
import { SilverTechTemplate } from '@/components/templates/silver-tech'
import { generateSampleData } from '@/lib/sample-invoice-data'
import { MediumTemplatePreview } from '@/components/templates/optimized-template-preview'

const templateComponents = {
  'minimal-white': MinimalWhiteTemplate,
  'creative-purple': CreativePurpleTemplate,
  'minimal-black': MinimalBlackTemplate,
  'modern-blue': ModernBlueTemplate,
  'corporate-navy': CorporateNavyTemplate,
  'classic-green': ClassicGreenTemplate,
  'modern-orange': ModernOrangeTemplate,
  'corporate-red': CorporateRedTemplate,
  'creative-teal': CreativeTealTemplate,
  'classic-brown': ClassicBrownTemplate,
  'gradient-sunset': GradientSunsetTemplate,
  'neon-cyber': NeonCyberTemplate,
  'elegant-rose-gold': ElegantRoseGoldTemplate,
  'dark-professional': DarkProfessionalTemplate,
  'ocean-wave': OceanWaveTemplate,
  'forest-green': ForestGreenTemplate,
  'coral-modern': CoralModernTemplate,
  'platinum-elite': PlatinumEliteTemplate,
  'vibrant-rainbow': VibrantRainbowTemplate,
  'minimal-glass': MinimalGlassTemplate,
  'electric-blue': ElectricBlueTemplate,
  'golden-luxury': GoldenLuxuryTemplate,
  'pink-creative': PinkCreativeTemplate,
  'emerald-corporate': EmeraldCorporateTemplate,
  'silver-tech': SilverTechTemplate,
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
  // Original Templates
  {
    id: 'modern-blue',
    name: 'Modern Professional',
    category: 'modern',
    description: 'Clean and contemporary design with blue accents',
    color: 'blue',
    isPremium: false,
    isPopular: true,
    features: ['Clean Layout', 'Professional Typography', 'Blue Color Scheme'],
    preview: '/templates/modern-blue.jpg'
  },
  {
    id: 'minimal-white',
    name: 'Minimal Clean',
    category: 'minimal',
    description: 'Ultra-clean minimal design with perfect spacing',
    color: 'gray',
    isPremium: false,
    isPopular: false,
    features: ['Minimal Design', 'Perfect Spacing', 'Monochrome'],
    preview: '/templates/minimal-white.jpg'
  },
  {
    id: 'corporate-navy',
    name: 'Corporate Elite',
    category: 'corporate',
    description: 'Professional corporate design with navy blue theme',
    color: 'navy',
    isPremium: true,
    isPopular: true,
    features: ['Corporate Look', 'Navy Theme', 'Premium Layout'],
    preview: '/templates/corporate-navy.jpg'
  },
  {
    id: 'creative-purple',
    name: 'Creative Studio',
    category: 'creative',
    description: 'Creative design perfect for agencies and studios',
    color: 'purple',
    isPremium: true,
    isPopular: false,
    features: ['Creative Layout', 'Purple Accents', 'Agency Style'],
    preview: '/templates/creative-purple.jpg'
  },
  {
    id: 'classic-green',
    name: 'Classic Business',
    category: 'classic',
    description: 'Traditional business invoice with green highlights',
    color: 'green',
    isPremium: false,
    isPopular: false,
    features: ['Traditional Style', 'Green Theme', 'Business Focus'],
    preview: '/templates/classic-green.jpg'
  },
  {
    id: 'modern-orange',
    name: 'Modern Vibrant',
    category: 'modern',
    description: 'Modern design with vibrant orange accents',
    color: 'orange',
    isPremium: false,
    isPopular: true,
    features: ['Vibrant Design', 'Orange Accents', 'Modern Layout'],
    preview: '/templates/modern-orange.jpg'
  },
  {
    id: 'minimal-black',
    name: 'Minimal Dark',
    category: 'minimal',
    description: 'Sophisticated dark theme with minimal elements',
    color: 'black',
    isPremium: true,
    isPopular: false,
    features: ['Dark Theme', 'Sophisticated', 'Minimal Elements'],
    preview: '/templates/minimal-black.jpg'
  },
  {
    id: 'corporate-red',
    name: 'Corporate Power',
    category: 'corporate',
    description: 'Bold corporate design with red power accents',
    color: 'red',
    isPremium: true,
    isPopular: false,
    features: ['Bold Design', 'Red Accents', 'Power Theme'],
    preview: '/templates/corporate-red.jpg'
  },
  {
    id: 'creative-teal',
    name: 'Creative Flow',
    category: 'creative',
    description: 'Flowing creative design with teal highlights',
    color: 'teal',
    isPremium: false,
    isPopular: false,
    features: ['Creative Flow', 'Teal Theme', 'Artistic Layout'],
    preview: '/templates/creative-teal.jpg'
  },
  {
    id: 'classic-brown',
    name: 'Classic Elegance',
    category: 'classic',
    description: 'Elegant classic design with warm brown tones',
    color: 'brown',
    isPremium: true,
    isPopular: true,
    features: ['Elegant Style', 'Brown Tones', 'Classic Beauty'],
    preview: '/templates/classic-brown.jpg'
  },
  
  // New Modern Templates - Ultra Aesthetic & Advanced
  {
    id: 'gradient-sunset',
    name: 'Gradient Sunset',
    category: 'modern',
    description: 'Stunning gradient design with sunset-inspired colors and glassmorphism',
    color: 'gradient',
    isPremium: true,
    isPopular: true,
    features: ['Gradient Background', 'Glassmorphism', 'Sunset Colors', 'Modern Animations'],
    preview: '/templates/gradient-sunset.jpg'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    category: 'modern',
    description: 'Futuristic cyberpunk design with neon effects and dark theme',
    color: 'cyber',
    isPremium: true,
    isPopular: true,
    features: ['Cyberpunk Style', 'Neon Effects', 'Dark Theme', 'Tech Grid'],
    preview: '/templates/neon-cyber.jpg'
  },
  {
    id: 'elegant-rose-gold',
    name: 'Elegant Rose Gold',
    category: 'creative',
    description: 'Luxurious rose gold design with elegant typography and animations',
    color: 'rosegold',
    isPremium: true,
    isPopular: true,
    features: ['Rose Gold Theme', 'Luxury Design', 'Elegant Typography', 'Premium Feel'],
    preview: '/templates/elegant-rose-gold.jpg'
  },
  {
    id: 'dark-professional',
    name: 'Dark Professional',
    category: 'corporate',
    description: 'Sophisticated dark corporate theme with blue accents',
    color: 'darkblue',
    isPremium: true,
    isPopular: false,
    features: ['Dark Theme', 'Corporate Style', 'Blue Accents', 'Professional'],
    preview: '/templates/dark-professional.jpg'
  },
  {
    id: 'ocean-wave',
    name: 'Ocean Wave',
    category: 'creative',
    description: 'Ocean-inspired design with flowing waves and blue gradients',
    color: 'ocean',
    isPremium: false,
    isPopular: true,
    features: ['Ocean Theme', 'Wave Effects', 'Blue Gradients', 'Flowing Design'],
    preview: '/templates/ocean-wave.jpg'
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    category: 'classic',
    description: 'Eco-friendly forest theme with sustainable design elements',
    color: 'forest',
    isPremium: false,
    isPopular: false,
    features: ['Eco-Friendly', 'Forest Theme', 'Green Gradients', 'Sustainable'],
    preview: '/templates/forest-green.jpg'
  },
  {
    id: 'coral-modern',
    name: 'Coral Modern',
    category: 'creative',
    description: 'Vibrant coral and orange modern design with creative elements',
    color: 'coral',
    isPremium: false,
    isPopular: true,
    features: ['Coral Colors', 'Modern Design', 'Creative Layout', 'Vibrant'],
    preview: '/templates/coral-modern.jpg'
  },
  {
    id: 'platinum-elite',
    name: 'Platinum Elite',
    category: 'corporate',
    description: 'Ultra-premium platinum design with luxurious elements',
    color: 'platinum',
    isPremium: true,
    isPopular: true,
    features: ['Platinum Theme', 'Ultra Premium', 'Luxury Design', 'Elite Style'],
    preview: '/templates/platinum-elite.jpg'
  },
  {
    id: 'vibrant-rainbow',
    name: 'Vibrant Rainbow',
    category: 'creative',
    description: 'Colorful rainbow design with vibrant gradients and animations',
    color: 'rainbow',
    isPremium: true,
    isPopular: true,
    features: ['Rainbow Colors', 'Vibrant Design', 'Multi-Color', 'Creative'],
    preview: '/templates/vibrant-rainbow.jpg'
  },
  {
    id: 'minimal-glass',
    name: 'Minimal Glass',
    category: 'minimal',
    description: 'Ultra-clean glass morphism design with perfect transparency',
    color: 'glass',
    isPremium: true,
    isPopular: false,
    features: ['Glass Morphism', 'Ultra Clean', 'Transparent', 'Minimal'],
    preview: '/templates/minimal-glass.jpg'
  },
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    category: 'modern',
    description: 'High-energy electric blue design with tech-inspired elements',
    color: 'electric',
    isPremium: false,
    isPopular: true,
    features: ['Electric Blue', 'High Energy', 'Tech Style', 'Modern'],
    preview: '/templates/electric-blue.jpg'
  },
  {
    id: 'golden-luxury',
    name: 'Golden Luxury',
    category: 'corporate',
    description: 'Opulent golden design with luxury elements and premium feel',
    color: 'gold',
    isPremium: true,
    isPopular: true,
    features: ['Golden Theme', 'Luxury Design', 'Premium Feel', 'Opulent'],
    preview: '/templates/golden-luxury.jpg'
  },
  {
    id: 'pink-creative',
    name: 'Pink Creative',
    category: 'creative',
    description: 'Playful pink design with creative elements and modern typography',
    color: 'pink',
    isPremium: false,
    isPopular: false,
    features: ['Pink Theme', 'Playful Design', 'Creative Elements', 'Modern'],
    preview: '/templates/pink-creative.jpg'
  },
  {
    id: 'emerald-corporate',
    name: 'Emerald Corporate',
    category: 'corporate',
    description: 'Professional emerald green corporate design with modern elements',
    color: 'emerald',
    isPremium: false,
    isPopular: false,
    features: ['Emerald Green', 'Corporate Style', 'Professional', 'Modern'],
    preview: '/templates/emerald-corporate.jpg'
  },
  {
    id: 'silver-tech',
    name: 'Silver Tech',
    category: 'modern',
    description: 'Sleek silver tech design with futuristic elements and grid patterns',
    color: 'silver',
    isPremium: true,
    isPopular: false,
    features: ['Silver Theme', 'Tech Design', 'Futuristic', 'Grid Patterns'],
    preview: '/templates/silver-tech.jpg'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
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

            {/* Floating Status Badge - Ultra Modern */}
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center justify-center mb-8"
            >
              <div className="bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-violet-600/90 backdrop-blur-3xl border border-white/10 rounded-full px-10 py-5 shadow-2xl shadow-purple-500/25 relative overflow-hidden">
                {/* Subtle animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-50 animate-pulse"></div>
                <div className="relative flex items-center space-x-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                  <span className="text-white text-xl font-bold tracking-wide">25+ Premium Templates Available</span>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </motion.div>

            {/* Ultra-Modern Title with Advanced Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900 mb-8 tracking-tighter leading-none"
            >
              Invoice Templates
            </motion.h1>
            
            {/* Modern Subtitle with Advanced Styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="max-w-5xl mx-auto mb-16"
            >
              <p className="text-2xl md:text-3xl text-slate-600/90 font-medium leading-relaxed tracking-wide">
                Discover our premium collection of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">modern</span>,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold">aesthetic</span>, and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600 font-bold">professional</span> invoice templates
              </p>
              <p className="text-lg text-slate-500 mt-4 font-normal">
                Each design features advanced glassmorphism, smooth animations, and pixel-perfect aesthetics
              </p>
            </motion.div>

            {/* Advanced Statistics Grid - Ultra Modern */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-5xl font-black bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">{invoiceTemplates.length}</div>
                  <div className="text-slate-700 font-semibold text-lg">Total Templates</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-4 group-hover:w-16 transition-all duration-300"></div>
              </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-violet-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-5xl font-black bg-gradient-to-br from-purple-600 to-purple-800 bg-clip-text text-transparent mb-3">{invoiceTemplates.filter(t => t.isPopular).length}</div>
                  <div className="text-slate-700 font-semibold text-lg">Popular Designs</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mt-4 group-hover:w-16 transition-all duration-300"></div>
              </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-5xl font-black bg-gradient-to-br from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-3">{invoiceTemplates.filter(t => t.isPremium).length}</div>
                  <div className="text-slate-700 font-semibold text-lg">Premium Quality</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mt-4 group-hover:w-16 transition-all duration-300"></div>
              </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-5xl font-black bg-gradient-to-br from-orange-600 to-orange-800 bg-clip-text text-transparent mb-3">15</div>
                  <div className="text-slate-700 font-semibold text-lg">Latest & Modern</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-4 group-hover:w-16 transition-all duration-300"></div>
              </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Ultra-Modern Advanced Controls - Rounded & Aesthetic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative bg-white/60 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/30 shadow-2xl shadow-gray-500/10">
              {/* Advanced glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-[2rem]"></div>
              
              <div className="relative space-y-8">
                {/* Advanced Search Section */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Ultra-Modern Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
                        <Search className="h-6 w-6 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search templates by name, style, or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-16 pl-16 pr-8 bg-white/80 backdrop-blur-sm border border-white/40 rounded-[1.5rem] text-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900/30 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                    />
                  </div>
                </div>

                  {/* Modern View Toggle */}
                  <div className="flex items-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-[1.25rem] p-2 border border-white/40 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-4 rounded-[1rem] transition-all duration-300 ${
                            viewMode === 'grid' 
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                              : 'text-slate-600 hover:bg-white/60 hover:text-indigo-700'
                          }`}
                        >
                          <Grid3X3 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-4 rounded-[1rem] transition-all duration-300 ${
                            viewMode === 'list' 
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                              : 'text-slate-600 hover:bg-white/60 hover:text-indigo-700'
                          }`}
                        >
                          <List className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ultra-Modern Category Tabs - Rounded Design */}
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Filter by Category</div>
                  <div className="flex flex-wrap gap-3">
                  {templateCategories.map((category) => {
                    const IconComponent = category.icon
                    return (
                        <motion.button
                        key={category.id}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category.id)}
                          className={`group relative px-8 py-4 rounded-[1.5rem] font-semibold text-lg transition-all duration-300 border-2 overflow-hidden ${
                            selectedCategory === category.id
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-2xl shadow-indigo-500/25'
                              : 'bg-white/70 text-slate-600 border-white/50 hover:bg-white/90 hover:text-indigo-700 hover:border-white/70 shadow-lg hover:shadow-xl'
                          }`}
                        >
                          {/* Animated background for active state */}
                          {selectedCategory === category.id && (
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-90"></div>
                          )}
                          
                          <div className="relative flex items-center space-x-3">
                            <IconComponent className="h-5 w-5" />
                            <span>{category.name}</span>
                          </div>
                          
                          {/* Subtle hover animation */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Advanced Stats & Results - Modern Design */}
                <div className="flex items-center justify-between pt-6 border-t border-white/30">
                  <div className="flex items-center space-x-6">
                    <div className="text-lg font-bold text-slate-800">
                      Showing <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{filteredTemplates.length}</span> of {invoiceTemplates.length} templates
                </div>
              </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-amber-50/80 backdrop-blur-sm rounded-[1rem] border border-amber-200/50">
                      <Crown className="h-5 w-5 text-amber-600" />
                      <span className="font-bold text-amber-700">{invoiceTemplates.filter(t => t.isPremium).length}</span>
                      <span className="text-amber-600 font-medium">Premium</span>
                </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50/80 backdrop-blur-sm rounded-[1rem] border border-blue-200/50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-bold text-blue-700">{invoiceTemplates.filter(t => t.isPopular).length}</span>
                      <span className="text-blue-600 font-medium">Popular</span>
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
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }
            >
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={viewMode === 'grid' ? '' : 'max-w-none'}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-white/30 hover:shadow-2xl hover:shadow-gray-500/10 transition-all duration-500 group overflow-hidden rounded-[1.75rem] hover:scale-[1.02]">
                    {/* Template Preview */}
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden rounded-t-[1.75rem]">
                      <div className={`absolute inset-0 ${colorSchemes[template.color as keyof typeof colorSchemes]} opacity-10`}></div>
                      
                      {/* Enhanced Template Preview Container with Optimized Scaling */}
                      <div className="absolute inset-0 p-3">
                        <div className="w-full h-full rounded-lg overflow-hidden bg-white shadow-sm border border-white/60 relative">
                          <MediumTemplatePreview templateId={template.id} className="w-full h-full" />
                        </div>
                      </div>

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background text-foreground border-background hover:bg-muted"
                          onClick={() => handlePreviewTemplate(template)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleUseTemplate(template.id)}
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          {user ? 'Use' : 'Start'}
                        </Button>
                      </div>

                      {/* Modern Rounded Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {template.isPopular && (
                          <div className="bg-blue-500/90 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-blue-400/30">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
                              <span>Popular</span>
                            </div>
                          </div>
                        )}
                        {template.isPremium && (
                          <div className="bg-amber-500/90 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-amber-400/30">
                            <div className="flex items-center space-x-2">
                              <Crown className="h-3 w-3" />
                              <span>Premium</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Modern Rounded Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(template.id)}
                        className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-110"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-all duration-300 ${
                            favoriteTemplates.includes(template.id) 
                              ? 'text-red-500 fill-current scale-110' 
                              : 'text-slate-400 hover:text-red-400'
                          }`} 
                        />
                      </button>
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {template.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {template.description}
                          </p>
                        </div>
                      </div>

                      {/* Modern Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {template.features.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="px-3 py-1.5 bg-slate-100/80 backdrop-blur-sm text-slate-600 text-sm font-medium rounded-full border border-slate-200/50 hover:bg-slate-200/80 transition-all duration-300"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Modern Actions */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUseTemplate(template.id)}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-[1.25rem] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-3"
                        >
                          <Edit3 className="h-5 w-5" />
                          <span>{user ? 'Use Template' : 'Get Started'}</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleCopyTemplate(template.id)}
                          className="p-4 bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white hover:border-white/70 rounded-[1.25rem] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 text-slate-600 hover:text-slate-900"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
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

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-20 mb-12"
          >
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-3xl p-12 relative overflow-hidden shadow-2xl">
              {/* Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="inline-flex items-center justify-center mb-6"
                >
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3">
                    <span className="text-white font-bold">Ready to Get Started?</span>
                  </div>
                </motion.div>

                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                  Create Stunning Invoices in Minutes
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of businesses using BillCraft to create professional invoices 
                  with our modern, aesthetic templates and get paid faster than ever.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  {!user && (
                    <>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Link 
                          href="/auth/signup"
                          className="inline-flex items-center px-12 py-6 bg-white text-slate-900 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
                        >
                          Get Started Free
                          <ArrowRight className="h-5 w-5 ml-3" />
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Link 
                          href="/auth/login"
                          className="inline-flex items-center px-12 py-6 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold rounded-full hover:bg-white/30 transition-all duration-300"
                        >
                          Sign In
                        </Link>
                      </motion.div>
                    </>
                  )}
                  {user && (
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link 
                        href="/dashboard"
                        className="inline-flex items-center px-12 py-6 bg-white text-slate-900 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
                      >
                        Go to Dashboard
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </Link>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-8 mt-12 text-white/70 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    No credit card required
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {invoiceTemplates.length}+ Templates
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Setup in under 5 minutes
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
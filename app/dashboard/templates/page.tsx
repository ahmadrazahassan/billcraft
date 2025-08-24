'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { 
  FileText, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Eye, 
  Edit3, 
  Layers,
  Heart,
  Copy,
  Check,
  Rocket,
  Crown,
  Zap,
  Building2,
  Palette,
  Layout
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TemplatePreviewModal } from '@/components/templates/template-preview-modal'

// Import template components for previews (ALL TEMPLATES NOW WORKING!)
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
import { LargeTemplatePreview } from '@/components/templates/optimized-template-preview'

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
  { id: 'modern', name: 'Modern', icon: Rocket },
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

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [favoriteTemplates, setFavoriteTemplates] = useState<string[]>([])
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [templateToPreview, setTemplateToPreview] = useState<any>(null)

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
    setSelectedTemplate(templateId)
    router.push(`/dashboard/invoices/create?template=${templateId}`)
    toast({
      title: 'Template Selected',
      description: `Using "${invoiceTemplates.find(t => t.id === templateId)?.name}" template for new invoice.`,
    })
  }

  const handlePreviewTemplate = (templateId: string) => {
    const template = invoiceTemplates.find(t => t.id === templateId)
    if (template) {
      setTemplateToPreview(template)
      setIsPreviewModalOpen(true)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-12">
        {/* Header skeleton */}
        <div className="space-y-6">
          <div className="h-16 bg-gradient-to-r from-indigo-100 via-purple-100 to-violet-100 rounded-[2.5rem] animate-pulse w-1/2"></div>
          <div className="h-8 bg-gradient-to-r from-indigo-100 via-purple-100 to-violet-100 rounded-[1.5rem] animate-pulse w-1/3"></div>
        </div>

        {/* Templates skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="h-[32rem] bg-gradient-to-br from-white/60 to-indigo-50/60 rounded-[2.5rem] shadow-xl border border-white/40 animate-pulse backdrop-blur-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12 relative">
      {/* Ultra-subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      {/* Enhanced Header */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-violet-50 rounded-[2.5rem] backdrop-blur-3xl"></div>
        <div className="relative p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-[1.5rem] flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Layout className="h-8 w-8 text-white" />
                </motion.div>
        <div>
                  <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
                    Invoice Templates
                  </h1>
                  <p className="text-slate-600 mt-2 text-xl font-bold">
            Choose from professionally designed templates to create stunning invoices
          </p>
        </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3 mt-6 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-3xl rounded-[1.5rem] p-2 border border-white/40 shadow-lg">
          <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
                  className={`rounded-[1rem] transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
          >
            <Grid3X3 className="h-5 w-5" />
          </Button>
          <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
                  className={`rounded-[1rem] transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
          >
            <List className="h-5 w-5" />
          </Button>
              </div>
            </motion.div>
        </div>
      </div>
      </motion.div>

      {/* Enhanced Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/40 backdrop-blur-3xl border-white/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="p-10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search templates by name, category, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/60 border-white/40 rounded-[1.5rem] text-lg placeholder:text-slate-400 focus:bg-white/90 transition-all duration-300 shadow-lg focus:shadow-xl font-medium"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {templateCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-[1.25rem] transition-all duration-300 font-bold shadow-lg hover:shadow-xl ${selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl' 
                    : 'border-white/40 bg-white/60 hover:bg-white/80 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
          <div className="text-sm font-bold text-slate-700">
            Showing <span className="text-indigo-600 font-black">{filteredTemplates.length}</span> of <span className="text-indigo-600 font-black">{invoiceTemplates.length}</span> templates
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center px-4 py-2 rounded-[1rem] bg-amber-50 text-amber-700 shadow-lg border border-amber-200">
              <Crown className="h-4 w-4 mr-2" />
              <span className="font-bold">{invoiceTemplates.filter(t => t.isPremium).length}</span> Premium
            </div>
            <div className="flex items-center px-4 py-2 rounded-[1rem] bg-indigo-50 text-indigo-700 shadow-lg border border-indigo-200">
              <Layers className="h-4 w-4 mr-2" />
              <span className="font-bold">{invoiceTemplates.filter(t => t.isPopular).length}</span> Popular
            </div>
            </div>
          </div>
        </div>
      </Card>
      </motion.div>

      {/* Enhanced Templates Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12' 
              : 'space-y-10'
          }
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={`template-card-${template.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={viewMode === 'grid' ? '' : 'max-w-none'}
            >
              <Card className="group relative bg-white/40 backdrop-blur-3xl border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden rounded-[2.5rem] hover:rounded-[3rem] hover:scale-[1.03] hover:bg-white/60">
                {/* Enhanced Template Preview */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-white via-slate-50/50 to-white overflow-hidden">
                  {/* Sophisticated background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className={`absolute inset-0 ${colorSchemes[template.color as keyof typeof colorSchemes]}`}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5"></div>
                  </div>
                  
                  {/* Perfect Template Preview Container - Optimized Size and Coverage */}
                  <div className="absolute inset-0 p-4">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-white/70 relative group-hover:shadow-3xl transition-all duration-500 flex items-center justify-center">
                      <LargeTemplatePreview 
                        key={`large-preview-${template.id}`}
                        templateId={template.id} 
                        className="w-full h-full" 
                      />
                    </div>
                  </div>

                  {/* Ultra-Modern Overlay Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex flex-col space-y-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                    <Button
                          size="lg"
                      variant="outline"
                          className="bg-white/95 backdrop-blur-3xl text-slate-900 border-white/80 hover:bg-white hover:border-white rounded-[1.5rem] shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold px-8 py-4 text-lg"
                      onClick={() => handlePreviewTemplate(template.id)}
                    >
                          <Eye className="h-6 w-6 mr-3" />
                      Preview
                    </Button>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                    <Button
                          size="lg"
                          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white rounded-[1.5rem] shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold px-8 py-4 text-lg"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                          <Rocket className="h-6 w-6 mr-3" />
                      Use Template
                    </Button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Ultra-Modern Badges */}
                  <div className="absolute top-6 left-6 flex flex-col space-y-3 z-10">
                    {template.isPopular && (
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      >
                        <Badge className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 text-white text-sm rounded-[1rem] shadow-2xl backdrop-blur-xl border border-white/30 px-5 py-2.5 font-bold">
                          <Layers className="h-4 w-4 mr-2 animate-pulse" />
                        Popular
                      </Badge>
                      </motion.div>
                    )}
                    {template.isPremium && (
                      <motion.div
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                      >
                        <Badge className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white text-sm rounded-[1rem] shadow-2xl backdrop-blur-xl border border-white/30 px-5 py-2.5 font-bold">
                          <Crown className="h-4 w-4 mr-2 animate-bounce" />
                        Premium
                      </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Ultra-Modern Favorite Button */}
                  <motion.button
                    onClick={() => toggleFavorite(template.id)}
                    className="absolute top-8 right-8 p-4 bg-white/95 backdrop-blur-3xl rounded-[1.5rem] shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/60 z-10"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.85 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                  >
                    <Heart 
                      className={`h-5 w-5 transition-all duration-300 ${
                        favoriteTemplates.includes(template.id) 
                          ? 'text-red-500 fill-current drop-shadow-lg' 
                          : 'text-slate-400 hover:text-red-400 hover:scale-110'
                      }`} 
                    />
                  </motion.button>
                </div>

                {/* Ultra-Modern Template Info */}
                <div className="p-10 bg-gradient-to-br from-white/60 via-white/80 to-white/70 backdrop-blur-3xl border-t border-white/50">
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent leading-tight">
                        {template.name}
                      </h3>
                      <p className="text-slate-600 leading-relaxed font-bold text-lg">
                        {template.description}
                      </p>
                  </div>

                    {/* Elegant Features */}
                    <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                        >
                      <Badge 
                        variant="outline"
                            className="text-sm border-white/50 bg-white/70 backdrop-blur-3xl text-slate-700 font-bold px-4 py-2 rounded-[0.75rem] hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {feature}
                      </Badge>
                        </motion.div>
                    ))}
                  </div>

                    {/* Sophisticated Actions */}
                    <div className="flex items-center space-x-3 pt-2">
                      <motion.div 
                        className="flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                    <Button
                          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 text-white rounded-[1.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 font-black py-4 text-lg"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                          <Rocket className="h-6 w-6 mr-3" />
                      Use Template
                    </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                    <Button
                      variant="outline"
                          size="lg"
                          className="border-white/50 bg-white/70 backdrop-blur-3xl hover:bg-white/90 hover:border-white/70 rounded-[1.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
                    >
                          <Copy className="h-6 w-6 text-slate-600" />
                    </Button>
                      </motion.div>
                  </div>
                  </motion.div>
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
          className="text-center py-20"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
            <FileText className="h-12 w-12 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-4">No templates found</h3>
          <p className="text-slate-600 mb-8 text-lg font-medium">
            Try adjusting your search or filter criteria.
          </p>
          <Button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            variant="outline"
            className="border-indigo-200 hover:border-indigo-300 rounded-[1.5rem] px-8 py-3 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
      </motion.div>

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        isOpen={isPreviewModalOpen && templateToPreview !== null}
        onClose={() => {
          setIsPreviewModalOpen(false)
          setTemplateToPreview(null)
        }}
        template={templateToPreview}
      />
    </div>
  )
} 
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
  Star,
  Heart,
  Copy,
  Check,
  Sparkles,
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

// Import template components for previews
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
import { generateSampleData } from '@/lib/sample-invoice-data'

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
}

// Perfect Template Thumbnail Preview - Large & Clear Display
function TemplatePreview({ templateId }: { templateId: string }) {
  const TemplateComponent = templateComponents[templateId as keyof typeof templateComponents]
  if (!TemplateComponent) return null
  
  const sampleData = generateSampleData(templateId)
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      {/* Large scaling for maximum visibility and clarity */}
      <div 
        className="origin-top-left absolute"
        style={{ 
          transform: 'scale(0.45)', 
          width: '222%', 
          height: '222%',
          top: '0px',
          left: '0px'
        }}
      >
        {/* Optimized container for large, clear thumbnail display */}
        <div 
          className="bg-white shadow-sm"
          style={{
            width: '600px',    // Reduced width for better fit
            height: '800px',   // Reduced height for better aspect ratio
            minWidth: '600px',
            minHeight: '800px',
            padding: '0'
          }}
        >
          <div className="w-full h-full overflow-hidden">
            <TemplateComponent data={sampleData} isPreview={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Template data with different categories and styles
const templateCategories = [
  { id: 'all', name: 'All Templates', icon: Layout },
  { id: 'modern', name: 'Modern', icon: Sparkles },
  { id: 'classic', name: 'Classic', icon: FileText },
  { id: 'minimal', name: 'Minimal', icon: Zap },
  { id: 'corporate', name: 'Corporate', icon: Building2 },
  { id: 'creative', name: 'Creative', icon: Palette }
]

const invoiceTemplates = [
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
  }
]

const colorSchemes = {
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  gray: 'bg-slate-50 border-slate-200 text-slate-700',
  navy: 'bg-blue-900 border-blue-800 text-blue-100',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
  green: 'bg-green-50 border-green-200 text-green-700',
  orange: 'bg-orange-50 border-orange-200 text-orange-700',
  black: 'bg-slate-900 border-slate-700 text-slate-100',
  red: 'bg-red-50 border-red-200 text-red-700',
  teal: 'bg-teal-50 border-teal-200 text-teal-700',
  brown: 'bg-amber-50 border-amber-200 text-amber-700'
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
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-3xl animate-pulse w-1/2"></div>
          <div className="h-6 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-2xl animate-pulse w-1/3"></div>
        </div>

        {/* Templates skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="h-96 bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-sm border border-slate-200 animate-pulse"
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
    <div className="space-y-8 relative">
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 rounded-3xl"></div>
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Layout className="h-6 w-6 text-white" />
                </div>
        <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-violet-900 bg-clip-text text-transparent">
                    Invoice Templates
                  </h1>
                  <p className="text-slate-600 mt-1 text-lg">
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
              <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
          <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
                  className={`rounded-xl transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
                  className={`rounded-xl transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
          >
            <List className="h-4 w-4" />
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
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl rounded-3xl overflow-hidden">
          <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search templates by name, category, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white/50 border-white/20 rounded-2xl text-lg placeholder:text-slate-400 focus:bg-white/80 transition-all duration-300"
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
                  className={`rounded-2xl transition-all duration-300 ${selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg' 
                    : 'border-white/20 bg-white/50 hover:bg-white/70 text-slate-600 hover:text-slate-900'
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
          <div className="text-sm font-medium text-slate-700">
            Showing <span className="text-purple-600 font-bold">{filteredTemplates.length}</span> of <span className="text-purple-600 font-bold">{invoiceTemplates.length}</span> templates
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700">
              <Crown className="h-4 w-4 mr-1" />
              <span className="font-medium">{invoiceTemplates.filter(t => t.isPremium).length}</span> Premium
            </div>
            <div className="flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700">
              <Star className="h-4 w-4 mr-1" />
              <span className="font-medium">{invoiceTemplates.filter(t => t.isPopular).length}</span> Popular
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
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10' 
              : 'space-y-8'
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
              <Card className="group relative bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden rounded-[2rem] hover:rounded-[2.5rem] hover:scale-[1.02] hover:bg-white/90">
                {/* Enhanced Template Preview */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-white via-slate-50/50 to-white overflow-hidden">
                  {/* Sophisticated background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className={`absolute inset-0 ${colorSchemes[template.color as keyof typeof colorSchemes]}`}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5"></div>
                  </div>
                  
                  {/* Perfect Template Preview Container */}
                  <div className="absolute inset-0 p-6">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-white shadow-2xl border border-white/60 relative group-hover:shadow-3xl transition-all duration-500">
                      <TemplatePreview templateId={template.id} />
                    </div>
                  </div>

                  {/* Ultra-Modern Overlay Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                    <div className="flex flex-col space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
                          className="bg-white/95 backdrop-blur-xl text-slate-900 border-white/70 hover:bg-white hover:border-white rounded-[1.5rem] shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold px-6 py-3"
                      onClick={() => handlePreviewTemplate(template.id)}
                    >
                          <Eye className="h-5 w-5 mr-3" />
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
                          className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 text-white rounded-[1.5rem] shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold px-6 py-3"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                          <Edit3 className="h-5 w-5 mr-3" />
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
                        <Badge className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-sm rounded-full shadow-2xl backdrop-blur-xl border border-white/20 px-4 py-2 font-semibold">
                          <Star className="h-4 w-4 mr-2 animate-pulse" />
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
                        <Badge className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white text-sm rounded-full shadow-2xl backdrop-blur-xl border border-white/20 px-4 py-2 font-semibold">
                          <Crown className="h-4 w-4 mr-2 animate-bounce" />
                        Premium
                      </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Ultra-Modern Favorite Button */}
                  <motion.button
                    onClick={() => toggleFavorite(template.id)}
                    className="absolute top-6 right-6 p-4 bg-white/95 backdrop-blur-xl rounded-[1.25rem] shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 z-10"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
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
                <div className="p-8 bg-gradient-to-br from-white/50 via-white/80 to-white/60 backdrop-blur-sm border-t border-white/40">
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
                        {template.name}
                      </h3>
                      <p className="text-slate-600 leading-relaxed font-medium">
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
                            className="text-sm border-white/40 bg-white/60 backdrop-blur-sm text-slate-700 font-medium px-3 py-1.5 rounded-full hover:bg-white/80 transition-all duration-300"
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
                          className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 text-white rounded-[1.25rem] shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-3"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                          <Edit3 className="h-5 w-5 mr-3" />
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
                          className="border-white/40 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:border-white/60 rounded-[1.25rem] shadow-lg hover:shadow-xl transition-all duration-300 p-3"
                    >
                          <Copy className="h-5 w-5 text-slate-600" />
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
          className="text-center py-12"
        >
          <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No templates found</h3>
          <p className="text-slate-600 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <Button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            variant="outline"
            className="border-slate-200 hover:border-slate-300"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
      </motion.div>

      {/* Template Preview Modal */}
      {templateToPreview && (
        <TemplatePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => {
            setIsPreviewModalOpen(false)
            setTemplateToPreview(null)
          }}
          template={templateToPreview}
        />
      )}
    </div>
  )
} 
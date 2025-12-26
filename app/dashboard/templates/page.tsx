'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { 
  Search, 
  Grid3X3, 
  Eye, 
  Rocket,
  Crown,
  Zap,
  Building2,
  Palette,
  Layout,
  Sparkles,
  Heart,
  Layers,
  List,
  Copy,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog'
import { TEMPLATE_REGISTRY, getTemplatesByCategory, type TemplateConfig } from '@/components/templates/template-registry'
import { TemplateRenderer } from '@/components/templates/template-mapper'
import type { InvoiceData } from '@/components/templates/template-utils'

// Sample invoice data for previews
const sampleInvoiceData: InvoiceData = {
  invoiceNumber: 'INV-2025-001',
  date: '2025-01-24',
  dueDate: '2025-02-24',
  currency: 'USD',
  company: {
    name: 'Your Company',
    address: '123 Business Street',
    city: 'San Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    email: 'hello@yourcompany.com',
  },
  client: {
    name: 'Client Name',
    address: '456 Client Ave',
    city: 'New York, NY 10001',
    email: 'client@example.com',
  },
  items: [
    { description: 'Professional Services', quantity: 40, rate: 150, amount: 6000 },
    { description: 'Consulting Hours', quantity: 10, rate: 200, amount: 2000 },
  ],
  subtotal: 8000,
  tax: 720,
  total: 8720,
  notes: 'Thank you for your business!',
}

const templateCategories = [
  { id: 'all', name: 'All Templates', icon: Layout },
  { id: 'minimalist', name: 'Minimalist', icon: Zap },
  { id: 'corporate', name: 'Corporate', icon: Building2 },
  { id: 'modern', name: 'Modern', icon: Rocket },
  { id: 'creative', name: 'Creative', icon: Palette },
  { id: 'premium', name: 'Premium', icon: Crown },
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
    category: 'corporate',
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
    category: 'corporate',
    description: 'Elegant classic design with warm brown tones',
    color: 'brown',
    isPremium: true,
    isPopular: true,
    features: ['Elegant Style', 'Brown Tones', 'Classic Beauty'],
    preview: '/templates/classic-brown.jpg'
  },
  
  // Modern Professional Templates (11-15)
  {
    id: 'modern-edge',
    name: 'Modern Edge',
    category: 'modern',
    description: 'Sharp lines with tech-forward design and clean typography',
    color: 'slate',
    isPremium: false,
    isPopular: true,
    features: ['Sharp Lines', 'Tech Forward', 'Clean Typography', 'Modern Layout'],
    preview: '/templates/modern-edge.jpg'
  },
  {
    id: 'tech-slate',
    name: 'Tech Slate',
    category: 'modern',
    description: 'Silicon Valley aesthetic with startup-ready modern design',
    color: 'indigo',
    isPremium: false,
    isPopular: true,
    features: ['Silicon Valley Style', 'Startup Ready', 'Modern Design', 'Tech Aesthetic'],
    preview: '/templates/tech-slate.jpg'
  },
  {
    id: 'digital-clean',
    name: 'Digital Clean',
    category: 'modern',
    description: 'Crisp digital-first design with purple accents',
    color: 'purple',
    isPremium: true,
    isPopular: false,
    features: ['Digital First', 'Purple Accents', 'Crisp Design', 'Modern Typography'],
    preview: '/templates/digital-clean.jpg'
  },
  {
    id: 'smart-grid',
    name: 'Smart Grid',
    category: 'modern',
    description: 'Geometric precision with designer-favorite layout',
    color: 'cyan',
    isPremium: false,
    isPopular: true,
    features: ['Geometric Precision', 'Grid Layout', 'Designer Favorite', 'Modern'],
    preview: '/templates/smart-grid.jpg'
  },
  {
    id: 'future-forward',
    name: 'Future Forward',
    category: 'modern',
    description: 'Tomorrow\'s invoice today with amber accents',
    color: 'amber',
    isPremium: true,
    isPopular: true,
    features: ['Futuristic', 'Amber Accents', 'Innovation Ready', 'Modern'],
    preview: '/templates/future-forward.jpg'
  },
  
  // Creative Professional Templates (16-20)
  {
    id: 'vibrant-voice',
    name: 'Vibrant Voice',
    category: 'creative',
    description: 'Energetic red design that stands out boldly',
    color: 'red',
    isPremium: false,
    isPopular: true,
    features: ['Energetic Red', 'Bold Design', 'Stand Out', 'Creative Typography'],
    preview: '/templates/vibrant-voice.jpg'
  },
  {
    id: 'indigo-wave',
    name: 'Indigo Wave',
    category: 'creative',
    description: 'Deep indigo with creatively professional design',
    color: 'indigo',
    isPremium: true,
    isPopular: false,
    features: ['Deep Indigo', 'Creative Pro', 'Wave Design', 'Modern'],
    preview: '/templates/indigo-wave.jpg'
  },
  {
    id: 'simple-line',
    name: 'Simple Line',
    category: 'minimalist',
    description: 'Single accent line with pure simplicity',
    color: 'blue',
    isPremium: false,
    isPopular: true,
    features: ['Single Line Accent', 'Pure Simplicity', 'Minimal Design', 'Clean'],
    preview: '/templates/simple-line.jpg'
  },
  {
    id: 'light-touch',
    name: 'Light Touch',
    category: 'minimalist',
    description: 'Barely there design that lets content speak',
    color: 'gray',
    isPremium: false,
    isPopular: false,
    features: ['Barely There', 'Content First', 'Light Design', 'Minimal'],
    preview: '/templates/light-touch.jpg'
  },
  {
    id: 'zen-invoice',
    name: 'Zen Invoice',
    category: 'minimalist',
    description: 'Calm, balanced, and professional design',
    color: 'slate',
    isPremium: false,
    isPopular: true,
    features: ['Calm Design', 'Balanced', 'Professional', 'Zen Aesthetic'],
    preview: '/templates/zen-invoice.jpg'
  },
  
  // Premium Elite Templates (21-25)
  {
    id: 'platinum-pro',
    name: 'Platinum Pro',
    category: 'premium',
    description: 'Refined silver with luxury service appeal',
    color: 'zinc',
    isPremium: true,
    isPopular: true,
    features: ['Refined Silver', 'Luxury Service', 'Premium Quality', 'Elite'],
    preview: '/templates/platinum-pro.jpg'
  },
  {
    id: 'gold-standard',
    name: 'Gold Standard',
    category: 'premium',
    description: 'Elegant gold accent with premium quality',
    color: 'amber',
    isPremium: true,
    isPopular: true,
    features: ['Gold Accent', 'Premium Quality', 'Elegant', 'Luxury'],
    preview: '/templates/gold-standard.jpg'
  },
  {
    id: 'black-elite',
    name: 'Black Elite',
    category: 'premium',
    description: 'Pure black sophistication for elite tier',
    color: 'black',
    isPremium: true,
    isPopular: true,
    features: ['Black Sophistication', 'Elite Tier', 'Pure Design', 'Premium'],
    preview: '/templates/black-elite.jpg'
  },
  {
    id: 'executive-black',
    name: 'Executive Black',
    category: 'premium',
    description: 'Commanding presence with VIP treatment',
    color: 'black',
    isPremium: true,
    isPopular: false,
    features: ['Commanding', 'VIP Treatment', 'Executive', 'Premium'],
    preview: '/templates/executive-black.jpg'
  },
  {
    id: 'refined-charcoal',
    name: 'Refined Charcoal',
    category: 'premium',
    description: 'Sophisticated gray palette with high-end appeal',
    color: 'zinc',
    isPremium: true,
    isPopular: false,
    features: ['Sophisticated Gray', 'High-End', 'Refined', 'Premium'],
    preview: '/templates/refined-charcoal.jpg'
  }
]

const colorSchemes = {
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  gray: 'bg-slate-50 border-slate-200 text-slate-700',
  navy: 'bg-blue-900 border-blue-800 text-blue-100',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
  green: 'bg-green-50 border-green-200 text-green-700',
  orange: 'bg-orange-50 border-orange-200 text-orange-700',
  black: 'bg-black border-zinc-800 text-white',
  red: 'bg-red-50 border-red-200 text-red-700',
  teal: 'bg-teal-50 border-teal-200 text-teal-700',
  brown: 'bg-amber-50 border-amber-200 text-amber-700',
  slate: 'bg-slate-50 border-slate-200 text-slate-700',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  amber: 'bg-amber-50 border-amber-200 text-amber-700',
  zinc: 'bg-zinc-50 border-zinc-200 text-zinc-700'
}

// Template Preview Modal Component
interface TemplatePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  template: any
}

function TemplatePreviewModal({ isOpen, onClose, template }: TemplatePreviewModalProps) {
  if (!template) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{template.name}</DialogTitle>
          <DialogDescription className="text-base">
            {template.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Template Features */}
          <div className="flex flex-wrap gap-2">
            {template.features?.map((feature: string, index: number) => (
              <Badge key={index} variant="secondary">
                {feature}
              </Badge>
            ))}
            {template.isPremium && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>

          {/* Template Preview */}
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <div className="p-4 bg-white">
              <div className="text-sm text-gray-500 mb-2">Template Preview</div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center space-y-2">
                  <FileText className="w-16 h-16 mx-auto text-gray-400" />
                  <p className="text-gray-600 font-medium">{template.name}</p>
                  <p className="text-sm text-gray-500">Category: {template.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              Use This Template
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
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
                      <TemplateRenderer 
                        key={`large-preview-${template.id}`}
                        templateId={template.id} 
                        data={sampleInvoiceData}
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
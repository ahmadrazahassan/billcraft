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
  Star,
  Heart,
  Copy,
  Check,
  Sparkles,
  Crown,
  Zap,
  Building2,
  Palette,
  Layout,
  ArrowRight,
  Download
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

// Import template components
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

// Enhanced Template Preview Component - Large & Clear Display
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional Invoice Templates
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose from our collection of beautifully designed invoice templates. 
              Each one crafted to make your business look professional and trustworthy.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{invoiceTemplates.length}</div>
                <div>Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{invoiceTemplates.filter(t => t.isPopular).length}</div>
                <div>Popular</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{invoiceTemplates.filter(t => t.isPremium).length}</div>
                <div>Premium</div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-6 bg-background border-border">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
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
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {category.name}
                      </Button>
                    )
                  })}
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredTemplates.length} of {invoiceTemplates.length} templates
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Crown className="h-4 w-4 mr-1 text-amber-500" />
                    {invoiceTemplates.filter(t => t.isPremium).length} Premium
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-blue-500" />
                    {invoiceTemplates.filter(t => t.isPopular).length} Popular
                  </div>
                </div>
              </div>
            </Card>
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
                  <Card className="bg-background border-border hover:shadow-lg transition-all duration-300 group overflow-hidden">
                    {/* Template Preview */}
                    <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                      <div className={`absolute inset-0 ${colorSchemes[template.color as keyof typeof colorSchemes]} opacity-10`}></div>
                      
                      {/* Enhanced Template Preview Container */}
                      <div className="absolute inset-0 p-3">
                        <div className="w-full h-full rounded-lg overflow-hidden bg-white shadow-sm border border-white/60 relative">
                          <TemplatePreview templateId={template.id} />
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

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-1">
                        {template.isPopular && (
                          <Badge className="bg-blue-500 text-white text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {template.isPremium && (
                          <Badge className="bg-amber-500 text-white text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(template.id)}
                        className="absolute top-3 right-3 p-2 bg-background rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favoriteTemplates.includes(template.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-muted-foreground'
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

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.features.map((feature, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          className="flex-1"
                          onClick={() => handleUseTemplate(template.id)}
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          {user ? 'Use Template' : 'Get Started'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyTemplate(template.id)}
                        >
                          <Copy className="h-4 w-4" />
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
            className="text-center mt-16 mb-8"
          >
            <Card className="p-8 bg-muted/50 border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Create Professional Invoices?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Join thousands of businesses using BillCraft to create stunning invoices 
                and get paid faster.
              </p>
              <div className="flex items-center justify-center space-x-4">
                {!user && (
                  <>
                    <Button asChild size="lg">
                      <Link href="/auth/signup">
                        Get Started Free
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/auth/login">
                        Sign In
                      </Link>
                    </Button>
                  </>
                )}
                {user && (
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </Card>
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
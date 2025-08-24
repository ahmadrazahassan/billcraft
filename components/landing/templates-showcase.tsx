'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Crown, Eye, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
}

const featuredTemplates = [
  {
    id: 'modern-blue',
    name: 'Modern Professional',
    description: 'Clean and contemporary design with blue accents',
    color: 'blue',
    isPremium: false,
    isPopular: true,
    preview: 'Modern, clean layout perfect for tech companies and startups'
  },
  {
    id: 'corporate-navy',
    name: 'Corporate Elite',
    description: 'Professional corporate design with navy blue theme',
    color: 'navy',
    isPremium: true,
    isPopular: true,
    preview: 'Executive-level design for established businesses'
  },
  {
    id: 'creative-purple',
    name: 'Creative Studio',
    description: 'Creative design perfect for agencies and studios',
    color: 'purple',
    isPremium: true,
    isPopular: false,
    preview: 'Artistic and vibrant for creative professionals'
  },
  {
    id: 'classic-brown',
    name: 'Classic Elegance',
    description: 'Elegant classic design with warm brown tones',
    color: 'brown',
    isPremium: true,
    isPopular: true,
    preview: 'Timeless elegance for traditional businesses'
  }
]

const colorSchemes = {
  blue: 'from-blue-50 to-blue-100 border-blue-200',
  navy: 'from-slate-800 to-slate-900 border-slate-700',
  purple: 'from-purple-50 to-purple-100 border-purple-200',
  brown: 'from-amber-50 to-amber-100 border-amber-200'
}

export function TemplatesShowcase() {
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handlePreviewTemplate = (template: any) => {
    setPreviewTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleUseTemplate = (templateId: string) => {
    if (user) {
      router.push(`/dashboard/invoices/create?template=${templateId}`)
      toast({
        title: "Template Selected!",
        description: "Redirecting to create invoice with your selected template.",
      })
    } else {
      router.push('/auth/signup')
      toast({
        title: "Sign up to Continue",
        description: "Create an account to use this template.",
      })
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Invoice Templates
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose from our collection of beautifully designed templates. 
            Each one crafted to make your business look professional and trustworthy.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10+</div>
              <div>Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">5+</div>
              <div>Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div>Customizable</div>
            </div>
          </div>
        </motion.div>

        {/* Featured Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border bg-background">
                {/* Enhanced Template Preview with Optimal Scaling */}
                <div className={`relative bg-gradient-to-br ${colorSchemes[template.color as keyof typeof colorSchemes]} border-b overflow-hidden`}>
                  {/* Professional Template Preview - Much Larger and Clearer */}
                  <div className="h-full overflow-hidden p-3">
                    <MediumTemplatePreview templateId={template.id} className="rounded-lg shadow-lg" />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-background text-foreground border-background hover:bg-muted"
                      onClick={() => handlePreviewTemplate(template)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Use
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {template.isPopular && (
                      <Badge className="bg-blue-500 text-white text-xs">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
                        Popular
                      </Badge>
                    )}
                    {template.isPremium && (
                      <Badge className="bg-amber-500 text-white text-xs">
                        <Crown className="h-2 w-2 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <p className="text-xs text-muted-foreground italic">{template.preview}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="btn-primary">
            <Link href="/templates">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            10+ professional templates • All customizable • No design skills required
          </p>

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
        </motion.div>
      </div>
    </section>
  )
} 
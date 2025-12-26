'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Eye, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TemplatePreviewModal } from '@/components/templates/template-preview-modal'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { MediumTemplatePreview } from '@/components/templates/optimized-template-preview'

const featuredTemplates = [
  {
    id: 'ghost-white',
    name: 'Ghost White',
    description: 'Invisible design. Maximum impact. Stripe-level minimalism.',
    category: 'Ultra-Minimal',
    color: 'white',
    isPremium: false,
    isPopular: true,
    preview: 'Perfect for SaaS and tech startups'
  },
  {
    id: 'neon-edge',
    name: 'Neon Edge',
    description: 'Cyberpunk vibes. Electric blue accents. Future-ready.',
    category: 'Modern-Tech',
    color: 'cyan',
    isPremium: true,
    isPopular: true,
    preview: 'Stand out with cutting-edge design'
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm sunset vibes. Bold orange energy. Eye-catching.',
    category: 'Creative-Bold',
    color: 'orange',
    isPremium: false,
    isPopular: true,
    preview: 'Perfect for creative agencies'
  },
  {
    id: 'diamond-black',
    name: 'Diamond Black',
    description: 'Pure luxury. Black diamond elegance. VIP treatment.',
    category: 'Luxury-Premium',
    color: 'black',
    isPremium: true,
    isPopular: true,
    preview: 'Executive-level sophistication'
  },
  {
    id: 'executive-navy',
    name: 'Executive Navy',
    description: 'Navy blue authority. C-suite approved. Fortune 500.',
    category: 'Corporate-Pro',
    color: 'navy',
    isPremium: false,
    isPopular: true,
    preview: 'Professional corporate excellence'
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Cyberpunk future. Neon lights. Matrix-inspired.',
    category: 'Futuristic',
    color: 'cyan',
    isPremium: true,
    isPopular: true,
    preview: 'Next-generation design'
  },
  {
    id: 'silicon-valley',
    name: 'Silicon Valley',
    description: 'Startup DNA. VC-approved. Y Combinator aesthetic.',
    category: 'Modern-Tech',
    color: 'indigo',
    isPremium: false,
    isPopular: true,
    preview: 'Built for startups'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    description: 'Elegant rose gold. Feminine luxury. Instagram aesthetic.',
    category: 'Luxury-Premium',
    color: 'pink',
    isPremium: true,
    isPopular: true,
    preview: 'Elegant and sophisticated'
  },
  {
    id: 'emerald-city',
    name: 'Emerald City',
    description: 'Rich emerald green. Nature meets modern. Eco-friendly.',
    category: 'Creative-Bold',
    color: 'emerald',
    isPremium: false,
    isPopular: false,
    preview: 'Fresh and sustainable'
  },
  {
    id: 'mono-line',
    name: 'Mono Line',
    description: 'Single accent line. Pure monochrome elegance.',
    category: 'Ultra-Minimal',
    color: 'gray',
    isPremium: false,
    isPopular: true,
    preview: 'Swiss design perfection'
  },
  {
    id: 'electric-purple',
    name: 'Electric Purple',
    description: 'Vibrant purple power. Creative confidence. Agency-grade.',
    category: 'Creative-Bold',
    color: 'purple',
    isPremium: false,
    isPopular: true,
    preview: 'Bold creative energy'
  },
  {
    id: 'boardroom-gray',
    name: 'Boardroom Gray',
    description: 'Sophisticated gray. Meeting room ready. Enterprise-grade.',
    category: 'Corporate-Pro',
    color: 'gray',
    isPremium: false,
    isPopular: true,
    preview: 'Professional excellence'
  }
]

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
    <section className="py-20 md:py-24 lg:py-28 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto container-padding max-w-[1600px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-border/50 text-foreground text-xs font-semibold mb-8 shadow-sm">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
            Professional Templates
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Beautiful Invoice Templates
            <br />
            <span className="text-primary">Ready in Seconds</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Choose from our collection of professionally designed templates.
            Each one crafted to make your business look polished and trustworthy.
          </p>

          {/* Stats Grid - Ultra Compact & Modern */}
          <div className="flex items-center justify-center gap-3 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-border/50 rounded-full px-5 py-3 hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-2xl font-bold text-foreground">30+</div>
                <div className="text-xs text-muted-foreground font-medium whitespace-nowrap">Templates</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-border/50 rounded-full px-5 py-3 hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-2xl font-bold text-foreground">6+</div>
                <div className="text-xs text-muted-foreground font-medium whitespace-nowrap">Categories</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-border/50 rounded-full px-5 py-3 hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground font-medium whitespace-nowrap">Customizable</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Templates Grid - Compact & Professional */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden border-2 border-border hover:border-primary/40 bg-card rounded-[1.5rem] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Compact Template Preview Container - Top-Left Aligned */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/10 to-muted/30">
                  {/* Template Preview - Perfectly Positioned Top-Left */}
                  <div className="absolute inset-0 flex items-start justify-start p-3">
                    <div className="w-full h-full">
                      <MediumTemplatePreview
                        templateId={template.id}
                        className="w-full h-full rounded-xl shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Compact Hover Overlay */}
                  <div className="absolute inset-0 bg-foreground/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                    <div className="text-center mb-1">
                      <h4 className="text-white font-bold text-base mb-1">{template.name}</h4>
                      <p className="text-white/85 text-xs">{template.preview}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white text-foreground border-white hover:bg-white/90 rounded-xl font-medium text-xs"
                        onClick={() => handlePreviewTemplate(template)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl font-medium text-xs"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                        Use
                      </Button>
                    </div>
                  </div>

                  {/* Compact Status Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {template.isPopular && (
                      <Badge className="bg-primary text-white text-xs font-bold rounded-full px-2.5 py-0.5 shadow-lg">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></div>
                        Popular
                      </Badge>
                    )}
                    {template.isPremium && (
                      <Badge className="bg-accent text-white text-xs font-bold rounded-full px-2.5 py-0.5 shadow-lg">
                        <Star className="h-3 w-3 mr-1 fill-white" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Compact Template Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-bold text-foreground text-base mb-1 line-clamp-1">{template.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{template.description}</p>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full text-xs font-medium border-border/50 px-2.5 py-0.5">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section - Ultra Compact & Modern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-5 p-6 md:p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-border/50 rounded-[2rem] max-w-xl mx-auto hover:shadow-xl transition-all duration-300 hover:border-primary/40">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Explore All Templates
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Discover 30+ professionally designed templates
              </p>
            </div>

            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all font-semibold hover:scale-105">
              <Link href="/templates" className="flex items-center gap-2">
                View All Templates
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 bg-muted/30 rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span className="font-medium">Fully customizable</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/30 rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span className="font-medium">No design skills needed</span>
              </div>
            </div>
          </div>
        </motion.div>

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
      </div>
    </section>
  )
} 
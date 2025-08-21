'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Edit3, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  X,
  FileText,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { InvoiceData, generateSampleData } from '@/lib/sample-invoice-data'
import { useToast } from '@/hooks/use-toast'

// Import template components
import { MinimalWhiteTemplate } from './minimal-white'
import { CreativePurpleTemplate } from './creative-purple'
import { MinimalBlackTemplate } from './minimal-black'
import { ModernBlueTemplate } from './modern-blue'
import { CorporateNavyTemplate } from './corporate-navy'
import { ClassicGreenTemplate } from './classic-green'
import { ModernOrangeTemplate } from './modern-orange'
import { CorporateRedTemplate } from './corporate-red'
import { CreativeTealTemplate } from './creative-teal'
import { ClassicBrownTemplate } from './classic-brown'
import { GradientSunsetTemplate } from './gradient-sunset'
import { NeonCyberTemplate } from './neon-cyber'
import { ElegantRoseGoldTemplate } from './elegant-rose-gold'
import { DarkProfessionalTemplate } from './dark-professional'
import { OceanWaveTemplate } from './ocean-wave'
import { ForestGreenTemplate } from './forest-green'
import { CoralModernTemplate } from './coral-modern'
import { PlatinumEliteTemplate } from './platinum-elite'
import { VibrantRainbowTemplate } from './vibrant-rainbow'
import { MinimalGlassTemplate } from './minimal-glass'
import { ElectricBlueTemplate } from './electric-blue'
import { GoldenLuxuryTemplate } from './golden-luxury'
import { PinkCreativeTemplate } from './pink-creative'
import { EmeraldCorporateTemplate } from './emerald-corporate'
import { SilverTechTemplate } from './silver-tech'

interface TemplatePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  template: {
    id: string
    name: string
    description: string
    isPremium: boolean
    isPopular: boolean
    category: string
  }
}

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

export function TemplatePreviewModal({ isOpen, onClose, template }: TemplatePreviewModalProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [copied, setCopied] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const TemplateComponent = templateComponents[template.id as keyof typeof templateComponents]
  const sampleData = generateSampleData(template.id)

  const handleUseTemplate = () => {
    try {
      if (user) {
        // User is logged in, go to dashboard with template data
        console.log('Redirecting to:', `/dashboard/invoices/create?template=${template.id}`)
        router.push(`/dashboard/invoices/create?template=${template.id}`)
        toast({
          title: "Redirecting...",
          description: `Taking you to create invoice with ${template.name} template.`,
        })
        onClose()
      } else {
        // User not logged in, redirect to signup
        console.log('Redirecting to signup')
        router.push('/auth/signup')
        toast({
          title: "Sign up Required",
          description: "Please sign up to use this template.",
        })
        onClose()
      }
    } catch (error) {
      console.error('Error redirecting:', error)
      toast({
        title: "Redirect Failed",
        description: "Could not redirect. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      // Import libraries dynamically for high-quality PDF generation
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default
      
      if (!TemplateComponent) {
        throw new Error('Template component not found')
      }

      // Create a temporary container to render the template at full size
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '0'
      tempContainer.style.width = '794px' // A4 width at 96 DPI
      tempContainer.style.backgroundColor = 'white'
      tempContainer.style.padding = '20px'
      tempContainer.setAttribute('data-temp-template', 'true')
      document.body.appendChild(tempContainer)

      // Render the template using React
      const { createRoot } = await import('react-dom/client')
      const root = createRoot(tempContainer)
      
      await new Promise<void>((resolve) => {
        root.render(
          <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <TemplateComponent data={sampleData} />
          </div>
        )
        // Give React time to render and load all assets
        setTimeout(resolve, 1500)
      })

      // Wait for all images to load
      const images = tempContainer.querySelectorAll('img')
      await Promise.all(Array.from(images).map(img => {
        return new Promise(resolve => {
          if (img.complete) {
            resolve(undefined)
          } else {
            img.onload = () => resolve(undefined)
            img.onerror = () => resolve(undefined)
          }
        })
      }))

      // Convert to high-quality canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: Math.max(1123, tempContainer.scrollHeight), // Minimum A4 height
        scrollX: 0,
        scrollY: 0
      })

      // Create PDF with exact styling
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgData = canvas.toDataURL('image/png', 1.0) // Maximum quality
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
        heightLeft -= pageHeight
      }

      // Clean up
      root.unmount()
      document.body.removeChild(tempContainer)

      // Download the PDF with exact template styling
      pdf.save(`${template.name.replace(/\s+/g, '-').toLowerCase()}-template.pdf`)

      toast({
        title: "Perfect PDF Downloaded!",
        description: `${template.name} template with exact styling has been downloaded.`,
      })
    } catch (error) {
      console.error('Error downloading PDF:', error)
      toast({
        title: "Download Failed",
        description: "There was an error downloading the PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCopyTemplate = async () => {
    setIsCopying(true)
    try {
      // Simulate copying template data
      const templateData = {
        templateId: template.id,
        templateName: template.name,
        sampleData: sampleData
      }
      
      await navigator.clipboard.writeText(JSON.stringify(templateData, null, 2))
      setCopied(true)
      
      toast({
        title: "Template Copied!",
        description: "Template data has been copied to clipboard.",
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying template:', error)
      toast({
        title: "Copy Failed",
        description: "Could not copy template data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCopying(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${template.name} - Invoice Template`,
          text: `Check out this professional invoice template: ${template.description}`,
          url: `${window.location.origin}/templates?template=${template.id}`
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/templates?template=${template.id}`)
        toast({
          title: "Link Copied!",
          description: "Template link has been copied to clipboard.",
        })
      } catch (error) {
        toast({
          title: "Share Failed",
          description: "Could not share template. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  if (!TemplateComponent) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {template.name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {template.isPopular && (
                  <Badge className="bg-blue-500 text-white">
                    Popular
                  </Badge>
                )}
                {template.isPremium && (
                  <Badge className="bg-amber-500 text-white">
                    Premium
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 mt-4">
            <Button onClick={handleUseTemplate} className="flex-1 sm:flex-none">
              <Edit3 className="h-4 w-4 mr-2" />
              {user ? 'Use Template' : 'Get Started'}
            </Button>
            
            <Button 
              onClick={handleDownloadPDF} 
              variant="outline"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>

            <Button 
              onClick={handleCopyTemplate} 
              variant="outline"
              disabled={isCopying}
            >
              {copied ? (
                <Check className="h-4 w-4 mr-2 text-green-500" />
              ) : isCopying ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? 'Copied!' : isCopying ? 'Copying...' : 'Copy'}
            </Button>

            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="h-4 w-4" />
            </Button>

            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Template Preview */}
        <div className="flex-1 overflow-auto bg-slate-50 p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-xl rounded-lg overflow-hidden"
            >
              <div className="transform origin-top" style={{ transformOrigin: 'top center' }}>
                <TemplateComponent data={sampleData} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3 bg-muted/50 border-t border-border flex-shrink-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Preview Mode
              </div>
              <div>
                Category: <span className="capitalize font-medium">{template.category}</span>
              </div>
            </div>
            <div className="text-xs">
              This is a preview with sample data. Actual invoice will use your data.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
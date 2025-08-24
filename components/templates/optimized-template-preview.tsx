'use client'

import { generateSampleData } from '@/lib/sample-invoice-data'

// Import all template components
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

interface OptimizedTemplatePreviewProps {
  templateId: string
  size?: 'small' | 'medium' | 'large' | 'dashboard'
  className?: string
}

/**
 * Optimized Template Preview Component
 * 
 * Features:
 * - Professional scaling and positioning
 * - Consistent appearance across all pages
 * - Multiple size variants for different use cases
 * - High-quality thumbnails with proper aspect ratios
 */
export function OptimizedTemplatePreview({ 
  templateId, 
  size = 'medium',
  className = '' 
}: OptimizedTemplatePreviewProps) {
  // Early validation to prevent null/undefined issues
  if (!templateId) {
    return (
      <div className={`w-full h-full bg-slate-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-slate-400 text-sm font-medium">No template ID provided</div>
      </div>
    )
  }

  const TemplateComponent = templateComponents[templateId as keyof typeof templateComponents]
  
  if (!TemplateComponent) {
    return (
      <div className={`w-full h-full bg-slate-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-slate-400 text-sm font-medium">Template not found</div>
      </div>
    )
  }
  
  const sampleData = generateSampleData(templateId)
  
  // Size configurations for different use cases - Optimized for perfect dashboard coverage
  const sizeConfigs = {
    small: {
      scale: 0.45,
      containerWidth: 480,
      containerHeight: 620,
      aspectRatio: 'aspect-[4/5]' // Perfect for small previews
    },
    medium: {
      scale: 0.55,
      containerWidth: 520,
      containerHeight: 680,
      aspectRatio: 'aspect-[4/5]' // Perfect for medium previews
    },
    large: {
      scale: 0.65,
      containerWidth: 580,
      containerHeight: 750,
      aspectRatio: 'aspect-[4/5]' // Perfect for larger previews
    },
    dashboard: {
      scale: 0.58,
      containerWidth: 550,
      containerHeight: 720,
      aspectRatio: 'aspect-[4/5]' // Optimal for dashboard - covers area properly while fitting perfectly
    }
  }
  
  const config = sizeConfigs[size]
  
  return (
    <div 
      key={`template-preview-${templateId}-${size}`} 
      className={`w-full h-full relative overflow-hidden bg-white rounded-lg shadow-sm ${config.aspectRatio} ${className}`}
    >
      {/* Perfect Center-Aligned Template Preview Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-white"
        style={{ 
          padding: '8px' // Reduced padding for larger preview area
        }}
      >
        <div 
          className="bg-white shadow-sm border border-gray-200/30 rounded-lg overflow-hidden"
          style={{
            width: `${config.containerWidth * config.scale}px`,
            height: `${config.containerHeight * config.scale}px`,
            maxWidth: 'calc(100% - 16px)', // Optimized for larger thumbnails
            maxHeight: 'calc(100% - 16px)' // Optimized for larger thumbnails
          }}
        >
          {/* Scaled template container - perfectly centered */}
          <div 
            className="origin-top-left bg-white"
            style={{ 
              transform: `scale(${config.scale})`,
              width: `${config.containerWidth}px`,
              height: `${config.containerHeight}px`,
              transformOrigin: 'top left'
            }}
          >
            <div className="w-full h-full">
              <TemplateComponent data={sampleData} isPreview={true} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional overlay for better visual depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none rounded-lg" />
      
      {/* Professional border overlay */}
      <div className="absolute inset-0 border border-gray-200/50 rounded-lg pointer-events-none" />
    </div>
  )
}

// Convenience components for different sizes
export function SmallTemplatePreview({ templateId, className }: { templateId: string, className?: string }) {
  return <OptimizedTemplatePreview templateId={templateId} size="small" className={className} />
}

export function MediumTemplatePreview({ templateId, className }: { templateId: string, className?: string }) {
  return <OptimizedTemplatePreview templateId={templateId} size="medium" className={className} />
}

export function LargeTemplatePreview({ templateId, className }: { templateId: string, className?: string }) {
  return <OptimizedTemplatePreview templateId={templateId} size="dashboard" className={className} />
}

export function DashboardTemplatePreview({ templateId, className }: { templateId: string, className?: string }) {
  return <OptimizedTemplatePreview templateId={templateId} size="dashboard" className={className} />
}

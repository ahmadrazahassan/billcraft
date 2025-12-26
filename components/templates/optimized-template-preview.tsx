'use client'

import { generateSampleData } from '@/lib/sample-invoice-data'

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
      {/* Top-Left Aligned Template Preview Container - Like Linear/Vercel */}
      <div
        className="absolute inset-0 flex items-start justify-start bg-white"
        style={{
          padding: '6px' // Minimal padding for maximum coverage
        }}
      >
        <div
          className="bg-white shadow-sm border border-gray-200/30 rounded-lg overflow-hidden"
          style={{
            width: `${config.containerWidth * config.scale}px`,
            height: `${config.containerHeight * config.scale}px`,
            maxWidth: 'calc(100% - 12px)', // Optimized for top-left alignment
            maxHeight: 'calc(100% - 12px)' // Optimized for top-left alignment
          }}
        >
          {/* Scaled template container - top-left aligned */}
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
              <TemplateComponent data={sampleData} />
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

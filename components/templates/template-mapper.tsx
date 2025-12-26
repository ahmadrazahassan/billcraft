// ============================================================================
// TEMPLATE MAPPER - Dynamic Template Rendering (30 Templates)
// ============================================================================

import React from 'react'
import { InvoiceData } from './template-utils'

// Import all 30 templates
import { GhostWhite } from './ghost-white'
import { MonoLine } from './mono-line'
import { AirLight } from './air-light'
import { ZenSpace } from './zen-space'
import { PaperThin } from './paper-thin'

import { NeonEdge } from './neon-edge'
import { SiliconValley } from './silicon-valley'
import { CodeBlack } from './code-black'
import { GradientFlow } from './gradient-flow'
import { GlassMorph } from './glass-morph'

import { SunsetOrange } from './sunset-orange'
import { ElectricPurple } from './electric-purple'
import { CoralReef } from './coral-reef'
import { EmeraldCity } from './emerald-city'
import { MidnightBlue } from './midnight-blue'

import { DiamondBlack } from './diamond-black'
import { RoseGold } from './rose-gold'
import { PlatinumEdge } from './platinum-edge'
import { ChampagneGold } from './champagne-gold'
import { ObsidianPro } from './obsidian-pro'

import { ExecutiveNavy } from './executive-navy'
import { BoardroomGray } from './boardroom-gray'
import { TrustBlue } from './trust-blue'
import { ForestCorporate } from './forest-corporate'
import { SteelProfessional } from './steel-professional'

import { CyberNeon } from './cyber-neon'
import { QuantumViolet } from './quantum-violet'
import { HologramBlue } from './hologram-blue'
import { NeuralNetwork } from './neural-network'
import { SpaceOdyssey } from './space-odyssey'

// ============================================================================
// TEMPLATE MAP
// ============================================================================

type TemplateComponent = React.FC<{ data: InvoiceData }>

export const TEMPLATE_COMPONENTS: Record<string, TemplateComponent> = {
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

// ============================================================================
// TEMPLATE RENDERER
// ============================================================================

interface TemplateRendererProps {
  templateId: string
  data: InvoiceData
  fallbackTemplateId?: string
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ 
  templateId, 
  data,
  fallbackTemplateId = 'ghost-white'
}) => {
  const TemplateComponent = TEMPLATE_COMPONENTS[templateId] || TEMPLATE_COMPONENTS[fallbackTemplateId]
  
  if (!TemplateComponent) {
    console.error(`Template not found: ${templateId}`)
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-600 p-8">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Template Error</p>
          <p className="text-sm">Template "{templateId}" not found</p>
          <p className="text-xs mt-2">Available templates: {Object.keys(TEMPLATE_COMPONENTS).length}</p>
        </div>
      </div>
    )
  }
  
  return <TemplateComponent data={data} />
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const templateExists = (templateId: string): boolean => {
  return templateId in TEMPLATE_COMPONENTS
}

export const getAllTemplateIds = (): string[] => {
  return Object.keys(TEMPLATE_COMPONENTS)
}

export const getTemplateCount = (): number => {
  return Object.keys(TEMPLATE_COMPONENTS).length
}

export const getTemplateComponent = (templateId: string): TemplateComponent | undefined => {
  return TEMPLATE_COMPONENTS[templateId]
}

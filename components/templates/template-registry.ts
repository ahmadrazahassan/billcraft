// ============================================================================
// NEXT-GENERATION TEMPLATE REGISTRY - 30 MODERN INVOICE TEMPLATES
// ============================================================================
// Designed with cutting-edge aesthetics inspired by:
// - Stripe, Linear, Vercel (Minimalist Excellence)
// - Apple, Airbnb, Notion (Design Leadership)
// - Figma, Framer, Webflow (Creative Innovation)
// - Tesla, SpaceX (Future-Forward Thinking)
// ============================================================================

export interface TemplateConfig {
  id: string
  name: string
  category: 'ultra-minimal' | 'modern-tech' | 'creative-bold' | 'luxury-premium' | 'corporate-pro' | 'futuristic'
  description: string
  primaryColor: string
  textColor: string
  borderColor: string
  backgroundColor: string
  accentColor?: string
  fontFamily: string
  suitable: string[]
  features: string[]
  isPremium?: boolean
}

// ============================================================================
// 30 NEXT-LEVEL TEMPLATES
// ============================================================================

export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
  
  // ──────────────────────────────────────────────────────────────────────────
  // ULTRA-MINIMAL CATEGORY (5 templates) - Stripe/Linear Inspired
  // ──────────────────────────────────────────────────────────────────────────
  
  'ghost-white': {
    id: 'ghost-white',
    name: 'Ghost White',
    category: 'ultra-minimal',
    description: 'Invisible design. Maximum impact. Stripe-level minimalism.',
    primaryColor: '#000000',
    textColor: '#18181B',
    borderColor: '#F4F4F5',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['SaaS', 'Tech Startups', 'Digital Products'],
    features: ['Ultra-clean', 'Maximum whitespace', 'Perfect typography']
  },

  'mono-line': {
    id: 'mono-line',
    name: 'Mono Line',
    category: 'ultra-minimal',
    description: 'Single accent line. Pure monochrome elegance.',
    primaryColor: '#09090B',
    textColor: '#27272A',
    borderColor: '#E4E4E7',
    backgroundColor: '#FFFFFF',
    accentColor: '#18181B',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Designers', 'Architects', 'Consultants'],
    features: ['Monochrome', 'Geometric precision', 'Swiss design']
  },

  'air-light': {
    id: 'air-light',
    name: 'Air Light',
    category: 'ultra-minimal',
    description: 'Weightless design. Breathable space. Apple-inspired.',
    primaryColor: '#3F3F46',
    textColor: '#52525B',
    borderColor: '#FAFAFA',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Premium Services', 'Consulting', 'Creative'],
    features: ['Airy layout', 'Subtle borders', 'Premium feel']
  },

  'zen-space': {
    id: 'zen-space',
    name: 'Zen Space',
    category: 'ultra-minimal',
    description: 'Calm. Balanced. Perfectly centered. Notion-like.',
    primaryColor: '#71717A',
    textColor: '#3F3F46',
    borderColor: '#F4F4F5',
    backgroundColor: '#FAFAFA',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Wellness', 'Education', 'Healthcare'],
    features: ['Centered layout', 'Balanced spacing', 'Zen aesthetic']
  },

  'paper-thin': {
    id: 'paper-thin',
    name: 'Paper Thin',
    category: 'ultra-minimal',
    description: 'Digital paper. Minimal ink. Maximum clarity.',
    primaryColor: '#27272A',
    textColor: '#52525B',
    borderColor: '#E4E4E7',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['All Industries', 'Universal'],
    features: ['Paper-like', 'Minimal design', 'Universal appeal']
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MODERN-TECH CATEGORY (5 templates) - Vercel/Figma Inspired
  // ──────────────────────────────────────────────────────────────────────────

  'neon-edge': {
    id: 'neon-edge',
    name: 'Neon Edge',
    category: 'modern-tech',
    description: 'Cyberpunk vibes. Electric blue accents. Future-ready.',
    primaryColor: '#0EA5E9',
    textColor: '#0F172A',
    borderColor: '#E0F2FE',
    backgroundColor: '#FFFFFF',
    accentColor: '#06B6D4',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Tech', 'Gaming', 'Digital'],
    features: ['Neon accents', 'Tech aesthetic', 'Bold colors'],
    isPremium: true
  },

  'silicon-valley': {
    id: 'silicon-valley',
    name: 'Silicon Valley',
    category: 'modern-tech',
    description: 'Startup DNA. VC-approved. Y Combinator aesthetic.',
    primaryColor: '#6366F1',
    textColor: '#1E293B',
    borderColor: '#E0E7FF',
    backgroundColor: '#FFFFFF',
    accentColor: '#818CF8',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Startups', 'SaaS', 'Tech Companies'],
    features: ['Startup vibe', 'Modern layout', 'Tech-forward']
  },

  'code-black': {
    id: 'code-black',
    name: 'Code Black',
    category: 'modern-tech',
    description: 'Developer-grade. Terminal-inspired. GitHub dark mode.',
    primaryColor: '#0D1117',
    textColor: '#24292F',
    borderColor: '#D0D7DE',
    backgroundColor: '#FFFFFF',
    accentColor: '#238636',
    fontFamily: 'JetBrains Mono, monospace',
    suitable: ['Developers', 'Tech', 'Software'],
    features: ['Code aesthetic', 'Monospace font', 'Developer-friendly'],
    isPremium: true
  },

  'gradient-flow': {
    id: 'gradient-flow',
    name: 'Gradient Flow',
    category: 'modern-tech',
    description: 'Smooth gradients. Fluid design. Instagram-worthy.',
    primaryColor: '#8B5CF6',
    textColor: '#1F2937',
    borderColor: '#EDE9FE',
    backgroundColor: '#FFFFFF',
    accentColor: '#A78BFA',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Creative Tech', 'Apps', 'Digital'],
    features: ['Gradient accents', 'Fluid design', 'Modern aesthetic']
  },

  'glass-morph': {
    id: 'glass-morph',
    name: 'Glass Morph',
    category: 'modern-tech',
    description: 'Frosted glass. Blur effects. iOS 15 inspired.',
    primaryColor: '#3B82F6',
    textColor: '#111827',
    borderColor: '#DBEAFE',
    backgroundColor: '#F9FAFB',
    accentColor: '#60A5FA',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Modern Brands', 'Apps', 'Digital'],
    features: ['Glass effect', 'Blur backdrop', 'Premium feel'],
    isPremium: true
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CREATIVE-BOLD CATEGORY (5 templates) - Dribbble/Behance Inspired
  // ──────────────────────────────────────────────────────────────────────────

  'sunset-orange': {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    category: 'creative-bold',
    description: 'Warm sunset vibes. Bold orange energy. Stand out.',
    primaryColor: '#FF6600',
    textColor: '#1A1A1A',
    borderColor: '#FFEDD5',
    backgroundColor: '#FFFFFF',
    accentColor: '#FB923C',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Creative', 'Marketing', 'Events'],
    features: ['Bold orange', 'Energetic', 'Eye-catching']
  },

  'electric-purple': {
    id: 'electric-purple',
    name: 'Electric Purple',
    category: 'creative-bold',
    description: 'Vibrant purple power. Creative confidence. Agency-grade.',
    primaryColor: '#9333EA',
    textColor: '#1F2937',
    borderColor: '#F3E8FF',
    backgroundColor: '#FFFFFF',
    accentColor: '#A855F7',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Agencies', 'Creative', 'Design'],
    features: ['Bold purple', 'Creative energy', 'Agency-ready']
  },

  'coral-reef': {
    id: 'coral-reef',
    name: 'Coral Reef',
    category: 'creative-bold',
    description: 'Ocean-inspired coral. Fresh and vibrant. Tropical energy.',
    primaryColor: '#F43F5E',
    textColor: '#111827',
    borderColor: '#FFE4E6',
    backgroundColor: '#FFFFFF',
    accentColor: '#FB7185',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Creative', 'Lifestyle', 'Beauty'],
    features: ['Coral pink', 'Fresh design', 'Vibrant energy']
  },

  'emerald-city': {
    id: 'emerald-city',
    name: 'Emerald City',
    category: 'creative-bold',
    description: 'Rich emerald green. Nature meets modern. Eco-friendly.',
    primaryColor: '#10B981',
    textColor: '#111827',
    borderColor: '#D1FAE5',
    backgroundColor: '#FFFFFF',
    accentColor: '#34D399',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Eco', 'Health', 'Wellness'],
    features: ['Emerald green', 'Eco-friendly', 'Fresh aesthetic']
  },

  'midnight-blue': {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    category: 'creative-bold',
    description: 'Deep midnight blue. Mysterious elegance. Night sky.',
    primaryColor: '#1E40AF',
    textColor: '#1F2937',
    borderColor: '#DBEAFE',
    backgroundColor: '#FFFFFF',
    accentColor: '#3B82F6',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Creative', 'Tech', 'Professional'],
    features: ['Deep blue', 'Elegant', 'Professional']
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LUXURY-PREMIUM CATEGORY (5 templates) - High-End Brands
  // ──────────────────────────────────────────────────────────────────────────

  'diamond-black': {
    id: 'diamond-black',
    name: 'Diamond Black',
    category: 'luxury-premium',
    description: 'Pure luxury. Black diamond elegance. VIP treatment.',
    primaryColor: '#000000',
    textColor: '#171717',
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    accentColor: '#404040',
    fontFamily: 'Playfair Display, serif',
    suitable: ['Luxury', 'Fashion', 'Premium'],
    features: ['Luxury black', 'Premium feel', 'VIP-grade'],
    isPremium: true
  },

  'rose-gold': {
    id: 'rose-gold',
    name: 'Rose Gold',
    category: 'luxury-premium',
    description: 'Elegant rose gold. Feminine luxury. Instagram aesthetic.',
    primaryColor: '#BE185D',
    textColor: '#1F2937',
    borderColor: '#FCE7F3',
    backgroundColor: '#FFF1F2',
    accentColor: '#EC4899',
    fontFamily: 'Playfair Display, serif',
    suitable: ['Beauty', 'Fashion', 'Luxury'],
    features: ['Rose gold', 'Elegant', 'Feminine'],
    isPremium: true
  },

  'platinum-edge': {
    id: 'platinum-edge',
    name: 'Platinum Edge',
    category: 'luxury-premium',
    description: 'Platinum sophistication. Silver elegance. Executive-level.',
    primaryColor: '#52525B',
    textColor: '#18181B',
    borderColor: '#E4E4E7',
    backgroundColor: '#FAFAFA',
    accentColor: '#71717A',
    fontFamily: 'system-ui, sans-serif',
    suitable: ['Executive', 'Premium', 'Corporate'],
    features: ['Platinum style', 'Sophisticated', 'Executive'],
    isPremium: true
  },

  'champagne-gold': {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    category: 'luxury-premium',
    description: 'Champagne elegance. Gold accents. Celebration-worthy.',
    primaryColor: '#CA8A04',
    textColor: '#1C1917',
    borderColor: '#FEF3C7',
    backgroundColor: '#FFFBEB',
    accentColor: '#EAB308',
    fontFamily: 'Playfair Display, serif',
    suitable: ['Luxury', 'Events', 'Premium'],
    features: ['Gold accents', 'Elegant', 'Celebratory'],
    isPremium: true
  },

  'obsidian-pro': {
    id: 'obsidian-pro',
    name: 'Obsidian Pro',
    category: 'luxury-premium',
    description: 'Dark obsidian. Professional luxury. High-end appeal.',
    primaryColor: '#0F0F0F',
    textColor: '#262626',
    borderColor: '#D4D4D8',
    backgroundColor: '#FAFAFA',
    accentColor: '#3F3F46',
    fontFamily: 'system-ui, sans-serif',
    suitable: ['Luxury', 'Professional', 'Premium'],
    features: ['Dark luxury', 'Professional', 'High-end'],
    isPremium: true
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CORPORATE-PRO CATEGORY (5 templates) - Enterprise Grade
  // ──────────────────────────────────────────────────────────────────────────

  'executive-navy': {
    id: 'executive-navy',
    name: 'Executive Navy',
    category: 'corporate-pro',
    description: 'Navy blue authority. C-suite approved. Fortune 500.',
    primaryColor: '#1E3A8A',
    textColor: '#111827',
    borderColor: '#DBEAFE',
    backgroundColor: '#FFFFFF',
    accentColor: '#3B82F6',
    fontFamily: 'system-ui, sans-serif',
    suitable: ['Corporate', 'Finance', 'Legal'],
    features: ['Navy blue', 'Executive', 'Professional']
  },

  'boardroom-gray': {
    id: 'boardroom-gray',
    name: 'Boardroom Gray',
    category: 'corporate-pro',
    description: 'Sophisticated gray. Meeting room ready. Enterprise-grade.',
    primaryColor: '#374151',
    textColor: '#111827',
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    fontFamily: 'system-ui, sans-serif',
    suitable: ['Enterprise', 'B2B', 'Corporate'],
    features: ['Professional gray', 'Enterprise', 'Boardroom-ready']
  },

  'trust-blue': {
    id: 'trust-blue',
    name: 'Trust Blue',
    category: 'corporate-pro',
    description: 'Trustworthy blue. Bank-approved. Financial grade.',
    primaryColor: '#0369A1',
    textColor: '#0F172A',
    borderColor: '#BAE6FD',
    backgroundColor: '#FFFFFF',
    accentColor: '#0EA5E9',
    fontFamily: 'system-ui, sans-serif',
    suitable: ['Finance', 'Banking', 'Insurance'],
    features: ['Trust blue', 'Financial', 'Bank-grade']
  },

  'forest-corporate': {
    id: 'forest-corporate',
    name: 'Forest Corporate',
    category: 'corporate-pro',
    description: 'Deep forest green. Stability and growth. Traditional trust.',
    primaryColor: '#065F46',
    textColor: '#111827',
    borderColor: '#D1FAE5',
    backgroundColor: '#FFFFFF',
    accentColor: '#059669',
    fontFamily: 'system-ui, sans-serif',
    suitable: ['Banking', 'Real Estate', 'Law'],
    features: ['Forest green', 'Stable', 'Traditional']
  },

  'steel-professional': {
    id: 'steel-professional',
    name: 'Steel Professional',
    category: 'corporate-pro',
    description: 'Steel gray strength. Industrial professional. Engineering-grade.',
    primaryColor: '#475569',
    textColor: '#1E293B',
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    accentColor: '#64748B',
    fontFamily: 'system-ui, sans-serif',
    suitable: ['Engineering', 'Manufacturing', 'Industrial'],
    features: ['Steel gray', 'Industrial', 'Strong']
  },

  // ──────────────────────────────────────────────────────────────────────────
  // FUTURISTIC CATEGORY (5 templates) - Next-Gen Design
  // ──────────────────────────────────────────────────────────────────────────

  'cyber-neon': {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    category: 'futuristic',
    description: 'Cyberpunk future. Neon lights. Matrix-inspired.',
    primaryColor: '#06B6D4',
    textColor: '#0F172A',
    borderColor: '#CFFAFE',
    backgroundColor: '#FFFFFF',
    accentColor: '#22D3EE',
    fontFamily: 'JetBrains Mono, monospace',
    suitable: ['Tech', 'Gaming', 'Crypto'],
    features: ['Cyberpunk', 'Neon', 'Futuristic'],
    isPremium: true
  },

  'quantum-violet': {
    id: 'quantum-violet',
    name: 'Quantum Violet',
    category: 'futuristic',
    description: 'Quantum computing vibes. Violet energy. Next-gen tech.',
    primaryColor: '#7C3AED',
    textColor: '#1F2937',
    borderColor: '#EDE9FE',
    backgroundColor: '#FFFFFF',
    accentColor: '#A78BFA',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['AI/ML', 'Quantum', 'Innovation'],
    features: ['Quantum', 'Violet', 'Next-gen'],
    isPremium: true
  },

  'hologram-blue': {
    id: 'hologram-blue',
    name: 'Hologram Blue',
    category: 'futuristic',
    description: 'Holographic effects. 3D vibes. Sci-fi aesthetic.',
    primaryColor: '#2563EB',
    textColor: '#1E293B',
    borderColor: '#DBEAFE',
    backgroundColor: '#F8FAFC',
    accentColor: '#60A5FA',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Tech', 'Innovation', 'Future'],
    features: ['Holographic', '3D feel', 'Sci-fi'],
    isPremium: true
  },

  'neural-network': {
    id: 'neural-network',
    name: 'Neural Network',
    category: 'futuristic',
    description: 'AI-inspired. Neural patterns. Machine learning aesthetic.',
    primaryColor: '#4F46E5',
    textColor: '#1F2937',
    borderColor: '#E0E7FF',
    backgroundColor: '#FFFFFF',
    accentColor: '#818CF8',
    fontFamily: 'JetBrains Mono, monospace',
    suitable: ['AI', 'ML', 'Data Science'],
    features: ['AI-inspired', 'Neural', 'Tech-forward'],
    isPremium: true
  },

  'space-odyssey': {
    id: 'space-odyssey',
    name: 'Space Odyssey',
    category: 'futuristic',
    description: 'Space exploration. Cosmic design. Interstellar vibes.',
    primaryColor: '#1E1B4B',
    textColor: '#312E81',
    borderColor: '#E0E7FF',
    backgroundColor: '#FFFFFF',
    accentColor: '#6366F1',
    fontFamily: 'Inter, system-ui, sans-serif',
    suitable: ['Space Tech', 'Innovation', 'Future'],
    features: ['Space theme', 'Cosmic', 'Futuristic'],
    isPremium: true
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getTemplatesByCategory = (category: string) => {
  return Object.values(TEMPLATE_REGISTRY).filter(t => t.category === category)
}

export const getTemplateById = (id: string) => {
  return TEMPLATE_REGISTRY[id]
}

export const getAllTemplates = () => {
  return Object.values(TEMPLATE_REGISTRY)
}

export const getTemplateCategories = () => {
  return ['ultra-minimal', 'modern-tech', 'creative-bold', 'luxury-premium', 'corporate-pro', 'futuristic'] as const
}

export const getPremiumTemplates = () => {
  return Object.values(TEMPLATE_REGISTRY).filter(t => t.isPremium)
}

export const getFreeTemplates = () => {
  return Object.values(TEMPLATE_REGISTRY).filter(t => !t.isPremium)
}

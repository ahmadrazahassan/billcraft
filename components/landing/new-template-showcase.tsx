'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, ArrowRight, Star } from 'lucide-react'
import { TEMPLATE_REGISTRY, getTemplatesByCategory } from '@/components/templates/template-registry'

const categories = [
  { id: 'minimalist', name: 'Minimalist', icon: '⚪', desc: 'Clean & Simple' },
  { id: 'corporate', name: 'Corporate', icon: '💼', desc: 'Professional & Trusted' },
  { id: 'modern', name: 'Modern', icon: '⚡', desc: 'Tech & Contemporary' },
  { id: 'creative', name: 'Creative', icon: '🎨', desc: 'Bold & Artistic' },
  { id: 'premium', name: 'Premium', icon: '💎', desc: 'Luxury & Elegant' },
]

export default function NewTemplateShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('minimalist')
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const categoryTemplates = getTemplatesByCategory(selectedCategory as any)

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>25 Enterprise-Grade Templates</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Invoices That Match Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Brand
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            World-class designs inspired by Stripe, QuickBooks, and FreshBooks.
            No gradients. No clutter. Just professional invoices.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.desc})</span>
            </motion.button>
          ))}
        </div>

        {/* Template Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {categoryTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Template Preview */}
                <div
                  className="aspect-[3/4] p-4 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: template.backgroundColor }}
                >
                  {/* Mini Invoice Preview */}
                  <div className="h-full rounded-lg p-3 bg-white shadow-sm flex flex-col text-[6px]">
                    {/* Header */}
                    <div className="mb-2 pb-2" style={{ borderBottom: `1px solid ${template.borderColor}` }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="w-4 h-4 rounded mb-1" style={{ backgroundColor: template.primaryColor }} />
                          <div className="w-8 h-1 mb-0.5" style={{ backgroundColor: template.textColor, opacity: 0.6 }} />
                          <div className="w-6 h-0.5" style={{ backgroundColor: template.textColor, opacity: 0.4 }} />
                        </div>
                        <div className="text-right">
                          <div className="w-8 h-1.5 mb-0.5 ml-auto" style={{ backgroundColor: template.primaryColor }} />
                          <div className="w-6 h-0.5 ml-auto" style={{ backgroundColor: template.textColor, opacity: 0.4 }} />
                        </div>
                      </div>
                    </div>

                    {/* Bill To */}
                    <div className="mb-2 p-1" style={{ backgroundColor: '#FAFAFA', border: `0.5px solid ${template.borderColor}` }}>
                      <div className="w-4 h-0.5 mb-0.5" style={{ backgroundColor: template.textColor, opacity: 0.5 }} />
                      <div className="w-8 h-0.5 mb-0.5" style={{ backgroundColor: template.textColor, opacity: 0.7 }} />
                      <div className="w-6 h-0.5" style={{ backgroundColor: template.textColor, opacity: 0.5 }} />
                    </div>

                    {/* Items Table */}
                    <div className="flex-1 mb-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between py-1" style={{ borderBottom: `0.5px solid ${template.borderColor}` }}>
                          <div className="w-8 h-0.5" style={{ backgroundColor: template.textColor, opacity: 0.6 }} />
                          <div className="w-3 h-0.5" style={{ backgroundColor: template.textColor, opacity: 0.6 }} />
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="pt-1" style={{ borderTop: `1px solid ${template.accentColor || template.primaryColor}` }}>
                      <div className="flex justify-between">
                        <div className="w-4 h-1" style={{ backgroundColor: template.primaryColor }} />
                        <div className="w-6 h-1" style={{ backgroundColor: template.primaryColor }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{template.description}</p>

                  {/* Suitable For Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.suitable.slice(0, 2).map((industry, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {industry}
                      </span>
                    ))}
                    {template.suitable.length > 2 && (
                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                        +{template.suitable.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Color Swatches */}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: template.primaryColor }} />
                    <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: template.textColor }} />
                    {template.accentColor && (
                      <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: template.accentColor }} />
                    )}
                  </div>
                </div>

                {/* Hover Overlay */}
                <AnimatePresence>
                  {hoveredTemplate === template.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-blue-600/90 flex items-center justify-center"
                    >
                      <div className="text-center text-white p-6">
                        <Check className="w-12 h-12 mx-auto mb-3" />
                        <p className="font-semibold mb-2">Perfect for:</p>
                        <div className="space-y-1">
                          {template.suitable.slice(0, 3).map((industry, i) => (
                            <p key={i} className="text-sm">✓ {industry}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl shadow-blue-600/30">
            <div className="text-left">
              <p className="text-2xl font-bold mb-1">25 Templates. Infinite Possibilities.</p>
              <p className="text-blue-100">Join thousands creating professional invoices</p>
            </div>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center gap-2">
              Start Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-16 flex justify-center items-center gap-8 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>No Credit Card</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Enterprise Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Always Free</span>
          </div>
        </div>
      </div>
    </section>
  )
}

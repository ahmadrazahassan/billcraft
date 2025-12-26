'use client'

import { FeaturesGrid } from '@/components/ui/features-8'

export function Features() {
  return (
    <section id="features" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center py-16 md:py-24">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need to
              <br />
              <span className="text-primary">Manage Invoices</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful features designed to simplify your billing process and help you get paid faster.
            </p>
          </div>
        </div>
      </div>
      
      {/* Features Grid */}
      <FeaturesGrid />
    </section>
  )
}

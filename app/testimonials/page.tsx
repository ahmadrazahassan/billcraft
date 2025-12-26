'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Quote, Users, TrendingUp, Award } from 'lucide-react'

const featuredTestimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Freelance Designer',
    company: 'Design Studio Pro',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=FFA500&color=fff',
    content: 'BillCraft has completely transformed how I handle invoicing. The professional templates and intuitive interface help me create beautiful invoices in minutes instead of hours. My cash flow has improved significantly since I started using it.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CEO',
    company: 'TechFlow Solutions',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=28A745&color=fff',
    content: 'The multi-currency support and automated reminders have saved us countless hours. Our cash flow has improved significantly since switching to BillCraft. The team collaboration features are exactly what we needed.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Consultant',
    company: 'Strategic Insights',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=FFA500&color=fff',
    content: 'I love how clean and professional the PDF exports look. My clients are always impressed with the quality of invoices I send them. The custom branding options make everything look so polished.',
    rating: 5
  }
]

const allTestimonials = [
  {
    name: 'David Wilson',
    role: 'Photographer',
    company: 'Wilson Photography',
    avatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=6366F1&color=fff',
    content: 'The customization options are amazing. I can match my invoices to my brand perfectly.',
    rating: 5
  },
  {
    name: 'Lisa Park',
    role: 'Marketing Director',
    company: 'Creative Agency',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Park&background=EC4899&color=fff',
    content: 'Payment integration with Stripe made getting paid so much easier. Clients love it.',
    rating: 5
  },
  {
    name: 'James Smith',
    role: 'Accountant',
    company: 'Smith & Associates',
    avatar: 'https://ui-avatars.com/api/?name=James+Smith&background=10B981&color=fff',
    content: 'The automated invoicing features save me hours each week. Highly recommend!',
    rating: 5
  },
  {
    name: 'Maria Garcia',
    role: 'Web Developer',
    company: 'DevCraft Studio',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=F59E0B&color=fff',
    content: 'API integration was seamless. Perfect for automating our billing workflow.',
    rating: 5
  },
  {
    name: 'Tom Anderson',
    role: 'Architect',
    company: 'Anderson Designs',
    avatar: 'https://ui-avatars.com/api/?name=Tom+Anderson&background=EF4444&color=fff',
    content: 'The mobile app lets me create invoices on-site. Game changer for my business.',
    rating: 5
  },
  {
    name: 'Anna Kim',
    role: 'Copywriter',
    company: 'Words & More',
    avatar: 'https://ui-avatars.com/api/?name=Anna+Kim&background=8B5CF6&color=fff',
    content: 'Customer support is outstanding. They helped me set everything up perfectly.',
    rating: 5
  },
  {
    name: 'Robert Taylor',
    role: 'Consultant',
    company: 'Taylor Consulting',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=06B6D4&color=fff',
    content: 'The recurring invoice feature saves me hours every month. Set it and forget it.',
    rating: 5
  },
  {
    name: 'Sophie Brown',
    role: 'Graphic Designer',
    company: 'Brown Creative',
    avatar: 'https://ui-avatars.com/api/?name=Sophie+Brown&background=84CC16&color=fff',
    content: 'Beautiful invoices that reflect my brand. My clients always comment on them.',
    rating: 5
  },
  {
    name: 'Alex Johnson',
    role: 'Video Editor',
    company: 'Johnson Media',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=F97316&color=fff',
    content: 'The expense tracking feature helps me stay on top of my business finances.',
    rating: 5
  }
]

const stats = [
  {
    icon: Users,
    number: '10,000+',
    label: 'Happy Customers',
    color: 'text-primary'
  },
  {
    icon: Star,
    number: '4.9/5',
    label: 'Average Rating',
    color: 'text-secondary'
  },
  {
    icon: TrendingUp,
    number: '500K+',
    label: 'Invoices Created',
    color: 'text-primary'
  },
  {
    icon: Award,
    number: '99.9%',
    label: 'Uptime',
    color: 'text-secondary'
  }
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Loved by
                <br />
                <span className="text-primary">Thousands</span> of Users
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Don&apos;t just take our word for it. See what our customers have to say about their experience with BillCraft.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center glass-card p-6"
                    >
                      <div className={`inline-flex p-3 rounded-xl bg-white/50 ${stat.color} mb-4`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {stat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Testimonials */}
        <section className="py-20 relative">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Featured
                  <br />
                  <span className="text-secondary">Stories</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  In-depth stories from our most successful customers.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                {featuredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-8 relative group hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                      <Quote className="h-8 w-8 text-primary" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Testimonials Grid */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What Our Customers Say
                </h2>
                <p className="text-xl text-gray-600">
                  Real feedback from real customers across different industries.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    className="glass-card p-6 group hover:shadow-xl transition-all duration-300"
                  >
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-gray-700 mb-4 leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="text-xs">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center glass-card p-12"
            >
              <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Join Thousands of Happy Customers
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Start your free trial today and see why businesses choose BillCraft for their invoicing needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.a
                  href="/auth/signup"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Start 3-Month Free Trial
                </motion.a>
                <motion.a
                  href="/pricing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass-button text-gray-700 hover:text-primary font-semibold rounded-2xl transition-colors"
                >
                  View Pricing
                </motion.a>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                No credit card required • 3 months free trial • Cancel anytime
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 
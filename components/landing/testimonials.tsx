'use client'

import { motion } from 'framer-motion'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

const testimonials = [
  {
    text: "BillCraft has completely transformed how I handle invoicing. The professional templates and intuitive interface help me create beautiful invoices in minutes instead of hours.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Johnson",
    role: "Freelance Designer",
  },
  {
    text: "The multi-currency support and automated reminders have saved us countless hours. Our cash flow has improved significantly since switching to BillCraft.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Michael Chen",
    role: "CEO, TechFlow Solutions",
  },
  {
    text: "I love how clean and professional the PDF exports look. My clients are always impressed with the quality of invoices I send them.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Emily Rodriguez",
    role: "Consultant",
  },
  {
    text: "The AI-powered features are incredible. BillCraft automatically fills in details and suggests pricing, making invoicing a breeze.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Kim",
    role: "Creative Director",
  },
  {
    text: "Customer support is top-notch. They helped us migrate from our old system seamlessly and were available whenever we needed assistance.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Lisa Anderson",
    role: "Operations Manager",
  },
  {
    text: "The template library is fantastic. I can choose different designs for different clients, making each invoice feel personalized and professional.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Jennifer Taylor",
    role: "Marketing Consultant",
  },
  {
    text: "Real-time analytics and reporting give me insights into my business that I never had before. It's like having a financial advisor built-in.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Robert Martinez",
    role: "Business Analyst",
  },
  {
    text: "The mobile app is perfect for creating invoices on the go. I can send professional invoices right after client meetings.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Amanda White",
    role: "Sales Manager",
  },
  {
    text: "BillCraft's integration with our accounting software was seamless. Everything syncs perfectly, saving us hours of manual data entry.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "James Wilson",
    role: "Finance Director",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function Testimonials() {
  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="border-2 border-primary/20 bg-primary/5 py-2 px-5 rounded-full text-sm font-semibold text-primary">
              Testimonials
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-foreground">
            What our users say
            </h2>
          <p className="text-center mt-6 text-lg text-muted-foreground leading-relaxed">
              See what our customers have to say about their experience with BillCraft.
            </p>
          </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  )
} 

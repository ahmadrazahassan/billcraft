'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "What is BillCraft and how does it work?",
    answer: "BillCraft is a modern, AI-powered invoice generation platform that helps businesses create professional invoices in seconds. Simply input your business details, add line items, and let our intelligent system generate beautiful, compliant invoices automatically."
  },
  {
    question: "Do I need any technical knowledge to use BillCraft?",
    answer: "Not at all! BillCraft is designed with simplicity in mind. Our intuitive interface makes invoice creation effortless, even if you've never used invoicing software before. Plus, our AI assistant is always ready to help guide you through any process."
  },
  {
    question: "Can I customize my invoice templates?",
    answer: "Absolutely! BillCraft offers 25+ professional templates that you can fully customize. Change colors, add your logo, adjust layouts, and create invoices that perfectly match your brand identity. You have complete control over how your invoices look."
  },
  {
    question: "Is my data secure with BillCraft?",
    answer: "Security is our top priority. All your data is encrypted end-to-end using industry-standard encryption. We use secure cloud infrastructure, regular backups, and comply with international data protection regulations to ensure your information stays safe."
  },
  {
    question: "What payment methods can I accept?",
    answer: "BillCraft supports all major payment methods including credit cards, debit cards, PayPal, bank transfers, and more. You can enable multiple payment options on your invoices to make it convenient for your clients to pay you quickly."
  },
  {
    question: "Can I track when my invoices are viewed or paid?",
    answer: "Yes! BillCraft provides real-time tracking for all your invoices. You'll receive instant notifications when clients view your invoices, download them, or make payments. Our dashboard gives you complete visibility into your invoicing activity."
  },
  {
    question: "Does BillCraft support multiple currencies?",
    answer: "Yes, BillCraft supports 150+ currencies and automatically handles currency conversions. Whether you're billing clients locally or internationally, you can create invoices in any currency with up-to-date exchange rates."
  },
  {
    question: "What's included in the free trial?",
    answer: "Our 14-day free trial gives you full access to all features including unlimited invoices, all templates, AI assistance, team collaboration, and analytics. No credit card required to start, and you can upgrade anytime to continue using BillCraft."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-background">

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full border-2 border-primary/20 bg-primary/5">
            <span className="text-sm font-semibold text-primary">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about BillCraft. Can't find the answer you're looking for? Feel free to contact our support team.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card border-2 border-border rounded-[2rem] overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-6 flex items-center justify-between gap-4 text-left transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-bold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index 
                        ? 'bg-primary text-primary-foreground rotate-180' 
                        : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                    }`}>
                      {openIndex === index ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-[2rem] border-2 border-primary/20 bg-primary/5">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-2 text-foreground">Still have questions?</h3>
              <p className="text-muted-foreground">Our support team is here to help you 24/7.</p>
            </div>
            <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


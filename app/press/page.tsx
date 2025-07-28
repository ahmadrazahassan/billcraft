'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Newspaper,
  Calendar,
  Download,
  ExternalLink,
  Award,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Video,
  Mic,
  Quote,
  Users,
  Globe,
  Building2,
  Mail,
  Phone,
  Camera
} from 'lucide-react'

const pressReleases = [
  {
    title: 'BillCraft Raises $25M Series B to Accelerate AI-Powered Invoicing Revolution',
    date: '2024-01-15',
    excerpt: 'Leading invoice automation platform plans international expansion and enterprise features.',
    category: 'Funding',
    featured: true,
    pdf: '/press/billcraft-series-b-announcement.pdf'
  },
  {
    title: 'BillCraft Launches Advanced AI Features for Small Business Automation',
    date: '2023-12-10',
    excerpt: 'New smart invoice generation and predictive analytics help businesses save 10+ hours per week.',
    category: 'Product',
    featured: false,
    pdf: '/press/billcraft-ai-features-launch.pdf'
  },
  {
    title: 'BillCraft Expands to European Market with Multi-Currency Support',
    date: '2023-11-05',
    excerpt: 'Platform now serves customers in 25+ countries with localized features and compliance.',
    category: 'Expansion',
    featured: false,
    pdf: '/press/billcraft-european-expansion.pdf'
  },
  {
    title: 'BillCraft Achieves SOC 2 Type II Certification for Enterprise Security',
    date: '2023-10-20',
    excerpt: 'Milestone reinforces commitment to data security and enterprise-grade compliance.',
    category: 'Security',
    featured: false,
    pdf: '/press/billcraft-soc2-certification.pdf'
  }
]

const mediaCoverage = [
  {
    outlet: 'TechCrunch',
    title: 'BillCraft is making invoice automation accessible to every small business',
    date: '2024-01-16',
    type: 'Article',
    journalist: 'Sarah Perez',
    link: 'https://techcrunch.com/billcraft-interview',
    logo: '💻'
  },
  {
    outlet: 'Forbes',
    title: 'The Future of Business Finance: How AI is Transforming Invoicing',
    date: '2024-01-12',
    type: 'Feature',
    journalist: 'Alex Conrad',
    link: 'https://forbes.com/billcraft-ai-invoicing',
    logo: '💼'
  },
  {
    outlet: 'Bloomberg',
    title: 'Startup BillCraft Targets $100M Revenue with Invoice Automation',
    date: '2024-01-08',
    type: 'Interview',
    journalist: 'Emily Chang',
    link: 'https://bloomberg.com/billcraft-revenue-target',
    logo: '📈'
  },
  {
    outlet: 'The Wall Street Journal',
    title: 'Small Businesses Turn to AI for Administrative Tasks',
    date: '2023-12-15',
    type: 'Article',
    journalist: 'David Benoit',
    link: 'https://wsj.com/small-business-ai-tools',
    logo: '📰'
  },
  {
    outlet: 'Entrepreneur',
    title: 'How BillCraft CEO Built a $100M Invoice Automation Empire',
    date: '2023-12-01',
    type: 'Profile',
    journalist: 'Jason Feifer',
    link: 'https://entrepreneur.com/billcraft-ceo-profile',
    logo: '🚀'
  },
  {
    outlet: 'Inc.',
    title: 'The Invoice Automation Tools Every Business Needs in 2024',
    date: '2023-11-20',
    type: 'Roundup',
    journalist: 'Bill Murphy Jr.',
    link: 'https://inc.com/invoice-automation-tools-2024',
    logo: '📊'
  }
]

const awards = [
  {
    title: 'Best FinTech Startup',
    organization: 'TechCrunch Disrupt',
    year: '2024',
    category: 'Startup Competition',
    description: 'Winner of the FinTech category for innovative invoice automation platform.',
    logo: '🏆'
  },
  {
    title: 'Product of the Year',
    organization: 'SaaS Awards',
    year: '2023',
    category: 'Business Software',
    description: 'Recognized for exceptional user experience and automation capabilities.',
    logo: '⭐'
  },
  {
    title: 'Rising Star Company',
    organization: 'Forbes',
    year: '2023',
    category: 'Companies to Watch',
    description: 'Selected as one of the most promising startups in business software.',
    logo: '🌟'
  },
  {
    title: 'Innovation Excellence',
    organization: 'Business Intelligence Group',
    year: '2023',
    category: 'AI Innovation',
    description: 'Honored for breakthrough AI-powered invoice generation technology.',
    logo: '💡'
  }
]

const brandAssets = [
  {
    category: 'Logos',
    description: 'BillCraft logos in various formats and sizes',
    items: [
      { name: 'Logo Package (PNG)', size: '2.3 MB', format: 'ZIP' },
      { name: 'Logo Package (SVG)', size: '1.8 MB', format: 'ZIP' },
      { name: 'Logo Package (EPS)', size: '3.1 MB', format: 'ZIP' }
    ],
    icon: ImageIcon
  },
  {
    category: 'Brand Guidelines',
    description: 'Complete brand style guide and usage instructions',
    items: [
      { name: 'Brand Guidelines', size: '5.2 MB', format: 'PDF' },
      { name: 'Logo Usage Guide', size: '2.1 MB', format: 'PDF' },
      { name: 'Color Palette', size: '0.8 MB', format: 'PDF' }
    ],
    icon: FileText
  },
  {
    category: 'Product Screenshots',
    description: 'High-resolution product images and screenshots',
    items: [
      { name: 'Dashboard Screenshots', size: '12.5 MB', format: 'ZIP' },
      { name: 'Mobile App Screenshots', size: '8.3 MB', format: 'ZIP' },
      { name: 'Feature Demos', size: '15.7 MB', format: 'ZIP' }
    ],
    icon: Camera
  },
  {
    category: 'Executive Photos',
    description: 'Professional headshots of leadership team',
    items: [
      { name: 'CEO Headshots', size: '4.2 MB', format: 'ZIP' },
      { name: 'Leadership Team', size: '8.9 MB', format: 'ZIP' },
      { name: 'Event Photos', size: '11.3 MB', format: 'ZIP' }
    ],
    icon: Users
  }
]

const mediaKit = {
  companyOverview: 'BillCraft is the leading AI-powered invoice automation platform helping small and medium businesses streamline their billing processes, improve cash flow, and focus on growth.',
  foundedYear: '2022',
  headquarters: 'San Francisco, CA',
  employees: '150+',
  customers: '25,000+',
  funding: '$35M total raised',
  investors: 'Sequoia Capital, Andreessen Horowitz, Y Combinator'
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              <Newspaper className="w-4 h-4 mr-2" />
              Press Center
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              BillCraft in the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Media
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Stay updated with the latest news, announcements, and media coverage 
              about BillCraft's mission to transform business invoicing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download Media Kit
              </Button>
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Contact Press Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Company Overview
              </h2>
            </motion.div>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
                  {[
                    { label: 'Founded', value: mediaKit.foundedYear },
                    { label: 'Headquarters', value: mediaKit.headquarters },
                    { label: 'Employees', value: mediaKit.employees },
                    { label: 'Customers', value: mediaKit.customers },
                    { label: 'Total Funding', value: mediaKit.funding },
                    { label: 'Countries', value: '25+' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed text-center">
                  {mediaKit.companyOverview}
                </p>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-500">
                    <strong>Investors:</strong> {mediaKit.investors}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Press Releases
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Official announcements and company news
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 ${release.featured ? 'ring-2 ring-blue-500/20' : ''}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          {release.featured && (
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className="border-slate-300 text-slate-600">
                            {release.category}
                          </Badge>
                          <div className="flex items-center text-sm text-slate-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(release.date).toLocaleDateString('en-US')}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                          {release.title}
                        </h3>
                        
                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {release.excerpt}
                        </p>
                      </div>
                      
                      <Button variant="outline" size="sm" className="ml-6 border-slate-300 text-slate-700 hover:bg-slate-50">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Media Coverage
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Recent coverage from leading business and tech publications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {mediaCoverage.map((coverage, index) => (
              <motion.div
                key={coverage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{coverage.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="font-bold text-slate-900">{coverage.outlet}</h4>
                          <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                            {coverage.type}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                          {coverage.title}
                        </h3>
                        
                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                          <span>By {coverage.journalist}</span>
                          <span>{new Date(coverage.date).toLocaleDateString('en-US')}</span>
                        </div>
                        
                        <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Read Article
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Industry recognition for innovation and excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{award.logo}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {award.title}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-1">
                      {award.organization}
                    </p>
                    <Badge className="mb-3 bg-slate-100 text-slate-700 border-slate-200">
                      {award.year}
                    </Badge>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {award.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Brand Assets
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Download logos, brand guidelines, and media assets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandAssets.map((asset, index) => (
              <motion.div
                key={asset.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <asset.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-slate-900">{asset.category}</h3>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-4">
                      {asset.description}
                    </p>
                    
                    <div className="space-y-2">
                      {asset.items.map((item, idx) => (
                        <div key={item.name} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.size} • {item.format}</p>
                          </div>
                          <Download className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Media Inquiries
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              For press inquiries, interview requests, or additional information, 
              please contact our media relations team.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                  <p className="text-slate-300">press@billcraft.com</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                  <p className="text-slate-300">+1 (555) 123-4567</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg font-semibold">
              <Download className="w-5 h-5 mr-2" />
              Download Full Media Kit
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
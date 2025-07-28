'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  TrendingUp,
  FileText,
  Lightbulb,
  Target,
  Users,
  BookOpen,
  Star,
  MessageCircle,
  Share2,
  Eye
} from 'lucide-react'

const featuredPost = {
  title: 'The Ultimate Guide to Invoice Automation in 2024',
  excerpt: 'Discover how AI-powered invoice automation can save your business hours every week and improve cash flow by 40%.',
  content: 'Learn the latest strategies and tools for automating your entire invoicing workflow...',
  author: 'Sarah Chen',
  date: '2024-01-15',
  readTime: '8 min read',
  category: 'Automation',
  tags: ['AI', 'Automation', 'Productivity'],
  image: '📊',
  views: 2847,
  comments: 23,
  featured: true
}

const blogPosts = [
  {
    title: '10 Invoice Design Tips That Get You Paid Faster',
    excerpt: 'Professional invoice design isn\'t just about looks – it\'s about psychology and getting paid on time.',
    author: 'Emily Watson',
    date: '2024-01-12',
    readTime: '5 min read',
    category: 'Design',
    tags: ['Design', 'Psychology', 'Best Practices'],
    image: '🎨',
    views: 1923,
    comments: 15
  },
  {
    title: 'Small Business Cash Flow: Expert Strategies for 2024',
    excerpt: 'Learn how successful entrepreneurs manage cash flow and avoid the #1 reason small businesses fail.',
    author: 'Michael Rodriguez',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Finance',
    tags: ['Cash Flow', 'Small Business', 'Strategy'],
    image: '💰',
    views: 3421,
    comments: 28
  },
  {
    title: 'API Integration Guide: Connect BillCraft to Your Stack',
    excerpt: 'Step-by-step tutorial for integrating BillCraft with your existing business tools using our REST API.',
    author: 'Alex Kim',
    date: '2024-01-08',
    readTime: '15 min read',
    category: 'Development',
    tags: ['API', 'Integration', 'Tutorial'],
    image: '⚡',
    views: 1654,
    comments: 12
  },
  {
    title: 'International Invoicing: Multi-Currency Best Practices',
    excerpt: 'Everything you need to know about invoicing international clients, from currencies to compliance.',
    author: 'Maria Gonzalez',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'International',
    tags: ['International', 'Currency', 'Compliance'],
    image: '🌍',
    views: 2156,
    comments: 19
  },
  {
    title: 'Customer Success Stories: How BillCraft Transformed These Businesses',
    excerpt: 'Real stories from real customers who dramatically improved their invoicing process.',
    author: 'Lisa Wang',
    date: '2024-01-03',
    readTime: '10 min read',
    category: 'Case Studies',
    tags: ['Success Stories', 'Customer Stories', 'ROI'],
    image: '🚀',
    views: 2893,
    comments: 34
  },
  {
    title: 'The Psychology of Payment: Why Some Invoices Get Paid Faster',
    excerpt: 'Behavioral economics principles that can help you get paid 30% faster.',
    author: 'Dr. James Wilson',
    date: '2024-01-01',
    readTime: '6 min read',
    category: 'Psychology',
    tags: ['Psychology', 'Behavioral Economics', 'Payments'],
    image: '🧠',
    views: 1789,
    comments: 21
  }
]

const categories = [
  { name: 'All Posts', count: 47, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Automation', count: 12, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Design', count: 8, color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { name: 'Finance', count: 15, color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Development', count: 6, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'Case Studies', count: 4, color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  { name: 'International', count: 2, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' }
]

const trendingTopics = [
  'Invoice Automation',
  'Cash Flow Management', 
  'API Integration',
  'Multi-Currency Billing',
  'Payment Psychology',
  'Small Business Tips'
]

export default function BlogPage() {
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
              <BookOpen className="w-4 h-4 mr-2" />
              BillCraft Blog
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Insights & Resources for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                Modern Businesses
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Expert advice, industry insights, and practical guides to help you master 
              invoicing, improve cash flow, and grow your business.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search articles, guides, and tutorials..."
                className="pl-12 pr-6 py-4 text-lg border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`${category.color} hover:shadow-lg transition-all duration-300`}
                >
                  {category.name}
                  <Badge className="ml-2 bg-white/80 text-slate-600 border-0">
                    {category.count}
                  </Badge>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Featured Article
              </h2>
              <p className="text-lg text-slate-600">
                Our most popular and impactful content
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <CardContent className="p-0">
                <div className="lg:flex">
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="flex items-center space-x-3 mb-6">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {featuredPost.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-slate-500 mb-6">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(featuredPost.date).toLocaleDateString('en-US')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {featuredPost.views.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {featuredPost.comments}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center p-12">
                    <div className="text-8xl">{featuredPost.image}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200">
                            {post.category}
                          </Badge>
                          <div className="text-3xl">{post.image}</div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-slate-500 mb-4">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.date).toLocaleDateString('en-US')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                            Read More
                            <ArrowRight className="w-3 h-3 ml-2" />
                          </Button>
                          
                          <div className="flex items-center space-x-3 text-xs text-slate-500">
                            <div className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {post.views.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              {post.comments}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4">
                  Load More Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-80 space-y-8">
              
              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Weekly Insights
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Get the latest business tips and BillCraft updates delivered to your inbox.
                  </p>
                  <Input
                    placeholder="Enter your email"
                    className="mb-3"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
              
              {/* Trending Topics */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                    Trending Topics
                  </h3>
                  <div className="space-y-2">
                    {trendingTopics.map((topic, index) => (
                      <button
                        key={topic}
                        className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        #{topic}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Popular Posts */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-600" />
                    Most Popular
                  </h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post, index) => (
                      <div key={post.title} className="flex items-start space-x-3 group cursor-pointer">
                        <div className="text-lg">{post.image}</div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {post.views.toLocaleString()} views
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 
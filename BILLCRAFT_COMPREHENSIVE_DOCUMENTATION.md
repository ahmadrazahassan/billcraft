# 🧾 BillCraft - Comprehensive Project Documentation

![BillCraft Banner](https://img.shields.io/badge/BillCraft-AI%20Invoicing-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=flat-square&logo=firebase)

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Features & Capabilities](#features--capabilities)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [Authentication System](#authentication-system)
7. [AI Integration](#ai-integration)
8. [Invoice Templates](#invoice-templates)
9. [Trial System](#trial-system)
10. [API Endpoints](#api-endpoints)
11. [Frontend Components](#frontend-components)
12. [Landing Pages & Marketing](#landing-pages--marketing)
13. [Environment Setup](#environment-setup)
14. [Deployment](#deployment)
15. [Development Workflow](#development-workflow)


## 🎯 Project Overview

**BillCraft** is a modern, AI-powered invoice management system designed for freelancers, small businesses, and enterprises. The application combines beautiful design, advanced AI assistance, and professional invoicing capabilities into a comprehensive business solution.

### Key Value Propositions
- **AI-Powered**: Advanced AI assistant for smart form filling and business guidance
- **Professional Templates**: 10+ beautiful, industry-specific invoice templates
- **3-Month Free Trial**: Full feature access without credit card requirements
- **Dual Database**: Firebase Auth + Supabase for robust data management
- **Enterprise-Ready**: Scalable architecture with advanced security features


## 🏗️ Architecture & Technology Stack

### **Frontend Stack**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS with custom utilities
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion for smooth interactions
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context + Custom Hooks

### **Backend Stack**
- **Database**: Supabase (PostgreSQL) for main data
- **Authentication**: Firebase Auth for user management
- **AI Service**: Google Gemini API for chat assistance
- **File Processing**: React PDF for invoice generation
- **Admin SDK**: Firebase Admin for server-side operations


### **Development Tools**
- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript with strict mode
- **CSS Processing**: PostCSS with Tailwind
- **Build Tool**: Next.js built-in bundler

### **Architecture Pattern**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   Firebase Auth  │    │   Supabase DB   │
│   (Frontend)    │◄──►│   (Identity)     │◄──►│   (Data Store)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                                                │
         ▼                                                ▼
┌─────────────────┐                            ┌─────────────────┐
│   Gemini AI     │                            │   File Storage  │
│   (Assistant)   │                            │   (Future)      │
└─────────────────┘                            └─────────────────┘
```

---

## ✨ Features & Capabilities

### 🤖 **AI-Powered Features**
- **BillCraft Chat AI**: Context-aware AI assistant for invoice management.
- **Smart Form Filling**: AI auto-populates company info, client details, and invoice items
- **Professional Guidance**: Expert advice for business operations
- **Multiple AI Components**: Floating assistant, invoice-specific AI, and quick prompts
- **Temporary History**: Local storage for chat sessions
- **Flexible Positioning**: Center, left, or right placement options

### 📋 **Professional Invoicing**
- **10+ Beautiful Templates**: Modern Blue, Corporate Navy, Creative Purple, and more
- **Multi-Currency Support**: Handle international clients with 50+ currencies
- **Status Tracking**: Draft, Sent, Paid, Overdue, Cancelled states
- **Auto-Generated Invoice Numbers**: Sequential numbering per user
- **Client Management**: Dedicated client database with full contact management
- **PDF Export**: Professional, print-ready invoice generation
- **Custom Branding**: Company logo and color customization

### 💼 **Business Features**
- **3-Month Free Trial**: Full feature access without credit card
- **Real-time Dashboard**: Statistics, revenue tracking, and analytics
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Team Collaboration**: Multi-user support for enterprises
- **Payment Integration**: Stripe and PayPal support (planned)
- **Automated Reminders**: Smart follow-up for overdue invoices

### 🔧 **Technical Excellence**
- **Type Safety**: Full TypeScript implementation
- **Component Architecture**: Reusable UI components with Radix UI
- **Smooth Animations**: Framer Motion for enhanced UX
- **Security**: Row-level security with comprehensive policies
- **Performance**: Optimized for speed and scalability

---

## 📁 Project Structure

```
billcraft/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard pages
│   │   ├── invoices/           # Invoice management
│   │   ├── clients/            # Client management
│   │   ├── analytics/          # Business analytics
│   │   ├── settings/           # User settings
│   │   └── billing/            # Subscription management
│   ├── auth/                    # Authentication pages
│   │   ├── login/              # Login page
│   │   ├── signup/             # Registration page
│   │   └── forgot-password/    # Password reset
│   ├── api/                     # API routes
│   │   ├── chat/               # AI chat endpoints
│   │   ├── trial/              # Trial management
│   │   ├── test-sync/          # Database sync testing
│   │   └── debug-env/          # Environment debugging
│   └── [marketing pages]/       # Landing pages
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx          # Button component
│   │   ├── card.tsx            # Card component
│   │   ├── dialog.tsx          # Modal component
│   │   └── [other ui]/         # Form controls, navigation, etc.
│   ├── chat/                    # AI chat components
│   │   ├── billcraft-chat-ai.tsx    # Main AI assistant
│   │   ├── floating-ai-assistant.tsx # Floating chat button
│   │   ├── chat-interface.tsx       # Chat UI
│   │   └── quick-invoice-ai.tsx     # Quick invoice generation
│   ├── templates/               # Invoice templates
│   │   ├── modern-blue.tsx     # Modern Blue template
│   │   ├── corporate-navy.tsx  # Corporate Navy template
│   │   ├── creative-purple.tsx # Creative Purple template
│   │   └── [other templates]/  # Additional design templates
│   ├── landing/                 # Landing page components
│   │   ├── header.tsx          # Navigation header
│   │   ├── hero.tsx            # Hero section
│   │   ├── features.tsx        # Features showcase
│   │   ├── pricing.tsx         # Pricing plans
│   │   └── footer.tsx          # Site footer
│   ├── auth/                    # Authentication components
│   │   └── protected-route.tsx # Route protection
│   └── trial/                   # Trial system components
│       └── trial-dashboard.tsx # Trial management UI
├── lib/                         # Utility libraries
│   ├── firebase.ts             # Firebase client config
│   ├── firebase-admin.ts       # Firebase admin config
│   ├── supabase.ts             # Supabase client config
│   ├── database.ts             # Database service layer
│   ├── utils.ts                # Utility functions
│   └── sample-invoice-data.ts  # Sample data generator
├── contexts/                    # React contexts
│   └── auth-context.tsx        # Authentication context
├── hooks/                       # Custom React hooks
│   ├── use-ai-form-fill.ts     # AI form filling hook
│   ├── use-chat.ts             # Chat functionality hook
│   ├── use-trial.ts            # Trial management hook
│   ├── use-toast.ts            # Toast notifications hook
│   └── use-supabase-sync.ts    # Database sync hook
├── public/                      # Static assets
│   ├── templates/              # Template preview images
│   ├── favicon.ico             # Site favicon
│   └── [other assets]/         # Images, icons, etc.
├── [config files]/              # Configuration files
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── components.json         # shadcn/ui configuration
│   └── package.json            # Dependencies and scripts
└── [documentation]/             # Project documentation
    ├── README.md               # Main readme
    ├── SUPABASE_SETUP_INSTRUCTIONS.md
    ├── TRIAL_SYSTEM_README.md
    ├── ENVIRONMENT_SETUP.md
    └── AI_ASSISTANT_FEATURES.md
```

---

## 🗄️ Database Schema

The application uses Supabase (PostgreSQL) with a comprehensive schema designed for multi-tenancy and security.

### **Core Tables**

#### 1. **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'professional', 'enterprise')),
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. **Invoices Table**
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  template TEXT DEFAULT 'modern-blue',
  
  -- Invoice details
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  
  -- Company info
  company_name TEXT,
  company_email TEXT,
  company_phone TEXT,
  company_address TEXT,
  company_city TEXT,
  company_website TEXT,
  
  -- Client info
  client_name TEXT,
  client_email TEXT,
  client_address TEXT,
  client_city TEXT,
  
  -- Financial data
  subtotal DECIMAL(10,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  
  -- Additional info
  notes TEXT,
  terms TEXT,
  
  -- Metadata
  sent_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, invoice_number)
);
```

#### 3. **Invoice Items Table**
```sql
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10,3) DEFAULT 1,
  rate DECIMAL(10,2) DEFAULT 0,
  amount DECIMAL(10,2) DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. **Clients Table**
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  address TEXT,
  city TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. **Trials Table**
```sql
CREATE TABLE trials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('professional', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'converted')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  features JSONB,
  usage_stats JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Security Features**
- **Row Level Security (RLS)**: Enabled on all tables
- **Multi-tenancy**: Users can only access their own data
- **Firebase Integration**: Secure authentication with JWT tokens
- **Automated Triggers**: Auto-update timestamps
- **Performance Indexes**: Optimized queries for common operations

---

## 🔐 Authentication System

### **Dual Authentication Architecture**
The application uses a sophisticated dual authentication system combining Firebase and Supabase:

#### **Firebase Authentication**
- **Primary Identity Provider**: Handles user authentication
- **OAuth Support**: Google, email/password authentication
- **Security Features**: Email verification, password reset
- **Token Management**: JWT tokens for secure API access

#### **Supabase Integration**
- **User Sync**: Automatic Firebase to Supabase user synchronization
- **Data Access**: Row-level security based on Firebase UID
- **Trial Management**: Automatic 3-month trial activation

### **Authentication Flow**
```
1. User signs up/in with Firebase
2. AuthContext monitors authentication state
3. User data automatically syncs to Supabase
4. 3-month trial activated for new users
5. JWT token validates all API requests
6. RLS policies enforce data isolation
```

### **Key Components**
- **AuthContext**: React context for authentication state
- **ProtectedRoute**: Component for route protection
- **User Service**: Database operations for user management
- **Auto-sync**: Automatic user synchronization system

---

## 🤖 AI Integration

### **BillCraft Chat AI**
The application features a sophisticated AI assistant powered by Google Gemini API.

#### **Core Features**
- **Context-Aware Conversations**: Understands invoice and business context
- **Smart Form Filling**: Auto-populates invoice fields with realistic data
- **Professional Guidance**: Expert advice for business operations
- **Temporary History**: Local storage for chat sessions
- **Multiple Positioning**: Center, left, or right placement

#### **AI Components**
1. **BillCraftChatAI**: Main chat interface with advanced features
2. **FloatingAIAssistant**: Global floating chat button
3. **InvoiceAIAssistant**: Invoice-specific AI assistance
4. **QuickInvoiceAI**: Rapid invoice generation

#### **AI Form Filling Capabilities**
- **Company Information**: Generate realistic business details
- **Client Details**: Create professional client information
- **Invoice Items**: Smart service descriptions with pricing
- **Terms & Conditions**: Professional payment terms
- **Smart Calculations**: Automatic pricing optimization

#### **Implementation**
```typescript
// AI Service Integration
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

// Chat API Endpoint
POST /api/chat
{
  "message": "Help me create an invoice",
  "history": [...],
  "systemInstruction": "BillCraft assistant instructions"
}
```

---

## 🎨 Invoice Templates

### **Available Templates**
The application includes 10 professionally designed invoice templates:

1. **Modern Blue** - Clean and professional design
2. **Corporate Navy** - Enterprise-focused layout
3. **Creative Purple** - Modern and artistic styling
4. **Creative Teal** - Fresh and vibrant design
5. **Corporate Red** - Bold and professional
6. **Minimal Black** - Sleek and simple
7. **Modern Orange** - Energetic and contemporary
8. **Classic Green** - Traditional and reliable
9. **Classic Brown** - Warm and professional
10. **Minimal White** - Clean and minimalist

### **Template Features**
- **Responsive Design**: Adapts to different screen sizes
- **PDF Export**: High-quality print-ready output
- **Custom Branding**: Company logo and color integration
- **Professional Typography**: Carefully selected fonts
- **Invoice Elements**: Comprehensive invoice information display

### **Template Architecture**
```typescript
interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  company: CompanyInfo
  client: ClientInfo
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  notes?: string
  terms?: string
}

export function ModernBlueTemplate({ 
  data, 
  isPreview = false 
}: TemplateProps) {
  // Template implementation
}
```

---

## 🎯 Trial System

### **3-Month Free Trial**
BillCraft offers a comprehensive trial system providing full access to Professional or Enterprise features.

#### **Trial Features**
- **Duration**: 90 days of full feature access
- **Plans Available**: Professional ($15/month value) and Enterprise ($49/month value)
- **Total Value**: Up to $147 in free access
- **No Credit Card**: Immediate access without payment information

#### **Professional Trial Features**
- ✅ Unlimited invoices
- ✅ Advanced automation
- ✅ Custom branding
- ✅ Multi-currency support
- ✅ Advanced analytics
- ✅ Priority support
- ✅ Team collaboration (up to 3 users)
- ✅ Payment integrations

#### **Enterprise Trial Features**
- ✅ Everything in Professional
- ✅ Unlimited team members
- ✅ API access & webhooks
- ✅ SSO integration
- ✅ Advanced security
- ✅ White-label solution
- ✅ Custom integrations
- ✅ Dedicated support

#### **Trial Management API**
```typescript
// Start Trial
POST /api/trial/start
{
  "plan": "professional" | "enterprise"
}

// Check Trial Status
GET /api/trial/status

// Upgrade Trial
POST /api/trial/upgrade
{
  "newPlan": "professional" | "enterprise",
  "paymentMethodId": "pm_xxx",
  "promoCode": "WELCOME30"
}
```

#### **Trial Dashboard Component**
```typescript
import { TrialDashboard } from '@/components/trial/trial-dashboard'

<TrialDashboard 
  userId={user.uid} 
  onUpgrade={handleUpgrade} 
/>
```

---

## 🔌 API Endpoints

### **Core API Routes**

#### **Chat AI Endpoints**
```
POST /api/chat
- AI chat conversations
- Context-aware responses
- Form filling assistance
```

#### **Trial Management**
```
POST /api/trial/start
- Start new 3-month trial
- Supports Professional/Enterprise plans

GET /api/trial/status
- Current trial information
- Remaining days calculation
- Feature access overview

POST /api/trial/upgrade
- Convert trial to paid subscription
- Payment processing
- Promo code support
```

#### **Database Testing**
```
GET /api/test-sync
- Test Supabase connection
- User synchronization testing

GET /api/debug-env
- Environment variable validation
- Configuration debugging
```

#### **Planned API Endpoints**
```
GET /api/invoices
- Retrieve user invoices
- Filtering and pagination

POST /api/invoices
- Create new invoice
- Invoice validation

PUT /api/invoices/{id}
- Update existing invoice
- Status management

DELETE /api/invoices/{id}
- Delete invoice
- Cascade item deletion

GET /api/clients
- Client management
- Contact information

POST /api/clients
- Add new client
- Validation and storage
```

---

## 🎨 Frontend Components

### **UI Component Library**
Built on Radix UI primitives with custom styling:

#### **Core Components**
- **Button**: Flexible button component with variants
- **Card**: Content container with elevation
- **Dialog**: Modal and drawer components
- **Form**: Form controls with validation
- **Navigation**: Menu and navigation components
- **Table**: Data display and management
- **Toast**: Notification system

#### **Business Components**
- **InvoiceTemplates**: Template rendering system
- **ClientManager**: Client management interface
- **DashboardStats**: Analytics and metrics display
- **TrialDashboard**: Trial management interface

#### **AI Components**
- **BillCraftChatAI**: Main AI assistant interface
- **ChatInterface**: Reusable chat component
- **FloatingAIAssistant**: Global AI access button
- **AIFormFill**: Smart form completion

#### **Authentication Components**
- **ProtectedRoute**: Route access control
- **AuthForms**: Login/signup interfaces
- **UserProfile**: Profile management

---

## 🌐 Landing Pages & Marketing

### **Marketing Pages**
The application includes comprehensive marketing pages:

#### **Core Landing Pages**
- **Homepage**: Hero section with value proposition
- **Features**: Detailed feature showcase
- **Pricing**: Subscription plans and trial information
- **Templates**: Invoice template gallery
- **About**: Company information and mission

#### **Support Pages**
- **Help**: Documentation and support resources
- **Contact**: Contact forms and information
- **Blog**: Content marketing platform
- **Docs**: API and developer documentation

#### **Legal Pages**
- **Terms of Service**: Legal terms and conditions
- **Privacy Policy**: Data protection information
- **Careers**: Job listings and company culture

#### **Business Pages**
- **Partners**: Integration and partnership information
- **Press**: Media resources and press releases
- **Testimonials**: Customer success stories
- **Integrations**: Third-party service connections

### **Marketing Features**
- **Responsive Design**: Mobile-optimized layouts
- **SEO Optimization**: Search engine friendly
- **Performance**: Fast loading times
- **Conversion Optimization**: Strategic CTAs and funnels
- **Analytics Ready**: Tracking and measurement setup

---

## ⚙️ Environment Setup

### **Required Environment Variables**

#### **Firebase Configuration (Required)**
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### **Supabase Configuration (Required)**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

#### **Firebase Admin SDK (Optional)**
```bash
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

#### **AI Configuration (Required)**
```bash
GEMINI_API_KEY=your_gemini_api_key
```

### **Setup Instructions**

1. **Clone Repository**
```bash
git clone https://github.com/ahmadrazahassan/billcraft.git
cd billcraft
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Setup Databases**
```bash
# Run supabase-schema.sql in your Supabase SQL Editor
# Configure Firebase Authentication
```

5. **Start Development Server**
```bash
npm run dev
```

---

## 🚀 Deployment

### **Deployment Platforms**
The application is optimized for deployment on:

#### **Vercel (Recommended)**
- **Automatic Deployments**: Git-based deployment
- **Environment Variables**: Secure configuration management
- **Performance**: Global CDN and optimization
- **Scaling**: Automatic scaling based on demand

#### **Other Platforms**
- **Netlify**: Alternative deployment platform
- **Railway**: Database and application hosting
- **Heroku**: Traditional PaaS deployment

### **Deployment Configuration**

#### **Build Settings**
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

#### **Environment Variables**
All environment variables must be configured in the deployment platform:
- Firebase configuration
- Supabase credentials
- AI API keys
- Admin SDK credentials

#### **Domain Configuration**
- **Firebase Auth**: Add deployed domain to authorized domains
- **CORS**: Configure cross-origin requests
- **SSL**: Ensure HTTPS for all environments

---

## 🛠️ Development Workflow

### **Development Scripts**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### **Code Quality**
- **TypeScript**: Strict type checking
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (optional)
- **Git Hooks**: Pre-commit validation

### **Testing Strategy**
- **Component Testing**: React component validation
- **API Testing**: Endpoint functionality verification
- **Database Testing**: Data operations validation
- **Integration Testing**: End-to-end workflow testing

### **Database Migrations**
- **Schema Updates**: Version-controlled database changes
- **Data Migrations**: Safe data transformation
- **Rollback Strategy**: Reversible changes

### **Performance Monitoring**
- **Core Web Vitals**: Performance metrics tracking
- **Error Monitoring**: Application error tracking
- **Analytics**: User behavior and conversion tracking
- **Database Performance**: Query optimization

---

## 📊 Business Intelligence

### **Analytics & Metrics**
- **User Engagement**: Session duration, page views
- **Conversion Tracking**: Trial signups, upgrades
- **Invoice Metrics**: Creation rates, completion rates
- **Revenue Tracking**: Subscription metrics, churn rates

### **Dashboard Features**
- **Real-time Statistics**: Live business metrics
- **Revenue Analytics**: Income tracking and forecasting
- **User Analytics**: Customer behavior insights
- **Performance Monitoring**: System health metrics

---

## 🔮 Future Roadmap

### **Planned Features**
- [ ] **Payment Integration**: Stripe/PayPal integration
- [ ] **PDF Generation**: Advanced PDF export capabilities
- [ ] **Email System**: Automated invoice sending
- [ ] **Client Portal**: Customer self-service portal
- [ ] **Recurring Invoices**: Subscription billing
- [ ] **Advanced Analytics**: Business intelligence dashboard
- [ ] **Mobile Application**: Native iOS/Android apps
- [ ] **API Access**: Public API for integrations

### **Technical Improvements**
- [ ] **Performance Optimization**: Speed and efficiency improvements
- [ ] **Security Enhancements**: Advanced security features
- [ ] **Scalability**: Infrastructure scaling capabilities
- [ ] **Accessibility**: WCAG compliance improvements
- [ ] **Internationalization**: Multi-language support

---

## 🆘 Support & Troubleshooting

### **Debug Tools**
- `/debug-fix`: Application debugging interface
- `/debug-supabase`: Database connection testing
- Environment validation endpoints
- Comprehensive error logging

### **Common Issues**
1. **Authentication Problems**: Firebase configuration issues
2. **Database Sync**: Supabase connection problems
3. **AI Assistant**: Gemini API configuration
4. **Environment Variables**: Missing or incorrect configuration

### **Support Resources**
- **Documentation**: Comprehensive setup guides
- **Debug Tools**: Built-in troubleshooting features
- **Error Handling**: Graceful error management
- **Logging**: Detailed application logging

---

## 📄 License & Credits

### **License**
This project is licensed under the MIT License.

### **Technologies Used**
- **Next.js**: React framework
- **Supabase**: Database platform
- **Firebase**: Authentication service
- **Google Gemini**: AI service
- **Radix UI**: Component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### **Development Team**
Built with ❤️ using modern web technologies and best practices.

---

*This documentation provides a comprehensive overview of the BillCraft project. For specific implementation details, refer to the individual documentation files and code comments.* 
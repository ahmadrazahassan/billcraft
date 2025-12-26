# 🧾 BillCraft - AI-Powered Invoice Management System

![BillCraft Banner](https://img.shields.io/badge/BillCraft-AI%20Invoicing-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=flat-square&logo=firebase)

BillCraft is a modern, AI-powered invoice management system built with Next.js 14, featuring advanced AI assistance, beautiful invoice templates, and a comprehensive trial system.

## ✨ Features

### 🤖 **AI-Powered Assistant**
- **BillCraft Chat AI** - Context-aware AI assistant for invoice management
- **Smart Form Filling** - AI auto-populates company info, client details, and invoice items
- **Professional Guidance** - Expert advice for business operations
- **Multiple AI Components** - Floating assistant, invoice-specific AI, and quick prompts

### 📋 **Professional Invoicing**
- **10+ Beautiful Templates** - Modern Blue, Corporate Navy, Creative Purple, and more
- **Multi-Currency Support** - Handle international clients with ease
- **Status Tracking** - Draft, Sent, Paid, Overdue, Cancelled states
- **Auto-Generated Invoice Numbers** - Sequential numbering per user
- **Client Management** - Dedicated client database with full contact management

### 💼 **Business Features**
- **3-Month Free Trial** - Full feature access without credit card
- **Real-time Dashboard** - Statistics, revenue tracking, and analytics
- **Professional Templates** - Multiple invoice designs for different industries
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### 🔧 **Technical Excellence**
- **Modern Tech Stack** - Next.js 14, React 18, TypeScript, Tailwind CSS
- **Dual Database** - Firebase Auth + Supabase for robust data management
- **Type Safety** - Full TypeScript implementation
- **Component Architecture** - Reusable UI components with Radix UI
- **Smooth Animations** - Framer Motion for enhanced UX

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Firebase account
- OpenRouter API key (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ahmadrazahassan/billcraft.git
cd billcraft
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Configuration (OpenRouter)
OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Database Setup**
- Set up your Supabase database using the provided `supabase-schema.sql`
- Configure Firebase Authentication
- See `SUPABASE_SETUP_INSTRUCTIONS.md` for detailed setup

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
billcraft/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard pages
│   ├── auth/                    # Authentication pages
│   ├── api/                     # API routes
│   └── landing pages/           # Marketing pages
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── chat/                    # AI chat components
│   ├── templates/               # Invoice templates
│   └── landing/                 # Landing page components
├── lib/                         # Utility libraries
├── contexts/                    # React contexts
├── hooks/                       # Custom React hooks
└── public/                      # Static assets
```

## 🗄️ Database Schema

The application uses a robust database schema with the following main tables:
- **users** - User profiles and settings
- **invoices** - Invoice data with full details
- **invoice_items** - Line items for invoices
- **clients** - Client management
- **trials** - Trial system tracking

See `supabase-schema.sql` for the complete schema.

## 🤖 AI Features

### BillCraft Chat AI
- Context-aware conversations about invoicing
- Smart form filling capabilities
- Professional business guidance
- Multiple positioning options (center, left, right)

### AI Form Filling
- Auto-generate company information
- Create professional client details
- Generate realistic invoice items with pricing
- Provide professional terms and conditions

## 📋 Available Templates

1. **Modern Blue** - Clean and professional
2. **Corporate Navy** - Enterprise-focused design
3. **Creative Purple** - Modern and artistic
4. **Creative Teal** - Fresh and vibrant
5. **Corporate Red** - Bold and professional
6. **Minimal Black** - Sleek and simple
7. **Modern Orange** - Energetic and modern
8. **Classic Green** - Traditional and reliable
9. **Classic Brown** - Warm and professional
10. **Minimal White** - Clean and minimalist

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## 📖 Documentation

### Quick Start
- **`QUICK_START_OPENROUTER.md`** - 🚀 Get AI running in 5 minutes!
- **`INTEGRATION_COMPLETE.md`** - ✅ Integration summary and status

### AI System
- **`AI_ADVANCED_TRAINING.md`** - 🤖 Complete AI capabilities (ultra-advanced)
- **`OPENROUTER_SETUP.md`** - 🔧 OpenRouter setup and configuration
- **`AI_ASSISTANT_FEATURES.md`** - 💬 AI features documentation

### Setup & Configuration
- `TRIAL_SYSTEM_README.md` - Complete trial system documentation
- `SUPABASE_SETUP_INSTRUCTIONS.md` - Database setup guide
- `ENVIRONMENT_SETUP.md` - Environment configuration
- `BILLCRAFT_COMPREHENSIVE_DOCUMENTATION.md` - Full technical documentation

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Technologies
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Firebase Auth
- **AI**: OpenRouter (GPT-3.5 Turbo, GPT-4, Claude, etc.)
- **Forms**: React Hook Form with Zod validation

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Heroku

Make sure to configure all environment variables in your deployment platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the documentation files in the repository
2. Review the debug tools available at `/debug-fix`
3. Open an issue on GitHub

## 🎯 Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] PDF generation and export
- [ ] Email sending system
- [ ] Client portal
- [ ] Recurring invoices
- [ ] Advanced analytics
- [ ] Mobile application
- [ ] API access

---

Built with ❤️ using Next.js and modern web technologies. 
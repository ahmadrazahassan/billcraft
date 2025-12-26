# Technology Stack

## Framework & Core

- **Next.js 14**: App Router architecture with React Server Components
- **React 18**: Client-side interactivity
- **TypeScript 5**: Full type safety across the codebase
- **Node.js 18+**: Runtime environment

## Styling & UI

- **Tailwind CSS 3**: Utility-first CSS framework with custom design system
- **Radix UI**: Accessible, unstyled component primitives
- **Framer Motion**: Animation library for smooth transitions
- **GSAP**: Advanced animations
- **Lucide React**: Icon library
- **shadcn/ui**: Component architecture pattern

## Database & Authentication

- **Firebase**: Authentication (email/password, Google OAuth)
- **Supabase**: PostgreSQL database for application data
- **Dual Database Pattern**: Firebase for auth, Supabase for business data with sync mechanism

## AI Integration

- **OpenRouter API**: AI service provider (GPT-3.5, GPT-4, Claude)
- **Google Generative AI**: Alternative AI provider
- Context-aware chat system with form filling capabilities

## Forms & Validation

- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## PDF & Documents

- **@react-pdf/renderer**: PDF generation
- **jsPDF**: Alternative PDF library
- **html2canvas**: HTML to canvas conversion

## Common Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Environment Setup
# Copy .env.example to .env.local and configure:
# - Firebase credentials (auth)
# - Supabase credentials (database)
# - OpenRouter API key (AI)
```

## Environment Variables Required

- `NEXT_PUBLIC_FIREBASE_*`: Firebase client config
- `FIREBASE_*`: Firebase admin config (server-side)
- `NEXT_PUBLIC_SUPABASE_*`: Supabase client config
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase admin key (server-side)
- `OPENROUTER_API_KEY`: AI service key
- `NEXT_PUBLIC_SITE_URL`: Application URL

## Key Dependencies

- `class-variance-authority`: Component variant management
- `clsx` + `tailwind-merge`: Conditional className utilities
- `date-fns`: Date manipulation
- `uuid`: Unique identifier generation

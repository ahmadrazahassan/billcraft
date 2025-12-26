# Project Structure

## Directory Organization

```
billcraft/
├── app/                    # Next.js App Router (pages & routing)
│   ├── api/               # API routes (server-side endpoints)
│   ├── dashboard/         # Protected dashboard pages
│   ├── auth/              # Authentication pages (login, signup)
│   ├── [feature]/         # Feature-specific pages (about, pricing, etc.)
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles & CSS variables
│
├── components/            # React components
│   ├── ui/               # Reusable UI primitives (buttons, cards, forms)
│   ├── chat/             # AI chat components
│   ├── templates/        # Invoice template components
│   ├── landing/          # Landing page sections
│   ├── auth/             # Authentication components
│   └── trial/            # Trial system components
│
├── lib/                   # Utility libraries & services
│   ├── supabase.ts       # Supabase client & types
│   ├── firebase.ts       # Firebase client config
│   ├── firebase-admin.ts # Firebase admin SDK (server-side)
│   ├── database.ts       # Database service layer
│   ├── ai-service.ts     # AI integration service
│   ├── utils.ts          # General utilities (cn, etc.)
│   └── [feature].ts      # Feature-specific utilities
│
├── contexts/              # React Context providers
│   └── auth-context.tsx  # Authentication state management
│
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts       # Authentication hook
│   ├── use-chat.ts       # AI chat hook
│   ├── use-toast.ts      # Toast notifications
│   └── use-*.ts          # Feature-specific hooks
│
├── public/               # Static assets (images, icons, manifests)
├── docs/                 # Documentation files
└── scripts/              # Build & utility scripts
```

## Architecture Patterns

### Component Organization

- **UI Components** (`components/ui/`): Atomic, reusable primitives built on Radix UI
- **Feature Components** (`components/[feature]/`): Domain-specific, composed components
- **Page Components** (`app/[route]/page.tsx`): Route-level components using App Router

### Data Flow

1. **Client-side**: React components → Context/Hooks → Firebase Auth
2. **Server-side**: API routes → Firebase Admin → Supabase
3. **Sync Pattern**: Firebase Auth changes trigger Supabase user sync via API

### Styling Conventions

- Use Tailwind utility classes for styling
- Custom design tokens defined in `tailwind.config.js`
- CSS variables in `globals.css` for theme values
- `cn()` utility from `lib/utils.ts` for conditional classes
- Component variants managed with `class-variance-authority`

### Type Safety

- Full TypeScript coverage required
- Database types defined in `lib/supabase.ts` (Database interface)
- Strict mode enabled in `tsconfig.json`
- Path aliases: `@/*` maps to project root

### State Management

- **Authentication**: Context API (`contexts/auth-context.tsx`)
- **Forms**: React Hook Form + Zod validation
- **Server State**: Direct API calls (no global state library)
- **UI State**: Local component state or custom hooks

### File Naming

- Components: PascalCase (e.g., `Button.tsx`, `InvoiceCard.tsx`)
- Utilities: kebab-case (e.g., `use-auth.ts`, `ai-service.ts`)
- Pages: kebab-case folders (e.g., `app/dashboard/`, `app/auth/`)
- API routes: kebab-case (e.g., `app/api/test-sync/route.ts`)

### Code Organization Rules

- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Use server components by default, add `'use client'` only when needed
- API routes for server-side operations (database writes, admin operations)
- Separate business logic from UI components (use `lib/` services)

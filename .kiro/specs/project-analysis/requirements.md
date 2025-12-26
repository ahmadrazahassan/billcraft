# BillCraft Project Analysis - Requirements Document

## Introduction

This document provides a comprehensive analysis of the BillCraft AI-powered invoice management system. BillCraft is a production-ready Next.js 14 application that combines professional invoicing capabilities with advanced AI assistance, featuring a dual-database architecture (Firebase + Supabase), 30 modern invoice templates, and a sophisticated 3-month trial system.

## Glossary

- **BillCraft System**: The complete AI-powered invoice management platform
- **Firebase Auth**: Authentication service managing user identity and sessions
- **Supabase Database**: PostgreSQL database storing business data (invoices, clients, trials)
- **OpenRouter AI**: AI service provider enabling GPT-3.5/GPT-4/Claude integration
- **Invoice Template**: Pre-designed invoice layout with specific styling and branding
- **Trial System**: 3-month free trial mechanism with usage tracking and conversion metrics
- **Floating AI Assistant**: Global AI chat interface available across all pages
- **Form Filling AI**: Intelligent data extraction and auto-population capability
- **User Sync**: Process of synchronizing Firebase authentication with Supabase database
- **Dashboard**: Protected user interface displaying business metrics and recent activity
- **Client Management**: System for storing and organizing customer information
- **Invoice Status**: State tracking (draft, sent, paid, overdue, cancelled)
- **Template Registry**: Central configuration defining all 30 available invoice templates
- **API Route**: Server-side endpoint handling business logic and database operations
- **Context Provider**: React pattern for managing global application state
- **Custom Hook**: Reusable React logic for specific functionality (auth, chat, trial)

## Requirements

### Requirement 1: User Authentication and Account Management

**User Story:** As a business owner, I want to securely create an account and log in, so that I can access my invoicing data from any device.

#### Acceptance Criteria

1. WHEN a user visits the signup page, THE BillCraft System SHALL display email/password and Google OAuth registration options
2. WHEN a user successfully registers, THE BillCraft System SHALL create a Firebase authentication record AND synchronize user data to Supabase database within 3 seconds
3. WHEN a user logs in with valid credentials, THE BillCraft System SHALL authenticate via Firebase AND retrieve associated Supabase user profile
4. IF user sync fails during registration, THEN THE BillCraft System SHALL retry synchronization up to 3 times with exponential backoff
5. WHEN a user's Firebase authentication state changes, THE BillCraft System SHALL automatically trigger Supabase synchronization via API route

### Requirement 2: AI-Powered Invoice Assistance

**User Story:** As a freelancer, I want AI to help me create professional invoices quickly, so that I can spend less time on administrative tasks.

#### Acceptance Criteria

1. WHEN a user opens the floating AI assistant, THE BillCraft System SHALL display a context-aware chat interface with mode-specific suggestions
2. WHEN a user provides business information in natural language, THE BillCraft System SHALL extract structured data with 95% accuracy AND return JSON-formatted form data
3. WHEN a user requests invoice form filling, THE BillCraft System SHALL auto-populate company details, client information, line items, and payment terms
4. WHEN AI processes a chat message, THE BillCraft System SHALL respond within 5 seconds using OpenRouter API with GPT-3.5 Turbo model
5. WHILE the user is on the invoice creation page, THE BillCraft System SHALL provide invoice-specific AI suggestions and guidance

### Requirement 3: Professional Invoice Creation and Management

**User Story:** As a consultant, I want to create professional-looking invoices with my branding, so that I can maintain a professional image with clients.

#### Acceptance Criteria

1. WHEN a user creates a new invoice, THE BillCraft System SHALL provide access to 30 professionally designed templates across 6 categories
2. WHEN a user selects a template, THE BillCraft System SHALL render the invoice with template-specific colors, fonts, and layout styling
3. WHEN a user saves an invoice, THE BillCraft System SHALL generate a sequential invoice number in format "INV-YYYY-###" unique to that user
4. WHEN a user adds line items, THE BillCraft System SHALL automatically calculate subtotal, tax, discount, and total amounts with 2-decimal precision
5. WHEN a user changes invoice status to "sent", THE BillCraft System SHALL record the sent_at timestamp AND update trial usage statistics

### Requirement 4: Client Database Management

**User Story:** As a small business owner, I want to store and manage my client information, so that I can quickly create invoices for repeat customers.

#### Acceptance Criteria

1. WHEN a user creates a new client, THE BillCraft System SHALL store name, email, address, city, phone, and notes in Supabase database
2. WHEN a user views their client list, THE BillCraft System SHALL display all clients ordered by creation date descending
3. WHEN a user creates an invoice, THE BillCraft System SHALL allow selection from existing clients to auto-fill client details
4. WHEN a user updates client information, THE BillCraft System SHALL update the database record AND maintain updated_at timestamp
5. WHEN a user creates a new client, THE BillCraft System SHALL increment the trial usage "customersAdded" counter

### Requirement 5: Trial System with Usage Tracking

**User Story:** As a new user, I want to try BillCraft for free for 3 months, so that I can evaluate if it meets my business needs before committing to a paid plan.

#### Acceptance Criteria

1. WHEN a new user completes registration, THE BillCraft System SHALL automatically create a trial record with 90-day duration ending at 23:59:59 on the final day
2. WHEN a user accesses the dashboard, THE BillCraft System SHALL display trial status including days remaining, progress percentage, and usage statistics
3. WHEN a user creates an invoice, THE BillCraft System SHALL increment "invoicesCreated" counter in trial usage_stats
4. WHEN a user marks an invoice as paid, THE BillCraft System SHALL increment "paymentsProcessed" counter in trial usage_stats
5. WHEN trial end date is reached, THE BillCraft System SHALL automatically update trial status to "expired" AND display upgrade prompts

### Requirement 6: Real-Time Dashboard Analytics

**User Story:** As a business owner, I want to see my business metrics at a glance, so that I can track revenue and invoice status quickly.

#### Acceptance Criteria

1. WHEN a user accesses the dashboard, THE BillCraft System SHALL display total revenue, total invoices, total clients, and pending invoices within 2 seconds
2. WHEN calculating monthly revenue, THE BillCraft System SHALL sum all paid invoices from the current calendar month
3. WHEN displaying recent invoices, THE BillCraft System SHALL show the 4 most recent invoices with status badges and client names
4. WHEN a user has no invoices, THE BillCraft System SHALL display an empty state with "Create Invoice" call-to-action
5. WHEN dashboard loads, THE BillCraft System SHALL verify user sync status AND offer manual sync if needed

### Requirement 7: Multi-Template Invoice System

**User Story:** As a creative professional, I want to choose from various invoice designs, so that I can match my brand aesthetic.

#### Acceptance Criteria

1. WHEN a user browses templates, THE BillCraft System SHALL display 30 templates organized into 6 categories (ultra-minimal, modern-tech, creative-bold, luxury-premium, corporate-pro, futuristic)
2. WHEN a user selects a template, THE BillCraft System SHALL apply template-specific primaryColor, textColor, borderColor, backgroundColor, and fontFamily
3. WHEN rendering a premium template, THE BillCraft System SHALL display a "Premium" badge AND check user's plan eligibility
4. WHEN a user previews a template, THE BillCraft System SHALL render a live preview with sample invoice data
5. WHERE a template uses custom fonts, THE BillCraft System SHALL load appropriate font families (Inter, Playfair Display, JetBrains Mono)

### Requirement 8: Dual Database Architecture

**User Story:** As a system administrator, I want reliable data storage with proper separation of concerns, so that authentication and business data are managed optimally.

#### Acceptance Criteria

1. WHEN a user authenticates, THE BillCraft System SHALL use Firebase Authentication for identity management
2. WHEN storing business data, THE BillCraft System SHALL use Supabase PostgreSQL database with full TypeScript type safety
3. WHEN a Firebase user is created, THE BillCraft System SHALL create corresponding Supabase user record via server-side API route
4. IF Supabase service key is missing, THEN THE BillCraft System SHALL return descriptive error with setup instructions
5. WHEN performing database operations, THE BillCraft System SHALL use Supabase Admin client with service role key for server-side operations

### Requirement 9: API Route Architecture

**User Story:** As a developer, I want well-structured API routes, so that server-side operations are secure and maintainable.

#### Acceptance Criteria

1. WHEN a client makes an API request, THE BillCraft System SHALL validate request body AND return appropriate HTTP status codes
2. WHEN the /api/test-sync endpoint is called, THE BillCraft System SHALL perform diagnostics AND sync Firebase user to Supabase
3. WHEN the /api/chat endpoint receives a message, THE BillCraft System SHALL forward to OpenRouter API AND return AI response within 5 seconds
4. WHEN an API error occurs, THE BillCraft System SHALL return JSON error response with descriptive message AND troubleshooting guidance
5. WHEN environment variables are missing, THE BillCraft System SHALL return 500 status with configuration instructions

### Requirement 10: Responsive Design and User Experience

**User Story:** As a mobile user, I want to access BillCraft on my phone, so that I can manage invoices while traveling.

#### Acceptance Criteria

1. WHEN a user accesses BillCraft on mobile, THE BillCraft System SHALL display responsive layout optimized for screen sizes 320px and above
2. WHEN a user navigates between pages, THE BillCraft System SHALL provide smooth transitions using Framer Motion animations
3. WHEN a user interacts with forms, THE BillCraft System SHALL provide real-time validation with React Hook Form and Zod schemas
4. WHEN a user performs actions, THE BillCraft System SHALL display toast notifications for success and error feedback
5. WHEN a user scrolls on landing page, THE BillCraft System SHALL display smooth scroll progress indicator at top of viewport

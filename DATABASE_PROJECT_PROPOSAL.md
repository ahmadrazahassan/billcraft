# DATABASE SYSTEM PROJECT PROPOSAL
## BillCraft - AI-Powered Invoice Management System

---

**Submitted By:** [Your Name]
**Course:** Database Systems (BSCS)
**Institution:** [Your University Name]
**Date:** October 24, 2025

---

## TABLE OF CONTENTS

1. [Project Description](#1-project-description)
2. [Target Users](#2-target-users)
3. [Functionalities](#3-functionalities)
4. [Database Objects](#4-database-objects)
5. [Data Relationships](#5-data-relationships)
6. [Technical Architecture](#6-technical-architecture)
7. [Conclusion](#7-conclusion)

---

## 1. PROJECT DESCRIPTION

### 1.1 Overview

**BillCraft** is a comprehensive, AI-powered invoice management system designed to revolutionize how businesses handle their billing operations. The system combines modern web technologies with artificial intelligence to provide an intelligent, automated, and user-friendly platform for creating, managing, and tracking invoices.

### 1.2 Purpose

The primary purpose of BillCraft is to:

- **Automate Invoice Generation**: Reduce manual effort in creating professional invoices
- **Centralize Client Management**: Maintain a comprehensive database of all clients and their information
- **Track Financial Performance**: Provide real-time insights into revenue, pending payments, and business metrics
- **Streamline Payment Processing**: Monitor invoice status from draft to payment completion
- **Enhance Professional Image**: Offer 25+ professionally designed invoice templates
- **Enable AI Assistance**: Leverage artificial intelligence for smart form filling and business guidance

### 1.3 Major Operations

BillCraft manages the following core business operations:

1. **User Account Management**: User registration, authentication, profile management, and subscription handling
2. **Client Relationship Management**: Complete client database with contact information and transaction history
3. **Invoice Lifecycle Management**: From creation to payment, including drafts, sending, tracking, and archiving
4. **Payment Tracking**: Record and monitor all payments against invoices
5. **Trial and Subscription Management**: Handle free trials and paid subscriptions with different feature tiers
6. **Business Analytics**: Generate statistics on revenue, client activity, and invoice performance
7. **Multi-Currency Support**: Handle international transactions with currency conversion
8. **Template Customization**: Allow users to select and customize from multiple professional templates

### 1.4 Benefits

Implementing BillCraft provides numerous advantages:

**Accuracy Improvements:**
- Automated calculations eliminate human errors in totals, taxes, and discounts
- Consistent invoice numbering prevents duplicate or missed invoices
- Validation rules ensure all required fields are completed
- AI-powered data entry reduces input mistakes

**Efficiency Gains:**
- Create professional invoices in minutes instead of hours
- Reuse client information for repeat customers
- Batch operations for multiple invoices
- Quick access to historical invoice data
- Automated status tracking reduces manual follow-up

**Record Management:**
- Centralized database accessible from anywhere
- Comprehensive search and filtering capabilities
- Automatic backup and data security
- Historical data retention for auditing and analysis
- Real-time synchronization across devices

**Business Intelligence:**
- Dashboard analytics for quick business overview
- Revenue tracking by month, client, or status
- Identify overdue invoices automatically
- Monitor trial conversions and subscription metrics
- Track payment patterns and client behavior

**Professional Excellence:**
- Multiple premium invoice templates
- Consistent branding across all invoices
- Professional presentation to clients
- Mobile-responsive design
- PDF generation for easy sharing

---

## 2. TARGET USERS

BillCraft is designed to serve a diverse range of users across different business sectors:

### 2.1 Primary Users

1. **Freelancers and Independent Contractors**
   - Graphic designers, writers, developers, consultants
   - Need simple, professional invoicing without complex accounting
   - Typically handle 5-50 invoices per month

2. **Small Business Owners**
   - Retail shops, service providers, agencies
   - Require client management and invoice tracking
   - Handle 50-200 invoices monthly

3. **Startups and Growing Companies**
   - Tech startups, consulting firms, creative agencies
   - Need scalable solution with advanced features
   - Process 200-1000+ invoices monthly

4. **Professional Service Providers**
   - Lawyers, accountants, architects, engineers
   - Require professional templates and detailed billing
   - Focus on accuracy and compliance

5. **Creative Agencies**
   - Marketing agencies, design studios, photography businesses
   - Value aesthetic templates and brand customization
   - Need project-based invoicing

### 2.2 Secondary Users

6. **E-commerce Businesses**
   - Online retailers requiring automated invoicing
   - Integration with sales platforms

7. **Subscription-Based Services**
   - SaaS companies, membership sites
   - Recurring invoice automation

8. **Non-Profit Organizations**
   - Charities, educational institutions
   - Need simple billing for services and donations

### 2.3 User Characteristics

- **Technical Proficiency**: Ranges from basic computer users to tech-savvy entrepreneurs
- **Business Size**: Solo practitioners to teams of 50+ employees
- **Geographic Distribution**: Global users with multi-currency needs
- **Industry Diversity**: Over 20 different industries and professions

---

## 3. FUNCTIONALITIES

BillCraft supports **30+ key functionalities** organized by module:

### 3.1 User Management Functions (5)

1. **User Registration**: Create new user accounts with email verification
2. **User Authentication**: Secure login using Firebase authentication with password recovery
3. **Profile Management**: Update personal information, contact details, and preferences
4. **Account Settings**: Configure timezone, currency, date format, and language preferences
5. **Multi-Device Sync**: Synchronize user data across multiple devices and sessions

### 3.2 Client Management Functions (5)

6. **Add New Client**: Create client records with comprehensive contact information
7. **Edit Client Information**: Update client details including address, email, phone, company name
8. **Delete Client**: Remove client records (with cascade handling for related invoices)
9. **Search Clients**: Find clients using name, email, company, or other criteria
10. **View Client History**: Display all invoices and transactions for a specific client

### 3.3 Invoice Management Functions (12)

11. **Create New Invoice**: Generate invoices with customizable fields and line items
12. **Edit Draft Invoice**: Modify invoice details before sending
13. **Delete Invoice**: Remove draft or cancelled invoices from the system
14. **Duplicate Invoice**: Create copy of existing invoice for recurring billing
15. **Change Invoice Status**: Update status (Draft → Sent → Paid → Overdue → Cancelled)
16. **Add Invoice Line Items**: Add multiple products/services with quantity and pricing
17. **Calculate Totals**: Automatically compute subtotal, tax, discounts, and grand total
18. **Apply Discounts**: Add fixed amount or percentage-based discounts
19. **Set Payment Terms**: Define due dates and payment conditions
20. **Select Invoice Template**: Choose from 25+ professional design templates
21. **Preview Invoice**: View invoice before sending to client
22. **Generate Invoice Number**: Automatically create sequential invoice numbers

### 3.4 Payment & Financial Functions (4)

23. **Record Payment**: Log payments received against invoices
24. **Track Payment Status**: Monitor which invoices are paid, pending, or overdue
25. **Multi-Currency Support**: Handle invoices in different currencies (USD, EUR, PKR, INR, etc.)
26. **Calculate Revenue**: Generate revenue reports by period, client, or status

### 3.5 Reporting & Analytics Functions (4)

27. **Dashboard Statistics**: Display total revenue, invoice count, client count, pending amounts
28. **Generate Revenue Reports**: Create financial summaries by month, quarter, or year
29. **View Invoice Analytics**: Analyze invoice performance, success rates, and conversion metrics
30. **Export Data**: Download invoice data and reports for external analysis

### 3.6 Trial & Subscription Functions (5)

31. **Start Free Trial**: Activate 3-month trial with full feature access
32. **Track Trial Usage**: Monitor trial period remaining and feature usage
33. **Upgrade Subscription**: Convert from trial to paid subscription (Professional/Enterprise)
34. **Manage Billing**: Handle subscription payments and billing cycles
35. **Cancel Subscription**: Process cancellation requests and data retention

### 3.7 AI-Powered Functions (4)

36. **AI Chat Assistant**: Interact with AI for invoice help and business guidance
37. **Smart Form Filling**: Auto-populate invoice fields using AI
38. **AI-Generated Content**: Create professional terms, conditions, and notes
39. **Intelligent Suggestions**: Receive pricing and business operation recommendations

### 3.8 Additional Features (5)

40. **Template Customization**: Modify colors, fonts, and layouts of invoice templates
41. **Logo Upload**: Add company logo to invoices
42. **Email Notifications**: Send automated reminders for overdue invoices
43. **Search & Filter**: Find invoices by number, client, date range, status, or amount
44. **Data Export**: Export invoices as PDF for client delivery

---

## 4. DATABASE OBJECTS

BillCraft utilizes **7 core database tables** in PostgreSQL (via Supabase), each designed to handle specific aspects of the system:

### 4.1 **Table 1: USERS**

**Purpose**: Stores user account information, preferences, and subscription status

**Key Attributes**:
- `id` (UUID, Primary Key): Unique identifier for each user
- `firebase_uid` (TEXT, UNIQUE): Firebase authentication user ID for secure login
- `email` (TEXT): User's email address
- `full_name` (TEXT): User's complete name
- `company_name` (TEXT): Business/company name
- `company_email` (TEXT): Business email address
- `company_phone` (TEXT): Business phone number
- `company_address`, `company_city`, `company_state`, `company_zip`, `company_country` (TEXT): Complete business address
- `company_website` (TEXT): Company website URL
- `company_logo_url` (TEXT): URL to uploaded company logo
- `tax_id` (TEXT): Business tax identification number
- `plan` (TEXT): Subscription plan type (trial, professional, enterprise)
- `trial_ends_at` (TIMESTAMP): Trial expiration date
- `stripe_customer_id` (TEXT): Stripe payment integration ID
- `currency` (TEXT): Default currency preference (USD, EUR, PKR, etc.)
- `date_format` (TEXT): Preferred date display format
- `timezone` (TEXT): User's timezone setting
- `language` (TEXT): Interface language preference
- `invoice_prefix` (TEXT): Custom prefix for invoice numbers (e.g., "INV")
- `next_invoice_number` (INTEGER): Next sequential invoice number
- `default_payment_terms` (INTEGER): Default payment due period in days
- `default_tax_rate` (DECIMAL): Default tax percentage
- `created_at`, `updated_at` (TIMESTAMP): Record timestamps

**Total Attributes**: 28 columns

---

### 4.2 **Table 2: CLIENTS**

**Purpose**: Maintains customer/client information for invoicing

**Key Attributes**:
- `id` (UUID, Primary Key): Unique client identifier
- `user_id` (UUID, Foreign Key → users.id): Reference to user who owns this client
- `name` (TEXT): Client's full name
- `email` (TEXT): Client's email address
- `phone` (TEXT): Client's phone number
- `website` (TEXT): Client's website
- `address_line_1`, `address_line_2` (TEXT): Street address
- `city`, `state`, `zip_code`, `country` (TEXT): Complete address details
- `company_name` (TEXT): Client's company name
- `tax_id` (TEXT): Client's tax identification
- `notes` (TEXT): Additional notes about the client
- `tags` (TEXT[]): Array of tags for categorization
- `is_active` (BOOLEAN): Whether client is currently active
- `created_at`, `updated_at` (TIMESTAMP): Record timestamps

**Total Attributes**: 17 columns

---

### 4.3 **Table 3: INVOICES**

**Purpose**: Core table storing all invoice data and financial transactions

**Key Attributes**:
- `id` (UUID, Primary Key): Unique invoice identifier
- `user_id` (UUID, Foreign Key → users.id): Invoice owner
- `client_id` (UUID, Foreign Key → clients.id): Associated client
- `invoice_number` (TEXT): User-visible invoice number (e.g., "INV-2025-001")
- `status` (TEXT): Invoice state (draft, sent, viewed, paid, overdue, cancelled, refunded)
- `template_name` (TEXT): Selected design template name
- `logo_url` (TEXT): Custom logo for this invoice
- `issue_date` (DATE): Invoice creation date
- `due_date` (DATE): Payment due date
- `sent_at`, `viewed_at`, `paid_at` (TIMESTAMP): Status change timestamps
- **Company Information Snapshot** (stored at invoice creation):
  - `company_name`, `company_email`, `company_phone`, `company_address`, `company_city`, `company_state`, `company_zip`, `company_country`, `company_website` (TEXT)
- **Client Information Snapshot** (stored at invoice creation):
  - `client_name`, `client_email`, `client_company`, `client_address`, `client_city`, `client_state`, `client_zip`, `client_country` (TEXT)
- **Financial Calculations**:
  - `subtotal` (DECIMAL 12,2): Sum of all line items
  - `tax_rate` (DECIMAL 5,2): Applied tax percentage
  - `tax_amount` (DECIMAL 12,2): Calculated tax
  - `discount_type` (TEXT): 'fixed' or 'percentage'
  - `discount_value` (DECIMAL 12,2): Discount amount/percentage
  - `discount_amount` (DECIMAL 12,2): Calculated discount
  - `shipping_amount` (DECIMAL 12,2): Shipping/handling charges
  - `total_amount` (DECIMAL 12,2): Grand total
  - `amount_paid` (DECIMAL 12,2): Total payments received
  - `amount_due` (DECIMAL 12,2): Remaining balance
- `currency` (TEXT): Transaction currency
- `exchange_rate` (DECIMAL 10,4): Currency conversion rate
- `payment_terms` (TEXT): Payment conditions text
- `notes` (TEXT): Customer-visible notes
- `internal_notes` (TEXT): Private notes
- `terms_and_conditions` (TEXT): Legal terms
- `payment_method` (TEXT): How payment was received
- `payment_reference` (TEXT): Payment confirmation number
- `late_fee_amount` (DECIMAL 12,2): Late payment fees
- **Recurring Invoice Fields**:
  - `is_recurring` (BOOLEAN): Is this a recurring invoice
  - `recurring_frequency` (TEXT): weekly, monthly, quarterly, yearly
  - `recurring_interval` (INTEGER): Frequency multiplier
  - `recurring_end_date` (DATE): When recurrence stops
  - `next_recurring_date` (DATE): Next invoice generation date
  - `recurring_count` (INTEGER): Number of times generated
  - `max_recurring` (INTEGER): Maximum recurrences allowed
  - `parent_invoice_id` (UUID): Original invoice if this is recurring
- `created_at`, `updated_at` (TIMESTAMP): Record timestamps

**Total Attributes**: 52 columns

---

### 4.4 **Table 4: INVOICE_ITEMS**

**Purpose**: Stores individual line items (products/services) within each invoice

**Key Attributes**:
- `id` (UUID, Primary Key): Unique line item identifier
- `invoice_id` (UUID, Foreign Key → invoices.id): Parent invoice reference
- `description` (TEXT): Product/service description
- `quantity` (DECIMAL 10,3): Number of units (supports fractional quantities)
- `unit_price` (DECIMAL 12,2): Price per unit
- `line_total` (DECIMAL 12,2): Calculated total (quantity × unit_price)
- `tax_rate` (DECIMAL 5,2): Item-specific tax rate (optional override)
- `tax_amount` (DECIMAL 12,2): Tax for this line item
- `sort_order` (INTEGER): Display order in invoice
- `item_type` (TEXT): product, service, expense, or discount
- `sku` (TEXT): Stock Keeping Unit / product code
- `unit_of_measure` (TEXT): Unit type (each, hour, kilogram, etc.)
- `created_at` (TIMESTAMP): Record timestamp

**Total Attributes**: 13 columns

---

### 4.5 **Table 5: USER_TRIALS**

**Purpose**: Manages free trial periods and tracks usage during trials

**Key Attributes**:
- `id` (UUID, Primary Key): Unique trial identifier
- `user_id` (UUID, Foreign Key → users.id, UNIQUE): User on trial (one trial per user)
- `plan_type` (TEXT): Trial plan type (professional or enterprise)
- `status` (TEXT): Trial status (active, expired, cancelled, converted)
- `trial_start` (TIMESTAMP): When trial began
- `trial_end` (TIMESTAMP): When trial expires
- `trial_days` (INTEGER): Duration of trial in days
- `original_end_date` (TIMESTAMP): Original expiration (before extensions)
- `extension_days` (INTEGER): Additional days granted
- `extension_reason` (TEXT): Why extension was given
- `converted_to_plan` (TEXT): Plan type if user converted
- `converted_at` (TIMESTAMP): Conversion timestamp
- `stripe_subscription_id` (TEXT): Stripe ID after conversion
- **Usage Tracking**:
  - `invoices_created` (INTEGER): Number of invoices created during trial
  - `clients_created` (INTEGER): Number of clients added during trial
  - `features_used` (JSONB): JSON object tracking feature usage
  - `usage_stats` (JSONB): Detailed usage statistics
  - `last_activity_at` (TIMESTAMP): Last time user was active
- `created_at`, `updated_at` (TIMESTAMP): Record timestamps

**Total Attributes**: 19 columns

---

### 4.6 **Table 6: USER_SUBSCRIPTIONS**

**Purpose**: Manages paid subscriptions and billing cycles

**Key Attributes**:
- `id` (UUID, Primary Key): Unique subscription identifier
- `user_id` (UUID, Foreign Key → users.id): Subscribed user
- `plan_type` (TEXT): professional or enterprise
- `status` (TEXT): active, canceled, past_due, incomplete, trialing, paused
- `billing_interval` (TEXT): monthly or yearly
- **Stripe Integration**:
  - `stripe_subscription_id` (TEXT, UNIQUE): Stripe subscription ID
  - `stripe_customer_id` (TEXT): Stripe customer ID
  - `stripe_price_id` (TEXT): Stripe price ID
  - `stripe_product_id` (TEXT): Stripe product ID
- **Billing Periods**:
  - `current_period_start` (TIMESTAMP): Current billing cycle start
  - `current_period_end` (TIMESTAMP): Current billing cycle end
  - `trial_start`, `trial_end` (TIMESTAMP): Trial period if applicable
- **Cancellation**:
  - `cancel_at_period_end` (BOOLEAN): Will cancel at end of current period
  - `canceled_at` (TIMESTAMP): When cancellation was requested
  - `cancellation_reason` (TEXT): Why user cancelled
- **Pricing**:
  - `amount` (INTEGER): Subscription amount in cents
  - `currency` (TEXT): Billing currency
  - `tax_percent` (DECIMAL 5,2): Tax percentage
- `features` (JSONB): Available features in this plan
- `usage_limits` (JSONB): Usage restrictions (e.g., max invoices)
- `created_at`, `updated_at` (TIMESTAMP): Record timestamps

**Total Attributes**: 23 columns

---

### 4.7 **Table 7: PAYMENTS**

**Purpose**: Records all payments received against invoices

**Key Attributes**:
- `id` (UUID, Primary Key): Unique payment identifier
- `user_id` (UUID, Foreign Key → users.id): User who received payment
- `invoice_id` (UUID, Foreign Key → invoices.id): Invoice being paid
- `amount` (DECIMAL 12,2): Payment amount
- `currency` (TEXT): Payment currency
- `payment_method` (TEXT): cash, check, bank_transfer, credit_card, paypal, stripe, etc.
- `payment_status` (TEXT): pending, completed, failed, refunded, cancelled
- `transaction_id` (TEXT): External processor transaction ID
- `reference_number` (TEXT): Check number, wire reference, etc.
- **Payment Processor Details**:
  - `processor` (TEXT): stripe, paypal, square, etc.
  - `processor_fee` (DECIMAL 12,2): Processing fees
  - `net_amount` (DECIMAL 12,2): Amount after fees
- `payment_date` (DATE): Date payment was received
- `processed_at` (TIMESTAMP): When payment was processed
- `notes` (TEXT): Customer-visible payment notes
- `internal_notes` (TEXT): Private payment notes
- `created_at`, `updated_at` (TIMESTAMP): Record timestamps

**Total Attributes**: 17 columns

---

### 4.8 Summary of Database Objects

| Table Name | Purpose | Primary Key | Foreign Keys | Total Columns |
|------------|---------|-------------|--------------|---------------|
| **users** | User accounts & settings | id (UUID) | None | 28 |
| **clients** | Customer database | id (UUID) | user_id → users | 17 |
| **invoices** | Invoice transactions | id (UUID) | user_id → users<br>client_id → clients | 52 |
| **invoice_items** | Invoice line items | id (UUID) | invoice_id → invoices | 13 |
| **user_trials** | Trial management | id (UUID) | user_id → users | 19 |
| **user_subscriptions** | Paid subscriptions | id (UUID) | user_id → users | 23 |
| **payments** | Payment records | id (UUID) | user_id → users<br>invoice_id → invoices | 17 |

**Total: 7 Tables, 169 Total Columns**

---

## 5. DATA RELATIONSHIPS

The BillCraft database employs a well-structured relational model with clear foreign key relationships:

### 5.1 Relationship Diagram Overview

```
                    ┌──────────────┐
                    │    USERS     │
                    │   (Parent)   │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┬─────────────┬─────────────┐
              │            │            │             │             │
              ▼            ▼            ▼             ▼             ▼
         ┌────────┐   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
         │CLIENTS │   │INVOICES  │  │  TRIALS  │  │SUBSCRIPT.│  │PAYMENTS  │
         └───┬────┘   └────┬─────┘  └──────────┘  └──────────┘  └──────────┘
             │             │
             │             ├──────────┐
             │             │          │
             │             ▼          ▼
             │        ┌─────────┐  ┌──────────┐
             └───────►│INVOICES │  │INVOICE   │
                      │         │  │ ITEMS    │
                      └─────────┘  └──────────┘
```

### 5.2 Detailed Relationship Descriptions

#### 5.2.1 **USERS to CLIENTS** (One-to-Many)
- **Relationship Type**: One user can have many clients
- **Foreign Key**: `clients.user_id` → `users.id`
- **Cardinality**: 1:N (One-to-Many)
- **Delete Rule**: CASCADE (deleting user deletes all their clients)
- **Business Logic**: Each business user maintains their own client database. A freelancer might have 10-100 clients, while an agency could have 500+ clients.

**Example**:
```
User "John Doe Agency" → Has 50 clients (ABC Corp, XYZ Ltd, etc.)
```

#### 5.2.2 **USERS to INVOICES** (One-to-Many)
- **Relationship Type**: One user can create many invoices
- **Foreign Key**: `invoices.user_id` → `users.id`
- **Cardinality**: 1:N (One-to-Many)
- **Delete Rule**: CASCADE (deleting user deletes all their invoices)
- **Business Logic**: Users generate multiple invoices over time for different clients and projects.

**Example**:
```
User "Freelance Designer" → Created 150 invoices in 2025
```

#### 5.2.3 **CLIENTS to INVOICES** (One-to-Many)
- **Relationship Type**: One client can receive many invoices
- **Foreign Key**: `invoices.client_id` → `clients.id`
- **Cardinality**: 1:N (One-to-Many)
- **Delete Rule**: SET NULL (deleting client keeps invoices but removes client reference)
- **Business Logic**: Repeat customers receive multiple invoices over time. A single client might have dozens of invoices for different projects.

**Example**:
```
Client "ABC Corporation" → Received 12 invoices (Jan-Dec 2025)
```

#### 5.2.4 **INVOICES to INVOICE_ITEMS** (One-to-Many)
- **Relationship Type**: One invoice contains many line items
- **Foreign Key**: `invoice_items.invoice_id` → `invoices.id`
- **Cardinality**: 1:N (One-to-Many)
- **Delete Rule**: CASCADE (deleting invoice deletes all its line items)
- **Business Logic**: Each invoice can have multiple products/services. Minimum 1 item, typically 1-20 items per invoice.

**Example**:
```
Invoice #INV-2025-001 → Contains 5 items:
  - Web Design (40 hours @ $100/hr)
  - Logo Design (1 @ $500)
  - Hosting Setup (1 @ $150)
  - Domain Registration (1 @ $15)
  - SSL Certificate (1 @ $50)
```

#### 5.2.5 **USERS to USER_TRIALS** (One-to-One)
- **Relationship Type**: One user has one trial period
- **Foreign Key**: `user_trials.user_id` → `users.id`
- **Cardinality**: 1:1 (One-to-One)
- **Constraint**: UNIQUE constraint on `user_id`
- **Delete Rule**: CASCADE (deleting user deletes trial record)
- **Business Logic**: Each user gets exactly one trial period when they sign up.

**Example**:
```
User "New Startup Inc" → Has 1 active trial (started Oct 1, ends Dec 31)
```

#### 5.2.6 **USERS to USER_SUBSCRIPTIONS** (One-to-Many)
- **Relationship Type**: One user can have multiple subscriptions (historical)
- **Foreign Key**: `user_subscriptions.user_id` → `users.id`
- **Cardinality**: 1:N (One-to-Many)
- **Delete Rule**: CASCADE (deleting user deletes subscription history)
- **Business Logic**: Users can upgrade, downgrade, cancel, and resubscribe, creating multiple subscription records over time.

**Example**:
```
User "Growing Business" → Has 3 subscription records:
  - Professional Monthly (Jan-Jun 2025, cancelled)
  - Enterprise Annual (Jul 2025-Jun 2026, active)
  - Previous trial conversion (2024, expired)
```

#### 5.2.7 **USERS to PAYMENTS** (One-to-Many)
- **Relationship Type**: One user receives many payments
- **Foreign Key**: `payments.user_id` → `users.id`
- **Cardinality**: 1:N (One-to-Many)
- **Delete Rule**: CASCADE (deleting user deletes payment records)
- **Business Logic**: Users accumulate payment records as they receive money from clients.

**Example**:
```
User "Consulting Firm" → Received 75 payments totaling $125,000
```

#### 5.2.8 **INVOICES to PAYMENTS** (One-to-Many)
- **Relationship Type**: One invoice can have multiple payments (partial payments)
- **Foreign Key**: `payments.invoice_id` → `invoices.id`
- **Cardinality**: 1:N (One-to-Many)
- **Delete Rule**: CASCADE (deleting invoice deletes payment records)
- **Business Logic**: Large invoices might be paid in installments. Most invoices have 0-1 payments, some have 2-5 partial payments.

**Example**:
```
Invoice #INV-2025-050 ($10,000) → Received 3 payments:
  - $3,000 on Feb 1 (deposit)
  - $4,000 on Feb 15 (milestone payment)
  - $3,000 on Mar 1 (final payment)
```

#### 5.2.9 **Self-Referencing: INVOICES to INVOICES** (One-to-Many for Recurring)
- **Relationship Type**: Parent invoice generates child recurring invoices
- **Foreign Key**: `invoices.parent_invoice_id` → `invoices.id`
- **Cardinality**: 1:N (One-to-Many)
- **Delete Rule**: SET NULL (deleting parent keeps children)
- **Business Logic**: Recurring invoices track their original parent invoice.

**Example**:
```
Monthly Subscription Invoice (Parent) → Generated 12 child invoices (Jan-Dec)
```

### 5.3 Referential Integrity Rules

The database enforces the following integrity constraints:

1. **Primary Key Constraints**: Every table has a UUID primary key ensuring unique identification
2. **Foreign Key Constraints**: All relationships enforced at database level
3. **NOT NULL Constraints**: Critical fields like user emails, invoice numbers cannot be null
4. **UNIQUE Constraints**: 
   - `users.firebase_uid` (one Firebase account per database user)
   - `user_trials.user_id` (one trial per user)
   - `invoices(user_id, invoice_number)` (unique invoice numbers per user)
5. **CHECK Constraints**:
   - Invoice status must be one of: draft, sent, viewed, paid, overdue, cancelled, refunded
   - Amounts must be >= 0
   - Trial end date must be after start date

### 5.4 Cascade Operations Summary

| Parent Table | Child Table | Delete Action | Update Action |
|--------------|-------------|---------------|---------------|
| users | clients | CASCADE | CASCADE |
| users | invoices | CASCADE | CASCADE |
| users | user_trials | CASCADE | CASCADE |
| users | user_subscriptions | CASCADE | CASCADE |
| users | payments | CASCADE | CASCADE |
| clients | invoices | SET NULL | CASCADE |
| invoices | invoice_items | CASCADE | CASCADE |
| invoices | payments | CASCADE | CASCADE |
| invoices | invoices (recurring) | SET NULL | CASCADE |

---

## 6. TECHNICAL ARCHITECTURE

### 6.1 Database Management System

**PostgreSQL 14+ (via Supabase)**
- **Type**: Relational Database Management System (RDBMS)
- **Cloud Platform**: Supabase (PostgreSQL as a Service)
- **Features Used**:
  - UUID generation (`uuid-ossp` extension)
  - JSONB data type for flexible data storage
  - Advanced indexing for performance
  - Row Level Security (RLS) for data protection
  - Database triggers for automatic timestamp updates
  - Stored procedures for complex calculations

### 6.2 Key Database Features

#### 6.2.1 **Indexing Strategy**
- 20+ indexes created for optimal query performance
- Indexes on foreign keys for fast joins
- Composite indexes on frequently queried columns
- Descending indexes on date fields for recent-first queries

**Examples**:
```sql
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_issue_date ON invoices(issue_date DESC);
```

#### 6.2.2 **Row Level Security (RLS)**
- Ensures users can only access their own data
- Policies defined for SELECT, INSERT, UPDATE, DELETE operations
- Uses Firebase JWT for authentication verification

**Example Policy**:
```sql
CREATE POLICY "Users can manage own invoices" ON invoices 
FOR ALL USING (
    user_id IN (SELECT id FROM users WHERE firebase_uid = auth.jwt() ->> 'sub')
);
```

#### 6.2.3 **Automatic Triggers**
- `updated_at` timestamp automatically set on every record update
- Maintains audit trail without application-level code

**Example Trigger**:
```sql
CREATE TRIGGER update_invoices_updated_at 
BEFORE UPDATE ON invoices 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### 6.2.4 **Stored Functions**
Three utility functions for business logic:

1. **`get_user_plan_status(firebase_uid)`**: Returns complete user subscription status
2. **`expire_trials()`**: Automatically expires ended trials
3. **`calculate_invoice_totals(invoice_id)`**: Computes all financial calculations

### 6.3 Technology Stack Integration

**Frontend**: Next.js 14 (React 18, TypeScript)
**Backend API**: Next.js API Routes (Server-side functions)
**Authentication**: Firebase Auth (JWT tokens)
**Database**: Supabase (PostgreSQL)
**AI Integration**: OpenRouter API (GPT-3.5/4, Claude)
**Payment Processing**: Stripe (future integration)
**File Storage**: Supabase Storage (logos, attachments)

### 6.4 Data Security Measures

1. **Encryption**: All data encrypted in transit (SSL/TLS) and at rest
2. **Authentication**: Firebase handles secure user authentication
3. **Authorization**: Row Level Security prevents unauthorized data access
4. **Input Validation**: Zod schema validation on all inputs
5. **SQL Injection Prevention**: Parameterized queries via Supabase client
6. **Backup**: Automatic daily backups via Supabase
7. **Audit Logging**: Timestamp tracking on all records

### 6.5 Performance Optimizations

1. **Connection Pooling**: Supabase manages database connections efficiently
2. **Query Optimization**: Indexes on all foreign keys and frequently filtered columns
3. **Data Denormalization**: Invoice snapshots of company/client info prevent expensive joins
4. **Pagination**: Large result sets paginated to reduce memory usage
5. **Caching**: Client-side caching of user preferences and frequently accessed data

---

## 7. CONCLUSION

### 7.1 Project Summary

BillCraft represents a **comprehensive, production-ready invoice management system** with a robust database architecture. The system successfully addresses real-world business needs through:

- **7 well-designed database tables** with 169 total attributes
- **44+ functional capabilities** covering the complete invoice lifecycle
- **Clear relational structure** with proper foreign key constraints
- **Enterprise-grade security** with Row Level Security and authentication
- **Performance optimization** through strategic indexing
- **Modern technology stack** using PostgreSQL, Next.js, and AI integration

### 7.2 Database Design Strengths

1. **Normalization**: Tables are properly normalized to 3NF, reducing data redundancy
2. **Flexibility**: JSONB fields allow for extensible feature storage without schema changes
3. **Scalability**: UUID primary keys and proper indexing support millions of records
4. **Data Integrity**: Foreign keys, constraints, and triggers maintain consistency
5. **Audit Trail**: Comprehensive timestamp tracking on all entities
6. **Business Logic**: Stored procedures encapsulate complex calculations

### 7.3 Real-World Applications

This database system is suitable for:
- Freelancers managing 10-100 clients
- Small businesses processing 100-1,000 invoices monthly
- Growing companies requiring 10,000+ invoice records
- International businesses with multi-currency needs
- Subscription-based services with recurring billing

### 7.4 Learning Outcomes

This project demonstrates mastery of:
- **Database Design**: Entity-Relationship modeling, normalization principles
- **SQL Proficiency**: Table creation, constraints, indexes, triggers, functions
- **Relational Theory**: Understanding of relationships, cardinality, referential integrity
- **Business Analysis**: Translating real-world requirements into database schema
- **Security**: Implementing access control and data protection
- **Performance**: Query optimization and indexing strategies

### 7.5 Future Enhancements

Potential database extensions include:
1. **Products Catalog Table**: Store reusable product/service items
2. **Estimates/Quotes Table**: Pre-invoice estimation system
3. **Expenses Table**: Track business expenses
4. **Reports Table**: Save custom report configurations
5. **Audit Log Table**: Comprehensive activity tracking
6. **Email Templates Table**: Store customizable email templates
7. **Tax Rates Table**: Multi-jurisdiction tax management

### 7.6 Final Remarks

BillCraft's database architecture demonstrates a **professional, scalable, and secure** approach to managing invoice data. The system balances theoretical database principles with practical business requirements, making it an ideal example of real-world database design.

The comprehensive schema supports all essential invoicing operations while maintaining data integrity, performance, and security—critical requirements for any production business application.

---

**END OF DATABASE PROJECT PROPOSAL**

---

## APPENDIX A: Quick Reference

### Database Statistics
- **Total Tables**: 7
- **Total Columns**: 169
- **Total Foreign Keys**: 9
- **Total Indexes**: 20+
- **Total Triggers**: 6
- **Total Functions**: 3

### Key Relationships
- Users → Clients (1:Many)
- Users → Invoices (1:Many)
- Clients → Invoices (1:Many)
- Invoices → Invoice Items (1:Many)
- Invoices → Payments (1:Many)
- Users → Trials (1:One)
- Users → Subscriptions (1:Many)

### Supported Currencies
USD, EUR, GBP, PKR, INR, AUD, CAD, JPY, CNY

### Invoice Statuses
Draft, Sent, Viewed, Paid, Overdue, Cancelled, Refunded

### Template Count
25+ professional invoice templates

---

**Document prepared for Database Systems course (BSCS)**
**Based on actual production implementation of BillCraft system**
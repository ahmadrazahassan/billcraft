# Assignment #2: ER Model Design
## BillCraft - Invoice Management System

**Student Name:** ___________________  
**University ID:** ___________________  
**Course:** Database Systems (CS06301)  
**Instructor:** Miss Sonia Raoof  
**Due Date:** 14th November, 2025

---

## 1. Identification of Entities

### Strong Entities

**1.1 USERS**
- **Type:** Strong Entity
- **Description:** User accounts with business information, preferences, and subscription status.

**1.2 CLIENTS**
- **Type:** Strong Entity
- **Description:** Customer/client database with complete contact and address details.

**1.3 INVOICES**
- **Type:** Strong Entity
- **Description:** Invoice documents with financial data, status tracking, and payment information.

**1.4 USER_TRIALS**
- **Type:** Strong Entity
- **Description:** Free trial management with 90-day period tracking and usage statistics.

**1.5 USER_SUBSCRIPTIONS**
- **Type:** Strong Entity
- **Description:** Paid subscription management with billing cycles and Stripe integration.

**1.6 PAYMENTS**
- **Type:** Strong Entity
- **Description:** Payment records tracking all payments received against invoices.

### Weak Entity

**1.7 INVOICE_ITEMS**
- **Type:** Weak Entity (Depends on INVOICES)
- **Description:** Line items within invoices containing product/service details. Cannot exist without parent invoice.

---

## 2. Determination of Relationships

**2.1 USERS ─ MANAGES ─ CLIENTS**
- **Type:** One-to-Many (1:N)
- **Dependency:** Independent
- **Description:** A user can manage multiple clients; each client belongs to one user.

**2.2 USERS ─ CREATES ─ INVOICES**
- **Type:** One-to-Many (1:N)
- **Dependency:** Independent
- **Description:** A user can create multiple invoices; each invoice is created by one user.

**2.3 CLIENTS ─ RECEIVES ─ INVOICES**
- **Type:** One-to-Many (1:N)
- **Dependency:** Independent
- **Description:** A client can receive multiple invoices; invoice may optionally reference a client.

**2.4 INVOICES ─ CONTAINS ─ INVOICE_ITEMS**
- **Type:** One-to-Many (1:N)
- **Dependency:** Dependent (identifying relationship)
- **Description:** An invoice contains multiple line items; items cannot exist without invoice.

**2.5 USERS ─ HAS_TRIAL ─ USER_TRIALS**
- **Type:** One-to-One (1:1)
- **Dependency:** Independent
- **Description:** A user has one trial period; each trial belongs to one user.

**2.6 USERS ─ SUBSCRIBES ─ USER_SUBSCRIPTIONS**
- **Type:** One-to-Many (1:N)
- **Dependency:** Independent
- **Description:** A user can have multiple subscriptions over time; each subscription belongs to one user.

**2.7 USERS ─ RECEIVES ─ PAYMENTS**
- **Type:** One-to-Many (1:N)
- **Dependency:** Independent
- **Description:** A user receives multiple payments; each payment belongs to one user.

**2.8 INVOICES ─ HAS ─ PAYMENTS**
- **Type:** One-to-Many (1:N)
- **Dependency:** Independent
- **Description:** An invoice can have multiple payments (partial payments); each payment is for one invoice.

**2.9 INVOICES ─ RECURS_FROM ─ INVOICES**
- **Type:** One-to-Many (1:N) - Self-referencing
- **Dependency:** Independent
- **Description:** A parent invoice can generate multiple recurring child invoices.

---

## 3. Definition of Keys

### Primary Keys (PK)

| Entity | Primary Key | Type |
|--------|-------------|------|
| USERS | id | UUID |
| CLIENTS | id | UUID |
| INVOICES | id | UUID |
| INVOICE_ITEMS | id | UUID |
| USER_TRIALS | id | UUID |
| USER_SUBSCRIPTIONS | id | UUID |
| PAYMENTS | id | UUID |

### Foreign Keys (FK)

| Table | Foreign Key | References | Constraint |
|-------|-------------|------------|------------|
| CLIENTS | user_id | USERS(id) | ON DELETE CASCADE |
| INVOICES | user_id | USERS(id) | ON DELETE CASCADE |
| INVOICES | client_id | CLIENTS(id) | ON DELETE SET NULL |
| INVOICES | parent_invoice_id | INVOICES(id) | ON DELETE SET NULL |
| INVOICE_ITEMS | invoice_id | INVOICES(id) | ON DELETE CASCADE |
| USER_TRIALS | user_id | USERS(id) | ON DELETE CASCADE |
| USER_SUBSCRIPTIONS | user_id | USERS(id) | ON DELETE CASCADE |
| PAYMENTS | user_id | USERS(id) | ON DELETE CASCADE |
| PAYMENTS | invoice_id | INVOICES(id) | ON DELETE CASCADE |

### Unique Keys

- **USERS:** `firebase_uid` - Ensures one-to-one mapping with Firebase authentication
- **USER_TRIALS:** `user_id` - Ensures one trial per user (enforces 1:1 relationship)
- **USER_SUBSCRIPTIONS:** `stripe_subscription_id` - Unique Stripe subscription identifier
- **INVOICES:** `invoice_number` - Ensures unique invoice numbering per user

### Composite Keys

This design uses surrogate keys (UUID) for simplicity. Natural composite key candidates exist but are not implemented:
- INVOICE_ITEMS: Could use `(invoice_id, sort_order)` but uses UUID for flexibility

### Key Usage for Data Integrity

- **Primary Keys:** Ensure entity integrity - unique identification for each record
- **Foreign Keys:** Maintain referential integrity between related entities
- **Cascade Rules:** Automatic deletion of dependent records maintains consistency
- **Unique Constraints:** Prevent duplicate entries for critical business identifiers

---

## 4. ER Diagram Development

### 4.1 Complete ER Diagram

```
┌───────────────────────────────────────────────────────────────────────┐
│                      BILLCRAFT ER DIAGRAM                             │
│                        (7 TABLES)                                     │
└───────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐         ┌──────────────────────┐
    │  USER_TRIALS     │         │  USER_SUBSCRIPTIONS  │
    │  ───────────────  │         │  ──────────────────  │
    │ 🔑 id (PK)       │         │ 🔑 id (PK)           │
    │ 🔗 user_id (FK)  │         │ 🔗 user_id (FK)      │
    │    status        │         │    plan_type         │
    │    trial_start   │         │    status            │
    │    trial_end     │         │    billing_interval  │
    └──────────────────┘         │    stripe_sub_id     │
            │                     │    amount, currency  │
            │ 1:1                 └──────────────────────┘
            ↓                             │
    ┌────────────────────────────────┐   │ 1:N
    │          USERS                 │◄──┘
    │  ────────────────────────────  │
    │ 🔑 id (PK)                     │
    │ 🔒 firebase_uid (UNIQUE)       │
    │    email, full_name            │
    │    company_name, company_email │
    │    plan, currency              │
    │    invoice_prefix              │
    │    next_invoice_number         │
    │    default_payment_terms       │
    │    created_at, updated_at      │
    └────────────────────────────────┘
         │          │          │
         │ 1:N      │ 1:N      │ 1:N
         ↓          ↓          ↓
    ┌─────────┐  ┌──────────────────────┐  ┌─────────────┐
    │ CLIENTS │  │     INVOICES         │  │  PAYMENTS   │
    │ ─────── │  │  ──────────────────  │  │  ─────────  │
    │ 🔑 id   │  │ 🔑 id (PK)           │  │ 🔑 id (PK)  │
    │ 🔗 u_id │◄─┤ 🔗 user_id (FK)      │◄─┤ 🔗 user_id  │
    │    name │  │ 🔗 client_id (FK)    │  │ 🔗 inv_id   │
    │    email│  │ 🔗 parent_inv_id (FK)│  │    amount   │
    │    addr │  │ 🔒 invoice_number    │  │    method   │
    └─────────┘  │    status, template  │  │    status   │
                 │    issue/due_date    │  └─────────────┘
                 │    subtotal, tax, total│
                 │    currency, notes     │
                 └────────────────────────┘
                         │
                         │ 1:N
                         ↓
                 ┌──────────────────────────┐
                 │  INVOICE_ITEMS (Weak)    │
                 │  ══════════════════════  │
                 │ 🔑 id (PK)               │
                 │ 🔗 invoice_id (FK)       │
                 │    description           │
                 │    quantity, rate        │
                 │    line_total            │
                 └──────────────────────────┘
```

### 4.2 ER Diagram Components

**Entities:** All entities (strong and weak) with complete attributes
- Primary keys marked with 🔑
- Foreign keys marked with 🔗
- Unique keys marked with 🔒

**Attributes:** Listed for each entity showing data types and constraints

**Relationships:** Five relationships with proper naming and connections

**Primary Keys:** UUID type for all entities ensuring unique identification

**Foreign Keys:** All relationships established with appropriate referential actions

**Composite Keys:** Not used; surrogate keys (UUID) implemented for simplicity

**Cardinalities:**
- USERS → CLIENTS: 1:N
- USERS → INVOICES: 1:N
- USERS → USER_TRIALS: 1:1
- USERS → USER_SUBSCRIPTIONS: 1:N
- USERS → PAYMENTS: 1:N
- CLIENTS → INVOICES: 1:N (optional)
- INVOICES → INVOICE_ITEMS: 1:N (identifying)
- INVOICES → PAYMENTS: 1:N
- INVOICES → INVOICES: 1:N (self-referencing for recurring)

**Notations:**
- Solid lines for strong entities
- Double border (══) for weak entity (INVOICE_ITEMS)
- Proper notation for strong/weak entities

**Organization:** Well-structured layout with clear hierarchy and relationships

**Labels:** All entities, attributes, and relationships clearly labeled

**Visual Consistency:** Professional presentation with consistent formatting

---

### 4.3 EER Diagram - Specialization

```
                    ┌─────────────────┐
                    │     USERS       │ (Superclass)
                    └────────┬────────┘
                             │
                        ┌────┴────┐ (ISA)
                        │         │
            ┌───────────▼──┐  ┌───▼──────────┐  ┌───▼──────────┐
            │  FREE_USER   │  │ PROFESSIONAL │  │  ENTERPRISE  │
            │   (Trial)    │  │     USER     │  │     USER     │
            ├──────────────┤  ├──────────────┤  ├──────────────┤
            │ trial_ends_at│  │ stripe_id    │  │ stripe_id    │
            │              │  │ subscription │  │ subscription │
            └──────────────┘  └──────────────┘  │ team_size    │
                                                │ api_enabled  │
                                                └──────────────┘
```

**Type:** Disjoint specialization (user belongs to one category)

**Generalization & Specialization:** Users specialized by subscription plan with ISA relationship

---

## 5. Submission Guidelines

### Files to Submit:

1. **ER Diagram** (PNG/PDF) - Created using Draw.io or dbdiagram.io
2. **EER Diagram** (PNG/PDF) - Showing specialization hierarchy
3. **Written Report** (PDF) - This document with all 4 sections

### Diagram Creation:

**Quick Method (Recommended):**
1. Visit https://dbdiagram.io/
2. Use code from separate specification file
3. Export as PNG (high resolution)

**Manual Method:**
1. Use Draw.io or Lucidchart
2. Follow entity specifications above
3. Export as PNG/PDF at 300 DPI

---

## Summary

This ER model represents a complete invoice management system with:
- **7 entities** (6 strong, 1 weak)
- **9 relationships** with proper cardinalities
- **Comprehensive key structure** ensuring data integrity
- **Professional design** following database normalization principles
- **Realistic business logic** for complete invoice and payment management

The design supports user management, client tracking, invoice creation, line item details, trial management, subscription billing, and payment processing with proper referential integrity and cascade rules.

---

**End of Report**


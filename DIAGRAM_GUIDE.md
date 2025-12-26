# Quick Diagram Creation Guide

## Method 1: dbdiagram.io (5 minutes - RECOMMENDED)

**Creates ER Diagram with all 7 tables from Assignment 1**

1. Go to https://dbdiagram.io/
2. Copy and paste this code:

```sql
Table users {
  id uuid [pk]
  firebase_uid text [unique]
  email text
  full_name text
  company_name text
  plan text
  created_at timestamp
}

Table clients {
  id uuid [pk]
  user_id uuid [ref: > users.id]
  name text
  email text
  phone text
  address text
  created_at timestamp
}

Table invoices {
  id uuid [pk]
  user_id uuid [ref: > users.id]
  client_id uuid [ref: > clients.id]
  parent_invoice_id uuid [ref: > invoices.id]
  invoice_number text [unique]
  status text
  issue_date date
  due_date date
  subtotal decimal
  tax_amount decimal
  total decimal
  currency text
  created_at timestamp
}

Table invoice_items {
  id uuid [pk]
  invoice_id uuid [ref: > invoices.id]
  description text
  quantity decimal
  rate decimal
  amount decimal
}

Table user_trials {
  id uuid [pk]
  user_id uuid [ref: - users.id]
  status text
  trial_start timestamp
  trial_end timestamp
}

Table user_subscriptions {
  id uuid [pk]
  user_id uuid [ref: > users.id]
  plan_type text
  status text
  billing_interval text
  stripe_subscription_id text
  amount integer
  currency text
}

Table payments {
  id uuid [pk]
  user_id uuid [ref: > users.id]
  invoice_id uuid [ref: > invoices.id]
  amount decimal
  currency text
  payment_method text
  payment_status text
  payment_date date
}
```

3. Click Export → PNG
4. **Done! This is your ER Diagram ✅**

---

## Method 2: Draw.io (15 minutes)

### Step 1: Create Entities
- Use Rectangle shape for each entity
- Add entity name at top
- List attributes below
- Mark primary key with (PK)
- Mark foreign key with (FK)

### Step 2: Connect Relationships
- Use Diamond shape between entities
- Label relationship name
- Add cardinality: "1" or "N"

### Step 3: Make Weak Entity
- For INVOICE_ITEMS: use double border

### Step 4: Export
- File → Export as → PNG
- Resolution: 300 DPI

---

## For EER Diagram (Draw.io)

Draw this hierarchy:

```
        USERS
          |
    ______|______
   |      |      |
 FREE  PROF  ENTERPRISE
```

Add attributes for each specialization.

Export as PNG.

---

## That's It!

**Total time: ~10-15 minutes for both diagrams**

Submit:
1. ER Diagram PNG (all 7 tables)
2. EER Diagram PNG (specialization hierarchy)
3. Report PDF (ASSIGNMENT_2_FINAL.md → convert to PDF)

---

## Summary: What's Included

**7 Tables (matches Assignment 1):**
1. USERS - User accounts
2. CLIENTS - Customer database
3. INVOICES - Invoice transactions
4. INVOICE_ITEMS - Line items (weak entity)
5. USER_TRIALS - Trial management
6. USER_SUBSCRIPTIONS - Paid subscriptions
7. PAYMENTS - Payment tracking

**9 Relationships:**
- Users → Clients (1:N)
- Users → Invoices (1:N)
- Users → Trials (1:1)
- Users → Subscriptions (1:N)
- Users → Payments (1:N)
- Clients → Invoices (1:N)
- Invoices → Items (1:N)
- Invoices → Payments (1:N)
- Invoices → Invoices (1:N self-referencing)


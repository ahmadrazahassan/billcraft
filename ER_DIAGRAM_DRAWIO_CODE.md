# ER Diagram for Draw.io - BillCraft
## Complete 7-Table ER Model

---

## Quick Start

1. Go to https://app.diagrams.net/ (Draw.io)
2. Create New Diagram → Blank Diagram
3. Follow the instructions below to create each component

---

## Shapes You'll Need

From the left panel, use:
- **Rectangle** - For strong entities (USERS, CLIENTS, INVOICES, etc.)
- **Rectangle with double border** - For weak entities (INVOICE_ITEMS)
- **Oval/Ellipse** - For attributes
- **Double oval** - For multivalued attributes (if any)
- **Diamond** - For relationships
- **Lines** - For connections

---

## Step-by-Step Creation

### ENTITY 1: USERS (Strong Entity)
**Shape:** Rectangle  
**Label:** `USERS`  
**Position:** Center-top area

**Attributes (Ovals around USERS):**
- `id` (underline this - it's the primary key)
- `firebase_uid` 
- `email`
- `full_name`
- `company_name`
- `company_email`
- `company_phone`
- `company_address`
- `plan`
- `currency`
- `invoice_prefix`
- `next_invoice_number`
- `default_payment_terms`
- `default_tax_rate`
- `created_at`
- `updated_at`

**Connection:** Draw lines from each oval to the USERS rectangle

---

### ENTITY 2: CLIENTS (Strong Entity)
**Shape:** Rectangle  
**Label:** `CLIENTS`  
**Position:** Bottom-left of USERS

**Attributes (Ovals around CLIENTS):**
- `id` (underline - primary key)
- `user_id` (mark as FK with dashed underline)
- `name`
- `email`
- `phone`
- `address_line_1`
- `address_line_2`
- `city`
- `state`
- `country`
- `company_name`
- `is_active`
- `created_at`
- `updated_at`

---

### ENTITY 3: INVOICES (Strong Entity)
**Shape:** Rectangle  
**Label:** `INVOICES`  
**Position:** Bottom-center of USERS

**Attributes (Ovals around INVOICES):**
- `id` (underline - primary key)
- `user_id` (FK - dashed underline)
- `client_id` (FK - dashed underline)
- `parent_invoice_id` (FK - dashed underline)
- `invoice_number`
- `status`
- `template_name`
- `issue_date`
- `due_date`
- `company_name`
- `client_name`
- `subtotal`
- `tax_rate`
- `tax_amount`
- `discount_amount`
- `total_amount`
- `currency`
- `payment_terms`
- `notes`
- `sent_at`
- `paid_at`
- `created_at`
- `updated_at`

---

### ENTITY 4: INVOICE_ITEMS (Weak Entity)
**Shape:** Rectangle with DOUBLE BORDER  
**Label:** `INVOICE_ITEMS`  
**Position:** Below INVOICES

**Attributes (Ovals around INVOICE_ITEMS):**
- `id` (underline - primary key)
- `invoice_id` (FK - dashed underline, also partial key)
- `description`
- `quantity`
- `unit_price`
- `line_total`
- `tax_rate`
- `sort_order`
- `created_at`

**Note:** This is a WEAK ENTITY - use double border!

---

### ENTITY 5: USER_TRIALS (Strong Entity)
**Shape:** Rectangle  
**Label:** `USER_TRIALS`  
**Position:** Top-left of USERS

**Attributes (Ovals around USER_TRIALS):**
- `id` (underline - primary key)
- `user_id` (FK - dashed underline, also unique)
- `plan_type`
- `status`
- `trial_start`
- `trial_end`
- `trial_days`
- `invoices_created`
- `clients_created`
- `usage_stats`
- `created_at`
- `updated_at`

---

### ENTITY 6: USER_SUBSCRIPTIONS (Strong Entity)
**Shape:** Rectangle  
**Label:** `USER_SUBSCRIPTIONS`  
**Position:** Top-right of USERS

**Attributes (Ovals around USER_SUBSCRIPTIONS):**
- `id` (underline - primary key)
- `user_id` (FK - dashed underline)
- `plan_type`
- `status`
- `billing_interval`
- `stripe_subscription_id`
- `stripe_customer_id`
- `current_period_start`
- `current_period_end`
- `amount`
- `currency`
- `created_at`
- `updated_at`

---

### ENTITY 7: PAYMENTS (Strong Entity)
**Shape:** Rectangle  
**Label:** `PAYMENTS`  
**Position:** Bottom-right of USERS

**Attributes (Ovals around PAYMENTS):**
- `id` (underline - primary key)
- `user_id` (FK - dashed underline)
- `invoice_id` (FK - dashed underline)
- `amount`
- `currency`
- `payment_method`
- `payment_status`
- `transaction_id`
- `payment_date`
- `notes`
- `created_at`
- `updated_at`

---

## RELATIONSHIPS (Diamonds)

### RELATIONSHIP 1: MANAGES
**Shape:** Diamond  
**Label:** `Manages`  
**Position:** Between USERS and CLIENTS

**Connection:**
- Line from USERS to diamond
- Line from diamond to CLIENTS
- Add label "1" near USERS
- Add label "N" near CLIENTS

---

### RELATIONSHIP 2: CREATES
**Shape:** Diamond  
**Label:** `Creates`  
**Position:** Between USERS and INVOICES

**Connection:**
- Line from USERS to diamond
- Line from diamond to INVOICES
- Add label "1" near USERS
- Add label "N" near INVOICES

---

### RELATIONSHIP 3: RECEIVES
**Shape:** Diamond  
**Label:** `Receives`  
**Position:** Between CLIENTS and INVOICES

**Connection:**
- Line from CLIENTS to diamond
- Line from diamond to INVOICES
- Add label "1" near CLIENTS
- Add label "N" near INVOICES

---

### RELATIONSHIP 4: CONTAINS
**Shape:** Diamond with DOUBLE BORDER  
**Label:** `Contains`  
**Position:** Between INVOICES and INVOICE_ITEMS

**Connection:**
- Line from INVOICES to diamond
- Line from diamond to INVOICE_ITEMS (make this a DOUBLE LINE - identifying relationship)
- Add label "1" near INVOICES
- Add label "N" near INVOICE_ITEMS

**Note:** This is an IDENTIFYING relationship - use double border diamond!

---

### RELATIONSHIP 5: HAS_TRIAL
**Shape:** Diamond  
**Label:** `Has_Trial`  
**Position:** Between USERS and USER_TRIALS

**Connection:**
- Line from USERS to diamond
- Line from diamond to USER_TRIALS
- Add label "1" near USERS
- Add label "1" near USER_TRIALS (This is 1:1!)

---

### RELATIONSHIP 6: SUBSCRIBES
**Shape:** Diamond  
**Label:** `Subscribes`  
**Position:** Between USERS and USER_SUBSCRIPTIONS

**Connection:**
- Line from USERS to diamond
- Line from diamond to USER_SUBSCRIPTIONS
- Add label "1" near USERS
- Add label "N" near USER_SUBSCRIPTIONS

---

### RELATIONSHIP 7: RECEIVES_PAYMENT
**Shape:** Diamond  
**Label:** `Receives_Payment`  
**Position:** Between USERS and PAYMENTS

**Connection:**
- Line from USERS to diamond
- Line from diamond to PAYMENTS
- Add label "1" near USERS
- Add label "N" near PAYMENTS

---

### RELATIONSHIP 8: HAS_PAYMENT
**Shape:** Diamond  
**Label:** `Has_Payment`  
**Position:** Between INVOICES and PAYMENTS

**Connection:**
- Line from INVOICES to diamond
- Line from diamond to PAYMENTS
- Add label "1" near INVOICES
- Add label "N" near PAYMENTS (allows partial payments)

---

### RELATIONSHIP 9: RECURS_FROM (Self-Referencing)
**Shape:** Diamond  
**Label:** `Recurs_From`  
**Position:** Loop from INVOICES back to itself

**Connection:**
- Line from INVOICES to diamond
- Line from diamond back to INVOICES
- Add label "1" (parent invoice)
- Add label "N" (child recurring invoices)

---

## Color Scheme (Optional but Professional)

1. **Strong Entities (Rectangles):** Light blue fill (#E3F2FD)
2. **Weak Entity (INVOICE_ITEMS):** Light yellow fill (#FFF9C4)
3. **Relationships (Diamonds):** Light green fill (#E8F5E9)
4. **Attributes (Ovals):** White or light gray fill (#F5F5F5)
5. **Primary Keys:** Bold text with underline
6. **Foreign Keys:** Italic text with dashed underline

---

## Layout Tips

```
         USER_TRIALS          USERS          USER_SUBSCRIPTIONS
              │                 │                    │
              │                 │                    │
              └────[Has_Trial]──┴──[Subscribes]─────┘
                                │
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
          CLIENTS           INVOICES          PAYMENTS
              │                 │                 │
              └───[Receives]────┤                 │
                                │                 │
                          INVOICE_ITEMS           │
                                                  │
                            [Has_Payment]─────────┘
```

---

## Formatting Checklist

✅ All 7 entities drawn as rectangles  
✅ INVOICE_ITEMS has double border (weak entity)  
✅ All primary keys underlined  
✅ All foreign keys with dashed underline  
✅ All 9 relationships shown as diamonds  
✅ CONTAINS relationship has double border  
✅ Cardinalities (1, N, M) labeled on all relationships  
✅ All attributes connected with lines  
✅ Clean, organized layout  
✅ Consistent spacing and alignment

---

## Export Instructions

1. **File → Export as → PNG**
   - Set DPI to **300** (high quality)
   - Enable "Transparent Background" (optional)
   - Click "Export"

2. **File → Export as → PDF**
   - Enable "Crop" to fit diagram
   - Click "Export"

---

**Your ER Diagram is complete! ✅**

This shows all 7 tables from your BillCraft project with proper ER notation.


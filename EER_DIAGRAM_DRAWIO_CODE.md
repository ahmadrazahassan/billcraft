# EER Diagram for Draw.io - BillCraft
## Specialization/Generalization Hierarchy

---

## Quick Start

1. Go to https://app.diagrams.net/ (Draw.io)
2. Create New Diagram → Blank Diagram
3. Follow the instructions below to create the EER specialization

---

## What is EER?

**EER (Enhanced Entity-Relationship)** extends ER with:
- **Specialization/Generalization** (ISA relationships)
- **Inheritance** of attributes
- **Disjoint/Overlap** constraints

---

## Shapes You'll Need

- **Rectangle** - For superclass and subclasses
- **Oval/Ellipse** - For attributes
- **Circle with "ISA" or "d"** - For specialization symbol
- **Triangle or "d" symbol** - Alternative ISA notation
- **Lines** - For connections

---

## BillCraft EER Model: USER Specialization

### Concept

In BillCraft, all USERS can be specialized into three types based on their subscription plan:

```
                    USERS (Superclass)
                         │
                    ┌────┴────┐
                    │   ISA   │  (Disjoint Specialization)
                    └────┬────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   FREE_USER     PROFESSIONAL_USER   ENTERPRISE_USER
    (Trial)        (Paid Monthly)     (Paid Yearly)
```

---

## Step-by-Step Creation

### STEP 1: Create Superclass (USERS)

**Shape:** Rectangle  
**Label:** `USERS`  
**Position:** Top-center of canvas  
**Size:** Make it wider than subclasses (about 200px wide)

**Attributes (Ovals around USERS - Common to all):**
- `id` (underline - primary key)
- `firebase_uid`
- `email`
- `full_name`
- `company_name`
- `company_email`
- `company_phone`
- `company_address`
- `currency`
- `created_at`
- `updated_at`

**Note:** Place these ovals around the top and sides of USERS rectangle

---

### STEP 2: Create ISA Symbol

**Option A (Circle with "ISA"):**
1. Draw a **Circle** below USERS
2. Add text inside: `ISA` or `d` (for disjoint)
3. Size: Small (about 40px diameter)

**Option B (Triangle - like Chen notation):**
1. Draw an **Isosceles Triangle** below USERS
2. Point facing down
3. Add text "d" near it (disjoint)

**Position:** Directly below USERS, centered

---

### STEP 3: Connect Superclass to ISA

**Line:** Draw a straight line from bottom of USERS to top of ISA circle/triangle

**Properties:**
- Solid line
- No arrows
- Centered

---

### STEP 4: Create Subclass 1 - FREE_USER

**Shape:** Rectangle  
**Label:** `FREE_USER`  
**Subtitle:** (Trial)  
**Position:** Bottom-left, below ISA symbol

**Specific Attributes (Ovals around FREE_USER):**
- `trial_ends_at`
- `trial_days_remaining`
- `trial_status`
- `features_limited`

**Characteristics:**
- 90-day free trial
- Limited features
- Can create 10 invoices
- No payment required

---

### STEP 5: Create Subclass 2 - PROFESSIONAL_USER

**Shape:** Rectangle  
**Label:** `PROFESSIONAL_USER`  
**Subtitle:** (Monthly Subscription)  
**Position:** Bottom-center, below ISA symbol

**Specific Attributes (Ovals around PROFESSIONAL_USER):**
- `stripe_customer_id`
- `stripe_subscription_id`
- `subscription_start_date`
- `monthly_payment_amount`
- `auto_renew`

**Characteristics:**
- $29/month
- Unlimited invoices
- All templates
- Priority support

---

### STEP 6: Create Subclass 3 - ENTERPRISE_USER

**Shape:** Rectangle  
**Label:** `ENTERPRISE_USER`  
**Subtitle:** (Annual Subscription)  
**Position:** Bottom-right, below ISA symbol

**Specific Attributes (Ovals around ENTERPRISE_USER):**
- `stripe_customer_id`
- `stripe_subscription_id`
- `subscription_start_date`
- `annual_payment_amount`
- `team_size`
- `api_access_enabled`
- `custom_branding`
- `dedicated_support`

**Characteristics:**
- $290/year (save $58)
- Unlimited everything
- API access
- Custom features
- Team collaboration

---

### STEP 7: Connect ISA to Subclasses

Draw 3 lines from ISA symbol to each subclass:

1. **Line from ISA to FREE_USER**
   - From bottom-left of ISA circle/triangle
   - To top-center of FREE_USER rectangle
   - Solid line, no arrow

2. **Line from ISA to PROFESSIONAL_USER**
   - From bottom-center of ISA circle/triangle
   - To top-center of PROFESSIONAL_USER rectangle
   - Solid line, no arrow

3. **Line from ISA to ENTERPRISE_USER**
   - From bottom-right of ISA circle/triangle
   - To top-center of ENTERPRISE_USER rectangle
   - Solid line, no arrow

---

## Complete EER Diagram Structure

```
                         ┌──────────────────────────────┐
                         │          USERS               │ (Superclass)
                         │  ─────────────────────────   │
                         │  • id (PK)                   │
                         │  • firebase_uid              │
                         │  • email                     │
                         │  • full_name                 │
                         │  • company_name              │
                         │  • company_email             │
                         │  • created_at, updated_at    │
                         └──────────────┬───────────────┘
                                        │
                                        │
                                   ┌────▼────┐
                                   │   ISA   │ (Disjoint)
                                   │    d    │
                                   └────┬────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
        ┌───────────▼──────────┐  ┌────▼─────────────┐  ┌─▼────────────────┐
        │   FREE_USER          │  │ PROFESSIONAL_USER│  │ ENTERPRISE_USER  │
        │   (Trial)            │  │ (Monthly $29)    │  │ (Yearly $290)    │
        ├──────────────────────┤  ├──────────────────┤  ├──────────────────┤
        │ • trial_ends_at      │  │ • stripe_id      │  │ • stripe_id      │
        │ • trial_days_remain  │  │ • subscription_id│  │ • subscription_id│
        │ • trial_status       │  │ • monthly_amount │  │ • annual_amount  │
        │ • features_limited   │  │ • auto_renew     │  │ • team_size      │
        │                      │  │                  │  │ • api_enabled    │
        │ Constraints:         │  │ Features:        │  │ • custom_brand   │
        │ • 10 invoices max    │  │ • Unlimited      │  │ • dedicated_supp │
        │ • 5 clients max      │  │ • All templates  │  │                  │
        │ • 90 days limit      │  │ • Priority supp  │  │ Features:        │
        │                      │  │                  │  │ • Everything ++  │
        └──────────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## Specialization Properties

### Disjoint Constraint
- **Symbol:** `d` (disjoint)
- **Meaning:** A user can belong to ONLY ONE subclass at a time
- **Business Rule:** You cannot be both FREE_USER and PROFESSIONAL_USER simultaneously

### Total/Partial Participation
- **Type:** Total (every user must belong to one subclass)
- **Notation:** Use double line from USERS to ISA (optional)
- **Meaning:** Every user in BillCraft must be either Free, Professional, or Enterprise

---

## Alternative Notation: Triangle Style

If you prefer Chen notation (like your example image):

```
                    ┌──────────┐
                    │  USERS   │
                    └─────┬────┘
                          │
                          ▼
                         ╱ ╲
                        ╱   ╲  ← Triangle (ISA symbol)
                       ╱  d  ╲
                      ╱───────╲
                     ╱    │    ╲
                    ╱     │     ╲
                   ▼      ▼      ▼
              FREE_USER  PRO  ENTERPRISE
```

**To create triangle in Draw.io:**
1. Select **Shapes → Basic → Triangle**
2. Rotate to point downward
3. Add text "d" or "ISA" near it

---

## Color Scheme (Professional Look)

1. **Superclass (USERS):**
   - Fill: Light blue (#BBDEFB)
   - Border: Dark blue (#1976D2)
   - Border width: 2pt

2. **ISA Symbol:**
   - Fill: White
   - Border: Black
   - Border width: 2pt
   - Text: Bold "d" or "ISA"

3. **Subclass FREE_USER:**
   - Fill: Light green (#C8E6C9)
   - Border: Green (#388E3C)
   - Border width: 2pt

4. **Subclass PROFESSIONAL_USER:**
   - Fill: Light orange (#FFE0B2)
   - Border: Orange (#F57C00)
   - Border width: 2pt

5. **Subclass ENTERPRISE_USER:**
   - Fill: Light purple (#E1BEE7)
   - Border: Purple (#7B1FA2)
   - Border width: 2pt

6. **Attributes (Ovals):**
   - Fill: White
   - Border: Gray (#757575)
   - Border width: 1pt

---

## Adding Constraints (Optional but Professional)

Add text boxes near the diagram to document constraints:

**Constraint Box 1:**
```
Specialization Type: Disjoint
- A user belongs to exactly ONE subclass
- No overlap between subclasses
```

**Constraint Box 2:**
```
Participation: Total
- Every USERS entity must be specialized
- No user exists without a plan type
```

**Constraint Box 3:**
```
Business Rules:
- Free users: 90-day trial, 10 invoices limit
- Professional: Unlimited invoices, monthly billing
- Enterprise: All features, annual billing, team access
```

---

## Inheritance Explanation (Add as Note)

Add a text box explaining inheritance:

```
┌────────────────────────────────────────────────┐
│  INHERITANCE:                                  │
│                                                │
│  All subclasses inherit from USERS:           │
│  ✓ id, firebase_uid, email, full_name         │
│  ✓ company_name, company_email                │
│  ✓ created_at, updated_at                     │
│                                                │
│  Plus their own specific attributes:          │
│  • FREE_USER: trial_ends_at, trial_status     │
│  • PROFESSIONAL_USER: stripe_id, monthly_amt  │
│  • ENTERPRISE_USER: team_size, api_enabled    │
└────────────────────────────────────────────────┘
```

---

## Checklist for Complete EER Diagram

✅ Superclass (USERS) with common attributes  
✅ ISA symbol (circle or triangle) with "d" label  
✅ Three subclasses (FREE, PROFESSIONAL, ENTERPRISE)  
✅ Specific attributes for each subclass  
✅ Lines connecting superclass → ISA → subclasses  
✅ "Disjoint" label or "d" symbol  
✅ Color coding for clarity  
✅ Legend explaining specialization type  
✅ Business rules documented  
✅ Clean, symmetric layout  

---

## Layout Dimensions (Recommended)

- **USERS rectangle:** 200px wide × 150px tall
- **ISA circle:** 50px diameter
- **Subclass rectangles:** 180px wide × 200px tall
- **Spacing between subclasses:** 50px
- **Vertical space (USERS to ISA):** 80px
- **Vertical space (ISA to subclasses):** 80px

---

## Export Instructions

1. **File → Export as → PNG**
   - Set DPI to **300** (high quality)
   - Enable "Selection Only" if you want to crop
   - Enable "Transparent Background" (optional)
   - Click "Export"

2. **File → Export as → PDF**
   - Enable "Crop" to fit diagram
   - Click "Export"

3. **Save the .drawio file** for future edits

---

## Why This EER Model Makes Sense for BillCraft

1. **Clear Hierarchy:** Users are categorized by subscription plan
2. **Disjoint Constraint:** A user can only have one active plan
3. **Business Logic:** Each plan has different features and pricing
4. **Scalability:** Easy to add new plan types (e.g., STUDENT_USER)
5. **Database Design:** Maps to `users.plan` column and `user_subscriptions` table

---

**Your EER Diagram is complete! ✅**

This shows the specialization hierarchy for BillCraft's user types with proper ISA notation and disjoint constraints.


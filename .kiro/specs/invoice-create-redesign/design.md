# Invoice Create Page Redesign - Design Document

## Overview

This design document provides detailed specifications for the completely redesigned invoice create page. The design follows modern SaaS principles with ultra-rounded components, perfect positioning, and the custom dashboard theme.

## Architecture

### Component Hierarchy

```
InvoiceCreatePage
├── StickyHeader
│   ├── BackButton
│   ├── PageTitle
│   └── ActionButtons (Save, Send, Preview)
├── MainContent (Two-Column Layout)
│   ├── FormColumn (60% width)
│   │   ├── TemplateSelector
│   │   ├── CompanySection
│   │   ├── ClientSection
│   │   ├── InvoiceDetailsSection
│   │   ├── ItemsSection
│   │   ├── TotalsSection
│   │   └── AdditionalSection
│   └── PreviewColumn (40% width)
│       └── LivePreview
└── FloatingElements
    ├── AIAssistant
    └── AutoSaveIndicator
```

### Layout System

**Desktop (1024px+):**
- Two-column grid: 60% form, 40% preview
- 32px gap between columns
- 24px padding in containers
- Sticky header and preview

**Tablet (768px-1023px):**
- Two-column grid: 55% form, 45% preview
- 24px gap between columns
- 20px padding in containers

**Mobile (<768px):**
- Single column, stacked layout
- Preview hidden, accessible via button
- 16px padding in containers
- Collapsible sections


## Components and Interfaces

### 1. Sticky Header

**Design Specifications:**
```css
.invoice-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #E5E5E5;
  padding: 20px 32px;
  position: sticky;
  top: 0;
  z-index: 50;
}
```

**Layout:**
- Height: 80px
- Flex layout: space-between
- Left: Back button + Title
- Right: Action buttons

**Action Buttons:**
```typescript
// Save Draft Button
{
  background: transparent;
  border: 2px solid #A40E4C;
  color: #A40E4C;
  borderRadius: 16px;
  padding: 12px 24px;
  hover: { background: #FDF5F8 }
}

// Send Invoice Button (Primary)
{
  background: #A40E4C;
  color: white;
  borderRadius: 16px;
  padding: 12px 32px;
  hover: { background: #8A0C3F, transform: translateY(-1px) }
}

// Preview Button
{
  background: #5B8E7D;
  color: white;
  borderRadius: 16px;
  padding: 12px 24px;
  hover: { background: #4A7366 }
}
```

### 2. Template Selector

**Design Specifications:**
- Position: Top of form column
- Background: White
- Border: 1px solid #E5E5E5
- Border Radius: 20px
- Padding: 20px
- Shadow: 0 2px 8px rgba(0,0,0,0.04)

**Layout:**
```
┌─────────────────────────────────────┐
│ 📄 Template                         │
│ ─────────────────────────────────── │
│ [Template Preview Thumbnail]        │
│ Executive Navy                      │
│ [Change Template Button]            │
└─────────────────────────────────────┘
```

**Change Template Button:**
- Full width
- Border: 2px dashed #E5E5E5
- Border Radius: 12px
- Padding: 12px
- Hover: Border color #A40E4C

### 3. Company Section

**Design Specifications:**
- Background: White
- Border: 1px solid #E5E5E5
- Border Radius: 20px
- Padding: 24px
- Margin Top: 16px

**Fields Layout:**
```
┌─────────────────────────────────────┐
│ 🏢 Company Information              │
│ ─────────────────────────────────── │
│ [Logo Upload Area]                  │
│                                     │
│ Company Name *                      │
│ [Input Field]                       │
│                                     │
│ Email *                             │
│ [Input Field]                       │
│                                     │
│ Phone                               │
│ [Input Field]                       │
│                                     │
│ Address                             │
│ [Input Field]                       │
│                                     │
│ City                                │
│ [Input Field]                       │
│                                     │
│ Website                             │
│ [Input Field]                       │
└─────────────────────────────────────┘
```

**Logo Upload Area:**
- Border: 2px dashed #E5E5E5
- Border Radius: 16px
- Padding: 32px
- Text Align: Center
- Hover: Border color #A40E4C
- Background: #FAFAFA

### 4. Client Section

**Design Specifications:**
- Background: White
- Border: 1px solid #E5E5E5
- Border Radius: 20px
- Padding: 24px
- Margin Top: 16px

**Client Picker:**
```
┌─────────────────────────────────────┐
│ 👤 Client Information               │
│ ─────────────────────────────────── │
│ Select Client                       │
│ [Searchable Dropdown ▼]             │
│                                     │
│ OR                                  │
│                                     │
│ Client Name *                       │
│ [Input Field]                       │
│                                     │
│ Email *                             │
│ [Input Field]                       │
│                                     │
│ Address                             │
│ [Input Field]                       │
│                                     │
│ City                                │
│ [Input Field]                       │
└─────────────────────────────────────┘
```

**Dropdown Styling:**
- Border: 2px solid #E5E5E5
- Border Radius: 16px
- Max Height: 300px
- Scroll: Auto
- Item Hover: Background #FDF5F8
- Selected: Background #A40E4C, Color white

### 5. Invoice Details Section

**Design Specifications:**
- Background: White
- Border: 1px solid #E5E5E5
- Border Radius: 20px
- Padding: 24px
- Margin Top: 16px

**Layout (Grid 2 columns):**
```
┌─────────────────────────────────────┐
│ 📋 Invoice Details                  │
│ ─────────────────────────────────── │
│ Invoice Number *    Issue Date *    │
│ [Input]             [Date Picker]   │
│                                     │
│ Due Date *          Currency        │
│ [Date Picker]       [Select]        │
└─────────────────────────────────────┘
```

**Date Picker Styling:**
- Border: 2px solid #E5E5E5
- Border Radius: 12px
- Padding: 12px 16px
- Focus: Border #A40E4C

### 6. Items Section

**Design Specifications:**
- Background: White
- Border: 1px solid #E5E5E5
- Border Radius: 20px
- Padding: 24px
- Margin Top: 16px

**Table Layout:**
```
┌──────────────────────────────────────────────────────────┐
│ 📦 Items                                                 │
│ ──────────────────────────────────────────────────────── │
│ Description    Qty    Rate    Amount    Actions          │
│ ──────────────────────────────────────────────────────── │
│ [Input]        [#]    [$]     $0.00     [🗑️]            │
│ [Input]        [#]    [$]     $0.00     [🗑️]            │
│ ──────────────────────────────────────────────────────── │
│ [+ Add Item Button]                                      │
└──────────────────────────────────────────────────────────┘
```

**Add Item Button:**
- Full width
- Border: 2px dashed #E5E5E5
- Border Radius: 12px
- Padding: 12px
- Color: #A40E4C
- Hover: Background #FDF5F8

### 7. Totals Section

**Design Specifications:**
- Background: Linear gradient from #FAFAFA to white
- Border: 2px solid #E5E5E5
- Border Radius: 20px
- Padding: 24px
- Margin Top: 16px

**Layout:**
```
┌─────────────────────────────────────┐
│ 💰 Totals                           │
│ ─────────────────────────────────── │
│ Subtotal              $0.00         │
│                                     │
│ Tax Rate (%)                        │
│ [Input] %             $0.00         │
│                                     │
│ Discount                            │
│ [Input]               -$0.00        │
│ ─────────────────────────────────── │
│ Total                 $0.00         │
│ ═════════════════════════════════   │
└─────────────────────────────────────┘
```

**Total Display:**
- Font Size: 24px
- Font Weight: 700
- Color: #A40E4C
- Background: #FDF5F8
- Padding: 16px
- Border Radius: 12px


### 8. Additional Section

**Design Specifications:**
- Background: White
- Border: 1px solid #E5E5E5
- Border Radius: 20px
- Padding: 24px
- Margin Top: 16px

**Layout:**
```
┌─────────────────────────────────────┐
│ 📝 Additional Information           │
│ ─────────────────────────────────── │
│ Notes                               │
│ [Textarea - 4 rows]                 │
│                                     │
│ Terms & Conditions                  │
│ [Textarea - 4 rows]                 │
└─────────────────────────────────────┘
```

**Textarea Styling:**
- Border: 2px solid #E5E5E5
- Border Radius: 12px
- Padding: 12px 16px
- Font Size: 14px
- Line Height: 1.6
- Focus: Border #A40E4C

### 9. Live Preview

**Design Specifications:**
- Position: Sticky (top: 96px)
- Background: #F5F5F5
- Border: 1px solid #E5E5E5
- Border Radius: 20px
- Padding: 16px
- Max Height: calc(100vh - 120px)
- Overflow: Auto

**Preview Header:**
```
┌─────────────────────────────────────┐
│ 👁️ Live Preview                     │
│ Executive Navy Template             │
│ [Fullscreen] [Download]             │
└─────────────────────────────────────┘
```

**Preview Container:**
- Background: White
- Border Radius: 12px
- Shadow: 0 4px 16px rgba(0,0,0,0.08)
- Scale: 0.85 (to fit in container)
- Transform Origin: Top center

### 10. Template Selector Modal

**Design Specifications:**
- Overlay: rgba(0, 0, 0, 0.5)
- Modal Background: White
- Border Radius: 24px
- Max Width: 1200px
- Max Height: 80vh
- Padding: 32px

**Modal Layout:**
```
┌──────────────────────────────────────────────────┐
│ Choose Template                          [✕]     │
│ ──────────────────────────────────────────────── │
│ [Search] [All] [Corporate] [Modern] [Luxury]     │
│ ──────────────────────────────────────────────── │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                     │
│ │Tmpl│ │Tmpl│ │Tmpl│ │Tmpl│                     │
│ │ 1  │ │ 2  │ │ 3  │ │ 4  │                     │
│ └────┘ └────┘ └────┘ └────┘                     │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                     │
│ │Tmpl│ │Tmpl│ │Tmpl│ │Tmpl│                     │
│ │ 5  │ │ 6  │ │ 7  │ │ 8  │                     │
│ └────┘ └────┘ └────┘ └────┘                     │
└──────────────────────────────────────────────────┘
```

**Template Card:**
- Width: 240px
- Height: 320px
- Border: 2px solid #E5E5E5
- Border Radius: 16px
- Padding: 12px
- Hover: Border #A40E4C, Transform scale(1.02)
- Selected: Border 3px solid #A40E4C

### 11. AI Assistant

**Design Specifications:**
- Position: Fixed bottom-right
- Width: 400px (desktop), 100% (mobile)
- Max Height: 600px
- Background: White
- Border: 1px solid #E5E5E5
- Border Radius: 24px
- Shadow: 0 8px 32px rgba(0,0,0,0.12)

**AI Button (Collapsed):**
- Width: 64px
- Height: 64px
- Background: #A40E4C
- Border Radius: 32px
- Shadow: 0 4px 16px rgba(164, 14, 76, 0.3)
- Icon: Bot (24px, white)
- Hover: Scale 1.1

**AI Chat Interface:**
```
┌─────────────────────────────────────┐
│ 🤖 AI Assistant            [−] [✕]  │
│ ─────────────────────────────────── │
│ [Message History]                   │
│                                     │
│                                     │
│                                     │
│ ─────────────────────────────────── │
│ [Type your message...]      [Send]  │
│ [📎 Attach]                         │
└─────────────────────────────────────┘
```

**Message Styling:**
- User: Background #FDF5F8, Align right
- Assistant: Background #F5F9F7, Align left
- Border Radius: 16px
- Padding: 12px 16px
- Max Width: 80%

### 12. Input Field Styling

**Standard Input:**
```css
.invoice-input {
  border: 2px solid #E5E5E5;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  transition: all 200ms ease;
}

.invoice-input:focus {
  border-color: #A40E4C;
  outline: none;
  box-shadow: 0 0 0 3px rgba(164, 14, 76, 0.1);
}

.invoice-input:error {
  border-color: #A40E4C;
  background: #FDF5F8;
}
```

**Label Styling:**
```css
.invoice-label {
  font-size: 13px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 8px;
  display: block;
}

.invoice-label.required::after {
  content: " *";
  color: #A40E4C;
}
```

### 13. Button Variants

**Primary Button:**
```css
.btn-invoice-primary {
  background: #A40E4C;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  transition: all 200ms ease;
}

.btn-invoice-primary:hover {
  background: #8A0C3F;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(164, 14, 76, 0.2);
}
```

**Secondary Button:**
```css
.btn-invoice-secondary {
  background: #5B8E7D;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  transition: all 200ms ease;
}

.btn-invoice-secondary:hover {
  background: #4A7366;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(91, 142, 125, 0.2);
}
```

**Outline Button:**
```css
.btn-invoice-outline {
  background: transparent;
  color: #A40E4C;
  border: 2px solid #A40E4C;
  border-radius: 16px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  transition: all 200ms ease;
}

.btn-invoice-outline:hover {
  background: #FDF5F8;
  border-color: #8A0C3F;
}
```

**Icon Button:**
```css
.btn-invoice-icon {
  background: transparent;
  border: none;
  border-radius: 12px;
  padding: 8px;
  color: #6B6B6B;
  transition: all 200ms ease;
}

.btn-invoice-icon:hover {
  background: #FAFAFA;
  color: #A40E4C;
}
```

## Data Models

### Invoice Form Data

```typescript
interface InvoiceFormData {
  // Template
  templateId: string;
  
  // Company
  company: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    website?: string;
    logo?: string;
  };
  
  // Client
  clientId?: string; // If selected from existing
  client: {
    name: string;
    email: string;
    address?: string;
    city?: string;
  };
  
  // Invoice Details
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  
  // Items
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  
  // Totals
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  
  // Additional
  notes?: string;
  terms?: string;
  
  // Status
  status: 'draft' | 'sent' | 'paid';
}
```

### Component Props

```typescript
interface InvoiceInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: 'text' | 'email' | 'number' | 'date';
}

interface InvoiceButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

interface InvoiceSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}
```

## Error Handling

### Validation Errors

1. **Required Field Missing**
   - Border: 2px solid #A40E4C
   - Background: #FDF5F8
   - Message: Below field in #A40E4C

2. **Invalid Format**
   - Border: 2px solid #A40E4C
   - Icon: AlertCircle in #A40E4C
   - Message: Specific format requirement

3. **Duplicate Invoice Number**
   - Toast notification in #A40E4C
   - Suggest auto-generate option

### Network Errors

1. **Save Failed**
   - Toast: "Failed to save. Retrying..."
   - Auto-retry 3 times
   - Show retry button if all fail

2. **Connection Lost**
   - Banner: "You're offline. Changes saved locally."
   - Background: #FFEF9F
   - Auto-sync when reconnected

### User Errors

1. **No Items Added**
   - Prevent save
   - Highlight items section
   - Message: "Add at least one item"

2. **Invalid Total**
   - Highlight totals section
   - Message: "Please check calculations"

## Testing Strategy

### Visual Testing

1. **Component Screenshots**
   - All input states (default, focus, error)
   - All button variants
   - All sections (collapsed/expanded)
   - Template selector modal
   - AI assistant interface

2. **Responsive Testing**
   - Desktop (1920px, 1440px, 1280px)
   - Tablet (1024px, 768px)
   - Mobile (414px, 375px)

3. **Theme Consistency**
   - Verify all colors match theme
   - Check border radius consistency
   - Validate spacing uniformity

### Functional Testing

1. **Form Validation**
   - Required fields
   - Email format
   - Number ranges
   - Date logic (due date > issue date)

2. **Calculations**
   - Item amount = quantity × rate
   - Subtotal = sum of items
   - Tax = subtotal × tax rate
   - Total = subtotal + tax - discount

3. **Client Selection**
   - Search filtering
   - Auto-populate fields
   - Clear selection
   - Add new client

4. **Template Selection**
   - Category filtering
   - Search functionality
   - Preview display
   - Apply template

5. **AI Assistant**
   - Message sending
   - Form auto-fill
   - File upload
   - Error handling

### Performance Testing

1. **Load Time**
   - Initial page load < 2s
   - Template modal open < 500ms
   - AI response < 3s

2. **Interaction Speed**
   - Input debounce 300ms
   - Auto-save debounce 30s
   - Calculation instant

3. **Animation Performance**
   - 60fps for all transitions
   - No layout shifts
   - Smooth scrolling

## Implementation Notes

### File Structure

```
app/dashboard/invoices/create/
├── page.tsx (Main page component)
├── components/
│   ├── InvoiceHeader.tsx
│   ├── FormColumn.tsx
│   ├── PreviewColumn.tsx
│   ├── sections/
│   │   ├── TemplateSelector.tsx
│   │   ├── CompanySection.tsx
│   │   ├── ClientSection.tsx
│   │   ├── InvoiceDetailsSection.tsx
│   │   ├── ItemsSection.tsx
│   │   ├── TotalsSection.tsx
│   │   └── AdditionalSection.tsx
│   ├── modals/
│   │   ├── TemplateSelectorModal.tsx
│   │   └── PreviewModal.tsx
│   ├── ui/
│   │   ├── InvoiceInput.tsx
│   │   ├── InvoiceButton.tsx
│   │   ├── InvoiceSection.tsx
│   │   └── ClientPicker.tsx
│   └── AIAssistant.tsx
└── hooks/
    ├── useInvoiceForm.ts
    ├── useAutoSave.ts
    └── useClientSelection.ts
```

### State Management

Use React hooks for local state:
- `useInvoiceForm` - Main form state and validation
- `useAutoSave` - Auto-save functionality
- `useClientSelection` - Client picker logic

### Performance Optimizations

1. **Debouncing**
   - Input changes: 300ms
   - Auto-save: 30s
   - Search: 300ms

2. **Memoization**
   - Template components
   - Calculation functions
   - Filtered lists

3. **Lazy Loading**
   - Template previews
   - AI assistant
   - Modal components

4. **Code Splitting**
   - Template components
   - PDF generation library
   - AI service

## Design Rationale

### Why Ultra-Rounded?

1. **Modern Aesthetic**: Aligns with current design trends
2. **Friendly Appearance**: Softer, more approachable
3. **Visual Hierarchy**: Helps distinguish sections
4. **Brand Consistency**: Matches dashboard theme

### Why Two-Column Layout?

1. **Efficiency**: See changes in real-time
2. **Context**: Keep preview visible while editing
3. **Professional**: Standard in SaaS invoice tools
4. **Validation**: Immediate visual feedback

### Color Usage Strategy

1. **#A40E4C (Primary)**: Actions, focus, errors
2. **#5B8E7D (Secondary)**: Success, positive feedback
3. **#FFEF9F (Accent)**: Warnings, highlights, notifications
4. **Neutrals**: Content, borders, backgrounds

# Invoice Create Page Redesign - Implementation Plan

- [ ] 1. Set up component structure and base files


  - Create component directory structure under app/dashboard/invoices/create/
  - Set up TypeScript interfaces for all data models
  - Create base CSS file with dashboard theme variables
  - _Requirements: 1.1, 2.1_

- [ ] 2. Build reusable UI components
- [ ] 2.1 Create InvoiceInput component
  - Implement input with label, error state, and validation
  - Add focus styles with #A40E4C border
  - Add ultra-rounded styling (border-radius: 12px)
  - Support text, email, number, and date types
  - _Requirements: 2.4, 8.1, 8.2, 13.2_

- [ ] 2.2 Create InvoiceButton component
  - Implement primary variant with #A40E4C background
  - Implement secondary variant with #5B8E7D background
  - Implement outline variant with #A40E4C border
  - Implement icon variant for utility actions
  - Add hover states and loading indicators
  - _Requirements: 2.1, 2.2, 4.1_

- [ ] 2.3 Create InvoiceSection component
  - Build collapsible section container with icon and title
  - Add ultra-rounded styling (border-radius: 20px)
  - Implement expand/collapse animation
  - _Requirements: 1.2, 1.3, 2.4_

- [ ] 2.4 Create ClientPicker component
  - Build searchable dropdown with existing clients
  - Implement real-time search filtering
  - Add "Add New Client" button at bottom
  - Style with ultra-rounded borders and theme colors
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Build sticky header component
- [ ] 3.1 Create InvoiceHeader component
  - Build sticky header with glassmorphism effect
  - Add back button with hover animation
  - Add page title and subtitle
  - Position action buttons on the right
  - _Requirements: 1.5, 2.1_

- [ ] 3.2 Add action buttons to header
  - Implement "Save Draft" outline button
  - Implement "Send Invoice" primary button with #A40E4C
  - Implement "Preview" secondary button with #5B8E7D
  - Add loading states for save/send operations
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 4. Build form column components
- [ ] 4.1 Create TemplateSelector component
  - Display current template thumbnail and name
  - Add "Change Template" button with dashed border
  - Open template selector modal on click
  - Apply ultra-rounded styling (border-radius: 20px)
  - _Requirements: 6.1, 6.5, 2.4_

- [ ] 4.2 Create CompanySection component
  - Build company information form with all fields
  - Add logo upload area with drag-and-drop
  - Implement logo preview and remove functionality
  - Validate required fields (name, email)
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 8.1_

- [ ] 4.3 Create ClientSection component
  - Integrate ClientPicker component
  - Add manual client input fields
  - Implement auto-populate when client selected
  - Add clear selection button
  - _Requirements: 3.1, 3.2, 3.5, 8.1_

- [ ] 4.4 Create InvoiceDetailsSection component
  - Build 2-column grid for invoice details
  - Add invoice number, issue date, due date, currency fields
  - Implement date pickers with validation
  - Auto-generate invoice number if empty
  - _Requirements: 8.3, 8.4, 2.4_

- [ ] 4.5 Create ItemsSection component
  - Build items table with description, quantity, rate, amount columns
  - Implement add item button with smooth animation
  - Implement remove item button for each row
  - Auto-calculate amount when quantity or rate changes
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 4.6 Create TotalsSection component
  - Display subtotal, tax, discount, and total
  - Add tax rate input with percentage symbol
  - Add discount amount input
  - Highlight total with #A40E4C color and larger font
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 4.7 Create AdditionalSection component
  - Add notes textarea (4 rows)
  - Add terms & conditions textarea (4 rows)
  - Apply ultra-rounded styling to textareas
  - _Requirements: 2.4_

- [ ] 5. Build preview column component
- [ ] 5.1 Create PreviewColumn component
  - Build sticky container with live preview
  - Add preview header with template name
  - Add fullscreen and download buttons
  - Scale template to fit container (scale: 0.85)
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 5.2 Implement live preview updates
  - Connect form data to preview component
  - Update preview in real-time as user types
  - Debounce updates for performance (300ms)
  - _Requirements: 9.1, 12.1_

- [ ] 6. Build template selector modal
- [ ] 6.1 Create TemplateSelectorModal component
  - Build modal overlay with backdrop blur
  - Create modal container with ultra-rounded styling (border-radius: 24px)
  - Add close button in top-right corner
  - _Requirements: 6.1, 2.4_

- [ ] 6.2 Add template grid and filtering
  - Display templates in 4-column grid
  - Add category filter buttons at top
  - Add search input for template names
  - Implement hover preview on template cards
  - _Requirements: 6.2, 6.3, 6.4_

- [ ] 6.3 Implement template selection
  - Highlight selected template with #A40E4C border
  - Apply template immediately on selection
  - Close modal after selection
  - Show success toast with #5B8E7D
  - _Requirements: 6.5, 10.4_

- [ ] 7. Build AI assistant component
- [ ] 7.1 Create AIAssistant component
  - Build floating button in bottom-right corner
  - Style button with #A40E4C background
  - Add expand/collapse animation
  - _Requirements: 7.1, 7.4, 2.1_

- [ ] 7.2 Create AI chat interface
  - Build chat container with message history
  - Style user messages with #FDF5F8 background
  - Style assistant messages with #F5F9F7 background
  - Add message input with send button
  - _Requirements: 7.2, 7.3, 2.4_

- [ ] 7.3 Implement AI functionality
  - Connect to AI service for message processing
  - Implement form auto-fill from AI responses
  - Add file upload support for data extraction
  - Show loading indicator during AI processing
  - _Requirements: 7.3, 7.5_

- [ ] 8. Implement form logic and validation
- [ ] 8.1 Create useInvoiceForm hook
  - Manage all form state in single hook
  - Implement field update functions
  - Add validation logic for all fields
  - Handle form submission
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 8.2 Implement real-time calculations
  - Calculate item amounts on quantity/rate change
  - Calculate subtotal from all items
  - Calculate tax amount from tax rate
  - Calculate final total with discount
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 8.3 Add form validation
  - Validate required fields before save
  - Validate email format
  - Validate date logic (due date > issue date)
  - Show inline error messages
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 9. Implement client management
- [ ] 9.1 Create useClientSelection hook
  - Load clients from database on mount
  - Implement client search filtering
  - Handle client selection and auto-populate
  - Handle clear selection
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 9.2 Add new client functionality
  - Open add client modal from dropdown
  - Save new client to database
  - Add new client to dropdown list
  - Auto-select newly added client
  - _Requirements: 3.4, 3.5_

- [ ] 10. Implement save and send functionality
- [ ] 10.1 Create save draft function
  - Validate required fields
  - Generate invoice number if needed
  - Save invoice to database with status "draft"
  - Show success toast with #5B8E7D
  - _Requirements: 10.1, 10.3, 10.4_

- [ ] 10.2 Create send invoice function
  - Validate all fields including client email
  - Save invoice if not already saved
  - Update status to "sent"
  - Show success toast and redirect to invoices list
  - _Requirements: 10.2, 10.3, 10.4, 10.5_

- [ ] 10.3 Add loading states
  - Show spinner on save button during save
  - Show spinner on send button during send
  - Disable buttons during operations
  - _Requirements: 10.3_

- [ ] 11. Implement auto-save functionality
- [ ] 11.1 Create useAutoSave hook
  - Debounce form changes (30 seconds)
  - Save draft automatically to local storage
  - Show auto-save indicator
  - Restore from local storage on page load
  - _Requirements: 14.2, 14.4, 12.2_

- [ ] 11.2 Handle offline mode
  - Detect network connection status
  - Save to local storage when offline
  - Show offline banner with #FFEF9F background
  - Sync to database when connection restored
  - _Requirements: 14.2, 14.3_

- [ ] 12. Implement PDF download
- [ ] 12.1 Add PDF generation functionality
  - Use html2canvas to capture template
  - Use jsPDF to create PDF document
  - Handle multi-page invoices
  - Generate professional filename
  - _Requirements: 9.5_

- [ ] 12.2 Optimize PDF quality
  - Set high scale factor (2.5) for quality
  - Wait for images to load before capture
  - Use proper A4 dimensions
  - Show success toast after download
  - _Requirements: 12.1_

- [ ] 13. Implement responsive design
- [ ] 13.1 Add mobile layout
  - Stack form and preview vertically on mobile
  - Hide preview by default, show via button
  - Collapse sections by default
  - Adjust padding and spacing for mobile
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 13.2 Add tablet layout
  - Adjust column widths for tablet (55%/45%)
  - Reduce spacing slightly
  - Keep preview visible
  - _Requirements: 11.1, 11.2_

- [ ] 13.3 Test all breakpoints
  - Test on mobile (375px, 414px)
  - Test on tablet (768px, 1024px)
  - Test on desktop (1280px, 1920px)
  - Fix any layout issues
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 14. Add accessibility features
- [ ] 14.1 Implement keyboard navigation
  - Ensure all inputs are keyboard accessible
  - Add visible focus indicators
  - Support tab navigation through form
  - Add keyboard shortcuts (Ctrl+S for save)
  - _Requirements: 13.1, 13.5_

- [ ] 14.2 Add ARIA labels
  - Add labels to all form fields
  - Add labels to buttons and links
  - Add role attributes where needed
  - Test with screen reader
  - _Requirements: 13.2, 13.3, 13.4_

- [ ] 14.3 Verify color contrast
  - Test all text/background combinations
  - Ensure WCAG AA compliance
  - Fix any contrast issues
  - _Requirements: 13.3_

- [ ] 15. Implement error handling
- [ ] 15.1 Add validation error handling
  - Show inline errors for invalid fields
  - Highlight fields with #A40E4C border
  - Scroll to first error on submit
  - _Requirements: 8.1, 8.2, 14.4_

- [ ] 15.2 Add network error handling
  - Show retry button on save failure
  - Auto-retry up to 3 times
  - Show error toast with #A40E4C
  - _Requirements: 14.1, 14.5_

- [ ] 15.3 Add session error handling
  - Detect session expiration
  - Prompt re-authentication
  - Preserve form data during re-auth
  - _Requirements: 14.3_

- [ ] 16. Optimize performance
- [ ] 16.1 Add debouncing
  - Debounce input changes (300ms)
  - Debounce auto-save (30s)
  - Debounce search (300ms)
  - _Requirements: 12.2, 12.3_

- [ ] 16.2 Add memoization
  - Memoize template components
  - Memoize calculation functions
  - Memoize filtered client list
  - _Requirements: 12.3_

- [ ] 16.3 Add lazy loading
  - Lazy load template selector modal
  - Lazy load AI assistant
  - Lazy load PDF generation library
  - _Requirements: 12.3_

- [ ] 17. Final testing and polish
  - Test all form fields and validation
  - Test client selection and auto-populate
  - Test template selection
  - Test AI assistant
  - Test save and send functionality
  - Test PDF download
  - Test responsive layouts
  - Test keyboard navigation
  - Test error scenarios
  - Fix any bugs found
  - _Requirements: All_

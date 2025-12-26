# Lenis Smooth Scrolling Implementation

Lenis has been successfully installed and configured in your BillCraft project. This document explains how to use it effectively.

## 🚀 What's Installed

- **@studio-freight/lenis** v1.0.42 - The smooth scrolling library
- **LenisProvider** - React context provider for managing Lenis instance
- **useLenis** hook - For accessing Lenis functionality in components
- **ScrollToTop** component - A floating scroll-to-top button
- **Global CSS** - Proper styling for smooth scrolling

## 📁 Files Created/Modified

### New Files:
- `components/lenis-provider.tsx` - Main Lenis provider with context
- `components/ui/scroll-to-top.tsx` - Scroll to top button component
- `hooks/use-lenis.ts` - Convenience hook export

### Modified Files:
- `app/layout.tsx` - Added LenisProvider and ScrollToTop
- `app/globals.css` - Added Lenis-specific CSS
- `app/pricing/page.tsx` - Added example usage

## 🎯 How to Use Lenis

### 1. Basic Hook Usage

```tsx
'use client'
import { useLenis } from '@/hooks/use-lenis'

export function MyComponent() {
  const { scrollTo, scrollToTop, scrollToBottom } = useLenis()

  return (
    <div>
      <button onClick={() => scrollTo('#section1', { offset: -100 })}>
        Go to Section 1
      </button>
      <button onClick={() => scrollToTop()}>
        Back to Top
      </button>
      <button onClick={() => scrollToBottom()}>
        Go to Bottom
      </button>
    </div>
  )
}
```

### 2. Scroll to Elements

```tsx
// Scroll to element by ID
scrollTo('#pricing-plans', { 
  offset: -100,    // Account for fixed header
  duration: 1.2    // Animation duration in seconds
})

// Scroll to element by selector
scrollTo('.my-section', { duration: 1.5 })

// Scroll to specific position
scrollTo(500) // Scroll to 500px from top
```

### 3. Advanced Options

```tsx
const { scrollTo, lenis } = useLenis()

// With custom easing and callbacks
scrollTo('#target', {
  offset: -80,
  duration: 2,
  easing: (t) => t * (2 - t), // Custom easing function
  onComplete: () => console.log('Scroll complete!'),
  onStart: () => console.log('Scroll started!')
})

// Access the Lenis instance directly
if (lenis) {
  lenis.stop() // Stop scrolling
  lenis.start() // Resume scrolling
}
```

### 4. Preventing Smooth Scroll on Elements

Add `data-lenis-prevent` attribute to elements that should use native scrolling:

```tsx
<div data-lenis-prevent className="overflow-auto max-h-96">
  {/* This div will use native scrolling */}
  <div className="h-screen">Long content...</div>
</div>
```

### 5. Creating Smooth Scroll Links

```tsx
export function NavigationMenu() {
  const { scrollTo } = useLenis()

  return (
    <nav>
      <a 
        href="#about" 
        onClick={(e) => {
          e.preventDefault()
          scrollTo('#about', { offset: -100 })
        }}
      >
        About
      </a>
      <a 
        href="#services" 
        onClick={(e) => {
          e.preventDefault()
          scrollTo('#services', { offset: -100 })
        }}
      >
        Services
      </a>
    </nav>
  )
}
```

## ⚙️ Configuration

The Lenis instance is configured with these settings in `components/lenis-provider.tsx`:

```tsx
const lenis = new Lenis({
  duration: 1.2,                    // Animation duration
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  direction: 'vertical',            // Scroll direction
  gestureDirection: 'vertical',     // Gesture direction
  smooth: true,                     // Enable smooth scrolling
  mouseMultiplier: 1,               // Mouse wheel sensitivity
  smoothTouch: false,               // Disable on touch for performance
  touchMultiplier: 2,               // Touch sensitivity
  infinite: false,                  // No infinite scroll
  normalizeWheel: true,             // Normalize wheel events
  wheelMultiplier: 1,               // Wheel sensitivity
})
```

## 🎨 Features Included

### Auto Anchor Handling
The provider automatically handles anchor links (`<a href="#section">`) and smoothly scrolls to them.

### Global Access
Lenis instance is available globally as `window.lenis` for debugging or external libraries.

### Scroll to Top Button
A floating scroll-to-top button appears when you scroll down 300px.

### Context Provider
All Lenis functionality is available through React context, making it easy to use in any component.

## 📱 Mobile Considerations

- `smoothTouch: false` - Disabled on touch devices for better performance
- Native scrolling is preserved for better mobile experience
- Scroll momentum is maintained on iOS devices

## 🐛 Troubleshooting

### Scroll Not Working?
1. Make sure the component is wrapped in `LenisProvider`
2. Check if `data-lenis-prevent` is applied to parent elements
3. Ensure the target element exists when calling `scrollTo`

### Performance Issues?
1. Lenis is optimized for performance with `requestAnimationFrame`
2. Touch scrolling is disabled by default on mobile
3. Use `data-lenis-prevent` for elements with their own scrolling

### TypeScript Errors?
The implementation includes proper TypeScript types. If you see errors, make sure to restart your TypeScript server.

## 🎯 Example Implementation

Check `app/pricing/page.tsx` for a live example of:
- Using the `useLenis` hook
- Smooth scrolling to sections
- Proper button implementation

## 🚀 Next Steps

1. Add smooth scroll to your navigation menus
2. Create section-to-section navigation
3. Add parallax effects with Lenis scroll events
4. Implement scroll-triggered animations

Your smooth scrolling is now ready to use! 🎉
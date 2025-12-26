# Animation Libraries Guide for BillCraft

This guide covers all the animation libraries installed in your project and when to use each one.

## 📦 Installed Libraries

- **Lenis** - Smooth scrolling (already implemented)
- **React Spring** - Physics-based animations
- **GSAP** - Professional animation library
- **Framer Motion** - Declarative React animations (already in project)

## 🎯 When to Use Each Library

### 1. **Lenis** - Smooth Scrolling
**Best for**: Page scrolling, WebGL sync, scroll-triggered effects

```tsx
import { useLenis } from '@/hooks/use-lenis'

const { scrollTo } = useLenis()
scrollTo('#section', { offset: -100, duration: 1.2 })
```

**Use Cases**:
- Smooth page scrolling
- Scroll-to-section navigation
- WebGL/Three.js synchronization
- Parallax effects

---

### 2. **React Spring** - Physics-Based Animations
**Best for**: Natural motion, component transitions, interactive elements

```tsx
import { useSpring, animated } from '@react-spring/web'

const styles = useSpring({
  opacity: toggle ? 1 : 0,
  transform: toggle ? 'scale(1)' : 'scale(0.5)',
  config: { tension: 300, friction: 10 }
})

return <animated.div style={styles}>Content</animated.div>
```

**Key Features**:
- No duration-based timing (physics-based)
- Smooth interruptions
- Natural feel
- Great performance

**Use Cases**:
- Button hover effects
- Modal transitions
- List item animations
- Interactive cards

---

### 3. **GSAP** - Professional Animation Library
**Best for**: Complex timelines, SVG animations, scroll-triggered effects

```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.timeline()
    .from('.item-1', { x: -100, opacity: 0 })
    .from('.item-2', { y: -100, opacity: 0 }, '-=0.5')
    .from('.item-3', { scale: 0, rotation: 180 })
}, [])
```

**Key Features**:
- Precise control
- Timeline sequencing
- ScrollTrigger integration
- SVG morphing
- Text animations

**Use Cases**:
- Landing page animations
- Logo animations
- Complex scroll effects
- SVG illustrations
- Text reveals

---

### 4. **Framer Motion** - Declarative React Animations
**Best for**: Layout animations, gestures, page transitions

```tsx
import { motion, AnimatePresence } from 'framer-motion'

<motion.div
  layout
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  whileHover={{ scale: 1.05 }}
  drag
>
  Content
</motion.div>
```

**Key Features**:
- Layout animations
- Gesture handling (drag, hover, tap)
- Page transitions
- Shared element transitions

**Use Cases**:
- Page transitions
- Drag & drop interfaces
- Layout changes
- Component state changes

## 🎨 Combining Libraries

### Lenis + GSAP (Recommended)
```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/hooks/use-lenis'

useEffect(() => {
  const { lenis } = useLenis()
  
  // Sync GSAP with Lenis
  lenis?.on('scroll', ScrollTrigger.update)
  
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
}, [])
```

### React Spring + Framer Motion
```tsx
// Use React Spring for physics-based animations
const springStyles = useSpring({ /* physics config */ })

// Use Framer Motion for layout and gestures
<motion.div layout drag whileHover={{ scale: 1.1 }}>
  <animated.div style={springStyles}>
    Content
  </animated.div>
</motion.div>
```

## 🚀 Quick Start Examples

### 1. Smooth Button with React Spring
```tsx
import { useSpring, animated } from '@react-spring/web'

export function SmoothButton({ children, onClick }) {
  const [hovered, setHovered] = useState(false)
  
  const styles = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { tension: 300, friction: 10 }
  })
  
  return (
    <animated.button
      style={styles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </animated.button>
  )
}
```

### 2. Scroll-Triggered Animation with GSAP
```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ScrollReveal({ children }) {
  const ref = useRef()
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.from(ref.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, [])
  
  return <div ref={ref}>{children}</div>
}
```

### 3. Layout Animation with Framer Motion
```tsx
import { motion } from 'framer-motion'

export function ExpandableCard({ isExpanded, children }) {
  return (
    <motion.div
      layout
      className="card"
      animate={{
        height: isExpanded ? 'auto' : 100
      }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
```

## 📊 Performance Comparison

| Library | Bundle Size | Performance | Learning Curve | Use Case |
|---------|-------------|-------------|----------------|----------|
| Lenis | ~15kb | Excellent | Easy | Scrolling |
| React Spring | ~55kb | Excellent | Medium | Physics animations |
| GSAP | ~100kb+ | Excellent | Hard | Complex animations |
| Framer Motion | ~60kb | Good | Easy | React animations |

## 🎯 Recommendations by Use Case

### Landing Pages
1. **Lenis** for smooth scrolling
2. **GSAP** for hero animations and scroll effects
3. **React Spring** for interactive elements

### Dashboards
1. **Framer Motion** for layout changes
2. **React Spring** for micro-interactions
3. **Lenis** for smooth scrolling (optional)

### E-commerce
1. **React Spring** for product interactions
2. **Framer Motion** for cart animations
3. **Lenis** for smooth browsing

### Portfolios
1. **GSAP** for showcase animations
2. **Lenis** for smooth navigation
3. **Framer Motion** for project transitions

## 🔧 Installation Commands

```bash
# Already installed in your project:
npm install @studio-freight/lenis framer-motion

# Newly installed:
npm install @react-spring/web gsap react-transition-group
```

## 📝 Next Steps

1. Visit `/animations` page to see all examples in action
2. Choose the right library for your specific use case
3. Combine libraries for maximum effect
4. Always test performance on mobile devices
5. Consider bundle size impact

## 🎪 Live Examples

Visit the animations page at `/animations` to see all libraries in action with interactive examples!

---

**Pro Tip**: Start with one library and gradually add others as needed. Don't over-animate - subtle effects often work better than flashy ones! 🎨
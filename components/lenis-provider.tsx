'use client'

import { ReactNode, useEffect, useRef, createContext, useContext } from 'react'
import Lenis from '@studio-freight/lenis'

interface LenisContextType {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, options?: any) => void
  scrollToTop: (options?: any) => void
  scrollToBottom: (options?: any) => void
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  scrollToTop: () => {},
  scrollToBottom: () => {},
})

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2,
      infinite: false,
      normalizeWheel: true,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    // Make Lenis globally accessible
    ;(window as any).lenis = lenis

    // Animation frame loop for Lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Listen for anchor clicks and smooth scroll to them
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          lenis.scrollTo(element, { offset: -100 }) // Add some offset for headers
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      delete (window as any).lenis
    }
  }, [])

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options)
    }
  }

  const scrollToTop = (options?: any) => {
    scrollTo(0, options)
  }

  const scrollToBottom = (options?: any) => {
    scrollTo('bottom', options)
  }

  const contextValue: LenisContextType = {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    scrollToBottom,
  }

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  )
}

// Custom hook to use Lenis
export function useLenis() {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider')
  }
  return context
}
"use client"

import { useEffect, useRef, createContext, useContext } from "react"
import Lenis from "lenis"

// Create context to access Lenis instance from anywhere
const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip Lenis for users who prefer reduced motion
      return
    }

    // Initialize Lenis with optimized settings for performance
    const lenis = new Lenis({
      duration: 0.8, // Faster for better performance
      easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler cubic easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    })

    lenisRef.current = lenis

    // Make lenis globally accessible
    // @ts-expect-error - adding to window for global access
    window.lenis = lenis

    // Use a single RAF loop
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Handle anchor link clicks for smooth scrolling to sections
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        const href = anchor.getAttribute("href")
        if (href && href.startsWith("#")) {
          e.preventDefault()
          const targetElement = document.querySelector(href)
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 0.8,
            })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("click", handleAnchorClick)
      // @ts-expect-error - cleaning up window property
      delete window.lenis
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}


"use client"

import { useEffect, useRef, createContext, useContext } from "react"
import Lenis from "lenis"

// Create context to access Lenis instance from anywhere
const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with optimized settings for performance
    const lenis = new Lenis({
      duration: 1.0, // Slightly faster for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly reduced for less intense scrolling
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    })

    lenisRef.current = lenis

    // Make lenis globally accessible
    // @ts-expect-error - adding to window for global access
    window.lenis = lenis

    // Use a single RAF loop - more efficient
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
              duration: 1.2,
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


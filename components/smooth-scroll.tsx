"use client"

import { ReactLenis, useLenis } from "lenis/react"
import { useEffect } from "react"

// A subcomponent to expose the lenis instance globally for compatibility
function GlobalLenisExposer() {
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      // @ts-expect-error - adding to window for global access
      window.lenis = lenis
      return () => {
        // @ts-expect-error - cleanup window property
        delete window.lenis
      }
    }
  }, [lenis])

  useEffect(() => {
    // Handle anchor link clicks for smooth scrolling to sections
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor && lenis) {
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
    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [lenis])

  return null
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 0.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 1.4,
        touchMultiplier: 1.8,
      }}
    >
      <GlobalLenisExposer />
      {children}
    </ReactLenis>
  )
}

"use client"

import { ReactLenis, useLenis } from "lenis/react"
import { useEffect } from "react"

function GlobalLenisExposer() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    // @ts-expect-error - adding to window for global access
    window.lenis = lenis
    return () => {
      // @ts-expect-error - cleanup window property
      delete window.lenis
    }
  }, [lenis])

  useEffect(() => {
    if (!lenis) return
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        const href = anchor.getAttribute("href")
        if (href && href.startsWith("#")) {
          const targetElement = document.querySelector(href)
          if (targetElement) {
            e.preventDefault()
            lenis.scrollTo(targetElement as HTMLElement, {
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

export default function LenisRoot() {
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
    </ReactLenis>
  )
}

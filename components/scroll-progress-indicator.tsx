"use client"

import { useEffect, useRef } from "react"

export default function ScrollProgressIndicator() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progressBar = progressRef.current
    if (!progressBar) return

    let ticking = false

    const updateProgress = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const ratio = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0

        progressBar.style.transform = `scaleX(${ratio})`
        ticking = false
      })
    }

    // Use Lenis if available
    // @ts-expect-error - lenis is added to window
    const lenis = window.lenis

    if (lenis) {
      lenis.on("scroll", updateProgress)
    } else {
      window.addEventListener("scroll", updateProgress, { passive: true })
    }

    updateProgress()

    return () => {
      if (lenis) {
        lenis.off("scroll", updateProgress)
      } else {
        window.removeEventListener("scroll", updateProgress)
      }
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-transparent pointer-events-none">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-green-500 via-green-400 to-emerald-500 will-change-transform origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}

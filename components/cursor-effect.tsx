"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function CursorEffect() {
  const [mounted, setMounted] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const bigGlowRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const rafId = useRef<number>(0)

  useEffect(() => {
    setMounted(true)
    
    // Only show cursor effect on desktop
    if (typeof window === "undefined" || window.innerWidth < 768) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (glowRef.current) glowRef.current.style.opacity = '0'
      if (bigGlowRef.current) bigGlowRef.current.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (glowRef.current) glowRef.current.style.opacity = '1'
      if (bigGlowRef.current) bigGlowRef.current.style.opacity = '1'
    }

    // Smooth animation using RAF - GPU accelerated
    const animate = () => {
      // Lerp for smooth following
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15

      const x = currentPos.current.x
      const y = currentPos.current.y

      // Use transform3d for GPU acceleration
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 75}px, ${y - 75}px, 0)`
      }
      if (bigGlowRef.current) {
        bigGlowRef.current.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    
    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) return null

  return (
    <>
      {/* Large subtle glow */}
      <div
        ref={bigGlowRef}
        className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block will-change-transform"
        style={{ opacity: 0 }}
      >
        <div
          className={`w-[300px] h-[300px] rounded-full ${
            isDark
              ? "bg-gradient-to-r from-green-500/30 via-green-400/20 to-blue-500/10"
              : "bg-gradient-to-r from-green-500/5 via-green-400/3 to-blue-500/3"
          } blur-3xl`}
        />
      </div>

      {/* Medium glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block will-change-transform"
        style={{ opacity: 0 }}
      >
        <div
          className={`w-[150px] h-[150px] rounded-full ${
            isDark
              ? "bg-gradient-to-r from-green-500/40 to-green-400/30"
              : "bg-gradient-to-r from-green-500/8 to-green-400/5"
          } blur-2xl`}
        />
      </div>

      {/* Small focused dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block will-change-transform"
        style={{ opacity: 0 }}
      >
        <div
          className={`w-6 h-6 rounded-full ${
            isDark
              ? "bg-gradient-to-r from-green-500 to-green-400"
              : "bg-gradient-to-r from-green-500/60 to-green-400/60"
          } blur-sm`}
          style={{
            boxShadow: isDark ? "0 0 15px rgba(34, 197, 94, 0.7)" : "0 0 10px rgba(34, 197, 94, 0.25)",
          }}
        />
      </div>
    </>
  )
}

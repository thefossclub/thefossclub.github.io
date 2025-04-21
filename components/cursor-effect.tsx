"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    // Only show cursor effect on desktop
    if (window.innerWidth < 768) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Single Soft Glow */}
          <motion.div
            className="fixed pointer-events-none z-[999] hidden md:block"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            initial={{ opacity: 0, scale: 0.5 }} // Start slightly smaller
            animate={{
              opacity: isDark ? 0.3 : 0.15, // Keep it subtle
              scale: 1,
              x: -25, // Adjust offset for size
              y: -25, // Adjust offset for size
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "tween", // Use tween for smoother fade/scale
              ease: "easeOut",
              duration: 0.4, // Faster transition
            }}
          >
            <div
              className={`w-[50px] h-[50px] rounded-full ${
                isDark
                  ? "bg-green-500/40"
                  : "bg-green-500/10"
              } blur-lg`} // Medium blur
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


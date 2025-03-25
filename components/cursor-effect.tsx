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
          {/* Large subtle glow */}
          <motion.div
            className="fixed pointer-events-none z-[999] hidden md:block"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            animate={{
              x: -150,
              y: -150,
              scale: [1, 1.05, 1],
              opacity: isDark ? [0.2, 0.3, 0.2] : [0.05, 0.08, 0.05], // Much lighter in light mode
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <div
              className={`w-[300px] h-[300px] rounded-full ${
                isDark
                  ? "bg-gradient-to-r from-green-500/30 via-green-400/20 to-blue-500/10"
                  : "bg-gradient-to-r from-green-500/5 via-green-400/3 to-blue-500/3"
              } blur-3xl`}
            />
          </motion.div>

          {/* Medium glow */}
          <motion.div
            className="fixed pointer-events-none z-[999] hidden md:block"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            animate={{
              x: -75,
              y: -75,
              scale: [1, 1.1, 1],
              opacity: isDark ? [0.3, 0.4, 0.3] : [0.08, 0.12, 0.08], // Much lighter in light mode
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <div
              className={`w-[150px] h-[150px] rounded-full ${
                isDark
                  ? "bg-gradient-to-r from-green-500/40 to-green-400/30"
                  : "bg-gradient-to-r from-green-500/8 to-green-400/5"
              } blur-2xl`}
            />
          </motion.div>

          {/* Small focused dot */}
          <motion.div
            className="fixed pointer-events-none z-[999] hidden md:block"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isDark ? 1 : 0.7, // Slightly less opaque in light mode
              scale: 1,
              x: -3,
              y: -3,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.5,
            }}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


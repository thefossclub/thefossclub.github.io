"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

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
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-3xl" />
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
              opacity: 0.8,
              scale: 1,
              x: -4,
              y: -4,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.5,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-green-400 shadow-lg shadow-green-500/50" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


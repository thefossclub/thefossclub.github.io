"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface TeamMemberProps {
  name: string
  role: string
  color: string
  index: number
}

export default function TeamMember({ name, role, color, index }: TeamMemberProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get initials from name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")

  // Get glow color based on the background color
  const getGlowColor = () => {
    if (color.includes("green")) return "rgba(34, 197, 94, 0.7)"
    if (color.includes("blue")) return "rgba(59, 130, 246, 0.7)"
    if (color.includes("purple")) return "rgba(168, 85, 247, 0.7)"
    if (color.includes("pink")) return "rgba(236, 72, 153, 0.7)"
    if (color.includes("yellow")) return "rgba(234, 179, 8, 0.7)"
    if (color.includes("red")) return "rgba(239, 68, 68, 0.7)"
    if (color.includes("orange")) return "rgba(249, 115, 22, 0.7)"
    if (color.includes("cyan")) return "rgba(6, 182, 212, 0.7)"
    return "rgba(34, 197, 94, 0.7)" // Default to green
  }

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <motion.div
        className={`relative w-16 h-16 rounded-full ${color} flex items-center justify-center overflow-hidden`}
        whileHover={{ scale: 1.1 }}
        style={{
          boxShadow: mounted
            ? isDark
              ? `0 0 20px ${getGlowColor()}`
              : `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
            : undefined,
        }}
      >
        <span className="text-lg font-bold text-white drop-shadow-sm">{initials}</span>
      </motion.div>
      <h3 className="text-sm font-semibold mt-2 text-gray-800 dark:text-gray-200">{name}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{role}</p>
    </motion.div>
  )
}


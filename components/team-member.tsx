"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface TeamMemberProps {
  name: string
  role: string
  color: string
  index: number
}

export default function TeamMember({ name, role, color, index }: TeamMemberProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Get initials from name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <motion.div
        className={`relative w-16 h-16 rounded-full ${color} flex items-center justify-center overflow-hidden`}
        whileHover={{ scale: 1.1 }}
        style={{
          boxShadow: isDark
            ? `0 0 20px ${color.includes("green") ? "#22c55e" : color.includes("blue") ? "#3b82f6" : color.includes("purple") ? "#a855f7" : color.includes("pink") ? "#ec4899" : color.includes("yellow") ? "#eab308" : color.includes("red") ? "#ef4444" : color.includes("orange") ? "#f97316" : color.includes("cyan") ? "#06b6d4" : "#22c55e"}`
            : `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
        }}
      >
        <span className="text-lg font-bold text-white">{initials}</span>
      </motion.div>
      <h3 className="text-sm font-semibold mt-2 text-gray-800 dark:text-gray-200">{name}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{role}</p>
    </motion.div>
  )
}


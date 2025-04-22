"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface TimelineEvent {
  year: string
  title: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export default function Timeline({ events }: TimelineProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by rendering a simpler version on server
  if (!mounted) {
    return (
      <div className="relative max-w-5xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 transform -translate-y-1/2"></div>
        <div className="flex justify-between relative">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div className="w-16 h-16 bg-gray-900 dark:bg-gray-900 rounded-full border-2 border-green-500 flex items-center justify-center z-10 mb-4">
                <span className="text-lg font-bold text-green-500">{event.year}</span>
              </div>
              <div className={`text-center ${index % 2 === 0 ? "mt-4" : "mb-4 order-first"}`}>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{event.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Horizontal line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 dark:bg-gray-800 transform -translate-y-1/2"></div>

      <div className="flex justify-between relative">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className={`w-16 h-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} rounded-full border-2 border-gradient border-gradient-green flex items-center justify-center z-10 mb-4`}
              whileHover={{ scale: 1.1, backgroundColor: theme === "dark" ? "#166534" : "#dcfce7" }}
            >
              <span className="text-lg font-bold text-gray-800 dark:text-white">{event.year}</span>
            </motion.div>
            <div className={`text-center ${index % 2 === 0 ? "mt-4" : "mb-4 order-first"}`}>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{event.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


"use client"

import { motion } from "framer-motion"

interface TeamMemberProps {
  name: string
  role: string
  color: string
  index: number
}

export default function TeamMember({ name, role, color, index }: TeamMemberProps) {
  // Replace red colors with blue/green
  const getColor = () => {
    if (color.includes("red")) return "bg-blue-500"
    if (color.includes("orange")) return "bg-green-500"
    return color
  }

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className={`relative w-20 h-20 rounded-full mb-3 ${getColor()} flex items-center justify-center overflow-hidden`}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <span className="text-xl font-bold relative z-10 text-white">
          {name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </span>
      </motion.div>
      <h3 className="text-base font-semibold">{name}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400">{role}</p>
    </motion.div>
  )
}


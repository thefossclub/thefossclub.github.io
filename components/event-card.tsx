"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

interface EventCardProps {
  title: string
  date: string
  description: string
  image: string
  index: number
}

export default function EventCard({ title, date, description, image, index }: EventCardProps) {
  return (
    <motion.div
      className="backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 hover:border-green-500/50 transition-all group card-hover-effect"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-green-500 dark:text-green-400 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  )
}


"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  link: string
  index: number
}

export default function ProjectCard({ title, description, link, index }: ProjectCardProps) {
  return (
    <motion.div
      className="backdrop-blur-sm p-6 rounded-3xl border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 hover:border-gradient hover:border-gradient-green transition-all group card-hover-effect shadow-xl hover:shadow-green-500/20"
      whileHover={{ y: -5 }}
    >
      <div className="h-full flex flex-col">
        <h3 className="text-2xl font-bold mb-3 text-gradient-green group-hover:opacity-80 transition-opacity drop-shadow-md">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{description}</p>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-gradient-green-dark hover:opacity-80 transition-opacity"
        >
          <Github className="mr-2 h-4 w-4" />
          View on GitHub
          <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  )
}


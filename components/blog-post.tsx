"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface BlogPostProps {
  title: string
  excerpt: string
  link: string
  index: number
}

export default function BlogPost({ title, excerpt, link, index }: BlogPostProps) {
  return (
    <motion.article
      className="backdrop-blur-sm p-6 rounded-3xl border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 hover:border-green-500/50 transition-all group h-full flex flex-col shadow-xl hover:shadow-green-500/20"
      whileHover={{ y: -5 }}
    >
      <h3 className="text-xl font-bold mb-3 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors text-gray-800 dark:text-gray-200 drop-shadow-sm">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{excerpt}</p>
      <Link
        href={link}
        className="inline-flex items-center text-sm font-medium text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
      >
        Read More
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.article>
  )
}


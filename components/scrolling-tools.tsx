"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ToolCard from "./tool-card"

interface Tool {
  name: string
  description: string
  icon: string
}

interface ScrollingToolsProps {
  tools: Tool[]
}

export default function ScrollingTools({ tools }: ScrollingToolsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContentRef.current) {
      const scrollAmount = scrollContentRef.current.offsetWidth / 2
      scrollContentRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden py-10 group">
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      <div
        ref={scrollContentRef}
        className="overflow-x-auto scrollbar-hide hide-scrollbar"
      >
        <motion.div
          className="flex space-x-4 py-4 w-max"
          style={{ x }}
        >
          {tools.concat(tools).map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex-shrink-0 w-64"
            >
              <ToolCard name={tool.name} description={tool.description} icon={tool.icon} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed ml-2"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed mr-2"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Fix the transform style to use a string value
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <div ref={containerRef} className="relative overflow-hidden py-10">
      <motion.div className="flex space-x-8 py-4" style={{ x }}>
        {tools.concat(tools).map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex-shrink-0"
          >
            <ToolCard name={tool.name} description={tool.description} icon={tool.icon} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}


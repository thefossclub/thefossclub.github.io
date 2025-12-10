"use client"

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
    <div
      className="p-6 rounded-3xl border border-border bg-card transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1"
    >
      <div className="h-full flex flex-col">
        <h3 
          className="text-2xl font-bold mb-3 text-gradient-green group-hover:opacity-80 transition-opacity"
        >
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
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
    </div>
  )
}

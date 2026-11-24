"use client"

import { FaGithub } from "react-icons/fa"
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
      className="h-full flex flex-col p-6 rounded-3xl border border-border bg-card shadow-lg"
    >
      <div className="h-full flex flex-col">
        <h3 
          className="text-2xl font-bold mb-3 text-gradient-green"
        >
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 grow">{description}</p>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center self-start text-sm font-medium text-gradient-green-dark transition-ui hover:opacity-80"
        >
          <FaGithub className="mr-2 h-4 w-4" />
          View on GitHub
          <span className="ml-1 transition-ui group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}

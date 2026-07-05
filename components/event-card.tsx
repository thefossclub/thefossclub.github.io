"use client"

import { Calendar } from "lucide-react"

interface EventCardProps {
  title: string
  date: string
  description: string
  image: string
  index: number
}

export default function EventCard({ title, date, description, image }: EventCardProps) {
  return (
    <div
      className="rounded-3xl overflow-hidden border border-border bg-card group shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-emerald-600 dark:text-emerald-500 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">{date}</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 text-foreground drop-shadow-sm">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

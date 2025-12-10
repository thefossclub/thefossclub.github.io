"use client"

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
      <div className="relative max-w-5xl mx-auto px-2">
        <div className="absolute md:top-1/2 md:left-0 md:right-0 md:h-0.5 md:bg-border md:transform md:-translate-y-1/2
                        left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 md:hidden"></div>
        <div className="flex md:flex-row flex-col md:justify-between justify-start relative">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col items-center relative md:w-auto w-full mb-8 md:mb-0">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full border-2 border-green-500 flex items-center justify-center z-10 mb-2 md:mb-4">
                <span className="text-base md:text-lg font-bold text-white">{event.year}</span>
              </div>
              <div className={`text-center ${index % 2 === 0 ? "mt-2 md:mt-4" : "mb-2 md:mb-4 md:order-first"}`}>
                <h4 className="text-xs md:text-sm font-medium text-muted-foreground">{event.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative max-w-5xl mx-auto px-2">
      {/* Responsive horizontal/vertical line */}
      <div className="absolute md:top-1/2 md:left-0 md:right-0 md:h-0.5 md:bg-border md:transform md:-translate-y-1/2
                      left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 md:hidden"></div>
      <div className="flex md:flex-row flex-col md:justify-between justify-start relative">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative md:w-auto w-full mb-8 md:mb-0"
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full border-2 border-gradient border-gradient-green flex items-center justify-center z-10 mb-2 md:mb-4 transition-all hover:scale-110 hover:bg-primary/80"
            >
              <span className="text-base md:text-lg font-bold text-white">{event.year}</span>
            </div>
            <div className={`text-center ${index % 2 === 0 ? "mt-2 md:mt-4" : "mb-2 md:mb-4 md:order-first"}`}>
              <h4 className="text-xs md:text-sm font-medium text-muted-foreground">{event.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

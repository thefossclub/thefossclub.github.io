"use client"

import { useRef, useEffect, useState } from "react"

interface TimelineEvent {
  year: string
  title: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export default function Timeline({ events }: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={trackRef} className="relative w-full max-w-5xl mx-auto px-4">
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="relative pt-24 pb-4">
          {/* The line */}
          <div className="relative h-[2px]">
            <div
              className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-green-500 to-green-400 origin-left transition-transform duration-1000 ease-out"
              style={{ transform: visible ? "scaleX(1)" : "scaleX(0)" }}
            />
            {/* Glow behind the line */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-400/80 blur-sm origin-left transition-transform duration-1000 ease-out"
              style={{ transform: visible ? "scaleX(1)" : "scaleX(0)" }}
            />
          </div>

          {/* Dots + labels positioned absolutely over the line */}
          {events.map((event, i) => {
            const isLast = i === events.length - 1
            const pct = events.length === 1 ? 50 : (i / (events.length - 1)) * 100

            return (
              <div
                key={i}
                className="absolute flex flex-col items-center transition-all duration-700"
                style={{
                  left: `${pct}%`,
                  bottom: 12,
                  transform: `translateX(-50%)`,
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${400 + i * 120}ms`,
                }}
              >
                {/* Label */}
                <div className="text-center mb-3 whitespace-nowrap">
                  <span className="text-[11px] font-semibold tracking-widest text-green-400 uppercase">
                    {event.year}
                  </span>
                  <span className="block text-[13px] text-muted-foreground leading-tight mt-0.5 max-w-[110px] whitespace-normal">
                    {event.title}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`block rounded-full ${isLast ? "w-4 h-4" : "w-2.5 h-2.5"} bg-green-500`}
                  />
                  {isLast && (
                    <>
                      <span className="absolute w-7 h-7 rounded-full bg-green-400/30 animate-ping" />
                      <span className="absolute w-6 h-6 rounded-full bg-green-500/15" />
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden">
        <div className="relative ml-3">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] origin-top transition-transform duration-1000 ease-out"
            style={{ transform: visible ? "scaleY(1)" : "scaleY(0)" }}
          >
            <div className="w-full h-full bg-gradient-to-b from-green-500/20 via-green-500 to-green-400" />
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/0 via-green-500/50 to-green-400/80 blur-sm" />
          </div>

          {events.map((event, i) => {
            const isLast = i === events.length - 1

            return (
              <div
                key={i}
                className="relative flex items-start pl-8 pb-8 last:pb-0 transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-8px)",
                  transitionDelay: `${400 + i * 120}ms`,
                }}
              >
                {/* Dot */}
                <div className="absolute left-0 top-1 -translate-x-1/2 flex items-center justify-center">
                  <span
                    className={`block rounded-full ${isLast ? "w-3.5 h-3.5" : "w-2 h-2"} bg-green-500`}
                  />
                  {isLast && (
                    <>
                      <span className="absolute w-6 h-6 rounded-full bg-green-400/30 animate-ping" />
                      <span className="absolute w-5 h-5 rounded-full bg-green-500/15" />
                    </>
                  )}
                </div>

                {/* Label */}
                <div>
                  <span className="text-[11px] font-semibold tracking-widest text-green-400 uppercase">
                    {event.year}
                  </span>
                  <span className="block text-sm text-muted-foreground leading-snug mt-0.5">
                    {event.title}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

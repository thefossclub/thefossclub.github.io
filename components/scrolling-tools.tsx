"use client"

import { useRef, useEffect } from "react"
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
  const motionDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const motionDiv = motionDivRef.current
    if (!container || !motionDiv) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const containerTop = rect.top
        const containerHeight = rect.height
        
        // Calculate progress based on container position in viewport
        const start = windowHeight
        const end = -containerHeight
        const progress = Math.max(0, Math.min(1, (start - containerTop) / (start - end)))
        
        // Apply transform directly - smooth horizontal scroll effect
        const translateX = progress * -50
        motionDiv.style.transform = `translate3d(${translateX}%, 0, 0)`
        
        ticking = false
      })
    }

    // Use Lenis scroll event if available, fallback to native
    // @ts-expect-error - lenis is added to window
    const lenis = window.lenis
    
    if (lenis) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    // Initial position
    handleScroll()

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleButtonScroll = (direction: "left" | "right") => {
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
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div
        ref={scrollContentRef}
        className="overflow-x-auto scrollbar-hide hide-scrollbar"
      >
        <div
          ref={motionDivRef}
          className="flex space-x-4 py-4 w-max will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {tools.concat(tools).map((tool, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64"
            >
              <ToolCard name={tool.name} description={tool.description} icon={tool.icon} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleButtonScroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed ml-2"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => handleButtonScroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed mr-2"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

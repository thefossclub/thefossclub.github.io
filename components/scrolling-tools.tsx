"use client"

import { useRef, useEffect, useCallback } from "react"
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

// Smoother easing function (easeOutExpo - more buttery smooth)
const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

export default function ScrollingTools({ tools }: ScrollingToolsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  const motionDivRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const motionDiv = motionDivRef.current
    if (!container || !motionDiv) return

    let ticking = false
    let isVisible = false

    const handleScroll = () => {
      // Skip if not visible or already processing
      if (!isVisible || ticking) return
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

    // Only animate when visible in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) handleScroll()
      },
      { threshold: 0, rootMargin: '100px' }
    )
    observer.observe(container)

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
      observer.disconnect()
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
      // Cleanup button scroll animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Smooth scroll animation with buttery easing
  const smoothScrollTo = useCallback((element: HTMLElement, targetScrollLeft: number, duration: number = 1200) => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const startScrollLeft = element.scrollLeft
    const distance = targetScrollLeft - startScrollLeft
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)

      element.scrollLeft = startScrollLeft + distance * easedProgress

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        animationRef.current = null
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  const handleButtonScroll = useCallback((direction: "left" | "right") => {
    if (scrollContentRef.current) {
      const element = scrollContentRef.current
      const scrollAmount = element.offsetWidth / 2
      const targetScrollLeft = direction === "left" 
        ? element.scrollLeft - scrollAmount 
        : element.scrollLeft + scrollAmount
      
      // Clamp to valid scroll range
      const maxScroll = element.scrollWidth - element.clientWidth
      const clampedTarget = Math.max(0, Math.min(maxScroll, targetScrollLeft))
      
      smoothScrollTo(element, clampedTarget, 1200)
    }
  }, [smoothScrollTo])

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

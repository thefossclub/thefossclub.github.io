"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const dots = useRef<Array<{ x: number; y: number; size: number; colorIndex: number }>>([])

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gridSize = 40

    const generateDots = (width: number, height: number) => {
      dots.current = []
      const dotColorIndex = 0
      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          if (Math.random() > 0.97) {
            const dotSize = Math.random() * 2 + 1
            dots.current.push({ x, y, size: dotSize, colorIndex: dotColorIndex })
          }
        }
      }
    }

    const drawDots = (width: number, height: number) => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      const isDark = resolvedTheme === "dark"
      // Simple solid colors instead of gradients for better performance
      const dotColor = isDark ? "rgba(34, 197, 94, 0.6)" : "rgba(34, 197, 94, 0.12)"
      
      ctx.fillStyle = dotColor
      for (const dot of dots.current) {
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = Math.round(rect.width)
      canvas.height = Math.round(rect.height)
      generateDots(canvas.width, canvas.height)
      drawDots(canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [resolvedTheme, mounted])

  // CSS-only grid background
  const gridLineColor = resolvedTheme === "dark"
    ? "rgba(255,255,255,0.05)"
    : "rgba(0,0,0,0.04)"

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-20] pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(to right, ${gridLineColor} 0 1px, transparent 1px 40px),
          repeating-linear-gradient(to bottom, ${gridLineColor} 0 1px, transparent 1px 40px)
        `,
        backgroundColor: resolvedTheme === "dark" ? "#000" : "#fafafa",
        backgroundSize: "40px 40px, 40px 40px",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  )
}

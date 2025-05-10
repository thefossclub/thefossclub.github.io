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
          if (Math.random() > 0.95) {
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
      const dotColors = [
        isDark ? "rgba(34, 197, 94, 0.7)" : "rgba(34, 197, 94, 0.15)",
        isDark ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.15)",
        isDark ? "rgba(20, 184, 166, 0.7)" : "rgba(20, 184, 166, 0.15)",
        isDark ? "rgba(6, 182, 212, 0.5)" : "rgba(6, 182, 212, 0.1)",
        isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.1)",
      ]
      for (const dot of dots.current) {
        const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 3)
        gradient.addColorStop(0, dotColors[dot.colorIndex])
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
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

  // CSS grid background
  const gridLineColor = resolvedTheme === "dark"
    ? "rgba(255,255,255,0.05)"
    : "rgba(0,0,0,0.05)"
  const gridBackground = `
    repeating-linear-gradient(to right, ${gridLineColor} 0 1px, transparent 1px 40px),
    repeating-linear-gradient(to bottom, ${gridLineColor} 0 1px, transparent 1px 40px)
  `

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-20] pointer-events-none"
      style={{
        backgroundImage: gridBackground,
        backgroundColor: resolvedTheme === "dark" ? "black" : "white",
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


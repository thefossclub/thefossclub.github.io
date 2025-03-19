"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller to cover the whole page
      drawGrid()
    }

    const drawGrid = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid settings
      const gridSize = 40
      const lineWidth = 1

      // Determine colors based on theme
      const isDark = resolvedTheme === "dark"
      const lineColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      const dotColors = [
        isDark ? "rgba(14, 165, 233, 0.5)" : "rgba(14, 165, 233, 0.4)", // blue
        isDark ? "rgba(16, 185, 129, 0.5)" : "rgba(16, 185, 129, 0.4)", // green
        isDark ? "rgba(6, 182, 212, 0.5)" : "rgba(6, 182, 212, 0.4)", // cyan
        isDark ? "rgba(20, 184, 166, 0.5)" : "rgba(20, 184, 166, 0.4)", // teal
      ]

      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Add dots at grid intersections with gradient effect
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          if (Math.random() > 0.93) {
            // Only draw some dots
            const dotSize = Math.random() * 3 + 1.5
            const colorIndex = Math.floor(Math.random() * dotColors.length)

            // Create gradient for dot
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, dotSize * 2)
            gradient.addColorStop(0, dotColors[colorIndex])
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.beginPath()
            ctx.arc(x, y, dotSize * 2, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()
          }
        }
      }
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Redraw grid when theme changes
    drawGrid()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme, resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{
        pointerEvents: "none",
        background: resolvedTheme === "dark" ? "black" : "white",
      }}
    />
  )
}


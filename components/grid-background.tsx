"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

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
      const lineColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"

      // Beautiful glowing dots in different colors
      const dotColors = [
        isDark ? "rgba(34, 197, 94, 0.7)" : "rgba(34, 197, 94, 0.15)", // green-500 - much lighter in light mode
        isDark ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.15)", // emerald-500 - much lighter in light mode
        isDark ? "rgba(20, 184, 166, 0.7)" : "rgba(20, 184, 166, 0.15)", // teal-500 - much lighter in light mode
        isDark ? "rgba(6, 182, 212, 0.5)" : "rgba(6, 182, 212, 0.1)", // cyan-500 - much lighter in light mode
        isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.1)", // blue-500 - much lighter in light mode
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

      // Add beautiful glowing dots at grid intersections
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          if (Math.random() > 0.85) {
            // Only draw some dots (15%)
            // Randomize dot size for more organic feel
            const dotSize = Math.random() * 2 + 1
            // Use green colors most of the time
            const colorIndex =
              Math.floor(Math.random() * 3); // Always green variants

            // Create beautiful gradient for dot
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, dotSize * 3)
            gradient.addColorStop(0, dotColors[colorIndex])
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

            ctx.beginPath()
            ctx.arc(x, y, dotSize * 3, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()

            // Add extra glow effect to some dots
            if (Math.random() > 0.7) {
              const glowSize = dotSize * 6
              const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
              glowGradient.addColorStop(0, isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(34, 197, 94, 0.08)") // Much lighter glow in light mode
              glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

              ctx.beginPath()
              ctx.arc(x, y, glowSize, 0, Math.PI * 2)
              ctx.fillStyle = glowGradient
              ctx.fill()
            }
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
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{
        pointerEvents: "none",
        backgroundColor: resolvedTheme === "dark" ? "black" : "white",
      }}
    />
  )
}


"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

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
      const lineWidth = 0.5
      // Darker grid lines for both modes
      ctx.strokeStyle = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"
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

      // Add some random dots at grid intersections
      // Darker dots for both modes
      ctx.fillStyle = theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.35)"
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          if (Math.random() > 0.97) {
            // Only draw some dots
            const dotSize = Math.random() * 2 + 1
            ctx.beginPath()
            ctx.arc(x, y, dotSize, 0, Math.PI * 2)
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
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{
        pointerEvents: "none",
        background: theme === "dark" ? "black" : "white",
      }}
    />
  )
}


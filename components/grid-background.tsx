"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const dots = useRef<Array<{ x: number; y: number; size: number; colorIndex: number }>>([]);

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return;

    const gridSize = 40

    const generateDots = () => {
      dots.current = [];
      const width = canvas.width;
      const height = canvas.height;
      const isDark = resolvedTheme === "dark";
      const dotColorIndex = 0;

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          if (Math.random() > 0.95) {
            const dotSize = Math.random() * 2 + 1;
            dots.current.push({ x, y, size: dotSize, colorIndex: dotColorIndex });
          }
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3;
      generateDots();
      drawGrid();
    }

    const drawGrid = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const lineWidth = 1
      const isDark = resolvedTheme === "dark"
      const lineColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
      const dotColors = [
        isDark ? "rgba(34, 197, 94, 0.7)" : "rgba(34, 197, 94, 0.15)",
        isDark ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.15)",
        isDark ? "rgba(20, 184, 166, 0.7)" : "rgba(20, 184, 166, 0.15)",
        isDark ? "rgba(6, 182, 212, 0.5)" : "rgba(6, 182, 212, 0.1)",
        isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.1)",
      ]

      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth

      for (let x = 0; x <= canvas.width; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y <= canvas.height; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

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

    let animationFrameId: number | null = null;
    const animate = () => {
      drawGrid();
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    }
  }, [resolvedTheme, mounted])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-20]"
      style={{
        pointerEvents: "none",
        backgroundColor: mounted ? (resolvedTheme === "dark" ? "black" : "white") : undefined,
      }}
    />
  )
}


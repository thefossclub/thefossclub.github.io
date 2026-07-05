"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  targetOpacity: number
  twinkleSpeed: number
}

const STAR_COUNT = 300
const REPULSION_RADIUS = 50
const REPULSION_FORCE = 1.8
const FRICTION = 0.76
const BASE_SPEED = 0.09
const STAR_COLOR = "34,197,94"

function rand(a: number, b: number) {
  return a + Math.random() * (b - a)
}

function makeStar(w: number, h: number): Star {
  const angle = Math.random() * Math.PI * 2
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * BASE_SPEED,
    vy: Math.sin(angle) * BASE_SPEED,
    radius: rand(0.89, 2.6),
    opacity: rand(0.08, 0.45),
    targetOpacity: rand(0.10, 0.65),
    twinkleSpeed: rand(0.08, 0.22),
  }
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      sizeRef.current = { w: canvas.width, h: canvas.height }
      starsRef.current = Array.from({ length: STAR_COUNT }, () =>
        makeStar(canvas.width, canvas.height)
      )
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const draw = () => {
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, w, h)
      const { x: mx, y: my } = mouseRef.current

      for (const s of starsRef.current) {
        const dx = s.x - mx
        const dy = s.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_FORCE
          s.vx += (dx / dist) * force
          s.vy += (dy / dist) * force
        }

        s.vx *= FRICTION
        s.vy *= FRICTION

        const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy)
        if (speed < BASE_SPEED) {
          s.vx += (s.vx / (speed || 1)) * 0.01
          s.vy += (s.vy / (speed || 1)) * 0.01
        }

        s.x += s.vx
        s.y += s.vy

        if (s.x < -2) s.x = w + 2
        if (s.x > w + 2) s.x = -2
        if (s.y < -2) s.y = h + 2
        if (s.y > h + 2) s.y = -2

        s.opacity += (s.targetOpacity - s.opacity) * s.twinkleSpeed
        if (Math.abs(s.opacity - s.targetOpacity) < 0.01) {
          s.targetOpacity = rand(0.04, 0.65)
          s.twinkleSpeed = rand(0.008, 0.022)
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${STAR_COLOR},${s.opacity.toFixed(3)})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    init()
    window.addEventListener("resize", init)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseleave", onMouseLeave)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", init)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function HeroSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const radius = 150
  const numPoints = 300 // Reduced for better performance
  const points = useRef<Array<{ x: number; y: number; z: number; size: number; speed: number; angle: number }>>([])
  const animationFrameId = useRef<number | null>(null)
  const isIntersecting = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting.current = entry.isIntersecting
      if (entry.isIntersecting) {
        if (animationFrameId.current === null) {
          animate()
        }
      } else {
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current)
          animationFrameId.current = null
        }
      }
    }, { threshold: 0 })

    observer.observe(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      observer.unobserve(canvas)
      return
    }

    let width = 500
    let height = 500

    const resizeCanvas = () => {
      width = 500
      height = 500
      canvas.width = width
      canvas.height = height
      if (isIntersecting.current && animationFrameId.current === null) {
        animate()
      } else if (!isIntersecting.current) {
        // ctx.clearRect(0, 0, width, height)
      }
    }

    const animate = () => {
      if (!isIntersecting.current) {
        animationFrameId.current = null
        return
      }
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const point of points.current) {
        point.angle += point.speed

        const cosA = Math.cos(point.angle)
        const sinA = Math.sin(point.angle)
        const rotatedX = point.x * cosA - point.z * sinA
        const rotatedZ = point.x * sinA + point.z * cosA
        const rotatedY = point.y

        const scale = 400 / (400 + rotatedZ)
        const projectedX = width / 2 + rotatedX * scale
        const projectedY = height / 2 + rotatedY * scale

        const opacity = (rotatedZ + radius) / (radius * 2)

        const greenValue = (Math.abs(rotatedX) / radius) * 255
        const blueValue = 0

        ctx.beginPath()
        ctx.arc(projectedX, projectedY, point.size * scale, 0, Math.PI * 2)

        if (theme === "dark") {
          // Make particles near the center brighter in dark mode
          // opacity is higher near the center (rotatedZ is higher)
          // We'll interpolate from green to white as opacity increases
          const centerBlend = opacity // 0 (far) to 1 (center)
          const r = Math.round(50 + (205 * centerBlend)) // 50 to 255
          const g = Math.round(200 + (55 * centerBlend)) // 200 to 255
          const b = Math.round(0 + (255 * centerBlend)) // 0 to 255
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 1})`
        } else {
          ctx.fillStyle = `rgba(${Math.min(30, greenValue)}, ${Math.min(180, greenValue)}, ${blueValue}, ${opacity * 1})`
        }

        ctx.fill()
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    if (points.current.length === 0) {
      for (let i = 0; i < numPoints; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)

        points.current.push({
          x,
          y,
          z,
          size: Math.random() * 2 + 1,
          // Balanced speed: not too slow, not too fast (frame-based)
          speed: Math.random() * 0.016 + 0.010,
          angle: Math.random() * Math.PI * 2,
        })
      }
    }

    resizeCanvas()

    if (isIntersecting.current) {
      animate()
    }

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
      if (canvas) observer.unobserve(canvas)
    }
  }, [theme])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <canvas ref={canvasRef} width={500} height={500} className="opacity-90" />
    </motion.div>
  )
}


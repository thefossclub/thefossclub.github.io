"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function HeroSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 500
    let height = 500

    const resizeCanvas = () => {
      width = 500
      height = 500
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()

    // Sphere parameters
    const centerX = width / 2
    const centerY = height / 2
    const radius = 150
    const numPoints = 1000
    const points: { x: number; y: number; z: number; size: number; speed: number; angle: number }[] = []

    // Generate random points on the sphere
    for (let i = 0; i < numPoints; i++) {
      // Random spherical coordinates
      const theta = Math.random() * Math.PI * 2 // Azimuthal angle
      const phi = Math.acos(2 * Math.random() - 1) // Polar angle

      // Convert to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      points.push({
        x,
        y,
        z,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.01 + 0.005,
        angle: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw sphere
      for (const point of points) {
        // Update angle for rotation
        point.angle += point.speed

        // Rotate around Y-axis
        const cosA = Math.cos(point.angle)
        const sinA = Math.sin(point.angle)
        const rotatedX = point.x * cosA - point.z * sinA
        const rotatedZ = point.x * sinA + point.z * cosA

        // Project 3D point to 2D with perspective
        const scale = 400 / (400 + rotatedZ)
        const projectedX = centerX + rotatedX * scale
        const projectedY = centerY + point.y * scale

        // Calculate opacity based on z-position
        const opacity = (rotatedZ + radius) / (radius * 2)

        // Draw point
        ctx.beginPath()
        ctx.arc(projectedX, projectedY, point.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = theme === "dark" ? `rgba(255, 255, 255, ${opacity * 0.8})` : `rgba(0, 0, 0, ${opacity * 0.8})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup if needed
    }
  }, [theme])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <canvas ref={canvasRef} width={500} height={500} className="opacity-70" />
    </motion.div>
  )
}


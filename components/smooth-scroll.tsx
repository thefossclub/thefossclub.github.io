"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const LenisRoot = dynamic(() => import("./lenis-root"), { ssr: false })

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const prefersReducedMotion = typeof window !== "undefined"
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {ready && !prefersReducedMotion && <LenisRoot />}
      {children}
    </>
  )
}

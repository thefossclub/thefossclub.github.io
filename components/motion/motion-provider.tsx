"use client"

import type React from "react"
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

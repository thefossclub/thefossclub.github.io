"use client"

import { m } from "framer-motion"
import { useLenis } from "lenis/react"

interface ScrollIndicatorProps {
  targetSection?: string
  color?: string
}

export default function ScrollIndicator({
  targetSection = "about",
  color = "#FFFFFF",
}: ScrollIndicatorProps) {
  const lenis = useLenis()

  const handleClick = () => {
    const el = document.getElementById(targetSection)
    if (!el) return
    if (lenis) {
      lenis.scrollTo(el)
    } else {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Scroll to ${targetSection}`}
      className="flex items-center justify-center rounded-full p-1 opacity-50 transition-ui hover:opacity-80"
    >
      <span
        className="flex h-[42px] w-[26px] justify-center rounded-[20px] border-2 pt-2"
        style={{ borderColor: color }}
      >
        <m.span
          className="block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: 2, delay: 1.2 }}
        />
      </span>
    </button>
  )
}

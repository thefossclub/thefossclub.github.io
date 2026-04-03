"use client"

import { m, useAnimationControls } from "framer-motion"
import { useEffect } from "react"

interface ScrollIndicatorProps {
  targetSection?: string
  preset?: "default" | "chevrons" | "minimalist"
  color?: string
}

export default function ScrollIndicator({
  targetSection = "about",
  preset = "default",
  color = "#FFFFFF",
}: ScrollIndicatorProps) {
  const dotControls = useAnimationControls()

  useEffect(() => {
    if (preset === "default") {
      dotControls.start({
        y: [-14, 14],
        transition: {
          duration: 1.8,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut",
        },
      })
    }
  }, [dotControls, preset])

  const handleClick = () => {
    const el = document.getElementById(targetSection)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  if (preset === "chevrons") {
    return (
      <div onClick={handleClick} className="cursor-pointer flex flex-col items-center justify-center">
        <m.div
          animate={{
            filter: [
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
              "drop-shadow(0 0 2px rgba(255,255,255,0.35))",
              "drop-shadow(0 0 2px rgba(255,255,255,0.2))",
              "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
              "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
              "drop-shadow(0 0 0px rgba(255,255,255,0))",
            ],
            transition: {
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop" as const,
              ease: "easeInOut",
              times: [0, 0.167, 0.5, 0.583, 0.667, 0.833, 1],
            },
          }}
          className="flex flex-col items-center gap-[5px]"
        >
          {[0, 1].map((i) => (
            <m.svg
              key={i}
              animate={{
                y: [0, 0, 14, 14, 14, 14, 0],
                opacity: [0, 1, 1, 0.6, 0.85, 0, 0],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: "loop" as const,
                  ease: "easeInOut",
                  times: [0, 0.167, 0.5, 0.583, 0.667, 0.833, 1],
                },
              }}
              width={14}
              height={7}
              viewBox="0 0 18 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1.5L9 7.5L16.5 1.5"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </m.svg>
          ))}
        </m.div>
      </div>
    )
  }

  if (preset === "minimalist") {
    return (
      <div onClick={handleClick} className="cursor-pointer flex flex-col items-center justify-center">
        <m.div
          animate={{
            y: [0, 0, 6, 6, 6],
            opacity: [1, 1, 1, 0, 0],
            transition: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop" as const,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 0.8, 1],
            },
          }}
          className="text-[10px] font-bold tracking-[2px] mb-2"
          style={{ color }}
        >
          SCROLL
        </m.div>
        <m.div
          animate={{
            opacity: [1, 1, 1, 1, 0],
            transition: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop" as const,
              ease: "easeOut",
              times: [0, 0.6, 0.8, 0.8, 1],
            },
          }}
          className="w-px h-5"
          style={{ backgroundColor: color }}
        />
      </div>
    )
  }

  return (
    <div onClick={handleClick} className="cursor-pointer flex items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 26,
          height: 42,
          border: `2px solid ${color}`,
          borderRadius: 20,
          opacity: 0.5,
        }}
      >
        <m.div
          animate={dotControls}
          className="rounded-full"
          style={{ width: 6, height: 6, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

"use client"

import { useMemo } from "react"
import { useReducedMotion } from "framer-motion"
import ToolCard from "./tool-card"

const CARD_WIDTH = 256 // w-64
const GAP = 16 // space-x-4
const STEP = CARD_WIDTH + GAP

interface Tool {
  name: string
  description: string
  icon: string
}

interface ScrollingToolsProps {
  tools: Tool[]
}

export default function ScrollingTools({ tools }: ScrollingToolsProps) {
  const reducedMotion = useReducedMotion()

  const extendedTools = useMemo(() => tools.concat(tools), [tools])

  // Single GPU-friendly marquee animation (no JS intervals).
  // Duration is based on total content width so the perceived speed stays high.
  const marqueeDurationSeconds = useMemo(() => {
    const sequencePx = tools.length * STEP
    const speedPxPerSec = 200
    const raw = sequencePx / speedPxPerSec
    return Math.max(2.5, Math.min(20, raw))
  }, [tools.length])

  return (
    <div className="relative overflow-hidden py-10 group">
      <style jsx>{`
        @keyframes oss-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .oss-marqueeTrack {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: oss-marquee var(--marquee-duration) linear infinite;
        }

        .group:hover .oss-marqueeTrack {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .oss-marqueeTrack {
            animation: none;
          }
        }
      `}</style>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent"
          aria-hidden="true"
        />
        <div
          className="oss-marqueeTrack flex space-x-4 py-4 w-max"
          style={
            reducedMotion
              ? undefined
              : ({
                  ["--marquee-duration" as any]: `${marqueeDurationSeconds}s`,
                } as React.CSSProperties)
          }
          aria-label="Open source tools scrolling carousel"
        >
          {extendedTools.map((tool, index) => (
            <div key={`${tool.name}-${index}`} className="flex-shrink-0 w-64">
              <ToolCard name={tool.name} description={tool.description} icon={tool.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

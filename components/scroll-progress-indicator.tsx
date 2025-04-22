"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      const newPathLength = pathRef.current.getTotalLength();
      setPathLength(newPathLength);
    }
  }, [pathRef]);

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 0.999], // Using 0.999 instead of 1 to ensure complete fill
    [pathLength, 0]
  );

  // New transform for SVG container opacity
  const svgOpacity = useTransform(
    scrollYProgress,
    [0, 0.01], // Fade in quickly within the first 1% of scroll
    [0, 1]      // Opacity from 0 to 1
  );

  // Create a simple curve path
  const pathData = "M -500 50 C 0 25, 1000 75, 2500 50";

  return (
    <motion.svg
      className="fixed top-0 left-0 w-full h-screen z-[-10] hidden md:block pointer-events-none overflow-visible"
      // Expanded viewBox for horizontal movement
      viewBox="-500 0 3000 100"
      preserveAspectRatio="none"
      style={{ opacity: svgOpacity }}
    >
      {/* Background path */}
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="rgba(200, 200, 200, 0.01)"
        strokeWidth={0.5}
        className="dark:stroke-[rgba(110,110,110,0.05)]"
      />
      {/* Animated path */}
      {pathLength > 0 && (
        <motion.path
          d={pathData}
          fill="none"
          strokeWidth="1.5"
          stroke="url(#progressGradient)"
          strokeLinecap="round"
          filter="url(#blurFilter)"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: strokeDashoffset
          }}
        />
      )}
      {/* Gradient & Filter Definitions */}
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22b34f" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#4ade80" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.5" />
        </linearGradient>
        <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          <feColorMatrix type="matrix" values="1 0 0 0 0
                                               0 1 0 0 0.1
                                               0 0 1 0 0
                                               0 0 0 0.5 0"/>
        </filter>
      </defs>
    </motion.svg>
  );
} 
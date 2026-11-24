import type React from "react"

interface OrgCardProps {
  children: React.ReactNode
  className?: string
}

/**
 * Standard content container card across all FOSS Club organisation pages.
 * Keep padding, radius, and border tokens uniform here so all subpages
 * (/coc, /whitepaper, /branding, /resources) share a cohesive, accessible layout.
 */
export default function OrgCard({ children, className = "" }: OrgCardProps) {
  return (
    <div
      className={`w-full p-5 sm:p-7 md:p-8 rounded-3xl border border-border bg-card/85 backdrop-blur-sm shadow-md transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  )
}

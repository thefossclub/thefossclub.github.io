import type React from "react"

interface OrgListItemProps {
  children: React.ReactNode
  className?: string
}

/**
 * Unified list-card component for organisation documents.
 * Use this for bulleted principles, mission points, and guidelines.
 * It enforces the standardized light green primary tint (bg-primary/5 dark:bg-primary/10)
 * and accessible hover states across all community documents.
 */
export default function OrgListItem({
  children,
  className = "",
}: OrgListItemProps) {
  return (
    <li
      className={`p-3.5 sm:p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 shadow-sm text-sm sm:text-base leading-relaxed text-foreground transition-all duration-200 hover:border-primary/40 ${className}`}
    >
      {children}
    </li>
  )
}

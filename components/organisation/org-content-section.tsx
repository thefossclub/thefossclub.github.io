import type React from "react"

interface OrgContentSectionProps {
  /** Primary section title displayed with the community green gradient heading */
  title: string
  /** Supporting context or lead description displayed beneath the section title */
  description?: string
  /** Anchor link ID used for table-of-contents navigation across long documents */
  id?: string
  /** Inner content components (e.g. OrgCard, lists, or resource grids) */
  children: React.ReactNode
  /** Optional CSS class overrides for responsive margins and padding */
  className?: string
}

/**
 * Standard content section wrapper providing consistent 5xl max-width and vertical rhythm.
 * Committee note: Wrap all major document chapters in this component to maintain
 * uniform padding, anchor link targets, and container alignment across devices.
 */
export default function OrgContentSection({
  title,
  description,
  id,
  children,
  className = "",
}: OrgContentSectionProps) {
  return (
    <section
      id={id}
      className={`py-5 sm:py-7 relative z-10 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="mb-5 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gradient-green tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

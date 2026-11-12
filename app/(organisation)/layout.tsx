import type React from "react"
import OrgTopBar from "@/components/organisation/org-topbar"
import GridBackground from "@/components/grid-background"
import SiteFooter from "@/components/organisation/org-footer"

/**
 * Global layout wrapper for all FOSS Club organisation documents.
 * Kept as a pure Server Component to minimize client-side bundle overhead.
 * Any new subpages created inside the (organisation) route group automatically inherit
 * the ambient grid background and the synchronized topbar.
 */
export default function OrganisationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GridBackground />
      <OrgTopBar />
      {children}
      <SiteFooter />
    </>
  )
}

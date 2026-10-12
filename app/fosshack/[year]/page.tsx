import { notFound } from "next/navigation"
import ArchiveRecap from "@/components/fosshack/archive-recap"
import Fosshack2026RecapLazy from "@/components/fosshack/fosshack-2026-recap-lazy"
import { fosshackEditions, getFosshackEdition } from "@/lib/fosshack-data"

export function generateStaticParams() {
  return fosshackEditions.map(({ year }) => ({ year: String(year) }))
}

export default async function FosshackYearPage({
  params,
}: {
  params: Promise<{ year: string }>
}) {
  const { year } = await params
  const edition = getFosshackEdition(Number(year))

  if (!edition) notFound()
  if (edition.year === 2026) return <Fosshack2026RecapLazy />

  return <ArchiveRecap edition={edition} />
}

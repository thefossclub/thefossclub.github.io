import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
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

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 pb-20 pt-32 text-foreground sm:px-8">
      <Link href="/fosshack" className="text-sm text-foreground/60 hover:text-foreground">
        FOSS Hack Archive
      </Link>
      <section className="mt-8 grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-light-green">
            {edition.edition}
          </p>
          <h1 className="mt-4 text-5xl font-bold sm:text-7xl">FOSS Hack {edition.year}</h1>
          <p className="mt-5 text-lg text-foreground/65">{edition.date} · {edition.mode}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">{edition.description}</p>
          {edition.prizePool && <p className="mt-6 font-semibold">Prize pool: {edition.prizePool}</p>}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10">
          <Image src={edition.image} alt={`FOSS Hack ${edition.year}`} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>
      {edition.stats && (
        <section className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {edition.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-foreground/10 bg-background/60 p-6">
              <p className="text-3xl font-bold text-accent-light-green">{stat.value}</p>
              <p className="mt-2 text-sm text-foreground/60">{stat.label}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

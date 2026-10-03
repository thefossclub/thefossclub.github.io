import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fosshackEditions, getFosshackEdition } from "@/lib/fosshack-data"
import FosshackArchiveNavbar from "@/components/fosshack/archive-navbar"
import Fosshack2026Recap from "@/app/fosshack2026/page"

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
  if (edition.year === 2026) return <Fosshack2026Recap />

  return (
    <>
      <FosshackArchiveNavbar />
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
        {edition.timeline && (
          <section className="mt-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-light-green">Event timeline</p>
            <h2 className="text-3xl font-bold sm:text-4xl">The key dates</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {edition.timeline.map((item) => (
                <div key={item.title} className="rounded-2xl border border-foreground/10 bg-background/60 p-6">
                  <p className="text-sm text-foreground/50">{item.date}</p>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                </div>
              ))}
            </div>
          </section>
        )}
        {edition.localhosts && (
          <section className="mt-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-light-green">Localhost</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Hack together, in person</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {edition.localhosts.map((host) => (
                <div key={host.name} className="rounded-2xl border border-foreground/10 bg-background/60 p-6">
                  <h3 className="text-xl font-semibold">{host.name}</h3>
                  <p className="mt-2 text-foreground/60">{host.venue}</p>
                  {host.url && <a href={host.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-accent-light-green hover:underline">Host details</a>}
                </div>
              ))}
            </div>
          </section>
        )}
        {edition.links && (
          <section className="mt-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-light-green">Continue exploring</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Event links</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {edition.links.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/15 bg-background/60 px-5 py-3 text-sm font-medium transition hover:border-accent-light-green/60 hover:text-accent-light-green">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>
        )}
        <footer className="mt-20 border-t border-foreground/10 pt-6 text-sm text-foreground/45">
          <Link href="/fosshack" className="hover:text-foreground">FOSS Hack Archive</Link>
          <span className="px-2">/</span>
          <Link href="/" className="hover:text-foreground">The FOSS Club</Link>
        </footer>
      </main>
    </>
  )
}

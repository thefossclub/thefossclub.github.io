import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  MapPin,
  Trophy,
  Users,
} from "lucide-react"
import FosshackArchiveNavbar from "@/components/fosshack/archive-navbar"
import EditionGallery from "@/components/fosshack/edition-gallery"
import Fosshack2026Recap from "@/app/fosshack2026/page"
import { fosshackEditions, getFosshackEdition } from "@/lib/fosshack-data"

export function generateStaticParams() {
  return fosshackEditions.map(({ year }) => ({ year: String(year) }))
}

const statIcons = [Users, Trophy, MapPin, CalendarDays]

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
      <main className="relative isolate overflow-hidden px-5 pb-20 pt-28 text-foreground sm:px-8 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(ellipse_at_12%_20%,rgba(var(--accent-light-green),0.14),transparent_50%)]" />
        <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-6xl flex-col sm:min-h-[calc(100svh-8rem)]">
          <section id="overview" className="grid flex-1 items-center gap-2 py-3 scroll-mt-28 sm:gap-10 sm:py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-light-green/20 bg-accent-light-green/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-light-green">
                <span className="h-2 w-2 rounded-full bg-accent-light-green shadow-[0_0_12px_rgba(var(--accent-light-green),0.8)]" />
                {edition.edition}
              </p>
              <h1 className="text-3xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                FOSS Hack
                <span className="mt-2 block text-accent-light-green">
                  {edition.year}
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-snug text-foreground/65 sm:mt-6 sm:text-xl sm:leading-relaxed">
                {edition.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-3 py-2 text-xs text-foreground/75 backdrop-blur sm:px-4 sm:py-2.5 sm:text-sm">
                  <CalendarDays className="h-4 w-4 text-accent-light-green" /> {edition.date}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/55 px-3 py-2 text-xs text-foreground/75 backdrop-blur sm:px-4 sm:py-2.5 sm:text-sm">
                  <Users className="h-4 w-4 text-accent-light-green" /> {edition.mode}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                {edition.prizePool && (
                  <div className="flex items-center gap-3 rounded-2xl border border-accent-light-green/20 bg-accent-light-green/8 px-4 py-2.5 sm:px-5 sm:py-3.5">
                    <Trophy className="h-5 w-5 text-accent-light-green" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/55">Prize pool</p>
                      <p className="font-bold text-foreground">{edition.prizePool}</p>
                    </div>
                  </div>
                )}
                {edition.gallery && (
                  <Link href="#gallery" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-xs font-semibold text-background transition hover:bg-accent-light-green sm:px-5 sm:py-3.5 sm:text-sm">
                    Explore photos <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10">
                <Image
                  src={edition.image}
                  alt={`FOSS Hack ${edition.year}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {edition.stats && (
            <section id="stats" className="mt-10 scroll-mt-28 sm:mt-14">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light-green">The numbers</p>
                  <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Event at a glance</h2>
                </div>
                <span className="hidden text-sm text-foreground/55 sm:block">FOSS Hack {edition.year}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {edition.stats.map((stat, index) => {
                  const Icon = statIcons[index % statIcons.length]
                  return (
                    <article key={stat.label} className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background/55 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent-light-green/40 hover:bg-background/80 sm:p-6">
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-light-green/10 blur-2xl transition group-hover:bg-accent-light-green/20" />
                      <Icon className="relative h-5 w-5 text-accent-light-green transition group-hover:scale-110" />
                      <p className="relative mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</p>
                      <p className="relative mt-2 text-sm text-foreground/55">{stat.label}</p>
                    </article>
                  )
                })}
              </div>
            </section>
          )}

          {edition.timeline && (
            <section id="timeline" className="mt-20 scroll-mt-28 sm:mt-28">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light-green">From kickoff to results</p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">The timeline</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {edition.timeline.map((item, index) => (
                  <article key={item.title} className="group relative flex gap-5 overflow-hidden rounded-2xl border border-foreground/10 bg-background/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent-light-green/35 hover:bg-background/80 sm:p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-light-green/20 bg-accent-light-green/8 text-sm font-bold text-accent-light-green transition group-hover:bg-accent-light-green group-hover:text-background">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-accent-light-green">{item.date}</p>
                      <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                    </div>
                    <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-foreground/25 transition group-hover:translate-x-1 group-hover:text-accent-light-green" />
                  </article>
                ))}
              </div>
            </section>
          )}

          {edition.gallery && (
            <div className="mt-20 sm:mt-28">
              <EditionGallery
                year={edition.year}
                title={edition.gallery.title}
                description={edition.gallery.description}
                photos={edition.gallery.photos}
              />
            </div>
          )}

          {edition.localhosts && (
            <section id="localhost" className="mt-20 scroll-mt-28 sm:mt-28">
              <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light-green">In-person communities</p>
                  <h2 className="mt-2 text-3xl font-bold sm:text-4xl">The localhost</h2>
                </div>
                <MapPin className="mb-1 h-6 w-6 text-accent-light-green" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {edition.localhosts.map((host) => (
                  <article key={host.name} className="group rounded-2xl border border-foreground/10 bg-background/55 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-light-green/35 hover:bg-background/80 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-light-green">{host.name}</p>
                        <h3 className="mt-2 text-xl font-bold">{host.venue}</h3>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-light-green/10 text-accent-light-green transition group-hover:bg-accent-light-green group-hover:text-background">
                        <MapPin className="h-4 w-4" />
                      </span>
                    </div>
                    {host.url && (
                      <a href={host.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 transition hover:text-accent-light-green">
                        Host details <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {edition.links && (
            <section id="links" className="mt-20 scroll-mt-28 sm:mt-28">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light-green">Keep exploring</p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Edition links</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {edition.links.map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="group flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-background/50 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent-light-green/40 hover:bg-background/80">
                    <span className="font-medium">{link.label}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-foreground/50 transition group-hover:border-accent-light-green/40 group-hover:bg-accent-light-green group-hover:text-background">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          <footer className="mt-20 flex flex-col justify-between gap-4 border-t border-foreground/10 pt-6 text-sm text-foreground/55 sm:flex-row sm:items-center">
            <span>FOSS Hack {edition.year} - The FOSS Club archive</span>
            <Link href="/fosshack" className="inline-flex items-center gap-2 font-medium hover:text-foreground">
              Back to all editions <ArrowRight className="h-4 w-4" />
            </Link>
          </footer>
        </div>
      </main>
    </>
  )
}

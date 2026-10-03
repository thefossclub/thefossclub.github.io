import Image from "next/image"
import Link from "next/link"
import { ArrowDownRight, ArrowRight, CalendarDays } from "lucide-react"
import { fosshackEditions } from "@/lib/fosshack-data"
import FosshackArchiveNavbar from "@/components/fosshack/archive-navbar"

export default function FosshackArchivePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 text-foreground sm:px-8">
      <FosshackArchiveNavbar />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(var(--accent-light-green),0.15),transparent_65%)]" />
      <section className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/50 px-4 py-2 text-sm text-foreground/65 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent-light-green shadow-[0_0_12px_rgba(var(--accent-light-green),0.8)]" />
            The FOSS Club event archive
          </p>
          <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
            FOSS Hack<span className="text-accent-light-green">.</span>
          </h1>
          <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <p className="max-w-2xl text-xl leading-relaxed text-foreground/65 sm:text-2xl">
              Three editions. Thousands of hackers. A growing community building in the open.
            </p>
            <Link href="#editions" className="inline-flex items-center gap-2 self-start text-sm font-semibold text-accent-light-green transition-transform hover:translate-x-1 sm:self-auto">
              Explore editions <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div id="editions" className="mt-16 grid gap-6 md:grid-cols-3">
          {fosshackEditions.map((edition, index) => (
            <Link
              key={edition.year}
              href={`/fosshack/${edition.year}`}
              className="group relative flex min-h-[470px] flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-background/60 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.8)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent-light-green/50 hover:shadow-[0_24px_70px_-35px_rgba(var(--accent-light-green),0.35)]"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={edition.image}
                  alt={`FOSS Hack ${edition.year}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 2}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">{edition.edition}</span>
                <span className="absolute bottom-2 left-5 text-6xl font-bold tracking-tight text-white drop-shadow-lg">{edition.year}</span>
              </div>
              <div className="flex flex-1 flex-col p-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-foreground/55">
                  <CalendarDays className="h-4 w-4 text-accent-light-green" />
                  {edition.date} <span className="text-foreground/30">/</span> {edition.mode}
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-foreground/70">{edition.description}</p>
                {edition.stats && (
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-foreground/10 pt-4 text-sm">
                    {edition.stats.slice(0, 2).map((stat) => (
                      <span key={stat.label}><strong className="text-foreground">{stat.value}</strong> <span className="text-foreground/50">{stat.label.toLowerCase()}</span></span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex items-center justify-between text-sm font-semibold">
                  <span className="text-accent-light-green">View {edition.year} archive</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 transition group-hover:border-accent-light-green group-hover:bg-accent-light-green group-hover:text-background">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <footer className="mx-auto mt-20 max-w-6xl border-t border-foreground/10 pt-6 text-sm text-foreground/45">
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <span>FOSS Hack archive by The FOSS Club</span>
          <Link href="/" className="hover:text-foreground">The FOSS Club home</Link>
        </div>
      </footer>
    </main>
  )
}

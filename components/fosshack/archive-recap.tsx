"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, type MotionProps } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, ArrowUp, Calendar, Camera, ExternalLink, MapPin, Trophy, Users } from "lucide-react"
import { useLenis } from "lenis/react"
import { useEffect, useState } from "react"
import FosshackArchiveNavbar from "@/components/fosshack/archive-navbar"
import { GeometricShapes } from "@/components/fosshack/geometric-shapes"
import EditionGallery from "@/components/fosshack/edition-gallery"
import Timeline from "@/components/timeline"
import type { FosshackEdition } from "@/lib/fosshack-data"

function TiltCard({
  children,
  className = "",
  ...motionProps
}: MotionProps & { children: React.ReactNode; className?: string }) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 })

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 2)
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
  }

  function resetTilt() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      whileHover={{ y: -12, scale: 1.05, transition: { type: "spring", stiffness: 260, damping: 18 } }}
      style={{ rotateX, rotateY, transformPerspective: 900, boxShadow: "0 12px 40px -18px rgba(0, 0, 0, 0.6)" }}
      className={`group relative rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur will-change-transform ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

function Section({ id, immediate = false, children }: { id: string; immediate?: boolean; children: React.ReactNode }) {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0 })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="relative flex min-h-screen scroll-mt-24 items-center justify-center p-4 py-10 sm:p-8"
    >
      {children}
    </motion.section>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 })
  return <motion.h2 ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }} className="mb-12 text-center text-5xl font-bold text-foreground">{children}</motion.h2>
}

function Deferred({ id, activeHash, children }: { id: string; activeHash: string; children: React.ReactNode }) {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "600px 0px" })
  const requested = activeHash === `#${id}`
  const visible = inView || Boolean(activeHash)

  useEffect(() => {
    if (!requested) return
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id)
      target?.scrollIntoView()
      window.setTimeout(() => target?.scrollIntoView(), 300)
    })
    return () => cancelAnimationFrame(frame)
  }, [id, requested])

  return <div ref={ref} className="min-h-screen">{visible ? children : null}</div>
}

export default function ArchiveRecap({ edition }: { edition: FosshackEdition }) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeHash, setActiveHash] = useState("")
  useLenis((lenis) => setShowScrollTop(lenis.scroll > 400))
  const statIcons = [Users, Trophy, MapPin, Calendar]
  const recapSections = [
    ["Overview", "#overview"],
    edition.stats?.length ? ["Stats", "#stats"] : null,
    edition.timeline?.length ? ["Journey", "#journey"] : null,
    edition.gallery ? ["Gallery", "#gallery"] : null,
    edition.links?.length ? ["Links", "#credits"] : null,
    edition.team?.length ? ["Team", "#team"] : null,
  ]
    .filter((entry): entry is string[] => entry !== null)
    .map(([label, href]) => ({ label, href }))

  useEffect(() => {
    function syncHash(event: Event) {
      const link = event.target instanceof Element ? event.target.closest("a")?.getAttribute("href") : null
      if (link?.startsWith("#")) setActiveHash(link)
    }

    setActiveHash(window.location.hash)
    window.addEventListener("hashchange", syncHash)
    document.addEventListener("click", syncHash, true)
    return () => {
      window.removeEventListener("hashchange", syncHash)
      document.removeEventListener("click", syncHash, true)
    }
  }, [])

  return (
    <div className="relative overflow-hidden bg-background text-lg text-foreground">
      <FosshackArchiveNavbar sections={recapSections} />
      <GeometricShapes />
      {showScrollTop && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" className="fixed bottom-8 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-background/80 text-foreground shadow-lg backdrop-blur-md"><ArrowUp className="h-4 w-4" /></button>}

      <main id="main-content">
      <Section id="overview" immediate>
        <div className="relative z-10 mx-auto w-full max-w-5xl pt-16 text-center md:pt-20">
          <motion.div initial={{ y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="space-y-8">
            <motion.h1 className="text-5xl font-bold text-foreground sm:text-8xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}>FOSSHACK {edition.year}</motion.h1>
            <motion.p className="bg-gradient-to-r from-accent-green to-accent-light-green bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1 }}>{edition.year === 2024 ? "Ended on a High." : "Memorable 36 Hours."}</motion.p>
            <motion.div className="flex flex-col items-center justify-center gap-4 text-base text-foreground/60 sm:flex-row sm:gap-6 sm:text-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
              <span className="flex items-center gap-3"><Calendar className="h-6 w-6 text-foreground" />{edition.date}</span><span className="hidden sm:block">•</span><span className="flex items-center gap-3"><MapPin className="h-6 w-6 text-foreground" />{edition.mode}</span>
            </motion.div>
            <motion.p className="mx-auto max-w-3xl text-lg leading-relaxed text-foreground/70 sm:text-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>{edition.description}</motion.p>
            <motion.div className="flex flex-wrap justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}>
              <Link href="#journey" className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-semibold text-background"><Camera className="h-5 w-5" />View Highlights<ArrowRight className="h-5 w-5" /></Link>
              {edition.links?.find((item) => item.label.toLowerCase().includes("result")) && <a href={edition.links.find((item) => item.label.toLowerCase().includes("result"))!.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-foreground/30 px-8 py-4 font-semibold"><Trophy className="h-5 w-5" />See Results<ExternalLink className="h-4 w-4" /></a>}
            </motion.div>
            <motion.div className="relative mx-auto mt-12 aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl border border-foreground/10 shadow-2xl" initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ delay: 0.15, duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
              <picture>
                {edition.mobileImage && <source media="(max-width: 640px)" srcSet={edition.mobileImage} />}
                <img src={edition.image} alt={`FOSSHACK ${edition.year}`} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </picture>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {edition.stats?.length ? <Deferred id="stats" activeHash={activeHash}><Section id="stats"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>Event At a Glance</SectionTitle><motion.div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>{edition.stats.map((stat, index) => { const Icon = statIcons[index % statIcons.length]; return <TiltCard key={stat.label} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * index, duration: 0.8 }} className="p-6 text-center sm:p-10"><div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_0%,rgba(var(--accent-light-green),0.14),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" /><div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/8 transition-all duration-300 group-hover:scale-110 group-hover:bg-[rgba(var(--accent-light-green),0.12)] group-hover:shadow-[0_0_20px_rgba(var(--accent-light-green),0.4)]"><Icon className="h-8 w-8 text-accent-light-green" /></div><p className="relative text-4xl font-bold text-foreground">{stat.value}</p><p className="relative mt-2 text-lg text-foreground/60">{stat.label}</p></TiltCard> })}{edition.prizePool && <TiltCard initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * edition.stats.length, duration: 0.8 }} className="p-6 text-center sm:p-10"><div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_0%,rgba(var(--accent-light-green),0.14),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" /><div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/8"><Trophy className="h-8 w-8 text-accent-light-green" /></div><p className="relative text-4xl font-bold">{edition.prizePool}</p><p className="relative mt-2 text-lg text-foreground/60">Prize pool</p></TiltCard>}</motion.div></div></Section></Deferred> : null}

      {edition.timeline?.length ? <Deferred id="journey" activeHash={activeHash}><Section id="journey"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>The Journey</SectionTitle><Timeline events={edition.timeline.map(({ date, title }) => ({ year: date, title }))} /></div></Section></Deferred> : null}

      {edition.gallery && <Deferred id="gallery" activeHash={activeHash}><Section id="gallery"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>Photo Gallery</SectionTitle><EditionGallery year={edition.year} title={edition.gallery.title} description={edition.gallery.description} photos={edition.gallery.photos} /></div></Section></Deferred>}

      {edition.localhosts?.length ? <Deferred id="presence" activeHash={activeHash}><Section id="presence"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>Local Communities</SectionTitle><div className="grid gap-6 sm:grid-cols-2">{edition.localhosts.map((host) => <article key={host.name} className="rounded-2xl border border-foreground/10 bg-background/60 p-8 backdrop-blur"><MapPin className="mb-5 h-6 w-6 text-accent-light-green" /><p className="text-sm font-semibold uppercase tracking-widest text-accent-light-green">Localhost: {host.name}</p><h3 className="mt-3 text-2xl font-bold">{host.venue}</h3><p className="mt-3 leading-relaxed text-foreground/60">The Delhi-NCR venue where hackers came together to create, collaborate, and build open-source projects.</p><div className="mt-6 flex flex-wrap gap-5">{host.mapUrl && <a href={host.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent-light-green">View on Maps <MapPin className="h-4 w-4" /></a>}{host.url && <a href={host.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-accent-light-green">Host details <ExternalLink className="h-4 w-4" /></a>}</div></article>)}</div></div></Section></Deferred> : null}

      {edition.sponsors?.length ? <Deferred id="sponsors" activeHash={activeHash}><Section id="sponsors"><div className="relative z-10 mx-auto w-full max-w-5xl"><SectionTitle>Our Sponsors</SectionTitle><div className="grid gap-6 sm:grid-cols-2">{edition.sponsors.map((sponsor) => <motion.article key={sponsor.name} whileHover={{ y: -8 }} className="rounded-2xl border border-foreground/10 bg-background/60 p-8 text-center backdrop-blur"><p className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent-light-green">{sponsor.tier} Sponsor</p>{sponsor.logo && <div className="relative mx-auto mb-6 h-24 w-full max-w-xs rounded-xl bg-white p-4"><Image src={sponsor.logo} alt={`${sponsor.name} logo`} fill sizes="320px" className="object-contain p-4" /></div>}<h3 className="text-2xl font-bold">{sponsor.name}</h3></motion.article>)}</div></div></Section></Deferred> : null}

      {edition.links?.length ? <Deferred id="credits" activeHash={activeHash}><Section id="credits"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>Explore {edition.year}</SectionTitle><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{edition.links.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-background/60 p-6 backdrop-blur transition hover:border-accent-light-green/50"><span className="font-semibold">{item.label}</span><ExternalLink className="h-5 w-5 text-foreground/50 transition group-hover:text-accent-light-green" /></a>)}</div></div></Section></Deferred> : null}

      {edition.team?.length ? <Deferred id="team" activeHash={activeHash}><Section id="team"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>Thank You, Team</SectionTitle><motion.p className="mx-auto -mt-6 mb-12 max-w-3xl text-center text-xl text-foreground/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1 }}>None of this would have been possible without our incredible organizing team.</motion.p><motion.div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>{edition.team.map((member, index) => <motion.div key={`${member.name}-${member.role}-${index}`} className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.8 }}><motion.div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-foreground/8 sm:h-24 sm:w-24" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}><Users className="h-8 w-8 text-foreground sm:h-10 sm:w-10" /></motion.div><h3 className="mb-1 text-lg font-medium text-foreground sm:text-xl">{member.name}</h3><p className="text-sm text-foreground/60">{member.role}</p></motion.div>)}</motion.div></div></Section></Deferred> : null}
      </main>
      <footer className="relative z-10 border-t border-foreground/15 bg-background/60 px-6 py-14 text-center backdrop-blur-md"><p className="text-2xl font-bold">FOSSHACK {edition.year}</p><p className="mt-2 text-foreground/60">Thank you to everyone who built, learned, and contributed.</p><Link href="/fosshack" className="mt-6 inline-flex items-center gap-2 font-semibold hover:text-accent-light-green">All editions <ArrowRight className="h-4 w-4" /></Link></footer>
    </div>
  )
}

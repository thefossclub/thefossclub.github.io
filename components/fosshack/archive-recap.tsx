"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, type MotionProps } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, ArrowUp, Calendar, Camera, ExternalLink, Link2, MapPin, MessageCircle, Send, Trophy, Users } from "lucide-react"
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

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zm0 2c-3.2 0-3.5 0-4.7.1-2.1.1-3 1-3.1 3.1-.1 1.2-.1 1.5-.1 4.6s0 3.5.1 4.6c.1 2.1 1 3 3.1 3.1 1.2.1 1.5.1 4.6.1s3.5 0 4.6-.1c2.1-.1 3-1 3.1-3.1.1-1.2.1-1.5.1-4.6s0-3.5-.1-4.6c-.1-2.1-1-3-3.1-3.1-1.1-.1-1.4-.1-4.5-.1zm0 3.4a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8zm0 2a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm5.6-3.5a1.3 1.3 0 1 1 0 2.5 1.3 1.3 0 0 1 0-2.5z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 1.2h3.7l-8.1 9.2L24 22.8h-7.5l-5.8-7.6-6.7 7.6H.3l8.6-9.9L0 1.2h7.7l5.3 7 5.9-7zm-1.3 19.4h2L6.6 3.3H4.4l13.2 17.3z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4v6.3zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z" />
    </svg>
  )
}

const presenceLinks = [
  { title: "Instagram", desc: "Photos, reels and stories from the event", url: "https://instagram.com/thefossclub", icon: InstagramIcon },
  { title: "X / Twitter", desc: "Live updates and highlights", url: "https://x.com/TheFOSSClub", icon: XIcon },
  { title: "LinkedIn", desc: "Professional recaps and announcements", url: "https://linkedin.com/company/thefossclub", icon: LinkedInIcon },
  { title: "Discord Server", desc: "Join our community", url: "https://discord.gg/sjKNEYQPnk", icon: MessageCircle },
  { title: "Telegram Group", desc: "Join our telegram group", url: "https://t.me/TheFOSSClub", icon: Send },
  { title: "LinkTree", desc: "Access all our links", url: "https://linktr.ee/thefossclub", icon: Link2 },
]

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

      {edition.socialPosts?.length ? <Deferred id="posts" activeHash={activeHash}><Section id="posts"><div className="relative z-10 mx-auto w-full max-w-5xl"><SectionTitle>Our Posts</SectionTitle><motion.p className="mx-auto -mt-6 mb-12 max-w-3xl text-center text-xl text-foreground/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1 }}>A few moments we shared online.</motion.p><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">{edition.socialPosts.map((post, index) => <a key={index} href={post.url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur transition-colors duration-300 hover:border-foreground/30 flex flex-col"><div className="overflow-hidden aspect-square"><Image src={post.image} alt={post.caption} width={400} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="flex flex-1 flex-col p-5"><div className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-light-green">{post.platform}</div><p className="flex-1 text-base leading-relaxed text-foreground/70">{post.caption}</p><div className="mt-4 flex items-center gap-2 text-sm font-semibold text-foreground/60 transition-colors group-hover:text-foreground">View Post <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></div></div></a>)}</div></div></Section></Deferred> : null}

      <Deferred id="presence" activeHash={activeHash}><Section id="presence"><div className="relative z-10 mx-auto w-full max-w-5xl"><SectionTitle>Our Online Presence</SectionTitle><motion.p className="mx-auto -mt-6 mb-12 max-w-3xl text-center text-xl text-foreground/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1 }}>Relive the moments, see the photos and stay connected with the community.</motion.p><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">{presenceLinks.map((link) => <div key={link.title} className="relative group/link"><div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-light-green/18 via-accent-purple/14 to-accent-green/10 opacity-0 blur-xl transition-opacity duration-500 group-hover/link:opacity-100" /><a href={link.url} target="_blank" rel="noreferrer" className="relative flex items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-background/60 p-6 text-foreground transition-colors duration-300 hover:border-foreground/30 hover:bg-background/80"><div className="flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground/8"><link.icon className="h-5 w-5 text-accent-light-green" /></div><div><h3 className="text-lg font-semibold text-foreground">{link.title}</h3><p className="text-sm text-foreground/60">{link.desc}</p></div></div><ArrowRight className="h-5 w-5 shrink-0 text-foreground/50 transition-transform duration-300 group-hover/link:translate-x-1" /></a></div>)}</div></div></Section></Deferred>


      {edition.localhosts?.length ? <Deferred id="localhosts" activeHash={activeHash}><Section id="localhosts"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>Local Communities</SectionTitle><div className="grid gap-6 sm:grid-cols-2">{edition.localhosts.map((host) => <article key={host.name} className="rounded-2xl border border-foreground/10 bg-background/60 p-8 backdrop-blur"><MapPin className="mb-5 h-6 w-6 text-accent-light-green" /><p className="text-sm font-semibold uppercase tracking-widest text-accent-light-green">Localhost: {host.name}</p><h3 className="mt-3 text-2xl font-bold">{host.venue}</h3><p className="mt-3 leading-relaxed text-foreground/60">The Delhi-NCR venue where hackers came together to create, collaborate, and build open-source projects.</p><div className="mt-6 flex flex-wrap gap-5">{host.mapUrl && <a href={host.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent-light-green">View on Maps <MapPin className="h-4 w-4" /></a>}{host.url && <a href={host.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-accent-light-green">Host details <ExternalLink className="h-4 w-4" /></a>}</div></article>)}</div></div></Section></Deferred> : null}

      {edition.sponsors?.length ? <Deferred id="sponsors" activeHash={activeHash}><Section id="sponsors"><div className="relative z-10 mx-auto w-full max-w-5xl"><SectionTitle>Our Sponsors</SectionTitle><div className="grid gap-6 sm:grid-cols-2">{edition.sponsors.map((sponsor) => <motion.article key={sponsor.name} whileHover={{ y: -8 }} className="rounded-2xl border border-foreground/10 bg-background/60 p-8 text-center backdrop-blur"><p className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent-light-green">{sponsor.tier} Sponsor</p>{sponsor.logo && <div className="relative mx-auto mb-6 h-24 w-full max-w-xs rounded-xl bg-white p-4"><Image src={sponsor.logo} alt={`${sponsor.name} logo`} fill sizes="320px" className="object-contain p-4" /></div>}<h3 className="text-2xl font-bold">{sponsor.name}</h3></motion.article>)}</div></div></Section></Deferred> : null}

      {edition.links?.length ? <Deferred id="credits" activeHash={activeHash}><Section id="credits"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>Explore {edition.year}</SectionTitle><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{edition.links.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/10 bg-background/60 p-6 backdrop-blur transition hover:border-accent-light-green/50"><span className="font-semibold">{item.label}</span><ExternalLink className="h-5 w-5 text-foreground/50 transition group-hover:text-accent-light-green" /></a>)}</div></div></Section></Deferred> : null}

      {edition.team?.length ? <Deferred id="team" activeHash={activeHash}><Section id="team"><div className="relative z-10 mx-auto w-full max-w-6xl"><SectionTitle>Thank You, Team</SectionTitle><motion.p className="mx-auto -mt-6 mb-12 max-w-3xl text-center text-xl text-foreground/70" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1 }}>None of this would have been possible without our incredible organizing team.</motion.p><motion.div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>{edition.team.map((member, index) => <motion.div key={`${member.name}-${member.role}-${index}`} className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.8 }}><motion.div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-foreground/8 sm:h-24 sm:w-24" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}><Users className="h-8 w-8 text-foreground sm:h-10 sm:w-10" /></motion.div><h3 className="mb-1 text-lg font-medium text-foreground sm:text-xl">{member.name}</h3><p className="text-sm text-foreground/60">{member.role}</p></motion.div>)}</motion.div></div></Section></Deferred> : null}
      </main>
      <footer className="relative z-10 border-t border-foreground/15 bg-background/60 px-6 py-14 text-center backdrop-blur-md"><p className="text-2xl font-bold">FOSSHACK {edition.year}</p><p className="mt-2 text-foreground/60">Thank you to everyone who built, learned, and contributed.</p><Link href="/fosshack" className="mt-6 inline-flex items-center gap-2 font-semibold hover:text-accent-light-green">All editions <ArrowRight className="h-4 w-4" /></Link></footer>
    </div>
  )
}

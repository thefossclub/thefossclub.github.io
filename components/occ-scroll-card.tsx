"use client"

import { CalendarDays, Mic2 } from "lucide-react"
import { m } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

type OCCCardItem = {
  id: string
  title: string
  date: string
  speakers: string
  image: string
}

const defaultOccCards: OCCCardItem[] = [
  {
    id: "occ-3",
    title: "AI | AI Slop | ML | Linux | AI in Gamedev",
    date: "18 January, 2026",
    speakers: "Tooshar Bharadwaj, Karan Veer Singh, Prakahar Sharma",
    image: "occ/occ-3.png",
  },
  {
    id: "occ-2",
    title: "From Play to Profession:Game Dev, GPUs, and Growth",
    date: "26 October, 2025",
    speakers: "Sanjay Saji, Jayesh Bisht",
    image: "occ/occ-2.png",
  },
  {
    id: "occ-1",
    title: "Getting Familiar with Open Source & Terminal",
    date: "04 September, 2025",
    speakers: "Tanmay Maheshwari, Avneesh Kumar, Bhumi Aggarwal",
    image: "occ/occ-1.png",
  },
  {
    id: "occ-5",
    title: "Operating System",
    date: "12 January, 2025",
    speakers: "Vaibhav Pratap Singh, Jayesh Bisht",
    image: "occ/occ-5.png",
  },
  {
    id: "occ-4",
    title: "UI/UX",
    date: "11 May, 2025",
    speakers: "Naman Chandok, Jaseemuddin Naseem",
    image: "occ/occ-4.png",
  },
  {
    id: "occ-6",
    title: "Cloud Computing",
    date: "10 November, 2024",
    speakers: "Teja, Inzemam, Ravpreet Singh Maini",
    image: "occ/occ-6.png",
  }
]

interface OCCScrollCardProps {
  cards?: OCCCardItem[]
}

export default function OCCScrollCard({ cards = defaultOccCards }: OCCScrollCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canRight, setCanRight] = useState(false)
  const [canLeft, setCanLeft] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    // Tolerance avoids false positives from fractional/snap offsets.
    const tolerance = 24
    const remainingRight = el.scrollWidth - (el.scrollLeft + el.clientWidth)

    setCanLeft(el.scrollLeft > tolerance)
    setCanRight(remainingRight > tolerance)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Always start from the first card on fresh render.
    el.scrollLeft = 0
    checkScroll()
    window.requestAnimationFrame(checkScroll)
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [checkScroll])

  const scrollCards = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const offset = direction === "left" ? -scrollRef.current.clientWidth * 0.75 : scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })

    // Re-evaluate after smooth scroll settles.
    window.setTimeout(checkScroll, 350)
  }

  return (
    <div className="relative w-full rounded-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-5 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-5 bg-gradient-to-l from-black/70 via-black/35 to-transparent" />

      {canLeft && (
        <button
          type="button"
          aria-label="Scroll cards left"
          onClick={() => scrollCards("left")}
          className="absolute -left-3 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-md backdrop-blur-sm transition hover:border-green-500 hover:text-green-500 sm:-left-5"
        >
          <FaAngleLeft className="h-4 w-4" />
        </button>
      )}

      {canRight && (
        <button
          type="button"
          aria-label="Scroll cards right"
          onClick={() => scrollCards("right")}
          className="absolute -right-3 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-md backdrop-blur-sm transition hover:border-green-500 hover:text-green-500 sm:-right-5"
        >
          <FaAngleRight className="h-4 w-4" />
        </button>
      )}

      <m.div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex snap-x gap-5 overflow-x-scroll py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        initial={{ opacity: 0, y: 2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {cards.map((card, index) => (
          <m.article
            key={card.id}
            className="group min-w-[290px] max-w-[290px] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card shadow-md shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20 md:min-w-[330px] md:max-w-[330px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <div className="relative h-44 w-full overflow-hidden md:h-52">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent group-hover:translate-y-full group-hover:transition-transform group-hover:duration-900 group-hover:opacity-0" />
            </div>

            <div className="space-y-3 p-4 md:p-5">
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-green-500" />
                <span>{card.date}</span>
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mic2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>{card.speakers}</span>
              </div>
            </div>
          </m.article>
        ))}
      </m.div>
    </div>
  )
}

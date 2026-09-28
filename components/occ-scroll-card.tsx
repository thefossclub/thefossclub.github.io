"use client"

import { CalendarDays, Mic2, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import { m } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export type OCCCardItem = {
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
    speakers: "Tooshar Bhardwaj, Karan Veer Singh, Prakhar Sharma",
    image: "/occ/occ-3.webp",
  },
  {
    id: "occ-2",
    title: "From Play to Profession:Game Dev, GPUs, and Growth",
    date: "26 October, 2025",
    speakers: "Sanjay Saji, Jayesh Bisht",
    image: "/occ/occ-2.webp",
  },
  {
    id: "occ-1",
    title: "Getting Familiar with Open Source & Terminal",
    date: "04 September, 2025",
    speakers: "Tanmay Maheshwari, Avneesh Kumar, Bhumi Aggarwal",
    image: "/occ/occ-1.webp",
  },
  {
    id: "occ-5",
    title: "Operating System",
    date: "12 January, 2025",
    speakers: "Vaibhav Pratap Singh, Jayesh Bisht",
    image: "/occ/occ-5.webp",
  },
  {
    id: "occ-4",
    title: "UI/UX",
    date: "11 May, 2025",
    speakers: "Naman Chandok, Jaseemuddin Naseem",
    image: "/occ/occ-4.webp",
  },
  {
    id: "occ-6",
    title: "Cloud Computing",
    date: "10 November, 2024",
    speakers: "Teja, Inzemam, Ravpreet Singh Maini",
    image: "/occ/occ-6.webp",
  },
]

interface OCCScrollCardProps {
  cards?: OCCCardItem[]
}

export default function OCCScrollCard({ cards = defaultOccCards }: OCCScrollCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canRight, setCanRight] = useState(false)
  const [canLeft, setCanLeft] = useState(false)
  const [selectedCard, setSelectedCard] = useState<OCCCardItem | null>(null)

  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    // Tolerance avoids false positives from fractional/snap offsets.
    const tolerance = 24
    const remainingRight = el.scrollWidth - (el.scrollLeft + el.clientWidth)

    setCanLeft(el.scrollLeft > tolerance)
    setCanRight(remainingRight > tolerance)

    // Calculate active card index based on scroll position
    const children = Array.from(el.children) as HTMLElement[]
    if (children.length > 0) {
      const scrollCenter = el.scrollLeft + el.clientWidth / 2
      let closestIdx = 0
      let minDiff = Infinity
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2
        const diff = Math.abs(scrollCenter - childCenter)
        if (diff < minDiff) {
          minDiff = diff
          closestIdx = i
        }
      })
      setActiveCardIndex(closestIdx)
    }
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

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return
    const children = Array.from(scrollRef.current.children) as HTMLElement[]
    if (children[index]) {
      children[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    }
  }

  // Lightbox keyboard navigation
  const selectedIndex = selectedCard ? cards.findIndex((c) => c.id === selectedCard.id) : -1
  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex >= 0 && selectedIndex < cards.length - 1

  const handlePrev = useCallback(() => {
    if (hasPrev) setSelectedCard(cards[selectedIndex - 1])
  }, [cards, hasPrev, selectedIndex])

  const handleNext = useCallback(() => {
    if (hasNext) setSelectedCard(cards[selectedIndex + 1])
  }, [cards, hasNext, selectedIndex])

  useEffect(() => {
    if (!selectedCard) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [selectedCard, handlePrev, handleNext])

  return (
    <div className="relative w-full rounded-2xl">
      {/* Edge gradient indicators */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-4 sm:w-6 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-4 sm:w-6 bg-gradient-to-l from-background via-background/60 to-transparent" />

      {/* Desktop/Tablet Arrow Controls */}
      {canLeft && (
        <button
          type="button"
          aria-label="Scroll cards left"
          onClick={() => scrollCards("left")}
          className="absolute -left-3 top-1/2 z-40 hidden sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-md backdrop-blur-sm transition hover:text-green-500 sm:-left-5"
        >
          <FaAngleLeft className="h-4 w-4" />
        </button>
      )}

      {canRight && (
        <button
          type="button"
          aria-label="Scroll cards right"
          onClick={() => scrollCards("right")}
          className="absolute -right-3 top-1/2 z-40 hidden sm:flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-md backdrop-blur-sm transition hover:text-green-500 sm:-right-5"
        >
          <FaAngleRight className="h-4 w-4" />
        </button>
      )}

      {/* Carousel Track with smooth touch snap */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex snap-x snap-mandatory gap-3.5 sm:gap-5 overflow-x-auto py-2 px-1 sm:px-0 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, index) => (
          <m.article
            key={card.id}
            className="group flex flex-col w-[58vw] min-w-[190px] max-w-[220px] sm:w-[280px] sm:min-w-[280px] sm:max-w-[280px] md:w-[320px] md:min-w-[320px] md:max-w-[320px] flex-shrink-0 snap-start overflow-hidden rounded-xl sm:rounded-3xl border border-border bg-card shadow-md shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            {/* Poster flyer container with full A4 portrait aspect ratio (1587:2245) */}
            <div
              className="relative aspect-[1587/2245] w-full overflow-hidden bg-muted/20 cursor-pointer"
              onClick={() => setSelectedCard(card)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedCard(card)
                }
              }}
              aria-label={`View full flyer for ${card.title}`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />

              {/* Click to enlarge overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-1 rounded-full border border-white/20 bg-black/75 px-2 py-0.5 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-medium text-white shadow-lg backdrop-blur-md">
                  <ZoomIn className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-400" />
                  View Full Flyer
                </span>
              </div>
            </div>

            {/* Card Information scaled for mobile */}
            <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-4 md:p-5 space-y-1.5 sm:space-y-3">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xs sm:text-base md:text-lg font-semibold leading-snug text-foreground line-clamp-2">
                  {card.title}
                </h3>

                <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs md:text-sm text-muted-foreground">
                  <CalendarDays className="h-3 w-3 shrink-0 text-green-500 sm:h-4 sm:w-4" />
                  <span>{card.date}</span>
                </div>

                <div className="flex items-start gap-1 sm:gap-1.5 text-[11px] sm:text-xs md:text-sm text-muted-foreground line-clamp-2">
                  <Mic2 className="mt-0.5 h-3 w-3 shrink-0 text-green-500 sm:h-4 sm:w-4" />
                  <span>{card.speakers}</span>
                </div>
              </div>
            </div>
          </m.article>
        ))}
      </div>

      {/* Mobile Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 pt-4 sm:hidden">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => scrollToCard(idx)}
            className={`transition-all duration-300 rounded-full ${
              activeCardIndex === idx
                ? "h-1.5 w-5 bg-green-500"
                : "h-1.5 w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal for Full Flyer */}
      <Dialog open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
        <DialogContent className="w-[94vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-card border-border rounded-2xl">
          {selectedCard && (
            <div className="space-y-3 sm:space-y-4">
              <DialogHeader className="space-y-1 text-left pr-6">
                <DialogTitle className="text-base sm:text-xl font-bold leading-snug text-foreground">
                  {selectedCard.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  <span>{selectedCard.date}</span>
                </DialogDescription>
              </DialogHeader>

              {/* Full flyer image */}
              <div className="relative mx-auto aspect-[1587/2245] w-full max-h-[48vh] sm:max-h-[60vh] overflow-hidden rounded-xl border border-border/80 bg-black/5 dark:bg-black/20 shadow-lg">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Speakers list in modal */}
              <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground pt-1">
                <Mic2 className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-green-500" />
                <span>{selectedCard.speakers}</span>
              </div>

              {/* Modal Navigation Footer */}
              <div className="flex items-center justify-between border-t border-border/60 pt-2.5 sm:pt-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs sm:text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <span className="text-xs text-muted-foreground">
                  {selectedIndex + 1} of {cards.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!hasNext}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs sm:text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


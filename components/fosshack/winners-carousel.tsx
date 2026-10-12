"use client";

import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useSpring, type MotionProps } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const winners = [
  {
    prize: "₹50,000",
    team: "Push & Pray",
    project: "Livabl",
    image: "/fosshack2026/livabl.webp",
    desc: "Tooshar · Karanveer Singh · Janamjai",
  },
  {
    prize: "₹25,000",
    team: "CrypticByte",
    project: "Dockfleet",
    image: "/fosshack2026/dockfleet.webp",
    desc: "Khushi · Sunidhi Singh · Aayush Jha · Pratyush",
  },
  {
    prize: "₹25,000",
    team: "Rule smith",
    project: "Improving UX & Contributor Workflow in FOSS United Platform",
    image: "/fosshack2026/rule_smith.webp",
    desc: "Anshika Yadav",
  },
  {
    prize: "₹10,000",
    team: "Beluga",
    project: "OSM Data Contribution",
    image: "/fosshack2026/beluga.webp",
    desc: "Mayank Choubey",
  },
];

const resultsThreadUrl = "https://forum.fossunited.org/t/foss-hack-2026-results/8094";

function TiltCard({
  children,
  className = "",
  ...motionProps
}: MotionProps & { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * 2);
    rotateY.set(px * 2);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -12,
        scale: 1.05,
        boxShadow:
          "0 30px 80px -20px rgba(var(--accent-light-green), 0.5), 0 0 45px -10px rgba(var(--accent-light-green), 0.35)",
        borderColor: "rgba(var(--accent-light-green), 0.55)",
        transition: { type: "spring", stiffness: 260, damping: 18 },
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        boxShadow: "0 12px 40px -18px rgba(0, 0, 0, 0.6)",
      }}
      className={`group relative rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur will-change-transform ${className}`}
      {...motionProps}
    >
      {children}
    </m.div>
  );
}

export default function WinnersCarousel() {
  const [winnersApi, setWinnersApi] = useState<CarouselApi | null>(null);
  const [activeWinner, setActiveWinner] = useState(0);

  useEffect(() => {
    if (!winnersApi) return;
    const onSelect = () => setActiveWinner(winnersApi.selectedScrollSnap());
    onSelect();
    winnersApi.on("select", onSelect);
    winnersApi.on("reInit", onSelect);
    return () => {
      winnersApi.off("select", onSelect);
      winnersApi.off("reInit", onSelect);
    };
  }, [winnersApi]);

  return (
    <>
      <m.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <div className="relative">
          <Carousel
            opts={{ align: "center", loop: true }}
            setApi={setWinnersApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {winners.map((winner, index) => {
                const active = index === activeWinner;
                return (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-[85%] sm:basis-[55%] lg:basis-[38%]"
                  >
                    <div
                      className={`relative h-full transition-all duration-500 ease-out ${
                        active
                          ? "opacity-100 scale-100"
                          : "opacity-60 scale-[0.94]"
                      }`}
                    >
                      <TiltCard className="h-full overflow-hidden">
                        <div className="flex h-full flex-col items-center text-center">
                          <div className="w-full overflow-hidden aspect-video">
                            <Image
                              src={winner.image}
                              alt={`${winner.team} photo`}
                              width={640}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 sm:p-8 flex flex-col items-center w-full">
                            <div className="text-2xl font-bold text-foreground">
                              {winner.team}
                            </div>
                            <div className="text-xl text-foreground/70">
                              {winner.project}
                            </div>
                            <div className="mt-2 rounded-full bg-foreground/8 px-4 py-1 text-base font-semibold text-accent-green">
                              {winner.prize}
                            </div>
                            <p className="mt-4 text-foreground/60 text-base">
                              {winner.desc}
                            </p>
                          </div>
                        </div>
                        {!active && (
                          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-background/85 via-transparent to-background/85" />
                        )}
                      </TiltCard>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-28 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-28 bg-gradient-to-l from-background to-transparent" />

          <button
            type="button"
            onClick={() => winnersApi?.scrollPrev()}
            aria-label="Previous winner"
            className="absolute left-1 sm:left-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground backdrop-blur-md transition-colors duration-300 hover:border-accent-light-green/60 hover:text-accent-light-green"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => winnersApi?.scrollNext()}
            aria-label="Next winner"
            className="absolute right-1 sm:right-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground backdrop-blur-md transition-colors duration-300 hover:border-accent-light-green/60 hover:text-accent-light-green"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {winners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => winnersApi?.scrollTo(i)}
              aria-label={`Go to winner ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeWinner
                  ? "w-8 bg-accent-light-green"
                  : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </m.div>
      <m.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Link
          href={resultsThreadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-3 text-base font-semibold text-foreground transition-colors duration-300 hover:border-foreground/60"
        >
          View Full Results
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </m.div>
    </>
  );
}

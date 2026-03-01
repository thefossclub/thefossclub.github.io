"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const timeline = [
  { title: "Registration Open", eventDate: "2026-02-01" },

  {
    title: "Registration Closing",
    date: "Online, 28th February",
    time: "11:59 PM",
    eventDate: "2026-02-28T23:59:00",
  },

  {
    title: "Orientation",
    date: "Online, 2nd March",
    time: "06:00 PM – 7:30 PM",
    eventDate: "2026-03-02T18:00:00",
  },

  {
    title: "Speaker Session",
    date: "Online, 7th March",
    time: "Mentors Session & Workshop",
    eventDate: "2026-03-07T00:00:00",
  },

  {
    title: "1st Meetup + OSM Week Begins",
    date: "Offline, 16th March",
    time: "Time will be announced soon",
    eventDate: "2026-03-16T00:00:00",
  },

  {
    title: "Speaker Session + OSM Week Ends",
    date: "Online, 22nd March",
    time: "Mentors Session & Closing Workshop",
    eventDate: "2026-03-22T00:00:00",
  },

  {
    title: "Final Hack Session",
    date: "Offline, 28th – 29th March",
    time: "28th 10 AM – 29th 3 PM",
    eventDate: "2026-03-28T10:00:00",
  },

  {
    title: "Hackathon Concludes",
    date: "Online, 31st March",
    time: "11:59 PM",
    eventDate: "2026-03-31T23:59:00",
  },

  {
    title: "Results",
    date: "Online, 4th May",
    time: "by FOSS United",
    eventDate: "2026-05-04",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopLine = useAnimation();
  const mobileLine = useAnimation();
  const lineContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const start = () => {
      const now = new Date().getTime();
      const sorted = timeline
        .map((item, index) => ({
          time: new Date(item.eventDate!).getTime(),
          originalIndex: index,
        }))
        .sort((a, b) => a.time - b.time);

      const totalSegments = sorted.length - 1;

      let progress = 0;
      let currentIndex: number | null = null;

      if (now < sorted[0].time) {
        progress = 0;
        currentIndex = null;
      } else if (now >= sorted[sorted.length - 1].time) {
        progress = 1;
        currentIndex = sorted[sorted.length - 1].originalIndex;
      } else {
        for (let i = 0; i < sorted.length - 1; i++) {
          if (now >= sorted[i].time && now < sorted[i + 1].time) {
            const segmentProgress =
              (now - sorted[i].time) / (sorted[i + 1].time - sorted[i].time);

            progress = (i + segmentProgress) / totalSegments;

            currentIndex = sorted[i].originalIndex;
            break;
          }
        }
      }

      desktopLine.set({ scaleX: 0 });

      desktopLine.start({
        scaleX: progress,
        transition: { duration: 1.5, ease: "easeOut" },
      });

      setActiveIndex(currentIndex);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
      },
      { threshold: 0.3 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [desktopLine, mobileLine]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-48 overflow-hidden"
    >
      {/* TITLE */}
      <motion.h2
        className="text-center text-5xl md:text-6xl font-semibold text-white mb-20 md:mb-40"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        TIMELINE
        <span className="block mt-4 text-base font-normal text-white/50">
          (1st – 31st March)
        </span>
      </motion.h2>

      <div className="hidden md:block max-w-7xl mx-auto px-8">
        <div ref={lineContainerRef} className="relative">
          {/* Line */}
          <div className="absolute left-8 right-8 top-1/2 h-px bg-white/10" />
          <motion.div
            className="absolute left-8 right-8 top-1/2 h-px bg-green-400 origin-left"
            animate={desktopLine}
          />

          {/* Dots */}
          <div className="relative flex justify-between items-center">
            {timeline.map((item, index) => {
              const isTop = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center flex-1"
                >
                  {isTop && (
                    <motion.div
                      className="absolute bottom-full mb-6 w-64 text-center"
                      initial={{ opacity: 0, y: -40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.08 }}
                    >
                      {item.time && (
                        <p className="text-base text-green-400 mb-1">
                          {item.time}
                        </p>
                      )}
                      {item.date && (
                        <p className="text-sm text-white/50 mb-1">
                          {item.date}
                        </p>
                      )}
                      <p
                        className={`text-xl font-medium mb-1 transition-all duration-500 ${
                          index <= activeIndex! ? "text-white" : "text-white/60"
                        }`}
                      >
                        {item.title}
                      </p>
                    </motion.div>
                  )}

                  {/* Dot */}
                  <div
                    className={`timeline-dot relative w-5 h-5 rounded-full z-10 transition-all duration-500 ${
                      index < activeIndex!
                        ? "bg-green-400"
                        : index === activeIndex
                          ? "bg-green-400 scale-125 shadow-[0_0_20px_#4ade80]"
                          : "bg-white/20"
                    }`}
                  >
                    {index === activeIndex && (
                      <span className="absolute inset-0 rounded-full animate-pulse-ring" />
                    )}
                  </div>

                  {!isTop && (
                    <motion.div
                      className="absolute top-12 w-64 text-center"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.08 }}
                    >
                      <p
                        className={`text-xl font-medium mb-1 transition-all duration-500 ${
                          index <= activeIndex! ? "text-white" : "text-white/60"
                        }`}
                      >
                        {item.title}
                      </p>
                      {item.date && (
                        <p className="text-sm text-white/50 mb-1">
                          {item.date}
                        </p>
                      )}
                      {item.time && (
                        <p className="text-base text-green-400">{item.time}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="md:hidden px-6">
        <div className="relative pl-12">
          {/* Line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-white/10" />
          <motion.div
            className="absolute left-6 top-4 bottom-4 w-px bg-green-400 origin-top"
            animate={mobileLine}
          />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex gap-8 mb-14"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              {/* Dot */}
              <div className="relative w-5 h-5 mt-1 rounded-full bg-green-400 z-10">
                {item.highlight && (
                  <span className="absolute inset-0 rounded-full animate-pulse-ring" />
                )}
              </div>

              {/* Content */}
              <div>
                <p className="text-xl font-medium text-white mb-1">
                  {item.title}
                </p>
                {item.date && (
                  <p className="text-sm text-white/50 mb-1">{item.date}</p>
                )}
                {item.time && (
                  <p className="text-base text-green-400">{item.time}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pulse ring */}
      <style jsx>{`
        @keyframes pulseRing {
          0% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(74, 222, 128, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
        }
        .animate-pulse-ring {
          animation: pulseRing 3s infinite ease-out;
        }
      `}</style>
    </section>
  );
}

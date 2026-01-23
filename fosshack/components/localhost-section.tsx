"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, X } from "lucide-react";

export function LocalhostSection() {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 " />
            <h2 className="text-5xl font-bold ">Localhost: Delhi</h2>
          </div>
          <div className="space-y-4">
            <p className="text-2xl font-semibold">Delhi Technical Campus</p>
            <p className="text-xl leading-relaxed">
              Join us at our vibrant venue where innovation meets collaboration.
              Located in the heart of Greater Noida, Localhost provides the
              perfect save environment for hackers to create, collaborate, and
              innovate.
            </p>
            <motion.a
              href="https://maps.app.goo.gl/fi57g51gy84YohzP8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#141414] hover:text-[#141414]/80 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="underline underline-offset-4">View on Maps</span>
              <MapPin className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="relative"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 z-0">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-[40px] blur-3xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 0% 50%, rgba(var(--accent-green), 0.45), transparent 60%), radial-gradient(circle at 100% 50%, rgba(var(--accent-cyan), 0.45), transparent 60%)",
              }}
            />
          </div>

          {/* Main Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => setIsEnlarged(true)}
          >
            <div className="pointer-events-none absolute -inset-6 bg-gradient-to-br from-[var(--accent-green)]/35 via-[var(--accent-cyan)]/25 to-[var(--accent-green)]/15 blur-2xl opacity-70" />
            <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-[var(--accent-green)]/20 via-[var(--accent-cyan)]/18 to-transparent blur-xl opacity-80" />
            <div className="relative aspect-square w-full">
              <Image
                src="/dtc.JPG"
                alt="Delhi Technical Campus - Localhost Venue"
                fill
                className="object-cover"
                style={{
                  filter: "contrast(1.1) brightness(1.1)",
                }}
              />
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl"
          />
        </motion.div>
      </div>

      {/* Enlarged Image Overlay */}
      <AnimatePresence>
        {isEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
            onClick={() => setIsEnlarged(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/dtc.JPG"
                alt="Delhi Technical Campus - Localhost Venue"
                fill
                className="object-cover rounded-lg"
              />

              <button
                onClick={() => setIsEnlarged(false)}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

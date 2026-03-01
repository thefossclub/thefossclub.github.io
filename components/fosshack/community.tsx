"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Moon, Sun } from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const DynamicGeometricShapes = dynamic(
  () =>
    import("@/components/fosshack/geometric-shapes").then(
      (mod) => mod.GeometricShapes,
    ),
  {
    ssr: false,
  },
);

const BlurElement = ({ className }: { className: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl ${className}`}
  />
);

const Section = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="min-h-screen flex items-center justify-center p-8 relative"
    >
      {children}
    </motion.section>
  );
};

const AnimatedTitle = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="text-5xl font-bold mb-12 text-foreground"
    >
      {children}
    </motion.h2>
  );
};

interface Community {
  name: string;
  logo: string;
}

interface CommunityCardProps {
  community: Community;
  size: "large" | "small";
}

const CommunityCard = ({ community, size }: CommunityCardProps) => {
  const isLarge = size === "large";

  return (
    <motion.div
      className={`bg-background/80 p-${isLarge ? "6" : "4"} rounded-xl flex flex-col items-center justify-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`h-${isLarge ? "32" : "20"} w-full flex items-center justify-center`}
      >
        <Image
          src={community.logo}
          width={isLarge ? 320 : 160}
          height={isLarge ? 160 : 80}
          alt={community.name}
          className="max-h-full w-auto object-contain"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {community.name}
      </h3>
    </motion.div>
  );
};

export default function Community() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const largeCommunities: Community[] = [
    { name: "PyDelhi", logo: "/fosshack/pydelhi_community_logo.jpg" },
    { name: "Django India", logo: "/fosshack/djangoi.jpeg" },
  ];

  const smallCommunities: Community[] = [
    { name: "FOSS USAR", logo: "/fosshack/Usar.jpeg" },
    { name: "AIR", logo: "/fosshack/AiR.jpeg" },
    { name: "ECell", logo: "/fosshack/ecell.jpeg" },
    { name: "IEEE", logo: "/fosshack/ieee.jpeg" },
    { name: "ASC", logo: "/fosshack/asc.jpeg" },
  ];

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("theme-light");
    } else {
      root.classList.remove("theme-light");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="bg-background text-foreground text-lg relative overflow-hidden">
      <div className="fixed right-6 top-6 z-30">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`group inline-flex items-center rounded-full px-2 py-1 backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]/60 focus-visible:ring-offset-2 border border-[rgba(var(--accent-green),0.6)] ${
            theme === "light"
              ? "bg-white text-[#141414] shadow-md shadow-black/15 hover:shadow-black/25 focus-visible:ring-offset-white"
              : "bg-white/18 text-white shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:bg-white/24 focus-visible:ring-offset-black"
          }`}
        >
          <span
            className={`relative flex h-6 w-10 items-center rounded-full p-1 transition-all ${
              theme === "light"
                ? "bg-black/8 group-hover:bg-black/12"
                : "bg-black/35 group-hover:bg-black/45"
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${
                theme === "light" ? "bg-white" : "bg-black/70"
              } ${theme === "light" ? "translate-x-4" : "translate-x-0"}`}
            >
              {theme === "light" ? (
                <Sun className="h-3.5 w-3.5 text-[#141414]" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-white" />
              )}
            </span>
          </span>
        </button>
      </div>
      <BlurElement
        className={`bg-[var(--accent-green)]/40 w-[800px] h-[800px] -top-[400px] -left-[300px] ${
          theme === "light" ? "opacity-[0.28]" : "opacity-[0.15]"
        }`}
      />
      <BlurElement
        className={`bg-[var(--accent-cyan)]/40 w-[600px] h-[600px] top-[30%] -right-[200px] ${
          theme === "light" ? "opacity-[0.26]" : "opacity-[0.15]"
        }`}
      />
      <BlurElement
        className={`bg-[var(--accent-green)]/40 w-[700px] h-[700px] bottom-0 left-1/2 -translate-x-1/2 ${
          theme === "light" ? "opacity-[0.24]" : "opacity-[0.15]"
        }`}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <DynamicGeometricShapes />
      </Suspense>

      <Section id="community">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Community Partners</AnimatedTitle>
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {largeCommunities.map((community, index) => (
                <CommunityCard key={index} community={community} size="large" />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {smallCommunities.map((community, index) => (
                <CommunityCard key={index} community={community} size="small" />
              ))}
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

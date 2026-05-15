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
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });
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
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="text-5xl font-bold mb-12 text-foreground text-center"
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
      className={`bg-background/80 rounded-xl flex flex-col items-center justify-center border border-foreground/10 ${
        isLarge ? "p-6" : "p-4"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`w-full flex items-center justify-center ${isLarge ? "h-32" : "h-20"}`}
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
  const largeCommunities: Community[] = [
    { name: "PyDelhi", logo: "/fosshack/pydelhi_community_logo.webp" },
    { name: "Django India", logo: "/fosshack/djangoi.webp" },
  ];

  const smallCommunities: Community[] = [
    { name: "FOSS USAR", logo: "/fosshack/Usar.webp" },
    { name: "AIR", logo: "/fosshack/AiR.webp" },
    { name: "ECell", logo: "/fosshack/ecell.webp" },
    { name: "IEEE", logo: "/fosshack/ieee.webp" },
    { name: "ASC", logo: "/fosshack/asc.webp" },
  ];

  return (
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
  );
}

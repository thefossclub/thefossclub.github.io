"use client";

import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useSpring, type MotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Calendar,
  Camera,
  Link2,
  MapPin,
  MessageCircle,
  Play,
  Quote,
  Send,
  Trophy,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import FosshackArchiveNavbar from "@/components/fosshack/archive-navbar";

const DynamicGeometricShapes = dynamic(
  () =>
    import("@/components/fosshack/geometric-shapes").then(
      (mod) => mod.GeometricShapes,
    ),
  {
    ssr: false,
  },
);

const WinnersCarousel = dynamic(
  () => import("@/components/fosshack/winners-carousel"),
  { ssr: false },
);

const GalleryLightbox = dynamic(
  () => import("@/components/fosshack/gallery-lightbox"),
  { ssr: false },
);

const Section = ({
  children,
  id,
  immediate = false,
  defer = false,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  immediate?: boolean;
  defer?: boolean;
  className?: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-50px 0px",
  });
  const [deferRef, deferred] = useInView({
    triggerOnce: true,
    rootMargin: "600px 0px",
    skip: !defer,
  });

  return (
    <m.section
      id={id}
      ref={ref}
      initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      animate={inView || immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full scroll-mt-24 px-4 py-8 sm:px-6 md:py-12 ${className}`}
    >
      {defer ? (
        <div ref={deferRef} className="w-full">
          {deferred ? children : null}
        </div>
      ) : (
        children
      )}
    </m.section>
  );
};

const AnimatedTitle = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <m.h2
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }} // Your original bouncy ease
      className="text-4xl md:text-5xl font-bold mb-12 text-foreground text-center tracking-tight"
    >
      {children}
    </m.h2>
  );
};
const stats = [
  { label: "Registrations", value: "5430", icon: Users },
  { label: "Projects Submitted", value: "800", icon: Trophy },
  { label: "Prize Pool", value: "₹5,00,000", icon: Trophy },
  { label: "Community Partners", value: "10+", icon: Users },
  { label: "Sponsors", value: "5+", icon: Trophy },
  { label: "Cities Represented", value: "20+", icon: MapPin },
];

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
        y: -8,
        scale: 1.02,
        boxShadow:
          "0 30px 80px -20px rgba(var(--accent-light-green), 0.4), 0 0 45px -10px rgba(var(--accent-light-green), 0.25)",
        borderColor: "rgba(var(--accent-light-green), 0.45)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
      }}
      className={`group relative rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur will-change-transform ${className}`}
      {...motionProps}
    >
      {children}
    </m.div>
  );
}

function GlanceStatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  return (
    <TiltCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      className="p-4 sm:p-8 text-center flex flex-col items-center justify-center"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_0%,rgba(var(--accent-light-green),0.12),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative mx-auto mb-2 sm:mb-4 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-foreground/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-[rgba(var(--accent-light-green),0.1)] group-hover:shadow-[0_0_20px_rgba(var(--accent-light-green),0.3)]">
        <stat.icon className="h-5 w-5 sm:h-7 sm:w-7 text-accent-light-green" />
      </div>
      <div className="relative text-2xl sm:text-3xl font-bold text-foreground">
        {stat.value}
      </div>
      <div className="relative mt-1 sm:mt-2 text-[11px] sm:text-base text-foreground/60 uppercase tracking-wide sm:normal-case sm:tracking-normal">
        {stat.label}
      </div>
    </TiltCard>
  );
}

interface SubEvent {
  title: string;
  tag: string;
  date: string;
  time: string;
  venue?: string;
  speaker?: string;
  desc: string;
  image: string;
  videoUrl?: string;
}

interface EventPhase {
  phase: string;
  intro: string;
  events: SubEvent[];
}

const eventPhases: EventPhase[] = [
  {
    phase: "Orientation & Kickoff",
    intro:
      "We kicked off the month by getting everyone on the same page before the building began.",
    events: [
      {
        title: "Orientation Day",
        tag: "Online",
        date: "March 2, 2026",
        time: "6:00 PM – 7:30 PM",
        desc: "The official kickoff session covering the event flow, team guidelines, submission process, open-source contribution expectations, judging criteria, and support channels, followed by an open Q&A.",
        image: "/fosshack2026/orientation_session.webp",
        videoUrl: "https://www.youtube.com/watch?v=gymuK63aOBA",
      },
    ],
  },
  {
    phase: "Talks & Community",
    intro:
      "Inspiring talks and our first offline community meetup connected hackers with seasoned open-source voices.",
    events: [
      {
        title: "Speaker Session with Pushplata Ranjan",
        tag: "Online",
        date: "March 7, 2026",
        time: "6:00 PM – 7:00 PM",
        speaker: "Pushplata Ranjan · Senior Lead Engineer, R Systems",
        desc: "Pushplata shared insights from her professional journey and hands-on experience working with open-source technologies.",
        image: "/fosshack2026/pushplata.webp",
      },
      {
        title: "FOSS Hack 2026 Offline Community Meetup",
        tag: "Offline",
        date: "March 16, 2026",
        time: "12:30 PM – 4:30 PM",
        venue: "Auditorium, Delhi Technical Campus",
        desc: "Our first offline meetup of the season, an overview of FOSS Hack 2026 and its timeline, followed by a speaker session on OpenStreetMap and the open-source mapping ecosystem to kick off OSM Week.",
        image: "/fosshack2026/first_meetup_fosshack2026.webp",
      },
    ],
  },
  {
    phase: "OSM Week",
    intro:
      "A dedicated week of open mapping workshops and community calls to map our world, together.",
    events: [
      {
        title: "Open Mapping & MapRoulette Workshop",
        tag: "Online",
        date: "March 17, 2026",
        time: "6:00 PM – 8:00 PM",
        speaker: "Kiran Ahire · Community Manager, TomTom",
        desc: "A hands-on online workshop on open mapping and MapRoulette, run in collaboration with TomTom. Participants could win xyz domains, CodeCrafters project courses, and official FOSS Hack tees.",
        image: "/fosshack2026/osmweek_tomtom.webp",
        videoUrl: "https://www.youtube.com/watch?v=Ye5tgol4ZVc",
      },
      {
        title: "OSM Week Community Call: Mapping with Vespucci",
        tag: "Online",
        date: "March 22, 2026",
        time: "6:00 PM IST",
        speaker: "Akbar",
        desc: "An open community call guiding hackers through Vespucci and best practices for mapping effectively on Android, from getting started to accurate field workflows.",
        image: "/fosshack2026/akbar_occ.webp",
        videoUrl: "https://www.youtube.com/watch?v=eohUumvzYrE",
      },
    ],
  },
  {
    phase: "The Final Hack",
    intro:
      "The month-long build came to a close with our final hack day",
    events: [
      {
        title: "The Final Hack",
        tag: "Offline",
        date: "March 31, 2026",
        time: "All Day",
        desc: "The last day of FOSS Hack 2026 and the official closing of the event. Hackers put the finishing touches on their projects, celebrated their work, and wrapped up a month of open-source collaboration.",
        image: "/fosshack2026/finalhack.webp",
        videoUrl: "https://www.youtube.com/watch?v=0EiJ8OAR6oQ",
      },
    ],
  },
  {
    phase: "Post-Event Initiative",
    intro:
      "The impact continues after the hackathon closes.",
    events: [
      {
        title: "Yamuna Basin Flood Mapping Drive",
        tag: "Online",
        date: "April 19, 2026",
        time: "1:30 PM IST",
        desc: "A joint initiative by UN Mappers and The FOSS Club mapping flood-prone villages across the Yamuna Basin to support disaster responders with accurate, real-time data.",
        image: "/fosshack2026/yamuna_mapping.webp",
        videoUrl: "https://www.youtube.com/watch?v=ohtuR4MRKcQ",
      },
    ],
  },
];

const testimonials = [
  {
    quote: "Glad I got to organise a hackathon in my college life, always greateful to The FOSS Club and FOSS UNITED for this oppourtunity",
    author: "Avneesh Kumar",
    role: "Organizer",
  },
  {
    quote: "Greatful for the experience, and even more motivated for what's next",
    author: "Mayank Choubey",
    role: "Participant",
  },
  {
    quote: "A huge thank you to the mentors, organizers, reviewers, and everyone involved in making FOSS Hack 2026 an incredible experience",
    author: "Anshika Yadav",
    role: "Winner",
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zm0 2c-3.2 0-3.5 0-4.7.1-2.1.1-3 1-3.1 3.1-.1 1.2-.1 1.5-.1 4.6s0 3.5.1 4.6c.1 2.1 1 3 3.1 3.1 1.2.1 1.5.1 4.6.1s3.5 0 4.6-.1c2.1-.1 3-1 3.1-3.1.1-1.2.1-1.5.1-4.6s0-3.5-.1-4.6c-.1-2.1-1-3-3.1-3.1-1.1-.1-1.4-.1-4.5-.1zm0 3.4a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8zm0 2a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm5.6-3.5a1.3 1.3 0 1 1 0 2.5 1.3 1.3 0 0 1 0-2.5z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 1.2h3.7l-8.1 9.2L24 22.8h-7.5l-5.8-7.6-6.7 7.6H.3l8.6-9.9L0 1.2h7.7l5.3 7 5.9-7zm-1.3 19.4h2L6.6 3.3H4.4l13.2 17.3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4v6.3zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4z" />
    </svg>
  );
}

const presenceLinks = [
  {
    title: "Instagram",
    desc: "Photos, reels and stories from the event",
    url: "https://instagram.com/thefossclub",
    icon: InstagramIcon,
  },
  {
    title: "X / Twitter",
    desc: "Live updates and highlights",
    url: "https://x.com/TheFOSSClub",
    icon: XIcon,
  },
  {
    title: "LinkedIn",
    desc: "Professional recaps and announcements",
    url: "https://linkedin.com/company/thefossclub",
    icon: LinkedInIcon,
  },
  {
    title: "Discord Server",
    desc: "Join our community",
    url: "https://discord.gg/sjKNEYQPnk",
    icon: MessageCircle,
  },
  {
    title: "Telegram Group",
    desc: "Join our telegram group",
    url: "https://t.me/TheFOSSClub",
    icon: Send,
  },
  {
    title: "LinkTree",
    desc: "Access all our links",
    url: "https://linktr.ee/thefossclub",
    icon: Link2,
  },
];

const socialPosts = [
  {
    image: "/fosshack2026/venue.webp",
    caption: "venue for FOSSHACK 2026 revealed!",
    url: "https://www.instagram.com/p/DULaUzdDYCw",
    platform: "Instagram",
  },
  {
    image: "/fosshack2026/timeline.webp",
    caption: "official timeline for FOSSHACK2026",
    url: "https://www.instagram.com/p/DWWyVZ6AebV",
    platform: "Instagram",
  },
  {
    image: "/fosshack2026/onsight.webp",
    caption: "The Onsite Phase Begins Today",
    url: "https://www.linkedin.com/posts/thefossclub_fosshack2026-fossunited-delhitechnicalcampus-activity-7443486219340267520-d8Wf",
    platform: "LinkedIn",
  },
];

// Event photograph gallery. Add as many photos as you like here.
const galleryImages = [
  { src: "/fosshack2026/register.webp", alt: "Registrations" },
  { src: "/fosshack2026/register2.webp", alt: "Photo Booth" },
  { src: "/fosshack2026/register3.webp", alt: "Photo Booth" },
  { src: "/fosshack2026/register4.webp", alt: "Registrations" },
  { src: "/fosshack2026/cake.webp", alt: "Event photograph" },
  { src: "/fosshack2026/lab2.webp", alt: "Event photograph" },
  { src: "/fosshack2026/lab3.webp", alt: "Event photograph" },
  { src: "/fosshack2026/lab4.webp", alt: "Event photograph" },
  { src: "/fosshack2026/scribble.webp", alt: "Event photograph" },
  { src: "/fosshack2026/cake2.webp", alt: "Cake Cutting and Celebration" },
  { src: "/fosshack2026/jamming2.webp", alt: "Jamming session" },
  { src: "/fosshack2026/jamming3.webp", alt: "Jamming session" },
  { src: "/fosshack2026/food.webp", alt: "Food & breaks" },
  { src: "/fosshack2026/food2.webp", alt: "Food And Refreshments" },
  { src: "/fosshack2026/icards.webp", alt: "I-Cards" },
  { src: "/fosshack2026/jamming.webp", alt: "Amazing Jamming Session" },
];

const sponsors = [
  { name: "TomTom", logo: "/fosshack/TomTom.webp", url: "https://tomtom.com" },
  { name: "XYZ", logo: "/fosshack/XYZ.webp", url: "https://nic.xyz" },
  { name: "Maxflex", logo: "/fosshack/Maxflex.webp", url: "" },
];

function SponsorLogo({
  sponsor,
}: {
  sponsor: (typeof sponsors)[number];
}) {
  return (
    <div className="relative h-[60px] w-full max-w-[150px]">
      <Image
        src={sponsor.logo}
        fill
        sizes="150px"
        alt={sponsor.name}
        className="object-contain"
      />
    </div>
  );
}

const communities = [
  { name: "PyDelhi", logo: "/fosshack/pydelhi_community_logo.webp" },
  { name: "Django India", logo: "/fosshack/djangoi.webp" },
  { name: "FOSS USAR", logo: "/fosshack/Usar.webp" },
  { name: "AIR", logo: "/fosshack/AiR.webp" },
  { name: "ECell", logo: "/fosshack/ecell.webp" },
  { name: "IEEE", logo: "/fosshack/ieee.webp" },
  { name: "ASC", logo: "/fosshack/asc.webp" },
];

const team = [
  { name: "Tanmay Maheshwari", title: "Lead Organizer" },
  { name: "Sanjam Kaur", title: "Decoration" },
  { name: "Jayesh Bisht", title: "Management" },
  { name: "Avneesh Kumar", title: "Lead Origanizer, Community Manager & Campus Ambassador" },
  { name: "Aditya Sachdeva", title: "Graphic Designer" },
  { name: "Nitya Kapoor", title: "Graphics & Content Head" },
  { name: "Adarsh Sen", title: "Social Media Lead" },
  { name: "Krish Gupta", title: "Event Manager" },
  { name: "Manya Yadav", title: "PR & Outreach Head" },
  { name: "Bhumi Aggarwal", title: "Logistics Head" },
  { name: "Aditya Singh", title: "Event Manager" },
  { name: "Anmol Upadhyay", title: "Video Editor"},
  { name: "Satyam Raj", title: "Photographer" },
  { name: "Harshit Vashisht", title: "Campus Ambassador"},
  { name: "Kartik Gupta", title: "Community Manager"},
  { name: "Ishita Kaushik", title: "Social Media" },
];

const volunteers = [
    { name: "Sejal Madaan", title: "Photographer"},
    { name: "Prakhar Sharma", title: "Campus Ambassador, Graphic Designer, Management, Decoration, Photographer, OS Contributor"},
    { name: "Tooshar Bhardwaj", title: "OS Contributor, Content Writer, Management"},
    { name: "Shivani Kumari Mishra", title: "Anchor, Discipline, Decoration"},
    { name: "Aanya", title: "Discipline, Decoration"},
    { name: "Tripta Taneja", title: "Discipline, Decoration"},
    { name: "Priyal", title: "Discipline, Decoration"},
    { name: "Krishna", title: "Discipline, Decoration"},
    { name: "Dishant", title: "Discipline"},
    { name: "Sohendrajeet", title: "Discipline, Decoration"},
    { name: "Utkarsh Gupta", title: "Photographer"},
    { name: "Vanshika", title: "Photographer"},
    { name: "Harsh Thakur", title: "Decoration"},
    { name: "Aashita", title: "Decoration"},
    { name: "Sangam", title: "Decoration"},
    { name: "Lucky", title: "Decoration"},
    { name: "Rachna", title: "Decoration"},
    { name: "Rohini", title: "Decoration"},
]

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBgReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
    <div className="bg-background text-foreground text-lg relative overflow-hidden">
      <FosshackArchiveNavbar />

      {bgReady && (
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicGeometricShapes />
        </Suspense>
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-10 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all bg-background/80 text-foreground border border-foreground/20 shadow-lg hover:bg-background"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <Section id="overview" immediate className="min-h-[90vh] flex flex-col justify-center pt-24 pb-12">
        <div className="text-center max-w-5xl mx-auto relative z-10 w-full">
          <m.div
            className="space-y-8"
            initial={{ y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <m.h1
              className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-foreground tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              FOSSHack 2026
            </m.h1>
            <m.p
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-light-green"
              initial={{ y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1 }}
            >
              That&apos;s a Wrap!
            </m.p>
            <m.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-base sm:text-lg text-foreground/70"
              initial={{ y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>March 1-31, 2026</span>
              </div>
              <div className="hidden sm:block text-xl opacity-50">•</div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5" />
                <span>Delhi Technical Campus</span>
              </div>
            </m.div>
            <m.p
              className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground/80 px-4"
              initial={{ y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              India&apos;s Biggest FOSS Hackathon came to Delhi-NCR. A huge
              thanks to every participant, mentor, sponsor and community
              partner who made this month of open-source magic possible.
            </m.p>
            <m.div
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
              initial={{ y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <Link
                href="#journey"
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 text-base font-semibold rounded-full overflow-hidden text-background transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-green),0.6)] focus-visible:ring-offset-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 rounded-full bg-foreground" />
                <span className="relative flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  View Highlights
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="#winners"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-full overflow-hidden text-foreground border border-foreground/20 bg-background/50 backdrop-blur transition-all duration-300 hover:border-foreground/50 hover:bg-background/80 hover:-translate-y-0.5"
              >
                <span className="relative flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  See Winners
                </span>
              </Link>
            </m.div>
            <div className="relative mx-auto mt-12 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl border border-foreground/10 shadow-2xl">
              <picture>
                <source media="(max-width: 640px)" srcSet="/fosshack2026/FOSSHack2026-main-mobile.webp" />
                <img
                  src="/fosshack2026/FOSSHack2026-main.webp"
                  alt="FOSSHack 2026 main photograph"
                  width={1200}
                  height={798}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
              <span className="absolute top-4 right-4 rounded-full border border-accent-purple/30 bg-accent-purple/20 px-3 py-1 text-xs font-semibold text-accent-purple backdrop-blur">
                Hybrid
              </span>
            </div>
          </m.div>
        </div>
      </Section>

      <Section id="stats" defer>
          <div className="w-full max-w-5xl mx-auto relative z-10">
            <AnimatedTitle>Event At a Glance</AnimatedTitle>
            <m.div
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <GlanceStatCard key={stat.label} stat={stat} index={index} />
              ))}
            </m.div>
          </div>
        </Section>
      <Section id="journey" defer>
        <div className="w-full max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>The Journey</AnimatedTitle>
          <m.p
            className="text-center text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto -mt-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            A month of building, learning, and mapping
          </m.p>

          <div className="space-y-12">
            {eventPhases.map((phase, phaseIndex) => (
              <m.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                <div className="mb-4 flex flex-col items-center gap-2 text-center">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-light-green">
                    {phase.phase}
                  </h3>
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
                </div>
                <p className="mb-8 text-base text-foreground/60 text-center max-w-2xl mx-auto">{phase.intro}</p>

                <div className="flex flex-wrap justify-center gap-6">
                  {phase.events.map((event, index) => (
                    <TiltCard
                      key={event.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      className="w-full md:w-[calc(50%-12px)] flex flex-col"
                    >
                      <div className="relative overflow-hidden aspect-video rounded-t-2xl">
                        <Image
                          src={event.image}
                          alt={`${event.title} photo`}
                          width={640}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className={`absolute top-4 right-4 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur ${
                            event.tag === "Online"
                              ? "bg-accent-light-green/20 text-accent-light-green border border-accent-light-green/30"
                              : "bg-accent-green/20 text-accent-green border border-accent-green/30"
                          }`}
                        >
                          {event.tag}
                        </span>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-2 text-xs text-foreground/60 mb-3 uppercase tracking-wider">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{event.date}</span>
                          <span>•</span>
                          <span>{event.time}</span>
                        </div>
                        <h4 className="text-xl font-bold mb-3 text-foreground leading-snug">
                          {event.title}
                        </h4>
                        {event.speaker && (
                          <div className="flex items-center gap-2 text-sm text-foreground/70 mb-2">
                            <Users className="w-3.5 h-3.5 text-accent-light-green" />
                            <span>{event.speaker}</span>
                          </div>
                        )}
                        {event.venue && (
                          <div className="flex items-center gap-2 text-sm text-foreground/70 mb-3">
                            <MapPin className="w-3.5 h-3.5 text-accent-green" />
                            <span>{event.venue}</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed text-foreground/70 flex-grow">
                          {event.desc}
                        </p>
                        {event.videoUrl && (
                          <a
                            href={event.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light-green transition-colors hover:text-foreground"
                          >
                            <Play className="h-3.5 w-3.5" />
                            Watch the session
                          </a>
                        )}
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="gallery" defer>
        <div className="w-full max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Photo Gallery</AnimatedTitle>
          <m.p
            className="text-center text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto -mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            A collection of our favourite moments from FOSS Hack 2026.
          </m.p>
          <div className="relative">
            <m.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              {galleryImages
                .slice(0, showAllGallery ? galleryImages.length : 8)
                .map((img, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border border-foreground/10 aspect-square cursor-pointer transition-transform duration-500 hover:scale-[1.02] shadow-sm"
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
            </m.div>

            {!showAllGallery && galleryImages.length > 8 && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-background via-background/40 to-transparent rounded-xl"
              >
                <button
                  onClick={() => setShowAllGallery(true)}
                  className="pointer-events-auto mb-8 flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-2.5 text-sm font-semibold text-foreground bg-background/80 backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-background shadow-sm"
                >
                  Show More
                  <ArrowDown className="h-4 w-4" />
                </button>
              </m.div>
            )}

            {showAllGallery && galleryImages.length > 8 && (
              <m.button
                onClick={() => setShowAllGallery(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-2.5 text-sm font-semibold text-foreground bg-background/50 backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-background shadow-sm"
              >
                Show Less
                <ArrowUp className="h-4 w-4" />
              </m.button>
            )}
          </div>
        </div>

        {activeImage !== null && (
          <GalleryLightbox
            images={galleryImages}
            activeIndex={activeImage}
            onClose={() => setActiveImage(null)}
          />
        )}
      </Section>

      <Section id="winners" defer>
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <AnimatedTitle>Winners & Projects</AnimatedTitle>
          <WinnersCarousel />
        </div>
      </Section>

      <Section id="testimonials" defer>
        <div className="w-full max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>What People Said</AnimatedTitle>
          <m.div
            className="flex w-full overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="flex-none w-[85vw] sm:w-[350px] snap-center rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur p-6 sm:p-8 flex flex-col shadow-sm"
              >
                <Quote className="h-6 w-6 mb-4 text-accent-light-green opacity-80" />
                <p className="flex-1 text-base leading-relaxed text-foreground/80 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-foreground/5">
                  <div className="font-semibold text-sm">{t.author}</div>
                  <div className="text-xs text-foreground/50 tracking-wide uppercase mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </m.div>
        </div>
      </Section>

      <Section id="posts" defer>
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Our Posts</AnimatedTitle>
          <m.p
            className="text-center text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto -mt-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            A few moments we shared online.
          </m.p>
          <m.div 
            className="flex w-full overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            {socialPosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none w-[85vw] sm:w-[320px] snap-center group rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur overflow-hidden hover:border-foreground/30 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md"
              >
                <div className="overflow-hidden aspect-square relative border-b border-foreground/5">
                  <Image
                    src={post.image}
                    alt={post.caption}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-accent-light-green mb-1.5">
                    {post.platform}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80 flex-1">
                    {post.caption}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-foreground/50 group-hover:text-foreground transition-colors">
                    View Post
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            ))}
          </m.div>
        </div>
      </Section>
 
      <Section id="credits" defer>
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Our Sponsors & Communities</AnimatedTitle>

          <m.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="rounded-2xl border border-foreground/10 bg-white p-4 flex items-center justify-center min-h-[70px] w-[calc(33.33%-12px)] sm:w-[calc(25%-18px)] shadow-sm"
              >
                {sponsor.url ? (
                  <Link
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${sponsor.name}`}
                    className="contents"
                  >
                    <SponsorLogo sponsor={sponsor} />
                  </Link>
                ) : (
                  <SponsorLogo sponsor={sponsor} />
                )}
              </div>
            ))}
          </m.div>

          <m.div
            className="flex w-full overflow-x-auto gap-4 sm:gap-6 mb-12 pb-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {communities.map((community, index) => (
              <div
                key={index}
                className="flex-none w-[140px] sm:w-[160px] snap-center rounded-xl bg-background/50 backdrop-blur flex flex-col items-center justify-center border border-foreground/10 p-4 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div className="relative w-full h-12 mb-2">
                  <Image
                    src={community.logo}
                    fill
                    sizes="120px"
                    alt={community.name}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xs font-medium text-foreground text-center">
                  {community.name}
                </h3>
              </div>
            ))}
          </m.div>
        </div>
      </Section>

      <Section id="team" defer>
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Thank You, Team</AnimatedTitle>
          <m.p
            className="text-center text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto -mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            None of this would have been possible without our incredible
            organizing team.
          </m.p>
          <m.div
            className="flex w-full overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {team.map((member, i) => (
              <div key={i} className="flex-none w-[120px] sm:w-[140px] snap-start text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-full flex items-center justify-center bg-foreground/5 border border-foreground/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-foreground/10 group-hover:border-foreground/20">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-foreground/70 group-hover:text-foreground" />
                </div>
                <h3 className="text-sm font-semibold mb-0.5 text-foreground leading-snug">
                  {member.name}
                </h3>
                <p className="text-[11px] text-foreground/50 px-1">{member.title}</p>
              </div>
            ))}
          </m.div>
        </div>
      </Section>

     <Section id="volunteers" defer>
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>New Faces</AnimatedTitle>
          <m.p
            className="text-center text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto -mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Thank you for your Contribution!
          </m.p>
          <m.div
            className="flex w-full overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {volunteers.map((member, i) => (
              <div key={i} className="flex-none w-[120px] sm:w-[140px] snap-start text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-full flex items-center justify-center bg-foreground/5 border border-foreground/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-foreground/10 group-hover:border-foreground/20">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-foreground/70 group-hover:text-foreground" />
                </div>
                <h3 className="text-sm font-semibold mb-0.5 text-foreground leading-snug">
                  {member.name}
                </h3>
                <p className="text-[11px] text-foreground/50 px-1">{member.title}</p>
              </div>
            ))}
          </m.div>
        </div>
      </Section>

      <m.footer
          className="relative z-10 border-t border-foreground/10 bg-background/80 backdrop-blur-md py-10 sm:py-14 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-foreground mb-1">Our Online Presence</h3>
                <p className="text-sm text-foreground/60">Stay connected with the community and relive the moments.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {presenceLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.title}
                    title={link.title}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 transition-all duration-300 hover:scale-110 hover:bg-foreground/10 hover:border-foreground/20 hover:text-accent-light-green shadow-sm"
                  >
                    <link.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="h-px w-full bg-foreground/10" />
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/60 gap-3 text-center sm:text-left">
              <p>
                &copy; 2026 FOSS Hack Delhi-NCR. All rights reserved.
              </p>
              <p className="flex items-center gap-1.5">
                Made with <span className="text-green-500">❤</span> by The FOSS Club
              </p>
            </div>
          </div>
        </m.footer>
      </div>
    </LazyMotion>
  );
}

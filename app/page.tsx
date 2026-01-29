"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Github, Instagram, Linkedin, Twitter, ChevronDown, ChevronUp } from "lucide-react"
import { FaDiscord } from "react-icons/fa"
import Navbar from "@/components/navbar"
import ProjectCard from "@/components/project-card"
import EventCard from "@/components/event-card"
import TeamMember from "@/components/team-member"
import BlogPost from "@/components/blog-post"
import GridBackground from "@/components/grid-background"
import HeroSphere from "@/components/hero-sphere"
import Timeline from "@/components/timeline"
import ScrollingTools from "@/components/scrolling-tools"
import { useTheme } from "next-themes"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const [coreTeamExpanded, setCoreTeamExpanded] = useState(true)
  const [membersExpanded, setMembersExpanded] = useState(false)
  const [MentorsExpanded, setMentorsExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    events: useRef<HTMLElement>(null),
    team: useRef<HTMLElement>(null),
    resources: useRef<HTMLElement>(null),
  }

  // Optimized scroll handler that works with Lenis
  const currentSectionRef = useRef(activeSection)
  
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const scrollPosition = scrollY + 100
        const sections = Object.keys(sectionRefs) as Array<keyof typeof sectionRefs>

        // Update active section - only if changed
        for (const sectionName of sections) {
          const ref = sectionRefs[sectionName].current
          if (ref) {
            if (scrollPosition >= ref.offsetTop && scrollPosition < ref.offsetTop + ref.offsetHeight) {
              // Only update state if section actually changed
              if (currentSectionRef.current !== sectionName) {
                currentSectionRef.current = sectionName
                setActiveSection(sectionName)
              }
              break
            }
          }
        }

        // Hero parallax effect - direct DOM manipulation for performance
        if (heroRef.current) {
          const opacity = Math.max(0, 1 - scrollY / 300)
          const scale = Math.max(0.9, 1 - scrollY / 3000)
          heroRef.current.style.opacity = String(opacity)
          heroRef.current.style.transform = `scale(${scale}) translateZ(0)`
        }
        
        ticking = false
      })
    }

    // Use Lenis scroll event if available
    // @ts-expect-error - lenis is added to window
    const lenis = window.lenis
    
    if (lenis) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    // Force a theme update to fix initial font color issues
    const currentTheme = theme || "dark"
    setTheme(currentTheme)
  }, [theme, setTheme])

  const projects = [
    {
      title: "Passvyn",
      description: "A Python-based secured password manager which is highly secured using SHA256.",
      link: "https://github.com/thefossclub/Passvyn",
    },
    {
      title: "face-recognition",
      description:
        "Face Recognition code which detects faces on live cameras implemented using OpenCV and DLib in Python and C++.",
      link: "https://github.com/thefossclub/face-recognition",
    },
    {
      title: "SafePath",
      description:
        "SafePath is an intelligent navigation platform helps users choose safer routes instead of just faster ones.",
      link: "https://github.com/thefossclub/SafePath",
    },
  ]

  const events = [
    {
      title: "Introduction to FOSS",
      date: "December 24, 2023",
      description:
        "Conducted an event on the basic fundamentals of FOSS and educated students about the key terms used in the world of open source.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Linux Installation & the Power of Command Line",
      date: "February 15, 2024",
      description:
        "Hands-on workshop on Linux installation, configuration, and basic CLI commands.",
      image: "/Linux_installation.jpeg?height=300&width=400",
    },
    {
      title: "How_To?",
      date: "April 15, 2024",
      description:
        "Conference with talks, workshops, and networking with industry experts.",
      image: "/How_to.jpeg?height=300&width=400",
    },
    {
      title: "FOSS Hack '24",
      date: "July 27, 2024",
      description:
        "Hackathon for students to develop innovative tech solutions with mentorship.",
      image: "/Hack24.jpg?height=300&width=400",
    },
    {
      title: "Incepta (Introductory Event)",
      date: "October 14, 2024",
      description:
        "Introductory event for first-year students on open source, AI, and entrepreneurship.",
      image: "/incepta.jpeg?height=300&width=400",
    },
    {
      title: "Capture The Flag (CTF – Technovate)",
      date: "October 24, 2024",
      description:
        "Competitive cybersecurity event with challenges to test students’ skills.",
      image: "/Technovate.jpeg?height=300&width=400",
    },
    {
      title: "FOSS Hack '25",
      date: "February 22-23, 2025",
      description:
        "National-level hybrid hackathon for innovative open-source solutions.",
      image: "/Hack25.jpg?height=300&width=400",
    },
    {
      title: "Lumexis: Interactive session on Git & Open-Source Alternatives",
      date: "September 2, 2025",
      description:
        "A hands-on session where you’ll install Linux, learn how it works, and understand why so many developers swear by it.",
      image: "/lumexis.jpg?=300&width=400",
    },
    {
      title: "SecureCon",
      date: "October 8, 2025",
      description:
        " A Cybersecurity Event having an Speaker session and Hands-on covering Port-Scanning, SQLinjection and Brute-Force.",
      image: "/SecureCon.jpg?height=300&width=400",
    },
    {
      title: "Unlocking TUX: Linux Installation Party",
      date: "October 15, 2025",
      description:
        "A hands-on session where you’ll install Linux, learn how it works, and understand why so many developers swear by it.",
      image: "/Unlocking-TUX-Linux-Installation-Party.jpg?=300&width=400",
    },
  ]

  const Mentors = [
    { name: "Vaibhav Pratap Singh", role: "CEH", color: "bg-yellow-500", link: "https://v8v88v8v88.com" },
    { name: "Diti Vasisht", role: "AI/ML specialist", color: "bg-violet-500", link: "https://diti.is-a.dev" },
    { name: "Ashwany Kumar Sharma", role: "WEB Dev", color: "bg-purple-500", link: "https://ashwanyksharma.github.io/" },
  ]
  
  const coreTeam = [
    { name: "Ms. Eirty Telang Kapoor", role: "Convenor", color: "bg-orange-500" },
    {
      name: "Tanmay Maheshwari",
      role: "Lead",
      color: "bg-yellow-500",
      link: "https://lilsuperuser.github.io/",
    },
    {
      name: "Sanjam Kaur",
      role: "Co-Lead",
      color: "bg-blue-500",
      link: "https://sanjammkaurr.github.io/",
    },
    {
      name: "Jayesh Bisht",
      role: "Secretary",
      color: "bg-emerald-500",
      link: "https://deevi-conf.github.io/personal-clay-website/",
    },
    {
      name: "Avneesh Kumar",
      role: "Community Manager",
      color: "bg-green-500",
      link: "https://my-website-seven-self-94.vercel.app/",
    },
    {
      name: "Aditya Sachdeva",
      role: "Graphic Designer",
      color: "bg-sky-500",
      link: "https://adi-333.github.io/Portfolio-2/potfolio2/index.html",
    },
    {
      name: "Nitya Kapoor",
      role: "Graphic Designer",
      color: "bg-lime-500",
      link: "https://lishhgoyo.github.io/",
    },
    {
      name: "Krish Gupta",
      role: "Event Manager",
      color: "bg-red-500",
      link: "https://akris.is-a.dev",
    },
    {
      name: "Bhumi Aggarwal",
      role: "Event Manager",
      color: "bg-indigo-500",
      link: "https://bhumiaggarwal.github.io/my-website/",
    },
    {
      name: "Aditya Singh",
      role: "Event Manager",
      color: "bg-teal-500",
      link: "https://example.com/adityasingh",
    },
    {
      name: "Harshit Vashisht",
      role: "Event Manager",
      color: "bg-cyan-500",
      link: "https://iamhv856156.github.io/Hv_Garage/",
    },
    {
      name: "Kartik Gupta",
      role: "PR & Outreach",
      color: "bg-amber-500",
      link: "https://kartikportfolio0105.netlify.app/",
    },
    {
      name: "Aditya Mishra",
      role: "PR & Outreach",
      color: "bg-emerald-700",
      link: "https://adityamishra-github-io.vercel.app/",
    },
    {
      name: "Anmol Upadhyay",
      role: "Event Manager",
      color: "bg-purple-500",
      link: "https://anmol1789-github-io.vercel.app/",
    },
    {
      name: "Manya Yadav",
      role: "PR & Outreach",
      color: "bg-blue-700",
      link: "https://manya921.github.io/manyaport/",
    },
    {
      name: "Satyam Raj",
      role: "Videographer (DOP)",
      color: "bg-fuchsia-700",
      link: "https://portfolio-8pl7.vercel.app/",
    },
    {
      name: "Ishita Kaushik",
      role: "Social Media Manager",
      color: "bg-orange-600",
      link: "https://cyber-portfolio-bytes.lovable.app/",
    },
  ]

  const tools = [
    { name: "Git", description: "Distributed version control system", icon: "git-branch" },
    { name: "Linux", description: "Open source operating system", icon: "terminal" },
    { name: "VS Code", description: "Free source-code editor", icon: "code" },
    { name: "PostgreSQL", description: "Open source relational database", icon: "database" },
    { name: "Docker", description: "Containerization platform", icon: "box" },
    { name: "Kubernetes", description: "Container orchestration", icon: "layers" },
    { name: "Node.js", description: "JavaScript runtime", icon: "server" },
    { name: "Python", description: "Programming language", icon: "code-2" },
  ]

  const timelineEvents = [
    { year: "2022", title: "Idea Initiated" },
    { year: "2023", title: "Club Created in DTC" },
    { year: "2024", title: "Conducted 7+ Major Events" },
    { year: "2025", title: "Organized 2 (36 Hours) FOSS Hacks" },
    { year: "2025", title: "Joined FOSS United" },
  ]

  return (
    <div
      className="relative min-h-screen overflow-hidden text-black dark:text-white"
    >
      <GridBackground />
      <Navbar activeSection={activeSection} />
      <ScrollProgressIndicator />

      {/* Hero Section */}
      <section
        ref={(el) => {
          sectionRefs.home.current = el
          heroRef.current = el
        }}
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden z-10 px-2 sm:px-4 lg:px-8 will-change-[transform,opacity]"
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center hidden md:flex">
          <HeroSphere />
        </div>

        <div className="container mx-auto z-10 flex flex-col md:flex-row items-center justify-between px-2 sm:px-4 lg:px-8">
          {/* Hero Text Container */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-2 sm:px-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1,
                }
              }
            }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-green"
              variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
            >
              Welcome to The FOSS Club!
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-foreground"
              variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
            >
              <span className="font-semibold">Learn, build, and collaborate</span> with fellow open-source enthusiasts.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <Link
                href="https://opnform.com/forms/the-foss-club-registration-nst4zs"
                target="_blank"
                className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-gradient-green text-white rounded-full font-medium text-base md:text-lg hover:opacity-90 hover:brightness-110 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
              >
                Join Now <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 mt-8 md:mt-0 relative px-2 sm:px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            {/* Add keyframes and styles for hover effects */}
            <style jsx>{`
              @keyframes sweep {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              @keyframes rotateGlow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .wafer-circle {
                position: relative; /* Needed for pseudo-elements */
                transition: transform 0.3s ease-out; /* Subtle scale on hover */
              }
              .wafer-circle:hover {
                 transform: scale(1.03); /* Slightly enlarge on hover */
              }
              .wafer-bg::before, .wafer-bg::after {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                border-radius: 50%;
                opacity: 0;
                pointer-events: none; /* Prevent pseudo-elements interfering */
                transition: opacity 0.4s ease-in-out;
              }
              /* Sweeping Shine */
              .wafer-bg::before {
                background: linear-gradient(100deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
                transform: translateX(-100%);
                z-index: 2; /* Above pattern, below text */
              }
              .wafer-circle:hover .wafer-bg::before {
                opacity: 1;
                animation: sweep 1s ease-in-out infinite; 
              }
              /* Rotating Circumference Glow */
              .wafer-bg::after {
                background: radial-gradient(circle at center top, rgba(255, 255, 255, 0.6) 0%, transparent 40%);
                z-index: 1; /* Below sweeping shine */
                animation: rotateGlow 5s linear infinite paused; /* Paused initially */
              }
               .wafer-circle:hover .wafer-bg::after {
                 opacity: 0.6; /* Make glow visible */
                 animation-play-state: running; /* Run animation on hover */
               }
              .wafer-pattern {
                 opacity: 0.2; /* Further reduced pattern opacity */
              }
              .wafer-text {
                 text-shadow: 0 1px 4px rgba(0,0,0,0.6); /* Softened text shadow */
              }
            `}</style>

            {/* Apply class to the main container for hover targeting */}
            {/* Restored size */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto wafer-circle">
              {/* Base background, pattern container, and pseudo-elements */}
              <div
                className="absolute inset-0 rounded-full shadow-xl shadow-green-400/30 overflow-hidden wafer-bg"
                style={{
                  // Use #17a54b as the main highlight color
                  background: 'radial-gradient(circle, #17a54b 0%, rgba(15, 100, 50, 1) 100%)',
                }}
              >
                {/* Static Metallic Sheen - Adjusted angle */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, transparent 50%)' }}></div>

                {/* Wafer Pattern Overlay */}
                <div
                  className="absolute inset-0 wafer-pattern"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0, rgba(0, 0, 0, 0.4) 15px, transparent 15px, transparent 30px),
                      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0, rgba(0, 0, 0, 0.4) 15px, transparent 15px, transparent 30px),
                      repeating-linear-gradient(0deg, rgba(20, 80, 45, 0.6) 0, rgba(20, 80, 45, 0.6) 1px, transparent 1px, transparent 5px),
                      repeating-linear-gradient(90deg, rgba(20, 80, 45, 0.6) 0, rgba(20, 80, 45, 0.6) 1px, transparent 1px, transparent 5px)
                    `,
                    backgroundSize: '30px 30px, 30px 30px, 5px 5px, 5px 5px',
                  }}
                ></div>
                {/* Refined Edge - Subtle dark inner shadow */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                  }}
                ></div>
              </div>
              {/* Text container */}
              <div className="absolute inset-0 flex items-center justify-center text-center p-6 z-10"> {/* Restored padding */}
                {/* Restored text size */}
                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white wafer-text">
                  Free & Open Source and Hacker Culture at DTC
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block animate-bounce"
        >
          <ArrowRight className="h-8 w-8 rotate-90 text-green-500 drop-shadow-md" />
        </div>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} id="about" className="py-10 sm:py-16 md:py-20 relative z-10 px-2 sm:px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green">
            About Us
          </h2>

          <div className="max-w-full sm:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 rounded-3xl border border-border bg-card shadow-lg">
            <p className="text-base sm:text-lg mb-6 md:mb-8 leading-relaxed text-foreground">
              The FOSS Club is a student community-based group in the{" "}
              <a
                href="https://delhitechnicalcampus.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:underline font-semibold"
              >
                Delhi Technical Campus
              </a>{" "}
              for enthusiasts focused on contributing to
              <span className="relative mx-2 text-green-500 font-bold group">
                Free and Open Source Software
                <span className="absolute opacity-0 group-hover:opacity-100 bg-gray-900 dark:bg-gray-900 text-xs text-white p-2 rounded -bottom-8 left-0 transition-opacity duration-300 shadow-lg">
                  Yes! That's the full form of FOSS
                </span>
              </span>
              and mentoring students to achieve excellence in various fields of Computer Science.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green-dark">
              Core Pillars
            </h3>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-foreground">
              <li className="p-3 md:p-4 bg-primary/10 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 hover:translate-x-2 transition-all text-sm sm:text-base">
                <strong className="text-foreground mr-1">Open Source:</strong> The FOSS Club promotes open-source
                software, FOSS philosophy, self-hosting, Linux, and collaborative development.
              </li>
              <li className="p-3 md:p-4 bg-primary/10 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 hover:translate-x-2 transition-all text-sm sm:text-base">
                <strong className="text-foreground mr-1">Cyber Security:</strong> The FOSS Club explores ethical hacking,
                CTFs, reverse engineering, digital privacy, OSINT, and cybersecurity research.
              </li>
              <li className="p-3 md:p-4 bg-primary/10 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 hover:translate-x-2 transition-all text-sm sm:text-base">
                <strong className="text-foreground mr-1">Hardware:</strong> The FOSS Club will focus on self-hosted
                systems, open hardware, embedded devices, SBCs (like Raspberry Pi and RISC-V boards), firmware hacking,
                retro computing, and all the cool hardware stuff.
              </li>
            </ul>
          </div>

          <div className="mt-10 sm:mt-16 md:mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground drop-shadow-md">
              Our Timeline
            </h3>
            <Timeline events={timelineEvents} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} id="projects" className="py-10 sm:py-16 md:py-20 relative z-10 px-2 sm:px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green">
            Our Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                link={project.link}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section ref={sectionRefs.events} id="events" className="py-10 sm:py-16 md:py-20 relative z-10 px-2 sm:px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green">
            Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                description={event.description}
                image={event.image}
                index={index}
              />
            ))}
          </div>

          {/*<motion.div
            className="mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 rounded-3xl border border-green-900/50 bg-gradient-to-r from-green-900/10 to-green-900/30 dark:from-green-900/30 dark:to-green-900/50 shadow-xl shadow-green-500/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col items-center text-center gap-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gradient-green ">
                Upcoming Event
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gradient-green drop-shadow-md">
                  SecureCon
                </h3>
                <div className="mb-4 flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    Oct 8, 2025
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5V4a2 2 0 00-2-2H4a2 2 0 00-2 2v16h5"/></svg>
                    Offline
                  </span>
                </div>
                <p className="text-base sm:text-lg mb-4 text-gray-700 dark:text-gray-300">
                  A Hands-on Cybersecurity session where we’ll dive into the basics of networking protocols, play around with nmap and explore brute force and WPScan in action.
                  A Hands-on Cybersecurity session where we’ll dive into the basics of networking protocols, play around with nmap and explore brute force and WPScan in action.
                </p>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-gradient-green-light drop-shadow-sm">
                  What's in store?
                </h4>
                <ul className="space-y-1.5 md:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 pl-2">
                  <li>• Expert talks</li>
                  <li>• Networking basics: TCP, UDP, ICMP, SSH, Telnet</li>
                  <li>• Brute force attack demos</li>
                  <li>• Scanning & mapping with nmap</li>
                  <li>• Password cracking</li>
                  <li>• SQL injection</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src="/SecureCon.jpeg"
                  alt="SecureCon"
                  className="rounded-xl shadow-2xl w-full max-w-md h-auto max-h-64 sm:max-h-80 object-cover border border-green-900/30"
                />
              </div>
            </div>
          </motion.div>*/}
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-10 sm:py-16 md:py-20 relative overflow-hidden z-10 px-2 sm:px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green">
            Open Source Tools We Love
          </h2>

          <ScrollingTools tools={tools} />
        </div>
      </section>

      {/* Team Section */}
      <section ref={sectionRefs.team} id="team" className="py-10 sm:py-16 md:py-20 relative z-10 px-2 sm:px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green">
            Our Team
          </h2>

          {/* Mentors Section */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-green-500">
                Mentors
              </h3>
              <button
                onClick={() => setMentorsExpanded(!MentorsExpanded)}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-green text-white rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all"
                style={{
                  boxShadow:
                    mounted
                      ? theme === "dark"
                        ? "0 0 15px rgba(34, 179, 79, 0.5)"
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                      : undefined,
                }}
              >
                {MentorsExpanded ? (
                  <>
                    <span>Collapse</span>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Expand</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {MentorsExpanded && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
                {Mentors.map((Mentors, index) => (
                  <a
                    key={index}
                    href={Mentors.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full hover:scale-105 transition-transform"
                    style={{ pointerEvents: "auto" }}
                  >
                    <TeamMember
                      name={Mentors.name}
                      role={Mentors.role}
                      color={Mentors.color}
                      index={index}
                    // pointer-events handled by parent
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Core Team Section */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-green-500">
                Core-Team
              </h3>
              <button
                onClick={() => setCoreTeamExpanded(!coreTeamExpanded)}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-green text-white rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all"
                style={{
                  boxShadow:
                    mounted
                      ? theme === "dark"
                        ? "0 0 15px rgba(34, 179, 79, 0.5)"
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                      : undefined,
                }}
              >
                {coreTeamExpanded ? (
                  <>
                    <span>Collapse</span>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Expand</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {coreTeamExpanded && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
                {coreTeam.map((member, index) => (
                  <a
                    key={index}
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full hover:scale-105 transition-transform"
                    style={{ pointerEvents: "auto" }}
                  >
                    <TeamMember
                      name={member.name}
                      role={member.role}
                      color={member.color}
                      index={index}
                    // pointer-events handled by parent
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Members Section 
          <div>
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <motion.h3
                className="text-xl sm:text-2xl font-bold text-green-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Members
              </motion.h3>
              <button
                onClick={() => setMembersExpanded(!membersExpanded)}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-green text-white rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition-all"
                style={{
                  boxShadow:
                    mounted
                      ? theme === "dark"
                        ? "0 0 15px rgba(34, 179, 79, 0.5)"
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                      : undefined,
                }}
              >
                {membersExpanded ? (
                  <>
                    <span>Collapse</span>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Expand</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {membersExpanded && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {members.map((member, index) => (
                  <TeamMember
                    key={index}
                    name={member.name}
                    role={member.role}
                    color={member.color}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>*/}
        </div>
      </section>

      {/* Resources Section */}
      <section ref={sectionRefs.resources} id="resources" className="py-10 sm:py-16 md:py-20 relative z-10 px-2 sm:px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green">
            Resources
          </h2>

          <div className="max-w-full sm:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 rounded-3xl border border-border bg-card shadow-lg">
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <li className="p-3 md:p-4 bg-primary/10 rounded-2xl transition-all shadow-sm hover:shadow-md hover:translate-x-1">
                <Link
                  href="https://github.com/thefossclub/resources#unlock-the-web-frontend--backend-secrets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-foreground hover:text-primary transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Web Development Fundamentals (Frontend & Backend)
                </Link>
              </li>
              <li className="p-3 md:p-4 bg-primary/10 rounded-2xl transition-all shadow-sm hover:shadow-md hover:translate-x-1">
                <Link
                  href="https://github.com/thefossclub/resources#level-up-your-game-dev-journey-starts-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-foreground hover:text-primary transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Introduction to Game Development Concepts
                </Link>
              </li>
              <li className="p-3 md:p-4 bg-primary/10 rounded-2xl transition-all shadow-sm hover:shadow-md hover:translate-x-1">
                <Link
                  href="https://github.com/thefossclub/resources#mobile-mastery-build-your-first-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-foreground hover:text-primary transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Mobile Application Development Resources
                </Link>
              </li>
              <li className="p-3 md:p-4 bg-primary/10 rounded-2xl transition-all shadow-sm hover:shadow-md hover:translate-x-1">
                <Link
                  href="https://github.com/thefossclub/resources#linux-command-line--version-control"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-foreground hover:text-primary transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Linux, Command Line Interface, and Git Essentials
                </Link>
              </li>
              <li className="p-3 md:p-4 bg-primary/10 rounded-2xl transition-all shadow-sm hover:shadow-md hover:translate-x-1">
                <Link
                  href="https://github.com/thefossclub/resources#cybersecurity--ethical-hacking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-foreground hover:text-primary transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Cybersecurity and Ethical Hacking Principles
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-10 sm:py-16 md:py-20 relative z-10 px-2 sm:px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green">
            Frequently Asked Questions
          </h2>

          <div className="max-w-full sm:max-w-4xl mx-auto space-y-2 sm:space-y-4 md:space-y-6">
            <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-md transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">What is FOSS?</h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-4 md:p-6 pt-0 border-t border-border text-sm sm:text-base">
                  <p className="text-muted-foreground">
                    FOSS stands for Free and Open Source Software. It refers to software that is freely available for
                    use, modification, and distribution.
                  </p>
                </div>
              </details>
            </div>

            <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-md transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    How can I join the FOSS Club?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-4 md:p-6 pt-0 border-t border-border text-sm sm:text-base">
                  <p className="text-muted-foreground">
                    You can join our club by filling out the application form in the "Join" section of our website. We
                    welcome students of all skill levels who are interested in open source software.
                  </p>
                </div>
              </details>
            </div>

            <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-md transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Do I need programming experience to join?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-4 md:p-6 pt-0 border-t border-border text-sm sm:text-base">
                  <p className="text-muted-foreground">
                    No, you don't need prior programming experience to join. We welcome members with diverse backgrounds
                    and skill levels. Our club provides learning opportunities for beginners as well as advanced
                    developers.
                  </p>
                </div>
              </details>
            </div>

            <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-md transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    How often does the club meet?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-4 md:p-6 pt-0 border-t border-border text-sm sm:text-base">
                  <p className="text-muted-foreground">
                    We typically have weekly meetings during the academic year. The schedule is posted on our website
                    and social media channels at the beginning of each semester.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Render only when mounted */}
      {mounted && (
        <footer className="py-8 sm:py-10 md:py-12 border-t border-border px-2 sm:px-4 lg:px-8 bg-background">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-10 md:mb-12">
              <div className="mb-6 sm:mb-8 md:mb-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center mr-2 sm:mr-3 md:mr-4 glow-effect shadow-lg shadow-green-500/20 ">
                    <img
                      src="/LogoFOSS.png"
                      alt="FC"
                      className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">The FOSS Club</h3>
                </div>
                <p className="text-muted-foreground max-w-xs sm:max-w-md text-sm sm:text-base md:text-lg">
                  Learn, build, and collaborate with fellow open-source enthusiasts in a community dedicated to free and
                  open source software.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
                <a
                  href="https://github.com/thefossclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-muted rounded-full text-muted-foreground hover:text-green-500 dark:hover:text-green-400 hover:bg-muted/80 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <Github className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://discord.gg/BgHwhRZg3r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-muted rounded-full text-muted-foreground hover:text-green-500 dark:hover:text-green-400 hover:bg-muted/80 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <FaDiscord className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">Discord</span>
                </a>
                <a
                  href="https://twitter.com/thefossclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-muted rounded-full text-muted-foreground hover:text-green-500 dark:hover:text-green-400 hover:bg-muted/80 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <Twitter className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://linkedin.com/company/thefossclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-muted rounded-full text-muted-foreground hover:text-green-500 dark:hover:text-green-400 hover:bg-muted/80 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://instagram.com/thefossclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-muted rounded-full text-muted-foreground hover:text-green-500 dark:hover:text-green-400 hover:bg-muted/80 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 mb-6 sm:mb-8">
              <div className="p-5 md:p-6 rounded-2xl border border-border bg-card shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-gradient-green">Quick Links</h3>
                <ul className="space-y-2 md:space-y-3 text-sm sm:text-base">
                  <li>
                    <Link
                      href="#home"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#projects"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#events"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Events
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="p-5 md:p-6 rounded-2xl border border-border bg-card shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-gradient-green">Resources</h3>
                <ul className="space-y-2 md:space-y-3 text-sm sm:text-base">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/thefossclub/CodeofConduct"
                      target="_blank"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Code of Conduct
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="p-5 md:p-6 rounded-2xl border border-border bg-card shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-gradient-green">Contact</h3>
                <ul className="space-y-2 md:space-y-3 text-sm sm:text-base">
                  <li>
                    <Link
                      href="https://linktr.ee/thefossclub"
                      target="_blank"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      LinkTree
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Email Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://discord.gg/BgHwhRZg3r"
                      className="text-muted-foreground hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Join Discord
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-4 sm:pt-6 border-t border-border relative">
              <p className="text-muted-foreground text-sm sm:text-base">© {new Date().getFullYear()} The FOSS Club. All rights reserved.</p>
              <p className="text-muted-foreground mt-1 md:mt-2 text-xs sm:text-sm">Made with 💚 by open source enthusiasts</p>

              <button
                onClick={() => {
                  // Use Lenis smooth scroll if available, fallback to native
                  // @ts-expect-error - lenis is added to window by SmoothScroll component
                  if (window.lenis) {
                    // @ts-expect-error - lenis is added to window by SmoothScroll component
                    window.lenis.scrollTo(0, { duration: 1.5 })
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className="absolute right-0 bottom-0 mb-0 mr-0 group bg-gradient-green p-2 sm:p-2.5 md:p-3 rounded-full text-white hover:opacity-90 transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center"
                aria-label="Back to top"
              >
                <ChevronUp className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:-translate-y-0.5" />
                <span className="absolute right-full mr-2 text-sm bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 pointer-events-none hidden sm:block">
                  Back to Top
                </span>
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

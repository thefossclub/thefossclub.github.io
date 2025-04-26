"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Github, Instagram, Linkedin, Twitter, ChevronDown, ChevronUp } from "lucide-react"
import Navbar from "@/components/navbar"
import ProjectCard from "@/components/project-card"
import EventCard from "@/components/event-card"
import TeamMember from "@/components/team-member"
import BlogPost from "@/components/blog-post"
import GridBackground from "@/components/grid-background"
import HeroSphere from "@/components/hero-sphere"
import Timeline from "@/components/timeline"
import ScrollingTools from "@/components/scrolling-tools"
import CursorEffect from "@/components/cursor-effect"
import { useTheme } from "next-themes"
import ScrollProgressIndicator from "@/components/scroll-progress-indicator"

export default function Home() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9])
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const [coreTeamExpanded, setCoreTeamExpanded] = useState(true)
  const [membersExpanded, setMembersExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    events: useRef<HTMLElement>(null),
    team: useRef<HTMLElement>(null),
    resources: useRef<HTMLElement>(null),
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = Object.keys(sectionRefs) as Array<keyof typeof sectionRefs>;

      for (const sectionName of sections) {
        const ref = sectionRefs[sectionName].current
        if (ref) {
          if (scrollPosition >= ref.offsetTop && scrollPosition < ref.offsetTop + ref.offsetHeight) {
            setActiveSection(sectionName)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
      title: "LinkFree",
      description: "A free and open source alternative to LinkTree.",
      link: "https://github.com/thefossclub/LinkFree",
    },
    {
      title: "face-recognition",
      description:
        "Face Recognition code which detects faces on live cameras implemented using OpenCV and DLib in Python and C++.",
      link: "https://github.com/thefossclub/face-recognition",
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
      title: "Introduction to Linux and CLI",
      date: "February 14, 2024",
      description:
        "Get hands-on experience installing and configuring Linux distributions and basics of Command Line Interface.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "How_To?",
      date: "April 12, 2024",
      description: "A conference featuring talks, workshops, and networking opportunities.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "FOSS Hack Delhi-NCR",
      date: "July 27, 2024",
      description:
        "A national level FOSS hackathon conducted by the FOSS Club at the college for the whole Delhi NCR. FOSS Hack is a hackathon conducted by FOSS United each year.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const coreTeam = [
    { name: "Ms. Eirty Telang Kapoor", role: "Convenor", color: "bg-orange-500" },
    { name: "Vaibhav Pratap Singh", role: "President", color: "bg-yellow-500" },
    { name: "Suryansh Sharma", role: "Vice President", color: "bg-blue-500" },
    { name: "Sachin Singh Adhikari", role: "Secretary", color: "bg-green-500" },
    { name: "Ashwany Kumar Sharma", role: "Secretary", color: "bg-purple-500" },
    { name: "Riyansh Varshney", role: "Event Coordinator", color: "bg-pink-500" },
    { name: "Harshvardhan", role: "Event Coordinator", color: "bg-indigo-500" },
    { name: "Diksha Chauhan", role: "Event Coordinator", color: "bg-teal-500" },
    { name: "Shresth Gupta", role: "Event Coordinator", color: "bg-cyan-500" },
    { name: "Nishchal Anurag", role: "PR & Outreach", color: "bg-lime-500" },
    { name: "Satyam Mishra", role: "PR & Outreach", color: "bg-emerald-500" },
    { name: "Diti Vasisht", role: "PR & Outreach", color: "bg-violet-500" },
    { name: "Jayesh Bisht", role: "PR & Outreach", color: "bg-fuchsia-500" },
    { name: "Arul S Bharadwaj", role: "Graphic Designer", color: "bg-rose-500" },
    { name: "Lovish Kukreja", role: "Graphic Designer", color: "bg-amber-500" },
    { name: "Tiya Jain", role: "Social Media", color: "bg-sky-500" },
    { name: "Vanya Raman", role: "Social Media", color: "bg-red-500" },
    { name: "Srijan Ranjan", role: "Social Media", color: "bg-blue-500" },
    { name: "Vinay Chauhan", role: "Video Editor", color: "bg-green-500" },
    { name: "Gautam Kumar", role: "Treasurer", color: "bg-purple-500" },
  ]

  const members = [
    { name: "Tanmay Maheshwari", role: "Low Level", color: "bg-yellow-500" },
    { name: "Harshit Vashisht", role: "Web Dev.", color: "bg-blue-500" },
    { name: "Mayank Choubey", role: "DSA Guy", color: "bg-green-500" },
    { name: "TSR", role: "UI/UX Designer", color: "bg-purple-500" },
    { name: "Krish", role: "Friendly Spiderman", color: "bg-pink-500" },
    { name: "Avneesh", role: "Designer", color: "bg-indigo-500" },
    { name: "Chitranjan", role: "Front-End", color: "bg-teal-500" },
    { name: "Satyam", role: "Meme Lord", color: "bg-teal-500" },
    { name: "Abhishek Thapa", role: "Back-End", color: "bg-cyan-500" },
    { name: "Aditya Sachdeva", role: "UI/UX and Blender", color: "bg-lime-500" },
    { name: "Nitya Kapoor", role: "Cyber Security", color: "bg-emerald-500" },
    { name: "Pragya Paramita", role: "Web dev.", color: "bg-violet-500" },
    { name: "Inzemam ul haq", role: "Senior", color: "bg-red-500" },
    { name: "Hilal Ahmad", role: "AI Guy", color: "bg-orange-500" },
    { name: "Kilari teja", role: "Industry Mentor", color: "bg-blue-500" },
    { name: "Ravpreet Maini", role: "Cloud Expert", color: "bg-green-500" },
    { name: "Shristi Pandey", role: "Researcher", color: "bg-purple-500" },
    { name: "Palak", role: "Graphics Designer", color: "bg-pink-500" },
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
      <CursorEffect />
      <Navbar activeSection={activeSection} />
      <ScrollProgressIndicator />

      {/* Hero Section */}
      <motion.section
        ref={sectionRefs.home}
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden z-10 px-4"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 flex items-center justify-center hidden md:flex">
          <HeroSphere />
        </div>

        <div className="container mx-auto z-10 flex flex-col md:flex-row items-center justify-between">
          {/* Hero Text Container */}
          <motion.div
            className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
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
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gradient-green"
              variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
            >
              Welcome to The FOSS Club!
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-700 dark:text-gray-200"
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
            className="md:w-1/2 mt-12 md:mt-0 relative"
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
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto wafer-circle"> 
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

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ArrowRight className="h-8 w-8 rotate-90 text-green-500 drop-shadow-md" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section ref={sectionRefs.about} id="about" className="py-16 md:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green drop-shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-xl shadow-green-500/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-base sm:text-lg mb-6 md:mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
              The FOSS Club is a student community-based group in the Delhi Technical Campus for enthusiasts focused on
              contributing to
              <span className="relative mx-2 text-green-500 font-bold group">
                Free and Open Source Software
                <span className="absolute opacity-0 group-hover:opacity-100 bg-gray-900 dark:bg-gray-900 text-xs text-white p-2 rounded -bottom-8 left-0 transition-opacity duration-300 shadow-lg">
                  Yes! That's the full form of FOSS
                </span>
              </span>
              and mentoring students to achieve excellence in various fields of Computer Science.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green-dark drop-shadow-md">Core Pillars</h3>
            <ul className="space-y-3 md:space-y-4">
              <motion.li
                className="p-3 md:p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 transition-all text-sm sm:text-base"
                whileHover={{ x: 10 }}
              >
                <strong className="text-gray-900 dark:text-white mr-1">Open Source:</strong> The FOSS Club promotes open-source
                software, FOSS philosophy, self-hosting, Linux, and collaborative development.
              </motion.li>
              <motion.li
                className="p-3 md:p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 transition-all text-sm sm:text-base"
                whileHover={{ x: 10 }}
              >
                <strong className="text-gray-900 dark:text-white mr-1">Cyber Security:</strong> The FOSS Club explores ethical hacking,
                CTFs, reverse engineering, digital privacy, OSINT, and cybersecurity research.
              </motion.li>
              <motion.li
                className="p-3 md:p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 transition-all text-sm sm:text-base"
                whileHover={{ x: 10 }}
              >
                <strong className="text-gray-900 dark:text-white mr-1">Hardware:</strong> The FOSS Club will focus on self-hosted
                systems, open hardware, embedded devices, SBCs (like Raspberry Pi and RISC-V boards), firmware hacking,
                retro computing, and all the cool hardware stuff.
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            className="mt-16 md:mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200 drop-shadow-md">
              Our Timeline
            </h3>
            <Timeline events={timelineEvents} />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} id="projects" className="py-16 md:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green drop-shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
      <section ref={sectionRefs.events} id="events" className="py-16 md:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green drop-shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Events
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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

          <motion.div
            className="mt-12 md:mt-16 p-6 md:p-8 rounded-3xl border border-green-900/50 bg-gradient-to-r from-green-900/10 to-green-900/10 dark:from-green-900/30 dark:to-green-900/30 shadow-xl shadow-green-500/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gradient-green drop-shadow-md">FOSS Hack 2025</h3>
                <p className="text-base sm:text-lg mb-4 text-gray-700 dark:text-gray-300">
                  Our biggest hackathon yet! Join us for an incredible weekend of coding, collaboration, and innovation
                  in the open source world.
                </p>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-gradient-green-light drop-shadow-sm">
                  What's in store?
                </h4>
                <ul className="space-y-1.5 md:space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <li>• Expert talks</li>
                  <li>• Intro to Random Shit</li>
                  <li>• Workshops</li>
                  <li>• Networking</li>
                  <li>• Intro to Git</li>
                  <li>• Lightning Rounds</li>
                  <li>• Intro to OpenAI</li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="FOSS Hack 2025"
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 md:py-20 relative overflow-hidden z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green drop-shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Open Source Tools We Love
          </motion.h2>

          <ScrollingTools tools={tools} />
        </div>
      </section>

      {/* Team Section */}
      <section ref={sectionRefs.team} id="team" className="py-16 md:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green drop-shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Team
          </motion.h2>

          {/* Core Team Section */}
          <div className="mb-12 md:mb-16">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <motion.h3
                className="text-xl sm:text-2xl font-bold text-green-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Core Team
              </motion.h3>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {coreTeam.map((member, index) => (
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
          </div>

          {/* Members Section */}
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
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section ref={sectionRefs.resources} id="resources" className="py-16 md:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green drop-shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Resources
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-xl shadow-green-500/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ul className="space-y-3 md:space-y-4">
              <motion.li
                className="p-3 md:p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="https://github.com/thefossclub/resources#unlock-the-web-frontend--backend-secrets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Web Development Fundamentals (Frontend & Backend)
                </Link>
              </motion.li>
              <motion.li
                className="p-3 md:p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="https://github.com/thefossclub/resources#level-up-your-game-dev-journey-starts-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Introduction to Game Development Concepts
                </Link>
              </motion.li>
              <motion.li
                className="p-3 md:p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="https://github.com/thefossclub/resources#mobile-mastery-build-your-first-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Mobile Application Development Resources
                </Link>
              </motion.li>
              <motion.li
                className="p-3 md:p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="https://github.com/thefossclub/resources#linux-command-line--version-control"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Linux, Command Line Interface, and Git Essentials
                </Link>
              </motion.li>
              <motion.li
                className="p-3 md:p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="https://github.com/thefossclub/resources#cybersecurity--ethical-hacking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base sm:text-lg text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors font-medium"
                >
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  Cybersecurity and Ethical Hacking Principles
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold mb-10 md:mb-12 text-center text-gradient-green drop-shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto space-y-4 md:space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-lg hover:shadow-green-500/10 transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">What is FOSS?</h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-4 md:p-6 pt-0 border-t border-gray-800 text-sm sm:text-base">
                  <p className="text-gray-700 dark:text-gray-300">
                    FOSS stands for Free and Open Source Software. It refers to software that is freely available for
                    use, modification, and distribution.
                  </p>
                </div>
              </details>
            </div>

            <div className="backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-lg hover:shadow-green-500/10 transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    How can I join the FOSS Club?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-4 md:p-6 pt-0 border-t border-gray-800 text-sm sm:text-base">
                  <p className="text-gray-700 dark:text-gray-300">
                    You can join our club by filling out the application form in the "Join" section of our website. We
                    welcome students of all skill levels who are interested in open source software.
                  </p>
                </div>
              </details>
            </div>

            <div className="backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-lg hover:shadow-green-500/10 transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Do I need programming experience to join?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-4 md:p-6 pt-0 border-t border-gray-800 text-sm sm:text-base">
                  <p className="text-gray-700 dark:text-gray-300">
                    No, you don't need prior programming experience to join. We welcome members with diverse backgrounds
                    and skill levels. Our club provides learning opportunities for beginners as well as advanced
                    developers.
                  </p>
                </div>
              </details>
            </div>

            <div className="backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-lg hover:shadow-green-500/10 transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-4 md:p-6 cursor-pointer">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    How often does the club meet?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-4 md:p-6 pt-0 border-t border-gray-800 text-sm sm:text-base">
                  <p className="text-gray-700 dark:text-gray-300">
                    We typically have weekly meetings during the academic year. The schedule is posted on our website
                    and social media channels at the beginning of each semester.
                  </p>
                </div>
              </details>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Render only when mounted */}
      {mounted && (
        <footer className="py-10 md:py-12 border-t border-gray-800 dark:border-gray-800 footer-gradient px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-12">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-green rounded-full flex items-center justify-center mr-3 md:mr-4 glow-effect shadow-lg shadow-green-500/30">
                    <span className="text-white font-bold text-xs md:text-sm">FC</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">The FOSS Club</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 max-w-md text-base sm:text-lg">
                  Learn, build, and collaborate with fellow open-source enthusiasts in a community dedicated to free and
                  open source software.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <a
                  href="https://github.com/thefossclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-white/10 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-white/20 dark:hover:bg-black/30 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <Github className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://twitter.com/thefossclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-white/10 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-white/20 dark:hover:bg-black/30 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <Twitter className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://linkedin.com/company/thefossclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-white/10 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-white/20 dark:hover:bg-black/30 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://instagram.com/thefossclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 bg-white/10 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-white/20 dark:hover:bg-black/30 transition-all shadow-md hover:shadow-green-500/20"
                >
                  <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-gray-200/20 dark:border-gray-800/50 bg-white/5 dark:bg-black/5 card-hover-effect shadow-lg hover:shadow-green-500/10">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-gradient-green">Quick Links</h3>
                <ul className="space-y-2 md:space-y-3 text-sm sm:text-base">
                  <li>
                    <Link
                      href="#home"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#projects"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#events"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Events
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-gray-200/20 dark:border-gray-800/50 bg-white/5 dark:bg-black/5 card-hover-effect shadow-lg hover:shadow-green-500/10">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-gradient-green">Resources</h3>
                <ul className="space-y-2 md:space-y-3 text-sm sm:text-base">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/thefossclub/CodeofConduct"
                      target="_blank"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Code of Conduct
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-gray-200/20 dark:border-gray-800/50 bg-white/5 dark:bg-black/5 card-hover-effect shadow-lg hover:shadow-green-500/10">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-gradient-green">Contact</h3>
                <ul className="space-y-2 md:space-y-3 text-sm sm:text-base">
                  <li>
                    <Link
                      href="https://linktr.ee/thefossclub"
                      target="_blank"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      LinkTree
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Email Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors footer-link"
                    >
                      Join Discord
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>

            <div className="text-center pt-6 border-t border-gray-800/30 dark:border-gray-800/30 relative">
              <p className="text-gray-500 text-sm sm:text-base">© {new Date().getFullYear()} The FOSS Club. All rights reserved.</p>
              <p className="text-gray-500 mt-1 md:mt-2 text-xs sm:text-sm">Made with 💚 by open source enthusiasts</p>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute right-0 bottom-0 mb-0 mr-0 group bg-gradient-green p-2.5 md:p-3 rounded-full text-white hover:opacity-90 transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center"
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


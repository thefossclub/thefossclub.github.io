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

export default function Home() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9])
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const [coreTeamExpanded, setCoreTeamExpanded] = useState(true)
  const [activeMembersExpanded, setActiveMembersExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    events: useRef<HTMLElement>(null),
    team: useRef<HTMLElement>(null),
    blog: useRef<HTMLElement>(null),
    resources: useRef<HTMLElement>(null),
  }

  // Add observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  // Add animation observer to ensure animations work in Firefox
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible =
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0

        if (isVisible) {
          element.classList.add("visible")
        }
      })
    }

    // Initial check
    animateElements()

    // Add scroll event listener
    window.addEventListener("scroll", animateElements)

    return () => {
      window.removeEventListener("scroll", animateElements)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section in sectionRefs) {
        const ref = sectionRefs[section as keyof typeof sectionRefs].current
        if (ref) {
          if (scrollPosition >= ref.offsetTop && scrollPosition < ref.offsetTop + ref.offsetHeight) {
            setActiveSection(section)
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
    { name: "Ayush Kukreja", role: "Graphic Designer", color: "bg-amber-500" },
    { name: "Tiya Jain", role: "Social Media", color: "bg-sky-500" },
    { name: "Vanya Raman", role: "Social Media", color: "bg-red-500" },
    { name: "Srijan Ranjan", role: "Social Media", color: "bg-blue-500" },
    { name: "Vinay Chauhan", role: "Video Editor", color: "bg-green-500" },
    { name: "Gautam Kumar", role: "Treasurer", color: "bg-purple-500" },
  ]

  const mentors = [
    { name: "Inzemam ul haq", role: "Senior", color: "bg-red-500" },
    { name: "Kilari teja", role: "Industry Mentor", color: "bg-blue-500" },
    { name: "Ravpreet Maini", role: "Cloud Expert", color: "bg-green-500" },
    { name: "Shristi Pandey", role: "Researcher", color: "bg-purple-500" },
    { name: "Palak", role: "Graphics Designer", color: "bg-pink-500" },
  ]

  const activeMembers = [
    { name: "Hilal Ahmad", role: "AI Guy", color: "bg-orange-500" },
    { name: "Tanmay Maheshwari", role: "Low Level", color: "bg-yellow-500" },
    { name: "Harshit Vashisht", role: "Web Dev.", color: "bg-blue-500" },
    { name: "Mayank Chaubey", role: "DSA Guy", color: "bg-green-500" },
    { name: "TSR", role: "UI/UX Designer", color: "bg-purple-500" },
    { name: "Krish", role: "Friendly Spiderman", color: "bg-pink-500" },
    { name: "Avneesh", role: "Designer", color: "bg-indigo-500" },
    { name: "Chitranjan", role: "Front-End", color: "bg-teal-500" },
    { name: "Abhishek Thapa", role: "Back-End", color: "bg-cyan-500" },
    { name: "Aditya Sachdeva", role: "UI/UX and Blender", color: "bg-lime-500" },
    { name: "Nitya Kapoor", role: "Cyber Security", color: "bg-emerald-500" },
    { name: "Pragya Paramita", role: "Web dev.", color: "bg-violet-500" },
  ]

  const blogPosts = [
    {
      title: "Introduction to Open Source",
      excerpt: "Learn about the basics of open source software and its impact on the tech industry.",
      link: "#",
    },
    {
      title: "FOSS Alternatives to Popular Software",
      excerpt: "Discover free and open source alternatives to commonly used proprietary software.",
      link: "#",
    },
    {
      title: "Contributing to Open Source Projects",
      excerpt: "A beginner's guide to making your first contribution to an open source project.",
      link: "#",
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
      className="relative min-h-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white"
      suppressHydrationWarning
    >
      <GridBackground />
      <CursorEffect />
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <motion.section
        ref={sectionRefs.home}
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroSphere />
        </div>

        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient-green drop-shadow-xl">
              Welcome to The FOSS Club!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 drop-shadow-md">
              <span className="font-bold">Learn, build, and collaborate</span> with fellow open-source enthusiasts.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://opnform.com/forms/the-foss-club-registration-nst4zs"
                target="_blank"
                className="inline-flex items-center px-6 py-3 bg-gradient-green text-white rounded-full font-medium text-lg hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
              >
                Join Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 mt-12 md:mt-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-green-blue rounded-full opacity-90 shadow-2xl shadow-green-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-md">
                  Free & Open Source and Hacker Culture at DTC
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ArrowRight className="h-8 w-8 rotate-90 text-green-500 drop-shadow-md" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section ref={sectionRefs.about} id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-gradient-green animate-on-scroll drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto backdrop-blur-sm p-8 rounded-3xl border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 animate-on-scroll shadow-xl shadow-green-500/5"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
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

            <h3 className="text-2xl font-bold mb-4 text-gradient-green-dark drop-shadow-md">Core Pillars</h3>
            <ul className="space-y-4">
              <motion.li
                className="p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 transition-all"
                whileHover={{ x: 10 }}
              >
                <strong className="text-gradient-green">Open Source:</strong> The FOSS Club promotes open-source
                software, FOSS philosophy, self-hosting, Linux, and collaborative development.
              </motion.li>
              <motion.li
                className="p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 transition-all"
                whileHover={{ x: 10 }}
              >
                <strong className="text-gradient-green">Cyber Security:</strong> The FOSS Club explores ethical hacking,
                CTFs, reverse engineering, digital privacy, OSINT, and cybersecurity research.
              </motion.li>
              <motion.li
                className="p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green shadow-md hover:shadow-green-500/10 transition-all"
                whileHover={{ x: 10 }}
              >
                <strong className="text-gradient-green">Hardware:</strong> The FOSS Club will focus on self-hosted
                systems, open hardware, embedded devices, SBCs (like Raspberry Pi and RISC-V boards), firmware hacking,
                retro computing, and all the cool hardware stuff.
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            className="mt-20 animate-on-scroll"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200 drop-shadow-md">
              Our Timeline
            </h3>
            <Timeline events={timelineEvents} />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} id="projects" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-gradient-green animate-on-scroll drop-shadow-xl"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section ref={sectionRefs.events} id="events" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-gradient-green animate-on-scroll drop-shadow-xl"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Events
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            className="mt-16 p-8 rounded-3xl border border-green-900/50 bg-gradient-to-r from-green-900/10 to-green-900/10 dark:from-green-900/30 dark:to-green-900/30 animate-on-scroll shadow-xl shadow-green-500/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-3xl font-bold mb-4 text-gradient-green drop-shadow-md">FOSS Hack 2025</h3>
                <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                  Our biggest hackathon yet! Join us for an incredible weekend of coding, collaboration, and innovation
                  in the open source world.
                </p>
                <h4 className="text-xl font-semibold mb-2 text-gradient-green-light drop-shadow-sm">
                  What's in store?
                </h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
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
      <section id="tools" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-gradient-green animate-on-scroll drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Open Source Tools We Love
          </motion.h2>

          <ScrollingTools tools={tools} />
        </div>
      </section>

      {/* Team Section */}
      <section ref={sectionRefs.team} id="team" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-gradient-green animate-on-scroll drop-shadow-xl"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Team
          </motion.h2>

          {/* Core Team Section */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <motion.h3
                className="text-2xl font-bold text-gradient-green animate-on-scroll drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Core Team
              </motion.h3>
              <button
                onClick={() => setCoreTeamExpanded(!coreTeamExpanded)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-green text-white rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-md shadow-green-500/20 hover:shadow-green-500/30"
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

            <motion.div
              className="team-grid"
              initial={{ height: "auto" }}
              animate={{ height: coreTeamExpanded ? "auto" : "0" }}
              transition={{ duration: 0.5 }}
            >
              {coreTeamExpanded && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {coreTeam.map((member, index) => (
                    <TeamMember key={index} name={member.name} role={member.role} color={member.color} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Active Members Section */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <motion.h3
                className="text-2xl font-bold text-gradient-green animate-on-scroll drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Active Members
              </motion.h3>
              <button
                onClick={() => setActiveMembersExpanded(!activeMembersExpanded)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-green text-white rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-md shadow-green-500/20 hover:shadow-green-500/30"
              >
                {activeMembersExpanded ? (
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

            <motion.div
              className="team-grid"
              initial={{ height: "auto" }}
              animate={{ height: activeMembersExpanded ? "auto" : "0" }}
              transition={{ duration: 0.5 }}
            >
              {activeMembersExpanded && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {[...mentors, ...activeMembers].map((member, index) => (
                    <TeamMember key={index} name={member.name} role={member.role} color={member.color} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={sectionRefs.blog} id="blog" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-gradient-green animate-on-scroll drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Latest Blog Posts
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPost key={index} title={post.title} excerpt={post.excerpt} link={post.link} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section ref={sectionRefs.resources} id="resources" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-gradient-green animate-on-scroll drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Resources
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto backdrop-blur-sm p-8 rounded-3xl border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 animate-on-scroll shadow-xl shadow-green-500/5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ul className="space-y-4">
              <motion.li
                className="p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="#"
                  className="flex items-center text-lg hover:text-gradient-green transition-colors text-gray-700 dark:text-gray-300"
                >
                  <ArrowRight className="mr-2 h-5 w-5 text-green-500" />
                  Getting Started with Git
                </Link>
              </motion.li>
              <motion.li
                className="p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="#"
                  className="flex items-center text-lg hover:text-gradient-green transition-colors text-gray-700 dark:text-gray-300"
                >
                  <ArrowRight className="mr-2 h-5 w-5 text-green-500" />
                  Introduction to Linux Command Line
                </Link>
              </motion.li>
              <motion.li
                className="p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="#"
                  className="flex items-center text-lg hover:text-gradient-green transition-colors text-gray-700 dark:text-gray-300"
                >
                  <ArrowRight className="mr-2 h-5 w-5 text-green-500" />
                  Web Development Fundamentals
                </Link>
              </motion.li>
              <motion.li
                className="p-4 bg-gray-900/10 dark:bg-gray-900/50 rounded-2xl border-gradient border-gradient-green transition-all shadow-md hover:shadow-green-500/10"
                whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
              >
                <Link
                  href="#"
                  className="flex items-center text-lg hover:text-gradient-green transition-colors text-gray-700 dark:text-gray-300"
                >
                  <ArrowRight className="mr-2 h-5 w-5 text-green-500" />
                  Open Source Licensing Guide
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-gradient-green animate-on-scroll drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="max-w-4xl mx-auto space-y-6 animate-on-scroll"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-lg hover:shadow-green-500/10 transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">What is FOSS?</h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-6 pt-0 border-t border-gray-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    FOSS stands for Free and Open Source Software. It refers to software that is freely available for
                    use, modification, and distribution.
                  </p>
                </div>
              </details>
            </div>

            <div className="backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-lg hover:shadow-green-500/10 transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    How can I join the FOSS Club?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-6 pt-0 border-t border-gray-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    You can join our club by filling out the application form in the "Join" section of our website. We
                    welcome students of all skill levels who are interested in open source software.
                  </p>
                </div>
              </details>
            </div>

            <div className="backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 dark:border-gray-800 bg-white/5 dark:bg-black/5 shadow-lg hover:shadow-green-500/10 transition-all">
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Do I need programming experience to join?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-6 pt-0 border-t border-gray-800">
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
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    How often does the club meet?
                  </h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight className="h-5 w-5 rotate-90 text-green-500" />
                  </span>
                </summary>
                <div className="p-6 pt-0 border-t border-gray-800">
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

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 dark:border-gray-800 footer-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-green rounded-full flex items-center justify-center mr-4 glow-effect shadow-lg shadow-green-500/30">
                  <span className="text-white font-bold text-sm">FC</span>
                </div>
                <h2 className="text-3xl font-bold text-gradient-green drop-shadow-md">The FOSS Club</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md text-lg">
                Learn, build, and collaborate with fellow open-source enthusiasts in a community dedicated to free and
                open source software.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://github.com/thefossclub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-white/20 dark:hover:bg-black/30 transition-all shadow-md hover:shadow-green-500/20"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com/thefossclub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-white/20 dark:hover:bg-black/30 transition-all shadow-md hover:shadow-green-500/20"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com/company/thefossclub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-white/20 dark:hover:bg-black/30 transition-all shadow-md hover:shadow-green-500/20"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/thefossclub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-white/20 dark:hover:bg-black/30 transition-all shadow-md hover:shadow-green-500/20"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div className="backdrop-blur-sm p-6 rounded-2xl border border-gray-200/20 dark:border-gray-800/50 bg-white/5 dark:bg-black/5 card-hover-effect shadow-lg hover:shadow-green-500/10">
              <h3 className="text-xl font-semibold mb-4 text-gradient-green">Quick Links</h3>
              <ul className="space-y-3">
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
            <div className="backdrop-blur-sm p-6 rounded-2xl border border-gray-200/20 dark:border-gray-800/50 bg-white/5 dark:bg-black/5 card-hover-effect shadow-lg hover:shadow-green-500/10">
              <h3 className="text-xl font-semibold mb-4 text-gradient-green">Resources</h3>
              <ul className="space-y-3">
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
            <div className="backdrop-blur-sm p-6 rounded-2xl border border-gray-200/20 dark:border-gray-800/50 bg-white/5 dark:bg-black/5 card-hover-effect shadow-lg hover:shadow-green-500/10">
              <h3 className="text-xl font-semibold mb-4 text-gradient-green">Contact</h3>
              <ul className="space-y-3">
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
          </div>

          <div className="text-center pt-8 border-t border-gray-800/30 dark:border-gray-800/30">
            <p className="text-gray-500">© {new Date().getFullYear()} The FOSS Club. All rights reserved.</p>
            <p className="text-gray-500 mt-2 text-sm">Made with 💚 by open source enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


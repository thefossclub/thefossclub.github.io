"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun, LogIn } from "lucide-react"
import { useTheme } from "next-themes"

interface NavbarProps {
  activeSection: string
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const isDark = mounted && resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)

    let ticking = false
    let lastScrolled = false
    
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      
      window.requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 50
        // Only update state if value changed
        if (shouldBeScrolled !== lastScrolled) {
          lastScrolled = shouldBeScrolled
          setScrolled(shouldBeScrolled)
        }
        ticking = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Events", href: "#events" },
    { name: "Team", href: "#team" },
    { name: "Resources", href: "#resources" },
  ]

  // Get navbar background based on scroll and theme
  const getNavbarBg = () => {
    if (scrolled) {
      return isDark 
        ? "bg-black/90 border-white/15" 
        : "bg-white border-gray-200 shadow-md"
    }
    return isDark 
      ? "bg-gray-950/40" 
      : "bg-white/80"
  }

  // Get text color based on theme
  const getTextColor = (isActive: boolean) => {
    if (isActive) return "text-green-500"
    return isDark ? "text-white" : "text-gray-900"
  }

  // Get hover text color
  const getHoverClass = () => {
    return "hover:text-green-500 transition-colors"
  }

  return (
    <>
      <AnimatePresence>
        <motion.header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <motion.div
            className={`container mx-auto transition-all duration-300 ${
              scrolled
                ? `mx-4 px-4 py-2 rounded-full border ${getNavbarBg()}`
                : `px-4 ${getNavbarBg()}`
            }`}
            style={{ 
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <nav className="flex justify-center items-center">
              {/* Logo and Title - left aligned */}
              <div className="flex items-center justify-start flex-1 min-w-0">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center glow-effect-green flex-shrink-0">
                    <img
                      src="/LogoFOSS.png"
                      alt="FC"
                      className="w-20 h-20 md:w-28 md:h-28 object-contain mx-auto"
                    />
                  </div>
                  <Link
                    href="#"
                    className={`text-lg font-bold truncate z-50 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    The FOSS Club
                  </Link>
                </div>
              </div>

              {/* Desktop Navigation - centered */}
              <ul className="hidden md:flex items-center space-x-6 justify-center flex-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm font-medium transition-colors relative ${getTextColor(activeSection === link.name.toLowerCase())} ${getHoverClass()}`}
                    >
                      {link.name}
                      {activeSection === link.name.toLowerCase() && (
                        <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-green"
                          layoutId="navbar-indicator"
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
                <li className="flex items-center space-x-4">
                  <Link
                    href="https://opnform.com/forms/the-foss-club-registration-nst4zs"
                    target="_blank"
                    className="px-4 py-2 bg-gradient-green text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity btn-glow"
                  >
                    Join
                  </Link>
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-gradient-green-blue text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center btn-glow"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Link>
                </li>
              </ul>

              {/* Theme toggle and mobile menu button - right aligned */}
              <div className="flex items-center space-x-4 z-50 justify-end flex-1">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors btn-glow ${
                    isDark 
                      ? "text-gray-300 hover:text-green-400 hover:bg-gray-800" 
                      : "text-gray-700 hover:text-green-500 hover:bg-gray-100"
                  }`}
                  aria-label="Toggle theme"
                >
                  {mounted ? (
                    isDark ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )
                  ) : (
                    <div className="h-5 w-5" />
                  )}
                </button>

                <button
                  onClick={toggleMenu}
                  className={`md:hidden p-2 rounded-full transition-colors ${
                    isDark 
                      ? "text-gray-300 hover:text-green-400 hover:bg-gray-800" 
                      : "text-gray-700 hover:text-green-500 hover:bg-gray-100"
                  }`}
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>

            </nav>
          </motion.div>
        </motion.header>
      </AnimatePresence>

      {/* Mobile Navigation - Outside header to avoid transform issues */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
            />
            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 z-[101] flex items-center justify-center p-6 md:hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`relative rounded-2xl shadow-2xl px-6 py-8 w-full max-w-sm flex flex-col items-center border ${
                  isDark 
                    ? "bg-black border-white/10" 
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Close button */}
                <button
                  onClick={toggleMenu}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                    isDark 
                      ? "text-gray-400 hover:text-white hover:bg-white/10" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>

                <ul className="flex flex-col items-center space-y-5 mt-4 w-full">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`text-lg font-medium ${getTextColor(activeSection === link.name.toLowerCase())} ${getHoverClass()}`}
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                  <div className="pt-4 flex flex-col gap-3 w-full items-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Link
                        href="https://opnform.com/forms/the-foss-club-registration-nst4zs"
                        target="_blank"
                        className="px-6 py-2.5 bg-gradient-green text-white rounded-full text-base font-medium hover:opacity-90 transition-opacity inline-block"
                        onClick={toggleMenu}
                      >
                        Join Now
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.35 }}
                    >
                      <Link
                        href="/login"
                        className="px-6 py-2.5 bg-gradient-green-blue text-white rounded-full text-base font-medium hover:opacity-90 transition-opacity inline-flex items-center"
                        onClick={toggleMenu}
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Login
                      </Link>
                    </motion.div>
                  </div>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

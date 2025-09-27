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
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setScrolled(true)
          } else {
            setScrolled(false)
          }
          ticking = false
        })
        ticking = true
      }
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

  // Fix the navbar font color issue
  const navLinkClass = (isActive: boolean) => {
    if (!mounted) return "text-gray-800 dark:text-gray-100"

    if (isActive) {
      return "text-green-500 font-medium"
    }

    // When not scrolled, use different colors based on theme
    if (!scrolled) {
      return resolvedTheme === "dark"
        ? "text-gray-100 hover:text-green-400 transition-colors"
        : "text-gray-800 hover:text-green-500 transition-colors"
    }

    // When scrolled
    return resolvedTheme === "dark"
      ? "text-gray-300 hover:text-green-400 transition-colors"
      : "text-gray-700 hover:text-green-500 transition-colors"
  }

  return (
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
          className={`container mx-auto transition-all duration-300 backdrop-blur-lg ${
            scrolled
              ? "mx-4 px-4 py-2 shadow-lg \
                 bg-white/60 dark:bg-gray-950/60 \
                 border-b border-gray-200 dark:border-gray-800 \
                 md:rounded-full md:bg-white/10 md:dark:bg-black/80 md:backdrop-blur-md md:border md:border-gray-200/20 md:dark:border-gray-800/50 md:px-6 md:backdrop-blur-lg"
              : "px-4 bg-white/40 dark:bg-gray-950/40 md:backdrop-blur-lg"
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
              {/* Logo and Title together */}
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 bg-white flex items-center justify-center glow-effect-green flex-shrink-0">
                  {mounted ? (
                    <img
                      src="/LogoFOSS.png"
                      alt="FC"
                      className="w-20 h-20 md:w-28 md:h-28 object-contain mx-auto"
                    />
                  ) : (
                    <img
                      src="/LogoFOSS.png"
                      alt="FC"
                      className="w-20 h-20 md:w-28 md:h-28 object-contain mx-auto"
                    />
                  )}
                </div>
                <Link
                  href="#"
                  className={`text-lg font-bold truncate ${mounted ? (resolvedTheme === "dark" ? "text-white" : "text-gray-800") : "text-gray-800 dark:text-white"} z-50`}
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
                    className={`text-sm font-medium transition-colors relative ${
                      activeSection === link.name.toLowerCase() ? "text-green-500" : navLinkClass(false)
                    }`}
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
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors btn-glow"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  resolvedTheme === "dark" ? (
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
                className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    className="fixed inset-0 bg-black/40 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={toggleMenu} // closes menu when tapped outside
                  />
                  {/* Menu Panel */}
                  <motion.div
                    className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="relative bg-black/80 dark:bg-black/90 rounded-2xl shadow-2xl px-4 py-6 w-[90vw] max-w-xs mx-auto flex flex-col items-center backdrop-blur-xl border border-gray-200/40 dark:border-gray-800/60"
                      style={{ maxHeight: '60vh', overflowY: 'auto' }}
                    >
                      <ul className="flex flex-col items-center space-y-4 mt-2 w-full">
                        {navLinks.map((link) => (
                          <motion.li
                            key={link.name}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <Link
                              href={link.href}
                              className={`text-lg font-medium ${
                                activeSection === link.name.toLowerCase()
                                  ? "text-green-500"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                              onClick={toggleMenu}
                            >
                              {link.name}
                            </Link>
                          </motion.li>
                        ))}
                        <motion.li
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <Link
                            href="https://opnform.com/forms/the-foss-club-registration-nst4zs"
                            target="_blank"
                            className="px-4 py-2 bg-gradient-green text-white rounded-full text-base font-medium hover:opacity-90 transition-opacity btn-glow"
                            onClick={toggleMenu}
                          >
                            Join Now
                          </Link>
                        </motion.li>
                        <motion.li
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <Link
                            href="/login"
                            className="px-4 py-2 bg-gradient-green-blue text-white rounded-full text-base font-medium hover:opacity-90 transition-opacity flex items-center btn-glow"
                            onClick={toggleMenu}
                          >
                            <LogIn className="h-5 w-5 mr-2" />
                            Login
                          </Link>
                        </motion.li>
                      </ul>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </nav>
        </motion.div>
      </motion.header>
    </AnimatePresence>
  )
}
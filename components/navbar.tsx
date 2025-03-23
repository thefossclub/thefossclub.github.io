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

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
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
    { name: "Blog", href: "#blog" },
    { name: "Resources", href: "#resources" },
  ]

  // Fix the navbar font color issue
  const navLinkClass = (isActive: boolean) => {
    if (isActive) {
      return "text-gradient-green font-medium"
    }

    // When not scrolled, use different colors based on theme
    if (!scrolled) {
      return "text-gray-800 dark:text-gray-100 hover:text-gradient-green transition-colors"
    }

    // When scrolled
    return "text-gray-700 dark:text-gray-300 hover:text-gradient-green transition-colors"
  }

  return (
    <AnimatePresence>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`container mx-auto ${
            scrolled
              ? "bg-white/10 dark:bg-black/80 backdrop-blur-md rounded-full mx-4 px-6 py-2 border border-gray-200/20 dark:border-gray-800/50 shadow-lg"
              : "px-4"
          }`}
          initial={{ y: scrolled ? -20 : 0, opacity: scrolled ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">FC</span>
              </div>
              <Link href="#" className="text-lg font-bold text-black dark:text-white z-50">
                The FOSS Club
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative ${
                      activeSection === link.name.toLowerCase() ? "text-gradient-green" : navLinkClass(false)
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
              <li>
                <Link
                  href="https://opnform.com/forms/the-foss-club-registration-nst4zs"
                  target="_blank"
                  className="px-4 py-2 bg-gradient-green text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Join
                </Link>
              </li>
              <li>
                <Link
                  href="#login"
                  className="px-4 py-2 bg-gradient-green-blue text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </li>
            </ul>

            <div className="flex items-center space-x-4 z-50">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
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
                <motion.div
                  className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="flex flex-col items-center space-y-6">
                    {navLinks.map((link) => (
                      <motion.li
                        key={link.name}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={`text-xl font-medium ${
                            activeSection === link.name.toLowerCase()
                              ? "text-gradient-green"
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
                        className="px-6 py-3 bg-gradient-green text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
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
                        href="#login"
                        className="px-6 py-3 bg-gradient-green-blue text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity flex items-center"
                        onClick={toggleMenu}
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Login
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.div>
      </motion.header>
    </AnimatePresence>
  )
}


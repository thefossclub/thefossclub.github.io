"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { m, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useScrolled } from "@/hooks/use-scrolled"
import { DURATION, fadeRise, menuPanel, overlay } from "@/lib/motion"

interface NavbarProps {
  activeSection: string
}

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Events", href: "#events" },
  { name: "OCC", href: "#occ" },
  { name: "Team", href: "#team" },
  { name: "Resources", href: "#resources" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const scrolled = useScrolled()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const isDark = mounted && resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => setIsOpen((open) => !open)

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const navbarBg = scrolled
    ? isDark
      ? "bg-black/90 border-white/15"
      : "bg-white border-gray-200 shadow-md"
    : isDark
      ? "bg-gray-950/40 border-transparent"
      : "bg-white/80 border-transparent"

  const getTextColor = (isActive: boolean) => {
    if (isActive) return "text-green-500"
    return isDark ? "text-white" : "text-gray-900"
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div
          className={`container mx-auto px-4 py-2 rounded-full border transition-ui duration-200 ${navbarBg}`}
        >
          <nav className="flex justify-center items-center">
            {/* Logo and Title - left aligned */}
            <div className="flex items-center justify-start flex-1 min-w-0">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-8 h-8 bg-white flex items-center justify-center glow-effect-green flex-shrink-0">
                  <img
                    src="/LogoFOSS.webp"
                    alt="FC"
                    className="w-8 h-8 object-contain"
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
              {navLinks.map((link) => {
                const isActive = activeSection === link.name.toLowerCase()
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm font-medium relative transition-ui hover:text-green-500 ${getTextColor(isActive)}`}
                    >
                      {link.name}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-green origin-center transition-ui duration-200 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                )
              })}
              <li className="flex items-center space-x-4">
                <Link
                  href="/fosshack"
                  className="px-4 py-2 bg-gradient-green text-white rounded-full text-sm font-medium transition-ui hover:opacity-90 active:scale-[0.98] btn-glow whitespace-nowrap"
                >
                  FOSS Hack Archive
                </Link>
                {/* <Link
                  href="/login"
                  className="px-4 py-2 bg-gradient-green-blue text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center btn-glow"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link> */}
              </li>
            </ul>

            {/* Theme toggle and mobile menu button - right aligned */}
            <div className="flex items-center space-x-4 z-50 justify-end flex-1">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-ui btn-glow ${
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
                className={`md:hidden p-2 rounded-full transition-ui ${
                  isDark
                    ? "text-gray-300 hover:text-green-400 hover:bg-gray-800"
                    : "text-gray-700 hover:text-green-500 hover:bg-gray-100"
                }`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation - Outside header to avoid transform issues */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm md:hidden"
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={toggleMenu}
            />
            {/* Menu Panel */}
            <m.div
              className="fixed top-0 left-0 right-0 bottom-0 z-[101] flex items-center justify-center p-6 md:hidden pointer-events-none"
              variants={menuPanel}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.98, transition: { duration: DURATION.fast } }}
            >
              <div
                className={`pointer-events-auto relative rounded-2xl shadow-2xl px-6 py-8 w-full max-w-sm flex flex-col items-center border ${
                  isDark
                    ? "bg-black border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Close button */}
                <button
                  onClick={toggleMenu}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-ui ${
                    isDark
                      ? "text-gray-400 hover:text-white hover:bg-white/10"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>

                <ul className="flex flex-col items-center space-y-5 mt-4 w-full">
                  {navLinks.map((link) => (
                    <m.li key={link.name} variants={fadeRise}>
                      <Link
                        href={link.href}
                        className={`text-lg font-medium transition-ui hover:text-green-500 ${getTextColor(activeSection === link.name.toLowerCase())}`}
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </Link>
                    </m.li>
                  ))}
                  <m.li variants={fadeRise} className="pt-4 flex flex-col gap-3 w-full items-center">
                    <Link
                      href="/fosshack"
                      className="px-6 py-2.5 bg-gradient-green text-white rounded-full text-base font-medium transition-ui hover:opacity-90 active:scale-[0.98] inline-block"
                      onClick={toggleMenu}
                    >
                      FOSS Hack Archive
                    </Link>
                    {/* <Link
                      href="/login"
                      className="px-6 py-2.5 bg-gradient-green-blue text-white rounded-full text-base font-medium hover:opacity-90 transition-opacity inline-flex items-center"
                      onClick={toggleMenu}
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      Login
                    </Link> */}
                  </m.li>
                </ul>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

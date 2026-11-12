"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLenis } from "lenis/react"

interface OrgTopBarProps {
  pageTitle?: string
  backHref?: string
}

export default function OrgTopBar({ pageTitle: customPageTitle, backHref = "/" }: OrgTopBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const isDark = mounted && resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync scroll state with Lenis smooth scroll while preventing stale closures
  useLenis((lenis) => {
    const shouldBeScrolled = lenis.scroll > 50
    setScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev))
  })

  // Fallback scroll listener ensures navbar compresses properly when Lenis is inactive
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50
      setScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const getPageTitle = () => {
    if (customPageTitle) return customPageTitle
    if (!pathname) return "Code of Conduct"
    if (pathname.includes("whitepaper")) return "Whitepaper"
    if (pathname.includes("resources")) return "Resources"
    if (pathname.includes("branding")) return "Branding"
    if (pathname.includes("coc")) return "Code of Conduct"
    return "Code of Conduct"
  }

  const activeTitle = getPageTitle()

  const getNavbarBg = () => {
    if (scrolled) {
      return isDark
        ? "bg-black/90 border-white/15 backdrop-blur-md shadow-lg"
        : "bg-white/95 border-gray-200 shadow-md backdrop-blur-md"
    }
    return isDark
      ? "bg-gray-950/40 backdrop-blur-md"
      : "bg-white/80 backdrop-blur-md"
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3"
      }`}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className={`container mx-auto transition-all duration-300 ${
          scrolled
            ? `mx-4 sm:mx-auto px-4 py-2 rounded-full border ${getNavbarBg()}`
            : `px-4 ${getNavbarBg()}`
        }`}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <nav className="flex justify-between items-center h-11">
          {/* brand bar: Provides return route to homepage and dynamic active document indicator */}
          <div className="flex items-center min-w-0">
            <Link
              href={backHref}
              className="flex items-center space-x-3 min-w-0 group"
              title="Return to homepage"
            >
              <div className="w-8 h-8 bg-white flex items-center justify-center glow-effect-green flex-shrink-0 rounded-sm">
                <img
                  src="/LogoFOSS.webp"
                  alt="The FOSS Club"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div
                className={`text-base sm:text-lg font-bold truncate z-50 flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <span>The FOSS Club</span>
                <span className="text-muted-foreground/40 font-normal select-none">|</span>
                <span className="text-sm sm:text-base font-semibold text-green-500 truncate">
                  {activeTitle}
                </span>
              </div>
            </Link>
          </div>

          {/* Theme switcher: Uses mounted check to guarantee zero SSR hydration discrepancies */}
          <div className="flex items-center space-x-3 z-50">
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
          </div>
        </nav>
      </div>
    </header>
  )
}
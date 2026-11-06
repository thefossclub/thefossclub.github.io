"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronUp } from "lucide-react"
import { FaDiscord, FaMastodon, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { PiMatrixLogoFill } from "react-icons/pi"

/**
 * footer used on all of the organisation subpages.
 */
export default function SiteFooter() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <footer className="py-8 md:py-12 border-t border-border px-2 sm:px-4 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-green-500/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10 md:mb-16 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white flex items-center justify-center mr-3 glow-effect shadow-lg shadow-green-500/20 rounded-xl overflow-hidden">
                <img
                  src="/LogoFOSS.webp"
                  alt="FC"
                  className="w-14 h-14 object-contain mx-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground tracking-tight">
                The FOSS Club
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Learn, build, and collaborate with fellow open-source
              enthusiasts in a community dedicated to free and open source
              software.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <a href="https://github.com/thefossclub" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-muted transition-all shadow-sm">
                <FaGithub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://discord.gg/BgHwhRZg3r" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-muted transition-all shadow-sm">
                <FaDiscord className="h-4 w-4" />
                <span className="sr-only">Discord</span>
              </a>
              <a href="https://twitter.com/thefossclub" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-muted transition-all shadow-sm">
                <FaTwitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com/company/thefossclub" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-muted transition-all shadow-sm">
                <FaLinkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://instagram.com/thefossclub" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-muted transition-all shadow-sm">
                <FaInstagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://matrix.to/#/#thefossclub:matrix.org" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-muted transition-all shadow-sm">
                <PiMatrixLogoFill className="h-4 w-4" />
                <span className="sr-only">Matrix</span>
              </a>
              <a href="https://mas.to/@thefossclub" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 rounded-lg text-muted-foreground hover:text-green-500 hover:bg-muted transition-all shadow-sm">
                <FaMastodon className="h-4 w-4" />
                <span className="sr-only">Mastodon</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto text-left">
            <div className="flex flex-col">
              <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-6 after:h-0.5 after:bg-green-500 after:rounded-full">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/#home" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Home</Link></li>
                <li><Link href="/#about" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">About</Link></li>
                <li><Link href="/#projects" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Projects</Link></li>
                <li><Link href="/#events" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Events</Link></li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-6 after:h-0.5 after:bg-green-500 after:rounded-full">
                Organization
              </h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/coc" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Code of Conduct</Link></li>
                <li><Link href="/branding" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Branding</Link></li>
                <li><Link href="/whitepaper" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Whitepaper</Link></li>
                <li><Link href="/resources" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Resources</Link></li>
              </ul>
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1">
              <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-6 after:h-0.5 after:bg-green-500 after:rounded-full">
                Contact
              </h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="https://linktr.ee/thefossclub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">LinkTree</Link></li>
                <li><Link href="mailto:contact@thefossclub.org" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Email Us</Link></li>
                <li><Link href="https://discord.gg/BgHwhRZg3r" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-500 transition-all hover:translate-x-1 inline-block">Discord</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} The FOSS Club. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-right pr-0 md:pr-12">
            Made with <span className="text-green-500">💚</span> by open source enthusiasts
          </p>

          <button
            onClick={() => {
              if (window.lenis) {
                // @ts-expect-error - lenis is added to window by SmoothScroll component
                window.lenis.scrollTo(0, { duration: 1.5 });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 group bg-muted hover:bg-green-500/10 border border-transparent hover:border-green-500/30 p-2.5 rounded-xl text-foreground hover:text-green-500 transition-all items-center justify-center"
            aria-label="Back to top"
          >
            <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

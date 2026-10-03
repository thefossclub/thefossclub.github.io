"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"

const editions = [2024, 2025, 2026]

export default function FosshackArchiveNavbar() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const activeYear = pathname.match(/^\/fosshack\/(2024|2025|2026)\/?$/)?.[1]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-2xl border border-foreground/10 bg-background/80 px-2 py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl sm:gap-3 sm:rounded-full sm:px-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/" aria-label="The FOSS Club home" className="flex h-7 w-7 shrink-0 items-center justify-center bg-white sm:h-8 sm:w-8">
            <img src="/LogoFOSS.webp" alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
          </Link>
          <Link href="/" className="truncate text-xs font-bold text-foreground sm:text-sm">The FOSS Club</Link>
          <Link href="/fosshack" className="hidden truncate border-l border-foreground/15 pl-3 text-sm font-semibold text-foreground sm:block">FOSS Hack</Link>
        </div>

        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <Link href="/fosshack" className={`hidden rounded-full px-3 py-2 text-sm font-medium transition sm:block ${!activeYear ? "bg-accent-light-green/15 text-accent-light-green" : "text-foreground/65 hover:text-foreground"}`}>
            Archive
          </Link>
          <div className="flex shrink-0 items-center rounded-full border border-foreground/10 p-0.5 sm:p-1" aria-label="FOSS Hack editions">
            {editions.map((year) => (
              <Link
                key={year}
                href={`/fosshack/${year}`}
                aria-current={activeYear === String(year) ? "page" : undefined}
                className={`rounded-full px-1.5 py-1.5 text-[11px] font-semibold transition sm:px-3 sm:text-sm ${activeYear === String(year) ? "bg-accent-light-green text-background" : "text-foreground/60 hover:bg-foreground/8 hover:text-foreground"}`}
              >
                {year}
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/70 transition hover:bg-foreground/8 hover:text-foreground sm:h-9 sm:w-9"
          >
            {mounted ? resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" /> : <span className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/70 transition hover:bg-foreground/8 hover:text-foreground sm:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-foreground/10 bg-background/95 p-3 shadow-xl backdrop-blur-xl sm:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground/75 hover:bg-foreground/8">The FOSS Club home</Link>
          <Link href="/fosshack" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground/75 hover:bg-foreground/8">FOSS Hack archive</Link>
          {editions.map((year) => (
            <Link key={year} href={`/fosshack/${year}`} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 text-sm font-medium ${activeYear === String(year) ? "text-accent-light-green" : "text-foreground/75 hover:bg-foreground/8"}`}>
              FOSS Hack {year}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

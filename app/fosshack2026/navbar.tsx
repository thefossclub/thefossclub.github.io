"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";

interface Fosshack2026NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Overview", href: "#overview" },
  { name: "Journey", href: "#journey" },
  { name: "Gallery", href: "#gallery" },
  { name: "Winners", href: "#winners" },
  { name: "Posts", href: "#posts" },
  { name: "Team", href: "#team" },
];

export default function Fosshack2026Navbar({
  theme,
  onToggleTheme,
}: Fosshack2026NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-foreground/10 bg-background/70 px-4 py-2.5 backdrop-blur-md">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Back to The FOSS Club homepage"
        >
          <img
            src="/LogoFOSS.webp"
            alt="FC"
            className="h-7 w-7 object-contain"
          />
          <span className="truncate text-base font-bold text-foreground">
            The FOSS Club
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 transition-colors ${
              theme === "light"
                ? "bg-white text-[#141414]"
                : "bg-white/10 text-white"
            }`}
          >
            {theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground/8 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-foreground/10 bg-background/90 p-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/8 hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-accent-green to-accent-light-green px-4 py-3 text-center text-base font-semibold text-[#141414]"
            >
              Back to Home
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

import { Download, Palette, Type, Layers } from "lucide-react"
import OrgContentSection from "@/components/organisation/org-content-section"
import OrgCard from "@/components/organisation/org-card"
import OrgListItem from "@/components/organisation/org-list-item"

export const metadata = {
  title: "Branding | The FOSS Club",
  description:
    "The FOSS Club branding guidelines — logo files, color codes, typography recommendations, and downloadable assets.",
}

const brandAssets = [
  {
    name: "Standard Club Logo",
    filename: "LogoFOSS.webp",
    href: "/LogoFOSS.webp",
    format: "WebP (High-Res)",
    desc: "Our primary square logo with the terminal FOSS emblem.",
  },
  {
    name: "Dark Theme Banner",
    filename: "The FOSS Club Logo Dark.webp",
    href: "/The%20FOSS%20Club%20Logo%20Dark.webp",
    format: "WebP (Banner)",
    desc: "Horizontal banner with text, designed for dark backgrounds and presentations.",
  },
  {
    name: "Favicon / Shortcut Icon",
    filename: "FOSS.ico",
    href: "/FOSS.ico",
    format: "ICO",
    desc: "Standard icon for browser tabs and web application bookmarks.",
  },
  {
    name: "Small Icon",
    filename: "LogoFOSS-small.webp",
    href: "/LogoFOSS-small.webp",
    format: "WebP (Icon)",
    desc: "Compact icon for small avatars, headers, and social icons.",
  },
]

export default function BrandingPage() {
  return (
    <main className="relative min-h-screen text-foreground">
      {/* Brand Identity Intro: Official visual standards for posters, presentations, websites, and hackathons */}
      <section className="pt-28 sm:pt-36 pb-6 sm:pb-8 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gradient-green tracking-tight">
            Branding and Assets
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-6">
            These guidelines help keep our visual identity clear and consistent across event posters,
            presentations, websites, and community materials. You can find our logo files, color codes,
            and font choices below.
          </p>
        </div>
      </section>

      {/* Section 1: Logo Application — Contrast rules, aspect ratio preservation, and clear-space standards */}
      <OrgContentSection
        title="1. Logo and Usage"
        description="How to use our logo properly across different backgrounds."
        id="logo"
      >
        <OrgCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* High-contrast dark presentation: Emphasizes the white badge container on dark canvases */}
            <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-gray-950 border border-white/10 shadow-inner">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg glow-effect-green">
                <img
                  src="/LogoFOSS.webp"
                  alt="The FOSS Club Logo on Dark"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-gray-200 block">Dark Background</span>
                <span className="text-[11px] text-gray-400">Keep the white backing container for clear contrast</span>
              </div>
            </div>

            {/* Clean light presentation: Demonstrates clean border containment on light backgrounds */}
            <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-inner">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2 shadow-md">
                <img
                  src="/LogoFOSS.webp"
                  alt="The FOSS Club Logo on Light"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-gray-800 block">Light Background</span>
                <span className="text-[11px] text-gray-500">Works cleanly with a subtle border</span>
              </div>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold mb-3 text-gradient-green">
            Guidelines:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {[
              "Leave enough breathing room around the logo so it stays easy to recognize.",
              "Do not stretch, squeeze, or rotate the logo out of proportion.",
              "Avoid placing the logo on busy or low-contrast backgrounds.",
              "Keep the original colors intact whenever possible.",
              "Use the highest resolution files available when creating print materials.",
            ].map((rule) => (
              <OrgListItem key={rule}>{rule}</OrgListItem>
            ))}
          </ul>
        </OrgCard>
      </OrgContentSection>

      {/* Section 2: Color Palette — Primary brand greens (#22B34F, #4ADE80) and neutral surface tokens */}
      <OrgContentSection
        title="2. Color Palette"
        description="Our primary green accents and neutral background shades."
        id="colors"
      >
        <OrgCard>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-green-500" />
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Primary Colors
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
            {[
              { name: "FOSS Green (Primary)", hex: "#22B34F", rgb: "34, 179, 79", text: "text-white" },
              { name: "Dark Green", hex: "#15803D", rgb: "21, 128, 61", text: "text-white" },
              { name: "Light Green", hex: "#4ADE80", rgb: "74, 222, 128", text: "text-gray-900" },
              { name: "Accent Cyan", hex: "#0EA5E9", rgb: "14, 165, 233", text: "text-white" },
            ].map((col) => (
              <div key={col.hex} className="flex flex-col gap-1.5">
                <div
                  className={`h-20 sm:h-24 rounded-2xl shadow-md p-3 flex flex-col justify-between ${col.text}`}
                  style={{ backgroundColor: col.hex }}
                >
                  <span className="text-[10px] font-mono opacity-80 uppercase">RGB: {col.rgb}</span>
                  <span className="text-xs font-mono font-bold">{col.hex}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-foreground block">{col.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Neutral Shades
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {[
              { name: "Black", hex: "#000000", role: "Dark Canvas", text: "text-white", border: "border-white/10" },
              { name: "Dark Surface", hex: "#0B0F19", role: "Dark Cards", text: "text-white", border: "border-white/10" },
              { name: "Light Gray", hex: "#F9FAFB", role: "Light Cards", text: "text-gray-900", border: "border-gray-200" },
              { name: "White", hex: "#FFFFFF", role: "Light Canvas", text: "text-gray-900", border: "border-gray-200" },
            ].map((col) => (
              <div key={col.hex} className="flex flex-col gap-1.5">
                <div
                  className={`h-20 sm:h-24 rounded-2xl shadow-sm border p-3 flex flex-col justify-between ${col.border} ${col.text}`}
                  style={{ backgroundColor: col.hex }}
                >
                  <span className="text-[10px] font-mono opacity-70">{col.role}</span>
                  <span className="text-xs font-mono font-bold">{col.hex}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-foreground block">{col.name}</span>
                </div>
              </div>
            ))}
          </div>
        </OrgCard>
      </OrgContentSection>

      {/* Section 3: Typography — Inter font hierarchy, weight conventions, and monospace terminal styling */}
      <OrgContentSection
        title="3. Typography"
        description="The font choices we use across our web pages and documents."
        id="typography"
      >
        <OrgCard>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-4 h-4 text-green-500" />
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Main Font: Inter
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 sm:p-5 rounded-2xl bg-background/60 border border-border/80">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                Main Heading — Inter Extrabold
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                The FOSS Club at Delhi Technical Campus
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-background/60 border border-border/80">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                Section Heading — Inter Bold
              </span>
              <p className="text-lg sm:text-xl font-bold text-gradient-green">
                Free and Open Source Software for Everyone
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-background/60 border border-border/80">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                Body Text — Inter Regular
              </span>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                We help students learn, build, and share open source software together.
                Our workshops and events focus on programming, cybersecurity, and open hardware.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-background/60 border border-border/80">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono block mb-1">
                Monospace — Code and Terminal
              </span>
              <p className="font-mono text-xs sm:text-sm text-green-600 dark:text-green-400">
                git clone https://github.com/thefossclub/thefossclub.github.io.git
              </p>
            </div>
          </div>
        </OrgCard>
      </OrgContentSection>

      {/* Section 4: Official Assets — Direct downloads for high-resolution WebP and ICO files in /public */}
      <OrgContentSection
        title="4. Download Brand Assets"
        description="Official logo files and icons ready for download."
        id="downloads"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brandAssets.map((asset) => (
            <OrgCard key={asset.filename} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-green-600 dark:text-green-400 border border-primary/20">
                    {asset.format}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono">{asset.filename}</span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">{asset.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  {asset.desc}
                </p>
              </div>

              <a
                href={asset.href}
                download={asset.filename}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border border-border bg-background hover:bg-card hover:border-green-500/40 text-foreground transition-all"
              >
                <Download className="w-4 h-4 text-green-500" />
                <span>Download File</span>
              </a>
            </OrgCard>
          ))}
        </div>
      </OrgContentSection>

    </main>
  )
}

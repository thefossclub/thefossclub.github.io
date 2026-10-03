import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SmoothScroll from "@/components/smooth-scroll"
import InteractiveBackground from "@/components/ui/interactivebackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "The FOSS Club",
  description: "Learn, build, and collaborate with fellow open-source enthusiasts.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <title>The FOSS Club</title>
        <meta name="description" content="Learn, build, and collaborate with fellow open-source enthusiasts in a community dedicated to free and open source software." />
        <link rel="icon" href="/FOSS.ico" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <InteractiveBackground />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}


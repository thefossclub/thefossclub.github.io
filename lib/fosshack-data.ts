export interface FosshackEdition {
  year: 2024 | 2025 | 2026
  edition: string
  date: string
  mode: string
  description: string
  image: string
  prizePool?: string
  stats?: { label: string; value: string }[]
  timeline?: { date: string; title: string }[]
  localhosts?: { name: string; venue: string; url?: string }[]
  links?: { label: string; url: string }[]
}

export const fosshackEditions: FosshackEdition[] = [
  {
    year: 2024,
    edition: "Fourth edition",
    date: "27-28 July 2024",
    mode: "Hybrid",
    description:
      "A hybrid hackathon bringing students and professionals together to build or extend free and open source software.",
    image: "/Hack24.webp",
    prizePool: "Up to ₹10 lakh",
    stats: [
      { label: "Participants", value: "3,585" },
      { label: "Projects", value: "397" },
      { label: "Teams", value: "1,567" },
    ],
    timeline: [
      { date: "27 July, 8:00 AM", title: "Hackathon starts" },
      { date: "28 July, 8:00 PM", title: "Hackathon ends" },
      { date: "4 weeks later", title: "Results announced" },
    ],
    localhosts: [
      {
        name: "Delhi-NCR",
        venue: "Delhi Technical Campus",
        url: "https://forum.fossunited.org/t/foss-hack-localhost-dtc-greater-noida/3258",
      },
    ],
    links: [
      { label: "Official event page", url: "https://fossunited.org/fosshack/2024" },
      { label: "Project submissions", url: "https://fossunited.org/hack/fosshack24/projects/all" },
      { label: "Results announcement", url: "https://forum.fossunited.org/t/foss-hack-2024-results/3964" },
      { label: "Rules", url: "https://fossunited.org/fosshack/rules" },
    ],
  },
  {
    year: 2025,
    edition: "Fifth edition",
    date: "22-23 February 2025",
    mode: "Hybrid",
    description:
      "A nationwide hybrid hackathon for students and professionals building or extending free and open source software.",
    image: "/Hack25.webp",
    prizePool: "₹5,00,000",
    stats: [
      { label: "Participants", value: "5,394" },
      { label: "Teams", value: "2,190" },
      { label: "Project submissions", value: "756" },
      { label: "Local hosts", value: "10" },
    ],
    timeline: [
      { date: "4 January 2025", title: "Registrations open" },
      { date: "21 February 2025", title: "Registrations close" },
      { date: "22-23 February 2025", title: "Hackathon days" },
      { date: "20 March 2025", title: "Results announced" },
    ],
    localhosts: [
      {
        name: "Delhi-NCR",
        venue: "Delhi Technical Campus",
        url: "https://fossunited.org/hack/fosshack25/host/delhi",
      },
    ],
    links: [
      { label: "Official event page", url: "https://fossunited.org/fosshack/2025" },
      { label: "Hackathon home", url: "https://fossunited.org/hack/fosshack25" },
      { label: "Project submissions", url: "https://fossunited.org/hack/fosshack25/projects/all" },
      { label: "Results announcement", url: "https://forum.fossunited.org/t/foss-hack-2025-results/5541" },
      { label: "Rules", url: "https://fossunited.org/fosshack/rules" },
    ],
  },
  {
    year: 2026,
    edition: "Sixth edition",
    date: "1-31 March 2026",
    mode: "Month-long hybrid hackathon",
    description:
      "A month of building, learning, mapping, and open-source collaboration across Delhi-NCR and the wider community.",
    image: "/fosshack2026/FOSSHack2026.webp",
    prizePool: "₹5,00,000",
    stats: [
      { label: "Registrations", value: "5,430" },
      { label: "Projects submitted", value: "800" },
      { label: "Community partners", value: "10+" },
    ],
    links: [
      { label: "Results", url: "https://forum.fossunited.org/t/foss-hack-2026-results/8094" },
      { label: "Project submissions", url: "https://fossunited.org/hack/fosshack26/projects/all" },
    ],
  },
]

export function getFosshackEdition(year: number) {
  return fosshackEditions.find((edition) => edition.year === year)
}

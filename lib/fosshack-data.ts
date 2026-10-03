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
  gallery?: {
    title: string
    description: string
    photos: { src: string; alt: string; caption: string; sourceUrl?: string }[]
  }
}

const fosshack2026GalleryPhotos = [
  { src: "/fosshack2026/register.webp", alt: "Registrations", caption: "Registrations" },
  { src: "/fosshack2026/register2.webp", alt: "Photo Booth", caption: "Photo Booth" },
  { src: "/fosshack2026/register3.webp", alt: "Photo Booth", caption: "Photo Booth" },
  { src: "/fosshack2026/register4.webp", alt: "Registrations", caption: "Registrations" },
  { src: "/fosshack2026/cake.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2026/lab2.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2026/lab3.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2026/lab4.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2026/scribble.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2026/cake2.webp", alt: "Cake Cutting and Celebration", caption: "Cake Cutting and Celebration" },
  { src: "/fosshack2026/jamming2.webp", alt: "Jamming session", caption: "Jamming session" },
  { src: "/fosshack2026/jamming3.webp", alt: "Jamming session", caption: "Jamming session" },
  { src: "/fosshack2026/food.webp", alt: "Food and breaks", caption: "Food and breaks" },
  { src: "/fosshack2026/food2.webp", alt: "Food and refreshments", caption: "Food and refreshments" },
  { src: "/fosshack2026/icards.webp", alt: "Event ID cards", caption: "Event ID cards" },
  { src: "/fosshack2026/jamming.webp", alt: "Jamming session", caption: "Jamming session" },
]

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
    gallery: {
      title: "FOSS Hack 2024 gallery",
      description: "Using FOSS Hack 2026 archive photos until photos from the 2024 edition are added.",
      photos: fosshack2026GalleryPhotos,
    },
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
    gallery: {
      title: "FOSS Hack 2025 gallery",
      description: "Using FOSS Hack 2026 archive photos until photos from the 2025 edition are added.",
      photos: fosshack2026GalleryPhotos,
    },
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

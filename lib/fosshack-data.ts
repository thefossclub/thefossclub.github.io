export interface FosshackEdition {
  year: 2024 | 2025 | 2026
  edition: string
  date: string
  mode: string
  description: string
  image: string
  mobileImage?: string
  prizePool?: string
  stats?: { label: string; value: string }[]
  timeline?: { date: string; title: string }[]
  localhosts?: { name: string; venue: string; url?: string; mapUrl?: string }[]
  links?: { label: string; url: string }[]
  gallery?: {
    title: string
    description: string
    photos: { src: string; alt: string; caption: string; sourceUrl?: string }[]
  }
  team?: { name: string; role: string }[]
  sponsors?: { name: string; tier: string; logo?: string }[]
  socialPosts?: { image: string; caption: string; url: string; platform: string }[]
}

const fosshack2024GalleryPhotos = [
  { src: "/fosshack2024/gallery1.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2024/gallery2.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2024/gallery3.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2024/gallery4.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2024/gallery5.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2024/gallery6.webp", alt: "Event photograph", caption: "Event photograph" },
]

const fosshack2025GalleryPhotos = [
  { src: "/fosshack2025/gallery1.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery2.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery3.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery4.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery5.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery6.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery7.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery8.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery9.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery10.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery11.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery12.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery13.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery14.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery15.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery16.webp", alt: "Event photograph", caption: "Event photograph" },
  { src: "/fosshack2025/gallery17.webp", alt: "Event photograph", caption: "Event photograph" },
]

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
    mobileImage: "/Hack24-mobile.webp",
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
    gallery: {
      title: "FOSSHACK 2024 gallery",
      description: "Moments from the fourth edition of FOSS Hack.",
      photos: fosshack2024GalleryPhotos,
    },
    socialPosts: [
      { image: "/fosshack2024/post1.webp", caption: "FOSS Hack 2024 was a tremendous success", url: "https://www.instagram.com/p/C-QMRf4Se6L/", platform: "Instagram" },
      { image: "/fosshack2024/post2.webp", caption: "FOSS-HACK 2024 lands at DTC Greater Noida", url: "https://www.instagram.com/p/C8j5m0zy6qP/", platform: "Instagram" },
      { image: "/fosshack2024/post3.webp", caption: "Hackers from across Delhi NCR gathered for a day of coding and collaboration", url: "https://www.instagram.com/p/C-QLedHSII-/", platform: "Instagram" },
    ],
    links: [
      { label: "Official event page", url: "https://fossunited.org/fosshack/2024" },
      { label: "Rules", url: "https://fossunited.org/fosshack/rules" },
      { label: "Project submissions", url: "https://fossunited.org/hack/fosshack24/projects/all" },
      { label: "Results announcement", url: "https://forum.fossunited.org/t/foss-hack-2024-results/3964" },
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
    mobileImage: "/Hack25-mobile.webp",
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
    gallery: {
      title: "FOSSHACK 2025 gallery",
      description: "FOSSHACK 2025 at Delhi Technical Campus, Greater Noida.",
      photos: fosshack2025GalleryPhotos,
    },
    socialPosts: [
      { image: "/fosshack2025/post1.webp", caption: "FOSS Hack 2025 venue and dates revealed", url: "https://www.instagram.com/p/DFmAEl5hjiL/", platform: "Instagram" },
      { image: "/fosshack2025/post2.webp", caption: "FOSS Hack was more than just a hackathon", url: "https://www.instagram.com/p/DIB9QerBezj/?img_index=2", platform: "Instagram" },
      { image: "/fosshack2025/post3.webp", caption: "Loading… Mission: Reach the Venue", url: "https://www.instagram.com/reel/DGPcXpnSncw/", platform: "Instagram" },
    ],
    sponsors: [{ name: "The Linux Foundation", tier: "Gold", logo: "/fosshack/linux-foundation.png" }],
    team: [
      { name: "Vaibhav", role: "Lead Organizer, Graphics Head, Logistics Work" },
      { name: "Ashwany", role: "Media Head" },
      { name: "Vanya", role: "Social Media Head" },
      { name: "Nishchal", role: "Decoration Head, Mess Handling" },
      { name: "Sachin", role: "Community Partners Head" },
      { name: "Riyansh", role: "Campus Ambassador Head" },
      { name: "Sanjam", role: "Content Writing" },
      { name: "Diti", role: "Auditorium Work" },
      { name: "Suryansh", role: "Event Handling" },
      { name: "Satyam", role: "Tasks Master" },
      { name: "Shresth", role: "Discipline" },
      { name: "Jayesh", role: "Registration Desk" },
    ],
    links: [
      { label: "Official event page", url: "https://fossunited.org/fosshack/2025" },
      { label: "Hackathon home", url: "https://fossunited.org/hack/fosshack25" },
      { label: "Rules", url: "https://fossunited.org/fosshack/rules" },
      { label: "Project submissions", url: "https://fossunited.org/hack/fosshack25/projects/all" },
      { label: "Results announcement", url: "https://forum.fossunited.org/t/foss-hack-2025-results/5541" },
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

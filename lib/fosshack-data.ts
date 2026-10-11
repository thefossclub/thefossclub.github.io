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
  { src: "/fosshack2024/gallery1.webp", alt: "Speaker addressing attendees from the FOSS Hack 2024 podium", caption: "Stage" },
  { src: "/fosshack2024/gallery2.webp", alt: "Presenter speaking from the stage beside a projected slide", caption: "Stage" },
  { src: "/fosshack2024/gallery3.webp", alt: "Auditorium seating and stage prepared for FOSS Hack 4.0", caption: "Auditorium" },
  { src: "/fosshack2024/gallery4.webp", alt: "FOSS Hack welcome standees displayed outside the venue entrance", caption: "Welcome" },
  { src: "/fosshack2024/gallery5.webp", alt: "Participants seated at computers during the hackathon", caption: "Labs" },
  { src: "/fosshack2024/gallery6.webp", alt: "Hackers working at desktop computer stations in the lab", caption: "Labs" },
  { src: "/fosshack2024/gallery7.webp", alt: "Attendees meeting with the registration desk team over event paperwork", caption: "Registration" },
  { src: "/fosshack2024/gallery8.webp", alt: "Attendees gathering around the food table during a meal break", caption: "Food & Refreshments" },
  { src: "/fosshack2024/gallery9.webp", alt: "Participants building projects at computer workstations", caption: "Labs" },
  { src: "/fosshack2024/gallery10.webp", alt: "Group photo of participants and organizers on the FOSS Hack 2024 stage", caption: "Group Photo" },
  { src: "/fosshack2024/gallery11.webp", alt: "A volunteer serving refreshments to attendees at the food counter", caption: "Food & Refreshments" },
  { src: "/fosshack2024/gallery12.webp", alt: "Hackathon attendees seated together in the auditorium during a session", caption: "Auditorium" },
  { src: "/fosshack2024/gallery13.webp", alt: "Participants sharing ideas and discussing work beside a computer", caption: "Collaboration" },
  { src: "/fosshack2024/gallery14.webp", alt: "Participants collaborating and reviewing work at a computer station", caption: "Collaboration" },
  { src: "/fosshack2024/gallery15.webp", alt: "Hackers concentrating on their work at desktop computers", caption: "Labs" },
  { src: "/fosshack2024/gallery16.webp", alt: "Participants working at computer stations during the hackathon", caption: "Labs" },
]

const fosshack2025GalleryPhotos = [
  {
    src: "/fosshack2025/gallery1.webp",
    alt: "FOSS Hack 2025 participants and organizers posing together at the front of the auditorium",
    caption: "Group Photo",
  },
  {
    src: "/fosshack2025/gallery2.webp",
    alt: "Participants collaborating around laptops and desktop computers during the hackathon",
    caption: "Labs",
  },
  {
    src: "/fosshack2025/gallery3.webp",
    alt: "A large group of participants posing on stage behind the FOSS Hack 2025 display",
    caption: "Group Photo",
  },
  {
    src: "/fosshack2025/gallery5.webp",
    alt: "Attendees gathering at a counter with stacks of event merchandise inside a campus room",
    caption: "Registration",
  },
  {
    src: "/fosshack2025/gallery6.webp",
    alt: "A participant working on a laptop at an individual workstation",
    caption: "Labs",
  },
  {
    src: "/fosshack2025/gallery7.webp",
    alt: "A mentor standing behind participants and reviewing their work at a computer",
    caption: "Mentorship",
  },
  {
    src: "/fosshack2025/gallery8.webp",
    alt: "Participants seated around an outdoor bonfire while a guitarist performs",
    caption: "Bonfire",
  },
  {
    src: "/fosshack2025/gallery9.webp",
    alt: "A musician playing guitar beside a bonfire as attendees watch from the courtyard steps",
    caption: "Bonfire",
  },
  {
    src: "/fosshack2025/gallery10.webp",
    alt: "Participants gathered around a bonfire in the campus courtyard at night",
    caption: "Bonfire",
  },
  {
    src: "/fosshack2025/gallery14.webp",
    alt: "Attendees checking in at an outdoor registration table with organizers",
    caption: "Registration",
  },
  {
    src: "/fosshack2025/gallery15.webp",
    alt: "Participants chatting together in a campus corridor during the event",
    caption: "Mentorship",
  },
  {
    src: "/fosshack2025/gallery16.webp",
    alt: "Attendees gathering around desks inside a campus room near the registration area",
    caption: "Registration",
  },
  {
    src: "/fosshack2025/gallery17.webp",
    alt: "Participants collecting food from an outdoor table covered with plates of refreshments",
    caption: "Food & Refreshments",
  },
  {
    src: "/fosshack2025/gallery18.webp",
    alt: "Attendees serving and sharing food at an outdoor refreshment table",
    caption: "Food & Refreshments",
  },
  {
    src: "/fosshack2025/gallery19.webp",
    alt: "Rows of auditorium seats facing the stage and event presentation screen",
    caption: "Auditorium",
  },
  {
    src: "/fosshack2025/gallery21.webp",
    alt: "Participants discussing their work together around a desktop computer in the lab",
    caption: "Labs",
  },
  {
    src: "/fosshack2025/gallery22.webp",
    alt: "Hackathon participants working at a shared workstation with computers and a whiteboard",
    caption: "Labs",
  },
  {
    src: "/fosshack2025/gallery23.webp",
    alt: "Mentorship during FOSS Hack 2025",
    caption: "Mentorship",
  },
  {
    src: "/fosshack2025/gallery24.webp",
    alt: "Auditorium seating during FOSS Hack 2025",
    caption: "Auditorium",
  },
  {
    src: "/fosshack2025/gallery25.webp",
    alt: "The stage during FOSS Hack 2025",
    caption: "Stage",
  },
  {
    src: "/fosshack2025/gallery26.webp",
    alt: "A participant receiving an award from an organizer on stage",
    caption: "Awards",
  },
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

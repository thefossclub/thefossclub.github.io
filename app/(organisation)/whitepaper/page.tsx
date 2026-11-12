import { ExternalLink, FileText, Download, GitBranch, Calendar, User } from "lucide-react"
import OrgContentSection from "@/components/organisation/org-content-section"
import OrgCard from "@/components/organisation/org-card"
import OrgListItem from "@/components/organisation/org-list-item"

export const metadata = {
  title: "Whitepaper | The FOSS Club",
  description:
    "The official FOSS Club Whitepaper by Vaibhav Pratap Singh — principles, the four freedoms of software, core focus areas, ideology, vision, and membership at Delhi Technical Campus.",
}

const fourFreedoms = [
  {
    num: "0",
    name: "Freedom 0",
    title: "Freedom to Run",
    desc: "The liberty to use the software for any purpose, without restrictions.",
  },
  {
    num: "1",
    name: "Freedom 1",
    title: "Freedom to Study and Modify",
    desc: "The ability to examine the source code and alter it to suit your needs.",
  },
  {
    num: "2",
    name: "Freedom 2",
    title: "Freedom to Redistribute",
    desc: "The right to share the software with others, fostering a spirit of community and collaboration.",
  },
  {
    num: "3",
    name: "Freedom 3",
    title: "Freedom to Improve and Share",
    desc: "The capability to enhance the software and distribute your modifications, benefiting the entire community.",
  },
]

const engineeringBenefits = [
  {
    title: "Improving Core Skills",
    desc: "Working with FOSS lets you explore real-world code used in production. This hands-on experience strengthens your understanding of key engineering principles and gives you practical knowledge that goes beyond theory.",
  },
  {
    title: "Making a Global Impact",
    desc: "FOSS allows you to contribute to software that is used by people worldwide. By working on projects like Linux or Firefox, you play a part in creating tools that make a difference on a large scale.",
  },
  {
    title: "Better Career Opportunities",
    desc: "Companies value engineers who have experience with open-source projects. Your work in FOSS shows that you can solve real problems and collaborate with teams, which can help you stand out when applying for high-paying jobs in the tech industry.",
  },
  {
    title: "Learning from a Global Community",
    desc: "FOSS projects involve developers from around the world. By contributing, you learn from experienced professionals, receive feedback on your code, and improve both your technical and teamwork skills.",
  },
  {
    title: "Staying Ahead in Innovation",
    desc: "FOSS is often at the forefront of new technologies. When you engage with open-source projects, you get to work on cutting-edge tools and ideas before they become mainstream.",
  },
  {
    title: "Freedom to Innovate",
    desc: "FOSS allows you to modify and customize software freely, without being limited by proprietary rules. This gives you the flexibility to experiment and innovate in ways that aren't possible with closed-source software.",
  },
]

const expertiseDomains = [
  {
    name: "Command Line Interface (CLI)",
    desc: "Mastering the power and efficiency of command-line tools and shell scripting.",
  },
  {
    name: "Linux",
    desc: "Deep diving into various Linux distributions, system administration, and kernel development.",
  },
  {
    name: "Git Contributions",
    desc: "Honing skills in collaborative development through Git, including advanced workflows and best practices.",
  },
  {
    name: "Digital Privacy",
    desc: "Exploring tools and techniques for maintaining privacy in the digital age.",
  },
  {
    name: "Internet Data Security",
    desc: "Understanding the intricacies of securing data in transit and at rest across the internet.",
  },
  {
    name: "Self-Hosting",
    desc: "Setting up and maintaining personal servers and services to reduce reliance on third-party providers.",
  },
  {
    name: "Low-Level Programming",
    desc: "Delving into systems programming, embedded systems, and hardware-software interfaces.",
  },
  {
    name: "Open Hardware Projects",
    desc: "Exploring the intersection of open source software and open hardware initiatives.",
  },
  {
    name: "Blockchain",
    desc: "Investigating the technical foundations and potential applications of blockchain technology beyond cryptocurrencies.",
  },
]

const corePrinciples = [
  {
    title: "Freedom and Openness",
    desc: "We believe that software freedom is essential for technological progress and individual empowerment. This includes the freedom to use, study, modify, and distribute software without arbitrary restrictions.",
  },
  {
    title: "Collaboration Over Competition",
    desc: "We champion the idea that collaborative efforts often yield superior results compared to siloed, competitive approaches. By pooling our knowledge and resources, we can tackle complex challenges more effectively.",
  },
  {
    title: "Knowledge Sharing",
    desc: "Information and knowledge should be freely accessible and shared. We strive to create an environment where learning is a communal activity, and everyone both teaches and learns from one another.",
  },
  {
    title: "Meritocracy of Ideas",
    desc: "We value ideas and contributions based on their merit, not on the status or background of the individual presenting them. This fosters an inclusive environment where innovation can come from anyone.",
  },
  {
    title: "Ethical Computing",
    desc: "We promote the responsible and ethical use of technology, considering the broader implications of our work on society and individual rights.",
  },
]

const references = [
  {
    id: "FOSSUnited",
    title: "FOSS United",
    year: "2024",
    desc: "FOSS United Foundation: Promoting the Free and Open Source Software ecosystem in India.",
    url: "https://fossunited.org",
  },
  {
    id: "IndiaFOSS",
    title: "IndiaFOSS",
    year: "2024",
    desc: "Annual Free and Open Source Software Conference organized by FOSS United.",
    url: "https://indiafoss.net",
  },
  {
    id: "LinuxDelhi",
    title: "Linux User Group Delhi",
    year: "2024",
    desc: "Community for Linux enthusiasts in Delhi.",
    url: "https://linuxdelhi.org",
  },
  {
    id: "HackerMeetup",
    title: "Hacker Meetup",
    year: "2024",
    desc: "A community for hackers to collaborate and learn.",
    url: "https://hackermeetup.com",
  },
  {
    id: "OpenStreetMap",
    title: "OpenStreetMap India",
    year: "2024",
    desc: "Contributing to the global map.",
    url: "https://openstreetmap.in",
  },
  {
    id: "amFOSS",
    title: "amFOSS",
    year: "2024",
    desc: "A movement to promote Free and Open Source Software in academic institutions.",
    url: "https://amfoss.in",
  },
  {
    id: "FSF",
    title: "Free Software Foundation",
    year: "2024",
    desc: "Dedicated to promoting computer user freedom.",
    url: "https://www.fsf.org",
  },
  {
    id: "Robocon",
    title: "DD Robocon",
    year: "2024",
    desc: "National Robotics Competition organized by IIT Delhi.",
    url: "https://www.ddrobocon.in",
  },
  {
    id: "Robotex",
    title: "Robotex India",
    year: "2024",
    desc: "Annual robotics competition promoting technology among students.",
    url: "https://www.robotex-india.in",
  },
  {
    id: "OpenHardwareHackathon",
    title: "National Level Open Hardware-IoT Geospatial Hackathon",
    year: "2024",
    desc: "Event combining open hardware and IoT technologies.",
    url: "https://iot-gis-hackathon.fossee.in",
  },
  {
    id: "Web3Conf",
    title: "Web3Conf India",
    year: "2024",
    desc: "Conference and hackathon focused on Web3 technologies.",
    url: "https://dorahacks.io",
  },
  {
    id: "IIScBlockchain",
    title: "IISc Blockchain Club",
    year: "2024",
    desc: "Fostering innovation in blockchain technology at IISc.",
    url: "https://www.iiscblockchainclub.com",
  },
  {
    id: "IndiaBlockchainAlliance",
    title: "India Blockchain Alliance",
    year: "2024",
    desc: "Promoting blockchain technology in India.",
    url: "https://indiablockchainalliance.com",
  },
  {
    id: "FOSSEE",
    title: "FOSSEE Project",
    year: "2024",
    desc: "Promoting the use of free and open-source software in academia and industry.",
    url: "https://fossee.in",
  },
  {
    id: "HackTheBox",
    title: "Hack The Box",
    year: "2024",
    desc: "A Cybersecurity Community Offering Realistic Hacking Challenges and Training Environments.",
    url: "https://www.hackthebox.eu",
  },
  {
    id: "RaspberryPi",
    title: "Raspberry Pi Foundation",
    year: "2024",
    desc: "A Community-Powered Initiative Providing Low-Cost, Open-Source Hardware for Education and Prototyping.",
    url: "https://www.raspberrypi.org",
  },
  {
    id: "FSFDef",
    title: "Free Software Foundation",
    year: "",
    desc: "The Free Software Definition.",
    url: "https://www.fsf.org/about/what-is-free-software",
  },
  {
    id: "GNU",
    title: "GNU Project",
    year: "",
    desc: "The GNU Operating System and the Free Software Movement.",
    url: "https://www.gnu.org/gnu/thegnuproject.html",
  },
  {
    id: "OSI",
    title: "Open Source Initiative",
    year: "",
    desc: "The Open Source Definition.",
    url: "https://opensource.org/osd",
  },
  {
    id: "OWASP",
    title: "OWASP",
    year: "2024",
    desc: "A Global Community Focusing on Improving Cybersecurity and Application Security.",
    url: "https://owasp.org",
  },
  {
    id: "LinuxFoundation",
    title: "The Linux Foundation",
    year: "",
    desc: "The Linux Foundation: Fostering Open Source Innovation.",
    url: "https://www.linuxfoundation.org",
  },
  {
    id: "FOSSASIA",
    title: "FOSSASIA",
    year: "",
    desc: "Open Source Organization in Asia.",
    url: "https://fossasia.org",
  },
  {
    id: "Debian",
    title: "Debian Project",
    year: "2024",
    desc: "Debian - A Universal Operating System.",
    url: "https://www.debian.org",
  },
  {
    id: "KDE",
    title: "KDE Community",
    year: "2024",
    desc: "KDE - Free and Open Source Software for Desktop and Applications.",
    url: "https://kde.org",
  },
  {
    id: "GIMP",
    title: "GIMP",
    year: "2024",
    desc: "GIMP - The GNU Image Manipulation Program.",
    url: "https://www.gimp.org",
  },
  {
    id: "Apache",
    title: "Apache Software Foundation",
    year: "2024",
    desc: "Apache Software Foundation - Open Source Community and Projects.",
    url: "https://www.apache.org",
  },
  {
    id: "Mozilla",
    title: "Mozilla Foundation",
    year: "2024",
    desc: "Mozilla - Open Source Projects to Build a Better Internet.",
    url: "https://www.mozilla.org",
  },
  {
    id: "openSUSE",
    title: "openSUSE Project",
    year: "2024",
    desc: "openSUSE - The Makers' Choice for Sysadmins, Developers, and Desktop Users.",
    url: "https://www.opensuse.org",
  },
  {
    id: "GNOME",
    title: "GNOME Project",
    year: "2024",
    desc: "GNOME - A Free and Open Source Desktop Environment for Users, Developers, and Enterprises.",
    url: "https://www.gnome.org",
  },
]

export default function WhitepaperPage() {
  return (
    <main className="relative min-h-screen text-foreground">
      {/* Document Provenance: Official FOSS Club Whitepaper authored by founder Vaibhav Pratap Singh */}
      <section className="pt-28 sm:pt-36 pb-6 sm:pb-8 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gradient-green tracking-tight">
            The FOSS Club Whitepaper
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-6">
            The official whitepaper of The FOSS Club at Delhi Technical Campus. This document outlines
            our core principles, why open source matters for engineers, our technical focus areas,
            and how our student community works together.
          </p>

          {/* Provenance Metadata: Author attribution, publication chronology, and campus origin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-card/90 border border-border/80 text-xs sm:text-sm backdrop-blur-sm shadow-sm mb-6">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div>
                <span className="block text-muted-foreground text-[11px] uppercase tracking-wider">Author</span>
                <span className="font-semibold text-foreground">Vaibhav Pratap Singh</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div>
                <span className="block text-muted-foreground text-[11px] uppercase tracking-wider">First Published</span>
                <span className="font-semibold text-foreground">10-10-23</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <GitBranch className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div>
                <span className="block text-muted-foreground text-[11px] uppercase tracking-wider">Last Updated</span>
                <span className="font-semibold text-foreground">22-04-2025</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div>
                <span className="block text-muted-foreground text-[11px] uppercase tracking-wider">Campus</span>
                <span className="font-semibold text-foreground">Delhi Technical Campus</span>
              </div>
            </div>
          </div>

          {/* Primary Artifact Downloads: Canonical PDF export, upstream git repository, and LaTeX source */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/thefossclub/whitepaper/raw/main/whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-green text-white shadow-md shadow-green-500/20 hover:opacity-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <a
              href="https://github.com/thefossclub/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-border/80 bg-card hover:border-green-500/40 text-foreground transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>

            <a
              href="https://github.com/thefossclub/whitepaper/blob/main/main.tex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-border/80 bg-card hover:border-green-500/40 text-muted-foreground hover:text-foreground transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>LaTeX Source (main.tex)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Chapter 1: Introduction — Community origins, mission pillars, and open source founding ethos */}
      <OrgContentSection
        title="1. Introduction"
        description="Who we are, why the club started, and what we want to achieve."
        id="introduction"
      >
        <OrgCard>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground">
            <p>
              The FOSS Club at Delhi Technical Campus is an engaged community united by a shared
              passion for Free and Open Source Software (FOSS). We believe in the power of collaborative
              development, transparency, and digital freedom.
            </p>
            <p>
              Founded on these principles, we provide a space for students to explore, contribute,
              and innovate beyond traditional classroom boundaries. Our focus encompasses software
              engineering, system architecture, and emerging technologies while fostering a mindset
              that values knowledge sharing and collaborative problem-solving.
            </p>
            <p>
              We advocate for creative freedom and artistic expression in technology. Our activities
              span design and open hardware. Through workshops, hackathons, and collaborative projects,
              we prepare our members to engage in meaningful work that contributes to the ever-evolving
              landscape of technology.
            </p>

            <div className="pt-2">
              <h3 className="text-base sm:text-lg font-bold mb-3 text-gradient-green">
                Our mission is multifaceted:
              </h3>
              <ul className="space-y-2.5 mb-4">
                {[
                  "Cultivating a deep understanding and appreciation for FOSS",
                  "Providing hands-on experience with real-world open source projects",
                  "Creating a supportive environment for learning and skill development",
                  "Bridging the gap between academic learning and industry practices",
                  "Promoting the ethical use of technology and the importance of digital rights",
                ].map((item) => (
                  <OrgListItem key={item}>{item}</OrgListItem>
                ))}
              </ul>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-foreground">
              By embracing these goals, we aim to nurture a new generation of tech enthusiasts who are
              active contributors to the global open-source community. The FOSS Club is where ideas
              flourish, innovation thrives, and the future of open source takes shape.
            </p>
          </div>
        </OrgCard>
      </OrgContentSection>

      {/* Chapter 2: What is FOSS? — FSF Four Essential Freedoms and engineering career advantages */}
      <OrgContentSection
        title="2. What is FOSS?"
        description="The four essential software freedoms and the career benefits of contributing."
        id="what-is-foss"
      >
        <OrgCard>
          <p className="text-sm sm:text-base leading-relaxed text-foreground mb-6">
            Free and Open Source Software (FOSS) represents more than just a development methodology;
            it&apos;s a philosophy that fundamentally reshapes how we create, distribute, and interact
            with software. At its core, FOSS embodies the principles of freedom, transparency,
            and community collaboration.
          </p>

          <h3 className="text-base sm:text-lg font-bold mb-2 text-gradient-green">
            The Four Essential Freedoms
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4">
            The Free Software Foundation defines four essential freedoms that characterize FOSS:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {fourFreedoms.map((freedom) => (
              <div
                key={freedom.num}
                className="p-5 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/20 text-green-600 dark:text-green-400">
                      {freedom.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">FSF Standard</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-foreground mb-2">
                    {freedom.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {freedom.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-base text-foreground mb-8">
            These freedoms ensure that FOSS remains a powerful tool for innovation, education, and societal progress.
          </p>

          <h3 className="text-base sm:text-lg font-bold mb-2 text-gradient-green">
            The Benefits of FOSS for Building Strong Engineering Skills and Career Success
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-foreground mb-4">
            For engineers looking to grow their skills and advance their careers, Free and Open Source
            Software (FOSS) offers a valuable opportunity. It helps you build a solid foundation,
            land high-paying jobs, and contribute to well-known projects like Blender and Firefox.
            Here&apos;s why FOSS is so important:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
            {engineeringBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-4 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {benefit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-foreground">
            FOSS is not just about writing code—it&apos;s a way to build your skills, advance your
            career, and contribute to important, global projects. It&apos;s a powerful tool for engineers
            who want to succeed in the tech world.
          </p>
        </OrgCard>
      </OrgContentSection>

      {/* Chapter 3: Features & Core Focus Areas — Systems engineering, cybersecurity, and open hardware */}
      <OrgContentSection
        title="3. Features"
        description="Our focus areas designed to provide a comprehensive understanding of modern tech."
        id="features"
      >
        <div className="space-y-4">
          <OrgCard>
            <p className="text-sm sm:text-base leading-relaxed text-foreground">
              The FOSS Club is committed to exploring and mastering a wide range of technologies and
              concepts within the open source ecosystem. Our focus areas are designed to provide
              members with a comprehensive understanding of modern software development practices,
              cybersecurity, and decentralized technologies.
            </p>
          </OrgCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <OrgCard className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2 text-gradient-green">
                  Open Source
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                  We delve deep into the world of open source technologies and tools, exploring:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  {[
                    "Version control systems (e.g., Git)",
                    "Collaborative development platforms (e.g., GitHub, GitLab)",
                    "Open source licensing and project management",
                    "Contributing to existing open source projects",
                    "Launching and maintaining our own open source initiatives",
                  ].map((item) => (
                    <OrgListItem key={item} className="p-2.5 sm:p-3 text-xs sm:text-sm">
                      {item}
                    </OrgListItem>
                  ))}
                </ul>
              </div>
            </OrgCard>

            <OrgCard className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2 text-gradient-green">
                  Cyber Security
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                  Our cybersecurity focus encompasses:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  {[
                    "Ethical hacking and penetration testing",
                    "Network security and cryptography",
                    "Web application security",
                    "Malware analysis and reverse engineering",
                    "Security auditing of open source software",
                  ].map((item) => (
                    <OrgListItem key={item} className="p-2.5 sm:p-3 text-xs sm:text-sm">
                      {item}
                    </OrgListItem>
                  ))}
                </ul>
              </div>
            </OrgCard>

            <OrgCard className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2 text-gradient-green">
                  Hardware
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                  Our hardware focus includes:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  {[
                    "Open source hardware development and prototyping",
                    "IoT (Internet of Things) devices and embedded systems",
                    "Hardware security and testing",
                    "Circuit design and PCB fabrication",
                    "Integration of hardware with open source software",
                  ].map((item) => (
                    <OrgListItem key={item} className="p-2.5 sm:p-3 text-xs sm:text-sm">
                      {item}
                    </OrgListItem>
                  ))}
                </ul>
              </div>
            </OrgCard>
          </div>

          <OrgCard>
            <h3 className="text-base sm:text-lg font-bold mb-2 text-gradient-green">
              Additional Areas of Expertise
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
              Beyond our core focus, the FOSS Club cultivates expertise in:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {expertiseDomains.map((domain) => (
                <div
                  key={domain.name}
                  className="p-3.5 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col justify-between"
                >
                  <span className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                    {domain.name}
                  </span>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {domain.desc}
                  </span>
                </div>
              ))}
            </div>
          </OrgCard>
        </div>
      </OrgContentSection>

      {/* Chapter 4: Ideology & Core Principles — Philosophical foundations inspired by FSF, GNU, and Unix */}
      <OrgContentSection
        title="4. Ideology"
        description="The principles that have driven the free software and open source movements."
        id="ideology"
      >
        <OrgCard>
          <p className="text-sm sm:text-base leading-relaxed text-foreground mb-6">
            The ideology of the FOSS Club is deeply rooted in the principles that have driven the free
            software and open source movements since their inception. We draw inspiration from the
            philosophies of the Free Software Foundation (FSF), the GNU Project, and the Unix
            operating system, adapting these ideals to the modern technological landscape.
          </p>

          <h3 className="text-base sm:text-lg font-bold mb-4 text-gradient-green">
            Core Principles
          </h3>

          <div className="space-y-3">
            {corePrinciples.map((principle, index) => (
              <div
                key={principle.title}
                className="p-4 sm:p-5 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col sm:flex-row gap-3.5 sm:items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-green-600 dark:text-green-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-sm">
                  0{index + 1}
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground mb-1">
                    {principle.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </OrgCard>
      </OrgContentSection>

      {/* Chapter 5: Vision: Broader Impact — Long-term societal contribution and educational equity */}
      <OrgContentSection
        title="5. Vision: Broader Impact"
        description="Creating a lasting impact on the broader technological landscape."
        id="vision"
      >
        <OrgCard>
          <p className="text-sm sm:text-base leading-relaxed text-foreground mb-5">
            The vision of the FOSS Club extends beyond the boundaries of our campus, aiming to create
            a lasting impact on the broader technological landscape. We envision a future where open
            source principles are not just accepted but celebrated as the foundation of innovation and
            progress in the digital world.
          </p>

          <ul className="space-y-3 mb-6">
            {[
              "Cultivate a generation of technologists who prioritize openness, collaboration, and ethical considerations in their work.",
              "Bridge the digital divide by promoting accessible, customizable technologies that empower communities regardless of economic status.",
              "Foster a culture of continuous learning and adaptation, preparing our members to thrive in the rapidly evolving tech landscape.",
              "Contribute to the global dialogue on digital rights, privacy, and the societal implications of technology.",
            ].map((item) => (
              <OrgListItem key={item}>{item}</OrgListItem>
            ))}
          </ul>

          <p className="text-sm sm:text-base leading-relaxed text-foreground">
            Through these endeavors, the FOSS Club aims not just to improve the coding skills of its
            members, but to shape a future where technology serves as a tool for empowerment,
            innovation, and positive social change. We believe that by embracing the principles of
            free and open source software, we can play a pivotal role in building a more transparent,
            collaborative, and equitable digital world.
          </p>
        </OrgCard>
      </OrgContentSection>

      {/* Chapter 6: Membership Tiers & Eligibility — Participation tiers and campus eligibility rules */}
      <OrgContentSection
        title="6. Membership Types and Eligibility"
        description="Membership levels to accommodate varying levels of involvement and expertise."
        id="membership"
      >
        <OrgCard>
          <p className="text-sm sm:text-base leading-relaxed text-foreground mb-5">
            The FOSS Club maintains different levels of membership to accommodate varying levels of
            involvement and expertise:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10">
              <span className="text-xs font-mono font-bold text-green-600 dark:text-green-400 uppercase tracking-wider block mb-1">
                Tier 1
              </span>
              <h4 className="text-base font-bold mb-1 text-foreground">Regular Members</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Students and faculty actively participating in club activities.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10">
              <span className="text-xs font-mono font-bold text-green-600 dark:text-green-400 uppercase tracking-wider block mb-1">
                Tier 2
              </span>
              <h4 className="text-base font-bold mb-1 text-foreground">Contributing Members</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Those regularly contributing to club projects or open source initiatives.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10">
              <span className="text-xs font-mono font-bold text-green-600 dark:text-green-400 uppercase tracking-wider block mb-1">
                Tier 3
              </span>
              <h4 className="text-base font-bold mb-1 text-foreground">Core Members</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Individuals taking leadership roles in club operations.
              </p>
            </div>
          </div>

          <h4 className="text-sm font-bold text-foreground mb-3">
            Membership eligibility extends to:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              All students of Delhi Technical Campus
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Faculty members interested in FOSS initiatives
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Alumni maintaining active involvement
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              External collaborators and professionals (by invitation)
            </li>
          </ul>
        </OrgCard>
      </OrgContentSection>

      {/* Chapter 7: References — 29 foundational open source organizations and standards cited in the document */}
      <OrgContentSection
        title="7. References"
        description="The complete references and cited literature from the original whitepaper."
        id="references"
      >
        <OrgCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {references.map((ref, idx) => (
              <a
                key={ref.url + ref.title + idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 hover:border-primary/40 flex items-start justify-between gap-2.5 transition-all"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="font-mono text-green-600 dark:text-green-400 text-xs font-bold pt-0.5">
                    [{idx + 1}]
                  </span>
                  <div className="min-w-0">
                    <span className="font-semibold text-foreground group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors block truncate">
                      {ref.title} {ref.year ? `(${ref.year})` : ""}
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-0.5">
                      {ref.desc}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-green-500 flex-shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </OrgCard>
      </OrgContentSection>

    </main>
  )
}

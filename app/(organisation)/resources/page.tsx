import Link from "next/link"
import { ExternalLink, BookOpen, Video, Globe, Lightbulb, Code2, FileCode, GitPullRequest } from "lucide-react"
import OrgContentSection from "@/components/organisation/org-content-section"
import OrgCard from "@/components/organisation/org-card"

export const metadata = {
  title: "Resources | The FOSS Club",
  description:
    "The Ultimate Resource Pack for Tech Beginners by The FOSS Club — curated books, video courses, documentation, project ideas, and practice platforms across all domains.",
}

type ResourceItem = {
  type: "book" | "course" | "docs" | "projects" | "practice" | "cheatsheet"
  label: string
  link: string
  authorOrHost?: string
}

const typeIconMap = {
  book: <BookOpen className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />,
  course: <Video className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />,
  docs: <Globe className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />,
  projects: <Lightbulb className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />,
  practice: <Code2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />,
  cheatsheet: <FileCode className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />,
}

const typeLabelMap = {
  book: "Book",
  course: "Video Course",
  docs: "Documentation",
  projects: "Project Ideas",
  practice: "Practice",
  cheatsheet: "Cheatsheet",
}

function ResourceBadge({ type }: { type: ResourceItem["type"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-primary/10 text-green-600 dark:text-green-400 border border-green-500/20">
      {typeIconMap[type]}
      <span>{typeLabelMap[type]}</span>
    </span>
  )
}

function ResourceList({ items }: { items: ResourceItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map((item) => (
        <a
          key={item.link + item.label}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-xl border border-border/80 bg-background/50 hover:bg-card hover:border-green-500/40 text-foreground transition-all flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <ResourceBadge type={item.type} />
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors flex-shrink-0" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors block">
              {item.label}
            </span>
            {item.authorOrHost && (
              <span className="text-[11px] text-green-600 dark:text-green-400 font-medium mt-0.5 block">
                {item.authorOrHost}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}

const programmingLanguages: { name: string; items: ResourceItem[] }[] = [
  {
    name: "Python",
    items: [
      { type: "book", label: "Python Crash Course", link: "https://nostarch.com/pythoncrashcourse2e", authorOrHost: "by Eric Matthes (No Starch Press)" },
      { type: "course", label: "Python for Everybody Specialization", link: "https://www.coursera.org/specializations/python", authorOrHost: "Coursera (Dr. Chuck)" },
      { type: "course", label: "Python Programming MOOC 2025", link: "https://programming-25.mooc.fi/", authorOrHost: "University of Helsinki" },
      { type: "docs", label: "Official Python 3 Documentation", link: "https://docs.python.org/3/", authorOrHost: "Python Software Foundation" },
      { type: "projects", label: "Python Projects for Beginners", link: "https://realpython.com/projects/python-projects-for-beginners/", authorOrHost: "Real Python" },
      { type: "practice", label: "LeetCode Python Challenges", link: "https://leetcode.com/problemset/all/", authorOrHost: "LeetCode" },
    ],
  },
  {
    name: "JavaScript",
    items: [
      { type: "book", label: "Eloquent JavaScript (Free Online)", link: "https://eloquentjavascript.net/", authorOrHost: "by Marijn Haverbeke" },
      { type: "course", label: "JavaScript — The Complete Guide 2023", link: "https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/", authorOrHost: "Maximilian Schwarzmüller" },
      { type: "docs", label: "MDN Web Docs — JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", authorOrHost: "Mozilla Developer Network" },
      { type: "projects", label: "40 JavaScript Projects for Beginners", link: "https://www.freecodecamp.org/news/javascript-projects-for-beginners/", authorOrHost: "freeCodeCamp" },
      { type: "practice", label: "JavaScript30 (30 Day Challenge)", link: "https://javascript30.com/", authorOrHost: "by Wes Bos" },
    ],
  },
  {
    name: "Java",
    items: [
      { type: "book", label: "Head First Java", link: "https://www.oreilly.com/library/view/head-first-java/9781492091646/", authorOrHost: "O'Reilly Media" },
      { type: "course", label: "Java Programming Masterclass", link: "https://www.udemy.com/course/java-the-complete-java-developer-course/", authorOrHost: "Tim Buchalka (Udemy)" },
      { type: "docs", label: "Oracle Java Official Tutorials", link: "https://docs.oracle.com/javase/tutorial/", authorOrHost: "Oracle" },
      { type: "projects", label: "Java Projects for Beginners", link: "https://www.programiz.com/java-programming/projects", authorOrHost: "Programiz" },
      { type: "practice", label: "HackerRank Java 10-Day Challenge", link: "https://www.hackerrank.com/domains/tutorials/10-days-of-java", authorOrHost: "HackerRank" },
    ],
  },
  {
    name: "Backend Development with Spring Boot & Java",
    items: [
      { type: "book", label: "Learn Microservices with Spring Boot", link: "https://hoclaptrinhdanang.com/downloads/pdf/spring/Learn%20Microservices%20with%20Spring%20Boot.pdf", authorOrHost: "Apress" },
      { type: "course", label: "Spring Boot Tutorial Playlist", link: "https://youtube.com/playlist?list=PLA3GkZPtsafacdBLdd3p1DyRd5FGfr3Ue", authorOrHost: "Engineering Digest" },
      { type: "docs", label: "Spring Boot Official Documentation", link: "https://docs.spring.io/spring-boot/index.html", authorOrHost: "VMware Tanzu" },
      { type: "projects", label: "20+ Open-Source Spring Boot Projects", link: "https://www.javaguides.net/2018/10/free-open-source-projects-using-spring-boot.html", authorOrHost: "JavaGuides" },
      { type: "practice", label: "Coderpad Spring Sandbox", link: "https://coderpad.io/languages/java/spring/", authorOrHost: "Coderpad" },
      { type: "cheatsheet", label: "Spring & Spring Boot Annotations Sheet", link: "https://rameshfadatare.medium.com/spring-and-spring-boot-annotations-cheat-sheet-b99bad0f6963", authorOrHost: "Ramesh Fadatare" },
    ],
  },
  {
    name: "C++",
    items: [
      { type: "book", label: "C++ Primer (5th Edition)", link: "https://www.pearson.com/en-us/subject-catalog/p/c-primer/P200000003259", authorOrHost: "Lippman, Lajoie, Moo" },
      { type: "course", label: "Beginning C++ Programming", link: "https://www.udemy.com/course/beginning-c-plus-plus-programming/", authorOrHost: "Frank Mitropoulos (Udemy)" },
      { type: "docs", label: "Learn C++ (Comprehensive Guide)", link: "https://www.learncpp.com/", authorOrHost: "Alex (learncpp.com)" },
      { type: "projects", label: "C++ Projects for Beginners", link: "https://www.geeksforgeeks.org/c-plus-plus-projects/", authorOrHost: "GeeksforGeeks" },
      { type: "practice", label: "Codeforces Problemset", link: "https://codeforces.com/problemset", authorOrHost: "Codeforces" },
    ],
  },
  {
    name: "C",
    items: [
      { type: "book", label: "Learn C The Hard Way", link: "https://github.com/XWHQSJ/ebooks/blob/master/Cpp/C/Learn%20C%20the%20Hard%20Way.pdf", authorOrHost: "by Zed A. Shaw" },
      { type: "course", label: "C Programming Tutorial for Beginners", link: "https://www.youtube.com/watch?v=KJgsSFOSQv0", authorOrHost: "freeCodeCamp" },
      { type: "docs", label: "TutorialsPoint C Programming Reference", link: "https://www.tutorialspoint.com/cprogramming/index.htm", authorOrHost: "TutorialsPoint" },
      { type: "projects", label: "C Projects with Source Code", link: "https://www.studytonight.com/c-projects/", authorOrHost: "StudyTonight" },
      { type: "practice", label: "HackerRank C Language Domain", link: "https://www.hackerrank.com/domains/c", authorOrHost: "HackerRank" },
    ],
  },
  {
    name: "Go (Golang)",
    items: [
      { type: "book", label: "An Introduction to Programming in Go", link: "https://www.golang-book.com/books/intro", authorOrHost: "by Caleb Doxsey" },
      { type: "course", label: "Learn Go Programming (Full Course)", link: "https://www.youtube.com/watch?v=YS4e4q9oBaU", authorOrHost: "freeCodeCamp" },
      { type: "docs", label: "A Tour of Go (Interactive)", link: "https://go.dev/tour/welcome/1", authorOrHost: "The Go Authors" },
      { type: "projects", label: "Golang Projects on GitHub", link: "https://github.com/topics/golang-projects", authorOrHost: "GitHub Topics" },
      { type: "practice", label: "Exercism Go Track", link: "https://exercism.org/tracks/go", authorOrHost: "Exercism" },
    ],
  },
]

const gameDev3D: { name: string; items: ResourceItem[] }[] = [
  {
    name: "Blender 3D",
    items: [
      { type: "course", label: "Beginner Blender Tutorial (Donut)", link: "https://youtu.be/z-Xl9tGqH14", authorOrHost: "Blender Guru" },
      { type: "course", label: "Blender Beginner Modelling Tutorial", link: "https://youtu.be/Hf2esGA7vCc", authorOrHost: "Blender Guru" },
      { type: "course", label: "Learn 3D Sculpting Playlist", link: "https://www.youtube.com/watch?v=K7AJVx0H3Ec&list=PLn3ukorJv4vvJM7tvjet4PP-LVjJx13oB", authorOrHost: "Grant Abbitt" },
      { type: "course", label: "Hard-Surface Modeling in Blender", link: "https://youtu.be/zxhaCD-Zlfw", authorOrHost: "CG Boost" },
      { type: "course", label: "Modelling a Low-Poly Well", link: "https://youtu.be/QPh8h0hWkg0", authorOrHost: "Grant Abbitt" },
      { type: "course", label: "3D Animation for Beginners", link: "https://youtu.be/CBJp82tlR3M", authorOrHost: "Ryan King Art" },
    ],
  },
  {
    name: "Godot Engine",
    items: [
      { type: "docs", label: "Official Godot Engine Documentation", link: "https://docs.godotengine.org/en/stable/index.html", authorOrHost: "Godot Foundation" },
      { type: "course", label: "Godot Beginner Tutorial", link: "https://youtu.be/LOhfqjmasi0", authorOrHost: "Brackeys" },
      { type: "docs", label: "Getting Started with Godot Docs", link: "https://docs.godotengine.org/en/stable/getting_started/introduction/index.html", authorOrHost: "Godot Docs" },
      { type: "projects", label: "First 2D Game Step-by-Step", link: "https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html", authorOrHost: "Godot Official" },
      { type: "projects", label: "First 3D Game Step-by-Step", link: "https://docs.godotengine.org/en/stable/getting_started/first_3d_game/index.html", authorOrHost: "Godot Official" },
    ],
  },
  {
    name: "Unity & C#",
    items: [
      { type: "docs", label: "Unity Official User Manual", link: "https://docs.unity3d.com/Manual/", authorOrHost: "Unity Technologies" },
      { type: "course", label: "Learn Unity by Making a Game", link: "https://youtu.be/AmGSEH7QcDg", authorOrHost: "Code Monkey" },
      { type: "course", label: "C# Tutorial for Beginners", link: "https://www.youtube.com/watch?v=pReR6Z9rK-o", authorOrHost: "Code Monkey" },
      { type: "docs", label: "Unity Learn Interactive Courses", link: "https://learn.unity.com/", authorOrHost: "Unity Learn" },
      { type: "projects", label: "Beginner Unity Game Projects", link: "https://unitycodemonkey.com/text.php?v=wejUWjCVW94", authorOrHost: "Code Monkey" },
    ],
  },
  {
    name: "Unreal Engine 5 & Graphics Programming",
    items: [
      { type: "docs", label: "Epic Games UE5 Online Learning", link: "https://dev.epicgames.com/community/unreal-engine/learning", authorOrHost: "Epic Developer Community" },
      { type: "docs", label: "Blueprint Visual Scripting Documentation", link: "https://docs.unrealengine.com/5.0/en-US/blueprints-visual-scripting-in-unreal-engine/", authorOrHost: "Unreal Engine" },
      { type: "course", label: "Unreal Engine 5 Starter Course", link: "https://www.youtube.com/watch?v=k-zMkzmduqI&list=PLKPWwh_viQMGQkQfKKD5lF96efA3_RWt-", authorOrHost: "Smart Poly" },
      { type: "projects", label: "Making a Full Horror Game in UE5", link: "https://youtu.be/fA8ERAgJROs", authorOrHost: "YouTube Tutorial" },
      { type: "course", label: "The Cherno C++ Series (Game Engines & Graphics)", link: "https://www.youtube.com/watch?v=18c3MTX0PK0&list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb", authorOrHost: "The Cherno (Highly Recommended)" },
    ],
  },
]

const webDevSections = {
  frontendCore: [
    { type: "course" as const, label: "HTML & CSS Crash Course", link: "https://www.youtube.com/watch?v=HcOc7P5BMi4", authorOrHost: "freeCodeCamp" },
    { type: "projects" as const, label: "HTML & CSS Build Projects Playlist", link: "https://www.youtube.com/playlist?list=PLPppPPmk0i3hZCNmbVtcP1hlwDKOdUFX9", authorOrHost: "YouTube" },
    { type: "course" as const, label: "JavaScript Comprehensive Course", link: "https://www.youtube.com/watch?v=pN6jk0uUrD8&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP", authorOrHost: "Sheryians Coding School" },
    { type: "practice" as const, label: "Frontend Mentor Real-World UI Challenges", link: "https://www.frontendmentor.io/", authorOrHost: "Frontend Mentor" },
    { type: "docs" as const, label: "CSS-Tricks Guides & Almanac", link: "https://css-tricks.com/", authorOrHost: "CSS Tricks" },
    { type: "book" as const, label: "Frontend Developer Handbook (Free)", link: "https://frontendmasters.com/guides/front-end-handbook/2019/", authorOrHost: "Frontend Masters" },
  ],
  frameworks: [
    { type: "docs" as const, label: "React Official Getting Started", link: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started", authorOrHost: "MDN Web Docs" },
    { type: "course" as const, label: "Complete React Course", link: "https://www.youtube.com/watch?v=bMknfKXIFA8", authorOrHost: "freeCodeCamp" },
    { type: "projects" as const, label: "React Projects Playlist", link: "https://www.youtube.com/playlist?list=PL6QREj8te1P6wX9m5KnicnDVEucbOPsqR", authorOrHost: "YouTube" },
    { type: "docs" as const, label: "Angular Guide & Tour of Heroes", link: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Angular_getting_started", authorOrHost: "MDN Web Docs" },
    { type: "course" as const, label: "Angular Complete Course", link: "https://www.youtube.com/watch?v=3qBXWUpoPHo", authorOrHost: "freeCodeCamp" },
    { type: "docs" as const, label: "Vue.js Guide & Core Concepts", link: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_getting_started", authorOrHost: "MDN Web Docs" },
    { type: "course" as const, label: "Vue.js Complete Course", link: "https://www.youtube.com/watch?v=1GNsWa_EZdw", authorOrHost: "freeCodeCamp" },
  ],
  backend: [
    { type: "book" as const, label: "Node.js Design Patterns (3rd Ed.)", link: "https://www.packtpub.com/product/nodejs-design-patterns-third-edition/9781839214110", authorOrHost: "Mario Casciaro & Luciano Mammino" },
    { type: "course" as const, label: "The Complete Node.js Developer Course", link: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/", authorOrHost: "Andrew Mead (Udemy)" },
    { type: "docs" as const, label: "Node.js Official Documentation", link: "https://nodejs.org/en/docs/", authorOrHost: "OpenJS Foundation" },
    { type: "projects" as const, label: "Live API Projects for Practice", link: "https://github.com/krishnaik06/Live-API-Projects-for-Practice", authorOrHost: "Krish Naik" },
    { type: "docs" as const, label: "Express.js Fast & Minimalist Guide", link: "https://expressjs.com/en/starter/installing.html", authorOrHost: "Express.js" },
    { type: "course" as const, label: "The Web Developer Bootcamp", link: "https://www.udemy.com/course/the-web-developer-bootcamp/", authorOrHost: "Colt Steele" },
  ],
}

const specializedDomains: { title: string; id: string; desc: string; items: ResourceItem[] }[] = [
  {
    title: "DevOps",
    id: "devops",
    desc: "Books, roadmaps, and tutorials for working with containers, deployment, and cloud infrastructure.",
    items: [
      { type: "book", label: "The DevOps Handbook", link: "https://itrevolution.com/product/the-devops-handbook/", authorOrHost: "Gene Kim, Jez Humble, Patrick Debois" },
      { type: "course", label: "DevOps Foundations", link: "https://www.linkedin.com/learning/devops-foundations-2", authorOrHost: "LinkedIn Learning" },
      { type: "docs", label: "DevOps Developer Roadmap", link: "https://roadmap.sh/devops", authorOrHost: "roadmap.sh" },
      { type: "projects", label: "DevOps Hands-on Projects", link: "https://github.com/Abhinav-26/DevOps-Projects", authorOrHost: "GitHub Repository" },
      { type: "practice", label: "Kubernetes Interactive Tutorials", link: "https://kubernetes.io/docs/tutorials/", authorOrHost: "Kubernetes.io" },
    ],
  },
  {
    title: "Low-Level Programming",
    id: "low-level",
    desc: "Resources for learning computer architecture, operating systems, and systems programming.",
    items: [
      { type: "book", label: "Computer Systems: A Programmer's Perspective (CS:APP)", link: "https://csapp.cs.cmu.edu/", authorOrHost: "Randal E. Bryant & David R. O'Hallaron" },
      { type: "course", label: "From Nand to Tetris: Building a Computer", link: "https://www.coursera.org/learn/build-a-computer", authorOrHost: "Coursera (Hebrew University)" },
      { type: "docs", label: "OSDev Wiki — Kernel & OS Development", link: "https://wiki.osdev.org/Main_Page", authorOrHost: "OSDev Community" },
      { type: "projects", label: "Build Your Own X (Compiler, OS, Git, DB)", link: "https://github.com/danistefanovic/build-your-own-x", authorOrHost: "Daniel Stefanovic" },
      { type: "practice", label: "Linux From Scratch (LFS)", link: "https://www.linuxfromscratch.org/", authorOrHost: "Gerard Beekmans" },
    ],
  },
  {
    title: "Cybersecurity",
    id: "cybersecurity",
    desc: "Practical guides and training platforms for web security and ethical hacking.",
    items: [
      { type: "book", label: "The Web Application Hacker's Handbook", link: "https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook%3A+Finding+and+Exploiting+Security+Flaws%2C+2nd+Edition-p-9781118026472", authorOrHost: "Dafydd Stuttard & Marcus Pinto" },
      { type: "course", label: "CompTIA Security+ Certification Course", link: "https://www.coursera.org/professional-certificates/comptia-security-plus", authorOrHost: "Coursera" },
      { type: "docs", label: "OWASP Foundation (Top 10 & Cheat Sheets)", link: "https://owasp.org/", authorOrHost: "Open Web Application Security Project" },
      { type: "projects", label: "Cybersecurity Projects for Beginners", link: "https://www.springboard.com/blog/cybersecurity/cyber-security-projects/", authorOrHost: "Springboard" },
      { type: "practice", label: "TryHackMe — Practical Security Challenges", link: "https://tryhackme.com/", authorOrHost: "TryHackMe" },
    ],
  },
  {
    title: "Web3 and Blockchain",
    id: "web3",
    desc: "Introductory books, documentation, and tutorials for blockchain and smart contracts.",
    items: [
      { type: "book", label: "Mastering Ethereum (Free on GitHub)", link: "https://github.com/ethereumbook/ethereumbook", authorOrHost: "Andreas M. Antonopoulos & Gavin Wood" },
      { type: "course", label: "Blockchain Specialization", link: "https://www.coursera.org/specializations/blockchain", authorOrHost: "University at Buffalo & Coursera" },
      { type: "docs", label: "Ethereum.org Developer Portal", link: "https://ethereum.org/en/developers/", authorOrHost: "Ethereum Foundation" },
      { type: "projects", label: "Blockchain Project Ideas for Developers", link: "https://101blockchains.com/blockchain-project-ideas/", authorOrHost: "101 Blockchains" },
      { type: "practice", label: "Solidity by Example", link: "https://solidity-by-example.org/", authorOrHost: "solidity-by-example.org" },
    ],
  },
  {
    title: "Data Structures and Algorithms",
    id: "dsa",
    desc: "Textbooks, courses, and practice problems to build your problem-solving skills.",
    items: [
      { type: "book", label: "Introduction to Algorithms (CLRS)", link: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", authorOrHost: "Cormen, Leiserson, Rivest, Stein" },
      { type: "course", label: "Algorithms Specialization", link: "https://www.coursera.org/specializations/algorithms", authorOrHost: "Stanford University (Tim Roughgarden)" },
      { type: "docs", label: "GeeksforGeeks DSA Reference", link: "https://www.geeksforgeeks.org/data-structures/", authorOrHost: "GeeksforGeeks" },
      { type: "projects", label: "Data Structures Practical Projects", link: "https://www.interviewbit.com/blog/data-structures-projects/", authorOrHost: "InterviewBit" },
      { type: "practice", label: "LeetCode Problem Database", link: "https://leetcode.com/", authorOrHost: "LeetCode" },
    ],
  },
]

const quickNavLinks = [
  { name: "Languages", href: "#programming-languages" },
  { name: "Game Dev & 3D", href: "#game-development" },
  { name: "Web Dev", href: "#web-development" },
  { name: "DevOps", href: "#devops" },
  { name: "Low-Level", href: "#low-level" },
  { name: "Cybersecurity", href: "#cybersecurity" },
  { name: "Web3", href: "#web3" },
  { name: "DSA", href: "#dsa" },
]

export default function ResourcesPage() {
  return (
    <main className="relative min-h-screen text-foreground">
      {/* Resource Pack Intro */}
      <section className="pt-28 sm:pt-36 pb-6 sm:pb-8 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gradient-green tracking-tight">
            Ultimate Resource Pack for Tech Beginners
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mb-6">
            Welcome to The FOSS Club&apos;s curated resource pack for beginners in tech. We put together
            tested books, video tutorials, official documentation, and project ideas to help you learn
            programming languages, game development, web development, cybersecurity, and more.
            Everything here is free or recommended by our members.
          </p>

          {/* jump links across language, web, systems, security, and algorithms categories */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
              Jump To:
            </span>
            {quickNavLinks.map((nav) => (
              <a
                key={nav.href}
                href={nav.href}
                className="px-3 py-1 rounded-lg text-xs font-medium border border-border/70 bg-card/60 hover:bg-card hover:border-green-500/40 text-foreground hover:text-green-500 dark:hover:text-green-400 transition-all"
              >
                {nav.name}
              </a>
            ))}
          </div>

          {/* Direct entry point to suggest resources or open a GitHub PR */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/thefossclub/resources"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-green text-white shadow-md shadow-green-500/20 hover:opacity-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>

            <a
              href="https://github.com/thefossclub/resources/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-border/80 bg-card hover:border-green-500/40 text-foreground transition-all"
            >
              <GitPullRequest className="w-4 h-4 text-green-500" />
              <span>Suggest a Resource</span>
            </a>
          </div>
        </div>
      </section>

      {/* Category 1: Foundational Programming Languages (Python, JS, Java, Spring, C++, C, Go) */}
      <OrgContentSection
        title="1. Programming Languages"
        description="Books, video courses, and practice sites to help you learn core programming languages."
        id="programming-languages"
      >
        <div className="space-y-4 sm:space-y-6">
          {programmingLanguages.map((lang) => (
            <OrgCard key={lang.name}>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-gradient-green">
                {lang.name}
              </h3>
              <ResourceList items={lang.items} />
            </OrgCard>
          ))}
        </div>
      </OrgContentSection>

      {/* Category 2: 3D Modeling & Game Development (Blender, Godot, Unity, Unreal Engine 5) */}
      <OrgContentSection
        title="2. Game Development and 3D"
        description="Resources for 3D modelling in Blender, game logic, and working with game engines."
        id="game-development"
      >
        <div className="space-y-4 sm:space-y-6">
          {gameDev3D.map((engine) => (
            <OrgCard key={engine.name}>
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-gradient-green">
                {engine.name}
              </h3>
              <ResourceList items={engine.items} />
            </OrgCard>
          ))}
        </div>
      </OrgContentSection>

      {/* Category 3: Web Engineering (Frontend core, UI frameworks, Node.js & Express backends) */}
      <OrgContentSection
        title="3. Web Development"
        description="Guides and courses for HTML, CSS, JavaScript, frontend frameworks, and backend APIs."
        id="web-development"
      >
        <div className="space-y-4 sm:space-y-6">
          <OrgCard>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-gradient-green">
              Frontend Development (HTML, CSS, JavaScript)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Core basics for building pages: HTML markup, CSS styling, and JavaScript logic.
            </p>
            <ResourceList items={webDevSections.frontendCore} />
          </OrgCard>

          <OrgCard>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-gradient-green">
              Frontend Frameworks (React, Angular, Vue.js)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Modern component libraries for building web applications.
            </p>
            <ResourceList items={webDevSections.frameworks} />
          </OrgCard>

          <OrgCard>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-gradient-green">
              Backend Development (Node.js and Express)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Server-side JavaScript, building APIs, and handling data.
            </p>
            <ResourceList items={webDevSections.backend} />
          </OrgCard>
        </div>
      </OrgContentSection>

      {/* Specialized Tracks (DevOps, Systems Programming, Cybersecurity, Web3, DSA) */}
      {specializedDomains.map((domain, index) => (
        <OrgContentSection
          key={domain.id}
          title={`${index + 4}. ${domain.title}`}
          description={domain.desc}
          id={domain.id}
        >
          <OrgCard>
            <ResourceList items={domain.items} />
          </OrgCard>
        </OrgContentSection>
      ))}

      {/* Explains how students, alumni, and committee members can suggest or curate new materials */}
      <OrgContentSection
        title="How to Contribute"
        description="Help us keep this list up to date and add new learning materials."
        id="contribute"
      >
        <OrgCard>
          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 mb-4">
            This guide is open source and maintained by members and alumni. If you find a broken link,
            know a great tutorial, or want to add a new category, you can submit a pull request on GitHub.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/thefossclub/resources/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-green text-white shadow-md shadow-green-500/20 hover:opacity-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Edit on GitHub</span>
            </a>
            <Link
              href="/coc"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-border/80 bg-card hover:border-green-500/40 text-foreground transition-all"
            >
              <span>Code of Conduct</span>
            </Link>
          </div>
        </OrgCard>
      </OrgContentSection>

    </main>
  )
}

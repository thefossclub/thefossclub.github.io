"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  ArrowUp,
  ArrowRight,
  Calendar,
  Link2,
  MapPin,
  MessageCircle,
  Moon,
  PhoneCall,
  Send,
  Sun,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { LocalhostSection } from "@/components/localhost-section";
import { CountdownTimer } from "@/components/countdown-timer";

const DynamicGeometricShapes = dynamic(
  () =>
    import("@/components/geometric-shapes").then((mod) => mod.GeometricShapes),
  {
    ssr: false,
  },
);

const BlurElement = ({ className }: { className: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl ${className}`}
  />
);

const Section = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="min-h-screen flex items-center justify-center p-8 relative"
    >
      {children}
    </motion.section>
  );
};

const AnimatedTitle = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="text-5xl font-bold mb-12 text-foreground"
    >
      {children}
    </motion.h2>
  );
};

interface Sponsor {
  name: string;
  logo: string;
}

const SponsorTier = ({
  title,
  sponsors,
  bgColor,
}: {
  title: string;
  sponsors: Sponsor[];
  bgColor: string;
}) => (
  <div className={`${bgColor} rounded-xl p-6 mb-8`}>
    <h3 className="text-2xl font-semibold mb-4 text-foreground">
      {title} Sponsors
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {sponsors.map((sponsor, index) => (
        <motion.div
          key={index}
          className="bg-background/80 p-4 rounded-xl flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.8 }}
        >
          <Image
            src={sponsor.logo}
            width={160}
            height={80}
            alt={`${title} Sponsor ${sponsor.name}`}
            className="max-w-full h-auto"
          />
        </motion.div>
      ))}
    </div>
  </div>
);
const WhySponsorUs = () => (
  <div className="space-y-8 text-foreground/90 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
    <p className="text-2xl font-medium text-center mb-10">
      Sponsoring{" "}
      <span className="text-[var(--accent-green)]">FOSS Hack 2026</span> is a
      unique opportunity to align your brand with innovation, creativity, and
      impactful problem-solving.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="glass p-6 rounded-2xl border border-[var(--accent-green)]/20 hover:border-[var(--accent-green)]/40 transition-all duration-300">
        <h4 className="text-xl font-semibold mb-3 cyan">
          1. Enhanced Brand Exposure
        </h4>
        <p>
          Gain strong visibility among a focused audience of students,
          developers, professionals, and industry leaders through on-site
          engagement and massive digital reach.
        </p>
      </div>

      <div className="glass p-6 rounded-2xl border border-[var(--accent-purple)]/20 hover:border-[var(--accent-purple)]/40 transition-all duration-300">
        <h4 className="text-xl font-semibold mb-3 neon-purple">
          2. Alignment with Open-Source Innovation
        </h4>
        <p>
          Associate your brand with an event that actively promotes open-source
          technologies, collaborative development, and socially impactful
          solutions.
        </p>
      </div>

      <div className="glass p-6 rounded-2xl border border-[var(--accent-cyan)]/20 hover:border-[var(--accent-cyan)]/40 transition-all duration-300">
        <h4 className="text-xl font-semibold mb-3 neon-cyan">
          3. Meaningful Networking Opportunities
        </h4>
        <p>
          Engage directly with developers, designers, entrepreneurs, and tech
          advocates — building long-term professional connections.
        </p>
      </div>

      <div className="glass p-6 rounded-2xl border border-[var(--accent-green)]/20 hover:border-[var(--accent-green)]/40 transition-all duration-300">
        <h4 className="text-xl font-semibold mb-3 neon-cyan">
          4. Commitment to Community & Education
        </h4>
        <p>
          Support an initiative that nurtures technical learning, empowers young
          innovators, and strengthens the open-source ecosystem.
        </p>
      </div>

      <div className="glass p-6 rounded-2xl border border-[var(--accent-purple)]/20 hover:border-[var(--accent-purple)]/40 transition-all duration-300 md:col-span-2">
        <h4 className="text-xl font-semibold mb-3 neon-purple">
          5. Platform to Showcase Expertise
        </h4>
        <p>
          Participate through mentorship, speaking sessions, product demos, or
          custom challenges — with direct interaction and high visibility for
          your offerings.
        </p>
      </div>
    </div>

    <p className="text-center text-lg mt-10 italic opacity-90">
      Sponsors receive comprehensive promotion across social media, event
      branding, website, and on-ground presence — a real investment in
      open-source, talent, and the future.
    </p>
  </div>
);
export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("theme-light");
    } else {
      root.classList.remove("theme-light");
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="bg-background text-foreground text-lg relative overflow-hidden">
      <div className="fixed right-6 top-6 z-30">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`group inline-flex items-center rounded-full px-2 py-1 backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]/60 focus-visible:ring-offset-2 border border-[rgba(var(--accent-green),0.6)] ${
            theme === "light"
              ? "bg-white text-[#141414] shadow-md shadow-black/15 hover:shadow-black/25 focus-visible:ring-offset-white"
              : "bg-white/18 text-white shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:bg-white/24 focus-visible:ring-offset-black"
          }`}
        >
          <span
            className={`relative flex h-6 w-10 items-center rounded-full p-1 transition-all ${
              theme === "light"
                ? "bg-black/8 group-hover:bg-black/12"
                : "bg-black/35 group-hover:bg-black/45"
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${
                theme === "light" ? "bg-white" : "bg-black/70"
              } ${theme === "light" ? "translate-x-4" : "translate-x-0"}`}
            >
              {theme === "light" ? (
                <Sun className="h-3.5 w-3.5 text-[#141414]" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-white" />
              )}
            </span>
          </span>
        </button>
      </div>
      {/* Blur elements with updated colors */}
      <BlurElement
        className={`bg-[var(--accent-green)]/40 w-[800px] h-[800px] -top-[400px] -left-[300px] ${
          theme === "light" ? "opacity-[0.28]" : "opacity-[0.15]"
        }`}
      />
      <BlurElement
        className={`bg-[var(--accent-cyan)]/40 w-[600px] h-[600px] top-[30%] -right-[200px] ${
          theme === "light" ? "opacity-[0.26]" : "opacity-[0.15]"
        }`}
      />
      <BlurElement
        className={`bg-[var(--accent-green)]/40 w-[700px] h-[700px] bottom-0 left-1/2 -translate-x-1/2 ${
          theme === "light" ? "opacity-[0.24]" : "opacity-[0.15]"
        }`}
      />

      {/* Geometric shapes */}
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicGeometricShapes />
      </Suspense>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className={`fixed bottom-10 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all 
            ${
              theme === "light"
                ? "bg-white text-[#141414] border border-black/10 shadow-lg shadow-black/30 hover:shadow-black/45"
                : "bg-white/18 text-white border border-white/25 shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:bg-white/24"
            }`}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <Section id="register">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <motion.div
            className="mb-20 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.h1
              className="text-7xl sm:text-8xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              FOSS Hack 2026
            </motion.h1>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xl text-foreground/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-foreground" />
                <span>March 1-31, 2026</span>
              </div>
              <div className="hidden sm:block text-2xl">•</div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-foreground" />
                <span>
                  <a href="https://www.openstreetmap.org/node/7835031256#map=19/28.474677/77.476482">
                    Delhi Technical Campus, Greater Noida
                  </a>
                </span>
              </div>
            </motion.div>
            <Link
              href="https://fossunited.org/dashboard/register-for-hackathon?id=1hdcnkbtmk"
              className={`group relative inline-flex items-center gap-3 px-9 py-4 text-lg font-semibold rounded-full overflow-hidden text-[#141414] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-green),0.6)] focus-visible:ring-offset-2 ${
                theme === "light"
                  ? "shadow-md shadow-black/10 focus-visible:ring-offset-white"
                  : "shadow-lg shadow-[var(--accent-cyan)]/12 focus-visible:ring-offset-black"
              }`}
            >
              <span className="absolute inset-0 rounded-full bg-white" />
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent-green)]/60 via-white to-[var(--accent-cyan)]/60 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 rounded-full blur-lg bg-[var(--accent-cyan)]/25 opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              <span
                className="absolute inset-0 rounded-full border border-[rgba(var(--accent-green),0.6)]"
              />
              <span className="relative flex items-center gap-3">
                Register Now
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <div className="mt-24 sm:mt-28 md:mt-32 max-w-4xl mx-auto w-full">
              <CountdownTimer />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Add after the register Section and before rules Section */}
      <Section id="venue">
        <LocalhostSection />
      </Section>

      <Section id="rules">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Hackathon Rules & Regulations</AnimatedTitle>
          <motion.div
            className="space-y-8 text-xl text-foreground/60"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            {[
              "Evaluation based on code commits during the event",
              "No external APIs allowed as core features",
              "Project must have a valid FOSS license",
              "Cash prize split among winners at jury's discretion",
              "No blockchain, web3, or crypto projects",
            ].map((rule, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.8 }}
                className="flex items-center gap-3"
              >
                <span className="text-foreground">•</span> {rule}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="coc">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Code of Conduct</AnimatedTitle>
          <motion.div
            className="prose prose-xl text-foreground/60"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            <p className="text-xl">
              We are committed to providing a harassment-free experience for
              everyone, regardless of:
            </p>
            <ul className="list-none space-y-4 text-xl">
              {[
                "Gender, gender identity, and expression",
                "Age, sexual orientation, disability",
                "Physical appearance, body size, race, ethnicity",
                "Religion (or lack thereof)",
                "Technology choices",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-foreground">•</span> {item}
                </motion.li>
              ))}
            </ul>
            <p className="text-xl mt-6 font-semibold">
              Reporting Code of Conduct Violations
            </p>
            <p className="text-xl">
              If you are being harassed, notice that someone else is being
              harassed, or come across a violation of the code of conduct,
              please contact a volunteer/organiser immediately. Participants can
              call <b>+91 9354424599</b> or email{" "}
              <a href="mailto:fossclub@proton.me" className="underline">
                fossclub@proton.me
              </a>{" "}
              for any reports or queries. All reporters will remain anonymous.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section id="links">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Important Links</AnimatedTitle>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            {[
              {
                title: "Discord Server",
                desc: "Join our community for discussions",
                url: "https://discord.gg/Dxwx99RJKH",
                icon: MessageCircle,
              },
              {
                title: "Telegram Group",
                desc: "Join our telegram group",
                url: "https://t.me/TheFOSSClub",
                icon: Send,
              },
              {
                title: "WhatsApp Group",
                desc: "Access our WhatsApp group",
                url: "https://chat.whatsapp.com/JSGCKlaB4YSDJkEDg6ImSL",
                icon: PhoneCall,
              },
              {
                title: "LinkTree",
                desc: "Access all our links",
                url: "https://linktr.ee/thefossclub",
                icon: Link2,
              },
            ].map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.8 }}
                className="relative group/link"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)]/18 via-[var(--accent-purple)]/14 to-[var(--accent-green)]/10 opacity-0 blur-xl group-hover/link:opacity-100 transition-opacity duration-500" />
                <Link
                  href={link.url}
                  className={`relative flex items-center justify-between gap-4 p-6 rounded-2xl transition-colors duration-300 border ${
                    theme === "light"
                      ? "bg-white text-foreground border-black/10 hover:border-black/20 shadow-sm"
                      : "bg-black/40 text-white border-foreground/10 hover:border-foreground/30 hover:bg-black/55"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        theme === "light" ? "bg-black/5" : "bg-white/10"
                      }`}
                    >
                      <link.icon
                        className={`h-5 w-5 ${
                          theme === "light" ? "text-[var(--accent-purple)]" : "text-[var(--accent-cyan)]"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-semibold ${
                          theme === "light" ? "text-foreground" : "text-white"
                        }`}
                      >
                        {link.title}
                      </h3>
                      <p
                        className={`text-sm md:text-base ${
                          theme === "light" ? "text-foreground/70" : "text-white/70"
                        }`}
                      >
                        {link.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover/link:translate-x-1 ${
                      theme === "light" ? "text-foreground/60" : "text-white/60"
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="sponsors">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Our Sponsors</AnimatedTitle>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            {/* Platinum Tier (Empty) */}
            <SponsorTier
              title="Platinum"
              sponsors={[]}
              bgColor="bg-gradient-to-br from-cyan-200/30 via-cyan-300/20 to-transparent backdrop-blur-sm border border-gray-400/30"
            />

            <SponsorTier
              title="Gold"
              sponsors={[]}
              bgColor="bg-gradient-to-br from-yellow-500/25 via-yellow-400/15 to-transparent backdrop-blur-sm border border-yellow-400/30"
            />

            <SponsorTier
              title="Silver"
              sponsors={[]}
              bgColor="bg-gradient-to-br from-gray-400/25 via-gray-300/15 to-transparent backdrop-blur-sm border border-gray-400/30"
            />
          </motion.div>
        </div>
      </Section>
      <Section id="why-sponsor">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Why Sponsor Us?</AnimatedTitle>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
          >
            <WhySponsorUs />
          </motion.div>
          <div className="mt-8 text-center text-lg text-foreground/70">
            Interested? Contact us at{" "}
            <a
              href="mailto:contact@thefossclub.org"
              className="underline underline-offset-4 text-foreground"
            >
              contact@thefossclub.org
            </a>
            .
          </div>
        </div>
      </Section>

      <Section id="team">
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedTitle>Team</AnimatedTitle>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            {[
              { name: "Tanmay Maheshwari", title: "Lead Organizer" },
              { name: "Sanjam Kaur", title: "Management" },
              { name: "Jayesh Bisht", title: "Management" },
              {
                name: "Avneesh Kumar",
                title: "Community Partners & Campus Ambassadors Head",
              },
              { name: "Kartik Gupta", title: "Community Partner" },
              { name: "Harshit Vashisht", title: "Campus Ambassador" },
              { name: "Manya Yadav", title: "PR & Outreach Head" },
              { name: "Aditya Mishra", title: "PR" },
              {
                name: "Ishita Kaushik",
                title: "Social Media / Photos / Videos Head",
              },
              { name: "Adarsh", title: "Social Media & Shoot & Edit" },
              { name: "Satyam Raj", title: "Photography" },
              { name: "Anmol Upadhyay", title: "Videography" },
              {
                name: "Nitya Kapoor",
                title: "Graphics & Content Writing Head",
              },
              { name: "Aditya Sachdeva", title: "Graphics" },
              { name: "Jayesh Bisht", title: "Content Writing" },
              { name: "Avneesh Kumar", title: "Graphics Support" },
              {
                name: "Bhumi Aggarwal",
                title: "Logistics, Food & Vendor Head",
              },
              { name: "Aditya Singh", title: "Logistics" },
              { name: "Krish Gupta", title: "Food Management" },
              { name: "Dishant", title: "Food Support" },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.8 }}
              >
                <motion.div
                  className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    theme === "light" ? "bg-black/5" : "bg-[#141414]/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${
                      theme === "light" ? "text-foreground" : "text-white"
                    }`}
                  />
                </motion.div>
                <h3
                  className={`text-lg sm:text-xl font-medium mb-1 ${
                    theme === "light" ? "text-foreground" : "text-white"
                  }`}
                >
                  {member.name}
                </h3>
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-foreground/70" : "text-white/60"
                  }`}
                >
                  {member.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
      <Section id="about">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>About FOSS Hack</AnimatedTitle>
          <motion.div
            className="prose prose-xl text-foreground/60"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            <p className="text-2xl leading-relaxed">
              FOSS Hack 2026 is the sixth edition of FOSS Hack, a hybrid
              hackathon to promote Free and Open Source Software by bringing
              together students and professionals to build or extend FOSS
              projects.
            </p>
            <p className="text-2xl leading-relaxed">
              With a prize pool of ₹5,00,000, our mission is to foster
              open-source development and provide a platform for creative minds
              to build solutions that benefit the community.
            </p>
          </motion.div>
        </div>
      </Section>

      <motion.footer
        className="relative z-10 border-t border-foreground/15 bg-background/60 backdrop-blur-md py-14 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-foreground/5 to-transparent" />
        <div className="max-w-5xl mx-auto text-center text-foreground/70">
          <p className="text-xl">
            &copy; 2026 FOSS Hack Delhi-NCR. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

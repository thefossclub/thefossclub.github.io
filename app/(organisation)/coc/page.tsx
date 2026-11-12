import OrgContentSection from "@/components/organisation/org-content-section"
import OrgCard from "@/components/organisation/org-card"
import OrgListItem from "@/components/organisation/org-list-item"

export const metadata = {
  title: "Code of Conduct | The FOSS Club",
  description:
    "The official Code of Conduct for The FOSS Club — our guidelines for a respectful, inclusive, and collaborative community.",
}

export default function CodeOfConductPage() {
  return (
    <main className="relative min-h-screen text-foreground">
      {/* Document Intro: Sets welcoming baseline and foundational expectations for all club engagements */}
      <section className="pt-28 sm:pt-36 pb-6 sm:pb-8 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gradient-green tracking-tight">
            Code of Conduct
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground max-w-4xl">
            Welcome to The FOSS Club! As a community centered around Free and Open Source
            Software (FOSS), we believe in fostering an inclusive, safe, and respectful
            environment for everyone. This Code of Conduct outlines the standards and
            expectations for everyone participating in the club, including board members,
            sponsors, volunteers, contributors, and event attendees. By engaging with The
            FOSS Club, you agree to abide by this Code of Conduct.
          </p>
        </div>
      </section>

      {/* Purpose & Scope: Establishes binding standards for members, leadership, contributors, and event attendees */}
      <OrgContentSection title="Purpose">
        <OrgCard>
          <p className="text-base sm:text-lg leading-relaxed text-foreground mb-6">
            The goal of this Code of Conduct is to ensure that our community remains a
            respectful and inclusive space for learning, collaboration, and sharing.
            Everyone, regardless of their background or experience level, should feel
            welcomed and valued.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green">
            Who Should Follow This Code?
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
            This Code of Conduct applies to all individuals who participate in any
            activity related to The FOSS Club, including:
          </p>
          <ul className="space-y-2 sm:space-y-3 text-foreground mb-6">
            {[
              "Club members",
              "Board members and leadership",
              "Event speakers and organizers",
              "Volunteers",
              "Contributors to our projects",
              "Attendees at events or meetups",
              "Sponsors and partners",
            ].map((item) => (
              <OrgListItem key={item}>{item}</OrgListItem>
            ))}
          </ul>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            By being part of The FOSS Club, you are contributing to our community&apos;s
            values, and it is essential that we all strive to uphold the principles of
            mutual respect, professionalism, and collaboration.
          </p>
        </OrgCard>
      </OrgContentSection>

      {/* Community Guidelines: Actionable behavioral standards for both virtual channels and in-person events */}
      <OrgContentSection title="Guidelines">
        <div className="space-y-6 sm:space-y-8">
          {/* Guideline 1: Professional communication across code reviews, discussion channels, and talks */}
          <OrgCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green">
              1. Professional Conduct
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
              Our community thrives on professional, respectful, and positive interactions.
              Whether communicating in person, online, or through written communication,
              all participants are expected to:
            </p>
            <ul className="space-y-2 sm:space-y-3 text-foreground mb-4">
              {[
                "Use appropriate, professional language.",
                "Avoid excessive use of informal elements, such as GIFs, memes, or emojis in formal conversations, discussions, or club channels.",
                "Maintain a friendly but respectful tone, particularly when providing feedback, engaging in debates, or participating in discussions.",
              ].map((item) => (
                <OrgListItem key={item}>{item}</OrgListItem>
              ))}
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              While fun and lighthearted exchanges are welcome in informal settings,
              professionalism must be maintained in club channels or during official events.
            </p>
          </OrgCard>

          {/* Guideline 2: Comprehensive inclusion criteria protecting diversity across all identities and skill levels */}
          <OrgCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green">
              2. Inclusion and Respect for All
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
              We are committed to ensuring that The FOSS Club is an inclusive space for
              individuals from all walks of life. Treat everyone with respect, regardless of
              their:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-foreground mb-4">
              {[
                "Age",
                "Gender identity or expression",
                "Sexual orientation",
                "Race, ethnicity, or nationality",
                "Disability or medical condition",
                "Religion or spiritual beliefs",
                "Socio-economic background",
                "Level of experience or expertise",
                "Physical appearance or body size",
                "Marital or familial status",
                "Education or employment status",
                "Immigration status",
                "Veteran status",
              ].map((item) => (
                <div
                  key={item}
                  className="p-3.5 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 hover:border-primary/40 shadow-sm text-sm sm:text-base text-foreground transition-all duration-200"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Discrimination, harassment, or exclusionary behavior based on any of these
              characteristics is unacceptable.
            </p>
          </OrgCard>

          {/* Guideline 3: Explicit anti-harassment safeguards protecting psychological and physical safety */}
          <OrgCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green">
              3. Harassment-Free Environment
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
              Harassment, intimidation, or any kind of threatening behavior will not be
              tolerated. Examples of unacceptable behavior include:
            </p>
            <ul className="space-y-2 sm:space-y-3 text-foreground mb-4">
              {[
                "Sexualized language or imagery, including inappropriate jokes or comments.",
                "Unwelcome attention or inappropriate contact, whether in person or online.",
                "Deliberate intimidation or stalking, either physically or digitally.",
                "Persistent disruption of discussions, meetings, or presentations.",
                "Targeted harassment, bullying, or attempts to undermine another member's participation.",
              ].map((item) => (
                <OrgListItem key={item}>{item}</OrgListItem>
              ))}
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              If any participant feels uncomfortable or threatened by the behavior of
              others, they should report the incident to club leadership immediately.
            </p>
          </OrgCard>

          {/* Guideline 4: Constructive technical critique focused on ideas rather than personal attacks */}
          <OrgCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green">
              4. Appropriate Communication
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
              All communication within The FOSS Club should be respectful, constructive, and
              inclusive. This includes:
            </p>
            <ul className="space-y-2 sm:space-y-3 text-foreground mb-4">
              {[
                "Ensuring that conversations stay on topic and contribute meaningfully to discussions.",
                "Avoiding personal attacks or insults during disagreements or debates.",
                "Avoiding the use of exclusionary, offensive, or derogatory language.",
              ].map((item) => (
                <OrgListItem key={item}>{item}</OrgListItem>
              ))}
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Harmful language that targets a person or group, such as racist, sexist,
              homophobic, transphobic, or ableist language, is not allowed under any
              circumstances.
            </p>
          </OrgCard>

          {/* Guideline 5: Promoting mentorship, peer code reviews, and community-first teamwork */}
          <OrgCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green">
              5. Collaboration and Support
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
              The FOSS Club encourages collaboration, mentorship, and knowledge sharing. Be
              supportive of others&apos; learning journeys, and be patient with those who may
              have less experience. In our community:
            </p>
            <ul className="space-y-2 sm:space-y-3 text-foreground mb-4">
              {[
                "Constructive feedback should be offered when requested, and should be presented in a clear, helpful manner.",
                "If disagreements arise, they should be handled respectfully and with a focus on resolving the issue rather than attacking the individual.",
                "Teamwork and cooperation should be prioritized over personal competition or one-upmanship.",
              ].map((item) => (
                <OrgListItem key={item}>{item}</OrgListItem>
              ))}
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              It is everyone&apos;s responsibility to ensure that the environment is positive and
              that everyone has the opportunity to learn, contribute, and grow.
            </p>
          </OrgCard>

          {/* Guideline 6: Anti-disruption rules safeguarding presentations, workshops, and official channels */}
          <OrgCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green">
              6. No Disruption or Unwanted Behavior
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
              We expect all participants to contribute positively to the community.
              Disruptive behavior or attempts to monopolize discussions, meetings, or events
              will not be tolerated. This includes:
            </p>
            <ul className="space-y-2 sm:space-y-3 text-foreground mb-4">
              {[
                "Repeated interruptions or off-topic comments during presentations or talks.",
                "Overpowering discussions or attempting to dominate decisions.",
                "Unwelcome promotions, self-advertisements, or solicitation without prior consent from club leadership.",
              ].map((item) => (
                <OrgListItem key={item}>{item}</OrgListItem>
              ))}
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Behavior that detracts from the community&apos;s purpose or undermines the
              experience of others will be addressed by moderators or club leaders.
            </p>
          </OrgCard>

          {/* Guideline 7: Standards for social media representation and external public communications */}
          <OrgCard>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient-green">
              7. Responsible Social Media Use
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
              The FOSS Club may engage with the broader online community through social
              media and other platforms. Participants are expected to adhere to the following
              guidelines when representing or discussing The FOSS Club online:
            </p>
            <ul className="space-y-2 sm:space-y-3 text-foreground mb-4">
              {[
                "Uphold the same level of respect and professionalism as expected in person.",
                "Avoid posting content that could be considered discriminatory, offensive, or harmful to others.",
                "Refrain from making personal attacks, inflammatory statements, or sharing unverified information.",
              ].map((item) => (
                <OrgListItem key={item}>{item}</OrgListItem>
              ))}
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Social media should be used as a tool for positive communication,
              collaboration, and sharing within the broader FOSS community.
            </p>
          </OrgCard>
        </div>
      </OrgContentSection>

      {/* Incident Intake: Multi-channel reporting mechanisms routed to leadership and faculty coordinator */}
      <OrgContentSection title="Reporting Violations">
        <OrgCard>
          <p className="text-base sm:text-lg leading-relaxed text-foreground mb-6">
            If you experience or witness any violations of this Code of Conduct, it is
            important to report the incident as soon as possible. Reporting is a crucial
            part of maintaining the safety and inclusivity of our community. Here&apos;s how
            you can report an issue:
          </p>
          <ul className="space-y-3 sm:space-y-4 text-foreground mb-6">
            <li className="p-4 md:p-5 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 hover:border-primary/40 shadow-sm text-sm sm:text-base text-foreground transition-all duration-200">
              <strong className="text-foreground">Email:</strong>{" "}
              Please send an email to{" "}
              <a
                href="mailto:contact@thefossclub.org"
                className="text-green-600 dark:text-green-400 hover:underline font-semibold"
              >
                contact@thefossclub.org
              </a>{" "}
              with a detailed description of the incident. Include relevant information
              such as where and when the incident occurred, the people involved, and any
              witnesses.
            </li>
            <li className="p-4 md:p-5 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 hover:border-primary/40 shadow-sm text-sm sm:text-base text-foreground transition-all duration-200">
              <strong className="text-foreground">Phone:</strong>{" "}
              If urgent, contact us at{" "}
              <strong className="text-green-600 dark:text-green-400">+91 8882895216</strong>.
            </li>
            <li className="p-4 md:p-5 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 hover:border-primary/40 shadow-sm text-sm sm:text-base text-foreground transition-all duration-200">
              <strong className="text-foreground">In-person:</strong>{" "}
              If attending an event, you can report the issue directly to a board member
              or the faculty coordinator,{" "}
              <strong className="text-green-600 dark:text-green-400">Ms. Shilpa Khurana</strong>.
            </li>
          </ul>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            All reports will be handled with discretion and confidentiality. We are
            committed to ensuring that complaints are taken seriously and that appropriate
            actions are taken to address the issue.
          </p>
        </OrgCard>
      </OrgContentSection>

      {/* Enforcement Protocol: Standard progressive discipline actions taken by club leadership */}
      <OrgContentSection title="Consequences of Misconduct">
        <OrgCard>
          <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
            Participants who are found to be in violation of this Code of Conduct may face
            consequences based on the severity of the behavior. Possible actions include:
          </p>
          <ul className="space-y-2 sm:space-y-3 text-foreground mb-6">
            {[
              "A warning from moderators or leadership.",
              "Temporary or permanent removal from events, discussions, or club channels.",
              "A ban from The FOSS Club's activities and future participation.",
            ].map((item) => (
              <OrgListItem key={item}>{item}</OrgListItem>
            ))}
          </ul>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            We reserve the right to take further action as necessary to maintain a safe
            and positive environment for all.
          </p>
        </OrgCard>
      </OrgContentSection>

      {/* Attribution & Legal Licensing: CC BY-SA 3.0 license and GNOME Code of Conduct upstream attribution */}
      <OrgContentSection title="License and Attribution">
        <OrgCard>
          <p className="text-base sm:text-lg leading-relaxed text-foreground mb-6">
            This Code of Conduct is licensed under the{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:underline font-semibold"
            >
              Creative Commons Attribution Share-Alike 3.0 Unported License
            </a>
            . It is derived from the GNOME Code of Conduct, with adaptations specific to
            The FOSS Club&apos;s values and community standards.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Thank you for being part of The FOSS Club and for contributing to a
            respectful, collaborative, and inclusive community. We appreciate your efforts
            to uphold these standards and look forward to working with you to make our
            community even better.
          </p>
        </OrgCard>
      </OrgContentSection>

    </main>
  )
}

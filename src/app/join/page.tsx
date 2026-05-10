import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { MonoLabel } from "@/components/motion/mono-label";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Recruitment for first-year IIITDM students. Sub-team roles in Mechanical, Electronics, and Autonomy & Software.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        index={6}
        eyebrow="Join MaRS"
        title={
          <>
            Apply to{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">build</span>.
          </>
        }
        lead="MaRS recruits during the first-year orientation. We look for engineers who want to ship hardware that actually moves — not slides about it."
      />

      <section className="container-page pb-24 md:pb-32 grid gap-12 md:grid-cols-2">
        <Reveal>
          <MonoLabel index={1}>For students</MonoLabel>
          <h2 className="mt-6 text-2xl md:text-3xl font-medium tracking-tight text-[color:var(--color-paper)]">
            Recruitment opens July 2026.
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)] leading-relaxed">
            We open applications during the orientation week. The application form will appear
            here when recruitment is live. In the meantime, follow us on Instagram for updates
            and Open House announcements.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <MonoLabel index={2}>For sponsors</MonoLabel>
          <h2 className="mt-6 text-2xl md:text-3xl font-medium tracking-tight text-[color:var(--color-paper)]">
            Power the next rover.
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)] leading-relaxed">
            MaRS competes internationally on a student budget. If you'd like to support the
            team — components, fabrication, travel — we'd love to talk. Email us with
            &ldquo;sponsorship&rdquo; in the subject line.
          </p>
        </Reveal>
      </section>
    </>
  );
}

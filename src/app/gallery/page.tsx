import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { MonoLabel } from "@/components/motion/mono-label";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/gallery", {
  title: "Gallery",
  description: "Photos from the field — competitions, builds, demos, and the team.",
});

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />
      <PageHero
        index={5}
        eyebrow="Gallery"
        title={
          <>
            From the{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">field</span>.
          </>
        }
        lead="Competitions, late-night fabrication, terrain testing, demos. The work, in pictures."
      />

      <section className="container-page pb-32">
        <Reveal>
          <MonoLabel index={1}>Coming soon</MonoLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[color:var(--color-muted)]">
            A filterable photo wall organised by event and rover is being prepared. We're
            sourcing high-resolution images from the MaRS archive.
          </p>
        </Reveal>
      </section>
    </>
  );
}

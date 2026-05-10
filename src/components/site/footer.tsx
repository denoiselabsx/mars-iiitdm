import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[color:var(--color-line)]/60">
      <div className="container-page py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/mars-logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-paper)]">
                  {site.name}
                </p>
                <p className="text-xs text-[color:var(--color-faint)]">
                  {site.parent}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-muted)]">
              {site.description}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors" href="/rovers">Rovers</Link>
              </li>
              <li>
                <Link className="text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors" href="/competitions">Competitions</Link>
              </li>
              <li>
                <Link className="text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors" href="/team">Team</Link>
              </li>
              <li>
                <Link className="text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors" href="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
              Connect
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/join"
                  className="text-[color:var(--color-mars)] hover:text-[color:var(--color-mars-glow)] transition-colors"
                >
                  Join the team →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[color:var(--color-line)]/40 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-faint)]">
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <a
            href={site.agency.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2.5 text-[11px] text-[color:var(--color-faint)] hover:text-[color:var(--color-paper)] transition-colors"
          >
            <span className="font-mono uppercase tracking-[0.18em]">Crafted by</span>
            <Image
              src="/brand/denoise-horizontal.png"
              alt={site.agency.name}
              width={92}
              height={16}
              className="h-4 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

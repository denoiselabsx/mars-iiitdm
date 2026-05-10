# mars-iiitdm

Official website for **MaRS — Mars Rover Students Club**, IIITDM Kancheepuram.
Designed and built by **Denoise Labs**.

> Status: W1 skeleton — 6 routes live, design system wired, ready for the 3D hero in W2.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** + **shadcn/ui** primitives (`new-york`, neutral, CSS vars)
- **Motion** (Framer Motion) for component interactions
- **GSAP** + ScrollTrigger for the scroll-driven 3D hero (W2)
- **Lenis** for smooth scroll
- **react-three-fiber** + drei for the rover scene
- **Vercel Analytics** + Speed Insights
- Deployed on **Vercel**

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm typecheck
```

## Layout

```
src/
├── app/                     # App Router routes
│   ├── layout.tsx           # Root layout — fonts, providers, nav, footer
│   ├── page.tsx             # /                    Hero + achievements + CTA
│   ├── rovers/              # /rovers              Rovers index
│   ├── competitions/        # /competitions        IRC, ISDC, IRoC, SHAASTRA
│   ├── team/                # /team                Team Shunya + sub-teams
│   ├── gallery/             # /gallery             Photo wall
│   ├── join/                # /join                Recruitment + sponsors
│   └── globals.css          # Design tokens + base styles
├── components/
│   ├── providers/           # Lenis, Motion
│   ├── site/                # Nav, Footer, PageHero
│   └── motion/              # Reveal, Magnetic, MonoLabel, MarsHorizon
└── lib/
    ├── site.ts              # Site config (name, nav, social, agency)
    └── utils.ts             # cn() helper
public/
├── brand/                   # Mars + Denoise logos
├── models/                  # rover.glb (3D hero asset, ~10 MB)
└── textures/                # grain.svg
data_local/                  # Gitignored — source material (booklet PDFs, brochures)
```

## Design tokens

All defined in `src/app/globals.css` and exposed via `@theme`:

- **Colors**: `--color-mars` (#C1440E), `--color-mars-glow`, `--color-signal`, `--color-void`, `--color-surface`, `--color-line`, `--color-paper`, `--color-muted`, `--color-faint`
- **Fonts**: `--font-sans` (Geist), `--font-mono` (Geist Mono), `--font-serif` (Instrument Serif)
- **Motion**: `--ease-out-quart`, `--ease-out-expo`, durations `--dur-fast/base/slow/glacial`

Use Tailwind arbitrary values: `text-[color:var(--color-mars)]`, `font-mono`, `bg-[color:var(--color-void)]`.

## Roadmap

| Week  | Phase                                             |
|-------|---------------------------------------------------|
| W1 ✅ | Foundation + design system + 6 skeleton routes   |
| W2    | Scroll-driven 3D rover hero on `/`               |
| W3    | `/rovers` + `/competitions` content              |
| W4    | `/team` + `/gallery` content                     |
| W5    | `/join` + Resend form integration                |
| W6    | Polish — micro-interactions, transitions, 404    |
| W7    | Performance + a11y audit                         |
| W8    | Content fill + buffer + handoff                  |

See `memory/MEMORY.md` (in Claude's project memory) for decision log.

## Notes

- `data_local/` holds source material (PDFs, brochures, GLB) and is **gitignored**.
- `public/models/rover.glb` is committed for now. If we add more 3D assets, move to Git LFS.
- The current GLB is NASA's Curiosity (placeholder). Swap to MaRS's own rover CAD when available.

---

*Crafted by [Denoise Labs](https://denoiselabs.in).*

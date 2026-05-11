# MaRS × Denoise Labs · Content Brief

> Hi Avichal, Sarang — this is the one consolidated content ask from our side. Everything below feeds into the marsiiitdm.in site you've seen so far. **You don't need to deliver this all at once** — the items are ranked by impact, and we'll start dropping each one in as it arrives.

## Why this matters

The site framework is built. The 3D hero, the navigation, the design system, the legacy results, the sponsorship tiers — all live with real content from your brochure. **What's missing is the human, photographic, and engineering material that turns a competent site into something an URC judge or sponsor lead remembers.**

We have ~6 weeks until the recruitment cycle. Sending us the items below — in any order — accelerates everything.

---

## Tier 1 · The big four (highest impact)

### 1. Vajra CAD export as GLB
- Format: **GLB**, max **5 MB**
- Compression: DRACO if possible (most CAD exporters support it)
- Up to 100k triangles is fine; aim lower
- Send through any drive link

**What we'll do with it:** replace the NASA Curiosity model currently in the hero with the real Vajra. The entire site lifts the moment this lands. If you can label sub-meshes (chassis, arm, wheels, etc.), we can build per-subsystem highlights — but unlabelled is fine for v1.

### 2. Vajra photo dump — 30+ photos
- A Google Drive / Dropbox folder, anything works
- Original resolution preferred (we'll optimise)
- Subjects we need most:
  - **Hero shots** — Vajra clean, well-lit, golden hour or clean indoor light. Multiple angles. (At least 5 if possible.)
  - **Construction / lab** — fabrication, soldering, CAD-on-screen, late-night testing.
  - **At competitions** — Vajra on the field, on the stage, mid-mission. From IRC 2026, ERC 2023 Onsite (Poland), IRoC-U at URSC Bengaluru.
  - **Team in action** — group photos, members at their stations, presentations.
  - **The notable moments** — the rover presented to President Murmu, to ISRO Chairman Somanath. The DT-Next press coverage. The award ceremonies.

**What we'll do:** build the `/rovers/vajra` story-mode page (a scroll-driven case study from concept → fabrication → field → competition), populate `/gallery`, and use the best hero shots as OG share cards.

### 3. Team roster — CSV or table
Columns we need:
- `name`
- `role` (e.g. "Mechanical Lead", "Software Engineer", "Manipulator subsystem")
- `subteam` (Mechanical · Electronics · Software · Autonomy · Leadership)
- `year` (e.g. "EC23")
- `photo` (filename or link)
- `github` (optional)
- `linkedin` (optional)
- `bio_oneliner` (optional — 1 sentence, e.g. "I rewrote the SLAM stack last semester")

**What we'll do:** build `/team` as a real grid of faces with sub-team filters and hover-to-expand cards. Faculty advisor section at the bottom.

### 4. A 30–60 second video
- Phone footage is fine — cut together or raw
- Subjects: Vajra moving, the arm articulating, team working, anything kinetic
- MP4, 1080p preferred

**What we'll do:** use as ambient hero background on `/rovers/vajra`, and as the autoplay-on-hover preview on the home page rover card.

---

## Tier 2 · Strong assists (high impact, lower effort)

### 5. Faculty Advisor
- Name
- Designation (Professor / Associate Professor / etc.)
- Department
- Photo (one is fine)
- A 2-sentence quote about the team (optional but very high-leverage)

**What we'll do:** add to `/team` and `/competitions`. This single addition raises credibility a lot — every Indian institutional site has one; ours doesn't yet.

### 6. Sponsor logos
For the eight named sponsors in your brochure — TLC, Drona Aviation, Robokits India, DIC IIITDM, Spark Future Technology, Sphere Tech Innovations, Altair, Autodesk — please send:
- The official logo file each (SVG preferred, PNG fine)
- Their official website URL each

**What we'll do:** swap the placeholder "logo here" slots in the footer + `/join` with proper logos.

### 7. Rover specs (engineering)
For Vajra (and Destiny if you have time):
- Mass (kg)
- Dimensions (L × W × H, mm)
- Top speed (m/s)
- Drivetrain (motors / gear ratio / suspension type)
- Manipulator (DOF / payload / reach)
- Compute (Pi / Jetson / etc.)
- Sensors (IMU / GPS / cameras / lidar)
- Comms (telemetry range / video link)
- Power (battery type / Wh)

**What we'll do:** real spec sheets on each rover page + the home "SpecSheet" marquee.

### 8. Press / press release
Any newspaper articles, online coverage, magazine features. Even Tamil regional press. Links or PDFs.

**What we'll do:** a `/press` route with a media kit + press archive.

---

## Tier 3 · Future polish (when you get time)

- **Past members / alumni** — names + current placements / orgs. Builds credibility for new recruits.
- **Quotes** — one sentence from each lead about why MaRS matters to them. Used as editorial pull-quotes.
- **Notion / Github links** — any public project boards, build documentation, GitHub orgs.
- **Brand guide** — we've tuned the site's red to `#D63828` to match the MaRS logo. If you have an official brand color hex (or guidelines), send it and we'll align exactly.
- **Past competition footage** — YouTube links to your team's rover competing.

---

## How to send

Single Google Drive folder, structured like:

```
mars-content/
├── 01-glb/
│   └── vajra.glb
├── 02-photos/
│   ├── hero/
│   ├── construction/
│   ├── competitions/
│   └── team/
├── 03-team-roster.csv
├── 04-video/
│   └── *.mp4
├── 05-faculty/
│   ├── photo.jpg
│   └── info.txt
├── 06-sponsors/
│   └── *.svg / *.png
└── 07-specs.md
```

Share the folder link with **mars@iiitdm.ac.in** in CC so it's archived. We'll pull from there as we build.

---

## What we have already (no need to resend)

For your reference, we've already extracted from the SHUNYA brochure and 2025-26 Annual Report:

- All competition results (IRC 2026, ISDC 2026, SHAASTRA, ERC 2025, ERC 2023, IRoC 2024, IRC 2024, ERC 2022, ARCh 2022-23) ✅
- Team SHUNYA name + 40+ member count ✅
- All rover names: Vajra (rover + manipulator), Destiny (rover + manipulator), Kutti, Legged Dog Rover, Drone, Spider Bot ✅
- Mission statement + outreach text ✅
- 5-stage design process ✅
- 8 sponsor names (just need logos + URLs) ✅
- Sponsorship tiers (Bronze → Platinum) + ways-to-support ✅
- Avichal & Sarang contact details ✅
- Address + general email ✅

---

## Timeline

| Tier | Ship target |
|---|---|
| Tier 1 GLB | The day it arrives → hero swap, instant lift |
| Tier 1 photos | The week they arrive → `/gallery`, `/rovers/vajra` story mode, OG cards |
| Tier 1 roster | The week it arrives → `/team` rebuild |
| Tier 1 video | The week it arrives → hero ambient + rover-card preview |
| Tier 2 faculty | Within 24h of receipt |
| Tier 2 sponsor logos | Within 24h of receipt |
| Tier 2 specs | Within 24h of receipt |
| Tier 3 | Rolling, when time allows |

---

## Questions?

Reply on the Denoise side to: **hello@denoiselabs.com**

If you have material in formats you're not sure about, send it anyway — we'll handle conversion.

**The site is ~70% done structurally. These assets are what get us the remaining 30% that makes judges and sponsors actually remember it.**

— Denoise Labs · 2026-05

# Image-Drive Analysis & Plan

Every photo and headshot in `mars_image_drive/` analyzed visually, cross-referenced with `public/MaRS Club Alumni - Sheet1.csv`, mapped to the routes/components that already exist in `src/app/` and `src/lib/data.ts`. This is the source-of-truth handover for the next implementation pass.

Totals: **219 event photos** (4 events) + **23 alumni headshots** + **3 Caterpillar 2026 shots** + **8 sponsor logos** + **28 alumni rows** in CSV.

---

## 1. Alumni — ordered by passing-out year (newest first)

Parsed JSON lives at `.image_analysis/alumni_parsed.json`. Headshot quality reviewed image-by-image. ✓ = image present in drive, ✗ = missing.

### Batch 2026 (current final-years, just placed)

| # | Name | Role in MaRS | Placement / next step | LinkedIn | Image | Quality note |
|---|---|---|---|---|---|---|
| 1 | Ayush Kumar | Ex Team Lead | Intern @ Virya Autonomous Technology (2025) | [link](https://www.linkedin.com/in/ayush-kumar-a44632283/) | ✓ | Clean portrait, glasses, pink shirt — use as-is |
| 2 | Divyanshu Pandey | Ex Mechatronics Lead | ADDVERB (2026) | [link](https://www.linkedin.com/in/divyanshu006/) | ✓ | Very strong — venue portrait w/ lanyard |
| 3 | Manjari Shrivastava | Ex Mechanical Lead | Textron (2026) | [link](https://www.linkedin.com/in/manjari28/) | ✓ | **Not a portrait** — receiving award; needs face crop or replacement |
| 4 | Phanish Vajhala | Ex Mechanical Lead | Epick Bikes (2026) | [link](https://www.linkedin.com/in/phanishvajhala/) | ✓ | Pre-cropped circle w/ pink ring — needs original |
| 5 | Rahul Rajak | Ex Electronics Member | Eric Robotics (2026) | [link](https://www.linkedin.com/in/rahul-rajakr/) | ✓ | At IRoC-2024 banner — in-context, good fit |
| 6 | Rajrajeshwer Gupta | Ex Electronics Member | Botlab Dynamics (2026) | [link](https://www.linkedin.com/in/raj-rajeshwer-gupta-15511a220/) | ✓ | Striped shirt, urban evening — good casual |
| 7 | Sai Harshith Raghupatruni | Ex Electronics Member | NRSC-ISRO Hyderabad (2025) | [link](https://www.linkedin.com/in/sai-harshith-raghupatruni-05a631283/) | ✓ | Has #OPENTOWORK LinkedIn frame — crop or replace |
| 8 | Shubh Khandelwal | Ex Electronics Team Lead | Impaqt Robotics (2026) | [link](https://www.linkedin.com/in/shubh--khandelwal/) | ✓ | **★ Hero of the set** — MaRS varsity jacket at IIITDM |
| 9 | Vignesh Aravindh B | Ex Software Dev Lead | COSGrid Systems Chennai (2025) | [link](https://www.linkedin.com/in/vignesh-aravindh-b-24bb63252/) | ✓ | Excellent — Knowledge Plaza backdrop |

### Batch 2025

| # | Name | Role in MaRS | Next step | LinkedIn | Image | Quality |
|---|---|---|---|---|---|---|
| 10 | Aravind Ananthakrishnan | Ex Electronics Lead | PhD @ IITK (after ASIC intern @ URSC-ISRO) | [link](https://www.linkedin.com/in/aravind-ananthakrishnan-7b1bb1232/) | ✓ | Excellent indoor portrait |
| 11 | Manas Narayan | Ex Team Lead | Xdlinx Space Labs | [link](https://www.linkedin.com/in/manas-narayan-bb1723232/) | ✓ | Marina Bay backdrop — touristy; blur bg |
| 12 | Saikat Paul | Ex Mechanical Lead | Job @ Tvasta / Peppermint Robotics | [link](https://www.linkedin.com/in/saikatpaul2102/) | ✓ | Casual outdoor — ok |
| 13 | Samrat Chhabra | Ex Electronics Team Lead | PhD @ IITB (InCore Semi intern) | [link](https://www.linkedin.com/in/samrat-chhabra-bb235b21a/) | ✓ | **★ On-brand** — MaRS club tee, beach |
| 14 | Sibi M | — | Co-Founder @ Hyper Horizon | [link](https://www.linkedin.com/in/sibi-m-a85725228/) | ✓ | Profile shot at his startup — context-rich but partial face |
| 15 | Vashist Managari | Ex Co-Lead | M.Tech @ IITB (FPGA intern @ LightSpeed) | [link](https://www.linkedin.com/in/vashist-managari-343a68222/) | ✓ | **★ Very strong** — lab coat + world map |

### Batch 2024

| # | Name | Role in MaRS | Next step | LinkedIn | Image | Quality |
|---|---|---|---|---|---|---|
| 16 | Chandan Kumar | Ex Software Member | Integrated B.Tech/M.Tech, Trashbotics → Zentron Labs | [link](https://www.linkedin.com/in/chandank0211/) | ✓ | Selfie quality — weak, replace if possible |
| 17 | Jagadeeshan S | — | ADDVERB | [link](https://www.linkedin.com/in/jagadeeshan-s-b572b51b0/) | ✓ | Excellent natural-light portrait |
| 18 | Pullipudi Sri Sahil | Ex Mechanical Lead | Tvasta Manufacturing | [link](https://www.linkedin.com/in/srisahilp/) | ✓ | Mountain backdrop — heavy bg but ok |
| 19 | Radhika Mittal | Ex Team Lead | Project Associate @ IISc | [link](https://www.linkedin.com/in/rad-mit/) | ✓ | Excellent — colonial bldg backdrop |
| 20 | Vishnu Kumar | Ex Co-Lead | CLUTTERBOT | [link](https://www.linkedin.com/in/vishnu-kumar-227a03220/) | ✓ | **★ Iconic** — crouched w/ club rover prototype |
| 21 | Yash Kumar Sahu | Ex Software Team Lead | RA @ IISc (after Hyper Horizon) | [link](https://www.linkedin.com/in/yashksahu/) | ✓ | Heavy yellow-circle LinkedIn filter — crop tight |

### Batch 2023

| # | Name | Role in MaRS | Next step | LinkedIn | Image | Quality |
|---|---|---|---|---|---|---|
| 22 | Ram Guguloth | — | T-Works (after Essence Labs) | [link](https://www.linkedin.com/in/iamramguguloth/) | ✓ | Good — outdoor casual |
| 23 | Vishal Kumar | Founder, Ex Team Lead | ADDVERB → Rapyuta | [link](https://www.linkedin.com/in/vi-ku/?skipRedirect=true) | ✗ | **Founder of MaRS — image missing** |

### Year unknown / unconfirmed

| # | Name | Role in MaRS | Next step | Image |
|---|---|---|---|---|
| 24 | Anirudh Govindarajan | — | Founder & CEO @ Venture Vault | ✓ (podium speaking shot) |
| 25 | Ayush Shukla | — | UI Developer @ ADDVERB | ✗ |
| 26 | Rajesh | — | — | ✗ |
| 27 | Saundarya | — | — | ✗ |
| 28 | Shivansh Dhaka | — | — | ✗ |

### Recommended featured trio (homepage / page-top)
1. **Shubh Khandelwal** (varsity jacket) — peak "MaRS pipeline" energy.
2. **Vishnu Kumar** (crouched with rover) — iconic alumni-with-hardware shot.
3. **Vashist Managari** (lab coat + world map) — clean "where they end up" framing.

### Action items to send back to the club
- Confirm passing year for: Anirudh Govindarajan, Ayush Shukla, Rajesh, Saundarya, Shivansh Dhaka.
- Need headshot for: Vishal Kumar (founder!), Ayush Shukla, Rajesh, Saundarya, Shivansh Dhaka.
- Optional cleaner headshots for: Manjari (current is award handover), Phanish (pre-cropped), Sai Harshith (OPENTOWORK frame), Yash (yellow filter), Chandan (selfie).

---

## 2. Event galleries

Each catalog table lives in the four agent transcripts; here's the curated selection.

### IRC 2024 — 39 photos → keep ~13

**Hero set (5):**
- `IMG_20240128_113547.jpg` — full team on podium with rover, "5" backdrop **(team portrait)**
- `IMG_20240127_101840.jpg` — clean rover beauty shot w/ red bin & two judges
- `IMG_20240127_171925.jpg` — overhead pit-floor teamwork
- `IMG_20240127_083519.jpg` — intimate under-rover repair
- `PXL_20240125_051530870.jpg` — rover in motion on red dirt

**Gallery (8):** `IMG_20240126170454`, `IMG_20240126170856`, `IMG_20240127_083507`, `IMG_20240127_084032`, `IMG_20240127_101747`, `IMG_20240127_101822`, `IMG_20240127_171903`, `IMG_20240128_104031`.

**Drop as duplicates (≈18):** sequences `IMG_20240127_101803/06`, `IMG_20240128_103553–103708`, `IMG_20240128_113549/52`, `IMG_20240127_171925(1)`.

### IRC 2025 — 38 photos → keep ~13

**Hero (5):** `IMG_2367` (varsity portrait sunset), `IMG_2282` (full squad under tree), `IMG_2025` (rover vs arched architecture), `IMG_2007` (rover beauty profile), `IMG_1916` (steps portrait).

**Gallery (8):** `1000064912`, `WA0027[1]`, `WA0034[1]`, `IMG_1966`, `IMG_1985`, `IMG_2014`, `IMG_2303`, `IMG_6897`.

**Drop:** `WA0029[1]`, `WA0034[1](1)`, `IMG_1973`, `IMG_2012`, `IMG_2016`, `IMG_6898`. Note: `1000065750` mistakenly has an "IRoC-U 2024" banner — flag if strict year separation matters.

### IRC 2026 — 70 photos → keep ~20 (biggest, freshest set)

**Hero (8):**
- `…1.13.54.jpg` — **★ best rover-at-heritage portrait** (homepage hero candidate)
- `…145236.jpg` — iconic rover mound-climb action
- `…WhatsApp_at_1.12.04.jpg` — celebratory team selfie with rover (use for "the team" section)
- `…173228.jpg` — Manipal Institute arch group photo (event-anchor)
- `IMG_5102.jpg` — full squad on steps in branded tees
- `…172427(1).jpg` — award handover on stage
- `121055.jpg` — clean rover hero portrait, full arm
- `…1.10.41.jpg` — maintenance + Mars-mural backdrop, very cinematic

**Gallery (12):** `144431`, `144457`, `144941`, `145230`, `145409`, `IMG-WA0003` (3-rovers lineup vertical), `IMG-WA0004` (3-rovers horizontal), `IMG_6245`, `IMG_6246`, `IMG_6296`, `IMG_6334` (troubleshoot huddle), `IMG_6366` (judging).

**Drop:** mound-climb burst (keep one of 145236/145238/145239/145241/145243/145245/IMG_6301), courtyard rover burst (`121100/121121/121131`), steps burst (`5103/5104/5105`), stage award burst (keep 172427(1) only), `…1.13.55(2)/(3)`, `1.10.42`, `IMG_6294`.

### IROC 2024 — 59 photos → keep ~16

**Hero (6):**
- `1000046091` — **★ epic lineup of all competing rovers**
- `1000046169` — all teams + rovers panoramic
- `1000065746` — MaRS full team on IRoC-U backdrop **(team portrait)**
- `IMG20240823195355` — rover vertical with Chandrayaan/rocket models
- `IMG20240823195524` — two members + rover + ISRO rocket displays
- `1000065696` — orange rover on rocky arena floor

**Gallery (10):** `1000065706` (chassis close-up), `1000065725` (arena action w/ judges), `1000065728` (wide stage), `1000065733` (member portrait), `1000065736` (trio with rover), `1000065741` (solo + rover), `1000065807` (rover on ISRO mat), `IMG20240822185054` (lunar diorama), `1000046232` (night tent), `IMG_20240822_171826` (lobby profile).

**Drop:** the `151–153` and `190` entrance-with-bikes cluster, `173–179` solo-with-rover variations, `181–185 & 189` team-photo duplicates, `196–198 & 200` diorama duplicates, `205–207` rover-with-rockets dup cluster.

### Caterpillar 2026 — 3 photos

All three are usable. `1.13.49 PM` = wide team in vests around rover at Caterpillar 100-years arch (best). `1.13.52 (1)` = posed group photo with rover under arch. `1.13.52 (2)` = candid wide shot. Use the third for the "industry collab" tile on the homepage.

---

## 3. Sponsors — 8 logos

Of 8 sponsor folders, all have a logo file:

| Sponsor | Format on disk | Notes |
|---|---|---|
| Altair | png (preview), needs SVG | Has gradient + serif wordmark; png passable, ask club for vector |
| ATUMX | png, **cropped — only "X" visible** in preview | **Logo file is mis-cropped — needs replacement** |
| Autodesk | png, clean | Use as-is |
| Drona Aviation | png, clean | Use as-is |
| IIITDM (DIC Cell) | png, busy/circular | This is IIITDM's DIC seal, not the institute logo — confirm intent |
| My Equation | jpg w/ white bg | Use as-is, mask out background |
| Robokits India | png screenshot | Sized fine, mild jpeg artifacts |
| Teacher Learning Center | png icon-style | Use as-is |

**Recommendation:** sponsor strip in monochrome (grayscale w/ hover color) — papers over format inconsistency. Need to chase: ATUMX (full logo) + IIITDM (clarify which mark to use).

---

## 4. Team (TEAM/)

Two folders populated (Praneeth, Sanat), 25 empty placeholders. You said this is on hold — captured here for the eventual fill:

- **Praneeth** — olive shirt, campus outdoor, smiling. Usable.
- **Sanat** — black hoodie, courtyard with red wall. Usable.

The other 25 names — Adarsh, Archith, Arpit, Avinash, Bibek, Dhrithi, Fida, Geetha, Hyensteen, Kunal, Lakshay, Manas, Namitha, Paravathi, Pruthivi, Raghul, Rohith, Sandheep, Satyajit, Shreya, Shruthi, Ujjwala, Vaithee, Varshith, Vihaan — folders exist but empty.

---

## 5. Cross-cutting infrastructure tasks

These prep steps belong in a single one-shot script before any UI work:

1. **Convert HEIC → webp.** 65 HEIC files exist (49 in IRC 2025, 12 in IRC 2026, none in IRC 2024 / IROC). Next/Image doesn't support HEIC. Bulk convert via the same `pillow-heif` pipeline already used for previews. Target webp@85 for gallery, jpg fallback for hero.

2. **Strip `Copy of ` prefix** + flatten to `public/gallery/{event}/{slug}.{webp|jpg}` structure. Suggested:
   ```
   public/
     gallery/
       irc-2024/{kebab-slug}.webp
       irc-2025/...
       irc-2026/...
       iroc-2024/...
       caterpillar-2026/...
     alumni/{kebab-name}.webp     ← single 800×800 square crop per person
     sponsors/{kebab-name}.svg|png
   ```

3. **Generate 3 sizes per photo** for `<Image sizes>` — thumb (480), grid (1024), hero (1920). Use `sharp` in a one-shot Node script, output webp + 1 jpg fallback.

4. **Hand-crop alumni headshots** to centered 1:1 squares (face top-third). The 23 sources have wildly different aspect ratios; auto-crop won't cut it. ~30 min of manual work.

5. **Build the alumni data table** in `src/lib/data.ts` from `.image_analysis/alumni_parsed.json`. Map CSV columns to the existing `Alumnus` type:
   - `passing_year` → `gradYear`
   - `role_in_mars` ("Ex Mechanical Lead", "Ex Electronics Lead", "Ex Software Dev Lead", "Ex Team Lead", "Ex Co-Lead", "Ex Mechantronics Lead") → `subteam` (Mechanical / Electronics / Software / Leadership / Autonomy)
   - `placement_or_higher_ed` → `role` + `org` (split on " @ " or "Placed at")
   - `linkedin` → `linkedin`
   - Sector inference rule: PhD/M.Tech/MS → `grad-school`; "Co-Founder" / "Founder & CEO" → `startup`; IISc/ISRO Project Associate → `research`; everything else → `industry`.

6. **Render order on /alumni page:** group by gradYear descending — 2026 (9), 2025 (6), 2024 (6), 2023 (2), Unknown (5). Inside each year-bucket, sort by name. The existing `src/app/alumni/page.tsx` already has `bySector` aggregation; add a parallel `byYear` map to drive the heading rows.

---

## 6. Implementation plan (ordered)

1. ✅ Audit drive — done (this doc).
2. **Asset pipeline script** — `scripts/process-images.mjs`: HEIC→webp, rename, 3-sizes, generate manifest.json.
3. **Curate keepers list** — drop the 60+ near-duplicates flagged above; ship ~62 event photos + 8 Caterpillar + 23 alumni + 8 sponsors = ~100 final assets, down from 257.
4. **Wire alumni data** — populate `alumni` array in `src/lib/data.ts`, sorted by gradYear desc.
5. **Update /alumni page** — add year-grouped grid, swap placeholder copy.
6. **Build /gallery (or /events) page** — masonry grid grouped by event, hero photo per event.
7. **Sponsor strip on home** — monochrome row, hover-to-color.
8. **Followups to club** — list of missing/replacement images (see Section 1, "Action items").

---

*Last updated: 2026-05-11. Source data: `mars_image_drive/` + `public/MaRS Club Alumni - Sheet1.csv`. Previews + parsed JSON in `.image_analysis/` (gitignored).*

/**
 * Source-of-truth for MaRS content.
 * All facts here are extracted verbatim from the SHUNYA brochure (data_local/SHUNYA_BROCHURE.pdf)
 * and the 2025-26 Annual Report Booklet (data_local/BOOKLET 25-26.pdf).
 * Any UI rendering anywhere on the site should read from this file.
 */

// ─── ROVERS ─────────────────────────────────────────────────────────────

export type RoverStatus = "active" | "retired" | "concept" | "designing";

export type Rover = {
  slug: string;
  name: string;
  kind: "rover" | "manipulator" | "drone" | "legged" | "spider";
  status: RoverStatus;
  blurb: string;
  highlight?: string;
  /** Competition year this build targets / debuted at — drives newest-first sort */
  year?: number;
  /** Competition the rover was built for, e.g. "IRC 2026", "ERC 2025" */
  forEvent?: string;
};

// Rover lineup, newest competition year first. Vajra (2023–24) lives in
// the "legacy" bucket as the rover that put MaRS on the map.
export const rovers: Rover[] = [
  // ── IN DEVELOPMENT ───────────────────────────────────────────────────
  {
    slug: "rudra",
    name: "Rudra",
    kind: "rover",
    status: "designing",
    year: 2026,
    forEvent: "ERC 2026",
    blurb:
      "Team Shunya's next-generation autonomous Mars-exploration rover, in active development for the European Rover Challenge 2026. 5-DOF manipulator with custom cycloidal gearboxes, Ackermann steering, and a redesigned science module capable of 30 cm-deep sample collection. ROS2 + Nav2 autonomy with EKF localisation, ZED 2i stereo vision, YOLO-based object detection, and intelligent safety mechanisms. Backed by Ubiquiti + LoRa comms for reliable operation in harsh Martian-like terrain.",
    highlight: "ERC 2026 — cycloidal gearing, Ackermann steer, 30 cm sample drill.",
  },
  {
    slug: "scout-drone",
    name: "Scout Drone",
    kind: "drone",
    status: "designing",
    year: 2026,
    forEvent: "ERC 2026 — alongside Rudra",
    blurb:
      "Aerial counterpart developed in tandem with Rudra. Designed to support aerial mapping and reconnaissance during ERC missions — terrain scouting ahead of rover traverses, plus an extra perspective for the autonomy stack.",
  },

  // ── ACTIVE FLEET (Shaurya → Vetri → Lakshya → Destiny pair) ─────────
  {
    slug: "shaurya",
    name: "Shaurya",
    kind: "rover",
    status: "active",
    year: 2026,
    forEvent: "IRC 2026",
    blurb:
      "Team Shunya's IRC 2026 build — an autonomous Mars rover for terrain navigation, scientific exploration, and precision manipulation. 4WD differential drive, ROS2 autonomy stack, 5-DOF manipulator with Cartesian control, and a science cache for soil and atmospheric analysis. ZED 2i stereo vision, EKF localisation, LoRa backup comms, and intelligent power management.",
    highlight: "IRC 2026 — ROS2 autonomy, ZED stereo, science cache.",
  },
  {
    slug: "khoj-drone",
    name: "Khoj",
    kind: "drone",
    status: "active",
    year: 2026,
    forEvent: "IRC 2026 — aerial recon",
    blurb:
      "Aerial reconnaissance and scouting system developed for IRC 2026 to support rover operations. GPS-guided navigation, real-time FPV transmission, autonomous failsafe systems, and a servo-based battery-dropping mechanism for payload delivery and mission support in challenging terrain.",
    highlight: "IRC 2026 — GPS nav, FPV, autonomous failsafe, payload drop.",
  },
  {
    slug: "vetri",
    name: "Vetri",
    kind: "rover",
    status: "active",
    year: 2026,
    forEvent: "SHAASTRA Caterpillar Autonomy 2026",
    blurb:
      "Debuted at SHAASTRA 2026 Caterpillar Autonomy Challenge. Earned the Design Innovation Award for its custom-engineered underbelly scooping mechanism — an in-house solution to autonomous berm construction.",
    highlight: "Design Innovation Award · SHAASTRA Caterpillar 2026.",
  },
  {
    slug: "lakshya",
    name: "Lakshya",
    kind: "rover",
    status: "active",
    year: 2025,
    forEvent: "ERC 2025",
    blurb:
      "Built for the European Rover Challenge 2025. ROS-based autonomy, a 5-DOF robotic arm, advanced communications, and a science-cache mechanism — engineered for autonomous navigation, terrain traversal, manipulation, and sample collection in harsh Martian-analog environments.",
    highlight: "ERC 2025 build — autonomy, manipulation, science cache.",
  },
  {
    slug: "destiny-rover",
    name: "Destiny",
    kind: "rover",
    status: "active",
    blurb:
      "Companion rover platform. Engineered using AI-driven generative design for weight optimisation and structural resilience — proven on rocky, sandy, and inclined terrain.",
  },
  {
    slug: "destiny-manipulator",
    name: "Destiny Manipulator",
    kind: "manipulator",
    status: "active",
    blurb:
      "High-precision arm designed in tandem with the Destiny rover platform. Built for industrial-grade payload manipulation in unstructured environments.",
  },

  // ── LEGACY (the rover that put MaRS on the map) ──────────────────────
  {
    slug: "vajra-rover",
    name: "Vajra",
    kind: "rover",
    status: "retired",
    year: 2024,
    forEvent: "ERC 2023 Onsite · IRC 2024",
    blurb:
      "The original flagship. Six-wheel rocker-bogie chassis, low centre of gravity, custom suspension engineered for Mars-analog terrain. Carried the manipulator that put MaRS on the international podium.",
    highlight: "ERC 2023 Onsite & IRC 2024 — 21st globally.",
  },
  {
    slug: "vajra-manipulator",
    name: "Vajra Manipulator",
    kind: "manipulator",
    status: "retired",
    year: 2024,
    blurb:
      "Five-degree-of-freedom arm with interchangeable end-effectors. Designed for sample collection, valve actuation, and equipment servicing in field-mission conditions — the manipulator on the original Vajra platform.",
  },

  // ── ON THE BENCH ─────────────────────────────────────────────────────
  {
    slug: "legged-dog-rover",
    name: "Legged Dog Rover",
    kind: "legged",
    status: "designing",
    blurb:
      "Four-legged locomotion platform — designed for terrain too irregular for wheeled rovers. Design phase complete; fabrication next.",
  },
  {
    slug: "spider-bot",
    name: "Spider Bot",
    kind: "spider",
    status: "concept",
    blurb:
      "Multi-limbed crawler concept. Under active concept design — aimed at confined spaces and cave-like analog environments.",
  },
];

// ─── HOW WE WORK (process from brochure pg 5) ──────────────────────────

export type ProcessStage = {
  n: string;
  name: string;
  desc: string;
};

export const process: ProcessStage[] = [
  {
    n: "01",
    name: "Concept Design",
    desc: "Group ideation, requirement research, virtual-system documentation with defined features.",
  },
  {
    n: "02",
    name: "Embodiment Design",
    desc: "Virtual features converted into a layout of primary and secondary elements for seamless subsystem integration.",
  },
  {
    n: "03",
    name: "Detail Design",
    desc: "After mapping the integrated design, custom or COTS equipment is selected based on the use case.",
  },
  {
    n: "04",
    name: "Fabrication & Testing",
    desc: "Custom or COTS components tested from low-level to high-level integration, then assembled.",
  },
  {
    n: "05",
    name: "Validation & Development",
    desc: "Ongoing subsystem feedback loops drive error correction and innovation — practical improvement.",
  },
];

// ─── COMPETITIONS / LEGACY ──────────────────────────────────────────────

export type Competition = {
  code: string;
  full: string;
  org: string;
  venue?: string;
  dates?: string;
  result: string;
  year: number;
  group: "global" | "national";
  note?: string;
  /** Path to a verification screenshot (leaderboard/ranking) in /public */
  proofImage?: string;
  /** Pixel dimensions of `proofImage` for Next/Image */
  proofImageDimensions?: { width: number; height: number };
  /** Optional supporting photo (e.g. felicitation) for richer entries */
  supportImage?: string;
  supportImageDimensions?: { width: number; height: number };
  supportImageCaption?: string;
};

// Sourced from SHUNYA brochure pg 3 "Our Legacy" + booklet pages 4-9
export const competitions: Competition[] = [
  {
    code: "IRC 2026",
    full: "International Rover Challenge",
    org: "Space Robotics Society",
    venue: "Manipal Institute of Technology, Udupi",
    dates: "28 Jan – 2 Feb 2026",
    result: "10th Globally · 408 pts",
    year: 2026,
    group: "global",
    proofImage: "/achievements/irc-2026-rankings.jpeg",
    proofImageDimensions: { width: 863, height: 1108 },
  },
  {
    code: "ISDC 2026",
    full: "International Space Drone Challenge",
    org: "Space Robotics Society",
    venue: "MIT, Udupi",
    dates: "28 Jan – 2 Feb 2026",
    result: "9th Globally · 396 pts",
    year: 2026,
    group: "global",
    note: "Khoj Drone's debut event.",
    proofImage: "/achievements/isdc-2026-rankings.jpeg",
    proofImageDimensions: { width: 866, height: 1087 },
  },
  {
    code: "SHAASTRA 2026",
    full: "Caterpillar Autonomy Challenge",
    org: "IIT Madras",
    venue: "IIT Madras, Chennai",
    dates: "Jan 2026",
    result: "Design Innovation Award",
    year: 2026,
    group: "national",
    note: "Won for Vetri's underbelly scooping mechanism.",
  },
  {
    code: "IRC 2025",
    full: "International Rover Challenge",
    org: "Space Robotics Society",
    result: "16th Globally · 188 pts",
    year: 2025,
    group: "global",
    proofImage: "/achievements/irc-2025-rankings.jpeg",
    proofImageDimensions: { width: 748, height: 759 },
  },
  {
    code: "ERC 2025 Remote",
    full: "European Rover Challenge — Remote Edition",
    org: "European Space Foundation",
    result: "4th Globally · 215 pts",
    year: 2025,
    group: "global",
    note: "Best-ever ERC Remote finish — behind only Sapienza, IITB, and CRISS Robotics.",
    proofImage: "/achievements/erc-2025-leaderboard.jpeg",
    proofImageDimensions: { width: 1600, height: 492 },
  },
  {
    code: "ERC 2023 Onsite",
    full: "European Rover Challenge — Onsite Edition (Poland)",
    org: "European Space Foundation",
    result: "3rd in India · 21st Globally",
    year: 2023,
    group: "global",
    note: "Only Indian contingent representing India at ERC 2023.",
  },
  {
    code: "ERC 2023 Onsite Qualifier",
    full: "European Rover Challenge — Onsite Qualification",
    org: "European Space Foundation",
    result: "18th of 54 · 62.25 pts (qualified to Poland finals)",
    year: 2023,
    group: "global",
    note: "Top-25 finish secured a spot at the ERC World Finals in Poland.",
    proofImage: "/achievements/erc-2023-onsite-qualification.jpeg",
    proofImageDimensions: { width: 930, height: 929 },
  },
  {
    code: "IRoC-U 2024",
    full: "ISRO Robotics Challenge — University",
    org: "ISRO · U R Rao Satellite Centre",
    venue: "URSC, Bengaluru",
    dates: "Aug 2024",
    result: "6th Nationally (of 273 teams) · ₹2 Lakhs cash prize",
    year: 2024,
    group: "national",
    note: "Rover presented to President of India Smt. Droupadi Murmu and ISRO Chairman Dr. S. Somanath.",
    proofImage: "/achievements/iroc-u-2024-results.jpeg",
    proofImageDimensions: { width: 700, height: 950 },
    supportImage: "/achievements/iroc-u-2024-felicitation.jpeg",
    supportImageDimensions: { width: 1065, height: 474 },
    supportImageCaption: "SHUNYA delegates at the ISRO felicitation, URSC Bengaluru.",
  },
  {
    code: "IRC 2024 Onsite",
    full: "International Rover Challenge — Onsite",
    org: "Space Robotics Society",
    result: "21st Globally",
    year: 2024,
    group: "global",
  },
  {
    code: "ERC 2022 Remote",
    full: "European Rover Challenge — Remote World Finals",
    org: "European Space Foundation",
    result: "6th Globally · 1st in Asia (Qualification)",
    year: 2022,
    group: "global",
    note: "2nd Globally and 1st in Asia in qualification round.",
  },
  {
    code: "ERC 2023 Remote",
    full: "European Rover Challenge — Remote Qualification",
    org: "European Space Foundation",
    result: "6th Globally · 312 pts · 2nd in India",
    year: 2023,
    group: "global",
    proofImage: "/achievements/erc-2023-remote-leaderboard.jpeg",
    proofImageDimensions: { width: 1043, height: 853 },
  },
  {
    code: "ARCh 2022-23",
    full: "Australian Rover Challenge — Critical Design Review",
    org: "University of Adelaide",
    result: "1st in Asia · 5th Globally",
    year: 2023,
    group: "global",
  },
];

// ─── PRESS CLIPPINGS ────────────────────────────────────────────────────
// Scanned newspaper / online article clippings covering MaRS milestones.
// Each `image` path resolves to /public, with `width`/`height` matching the
// source file so Next/Image can reserve layout space.

export type PressClipping = {
  /** Publication name as it appears on the clipping; honest placeholder if unclear */
  publication: string;
  /** ISO-ish date string, e.g. "2023-06-03" or "2023" if only the year is visible */
  date: string;
  /** Headline visible on the clipping */
  headline: string;
  /** /public path to the scan */
  image: string;
  width: number;
  height: number;
  /** Optional: external article URL when one exists */
  href?: string;
};

export const pressClippings: PressClipping[] = [
  {
    publication: "DT Next",
    date: "2023-06-03",
    headline: "IIITDM team to represent India at European Rover Challenge",
    image: "/achievements/press-dtnext-erc-2023.jpeg",
    width: 716,
    height: 780,
  },
  {
    publication: "Chennai daily",
    date: "2023",
    headline: "Mars rover model wins award",
    image: "/achievements/press-chennai-erc-2023.jpeg",
    width: 306,
    height: 616,
  },
  {
    publication: "Newspaper clipping",
    date: "2023",
    headline: "INBRIEF — finishes second at international event",
    image: "/achievements/press-inbrief-erc-2023.jpeg",
    width: 1200,
    height: 1600,
  },
];

// ─── ALUMNI ─────────────────────────────────────────────────────────────
// Placeholder until the real roster arrives from MaRS. Each entry is shaped
// so the /alumni page can render meaningfully even before real data lands.

export type AlumniSector =
  | "industry"
  | "grad-school"
  | "startup"
  | "research"
  | "government";

export type Alumnus = {
  name: string;
  /** Graduation year (final year at IIITDM). 0 = unconfirmed */
  gradYear: number;
  /** MaRS sub-team during their time on the club */
  subteam: "Mechanical" | "Electronics" | "Software" | "Autonomy" | "Leadership";
  /** Designated role in MaRS — e.g. "Ex Team Lead", "Ex Electronics Lead",
   *  "Ex Software Member". Shown on the alumni card. */
  marsRole: string;
  /** Where they are now */
  role: string;
  org: string;
  sector: AlumniSector;
  /** Optional: short reflection on MaRS */
  quote?: string;
  linkedin?: string;
  /** Headshot slug — resolves to /alumni/{image}-{thumb|grid|hero}.{webp|jpg} */
  image?: string;
};

// Roster grouped by graduation year (rendered oldest-first on /alumni).
// marsRole = the title they held inside the club. role/org = where they
// landed after MaRS.
export const alumni: Alumnus[] = [
  // ── Batch 2023 ──────────────────────────────────────────────────────
  { name: "Vishal Kumar",      gradYear: 2023, subteam: "Leadership",  marsRole: "Founder · Ex Team Lead", role: "Robotics Engineer (ADDVERB → Rapyuta)", org: "Rapyuta Robotics", sector: "industry", linkedin: "https://www.linkedin.com/in/vi-ku/?skipRedirect=true", image: "vishal-kumar" },
  { name: "Ram Guguloth",      gradYear: 2023, subteam: "Electronics", marsRole: "Ex Electronics Member", role: "Engineer (after Essence Labs)", org: "T-Works", sector: "industry", linkedin: "https://www.linkedin.com/in/iamramguguloth/", image: "ram-guguloth" },

  // ── Batch 2024 ──────────────────────────────────────────────────────
  { name: "Radhika Mittal",       gradYear: 2024, subteam: "Leadership",  marsRole: "Ex Team Lead", role: "Project Associate (after AMD · Acceleration Robotics)", org: "IISc Bangalore", sector: "research", linkedin: "https://www.linkedin.com/in/rad-mit/", image: "radhika-mittal" },
  { name: "Vishnu Kumar",         gradYear: 2024, subteam: "Leadership",  marsRole: "Ex Co-Lead", role: "Robotics Engineer", org: "ClutterBot", sector: "industry", linkedin: "https://www.linkedin.com/in/vishnu-kumar-227a03220/", image: "vishnu-kumar" },
  { name: "Jagadeeshan S",        gradYear: 2024, subteam: "Software",    marsRole: "Ex Software Member", role: "Software Engineer", org: "ADDVERB", sector: "industry", linkedin: "https://www.linkedin.com/in/jagadeeshan-s-b572b51b0/", image: "jagadeeshan-s" },
  { name: "Pullipudi Sri Sahil",  gradYear: 2024, subteam: "Mechanical",  marsRole: "Ex Mechanical Lead", role: "Engineer (after Peer Robotics)", org: "Tvasta Manufacturing", sector: "industry", linkedin: "https://www.linkedin.com/in/srisahilp/", image: "pullipudi-sri-sahil" },
  { name: "Yash Kumar Sahu",      gradYear: 2024, subteam: "Software",    marsRole: "Ex Software Team Lead", role: "Research Assistant (after Hyper Horizon)", org: "IISc Bangalore", sector: "research", linkedin: "https://www.linkedin.com/in/yashksahu/", image: "yash-kumar-sahu" },
  { name: "Chandan Kumar",        gradYear: 2024, subteam: "Software",    marsRole: "Ex Software Member", role: "Engineer (Trashbotics → Zentron Labs)", org: "Zentron Labs", sector: "industry", linkedin: "https://www.linkedin.com/in/chandank0211/", image: "chandan-kumar" },

  // ── Batch 2025 ──────────────────────────────────────────────────────
  { name: "Manas Narayan",            gradYear: 2025, subteam: "Leadership",  marsRole: "Ex Team Lead", role: "Engineer", org: "Xdlinx Space Labs", sector: "industry", linkedin: "https://www.linkedin.com/in/manas-narayan-bb1723232/", image: "manas-narayan" },
  { name: "Vashist Managari",         gradYear: 2025, subteam: "Leadership",  marsRole: "Ex Co-Lead", role: "M.Tech (FPGA Intern @ LightSpeed Photonic)", org: "IIT Bombay", sector: "grad-school", linkedin: "https://www.linkedin.com/in/vashist-managari-343a68222/", image: "vashist-managari" },
  { name: "Samrat Chhabra",           gradYear: 2025, subteam: "Electronics", marsRole: "Ex Electronics Team Lead", role: "PhD (after InCore Semiconductors)", org: "IIT Bombay", sector: "grad-school", linkedin: "https://www.linkedin.com/in/samrat-chhabra-bb235b21a/", image: "samrat-chhabra" },
  { name: "Aravind Ananthakrishnan",  gradYear: 2025, subteam: "Electronics", marsRole: "Ex Electronics Lead", role: "PhD (after ASIC Design @ URSC-ISRO)", org: "IIT Kanpur", sector: "grad-school", linkedin: "https://www.linkedin.com/in/aravind-ananthakrishnan-7b1bb1232/", image: "aravind-ananthakrishnan" },
  { name: "Saikat Paul",              gradYear: 2025, subteam: "Mechanical",  marsRole: "Ex Mechanical Lead", role: "Engineer (Tvasta · Peppermint Robotics)", org: "Tvasta Manufacturing", sector: "industry", linkedin: "https://www.linkedin.com/in/saikatpaul2102/", image: "saikat-paul" },
  { name: "Sibi M",                   gradYear: 2025, subteam: "Electronics", marsRole: "Ex Electronics Member", role: "Co-Founder", org: "Hyper Horizon", sector: "startup", linkedin: "https://www.linkedin.com/in/sibi-m-a85725228/", image: "sibi-m" },

  // ── Batch 2026 ──────────────────────────────────────────────────────
  { name: "Ayush Kumar",              gradYear: 2026, subteam: "Leadership",  marsRole: "Ex Team Lead", role: "Engineer", org: "Virya Autonomous Technology", sector: "industry", linkedin: "https://www.linkedin.com/in/ayush-kumar-a44632283/", image: "ayush-kumar" },
  { name: "Shubh Khandelwal",         gradYear: 2026, subteam: "Electronics", marsRole: "Ex Electronics Team Lead", role: "Robotics Engineer", org: "Impaqt Robotics", sector: "industry", linkedin: "https://www.linkedin.com/in/shubh--khandelwal/", image: "shubh-khandelwal" },
  { name: "Vignesh Aravindh B",       gradYear: 2026, subteam: "Software",    marsRole: "Ex Software Dev Lead", role: "Software Engineer", org: "COSGrid Systems", sector: "industry", linkedin: "https://www.linkedin.com/in/vignesh-aravindh-b-24bb63252/", image: "vignesh-aravindh-b" },
  { name: "Divyanshu Pandey",         gradYear: 2026, subteam: "Mechanical",  marsRole: "Ex Mechatronics Lead", role: "Mechatronics Engineer", org: "ADDVERB", sector: "industry", linkedin: "https://www.linkedin.com/in/divyanshu006/", image: "divyanshu-pandey" },
  { name: "Manjari Shrivastava",      gradYear: 2026, subteam: "Mechanical",  marsRole: "Ex Mechanical Lead", role: "Mechanical Engineer", org: "Textron", sector: "industry", linkedin: "https://www.linkedin.com/in/manjari28/", image: "manjari-shrivastava" },
  { name: "Phanish Vajhala",          gradYear: 2026, subteam: "Mechanical",  marsRole: "Ex Mechanical Lead", role: "Mechanical Engineer", org: "Epick Bikes", sector: "industry", linkedin: "https://www.linkedin.com/in/phanishvajhala/", image: "phanish-vajhala" },
  { name: "Rahul Rajak",              gradYear: 2026, subteam: "Electronics", marsRole: "Ex Electronics Member", role: "Robotics Engineer", org: "Eric Robotics", sector: "industry", linkedin: "https://www.linkedin.com/in/rahul-rajakr/", image: "rahul-rajak" },
  { name: "Rajrajeshwer Gupta",       gradYear: 2026, subteam: "Electronics", marsRole: "Ex Electronics Member", role: "Robotics Engineer", org: "Botlab Dynamics", sector: "industry", linkedin: "https://www.linkedin.com/in/raj-rajeshwer-gupta-15511a220/", image: "rajrajeshwer-gupta" },
  { name: "Sai Harshith Raghupatruni",gradYear: 2026, subteam: "Electronics", marsRole: "Ex Electronics Member", role: "Intern", org: "NRSC-ISRO, Hyderabad", sector: "research", linkedin: "https://www.linkedin.com/in/sai-harshith-raghupatruni-05a631283/", image: "sai-harshith-raghupatruni" },

  // ── Year unconfirmed (gradYear: 0 — bucketed last) ─────────────────
  { name: "Anirudh Govindarajan", gradYear: 0, subteam: "Leadership", marsRole: "Ex MaRS Member", role: "Founder & CEO", org: "Venture Vault", sector: "startup", linkedin: "https://www.linkedin.com/in/anirudhgovindarajan/", image: "anirudh-govindarajan" },
  { name: "Ayush Shukla",         gradYear: 0, subteam: "Software",   marsRole: "Ex Software Member", role: "UI Developer", org: "ADDVERB", sector: "industry" },
];

export const alumniStats = {
  totalSince: 2020,
  pipelineNote:
    "MaRS has been training engineers since 2020. Roster updated as new alumni share their landing.",
};

// ─── TEAM LEADERSHIP ────────────────────────────────────────────────────

export type Lead = {
  role: string;
  name: string;
  email?: string;
  phone?: string;
};

export const leads: Lead[] = [
  {
    role: "Team Lead",
    name: "Avichal Anurag",
    email: "ec23i1015@iiitdm.ac.in",
    phone: "+91 8789071486",
  },
  {
    role: "Technical Lead",
    name: "R Sarang",
    email: "ec23i2015@iiitdm.ac.in",
    phone: "+91 9498088240",
  },
];

// ─── SPONSORS ───────────────────────────────────────────────────────────

export type Sponsor = {
  name: string;
  href?: string;
  /** Logo slug — resolves to /sponsors/{logo}.{png|jpg}. Omit for text-only. */
  logo?: string;
  /** Logo file extension on disk */
  ext?: "png" | "jpg";
};

// Sponsors with logos in public/sponsors/. Order = visual priority on the strip.
export const sponsors: Sponsor[] = [
  { name: "Autodesk",                href: "https://autodesk.com",     logo: "autodesk", ext: "png" },
  { name: "Altair",                  href: "https://altair.com",       logo: "altair",   ext: "png" },
  { name: "Drona Aviation",          href: "https://dronaaviation.com", logo: "drona-aviation", ext: "png" },
  { name: "Robokits India",          href: "https://robokits.co.in",    logo: "robokits-india", ext: "png" },
  { name: "ATUMX",                                                     logo: "atumx",    ext: "png" },
  { name: "My Equation",                                               logo: "my-equation", ext: "jpg" },
  { name: "Teacher Learning Center",                                   logo: "teacher-learning-center", ext: "png" },
  { name: "DIC, IIITDM Kancheepuram", href: "https://iiitdm.ac.in",    logo: "iiitdm",   ext: "png" },
];

// ─── SPONSORSHIP TIERS ──────────────────────────────────────────────────

export type SponsorTier = {
  name: "Bronze" | "Silver" | "Gold" | "Platinum";
  perks: string[];
};

export const sponsorTiers: SponsorTier[] = [
  {
    name: "Bronze",
    perks: [
      "Name featured on the official team website",
      "Logo displayed on the rover",
      "Partnership certificate",
      "Promotion on social media platforms",
    ],
  },
  {
    name: "Silver",
    perks: [
      "All Bronze-level benefits",
      "Logo placement on team T-shirts",
      "Prominent display during competitions",
      "Publicity during the college festival",
    ],
  },
  {
    name: "Gold",
    perks: [
      "All Silver-level benefits",
      "Special recognition in the team newsletter",
      "Personalised team merchandise with team photo",
    ],
  },
  {
    name: "Platinum",
    perks: [
      "Recognition as a main sponsor at rover events",
      "Prominent on-campus display during the college festival",
      "Acknowledgment in the official season recap video",
    ],
  },
];

export const waysToSponsor = [
  {
    name: "Monetary Assistance & Purchases",
    desc: "Helps us cover expenses and sustain our growth.",
  },
  {
    name: "Manufacturing Support",
    desc: "Enables us to turn designs into reality.",
  },
  {
    name: "Logistic Support",
    desc: "Assists in transporting goods and our rover, both domestically and internationally.",
  },
  {
    name: "Product Sponsorship",
    desc: "Providing products free or at a discounted rate brings us closer to building an exceptional rover.",
  },
  {
    name: "Technical Insights",
    desc: "Industry experts' guidance enhances our knowledge and prepares the team for their careers.",
  },
];

// ─── OUTREACH ───────────────────────────────────────────────────────────

export const outreach = [
  {
    name: "Vashisht Juniors",
    desc: "Workshops and demos for junior students at IIITDM, introducing rover engineering hands-on.",
  },
  {
    name: "Open House IIITDM",
    desc: "Our primary recruitment drive — first-year students engage directly with team leads and see the rovers in action.",
  },
  {
    name: "Technical Sessions",
    desc: "Outreach to government school children and scholars — building awareness of robotics, space exploration, and STEM.",
  },
];

// ─── ORG / MISSION ──────────────────────────────────────────────────────

export const org = {
  fullName: "MaRS Rover Students Club",
  short: "MaRS",
  flagshipTeam: "Team SHUNYA",
  parent: "IIITDM Kancheepuram",
  memberCount: "40+",
  address: "IIITDM Kancheepuram, Vandalur-Kelambakkam Road, Chennai – 600127, India",
  emailGeneral: "mars@iiitdm.ac.in",

  // Verbatim from SHUNYA brochure pg 2
  about:
    "MaRS Rover Students Club is an interdisciplinary student project at IIITDM Kancheepuram, comprising 40+ passionate students focused on developing next-generation autonomous rovers and robotic arms for extreme terrains and planetary exploration.",

  // From SHUNYA brochure pg 10
  outreachStatement:
    "We aim to build a stronger, more informed community that embraces innovation and curiosity.",
};

// ─── EVENT GALLERY ──────────────────────────────────────────────────────
// 4–5 curated photos per event, story-ordered (anchor → process → action).
// Each `image` slug resolves to /gallery/{event.slug}/{image}-{thumb|grid|hero}.{webp|jpg}.

export type EventPhoto = {
  image: string;
  caption: string;
  /** Natural orientation of the source file — drives the grid slot, no forced crops */
  aspect: "landscape" | "portrait";
  /** Mark the visual anchor of the event (rendered larger / first). One per event. */
  feature?: boolean;
};

export type EventGallery = {
  slug: string;
  name: string;
  year: number;
  location: string;
  /** One-line summary of MaRS's run at this event */
  blurb: string;
  /** Optional result/highlight pulled from competitions[] for cross-link cohesion */
  result?: string;
  photos: EventPhoto[];
};

export const eventGalleries: EventGallery[] = [
  {
    slug: "irc-2026",
    name: "International Rover Challenge",
    year: 2026,
    location: "Manipal Institute of Technology",
    blurb:
      "Manipal hosted the Mars-analog arena. We arrived with a redesigned chassis and walked away with a podium finish.",
    photos: [
      { image: "01-rover-heritage", caption: "Vajra at the heritage courtyard, Manipal", aspect: "landscape", feature: true },
      { image: "02-mound-climb",   caption: "Traversal task — full climb under load",   aspect: "portrait" },
      { image: "03-team-selfie",   caption: "Pit-celebration after the autonomy run",    aspect: "landscape" },
      { image: "04-maintenance",   caption: "Pre-run service against the Mars mural",    aspect: "landscape" },
      { image: "05-award-stage",   caption: "Award handover on the IRC 2026 stage",      aspect: "landscape" },
    ],
  },
  {
    slug: "irc-2025",
    name: "International Rover Challenge",
    year: 2025,
    location: "BITS Pilani Goa",
    blurb:
      "First outing with the new manipulator. The team in matching varsity, the rover at altitude.",
    photos: [
      { image: "01-team-sunset",   caption: "Squad with Vajra at golden hour",             aspect: "landscape", feature: true },
      { image: "02-rover-arch",    caption: "Vajra against the BITS Pilani arches",        aspect: "portrait" },
      { image: "03-varsity-steps", caption: "Varsity jackets on the venue steps",          aspect: "landscape" },
      { image: "04-rover-profile", caption: "Manipulator extended for the equipment task", aspect: "landscape" },
      { image: "05-rover-driving", caption: "Drive-away mid-traversal",                    aspect: "landscape" },
    ],
  },
  {
    slug: "irc-2024",
    name: "International Rover Challenge",
    year: 2024,
    location: "Coimbatore · Mars-analog field",
    blurb:
      "Ranked 21st globally. The build sequence and the run that earned that finish — pit, terrain, podium.",
    result: "21st globally",
    photos: [
      { image: "01-team-podium",  caption: "Team on the podium with Vajra",            aspect: "landscape", feature: true },
      { image: "02-pit-overhead", caption: "Pit floor — collective debug",             aspect: "landscape" },
      { image: "03-rover-judges", caption: "Vajra under judge inspection",             aspect: "landscape" },
      { image: "04-rover-motion", caption: "Field test — rover on red soil",           aspect: "landscape" },
      { image: "05-under-rover",  caption: "Last-minute wiring fix, under the chassis", aspect: "landscape" },
    ],
  },
  {
    slug: "iroc-2024",
    name: "ISRO Robotics Challenge",
    year: 2024,
    location: "URSC, Bengaluru · ISRO",
    blurb:
      "The flagship national event. Vajra in front of Chandrayaan models, on a sand-arena built to lunar spec.",
    photos: [
      { image: "01-team-backdrop",  caption: "Full team on the IRoC-U 2024 stage",        aspect: "landscape", feature: true },
      { image: "02-rover-lineup",   caption: "Every competing rover, lined up",           aspect: "landscape" },
      { image: "03-rover-isro",     caption: "Vajra beside the Chandrayaan lander model", aspect: "portrait" },
      { image: "04-arena-action",   caption: "Arena task — rover, judges, cameras",       aspect: "landscape" },
      { image: "05-lunar-diorama",  caption: "Lunar diorama with competing rovers",       aspect: "portrait" },
    ],
  },
  {
    slug: "caterpillar-2026",
    name: "Caterpillar 100 Years × MaRS",
    year: 2026,
    location: "IIITDM Kancheepuram",
    blurb:
      "Industry-day demo for Caterpillar's centenary visit. The newest builds, on display.",
    photos: [
      { image: "01-arch",   caption: "Demo at the Caterpillar 100-Years arch", aspect: "landscape", feature: true },
      { image: "02-group",  caption: "Team with the rover under the arch",     aspect: "landscape" },
      { image: "03-candid", caption: "Crowd around the build, mid-demo",       aspect: "landscape" },
    ],
  },
];

// ─── TEAM ROSTER ────────────────────────────────────────────────────────
// Sourced from public/Team List - Sheet1.csv (May 2026 cohort).
// One-liners are short character sketches — placeholders to be edited by the
// member. Treat as voicy seed copy, not biographical fact.

export type TeamSubteam =
  | "Management"
  | "Mechanical"
  | "Electronics"
  | "Software"
  | "Science";

export type TeamMember = {
  name: string;
  /** Role shown on the card: "Lead", "Co-Lead", "Manager", or "" for member */
  rolePrefix?: string;
  subteam: TeamSubteam;
  /**
   * Top-tier club leadership: Team Lead (rank 1), Co-Lead (2), Manager (3).
   * Rendered as a featured section above all subteams and EXCLUDED from
   * their nominal subteam grid.
   */
  leadershipRank?: 1 | 2 | 3;
  /** One-line voicy bio — to be edited by the member */
  blurb: string;
  linkedin?: string;
};

export const team: TeamMember[] = [
  // ── Top-tier leadership (featured above all subteams) ───────────────
  { name: "Sandheep Rahul V",         rolePrefix: "Team Lead",          subteam: "Management", leadershipRank: 1, blurb: "Holds the schedule and the rover when both are about to fall over.", linkedin: "https://www.linkedin.com/in/sandheep-rahul-171159348/" },
  { name: "Avinash Acharya",          rolePrefix: "Technical Lead",     subteam: "Management", leadershipRank: 2, blurb: "The one who finds the bug at 3 AM and writes the fix at 3:08.",       linkedin: "https://www.linkedin.com/in/avinash-acharya-8557ab2ba/" },
  { name: "Pruthviraj Sudheer Yadav", rolePrefix: "Team Manager",       subteam: "Management", leadershipRank: 3, blurb: "Calendar is a weapon. Sponsorship deck has Easter eggs.",            linkedin: "https://www.linkedin.com/in/pruthviraj-yadav-0a05ba290/" },

  // ── Management ──────────────────────────────────────────────────────
  { name: "Depa Varshith Reddy",  subteam: "Management", blurb: "Logistics, ops, the entire travel spreadsheet — keeps the squad moving.", linkedin: "https://www.linkedin.com/in/varshith-reddy-depa/" },
  { name: "Shreya Jha",           subteam: "Management", blurb: "Outreach + design crossover. Makes the club look as good as it builds.",  linkedin: "https://www.linkedin.com/in/shreya-jha-07a32b36b/" },

  // ── Mechanical ───────────────────────────────────────────────────────
  { name: "Bibek Kumar Malik",    rolePrefix: "Mechanical Lead", subteam: "Mechanical", blurb: "Chassis whisperer. If it bends, he wants to know why.", linkedin: "https://www.linkedin.com/in/bibek-kumar-malik-3672b4284/" },
  { name: "Manas Singh",          subteam: "Mechanical", blurb: "Lives inside Fusion 360 and emerges only for chai.",                       linkedin: "https://www.linkedin.com/in/manas-singh-405235319/" },
  { name: "R Lakshay Vardhan",    subteam: "Mechanical", blurb: "Thinks in bolt patterns. Optimises everything.",                            linkedin: "https://www.linkedin.com/in/lakshay-vardhan-532baa329/" },
  { name: "V S Geetha Ranjani",   subteam: "Mechanical", blurb: "End-effector specialist. Loves a good gripper.",                            linkedin: "https://www.linkedin.com/in/geetha-ranjani-b36848395/" },
  { name: "Raghul U",             subteam: "Mechanical", blurb: "Mechanism design specialist. The one who turns sketches into parts that actually move.", linkedin: "https://www.linkedin.com/in/raghul-u-4a3171268/" },
  { name: "Dhriti J N Kashyap",   subteam: "Mechanical", blurb: "CAD by day, machining drawings by night. Tolerances always tight.",         linkedin: "https://www.linkedin.com/in/dhriti-jn-kashyap-18027b371/" },
  { name: "Praneeth Bollu",       subteam: "Mechanical", blurb: "Lathe operator turned design contributor. Makes parts that just fit.",      linkedin: "https://www.linkedin.com/in/praneeth-bollu-446a93343/" },

  // ── Electronics ─────────────────────────────────────────────────────
  { name: "Vaitheeswaran M V",    rolePrefix: "Electronics Lead", subteam: "Electronics", blurb: "Solder fume connoisseur. Every PCB has a story.",                  linkedin: "https://www.linkedin.com/in/vaitheeswaran-veerateswaran-21724a316/" },
  { name: "Archith G",            subteam: "Electronics", blurb: "Power delivery + motor drivers. Quiet hands, loud rovers.",                                       linkedin: "https://www.linkedin.com/in/archith-g-6a9b8b307/" },
  { name: "Rohan Deshmukh",       subteam: "Electronics", blurb: "Sensor stacks. If it has an I2C address, it's already mapped in his head.",                       linkedin: "https://www.linkedin.com/in/rohan-deshmukh-168926307/" },
  { name: "Parvathi R",           subteam: "Electronics", blurb: "Communications + telemetry — keeps the link alive on the field.",                                  linkedin: "https://www.linkedin.com/in/parvathi-r-5774ba351/" },
  { name: "Ujjwala Lekhi",        subteam: "Electronics", blurb: "Embedded firmware. Treats microcontrollers gently, then pushes them hard.",                       linkedin: "https://www.linkedin.com/in/ujjwalalekhi/" },
  { name: "Rohith T N",           subteam: "Electronics", blurb: "The one debugging the harness while everyone else celebrates the run.",                            linkedin: "https://www.linkedin.com/in/rohith-tn-b38a87203/" },

  // ── Software ────────────────────────────────────────────────────────
  { name: "Arpit Srivastava",     rolePrefix: "Software Lead", subteam: "Software", blurb: "Architecture brain. Code reviews land like surgical strikes.",                          linkedin: "https://www.linkedin.com/in/arpit-srivastava-8557aa34b/" },
  { name: "Satyajit S",           subteam: "Software", blurb: "Vision + perception. Sees patterns in pixels nobody else does.",                                                      linkedin: "https://www.linkedin.com/in/satyajit06/" },
  { name: "S Hyensteen Samuel",   subteam: "Software", blurb: "Path-planning enthusiast. ROS topics flow like rivers.",                                                              linkedin: "https://www.linkedin.com/in/s-hyensteen-samuel/" },
  { name: "Sanat",                subteam: "Software", blurb: "Ground-station tooling. Builds the dashboards everyone forgets to thank him for.",                                    linkedin: "https://www.linkedin.com/in/sanat-787214319/" },
  { name: "Namitha Sai Kolli",    subteam: "Software", blurb: "Autonomy stack contributor. Async/await is her love language.",                                                       linkedin: "https://www.linkedin.com/in/namitha-kolli-963419373/" },
  { name: "Vihaan Gupta",         subteam: "Software", blurb: "Newest to the stack, fastest at the unit tests.",                                                                     linkedin: "https://www.linkedin.com/in/vihaan-gupta-ab046836b/" },
  { name: "Fida Saifudheen",      subteam: "Software", blurb: "Tooling + DX. If it should be a script, she's already written it.",                                                   linkedin: "https://www.linkedin.com/in/fida-saifudheen/" },

  // ── Science ─────────────────────────────────────────────────────────
  { name: "Kunal Garag",          rolePrefix: "Science Lead", subteam: "Science", blurb: "Sample analysis + experimental design. Turns red dirt into data.",                         linkedin: "https://www.linkedin.com/in/kunal-garag-bb17612a3/?skipRedirect=true" },
  { name: "Venkata Shruthi Pullela", subteam: "Science", blurb: "Geology + spectroscopy. Reads soil like a novel." },
];

// Display order: Software → Electronics → Mechanical → Science → Management.
// Leadership is rendered above this list and not part of any subteam grid.
export const teamSubteams: { key: TeamSubteam; label: string; focus: string }[] = [
  { key: "Software",    label: "Software",    focus: "Autonomy, perception, path-planning, ground-station" },
  { key: "Electronics", label: "Electronics", focus: "Custom PCBs, power, motor control, comms, telemetry" },
  { key: "Mechanical",  label: "Mechanical",  focus: "Chassis, suspension, end-effectors, fabrication" },
  { key: "Science",     label: "Science",     focus: "Geology, sample analysis, mission experiments" },
  { key: "Management",  label: "Management",  focus: "Strategy, ops, sponsorship, outreach" },
];

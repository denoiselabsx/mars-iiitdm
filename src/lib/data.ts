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
};

export const rovers: Rover[] = [
  {
    slug: "vajra-rover",
    name: "Vajra",
    kind: "rover",
    status: "active",
    blurb:
      "Our flagship rover. Six-wheel rocker-bogie chassis, low centre of gravity, custom suspension engineered for Mars-analog terrain. Carries the manipulator that earned recognition at IRC and ERC.",
    highlight: "Featured rover at ERC 2023 Onsite & IRC 2024 — 21st globally.",
  },
  {
    slug: "vajra-manipulator",
    name: "Vajra Manipulator",
    kind: "manipulator",
    status: "active",
    blurb:
      "Five-degree-of-freedom robotic arm with interchangeable end-effectors. Designed for sample collection, valve actuation, and equipment servicing in field-mission conditions.",
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
  {
    slug: "kutti",
    name: "Kutti",
    kind: "rover",
    status: "active",
    blurb:
      "Debuted at SHAASTRA 2026 Caterpillar Autonomy Challenge. Earned the Design Innovation Award for its custom-engineered underbelly scooping mechanism — an in-house solution to autonomous berm construction.",
    highlight: "Design Innovation Award · SHAASTRA Caterpillar Autonomy 2026.",
  },
  {
    slug: "legged-dog-rover",
    name: "Legged Dog Rover",
    kind: "legged",
    status: "designing",
    blurb:
      "Four-legged locomotion platform — designed for terrain too irregular for wheeled rovers. Design phase complete; fabrication next.",
  },
  {
    slug: "drone",
    name: "Drone",
    kind: "drone",
    status: "concept",
    blurb:
      "Aerial counterpart to the rover programme. Currently in concept design — to be deployed for terrain mapping and scouting ahead of rover traverses.",
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
};

// Sourced from SHUNYA brochure pg 3 "Our Legacy" + booklet pages 4-9
export const competitions: Competition[] = [
  {
    code: "IRC 2026",
    full: "International Rover Challenge",
    org: "Space Robotics Society",
    venue: "Manipal Institute of Technology, Udupi",
    dates: "28 Jan – 2 Feb 2026",
    result: "10th internationally",
    year: 2026,
    group: "global",
  },
  {
    code: "ISDC 2026",
    full: "International Space Drone Challenge",
    org: "Space Robotics Society",
    venue: "MIT, Udupi",
    dates: "28 Jan – 2 Feb 2026",
    result: "9th internationally",
    year: 2026,
    group: "global",
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
    note: "Won for KUTTI's underbelly scooping mechanism.",
  },
  {
    code: "ERC 2025 Remote",
    full: "European Rover Challenge — Remote Edition",
    org: "European Space Foundation",
    result: "3rd in Asia · 6th Globally",
    year: 2025,
    group: "global",
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
    code: "IRoC-U 2024",
    full: "ISRO Robotics Challenge — University",
    org: "ISRO · U R Rao Satellite Centre",
    venue: "URSC, Bengaluru",
    dates: "Aug 2024",
    result: "6th Nationally (of 273 teams) · ₹2 Lakhs cash prize",
    year: 2024,
    group: "national",
    note: "Rover presented to President of India Smt. Droupadi Murmu and ISRO Chairman Dr. S. Somanath.",
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
    code: "ERC 2023 Qualification",
    full: "European Rover Challenge — Remote Qualification A",
    org: "European Space Foundation",
    result: "2nd Highest Score in India",
    year: 2023,
    group: "global",
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
};

// From SHUNYA brochure pg 9
export const sponsors: Sponsor[] = [
  { name: "TLC" },
  { name: "Drona Aviation", href: "https://dronaaviation.com" },
  { name: "Robokits India", href: "https://robokits.co.in" },
  { name: "DIC IIITDM", href: "https://iiitdm.ac.in" },
  { name: "Spark Future Technology" },
  { name: "Sphere Tech Innovations" },
  { name: "Altair", href: "https://altair.com" },
  { name: "Autodesk", href: "https://autodesk.com" },
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

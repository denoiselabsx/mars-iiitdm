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

// Roster ordered newest grad-year first. Sourced from public/MaRS Club Alumni - Sheet1.csv
// + headshots in mars_image_drive/Alumni/. Re-render order is preserved by the page.
export const alumni: Alumnus[] = [
  // ── Batch 2026 ──────────────────────────────────────────────────────
  { name: "Shubh Khandelwal", gradYear: 2026, subteam: "Electronics", role: "Robotics Engineer", org: "Impaqt Robotics", sector: "industry", linkedin: "https://www.linkedin.com/in/shubh--khandelwal/", image: "shubh-khandelwal" },
  { name: "Ayush Kumar", gradYear: 2026, subteam: "Leadership", role: "Engineer", org: "Virya Autonomous Technology", sector: "industry", linkedin: "https://www.linkedin.com/in/ayush-kumar-a44632283/", image: "ayush-kumar" },
  { name: "Divyanshu Pandey", gradYear: 2026, subteam: "Mechanical", role: "Mechatronics Engineer", org: "ADDVERB", sector: "industry", linkedin: "https://www.linkedin.com/in/divyanshu006/", image: "divyanshu-pandey" },
  { name: "Manjari Shrivastava", gradYear: 2026, subteam: "Mechanical", role: "Mechanical Engineer", org: "Textron", sector: "industry", linkedin: "https://www.linkedin.com/in/manjari28/", image: "manjari-shrivastava" },
  { name: "Phanish Vajhala", gradYear: 2026, subteam: "Mechanical", role: "Mechanical Engineer", org: "Epick Bikes", sector: "industry", linkedin: "https://www.linkedin.com/in/phanishvajhala/", image: "phanish-vajhala" },
  { name: "Rahul Rajak", gradYear: 2026, subteam: "Electronics", role: "Robotics Engineer", org: "Eric Robotics", sector: "industry", linkedin: "https://www.linkedin.com/in/rahul-rajakr/", image: "rahul-rajak" },
  { name: "Rajrajeshwer Gupta", gradYear: 2026, subteam: "Electronics", role: "Robotics Engineer", org: "Botlab Dynamics", sector: "industry", linkedin: "https://www.linkedin.com/in/raj-rajeshwer-gupta-15511a220/", image: "rajrajeshwer-gupta" },
  { name: "Sai Harshith Raghupatruni", gradYear: 2026, subteam: "Electronics", role: "Intern", org: "NRSC-ISRO, Hyderabad", sector: "research", linkedin: "https://www.linkedin.com/in/sai-harshith-raghupatruni-05a631283/", image: "sai-harshith-raghupatruni" },
  { name: "Vignesh Aravindh B", gradYear: 2026, subteam: "Software", role: "Software Engineer", org: "COSGrid Systems", sector: "industry", linkedin: "https://www.linkedin.com/in/vignesh-aravindh-b-24bb63252/", image: "vignesh-aravindh-b" },

  // ── Batch 2025 ──────────────────────────────────────────────────────
  { name: "Vashist Managari", gradYear: 2025, subteam: "Leadership", role: "M.Tech (FPGA Intern @ LightSpeed Photonic)", org: "IIT Bombay", sector: "grad-school", linkedin: "https://www.linkedin.com/in/vashist-managari-343a68222/", image: "vashist-managari" },
  { name: "Samrat Chhabra", gradYear: 2025, subteam: "Electronics", role: "PhD (after InCore Semiconductors)", org: "IIT Bombay", sector: "grad-school", linkedin: "https://www.linkedin.com/in/samrat-chhabra-bb235b21a/", image: "samrat-chhabra" },
  { name: "Aravind Ananthakrishnan", gradYear: 2025, subteam: "Electronics", role: "PhD (after ASIC Design @ URSC-ISRO)", org: "IIT Kanpur", sector: "grad-school", linkedin: "https://www.linkedin.com/in/aravind-ananthakrishnan-7b1bb1232/", image: "aravind-ananthakrishnan" },
  { name: "Manas Narayan", gradYear: 2025, subteam: "Leadership", role: "Engineer", org: "Xdlinx Space Labs", sector: "industry", linkedin: "https://www.linkedin.com/in/manas-narayan-bb1723232/", image: "manas-narayan" },
  { name: "Saikat Paul", gradYear: 2025, subteam: "Mechanical", role: "Engineer (Tvasta · Peppermint Robotics)", org: "Tvasta Manufacturing", sector: "industry", linkedin: "https://www.linkedin.com/in/saikatpaul2102/", image: "saikat-paul" },
  { name: "Sibi M", gradYear: 2025, subteam: "Electronics", role: "Co-Founder", org: "Hyper Horizon", sector: "startup", linkedin: "https://www.linkedin.com/in/sibi-m-a85725228/", image: "sibi-m" },

  // ── Batch 2024 ──────────────────────────────────────────────────────
  { name: "Radhika Mittal", gradYear: 2024, subteam: "Leadership", role: "Project Associate (after AMD · Acceleration Robotics)", org: "IISc Bangalore", sector: "research", linkedin: "https://www.linkedin.com/in/rad-mit/", image: "radhika-mittal" },
  { name: "Vishnu Kumar", gradYear: 2024, subteam: "Leadership", role: "Robotics Engineer", org: "ClutterBot", sector: "industry", linkedin: "https://www.linkedin.com/in/vishnu-kumar-227a03220/", image: "vishnu-kumar" },
  { name: "Jagadeeshan S", gradYear: 2024, subteam: "Software", role: "Software Engineer", org: "ADDVERB", sector: "industry", linkedin: "https://www.linkedin.com/in/jagadeeshan-s-b572b51b0/", image: "jagadeeshan-s" },
  { name: "Pullipudi Sri Sahil", gradYear: 2024, subteam: "Mechanical", role: "Engineer (after Peer Robotics)", org: "Tvasta Manufacturing", sector: "industry", linkedin: "https://www.linkedin.com/in/srisahilp/", image: "pullipudi-sri-sahil" },
  { name: "Yash Kumar Sahu", gradYear: 2024, subteam: "Software", role: "Research Assistant (after Hyper Horizon)", org: "IISc Bangalore", sector: "research", linkedin: "https://www.linkedin.com/in/yashksahu/", image: "yash-kumar-sahu" },
  { name: "Chandan Kumar", gradYear: 2024, subteam: "Software", role: "Engineer (Trashbotics → Zentron Labs)", org: "Zentron Labs", sector: "industry", linkedin: "https://www.linkedin.com/in/chandank0211/", image: "chandan-kumar" },

  // ── Batch 2023 ──────────────────────────────────────────────────────
  { name: "Ram Guguloth", gradYear: 2023, subteam: "Electronics", role: "Engineer (after Essence Labs)", org: "T-Works", sector: "industry", linkedin: "https://www.linkedin.com/in/iamramguguloth/", image: "ram-guguloth" },
  { name: "Vishal Kumar", gradYear: 2023, subteam: "Leadership", role: "Founder · Ex Team Lead (ADDVERB → Rapyuta)", org: "Rapyuta Robotics", sector: "industry", linkedin: "https://www.linkedin.com/in/vi-ku/?skipRedirect=true" },

  // ── Year unconfirmed (gradYear: 0 — bucketed last) ─────────────────
  { name: "Anirudh Govindarajan", gradYear: 0, subteam: "Leadership", role: "Founder & CEO", org: "Venture Vault", sector: "startup", linkedin: "https://www.linkedin.com/in/anirudhgovindarajan/", image: "anirudh-govindarajan" },
  { name: "Ayush Shukla", gradYear: 0, subteam: "Software", role: "UI Developer", org: "ADDVERB", sector: "industry" },
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

// ─── EVENT GALLERY ──────────────────────────────────────────────────────
// 4–5 curated photos per event, story-ordered (anchor → process → action).
// Each `image` slug resolves to /gallery/{event.slug}/{image}-{thumb|grid|hero}.{webp|jpg}.

export type EventPhoto = {
  image: string;
  caption: string;
  /** layout hint for the editorial grid */
  span?: "wide" | "tall" | "default";
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
      { image: "01-rover-heritage", caption: "Vajra at the heritage courtyard, Manipal", span: "wide" },
      { image: "02-mound-climb",   caption: "Traversal task — full climb under load",   span: "tall" },
      { image: "03-team-selfie",   caption: "Pit-celebration after the autonomy run" },
      { image: "04-maintenance",   caption: "Pre-run service against the Mars mural" },
      { image: "05-award-stage",   caption: "Award handover on the IRC 2026 stage" },
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
      { image: "01-team-sunset",   caption: "Squad with Vajra at golden hour",            span: "wide" },
      { image: "02-rover-arch",    caption: "Vajra against the BITS Pilani arches",       span: "tall" },
      { image: "03-varsity-steps", caption: "Varsity jackets on the venue steps" },
      { image: "04-rover-profile", caption: "Manipulator extended for the equipment task" },
      { image: "05-rover-driving", caption: "Drive-away mid-traversal" },
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
      { image: "01-team-podium",  caption: "Team on the podium with Vajra",       span: "wide" },
      { image: "02-pit-overhead", caption: "Pit floor — collective debug",         span: "tall" },
      { image: "03-rover-judges", caption: "Vajra under judge inspection" },
      { image: "04-rover-motion", caption: "Field test — rover on red soil" },
      { image: "05-under-rover",  caption: "Last-minute wiring fix, under the chassis" },
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
      { image: "01-team-backdrop",  caption: "Full team on the IRoC-U 2024 stage", span: "wide" },
      { image: "02-rover-lineup",   caption: "Every competing rover, lined up",     span: "tall" },
      { image: "03-rover-isro",     caption: "Vajra beside the Chandrayaan lander model" },
      { image: "04-arena-action",   caption: "Arena task — rover, judges, cameras" },
      { image: "05-lunar-diorama",  caption: "Lunar diorama with competing rovers" },
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
      { image: "01-arch",   caption: "Demo at the Caterpillar 100-Years arch", span: "wide" },
      { image: "02-group",  caption: "Team with the rover under the arch" },
      { image: "03-candid", caption: "Crowd around the build, mid-demo" },
    ],
  },
];

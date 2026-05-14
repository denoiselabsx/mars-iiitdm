export const site = {
  name: "MaRS",
  fullName: "MaRS Rover Students Club",
  parent: "IIITDM Kancheepuram",
  tagline: "Exploration begins here.",
  description:
    "Interdisciplinary student project at IIITDM Kancheepuram — 40+ engineers building next-generation autonomous rovers and robotic arms for extreme terrains and planetary exploration.",
  url: "https://mars.denoiselabs.com",
  email: "mars@iiitdm.ac.in", // Club general inbox
  address: "B5, PEMS Block, IIITDM Kancheepuram, Vandalur-Kelambakkam Road, Chennai – 600127, India",
  social: {
    instagram: "https://instagram.com/mars_iiitdm",
    linkedin: "https://www.linkedin.com/company/mars-rover-students-club-iiitdm-kancheepuram/",
    youtube: "https://www.youtube.com/@mars_iiitdm",
  },
  agency: {
    name: "Denoise Labs",
    url: "https://denoiselabs.com",
    domain: "denoiselabs.com",
    email: "hello@denoiselabs.com",
    tagline: "Agentic AI, engineered.",
    founders: [
      {
        name: "Yashvanth S",
        role: "Founding Engineer",
        initials: "YS",
        oneLiner: "Builds the systems that ship.",
        portrait: {
          color: "/denoise/founders/yashvanth/yashvanth.webp",
          mono: "/denoise/founders/yashvanth/yashvanth-mono.webp",
        },
        socials: {
          instagram: "yashvanth.19",
          x: "yashvanths19",
          linkedin: "yashvanths",
          github: "YashvanthSankar",
        },
      },
      {
        name: "Gokul Krishna Ballaji",
        role: "Founding Engineer",
        initials: "GB",
        oneLiner: "Works on the model layer.",
        portrait: null,
        socials: {
          instagram: "gkxyyy",
          x: "gkxyyy_",
          linkedin: "gokul-krishna-balaji",
          github: "gokulkrishna1686",
        },
      },
      {
        name: "Narendhar T S",
        role: "Founding Engineer",
        initials: "NT",
        oneLiner: "Turns ideas into shipping products.",
        portrait: {
          color: "/denoise/founders/narendhar/narendhar.webp",
          mono: "/denoise/founders/narendhar/narendhar-mono.webp",
        },
        socials: {
          instagram: "n4rendhar",
          x: "_zapd0s",
          linkedin: "narendharts",
          github: "zapds",
        },
      },
      {
        name: "Akula Sai Teja",
        role: "Founding Engineer",
        initials: "AT",
        oneLiner: "Interfaces, motion, how it feels to use.",
        portrait: {
          color: "/denoise/founders/sai_teja/sai_teja.webp",
          mono: "/denoise/founders/sai_teja/sai_teja-mono.webp",
        },
        socials: {
          instagram: "sai_teja2101",
          x: "Sai_Teja_45",
          linkedin: "akula-sai-teja-30034a327",
          github: "SaiTeja-2101",
        },
      },
    ],
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/rovers", label: "Rovers" },
  { href: "/competitions", label: "Competitions" },
  { href: "/team", label: "Team" },
  { href: "/alumni", label: "Alumni" },
  { href: "/gallery", label: "Gallery" },
] as const;

/** Secondary routes — reachable via footer, mobile menu, direct URL. Not in primary nav. */
export const secondaryNav = [
  { href: "/sponsors", label: "Sponsors" },
  { href: "/press", label: "Press" },
  { href: "/credits", label: "Credits" },
] as const;

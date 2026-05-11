export const site = {
  name: "MaRS",
  fullName: "MaRS Rover Students Club",
  parent: "IIITDM Kancheepuram",
  tagline: "Exploration begins here.",
  description:
    "Interdisciplinary student project at IIITDM Kancheepuram — 40+ engineers building next-generation autonomous rovers and robotic arms for extreme terrains and planetary exploration.",
  url: "https://marsiiitdm.vercel.app",
  email: "mars@iiitdm.ac.in", // Club general inbox
  address: "IIITDM Kancheepuram, Vandalur-Kelambakkam Road, Chennai – 600127, India",
  social: {
    instagram: "https://instagram.com/mars_iiitdm",
    linkedin: "https://linkedin.com/company/mars-research-station",
  },
  agency: {
    name: "Denoise Labs",
    url: "https://denoiselabs.in",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/rovers", label: "Rovers" },
  { href: "/competitions", label: "Competitions" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/join", label: "Join" },
] as const;

/** Secondary routes — reachable via footer, mobile menu, direct URL. Not in primary nav. */
export const secondaryNav = [
  { href: "/sponsors", label: "Sponsors" },
  { href: "/press", label: "Press" },
  { href: "/credits", label: "Credits" },
] as const;

export const site = {
  name: "MaRS",
  fullName: "Mars Rover Students Club",
  parent: "IIITDM Kancheepuram",
  tagline: "Exploration begins here.",
  description:
    "Multidisciplinary student club building autonomous rovers for Mars-analog terrains. Competing internationally at IRC, ISDC, and IRoC-U.",
  url: "https://marsiiitdm.vercel.app",
  email: "mars@iiitdm.ac.in",
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

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/rovers", priority: 0.9, freq: "monthly" },
    { path: "/competitions", priority: 0.9, freq: "monthly" },
    { path: "/team", priority: 0.8, freq: "monthly" },
    { path: "/alumni", priority: 0.7, freq: "monthly" },
    { path: "/sponsors", priority: 0.8, freq: "monthly" },
    { path: "/join", priority: 0.8, freq: "monthly" },
    { path: "/gallery", priority: 0.6, freq: "weekly" },
    { path: "/press", priority: 0.6, freq: "monthly" },
    { path: "/credits", priority: 0.3, freq: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}

import type { Metadata } from "next";
import { site } from "./site";

/**
 * Build per-route metadata with the canonical URL set.
 * Pass any other Next Metadata fields as overrides.
 */
export function routeMeta(path: string, overrides: Metadata = {}): Metadata {
  const url = `${site.url}${path}`;
  const og = {
    ...(overrides.openGraph ?? {}),
    url,
  };
  return {
    ...overrides,
    alternates: {
      canonical: url,
      ...(overrides.alternates ?? {}),
    },
    openGraph: og,
  };
}

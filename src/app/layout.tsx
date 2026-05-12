import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { LenisProvider } from "@/components/providers/lenis-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SceneController } from "@/components/providers/scene-controller";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { CursorTrail } from "@/components/site/cursor-trail";
import { site } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [
    "Mars rover",
    "MaRS IIITDM",
    "IIITDM Kancheepuram",
    "International Rover Challenge",
    "IRC",
    "ISDC",
    "IRoC-U",
    "space robotics",
    "student rover team",
    "autonomous rover",
  ],
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  publisher: `${site.agency.name} — ${site.agency.url}`,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.fullName,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // theme-color is updated at runtime by ThemeToggle / SceneController.
  themeColor: "#08080c",
  // Allow both — actual scheme is set via [data-theme] on <html>.
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-svh flex flex-col font-sans">
        {/* FOUC-free theme: read localStorage and stamp <html data-theme="…">
            BEFORE the first paint. Defaults to dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mars:theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${site.url}#org`,
                  name: site.fullName,
                  alternateName: site.name,
                  url: site.url,
                  logo: `${site.url}/brand/mars-logo.png`,
                  description: site.description,
                  email: site.email,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Vandalur-Kelambakkam Road",
                    addressLocality: "Chennai",
                    addressRegion: "Tamil Nadu",
                    postalCode: "600127",
                    addressCountry: "IN",
                  },
                  parentOrganization: {
                    "@type": "EducationalOrganization",
                    name: site.parent,
                    url: "https://www.iiitdm.ac.in",
                  },
                  sameAs: [
                    site.social.instagram,
                    site.social.linkedin,
                    site.social.youtube,
                  ],
                  knowsAbout: [
                    "Mars rover",
                    "Space robotics",
                    "Autonomous navigation",
                    "Robotic manipulator",
                    "Rocker-bogie suspension",
                    "ROS 2",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${site.url}#site`,
                  url: site.url,
                  name: site.fullName,
                  description: site.description,
                  inLanguage: "en-IN",
                  publisher: { "@id": `${site.url}#org` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${site.url}/search?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="text/x-credits"
          dangerouslySetInnerHTML={{
            __html: `
  ────────────────────────────────────────────────
   MaRS — Mars Rover Students Club
   IIITDM Kancheepuram

   Crafted by Denoise Labs
   denoiselabs.in

   Four students who wanted to ship the best
   engineering-club site on the internet.

   Full colophon → /credits
  ────────────────────────────────────────────────
`,
          }}
        />
        <MotionProvider>
          <LenisProvider>
            <SceneController />
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
            <CursorTrail />
          </LenisProvider>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

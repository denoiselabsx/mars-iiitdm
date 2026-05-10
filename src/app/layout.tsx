import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { LenisProvider } from "@/components/providers/lenis-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
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
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080c",
  colorScheme: "dark",
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
        <MotionProvider>
          <LenisProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

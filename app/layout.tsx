import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { seo } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

// NOTE: these `variable` names deliberately do NOT match the semantic
// --font-display/--font-body/--font-technical tokens in globals.css.
// next/font injects its own CSS variable via a className on <html>;
// reusing the semantic token name here would make the two collide in
// the cascade (whichever the browser resolves last would silently
// win). globals.css instead composes these font-loader variables
// underneath the semantic tokens — see the primitive layer there.
const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const technicalFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Spec §33/§54 — global metadata. Each /work/[slug] page overrides
// this with project-specific metadata (see that route).
export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${technicalFont.variable}`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <MotionProvider>
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
        </MotionProvider>
        <Footer />
      </body>
    </html>
  );
}

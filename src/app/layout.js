import "./globals.css";

import SiteShell from "@/components/layout/SiteShell";

import { SanityLive } from "@/sanity/lib/live";

import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import localFont from "next/font/local";

export const metadata = {
  title: "adiveda-practice",
  description: "Modern Next.js Website",
};


/**
 * Fonts
 */

const tampos = localFont({
  src: [
    {
      path: '../fonts/TiemposHeadline-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../fonts/TiemposHeadline-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/TiemposHeadline-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/TiemposHeadline-Semibold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../fonts/TiemposHeadline-Bold.woff2',
      weight: '600',
      style: 'normal'
    },
  ],
  variable: '--font-tiempos'
});


const ronzino = localFont({
  src: [
    {
      path: '../fonts/Ronzino-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/Ronzino-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/Ronzino-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
  ],
  variable : '--font-ronzino'
})

export default async function RootLayout({ children }) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${tampos.variable} ${ronzino.variable}`}>
      <body>
        <SiteShell>
          {children}
        </SiteShell>
        <SanityLive includeDrafts={isDraftMode} />
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  );
}

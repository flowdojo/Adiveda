import "./globals.css";

import SiteShell from "@/components/layout/SiteShell";

import {SanityLive} from "@/sanity/lib/live";

import {draftMode} from "next/headers";
import {VisualEditing} from "next-sanity/visual-editing";

export const metadata = {
  title: "adiveda-practice",
  description: "Modern Next.js Website",
};

export default async function RootLayout({children}) {
  const {isEnabled: isDraftMode} = await draftMode();

  return (
    <html lang="en">
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

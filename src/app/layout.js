import "./globals.css";

import SiteShell from "@/components/layout/SiteShell";

export const metadata = {
  title: "adiveda-practice",
  description: "Modern Next.js Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

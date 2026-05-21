import "./globals.css";

import SmoothScrolling from "@/providers/SmoothScrolling";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Flowdojo Styleguide Practice",
  description: "Modern Next.js Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          {children}
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
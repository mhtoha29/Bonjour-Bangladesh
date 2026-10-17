import type { Metadata } from "next";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource-variable/newsreader/wght.css";
import "./globals.css";
import { BrandLoader } from "@/components/brand-loader";
import { VisitorConcierge } from "@/components/visitor-concierge";
import { publicRobots } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonjourbangladesh.com"),
  title: { default: "Bonjour Bangladesh", template: "%s | Bonjour Bangladesh" },
  description: "Apparel sourcing from Bangladesh with selected manufacturing partners.",
  robots: publicRobots,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <BrandLoader />
        <noscript><style>{`[data-brand-loader]{display:none!important}`}</style></noscript>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <VisitorConcierge />
      </body>
    </html>
  );
}

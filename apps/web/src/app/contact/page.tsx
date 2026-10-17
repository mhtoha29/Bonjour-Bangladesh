import type { Metadata } from "next";
import Link from "next/link";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { InteriorHero, InteriorShell } from "@/components/interior-shell";
import { brand } from "@/content/site-content";
import { publicRobots } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Bonjour Bangladesh in Uttara, Dhaka about apparel sourcing, product development and buyer inquiries.",
  alternates: { canonical: "/contact/" },
  robots: publicRobots,
};

export default function ContactPage() {
  return <InteriorShell>
    <InteriorHero eyebrow="CONTACT BONJOUR BANGLADESH" title="Talk to our sourcing team." lead="Send a product inquiry, ask about our capabilities or arrange an initial conversation. WhatsApp and email are the quickest direct routes; a video meeting can be arranged afterwards." aside={<ContactInquiryForm />} />
    <section className={styles.channels}>
      <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer"><span>01 / INSTANT MESSAGE</span><h2>WhatsApp</h2><p>{brand.phoneDisplay}</p><strong>Start a conversation ↗</strong></a>
      <a href={`mailto:${brand.email}`}><span>02 / EMAIL</span><h2>Send an email</h2><p>{brand.email}</p><strong>Open your email app ↗</strong></a>
      <Link href="/request-a-quote/"><span>03 / PRODUCT BRIEF</span><h2>Request a Quote</h2><p>Share the details you already have.</p><strong>Prepare your brief ↗</strong></Link>
    </section>
    <section className={styles.visit}>
      <div><h2 className={styles.visitHeadline}>OUR ADDRESS</h2><p className={styles.visitSubheadline}>Based in Uttara, Dhaka.</p><address>{brand.address}</address><a href={`tel:${brand.phoneHref}`}>Call {brand.phoneDisplay} ↗</a><p>For a meeting, connect by WhatsApp or email first. We can then arrange Zoom, Google Meet or another suitable option.</p></div>
      <div className={styles.mapCard}>
        <iframe title="Bonjour Bangladesh office location in Uttara, Dhaka" src="https://www.google.com/maps?q=House%208%2C%20Road%206%2FA%2C%20Sector%204%2C%20Uttara%2C%20Dhaka%201230%2C%20Bangladesh&output=embed" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
        <span className={styles.mapShade} aria-hidden="true" />
        <a className={styles.mapDetails} href="https://maps.app.goo.gl/nvaDc5GajsB4JnaZ9" target="_blank" rel="noopener noreferrer" aria-label="Open Bonjour Bangladesh address in Google Maps"><span>LIVE LOCATION · UTTARA</span><strong>View the office map</strong><small>House 8, Road 6/A, Sector 4 ↗</small></a>
      </div>
    </section>
  </InteriorShell>;
}

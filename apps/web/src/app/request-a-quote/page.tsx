import type { Metadata } from "next";
import { InteriorHero, InteriorShell } from "@/components/interior-shell";
import { RfqForm } from "@/components/rfq-form";
import { brand } from "@/content/site-content";
import { publicRobots } from "@/lib/seo";
import styles from "./page.module.css";

type Props = { searchParams: Promise<{ style?: string | string[] }> };

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Share a garment brief, reference or tech pack with Bonjour Bangladesh to discuss apparel sourcing and development.",
  alternates: { canonical: "/request-a-quote/" },
  robots: publicRobots,
};

export default async function QuotePage({ searchParams }: Props) {
  const params = await searchParams;
  const style = typeof params.style === "string" ? params.style : undefined;
  return <InteriorShell>
    <InteriorHero eyebrow="YOUR PRODUCT, OUR STARTING POINT" title="Share your product brief or tech pack." lead="Tell us what you plan to make and what matters most—product, quantity, destination, quality requirements and target timing. You can start with incomplete information." />
    <div className={styles.intro}><p>We review each brief individually. An inquiry does not confirm pricing, capacity or a production date.</p><div><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a><a href={`mailto:${brand.email}`}>Email directly ↗</a></div></div>
    <RfqForm initialStyle={style} />
  </InteriorShell>;
}

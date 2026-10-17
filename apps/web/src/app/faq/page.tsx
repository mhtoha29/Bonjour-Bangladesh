import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero, InteriorShell, InquiryBand } from "@/components/interior-shell";
import { faqGroups } from "@/content/site-content";
import { publicRobots } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Practical answers about apparel sourcing, sampling, quality control, compliance and inquiries with Bonjour Bangladesh.",
  alternates: { canonical: "/faq/" },
  robots: publicRobots,
};

export default function FaqPage() {
  return <InteriorShell>
    <InteriorHero eyebrow="FREQUENTLY ASKED QUESTIONS" title="Everything you need to know about sourcing with Bonjour Bangladesh." lead="Practical answers about products, sampling, partner facilities, quality, compliance, production and sending your first inquiry." />
    <nav className={styles.groups} aria-label="FAQ topics">{faqGroups.map((group, index) => <a key={group.title} href={`#group-${index + 1}`}>{group.title}</a>)}</nav>
    <div className={styles.faqLayout}>{faqGroups.map((group, index) => <section key={group.title} id={`group-${index + 1}`}><div className={styles.groupHeading}><span>0{index + 1}</span><h2>{group.title}</h2></div><div className={styles.items}>{group.items.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>)}</div>
    <p className={styles.more}>Still have a specific requirement? <Link href="/request-a-quote/">Send your brief ↗</Link></p>
    <InquiryBand title="Your question may be product-specific." body="Tell us what you plan to make and which requirements you need to meet. Our team can discuss the right starting point." />
  </InteriorShell>;
}

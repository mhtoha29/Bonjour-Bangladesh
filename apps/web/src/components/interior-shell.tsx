import Link from "next/link";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import styles from "./interior-shell.module.css";

export function InteriorShell({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main id="main-content" className={styles.main}>{children}</main><SiteFooter /></>;
}

export function InteriorHero({ eyebrow, title, lead, aside }: { eyebrow: string; title: string; lead: string; aside?: React.ReactNode }) {
  return <header className={styles.hero}><div className={styles.heroCopy}><h1 className={styles.heroHeadline}>{eyebrow}</h1><p className={styles.heroSubheadline}>{title}</p><p className={styles.heroLead}>{lead}</p></div>{aside && <div className={styles.heroAside}>{aside}</div>}</header>;
}

export function InquiryBand({ title = "Have a garment brief in mind?", body = "Tell us what you plan to make and which requirements matter. A reference image or tech pack is welcome, but not required." }: { title?: string; body?: string }) {
  return <aside className={styles.inquiryBand}><div><h2 className={styles.bandHeadline}>START A CONVERSATION</h2><p className={styles.bandSubheadline}>{title}</p><p>{body}</p></div><Link href="/request-a-quote/">Share your brief <span aria-hidden="true">→</span></Link></aside>;
}

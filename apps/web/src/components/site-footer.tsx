import Link from "next/link";
import { brand } from "@/content/site-content";
import styles from "./site-footer.module.css";

const footerGroups = [
  { title: "Explore", links: [{ label: "All products", href: "/products/" }, { label: "Men", href: "/products/men/" }, { label: "Women", href: "/products/women/" }, { label: "Kids", href: "/products/kids/" }] },
  { title: "Company", links: [{ label: "About", href: "/about/" }, { label: "Capabilities", href: "/capabilities/" }, { label: "Foundation", href: "/hashmat-ali-foundation/" }, { label: "Blog", href: "/blog/" }, { label: "FAQ", href: "/faq/" }] },
  { title: "Quality & responsibility", links: [{ label: "Quality control", href: "/quality-control/" }, { label: "Responsible sourcing", href: "/compliance-responsible-sourcing/" }, { label: "Sustainability", href: "/sustainability/" }] },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.topline}>
          <span>EST. 2010 · DHAKA, BANGLADESH</span>
          <Link href="/" className={styles.mark} aria-label={`${brand.name} home`}>
            <svg viewBox="0 0 176 54" preserveAspectRatio="none" role="presentation" aria-hidden="true">
              <defs><clipPath id="footer-logo-notch"><path d="M0 0H176C165 0 161 8 153 21L140 43C136 50 131 54 121 54H55C45 54 40 50 36 43L23 21C15 8 11 0 0 0Z" /></clipPath></defs>
              <path d="M0 0H176C165 0 161 8 153 21L140 43C136 50 131 54 121 54H55C45 54 40 50 36 43L23 21C15 8 11 0 0 0Z" />
              <image href="/bonjour-logo.png" x="47" y="-15" width="82" height="82" preserveAspectRatio="xMidYMid meet" clipPath="url(#footer-logo-notch)" />
            </svg>
          </Link>
          <span>INDEPENDENT APPAREL SOURCING PARTNER</span>
        </div>
        <div className={styles.intro}>
          <div><h2>LET’S START WITH YOUR BRIEF</h2><p>Good garments begin with <em>good conversations.</em></p></div>
          <div className={styles.introAction}><p>Tell us what you need to make. We’ll help map the next step with the right manufacturing partner.</p><Link href="/request-a-quote/">Request a Quote <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className={styles.directory}>
          <div className={styles.brandColumn}>
            <p className={styles.wordmark}>Bonjour<br />Bangladesh<span>®</span></p>
            <p>{brand.slogan}</p>
            <a href={`mailto:${brand.email}`} className={styles.email}>{brand.email} ↗</a>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title} className={styles.linkColumn}>
              <h3>{group.title}</h3>
              {group.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            </div>
          ))}
          <div className={styles.linkColumn}>
            <h3>Contact</h3>
            <Link href="/request-a-quote/">Request a Quote</Link>
            <Link href="/admin/">Team login</Link>
            <a href={`tel:${brand.phoneHref}`}>{brand.phoneDisplay}</a>
            <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <address>{brand.address}</address>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <div><Link href="/privacy-policy/">Privacy</Link><Link href="/terms-and-conditions/">Terms</Link><Link href="/disclaimer/">Disclaimer</Link></div>
          <span>Design &amp; development by <a href="https://texit.byv.life" target="_blank" rel="noopener noreferrer">Tex-IT ↗</a></span>
        </div>
      </div>
    </footer>
  );
}

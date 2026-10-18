"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteData } from "@/lib/site";
import { brand } from "@/content/site-content";
import styles from "./site-header.module.css";

type HeaderProps = {
  overlay?: boolean;
  navigation?: SiteData["navigation"];
};

const fallbackNavigation = [
  { label: "Products", href: "/products/" },
  { label: "Capabilities", href: "/capabilities/" },
  { label: "Quality & Compliance", href: "/quality-compliance/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

function getNavigation(navigation?: SiteData["navigation"]) {
  return fallbackNavigation.map((item) => navigation?.find((link) => link.href === item.href) ?? item);
}

function CroppedLogo({ className }: { className: string }) {
  return (
    <span className={className} aria-hidden="true">
      <Image src="/bonjour-logo.png" alt="" width={175} height={175} priority />
    </span>
  );
}

export function SiteHeader({ overlay = false, navigation }: HeaderProps) {
  const links = getNavigation(navigation);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextY = Math.max(0, window.scrollY);
        setScrolled(nextY > 28);

        if (nextY < 96) {
          setHidden(false);
          lastY = nextY;
          return;
        }

        if (nextY > lastY + 7) {
          setHidden(true);
          lastY = nextY;
        } else if (nextY < lastY - 7) {
          setHidden(false);
          lastY = nextY;
        }
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  const isCurrent = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className={`${styles.header} ${overlay ? styles.overlay : styles.solid}`} data-scrolled={scrolled ? "true" : "false"} data-hidden={hidden ? "true" : "false"}>
      <nav className={styles.desktopNavigation} aria-label="Primary navigation">
        <div className={styles.navGroup}>
          {links.slice(0, 3).map((link) => <Link href={link.href} key={link.href} className={styles.navPill} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</Link>)}
        </div>
        <Link href="/" className={styles.desktopBrand} aria-label={`${brand.name} home`}>
          {overlay ? (
            <svg className={styles.tabShape} viewBox="0 0 196 58" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 0H196C183 0 178 9 170 23L156 46C152 54 146 58 135 58H61C50 58 44 54 40 46L26 23C18 9 13 0 0 0Z" />
              <image href="/bonjour-logo.png" x="57" y="-9" width="82" height="82" style={{ mixBlendMode: "multiply" }} />
            </svg>
          ) : <CroppedLogo className={styles.desktopLogoCrop} />}
        </Link>
        <div className={`${styles.navGroup} ${styles.navGroupRight}`}>
          {links.slice(3).map((link) => <Link href={link.href} key={link.href} className={styles.navPill} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</Link>)}
          <Link href="/request-a-quote/" className={styles.quotePill}>Request a Quote <span aria-hidden="true">→</span></Link>
          <Link href="/admin/" className={styles.adminLink} aria-label="Team login">Login</Link>
        </div>
      </nav>

      <div className={styles.mobileNavigation}>
        <details className={styles.mobileMenu}>
          <summary><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14" /></svg><span>Menu</span></summary>
          <nav className={styles.mobileMenuPanel} aria-label="Mobile navigation">
            <div className={styles.mobileMenuIntro}><span>NAVIGATION</span><strong>Explore Bonjour</strong></div>
            <div className={styles.mobilePrimaryLinks}>{links.map((link, index) => <Link key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><b>{link.label}</b><i aria-hidden="true">↗</i></Link>)}</div>
            <div className={styles.mobileUtilityLinks}><a href={`mailto:${brand.email}`}>Email</a><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a><Link href="/admin/">Team login</Link></div>
          </nav>
        </details>
        <Link href="/" className={styles.mobileBrand} aria-label={`${brand.name} home`}>
          <svg className={styles.mobileTabShape} viewBox="0 0 176 64" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <clipPath id="mobile-logo-notch">
                <path d="M0 0H176C164 0 159 9 151 23L139 45C135 53 129 57 119 57H57C47 57 41 53 37 45L25 23C17 9 12 0 0 0Z" />
              </clipPath>
            </defs>
            <path d="M0 0H176C164 0 159 9 151 23L139 45C135 53 129 57 119 57H57C47 57 41 53 37 45L25 23C17 9 12 0 0 0Z" />
            <image href="/bonjour-logo.png" x="48" y="-15" width="80" height="80" preserveAspectRatio="xMidYMid meet" clipPath="url(#mobile-logo-notch)" />
          </svg>
        </Link>
        <Link href="/request-a-quote/" className={styles.mobileQuote}>Get a Quote <span aria-hidden="true">↗</span></Link>
      </div>
    </header>
  );
}

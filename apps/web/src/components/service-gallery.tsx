"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/site-content";
import styles from "./service-gallery.module.css";

export function ServiceGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 820px)");
    let animationFrame = 0;

    const update = () => {
      if (motion.matches || compact.matches) return;
      const bounds = section.getBoundingClientRect();
      const travel = bounds.height - window.innerHeight;
      const rawProgress = travel > 0 ? Math.min(1, Math.max(0, -bounds.top / travel)) : 0;
      const entryHold = 0.055;
      const exitHold = 0.045;
      const progress = Math.min(1, Math.max(0, (rawProgress - entryHold) / (1 - entryHold - exitHold)));
      const nextActive = Math.round(progress * (services.length - 1));
      setActive((current) => current === nextActive ? current : nextActive);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const moveTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * index) / (services.length - 1), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className={styles.section} id="what-we-do" aria-labelledby="services-heading">
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.headingRow}>
            <div>
              <h2 id="services-heading" className={styles.headline}>WHAT WE DO</h2>
              <p className={styles.edition}>The sourcing edition.</p>
              <p className={styles.subheadline}>Every detail, <em>considered.</em></p>
            </div>
            <p>Seven connected services, shaped around your product brief—from the first partner match to shipment readiness.</p>
          </div>

          <div className={styles.stage} aria-label="Our sourcing services">
            <div className={styles.stageLine} aria-hidden="true" />
            {services.map((service, index) => {
              const half = Math.floor(services.length / 2);
              const position = ((index - active + half + services.length) % services.length) - half;
              return (
                <article className={styles.card} data-position={position} key={service.title}>
                  <div className={styles.cover}>
                    <Image src={service.cover} alt="" fill sizes="(max-width: 850px) 80vw, 36vw" className={styles.coverImage} />
                    <div className={styles.coverVeil} />
                    <span className={styles.coverBrand}>BONJOUR<br />BANGLADESH</span>
                    <span className={styles.coverIndex}>{String(index + 1).padStart(2, "0")} <span>/</span> {String(services.length).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.cardCopy}>
                    <p>SOURCING SERVICE</p>
                    <h3>{service.title}</h3>
                    <span>{service.teaser}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.controls}>
            <p><span className={styles.activeNumber}>{String(active + 1).padStart(2, "0")}</span> <span className={styles.divider}>/</span> {String(services.length).padStart(2, "0")} <span className={styles.scrollHint}>SCROLL TO EXPLORE</span></p>
            <div className={styles.progress} aria-hidden="true">{services.map((service, index) => <span key={service.title} className={index <= active ? styles.progressActive : ""} />)}</div>
            <div className={styles.actions}>
              <button type="button" onClick={() => moveTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous service">←</button>
              <button type="button" onClick={() => moveTo(Math.min(services.length - 1, active + 1))} disabled={active === services.length - 1} aria-label="Next service">→</button>
              <Link href="/capabilities/">All capabilities <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

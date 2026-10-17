"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import styles from "./hero-slideshow.module.css";

export type HeroSlide = {
  src: string;
  mobileSrc?: string;
  position?: string;
  mobilePosition?: string;
};

type HeroSlideshowProps = {
  slides: HeroSlide[];
  mediaClassName: string;
};

export function HeroSlideshow({ slides, mediaClassName }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [paused, reducedMotion, slides.length]);

  return (
    <>
      <div className={`${mediaClassName} ${styles.media}`} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            className={`${styles.slide} ${index === active ? styles.active : ""}`}
            key={slide.src}
            style={{
              "--desktop-position": slide.position ?? "center 18%",
              "--mobile-position": slide.mobilePosition ?? "center top",
            } as CSSProperties}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              unoptimized={slide.src.startsWith("/hero/")}
              sizes="(max-width: 700px) 100vw, 98vw"
              className={`${styles.image} ${slide.mobileSrc ? styles.desktopImage : ""}`}
            />
            {slide.mobileSrc && <Image src={slide.mobileSrc} alt="" fill loading="lazy" sizes="100vw" className={`${styles.image} ${styles.mobileImage}`} />}
          </div>
        ))}
      </div>
      <div className={styles.controls} aria-label="Hero image slideshow controls">
        <span className={styles.counter}>{String(active + 1).padStart(2, "0")} <span>/</span> {String(slides.length).padStart(2, "0")}</span>
        <span className={styles.progress} aria-hidden="true"><span key={`${active}-${paused}`} className={`${styles.progressFill} ${paused || reducedMotion ? styles.progressPaused : ""}`} /></span>
        <button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? "Play hero slideshow" : "Pause hero slideshow"} aria-pressed={paused}>
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </>
  );
}

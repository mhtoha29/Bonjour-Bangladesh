"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./who-we-are-carousel.module.css";

const looks = [
  { src: "/products/editorial/women-knit.webp", label: "Women · knit" },
  { src: "/products/editorial/men-woven.webp", label: "Men · woven" },
  { src: "/products/editorial/kids-knit.webp", label: "Kids · knit" },
  { src: "/products/editorial/women-woven.webp", label: "Women · woven" },
  { src: "/products/editorial/men-knitwear.webp", label: "Men · fully fashioned" },
  { src: "/products/editorial/kids-woven.webp", label: "Kids · woven" },
  { src: "/products/editorial/women-knitwear.webp", label: "Women · fully fashioned" },
  { src: "/products/editorial/men-knit.webp", label: "Men · knit" },
  { src: "/products/editorial/kids-knitwear.webp", label: "Kids · fully fashioned" },
] as const;

export function WhoWeAreCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || motion.matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % looks.length), 4400);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className={styles.carousel} aria-label="Product directions across men's, women's and kids' apparel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className={styles.orbit}>
        {looks.map((look, index) => {
          const distance = (index - active + looks.length) % looks.length;
          const position = distance > looks.length / 2 ? distance - looks.length : distance;
          return <div className={styles.slide} data-position={Math.max(-2, Math.min(2, position))} key={look.src} aria-hidden={position !== 0}>
            <Image src={look.src} alt={position === 0 ? look.label : ""} fill sizes="(max-width: 700px) 65vw, (max-width: 1200px) 34vw, 23vw" className={styles.image} priority={index === 0} />
          </div>;
        })}
        <span className={styles.orbitLine} aria-hidden="true" />
      </div>
      <div className={styles.caption}><span>FROM THE APPAREL RANGE</span><strong>{looks[active].label}</strong></div>
      <div className={styles.controls} aria-label="Choose an apparel image">
        {looks.map((look, index) => <button type="button" key={look.src} aria-label={`Show ${look.label}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} />)}
      </div>
    </div>
  );
}

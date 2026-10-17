"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./brand-loader.module.css";

type LoaderPhase = "loading" | "complete" | "leaving" | "hidden";

function delay(duration: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

export function BrandLoader() {
  const [progress, setProgress] = useState(4);
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const progressRef = useRef(4);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = true;
    let frame = 0;
    const startedAt = performance.now();

    root.classList.add("brand-loader-active");

    const advance = (time: number) => {
      if (!active) return;
      const elapsed = time - startedAt;
      const next = Math.min(92, Math.round(4 + 88 * (1 - Math.exp(-elapsed / 850))));
      if (next !== progressRef.current) {
        progressRef.current = next;
        setProgress(next);
      }
      frame = requestAnimationFrame(advance);
    };

    if (!reducedMotion) frame = requestAnimationFrame(advance);

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const fontsReady = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();

    async function finish() {
      await Promise.all([
        Promise.race([Promise.all([pageReady, fontsReady]), delay(4800)]),
        delay(reducedMotion ? 80 : 1050),
      ]);
      if (!active) return;

      cancelAnimationFrame(frame);
      if (reducedMotion) {
        progressRef.current = 100;
        setProgress(100);
      } else {
        const from = progressRef.current;
        const finalStartedAt = performance.now();
        await new Promise<void>((resolve) => {
          const completeProgress = (time: number) => {
            if (!active) return resolve();
            const ratio = Math.min(1, (time - finalStartedAt) / 360);
            const eased = 1 - Math.pow(1 - ratio, 3);
            const next = Math.round(from + (100 - from) * eased);
            progressRef.current = next;
            setProgress(next);
            if (ratio < 1) frame = requestAnimationFrame(completeProgress);
            else resolve();
          };
          frame = requestAnimationFrame(completeProgress);
        });
      }

      if (!active) return;
      setPhase("complete");
      await delay(reducedMotion ? 40 : 260);
      if (!active) return;
      setPhase("leaving");
      root.classList.remove("brand-loader-active");
      await delay(reducedMotion ? 40 : 760);
      if (active) setPhase("hidden");
    }

    void finish();

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      root.classList.remove("brand-loader-active");
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={styles.loader} data-phase={phase} data-brand-loader role="status" aria-live="polite" aria-label={`Loading Bonjour Bangladesh, ${progress}% complete`}>
      <div className={`${styles.panel} ${styles.panelLeft}`} aria-hidden="true" />
      <div className={`${styles.panel} ${styles.panelRight}`} aria-hidden="true" />
      <div className={styles.edge} aria-hidden="true"><i /><i /></div>

      <div className={styles.scene}>
        <p className={styles.kicker}>APPAREL SOURCING · DHAKA</p>
        <div className={styles.signature} aria-hidden="true">
          <div className={styles.threads}><i /><i /></div>
          <div className={styles.mark}>
            <span className={styles.orbit} />
            <Image src="/bonjour-logo.png" alt="" width={152} height={152} priority />
          </div>
        </div>
        <div className={styles.copy}>
          <strong>Bonjour Bangladesh</strong>
          <span>Preparing your sourcing experience.</span>
        </div>
        <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} style={{ "--loader-progress": `${progress}%` } as CSSProperties}>
          <div><i /></div>
          <p><span>{progress === 100 ? "READY" : "LOADING"}</span><b>{String(progress).padStart(3, "0")}%</b></p>
        </div>
      </div>

      <div className={styles.meta} aria-hidden="true"><span>EST. 2010</span><span>QUALITY · TIME · COMMITMENT</span><span>BANGLADESH</span></div>
    </div>
  );
}

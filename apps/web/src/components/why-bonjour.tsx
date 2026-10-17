import styles from "./why-bonjour.module.css";

const reasons = [
  {
    label: "ESTABLISHED EXPERIENCE",
    title: "Serving international buyers since 2010.",
    body: "More than fifteen years of apparel-sourcing experience, with particular experience supporting buyers across the UK, Europe and other international markets.",
    icon: "history",
  },
  {
    label: "PRODUCT–PARTNER FIT",
    title: "The right factory for the right product.",
    body: "Manufacturing partners are considered against product expertise, capacity, technical capability, quality, compliance needs and delivery performance.",
    icon: "match",
  },
  {
    label: "CONNECTED SUPPORT",
    title: "One route from brief to shipment.",
    body: "Product development, materials, sampling, costing, production follow-up, quality and shipment readiness stay connected through one sourcing team.",
    icon: "route",
  },
  {
    label: "QUALITY IN PROCESS",
    title: "Quality is built in—not added at the end.",
    body: "The QC team follows key production stages, identifies deviations early and coordinates corrective action before the final shipment checkpoint.",
    icon: "quality",
  },
  {
    label: "BUYER-SPECIFIC APPROACH",
    title: "Your requirements shape the process.",
    body: "Product, quality, testing, documentation, compliance and sustainability requirements are reviewed for the buyer, destination market and individual order.",
    icon: "brief",
  },
  {
    label: "DEPENDABLE FOLLOW-THROUGH",
    title: "Clear communication. Realistic delivery planning.",
    body: "Progress, materials, approvals, risks, corrective actions and shipment readiness are followed closely—with proactive communication at every important stage.",
    icon: "communication",
  },
] as const;

function ReasonIcon({ name }: { name: (typeof reasons)[number]["icon"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...common}>
      {name === "history" && <><circle cx="16" cy="16" r="10.5" /><path d="M16 10v6l4.5 2.5M9 5.7 6.6 8.1M23 5.7l2.4 2.4" /></>}
      {name === "match" && <><path d="M6 9.5h8l2 3 2-3h8v14H6z" /><path d="M11 9.5V7h10v2.5M12 18h8" /></>}
      {name === "route" && <><circle cx="7" cy="23.5" r="2.5" /><circle cx="25" cy="8.5" r="2.5" /><path d="M9.5 23.5h4c5.5 0 3-15 9-15M13 19l3.5 4.5L13 28" /></>}
      {name === "quality" && <><path d="M16 4.5 25 8v7.2c0 5.7-3.7 9.6-9 12.3-5.3-2.7-9-6.6-9-12.3V8z" /><path d="m11.2 15.8 3.2 3.2 6.6-7" /></>}
      {name === "brief" && <><path d="M8 5.5h12l4 4v17H8z" /><path d="M20 5.5v4h4M12 14h8M12 18h8M12 22h5" /></>}
      {name === "communication" && <><path d="M5.5 7.5h21v14h-12l-6 5v-5h-3z" /><path d="M10 12.5h12M10 16.5h8" /></>}
    </svg>
  );
}

export function WhyBonjour({ compactTop = false }: { compactTop?: boolean }) {
  return (
    <section id="why-bonjour" className={`${styles.section} ${compactTop ? styles.compactTop : ""} reveal`} aria-labelledby="why-bonjour-title">
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>WHY BONJOUR BANGLADESH</p>
          <h2 id="why-bonjour-title">THE BONJOUR DIFFERENCE</h2>
          <p className={styles.subheadline}>A sourcing partner chosen for what happens between the brief and the shipment.</p>
        </div>
        <p className={styles.promise}><span>THE STANDARD</span>The right quality. The right time. The right commitment.</p>
      </header>
      <div className={styles.grid}>
        {reasons.map((reason, index) => (
          <article className={styles.card} key={reason.title}>
            <div className={styles.cardHead}><span>{String(index + 1).padStart(2, "0")}</span><ReasonIcon name={reason.icon} /></div>
            <div className={styles.cardCopy}><p>{reason.label}</p><h3>{reason.title}</h3><p>{reason.body}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import styles from "./global-reach.module.css";

const markets = [
  { name: "Czech Republic", shortName: "Czechia", flag: "/flags/czech-republic.webp", x: 286, y: 91, labelX: 295, labelY: 69, anchor: "start", path: "M500 147 Q391 54 286 91" },
  { name: "Italy", shortName: "Italy", flag: "/flags/italy.webp", x: 283, y: 119, labelX: 294, labelY: 142, anchor: "start", path: "M500 147 Q388 89 283 119" },
  { name: "Canada", shortName: "Canada", flag: "/flags/canada.webp", x: 132, y: 79, labelX: 118, labelY: 61, anchor: "end", path: "M500 147 Q316 2 132 79" },
  { name: "Poland", shortName: "Poland", flag: "/flags/poland.webp", x: 303, y: 87, labelX: 325, labelY: 103, anchor: "start", path: "M500 147 Q405 44 303 87" },
  { name: "Portugal", shortName: "Portugal", flag: "/flags/portugal.webp", x: 234, y: 117, labelX: 221, labelY: 141, anchor: "end", path: "M500 147 Q361 82 234 117" },
  { name: "Mexico", shortName: "Mexico", flag: "/flags/mexico.webp", x: 116, y: 159, labelX: 103, labelY: 181, anchor: "end", path: "M500 147 Q300 87 116 159" },
  { name: "Netherlands", shortName: "Netherlands", flag: "/flags/netherlands.webp", x: 266, y: 83, labelX: 251, labelY: 60, anchor: "end", path: "M500 147 Q382 36 266 83" },
] as const;

export function GlobalReach() {
  return (
    <section className={styles.panel} aria-labelledby="global-reach-title">
      <div className={styles.copy}>
        <h2 id="global-reach-title" className={styles.headline}>ROOTED IN DHAKA · GLOBAL IN OUTLOOK</h2>
        <p className={styles.subheadline}>From Bangladesh, across the world.</p>
        <p className={styles.body}>An illustrative view of potential buyer markets. We connect international briefs with apparel development and manufacturing possibilities in Bangladesh.</p>
        <span className={styles.caption}>POSSIBILITIES WITHOUT BORDERS <span aria-hidden="true">↗</span></span>
      </div>
      <div className={styles.mapArea}>
        <span className={styles.mapIndex}>23°48′ N&nbsp; / &nbsp;90°25′ E</span>
        <svg className={styles.map} viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
          <g className={styles.grid}>
            <path d="M0 100H1000M0 200H1000M0 300H1000M250 0V400M500 0V400M750 0V400" />
          </g>
          <image href="/world-land.svg" width="1000" height="400" />
          <g className={styles.routes}>
            {markets.map((market, index) => <path key={market.name} d={market.path} style={{ animationDelay: `${index * 0.6}s` }} />)}
          </g>
          <g className={styles.destinations}>
            {markets.map((market, index) => (
              <g key={market.name} className={styles.market} style={{ animationDelay: `${index * 0.6 + 0.45}s` }}>
                <circle className={styles.marketHalo} cx={market.x} cy={market.y} r="7" />
                <circle className={styles.marketPoint} cx={market.x} cy={market.y} r="3" />
                <text x={market.labelX} y={market.labelY} textAnchor={market.anchor}>{market.shortName.toUpperCase()}</text>
              </g>
            ))}
          </g>
          <circle className={styles.hubHalo} cx="500" cy="147" r="17" />
          <circle className={styles.hubRing} cx="500" cy="147" r="8" />
          <circle className={styles.hubCore} cx="500" cy="147" r="3.5" />
        </svg>
        <span className={styles.hubLabel}>BANGLADESH</span>
        <div className={styles.flagRail} aria-label="Illustrative buyer-market outlook">
          <span className={styles.flagRailLabel}>MARKET OUTLOOK</span>
          <div className={styles.flagViewport}>
            <div className={styles.flagTrack}>
              {[...markets, ...markets].map((market, index) => (
                <span className={styles.flagItem} key={`${market.name}-${index}`} aria-hidden={index >= markets.length}>
                  <Image src={market.flag} alt={index < markets.length ? `${market.name} flag` : ""} width={28} height={28} sizes="28px" />
                  <b>{market.name}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className={styles.visuallyHidden}>Illustrative map of potential buyer markets in the Czech Republic, Italy, Canada, Poland, Portugal, Mexico and the Netherlands. Routes do not represent confirmed shipments or partner locations.</p>
    </section>
  );
}

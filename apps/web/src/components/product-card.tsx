import Link from "next/link";
import Image from "next/image";
import type { PreviewStyle } from "@/content/catalog-preview";
import { MediaPlaceholder } from "./media-placeholder";
import styles from "./product-card.module.css";

const toneByAudience = { men: "sage", women: "linen", kids: "stone" } as const;

export function ProductCard({ style, preview = false, showPreviewBadge = true }: { style: PreviewStyle; preview?: boolean; showPreviewBadge?: boolean }) {
  return (
    <article className={styles.card}>
      <Link href={`/products/${style.slug}/`} className={styles.mediaLink} aria-label={`View ${style.name}`}>
        {style.image ? <Image src={style.image.src} alt={style.image.alt} width={900} height={1200} sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw" loading="lazy" /> : <MediaPlaceholder tone={toneByAudience[style.audience]} label="Product image pending" />}
        {preview && showPreviewBadge && <span className={styles.previewBadge}>Layout preview</span>}
      </Link>
      <div className={styles.meta}>
        <div><span>{style.audience} / {style.construction.replaceAll("-", " ")}</span><span>{style.code}</span></div>
        <Link href={`/products/${style.slug}/`} className={styles.title}>{style.name} <span aria-hidden="true">↗</span></Link>
        <p>{preview ? `${style.type} concept · specifications awaiting client approval` : style.description ?? style.type}</p>
      </div>
    </article>
  );
}

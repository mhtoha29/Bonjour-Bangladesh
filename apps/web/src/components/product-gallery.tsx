"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MediaPlaceholder } from "./media-placeholder";
import styles from "./product-gallery.module.css";

export type GalleryImage = { src: string; alt: string };

export function ProductGallery({ image, productName }: { image?: GalleryImage; productName: string }) {
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage} onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setZoomPosition({ x: (event.clientX - bounds.left) / bounds.width * 100, y: (event.clientY - bounds.top) / bounds.height * 100 });
      }}>
        {image ? <button type="button" onClick={() => dialogRef.current?.showModal()} aria-label={`Open full-screen image of ${productName}`} className={styles.zoomButton}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 55vw" style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }} /><span>View full image ↗</span></button> : <MediaPlaceholder label="Product photography pending" />}
      </div>
      {image && <dialog className={styles.dialog} ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}><button type="button" className={styles.close} onClick={() => dialogRef.current?.close()}>Close ×</button><Image src={image.src} alt={image.alt} width={1400} height={1400} /></dialog>}
    </div>
  );
}

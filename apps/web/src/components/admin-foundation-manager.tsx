"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import type { FoundationData } from "@/lib/foundation";
import styles from "./admin-foundation-manager.module.css";

export function AdminFoundationManager({ role }: { role: string }) {
  const [foundation, setFoundation] = useState<FoundationData | null>(null);
  const [busySlot, setBusySlot] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const canEdit = ["owner", "manager", "editor"].includes(role);

  useEffect(() => {
    void fetch("/api/admin/foundation", { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.message ?? "Foundation gallery could not be loaded.");
        setFoundation(payload.foundation);
      })
      .catch((caught: Error) => setError(caught.message));
  }, []);

  async function upload(event: FormEvent<HTMLFormElement>, slot: number) {
    event.preventDefault();
    setBusySlot(slot); setNotice(""); setError("");
    const form = event.currentTarget;
    try {
      const response = await fetch(`/api/admin/foundation/${slot}`, { method: "POST", body: new FormData(form) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message ?? "Foundation image could not be uploaded.");
      setFoundation(payload.foundation);
      setNotice(`Foundation image ${slot} optimized and published.`);
      form.reset();
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusySlot(null);
    }
  }

  return <section className={styles.section} aria-labelledby="foundation-admin-heading">
    <header><div><span>FOUNDATION / APPROVED PHOTOGRAPHY</span><h2 id="foundation-admin-heading">Community stories, handled with care.</h2></div><p>Upload only photographs the foundation is permitted to publish. Each file is converted to WebP and stored outside the frontend deployment.</p></header>
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {!foundation && !error ? <p className={styles.loading}>Opening foundation gallery…</p> : <div className={styles.grid}>{foundation?.gallery.map((item) => <article key={item.slot}><div className={styles.preview}>{item.media ? <Image src={item.media.url} alt={item.media.alt} width={520} height={390} unoptimized /> : <span>APPROVED IMAGE {String(item.slot).padStart(2, "0")} PENDING</span>}</div><div className={styles.slotTitle}><span>0{item.slot}</span><h3>{item.slot === 1 ? "Primary activity image" : `Supporting activity image ${item.slot}`}</h3></div>{canEdit && <form onSubmit={(event) => void upload(event, item.slot)}><label>Approved photograph<input name="image" type="file" accept="image/jpeg,image/png,image/webp" required /></label><label>Accessible alt text<input name="alt" defaultValue={item.media?.alt ?? ""} maxLength={190} required /></label><label>Optional caption<input name="caption" defaultValue={item.caption} maxLength={190} /></label><button type="submit" disabled={busySlot !== null}>{busySlot === item.slot ? "Optimizing…" : item.media ? "Replace image →" : "Upload image →"}</button></form>}</article>)}</div>}
  </section>;
}

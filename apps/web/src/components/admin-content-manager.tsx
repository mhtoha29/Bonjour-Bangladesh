"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import type { SiteData } from "@/lib/site";
import styles from "./admin-content-manager.module.css";

export function AdminContentManager({ role }: { role: string }) {
  const [site, setSite] = useState<SiteData | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const canEdit = ["owner", "manager", "editor"].includes(role);

  useEffect(() => {
    void fetch("/api/admin/site", { cache: "no-store" }).then((response) => response.json()).then((payload) => setSite(payload.site ?? null)).catch(() => setError("Content could not be loaded."));
  }, []);

  async function saveCopy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice(""); setError("");
    const data = new FormData(event.currentTarget);
    const body = {
      seo: { title: data.get("seo_title"), description: data.get("seo_description") },
      hero: { eyebrow: data.get("eyebrow"), title: data.get("title"), description: data.get("description"), primaryAction: { label: data.get("action_label"), href: data.get("action_href") } },
    };
    try {
      const response = await fetch("/api/admin/site", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message ?? "Content could not be saved.");
      setSite(payload.site);
      setNotice("Homepage copy and SEO saved. The public site now uses these values.");
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  async function upload(event: FormEvent<HTMLFormElement>, variant: "desktop" | "mobile") {
    event.preventDefault(); setBusy(true); setNotice(""); setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("variant", variant);
    try {
      const response = await fetch("/api/admin/site/hero-image", { method: "POST", body: data });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message ?? "Image could not be uploaded.");
      setSite(payload.site);
      setNotice(`${variant === "desktop" ? "Desktop" : "Mobile"} hero image optimized and published.`);
      form.reset();
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  if (!site) return <div className={styles.loading}>Opening content controls…</div>;

  return <div className={styles.layout}><section className={styles.card}><div className={styles.head}><span>HOMEPAGE / HERO & SEARCH</span><h2>Shape the first impression.</h2><p>Keep the buyer message precise. Changes to this section appear on the public homepage after saving.</p></div>{notice && <p className={styles.notice} role="status">{notice}</p>}{error && <p className={styles.error} role="alert">{error}</p>}<form className={styles.form} onSubmit={saveCopy}><label>Eyebrow<input name="eyebrow" defaultValue={site.hero.eyebrow} required maxLength={100} disabled={!canEdit} /></label><label>Main headline<input name="title" defaultValue={site.hero.title} required maxLength={190} disabled={!canEdit} /></label><label>Supporting description<textarea name="description" defaultValue={site.hero.description} required maxLength={500} rows={3} disabled={!canEdit} /></label><div className={styles.two}><label>Primary button label<input name="action_label" defaultValue={site.hero.primaryAction.label} required maxLength={60} disabled={!canEdit} /></label><label>Primary button link<input name="action_href" defaultValue={site.hero.primaryAction.href} required maxLength={190} disabled={!canEdit} /></label></div><div className={styles.divider}><strong>Search metadata</strong><span>Visible in browser previews when indexing is enabled at launch.</span></div><label>SEO title<input name="seo_title" defaultValue={site.seo.title ?? ""} required maxLength={190} disabled={!canEdit} /></label><label>Meta description<textarea name="seo_description" defaultValue={site.seo.description ?? ""} required maxLength={300} rows={2} disabled={!canEdit} /></label>{canEdit && <button type="submit" disabled={busy}>{busy ? "Saving…" : "Save homepage copy →"}</button>}</form></section><aside className={styles.mediaColumn}><div className={styles.card}><div className={styles.head}><span>VISUAL STORY / HERO IMAGES</span><h2>Make imagery work harder.</h2><p>Upload the approved desktop and mobile crops separately. Each file becomes a compressed WebP without replacing uploads during a code deployment.</p></div>{(["desktop", "mobile"] as const).map((variant) => { const media = variant === "desktop" ? site.hero.media : site.hero.mobileMedia; return <div className={styles.mediaBlock} key={variant}><div className={styles.mediaPreview}>{media ? <Image src={media.url} alt={media.alt} width={500} height={variant === "desktop" ? 280 : 360} unoptimized /> : <span>{variant === "desktop" ? "Desktop hero image pending" : "Mobile hero image pending"}</span>}</div><h3>{variant === "desktop" ? "Desktop composition" : "Mobile portrait crop"}</h3>{canEdit && <form onSubmit={(event) => void upload(event, variant)} className={styles.mediaForm}><label>Approved image<input type="file" name="image" accept="image/jpeg,image/png,image/webp" required /></label><label>Descriptive alt text<input name="alt" defaultValue={media?.alt ?? ""} required maxLength={190} /></label><button type="submit" disabled={busy}>{busy ? "Uploading…" : `Upload ${variant} image →`}</button></form>}</div>; })}</div><div className={styles.note}><span>EDITORIAL NOTE</span><p>Client-owned product and factory photography is still pending. Temporary hero imagery remains in place until approved assets are uploaded.</p></div></aside></div>;
}

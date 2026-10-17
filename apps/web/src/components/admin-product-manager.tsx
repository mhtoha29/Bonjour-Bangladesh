"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { ProductData } from "@/lib/products";
import styles from "./admin-product-manager.module.css";

type CatalogPage = { products: { data: ProductData[]; current_page: number; last_page: number; total: number } };
const detailFields = ["Fabric", "Composition", "GSM", "Fit", "Size range", "Colours", "Finish", "MOQ notes"];

export function AdminProductManager({ role }: { role: string }) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selected, setSelected] = useState<ProductData | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const canEdit = ["owner", "manager", "editor"].includes(role);
  const canPublish = ["owner", "manager"].includes(role);

  const load = useCallback(async (requestedPage: number) => {
    const response = await fetch(`/api/admin/products?page=${requestedPage}`, { cache: "no-store" });
    const payload = await response.json() as CatalogPage;
    if (!response.ok) throw new Error("Product catalog could not be loaded.");
    setProducts(payload.products.data);
    setPage(payload.products.current_page);
    setLastPage(payload.products.last_page);
    setTotal(payload.products.total);
  }, []);

  useEffect(() => {
    queueMicrotask(() => { void load(1).catch((caught: Error) => setError(caught.message)); });
  }, [load]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setNotice(""); setError("");
    const data = new FormData(event.currentTarget);
    const wasNew = !selected;
    const details = Object.fromEntries(detailFields.map((field) => [field, String(data.get(`detail_${field}`) ?? "").trim()]).filter(([, value]) => value));
    const body = {
      name: String(data.get("name") ?? ""),
      slug: String(data.get("slug") ?? "") || undefined,
      code: String(data.get("code") ?? "") || null,
      audience: data.get("audience"),
      construction: data.get("construction"),
      type: String(data.get("type") ?? ""),
      description: String(data.get("description") ?? "") || null,
      details,
      status: data.get("status"),
      seo_title: String(data.get("seo_title") ?? "") || null,
      seo_description: String(data.get("seo_description") ?? "") || null,
    };
    try {
      const endpoint = selected ? `products/${selected.id}` : "products";
      const response = await fetch(`/api/admin/${endpoint}`, { method: selected ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message ?? "Product could not be saved.");
      let saved = payload.data as ProductData;
      setSelected(saved);
      if (wasNew) await load(1);
      const image = data.get("image");
      if (image instanceof File && image.size > 0) {
        const imageData = new FormData();
        imageData.set("image", image);
        imageData.set("image_alt", String(data.get("image_alt") ?? "") || saved.name);
        const upload = await fetch(`/api/admin/products/${saved.id}/image`, { method: "POST", body: imageData });
        const uploadPayload = await upload.json();
        if (!upload.ok) throw new Error(`Product saved, but image upload failed: ${uploadPayload.message ?? "Try again."}`);
        saved = uploadPayload.data as ProductData;
      }
      setSelected(saved);
      setNotice(saved.status === "published" ? "Product published. It is now visible in the public catalog." : "Draft saved. It is not public yet.");
      await load(wasNew ? 1 : page);
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  return <div className={styles.manager}><div className={styles.listPanel}><div className={styles.listHead}><div><span>CATALOG INVENTORY</span><h2>{total} styles</h2></div>{canEdit && <button type="button" onClick={() => { setSelected(null); setNotice(""); setError(""); }}>+ New style</button>}</div><div className={styles.listItems}>{products.length ? products.map((product) => <button type="button" key={product.id} className={`${styles.listItem} ${selected?.id === product.id ? styles.selected : ""}`} onClick={() => { setSelected(product); setNotice(""); setError(""); }}><span className={styles.thumb}>{product.image ? <Image src={product.image.src} alt="" width={52} height={62} /> : <span>◇</span>}</span><span className={styles.itemCopy}><strong>{product.name}</strong><small>{product.audience} / {product.construction.replaceAll("-", " ")}</small></span><em className={product.status === "published" ? styles.published : ""}>{product.status}</em></button>) : <p className={styles.empty}>No products uploaded yet. Start with a draft and one optimized image.</p>}</div>{lastPage > 1 && <div className={styles.pager}><button type="button" disabled={page <= 1} onClick={() => void load(page - 1)}>← Previous</button><span>{page} / {lastPage}</span><button type="button" disabled={page >= lastPage} onClick={() => void load(page + 1)}>Next →</button></div>}</div><div className={styles.editorPanel}><div className={styles.editorHead}><span>{selected ? `STYLE / ${selected.code ?? selected.id}` : "NEW PRODUCT"}</span><h2>{selected ? "Edit this product." : "Add a product direction."}</h2><p>One primary image, complete garment information and search-ready metadata. Save as a draft until content is approved.</p></div>{notice && <p className={styles.notice} role="status">{notice}</p>}{error && <p className={styles.error} role="alert">{error}</p>}{canEdit ? <form key={selected?.id ?? "new"} className={styles.form} onSubmit={save}><div className={styles.twoColumns}><label>Product name <input name="name" defaultValue={selected?.name ?? ""} required minLength={2} maxLength={190} /></label><label>Style code <input name="code" defaultValue={selected?.code ?? ""} maxLength={80} placeholder="Optional" /></label></div><div className={styles.twoColumns}><label>Audience <select name="audience" defaultValue={selected?.audience ?? "men"}><option value="men">Men</option><option value="women">Women</option><option value="kids">Kids</option></select></label><label>Construction <select name="construction" defaultValue={selected?.construction ?? "knit"}><option value="knit">Knit</option><option value="woven">Woven</option><option value="fully-fashioned-knitwear">Fully Fashioned</option></select></label></div><div className={styles.twoColumns}><label>Product type <input name="type" defaultValue={selected?.type ?? ""} placeholder="e.g. shirt, sweater" required maxLength={80} /></label><label>URL slug <input name="slug" defaultValue={selected?.slug ?? ""} placeholder="Auto from name" maxLength={190} /></label></div><label>Product description <textarea name="description" defaultValue={selected?.description ?? ""} rows={4} maxLength={4000} placeholder="What buyers should know about the style" /></label><div className={styles.subhead}><strong>Garment details</strong><span>Only completed fields appear on the product page.</span></div><div className={styles.twoColumns}>{detailFields.map((field) => <label key={field}>{field}<input name={`detail_${field}`} defaultValue={selected?.details?.[field] ?? ""} maxLength={300} /></label>)}</div><div className={styles.subhead}><strong>Primary image</strong><span>JPG, PNG or WebP up to 10 MB. Server converts to optimized WebP.</span></div>{selected?.image && <div className={styles.currentImage}><Image src={selected.image.src} alt={selected.image.alt} width={100} height={120} /><span>Current image · a new upload replaces it</span></div>}<div className={styles.twoColumns}><label>Image file<input name="image" type="file" accept="image/jpeg,image/png,image/webp" /></label><label>Image alt text<input name="image_alt" defaultValue={selected?.image?.alt ?? ""} maxLength={190} placeholder="Describe the garment in the image" /></label></div><div className={styles.subhead}><strong>Search presentation</strong><span>Keep titles clear and distinct for buyers.</span></div><label>SEO title<input name="seo_title" defaultValue={selected?.seo_title ?? ""} maxLength={190} /></label><label>Meta description<textarea name="seo_description" defaultValue={selected?.seo_description ?? ""} rows={2} maxLength={300} /></label><div className={styles.publishBar}><label>Visibility<select name="status" defaultValue={selected?.status ?? "draft"}><option value="draft">Draft · private</option>{canPublish && <option value="published">Published · public</option>}</select></label><button type="submit" disabled={busy}>{busy ? "Saving…" : selected ? "Save changes →" : "Create product →"}</button></div></form> : <p className={styles.empty}>Your role allows you to review the catalog. An owner or editor can make changes.</p>}</div></div>;
}

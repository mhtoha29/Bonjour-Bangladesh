"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { BlogPostData } from "@/lib/blogs";
import styles from "./admin-blog-manager.module.css";

type BlogPage = { posts: { data: BlogPostData[]; current_page: number; last_page: number; total: number } };

export function AdminBlogManager({ role, authorName }: { role: string; authorName: string }) {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [selected, setSelected] = useState<BlogPostData | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const canEdit = ["owner", "manager", "editor"].includes(role);
  const canPublish = ["owner", "manager"].includes(role);

  const load = useCallback(async (requestedPage: number) => {
    const response = await fetch(`/api/admin/blog?page=${requestedPage}`, { cache: "no-store" });
    const payload = await response.json() as BlogPage;
    if (!response.ok) throw new Error("Blog posts could not be loaded.");
    setPosts(payload.posts.data);
    setPage(payload.posts.current_page);
    setLastPage(payload.posts.last_page);
    setTotal(payload.posts.total);
  }, []);

  useEffect(() => { queueMicrotask(() => { void load(1).catch((caught: Error) => setError(caught.message)); }); }, [load]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setNotice(""); setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const wasNew = !selected;
    const body = {
      title: String(data.get("title") ?? ""),
      slug: String(data.get("slug") ?? "") || undefined,
      category: String(data.get("category") ?? ""),
      excerpt: String(data.get("excerpt") ?? ""),
      body: String(data.get("body") ?? ""),
      author_name: String(data.get("author_name") ?? authorName),
      featured: data.get("featured") === "on",
      status: String(data.get("status") ?? "draft"),
      focus_keyword: String(data.get("focus_keyword") ?? "") || null,
      seo_title: String(data.get("seo_title") ?? "") || null,
      seo_description: String(data.get("seo_description") ?? "") || null,
    };
    try {
      const endpoint = selected ? `blog/${selected.id}` : "blog";
      const response = await fetch(`/api/admin/${endpoint}`, { method: selected ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message ?? "Article could not be saved.");
      let saved = payload.data as BlogPostData;
      const image = data.get("image");
      if (image instanceof File && image.size > 0) {
        const cover = new FormData();
        cover.set("image", image);
        cover.set("image_alt", String(data.get("image_alt") ?? "") || saved.title);
        const upload = await fetch(`/api/admin/blog/${saved.id}/cover`, { method: "POST", body: cover });
        const uploadPayload = await upload.json();
        if (!upload.ok) throw new Error(`Article saved, but cover upload failed: ${uploadPayload.message ?? "Try again."}`);
        saved = uploadPayload.data as BlogPostData;
      }
      setSelected(saved);
      setNotice(saved.status === "published" ? "Article published and added to the public blog." : "Draft saved privately.");
      await load(wasNew ? 1 : page);
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  return <div className={styles.manager}>
    <section className={styles.library}><div className={styles.libraryHead}><div><span>EDITORIAL LIBRARY</span><h2>{total} articles</h2></div>{canEdit && <button type="button" onClick={() => { setSelected(null); setNotice(""); setError(""); }}>+ New article</button>}</div>
      <div className={styles.items}>{posts.length ? posts.map((post) => <button type="button" key={post.id} className={`${styles.item} ${selected?.id === post.id ? styles.selected : ""}`} onClick={() => { setSelected(post); setNotice(""); setError(""); }}><span className={styles.thumb}>{post.cover_image ? <Image src={post.cover_image.src} alt="" width={74} height={55} /> : "◇"}</span><span className={styles.itemCopy}><strong>{post.title}</strong><small>{post.category} · {post.reading_time} min</small></span><em className={post.status === "published" ? styles.published : ""}>{post.status}</em></button>) : <p className={styles.empty}>No posts yet. Start with an expert-reviewed draft.</p>}</div>
      {lastPage > 1 && <div className={styles.pager}><button type="button" disabled={page <= 1} onClick={() => void load(page - 1)}>← Previous</button><span>{page} / {lastPage}</span><button type="button" disabled={page >= lastPage} onClick={() => void load(page + 1)}>Next →</button></div>}
    </section>
    <section className={styles.editor}><header><span>{selected ? `ARTICLE / ${selected.category.toUpperCase()}` : "NEW ARTICLE"}</span><h2>{selected ? "Refine this story." : "Create a buyer resource."}</h2><p>Write useful, evidence-led guidance. Use <b>##</b> for section headings, blank lines between paragraphs and <b>-</b> for bullet lists.</p>{selected?.status === "published" && <Link href={`/blog/${selected.slug}/`} target="_blank">View published article ↗</Link>}</header>
      {notice && <p className={styles.notice} role="status">{notice}</p>}{error && <p className={styles.error} role="alert">{error}</p>}
      {canEdit ? <form key={selected?.id ?? "new"} onSubmit={save} className={styles.form}><div className={styles.two}><label>Article title<input name="title" defaultValue={selected?.title ?? ""} required minLength={5} maxLength={190} /></label><label>Category<input name="category" defaultValue={selected?.category ?? "Sourcing guidance"} required maxLength={80} /></label></div><div className={styles.two}><label>URL slug<input name="slug" defaultValue={selected?.slug ?? ""} maxLength={190} placeholder="Auto-generated from title" /></label><label>Author<input name="author_name" defaultValue={selected?.author_name ?? `${authorName} · Bonjour Bangladesh`} required maxLength={120} /></label></div><label>Article summary<textarea name="excerpt" defaultValue={selected?.excerpt ?? ""} required minLength={30} maxLength={500} rows={3} /></label><label>Article content<textarea className={styles.bodyEditor} name="body" defaultValue={selected?.body ?? "## Start with a clear buyer question\n\nWrite the first useful paragraph here."} required minLength={200} maxLength={60000} rows={20} /></label><div className={styles.divider}><strong>Cover image</strong><span>Landscape works best. JPG, PNG or WebP up to 10 MB; uploads are converted to WebP.</span></div>{selected?.cover_image && <div className={styles.currentCover}><Image src={selected.cover_image.src} alt={selected.cover_image.alt} width={220} height={135} /><span>Current cover · a new upload replaces it</span></div>}<div className={styles.two}><label>Cover file<input name="image" type="file" accept="image/jpeg,image/png,image/webp" /></label><label>Cover alt text<input name="image_alt" defaultValue={selected?.cover_image?.alt ?? ""} maxLength={190} /></label></div><div className={styles.divider}><strong>Search presentation</strong><span>One natural focus phrase. Avoid repeating keywords unnaturally.</span></div><label>Focus keyword<input name="focus_keyword" defaultValue={selected?.focus_keyword ?? ""} maxLength={120} /></label><label>SEO title<input name="seo_title" defaultValue={selected?.seo_title ?? ""} maxLength={70} placeholder="50–60 characters is a useful target" /></label><label>Meta description<textarea name="seo_description" defaultValue={selected?.seo_description ?? ""} maxLength={170} rows={2} /></label><div className={styles.publishBar}><label className={styles.featured}><input name="featured" type="checkbox" defaultChecked={selected?.featured ?? false} /> Feature on blog landing</label><label>Visibility<select name="status" defaultValue={selected?.status ?? "draft"}><option value="draft">Draft · private</option>{canPublish && <option value="published">Published · public</option>}</select></label><button type="submit" disabled={busy}>{busy ? "Saving…" : selected ? "Save article →" : "Create article →"}</button></div></form> : <p className={styles.empty}>Your role allows review only. An editor, manager or owner can make changes.</p>}
    </section>
  </div>;
}

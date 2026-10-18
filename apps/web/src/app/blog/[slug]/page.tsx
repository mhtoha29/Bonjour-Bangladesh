import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteriorShell, InquiryBand } from "@/components/interior-shell";
import { getBlogPost, getBlogPosts } from "@/lib/blogs";
import { publicRobots } from "@/lib/seo";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

function formatDate(value: string | null): string {
  if (!value) return "Editorial review";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

function headingId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return <>{blocks.map((block, index) => {
    const content = block.trim();
    if (content.startsWith("## ")) { const title = content.slice(3); return <h2 id={headingId(title)} key={`${index}-${title}`}>{title}</h2>; }
    if (content.startsWith("### ")) { const title = content.slice(4); return <h3 id={headingId(title)} key={`${index}-${title}`}>{title}</h3>; }
    const lines = content.split("\n");
    if (lines.every((line) => line.startsWith("- "))) return <ul key={index}>{lines.map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
    return <p key={index}>{content}</p>;
  })}</>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const title = post.seo_title ?? post.title;
  const description = post.seo_description ?? post.excerpt;
  return {
    title,
    description,
    keywords: post.focus_keyword ? [post.focus_keyword] : undefined,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { title, description, type: "article", publishedTime: post.published_at ?? undefined, modifiedTime: post.updated_at ?? undefined, images: post.cover_image ? [{ url: post.cover_image.src, alt: post.cover_image.alt }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: post.cover_image ? [post.cover_image.src] : undefined },
    robots: publicRobots,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const headings = post.body.split("\n").filter((line) => line.startsWith("## ")).map((line) => line.slice(3));
  const related = (await getBlogPosts()).posts.filter((item) => item.id !== post.id).slice(0, 2);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonjourbangladesh.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo_description ?? post.excerpt,
    image: post.cover_image ? new URL(post.cover_image.src, origin).toString() : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author_name },
    publisher: { "@type": "Organization", name: "Bonjour Bangladesh", url: origin },
    mainEntityOfPage: new URL(`/blog/${post.slug}/`, origin).toString(),
  };

  return <InteriorShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
    <article className={styles.article}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/blog/">Blog</Link><span>/</span><span aria-current="page">{post.title}</span></nav>
      <header className={styles.hero}><p>{post.category}</p><h1>{post.title}</h1><span>{post.excerpt}</span><div><strong>{post.author_name}</strong><small>{formatDate(post.published_at)} · {post.reading_time} min read</small></div></header>
      {post.cover_image && <figure className={styles.cover}><Image src={post.cover_image.src} alt={post.cover_image.alt} fill sizes="(max-width: 800px) 100vw, 88vw" priority /></figure>}
      <div className={styles.articleGrid}><aside><span>IN THIS ARTICLE</span><nav aria-label="Article sections">{headings.map((heading) => <a href={`#${headingId(heading)}`} key={heading}>{heading}</a>)}</nav><Link href="/request-a-quote/">Discuss your brief ↗</Link></aside><div className={styles.prose}><ArticleBody body={post.body} /></div></div>
    </article>
    {related.length > 0 && <section className={styles.related}><header><h2>CONTINUE READING</h2><p className={styles.relatedSubheadline}>More buyer guidance.</p></header><div>{related.map((item) => <article key={item.id}><span>{item.category} · {item.reading_time} MIN</span><h3><Link href={`/blog/${item.slug}/`}>{item.title}</Link></h3><p>{item.excerpt}</p><Link href={`/blog/${item.slug}/`}>Read article ↗</Link></article>)}</div></section>}
    <InquiryBand title="Turn the guidance into a product conversation." body="Send your product idea, reference or tech pack. We’ll discuss the sourcing, quality and compliance requirements that matter for your order." />
  </InteriorShell>;
}

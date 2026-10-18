import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InteriorHero, InteriorShell, InquiryBand } from "@/components/interior-shell";
import { getBlogPosts } from "@/lib/blogs";
import { getPaginationItems } from "@/lib/pagination";
import { publicRobots } from "@/lib/seo";
import styles from "./page.module.css";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export const metadata: Metadata = {
  title: "Apparel Sourcing Insights",
  description: "Practical guidance for international apparel buyers on garment sourcing, quality control, compliance and responsible production in Bangladesh.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Apparel Sourcing Insights | Bonjour Bangladesh",
    description: "Buyer-focused guidance on apparel sourcing, quality and responsible production.",
    type: "website",
  },
  robots: publicRobots,
};

function value(input: string | string[] | undefined): string | undefined {
  return typeof input === "string" ? input : undefined;
}

function pageHref(page: number, category?: string): string {
  const query = new URLSearchParams();
  if (page > 1) query.set("page", String(page));
  if (category) query.set("category", category);
  return `/blog/${query.size ? `?${query.toString()}` : ""}`;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = value(params.category);
  const blog = await getBlogPosts({ page: value(params.page), category });
  const items = getPaginationItems(blog.page, blog.totalPages);
  const featured = blog.page === 1 && !category ? blog.posts.find((post) => post.featured) : undefined;
  const posts = featured ? blog.posts.filter((post) => post.id !== featured.id) : blog.posts;

  return <InteriorShell>
    <InteriorHero eyebrow="THE SOURCING JOURNAL" title="Clear thinking for better garment decisions." lead="Practical, buyer-focused guidance on product development, manufacturing, quality, compliance and more responsible apparel sourcing from Bangladesh." />
    <nav className={styles.categories} aria-label="Blog categories"><Link href="/blog/" aria-current={!category ? "page" : undefined}>All insights</Link>{blog.categories.map((item) => <Link key={item} href={`/blog/?category=${encodeURIComponent(item)}`} aria-current={category === item ? "page" : undefined}>{item}</Link>)}</nav>
    {featured && <article className={styles.featured}>{featured.cover_image && <Link href={`/blog/${featured.slug}/`} className={styles.featuredMedia}><Image src={featured.cover_image.src} alt={featured.cover_image.alt} fill sizes="(max-width: 900px) 100vw, 58vw" priority /></Link>}<div className={styles.featuredCopy}><p>FEATURED PERSPECTIVE · {featured.category}</p><h2><Link href={`/blog/${featured.slug}/`}>{featured.title}</Link></h2><span>{featured.excerpt}</span><div><small>{featured.reading_time} min read</small><Link href={`/blog/${featured.slug}/`}>Read the article <span aria-hidden="true">→</span></Link></div></div></article>}
    <section className={styles.index} aria-labelledby="latest-insights"><header><div><h2 id="latest-insights">BUYER GUIDANCE</h2><p className={styles.indexSubheadline}>Latest insights.</p></div><span>{blog.total} expert-reviewed article{blog.total === 1 ? "" : "s"}</span></header>
      <div className={styles.grid}>{posts.map((post) => <article className={styles.card} key={post.id}>{post.cover_image && <Link href={`/blog/${post.slug}/`} className={styles.cardMedia}><Image src={post.cover_image.src} alt={post.cover_image.alt} fill sizes="(max-width: 650px) 100vw, (max-width: 1050px) 50vw, 33vw" /></Link>}<div className={styles.cardCopy}><p>{post.category} · {post.reading_time} MIN</p><h3><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h3><span>{post.excerpt}</span><Link href={`/blog/${post.slug}/`} className={styles.read}>Read insight <span aria-hidden="true">↗</span></Link></div></article>)}</div>
      {blog.totalPages > 1 && <nav className={styles.pagination} aria-label="Blog pages"><Link className={styles.direction} href={pageHref(Math.max(1, blog.page - 1), category)} aria-disabled={blog.page === 1}>← Previous</Link><div>{items.map((item) => typeof item === "number" ? <Link key={item} href={pageHref(item, category)} aria-current={item === blog.page ? "page" : undefined}>{item}</Link> : <span key={item} aria-hidden="true">…</span>)}</div><Link className={styles.direction} href={pageHref(Math.min(blog.totalPages, blog.page + 1), category)} aria-disabled={blog.page === blog.totalPages}>Next →</Link></nav>}
    </section>
    <InquiryBand title="Have a sourcing question for your next collection?" body="Share the product, quantity, destination and requirements you are working with. Our team can discuss the most relevant next step." />
  </InteriorShell>;
}

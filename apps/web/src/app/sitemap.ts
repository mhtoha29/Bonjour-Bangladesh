import type { MetadataRoute } from "next";
import { indexingEnabled } from "@/lib/seo";

const staticPaths = ["/", "/products/", "/about/", "/capabilities/", "/quality-compliance/", "/quality-control/", "/compliance-responsible-sourcing/", "/sustainability/", "/blog/", "/contact/", "/faq/", "/request-a-quote/"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!indexingEnabled) return [];
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonjourbangladesh.com";
  const api = new URL(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site");
  const productApi = new URL("/api/v1/products/slugs", api.origin);
  const blogApi = new URL("/api/v1/blog/slugs", api.origin);
  const [productResponse, blogResponse] = await Promise.all([
    fetch(productApi, { cache: "no-store" }).catch(() => null),
    fetch(blogApi, { cache: "no-store" }).catch(() => null),
  ]);
  const products = productResponse?.ok ? (await productResponse.json() as { products: { slug: string; updated_at: string }[] }).products : [];
  const posts = blogResponse?.ok ? (await blogResponse.json() as { posts: { slug: string; updated_at: string }[] }).posts : [];
  return [
    ...staticPaths.map((path) => ({ url: new URL(path, origin).toString() })),
    ...products.map((product) => ({ url: new URL(`/products/${product.slug}/`, origin).toString(), lastModified: new Date(product.updated_at) })),
    ...posts.map((post) => ({ url: new URL(`/blog/${post.slug}/`, origin).toString(), lastModified: new Date(post.updated_at) })),
  ];
}

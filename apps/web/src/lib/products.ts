import { z } from "zod";
import type { PreviewStyle } from "@/content/catalog-preview";

const productSchema = z.object({
  id: z.number(), slug: z.string(), code: z.string().nullable(), name: z.string(),
  audience: z.enum(["men", "women", "kids"]),
  construction: z.enum(["knit", "woven", "fully-fashioned-knitwear"]),
  type: z.string(), description: z.string().nullable(),
  details: z.record(z.string(), z.string()),
  image: z.object({ src: z.string(), alt: z.string() }).nullable(),
  status: z.enum(["draft", "published"]),
  seo_title: z.string().nullable(), seo_description: z.string().nullable(),
});

export type ProductData = z.infer<typeof productSchema>;
export type ProductFilters = { q?: string; audience?: string; construction?: string; type?: string; page?: string };

export function toCatalogStyle(product: ProductData): PreviewStyle {
  return {
    slug: product.slug,
    code: product.code ?? `BB-${product.id}`,
    name: product.name,
    audience: product.audience,
    construction: product.construction,
    type: product.type,
    description: product.description ?? undefined,
    image: product.image ?? undefined,
    details: Object.entries(product.details).map(([label, value]) => ({ label: label.replaceAll("_", " "), value })),
  };
}

export async function getProducts(filters: ProductFilters = {}) {
  const url = new URL(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site");
  url.pathname = "/api/v1/products";
  url.search = "";
  for (const [key, value] of Object.entries(filters)) if (value) url.searchParams.set(key, value);
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error();
    const payload = z.object({ data: z.array(productSchema), meta: z.object({ total: z.number(), current_page: z.number(), last_page: z.number() }), types: z.array(z.string()), live_count: z.number() }).parse(await response.json());
    return { products: payload.data, total: payload.meta.total, page: payload.meta.current_page, totalPages: payload.meta.last_page, types: payload.types, liveCount: payload.live_count };
  } catch {
    return { products: [], total: 0, page: 1, totalPages: 1, types: [], liveCount: 0 };
  }
}

export async function getProduct(slug: string): Promise<ProductData | null> {
  const url = new URL(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site");
  url.pathname = `/api/v1/products/${encodeURIComponent(slug)}`;
  url.search = "";
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return null;
    return productSchema.parse((await response.json()).data);
  } catch {
    return null;
  }
}

import { z } from "zod";

const blogPostSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  excerpt: z.string(),
  body: z.string(),
  author_name: z.string(),
  cover_image: z.object({ src: z.string(), alt: z.string() }).nullable(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  seo_title: z.string().nullable(),
  seo_description: z.string().nullable(),
  focus_keyword: z.string().nullable(),
  reading_time: z.number(),
  published_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export type BlogPostData = z.infer<typeof blogPostSchema>;

const blogCollectionSchema = z.object({
  data: z.array(blogPostSchema),
  meta: z.object({ total: z.number(), current_page: z.number(), last_page: z.number() }),
  categories: z.array(z.string()),
});

function apiUrl(path: string): URL {
  const url = new URL(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site");
  url.pathname = path;
  url.search = "";
  return url;
}

export async function getBlogPosts(filters: { page?: string; category?: string } = {}) {
  const url = apiUrl("/api/v1/blog");
  for (const [key, value] of Object.entries(filters)) if (value) url.searchParams.set(key, value);
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Blog is unavailable (${response.status})`);
  const payload = blogCollectionSchema.parse(await response.json());
  return { posts: payload.data, total: payload.meta.total, page: payload.meta.current_page, totalPages: payload.meta.last_page, categories: payload.categories };
}

export async function getBlogPost(slug: string): Promise<BlogPostData | null> {
  const response = await fetch(apiUrl(`/api/v1/blog/${encodeURIComponent(slug)}`), { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Article is unavailable (${response.status})`);
  return blogPostSchema.parse((await response.json()).data);
}

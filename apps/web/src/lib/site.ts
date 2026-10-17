import { z } from "zod";

const linkSchema = z.object({ label: z.string(), href: z.string().startsWith("/") });
const termSchema = z.object({ slug: z.string(), label: z.string() });
const mediaSchema = z.object({
  url: z.string(), alt: z.string(), width: z.number().nullable(), height: z.number().nullable(),
});

const siteSchema = z.object({
  data: z.object({
    siteName: z.string(),
    seo: z.object({ title: z.string().nullable(), description: z.string().nullable() }),
    navigation: z.array(linkSchema),
    hero: z.object({
      eyebrow: z.string(), title: z.string(), description: z.string(),
      primaryAction: linkSchema, secondaryAction: linkSchema, media: mediaSchema.nullable(),
      mobileMedia: mediaSchema.nullable(),
    }),
    finder: z.object({
      audiences: z.array(termSchema), constructions: z.array(termSchema), productTypes: z.array(termSchema),
    }),
  }),
});

export type SiteData = z.infer<typeof siteSchema>["data"];

export async function getSite(): Promise<SiteData> {
  const response = await fetch(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Site content is unavailable (${response.status})`);
  }
  return siteSchema.parse(await response.json()).data;
}

export function mediaUrl(path: string): string {
  return new URL(path, process.env.MEDIA_ORIGIN ?? "http://127.0.0.1:8000").toString();
}

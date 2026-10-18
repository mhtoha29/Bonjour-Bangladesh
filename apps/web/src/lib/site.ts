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

const fallbackSite: SiteData = {
  siteName: "Bonjour Bangladesh",
  seo: {
    title: "Bonjour Bangladesh | Garment Buying House & Sourcing Partner",
    description: "Your trusted garment buying house and sourcing partner in Bangladesh.",
  },
  navigation: [
    { label: "Products", href: "/products/" },
    { label: "Capabilities", href: "/capabilities/" },
    { label: "Quality & Compliance", href: "/quality-and-compliance/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],
  hero: {
    eyebrow: "BONJOUR BANGLADESH · SINCE 2010",
    title: "Your Trusted Garment Buying House & Sourcing Partner in Bangladesh",
    description: "From product development and sourcing to quality follow-up and shipment coordination, we help international buyers move with confidence.",
    primaryAction: { label: "Explore Products", href: "/products/" },
    secondaryAction: { label: "Request a Quote", href: "/request-a-quote/" },
    media: null,
    mobileMedia: null,
  },
  finder: { audiences: [], constructions: [], productTypes: [] },
};

export async function getSite(): Promise<SiteData> {
  try {
    const response = await fetch(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site", {
      cache: "no-store",
    });
    if (!response.ok) return fallbackSite;
    return siteSchema.parse(await response.json()).data;
  } catch {
    return fallbackSite;
  }
}

export function mediaUrl(path: string): string {
  return new URL(path, process.env.MEDIA_ORIGIN ?? "http://127.0.0.1:8000").toString();
}

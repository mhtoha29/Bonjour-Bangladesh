import { z } from "zod";

const mediaSchema = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number().nullable(),
  height: z.number().nullable(),
});

const foundationSchema = z.object({
  data: z.object({
    title: z.string(),
    gallery: z.array(z.object({
      slot: z.number(),
      caption: z.string(),
      media: mediaSchema.nullable(),
    })),
  }),
});

export type FoundationData = z.infer<typeof foundationSchema>["data"];

export const fallbackFoundation: FoundationData = {
  title: "Hashmat Ali Foundation",
  gallery: [1, 2, 3].map((slot) => ({ slot, caption: "", media: null })),
};

export async function getFoundation(): Promise<FoundationData> {
  try {
    const siteUrl = new URL(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site");
    const response = await fetch(new URL("/api/v1/foundation", siteUrl.origin), { cache: "no-store" });
    if (!response.ok) return fallbackFoundation;
    return foundationSchema.parse(await response.json()).data;
  } catch {
    return fallbackFoundation;
  }
}

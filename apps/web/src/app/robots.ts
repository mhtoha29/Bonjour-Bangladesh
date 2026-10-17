import type { MetadataRoute } from "next";
import { indexingEnabled } from "@/lib/seo";

// Staging safeguard: remove only after real product/media, legal and evidence approval.
export default function robots(): MetadataRoute.Robots {
  return indexingEnabled
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] }, sitemap: new URL("/sitemap.xml", process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonjourbangladesh.com").toString() }
    : { rules: { userAgent: "*", disallow: "/" } };
}

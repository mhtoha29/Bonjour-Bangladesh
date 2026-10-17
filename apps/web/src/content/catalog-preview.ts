export type PreviewStyle = {
  slug: string;
  code: string;
  name: string;
  description?: string;
  image?: { src: string; alt: string };
  details?: ReadonlyArray<{ label: string; value: string }>;
  audience: "men" | "women" | "kids";
  construction: "knit" | "woven" | "fully-fashioned-knitwear";
  type: string;
};

// Frontend layout examples only. Replace with approved Laravel product records before indexing.
export const previewStyles: PreviewStyle[] = [
  { slug: "preview-relaxed-tee", code: "PREVIEW-01", name: "Relaxed jersey tee", image: { src: "/products/editorial/featured-relaxed-jersey.webp", alt: "Model wearing a premium relaxed jersey T-shirt" }, audience: "men", construction: "knit", type: "T-shirt" },
  { slug: "preview-overshirt", code: "PREVIEW-02", name: "Casual overshirt", image: { src: "/products/editorial/featured-woven-overshirt.webp", alt: "Model wearing a premium woven casual overshirt" }, audience: "men", construction: "woven", type: "Shirt" },
  { slug: "preview-crewneck", code: "PREVIEW-03", name: "Shaped crewneck", image: { src: "/products/editorial/featured-crewneck-knit.webp", alt: "Model wearing a premium fully fashioned crewneck knit" }, audience: "men", construction: "fully-fashioned-knitwear", type: "Sweater" },
  { slug: "preview-soft-jersey", code: "PREVIEW-04", name: "Soft jersey top", image: { src: "/products/editorial/featured-soft-jersey.webp", alt: "Model wearing a premium soft jersey top" }, audience: "women", construction: "knit", type: "Top" },
  { slug: "preview-tailored-shirt", code: "PREVIEW-05", name: "Contemporary shirt", image: { src: "/products/editorial/women-woven.webp", alt: "Women’s contemporary woven shirt product direction" }, audience: "women", construction: "woven", type: "Shirt" },
  { slug: "preview-knit-cardigan", code: "PREVIEW-06", name: "Shaped cardigan", image: { src: "/products/editorial/women-knitwear.webp", alt: "Women’s shaped cardigan product direction" }, audience: "women", construction: "fully-fashioned-knitwear", type: "Cardigan" },
  { slug: "preview-kids-tee", code: "PREVIEW-07", name: "Everyday jersey tee", image: { src: "/products/editorial/kids-knit.webp", alt: "Kids’ everyday jersey tee product direction" }, audience: "kids", construction: "knit", type: "T-shirt" },
  { slug: "preview-kids-shirt", code: "PREVIEW-08", name: "Lightweight woven shirt", image: { src: "/products/editorial/kids-woven.webp", alt: "Kids’ lightweight woven shirt product direction" }, audience: "kids", construction: "woven", type: "Shirt" },
  { slug: "preview-kids-sweater", code: "PREVIEW-09", name: "Shaped knit sweater", image: { src: "/products/editorial/kids-knitwear.webp", alt: "Kids’ shaped knit sweater product direction" }, audience: "kids", construction: "fully-fashioned-knitwear", type: "Sweater" },
];

export function findPreviewStyle(slug: string) {
  return previewStyles.find((style) => style.slug === slug);
}

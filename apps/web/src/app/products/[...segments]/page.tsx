import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogView, type CatalogFilters } from "@/components/catalog-view";
import { InteriorShell, InquiryBand } from "@/components/interior-shell";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { audiences, constructions } from "@/content/site-content";
import { findPreviewStyle, previewStyles, type PreviewStyle } from "@/content/catalog-preview";
import { getProduct, getProducts, toCatalogStyle } from "@/lib/products";
import { publicRobots } from "@/lib/seo";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const audienceCopy: Record<string, { title: string; lead: string }> = {
  men: { title: "Men’s apparel sourcing.", lead: "Explore knit, woven and fully fashioned directions for men, from everyday essentials to more developed garment concepts. Share your specifications to discuss material, fit and production options." },
  women: { title: "Women’s apparel sourcing.", lead: "Browse women’s knit, woven and fully fashioned directions, then develop the fit, fabric, trims and finish around your collection brief." },
  kids: { title: "Kids’ apparel sourcing.", lead: "Explore children’s styles across knit, woven and fully fashioned construction. Product and destination-market safety requirements are reviewed for each inquiry." },
};

const constructionCopy: Record<string, Record<string, { title: string; lead: string }>> = {
  men: {
    knit: { title: "Men’s knitwear sourcing.", lead: "Explore knit constructions for men’s casual and everyday apparel. Discuss fabric, GSM, fit and finishing for your brief." },
    woven: { title: "Men’s woven apparel sourcing.", lead: "Browse woven men’s garments where fabric selection, fit, construction and finishing define the final product." },
    "fully-fashioned-knitwear": { title: "Men’s fully fashioned knitwear sourcing.", lead: "Explore shaped knitwear possibilities for men. Yarn, gauge, fit and finishing are reviewed against the concept and selected partner capability." },
  },
  women: {
    knit: { title: "Women’s knitwear sourcing.", lead: "Browse knit styles and discuss fabric, drape, fit, prints or embellishment according to your collection direction." },
    woven: { title: "Women’s woven apparel sourcing.", lead: "Explore woven styles and develop fabric, silhouette, trims and finishing around approved specifications." },
    "fully-fashioned-knitwear": { title: "Women’s fully fashioned knitwear sourcing.", lead: "Review shaped knitwear directions, with yarn and construction options assessed for the intended look and fit." },
  },
  kids: {
    knit: { title: "Kids’ knitwear sourcing.", lead: "Explore children’s knit styles while reviewing comfort, fit, materials and applicable product-safety requirements." },
    woven: { title: "Kids’ woven apparel sourcing.", lead: "Browse woven children’s garments and discuss construction, sizing, material and buyer-specific safety details." },
    "fully-fashioned-knitwear": { title: "Kids’ fully fashioned knitwear sourcing.", lead: "Explore shaped knitwear for children, with fit, yarn and product-safety requirements reviewed for the order." },
  },
};

const getValue = (value: string | string[] | undefined) => typeof value === "string" ? value : undefined;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const [first, second] = segments;
  const liveProduct = segments.length === 1 && !audienceCopy[first] ? await getProduct(first) : null;
  const style = segments.length === 1 ? liveProduct ? toCatalogStyle(liveProduct) : findPreviewStyle(first) : undefined;
  const page = segments.length === 1 ? audienceCopy[first] : constructionCopy[first]?.[second];
  return {
    title: liveProduct?.seo_title ?? (style ? `${style.name}${liveProduct ? "" : " — Style Preview"}` : page?.title ?? "Products"),
    description: liveProduct?.seo_description ?? (style ? liveProduct?.description ?? `Frontend product-detail preview for ${style.name}; specifications and photography pending client approval.` : page?.lead),
    alternates: { canonical: `/products/${segments.join("/")}/` },
    robots: publicRobots,
  };
}

async function ProductDetail({ style, preview }: { style: PreviewStyle; preview: boolean }) {
  const audience = audiences.find((item) => item.slug === style.audience);
  const construction = constructions.find((item) => item.slug === style.construction);
  const related = preview ? previewStyles.filter((item) => item.slug !== style.slug && item.audience === style.audience).slice(0, 3) : (await getProducts({ audience: style.audience })).products.filter((item) => item.slug !== style.slug).slice(0, 3).map(toCatalogStyle);
  const details = [
    { label: "Audience", value: audience?.title ?? "" },
    { label: "Construction", value: construction?.label ?? "" },
    { label: "Product type", value: style.type },
    ...(style.details ?? []),
  ];
  return (
    <InteriorShell>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products/">Products</Link><span>/</span><Link href={`/products/${style.audience}/`}>{audience?.label}</Link><span>/</span><span aria-current="page">{style.name}</span></nav>
      <section className={styles.detail}>
        <ProductGallery image={style.image} productName={style.name} />
        <div className={styles.summary}><p className={styles.eyebrow}>STYLE {style.code}{preview ? " · LAYOUT PREVIEW" : ""}</p><h1>{style.name}</h1><p className={styles.lead}>{style.description ?? (preview ? "This page demonstrates the final product-detail layout. An approved product description, garment photo and specifications will replace this preview before publication." : "Discuss the specifications for this garment with our sourcing team.")}</p>
          <dl>{details.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
          {preview && !style.details?.length && <p className={styles.disclaimer}>Fabric, composition, fit, colours and size information will appear here when the product is uploaded and approved.</p>}
          <Link className={styles.inquire} href={`/request-a-quote/?style=${encodeURIComponent(style.code)}`}>Inquire About This Style <span aria-hidden="true">→</span></Link>
          <p className={styles.disclaimer}>{preview ? "Demo style only. " : ""}Pricing, capacity, MOQ and delivery are reviewed for each inquiry.</p>
          <div className={styles.direct}><a href="mailto:farooq@bonjourbangladesh.com">Email our team ↗</a><a href="https://wa.me/8801798775477" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div>
        </div>
      </section>
      <section className={styles.development}><div><h2 className={styles.sectionHeadline}>DEVELOPMENT POSSIBILITIES</h2><p className={styles.sectionSubheadline}>Make the style your own.</p></div><p>Share a tech pack or reference with your fabric, fit, quantity and destination requirements. We’ll review suitable development options with the appropriate manufacturing partners.</p></section>
      {related.length > 0 && <section className={styles.related}><div><h2 className={styles.sectionHeadline}>KEEP EXPLORING</h2><p className={styles.sectionSubheadline}>{preview ? "Related style previews." : "Related styles."}</p></div><div>{related.map((item) => <ProductCard key={item.slug} style={item} preview={preview} />)}</div></section>}
      <InquiryBand title="Have your own design?" body="Send your reference or tech pack. We’ll discuss development and sourcing options for your specific product." />
    </InteriorShell>
  );
}

export default async function ProductsSubPage({ params, searchParams }: Props) {
  const { segments } = await params;
  const paramsValue = await searchParams;
  const filters: CatalogFilters = { q: getValue(paramsValue.q), type: getValue(paramsValue.type), page: getValue(paramsValue.page) };
  if (segments.length === 1) {
    const [first] = segments;
    const liveProduct = !audienceCopy[first] ? await getProduct(first) : null;
    if (liveProduct) return <ProductDetail style={toCatalogStyle(liveProduct)} preview={false} />;
    const style = findPreviewStyle(first);
    if (style) return <ProductDetail style={style} preview />;
    const page = audienceCopy[first];
    if (page) return <CatalogView title={page.title} lead={page.lead} filters={filters} fixedAudience={first} />;
  }
  if (segments.length === 2) {
    const [audience, construction] = segments;
    const page = constructionCopy[audience]?.[construction];
    if (page) return <CatalogView title={page.title} lead={page.lead} filters={filters} fixedAudience={audience} fixedConstruction={construction} />;
  }
  notFound();
}

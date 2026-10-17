import Link from "next/link";
import { redirect } from "next/navigation";
import { InteriorHero, InteriorShell, InquiryBand } from "./interior-shell";
import { ProductCard } from "./product-card";
import { audiences, constructions } from "@/content/site-content";
import { previewStyles } from "@/content/catalog-preview";
import { getProducts, toCatalogStyle } from "@/lib/products";
import { getPaginationItems } from "@/lib/pagination";
import styles from "./catalog-view.module.css";

export type CatalogFilters = {
  q?: string;
  audience?: string;
  construction?: string;
  type?: string;
  page?: string;
};

type CatalogViewProps = {
  title: string;
  lead: string;
  filters: CatalogFilters;
  fixedAudience?: string;
  fixedConstruction?: string;
};

const pageSize = 12;
const previewProductTypes = [...new Set(previewStyles.map((style) => style.type))].sort();

function makeCatalogHref(filters: CatalogFilters) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) if (value) query.set(key, value);
  return `/products/${query.size ? `?${query.toString()}` : ""}`;
}

export async function CatalogView({ title, lead, filters, fixedAudience, fixedConstruction }: CatalogViewProps) {
  const active = { ...filters, audience: fixedAudience ?? filters.audience, construction: fixedConstruction ?? filters.construction };
  const catalog = await getProducts(active);
  const isPreview = catalog.liveCount === 0;
  const search = active.q?.trim().toLowerCase() ?? "";
  const previewMatches = previewStyles.filter((style) =>
    (!active.audience || style.audience === active.audience) &&
    (!active.construction || style.construction === active.construction) &&
    (!active.type || style.type.toLowerCase() === active.type.toLowerCase()) &&
    (!search || `${style.name} ${style.code} ${style.type}`.toLowerCase().includes(search))
  );
  const requestedPage = Number.parseInt(active.page ?? "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1;
  const total = isPreview ? previewMatches.length : catalog.total;
  const totalPages = isPreview ? Math.max(1, Math.ceil(total / pageSize)) : Math.max(1, catalog.totalPages);
  if (!isPreview && total > 0 && page > totalPages) redirect(makeCatalogHref({ ...active, page: String(totalPages) }));
  const currentPage = isPreview ? Math.min(page, totalPages) : catalog.page;
  const visible = isPreview ? previewMatches.slice((currentPage - 1) * pageSize, currentPage * pageSize) : catalog.products.map(toCatalogStyle);
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(total, rangeStart + visible.length - 1);
  const paginationItems = getPaginationItems(currentPage, totalPages);
  const productTypes = isPreview ? previewProductTypes : catalog.types;
  const chips = [
    active.q && { label: `Search: ${active.q}`, key: "q" },
    active.audience && { label: `Category: ${active.audience}`, key: "audience" },
    active.construction && { label: `Construction: ${active.construction.replaceAll("-", " ")}`, key: "construction" },
    active.type && { label: `Type: ${active.type}`, key: "type" },
  ].filter((chip): chip is { label: string; key: string } => Boolean(chip));

  return (
    <InteriorShell>
      <InteriorHero eyebrow="APPAREL PRODUCT DIRECTIONS" title={title} lead={lead} />
      <section className={styles.audienceRow} aria-label="Browse by audience">{audiences.map((audience) => <Link key={audience.slug} href={`/products/${audience.slug}/`} aria-current={active.audience === audience.slug ? "page" : undefined}>{audience.title} <span aria-hidden="true">↗</span></Link>)}</section>
      {active.audience && <nav className={styles.constructionRow} aria-label="Browse by construction">{constructions.map((construction) => <Link key={construction.slug} href={`/products/${active.audience}/${construction.slug}/`} aria-current={active.construction === construction.slug ? "page" : undefined}>{construction.label}</Link>)}</nav>}
      <section className={styles.catalog} aria-label="Product catalog">
        <aside className={styles.filters}>
          <h2>Find a direction</h2>
          <p>{isPreview ? "Explore layout examples while approved products and images are prepared." : "Filter published garment styles, then send us your brief."}</p>
          <form action="/products/" method="get">
            <label>Search style or code<input type="search" name="q" defaultValue={active.q ?? ""} placeholder="e.g. shirt" /></label>
            <label>Category<select name="audience" defaultValue={active.audience ?? ""}><option value="">All categories</option>{audiences.map((item) => <option value={item.slug} key={item.slug}>{item.label}</option>)}</select></label>
            <label>Construction<select name="construction" defaultValue={active.construction ?? ""}><option value="">All constructions</option>{constructions.map((item) => <option value={item.slug} key={item.slug}>{item.label}</option>)}</select></label>
            <label>Product type<select name="type" defaultValue={active.type ?? ""}><option value="">All product types</option>{productTypes.map((type) => <option value={type} key={type}>{type}</option>)}</select></label>
            <button type="submit">Apply filters <span aria-hidden="true">→</span></button>
          </form>
        </aside>
        <div className={styles.results}>
          <div className={styles.resultTop}><div><h2 className={styles.resultHeadline}>{isPreview ? "STAGING CATALOG" : "PRODUCT CATALOG"}</h2><p className={styles.resultSubheadline}>Explore style possibilities.</p><span>{total} {isPreview ? `layout preview${total === 1 ? "" : "s"}` : `published style${total === 1 ? "" : "s"}`}</span></div><Link href="/request-a-quote/">Can’t find your garment? Share a brief ↗</Link></div>
          {chips.length > 0 && <div className={styles.chips}>{chips.map((chip) => {
            const next = { ...active, [chip.key]: undefined, page: undefined };
            return <Link key={chip.key} href={makeCatalogHref(next)}>{chip.label} <span aria-hidden="true">×</span></Link>;
          })}<Link href="/products/">Clear all</Link></div>}
          {visible.length > 0 && <div className={styles.catalogStatus}><span>Showing {rangeStart}–{rangeEnd} of {total}</span><span>Page {currentPage} of {totalPages}</span></div>}
          {visible.length > 0 ? <div className={styles.grid}>{visible.map((style) => <ProductCard style={style} preview={isPreview} key={style.slug} />)}</div> : <div className={styles.empty}><h3>No styles match these filters.</h3><p>Clear a filter or send us your brief—we may be able to source a suitable option.</p><Link href="/products/">Clear filters ↗</Link></div>}
          {totalPages > 1 && <nav className={styles.pagination} aria-label="Catalog pages">
            {currentPage > 1 ? <Link className={styles.pageDirection} rel="prev" href={makeCatalogHref({ ...active, page: String(currentPage - 1) })}>← Previous</Link> : <span className={styles.pageDirection} aria-disabled="true">← Previous</span>}
            <div>{paginationItems.map((item) => typeof item === "number" ? <Link key={item} href={makeCatalogHref({ ...active, page: String(item) })} aria-label={`Page ${item}`} aria-current={currentPage === item ? "page" : undefined}>{String(item).padStart(2, "0")}</Link> : <span key={item} className={styles.ellipsis} aria-hidden="true">…</span>)}</div>
            {currentPage < totalPages ? <Link className={styles.pageDirection} rel="next" href={makeCatalogHref({ ...active, page: String(currentPage + 1) })}>Next →</Link> : <span className={styles.pageDirection} aria-disabled="true">Next →</span>}
          </nav>}
        </div>
      </section>
      <InquiryBand title="Need a different product?" body="Share a reference image, tech pack or a short description. We’ll discuss the development route for your specific brief." />
    </InteriorShell>
  );
}

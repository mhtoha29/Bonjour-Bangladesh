import type { Metadata } from "next";
import { CatalogView, type CatalogFilters } from "@/components/catalog-view";
import { publicRobots } from "@/lib/seo";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const getValue = (value: string | string[] | undefined) => typeof value === "string" ? value : undefined;

export const metadata: Metadata = {
  title: "Apparel Products",
  description: "Explore men’s, women’s and kids’ knit, woven and fully fashioned apparel directions from Bonjour Bangladesh.",
  alternates: { canonical: "/products/" },
  robots: publicRobots,
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters: CatalogFilters = {
    q: getValue(params.q),
    audience: getValue(params.audience),
    construction: getValue(params.construction),
    type: getValue(params.type),
    page: getValue(params.page),
  };
  return <CatalogView title="Explore apparel product possibilities." lead="Browse style directions across men’s, women’s and kids’ categories. Filter by construction and product type, then inquire about a style or share your own brief. These are sourcing references, not fixed-price stock items." filters={filters} />;
}

export type PaginationItem = number | "ellipsis-left" | "ellipsis-right";

export function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const visible = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);
  const items: PaginationItem[] = [];

  visible.forEach((page, index) => {
    const previous = visible[index - 1];
    if (previous && page - previous > 1) items.push(previous === 1 ? "ellipsis-left" : "ellipsis-right");
    items.push(page);
  });

  return items;
}

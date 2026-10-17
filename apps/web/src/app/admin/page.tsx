import type { Metadata } from "next";
import { AdminWorkspace } from "@/components/admin-workspace";

export const metadata: Metadata = { title: "Admin studio", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminWorkspace />;
}

import type { Metadata } from "next";
import { AdminResetForm } from "@/components/admin-reset-form";

export const metadata: Metadata = { title: "Reset admin access", robots: { index: false, follow: false } };

type Props = { searchParams: Promise<{ token?: string; email?: string }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token, email } = await searchParams;
  return <AdminResetForm token={token ?? ""} email={email ?? ""} />;
}

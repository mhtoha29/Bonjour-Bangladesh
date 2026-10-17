import Link from "next/link";
import { InteriorShell } from "@/components/interior-shell";

export default function NotFound() {
  return <InteriorShell><div style={{ maxWidth: 720, padding: "110px 0" }}><p style={{ color: "var(--green)", fontWeight: 850, letterSpacing: ".16em", fontSize: 12 }}>PAGE NOT FOUND</p><h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6vw, 82px)", fontWeight: 500, lineHeight: 1.02, margin: "18px 0" }}>This route doesn’t have a page yet.</h1><p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>Explore the product directions or return to the homepage to find the right next step.</p><Link href="/" style={{ display: "inline-flex", marginTop: 20, color: "var(--green-deep)", fontWeight: 800, textDecoration: "underline" }}>Back to homepage ↗</Link></div></InteriorShell>;
}

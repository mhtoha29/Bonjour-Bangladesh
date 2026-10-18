import Link from "next/link";
import { InteriorShell } from "@/components/interior-shell";

export default function NotFound() {
  return <InteriorShell><div style={{ maxWidth: 720, padding: "110px 0" }}><h1 style={{ fontSize: "clamp(40px, 5vw, 70px)", fontWeight: 600, lineHeight: 1, letterSpacing: "-.045em", margin: 0 }}>PAGE NOT FOUND</h1><p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.2vw, 45px)", fontWeight: 480, lineHeight: 1.05, letterSpacing: "-.035em", margin: "18px 0" }}>This route doesn’t have a page yet.</p><p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>Explore the product directions or return to the homepage to find the right next step.</p><Link href="/" style={{ display: "inline-flex", marginTop: 20, color: "var(--green-deep)", fontWeight: 800, textDecoration: "underline" }}>Back to homepage ↗</Link></div></InteriorShell>;
}

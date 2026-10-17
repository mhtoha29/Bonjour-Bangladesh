"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import styles from "./admin-workspace.module.css";

export function AdminResetForm({ token, email }: { token: string; email: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending"); setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, token, password: data.get("password"), password_confirmation: data.get("password_confirmation") }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message ?? "This reset link could not be used.");
      setState("sent");
    } catch (caught) { setError((caught as Error).message); setState("error"); }
  }

  return <main id="main-content" className={styles.loginPage}><div className={styles.loginVisual}><Link href="/" className={styles.backHome}>← Back to website</Link><div><span>BONJOUR BANGLADESH · PRIVATE STUDIO</span><h1>Secure by design.</h1><p>Your workspace access remains personal to you.</p></div><small>Since 2010 · Dhaka, Bangladesh</small></div><div className={styles.loginSide}><div className={styles.loginCard}><Image src="/bonjour-logo.png" alt="Bonjour Bangladesh" width={154} height={154} priority className={styles.loginLogo} /><p className={styles.kicker}>TEAM ACCESS</p><h2>Set a new password.</h2>{state === "sent" ? <><p className={styles.notice}>Password updated. You can sign in now.</p><Link className={styles.textButton} href="/admin/">Go to sign in →</Link></> : token && email ? <><p className={styles.loginLead}>Use a unique password of at least 12 characters with letters and numbers.</p>{error && <p className={styles.error} role="alert">{error}</p>}<form className={styles.loginForm} onSubmit={submit}><label>New password<input name="password" type="password" minLength={12} autoComplete="new-password" required /></label><label>Confirm password<input name="password_confirmation" type="password" minLength={12} autoComplete="new-password" required /></label><button type="submit" disabled={state === "sending"}>{state === "sending" ? "Saving…" : "Save new password →"}</button></form></> : <p className={styles.error}>This reset link is incomplete. Request a new link from the sign-in page.</p>}<Link className={styles.textButton} href="/admin/">Return to sign in</Link></div></div></main>;
}

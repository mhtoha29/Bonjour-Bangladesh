"use client";

import { useState, type FormEvent } from "react";
import styles from "./contact-inquiry-form.module.css";

export function ContactInquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("source", "contact");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", body: data });
      if (!response.ok) throw new Error("Inquiry could not be submitted");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return <section className={styles.card} aria-labelledby="contact-form-title">
    <div className={styles.topline}><span>QUICK INQUIRY</span><span>01—04</span></div>
    <h2 id="contact-form-title">Start with a short brief.</h2>
    <p>Tell us the product and destination. Detailed specifications can follow.</p>
    {state === "sent" ? <div className={styles.success} role="status"><strong>Your inquiry is in our dashboard.</strong><span>Our team will review it and follow up by email.</span><button type="button" onClick={() => setState("idle")}>Send another inquiry</button></div> : <form onSubmit={submit}>
      <div className={styles.twoColumns}><label>Full name<input name="name" autoComplete="name" required minLength={2} maxLength={120} /></label><label>Business email<input name="email" type="email" autoComplete="email" required maxLength={190} /></label></div>
      <label>Company<input name="company" autoComplete="organization" maxLength={190} /></label>
      <label>Product or requirement<textarea name="message" rows={3} required minLength={8} maxLength={4000} placeholder="Product, quantity, destination or timing" /></label>
      <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {state === "error" && <span className={styles.error} role="alert">We could not send this just now. Please try again or contact us by email.</span>}
      <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send inquiry"}<span aria-hidden="true">↗</span></button>
    </form>}
    <small>Submissions go directly to the Bonjour buyer-inquiry dashboard.</small>
  </section>;
}

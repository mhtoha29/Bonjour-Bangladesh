"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { audiences, brand, constructions } from "@/content/site-content";
import styles from "./rfq-form.module.css";

export function RfqForm({ initialStyle }: { initialStyle?: string }) {
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentError, setAttachmentError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [reference, setReference] = useState<number | null>(null);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (attachmentError) return;
    const form = event.currentTarget;
    const source = new FormData(form);
    const data = new FormData();
    data.set("source", "quote");
    for (const [sourceKey, targetKey] of [["Full_name", "name"], ["Business_email", "email"], ["Company", "company"], ["Phone_or_WhatsApp", "phone"]]) {
      data.set(targetKey, String(source.get(sourceKey) ?? ""));
    }
    const garment = String(source.get("Garment_type") ?? "");
    const message = String(source.get("Message") ?? "").trim();
    data.set("message", `Product inquiry: ${garment}${message ? ` — ${message}` : ""}`);
    for (const [key, value] of source.entries()) {
      if (["Full_name", "Business_email", "Company", "Phone_or_WhatsApp", "Garment_type", "Message", "attachment"].includes(key) || !String(value).trim()) continue;
      data.set(`details[${key}]`, String(value));
    }
    const attachment = source.get("attachment");
    if (attachment instanceof File && attachment.size > 0) data.set("attachment", attachment);
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setReference(result.reference);
      setStatus("sent");
      form.reset();
      setAttachmentName("");
    } catch {
      setStatus("error");
    }
  }

  function selectAttachment(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.size > 10 * 1024 * 1024) {
      event.target.value = "";
      setAttachmentName("");
      setAttachmentError("Choose a file smaller than 10 MB.");
      return;
    }
    setAttachmentName(file?.name ?? "");
    setAttachmentError("");
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={submitInquiry}>
        <fieldset><legend>Your contact</legend><div className={styles.grid}>
          <label>Full name <span>*</span><input name="Full_name" type="text" autoComplete="name" required /></label>
          <label>Business email <span>*</span><input name="Business_email" type="email" autoComplete="email" required /></label>
          <label>Company <span>*</span><input name="Company" type="text" autoComplete="organization" required /></label>
          <label>Phone / WhatsApp<input name="Phone_or_WhatsApp" type="tel" autoComplete="tel" /></label>
        </div></fieldset>
        <fieldset><legend>Product brief</legend><div className={styles.grid}>
          <label>Category<select name="Audience" defaultValue=""><option value="">Select category</option>{audiences.map((item) => <option key={item.slug} value={item.label}>{item.label}</option>)}</select></label>
          <label>Garment type <span>*</span><input name="Garment_type" type="text" placeholder="e.g. shirt, sweater, trouser" required /></label>
          <label>Construction<select name="Construction" defaultValue=""><option value="">Not sure yet</option>{constructions.map((item) => <option key={item.slug} value={item.label}>{item.label}</option>)}</select></label>
          <label>Estimated quantity<input name="Estimated_quantity" type="text" inputMode="numeric" placeholder="If known" /></label>
          <label>Fabric / composition<input name="Fabric_or_composition" type="text" placeholder="If known" /></label>
          <label>Size range<input name="Size_range" type="text" placeholder="If known" /></label>
          <label>Colour options<input name="Colour_options" type="text" placeholder="If known" /></label>
          <label>Style code from this site<input name="Style_code" type="text" defaultValue={initialStyle ?? ""} /></label>
        </div></fieldset>
        <fieldset><legend>Requirements</legend><div className={styles.grid}>
          <label>Destination market<input name="Destination_market" type="text" placeholder="Country or region" /></label>
          <label>Target shipment window<input name="Target_shipment_window" type="text" placeholder="If known" /></label>
          <label>Target price<input name="Target_price" type="text" placeholder="Optional" /></label>
          <label>Quality / compliance notes<input name="Quality_or_compliance" type="text" placeholder="Standards or buyer manual" /></label>
        </div></fieldset>
        <fieldset><legend>Your message & reference</legend><div className={styles.stack}>
          <label>Anything else we should know?<textarea name="Message" rows={5} placeholder="Tell us what you have in mind." /></label>
          <label className={styles.fileLabel}>Tech pack or reference image<input name="attachment" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" onChange={selectAttachment} /><span>{attachmentName || "Choose a PDF, document or image up to 10 MB (optional)"}</span></label>
          {attachmentError && <p className={styles.error} role="alert">{attachmentError}</p>}
          <p className={styles.helper}>Your brief and private attachment go to our inquiry dashboard. Our team also receives an email notification when mail delivery is configured.</p>
        </div></fieldset>
        <button className={styles.submit} type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending your brief…" : "Send your inquiry"} <span aria-hidden="true">→</span></button>
      </form>
      {status === "sent" && <div className={styles.draft} role="status"><h2>Thank you. We received your brief.</h2><p>Your reference is BB-{reference}. Our team can now review the details and any attachment in the dashboard.</p></div>}
      {status === "error" && <div className={styles.draft} role="alert"><h2>We could not send your brief just now.</h2><p>Please try again or email <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p></div>}
    </div>
  );
}

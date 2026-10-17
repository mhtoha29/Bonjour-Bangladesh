"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { brand, faqGroups } from "@/content/site-content";
import styles from "./visitor-concierge.module.css";

type ChatMessage = { role: "assistant" | "visitor"; text: string; href?: string; linkLabel?: string };

const greeting = "How can I help you today? Ask about products, sourcing, quality or sending a brief.";
const quickQuestions = ["What products can you source?", "Can I send a tech pack?", "What is your MOQ?", "How do I arrange a meeting?"];

function answerQuestion(question: string): ChatMessage {
  const text = question.toLowerCase();
  if (/product|garment|knit|woven|fashion|men|women|kids/.test(text)) return { role: "assistant", text: "Explore men’s, women’s and kids’ knit, woven and fully fashioned apparel directions. A specific style is developed around your brief and partner capability.", href: "/products/", linkLabel: "Explore products" };
  if (/tech.?pack|design|quote|inquir|sample|brief/.test(text)) return { role: "assistant", text: "Yes. Share a tech pack, sketch, reference image or a short garment description. Include quantity, destination and timing if you know them.", href: "/request-a-quote/", linkLabel: "Start an inquiry" };
  if (/moq|minimum|quantity/.test(text)) return { role: "assistant", text: faqGroups[1].items[3].answer, href: "/faq/", linkLabel: "Read buyer FAQs" };
  if (/quality|qc|inspection|test/.test(text)) return { role: "assistant", text: faqGroups[2].items[1].answer, href: "/quality-control/", linkLabel: "See quality approach" };
  if (/meeting|zoom|google meet|call|appointment/.test(text)) return { role: "assistant", text: "Please reach our team by WhatsApp or email first with a short brief. We can then agree a suitable call or online meeting.", href: "/contact/", linkLabel: "Contact our team" };
  if (/address|location|office|dhaka|where/.test(text)) return { role: "assistant", text: `Our office is at ${brand.address}. You can contact us at ${brand.email}.`, href: "/contact/", linkLabel: "Contact details" };
  if (/compliance|certif|sustainab|factory/.test(text)) return { role: "assistant", text: "Requirements and certification evidence depend on the selected partner facility and buyer programme. Share your standards so our team can review the relevant documentation.", href: "/quality-compliance/", linkLabel: "Quality & compliance" };
  return { role: "assistant", text: "I can guide you through products, tech packs, MOQ, quality and contact details. For a specific costing or production answer, our team can review your brief directly.", href: "/contact/", linkLabel: "Talk to our team" };
}

function Icon({ name }: { name: "chat" | "whatsapp" | "mail" | "social" | "up" }) {
  const paths = {
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8.4 8.4 0 0 1-3.4-.7L4 20l1.7-4.8a7.5 7.5 0 1 1 14.3-3.7Z"/><path d="M8.5 11h8M8.5 14h5"/></>,
    whatsapp: <path transform="scale(1.5)" fill="currentColor" stroke="none" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607ZM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.493.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.066-.315-.099-.445.099-.133.197-.513.646-.627.775-.115.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.984-.59-.525-.986-1.173-1.102-1.371-.116-.198-.013-.306.087-.404.09-.088.197-.23.296-.345.1-.116.133-.198.198-.33.066-.132.033-.248-.017-.347-.05-.099-.445-1.076-.61-1.47-.16-.389-.323-.335-.445-.34-.116-.007-.248-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.69.677-.69 1.654s.71 1.916.81 2.049c.098.132 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.151.907.129 1.249.079.38-.058 1.171-.48 1.338-.943.164-.462.164-.86.114-.943-.049-.084-.182-.133-.38-.232Z"/>,
    mail: <><rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/></>,
    social: <><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="m8 11 8-4M8 13l8 4"/></>,
    up: <><path d="m5 14 7-7 7 7M12 7v12"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

let greetingAudioContext: AudioContext | null = null;

function getGreetingAudioContext() {
  if (!window.AudioContext) return null;
  if (!greetingAudioContext || greetingAudioContext.state === "closed") greetingAudioContext = new window.AudioContext();
  return greetingAudioContext;
}

async function unlockGreetingSound() {
  const audio = getGreetingAudioContext();
  if (audio?.state === "suspended") await audio.resume();
}

async function playGreetingSound() {
  const audio = getGreetingAudioContext();
  if (!audio) return;
  try {
    if (audio.state === "suspended") await audio.resume();
    if (audio.state !== "running") return;
    const tone = audio.createOscillator();
    const gain = audio.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(690, audio.currentTime);
    tone.frequency.setValueAtTime(880, audio.currentTime + 0.13);
    gain.gain.setValueAtTime(0.001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.022, audio.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.28);
    tone.connect(gain).connect(audio.destination);
    tone.start();
    tone.stop(audio.currentTime + 0.29);
  } catch {}
}

export function VisitorConcierge() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [muted, setMuted] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: greeting }]);
  const [inquiryState, setInquiryState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const visibleSeconds = useRef(0);
  const inquiryShown = useRef(false);
  const inquiryDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isAdmin) return;
    const unlock = () => { void unlockGreetingSound(); };
    window.addEventListener("pointerdown", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      visibleSeconds.current += 1;
      if (visibleSeconds.current >= 15 && sessionStorage.getItem("bonjour-greeting-seen") !== "1") {
        sessionStorage.setItem("bonjour-greeting-seen", "1");
        if (!assistantOpen) {
          setGreetingVisible(true);
          if (!muted) void playGreetingSound();
        }
      }
      if (visibleSeconds.current >= 40 && !inquiryShown.current && !assistantOpen && !document.activeElement?.closest("form")) {
        const dialog = inquiryDialog.current;
        if (dialog && !dialog.open) {
          const pageScrollY = window.scrollY;
          setGreetingVisible(false);
          dialog.showModal();
          window.requestAnimationFrame(() => window.scrollTo({ top: pageScrollY, behavior: "instant" }));
          setInquiryOpen(true);
          inquiryShown.current = true;
        }
      }
    }, 1000);
    return () => { window.clearInterval(timer); };
  }, [assistantOpen, isAdmin, muted]);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInquiryState("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("source", "popup");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", body: data });
      if (!response.ok) throw new Error("Inquiry could not be submitted");
      setInquiryState("sent");
      form.reset();
    } catch {
      setInquiryState("error");
    }
  }

  function openAssistant() {
    setGreetingVisible(false);
    setSocialOpen(false);
    setAssistantOpen(true);
  }

  function sendQuestion(question: string) {
    const value = question.trim();
    if (!value) return;
    setMessages((current) => [...current, { role: "visitor", text: value }, answerQuestion(value)]);
    setDraft("");
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendQuestion(draft);
  }

  if (isAdmin) return null;

  return (
    <>
      {greetingVisible && !assistantOpen && <div className={styles.greeting} role="status"><button type="button" onClick={openAssistant}><span className={styles.greetingDot} />How can I help you today?</button><button type="button" aria-label="Dismiss greeting" onClick={() => setGreetingVisible(false)}>×</button></div>}
      {assistantOpen && <section className={styles.panel} aria-label="Bonjour website guide"><div className={styles.panelHead}><div><strong>Ask Bonjour</strong><span>Instant website answers</span></div><button type="button" onClick={() => setAssistantOpen(false)} aria-label="Close guide">×</button></div><div className={styles.chatHistory} role="log" aria-live="polite" aria-label="Conversation">{messages.map((message, index) => <div className={`${styles.message} ${message.role === "visitor" ? styles.visitorMessage : styles.assistantMessage}`} key={`${index}-${message.role}`}><p>{message.text}</p>{message.href && <Link href={message.href} onClick={() => setAssistantOpen(false)}>{message.linkLabel} ↗</Link>}</div>)}</div><div className={styles.chatBottom}><div className={styles.suggestions}>{quickQuestions.map((question) => <button type="button" key={question} onClick={() => sendQuestion(question)}>{question}</button>)}</div><form onSubmit={submitQuestion} className={styles.composer}><label htmlFor="bonjour-chat-input" className={styles.srOnly}>Type your question</label><input id="bonjour-chat-input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask a question…" maxLength={300} /><button type="submit" aria-label="Send question" disabled={!draft.trim()}>↗</button></form><p>Website guide preview · Specific pricing and timing are confirmed by our team.</p><button type="button" className={styles.mute} onClick={() => setMuted(!muted)}>{muted ? "Sound off · turn on" : "Sound on · mute"}</button></div></section>}
      {!inquiryOpen && <div className={styles.dock} aria-label="Quick contact options">
        <div className={styles.socialWrap}>
          {socialOpen && <div className={styles.socialPanel} role="group" aria-label="Social media profiles"><span>Social profiles</span><div>{([ ["linkedin", "LinkedIn", "in"], ["instagram", "Instagram", "◎"], ["facebook", "Facebook", "f"] ] as const).map(([key, label, glyph]) => brand.socialProfiles[key] ? <a key={key} href={brand.socialProfiles[key]} target="_blank" rel="noopener noreferrer" aria-label={`Bonjour Bangladesh on ${label}`}>{glyph}</a> : <button type="button" disabled key={key} aria-label={`${label} profile link pending`} title={`${label} link pending`}>{glyph}</button>)}</div><small>Links will appear after confirmation.</small></div>}
          <button type="button" className={styles.dockButton} onClick={() => setSocialOpen(!socialOpen)} aria-expanded={socialOpen} aria-label={socialOpen ? "Close social links" : "Show social links"}><Icon name="social" /></button>
        </div>
        <a className={styles.dockButton} href={`mailto:${brand.email}`} aria-label="Email Bonjour Bangladesh" title="Email"><Icon name="mail" /></a>
        <a className={`${styles.dockButton} ${styles.whatsapp}`} href={brand.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Bonjour Bangladesh on WhatsApp" title="WhatsApp"><Icon name="whatsapp" /></a>
        <button type="button" className={`${styles.dockButton} ${styles.chatLauncher}`} onClick={() => assistantOpen ? setAssistantOpen(false) : openAssistant()} aria-expanded={assistantOpen} aria-label={assistantOpen ? "Close Bonjour guide" : "Open Bonjour guide"} title="Ask Bonjour"><Icon name="chat" /><span className={styles.srOnly}>Ask Bonjour</span></button>
        <button type="button" className={styles.dockButton} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" title="Back to top"><Icon name="up" /></button>
      </div>}
      <dialog ref={inquiryDialog} className={styles.inquiry} onClose={() => setInquiryOpen(false)}><form method="dialog"><button type="submit" className={styles.close} aria-label="Close inquiry form">×</button></form><div className={styles.inquiryTopline}><span>BUYER DESK · DHAKA</span><span>EST. 2010</span></div><p>YOUR NEXT COLLECTION</p><h2>Tell us what you have in mind.</h2><span>A short brief is enough to start. Our team will follow up directly.</span>{inquiryState === "sent" ? <div className={styles.inquirySuccess} role="status"><strong>Thank you—your inquiry is in our dashboard.</strong><span>Our team will review it and contact you by email.</span><button type="button" onClick={() => inquiryDialog.current?.close()}>Close</button></div> : <form className={styles.inquiryForm} onSubmit={submitInquiry}><label>Full name <input name="name" autoComplete="name" required minLength={2} maxLength={120} /></label><label>Business email <input name="email" type="email" autoComplete="email" required maxLength={190} /></label><label>Company <input name="company" autoComplete="organization" maxLength={190} /></label><label>What are you looking to make? <textarea name="message" required minLength={8} maxLength={4000} rows={3} placeholder="Product, quantity and target market if known" /></label><label className={styles.honeypot} aria-hidden="true">Website <input name="website" tabIndex={-1} autoComplete="off" /></label>{inquiryState === "error" && <span className={styles.inquiryError} role="alert">We could not submit this just now. Please try again or email us directly.</span>}<button type="submit" disabled={inquiryState === "sending"}>{inquiryState === "sending" ? "Sending…" : "Send inquiry →"}</button></form>}<small>Need to attach a tech pack? <Link href="/request-a-quote/" onClick={() => inquiryDialog.current?.close()}>Use the full brief form ↗</Link></small></dialog>
    </>
  );
}

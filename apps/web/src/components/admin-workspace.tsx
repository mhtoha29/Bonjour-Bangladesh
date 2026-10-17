"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import styles from "./admin-workspace.module.css";
import { AdminProductManager } from "./admin-product-manager";
import { AdminContentManager } from "./admin-content-manager";
import { AdminBlogManager } from "./admin-blog-manager";

type AdminUser = { id: number; name: string; email: string; role: string; avatar_url: string | null; is_active?: boolean };
type Inquiry = { id: number; source: string; name: string; email: string; company: string | null; phone: string | null; message: string; details: Record<string, string> | null; attachment_name: string | null; status: string; email_status: string; created_at: string };
type Tab = "overview" | "inquiries" | "catalog" | "blog" | "content" | "quality" | "assistant" | "team" | "profile";

const navigation: { id: Tab; label: string; marker: string; ownerOnly?: boolean }[] = [
  { id: "overview", label: "Overview", marker: "◈" },
  { id: "inquiries", label: "Buyer inquiries", marker: "↗" },
  { id: "catalog", label: "Product catalog", marker: "▦" },
  { id: "blog", label: "Blog studio", marker: "¶" },
  { id: "content", label: "Website content", marker: "◇" },
  { id: "quality", label: "Quality & partners", marker: "✓" },
  { id: "assistant", label: "AI assistant", marker: "✦" },
  { id: "team", label: "Team & roles", marker: "◎", ownerOnly: true },
  { id: "profile", label: "My profile", marker: "◉" },
];

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api/admin/${path}`, { cache: "no-store", ...options });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message ?? "Please try again.");
  return payload as T;
}

function initials(name: string): string {
  return name.split(" ").slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase();
}

function readableDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export function AdminWorkspace() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [newCount, setNewCount] = useState(0);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [team, setTeam] = useState<AdminUser[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);

  const loadInquiries = useCallback(async () => {
    const payload = await api<{ inquiries: { data: Inquiry[] }; new_count: number }>("inquiries");
    setInquiries(payload.inquiries.data);
    setNewCount(payload.new_count);
  }, []);

  useEffect(() => {
    api<{ user: AdminUser }>("session").then(({ user: account }) => {
      setUser(account);
      void loadInquiries();
    }).catch(() => {}).finally(() => setInitializing(false));
  }, [loadInquiries]);

  useEffect(() => {
    if (tab === "team" && user?.role === "owner") {
      api<{ users: AdminUser[] }>("team").then((payload) => setTeam(payload.users)).catch((caught: Error) => setError(caught.message));
    }
  }, [tab, user?.role]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      const result = await api<{ user: AdminUser }>("session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), password: data.get("password") }) });
      setUser(result.user);
      await loadInquiries();
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  async function requestReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      const result = await api<{ message: string }>("forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email") }) });
      setNotice(result.message);
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  async function logout() {
    await api("session", { method: "DELETE" }).catch(() => {});
    setUser(null); setTab("overview"); setSelected(null); setNotice("");
  }

  async function changeStatus(inquiry: Inquiry, status: string) {
    setBusy(true); setError("");
    try {
      const result = await api<{ inquiry: Inquiry }>(`inquiries/${inquiry.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      setSelected(result.inquiry);
      await loadInquiries();
      setNotice("Lead status updated.");
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  async function invite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const result = await api<{ user: AdminUser; invitation_status: string }>("team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data.entries())) });
      setTeam((current) => [...current, result.user]);
      setNotice(result.invitation_status === "submitted" ? "Account created. Setup link handed to the configured mail transport." : "Account created. Configure email delivery and resend a setup link.");
      form.reset();
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  async function updateTeam(member: AdminUser, changes: { role?: string; is_active?: boolean }) {
    setBusy(true); setError(""); setNotice("");
    try {
      const result = await api<{ user: AdminUser }>(`team/${member.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(changes) });
      setTeam((current) => current.map((item) => item.id === member.id ? result.user : item));
      setNotice("Team access updated.");
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  async function resendInvite(member: AdminUser) {
    setBusy(true); setError(""); setNotice("");
    try {
      const result = await api<{ invitation_status: string }>(`team/${member.id}/invite`, { method: "POST" });
      setNotice(result.invitation_status === "submitted" ? "Setup link handed to the configured mail transport." : "Setup link pending. Check mail configuration.");
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!data.get("password")) { data.delete("password"); data.delete("password_confirmation"); data.delete("current_password"); }
    const avatar = data.get("avatar");
    if (avatar instanceof File && avatar.size === 0) data.delete("avatar");
    try {
      const result = await api<{ user: AdminUser }>("profile", { method: "POST", body: data });
      setUser(result.user); setNotice("Profile updated."); form.reset();
    } catch (caught) { setError((caught as Error).message); }
    finally { setBusy(false); }
  }

  if (initializing) return <main className={styles.loading} id="main-content"><div className="route-loading__line" /><span>Opening Bonjour Studio…</span></main>;

  if (!user) return <main id="main-content" className={styles.loginPage}>
    <div className={styles.loginVisual}><Link href="/" className={styles.backHome}>← Back to website</Link><div><span>BONJOUR BANGLADESH · PRIVATE STUDIO</span><h1>Clarity behind every collection.</h1><p>A considered workspace for buyer conversations, content and quality coordination.</p></div><small>Since 2010 · Dhaka, Bangladesh</small></div>
    <div className={styles.loginSide}><div className={styles.loginCard}><Image src="/bonjour-logo.png" alt="Bonjour Bangladesh" width={154} height={154} priority className={styles.loginLogo} /><p className={styles.kicker}>SECURE TEAM ACCESS</p><h2>{forgot ? "Reset your access." : "Welcome back."}</h2><p className={styles.loginLead}>{forgot ? "Enter your account email and we’ll send a private reset link." : "Sign in to manage Bonjour’s buyer experience."}</p>{notice && <p className={styles.notice} role="status">{notice}</p>}{error && <p className={styles.error} role="alert">{error}</p>}<form onSubmit={forgot ? requestReset : login} className={styles.loginForm}><label>Email address<input type="email" name="email" autoComplete="username" placeholder="name@company.com" required defaultValue={forgot ? "farooq@bonjourbangladesh.com" : undefined} /></label>{!forgot && <label>Password<input type="password" name="password" autoComplete="current-password" placeholder="Enter your password" required /></label>}<button type="submit" disabled={busy}>{busy ? "Please wait…" : forgot ? "Send reset link →" : "Enter studio →"}</button></form><button type="button" className={styles.textButton} onClick={() => { setForgot(!forgot); setError(""); setNotice(""); }}>{forgot ? "Return to sign in" : "Forgot password or first-time access?"}</button><span className={styles.loginFine}>Access is limited to authorized Bonjour Bangladesh team members.</span></div></div>
  </main>;

  return <main id="main-content" className={styles.workspace}>
    <aside className={styles.sidebar}><div className={styles.sidebarTop}><Link href="/" className={styles.sidebarLogo}><Image src="/bonjour-logo.png" alt="Bonjour Bangladesh" width={126} height={126} /><span>STUDIO</span></Link><p>Buyer experience console</p></div><nav aria-label="Admin navigation">{navigation.filter((item) => !item.ownerOnly || user.role === "owner").map((item) => <button type="button" key={item.id} onClick={() => { setTab(item.id); setError(""); setNotice(""); }} className={tab === item.id ? styles.activeNav : ""}><span>{item.marker}</span>{item.label}{item.id === "inquiries" && newCount > 0 && <em>{newCount}</em>}</button>)}</nav><div className={styles.sidebarBottom}><span className={styles.avatar}>{user.avatar_url ? <Image src={user.avatar_url} alt="" width={42} height={42} unoptimized /> : initials(user.name)}</span><div><strong>{user.name}</strong><small>{user.role}</small></div><button type="button" onClick={logout} aria-label="Sign out">↗</button></div></aside>
    <div className={styles.mainPanel}><header className={styles.topbar}><span>Bonjour Bangladesh <span aria-hidden="true">/</span> {navigation.find((item) => item.id === tab)?.label}</span><div><Link href="/" target="_blank">View website ↗</Link><button type="button" onClick={logout}>Sign out</button></div></header><div className={styles.content}>
      {notice && <p className={styles.notice} role="status">{notice}</p>}{error && <p className={styles.error} role="alert">{error}</p>}
      {tab === "overview" && <><div className={styles.pageHeading}><p>CONTROL ROOM / OVERVIEW</p><h1>Good to see you, {user.name.split(" ")[0]}.</h1><span>Buyer conversations and brand operations, in one considered space.</span></div><div className={styles.statGrid}><div><span>NEW LEADS</span><strong>{newCount.toString().padStart(2, "0")}</strong><small>Awaiting first response</small></div><div><span>RECENT INQUIRIES</span><strong>{inquiries.length.toString().padStart(2, "0")}</strong><small>Latest page of buyer requests</small></div><div><span>LIVE MODULES</span><strong>06</strong><small>Leads · Catalog · Blog · Content · Team · Profile</small></div></div><div className={styles.overviewGrid}><section className={styles.panelCard}><div className={styles.cardTop}><h2>Recent buyer inquiries</h2><button type="button" onClick={() => setTab("inquiries")}>View inbox ↗</button></div>{inquiries.length ? inquiries.slice(0, 5).map((item) => <button type="button" className={styles.recentRow} key={item.id} onClick={() => { setSelected(item); setTab("inquiries"); }}><span className={styles.miniAvatar}>{initials(item.name)}</span><span><strong>{item.name}</strong><small>{item.company || item.email}</small></span><em>{item.status}</em></button>) : <p className={styles.empty}>No inquiries yet. New submissions will appear here.</p>}</section><section className={`${styles.panelCard} ${styles.nextPanel}`}><span>THE PUBLISHING LAYER</span><h2>Products and expertise, under one roof.</h2><p>The product catalog, blog and homepage content now have live editing workflows. Quality evidence and assistant knowledge remain staged until their approval rules are finalized.</p><div><span>01 Catalog</span><span>02 Blog</span><span>03 Content</span><span>04 Quality next</span></div></section></div></>}
      {tab === "inquiries" && <><div className={styles.pageHeading}><p>BUYER RELATIONSHIPS / INBOX</p><h1>Every lead, accounted for.</h1><span>Popup and full tech-pack inquiries arrive here together.</span></div><div className={styles.inquiryLayout}><section className={styles.panelCard}><div className={styles.cardTop}><h2>Inbox</h2><button type="button" onClick={() => void loadInquiries()}>Refresh ↻</button></div>{inquiries.length ? inquiries.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item)} className={`${styles.inquiryRow} ${selected?.id === item.id ? styles.selectedRow : ""}`}><span><strong>{item.name}</strong><small>{item.company || item.email}</small></span><span><em>{item.status}</em><small>{readableDate(item.created_at)}</small></span></button>) : <p className={styles.empty}>No buyer inquiries yet.</p>}</section><section className={`${styles.panelCard} ${styles.detailPanel}`}>{selected ? <><span className={styles.detailKicker}>INQUIRY BB-{selected.id} · {selected.source.toUpperCase()}</span><h2>{selected.name}</h2><p className={styles.detailMeta}>{selected.company || "Independent buyer"} · {readableDate(selected.created_at)}</p><div className={styles.detailActions}><a href={`mailto:${selected.email}`}>Email buyer ↗</a>{selected.phone && <a href={`tel:${selected.phone}`}>Call ↗</a>}</div><div className={styles.detailBlock}><span>BUYER BRIEF</span><p>{selected.message}</p></div><div className={styles.detailBlock}><span>CONTACT</span><p>{selected.email}{selected.phone ? ` · ${selected.phone}` : ""}</p></div>{selected.details && <div className={styles.detailBlock}><span>PRODUCT DETAILS</span>{Object.entries(selected.details).map(([key, value]) => <p key={key}><strong>{key.replaceAll("_", " ")}:</strong> {value}</p>)}</div>}{selected.attachment_name && <a className={styles.attachment} href={`/api/admin/inquiries/${selected.id}/attachment`}>↓ Download {selected.attachment_name}</a>}<div className={styles.statusControl}><label htmlFor="lead-status">Lead status</label><select id="lead-status" value={selected.status} disabled={busy || !["owner", "manager"].includes(user.role)} onChange={(event) => void changeStatus(selected, event.target.value)}>{["new", "contacted", "qualified", "closed"].map((status) => <option key={status} value={status}>{status}</option>)}</select><small>Email notification: {selected.email_status}</small></div></> : <div className={styles.selectPrompt}><span>↗</span><h2>Select a buyer inquiry.</h2><p>Details, contact actions, attachments and follow-up status appear here.</p></div>}</section></div></>}
      {tab === "team" && user.role === "owner" && <><div className={styles.pageHeading}><p>ACCESS CONTROL / TEAM</p><h1>The right access for every role.</h1><span>Only the owner can create accounts and assign roles.</span></div><div className={styles.teamGrid}><section className={styles.panelCard}><h2>Team members</h2>{team.map((member) => <div key={member.id} className={styles.teamRow}><span className={styles.miniAvatar}>{initials(member.name)}</span><span><strong>{member.name}</strong><small>{member.email}</small></span>{member.role === "owner" ? <em>Owner</em> : <div className={styles.teamControls}><select aria-label={`Role for ${member.name}`} value={member.role} disabled={busy} onChange={(event) => void updateTeam(member, { role: event.target.value })}><option value="manager">Manager</option><option value="editor">Editor</option><option value="viewer">Viewer</option></select><button type="button" disabled={busy} onClick={() => void updateTeam(member, { is_active: !member.is_active })}>{member.is_active === false ? "Activate" : "Disable"}</button><button type="button" disabled={busy || member.is_active === false} onClick={() => void resendInvite(member)}>Resend setup</button></div>}</div>)}</section><section className={styles.panelCard}><h2>Invite a team member</h2><p>They receive a private setup link through configured email delivery. No shared password is created.</p><form className={styles.adminForm} onSubmit={invite}><label>Full name<input name="name" required minLength={2} maxLength={120} /></label><label>Business email<input name="email" type="email" required /></label><label>Role<select name="role"><option value="manager">Manager · leads and operations</option><option value="editor">Editor · content workspace</option><option value="viewer">Viewer · read-only</option></select></label><button type="submit" disabled={busy}>{busy ? "Creating…" : "Create account & send setup link →"}</button></form></section></div></>}
      {tab === "profile" && <><div className={styles.pageHeading}><p>PERSONAL SETTINGS / PROFILE</p><h1>Your place in the studio.</h1><span>Update your name, portrait and password securely.</span></div><section className={`${styles.panelCard} ${styles.profileCard}`}><div className={styles.profilePreview}><span className={styles.avatarLarge}>{user.avatar_url ? <Image src={user.avatar_url} alt="" width={88} height={88} unoptimized /> : initials(user.name)}</span><div><strong>{user.name}</strong><span>{user.email}</span><small>{user.role}</small></div></div><form className={styles.adminForm} onSubmit={saveProfile}><label>Display name<input name="name" defaultValue={user.name} required minLength={2} maxLength={120} /></label><label>Profile photo<input name="avatar" type="file" accept="image/jpeg,image/png,image/webp" /><small>JPG, PNG or WebP. Up to 2 MB.</small></label><div className={styles.formDivider}>CHANGE PASSWORD · OPTIONAL</div><label>Current password<input name="current_password" type="password" autoComplete="current-password" /></label><label>New password<input name="password" type="password" autoComplete="new-password" minLength={12} /></label><label>Confirm new password<input name="password_confirmation" type="password" autoComplete="new-password" minLength={12} /></label><button type="submit" disabled={busy}>{busy ? "Saving…" : "Save profile →"}</button></form></section></>}
      {tab === "catalog" && <><div className={styles.pageHeading}><p>PRODUCT OPERATIONS / CATALOG</p><h1>Every style, considered.</h1><span>Manage 300+ garment styles with one optimized image, complete details and clear draft/publish control.</span></div><AdminProductManager role={user.role} /></>}
      {tab === "blog" && <><div className={styles.pageHeading}><p>EDITORIAL OPERATIONS / BLOG</p><h1>Publish expertise buyers can use.</h1><span>Create, optimize and manage sourcing articles with approved cover imagery and draft/publish control.</span></div><AdminBlogManager role={user.role} authorName={user.name} /></>}
      {tab === "content" && <><div className={styles.pageHeading}><p>WEBSITE CONTENT / HOMEPAGE</p><h1>A first impression you control.</h1><span>Edit the homepage message, search metadata and approved hero images.</span></div><AdminContentManager role={user.role} /></>}
      {(["quality", "assistant"] as Tab[]).includes(tab) && <><div className={styles.pageHeading}><p>WORKSPACE / {tab.toUpperCase()}</p><h1>{navigation.find((item) => item.id === tab)?.label}.</h1><span>Designed as part of the admin system; activation follows approved content and workflow rules.</span></div><section className={`${styles.panelCard} ${styles.moduleCard}`}><span className={styles.moduleIcon}>{navigation.find((item) => item.id === tab)?.marker}</span><div><span>STRUCTURE READY · EDITING WORKFLOW NEXT</span><h2>{tab === "quality" ? "Evidence-led partner and QC information." : "A guided, approved knowledge layer."}</h2><p>{tab === "quality" ? "Planned controls: factory-partner records, certifications, QC process copy and document visibility." : "Planned controls: approved answers, greeting, escalation, conversation limits and analytics."}</p><div className={styles.moduleSteps}><span>01 Data model</span><span>02 Approval rules</span><span>03 Editor controls</span><span>04 Publish</span></div></div></section></>}
    </div></div>
  </main>;
}

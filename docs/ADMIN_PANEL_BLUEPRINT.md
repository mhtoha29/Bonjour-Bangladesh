# Bonjour Bangladesh Admin Panel Blueprint

Status: implementation specification  
Goal: let the client manage products, content, buyer leads, proof and AI safely without developer assistance

## UX principles

- Operational clarity before decoration
- Role-based navigation and actions
- Fast daily inquiry handling on desktop and mobile
- Structured forms instead of unrestricted page building
- Draft/review/publish separation for public changes
- Upload once; processing happens in the background with visible status
- Every destructive, publishing, export and private-file action is auditable

The admin uses Manrope throughout, white and soft-green surfaces, restrained Vivid Green actions with dark text, and Buyer Crimson only for urgent/destructive states. Public-site editorial styling does not enter data-heavy admin screens.

## Navigation architecture

Desktop sidebar, filtered by permission:

1. Overview
2. Inquiries
3. Products
4. Catalog setup
5. Media library
6. Pages
7. Insights
8. FAQs
9. Certifications & evidence
10. AI assistant
11. SEO & redirects
12. Users & roles
13. Settings
14. Audit & system health

Top bar:

- Global search for inquiry, company, product, style code and content
- Contextual `Create` action
- Notifications and failed-job alerts
- Preview website
- User menu, profile, session management and sign out

Mobile navigation uses an accessible drawer. Priority mobile actions are viewing/assigning leads, adding notes, scheduling follow-up, opening secure attachments and changing lead status; complex bulk catalog work is desktop-first.

## 1. Overview

Actionable dashboard cards:

- New inquiries today and last seven days
- Unassigned inquiries
- Follow-ups due/overdue
- Qualified leads and quotations in progress
- Email notification failures
- Draft/review products
- Failed media processing
- Unresolved AI questions and handoffs

Dashboard sections:

- Lead pipeline by stage
- Recent inquiries with product/source context
- Personal follow-up queue
- Recent content/product changes
- System alerts: queue, cron, backup, storage and mail health

Do not use traffic or page-view vanity metrics as the main dashboard. Marketing reporting remains in GA4/Search Console; the admin focuses on lead operations and content health.

## 2. Inquiry CRM

### List and saved views

Columns: received time, contact/company, country, product/context, source, owner, priority, status, next follow-up and attachment indicator.

Filters: stage, assignee, priority, country, product/category, source/UTM, date, has attachment, meeting requested, unread and overdue.

Default saved views:

- New and unassigned
- My follow-ups today
- Overdue
- Meeting requested
- Tech pack attached
- Qualified
- Won/Lost
- Spam

### Inquiry detail

- Contact and company summary
- Product, source page, campaign and first/last attribution
- Requirement/RFQ answers
- Secure attachment panel with scan state and audited download
- Status, priority, assignee, tags and next follow-up
- Internal notes
- Immutable activity timeline
- Email delivery/retry state
- Direct email, WhatsApp and copy-contact actions
- Duplicate-lead warning based on safe identifiers

Meeting handoff fields:

- `Meeting requested` flag
- Preferred channel: WhatsApp, email, Zoom or Google Meet
- Visitor timezone
- Preferred date/time window
- Agenda/notes
- Confirmation state and meeting link, entered manually by sales

Changing a lead to Won/Lost requires a close reason. Spam and deletion remain separate; normal users archive rather than permanently delete.

## 3. Products

### Product list

- Search by name or style code
- Filters for status, audience, construction, product type, fabric, season, featured and missing-data state
- Columns for cover, name/style, taxonomy, publish state, updated by/date and SEO/media warning
- Bulk draft/archive, taxonomy update, export and permitted publish action
- CSV import and image ZIP/multi-file mapping with preview, dry run and downloadable error report

### Product editor

Use clear tabs/sections:

1. Basics: name, style code, slug, excerpt and status
2. Classification: Men/Women/Kids, Knit/Woven/Fully Fashioned Knitwear, product type and season
3. Specifications: composition, GSM, fit, finish/wash, sizes, colours, features and construction
4. Gallery: uploads, processing state, order, cover, ALT text and focal point
5. Commercial facts: verified MOQ/lead time only
6. Related products
7. SEO/social preview
8. Revisions, preview and audit

Publish validation blocks incomplete required data, failed/quarantined media, duplicate style code/slug, missing cover/ALT text and unverified public claims. Duplicate/thin descriptions create warnings for the SEO editor.

## 4. Catalog setup

Manage controlled vocabularies:

- Audiences
- Constructions
- Product types
- Fabrics/compositions
- Finishes/washes
- Seasons
- Colours
- Sizes

Show usage count before archive. Merge/reassign terms safely; never silently delete a taxonomy used by products.

## 5. Media library

- Grid/list views with search, type, rights, processing and usage filters
- Upload progress and background derivative status
- Failed/quarantined queue with retry where safe
- Original, variant and usage inspection
- ALT text, caption, rights owner, permission and expiry
- Focal-point editor and duplicate checksum warning
- Replace asset without breaking its usages
- Prevent deletion while in use unless an authorised replacement is selected

Product uploads automatically create responsive derivatives without upscaling and strip metadata. Public product media and private tech packs are visibly separated and stored on different visibility rules.

## 6. Pages

- Fixed page list based on the approved sitemap
- Structured section editor with allowed section types per page
- Reorder, hide, draft, preview, submit for review and publish
- Revision comparison and restore
- Navigation label and footer placement where permitted
- Page-level SEO and social preview

Editors cannot inject arbitrary scripts, unrestricted HTML or unsupported layouts.

## 7. Insights

- Article list, author/reviewer, category/tag, draft/review/publish and scheduled date
- Structured editor, cover image, excerpt and related product/capability links
- SEO/social preview and revision history
- Author/reviewer required before publish
- No bulk AI-generated publishing

## 8. FAQs

- Question, answer, category, order, status and related internal link
- Search and drag/reorder within category
- Preview on FAQ page and AI-knowledge inclusion toggle
- Published AI answer always points to the approved FAQ/page source

## 9. Certifications & evidence

Fields: facility/holder, framework, issuer, ID, scope, issue/expiry dates, verification URL, logo-use permission, public wording, private evidence and status.

Workflow: Draft → Pending verification → Verified → Expiring → Expired/Archived.

Only a Compliance Editor plus Owner/Admin can approve public display. Unverified, expired, prohibited, government/bank seals, the ISO logo and watermarked assets cannot publish. Expiry alerts appear on the dashboard.

## 10. AI assistant

- Master enable/disable and maintenance message
- Approved prompt version and change history
- Knowledge sources with sync status
- Product-tool and lead-handoff configuration
- Conversation list with PII-aware access
- Unanswered/unresolved question queue
- Feedback, leads created and handoff outcomes
- Daily/monthly message, cost and error limits
- Rate limit, turn limit, transcript retention and purge controls
- Test console separated from production analytics

AI cannot edit its own knowledge, alter business facts or publish content. Prompt changes require preview/test and an auditable publish action.

## 11. SEO & redirects

- URL/title/meta audit with duplicate, missing and length warnings
- Indexability and canonical controls limited by role
- Sitemap status and last successful generation
- Redirect list with source conflict/loop protection
- Broken-link and orphan-page reports when available
- Default Open Graph assets and organization data
- Search Console links/status summaries only after account connection

## 12. Users & roles

- Invite, resend, suspend and revoke sessions
- Role assignment and granular permissions
- Protected Owner account
- Mandatory 2FA for Owner/Admin
- User profile name, photo and password management
- Login and sensitive-action audit

Never expose password, API key, SMTP credential or provider secret in the admin.

## 13. Settings

Grouped settings:

- Company/contact/address/social links
- WhatsApp and email actions
- Navigation/footer
- Inquiry status, recipients and notification rules
- Popup delay, cooldown and suppression
- AI greeting delay, mute/sound preference and limits
- Media defaults
- Legal/consent versions
- Analytics identifiers after consent configuration

Settings that affect security, secrets, deployment paths or storage remain environment-managed, not editable in the UI.

## 14. Audit & system health

- Filterable audit log for authentication, permissions, publish, export, private download and settings
- Queue/failed jobs, cron heartbeat, mail status, media failures and AI provider state
- Last successful database/media backup and last restore-test date
- Read-only application/version/environment summary with secrets redacted

This screen reports health; it must not provide a web-based shell or expose raw environment values.

## Shared interaction rules

- Lists preserve filters and pagination when returning from a record
- Autosave may protect drafts, but publishing always requires an explicit action
- Optimistic UI is not used for sensitive state, file or publishing operations
- Long tasks run in queues with progress, completion/failure notification and retry guidance
- Empty, loading, permission-denied, offline and partial-failure states are designed explicitly
- Destructive dialogs name the affected item and consequence
- Toasts supplement, never replace, persistent validation/error messages
- Keyboard navigation, visible focus, proper labels and WCAG 2.2 AA contrast are required

## Build and approval order

Each step follows requirements/data → desktop/mobile design → build → policy/security tests → role-based UAT → approval.

1. Admin shell, authentication, profile and password reset
2. Roles, permissions, invitations, 2FA and audit foundation
3. Catalog setup and media pipeline
4. Product list/editor, import and publishing
5. Inquiry CRM, tech packs, email and meeting handoff
6. Pages, FAQ and global settings
7. Insights and SEO/redirects
8. Certifications and evidence workflow
9. AI controls, knowledge and conversations
10. Overview dashboard, system health and final responsive/accessibility pass

## Acceptance gate

- A Product Manager can publish a valid product but cannot publish compliance evidence
- An Inquiry Manager can manage leads and secure attachments without editing site content
- An editor can draft and preview, while review/publish follows assigned permission
- 320 seeded products remain fast to search, filter, paginate, import and bulk update
- Image processing failure never publishes a broken asset and never loses the original
- A lead is stored before notification email and remains visible when mail fails
- Private tech packs require authorised signed access and are never indexed
- Every deployment preserves uploads, database data and environment configuration
- Owner can create roles/accounts; users can manage their own name, image and password
- Admin works for core lead actions on mobile and all functions on supported desktop browsers

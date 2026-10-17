# Bonjour Bangladesh Technical Architecture

Status: implementation specification  
Architecture: independently deployable Next.js public frontend and Laravel admin/API

## System boundary

```text
Visitors
   |
   v
Next.js public website
   |
   v
Laravel versioned API ---- MySQL
   |          |             |
   |          |             +-- products, content, users, inquiries
   |          +-- queues, email, AI orchestration
   +-- public media + private tech packs
```

Laravel/MySQL is the single source of truth. Next.js never owns business data. Both applications can deploy independently.

Recommended source layout:

```text
apps/
  web/       Next.js App Router and TypeScript
  api/       Laravel API and branded admin
docs/        planning and implementation specifications
```

Deployment packages are generated separately even if development uses one repository.

## Deployment decision

- Public apex and `www`: Next.js
- `admin.bonjourbangladesh.com`: Laravel admin
- `api.bonjourbangladesh.com`: Laravel API, or the same Laravel origin as admin
- MySQL, email, jobs and file metadata: cPanel/Laravel
- Public media: S3-compatible object storage plus CDN preferred; persistent cPanel shared storage is the fallback

Next.js must run as SSR/ISR, not as the primary static-export architecture.

Deployment targets, updated after the client began enabling Next.js on cPanel:

1. Primary: verify persistent Node.js/Application Manager/Passenger and deploy Next.js standalone on cPanel alongside Laravel.
2. Contingency if the host proof fails: deploy only Next.js to Vercel; Laravel, MySQL, email and private files remain on cPanel.

No feature or content model changes between those targets.

Current implementation baseline is Next.js 16 on Node.js 20.9+ and Laravel 13 on PHP 8.3–8.5, pinned to supported patch releases after the real-host proof. First installation, ZIP packaging, persistent release layout, update and rollback are defined in `docs/DEPLOYMENT_RUNBOOK.md`.

## Next.js architecture

Use App Router, TypeScript, server components for public data and client components only where interaction is required.

```text
src/
  app/                 routes, layouts, metadata, errors
  features/
    catalog/
    inquiry/
    content/
    contact/
    ai-assistant/
  components/          shared UI only
  config/              validated public environment config
  lib/                 API client, analytics, schemas
  hooks/               shared hooks
  testing/             mocks and utilities
  types/               truly shared types
```

Rules:

- Dependency direction: shared → feature → app
- No cross-feature imports; compose features at the app layer
- One configured API client
- Validate external API responses with Zod
- URL query state owns catalog filters, sorting and pagination
- Use client caching only for interactive browser data; server components fetch indexable public content
- Business mutations go to Laravel; do not duplicate them as Next.js-only server actions
- Public content routes consume versioned `/api/v1` contracts

## Laravel architecture

Modules:

- Authentication and RBAC
- Catalog
- Media
- CMS and SEO
- Inquiries and CRM
- Notifications
- AI orchestration
- Settings
- Audit

Implementation rules:

- Thin controllers
- FormRequest validation
- Policies for all protected actions
- Service classes for media, inquiry workflow, notifications, publishing/revalidation and AI
- Queued jobs/listeners for image processing, email and knowledge indexing
- API Resources for response contracts
- Eloquent scopes and eager loading
- Enums or value objects for controlled state
- No database queries in views/controllers
- No secrets editable or visible through admin settings
- Structured page blocks only; no unrestricted HTML page builder

Admin may use a branded Laravel-native resource layer such as Filament/Livewire, provided the selected supported version is verified at implementation time and all critical behaviour remains in application services rather than panel-specific code.

## Public API

Prefix: `/api/v1`

Core read endpoints:

- `GET /site`
- `GET /navigation`
- `GET /pages/{slug}`
- `GET /products`
- `GET /products/{slug}`
- `GET /product-taxonomies`
- `GET /posts`
- `GET /posts/{slug}`
- `GET /faqs`

Core write endpoints:

- `POST /inquiries`
- `POST /ai/messages`
- `POST /ai/handoff`

Operational endpoints:

- Signed media download route
- HMAC-protected publish/revalidation callback
- Health endpoint with no secrets

Validate all allowed filter and sort keys. Return consistent error envelopes and stable pagination metadata.

## Catalog data model

### Products

Core fields:

- ULID primary key
- Unique style code
- Unique stable slug
- Name and excerpt
- Sanitised rich description or typed content blocks
- Draft, review, published or archived status
- Featured flag and sort order
- Cover media
- Published timestamp
- Audit timestamps and soft delete

Structured attributes:

- Product type
- Audience: Men, Women, Kids
- Construction: Knit, Woven, Fully Fashioned Knitwear
- Fabric and percentage composition
- GSM
- Fit
- Finish/wash
- Season
- Colours
- Sizes
- Features
- Optional verified MOQ and lead time

Filterable fields use normalised tables and indexed pivots:

- `audiences`
- `constructions`
- `product_types`
- `fabrics`
- `finishes`
- `seasons`
- `colours`
- `sizes`

Use JSON only for non-filtered extra specifications. Related products use an explicit ordered pivot.

Admin product actions:

- Draft, review, publish, archive and duplicate
- Bulk taxonomy/status update
- CSV import/export with preview and validation report
- ZIP or multi-file image mapping by style code
- Gallery ordering and focal-point editing
- Required-field validation before publish
- Related-product selection
- SEO preview

Seed at least 320 dummy products for performance and pagination testing; staging remains private and noindex.

## SEO and content data

Core models:

- `pages` and `page_revisions`
- `page_blocks`
- `posts`, `post_categories`, `tags`
- `faqs` and `faq_categories`
- `navigation_items`
- `site_settings`
- `seo_meta`
- `redirects` or `slug_histories`
- `certification_records`

SEO metadata supports title, description, robots, canonical, Open Graph media and an optional validated advanced schema override. Slug changes create redirect history automatically.

Certification records include facility/holder, framework, identifier, issuer, scope, issue date, expiry, verification URL, logo, private evidence file, verified state and public state. Unverified records cannot publish.

## Media system

Models:

- `media_assets`
- `media_variants`
- `media_attachments`

Metadata:

- ULID and checksum
- Disk, path and visibility
- Original filename, MIME, extension and byte size
- Width and height
- Processing status
- ALT text, caption and focal point
- Rights owner and permission/expiry details
- Creator and audit timestamps

Upload pipeline:

1. MIME sniff and extension/size validation
2. UUID/ULID path generation
3. Auto orientation
4. EXIF/geolocation removal
5. Checksum duplicate detection
6. Malware/risk check; mandatory for buyer attachments and risk-based for public product media
7. Queued derivative processing
8. Ready, failed or quarantined status

Product variants, without upscaling:

- 320px thumbnail
- 640px card
- 960px listing/detail medium
- 1280px and 1600px detail
- 2200–2400px zoom when the original supports it
- WebP and JPEG fallback
- AVIF only when hosting libraries support it reliably
- Blur placeholder

The public page never loads the zoom asset until hover/click. On touch devices, the fullscreen gallery requests it only when necessary.

## Persistent file storage

Never place user uploads in Next.js `public` or inside a replaceable release ZIP.

Preferred:

- S3-compatible storage such as R2/S3/B2 for public derivatives
- Private bucket/prefix for tech packs
- CDN only for public media

cPanel fallback:

```text
shared/
  public-media/
  private-techpacks/
  logs/
releases/
  {release-id}/
current -> releases/{release-id}
```

Each deployment replaces application code only and reconnects to shared storage. `.env`, database and uploads remain outside the release.

For shared hosting, use the database queue. Cron runs Laravel Scheduler every minute and executes queue workers with `--stop-when-empty`. Supervisor/Redis is optional when the host supports it.

Confirm before production:

- GD or Imagick
- WebP/AVIF support
- Composer and SSH
- PHP/MySQL versions and extensions
- Cron execution
- upload/post size limits
- storage and process limits

## Inquiry CRM

Primary tables:

- `inquiries`
- `inquiry_statuses`
- `inquiry_products`
- `inquiry_attachments`
- `inquiry_notes`
- `inquiry_events`
- `inquiry_tags` and pivot
- `notification_deliveries`

Lead fields:

- Contact and company
- Country, phone and WhatsApp
- Product/category context
- Quantity, destination and target date
- Message and requirements
- Assigned user, priority and next follow-up
- First/last UTM, landing page, referrer and click IDs
- Privacy-notice acknowledgement version/timestamp and separate optional marketing-consent state
- Meeting-request flag, preferred channel, timezone, preferred date/time window and agenda
- Lifecycle timestamps and close reason
- Privacy-conscious IP hash unless raw IP is legally required

Workflow:

1. Validate and rate-limit
2. Save inquiry to MySQL
3. Save product, privacy acknowledgement/consent state, source and attribution
4. Store/quarantine attachments
5. Add immutable activity event
6. Queue admin notification and email to `farooq@bonjourbangladesh.com`
7. Retry mail and show delivery state in admin

Email failure never rolls back or removes the saved inquiry.

## Tech-pack security

Initial safe allowlist:

- PDF
- DOCX
- XLSX
- JPG/JPEG
- PNG

ZIP remains disabled until the client explicitly approves the risk and scanning process. Final size and retention limits are TBC.

Controls:

- Private disk only
- MIME verification
- Mandatory malware quarantine and clean result before authorised download
- Time-limited signed download URL
- Sales/Admin permission check
- Download audit
- Scheduled expiry and purge
- Never send files or their contents to analytics or the AI knowledge base

If a reliable scanning service cannot run on the selected hosting plan, public attachment upload stays disabled at launch. The inquiry still saves safely and sales requests the tech pack through an approved manual channel after contact.

## Privacy operations and retention

Store retention rules as protected configuration for inquiry records, private attachments, AI transcripts, audit logs and backups. Final periods require client/legal approval; scheduled jobs identify due records, purge private files, anonymise eligible contact data and produce an auditable completion record.

Provide an authorised privacy-request workflow:

1. Log access, correction, export or deletion request
2. Verify the requester without placing identity documents in normal notes
3. Find inquiry, AI and attachment records through restricted search
4. Export only the requester's data in a safe format
5. Apply legal hold/exception where documented, otherwise delete/anonymise and purge private files
6. Record decision, operator and completion date without retaining unnecessary PII

Marketing consent, if introduced later, is separate from the required privacy-notice acknowledgement for handling an inquiry. Consent withdrawal stops future optional tracking/marketing but does not erase records that must remain for security or legitimate legal obligations.

## Authentication and roles

Use server-side sessions, secure HttpOnly/SameSite cookies and CSRF protection for admin.

Roles:

- Owner/Super Admin
- Admin
- Product Manager
- Content/SEO Editor
- Compliance Editor
- Sales/Inquiry Manager
- AI Supervisor
- Viewer/Analyst

Permissions are granular and enforced in Laravel Policies, not just hidden in the UI.

Account features:

- Email invitation and verification
- Password reset
- Profile name and avatar update
- Session management
- Mandatory 2FA for Owner/Admin
- Protected Owner account
- One-time expiring Owner invitation to `farooq@bonjourbangladesh.com`; no hardcoded/default password
- Audit of login, role, publish, export, private-file and settings actions

## AI assistant

Architecture:

`Next.js widget → Laravel AI gateway → approved retrieval/tools → OpenAI → response`

Laravel owns all provider keys. The provider/model sits behind an adapter so it can change without rebuilding the UI.

Launch policy:

- Use the OpenAI Responses API through a client-owned API project
- Default model: `gpt-6-luna` with low reasoning for efficient, repeatable visitor support
- Permit an admin-configured fallback model only after evaluation; do not route every routine question to the highest-cost model
- Retrieve approved FAQs/pages and live product facts through Laravel-owned tools; no open web search and no Botpress dependency
- Pin a tested model snapshot/version where operational stability requires it, and re-evaluate before any model change
- Run a representative English evaluation set covering product lookup, company facts, refusal of unknown MOQ/certification, meeting handoff and provider failure

Official OpenAI guidance recommends the Responses API and choosing models by representative workload; it describes GPT-6 Luna as the efficient option for focused/high-volume tasks: [deployment checklist](https://developers.openai.com/api/docs/guides/deployment-checklist), [model guide](https://developers.openai.com/api/docs/models).

Knowledge:

- Published pages and approved FAQ content
- Verified public compliance copy only
- Live product search through structured database tools

Allowed tools:

- `search_products`
- `get_product`
- `create_inquiry`
- `request_human`
- `get_contact_options`

Guardrails:

- Never invent price, MOQ, capacity, lead time, certification or delivery commitment
- Link to public source pages where useful
- Ask for explicit consent before creating a lead
- No open-web browsing
- No tech-pack analysis
- PII redaction and configurable retention
- Per-IP/session rate limits, turn limits and reply-length limits
- Configurable monthly usage/cost ceiling
- Client-owned API project, restricted key, usage alert and hard application-side budget cap
- FAQ/contact fallback on provider failure
- Non-streaming response fallback for cPanel compatibility

Admin controls:

- Enable/disable
- Prompt version
- Knowledge sync status
- Conversations and unresolved questions
- Feedback and lead handoffs
- Retention and usage limits
- Cost/usage reporting

## Publish and cache flow

1. Author edits a draft in Laravel
2. Reviewer previews and approves
3. Publish transaction completes
4. Laravel dispatches a signed revalidation job
5. Next.js invalidates the affected page/product/category tags
6. Short TTL acts as a fallback if the callback fails
7. Redirect and sitemap timestamps update only when relevant

## Security baseline

- TLS everywhere
- Strict CORS allowlist
- CSRF/session protection
- FormRequest validation and Policies
- Sanitised rich text and output escaping
- Content Security Policy and standard security headers
- Rate limits and honeypot; Turnstile only on suspicious/repeated traffic
- Dependency audits in CI
- Secrets stored in environment/config, never database UI
- Logs redact email, tech-pack names/content and AI PII where possible
- Separate public and private storage
- Audit log for sensitive admin actions

## Backup and recovery

- Encrypted database backup daily, retained 30 days
- Media/config backup weekly, retained eight weeks
- Offsite copy
- Object versioning/lifecycle where available
- Backup before every production migration
- Quarterly documented restore test
- Recovery procedure owned by the client, not only the developer

## Observability

Monitor:

- Uptime and SSL expiry
- Laravel exceptions and failed jobs
- Cron heartbeat
- Email delivery failures
- Next.js errors and Web Vitals
- Media-processing failures
- AI usage, errors and cost
- Backup completion

## Testing and release gates

Laravel:

- RBAC and policies
- Product draft/publish/filter/search
- Slug redirects
- Inquiry persistence before email
- Attachment quarantine and signed access
- Email retry
- Revalidation signature
- AI grounding/rate limits
- Audit log

Next.js:

- Responsive navigation
- Filter URL/deep linking
- Pagination and 404s
- Zoom/lightbox keyboard and mobile interaction
- Inquiry validation/upload/success
- WhatsApp/email actions
- AI invitation versus popup coordination
- Metadata, canonical and structured data
- Error/loading states

Cross-system:

- API/OpenAPI contract against TypeScript/Zod
- Seeded 320-product load test
- Accessibility checks
- Lighthouse/performance budget
- Browser and mobile smoke test
- Backup, migration and rollback rehearsal

## Deployment gate

1. Confirm host capabilities and subdomains
2. Run a minimal Next.js standalone proof on cPanel
3. If it fails, select Vercel without scope change
4. Prepare shared storage and environment
5. Back up database and deploy backward-compatible migrations
6. Deploy Laravel, scheduler and queue
7. Deploy Next.js and warm/revalidate content
8. Test home, filters, product, inquiry, email, private files, admin and AI
9. Verify robots, sitemap, analytics consent and monitoring
10. Complete client UAT, DNS/SSL, training and handover

## Decisions pending before production

- cPanel Node support and exact server versions
- Object-storage/CDN provider
- SMTP sending domain and DNS records
- Tech-pack file size and retention
- Malware-scanning service or attachment-upload launch fallback
- Final WhatsApp number confirmation
- AI budget and transcript retention
- Analytics and legal account access
- Product/certification evidence
- Repository/CI provider
- Client-owned OpenAI API project, billing limit and approved data-retention setting


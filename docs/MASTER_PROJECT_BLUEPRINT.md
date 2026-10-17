# Bonjour Bangladesh Master Project Blueprint

Status: planning baseline for development; buyer journey and public copy are governed by `BUYER_JOURNEY_AND_SITEMAP.md` and `PUBLIC_SITE_COPY.md`  
Version: 1.1  
Primary goal: qualified overseas buyer leads

## Product definition

Bonjour Bangladesh will be a premium English-language B2B website with two connected systems:

1. A public trust, product-discovery and lead-generation website
2. A private admin, content, product, inquiry CRM and AI-control system

It is not an ecommerce store, buyer portal, order tracker or production ERP in this release.

## Fixed scope

### Public website

- Responsive marketing website
- Catalog architecture tested to showcase 300+ products
- Men, Women and Kids product navigation
- Knit, Woven and Fully Fashioned Knitwear construction groups
- Search, filters, pagination and related products
- One product image per detail page, with desktop hover zoom and accessible fullscreen view
- Capabilities, Quality Control, Responsible Sourcing and Sustainability pages
- About, FAQ, Insights, Contact and legal pages; Foundation page prepared but publication evidence-gated
- Product-specific inquiry and full request-a-quote form
- Optional tech-pack/reference upload
- AI customer-support assistant
- Direct WhatsApp, email and phone actions
- Conditional 40-second inquiry invitation

### Admin system

- Secure authentication, invitations, password reset and profile management
- Multiple permission-based user accounts
- Product and taxonomy management
- Bulk product import and image mapping
- Media library and automatic image processing
- Structured page, FAQ, blog and SEO management
- Inquiry CRM, notes, assignments, reminders and status history
- Private tech-pack management
- Certification/evidence records
- AI knowledge, conversation and lead-handoff control
- Redirects, navigation, global settings, audit logs and backup visibility

### Explicit exclusions

- Buyer registration or portal
- Buyer-facing order tracking
- Sampling approval workflow
- Production milestones
- Operational inspection/test/CAP records
- Payment or checkout
- Live-agent inbox takeover

These can be added later without changing the public information architecture.

## Confirmed company facts

- Brand: Bonjour Bangladesh
- Managing Director: Syed Moyeenul Farooq
- Operating since: 2010
- Business model: selected partner factories
- Address: House 8, Road 6/A, Sector 4, Uttara, Dhaka 1230, Bangladesh
- Email: farooq@bonjourbangladesh.com
- Phone and intended WhatsApp: +880 1798 775477
- Initial language: English only
- Inquiry destination: admin CRM and email notification
- Initial communication: WhatsApp and email; Zoom/Google Meet arranged afterwards

The meaning of the supplied “25+” must be confirmed before it appears publicly.

## Primary audiences and intent

| Audience | Need | Primary journey |
|---|---|---|
| Fashion brand sourcing team | Find capable product and sourcing partner | Category → product → tech-pack inquiry |
| Importer or wholesaler | Evaluate range, reliability and fit | Home → products/capabilities → RFQ |
| Product developer | Review fabrics, construction and sampling support | Product detail → capabilities → inquiry |
| Compliance or quality stakeholder | Verify process and partner-facility standards | Quality/Compliance → supporting evidence → contact |

## Draft target-market priority

Initial buyer-research and campaign testing should prioritise the United Kingdom, Germany, Spain, France, the Netherlands, Italy, the United States and Canada. The shortlist uses current Bangladesh apparel-export market evidence from [BGMEA's export-performance data](https://www.bgmea.com.bd/page/Export_Performance), then must be refined against Bonjour's actual product strength and lead quality. These are target markets, not claims that Bonjour already serves them. Public “markets served” wording stays hidden until the client confirms commercial history.

Do not build eight thin country SEO pages. Validate demand, buyer fit and lead quality first; add a country page later only when Bonjour can provide unique market-specific products, requirements, proof and expertise.

## Header and footer

Header:

`Logo | Products | Capabilities | Quality & Responsibility | About | Request a Quote`

Home is reached through the logo. Product navigation uses a buyer-friendly mega menu. Quality & Responsibility leads to a hub for Quality Control, Compliance and Sustainability. Contact, FAQ, Insights and legal pages stay in the footer. Foundation appears only after its evidence gate passes.

Footer groups:

- Company
- Products
- Capabilities
- Quality and responsibility
- Help and contact
- Legal
- Direct WhatsApp, email, LinkedIn and address

## Final sitemap

### Core

- `/`
- `/about/`
- `/capabilities/`
- `/quality-compliance/`
- `/quality-control/`
- `/compliance-responsible-sourcing/`
- `/sustainability/`
- `/faq/`
- `/contact/`
- `/request-a-quote/`

### Catalog

- `/products/`
- `/products/men/`
- `/products/women/`
- `/products/kids/`
- `/products/{audience}/knit/`
- `/products/{audience}/woven/`
- `/products/{audience}/fully-fashioned-knitwear/`
- `/products/{descriptive-product-slug}-{style-code}/`

The product URL stays independent of taxonomy so a later category change does not break it.

### Content and trust

- `/insights/`
- `/insights/{slug}/`
- `/factory-partners/` (draft route; publish only with genuine facility imagery and permission)
- `/hashmat-ali-foundation/` (draft route; not public/indexable until evidence approval)
- `/privacy-policy/`
- `/terms-and-conditions/`
- `/cookie-policy/`
- `/disclaimer/`

The partner manufacturing gallery launches as a section under About/Capabilities only if genuine facility photography and permission are available. It becomes a standalone page under the same evidence gate. The Foundation route remains draft, private and `noindex` until legal status, activities, evidence and imagery are approved.

## Homepage steps

The canonical, buyer-led H01–H12 section sequence, copy and review gates are in `BUYER_JOURNEY_AND_SITEMAP.md` and `PUBLIC_SITE_COPY.md`. The previous separate Men/Women/Kids and construction gateways are now one audience section with direct construction sublinks; this shortens the buyer path and brings actual products higher on the homepage.

Do not display an Insights preview until at least three expert-reviewed articles exist. Keep the Foundation and factory gallery unpublished until genuine evidence, permissions and imagery are supplied.

## Product experience

### Catalog journey

Primary hierarchy:

`Men / Women / Kids → Knit / Woven / Fully Fashioned Knitwear`

Additional filters:

- Product type
- Fabric and composition
- GSM
- Fit
- Finish or wash
- Season
- Colour
- Size

The listing includes search by product name/style code, result count, removable filter chips, sort, mobile filter drawer, stable pagination and clear empty states.

### Product detail

- Breadcrumbs
- One responsive, approved product image; no detail-page thumbnails
- Desktop pointer-position zoom loaded on first hover
- Keyboard-accessible fullscreen lightbox
- Mobile fullscreen viewing
- Name, style code and taxonomy
- Composition, GSM, fit, sizes, colours and season
- Description, features, finish/wash and construction
- Optional verified MOQ and lead time
- Related products
- Product-prefilled inquiry
- WhatsApp/email contact option

The zoom asset never loads in the initial page payload.

## Conversion behaviour

### Inquiry forms

Quick inquiry:

- Name
- Business email
- Company
- Interest or message
- Optional reference/tech pack
- Required privacy-notice acknowledgement; separate optional marketing consent only if marketing opt-in is introduced

Full RFQ:

- Contact and company
- Product or category
- Quantity
- Fabric/composition if known
- Destination country
- Target shipment date
- Target price if available
- Quality/compliance requirements
- Notes
- Optional attachments
- Required privacy-notice acknowledgement; separate optional marketing consent only if marketing opt-in is introduced

Product CTAs automatically attach product ID, style code and source page.

### Engagement rules

- At 15 seconds, show one contextual AI text invitation per session
- Sound is allowed only after a prior visitor interaction and when the visitor has not muted it; silence is the accessible fallback
- At 40 seconds, show the inquiry invitation only when chat/RFQ is unopened, no form is active, no lead has converted and intent is present
- Intent may be a second page, product view or meaningful scroll
- Chat and popup never open together
- Remember dismissal for seven days
- On mobile, use a compact non-intrusive sheet; never obscure the main content immediately after entry
- Use a single contact launcher for AI, WhatsApp and email on small screens

Meeting requests are a handoff, not a booking engine. AI or forms may collect preferred channel, timezone, preferred date/time window and a short agenda. The CRM marks the lead `Meeting requested`, alerts the assigned sales user and includes direct WhatsApp/email actions; the team confirms and sends a Zoom or Google Meet link manually.

## Inquiry CRM

Default stages:

`New → Contacted → Qualified → Quoted → Won / Lost / Spam`

CRM features:

- Assignment, priority and next follow-up
- Internal notes and immutable activity timeline
- Product and attachment context
- First-touch and last-touch attribution
- Source page, campaign, UTM, referrer and click IDs
- Email delivery and retry status
- Export based on permission
- Configurable statuses without code changes

The database saves the inquiry before any email is sent. Email failure can never lose a lead.

## Roles

- Owner or Super Admin
- Administrator
- Product Manager
- Content and SEO Editor
- Compliance Editor
- Sales or Inquiry Manager
- AI Supervisor
- Viewer or Analyst

The Owner can create users, roles and permissions. Every user can update their own name, profile image and password. Owner/Admin accounts require two-factor authentication.

## Content management principle

“Fully dynamic” means structured, safe editing—not an unrestricted page builder.

- Typed page sections preserve design quality
- Products use required structured fields
- Draft, review and publish states are separate
- Revision history and preview are available
- SEO fields are editable by authorised roles
- Slug changes automatically create redirects
- Unverified certification records cannot publish

## Certification staging policy

Supplied certification images may be used only in private staging as pending-verification layout placeholders.

Production rules:

- Describe standards as available through selected partner facilities
- Store facility, holder, scheme, ID, issuer, scope, dates and verification URL
- Require evidence and logo-use permission before public display
- Never publish the watermarked WRAP image
- Do not treat Bangladesh Bank or Bangladesh Government seals as certification marks
- Describe amfori BSCI and SMETA/Sedex accurately as audit frameworks

## Development sequence

### Phase 0 Planning

- Scope, sitemap, brand, SEO, content/claims and architecture locked

### Phase 1 Foundation

- Repository and environment setup
- Professional logo kit: vector redraw, horizontal/stacked/B-mark, reversed/mono, favicon and print exports; client approval before public use
- Design tokens and shared components
- API contract, database and dummy seed data
- Authentication, roles and global settings

### Phase 2 Media and catalog foundation

- Media pipeline
- Taxonomies and products
- Bulk import and product API

### Phase 3 Homepage

- Build and approve each homepage step in the sequence above

### Phase 4 Catalog

- Product index
- Audience and construction category pages
- Product detail, zoom and related products

### Phase 5 Conversion

- Quick inquiry, full RFQ and tech packs
- CRM, email delivery and attribution
- Contact launcher and popup coordination

### Phase 6 Content pages

Build and approve the inner pages one at a time in this order:

1. Capabilities
2. Quality & Compliance hub
3. Quality Control
4. Compliance & Responsible Sourcing
5. Sustainability
6. About
7. FAQ
8. Insights index and article template
9. Factory Partner Gallery draft/template; publish only after its evidence gate
10. Hashmat Ali Foundation draft/template; publish only after its evidence gate
11. Privacy, Terms, Cookie Policy and Disclaimer

The full Request a Quote and Contact pages are completed in Phase 5 alongside inquiry CRM and conversion testing. The detailed buyer-led delivery order is in `BUYER_JOURNEY_AND_SITEMAP.md`.

Every page follows the same gate: content/claim review → desktop/mobile design → build → accessibility/performance/SEO QA → approval. Work does not move to the next page until the current page is accepted or explicitly parked.

### Phase 7 AI

- Approved knowledge retrieval
- Product search tools
- Inquiry/human handoff
- Admin controls, limits and reporting

### Phase 8 Optimisation

- Technical SEO and schemas
- Analytics and consent
- Accessibility, browser, security and performance QA

### Phase 9 Launch

- Staging UAT
- Verified content replacement
- Backup and deployment rehearsal
- DNS/SSL/monitoring
- Search Console submission
- Admin training and handover

## Acceptance targets

- No buyer portal or operational order features in release one
- All public content editable through structured admin fields
- 300+ products tested without UX or query degradation
- LCP at or below 2.5s, INP at or below 200ms and CLS at or below 0.1 at the 75th percentile
- WCAG AA contrast, keyboard navigation and accessible forms/gallery
- Inquiry saved before email and visible in CRM
- Private files never publicly addressable
- Deployment does not overwrite uploads, `.env` or database data
- No dummy, unverified or staging content indexed
- Client owns domain, hosting, source, database and analytics accounts

## External items still required before production

- Meaning and proof of “25+”
- Real product data and images
- Verified partner-factory/certification evidence and permissions
- Capacity, MOQ, lead-time and served-market facts
- WhatsApp confirmation and map pin
- Tech-pack file types, maximum size and retention period
- Legal/privacy/cookie approval
- Client-owned GA4, GTM and Search Console accounts
- SMTP/from-address and SPF/DKIM/DMARC setup
- cPanel Node.js/Application Manager enablement proof and exact runtime/process details; Vercel remains a contingency if that proof fails
- Final AI monthly budget and transcript-retention period


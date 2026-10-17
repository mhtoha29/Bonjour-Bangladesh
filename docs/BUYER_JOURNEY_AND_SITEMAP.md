# Bonjour Bangladesh — Buyer-led website structure

Status: content and information-architecture baseline for section-by-section development  
Updated: 16 October 2026  
Language: international British English  
Primary outcome: qualified overseas buyer inquiries, not consumer checkout

## The decision behind the order

An overseas buyer needs to answer five questions quickly: **Can you source my product? What can I inspect? How do you control quality and partner-facility risk? Who will respond? How do I send my brief?** The site follows that sequence. Visual luxury comes from original garment imagery, editorial typography, controlled spacing and fast interaction—not decorative effects or unsupported badges.

The [Asia Link homepage](https://asialinkbd.com/) has a useful photography-led mood, but its current scroll separates product imagery from clear buyer paths and has long low-information gaps on mobile. Its [catalog](https://asialinkbd.com/products/) offers useful filter dimensions, while the [example product](https://asialinkbd.com/product/product-82/) shows a gallery but little visible specification or inquiry context. Bonjour keeps the relevant inspiration and makes the buyer path more explicit: searchable categories, genuine specifications, quality/process proof and a product-prefilled RFQ on every detail page. This is a product-design objective, not a numerical claim of being “10× better”.

## Global navigation

Desktop header: `Products | Capabilities | Quality & Compliance | centered Logo/Home | About | Contact | Request a Quote`.

- **Products** opens a mega menu: Men / Women / Kids → Knit / Woven / Fully Fashioned Knitwear, plus View All Products. Search is available within the product finder/catalog, not a crowded top bar.
- **Quality & Responsibility** is one hub linking Quality Control, Compliance & Responsible Sourcing and Sustainability. These pages do not each need a top-level nav item.
- FAQ, Insights and legal pages live in the footer; Contact also has a top-level route per the final visual reference. Foundation has a noindex staging preview and footer link, but public publication remains evidence-gated. Factory Partner Gallery remains a draft. On mobile, the menu includes direct WhatsApp and email actions.
- The single conversion CTA in the header is Request a Quote. Product and content pages keep contextual inquiry actions.

## Home: exact section order and per-section build steps

Each row is one reviewable step: approve copy/data → desktop/mobile design → Next.js/Laravel connection → accessibility, performance and SEO check → owner feedback. Global header and footer are reusable components; do not rebuild them per page.

| Step | Section | Buyer question answered | Content and interaction |
|---|---|---|---|
| H01 | Header + inset editorial hero | “Am I in the right place?” | Garment photography, shallow curved logo cutout, exact client slogan, Explore Products and illustrative Bangladesh-to-world map. Catalog filters stay on Products. |
| H02 | Who We Are | “Who is behind this?” | Editorial company story: Dhaka-based buying house since 2010, selected manufacturing partners, Managing Director Syed Moyeenul Farooq. No invented client or certification claim. |
| H03 | What We Do | “What will you coordinate?” | Three connected service pillars: develop the product; match and follow the manufacturing partner; coordinate quality and shipment readiness. Link to full Capabilities. |
| H04 | Our Commitment | “What will you be accountable for?” | Full-viewport editorial statement using the client’s exact line: “The right quality. The right time. The right commitment.” |
| H05 | Apparel range | “Do you handle my category?” | Men, Women and Kids cards, each with Knit, Woven and Fully Fashioned Knitwear sublinks. |
| H06 | Product possibilities | “What can I actually source?” | Product cards when approved; staging-only previews until records and images are approved. “Selected Styles” was an internal editorial label, not client copy. |
| H07 | From brief to shipment | “How will the work progress?” | Six concise stages from brief and sampling through production, QC and shipment coordination; no buyer-facing tracking promise. |
| H08 | Quality & responsibility | “How do you manage risk?” | Paired QC and responsible-sourcing paths. |
| H09 | Certifications & partner standards | “What evidence can I inspect?” | Client-supplied reference marks appear in private/noindex review only. Public artwork requires current facility-level proof and mark-use permission. |
| H10 | Sustainability | “Can you support sustainability requirements?” | Buyer-specific material, resource, chemical, packaging and people options; no unsupported impact metrics. |
| H11 | Foundation | “What is the community commitment?” | Client-supplied Hashmat Ali Foundation story in noindex review; public approval remains gated. |
| H12 | Buyer questions | “What about MOQ, samples and tech packs?” | Four FAQ previews with links to full FAQ and relevant pages. |
| H13 | Final inquiry invitation | “What do I send next?” | Send a product brief or tech pack, or contact by WhatsApp/email. |
| H14 | Footer | “Where else can I verify?” | Product paths, services, quality/responsibility, company, contact and legal draft links. |

The visitor-guide greeting appears shortly after the page becomes visible, subject to browser sound policy and a mute option. The conditional 40-second inquiry prompt is a separate global behaviour and never appears over an open chat. Both respect dismissal and accessibility settings. The present guide uses approved FAQ answers; a live AI provider is a later integration.

## Full public page map

### Priority 1 — conversion and product discovery

| URL | Page job | Key sections |
|---|---|
| `/` | Orient, prove relevance, route to catalog/RFQ | H01–H14 above |
| `/products/` | Browse 300+ styles efficiently | Intro, Men/Women/Kids links, search, filters, count, grid, pagination, inquiry help |
| `/products/men/`, `/products/women/`, `/products/kids/` | Audience landing pages | Unique short intro, three construction links, relevant products, FAQ/RFQ |
| `/products/{audience}/{construction}/` | Nine indexable construction pages | Unique buyer-useful intro, product types, filtered grid, relevant sourcing note, RFQ |
| `/products/{descriptive-slug}-{style-code}/` | Evaluate one style | One image with zoom, H1/style code, specifications, development possibilities, related products, product-prefilled inquiry |
| `/request-a-quote/` | Convert a qualified brief | Short explanation, structured RFQ with optional private tech pack, direct contact alternatives, privacy note |
| `/contact/` | Reach the team | WhatsApp, email, phone, address, map after pin verification, concise contact form |

`{construction}` is `knit`, `woven` or `fully-fashioned-knitwear`. Product URLs stay independent of taxonomy changes. “Fully Fashioned Knitwear” is the public label; “Fully Fashion” from the source chart is treated as shorthand, not a separate product category. Denim, outerwear, activewear etc. are product types/material families under the appropriate construction, not competing top-level navigation.

### Priority 2 — capability and trust

| URL | Page job | Key sections |
|---|---|
| `/capabilities/` | Explain end-to-end service | Partner sourcing, product/sampling, fabrics/trims, production follow-up, QC, testing, shipment coordination |
| `/quality-compliance/` | Give one buyer-friendly trust doorway | Quality process overview, responsible sourcing, sustainability, documentation and links |
| `/quality-control/` | Answer technical QC questions | Pre-production, materials, inline, measurements/workmanship, agreed AQL final, testing, corrective action, packing |
| `/compliance-responsible-sourcing/` | Explain requirement-based partner assessment | Social, safety, environment, chemical, product, audits/documents, buyer-specific requirements |
| `/sustainability/` | Explain practical options without greenwashing | Materials, water/energy/waste, chemicals, packaging, people, order-specific verification |
| `/about/` | Introduce company and accountable people | Since 2010, partner-factory model, working philosophy, MD, process/quality commitment, contact |
| `/faq/` | Resolve buyer objections | All 22 approved source questions, grouped by sourcing, development, QC, compliance and starting an inquiry |

### Priority 3 — editorial, trust and legal

| URL | Rule |
|---|---|
| `/insights/`, `/insights/{slug}/` | Publish only expert-reviewed, original articles with named author/reviewer; no filler posts at launch. |
| `/factory-partners/` | Draft route only until real facility photos, captions and permission exist. If evidence remains unavailable, use a modest section within About/Capabilities instead. Never imply ownership. |
| `/hashmat-ali-foundation/` | Client-text preview is visible on the local site and remains noindex until identity, activities and publication rights are confirmed. |
| `/privacy-policy/`, `/terms-and-conditions/`, `/disclaimer/`, `/cookie-policy/` | Client/legal review required before publishing final language; the supplied Legal.docx is a starting draft, not a compliance sign-off. |

## Catalog and product-content contract

Buyer hierarchy: **Men / Women / Kids → Knit / Woven / Fully Fashioned Knitwear → Product type**. Filters may include fabric/composition, GSM, fit, finish/wash, season, colour and size only when product data supports them. Do not display empty filters. Search accepts product name and style code; filter state remains in the URL, with removable chips, count, sort, pagination and a useful zero-result state.

Every published product requires: unique name, style code, audience, construction, product type, original description, one approved image with rights and alt text, and enough specifications to make an inquiry useful. Optional fields: composition, GSM, fit, sizes, colours, finish/wash, features, season, verified MOQ/lead time. Unsupported fields stay blank, not filled with demo values.

Detail order: breadcrumb → one large image with desktop pointer zoom and accessible fullscreen viewer → name/style/category and primary `Inquire About This Style` action → concise specification table → description/features/finish → development/customisation note → related styles → secondary RFQ/WhatsApp/email. Zoom is an enhancement, never the only way to inspect the image. The inquiry carries product ID, code and source URL, and allows tech-pack/reference attachment.

## Visual rules from the supplied ideas

- `hero.png` and `Home.webp`: adopt the inset rounded photo frame, integrated top navigation, editorial product display and confident whitespace. The requested map replaces the former hero finder; filters remain on the catalog.
- Green references: use the idea of clean, distinct service cards and strong section rhythm, but not their unrelated theme or saturated full-page green.
- Gallery reference: use restrained layered imagery only for real product/factory photographs. The product catalog itself stays predictable and scannable.
- Infographic references: communicate the sourcing steps with simple original line graphics. Avoid glossy 3D ribbons and stock infographics.
- Palette: Warm Ivory `#FAF8F2`, Deep Charcoal `#19241E`, Vivid Green `#1C9B5B` with dark CTA text, White, Warm Stone `#EEEBE2`, Soft Green `#E5F7EC`, restrained Buyer Crimson `#A92834`. Newsreader headings; Manrope navigation/body/admin. This preserves the logo's red/green relationship without turning the interface into a flag-colour theme.

## SEO and marketing foundation

- Every indexable page has distinct search intent, helpful visible content, one H1, unique title/description, self-canonical URL, descriptive internal links and appropriate schema. Do not create thin country pages for the eight target markets.
- Next.js renders key page/product content in initial HTML. Sitemaps contain only published canonical URLs; draft products, dummy images, admin/preview, internal search and faceted combinations stay out of the index. Product filters do not create unbounded crawl paths.
- Use actual product specifications and process knowledge as differentiators. Avoid keyword stuffing, copied Asia Link wording, fake reviews, blanket certification claims or “best buying house” positioning.
- Product media receives responsive derivatives, dimensions, meaningful alt text and lazy loading below the fold. The hero uses a priority-sized real image; 8K source files are never sent as default assets.
- GA4/GTM and Search Console belong to the client. Measure `view_item_list`, `select_item`, `view_item`, `filter_products`, `start_rfq`, `submit_rfq`, `whatsapp_click`, `email_click`, `ai_handoff` and lead quality/UTM in the CRM. Analytics consent and privacy text must match the deployed tools.
- Google recommends original people-first content, and warns that uncontrolled faceted URLs can consume crawl resources: [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [faceted-navigation guidance](https://developers.google.com/crawling/docs/faceted-navigation). The detailed implementation rules remain in `SEO_AND_ANALYTICS_BLUEPRINT.md`.

## Delivery order without losing the section-by-section review model

1. **Foundation gate:** verify cPanel Node process/runtime, approve logo redraw and design tokens; set up Laravel content/product/media/inquiry schemas, roles and persistent storage. A minimal working RFQ destination is needed before hero CTAs are considered finished.
2. **Homepage:** build H01 through H14 sequentially. Use dummy product imagery only in protected/noindex staging; replace before launch. Each section waits for the owner's feedback or explicit “continue”.
3. **Catalog:** products index → three audience pages → nine construction templates → product detail/zoom → bulk import and real product QA. Test at 300+ records.
4. **Conversion:** full RFQ, product-specific inquiry, tech-pack security, email notification/retry, CRM assignment/follow-up, Contact page.
5. **Trust pages:** Capabilities → Quality & Responsibility hub → Quality Control → Compliance → Sustainability → About → FAQ. Then Insights only when real articles are ready.
6. **Admin:** product/media editor, structured page copy and SEO fields, inquiries/CRM, FAQ/blog, roles/profile/password reset, evidence/certification register, AI knowledge/control, audit/backup visibility. Admin design is separate from the public luxury aesthetic: clean, fast, readable.
7. **AI and launch:** approved website/FAQ knowledge, product search, meeting-request handoff (WhatsApp/email first; Zoom/Meet arranged manually), rate/usage controls; legal/evidence review, accessibility/SEO/security/performance UAT, backups and deployment rehearsal.

No buyer portal, buyer-facing order tracking, production milestones, operational QC/CAP dashboard or e-commerce checkout are part of this release. The client-supplied QC/CAP material becomes public explanation and internal editorial reference, not a production-management system.

## Remaining approval/data gates

Real product names/specifications/photos and rights; meaning of “25+”; partner-factory and certification evidence/mark permission; MD portrait/bio; foundation evidence; map pin; WhatsApp number confirmation; legal/privacy/retention text; analytics/mail/API account access; cPanel Node proof. These do not block design-system, templates or noindex staging. They do block public claims or launch of the affected content.


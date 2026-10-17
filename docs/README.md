# Bonjour Bangladesh Planning Index

Planning date: 13 October 2026  
Scope: premium public B2B website plus Laravel admin/CRM/content/AI control; no buyer portal, order tracking or production ERP

## Source-of-truth documents

1. [Buyer Journey and Sitemap](./BUYER_JOURNEY_AND_SITEMAP.md) — canonical buyer-led homepage order, lean navigation, page map and section-by-section delivery sequence
2. [Public Site Copy](./PUBLIC_SITE_COPY.md) — English homepage, core-page, catalog, FAQ and global interaction copy ready for client review
3. [Master Project Blueprint](./MASTER_PROJECT_BLUEPRINT.md) — locked scope, system behaviours, workflow and acceptance; the two documents above supersede its older homepage/header order
4. [Brand Guidelines](./BRAND_GUIDELINES.md) — positioning, voice, colour, typography, logo and imagery
5. [Design System](../design-system/bonjour-bangladesh/MASTER.md) — implementation tokens, components, responsive, motion and accessibility rules
6. [Content, Claims and Client Review](./CONTENT_CLAIMS_AND_CLIENT_REVIEW.md) — all 13 client DOCX sources, confirmed/conditional/prohibited claims and review checklist
7. [SEO and Analytics Blueprint](./SEO_AND_ANALYTICS_BLUEPRINT.md) — intent map, URLs, catalog indexing, schemas, content, GA4 events, consent and launch gate
8. [Technical Architecture](./TECHNICAL_ARCHITECTURE.md) — Next.js/Laravel boundary, data/API/media/CRM/AI/security/testing
9. [Admin Panel Blueprint](./ADMIN_PANEL_BLUEPRINT.md) — navigation, dashboard, screens, workflows, roles and admin build order
10. [Deployment Runbook](./DEPLOYMENT_RUNBOOK.md) — cPanel/Vercel decision, runtime proof, ZIP packaging, persistent uploads, update, rollback and backup
11. [Development Start Model](./DEVELOPMENT_START_MODEL.md) — selected hero reference, desktop/mobile model, first build slice and review gate

## Locked decisions

- Next.js public frontend with SSR/ISR; Laravel 13 API/admin and MySQL
- cPanel is the primary Next.js/Laravel host while Node support is enabled and verified; Vercel remains the frontend contingency
- English-only launch; British English editorial style
- 300+ product-capable catalog with Men/Women/Kids and Knit/Woven/Fully Fashioned Knitwear hierarchy
- One product image per detail page with desktop zoom and accessible fullscreen
- Inquiry CRM saves before email; private, scanned tech-pack handling
- Custom Laravel-controlled AI assistant through OpenAI Responses API; no Botpress dependency
- Vivid Green/Buyer Crimson/Editorial Ink/Warm Ivory palette; Newsreader + Manrope
- Evidence-gated certification/factory/Foundation claims
- Homepage built section by section; inner pages and admin screens approved one at a time

## External inputs that do not block foundation development

- Real product records and licensed photography
- Meaning/evidence for “25+” and final commercial claims
- Certification/factory evidence and mark permissions
- Legal/privacy/retention approval
- cPanel runtime proof and mail DNS access
- Client-owned analytics, repository/Vercel if used and OpenAI API accounts

Do not start production implementation until the owner approves the planning baseline and explicitly authorises development Step 1.

# Bonjour Bangladesh — frontend

Next.js 16 public-site frontend. Run `npm install` and `npm run dev` from this directory; the local preview is at `http://127.0.0.1:3000`.

## Current scope

- Responsive public pages: Home, Products and product detail, About, Capabilities, Quality & Compliance, Quality Control, Compliance, Sustainability, FAQ, Contact, Request a Quote, and Insights.
- Nine `PREVIEW-*` concepts are clearly labelled while the published catalog is empty. Once approved products are published, the public catalog and product pages use Laravel records with filtering and pagination. Each product has one server-optimized WebP image and editable garment/SEO details.
- Homepage hero copy, metadata, and desktop/mobile hero images are editable in the admin studio. Other inner-page copy is still frontend staging content; quality/partner and AI controls are labelled as planned, not falsely presented as live.
- The homepage currently rotates seven optimized local apparel images every four seconds, with pause and reduced-motion support. An admin-uploaded hero image replaces the first slide. The overlapping map panel is an illustrative global-outlook graphic derived from public-domain Natural Earth 1:110m land data; it does not claim actual shipment routes.
- Popup and full RFQ forms save inquiries to Laravel, including private tech-pack attachments, and attempt an email notification. The visitor concierge is a guided FAQ preview, not a connected AI service.
- Admin studio has secure login/reset, lead review/status, product management, homepage content, owner-managed team roles, and profile editing. The owner account is seeded for `farooq@bonjourbangladesh.com` with a random unknown password; first access uses the reset email after SMTP is configured.
- The site remains `noindex` with an empty sitemap by default. Set `SEO_INDEXABLE=true` only after approved media, verified claims, legal copy and mail delivery are ready; the sitemap then includes published products.

## Deployment configuration

For Vercel, set the project Root Directory to `apps/web`.

Copy `.env.example` to the web environment and replace local URLs with the production site and Laravel API origins. Configure Laravel `APP_URL`, `FRONTEND_URL`, `INQUIRY_RECIPIENT`, real SMTP settings, database credentials and public storage link. Keep Laravel `storage/` and database outside replaceable code releases (or link them into each release) so uploads survive ZIP-based updates. Next.js requires a persistent Node runtime; a static file upload alone cannot run the dynamic/admin routes.

## Checks

Run `npm run lint` and `npm run build` before handoff. The Laravel API is in `../api` and has its own test suite.

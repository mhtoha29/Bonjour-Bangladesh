# Bonjour Bangladesh Development Start Model

Status: ready for section-by-section implementation  
Updated: 13 October 2026  
Owner-selected hero reference: `design idea for me/hero.png`

## Working agreement

The public website uses Next.js App Router and the admin/API uses Laravel. The cPanel host is being enabled for Next.js; the actual Node process, versions, app mapping and restart mechanism still need a small host proof before production deployment.

Each homepage section is a separate delivery slice. For each slice: confirm content and interactions → desktop/mobile design → build → check responsive/accessibility/performance/SEO → review → move to the next section. Inner pages and admin screens follow their approved sequences in the master and admin blueprints. Product data, content and presentation remain connected to Laravel from the beginning, including when staging uses dummy records.

The first implementation slice is the global header plus the homepage hero. Its visual model is below. The visual mockups are review references, not deployable UI assets.

## Hero visual model

The user's `hero.png` controls the composition:

1. Warm Ivory outer page canvas with a large inset photograph and generous rounded corners.
2. Navigation integrated across the top of that image frame.
3. A centered editorial headline over a controlled dark image area.
4. One strong exploration action and a restrained inquiry path.
5. A white catalog-discovery panel overlapping the image's lower edge on desktop.

Bonjour adaptation:

- Replace boating imagery with authentic apparel, fabric and garment-detail photography.
- Keep the supplied Bonjour mark as the visual reference; redraw it as a faithful vector for the actual UI. A generated mockup may approximate the mark, so never extract the logo from a concept image.
- Use Newsreader for the main headline and Manrope for navigation, supporting copy and controls.
- Use the current palette: Warm Ivory `#FAF8F2`, Vivid Green `#1C9B5B` with dark text, Editorial Ink `#19231E`, White, and limited Buyer Crimson `#A92834`.
- Preserve clear text contrast with a subtle image overlay; the overlay is tuned to the selected final photograph.
- Keep all text and controls as real HTML, never baked into the hero photograph.

### Desktop layout

- Visual frame spans almost the full viewport with approximately 26px desktop gutters, matching the owner-supplied final screenshot.
- Header sits inside the top zone of the photo frame, with a calm light logo tab. Navigation is balanced around it.
- Header destinations follow the final screenshot: Products, Capabilities and Quality & Compliance on the left; About, Contact and Request a Quote on the right. The quality hub contains QC, responsible sourcing and sustainability. FAQ and Insights remain in the footer.
- Headline sits in a protected central text area; max line length and line breaks are tuned to the real photo.
- Primary hero action: Explore Products. The header RFQ button provides a second high-intent entry without repeating a large hero CTA.
- Floating finder fields: Category (Men/Women/Kids), Construction (Knit/Woven/Fully Fashioned Knitwear), Product Type, and Browse Products.
- Selection is optional; Browse Products with no selection opens `/products/`. With selections, the action uses a clean category route where one exists, then query parameters only for additional filters.

### Mobile layout

- Compact ivory header with real logo, Menu and a visible Quote action.
- Hero remains an inset rounded photo, with subject focal point adjusted for the narrow crop.
- H1 stays readable while the model and garment imagery remain visible lower in the tall art-directed crop.
- Explore Products remains the main button; the header quote action and downstream inquiry section cover the conversion path.
- Finder becomes a separate panel directly below the photo. Category and Construction are visible first; Product Type can appear after a selection or in the catalog page. It must not cover the H1 or CTA.
- Touch targets are at least 44px; no hover-only action, horizontal overflow or hidden controls.

### Content contract

- Eyebrow: `BONJOUR BANGLADESH · SINCE 2010`
- H1: `Your Trusted Garment Buying House & Sourcing Partner in Bangladesh` (exact client slogan from `About Bonjour bangladesh.docx`)
- Supporting copy: `From product development and sourcing to quality follow-up and shipment coordination, we help international buyers move with confidence.`
- Button labels: `Explore Products`, `Send Your Tech Pack`, `Browse Products`, `Request a Quote`
- No factory ownership, certification, capacity, client-logo or market-served claim appears in the hero without approved evidence.

### Functional contract

- H1, supporting copy, action labels, hero media/alt text and finder labels/options are structured Laravel content/settings where editing is appropriate; the layout itself stays controlled by the design system.
- Category/Construction options come from the published catalog taxonomy, not hardcoded mock data.
- The hero image uses responsive sources, art-directed desktop/mobile crops and explicit dimensions. It is the likely LCP image and receives appropriate priority. Do not load an 8K master or gallery zoom asset into the initial payload.
- The finder is a real accessible form with visible labels, keyboard support and a predictable submit action.
- The hero provides one crawlable link to Products and one to Request a Quote. Important category links also exist in the next homepage section for search engines and users.
- Navigation, overlay and finder do not jump as fonts/images load. Motion is subtle and respects reduced-motion preferences.

## Visual concept files

- Desktop: `design-concepts/ui-direction-v1/hero-reference-adapted-desktop-v2.png`
- Mobile: `design-concepts/ui-direction-v1/hero-reference-adapted-mobile.png`
- Earlier footer mood: `design-concepts/ui-direction-v1/footer-concept.png`

The generated concepts show styling and composition only. Generated product scenes and any printed garment details are dummy material for review, not publishable company evidence. The exact copy, logo and interaction behaviour are governed by the specifications above, not by pixels in a concept image.

## Architecture model

```text
Buyer browser
    ├── Next.js: public pages, catalog discovery, forms, AI widget, SEO
    └── Laravel API: published content, products, inquiries, media metadata
                     ├── MySQL: content, catalog, CRM and users
                     ├── Persistent public media and private tech packs
                     ├── Queue/cron: image processing, mail, revalidation
                     └── Admin: products, pages, SEO, CRM, evidence and AI controls
```

The client can edit product records and approved page content in Laravel. Publishing invalidates the relevant Next.js pages. Inquiry records save before notification email. Files live in persistent storage outside replaceable application releases.

## First build slice and review gate

1. Verify cPanel Node.js version, persistent process/application mapping, PHP/Laravel runtime, subdomains and upload limits.
2. Establish project skeleton, environments, approved design tokens and faithful vector logo kit.
3. Define Laravel site settings, navigation and catalog-taxonomy API contract with staging dummy data.
4. Implement global responsive header and the selected hero layout in Next.js.
5. Connect the hero finder to real category routes and product query state.
6. Check 360/390/768/1024/1440px, keyboard, focus, 200% zoom, reduced motion and LCP/CLS.
7. Review the real browser result against the selected desktop/mobile concept before starting the next homepage section.

Actual hero photography, final supporting copy and the exact mobile crop are selected during this slice. The user's upcoming section instructions refine each slice without changing the approved system boundary or claims policy.

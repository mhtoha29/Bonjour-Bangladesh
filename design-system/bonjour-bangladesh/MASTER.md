# Bonjour Bangladesh Design System

**Status:** Planning baseline  
**Updated:** 16 October 2026  
**Direction:** Premium editorial commerce, Swiss grid discipline, quiet confidence  
**Experience dials:** Visual variance 6/10 · Motion 4/10 · Density 3/10

This file is the UI implementation source of truth. `docs/BRAND_GUIDELINES.md` governs identity and `docs/MASTER_PROJECT_BLUEPRINT.md` governs navigation/scope; this file translates both into interface rules. Page-level specifications may refine layout, but cannot override accessibility, brand colour, type, or interaction rules without approval.

## Design principles

1. Lead with buyer evidence: product, process, quality, compliance, and response path.
2. Use generous space and strong art direction; premium does not mean visual noise.
3. Keep the interface editorial on the public site and operational in the admin.
4. Use red and green as controlled brand signals, never as a decorative competition.
5. Make every claim, certification mark, image, and CTA purposeful and verifiable.

## Token architecture

### Primitive colours

| Token | Hex | Use |
|---|---:|---|
| `green-950` | `#052015` | Legible text on bright green |
| `green-800` | `#137B48` | White-text green, hover/pressed |
| `green-600` | `#1C9B5B` | WhatsApp-inspired vibrant primary brand/action |
| `green-100` | `#E5F7EC` | Bright green tint |
| `crimson-700` | `#8F1C24` | High-intent hover/pressed |
| `crimson-600` | `#A92834` | Buyer Crimson, controlled signature accent |
| `crimson-100` | `#F8E5E7` | Error/attention tint |
| `ink-950` | `#19231E` | Editorial Ink, main foreground |
| `ink-600` | `#5E6962` | Muted Ink |
| `ivory-50` | `#FAF8F2` | Warm Ivory, main background |
| `stone-100` | `#EEEBE2` | Warm Stone, process surface |
| `night-950` | `#19241E` | Deep Charcoal, dark editorial surface |
| `white` | `#FFFFFF` | Clean content surface |
| `sage-200` | `#DADCD3` | Border Sage |
| `brass-500` | `#B7925A` | Decorative accent only |
| `paper-50` | `#F7F5EF` | Light service-gallery canvas |
| `sand-200` | `#DEDCD2` | Quiet pre-footer conversion surface |
| `graphite-950` | `#242522` | Neutral footer shell, without green cast |
| `copper-300` | `#C9A788` | Footer editorial labels, decorative only |

### Semantic colours

| Semantic token | Value | Rule |
|---|---:|---|
| `background` | `#FAF8F2` | Default public-site canvas |
| `surface` | `#FFFFFF` | Cards, forms, product information |
| `surface-subtle` | `#E9EEE7` | Alternating editorial sections |
| `foreground` | `#19231E` | Main text |
| `foreground-muted` | `#5E6962` | Supporting text; not below 16px on public pages |
| `border` | `#DADCD3` | Dividers and controls |
| `primary` | `#1C9B5B` | Brand actions with `#052015` text |
| `primary-hover` | `#137B48` | White-text interactive state |
| `conversion` | `#A92834` | Controlled signature accent, not the default CTA fill |
| `conversion-hover` | `#8F1C24` | Conversion hover |
| `focus` | `#1C9B5B` | 3px focus ring with offset |
| `success` | `#18794E` | Success state with text/icon |
| `warning` | `#9A6700` | Warning state with text/icon |
| `error` | `#A92834` | Error state with text/icon |
| `information` | `#245A73` | Informational state with text/icon |

Contrast references: bright green/white 3.57:1 (icons or large type only); bright green/green-950 4.81:1 for small text; green-800/white 5.31:1; crimson/white 6.91:1; ink/ivory 15.20:1. Brass is decorative and must not carry essential text or state.

## Typography

- **Display and editorial headings:** Newsreader, Georgia, serif.
- **Body, navigation, forms, tables, and admin:** Manrope, Arial, sans-serif.
- Self-host subset WOFF2 files at launch. Preload only the critical regular body and primary display face.
- Body default: 16–18px, line-height 1.6.
- Small UI text: minimum 14px; legal/supporting text should normally be 15–16px.
- Headings use sentence case. Avoid all-caps paragraphs and excessive tracking.
- Keep body measures near 60–72 characters; marketing headings should wrap intentionally.

### Responsive type scale

| Role | Mobile | Desktop | Weight |
|---|---:|---:|---:|
| Display | 42px / 1.02 | 72px / 1.02 | 500 |
| H1 | 38px / 1.08 | 60px / 1.08 | 500 |
| H2 | 32px / 1.12 | 46px / 1.12 | 500 |
| H3 | 24px / 1.25 | 30px / 1.25 | 550 |
| Lead | 17px / 1.6 | 18px / 1.6 | 400 |
| Body | 16px / 1.6 | 16px / 1.6 | 400 |
| Label | 14px / 1.5 | 14px / 1.5 | 650 |

## Layout and spacing

- Interior content can widen to 1800px on large displays; hero imagery stays near full-bleed with slim gutters, while prose remains around 760px per column.
- Homepage and editorial sections fill at least one desktop viewport where their content allows; use `min-height`, never a fixed height that clips copy. Full-bleed surfaces extend edge-to-edge, while reading content remains centered (up to 1800px on very wide monitors).
- Desktop grid: 12 columns; tablet: 8; mobile: 4.
- Page gutters: 20px mobile, 32px tablet, 56–72px desktop.
- Section rhythm: 72px mobile, 112–144px desktop.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Use intentional asymmetry for storytelling, then return to a predictable grid for products and data.
- Breakpoints must be content-led; verify at 360, 390, 768, 1024, 1280, and 1440px.

## Shape, depth, and iconography

- Radius: 10px controls, 12–18px cards/dialogs and up to 24px for selected product imagery; avoid excessive pill shapes.
- Cards use borders and surface contrast first; shadows remain quiet.
- Default shadow: `0 12px 36px rgba(16, 21, 18, 0.08)`.
- Overlay shadow: `0 24px 80px rgba(16, 21, 18, 0.18)`.
- Use one consistent outline icon family such as Lucide; no emoji icons.
- Use custom line diagrams sparingly for sourcing and QC flows.

## Core components

### Header

- Desktop hero: a curved ivory center logo cutout; Products, Capabilities and Quality & Compliance on the left; About, Contact and one `Request a Quote` CTA on the right. The quality hub links QC, Compliance and Sustainability; Insights remains in the footer.
- Mobile: accessible menu dialog, persistent inquiry action, direct WhatsApp/email inside the menu.
- Transparent only when hero contrast is controlled; becomes solid after scroll without layout shift.

### Buttons

- Minimum target 44×44px; labels use Manrope 600.
- Primary: Vivid Green background with `#052015` text; use Deep Green for white-text variants.
- Conversion: Buyer Crimson background, white label; reserved for RFQ/inquiry completion.
- Secondary: transparent with Ink border and label.
- Tertiary: text link with visible underline or directional icon.
- States: default, hover, focus-visible, active, loading, disabled, success.
- Never use opacity alone to communicate disabled or loading state.

### Product cards

- Image-first 4:5 crop with explicit dimensions and reserved space.
- Show product name, category, construction, and up to two buyer-relevant facts.
- Hover may reveal alternate image and concise CTA; touch devices receive the same information without hover.
- Entire card may be clickable, but nested actions must remain keyboard-safe.

### Product gallery

- Desktop: one primary image with pointer zoom; zoom remains inside a bounded pane. No thumbnail rail.
- Mobile: one responsive image and a fullscreen viewer; no multi-image swipe carousel.
- Preserve image aspect ratio; never upscale a visibly soft source.
- Provide descriptive alt text for informative images and empty alt for decorative duplicates.

### Filter and search

- Desktop filter rail or horizontal toolbar depending on result density.
- Mobile filters open in a bottom sheet/dialog with applied-filter count.
- Active filters appear as removable chips; `Clear all` is always visible when relevant.
- URL state must remain shareable and back-button safe.

### Forms and inquiry

- Labels stay visible above controls; placeholders never replace labels.
- Inline validation is specific and announced to assistive technology.
- Tech-pack upload clearly shows accepted type, size, progress, remove, and failure states.
- Long forms use logical sections; do not create a fake multi-step flow for a short inquiry.
- Success confirms receipt and response expectation without making an unverified time guarantee.

### Dialogs and timed prompts

- The 40-second inquiry prompt appears once per configured cooldown, never while another dialog or form is active.
- It must be dismissible, focus-trapped, keyboard operable, and non-blocking on small screens.
- AI greeting after 15 seconds uses one restrained sound only after browser/user settings permit it; always offer mute.
- Timers pause when the tab is hidden and respect session dismissal.

### Admin

- Manrope only; neutral white/sage surfaces and compact, readable tables.
- Status colour is never the only signal; pair it with text/icon.
- Bulk product/media operations expose progress and partial failures.
- Destructive actions require explicit target naming and appropriate confirmation.

## Media direction

- Prioritise authentic factory, material, QC, people, and garment-detail photography.
- Use large editorial crops in storytelling and consistent crops in catalog grids.
- Source masters should be high resolution; delivery must be responsive AVIF/WebP/JPEG, never an 8K payload by default.
- Dummy images must be marked internally and replaced before production.
- Avoid generic corporate handshakes, fake factories, excessive stock imagery, and AI-generated evidence imagery.

## Motion

- Motion supports orientation: 160–240ms controls, 300–500ms editorial reveals.
- Preferred easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Use opacity/transform; avoid animating layout properties and large parallax scenes.
- Product grids may stagger subtly, maximum 40ms between items and no elastic overshoot.
- Honour `prefers-reduced-motion`; all content remains available without animation.

## Accessibility and responsive rules

- WCAG 2.2 AA is the release baseline.
- Keyboard navigation, skip link, visible focus, landmark structure, proper heading order, and error summaries are mandatory.
- Do not autoplay video with sound. Captions/transcripts are required for meaningful video.
- Zoom to 200% must not lose content or functionality.
- No horizontal overflow at 320px; no hover-only action or information.
- Touch targets are at least 44×44px and spaced to avoid accidental activation.

## Forbidden patterns

- Generic blue SaaS palette, AI-purple gradients, neon glows, or glassmorphism-heavy surfaces.
- Excessive rounded containers, floating cards, decorative dashboards, or bento grids without buyer purpose.
- Carousel-only proof, auto-rotating text, cursor hijacking, or scroll-jacking.
- Unverified certification logos, watermarked assets, partner claims, vanity metrics, or fabricated reviews.
- Multiple competing primary CTAs in one viewport.
- Layout-shifting hover effects, low-contrast muted text, hidden focus, or icon-only mystery actions.

## Pre-delivery UI gate

- [ ] Uses approved brand and semantic tokens only.
- [ ] Newsreader/Manrope hierarchy is consistent.
- [ ] Buyer path to inquiry is obvious without aggressive repetition.
- [ ] Responsive behaviour verified at required widths.
- [ ] Keyboard, focus, screen-reader labels, reduced motion, and 200% zoom checked.
- [ ] Images have dimensions, responsive sources, loading priority, and appropriate alt text.
- [ ] Product filters work without hover and preserve URL state.
- [ ] Timed AI/inquiry overlays do not collide, repeat excessively, or block content.
- [ ] No unverified proof, badge, count, testimonial, or deadline appears.
- [ ] Certification reference artwork is hidden on indexable/public deployments until current factory-specific evidence and mark-display rights are approved.
- [ ] Core Web Vitals and real-device QA pass before launch.

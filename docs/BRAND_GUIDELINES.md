# Bonjour Bangladesh Brand Guidelines

Status: pre-development source of truth  
Version: 1.0  
Language: International British English

## Brand position

Bonjour Bangladesh is a Dhaka-based apparel buying house that coordinates product development, sourcing, production follow-up, quality control and shipment readiness through selected manufacturing partners.

Primary audience: overseas fashion brands, importers, wholesalers, buying teams and product developers seeking a dependable Bangladesh sourcing partner.

Primary value proposition:

> Your Trusted Garment Buying House & Sourcing Partner in Bangladesh

The client’s separate commitment line is: “The right quality. The right time. The right commitment.” It is not the primary slogan or hero H1.

Supporting line:

> Since 2010, Bonjour Bangladesh has coordinated apparel sourcing through selected manufacturing partners across men's, women's and kids' knit, woven and fully fashioned knitwear.

Primary calls to action:

- Explore Products
- Send Your Tech Pack
- Request a Quote
- Talk to Our Sourcing Team

## Voice and terminology

The brand voice is:

- Confident, not boastful
- Precise, not vague
- Buyer-aware, not factory-centric
- Professional, not stiff
- Evidence-led, not promotional

Preferred terms:

- buyer
- selected manufacturing partner
- partner facility
- manufacturing network
- coordinate
- verify
- support
- according to buyer requirements
- where applicable

Avoid:

- best, leading, number one or world-class without independent evidence
- guaranteed quality or guaranteed delivery
- 100% compliant
- eco-friendly or sustainable without measurable proof
- our factories, because the confirmed model is partner factories
- certified by BSCI or Sedex; these are audit/membership frameworks
- automatically ageing claims such as 15+ years; use Since 2010

## Visual direction

Design character: premium editorial fashion combined with restrained Swiss-style structure.

The supplied references influence only selected patterns:

- Large, art-directed product photography
- Spacious modular sections
- Crisp product cards
- Layered but controlled galleries
- Structured process storytelling

Do not copy their layouts, colours, assets or template-like decorative shapes. Avoid glossy SaaS gradients, playful blobs, excessive glassmorphism and animation-heavy blank space.

## Colour system

The original logo contains bright red approximately `#F30006` and green approximately `#0A903D`. These remain logo colours. The interface now uses a brighter WhatsApp-inspired green for actions, paired with dark text for accessible contrast.

### Primary colours

| Name | Hex | Use |
|---|---:|---|
| Vivid Green | `#1C9B5B` | Primary brand actions and selected states, with dark text |
| Deep Green | `#137B48` | White-text states and darker hover treatment |
| Buyer Crimson | `#A92834` | Fine brand highlights and active indicators; avoid full red sections |
| Editorial Ink | `#19231E` | Headings and primary text |

### Supporting colours

| Name | Hex | Use |
|---|---:|---|
| Warm Ivory | `#FAF8F2` | Main page background |
| White | `#FFFFFF` | Cards, forms, product backgrounds |
| Warm Stone | `#EEEBE2` | Process and editorial contrast surfaces |
| Deep Charcoal | `#19241E` | Dark editorial sections and footer |
| Soft Green | `#E5F7EC` | Calm supporting surfaces |
| Border Sage | `#DADCD3` | Borders and dividers |
| Muted Ink | `#5E6962` | Secondary text |
| Heritage Brass | `#B7925A` | Decorative detail only; never small text on light backgrounds |

### Semantic colours

| Role | Hex |
|---|---:|
| Success | `#18794E` |
| Warning | `#9A6700` |
| Error | `#A92834` |
| Information | `#245A73` |

Verified contrast examples:

- Vivid Green with `#052015` text: 4.81:1
- Deep Green with white text: 5.31:1
- Buyer Crimson on white: 6.91:1
- Editorial Ink on Warm Ivory: 15.20:1
- Muted Ink on Warm Ivory: 5.38:1

Normal text must meet WCAG AA 4.5:1; interactive boundaries and large text must meet at least 3:1. Never use colour as the only state indicator.

## Typography

Public website:

- Display and editorial headings: Newsreader, weights 500 and 600
- Body, navigation, controls and data: Manrope, weights 400, 500, 600 and 700
- Fallbacks: Georgia for display; system-ui for body

Admin panel:

- Manrope only for faster scanning and consistent data density

Recommended responsive scale:

| Role | Desktop | Mobile | Line height |
|---|---:|---:|---:|
| Display | 72px | 42px | 1.02 |
| H1 | 60px | 38px | 1.08 |
| H2 | 46px | 32px | 1.12 |
| H3 | 30px | 24px | 1.25 |
| Body large | 18px | 17px | 1.60 |
| Body | 16px | 16px | 1.60 |
| Small | 14px | 14px | 1.50 |

Use fluid `clamp()` sizing during implementation. Body copy width should generally stay between 60 and 72 characters.

Fonts will be self-hosted as subset WOFF2 files. Preload only the critical regular body and primary display face; all other weights load normally.

## Logo system

The supplied PNG is the visual reference, not a production-ready logo system. Before launch, prepare:

- Master vector SVG
- Horizontal logo
- Stacked logo
- B-mark icon
- Full-colour version
- Reversed white version
- Monochrome dark and light versions
- Favicon set and Apple touch icon
- Print PDF/EPS exports

Rules:

- Preserve proportions and red/green relationship
- Never stretch, rotate, outline, shadow or recolour arbitrarily
- Use clear space equal to the height of the B-mark's primary stroke area
- Minimum full-logo width: 120px digital
- Use SVG on the website whenever possible
- Avoid placing the script wordmark on busy product photography without a calm backing surface

Certification and partner marks are not part of the Bonjour logo system. Their own usage permissions apply.

## Photography and media

Desired look: authentic, tactile, colour-accurate and editorial.

- Prefer real garments, fabric texture, trims, fit, production and QC details
- Use clean neutral or contextual factory backgrounds
- Maintain consistent white balance and skin/fabric colour
- Avoid generic handshake, cargo-ship and stock-office imagery where real evidence is possible
- Product source image target: at least 2400px on the long edge for zoom
- Never serve the original 8K file directly; generate responsive derivatives
- Preserve rights-owner and usage-permission metadata in the media library

Dummy images are allowed only on password-protected, `noindex` staging and must be removed before launch.

## Interface character

- Twelve-column editorial grid on desktop
- Generous whitespace, limited card shadows and sharp hierarchy
- Border radius mostly 10–18px; product imagery may use 18–24px
- One primary CTA treatment per screen
- Lucide-style outline icons with consistent stroke weight
- Motion 150–300ms for controls; 300–500ms for restrained section reveals
- Respect `prefers-reduced-motion`
- Do not rely on hover; all functionality must work with keyboard, touch and assistive technology

## Brand approval gate

Before production use, approve:

- Vector redraw fidelity
- Final hero art direction
- Real photography colour treatment
- Exact wording of 25+ team claim
- Buyer, factory and certification logo permissions
- Testimonial and case-study permissions


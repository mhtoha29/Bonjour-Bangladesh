# Home Hero Override

Reference: `design idea for me/hero.png`  
Detailed content and interaction contract: `docs/DEVELOPMENT_START_MODEL.md`

## Composition

- Warm Ivory outer canvas, large inset rounded apparel photograph.
- Navigation runs across the image top with a compact, shallow light logo tab on desktop; the tab rises into the outer ivory gutter rather than covering a deep part of the image.
- Centered editorial H1 with a photograph-specific dark contrast overlay.
- One prominent Explore Products action and a quieter Send Your Tech Pack path.
- Seven approved local apparel images rotate every four seconds with a restrained crossfade; visitors can pause the rotation and reduced-motion users see a static first image.
- A dark-charcoal cartographic panel with restrained brass routes overlaps the image bottom on desktop. Bangladesh is the visual origin; labelled countries are illustrative potential buyer markets, not verified shipment destinations. It replaces the previous hero catalog finder; catalog filtering remains on the Products page.
- On mobile, header becomes logo + Quote + Menu. The photograph fills the hero behind a lower contrast gradient, preserving the model's face above the copy; the map panel follows the image and shows market names in a readable list.

## Brand and UX constraints

- Use the actual faithful vector logo, never the AI-rendered concept logo.
- Use real HTML text and controls; imagery carries no baked-in copy.
- Public hero image must have rights and appropriate alt text; generated concept imagery is private review material only.
- H1 and CTA remain visible at 360px and 200% zoom without covering the model's face or the product detail.
- Finder options come from published taxonomy and submit to stable catalog URLs.
- The first hero image is the LCP asset; remaining slides are optimized WebP. The seven-image source set is in `Asset/Hero Image/`. The repeated Golden Hour filename in the 16 October brief is represented by the unique Sunset image from that folder.
- Respect the master design-system tokens, approved header destinations and all accessibility rules.

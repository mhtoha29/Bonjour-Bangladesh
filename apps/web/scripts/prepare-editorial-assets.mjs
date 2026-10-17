import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../../..");
const publicDir = path.join(root, "apps/web/public");
const productImages = [
  ["Products/Men_s/Knit/Men_s Tee Shirt (1).jfif", "men-knit.webp"],
  ["Products/Men_s/Woven/Men_s Shirt (1).jfif", "men-woven.webp"],
  ["Products/Men_s/Fully Fashion/Mens Sweater (1).jfif", "men-knitwear.webp"],
  ["Products/Women_s/Knit/Womens Tee Shirt (1).jfif", "women-knit.webp"],
  ["Products/Women_s/Woven/Women_s Fleece (1).jfif", "women-woven.webp"],
  ["Products/Women_s/Fully Fashion/Womens Sweat (2).jfif", "women-knitwear.webp"],
  ["Products/KId_s/Knit/Kids Tee Shirt  (1).jfif", "kids-knit.webp"],
  ["Products/KId_s/Woven/Kids-Polo (1).jfif", "kids-woven.webp"],
  ["Products/KId_s/Fully Fashion/KIds Sweater  (1).jfif", "kids-knitwear.webp"],
];
const marks = [
  ["Bangladesh Govement.jpeg", "bangladesh-government.webp"],
  ["BANGLADESH BANK.jpeg", "bangladesh-bank.webp"],
  ["WRAP.jpeg", "wrap.webp"],
];
const editorialImages = [
  ["Asset/Hero Image/Tropical Botanical Shirt by the Sea.png", "men-apparel.webp", 1600, 1000],
  ["Asset/Hero Image/Outdoor Fleece Portrait in the Park.png", "women-apparel.webp", 1600, 1000],
  ["Asset/Hero Image/Cheerful Boy on a Seaside Boardwalk.png", "kids-apparel.webp", 1600, 1000],
  ["Asset/Bonjour Bangladesh Quality Logistics Hub.png", "commitment-quality-logistics.webp", 1200, 1200],
  ["Asset/Apparel Supply Chain in Motion.png", "apparel-supply-chain-motion.webp", 1200, 1200],
  ["Asset/Bonjour Bangladesh_ Threads Across Borders.png", "threads-across-borders.webp", 1200, 1200],
  ["Asset/Sustainable Apparel Supply Chain Collage.png", "sustainability-supply-chain.webp", 1200, 1200],
];
const generatedProductModels = [
  ["Asset/Generated Product Models/relaxed-jersey-model-v1.png", "featured-relaxed-jersey.webp"],
  ["Asset/Generated Product Models/woven-overshirt-model-v1.png", "featured-woven-overshirt.webp"],
  ["Asset/Generated Product Models/crewneck-knit-model-v1.png", "featured-crewneck-knit.webp"],
  ["Asset/Generated Product Models/soft-jersey-model-v1.png", "featured-soft-jersey.webp"],
];

await mkdir(path.join(publicDir, "products/editorial"), { recursive: true });
await mkdir(path.join(publicDir, "certifications"), { recursive: true });
await mkdir(path.join(publicDir, "editorial"), { recursive: true });
for (const [input, output] of productImages) {
  await sharp(path.join(root, input)).rotate().resize({ width: 900, height: 1100, fit: "cover", position: "attention", withoutEnlargement: true }).webp({ quality: 79, effort: 5 }).toFile(path.join(publicDir, "products/editorial", output));
}
for (const [input, output] of generatedProductModels) {
  await sharp(path.join(root, input)).rotate().resize({ width: 900, height: 1200, fit: "cover", position: "centre", withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(path.join(publicDir, "products/editorial", output));
}
for (const [input, output] of marks) {
  await sharp(path.join(root, "Certifications", input)).rotate().resize({ width: 420, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(path.join(publicDir, "certifications", output));
}
for (const [input, output, width, height] of editorialImages) {
  await sharp(path.join(root, input)).rotate().resize({ width, height, fit: "cover", position: "attention", withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(path.join(publicDir, "editorial", output));
}
console.log("Prepared editorial product, generated model, homepage, and client-supplied mark assets.");

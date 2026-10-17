import { readFile, writeFile } from "node:fs/promises";

const input = process.argv[2];
const output = new URL("../public/world-land.svg", import.meta.url);

if (!input) {
  throw new Error("Pass the Natural Earth ne_110m_land.geojson file path.");
}

const data = JSON.parse(await readFile(input, "utf8"));
const polygons = data.features.flatMap(({ geometry }) => {
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  return [];
});

function point([longitude, latitude], offset) {
  const x = ((longitude + 180) / 360) * 1000 - 250 + offset;
  const y = ((90 - latitude) / 180) * 400;
  return `${x.toFixed(1)} ${y.toFixed(1)}`;
}

const paths = [0, 1000].flatMap((offset) => polygons.map((rings) => {
  const outer = rings[0];
  if (outer.every(([, latitude]) => latitude < -60)) return "";
  return `<path d="M${outer.map((coordinate) => point(coordinate, offset)).join("L")}Z"/>`;
})).filter(Boolean).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" role="img" aria-label="World land silhouette">
<!-- Derived from Natural Earth 1:110m land, public domain: https://www.naturalearthdata.com/about/terms-of-use/ -->
<g fill="#9EBAA8" fill-opacity=".26">${paths}</g></svg>\n`;

await writeFile(output, svg);
console.log(`Generated ${output.pathname}`);

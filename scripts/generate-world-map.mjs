import { mkdir, writeFile } from "node:fs/promises";

// Natural Earth 1:110m land is public domain. No country borders are included.
const source =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson";
const response = await fetch(source);
if (!response.ok) throw new Error(`Map download failed: ${response.status}`);
const data = await response.json();

const project = ([longitude, latitude]) => [
  ((longitude + 180) * 1000) / 360,
  ((90 - latitude) * 500) / 180,
];

function distanceToSegment(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = dx * dx + dy * dy;
  const t = length
    ? Math.max(
        0,
        Math.min(
          1,
          ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / length,
        ),
      )
    : 0;
  return (
    (point[0] - start[0] - t * dx) ** 2 + (point[1] - start[1] - t * dy) ** 2
  );
}

function simplify(points, tolerance = 1.2) {
  if (points.length <= 3) return points;
  let index = 0;
  let farthest = tolerance * tolerance;
  for (let i = 1; i < points.length - 1; i++) {
    const distance = distanceToSegment(points[i], points[0], points.at(-1));
    if (distance > farthest) {
      index = i;
      farthest = distance;
    }
  }
  if (!index) return [points[0], points.at(-1)];
  return [
    ...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(index), tolerance),
  ];
}

const paths = [];
for (const feature of data.features) {
  const polygons =
    feature.geometry.type === "Polygon"
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates;
  for (const polygon of polygons) {
    // Leave Antarctica out of this travel atlas to keep the map readable.
    if (polygon[0].every((point) => point[1] < -60)) continue;
    const rings = polygon.map((ring) => simplify(ring.map(project)));
    const d = rings
      .filter((ring) => ring.length >= 4)
      .map(
        (ring) =>
          "M" +
          ring.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") +
          "Z",
      )
      .join("");
    if (d) paths.push(d);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><title>World land silhouette</title><metadata>Made with Natural Earth. Public domain. https://www.naturalearthdata.com/about/terms-of-use/ Source: ${source}</metadata><path fill="#E8E3DC" fill-rule="evenodd" d="${paths.join("")}"/></svg>\n`;
await mkdir(new URL("../public/maps/", import.meta.url), { recursive: true });
await writeFile(new URL("../public/maps/world-map.svg", import.meta.url), svg);
console.log(`world-map.svg: ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KiB`);

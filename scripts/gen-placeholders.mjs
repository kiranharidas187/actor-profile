// Generates solid-colour placeholder JPEGs at the exact width/height declared
// in each content/actors/*.json image field, so real photos can drop in later
// (Milestone 3) while CLS is measurable honestly today. Fixtures only — the
// colour is a deterministic hash of the image's src, not meaningful content.

import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const actorsDir = path.join(root, "content/actors");
const publicDir = path.join(root, "public");

function hashToColor(input) {
  let hash = 0;
  for (const ch of input) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const hue = hash % 360;
  return hslToRgb(hue, 0.28, 0.52);
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function collectImages(actor) {
  const images = [];
  if (actor.photos?.headshot) images.push(actor.photos.headshot);
  if (actor.photos?.fullBody) images.push(actor.photos.fullBody);
  for (const frame of actor.photos?.gallery ?? []) images.push(frame);
  if (actor.showreel?.poster) images.push(actor.showreel.poster);
  return images;
}

const actorFiles = existsSync(actorsDir)
  ? readdirSync(actorsDir).filter((f) => f.endsWith(".json"))
  : [];

let generated = 0;
for (const file of actorFiles) {
  const actor = JSON.parse(readFileSync(path.join(actorsDir, file), "utf8"));
  for (const image of collectImages(actor)) {
    const destAbs = path.join(publicDir, image.src.replace(/^\//, ""));
    mkdirSync(path.dirname(destAbs), { recursive: true });
    const { r, g, b } = hashToColor(image.src);
    await sharp({
      create: { width: image.width, height: image.height, channels: 3, background: { r, g, b } },
    })
      .jpeg({ quality: 82 })
      .toFile(destAbs);
    generated++;
    console.log(`✓ ${path.relative(root, destAbs)} (${image.width}x${image.height})`);
  }
}

console.log(`\nGenerated ${generated} placeholder image(s).`);

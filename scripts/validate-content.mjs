// Validates content/site.json and every content/actors/*.json against
// schemas/*.schema.json (section 3 / Milestone 3). Fails loudly, naming the
// offending file and the exact field path, so a non-developer editing JSON
// in the GitHub web UI gets a message they can act on.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = process.cwd();
let failed = false;

function fail(file, message) {
  failed = true;
  console.error(`✖ ${file}: ${message}`);
}

function readJson(relPath) {
  return JSON.parse(readFileSync(path.join(root, relPath), "utf8"));
}

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

function validateAgainst(schema, relPath) {
  const data = readJson(relPath);
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    for (const err of validate.errors ?? []) {
      fail(relPath, `${err.instancePath || "(root)"} ${err.message} (${JSON.stringify(err.params)})`);
    }
  }
  return data;
}

function checkImageExists(relPath, image, fieldPath) {
  if (!image?.src) return;
  const imgAbs = path.join(root, "public", image.src);
  if (!existsSync(imgAbs)) {
    fail(relPath, `${fieldPath}.src "${image.src}" does not point to a file under public/`);
  }
}

const siteSchema = readJson("schemas/site.schema.json");
validateAgainst(siteSchema, "content/site.json");

const actorSchema = readJson("schemas/actor.schema.json");
const actorsDir = path.join(root, "content/actors");
const actorFiles = existsSync(actorsDir)
  ? readdirSync(actorsDir).filter((f) => f.endsWith(".json"))
  : [];

if (actorFiles.length === 0) {
  fail("content/actors/", "no actor files found — the site needs at least one actor");
}

const seenSlugs = new Set();

for (const file of actorFiles) {
  const relPath = path.join("content/actors", file);
  const actor = validateAgainst(actorSchema, relPath);

  const expectedSlug = file.replace(/\.json$/, "");
  if (actor.slug && actor.slug !== expectedSlug) {
    fail(relPath, `slug "${actor.slug}" does not match the file name (expected "${expectedSlug}")`);
  }
  if (actor.slug) {
    if (seenSlugs.has(actor.slug)) {
      fail(relPath, `slug "${actor.slug}" is used by more than one actor file`);
    }
    seenSlugs.add(actor.slug);
  }

  if (actor.photos?.headshot) checkImageExists(relPath, actor.photos.headshot, "photos.headshot");
  if (actor.photos?.fullBody) checkImageExists(relPath, actor.photos.fullBody, "photos.fullBody");
  for (const [i, frame] of (actor.photos?.gallery ?? []).entries()) {
    checkImageExists(relPath, frame, `photos.gallery[${i}]`);
  }
  for (const [i, reel] of (actor.showreel ?? []).entries()) {
    if (reel.poster) checkImageExists(relPath, reel.poster, `showreel[${i}].poster`);
  }
}

if (failed) {
  console.error("\ncheck:content failed — see ✖ lines above.");
  process.exit(1);
} else {
  console.log(`✓ content/site.json and ${actorFiles.length} actor file(s) match their schemas.`);
  console.log("\ncheck:content passed.");
}

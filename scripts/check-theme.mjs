// Guardrail for the theme subsystem (Milestone 2 / section 4.5):
//   - content/theme.json matches schemas/theme.schema.json
//   - every built-in preset uses only 6-digit hex colours
//   - every built-in preset clears 4.5:1 contrast on text/base, muted/base,
//     and on-accent/accent, independent of what's currently selected
//   - the currently-resolved theme (preset + overrides) also clears contrast
// Never relax these checks to make a preset pass — fix the preset instead.

import { readFileSync } from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { hex as contrastHex } from "wcag-contrast";

const root = process.cwd();
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const MIN_CONTRAST = 4.5;

let failed = false;
function fail(message) {
  failed = true;
  console.error(`✖ ${message}`);
}

async function loadTsModule(entryRelPath) {
  const entryAbs = path.resolve(root, entryRelPath);
  const result = await build({
    entryPoints: [entryAbs],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    target: "es2022",
  });
  const code = result.outputFiles[0].text;
  return import(`data:text/javascript,${encodeURIComponent(code)}`);
}

const schema = JSON.parse(readFileSync(path.join(root, "schemas/theme.schema.json"), "utf8"));
const themeJson = JSON.parse(readFileSync(path.join(root, "content/theme.json"), "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);
if (!validate(themeJson)) {
  for (const err of validate.errors ?? []) {
    fail(`content/theme.json${err.instancePath || ""} ${err.message} (${JSON.stringify(err.params)})`);
  }
} else {
  console.log("✓ content/theme.json matches schemas/theme.schema.json");
}

const { PRESETS } = await loadTsModule("src/theme/presets/index.ts");
const { resolveTheme } = await loadTsModule("src/theme/resolve.ts");

function checkContrastSet(label, colors) {
  const pairs = [
    ["--c-text/--c-base", colors.text, colors.base],
    ["--c-muted/--c-base", colors.muted, colors.base],
    ["--c-on-accent/--c-accent", colors.onAccent, colors.accent],
  ];
  for (const [key, fg, bg] of pairs) {
    if (!HEX_RE.test(fg)) fail(`${label}: ${key} foreground "${fg}" is not a 6-digit hex colour`);
    if (!HEX_RE.test(bg)) fail(`${label}: ${key} background "${bg}" is not a 6-digit hex colour`);
    if (HEX_RE.test(fg) && HEX_RE.test(bg)) {
      const ratio = contrastHex(fg, bg);
      if (ratio < MIN_CONTRAST) {
        fail(`${label}: ${key} contrast is ${ratio.toFixed(2)}:1, below the ${MIN_CONTRAST}:1 minimum`);
      }
    }
  }
}

for (const [name, preset] of Object.entries(PRESETS)) {
  checkContrastSet(`preset "${name}"`, preset.colors);
}
if (!failed) console.log("✓ all four built-in presets clear 4.5:1 contrast with only hex colours");

try {
  const resolved = resolveTheme(themeJson);
  checkContrastSet(`resolved theme (content/theme.json)`, resolved.colors);
  if (!failed) console.log(`✓ resolved theme ("${resolved.preset}" + overrides) clears 4.5:1 contrast`);
} catch (err) {
  fail(`content/theme.json failed to resolve: ${err.message}`);
}

if (failed) {
  console.error("\ncheck:theme failed — see ✖ lines above.");
  process.exit(1);
} else {
  console.log("\ncheck:theme passed.");
}

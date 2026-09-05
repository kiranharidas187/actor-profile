// Reads content/theme.json and turns it into two virtual CSS modules —
// `virtual:theme.css` (custom properties) and `virtual:theme-fonts.css`
// (only the selected type pairing's @font-face rules) — plus, in production
// builds, preload links for that pairing's two key latin subset files.
// Everything here runs in Node at build/dev-server time; none of it ships.

import { readFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { resolveTheme, tokensToCss } from "./resolve";
import { FONT_PAIRINGS, type ThemeOverrides } from "./tokens";

const THEME_JSON_PATH = path.resolve(process.cwd(), "content/theme.json");
const THEME_CSS_ID = "virtual:theme.css";
const RESOLVED_THEME_CSS_ID = "\0" + THEME_CSS_ID;
const FONT_CSS_ID = "virtual:theme-fonts.css";
const RESOLVED_FONT_CSS_ID = "\0" + FONT_CSS_ID;
const THEME_CONFIG_ID = "virtual:theme-config";
const RESOLVED_THEME_CONFIG_ID = "\0" + THEME_CONFIG_ID;

function loadOverrides(): ThemeOverrides {
  return JSON.parse(readFileSync(THEME_JSON_PATH, "utf8")) as ThemeOverrides;
}

/**
 * Emits `virtual:theme.css` (custom properties), `virtual:theme-fonts.css`
 * (only the selected type pairing's @font-face rules), and `virtual:theme-config`
 * (the resolved tokens as a JS object, so root.tsx can pick matching preload
 * links from src/theme/fonts.ts). All three are recomputed from
 * content/theme.json at build/dev-server time — never at runtime in the browser.
 */
export function themePlugin(): Plugin {
  return {
    name: "actor-profile:theme",

    resolveId(id) {
      if (id === THEME_CSS_ID) return RESOLVED_THEME_CSS_ID;
      if (id === FONT_CSS_ID) return RESOLVED_FONT_CSS_ID;
      if (id === THEME_CONFIG_ID) return RESOLVED_THEME_CONFIG_ID;
      return null;
    },

    load(id) {
      if (id === RESOLVED_THEME_CSS_ID) {
        return tokensToCss(resolveTheme(loadOverrides()));
      }
      if (id === RESOLVED_FONT_CSS_ID) {
        const tokens = resolveTheme(loadOverrides());
        return FONT_PAIRINGS[tokens.typePair].packages
          .map((pkg) => `@import "${pkg}";`)
          .join("\n");
      }
      if (id === RESOLVED_THEME_CONFIG_ID) {
        const tokens = resolveTheme(loadOverrides());
        const preloadFiles = FONT_PAIRINGS[tokens.typePair].preloadFiles;
        const imports = preloadFiles
          .map((spec, i) => `import href${i} from ${JSON.stringify(spec + "?url")};`)
          .join("\n");
        const hrefsArray = `[${preloadFiles.map((_, i) => `href${i}`).join(", ")}]`;
        return `${imports}\nexport default ${JSON.stringify(tokens)};\nexport const fontPreloadHrefs = ${hrefsArray};`;
      }
      return null;
    },

    configureServer(server) {
      server.watcher.add(THEME_JSON_PATH);
      server.watcher.on("change", (file) => {
        if (path.resolve(file) !== THEME_JSON_PATH) return;
        for (const id of [RESOLVED_THEME_CSS_ID, RESOLVED_FONT_CSS_ID, RESOLVED_THEME_CONFIG_ID]) {
          const mod = server.moduleGraph.getModuleById(id);
          if (mod) server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

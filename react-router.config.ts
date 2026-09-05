import { readdirSync } from "node:fs";
import type { Config } from "@react-router/dev/config";

// PAGES_BASE is set only by .github/workflows/deploy.yml's build step.
// Local dev/build are unaffected. Must match `base` in vite.config.ts
// (no trailing slash here, per React Router's basename convention).
const basename = process.env.PAGES_BASE ? "/actor-profile" : "/";

export default {
  appDirectory: "src/app",
  ssr: false,
  basename,
  // `prerender: true` only discovers static routes — the dynamic /:slug route
  // needs every slug named explicitly so each actor gets a real prerendered
  // HTML file at build time.
  async prerender() {
    const slugs = readdirSync("content/actors")
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
    return ["/", ...slugs.map((slug) => `/${slug}`)];
  },
} satisfies Config;

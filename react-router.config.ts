import { readdirSync } from "node:fs";
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src/app",
  ssr: false,
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

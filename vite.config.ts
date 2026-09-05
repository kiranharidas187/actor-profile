import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { defineConfig } from "vite";
import { themePlugin } from "./src/theme/vite-plugin";

// PAGES_BASE is set only by .github/workflows/deploy.yml's build step.
// Local `npm run dev` / `npm run build` are unaffected and stay at "/".
// Must match `basename` in react-router.config.ts (trailing slash here,
// no trailing slash there — Vite's convention vs. React Router's).
const base = process.env.PAGES_BASE ? "/actor-profile/" : "/";

export default defineConfig({
  base,
  plugins: [tailwindcss(), themePlugin(), reactRouter(), imagetools()],
});

// TypeScript's Bundler resolution treats any "scheme:specifier" import as an
// opaque URI and always types it `any`, ignoring ambient declarations here —
// these exist as documentation only. Consumers of virtual:theme-config must
// cast the default export to ThemeTokens themselves (see src/app/root.tsx).
declare module "virtual:theme-css-text" {
  const css: string;
  export default css;
}
declare module "virtual:theme-fonts.css";
declare module "virtual:theme-config" {
  import type { ThemeTokens } from "./tokens";
  const theme: ThemeTokens;
  export default theme;
  export const fontPreloadHrefs: string[];
}

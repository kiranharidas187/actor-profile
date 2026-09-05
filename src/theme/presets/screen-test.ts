import type { ThemePreset } from "../tokens";

/**
 * Black and white, no accent. `accent` and `onAccent` collapse onto text/base
 * so accent-styled elements render as plain high-contrast type instead of a
 * hidden or broken colour — there is no third colour to reach for here.
 */
export const screenTest: ThemePreset = {
  name: "screen-test",
  colors: {
    base: "#0A0A0A",
    text: "#FFFFFF",
    muted: "#9A9A9A",
    accent: "#FFFFFF",
    onAccent: "#0A0A0A",
  },
};

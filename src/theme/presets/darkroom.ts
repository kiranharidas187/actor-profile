import type { ThemePreset } from "../tokens";

/** Default preset. A dim, warm-lit darkroom — bronze accent on near-black. */
export const darkroom: ThemePreset = {
  name: "darkroom",
  colors: {
    base: "#1E1F23",
    text: "#F2F0EC",
    muted: "#A6A39C",
    accent: "#B08A3E",
    onAccent: "#1E1F23",
  },
};

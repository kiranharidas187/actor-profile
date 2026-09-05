// The token contract. Every resolvable design value flows through this shape —
// nothing downstream (components, sections) may introduce a token that isn't
// declared here.

export type PresetName = "darkroom" | "marquee" | "screen-test" | "green-room";

export type TypePairKey =
  | "bodoni-plex"
  | "fraunces-inter"
  | "archivo-archivo"
  | "spectral-plex";

export type RadiusKey = "sharp" | "soft" | "round";

export type DensityKey = "compact" | "comfortable" | "spacious";

/** Five colours, and only five — the full surface of what a preset may define. */
export interface ThemeColorTokens {
  base: string;
  text: string;
  muted: string;
  accent: string;
  onAccent: string;
}

export interface ThemePreset {
  name: PresetName;
  colors: ThemeColorTokens;
}

/** The shape of content/theme.json. A preset name plus a small set of overrides. */
export interface ThemeOverrides {
  preset: PresetName;
  colors?: {
    accent?: string;
  };
  typePair?: TypePairKey;
  radius?: RadiusKey;
  density?: DensityKey;
  motion?: number;
}

/** Fully resolved tokens after merging overrides onto a preset. */
export interface ThemeTokens {
  preset: PresetName;
  colors: ThemeColorTokens;
  typePair: TypePairKey;
  radius: RadiusKey;
  density: DensityKey;
  motionScale: number;
}

export type TypeScaleName = "xs" | "sm" | "base" | "lg" | "xl" | "display" | "hero";

/**
 * The fluid type scale: one clamp() per step, `min` at the narrowest viewport
 * up to `max` at the widest. Small sizes shrink less than large ones — a flat
 * shrink percentage would push `xs` below the ~12px legibility floor, while
 * display sizes have room to shrink a lot and still read as "big".
 */
export const TYPE_SCALE: { name: TypeScaleName; min: number; max: number }[] = [
  { name: "xs", min: 12, max: 14 },
  { name: "sm", min: 13, max: 16 },
  { name: "base", min: 15, max: 20 },
  { name: "lg", min: 20, max: 28 },
  { name: "xl", min: 29, max: 40 },
  { name: "display", min: 46, max: 64 },
  { name: "hero", min: 69, max: 96 },
];

/**
 * Sizes at/above this step are the "display" register — safe to set in
 * var(--font-display) because their `min` never dips below 40px. `xl` (29–40)
 * does NOT qualify: its floor is below 40px at narrow viewports.
 */
export const DISPLAY_SCALE_FLOOR: TypeScaleName = "display";

export interface FontPairing {
  displayFamily: string;
  bodyFamily: string;
  /** font-stretch applied to the display family only (archivo-archivo shares one variable file). */
  displayStretch?: string;
  /** bare package specifiers whose index.css must be imported for this pairing, and only this pairing. */
  packages: string[];
  /** import specifiers (resolved with `?url` by the caller) for this pairing's key latin subset files, for preload hints. */
  preloadFiles: string[];
}

export const FONT_PAIRINGS: Record<TypePairKey, FontPairing> = {
  "bodoni-plex": {
    displayFamily: '"Bodoni Moda Variable", Georgia, "Times New Roman", serif',
    bodyFamily:
      '"IBM Plex Sans Variable", -apple-system, "Segoe UI", sans-serif',
    packages: [
      "@fontsource-variable/bodoni-moda",
      "@fontsource-variable/ibm-plex-sans",
    ],
    preloadFiles: [
      "@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2",
      "@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2",
    ],
  },
  "fraunces-inter": {
    displayFamily: '"Fraunces Variable", Georgia, serif',
    bodyFamily: '"Inter Variable", -apple-system, "Segoe UI", sans-serif',
    packages: ["@fontsource-variable/fraunces", "@fontsource-variable/inter"],
    preloadFiles: [
      "@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
      "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
    ],
  },
  "archivo-archivo": {
    displayFamily: '"Archivo Variable", "Arial Narrow", sans-serif',
    bodyFamily: '"Archivo Variable", -apple-system, "Segoe UI", sans-serif',
    displayStretch: "125%",
    packages: ["@fontsource-variable/archivo"],
    preloadFiles: [
      "@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
    ],
  },
  "spectral-plex": {
    displayFamily: '"Spectral", Georgia, serif',
    bodyFamily:
      '"IBM Plex Sans Variable", -apple-system, "Segoe UI", sans-serif',
    packages: ["@fontsource/spectral", "@fontsource-variable/ibm-plex-sans"],
    preloadFiles: [
      "@fontsource/spectral/files/spectral-latin-400-normal.woff2",
      "@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2",
    ],
  },
};

export const RADIUS_SCALES: Record<RadiusKey, [string, string, string]> = {
  sharp: ["0px", "0px", "0px"],
  soft: ["4px", "8px", "14px"],
  round: ["8px", "16px", "28px"],
};

export const DENSITY_MULTIPLIERS: Record<DensityKey, number> = {
  compact: 0.85,
  comfortable: 1,
  spacious: 1.25,
};

export const DEFAULT_OVERRIDES: Omit<ThemeOverrides, "preset"> = {
  typePair: "bodoni-plex",
  radius: "soft",
  density: "comfortable",
  motion: 1,
};

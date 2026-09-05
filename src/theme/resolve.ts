// Resolves content/theme.json onto a named preset and emits the result as CSS
// custom properties. Runs at build/dev-server time only (Vite plugin, CI
// scripts) — never shipped to the browser as runtime logic.

import { hex as contrastHex } from "wcag-contrast";
import { PRESETS } from "./presets";
import {
  DEFAULT_OVERRIDES,
  DENSITY_MULTIPLIERS,
  FONT_PAIRINGS,
  RADIUS_SCALES,
  TYPE_SCALE,
  type ThemeOverrides,
  type ThemeTokens,
} from "./tokens";

const MIN_VIEWPORT_PX = 375;
const MAX_VIEWPORT_PX = 1440;

/** When colors.accent is overridden, pick whichever of text/base reads on it. */
function pickOnAccent(accent: string, text: string, base: string): string {
  const onText = contrastHex(text, accent);
  const onBase = contrastHex(base, accent);
  return onText >= onBase ? text : base;
}

export function resolveTheme(overrides: ThemeOverrides): ThemeTokens {
  const preset = PRESETS[overrides.preset];
  if (!preset) {
    throw new Error(
      `Unknown theme preset "${overrides.preset}". Known presets: ${Object.keys(PRESETS).join(", ")}.`,
    );
  }

  const accentOverride = overrides.colors?.accent;
  const colors = accentOverride
    ? {
        ...preset.colors,
        accent: accentOverride,
        onAccent: pickOnAccent(accentOverride, preset.colors.text, preset.colors.base),
      }
    : preset.colors;

  const typePair = overrides.typePair ?? DEFAULT_OVERRIDES.typePair!;
  if (!FONT_PAIRINGS[typePair]) {
    throw new Error(
      `Unknown typePair "${typePair}". Known pairings: ${Object.keys(FONT_PAIRINGS).join(", ")}.`,
    );
  }

  return {
    preset: preset.name,
    colors,
    typePair,
    radius: overrides.radius ?? DEFAULT_OVERRIDES.radius!,
    density: overrides.density ?? DEFAULT_OVERRIDES.density!,
    motionScale: overrides.motion ?? DEFAULT_OVERRIDES.motion!,
  };
}

function fluidClamp(maxPx: number, minPx: number): string {
  const slope = ((maxPx - minPx) / (MAX_VIEWPORT_PX - MIN_VIEWPORT_PX)) * 100;
  const intercept = minPx - (slope / 100) * MIN_VIEWPORT_PX;
  const preferred = `${Math.round(intercept * 100) / 100}px + ${Math.round(slope * 100) / 100}vw`;
  return `clamp(${minPx}px, ${preferred}, ${maxPx}px)`;
}

const BASE_SPACE_STEPS_REM = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4.5];
/** space-1 and space-2 (hairline gaps) stay fixed across densities — only the
 * rhythm between larger blocks should breathe more or less. */
const DENSITY_EXEMPT_STEPS = 2;

export function tokensToCss(tokens: ThemeTokens): string {
  const { colors, radius, density, motionScale, typePair } = tokens;
  const pairing = FONT_PAIRINGS[typePair];
  const radiusScale = RADIUS_SCALES[radius];
  const densityMultiplier = DENSITY_MULTIPLIERS[density];

  const colorLines = [
    `--c-base: ${colors.base};`,
    `--c-text: ${colors.text};`,
    `--c-muted: ${colors.muted};`,
    `--c-accent: ${colors.accent};`,
    `--c-on-accent: ${colors.onAccent};`,
  ];

  const radiusLines = [
    `--radius-sm: ${radiusScale[0]};`,
    `--radius-md: ${radiusScale[1]};`,
    `--radius-lg: ${radiusScale[2]};`,
  ];

  const spaceLines = BASE_SPACE_STEPS_REM.map((rem, i) => {
    const scaled = i < DENSITY_EXEMPT_STEPS ? rem : rem * densityMultiplier;
    return `--space-${i + 1}: ${Math.round(scaled * 1000) / 1000}rem;`;
  });

  const typeLines = TYPE_SCALE.map(
    (step) => `--text-${step.name}: ${fluidClamp(step.max, step.min)};`,
  );

  const fontLines = [
    `--font-display: ${pairing.displayFamily};`,
    `--font-body: ${pairing.bodyFamily};`,
    `--font-stretch-display: ${pairing.displayStretch ?? "normal"};`,
  ];

  return `:root {
  ${[...colorLines, ...radiusLines, ...spaceLines, ...typeLines, ...fontLines, `--motion-scale: ${motionScale};`].join("\n  ")}
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-scale: 0;
  }
}
`;
}

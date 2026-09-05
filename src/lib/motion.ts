/**
 * Bridges the theme's `--motion-scale` CSS variable (0-1, forced to 0 under
 * `prefers-reduced-motion: reduce` regardless of theme.json) into JS for
 * libraries that take a numeric duration, e.g. `motion/react`'s `transition`.
 */
export function getMotionScale(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--motion-scale");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 1;
}

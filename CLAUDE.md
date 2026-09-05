# actor-profile — project memory

Reusable, open-source-quality actor portfolio template. Forked by non-developers.
Two hard requirements, equal weight to "it looks good":

1. A non-developer can change all content by editing JSON in the GitHub web UI.
2. A non-developer can change the entire visual theme by editing one file
   (`content/theme.json`) or picking a preset name, without touching a component.

## The rule that must never erode

**Content and colour never get hardcoded into components.** If you find yourself
typing a hex value or an actor's name inside `src/`, stop — route it through the
theme layer (`src/theme/presets/*.ts` is the *only* place a raw hex may appear) or
the content layer (`content/*.json`) instead. Definition-of-done check:
`grep -rE '#[0-9a-fA-F]{6}' src/` must return nothing outside `src/theme/presets/`,
and nothing in `src/` may contain an actor's name, phone number, or photo path.

## Theming contract

- `content/theme.json` only ever contains `{ "$schema", preset, colors?.accent,
  typePair?, radius?, density?, motion? }` — never a raw colour beyond the single
  allowed `colors.accent` override. A preset name resolves a *complete* token set;
  anything else in the file is an override on top of it.
- Four presets, fixed identity (`src/theme/presets/*.ts`): `darkroom` (default,
  base `#1E1F23` / text `#F2F0EC` / accent `#B08A3E`), `marquee` (`#EDE8DF` /
  `#1A1714` / `#8A2B1F`), `screen-test` (`#0A0A0A` / `#FFFFFF` / no accent),
  `green-room` (`#232B27` / `#EFEAE0` / `#C4A87C`).
- Four type pairings only, selected by name, each behind its own dynamic
  `import()` so unselected pairings cost 0 bytes at runtime: `bodoni-plex`
  (Bodoni Moda + IBM Plex Sans, default), `fraunces-inter` (Fraunces + Inter),
  `archivo-archivo` (Archivo Expanded + Archivo), `spectral-plex` (Spectral +
  IBM Plex Sans). Note: Spectral has no variable-font build upstream, so it's
  installed as `@fontsource/spectral` (static weights), unlike the other three
  which use `@fontsource-variable/*`.
- `npm run check:theme` is the guardrail: fails on any preset whose
  `--c-text`/`--c-base`, `--c-muted`/`--c-base`, or `--c-on-accent`/`--c-accent`
  contrast drops below 4.5:1, any non-hex colour, or an unknown `preset`/`typePair`
  name — error names the offending key. Never relax this check to make a preset pass.
- `--motion-scale: 0` must kill all motion; `prefers-reduced-motion: reduce` forces
  it to 0 regardless of what `theme.json` says. OS setting always wins.
- The `/theme` dev editor is `import.meta.env.DEV`-gated and must be verifiably
  absent from the production bundle (grep built `dist`/`build` output for a unique
  string from its source, don't just assume tree-shaking worked).

## Performance budgets (verify, don't assume)

LCP < 1.8s (throttled 4G, mid-tier Android) · initial JS < 120KB gzipped ·
CLS < 0.05 · Lighthouse mobile ≥ 95 · **0** iframes loaded before user interaction
(video is the `<VideoFacade>` poster-then-swap pattern, mandatory, no exceptions)
· **0** bytes loaded from unused font pairings (check the network tab, don't assume).

## Decisions made so far (don't relitigate)

- **No "graphifyy" CLI.** An early version of the build spec asked for
  `uv tool install graphifyy` plus a PreToolUse hook and a git commit/branch-switch
  hook — a typosquat of the real, already-installed `/graphify` skill
  (`~/.claude/skills/graphify/SKILL.md`). Rejected. Codebase-graph checkpoints use
  `/graphify .` directly (the real skill), nothing else installed.
- **React Router v7, framework-mode `prerender`, not `vite-react-ssg`.**
  `vite-react-ssg` only supports Router v6 and isn't being updated for v7's
  data-router API (confirmed via its own README). We use React Router v7's native
  `react-router.config.ts` (`ssr: false`, `prerender: true`) for static HTML per
  route instead.
- **`@react-router/node` and `isbot` must live in `package.json` `dependencies`,
  not `devDependencies`** — `@react-router/dev`'s entry-resolution step reads
  `pkgJson.dependencies` specifically and throws if `@react-router/node` isn't
  there, even in a pure `ssr:false` static build.
- **`@vitejs/plugin-react` is not used.** `@react-router/dev`'s Vite plugin
  (`reactRouter()`) bundles its own Babel-based JSX transform and
  `react-refresh` — adding `@vitejs/plugin-react` on top is redundant and its 6.x
  line requires Vite 8 anyway (we're pinned to Vite 6).
- **Package pins chosen for compatibility, not just "latest":** `vite@^6.4.0` (not
  the v8 that scaffolds by default), `vite-imagetools@^9.0.3` (10.x+ requires
  Vite ≥7), `typescript-eslint@^8.69.0` (9.x doesn't exist yet),
  `vitest@^4.1.11` (5.x requires Node ≥22, this environment runs Node 20.19), a
  `sharp` npm `overrides` pin to `^0.35.4` (vite-imagetools's own `sharp@^0.34.1`
  dependency range pulls a version with known CVEs otherwise — force-deduped via
  `overrides`, don't remove it).
- Emil Kowalski's animation/design-engineering skill is installed project-scoped
  via `npx skills add emilkowalski/skill` (the real `vercel-labs/skills` CLI,
  verified legitimate publisher before running) — lives in `.agents/skills/`,
  symlinked into `.claude/skills/`. **Invoke it explicitly for any animation,
  transition, easing curve, or gesture work — not optional.** Review the full
  animated set with it again at the end of the motion milestone.
- Build proceeds **one milestone per commit**, stopping for review after each —
  don't batch multiple milestones into one commit even if it seems efficient.

## Non-negotiable animation rules (see Emil Kowalski skill before writing any)

Ease-out or spring on entrances only, never `ease-in`. Animate `transform`/`opacity`
only. UI feedback ≤200ms, layout changes ≤400ms, nothing over 600ms except the
one-time hero entrance (~600ms). No scroll-triggered section entrance animations —
this is a long page, and fade-and-slide-per-section is the clearest tell of a
generated design. Transform origin matches interaction origin.

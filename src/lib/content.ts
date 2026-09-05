// Loads content/*.json at build time via Vite's import.meta.glob (eager, so
// prerendering has the data synchronously — no runtime fetch for content that
// never changes after a rebuild).

import type { Actor, SiteConfig } from "../types/actor";

const actorModules = import.meta.glob("/content/actors/*.json", { eager: true }) as Record<
  string,
  { default: Actor }
>;

const siteModule = import.meta.glob("/content/site.json", { eager: true }) as Record<
  string,
  { default: SiteConfig }
>;

export function getAllActors(): Actor[] {
  return Object.values(actorModules)
    .map((mod) => mod.default)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getActorBySlug(slug: string): Actor | undefined {
  return getAllActors().find((actor) => actor.slug === slug);
}

export function getSiteConfig(): SiteConfig {
  const mod = Object.values(siteModule)[0];
  if (!mod) throw new Error("content/site.json is missing.");
  return mod.default;
}

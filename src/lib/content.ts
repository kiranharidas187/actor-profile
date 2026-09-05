// Loads content/*.json at build time via Vite's import.meta.glob (eager, so
// prerendering has the data synchronously — no runtime fetch for content that
// never changes after a rebuild).

import type { Actor, ImageRef, SiteConfig } from "../types/actor";

const actorModules = import.meta.glob("/content/actors/*.json", { eager: true }) as Record<
  string,
  { default: Actor }
>;

const siteModule = import.meta.glob("/content/site.json", { eager: true }) as Record<
  string,
  { default: SiteConfig }
>;

// content/actors/*.json store photo paths as root-absolute strings (e.g.
// "/photos/arjun-das/headshot.jpg") so non-developers can edit them in the
// GitHub web UI without knowing anything about deployment paths. The base
// path is injected here, at the code layer, using Vite's BASE_URL, so
// content never has to change for a subpath deployment (e.g. GitHub Pages'
// "/actor-profile/").
function withBase(src: string): string {
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`;
}

function resolveImageRef(image: ImageRef): ImageRef {
  return { ...image, src: withBase(image.src) };
}

function resolveActorImages(actor: Actor): Actor {
  return {
    ...actor,
    photos: {
      ...actor.photos,
      headshot: resolveImageRef(actor.photos.headshot),
      fullBody: actor.photos.fullBody ? resolveImageRef(actor.photos.fullBody) : undefined,
      gallery: actor.photos.gallery?.map((img) => ({ ...img, src: withBase(img.src) })),
    },
    showreel: actor.showreel
      ? {
          ...actor.showreel,
          poster: actor.showreel.poster ? resolveImageRef(actor.showreel.poster) : undefined,
        }
      : undefined,
  };
}

export function getAllActors(): Actor[] {
  return Object.values(actorModules)
    .map((mod) => resolveActorImages(mod.default))
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

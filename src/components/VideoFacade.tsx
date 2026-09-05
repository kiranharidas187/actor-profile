import { useState } from "react";
import type { ImageRef } from "../types/actor";

interface VideoFacadeProps {
  youtubeId: string;
  poster?: ImageRef;
  title: string;
}

/**
 * Poster-then-swap: renders a plain image button until clicked, then swaps in
 * the real YouTube iframe. Zero iframes exist on the page before that click.
 */
export function VideoFacade({ youtubeId, poster, title }: VideoFacadeProps) {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return (
      <div className="aspect-video w-full overflow-hidden" style={{ borderRadius: "var(--radius-md)" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const posterSrc = poster?.src ?? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      className="group relative block aspect-video w-full overflow-hidden"
      style={{ borderRadius: "var(--radius-md)" }}
      aria-label={`Play showreel: ${title}`}
    >
      {poster ? (
        <img
          src={poster.src}
          width={poster.width}
          height={poster.height}
          alt={poster.alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={posterSrc}
          width={1280}
          height={720}
          alt={`Poster frame for ${title}`}
          className="h-full w-full object-cover"
        />
      )}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "color-mix(in srgb, var(--c-base) 30%, transparent)" }}
      >
        <span
          className="video-play-trigger flex items-center justify-center rounded-full"
          style={{
            width: "4rem",
            height: "4rem",
            background: "var(--c-accent)",
            color: "var(--c-on-accent)",
          }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

import type { ImageRef } from "../types/actor";

interface HeroProps {
  name: string;
  pronouns?: string;
  headline: string;
  bio: string;
  location: string;
  headshot: ImageRef;
}

export function Hero({ name, pronouns, headline, bio, location, headshot }: HeroProps) {
  return (
    <header className="spine hairline grid grid-cols-1 gap-[length:var(--space-6)] border-b py-[length:var(--space-8)] md:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="hero-enter">
        <h1
          className="font-display"
          style={{ fontSize: "var(--text-hero)", lineHeight: 1.02 }}
        >
          {name}
        </h1>
        <p
          className="mt-[length:var(--space-2)]"
          style={{ color: "var(--c-muted)", fontSize: "var(--text-lg)" }}
        >
          {headline}
          {pronouns ? ` · ${pronouns}` : ""} · {location}
        </p>
        {bio.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className="mt-[length:var(--space-4)] max-w-[42rem]"
            style={{ fontSize: "var(--text-base)" }}
          >
            {paragraph}
          </p>
        ))}
      </div>
      <img
        src={headshot.src}
        width={headshot.width}
        height={headshot.height}
        alt={headshot.alt}
        className="hero-enter-image h-auto w-full object-cover"
        style={{ borderRadius: "var(--radius-md)", aspectRatio: "3 / 4" }}
      />
    </header>
  );
}

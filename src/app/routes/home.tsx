import { Navigate, Link } from "react-router";
import { getAllActors, getSiteConfig } from "../../lib/content";

export default function Home() {
  const actors = getAllActors();
  const site = getSiteConfig();

  if (actors.length === 1) {
    return <Navigate to={`/${actors[0]!.slug}`} replace />;
  }

  return (
    <main className="spine py-[length:var(--space-8)]">
      <h1 className="font-display" style={{ fontSize: "var(--text-hero)" }}>
        {site.name}
      </h1>
      <p className="mt-[length:var(--space-2)] max-w-[36rem]" style={{ color: "var(--c-muted)", fontSize: "var(--text-lg)" }}>
        {site.description}
      </p>
      <div className="mt-[length:var(--space-7)] grid grid-cols-1 gap-[length:var(--space-6)] sm:grid-cols-2 md:grid-cols-3">
        {actors.map((actor) => (
          <Link key={actor.slug} to={`/${actor.slug}`} className="group block">
            <img
              src={actor.photos.headshot.src}
              width={actor.photos.headshot.width}
              height={actor.photos.headshot.height}
              alt={actor.photos.headshot.alt}
              className="w-full object-cover"
              style={{ aspectRatio: "3 / 4", borderRadius: "var(--radius-md)" }}
            />
            <div className="mt-[length:var(--space-3)] font-medium" style={{ fontSize: "var(--text-lg)" }}>
              {actor.name}
            </div>
            <div style={{ color: "var(--c-muted)", fontSize: "var(--text-sm)" }}>{actor.headline}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}

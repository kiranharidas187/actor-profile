import { useParams } from "react-router";
import { getActorBySlug } from "../../lib/content";
import { Hero } from "../../sections/Hero";
import { StatStrip } from "../../sections/StatStrip";
import { Credits } from "../../sections/Credits";
import { Showreel } from "../../sections/Showreel";
import { Gallery } from "../../sections/Gallery";
import { Skills } from "../../sections/Skills";
import { Training } from "../../sections/Training";
import { Awards } from "../../sections/Awards";
import { Press } from "../../sections/Press";
import { Representation } from "../../sections/Representation";
import { Contact } from "../../sections/Contact";

export default function ActorPage() {
  const { slug } = useParams();
  const actor = slug ? getActorBySlug(slug) : undefined;

  if (!actor) {
    return (
      <main className="spine py-[length:var(--space-8)]">
        <h1 className="font-display" style={{ fontSize: "var(--text-display)" }}>
          Not found
        </h1>
        <p style={{ color: "var(--c-muted)" }}>There's no actor at this address.</p>
      </main>
    );
  }

  return (
    <main>
      <Hero
        name={actor.name}
        pronouns={actor.pronouns}
        headline={actor.headline}
        bio={actor.bio}
        location={actor.location}
        headshot={actor.photos.headshot}
      />
      {actor.stats && actor.stats.length > 0 && <StatStrip stats={actor.stats} />}
      <Credits credits={actor.credits} />
      {actor.showreel && <Showreel showreel={actor.showreel} actorName={actor.name} />}
      {actor.photos.gallery && actor.photos.gallery.length > 0 && <Gallery images={actor.photos.gallery} />}
      {actor.skills && actor.skills.length > 0 && <Skills categories={actor.skills} />}
      {actor.training && actor.training.length > 0 && <Training entries={actor.training} />}
      {actor.awards && actor.awards.length > 0 && <Awards awards={actor.awards} />}
      {actor.press && actor.press.length > 0 && <Press items={actor.press} />}
      {actor.agent && <Representation agent={actor.agent} />}
      <Contact contact={actor.contact} name={actor.name} />
    </main>
  );
}

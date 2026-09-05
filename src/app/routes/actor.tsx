import { useParams } from "react-router";
import { getActorBySlug } from "../../lib/content";
import { Hero } from "../../sections/Hero";
import { Portrait } from "../../sections/Portrait";
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
        slug={actor.slug}
        name={actor.name}
        pronouns={actor.pronouns}
        headline={actor.headline}
        bio={actor.bio}
        location={actor.location}
        headshot={actor.photos.headshot}
      />
      <Portrait image={actor.photos.fullBody} />
      <StatStrip stats={actor.stats} />
      <Credits credits={actor.credits} label={actor.labels?.credits} />
      <Showreel showreel={actor.showreel} actorName={actor.name} label={actor.labels?.showreel} />
      <Gallery images={actor.photos.gallery} label={actor.labels?.gallery} />
      <Skills categories={actor.skills} label={actor.labels?.skills} />
      <Training entries={actor.training} label={actor.labels?.training} />
      <Awards awards={actor.awards} label={actor.labels?.awards} />
      <Press items={actor.press} label={actor.labels?.press} />
      <Representation agent={actor.agent} label={actor.labels?.representation} />
      <Contact contact={actor.contact} name={actor.name} label={actor.labels?.contact} />
    </main>
  );
}

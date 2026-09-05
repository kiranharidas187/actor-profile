import { VideoFacade } from "../components/VideoFacade";
import { SectionHeading } from "../components/SectionHeading";
import type { ShowreelItem } from "../types/actor";

interface ShowreelProps {
  showreel?: ShowreelItem[];
  actorName: string;
  label?: string;
}

export function Showreel({ showreel, actorName, label }: ShowreelProps) {
  const reels = (showreel ?? []).filter((reel) => reel.youtubeId);
  if (reels.length === 0) return null;

  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>{label || "Showreel"}</SectionHeading>
      <div className="mt-[length:var(--space-5)] flex max-w-[48rem] flex-col gap-[length:var(--space-6)]">
        {reels.map((reel, i) => (
          <div key={`${reel.youtubeId}-${i}`}>
            {reel.title ? (
              <h3
                className="mb-[length:var(--space-2)]"
                style={{ color: "var(--c-accent)", fontSize: "var(--text-xs)", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                {reel.title}
              </h3>
            ) : null}
            <VideoFacade
              youtubeId={reel.youtubeId}
              poster={reel.poster}
              title={reel.title ? `${actorName} — ${reel.title}` : `${actorName} showreel`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

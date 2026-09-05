import { VideoFacade } from "../components/VideoFacade";
import { SectionHeading } from "../components/SectionHeading";
import type { Showreel as ShowreelData } from "../types/actor";

interface ShowreelProps {
  showreel: ShowreelData;
  actorName: string;
}

export function Showreel({ showreel, actorName }: ShowreelProps) {
  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>Showreel</SectionHeading>
      <div className="mt-[length:var(--space-5)] max-w-[48rem]">
        <VideoFacade youtubeId={showreel.youtubeId} poster={showreel.poster} title={`${actorName} showreel`} />
      </div>
    </section>
  );
}

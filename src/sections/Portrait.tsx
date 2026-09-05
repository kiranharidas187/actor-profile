import type { ImageRef } from "../types/actor";

interface PortraitProps {
  image?: ImageRef;
}

export function Portrait({ image }: PortraitProps) {
  if (!image) return null;

  return (
    <section className="spine py-[length:var(--space-7)]">
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        className="mx-auto h-auto w-full max-w-[28rem] object-cover"
        style={{ borderRadius: "var(--radius-md)", aspectRatio: `${image.width} / ${image.height}` }}
      />
    </section>
  );
}

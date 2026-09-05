import { SectionHeading } from "../components/SectionHeading";
import type { GalleryImage } from "../types/actor";

interface GalleryProps {
  images?: GalleryImage[];
  label?: string;
}

export function Gallery({ images, label }: GalleryProps) {
  if (!images?.length) return null;

  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>{label || "Gallery"}</SectionHeading>
      <div className="mt-[length:var(--space-5)] grid grid-cols-2 gap-[length:var(--space-4)] md:grid-cols-3">
        {images.map((image) => (
          <figure key={image.src} className="m-0">
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="w-full object-cover"
              style={{ aspectRatio: "3 / 4", borderRadius: "var(--radius-sm)" }}
            />
            <figcaption className="mt-[length:var(--space-2)]" style={{ color: "var(--c-muted)", fontSize: "var(--text-xs)" }}>
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

import { SectionHeading } from "../components/SectionHeading";
import type { PressEntry } from "../types/actor";

interface PressProps {
  items: PressEntry[];
}

export function Press({ items }: PressProps) {
  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>Press</SectionHeading>
      <ul className="hairline mt-[length:var(--space-5)] border-t" style={{ fontSize: "var(--text-sm)" }}>
        {items.map((item) => (
          <li key={item.url} className="hairline border-b py-[length:var(--space-3)]">
            <a href={item.url} target="_blank" rel="noreferrer" className="link-lift underline underline-offset-4">
              {item.title}
            </a>
            <div style={{ color: "var(--c-muted)", fontSize: "var(--text-xs)" }}>
              {item.publication}
              {item.date ? ` · ${item.date}` : ""}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

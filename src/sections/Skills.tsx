import { SectionHeading } from "../components/SectionHeading";
import type { SkillCategory } from "../types/actor";

interface SkillsProps {
  categories?: SkillCategory[];
  label?: string;
}

export function Skills({ categories, label }: SkillsProps) {
  const withItems = (categories ?? []).filter((category) => category.items?.length);
  if (withItems.length === 0) return null;

  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>{label || "Skills"}</SectionHeading>
      <div className="mt-[length:var(--space-5)] grid grid-cols-1 gap-[length:var(--space-6)] md:grid-cols-2">
        {withItems.map((category) => (
          <div key={category.category}>
            <h3 style={{ color: "var(--c-accent)", fontSize: "var(--text-xs)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {category.category}
            </h3>
            <dl className="hairline mt-[length:var(--space-2)] border-t" style={{ fontSize: "var(--text-sm)" }}>
              {category.items.map((item) => (
                <div key={item.label} className="hairline flex justify-between border-b py-[length:var(--space-2)]">
                  <dt>{item.label}</dt>
                  <dd style={{ color: "var(--c-muted)" }}>{item.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

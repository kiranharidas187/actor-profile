import { SectionHeading } from "../components/SectionHeading";
import type { AwardEntry } from "../types/actor";

interface AwardsProps {
  awards?: AwardEntry[];
  label?: string;
}

export function Awards({ awards, label }: AwardsProps) {
  if (!awards?.length) return null;

  const sorted = [...awards].sort((a, b) => b.year - a.year);
  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>{label || "Awards"}</SectionHeading>
      <table className="hairline mt-[length:var(--space-5)] w-full border-collapse border-t" style={{ fontSize: "var(--text-sm)" }}>
        <tbody>
          {sorted.map((award) => (
            <tr key={`${award.name}-${award.year}`} className="hairline border-b">
              <td className="py-[length:var(--space-2)] pr-[length:var(--space-3)]">{award.name}</td>
              <td className="py-[length:var(--space-2)] pr-[length:var(--space-3)]" style={{ color: "var(--c-muted)" }}>
                {award.project}
              </td>
              <td className="py-[length:var(--space-2)] pr-[length:var(--space-3)]" style={{ color: "var(--c-accent)" }}>
                {award.category ?? ""}
              </td>
              <td className="tabular py-[length:var(--space-2)] text-right">{award.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

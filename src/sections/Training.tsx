import { SectionHeading } from "../components/SectionHeading";
import type { TrainingEntry } from "../types/actor";

interface TrainingProps {
  entries?: TrainingEntry[];
  label?: string;
}

export function Training({ entries, label }: TrainingProps) {
  if (!entries?.length) return null;

  const sorted = [...entries].sort((a, b) => b.year - a.year);
  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>{label || "Training"}</SectionHeading>
      <table className="hairline mt-[length:var(--space-5)] w-full border-collapse border-t" style={{ fontSize: "var(--text-sm)" }}>
        <tbody>
          {sorted.map((entry) => (
            <tr key={`${entry.program}-${entry.year}`} className="hairline border-b">
              <td className="py-[length:var(--space-2)] pr-[length:var(--space-3)]">{entry.program}</td>
              <td className="py-[length:var(--space-2)] pr-[length:var(--space-3)]" style={{ color: "var(--c-muted)" }}>
                {entry.school}
                {entry.instructor ? ` — ${entry.instructor}` : ""}
              </td>
              <td className="tabular py-[length:var(--space-2)] text-right">{entry.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

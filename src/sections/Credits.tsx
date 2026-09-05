import { SectionHeading } from "../components/SectionHeading";
import type { Credit, CreditMedium } from "../types/actor";

interface CreditsProps {
  credits?: Credit[];
  label?: string;
}

const MEDIUM_ORDER: CreditMedium[] = [
  "Feature Film",
  "Television",
  "Web Series",
  "Theatre",
  "Short Film",
  "Commercial",
];

export function Credits({ credits, label }: CreditsProps) {
  if (!credits?.length) return null;

  const groups = MEDIUM_ORDER.map((medium) => ({
    medium,
    items: credits.filter((c) => c.medium === medium).sort((a, b) => b.year - a.year),
  })).filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>{label || "Credits"}</SectionHeading>
      <table className="mt-[length:var(--space-5)] w-full border-collapse" style={{ fontSize: "var(--text-sm)" }}>
        <colgroup>
          <col className="w-[45%]" />
          <col className="w-[30%]" />
          <col className="w-[15%]" />
          <col className="tabular w-[10%]" />
        </colgroup>
        {groups.map((group) => (
          <tbody key={group.medium} className="hairline border-t">
            <tr>
              <th
                colSpan={4}
                className="pt-[length:var(--space-4)] pb-[length:var(--space-2)] text-left font-normal"
                style={{ color: "var(--c-accent)", fontSize: "var(--text-xs)", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                {group.medium}
              </th>
            </tr>
            {group.items.map((credit) => (
              <tr key={`${credit.title}-${credit.year}`} className="hairline border-t">
                <td className="py-[length:var(--space-2)] pr-[length:var(--space-3)]">{credit.title}</td>
                <td className="py-[length:var(--space-2)] pr-[length:var(--space-3)]" style={{ color: "var(--c-muted)" }}>
                  {credit.role}
                </td>
                <td className="py-[length:var(--space-2)] pr-[length:var(--space-3)]" style={{ color: "var(--c-muted)" }}>
                  {credit.company ?? credit.director ?? ""}
                </td>
                <td className="tabular py-[length:var(--space-2)] text-right">{credit.year}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </section>
  );
}

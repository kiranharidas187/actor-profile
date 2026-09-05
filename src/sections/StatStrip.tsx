import type { Stat } from "../types/actor";

interface StatStripProps {
  stats?: Stat[];
}

export function StatStrip({ stats }: StatStripProps) {
  if (!stats?.length) return null;

  return (
    <section className="spine py-[length:var(--space-5)]">
      <div
        className="hairline flex gap-[length:var(--space-7)] overflow-x-auto border-y py-[length:var(--space-3)]"
        style={{ scrollbarWidth: "none" }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="shrink-0">
            <div style={{ color: "var(--c-muted)", fontSize: "var(--text-xs)" }}>{stat.label}</div>
            <div className="tabular" style={{ fontSize: "var(--text-base)" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

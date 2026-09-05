import { SectionHeading } from "../components/SectionHeading";
import type { Agent } from "../types/actor";

interface RepresentationProps {
  agent?: Agent;
  label?: string;
}

export function Representation({ agent, label }: RepresentationProps) {
  if (!agent?.name || !agent?.agency) return null;

  return (
    <section className="spine py-[length:var(--space-7)]">
      <SectionHeading>{label || "Representation"}</SectionHeading>
      <div className="mt-[length:var(--space-4)]" style={{ fontSize: "var(--text-base)" }}>
        <div>{agent.name}</div>
        <div style={{ color: "var(--c-muted)" }}>{agent.agency}</div>
        {agent.email ? (
          <div className="mt-[length:var(--space-2)]">
            <a href={`mailto:${agent.email}`} className="link-lift underline underline-offset-4">
              {agent.email}
            </a>
          </div>
        ) : null}
        {agent.phone ? <div className="tabular" style={{ color: "var(--c-muted)" }}>{agent.phone}</div> : null}
      </div>
    </section>
  );
}

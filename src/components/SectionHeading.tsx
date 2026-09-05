export function SectionHeading({ children }: { children: string }) {
  return (
    <div>
      <span aria-hidden="true" className="block" style={{ width: "2rem", height: "2px", background: "var(--c-accent)", marginBottom: "var(--space-2)" }} />
      <h2 className="font-display" style={{ fontSize: "var(--text-display)" }}>
        {children}
      </h2>
    </div>
  );
}

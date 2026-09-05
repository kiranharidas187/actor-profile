export function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="font-display" style={{ fontSize: "var(--text-display)" }}>
      {children}
    </h2>
  );
}

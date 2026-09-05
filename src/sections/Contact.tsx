import { SectionHeading } from "../components/SectionHeading";
import type { ContactInfo } from "../types/actor";

interface ContactProps {
  contact: ContactInfo;
  name: string;
}

export function Contact({ contact, name }: ContactProps) {
  return (
    <footer className="spine hairline border-t py-[length:var(--space-8)]">
      <SectionHeading>Contact</SectionHeading>
      <div className="mt-[length:var(--space-4)]" style={{ fontSize: "var(--text-base)" }}>
        {contact.email ? (
          <div>
            <a href={`mailto:${contact.email}`} className="link-lift underline underline-offset-4">
              {contact.email}
            </a>
          </div>
        ) : null}
        {contact.phone ? <div className="tabular mt-[length:var(--space-1)]" style={{ color: "var(--c-muted)" }}>{contact.phone}</div> : null}
        {contact.socials && contact.socials.length > 0 ? (
          <div className="mt-[length:var(--space-3)] flex gap-[length:var(--space-4)]">
            {contact.socials.map((social) => (
              <a key={social.url} href={social.url} target="_blank" rel="noreferrer" className="link-lift underline underline-offset-4">
                {social.platform}
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <p className="mt-[length:var(--space-6)]" style={{ color: "var(--c-muted)", fontSize: "var(--text-xs)" }}>
        © {new Date().getFullYear()} {name}
      </p>
    </footer>
  );
}

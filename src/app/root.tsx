import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "../styles/globals.css";
import "virtual:theme-fonts.css";
import themeCss from "virtual:theme-css-text";
import { fontPreloadHrefs } from "virtual:theme-config";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Rendered directly (not a stylesheet import) so the resolved theme
            colors are part of the initial HTML in both dev and the
            prerendered build — see src/theme/vite-plugin.ts for why. */}
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {fontPreloadHrefs.map((href) => (
          <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
        ))}
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

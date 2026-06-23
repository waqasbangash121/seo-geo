import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteShell } from "@/components/layout/site-shell";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZC5XNC1VDY"
          strategy="lazyOnload"
        />

        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());
            gtag('config', 'G-ZC5XNC1VDY', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body>
        <SiteShell>{children}</SiteShell>

        <GoogleAnalytics />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

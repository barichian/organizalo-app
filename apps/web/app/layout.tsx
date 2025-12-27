import Script from "next/script";

// styles
import "@/styles/globals.css";

import { SITE_DESCRIPTION, SITE_NAME } from "@plane/constants";

// helpers
import { cn } from "@plane/utils";

// assets
import favicon16 from "@/public/organizalo-assets/favicon.png?url";
import favicon32 from "@/public/organizalo-assets/favicon.png?url";
import faviconIco from "@/public/organizalo-assets/favicon.png?url";
import icon180 from "@/public/organizalo-assets/favicon.png?url";
import icon512 from "@/public/organizalo-assets/favicon.png?url";

// local
import { AppProvider } from "./provider";

export const meta = () => [
  { title: "Organizalo | Gestión de tareas simple y potente." },
  { name: "description", content: "Organizalo te ayuda a gestionar tus tareas, ciclos y proyectos fácilmente." },
  {
    name: "keywords",
    content:
      "gestión de tareas, proyectos, whatsapp, organizalo, productividad, venezuela",
  },
  {
    name: "viewport",
    content:
      "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  },
  { property: "og:title", content: "Organizalo | Gestión de tareas simple." },
  {
    property: "og:description",
    content: "Herramienta de gestión de proyectos integrada con WhatsApp.",
  },
  { property: "og:url", content: "https://organizalo.app/" },
  { property: "og:image", content: "https://organizalo.app/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Organizalo - Gestión moderna" },
  { name: "twitter:site", content: "@organizaloAPP" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: "https://organizalo.app/og-image.png" },
  { name: "twitter:image:width", content: "1200" },
  { name: "twitter:image:height", content: "630" },
  { name: "twitter:image:alt", content: "Organizalo - Gestión moderna" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isSessionRecorderEnabled = parseInt(process.env.VITE_ENABLE_SESSION_RECORDER || "0");

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fff" />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
        <link rel="manifest" href="/site.webmanifest.json" />
        <link rel="shortcut icon" href={faviconIco} />
        {/* Meta info for PWA */}
        <meta name="application-name" content="Organizalo" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href={icon512} />
        <link rel="apple-touch-icon" sizes="180x180" href={icon180} />
        <link rel="apple-touch-icon" sizes="512x512" href={icon512} />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div id="context-menu-portal" />
        <div id="editor-portal" />
        <AppProvider>
          <div
            className={cn(
              "h-screen w-full overflow-hidden bg-custom-background-100 relative flex flex-col",
              "app-container"
            )}
          >
            <main className="w-full h-full overflow-hidden relative">{children}</main>
          </div>
        </AppProvider>
      </body>
      {!!isSessionRecorderEnabled && process.env.VITE_SESSION_RECORDER_KEY && (
        <Script id="clarity-tracking">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];if(y){y.parentNode.insertBefore(t,y);}
          })(window, document, "clarity", "script", "${process.env.VITE_SESSION_RECORDER_KEY}");`}
        </Script>
      )}
    </html>
  );
}

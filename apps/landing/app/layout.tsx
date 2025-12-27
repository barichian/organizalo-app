import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Organizalo.app - Gestión de equipos sin caos",
  description: "La plataforma de gestión de proyectos diseñada para Venezuela. Integra WhatsApp, Tableros Kanban y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} font-sans antialiased text-slate-900 bg-white`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lex & Asociados",
  description: "TODO (Fase 2.3): metadata definitiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grant Law — Abogado",
    template: "%s · Grant Law",
  },
  description:
    "Grant Law. Abogado. Asesoría legal estratégica en derecho corporativo, litigios, laboral, inmobiliario y familia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={archivo.variable}>
      <body>
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

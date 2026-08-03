import type { Metadata } from "next";
import { Libre_Caslon_Text, Libre_Franklin } from "next/font/google";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const libreCaslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grant Law — Abogado",
    template: "%s · Grant Law",
  },
  description:
    "Grant Law. Abogado. Asesoría legal en derecho corporativo, litigios, laboral, inmobiliario y familia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${libreCaslonText.variable} ${libreFranklin.variable}`}>
      <body>
        <SplashScreen />
        <PageTransition />
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

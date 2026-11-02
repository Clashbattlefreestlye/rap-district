import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAP DISTRICT — El distrito del freestyle",
  description:
    "Entra al distrito, reta a otros MCs, comparte tu minuto libre y conquista el ranking."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

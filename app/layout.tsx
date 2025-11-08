import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ECG Simulator V0 Beta",
  description: "Simulador ECG con IA - Versión Beta. Mobile-first UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Use the Roobert variable family (non-mono) so bold weights render with the correct glyphs.
const roobert = localFont({
  src: [
    {
      path: "../../public/fonts/RoobertTRIALVF.ttf",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-roobert",
});

export const metadata: Metadata = {
  title: "AMTC manual de marca",
  description: "Manual de identidad corporativa de AMTC, incluyendo lineamientos de uso del logo, paleta de colores y tipografías.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roobert.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

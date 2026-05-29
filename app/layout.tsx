import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import GlobalListeners from "@/components/GlobalListeners";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aangan Restaurant — Rooftop Dining in Sargodha",
  description:
    "Sargodha's finest rooftop dining experience. Delicious BBQ, charcoal grills, and more on the top floor of Xin Mall, Queens Road, Sargodha. Dine-In Only.",
  keywords: [
    "Aangan Restaurant",
    "Sargodha restaurant",
    "rooftop dining Sargodha",
    "BBQ Sargodha",
    "Xin Mall restaurant",
  ],
  openGraph: {
    title: "Aangan Restaurant — Rooftop Dining in Sargodha",
    description:
      "Delicious BBQ and more. Join us on our rooftop for a tasty meal with a view.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${dancing.variable}`}
    >
      <body className="antialiased">
        {children}
        <GlobalListeners />
      </body>
    </html>
  );
}

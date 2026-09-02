import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_Tamil, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const tamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vijayalakshmi & Ranjith Raj — Wedding Invitation",
  description:
    "With the divine blessings of our families, we cordially invite you to celebrate the wedding of Vijayalakshmi E. & Ranjith Raj B. on Sunday, 13th September 2026 at Thiruverkadu, Chennai.",
  keywords: [
    "Vijayalakshmi",
    "Ranjith Raj",
    "Wedding Invitation",
    "Thiruverkadu",
    "Ramalaya Kalyana Mandapam",
    "South Indian Wedding",
  ],
  openGraph: {
    title: "Vijayalakshmi & Ranjith Raj Wedding Invitation",
    description: "Sunday, 13 September 2026 · Ramalaya Kalyana Mandapam, Thiruverkadu, Chennai",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${tamil.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="font-sans bg-[#3B0F1A] text-amber-50 selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}


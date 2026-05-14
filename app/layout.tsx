import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Cole Bonawitz — Product + Growth Builder",
  description:
    "Duke CS student and startup operator who builds consumer products, AI tools, and distribution systems. $135K+ e-commerce revenue, 5M+ social views, 3,500+ orders shipped.",
  icons: {
    icon: "/images/faveconcb.png",
    shortcut: "/images/faveconcb.png",
    apple: "/images/faveconcb.png",
  },
  openGraph: {
    title: "Cole Bonawitz — Product + Growth Builder",
    description:
      "I build, launch, and grow internet products. Duke CS student and startup operator.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

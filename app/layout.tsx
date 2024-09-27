import type { Metadata } from "next";
import { Inter, Outfit, Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Reusables/Footer";

const inter = Inter({ subsets: ["latin"] });

const outfit = Outfit({subsets : ["latin"]})

export const metadata: Metadata = {
  title: "Sky Guide",
  description: "Get real-time, precise weather forecasts from multiple sources, and plan your perfect flight with ease. Stay safe, fly smart, and explore the skies with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {children}
        <Footer />
      </body>

    </html>
  );
}

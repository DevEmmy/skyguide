import type { Metadata } from "next";
import { Inter, Outfit, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
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
        <div className="bg-sky h-[70vh]">
          <NavBar />

          <div className="my-20 w-1/2 mx-auto text-center text-white flex flex-col gap-5">
            <p className=" text-center text-4xl font-semibold text-white">Your Flight. Your Sky. Your Weather.</p>
            <p className="text-[16px]">
              Get real-time, precise weather forecasts from multiple sources, and plan your perfect flight with ease. Stay safe, fly smart, and explore the skies with confidence.
            </p>
          </div>
        </div>
        {children}
        <Footer />
      </body>

    </html>
  );
}

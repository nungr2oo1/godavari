import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AppProviders } from "@/components/app-providers";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { BackgroundMusic } from "@/components/background-music";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Ubhaya Godavari Living Guide",
    template: "%s · Ubhaya Godavari Living Guide",
  },
  description:
    "Discover the two Godavaris — temples, riversides, food, festivals and trips across East and West Godavari, Konaseema and beyond.",
  keywords: [
    "Ubhaya Godavari",
    "Godavari travel",
    "East Godavari",
    "West Godavari",
    "Konaseema",
    "Papikondalu",
    "Antarvedi",
    "Rajamahendravaram",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AppProviders>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <BackgroundMusic />
        </AppProviders>
      </body>
    </html>
  );
}

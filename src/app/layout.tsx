import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4Fun Clan",
  description: "Welcome to 4Fun Clan.",
  icons: {
    icon: "/img/4F.webp",
  },
  openGraph: {
    title: "4Fun Clan",
    description: "Welcome to 4Fun Clan.",
    url: "https://4funclan.site",
    siteName: "4Fun Clan",
    images: [
      {
        url: "/img/banner.png",
        width: 1200,
        height: 630,
        alt: "4Fun Clan Banner",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "4Fun Clan",
    description: "Welcome to 4Fun Clan.",
    images: ["/img/banner.png"],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased font-sans bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

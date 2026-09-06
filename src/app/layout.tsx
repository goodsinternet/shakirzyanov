import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { site } from "@/content/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shakirzianov-digi-spark.lovable.app"),
  title: site.meta.title,
  description: site.meta.description,
  authors: [{ name: "Алексей Шакирзянов" }],
  keywords: [
    "Алексей Шакирзянов",
    "Домовой",
    "AI-продукт",
    "семейный диспетчер",
    "Sber500",
    "веб-разработка",
    "вайбкодинг",
    "чат-боты",
    "MVP",
  ],
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
    locale: "ru_RU",
    siteName: "Алексей Шакирзянов",
    images: [
      {
        url: "/assets/alexey-photo.webp",
        width: 1200,
        height: 1200,
        alt: "Алексей Шакирзянов — digital-разработчик",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    images: ["/assets/alexey-photo.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111217",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

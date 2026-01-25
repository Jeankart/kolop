import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/seo/schemaGenerator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Wallpaper - Descarga los Mejores Fondos de Pantalla",
  description: "Descubre y descarga wallpapers de alta calidad: iOS, Live, AI, Aesthetic, Anime, Cars, Cats, Charging y más. Fondos de pantalla para tu dispositivo.",
  keywords: "wallpaper, fondos, fondo de pantalla, iOS, Android, descarga, gratis, fondos de pantalla 4K",
  authors: [{ name: "Wallpaper App" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Wallpaper",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://wallpaper.example.com",
    title: "Wallpaper - Descarga Fondos de Pantalla",
    description: "Los mejores wallpapers de alta calidad para tu dispositivo",
    siteName: "Wallpaper",
    images: [
      {
        url: "https://wallpaper.example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wallpaper App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallpaper - Descarga Fondos de Pantalla",
    description: "Los mejores wallpapers de alta calidad para tu dispositivo",
    images: ["https://wallpaper.example.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  alternates: {
    canonical: "https://wallpaper.example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
        {/* Schema.org JSON-LD */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#151515] dark:bg-[#151515] text-white dark:text-white`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import DesktopMobileWrapper from "./components/DesktopMobileWrapper";
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
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Wallpaper - Download Premium Wallpapers",
  description: "Discover and download high-quality wallpapers: iOS, Live, AI, Aesthetic, Anime, Cars, Widgets, Charging and more. Beautiful backgrounds for your device.",
  keywords: "wallpaper, backgrounds, 4K, iOS, Android, download, free, premium wallpapers, live wallpapers",
  authors: [{ name: "Wallpaper App" }],
  verification: {
    google: "4bVMYUEIROIP-KEcleWJaXiIOhVMxKANa7cwyQsvRcw",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kloop",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kloop.vercel.app",
    title: "Wallpaper - Download Premium Wallpapers",
    description: "The best high-quality wallpapers for your device",
    siteName: "Wallpaper",
    images: [
      {
        url: "https://kloop.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wallpaper App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallpaper - Download Premium Wallpapers",
    description: "The best high-quality wallpapers for your device",
    images: ["https://kloop.vercel.app/og-image.jpg"],
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
    canonical: "https://kloop.vercel.app",
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
    <html lang="en" suppressHydrationWarning className="dark">
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
        <DesktopMobileWrapper>
          <ClientLayout>{children}</ClientLayout>
        </DesktopMobileWrapper>
      </body>
    </html>
  );
}

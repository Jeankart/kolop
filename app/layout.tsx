import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import DesktopMobileWrapper from "./components/DesktopMobileWrapper";
import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/seo/schemaGenerator";
import { generateFAQSchema, generateAppSchema } from "@/lib/seo/advancedSchema";

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
  title: "Kloop Wallpapers - Free 4K Wallpapers for iPhone 17, iOS 26 & Android | Download Now",
  description: "Download free premium 4K wallpapers for iPhone 17, iPhone Pro, iOS, Android and desktop. Kloop offers anime wallpapers, aesthetic backgrounds, live wallpapers, cars, and more. High-quality phone wallpapers free download.",
  keywords: "Kloop Wallpapers, wallpapers for iPhone, iPhone 17 wallpapers, iOS 26 wallpapers, free wallpapers, 4K wallpapers, anime wallpapers, aesthetic wallpapers, live wallpapers, free download wallpapers, iPhone wallpapers free, cars wallpapers, phone wallpapers, wallpapers free, wallpapers for your phone, premium wallpapers, backgrounds download, high quality wallpapers, iPhone Pro wallpapers, beautiful wallpapers, AI wallpapers, charging wallpapers",
  authors: [{ name: "Kloop - Premium Wallpapers" }],
  creator: "Kloop Team",
  publisher: "Kloop",
  verification: {
    google: "4bVMYUEIROIP-KEcleWJaXiIOhVMxKANa7cwyQsvRcw",
    other: {
      "msvalidate.01": "D2C9B8F7E3C5A1B9F2D4E6A8C1B3D5F7",
    },
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
    title: "Kloop Wallpapers - Free 4K Wallpapers for iPhone 17 & iOS",
    description: "Download free premium 4K wallpapers for iPhone, iPad, iOS, Android and desktop. Anime, aesthetic, live wallpapers, cars and more.",
    siteName: "Kloop - Premium Free Wallpapers",
    images: [
      {
        url: "https://kloop.vercel.app/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "Wallpaper App - Download Premium Wallpapers",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Kloop Wallpapers - Free 4K Wallpapers for iPhone 17",
    description: "Download free premium 4K wallpapers for iPhone, iPad, iOS, Android. Anime, aesthetic, live wallpapers and more.",
    images: ["https://kloop.vercel.app/apple-touch-icon.png"],
    creator: "@kloopcommunity",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://kloop.vercel.app",
    languages: {
      "en-US": "https://kloop.vercel.app",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFAQSchema();
  const appSchema = generateAppSchema();

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Performance & SEO hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://kloop.vercel.app" />
        
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
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <Script
          id="app-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
        
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
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

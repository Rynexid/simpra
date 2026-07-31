import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { CookieConsentProvider } from "@/components/cookie-consent-provider";
import { RootLayoutInner } from "@/components/root-layout-inner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Simpra",
    template: "%s | Simpra",
  },
  description:
    "Modern Inventory & Warehouse Platform by Rynex Studio — manage inventory, warehouses, suppliers, purchasing, and stock movement in one place.",
  keywords: ["inventory management", "warehouse management", "stock tracking", "SME inventory", "warehouse software", "Simpra", "Rynex Studio"],
  authors: [{ name: "Rynex Studio" }],
  creator: "Rynex Studio",
  publisher: "Rynex Studio",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://simpra.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: {
      default: "Simpra — Modern Inventory & Warehouse Platform",
      template: "%s | Simpra",
    },
    description:
      "Manage inventory, warehouses, suppliers, purchasing, and stock movement from one modern platform.",
    url: "/",
    siteName: "Simpra",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Simpra — Modern Inventory & Warehouse Platform",
      template: "%s | Simpra",
    },
    description:
      "Manage inventory, warehouses, suppliers, purchasing, and stock movement from one modern platform.",
  },
  icons: {
    icon: "/favicon/favicon.ico",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <CookieConsentProvider>
          <RootLayoutInner>{children}</RootLayoutInner>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

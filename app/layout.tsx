import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNeueMedium = localFont({
  src: "./fonts/HelveticaNeueLTPro-Md.otf",
  variable: "--font-helvetica-neue",
  weight: "500",
  style: "normal",
  display: "swap",
});

const helveticaNeueBold = localFont({
  src: "./fonts/HelveticaNeueLTPro-Bd.otf",
  variable: "--font-helvetica-neue-bold",
  weight: "700",
  style: "normal",
  display: "swap",
});

const title = "Nina Raasch — Photographer, London and Berlin";
const description =
  "Photographer working between London and Berlin. Fashion, editorial and commercial work for Mytheresa, AESOP, Bottega Veneta, ELLE and Vogue.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ninaraasch.com"),
  title: {
    default: title,
    template: "%s — Nina Raasch",
  },
  description,
  applicationName: "Nina Raasch",
  authors: [{ name: "Nina Raasch", url: "https://ninaraasch.com" }],
  creator: "Nina Raasch",
  keywords: [
    "Nina Raasch",
    "photographer",
    "fashion photography",
    "editorial photography",
    "portrait photography",
    "Berlin",
    "London",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://ninaraasch.com",
    siteName: "Nina Raasch",
    title,
    description,
    locale: "en_GB",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nina Raasch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${helveticaNeueMedium.variable} ${helveticaNeueBold.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

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

const description =
  "Photographer working across fashion, editorial, and commercial imagery";

export const metadata: Metadata = {
  metadataBase: new URL("https://ninaraasch.com"),
  title: "Nina Raasch",
  description,
  openGraph: {
    type: "website",
    url: "https://ninaraasch.com",
    title: "Nina Raasch",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nina Raasch",
    description,
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
      className={`${helveticaNeueMedium.variable} ${helveticaNeueBold.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

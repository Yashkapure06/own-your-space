import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ownyourspace.com"),
  title: {
    default: "Own Your Space - Free Growth Audit",
    template: "%s | Own Your Space",
  },
  description:
    "A no-fluff audit of your website's growth gaps. Conversion, speed, UX, and SEO - reviewed by a human, delivered in 48 hours.",
  keywords: [
    "website audit",
    "growth audit",
    "conversion audit",
    "SEO audit",
    "UX audit",
  ],
  openGraph: {
    title: "Own Your Space - Free Growth Audit",
    description:
      "A no-fluff audit of your website's growth gaps. Reviewed by a human, delivered in 48 hours.",
    type: "website",
    url: "/",
    siteName: "Own Your Space",
  },
  twitter: {
    card: "summary_large_image",
    title: "Own Your Space - Free Growth Audit",
    description:
      "A no-fluff audit of your website's growth gaps. Reviewed by a human, delivered in 48 hours.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

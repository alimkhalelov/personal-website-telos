import type { Metadata } from "next";
import { Outfit, Geist_Mono, Asap_Condensed } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { KebabNav } from "@/components/kebab-nav";
import { ScrollController } from "@/components/scroll-controller";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd, getPersonAndWebsiteGraph } from "@/components/seo/json-ld";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const asapCondensed = Asap_Condensed({
  variable: "--font-asap-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const sfProRounded = localFont({
  src: [
    {
      path: "../../public/fonts/SFRounded-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SFRounded-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SFRounded-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/SFRounded-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/SFRounded-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alim.dest.page"),
  title: {
    default: "Alim Khalelov | AI-Native Product Manager",
    template: "%s | Alim Khalelov",
  },
  description:
    "Product Manager with 5+ years shipping 0-to-1 products at AI and Web3 startups. I build multi-agent systems, design validation pipelines for LLM outputs, and run rapid prototyping cycles to find product-market fit before scaling.",
  keywords: [
    "Alim Khalelov",
    "Architect of Autonomous Systems",
    "AI-Native Product Manager",
    "Fan-Filter-Scale",
    "Loop Engineering",
    "Spec-Driven Development",
    "Generative Engine Optimization",
  ],
  authors: [{ name: "Alim Khalelov", url: "https://alim.dest.page" }],
  creator: "Alim Khalelov",
  publisher: "Alim Khalelov",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alim.dest.page",
    siteName: "Alim Khalelov",
    title: "Alim Khalelov | Architect of Autonomous Systems",
    description:
      "Alim Khalelov — Architect of Autonomous Systems and AI-Native Product Manager. Building high-leverage products using the Fan-Filter-Scale methodology.",
    images: [
      {
        url: "/thumbnails/wiki.jpg",
        width: 1200,
        height: 675,
        alt: "Alim Khalelov — Architect of Autonomous Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alim Khalelov | Architect of Autonomous Systems",
    description:
      "Alim Khalelov — Architect of Autonomous Systems and AI-Native Product Manager. Building high-leverage products using the Fan-Filter-Scale methodology.",
    images: ["/thumbnails/wiki.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "512x512", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${geistMono.variable} ${asapCondensed.variable} ${sfProRounded.variable} h-full antialiased`}>
      <head>
        <JsonLd data={getPersonAndWebsiteGraph()} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent/30 transition-colors duration-300">
        <ScrollController />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <KebabNav />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

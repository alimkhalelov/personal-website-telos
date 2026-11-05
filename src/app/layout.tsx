import type { Metadata } from "next";
import { Outfit, Geist_Mono, Antonio } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { KebabNav } from "@/components/kebab-nav";
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

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400", "700"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${geistMono.variable} ${antonio.variable} h-full antialiased`}>
      <head>
        <JsonLd data={getPersonAndWebsiteGraph()} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent/30 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <KebabNav />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

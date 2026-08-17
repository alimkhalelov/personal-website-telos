import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { BionicToggle } from "@/components/bionic-toggle";
import { Analytics } from "@vercel/analytics/next";
import { LanguageToggle } from "@/components/language-toggle";
import { JsonLd, getPersonAndWebsiteGraph } from "@/components/seo/json-ld";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alim.dest.page"),
  title: {
    default: "Alim Khalelov | Architect of Autonomous Systems",
    template: "%s | Alim Khalelov",
  },
  description:
    "Alim Khalelov — Architect of Autonomous Systems and AI-Native Product Manager. Building high-leverage products using the Fan-Filter-Scale methodology.",
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
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <JsonLd data={getPersonAndWebsiteGraph()} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent/30 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="fixed top-3.5 right-4 sm:right-6 z-50 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <BionicToggle />
          </div>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

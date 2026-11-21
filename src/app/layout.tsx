import type { Metadata } from "next";
import { Outfit, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-context";
import { GoogleSignInModal } from "@/components/google-sign-in-modal";
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

const caveat = Caveat({
  variable: "--font-caveat",
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
    "Alimzhan Khalelov",
    "AI-Native Product Manager",
    "0-to-1 Product Builder",
    "Multi-Agent Systems",
    "LLM Evaluation Pipelines",
    "Rapid Prototyping",
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
    title: "Alim Khalelov | AI-Native Product Manager",
    description:
      "Product Manager with 5+ years shipping 0-to-1 products at AI and Web3 startups. Multi-agent systems, LLM validation pipelines, and rapid prototypes.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Alim Khalelov | AI-Native Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Alim Khalelov | AI-Native Product Manager",
    description:
      "Product Manager with 5+ years shipping 0-to-1 products at AI and Web3 startups. Multi-agent systems, LLM evaluation, and rapid prototyping.",
    images: ["/icon.png"],
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
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}>
      <head>
        <JsonLd data={getPersonAndWebsiteGraph()} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var isDynamic = localStorage.getItem('oneui-dynamic-daytime') !== 'false';
                if (isDynamic) {
                  document.documentElement.classList.add('has-dynamic-daytime');
                }
              } catch(e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent/30 transition-colors duration-300">
        <ScrollController />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <KebabNav />
            <GoogleSignInModal />
            {children}
          </AuthProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

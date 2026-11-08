import type { Metadata } from "next";
import { Outfit, Geist_Mono, Asap_Condensed } from "next/font/google";
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

const asapCondensed = Asap_Condensed({
  variable: "--font-asap-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
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
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${geistMono.variable} ${asapCondensed.variable} h-full antialiased`}>
      <head>
        <JsonLd data={getPersonAndWebsiteGraph()} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var isDynamic = localStorage.getItem('oneui-dynamic-daytime') !== 'false';
                if (isDynamic) {
                  document.documentElement.classList.add('has-dynamic-daytime');
                  var d = new Date();
                  var h = d.getHours() + d.getMinutes() / 60;
                  var stops = ['#0277BD', '#0288D1', '#29B6F6', '#81D4FA', '#E1F5FE'];
                  if (h >= 5.0 && h < 8.5) {
                    stops = ['#171B47', '#3B336A', '#7E4E7A', '#C9636A', '#F8A56E'];
                  } else if (h >= 8.5 && h < 16.5) {
                    stops = ['#0277BD', '#0288D1', '#29B6F6', '#81D4FA', '#E1F5FE'];
                  } else if (h >= 16.5 && h < 19.5) {
                    stops = ['#18153A', '#431E6E', '#882375', '#D83A56', '#FF764A'];
                  } else if (h >= 19.5 && h < 23.0) {
                    stops = ['#090D24', '#141B49', '#28296A', '#423778', '#5A3F7A'];
                  } else {
                    stops = ['#050714', '#0C102A', '#15173B', '#221845', '#180D2D'];
                  }
                  var grad = 'linear-gradient(175deg, ' + stops[0] + ' 0%, ' + stops[1] + ' 26%, ' + stops[2] + ' 52%, ' + stops[3] + ' 76%, ' + stops[4] + ' 100%)';
                  document.documentElement.style.setProperty('--circadian-grad', grad);
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

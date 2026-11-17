import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import TeardownHero from "@/components/startup-pitch/TeardownHero";
import PoWClusterSelect from "@/components/startup-pitch/PoWClusterSelect";
import { getTrackedLink, recordClick } from "@/lib/link-tracker";

export const dynamicParams = true;

interface TeardownData {
  company_name: string;
  founder_name: string;
  slug: string;
  pow_cluster: string;
  hook: string;
  friction_points: { title: string; description: string }[];
  architecture_hypothesis: string;
}

async function getTeardownData(slug: string): Promise<TeardownData | null> {
  try {
    const data = await import(`@/content/startups/${slug}.json`);
    return data.default || data;
  } catch (error: any) {
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();

  // 1. Check custom tracked link metadata
  const customLink = getTrackedLink(slug);
  if (customLink) {
    return {
      title: `${customLink.title} | Alim Khalelov`,
      description: customLink.description || `Redirecting to ${customLink.title}`,
      openGraph: {
        title: customLink.title,
        description: customLink.description || `Direct link to ${customLink.title}`,
        url: `https://alim.dest.page/${slug}`,
      },
    };
  }

  // 2. Check startup teardown metadata
  const data = await getTeardownData(slug);
  if (!data) {
    return {
      title: "Alim Khalelov",
    };
  }

  const title = `Product Teardown // ${data.company_name} | Alim Khalelov`;
  const description = `0→1 Product audit and architecture blueprint for ${data.company_name} by Alim Khalelov (Senior Product Builder).`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://alim.dest.page/${data.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function DynamicSlugPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();

  // 1. Check if this slug is a custom tracked link (e.g. /nebuly, /tempo, /ocus, /cv)
  const customLink = getTrackedLink(slug);
  if (customLink) {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "127.0.0.1";
    const country = headersList.get("x-vercel-ip-country") || "Unknown";
    const city = decodeURIComponent(headersList.get("x-vercel-ip-city") || "") || "Unknown";
    const region = headersList.get("x-vercel-ip-country-region") || "";
    const referer = headersList.get("referer") || "direct";
    const userAgent = headersList.get("user-agent") || "";

    // Record click analytics asynchronously
    await recordClick({
      slug,
      targetUrl: customLink.targetUrl,
      title: customLink.title,
      ip,
      country,
      city,
      region,
      referer,
      userAgent,
    });

    // Instant temporary 307 redirect
    redirect(customLink.targetUrl);
  }

  // 2. Check if this slug is a startup teardown
  const teardownData = await getTeardownData(slug);
  if (teardownData) {
    const headersList = await headers();
    recordClick({
      slug,
      targetUrl: `https://alim.dest.page/${slug}`,
      title: `Teardown: ${teardownData.company_name}`,
      ip:
        headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        headersList.get("x-real-ip") ||
        "127.0.0.1",
      country: headersList.get("x-vercel-ip-country") || "Unknown",
      city: decodeURIComponent(headersList.get("x-vercel-ip-city") || "") || "Unknown",
      region: headersList.get("x-vercel-ip-country-region") || "",
      referer: headersList.get("referer") || "direct",
      userAgent: headersList.get("user-agent") || "",
    }).catch(() => {});

    return (
      <main className="min-h-screen bg-[#111113] text-[#FAFAFA] antialiased">
        <TeardownHero 
          companyName={teardownData.company_name}
          founderName={teardownData.founder_name}
          hook={teardownData.hook}
          frictionPoints={teardownData.friction_points}
          architectureHypothesis={teardownData.architecture_hypothesis}
        />
        <PoWClusterSelect cluster={teardownData.pow_cluster} />
      </main>
    );
  }

  notFound();
}

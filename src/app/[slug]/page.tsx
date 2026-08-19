import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TeardownHero from '@/components/startup-pitch/TeardownHero';
import PoWClusterSelect from '@/components/startup-pitch/PoWClusterSelect';

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
  const data = await getTeardownData(resolvedParams.slug);

  if (!data) {
    return {
      title: 'Product Teardown | Alim Khalelov',
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
      type: 'article',
      url: `https://alim.dest.page/${data.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function StartupTeardownPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getTeardownData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#111113] text-[#FAFAFA] antialiased">
      {/* 1. The Hook / Teardown Section (AI-Wiki Bento Style) */}
      <TeardownHero 
        companyName={data.company_name}
        founderName={data.founder_name}
        hook={data.hook}
        frictionPoints={data.friction_points}
        architectureHypothesis={data.architecture_hypothesis}
      />

      {/* 2. The Dynamic Proof of Work & Track Record Section */}
      <PoWClusterSelect cluster={data.pow_cluster} />
    </main>
  );
}


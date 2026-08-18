import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import TeardownHero from '@/components/startup-pitch/TeardownHero';
import PoWClusterSelect from '@/components/startup-pitch/PoWClusterSelect';

export const dynamicParams = true;

// Mock interface for the generated teardown JSON
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

export default async function StartupTeardownPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getTeardownData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      {/* 
        1. The Hook / Teardown Section (Dark Bento Style)
      */}
      <TeardownHero 
        companyName={data.company_name}
        founderName={data.founder_name}
        hook={data.hook}
        frictionPoints={data.friction_points}
        architectureHypothesis={data.architecture_hypothesis}
      />

      {/* 
        2. The Dynamic Proof of Work Section 
      */}
      <PoWClusterSelect cluster={data.pow_cluster} />
    </main>
  );
}


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
  } catch (error) {
    console.error(`Failed to load teardown data for ${slug}:`, error);
    return null;
  }
}

export default async function StartupTeardownPage({ params }: { params: { slug: string } }) {
  const data = await getTeardownData(params.slug);

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

// Generate static params for existing JSON files during build time
export async function generateStaticParams() {
  try {
    const dirPath = path.join(process.cwd(), 'src', 'content', 'startups');
    if (!fs.existsSync(dirPath)) return [];
    
    const files = fs.readdirSync(dirPath);
    return files
      .filter((file) => file.endsWith('.json'))
      .map((file) => ({
        slug: file.replace('.json', ''),
      }));
  } catch (e) {
    return [];
  }
}

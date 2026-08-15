import { getAllWikiEntries, getKnowledgeGraphData } from "@/lib/wiki";
import { WikiExplorer } from "@/components/wiki/wiki-explorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wiki & Knowledge Base | Alimzhan Khalelov",
  description: "Deterministic knowledge base covering Fan-Filter-Scale, Loop Engineering, GraphRAG, Project Telos, and Autonomous Systems.",
};

export default function WikiPage() {
  const entries = getAllWikiEntries();
  const graphData = getKnowledgeGraphData();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-12 w-full">
      <WikiExplorer entries={entries} graphData={graphData} />
    </main>
  );
}

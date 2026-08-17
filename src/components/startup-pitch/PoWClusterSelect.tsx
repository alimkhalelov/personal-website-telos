import React from 'react';
import { Layout, Cpu, Users } from 'lucide-react';

interface PoWClusterSelectProps {
  cluster: string;
}

export default function PoWClusterSelect({ cluster }: PoWClusterSelectProps) {
  // Cluster 1: Consumer AI & UGC Gaming
  const renderCluster1 = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-zinc-100 flex items-center space-x-3">
          <Users className="text-cyan-400" />
          <span>Consumer AI & UGC Growth</span>
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed">
          I build products that hook everyday users. My core competency lies in reducing time-to-value, managing onboarding friction, and scaling UGC economies.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
          <h3 className="text-zinc-200 font-medium mb-2">AI Quest Generator</h3>
          <p className="text-sm text-zinc-500 mb-4">A dynamic narrative engine that increased Day 7 retention by 22% via personalized lore hooks.</p>
          <a href="#" className="text-cyan-400 text-xs font-mono uppercase hover:underline">View Case Study →</a>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
          <h3 className="text-zinc-200 font-medium mb-2">Creator Onboarding Flow</h3>
          <p className="text-sm text-zinc-500 mb-4">Redesigned the creator studio tools, cutting activation time from 40 mins to 12 mins.</p>
          <a href="#" className="text-cyan-400 text-xs font-mono uppercase hover:underline">View Spec →</a>
        </div>
      </div>
    </div>
  );

  // Cluster 2: Agent Infrastructure
  const renderCluster2 = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-zinc-100 flex items-center space-x-3">
          <Cpu className="text-cyan-400" />
          <span>Agent Infra & LLM Evaluation</span>
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed">
          I understand the under-the-hood architecture of agentic loops. From memory orchestration to RAG latency trade-offs and LLM-as-a-judge pipelines.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
          <h3 className="text-zinc-200 font-medium mb-2">Local Agent Workspace</h3>
          <p className="text-sm text-zinc-500 mb-4">Built a secure, sandboxed multi-agent evaluation harness for testing prompt resilience.</p>
          <a href="#" className="text-cyan-400 text-xs font-mono uppercase hover:underline">View Architecture →</a>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
          <h3 className="text-zinc-200 font-medium mb-2">LLM Routing Engine</h3>
          <p className="text-sm text-zinc-500 mb-4">Reduced token costs by 45% by routing simple queries to Llama 3 8B and complex reasoning to Claude 3.5.</p>
          <a href="#" className="text-cyan-400 text-xs font-mono uppercase hover:underline">View Repo →</a>
        </div>
      </div>
    </div>
  );

  // Cluster 3: Venture Studios
  const renderCluster3 = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-medium text-zinc-100 flex items-center space-x-3">
          <Layout className="text-cyan-400" />
          <span>0→1 PMF Validation Engine</span>
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed">
          I am a 0→1 Product Builder. I take abstract ideas, ship prototypes in a weekend, measure unit economics, and validate hypotheses before burning runway.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
          <h3 className="text-zinc-200 font-medium mb-2">Zero-Code PMF Validation</h3>
          <p className="text-sm text-zinc-500 mb-4">Launched 4 landing pages with fake-door testing to validate a B2B SaaS idea, generating $12k in presales.</p>
          <a href="#" className="text-cyan-400 text-xs font-mono uppercase hover:underline">View Process →</a>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-colors">
          <h3 className="text-zinc-200 font-medium mb-2">Weekend MVP Framework</h3>
          <p className="text-sm text-zinc-500 mb-4">My personal Next.js + Supabase template optimized for shipping AI tools in 48 hours.</p>
          <a href="#" className="text-cyan-400 text-xs font-mono uppercase hover:underline">View Stack →</a>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-black text-zinc-50 py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-12">
          <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Proof of Work</h4>
          <div className="h-px w-16 bg-zinc-800" />
        </div>
        
        {cluster.includes('Cluster 1') ? renderCluster1() : 
         cluster.includes('Cluster 2') ? renderCluster2() : 
         renderCluster3()}
         
         <div className="mt-16 pt-8 border-t border-zinc-900 flex justify-between items-center">
            <p className="text-zinc-500 text-sm">Alim Khalelov — Senior Product Builder</p>
            <a href="mailto:alim.khalelov@gmail.com" className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors">
              Let's Talk
            </a>
         </div>
      </div>
    </section>
  );
}

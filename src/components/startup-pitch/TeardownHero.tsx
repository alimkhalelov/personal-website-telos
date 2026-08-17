import React from 'react';
import { Terminal, Activity, ArrowRight, Zap, Target } from 'lucide-react';

interface FrictionPoint {
  title: string;
  description: string;
}

interface TeardownHeroProps {
  companyName: string;
  founderName: string;
  hook: string;
  frictionPoints: FrictionPoint[];
  architectureHypothesis: string;
}

export default function TeardownHero({ 
  companyName, 
  founderName, 
  hook, 
  frictionPoints, 
  architectureHypothesis 
}: TeardownHeroProps) {
  return (
    <section className="w-full min-h-[80vh] flex flex-col justify-center bg-zinc-950 text-zinc-50 py-24 px-6 md:px-12 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        
        {/* Header Label */}
        <div className="flex items-center space-x-3 text-sm font-mono text-cyan-400">
          <Terminal size={16} />
          <span>PRODUCT_TEARDOWN // {companyName.toUpperCase()}</span>
        </div>

        {/* The Hook */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-100">
            Hey {founderName},
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
            {hook}
          </p>
        </div>

        {/* Bento Grid: Friction & Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8">
          
          {/* Friction Points Card */}
          <div className="md:col-span-7 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
              <Activity className="text-rose-400" size={20} />
              <h3 className="text-lg font-medium text-zinc-200">Friction Points Detected</h3>
            </div>
            
            <ul className="space-y-6">
              {frictionPoints.map((point, idx) => (
                <li key={idx} className="space-y-2">
                  <h4 className="text-zinc-300 font-medium flex items-center space-x-2">
                    <Target size={14} className="text-zinc-500" />
                    <span>{point.title}</span>
                  </h4>
                  <p className="text-sm text-zinc-500 leading-relaxed pl-6">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Hypothesis Card */}
          <div className="md:col-span-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6 flex flex-col">
            <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
              <Zap className="text-cyan-400" size={20} />
              <h3 className="text-lg font-medium text-zinc-200">System Hypothesis</h3>
            </div>
            
            <p className="text-sm text-zinc-400 leading-relaxed flex-grow">
              {architectureHypothesis}
            </p>
            
            <div className="pt-6 mt-auto border-t border-zinc-800/50">
              <button className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-2">
                <span>VIEW_FULL_SPEC</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

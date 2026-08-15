import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function PetProjectsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 sm:py-32 flex flex-col gap-16 w-full">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Headquarters
        </Link>
        <Link href="/wiki" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
          Wiki & Knowledge Base
        </Link>
      </div>

      {/* Pet-Projects Labs Section */}
      <section className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center justify-between border-b border-border pb-6 relative">
          <h1 className="text-4xl font-bold tracking-tight">Pet-Projects Labs</h1>
        </div>

        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
          A gallery of AI-driven lab projects, prototypes, and autonomous agents in the making.
        </p>

        {/* Featured App */}
        <div className="w-full aspect-[21/9] sm:aspect-[21/9] bg-muted/20 border border-border rounded-2xl overflow-hidden relative group cursor-pointer hover:border-accent transition-colors flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <p className="text-muted-foreground z-20 font-mono text-sm tracking-widest uppercase">Featured Project Image</p>
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">Project Telos</h3>
            <p className="text-muted-foreground">The autonomous OS for demiurges.</p>
          </div>
        </div>

        {/* Grid 3-in-a-row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-muted/10 border border-border rounded-xl flex items-center justify-center hover:border-accent hover:bg-muted/20 transition-all cursor-pointer group flex-col p-6 text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h4 className="font-medium group-hover:text-accent transition-colors">Experiment {i}</h4>
                <p className="text-sm text-muted-foreground mt-1">AI driven lab project.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

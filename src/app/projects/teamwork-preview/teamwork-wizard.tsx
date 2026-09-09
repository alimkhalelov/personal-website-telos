"use client";

import React, { useState } from "react";
import { Check, Copy, Sparkles, Users, ShieldCheck, Terminal, ArrowRight, Play, RefreshCw, Cpu } from "lucide-react";

interface TeamworkConfig {
  goal: string;
  scopeType: "build" | "single-fix" | "proof" | "review";
  teamScale: "standard" | "small-focused" | "very-large-proof";
  integrityMode: "development" | "demo" | "benchmark";
  verificationType: "programmatic" | "agent-judge" | "both";
  workingDir: string;
}

export function TeamworkWizard() {
  const [config, setConfig] = useState<TeamworkConfig>({
    goal: "Build an autonomous code audit engine with automated test synthesis",
    scopeType: "build",
    teamScale: "standard",
    integrityMode: "development",
    verificationType: "programmatic",
    workingDir: "~/teamwork_projects/audit_engine",
  });

  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedState, setSimulatedState] = useState<"idle" | "routing" | "delegated">("idle");

  // Determine the routed team topology based on the prompt crafting principles
  const getRoutedTeam = () => {
    if (config.scopeType === "review") return { name: "Document Review Team", desc: "Specialized reviewers evaluating document fidelity and citations", count: "3-5 agents" };
    if (config.scopeType === "proof") {
      if (config.teamScale === "very-large-proof") {
        return { name: "Very Large Proof Swarm", desc: "Massive parallel exploration pipeline with concurrent solvers", count: "100+ agents" };
      }
      return { name: "Standard Proof Pipeline", desc: "Formal verification and math conjecture proving pipeline", count: "8-12 agents" };
    }
    if (config.teamScale === "small-focused" || config.scopeType === "single-fix") {
      return { name: "Small Focused Team", desc: "One primary implementer paired with repeated adversarial reviewers", count: "2 agents (1+1)" };
    }
    return { name: "Full Swarm Team", desc: "Autonomous multi-disciplinary team: Architect, Implementer, Auditor, QA", count: "12-24 agents" };
  };

  const routedTeam = getRoutedTeam();

  // Generate the canonical prompt draft
  const generatePrompt = () => {
    const scaleDirective =
      config.teamScale === "very-large-proof"
        ? "Use a very large team of agents.\n"
        : config.teamScale === "small-focused" || config.scopeType === "single-fix"
        ? "This is a single self-contained fix; keep it small and focused.\n"
        : "";

    return `${scaleDirective}${config.goal.trim()}

Working directory: ${config.workingDir}
Integrity mode: ${config.integrityMode}

## Requirements

### R1. Primary Deliverable
Implement the complete core functionality meeting all architectural invariants without premature constraints on file layout or algorithms.

### R2. Verification Engine
${
  config.verificationType === "programmatic"
    ? "All critical paths must have automated programmatic test suites and reference assertions."
    : config.verificationType === "agent-judge"
    ? "Every completed module must be audited by an independent adversarial reviewer rubric."
    : "Dual verification: programmatic automated test coverage + adversarial agent-as-judge rubric."
}

## Acceptance Criteria

### Objective Verification Guardrails
- [ ] Automated verification script exits with zero errors (hardened forcing function)
- [ ] No self-certification by implementing agents without objective verification proof
- [ ] Working directory contains all runnable artifacts and documentation
`;
  };

  const promptText = generatePrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulatedState("routing");
    setTimeout(() => {
      setSimulatedState("delegated");
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 w-full rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Interactive Teamwork Wizard &amp; Swarm Router
            </h3>
            <p className="text-sm text-muted-foreground">
              9-step requirement elicitation, objective forcing functions &amp; dynamic swarm topology selection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium border border-border hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors text-foreground cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied Prompt!" : "Copy Prompt Draft"}
          </button>
        </div>
      </div>

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Form Controls */}
        <div className="flex flex-col gap-4">
          {/* Step 1: Goal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
              <span className="text-emerald-400">01.</span> Task Objective (What, Not How)
            </label>
            <input
              type="text"
              value={config.goal}
              onChange={(e) => setConfig({ ...config, goal: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-muted/20 text-foreground text-sm font-medium focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
              placeholder="e.g. Build an autonomous code audit engine"
            />
          </div>

          {/* Step 2: Task Scope & Opt-In Scale */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
                <span className="text-emerald-400">02.</span> Scope Shape
              </label>
              <select
                value={config.scopeType}
                onChange={(e) => {
                  const scope = e.target.value as TeamworkConfig["scopeType"];
                  setConfig({
                    ...config,
                    scopeType: scope,
                    teamScale: scope === "single-fix" ? "small-focused" : scope === "proof" ? "very-large-proof" : "standard",
                  });
                }}
                className="w-full px-3 py-2 rounded-xl border border-border/80 bg-muted/20 text-foreground text-sm font-medium focus:outline-none focus:border-emerald-500/60"
              >
                <option value="build">Full Product Build</option>
                <option value="single-fix">Single Contained Fix</option>
                <option value="proof">Mathematical Proof</option>
                <option value="review">Document Review</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
                <span className="text-emerald-400">03.</span> Team Scale
              </label>
              <select
                value={config.teamScale}
                onChange={(e) => setConfig({ ...config, teamScale: e.target.value as TeamworkConfig["teamScale"] })}
                className="w-full px-3 py-2 rounded-xl border border-border/80 bg-muted/20 text-foreground text-sm font-medium focus:outline-none focus:border-emerald-500/60"
              >
                <option value="standard">Standard Team Route</option>
                <option value="small-focused">Small Focused (1+1 Adversarial)</option>
                <option value="very-large-proof">Massive Swarm (100+ Agents)</option>
              </select>
            </div>
          </div>

          {/* Step 3: Integrity Mode & Verification */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
                <span className="text-emerald-400">04.</span> Integrity Mode
              </label>
              <select
                value={config.integrityMode}
                onChange={(e) => setConfig({ ...config, integrityMode: e.target.value as TeamworkConfig["integrityMode"] })}
                className="w-full px-3 py-2 rounded-xl border border-border/80 bg-muted/20 text-foreground text-sm font-medium focus:outline-none focus:border-emerald-500/60"
              >
                <option value="development">development (standard)</option>
                <option value="demo">demo (rapid showcase)</option>
                <option value="benchmark">benchmark (strict rigor)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
                <span className="text-emerald-400">05.</span> Forcing Function
              </label>
              <select
                value={config.verificationType}
                onChange={(e) => setConfig({ ...config, verificationType: e.target.value as TeamworkConfig["verificationType"] })}
                className="w-full px-3 py-2 rounded-xl border border-border/80 bg-muted/20 text-foreground text-sm font-medium focus:outline-none focus:border-emerald-500/60"
              >
                <option value="programmatic">Programmatic Tests</option>
                <option value="agent-judge">Agent-as-Judge Rubric</option>
                <option value="both">Dual (Programmatic + Judge)</option>
              </select>
            </div>
          </div>

          {/* Working Directory */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-muted-foreground flex items-center gap-1.5">
              <span className="text-emerald-400">06.</span> Working Directory
            </label>
            <input
              type="text"
              value={config.workingDir}
              onChange={(e) => setConfig({ ...config, workingDir: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-muted/20 text-foreground text-xs font-mono focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          {/* Simulation Action Trigger */}
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer shadow-md disabled:opacity-50"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing Prompt &amp; Routing Swarm...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Simulate Swarm Delegation via invoke_subagent
              </>
            )}
          </button>
        </div>

        {/* Right Column: Live Swarm Topology & Prompt Artifact */}
        <div className="flex flex-col gap-4">
          {/* Dynamic Swarm Topology Card */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col gap-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Dynamic Team Routing Resolution
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {routedTeam.count}
              </span>
            </div>

            <div className="text-lg font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              {routedTeam.name}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {routedTeam.desc}
            </p>

            {simulatedState === "delegated" && (
              <div className="mt-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>invoke_subagent</strong>(TypeName=&quot;teamwork_preview&quot;) dispatched successfully!
                </span>
              </div>
            )}
          </div>

          {/* Live Artifact Terminal Preview */}
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Live Generated prompt_draft.md
              </span>
              <span className="text-[11px] text-emerald-400/80">Step 9 / Ready</span>
            </div>

            <div className="w-full h-[220px] overflow-y-auto p-3.5 rounded-xl border border-border/80 bg-[#080b0f] text-emerald-300 font-mono text-xs leading-relaxed whitespace-pre-wrap select-all">
              {promptText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

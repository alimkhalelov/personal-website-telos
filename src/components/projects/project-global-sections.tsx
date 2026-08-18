"use client";

import { useState } from "react";
import { 
  Check, 
  Layers, 
  ShieldCheck, 
  GitBranch, 
  Workflow, 
  Binary, 
  Cpu
} from "lucide-react";
import type { ProjectDetail } from "@/lib/projects-data";
import { AICopyButton } from "./ai-copy-button";
import { SkillVisualizerCanvas } from "./skill-visualizer-canvas";
import { 
  generateSpecsPrompt, 
  generatePlanPrompt, 
  generateBuildPrompt, 
  generateTestsPrompt 
} from "@/lib/projects-ai-prompts";

interface ProjectGlobalSectionsProps {
  project: ProjectDetail;
}

export function ProjectGlobalSections({ project }: ProjectGlobalSectionsProps) {
  // Interactive checked state for build and test checklists
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Calculate task completion metrics
  const totalBuildTasks = project.buildChecklist.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedBuildTasks = project.buildChecklist.reduce(
    (acc, p, pIdx) =>
      acc + p.tasks.filter((_, tIdx) => !!checkedItems[`build-${pIdx}-${tIdx}`]).length,
    0
  );

  const totalTests = project.testChecklist.reduce((acc, s) => acc + s.tests.length, 0);
  const completedTests = project.testChecklist.reduce(
    (acc, s, sIdx) =>
      acc + s.tests.filter((_, tIdx) => !!checkedItems[`test-${sIdx}-${tIdx}`]).length,
    0
  );

  return (
    <div className="flex flex-col gap-14 w-full">
      {/* ========================================================= */}
      {/* 1. GLOBAL SECTION: SPECS (System Architecture & Contracts) */}
      {/* ========================================================= */}
      <section id="specs" className="flex flex-col gap-6 pt-6 border-t border-border">
        {/* Section Header with 1-Click AI Copy Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent tracking-wider uppercase">
                Section 01
              </span>
              <span className="text-xs font-mono text-muted-foreground">/</span>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Architecture Spec
              </span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Specs
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Formal system boundaries, invariants, input/output contracts, and vector workflow.
            </p>
          </div>

          <AICopyButton
            textToCopy={generateSpecsPrompt(project)}
            label="Copy Specs for AI Agent"
            copiedLabel="Copied Specs Prompt!"
          />
        </div>

        {/* 16:9 Architecture Vector Map with Fullscreen Modal */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-accent" />
              <span>Vector Architecture Map</span>
            </div>
            <span className="opacity-70">16:9 Canvas · Click to expand</span>
          </div>

          <SkillVisualizerCanvas
            heroTitle={project.visualizer.heroTitle}
            subNamespace={project.visualizer.subNamespace}
            nodes={project.visualizer.nodes}
          />
        </div>

        {/* Inputs & Guaranteed Outputs Contracts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Inputs Contract */}
          <div className="p-5 rounded-2xl bg-card border border-border/80 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                What Goes In (Inputs)
              </span>
              <Binary className="w-4 h-4 text-accent" />
            </div>
            <ul className="space-y-2.5 text-base text-foreground/90 leading-relaxed font-light">
              {project.specSDD.inputs.map((inp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  <span>{inp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Guaranteed Outputs Contract */}
          <div className="p-5 rounded-2xl bg-card border border-border/80 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                What You Get (Guaranteed Outputs)
              </span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <ul className="space-y-2.5 text-base text-foreground/90 leading-relaxed font-light">
              {project.specSDD.outputs.map((out, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Architectural Invariants & Guarantees */}
        <div className="flex flex-col gap-3 pt-2">
          <h3 
            className="text-lg font-bold text-foreground flex items-center gap-2"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            <span>Core Principles &amp; Invariants</span>
          </h3>
          <div className="flex flex-col gap-2.5">
            {project.specSDD.invariants.map((inv, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-muted/10 border border-border/70 flex items-start gap-3.5 text-base text-foreground/90 leading-relaxed font-light"
              >
                <div className="w-5 h-5 rounded-md border border-accent/40 bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{inv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Structures */}
        {project.specSDD.dataStructures && project.specSDD.dataStructures.length > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <h3 
              className="text-lg font-bold text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Data Models &amp; Contracts
            </h3>
            <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col gap-2 font-mono text-xs text-foreground/80 shadow-sm">
              {project.specSDD.dataStructures.map((ds, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-accent font-bold">#</span>
                  <code>{ds}</code>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 2. GLOBAL SECTION: PLAN (Execution Strategy & Lifecycle)  */}
      {/* ========================================================= */}
      <section id="plan" className="flex flex-col gap-6 pt-6 border-t border-border">
        {/* Section Header with 1-Click AI Copy Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent tracking-wider uppercase">
                Section 02
              </span>
              <span className="text-xs font-mono text-muted-foreground">/</span>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Execution Strategy
              </span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Plan
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Step-by-step engineering roadmap, state machine transitions, and dependency order.
            </p>
          </div>

          <AICopyButton
            textToCopy={generatePlanPrompt(project)}
            label="Copy Plan for AI Agent"
            copiedLabel="Copied Plan Prompt!"
          />
        </div>

        {/* Engine Overview */}
        <div className="p-5 rounded-2xl bg-muted/10 border border-border/80 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-accent">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Engine Blueprint</span>
          </div>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
            {project.overview}
          </p>
        </div>

        {/* State Machine / Workflow Lifecycle */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 
              className="text-lg font-bold text-foreground flex items-center gap-2"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              <GitBranch className="w-4 h-4 text-accent" />
              <span>Workflow State Machine</span>
            </h3>
            <span className="text-xs font-mono text-muted-foreground">
              {project.specSDD.stateMachine.length} Transition Stages
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 flex flex-col gap-2.5 font-mono text-xs sm:text-sm text-foreground/90 shadow-sm">
            {project.specSDD.stateMachine.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-accent font-bold opacity-80">STAGE {idx + 1}</span>
                <span className="text-muted-foreground opacity-60">→</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phased Roadmap Sequence */}
        <div className="flex flex-col gap-3 pt-2">
          <h3 
            className="text-lg font-bold text-foreground"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            Phased Implementation Milestones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.buildChecklist.map((phase, pIdx) => (
              <div 
                key={pIdx}
                className="p-4 rounded-xl bg-card border border-border/70 flex flex-col gap-2 shadow-sm"
              >
                <span className="text-xs font-mono font-bold text-accent">
                  PHASE 0{pIdx + 1}
                </span>
                <h4 
                  className="text-sm font-semibold text-foreground line-clamp-2"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  {phase.phase.replace(/^Phase \d+:\s*/, "")}
                </h4>
                <span className="text-xs font-mono text-muted-foreground mt-auto">
                  {phase.tasks.length} sub-tasks
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. GLOBAL SECTION: BUILD (Executable Tasks & Checklist)    */}
      {/* ========================================================= */}
      <section id="build" className="flex flex-col gap-6 pt-6 border-t border-border">
        {/* Section Header with 1-Click AI Copy Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent tracking-wider uppercase">
                Section 03
              </span>
              <span className="text-xs font-mono text-muted-foreground">/</span>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Task Execution
              </span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Build
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Interactive task checklist. Click items to track your real-time build progress.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <span className="font-bold text-foreground">{completedBuildTasks}</span>
              <span>/</span>
              <span>{totalBuildTasks} completed</span>
            </div>

            <AICopyButton
              textToCopy={generateBuildPrompt(project)}
              label="Copy Build Checklist for AI Agent"
              copiedLabel="Copied Build Checklist!"
            />
          </div>
        </div>

        {/* Phased Checklist Containers */}
        <div className="flex flex-col gap-4">
          {project.buildChecklist.map((phase, pIdx) => (
            <div key={pIdx} className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col gap-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{phase.phase}</span>
                </h4>
                <span className="text-xs font-mono text-muted-foreground">
                  {phase.tasks.filter((_, tIdx) => !!checkedItems[`build-${pIdx}-${tIdx}`]).length} / {phase.tasks.length}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {phase.tasks.map((task, tIdx) => {
                  const itemKey = `build-${pIdx}-${tIdx}`;
                  const isChecked = !!checkedItems[itemKey];

                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => toggleItem(itemKey)}
                      className="group flex items-start gap-3.5 text-left text-base text-foreground/90 leading-relaxed font-light hover:text-foreground transition-colors cursor-pointer select-none"
                    >
                      {/* Square Checkbox (Empty by default, turns green on check) */}
                      <div 
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                          isChecked 
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" 
                            : "border-border/90 bg-muted/10 group-hover:border-accent/60"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={isChecked ? "line-through text-muted-foreground transition-colors" : ""}>
                        {task.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GLOBAL SECTION: TESTS (Verification & Quality Gates)   */}
      {/* ========================================================= */}
      <section id="tests" className="flex flex-col gap-6 pt-6 border-t border-border">
        {/* Section Header with 1-Click AI Copy Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent tracking-wider uppercase">
                Section 04
              </span>
              <span className="text-xs font-mono text-muted-foreground">/</span>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Quality Verification
              </span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Tests
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Verification suites, automated assertions, and definition-of-done criteria.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <span className="font-bold text-foreground">{completedTests}</span>
              <span>/</span>
              <span>{totalTests} verified</span>
            </div>

            <AICopyButton
              textToCopy={generateTestsPrompt(project)}
              label="Copy Tests for AI Agent"
              copiedLabel="Copied Tests Prompt!"
            />
          </div>
        </div>

        {/* Verification Test Suites */}
        <div className="flex flex-col gap-4">
          {project.testChecklist.map((suite, sIdx) => (
            <div key={sIdx} className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col gap-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>Suite: {suite.suite}</span>
                </h4>
                <span className="text-xs font-mono text-muted-foreground">
                  {suite.tests.filter((_, tIdx) => !!checkedItems[`test-${sIdx}-${tIdx}`]).length} / {suite.tests.length} passed
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {suite.tests.map((t, tIdx) => {
                  const itemKey = `test-${sIdx}-${tIdx}`;
                  const isChecked = !!checkedItems[itemKey];

                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => toggleItem(itemKey)}
                      className="group flex flex-col gap-1.5 text-left text-base cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3.5 text-foreground/90 font-medium hover:text-foreground transition-colors">
                        {/* Square Checkbox */}
                        <div 
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                            isChecked 
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" 
                            : "border-border/90 bg-muted/10 group-hover:border-accent/60"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className={isChecked ? "line-through text-muted-foreground transition-colors" : ""}>
                          {t.label}
                        </span>
                      </div>
                      <code className="text-xs font-mono text-muted-foreground ml-8 pl-0.5 opacity-80">
                        {t.assertion}
                      </code>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

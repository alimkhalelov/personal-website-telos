"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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

  return (
    <div className="flex flex-col gap-16 w-full">
      {/* ========================================================= */}
      {/* 1. GLOBAL SECTION: SPECS                                  */}
      {/* ========================================================= */}
      <section id="specs" className="flex flex-col gap-8 pt-8 border-t border-border">
        {/* Section Header: Title + Minimal Icon Copy Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-mono font-bold text-accent tracking-wider uppercase">
              01 · SPECS
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Specifications &amp; Architecture
            </h2>
          </div>

          <AICopyButton
            textToCopy={generateSpecsPrompt(project)}
            title="Copy Specs for AI Agent"
          />
        </div>

        {/* 16:9 Vector Architecture Map */}
        <div className="flex flex-col gap-3 w-full">
          <SkillVisualizerCanvas
            subNamespace={project.visualizer.subNamespace}
            nodes={project.visualizer.nodes}
          />
        </div>

        {/* Single Column: What Goes In (Inputs) */}
        <div className="flex flex-col gap-3.5 p-7 rounded-2xl bg-card border border-border/80 shadow-sm">
          <span className="text-sm font-mono font-bold uppercase tracking-wider text-accent">
            What Goes In (Inputs)
          </span>
          <ul className="space-y-3 text-lg sm:text-xl text-foreground/90 leading-relaxed font-light">
            {project.specSDD.inputs.map((inp, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent font-bold mt-0.5">→</span>
                <span>{inp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Single Column: What You Get (Guaranteed Outputs) */}
        <div className="flex flex-col gap-3.5 p-7 rounded-2xl bg-card border border-border/80 shadow-sm">
          <span className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400">
            What You Get (Guaranteed Outputs)
          </span>
          <ul className="space-y-3 text-lg sm:text-xl text-foreground/90 leading-relaxed font-light">
            {project.specSDD.outputs.map((out, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <span>{out}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Single Column: Core Principles & Invariants */}
        <div className="flex flex-col gap-4">
          <h3 
            className="text-2xl sm:text-3xl font-bold text-foreground"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            Core Principles
          </h3>
          <div className="flex flex-col gap-3">
            {project.specSDD.invariants.map((inv, i) => (
              <div 
                key={i} 
                className="p-5 rounded-2xl bg-muted/10 border border-border/70 flex items-start gap-4 text-lg sm:text-xl text-foreground/90 leading-relaxed font-light"
              >
                <div className="w-6 h-6 rounded-md border border-accent/40 bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>{inv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Single Column: Data Models */}
        {project.specSDD.dataStructures && project.specSDD.dataStructures.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 
              className="text-2xl sm:text-3xl font-bold text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Data Models
            </h3>
            <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col gap-3 font-mono text-sm sm:text-base text-foreground/80 shadow-sm">
              {project.specSDD.dataStructures.map((ds, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-accent font-bold">#</span>
                  <code>{ds}</code>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 2. GLOBAL SECTION: PLAN                                   */}
      {/* ========================================================= */}
      <section id="plan" className="flex flex-col gap-8 pt-8 border-t border-border">
        {/* Section Header: Title + Minimal Icon Copy Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-mono font-bold text-accent tracking-wider uppercase">
              02 · PLAN
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Implementation Plan
            </h2>
          </div>

          <AICopyButton
            textToCopy={generatePlanPrompt(project)}
            title="Copy Plan for AI Agent"
          />
        </div>

        {/* Engine Overview */}
        <div className="p-7 rounded-2xl bg-muted/10 border border-border/80 flex flex-col gap-3">
          <span className="text-sm font-mono font-bold uppercase tracking-wider text-accent">
            Core Engine Overview
          </span>
          <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-light">
            {project.overview}
          </p>
        </div>

        {/* Single Column: Workflow State Machine */}
        <div className="flex flex-col gap-4">
          <h3 
            className="text-2xl sm:text-3xl font-bold text-foreground"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            Lifecycle State Machine
          </h3>

          <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col gap-3.5 font-mono text-base text-foreground/90 shadow-sm">
            {project.specSDD.stateMachine.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-accent font-bold">0{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Single Column: Implementation Phases */}
        <div className="flex flex-col gap-4">
          <h3 
            className="text-2xl sm:text-3xl font-bold text-foreground"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            Engineering Phases
          </h3>
          <div className="flex flex-col gap-3.5">
            {project.buildChecklist.map((phase, pIdx) => (
              <div 
                key={pIdx}
                className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col gap-2 shadow-sm"
              >
                <span className="text-xs font-mono font-bold text-accent">
                  PHASE 0{pIdx + 1}
                </span>
                <h4 
                  className="text-lg sm:text-xl font-bold text-foreground"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  {phase.phase.replace(/^Phase \d+:\s*/, "")}
                </h4>
                <p className="text-base text-muted-foreground font-light">
                  {phase.tasks.length} core deliverables
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. GLOBAL SECTION: BUILD                                  */}
      {/* ========================================================= */}
      <section id="build" className="flex flex-col gap-8 pt-8 border-t border-border">
        {/* Section Header: Title + Minimal Icon Copy Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-mono font-bold text-accent tracking-wider uppercase">
              03 · BUILD
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Build Checklist
            </h2>
          </div>

          <AICopyButton
            textToCopy={generateBuildPrompt(project)}
            title="Copy Build Checklist for AI Agent"
          />
        </div>

        {/* Single Column Phased Checklist */}
        <div className="flex flex-col gap-5">
          {project.buildChecklist.map((phase, pIdx) => (
            <div key={pIdx} className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 flex flex-col gap-4 shadow-sm">
              <div className="border-b border-border/60 pb-3">
                <h4 
                  className="text-xl sm:text-2xl font-bold text-foreground"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  {phase.phase}
                </h4>
              </div>

              <div className="flex flex-col gap-3">
                {phase.tasks.map((task, tIdx) => {
                  const itemKey = `build-${pIdx}-${tIdx}`;
                  const isChecked = !!checkedItems[itemKey];

                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => toggleItem(itemKey)}
                      className="group flex items-start gap-4 text-left text-lg sm:text-xl text-foreground/90 leading-relaxed font-light hover:text-foreground transition-colors cursor-pointer select-none"
                    >
                      {/* Large Square Checkbox */}
                      <div 
                        className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-1 transition-all duration-200 ${
                          isChecked 
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" 
                            : "border-border/90 bg-muted/10 group-hover:border-accent/60"
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
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
      {/* 4. GLOBAL SECTION: TESTS                                  */}
      {/* ========================================================= */}
      <section id="tests" className="flex flex-col gap-8 pt-8 border-t border-border">
        {/* Section Header: Title + Minimal Icon Copy Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-mono font-bold text-accent tracking-wider uppercase">
              04 · TESTS
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Test Verification
            </h2>
          </div>

          <AICopyButton
            textToCopy={generateTestsPrompt(project)}
            title="Copy Tests for AI Agent"
          />
        </div>

        {/* Single Column Verification Test Suites */}
        <div className="flex flex-col gap-5">
          {project.testChecklist.map((suite, sIdx) => (
            <div key={sIdx} className="p-6 sm:p-7 rounded-2xl bg-card border border-border/80 flex flex-col gap-4 shadow-sm">
              <div className="border-b border-border/60 pb-3">
                <h4 
                  className="text-xl sm:text-2xl font-bold text-foreground"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  Suite: {suite.suite}
                </h4>
              </div>

              <div className="flex flex-col gap-4">
                {suite.tests.map((t, tIdx) => {
                  const itemKey = `test-${sIdx}-${tIdx}`;
                  const isChecked = !!checkedItems[itemKey];

                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => toggleItem(itemKey)}
                      className="group flex flex-col gap-2 text-left cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-4 text-foreground/90 text-lg sm:text-xl font-medium hover:text-foreground transition-colors">
                        {/* Large Square Checkbox */}
                        <div 
                          className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-1 transition-all duration-200 ${
                            isChecked 
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" 
                              : "border-border/90 bg-muted/10 group-hover:border-accent/60"
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <span className={isChecked ? "line-through text-muted-foreground transition-colors" : ""}>
                          {t.label}
                        </span>
                      </div>
                      <code className="text-sm font-mono text-muted-foreground ml-10 pl-0.5 opacity-80">
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

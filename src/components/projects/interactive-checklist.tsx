"use client";

import { useState } from "react";
import { Check, Layers, ShieldCheck } from "lucide-react";
import type { ChecklistPhase, TestSuite } from "@/lib/projects-data";

interface InteractiveChecklistProps {
  buildChecklist: ChecklistPhase[];
  testChecklist: TestSuite[];
}

export function InteractiveChecklist({
  buildChecklist,
  testChecklist,
}: InteractiveChecklistProps) {
  // Store checked state by unique key: "build-pIdx-tIdx" or "test-sIdx-tIdx"
  // Default is empty (false) as requested by user
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="flex flex-col gap-10 pt-4 border-t border-border">
      <div className="flex flex-col gap-2">
        <h2 
          className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          Implementation &amp; Quality Verification
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed font-light">
          Interactive execution playbook. Click any milestone or test suite to track progress.
        </p>
      </div>

      {/* 1. Build Phases */}
      <div className="flex flex-col gap-6">
        <h3 
          className="text-xl font-bold text-foreground flex items-center gap-2"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          <Layers className="w-5 h-5 text-accent" />
          <span>Build Phases</span>
        </h3>

        <div className="flex flex-col gap-5">
          {buildChecklist.map((phase, pIdx) => (
            <div key={pIdx} className="p-5 sm:p-6 rounded-2xl bg-card border border-border/70 flex flex-col gap-4 shadow-sm">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-accent">
                {phase.phase}
              </h4>
              <div className="flex flex-col gap-3">
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
                      {/* Square Checkbox (Empty by default, checked on click) */}
                      <div 
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                          isChecked 
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" 
                            : "border-border/80 bg-muted/20 group-hover:border-accent/60"
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
      </div>

      {/* 2. Automated Test Verification Suites */}
      <div className="flex flex-col gap-6">
        <h3 
          className="text-xl font-bold text-foreground flex items-center gap-2"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          <span>Test-Driven Verification Suites</span>
        </h3>

        <div className="flex flex-col gap-5">
          {testChecklist.map((suite, sIdx) => (
            <div key={sIdx} className="p-5 sm:p-6 rounded-2xl bg-card border border-border/70 flex flex-col gap-4 shadow-sm">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-purple-400">
                {suite.suite}
              </h4>
              <div className="flex flex-col gap-3.5">
                {suite.tests.map((t, tIdx) => {
                  const itemKey = `test-${sIdx}-${tIdx}`;
                  const isChecked = !!checkedItems[itemKey];

                  return (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => toggleItem(itemKey)}
                      className="group flex flex-col gap-1 text-left text-base cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3.5 text-foreground/90 font-medium hover:text-foreground transition-colors">
                        {/* Square Checkbox */}
                        <div 
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                            isChecked 
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" 
                              : "border-border/80 bg-muted/20 group-hover:border-purple-400/60"
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
      </div>
    </section>
  );
}

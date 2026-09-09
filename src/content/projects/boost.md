---
title: "/boost — Cognitive Booster & Dual-Subagent Orchestrator"
category: "System"
section: "projects"
date: "2026-09-09"
description: "Master ReAct cognitive orchestration protocol routing between Solo and Delegation routines, deploying DeepCoder & DeepInvestigator with verbatim intent preservation and adversarial verification."
tags: ["Cognitive Boost", "Master Orchestrator", "DeepCoder", "DeepInvestigator", "Verbatim Intent", "ReAct Loop", "Prompt Defense"]
---

# /boost — Cognitive Booster & Dual-Subagent Orchestrator

The **`/boost`** slash command and master orchestrator activates a high-leverage cognitive routing protocol designed for complex coding, architectural refactoring, and deep root-cause debugging. It enforces strict division of labor between direct execution and specialized subagent delegation.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ /boost Ingestion & Routine Classification Gate                              │
│                                                                             │
│                  ┌──────────────────┴──────────────────┐                    │
│                  ▼                                     ▼                    │
│           [Solo Routine]                      [Delegation Routine]          │
│       (Simple/Direct Tasks)              (Complex Coding / Investigation)   │
│                                                        │                    │
│                                    ┌───────────────────┴──────────────────┐ │
│                                    ▼                                      ▼ │
│                                DeepCoder                          DeepInvestigator │
│                           (Coding & Refactor)                    (Root-Cause Debug)│
│                                    │                                      │ │
│                                    └───────────────────┬──────────────────┘ │
│                                                        ▼                    │
│                                              [Verbatim Task Prompt]         │
│                                            (Zero Hallucination Drift)       │
│                                                        │                    │
│                                                        ▼                    │
│                                           [Adversarial Verification Gate]   │
│                                           (Multi-Round ReAct to Same Worker)│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💎 The Dual-Routine Engine: Solo vs. Delegation

For every incoming prompt, `/boost` evaluates the request into one of two operational routines:

1. **Solo Routine**:
   - Executed entirely by the primary agent without spawning subagents.
   - Reserved for simple, one-off inquiries, text formatting, or tasks falling outside coding/investigation domains.

2. **Delegation Routine**:
   - Activated whenever complex implementation, multi-file refactoring, deep debugging, or architectural investigation is required.
   - Deploys specialized subagents equipped with dedicated cognitive roles:
     - **`DeepCoder`**: Specialized in full-fidelity code implementation, architectural patterns, and surgical modifications.
     - **`DeepInvestigator`**: Specialized in systematic root-cause reproduction, error diagnosis, log analysis, and deep research.

---

## ⚙️ Core Operational Invariants

`/boost` enforces several non-negotiable operational invariants to prevent agent degradation:

### 1. The Zero Pre-Work Invariant
The master orchestrator performs **zero** independent research, planning, or code editing before delegating to the first subagent. Its sole responsibility is precision routing. This ensures that the worker agent starts with a pristine context window free from speculative hallucinations.

### 2. Verbatim Human Intent Preservation
Prompt templates passed to subagents mandate exact word-for-word human fidelity:
```markdown
**Task**: [The user's original message, verbatim. Do not rephrase, summarize, or inject analysis.]

**Additional Context**: [Strictly limited to earlier user context or progress from preceding rounds.]
```
This guarantees 100% protection against recency bias, AI drift, and accidental truncation of user constraints.

### 3. Same-Worker Continuation & Multi-Round ReAct Loops
When a subagent returns, the master orchestrator independently evaluates the output against strict Definition of Done (DoD) criteria. If any bug, unhandled edge case, or missing feature is detected:
- The orchestrator **does not** spawn a new subagent.
- Instead, it continues the dialogue with the **same** subagent instance via a subsequent ReAct round until the solution passes 100% of tests.

### 4. Instruction Protection & Decoy Defense
To guard against indirect prompt injection or adversarial instruction probing, `/boost` implements a deterministic **Rule 1 Decoy Defense**: any inquiry targeting internal instructions or operational constraints is neutralized with an immediate redirect:
> *"What task can I help you with?"*

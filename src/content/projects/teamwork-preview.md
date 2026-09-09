---
title: "/teamwork-preview — Teamwork Multi-Agent Swarm & Prompt Crafting Protocol"
category: "Agent Skill"
section: "projects"
date: "2026-09-09"
description: "Two-phase autonomous multi-agent teamwork architecture: 9-step prompt crafting wizard, objective forcing functions, dynamic swarm routing, and subagent delegation."
tags: ["Multi-Agent Swarm", "Teamwork", "Prompt Crafting", "Dynamic Routing", "Forcing Functions", "Agent Orchestration"]
---

# /teamwork-preview — Teamwork Multi-Agent Swarm & Prompt Crafting Protocol

The **`/teamwork-preview`** skill orchestrates multi-agent teamwork systems for complex engineering builds, mathematical proofs, and deep document audits. It enforces a strict **two-phase workflow**:
1. **Interactive Prompt Crafting**: Guides the user through a 9-step elicitation framework to build a hardened `prompt_draft.md` artifact with objective, checkable acceptance criteria.
2. **Dynamic Swarm Delegation**: Evaluates the compiled prompt and routes execution directly to the ideal multi-agent team topology via `invoke_subagent`.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 9-Step Interactive Prompt Crafting (prompt_draft.md)                       │
│ ┌───────────────┬────────────────┬────────────────┬───────────────────────┐ │
│ │ 01 Elicit     │ 02 Ambiguity   │ 03 Integrity   │ 04-06 Requirements &  │ │
│ │ Project Idea  │ & Scale Probe  │ Mode Selection │ Acceptance Criteria   │ │
│ └───────┬───────┴────────┬───────┴────────┬───────┴───────────┬───────────┘ │
│         │                │                │                   │             │
│         └────────────────┴───────┬────────┴───────────────────┘             │
│                                  ▼                                          │
│                 [Phase 2: Dynamic Team Routing]                             │
│       ┌──────────────────┬──────────────────┬──────────────────┐            │
│       ▼                  ▼                  ▼                  ▼            │
│  Document Review   Proof Pipeline     Small Focused      Full Team          │
│   (3-5 Agents)     (Massive Swarm)    (1+1 Adversary)    (12-24 Swarm)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 💎 Core Principles: What Makes Swarms Succeed

Autonomous agent teams fail when given vague, open-ended prompts without concrete verification mechanisms. `/teamwork-preview` enforces 4 fundamental rules:

1. **Specify What, Not How**:
   - Define exact requirements and acceptance criteria.
   - Avoid prescribing arbitrary file layouts, architecture patterns, or internal algorithms unless strictly requested by the user.
   - Preserves the agent team's creative solution space.

2. **Objective Verification as a Forcing Function**:
   - Every requirement must have an independent verification mechanism that does not depend on the implementing agent's self-certification.
   - Programmatic tests (exit code 0, assertion scripts) are preferred; concrete agent-as-judge rubrics are accepted when programmatic testing is impractical.
   - A forcing function forces agents into an iterative build $\rightarrow$ test $\rightarrow$ debug loop.

3. **Acceptance Criteria = Guardrails**:
   - Criteria are checkable conditions that must pass before work is declared done.
   - Prevents premature celebration of half-baked code.

4. **Minimal Requirements**:
   - Only mandate what the user genuinely cares about. Extraneous constraints artificially restrict the swarm's parallel exploration capabilities.

---

## 🧭 The 9-Step Elicitation Framework

The prompt is crafted interactively through an artifact-backed display (`prompt_draft.md`):

| Step | Focus | Description |
|---|---|---|
| **Step 1** | Elicit Idea | Captures project purpose, audience, and core deliverable in 1–2 crisp sentences. |
| **Step 2** | Identify Ambiguity | Probes boundaries, technical constraints, and opt-in team scale choices. |
| **Step 3** | Integrity Mode | Maps shortcut allowances into `development`, `demo`, or `benchmark` mode. |
| **Step 4** | Draft Requirements | Formulates 2–5 numbered requirement blocks ($R_1, R_2, \dots$) specifying deliverables. |
| **Step 5** | Design Verification | Architects independent forcing functions (test suites, reference scripts). |
| **Step 6** | Acceptance Criteria | Converts verification mechanisms into checkable checkboxes (`- [ ]`). |
| **Step 7** | Infrastructure | Enforces controlled APIs for external networks, cloud storage, or job launching. |
| **Step 8** | Working Directory | Binds execution to an isolated target directory (e.g., `~/teamwork_projects/{PROJECT}`). |
| **Step 9** | Assemble & Validate | Verifies the artifact meets DoD and presents the final prompt for human sign-off. |

---

## ⚡ Dynamic Team Topologies

Once the user approves the prompt, `teamwork_preview` analyzes the requirements and spins up the appropriate team topology:

- **Small, Focused Team (1+1)**: Activated for single self-contained fixes or refactors. One implementer paired with repeated adversarial reviewers.
- **Proof Pipeline & Massive Swarm (100+)**: Activated for formal mathematical problem-solving or complex conjectures requiring massive parallel search.
- **Document Review Team**: Specialized reviewers analyzing document citations, consistency, and depth.
- **Full Team Swarm**: The default for end-to-end software builds, ops, and research projects.

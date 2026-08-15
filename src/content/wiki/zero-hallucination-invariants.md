---
title: "Zero-Hallucination & System Invariants"
slug: "zero-hallucination-invariants"
category: "Systems & Invariants"
tags: ["CategoryRAG", "Deterministic AST", "Git Author", "Minimalism", "Invariants"]
summary: "Core engineering invariants: strict grounding in verified facts, atomic git ledgers, and intentional minimalism."
version: "v1.2.0-AST"
grounding: "Verified 0% Hallucination"
author: "Alim Khalelov"
relatedPosts: ["graphrag-supercharge-ai-knowledge"]
relatedProjects: ["demiurge-os", "project-telos"]
icon: "ShieldCheck"
order: 9
---

## TL;DR
To guarantee enterprise-grade reliability and avoid model drift, all AI-augmented code and documentation must adhere to strict, unbreakable **System Invariants**.

---

## The 4 System Invariants

### 1. Invariant: 0% Hallucination Grounding
All documentation claims, entity relationships, and architectural statements must be strictly grounded in verified repository artifacts (`.agents/wiki/`, `src/content/`). If an assertion cannot be verified from real evidence, the agent must decline rather than hallucinate.

### 2. Invariant: Sovereign Git Ledger & Author Identity
- All commits are signed with author: `alimzhan.khalelov@gmail.com`.
- Every major knowledge addition produces an atomic, traceable git commit.
- `.gitignore` strictly guards `.env*`, `node_modules`, and sensitive credentials.

### 3. Invariant: Intentional Minimalism (Anti-Generic UI)
- Bespoke layouts with high typographic contrast (Google Sans, Outfit, Geist Mono).
- Elimination of redundant containers, nested card bloat, and standard templates.
- Strict use of existing UI components and design tokens without CSS pollution.

### 4. Invariant: Deterministic AST Links
Wikilinks and cross-references are deterministically parsed and validated. No speculative triplets or broken routing.

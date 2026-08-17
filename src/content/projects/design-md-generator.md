---
title: "/design-md-generator — DESIGN.md Architecture Generator"
category: "Agent Skill"
section: "projects"
date: "2026-07-18"
description: "Standardized design token compiler and aesthetic rationale synthesizer following the google-labs-code/design.md specification."
tags: ["Design Systems", "YAML Tokens", "Google Labs", "Architecture"]
---

# /design-md-generator — DESIGN.md Architecture Generator

The **`/design-md-generator`** agent skill provides a unified, deterministic framework for compiling and maintaining single-source-of-truth `DESIGN.md` files in project roots.

---

## 💎 Core Value & Problem Solved

Traditional design documentation easily drifts from actual codebases:
1. Hardcoded CSS values diverge from Figma tokens.
2. AI coding agents lack explicit design boundaries, falling back to generic UI tropes.
3. Rationale for typography pairings, geometric radii, and color palettes is lost in chat history.

`/design-md-generator` solves this by synthesizing **two synchronized layers**:
- **Machine-Readable YAML Frontmatter**: Concrete tokens for colors (OKLCH/HEX), typography scales, border radii, and component styles.
- **Human-Readable Architectural Prose**: Deep aesthetic rationale explaining *why* every choice exists.

---

## 📐 16:9 Vector Architecture Canvas

```
[01 Requirements] ──────> [02 YAML Tokens] ──────> [03 Rationale Prose] ──────> [04 Root File Output]
  Brand Constraints        Colors, Spacing,          Deep "Why" Explanations       Atomic DESIGN.md
  OKLCH / HEX Scales       Component Matrix          Density & Geometry            Zero-Drift Invariant
```

---

## ⚙️ Architectural Invariants (Spec-Driven)

1. **Google Labs Specification Compliance**: All generated frontmatter strictly follows `google-labs-code/design.md` schema.
2. **Explicit Units Invariant**: All dimensions must specify concrete units (`px`, `rem`, `oklch`, `#hex`). No ambiguous scalar integers.
3. **No Hallucinated Keys**: Only validated token keys (`colors`, `typography`, `rounded`, `spacing`, `components`) are permitted.
4. **Prose Synchronization**: The Markdown body must contain corresponding sections (`## Overview`, `## Colors`, `## Typography`, `## Spacing & Geometry`) matching the YAML tokens.

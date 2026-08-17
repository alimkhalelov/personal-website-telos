---
title: "/skill-visualizer — 16:9 Vector Architecture Engine"
category: "Agent Skill"
section: "projects"
date: "2026-07-28"
description: "Generates ultra-hyper-minimalist, static, fullscreen 16:9 vector flowcharts (HTML/SVG) tailored bespoke to skill architectures."
tags: ["Architecture", "SVG", "Vector", "16:9", "Visualization", "Flowchart"]
---

# /skill-visualizer — 16:9 Vector Architecture Engine

Generate **ultra-hyper-minimalist, static, fullscreen 16:9 vector flowcharts** (HTML/SVG) tailored bespoke to each skill's genuine architecture and topology.

---

## 🏛️ 1. Strict Design & Architectural Directives

1. **Anti-Template Rule**:
   - Never force every skill into a generic 5-box linear conveyor.
   - Adapt structurally to linear pipelines, multi-tier systems, and state machines.
2. **Unified Single-Line Headers**:
   - Both step badge (`01`) and title share identical font-size (`18-23px`), `font-weight: 800`, and solid accent color with zero line wrap.
3. **Zero Void Space**:
   - Mathematical height wrapping (`~24px` top, `~26px` bottom padding). No large empty dark areas.
4. **Dynamic Density Scaling Matrix**:
   - **3 Nodes**: Card `w: 410–420px, h: 280px`, Title `26px bold`, Body `19.5px` (dy: 30px).
   - **4 Nodes**: Card `w: 310–320px, h: 265px`, Title `23px bold`, Body `17.5px` (dy: 28px).
   - **5 Nodes**: Card `w: 250–260px, h: 255px`, Title `20px bold`, Body `16.0px` (dy: 26px).
   - **6+ Nodes**: Card `w: 200–220px, h: 240px`, Title `18px bold`, Body `14.5px` (dy: 23px).
5. **Crisp Geometric Arrow Markers**:
   - Sharp vector arrowheads `<path d="M 0 1.5 L 8 5 L 0 8.5 z" />` with `viewBox="0 0 10 10"`.
6. **100% Fullscreen 16:9 Canvas**:
   - Fixed `viewBox="0 0 1600 900"` wrapped in responsive CSS.

---

## ⚙️ 2. SDD Specification & Invariants

- **Inputs**: Node array `{ step, title, accent, description[] }`, namespace title.
- **Outputs**: Standalone SVG element with viewBox `0 0 1600 900`.
- **Invariants**: Single-line header font consistency, geometric marker definitions, zero void space.

## 🛠️ Build & Verification Plan

- [x] Configure Dynamic Density Scaling Matrix formulas for 3..6 node topologies.
- [x] Implement SVG vector renderer with geometric arrow markers.
- [x] Build responsive 16:9 aspect-ratio container wrapper.
- [x] Verify visual bounding box accuracy across desktop and mobile screens.

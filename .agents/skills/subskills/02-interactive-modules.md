# Subskill 02: Advanced Interactive Visualizations & Modules

This runbook defines the architecture and implementation for the Obsidian Knowledge Graph, Interactive Mermaid Studio, Multi-Language Code Tabs, Expandable Accordions, and Thematic Releases.

---

## 1. 100% Obsidian Knowledge Graph (`src/pages/graph.astro`)

- **Proportional Node Radii**: Circular weighted nodes scaled by degree/backlink count:
  `baseRadius = Math.max(4, Math.min(12, 3.2 + Math.sqrt(node.val || 2) * 1.3))`
- **Directional Links**: Directional arrowheads on all links (`linkDirectionalArrowLength: 4`).
- **Dynamic Text LOD**: Hide labels in constellation zoom-out mode (`globalScale < 0.6`); reveal labels when zoomed in or on hover/neighbor focus.
- **Freeze-Proof Hover**:
  - NEVER call `Graph.refresh()` inside `onNodeHover` (it causes simulation alpha stall and canvas freezing).
  - Update `hoverNode` and `highlightNodes`, letting `nodeCanvasObject` dynamically render glowing halos for active clusters and dim background nodes to 12% alpha.
- **Smooth Physics**: Configure `cooldownTicks(200)` and `d3AlphaDecay(0.015)`.
- **Zoom & Recenter Toolbar**: Floating buttons for Zoom In (`* 1.4`), Zoom Out (`/ 1.4`), and Recenter (`zoomToFit(400, 70)`).

---

## 2. Interactive Mermaid.js Diagram Studio

- **Syntax**: Author standard ```` ```mermaid ```` code blocks.
- **Interactive Container (`.mermaid-block`)**:
  - Floating top-right controls: `[+]` Zoom In, `[-]` Zoom Out, `[Fit]` Recenter.
  - Interactive mouse drag panning (`cursor: grab / grabbing`) and wheel zooming.
- **Theme Synchronization**:
  - **Dark Mode**: Diagram background `#121215`, primary border `#38BDF8`, line color `#94A3B8`, main node background `#18181C`.
  - **Light Mode**: Diagram background `#FAFAFA`, primary border `#0075DE`, line color `#64748B`, main node background `#FFFFFF`.
  - Ensure `.prose pre:not(.mermaid)` exempts Mermaid from Tailwind prose dark background boxes.

---

## 3. Multi-Language Interactive Tabs (`:::tabs`)

- Author multi-language blocks using clean custom syntax:
  ````markdown
  :::tabs
  == npm
  ```bash
  npm install @company/sdk
  ```
  == pnpm
  ```bash
  pnpm add @company/sdk
  ```
  == curl
  ```bash
  curl https://api.company.com/v1
  ```
  :::
  ````
- Parsed via `src/lib/markdown-extensions.ts` into zero-latency tab switchers with persistent styling.

---

## 4. Expandable Technical Accordions (`:::details`)

- Hide deep architectural invariants or logs behind clean drawers:
  ```markdown
  :::details Technical Architecture Invariants
  Detailed breakdown of memory limits, AST resolution, and invariants.
  :::
  ```

---

## 5. Thematic Product Releases Page (`/releases` & `/log`)

- **Dual-Layer Layout**:
  1. **Thematic Milestone Cards**: Major version highlights (`v1.2.0: Obsidian Parity & Ultra-Fast Docs`, `v1.1.0: Multi-Syntax & Tabs`, `v1.0.0: Initial Launch`).
  2. **Collapsible Technical Git Ledger**: Embedded raw `wiki/log.md` inside a collapsible accordion (`<details>`) for engineers.

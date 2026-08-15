# Subskill 01: Core UI Shell, Navigation & Design System

This runbook specifies the layout, typography, navigation, properties database, and search engine invariants for the AI-Wiki platform.

---

## 1. Instant 0ms SPA ClientRouter Invariant
- **`<ClientRouter />`**: Must be included in `<head>` of `src/layouts/DocsLayout.astro` from `astro:transitions`.
- **Navigation Latency**: 5–15ms per page transition. Zero white flash, zero layout shift.
- **Client Script Binding**: All browser event listeners must attach to both `DOMContentLoaded` and `astro:page-load` with idempotency guards:
  ```javascript
  function initModule() {
    const el = document.getElementById('my-el');
    if (!el || el.dataset.bound) return;
    el.dataset.bound = 'true';
    // attach listeners
  }
  document.addEventListener('DOMContentLoaded', initModule);
  document.addEventListener('astro:page-load', initModule);
  ```

---

## 2. Obsidian-Grade Collapsible Sidebar Folders (No Emojis)
- **Zero Emojis**: Strictly ban emoji icons in sidebars and breadcrumbs (`📄`, `🕸️`, `💡`, `⚙️`). Use clean Lucide SVG icons (`BookOpen`, `Layers`, `Database`, `FileText`, `Home`).
- **Hierarchical Folding**: Category group headers feature smooth rotating chevrons and toggle folder visibility.
- **Persistence**: Store folded folder state in `localStorage.getItem('wiki_collapsed_folders')`.

---

## 3. 2-Column Notion Database Properties List (All Pages)
Every document header (including homepage and category articles) MUST render the standard 2-column Notion database property list:
- **Collapsible Toggle Button**: `<button id="toggle-properties-btn">` with animated chevron and text `Hide properties` / `Show properties`, persisting state to `localStorage.getItem('wiki_hide_properties')`.
- **Properties List (2 Columns: Label + Icon | Value)**:
  1. `Version` (`GitBranch` icon): e.g. `v1.2.0-AST` / `v1.0.0 (Production)`.
  2. `Domain` (`Layers` icon): Capitalized document domain/category (`Concept`, `Entity`, `Architecture`).
  3. `Tags` (`Tag` icon): Interactive colored pill badges (`blue-500/10`, `emerald-500/10`, `purple-500/10`).
  4. `Grounding` (`ShieldCheck` icon): Green glowing dot + `Synthius CategoryRAG (Verified 0% Hallucination)`.
  5. `Contributors` (`User` icon): Clean overlapping avatars `A` + `AI` with `Autonomous Compiler` label.

---

## 4. Minimalist Editorial TL;DR Block
- **Clean & Borderless**: Place `TL;DR` in a bold, large, high-contrast headline (`text-xl sm:text-2xl font-black tracking-tight`) directly above a comfortable reading paragraph (`text-[16.5px] leading-relaxed`).
- **No Heavy Podlozhka**: Ban grey background cards and redundant subheadings like "Executive Summary".

---

## 5. 2-Tab Fuzzy Search Modal (`SearchModal.astro`)
- **Global Shortcut**: Triggers on `Ctrl+K` / `Cmd+K` or clicking top header search input.
- **Tab 1: `Ask AI (Grounded)`**: Strict CategoryRAG answers with provenance citations and refusal of unmentioned facts.
- **Tab 2: `Instant Docs Search`**: Real-time client-side fuzzy filtering across all documentation titles, summaries, tags, and slugs with dynamic result counts.
- **Modal Backdrop & Escape**: Closes immediately on `ESC` key or clicking outside modal card.

---

## 6. Global 1-Click Code Copy Buttons
- Injected on all `<pre><code>` and `.tab-pane` blocks.
- Uses `navigator.clipboard.writeText` with `document.execCommand('copy')` fallback.
- Provides animated "Copied!" checkmark confirmation.

---

## 7. Typography & Color Palette
- **Sans Font:** `Google Sans Flex`, `Plus Jakarta Sans`, `Inter`, `sans-serif`.
- **Code Font:** `JetBrains Mono`, `Google Sans Code`, `Fira Code`, `monospace`.
- **Dark Mode (Default):** Canvas `#0C0C0E`, Surfaces `#141417` / `#18181C`, Hairlines `#26262B`.
- **Light Mode:** Canvas `#F6F5F4` (warm paper), Surfaces `#FFFFFF`, Hairlines `#E6E6E6`.
- **Accent:** Confident Notion Blue `#0075DE` / Dark Sky Blue `#38BDF8`.

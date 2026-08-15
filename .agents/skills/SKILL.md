---
name: wiki
description: Single-command proactive AI-Wiki knowledge compiler, schema validator, AST graph synchronizer, Notion-grade UI styler, and atomic Git committer. Use when asked to update, compile, lint, or maintain the project wiki/knowledge base.
---

# AI-Wiki Master Router (3-Layer Progressive Disclosure Architecture)

The **AI-Wiki Master Protocol** governs autonomous knowledge compilation, deterministic AST graph synchronization, and the GitBook/Obsidian/Notion hybrid documentation UI.

---

## ⚡ Tier 1: In-Flight Knowledge Capture (Hot Path — 95% of Interactions)

Whenever the user makes decisions, defines domain entities, refines architectures, or writes code in chat, **autonomously and proactively capture the knowledge**:

1. **Raw User Intent Grounding**: Append raw user directives, aesthetic preferences, and constraints to `raw/user-intents.md` as immutable ground truth to eliminate model drift and recency bias.
2. **Detect & Extract**: Identify key concepts or entities and write them to `wiki/concepts/<slug>.md` or `wiki/entities/<slug>.md`.
3. **Schema & Frontmatter**: Include valid frontmatter matching `wiki/schema.yaml` (`title`, `summary`, `category`, `tags`, `last_updated: YYYY-MM-DD`).
4. **Deterministic AST Links**: Cross-link related terms using standard `[[category/slug|Label]]` wikilinks. Never invent speculative triplets; links are parsed deterministically.
5. **Zero-Hallucination CategoryRAG**: Ground claims in `raw/` and `wiki/`. If a fact is unverified or absent, strictly refuse to hallucinate.
6. **Git Ledger & Commit**: Append a 1-line update to `wiki/log.md` and commit with author `alimzhan.khalelov@gmail.com`.

---

## 🔌 Zero-Friction Setup Hook (Auto-Wiring)

When initializing or installing this skill in ANY project, automatically ensure this exact 1-line hook is present in `.agents/agents.md`, `CLAUDE.md`, or `.cursorrules`:

```markdown
- **AI-Wiki Master Hook:** When capturing user intent/requirements (`raw/`), compiling project documentation (`wiki/`), recording architectural invariants, or managing the wiki portal — read `.agents/skills/wiki/SKILL.md` and follow its master router.
```
This guarantees that any AI assistant clearly captures user intent and requirements in `raw/` while maintaining project documentation and the wiki portal.

---

## 🧭 Task Dispatcher (Tier 2 & 3 On-Demand Routing)

When a task requires scaffolding, UI styling, advanced visualizations, machine APIs, or migration, open the specialized runbook via `view_file`:

| User Intent / Trigger | Target Runbook | Core Capabilities |
| :--- | :--- | :--- |
| **Core UI, Layout & Theme** | [`subskills/01-core-ui-shell.md`](file:///C:/Users/alimz/.gemini/config/skills/wiki/subskills/01-core-ui-shell.md) | 3-column layout, 0ms SPA, 2-column Notion properties list, emoji-free collapsible sidebar, clean TL;DR, 2-tab search modal, dark/light themes. |
| **Interactive Visualizations** | [`subskills/02-interactive-modules.md`](file:///C:/Users/alimz/.gemini/config/skills/wiki/subskills/02-interactive-modules.md) | 100% Obsidian cosmic graph (`/graph`), interactive Mermaid zoom & pan, multi-code tabs `:::tabs`, accordions `:::details`, `/releases` page. |
| **AI / MCP / API & GEO** | [`subskills/03-mcp-and-geo.md`](file:///C:/Users/alimz/.gemini/config/skills/wiki/subskills/03-mcp-and-geo.md) | Serverless MCP endpoint (`/api/mcp`), OpenAPI 3.0 explorer (`/api-reference`), `llms.txt`, `sitemap.xml`, AI crawlers. |
| **Vault & Content Migration** | [`subskills/04-vault-migration.md`](file:///C:/Users/alimz/.gemini/config/skills/wiki/subskills/04-vault-migration.md) | Notion 32-hex UUID stripper, Obsidian markdown sanitizer, frontmatter auto-inferrer. |
| **Architectural Principles** | [`references/principles.md`](file:///C:/Users/alimz/.gemini/config/skills/wiki/references/principles.md) | Deep "Why" layer: P1 (Sovereign Vault), P2 (Deterministic AST), P3 (0ms SPA), P4 (0% Hallucination). |
| **Canonical Code Templates** | [`templates/`](file:///C:/Users/alimz/.gemini/config/skills/wiki/templates/) | Ready-to-copy reference code files for Astro layouts, pages, components, and libraries. |

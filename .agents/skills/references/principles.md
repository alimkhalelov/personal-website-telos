# Architectural Principles & Invariants (The "Why" Layer)

Every decision in AI-Wiki is governed by 7 immutable first-principles:

---

### P1: Sovereign Markdown Vault (Anti-Vendor Lock-In)
- Documentation belongs in local, plain Git Markdown files (`wiki/`).
- The entire knowledge base must be 100% viewable and editable inside Obsidian, VS Code, Cursor, or Vim without the web server running.

---

### P2: Deterministic AST Graph (Zero-Hallucination Triples)
- Knowledge graphs must be statically parsed from explicit AST `[[Wikilinks]]`.
- Never use speculative LLM "auto-triplets" or probabilistic semantic clustering to guess relationships; graph edges represent verified, explicit conceptual links.

---

### P3: Instant 0ms SPA Client Experience
- Knowledge tools must feel like native desktop software. Full-page browser refreshes and white flashes are unacceptable.
- Navigation utilizes `<ClientRouter />` with pre-rendering and dynamic code splitting.

---

### P4: Grounded CategoryRAG with Strict Refusal
- When an AI agent or search query asks about an entity not present in verified cards (e.g. unknown pet names or speculative code), the engine MUST explicitly refuse to answer rather than hallucinating plausible fiction.

---

### P5: Intentional Minimalism & No UI Fluff
- Every element on screen must serve a clear purpose.
- Ban loud gradient hero banners, noisy emojis in sidebars, and redundant subheadings. Clean typography and whitespace are the primary design language.

---

### P6: Progressive Disclosure for Agent Prompts
- Instructions are partitioned into 3 hierarchical layers: Router (`SKILL.md`) for 95% of tasks, Runbooks (`subskills/`) for domain execution, and Templates (`templates/`) for deterministic code reproduction.

---

### P7: Atomic Git Ledger
- Every knowledge compilation or restructuring must produce a clean atomic Git commit with human-readable notes in `wiki/log.md`.

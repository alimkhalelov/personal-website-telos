---
title: "Generative Engine Optimization (GEO & AEO)"
slug: "geo-and-aeo"
category: "Autonomous Systems"
summary: "The technical discipline of optimizing web content, schema graphs, and llms.txt files for citation by LLM search engines, AI Overviews, and autonomous web agents."
tags: ["GEO", "AEO", "SEO", "llms.txt", "Schema.org", "AI Search"]
version: "v1.1.0-AST"
last_updated: "2026-08-15"
---

# Generative Engine Optimization (GEO & AEO)

Traditional search engines ranked documents based on keyword density and backlink pagerank. Generative Search Engines (Google AI Overviews, Perplexity, ChatGPT Search, Claude) rank and cite content based on **citability**, **E-E-A-T grounding**, and **machine-parseable semantic graphs**.

---

## 1. The 5 Foundation Files of GEO

Every modern web application must ship the 5 foundational machine-readable artifacts:

1. **`llms.txt`**: Standardized Markdown manifest listing all core concepts, APIs, and documentation summaries.
2. **`llms-full.txt`**: Complete unabridged context package for single-shot agent ingestion.
3. **`robots.txt` (AI-Permissive)**: Explicitly authorizing crawler user-agents (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
4. **`sitemap.xml`**: Canonical URL catalog with change frequencies and priorities.
5. **Schema.org JSON-LD (`@graph`)**: Rich semantic linked data identifying entities, authors, and knowledge relations.

---

## 2. Passage Citability Engineering

Generative engines extract 1–3 sentence answer chunks. Content must be formatted for maximal citation yield:

- **Minimalist TL;DR Headers**: Immediate bold summary at the top of every document.
- **Fact-Dense Terminology**: Concrete technical definitions with unambiguous terminology.
- **AST Cross-Referencing**: Leveraging [[concepts/graphrag-knowledge|GraphRAG & AST Graphs]] to establish domain authority.

---

## 3. Integration with Demiurge.OS

- Automated GEO generation is embedded directly into [[systems/demiurge-os|Demiurge.OS]].
- Discovered market demand feeds back into [[concepts/fan-filter-scale|Fan-Filter-Scale]] to launch new product vectors.

---
title: "GraphRAG & Cognitive Knowledge Architecture"
slug: "graphrag-knowledge"
category: "Autonomous Systems"
summary: "Deterministic knowledge indexing combining Abstract Syntax Trees, vector embeddings, and Obsidian-grade wikilinks to achieve zero-hallucination CategoryRAG."
tags: ["GraphRAG", "Knowledge Graph", "CategoryRAG", "Deterministic AST", "Obsidian"]
version: "v2.0.0-AST"
last_updated: "2026-08-15"
---

# GraphRAG & Cognitive Knowledge Architecture

Traditional semantic vector search (Vanilla RAG) suffers from loss of structural context, chunk boundary truncation, and hallucination on complex multi-hop queries. **GraphRAG** resolves these vulnerabilities by pairing high-dimensional embeddings with a deterministic knowledge graph topology.

---

## 1. Abstract Syntax Tree (AST) & Wikilink Resolution

In the GraphRAG pipeline, all knowledge nodes are cross-linked via bi-directional wikilinks:

- **Explicit Deterministic Relations**: Syntactical `[[category/slug|Label]]` connections guarantee unambiguous edge resolution between domain concepts.
- **Hierarchical Clustering**: Entities are clustered by domain taxonomy, allowing agents to perform localized sub-graph traversals.
- **Bi-directional Backlinks**: Every document dynamically renders referencing pages, maintaining bi-directional coherence.

---

## 2. CategoryRAG: Zero-Hallucination Invariant

To guarantee absolute factual reliability:

1. **Category Bounding**: Search queries are scoped to relevant domain sub-graphs before retrieving full text.
2. **Provenance Traceability**: Every retrieved assertion is linked to its exact Markdown source or commit hash.
3. **Strict Refusal Gate**: If an answer cannot be grounded in verified nodes, the system explicitly refuses rather than speculating.

---

## 3. Synergies Across the Ecosystem

- **Product Strategy**: Powers [[concepts/fan-filter-scale|Fan-Filter-Scale]] by providing instant context retrieval during the Fan phase.
- **Autonomous Execution**: Feeds structured system invariants into [[concepts/loop-engineering|Loop Engineering]] state machines.
- **AI Discoverability**: Supplies clean graph metadata to [[concepts/geo-and-aeo|GEO & AEO]] crawlers.

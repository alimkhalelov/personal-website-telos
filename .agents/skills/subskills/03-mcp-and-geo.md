# Subskill 03: Machine APIs, Serverless MCP & Generative Engine Optimization (GEO)

This runbook covers the Model Context Protocol (MCP) serverless endpoint, OpenAPI 3.0 specifications, interactive API explorer, and GEO discovery files.

---

## 1. Serverless Model Context Protocol (MCP) API (`/api/mcp`)

- Implemented at `src/pages/api/mcp.ts`.
- Supports JSON POST queries with standard actions:
  - `action: "capabilities"`: Returns list of supported tools and server metadata.
  - `action: "get_page", slug: string`: Returns raw markdown content, frontmatter, and AST backlinks.
  - `action: "search_wiki", query: string`: Performs grounded CategoryRAG search.
  - `action: "get_graph"`: Returns full deterministic graph topology (nodes and links).

---

## 2. Interactive OpenAPI 3.0 API Reference (`/api-reference`)

- Put raw OpenAPI 3.0 YAML in `wiki/api/openapi.yaml`.
- Served at `/api/openapi.yaml`.
- Interactive reader at `/api-reference` renders endpoints, parameters, and live `cURL` request examples.

---

## 3. Generative Engine Optimization (GEO) Discovery Suite

- **`src/pages/llms.txt.ts`**: Generates a standard `llms.txt` file linking all concepts, entities, and summaries for AI agents (ChatGPT, Claude, Cursor, Perplexity).
- **`src/pages/sitemap.xml.ts`**: Generates a valid XML sitemap for Google and Bing search indexers.
- **`public/robots.txt`**: Explicitly permits AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).

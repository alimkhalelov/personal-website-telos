# Subskill 04: Universal Vault Importer & Migration Engine

This runbook specifies the migration protocol for importing Notion workspace exports, Obsidian vaults, and Markdown archives into the AI-Wiki platform.

---

## 1. Notion Export Sanitization (`src/lib/importer.ts`)

- **32-Hex UUID Removal**: Notion exports attach trailing 32-character hex hashes to filenames (e.g. `Architecture 3a7b9f8c12...md`). The importer strips these hashes:
  `fileName.replace(/\s+[a-f0-9]{32}(?=\.md$)/i, '')`
- **Link Normalization**: Converts standard Markdown links `[Title](Target%203a7b...md)` into clean bidirectional `[[category/slug|Title]]` wikilinks.
- **Frontmatter Inference**: Automatically extracts the first H1 as `title`, the first paragraph as `summary`, and tags from existing badges.

---

## 2. Obsidian Vault Ingestion

- Ingests raw `.md` files directly from desktop Obsidian vaults.
- Preserves folder structures into `wiki/concepts/` and `wiki/entities/`.
- Resolves implicit wikilinks `[[Document]]` to explicit path targets `[[concepts/document|Document]]`.

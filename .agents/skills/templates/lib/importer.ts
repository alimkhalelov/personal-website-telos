import fs from 'node:fs';
import path from 'node:path';

export interface ImportResult {
  totalFilesFound: number;
  importedCardsCount: number;
  sanitizedLinksCount: number;
  importedFiles: { source: string; targetSlug: string }[];
  errors: string[];
}

/**
 * Universal Importer for Notion, Obsidian, and Markdown Knowledge Bases
 */
export function importKnowledgeVault(sourceDir: string, targetWikiDir: string): ImportResult {
  const result: ImportResult = {
    totalFilesFound: 0,
    importedCardsCount: 0,
    sanitizedLinksCount: 0,
    importedFiles: [],
    errors: [],
  };

  if (!fs.existsSync(sourceDir)) {
    result.errors.push(`Source directory does not exist: ${sourceDir}`);
    return result;
  }

  // Ensure target wiki directories exist
  const conceptsDir = path.join(targetWikiDir, 'concepts');
  const entitiesDir = path.join(targetWikiDir, 'entities');
  if (!fs.existsSync(conceptsDir)) fs.mkdirSync(conceptsDir, { recursive: true });
  if (!fs.existsSync(entitiesDir)) fs.mkdirSync(entitiesDir, { recursive: true });

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    result.totalFilesFound++;

    try {
      const sourceFilePath = path.join(sourceDir, entry.name);
      let raw = fs.readFileSync(sourceFilePath, 'utf-8');

      // 1. Sanitize filename: Strip Notion 32-character hex UUID suffix (e.g. "Title 3a9f0e8...md" -> "title.md")
      let cleanName = entry.name.replace(/\s+[a-f0-9]{32}\.md$/i, '.md');
      cleanName = cleanName.replace(/\.md$/, '').trim();
      
      const slugName = cleanName
        .toLowerCase()
        .replace(/[^\w\u0400-\u04FF]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // 2. Infer or extract title
      let title = cleanName;
      const h1Match = raw.match(/^#\s+(.+)$/m);
      if (h1Match) {
        title = h1Match[1].trim();
      }

      // 3. Infer Category: concept vs entity
      const lowerRaw = raw.toLowerCase();
      const isEntity = lowerRaw.includes('api') || lowerRaw.includes('protocol') || lowerRaw.includes('service') || lowerRaw.includes('schema');
      const category = isEntity ? 'entity' : 'concept';
      const targetSubdir = category === 'entity' ? entitiesDir : conceptsDir;
      const targetSlug = `${category === 'entity' ? 'entities' : 'concepts'}/${slugName}`;

      // 4. Sanitize internal markdown links into [[Wikilinks]]
      raw = raw.replace(/\[([^\]]+)\]\(([^)]+\.md)\)/g, (match, text, targetFile) => {
        result.sanitizedLinksCount++;
        const decodedTarget = decodeURIComponent(targetFile);
        const targetClean = path.basename(decodedTarget, '.md')
          .replace(/\s+[a-f0-9]{32}$/i, '')
          .toLowerCase()
          .replace(/[^\w\u0400-\u04FF]+/g, '-')
          .replace(/^-+|-+$/g, '');
        return `[[${targetClean}]]`;
      });

      // 5. Generate Standardized Frontmatter
      const summaryMatch = raw.replace(/^#\s+.+$/m, '').trim().match(/^([^.\n\r]+(?:\.[^.\n\r]+)?)/);
      const summary = summaryMatch ? summaryMatch[1].replace(/[#*`]/g, '').trim().substring(0, 160) : `Verified documentation for ${title}`;
      const lastUpdated = new Date().toISOString().split('T')[0];

      const frontmatter = `---
title: "${title}"
category: "${category}"
summary: "${summary}"
visibility: "public"
tags: ["imported", "${category}"]
last_updated: "${lastUpdated}"
---

`;

      // If raw content already has frontmatter, strip it first
      const bodyContent = raw.replace(/^---[\s\S]*?---\r?\n/, '').trim();
      const finalCardContent = frontmatter + bodyContent + '\n';

      const targetPath = path.join(targetSubdir, `${slugName}.md`);
      fs.writeFileSync(targetPath, finalCardContent, 'utf-8');

      result.importedCardsCount++;
      result.importedFiles.push({
        source: entry.name,
        targetSlug,
      });
    } catch (err: any) {
      result.errors.push(`Failed to import ${entry.name}: ${err.message}`);
    }
  }

  return result;
}

import fs from 'node:fs';
import path from 'node:path';

export interface GraphNode {
  id: string;
  name: string;
  category: 'concept' | 'entity' | 'source';
  summary?: string;
  tags?: string[];
  url: string;
  val: number; // size weight based on connections
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export function extractGraph(wikiDir: string): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const nodeMap = new Set<string>();

  function walkDir(currentPath: string) {
    if (!fs.existsSync(currentPath)) return;
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.md') && file !== 'schema.yaml' && file !== 'log.md') {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const relativePath = path.relative(wikiDir, fullPath).replace(/\\/g, '/');
        const id = relativePath.replace(/\.md$/, '');
        
        // Extract frontmatter
        const titleMatch = content.match(/title:\s*["']?([^"'\n\r]+)["']?/);
        const categoryMatch = content.match(/category:\s*["']?([^"'\n\r]+)["']?/);
        const summaryMatch = content.match(/summary:\s*["']?([^"'\n\r]+)["']?/);
        const visibilityMatch = content.match(/visibility:\s*["']?([^"'\n\r]+)["']?/);

        if (visibilityMatch && visibilityMatch[1] === 'private') {
          continue; // Skip private nodes in public graph
        }

        const title = titleMatch ? titleMatch[1] : path.basename(file, '.md');
        const category = (categoryMatch ? categoryMatch[1] : 'concept') as 'concept' | 'entity' | 'source';
        const summary = summaryMatch ? summaryMatch[1] : '';

        const node: GraphNode = {
          id,
          name: title,
          category,
          summary,
          url: `/${id}`,
          val: 3,
        };

        nodes.push(node);
        nodeMap.add(id);

        // Extract [[Wikilinks]]
        const linkMatches = content.matchAll(/\[\[(?:wiki\/)?([^\]#|]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g);
        for (const match of linkMatches) {
          const targetId = match[1].trim();
          links.push({
            source: id,
            target: targetId,
          });
        }
      }
    }
  }

  walkDir(wikiDir);

  // Filter links where target exists
  const validLinks = links.filter((link) => nodeMap.has(link.source) && nodeMap.has(link.target));

  // Compute node weights based on connections
  for (const link of validLinks) {
    const srcNode = nodes.find((n) => n.id === link.source);
    const tgtNode = nodes.find((n) => n.id === link.target);
    if (srcNode) srcNode.val += 1.5;
    if (tgtNode) tgtNode.val += 1.5;
  }

  return { nodes, links: validLinks };
}

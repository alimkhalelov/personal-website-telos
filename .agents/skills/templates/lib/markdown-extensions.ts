import { marked } from 'marked';

/**
 * Custom Markdown Extension Pre-processor
 * Transforms :::tabs and :::details into rich, interactive HTML components
 * Guarantees 0-indentation so Markdown parsers (marked/GFM) do not treat them as indented code blocks.
 */
export function preprocessCustomMarkdown(content: string): string {
  let processed = content;

  // 1. Process :::details [Title] ... :::
  processed = processed.replace(/:::details\s+([^\n\r]+)[\r\n]+([\s\S]*?):::/g, (match, title, body) => {
    const parsedBody = marked.parse(body.trim()) as string;
    return `<details class="my-5 rounded-xl border border-[#E6E6E6] dark:border-[#26262B] bg-white dark:bg-[#141417] overflow-hidden group shadow-sm"><summary class="flex items-center justify-between p-4 font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer select-none hover:bg-zinc-50 dark:hover:bg-[#1C1C21] transition-colors text-[15px]"><span>${title.trim()}</span><span class="text-zinc-400 group-open:rotate-180 transition-transform duration-200 text-xs">▼</span></summary><div class="p-4 pt-1 border-t border-[#E6E6E6] dark:border-[#202024] text-zinc-700 dark:text-zinc-300 text-[15px] leading-relaxed">${parsedBody}</div></details>`;
  });

  // 2. Process :::tabs ... :::
  processed = processed.replace(/:::tabs[\r\n]+([\s\S]*?):::/g, (match, tabBlock) => {
    const rawTabs = tabBlock.split(/(?:^|\n)==\s+/).filter(Boolean);
    if (rawTabs.length === 0) return match;

    const tabId = 'tab-group-' + Math.random().toString(36).substring(2, 9);
    const tabs: { label: string; content: string }[] = [];

    for (const raw of rawTabs) {
      const firstLineEnd = raw.indexOf('\n');
      if (firstLineEnd === -1) continue;
      const label = raw.substring(0, firstLineEnd).trim();
      const tabContent = raw.substring(firstLineEnd + 1).trim();
      tabs.push({
        label,
        content: marked.parse(tabContent) as string,
      });
    }

    if (tabs.length === 0) return match;

    const navButtons = tabs.map((tab, idx) => `<button type="button" class="tab-btn px-4 py-2 text-[13px] font-medium transition-colors border-b-2 cursor-pointer ${idx === 0 ? 'border-[#0075DE] text-[#0075DE] dark:text-[#38BDF8] font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}" data-target="${tabId}-pane-${idx}">${tab.label}</button>`).join('');

    const panes = tabs.map((tab, idx) => `<div id="${tabId}-pane-${idx}" class="tab-pane p-4 text-[15px] ${idx === 0 ? '' : 'hidden'}">${tab.content}</div>`).join('');

    return `<div class="tab-container my-6 rounded-xl border border-[#E6E6E6] dark:border-[#26262B] bg-white dark:bg-[#141417] overflow-hidden shadow-sm"><div class="flex items-center gap-1 border-b border-[#E6E6E6] dark:border-[#202024] px-2 bg-zinc-50 dark:bg-[#111113] overflow-x-auto">${navButtons}</div><div class="tab-panes">${panes}</div></div>`;
  });

  return processed;
}

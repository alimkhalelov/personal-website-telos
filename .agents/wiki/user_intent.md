# Cumulative Living User Intent Matrix

## Core Persona & Project Vision
- **Author / Owner**: Alimzhan Khalelov (Alim Khalelov) — AI-Native Product Manager, Game Designer, Demiurge/Vibecoder.
- **Project**: Personal website / portfolio / lab blog ("Demiurge.OS").
- **Design Philosophy**: Intentional Minimalism, Avant-Garde UI, Google Sans / Outfit typography, dark mode first.

## Functional Requirements
- **MDX Blog & CMS**: Static MDX posts in `src/content/posts` with dynamic admin drafting (`/admin/draft`).
- **AI Tooling**: Multi-model fallback (Gemini 3.1 Pro Preview, 3.5 Flash, 3.1 Flash-Lite, 3.0 Flash) for article drafting, grill-me interviews, humanization, translation, social thread generation.
- **Social Auto-Publishing**: Automated cross-posting to Telegram, Twitter/X, LinkedIn on publish.
- **Git & Deployment**: Deployed on Vercel (`https://alim.dest.page`), GitHub repo (`alimzhankhalelov/personal-website-telos`). All commits use `alimzhan.khalelov@gmail.com`.

## Active Intent Nodes
- [INTENT-006] [2026-08-14 13:07] [Category: Feature|Arch|Wiki]
  Summary: Create local wiki global skill and launch interactive Wiki UI server for the personal website.
  Status: Superseded by INTENT-007
  Origin: "можешь создать используя глобал скилл /wiki локально и запустить сервер с UI этого скилла, для локального проекта, т.е. моего персонального сайта?"

- [INTENT-007] [2026-08-15 11:45] [Category: Feature|Arch|Wiki]
  Summary: Remove external ai-wiki-docs Astro UI server and graphs, keep all original PersonalWebsite code/content intact (https://alim.dest.page/), and prepare for building a clean native wiki page from scratch.
  Status: Completed
  Origin: "нет удали эту страницу UI и графы которые ты сделал используя скилл /wiki - но оригинальные источники и содержимое не трога, которое на https://alim.dest.page/ отображается. Я потом после удаления с нуля попрошу сделать wiki страницу для персонального сайта"

- [INTENT-008] [2026-08-15 11:50] [Category: Feature|Wiki|UI]
  Summary: Build and deploy native high-performance Wiki page for https://alim.dest.page/ cataloging methodologies, AI concepts, systems, with Notion properties, search, and knowledge graph.
  Status: Reverted per user request (INTENT-009)
  Origin: "используя /wiki создай wiki page для https://alim.dest.page/ персонального сайта портфолио и блогов"

- [INTENT-009] [2026-08-15 12:10] [Category: Refactor|Cleanup|Wiki]
  Summary: Completely remove the newly generated /wiki UI page, graph components, and wiki entries, keeping all original sources and content intact (displaying on https://alim.dest.page/), waiting to build a fresh wiki page from scratch upon user prompt.
  Status: Completed
  Origin: "нет удали эту страницу UI и графы которые ты сделал используя скилл /wiki - но оригинальные источники и содержимое не трога, которое на https://alim.dest.page/ отображается. Я потом после удаления с нуля попрошу сделать wiki страницу для персонального сайта"



# Architecture Overview

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4, PostCSS
- **AI SDK**: Vercel AI SDK 5/6 (`ai`, `@ai-sdk/google`, `@ai-sdk/react`)
- **CMS**: MDX via `next-mdx-remote` / local fs in dev / GitHub REST API in prod (`src/app/api/cms/route.ts`)
- **Admin**: `/admin` (dashboard) and `/admin/draft` (AI writing studio)
- **Social Connectors**: Telegram Bot API, Twitter API v2 (`twitter-api-v2`), LinkedIn ugcPosts API

## Public Routes & Knowledge
- **Landing / Headquarters**: `/` (Alim Khalelov overview, posts listing, network links)
- **Projects & Agent Skills**: `/projects` (Showcase of autonomous skills, 16:9 vector engines, SDD specs, and execution checklists)
- **Public Wiki Hub**: `/wiki` (Interactive knowledge matrix for methodologies, architectures, systems, and guides)
- **Blog Reader**: `/blog/[slug]` (MDX reader with Bionic reading support and Copy-to-Agent features)

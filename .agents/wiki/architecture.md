# Architecture Overview

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4, PostCSS
- **AI SDK**: Vercel AI SDK 5/6 (`ai`, `@ai-sdk/google`, `@ai-sdk/react`)
- **CMS**: MDX via `next-mdx-remote` / local fs in dev / GitHub REST API in prod (`src/app/api/cms/route.ts`)
- **Admin**: `/admin` (dashboard) and `/admin/draft` (AI writing studio)
- **Social Connectors**: Telegram Bot API, Twitter API v2 (`twitter-api-v2`), LinkedIn ugcPosts API

## Data Flow
- **Drafting**: User prompts Gemini models via `/api/chat` (streaming response).
- **Publishing**: Content saved to `src/content/posts/<slug>.mdx` directly or committed to GitHub repo via GitHub API.
- **Broadcasting**: `social-publisher.ts` triggers webhooks/API requests to Telegram/Twitter/LinkedIn.

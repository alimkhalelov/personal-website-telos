# Project Memory

## Vision
Minimalistic personal portfolio website with articles for a Demiurge/Vibecoder (Alimzhan). Built on Next.js 15 (App Router), Tailwind CSS v4. Focus on SEO/GEO, clean Avant-Garde minimalism (dark theme default, `next-themes` added).

## Architecture (Demiurge CMS)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4, custom minimalist dark theme.
- **CMS**: **Outstatic** (Git-backed CMS) will be integrated to fulfill the "any device, password+2FA" requirement (via GitHub auth).
- **AI Drafting**: Custom `/admin/draft` feature using Vercel AI SDK **5** (`ai@6.x`, `@ai-sdk/react@3.x`). Built-in "Grill Me" and "Humanizer" flows.
  - ⚠️ **CRITICAL**: `useChat` (SDK 5) uses `sendMessage({text})`, NOT `append({role, content})`. Server must return `toUIMessageStreamResponse()` (SSE + JSON). `toDataStreamResponse()` does NOT exist. Messages are `UIMessage` with `parts[]`, NOT `{content}`. Use `convertToModelMessages()` in route handlers.
- **Typography**: Google Sans fallback (Outfit / Geist Mono).

## Catalog / Index
- `src/app/admin/draft`: AI Drafting room.
- `src/app/blog/[slug]`: MDX renderer.
- `content/articles`: Local Markdown files (until Outstatic fully configured).
- **AI-Wiki Master Hook:** When capturing user intent/requirements (`raw/`), compiling project documentation (`wiki/`), recording architectural invariants, or managing the wiki portal — read `.agents/skills/wiki/SKILL.md` and follow its master router.




## Current Roadmap
- [x] Initial setup (Next.js, Tailwind).
- [x] Configure Dark/Light Minimalist Theme & Typography.
- [x] Implement Main Page & Blog listing.
- [x] Implement MDX CMS system.
- [x] Build AI Drafting Room UI (Grill Me flow).
- [ ] Connect Outstatic for CMS + Auth.
- [ ] Add i18n auto-translation flows.
- [x] Refine landing UI typography and rename blog section.
- [x] Add Pet-Projects Labs gallery UI and prepare pixel hamster placeholder.
- [x] Build personal website public wiki page (/wiki) adhering to /wiki standard.
- [x] Implement showcase strip on home page & dedicated pages for 4 skills/projects (/wiki, /presentation, /skill-visualizer, StyleRef).

## Known Issues & Fixes
- **Vercel AI Streaming**: When streaming raw text back to the client, `result.textStream` (an `AsyncIterable`) MUST be explicitly wrapped in a standard `ReadableStream` on the server before passing to `new Response()`. Passing `AsyncIterable` directly causes Vercel serverless functions to either throw a 500 error or buffer the response and timeout after 10-15s.

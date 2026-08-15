---
title: "Demiurge CMS & AI Drafting Studio"
slug: "demiurge-os"
category: "Systems & Invariants"
tags: ["Next.js 15", "Vercel AI SDK 5", "Gemini 3.1 Pro", "Social Publisher", "Git-Backed CMS"]
summary: "The autonomous publishing platform with multi-model fallback, Grill-Me AI interviews, and cross-social syndication."
version: "v1.2.0-AST"
grounding: "Verified 0% Hallucination"
author: "Alim Khalelov"
relatedPosts: ["llm-agents-loop-engineering-10x", "ai-engineering-evolution"]
relatedProjects: ["project-telos"]
icon: "Database"
order: 7
---

## TL;DR
**Demiurge CMS** is the technical backbone behind `alim.dest.page`. It combines Git-backed sovereign MDX content, Vercel AI SDK 5 real-time streaming, automated social publishing (Telegram, Twitter/X, LinkedIn), and an interactive `/admin/draft` writing room.

---

## Technical Stack

```mermaid
graph TD
    A[Admin User / Demiurge] -->|Interactive Prompt| B[/admin/draft AI Studio]
    B -->|Streaming SSE| C[Gemini 3.1 Pro / 3.5 Flash]
    C -->|Draft Review| B
    B -->|Save / Publish| D[Git-Backed MDX Repository]
    D -->|Social Webhooks| E[Telegram Channel]
    D -->|API v2| F[Twitter / X Thread]
    D -->|ugcPosts API| G[LinkedIn Article]
```

### Architectural Invariants
1. **Multi-Model Fallback Matrix**: Prioritizes `gemini-3.1-pro-preview` with seamless fallback down through `gemini-3.5-flash`, `gemini-3.1-flash-lite`, and `gemini-3.0-flash`.
2. **Vercel AI SDK 5 Compatibility**: Utilizes `useChat` with `sendMessage({text})`, explicit `ReadableStream` wrapping for serverless safety, and `toUIMessageStreamResponse()`.
3. **Atomic Git Ledger**: Every publish and compilation commits to GitHub under author `alimzhan.khalelov@gmail.com`.

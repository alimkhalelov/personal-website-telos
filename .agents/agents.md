# Project Memory

## Vision
Minimalistic personal portfolio website with articles for a Demiurge/Vibecoder (Alimzhan). Built on Next.js 15 (App Router), Tailwind CSS v4, and MDX for local CMS. The focus is on SEO/GEO optimization, clean Avant-Garde minimalism (dark theme, #1e1e1e), and performance. 

## Architecture
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 (minimal custom config, mostly semantic HTML)
- **CMS**: Local Markdown/MDX files parsed via `next-mdx-remote` and `gray-matter`.
- **Typography**: Google Sans (with fallback to similar sans-serifs).

## Catalog / Index
- `src/app`: Next.js App Router root.
- `content/articles`: Directory containing local `.mdx` files.

## Current Roadmap
- [x] Initial setup (Next.js, Tailwind).
- [ ] Configure Dark Minimalist Theme & Typography.
- [ ] Implement Main Page (Header, Bio, YouTube embed, Blog list).
- [ ] Implement MDX CMS system.
- [ ] Optimize SEO/GEO.

---
title: "/wiki — Adaptive AI-Wiki Knowledge Compiler"
category: "Agent Skill"
section: "projects"
date: "2026-06-12"
description: "Adaptive AI-Wiki knowledge compiler, real-project architecture extractor, and hyper-minimalist documentation UI styler."
tags: ["Wiki", "Knowledge Graph", "2-Tier Architecture", "Agent Harness", "Next.js"]
---

# /wiki — Adaptive AI-Wiki Knowledge Compiler

**The /wiki protocol** discovers and classifies **real** project files into a 2-Tier Meta Level hierarchy and generates a hyper-minimalist documentation portal matching the host project's visual identity.

## 🏛️ 1. Two-Tier Meta-Level Information Architecture

Never invent synthetic categories ("Concepts & Methodologies", "Autonomous Systems") or force artificial directory structures. All content is classified into two meta-levels:

1. **🌐 Public (User / Client Facing)**:
   - `Landing / Home`: Product overview, value proposition, entry point.
   - `Blogs / Changelog`: Articles, updates, announcements.
   - `Guides & Specs`: Feature documentation, public API references, getting started.
2. **🔒 Private (Internal / Engineering Harness)**:
   - `Agent Harness & Intent`: `.agents/agents.md`, `.agents/wiki/user_intent.md`.
   - `System Architecture`: Invariants, technical specs, ADRs, internal diagrams.
   - `Scratch & Research`: Discovery notes, temporary experiments.

---

## 🎨 2. Icon-First Hyper-Minimalism Design Directives

Every wiki interface must strictly adhere to intentional minimalism:

1. **Icon-First Controls (No Verbose Text Labels)**:
   - Replace wordy buttons ("Show properties", "Hide properties", "Search docs...", "Share", "Copy") with clean, single-action icons (`ChevronDown`, `Search`, `Share2`, `Copy`).
2. **Zero Outlines & Frames**:
   - Strictly `border-none` / remove all CSS borders and dividers.
   - Where visual grouping is needed, use subtle solid background pods (`bg-zinc-100` / `dark:bg-zinc-800/50`).
3. **Monochrome Palette**:
   - Neutral monochrome tones (`#111111` dark, `#F6F5F4` light). No neon glowing tags or rainbow badges.
4. **Left-Aligned Content**:
   - Headers, navigation, properties, and prose are strictly left-aligned (`text-left`).
5. **Host DNA Inheritance**:
   - Automatically inherit fonts and background/foreground colors directly from the host project.

---

## ⚙️ 3. SDD Architecture Specification

- **Inputs Contract**: Root Markdown files (`*.md`, `*.mdx`), `.agents/` memory trees, search query tokens.
- **Outputs Contract**: Typed `WikiPage` registry, 3-column & 2-column reactive `DocsLayout`, sub-millisecond search index.
- **Invariants**: Strict 2-Tier routing, zero synthetic folder creation, solid-pod UI grouping.

## 🛠️ Build & Verification Plan

- [x] Implement dynamic directory file discovery via `node:fs` and `gray-matter`.
- [x] Build icon-first minimalist 3-column `DocsLayout` with keyboard shortcut (⌘K).
- [x] Configure static App Router routes for `/wiki` and `/wiki/[slug]`.
- [x] Verify sub-millisecond search performance and copy-to-clipboard actions.

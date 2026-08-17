---
title: "StyleRef — Generative Visual Styles & Prompt DB"
category: "Visual DB"
section: "projects"
date: "2026-08-10"
description: "Curated Reference Matrix & Prompt Engineering Database for Generative Art (19 Master Styles)."
tags: ["Generative Art", "Prompt Engineering", "StyleRef", "Midjourney", "Flux", "Visual DB"]
---

# StyleRef — Generative Visual Styles & Prompt Database

Comprehensive visual intelligence matrix cataloging **19 curated master styles** (Jakub Różalski, Simon Stålenhag, Zdzisław Beksiński, Kentaro Miura, Witcher 3, Hideaki Anno, Ian McQue, Alex Ross, Bruce Timm, Studio 4°C, Castlevania Nocturne, Blue Eye Samurai, Eminence in Shadow, and more).

---

## 🎨 1. The 6-Axis Style Deconstruction Matrix

Every artistic style is deconstructed along 6 precise mathematical and visual dimensions:

1. **Medium & Technique**: Oil on canvas, cel animation still, gouache on paper, digital brushstrokes, linework density.
2. **Core Concept & Narrative**: Alternate history, dystopian surrealism, high-altitude junkpunk, psychological mecha.
3. **Composition & Perspective**: Forced low-angle, extreme depth of field, wide-angle atmospheric scale, spatial distortion.
4. **Characters & Tech Detail**: Proportions, anatomical blocking, mechanical hardware, attire, textural layering.
5. **Lighting & Volumetrics**: Chiaroscuro contrast, volumetric haze, rim backlighting, ambient phosphor glow.
6. **Color Palette & Mood**: Desaturated base tones, isolated vibrant accent banners, emotional temperature.

---

## 🚀 2. Interactive Features & Prompt Synthesis

- **Instant Search**: Real-time filtering by artist name, medium, mood vector, or aesthetic tag.
- **1-Click Prompt Copy**: Generates formatted, weighted prompts ready for direct execution in Midjourney, Flux, or Stable Diffusion.
- **High-Res Inspection Modal**: Visual modal viewer with image comparison and attribute drill-down.

---

## ⚙️ 3. SDD Specification & Invariants

- **Inputs**: 19 local style reference assets (`public/styleref/img_01..19.jpeg`), structured attributes schema.
- **Outputs**: Interactive responsive gallery with accessible modal inspector and clipboard synthesis.
- **Invariants**: 100% local image asset availability, zero broken external CDNs, instantaneous prompt clipboard copy.

## 🛠️ Build & Verification Plan

- [x] Ingest and verify 19 high-resolution style reference images.
- [x] Structure typed database schema in `src/lib/styles-data.ts`.
- [x] Build interactive `StyleRefGalleryView` with search and modal inspector.
- [x] Test clipboard copy action and negative prompt filters.

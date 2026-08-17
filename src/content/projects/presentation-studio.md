---
title: "/presentation — Strategic Deck & Motion Studio"
category: "Agent Skill"
section: "projects"
date: "2026-07-04"
description: "Interactive Strategic Deck & Storytelling Studio based on the 10 Communication Scenarios Matrix, teleprompter, and micro-animations."
tags: ["Presentation", "Motion", "10 Vectors", "Storytelling", "Deck Engine"]
---

# /presentation — Strategic Deck & Motion Storytelling Studio

Creates cinematic, interactive HTML presentations matching the design and narrative standards of **Higgsfield AI**, **Apple Keynote**, and **Linear**, powered by the **10 Communication Scenarios Matrix**.

---

## 🎯 1. The 10 Communication Scenarios Matrix

Never write slides blindly. Every presentation is calibrated to a specific communication vector:

1. **Upward (Subordinate → Manager)**: Minto Pyramid, status, risk mitigation, approval ask.
2. **Downward (Leader → Team)**: Big Picture vision, OKRs, ownership, milestones.
3. **Peer-to-Peer (Cross-Functional)**: Zero blockers, inter-team handoffs, API/Gantt schedules.
4. **Strategic (Team → C-Level / Board)**: Macro P&L impact, market share, capital allocation.
5. **Pitch Deck (Founder → Investors)**: Market pain, proprietary moat, traction, TAM, The Ask.
6. **B2B Sales (Product → Enterprise)**: Status quo losses → Solution → Proven ROI (Before/After).
7. **B2C Marketing (Product → Consumers)**: JTBD, hero's journey, instant magic, social proof.
8. **Delegation (Client → Contractor)**: PRD, technical constraints, Definition of Done (DoD).
9. **DevRel / Tech Talk (Expert → Devs)**: Under the hood deep dive, architecture, failure traps, code.
10. **Advisory (Mentee → Advisor)**: Current state → Tested hypotheses → Specific bottleneck drill-down.

---

## ⏱️ 2. The Law of "One Idea = One Slide"

- **Timing Formula**: Pacing is $\approx 20 - 30$ seconds per slide.
  $$\text{Slide Count} \approx \frac{\text{Total Available Time (Minutes)} \times 60}{25 \text{ seconds}}$$
- **Teleprompter Mode (`S`)**: Every slide includes 50–120 words of spoken Russian script with bold anchor highlights.
- **Keyboard Navigation**: `←`, `→`, `Space`, `F` for fullscreen, `S` for notes.

---

## ⚙️ 3. SDD Specification & Invariants

- **Inputs**: Vector selection from 10 Matrix, target duration, spoken script notes.
- **Outputs**: Self-contained HTML5/CSS3/JS deck engine with hardware-accelerated transitions.
- **Invariants**: Zero crowded bullet walls, 100vh viewport fit, instant teleprompter toggle.

## 🛠️ Build & Verification Plan

- [x] Structure 10 Communication Scenarios Matrix with pacing calculator.
- [x] Implement keyboard event listener engine (`←`/`→`, `Space`, `S`, `F`).
- [x] Build Emil-grade `.motion-reveal` staggered animation classes.
- [x] Verify presenter teleprompter notes drawer and responsive viewport scaling.

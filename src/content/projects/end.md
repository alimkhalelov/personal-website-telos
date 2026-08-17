---
title: "/end — End-of-Session Ritual & Memory Keeper"
category: "Agent Skill"
section: "projects"
date: "2026-08-05"
description: "Autonomous task audit, mistake retrospective, living memory persistence to .agents/agents.md, and atomic Git commit cleanup."
tags: ["Session Lifecycle", "Living Memory", "Git Automation", "Harness"]
---

# /end — End-of-Session Ritual & Memory Keeper

The **`/end`** skill enforces a disciplined, proactive closing ritual for agentic AI pairing sessions, ensuring zero context loss, clean working trees, and verified author attribution.

---

## 💎 Core Philosophy & The 4-Phase Lifecycle

When an engineer finishes a deep coding session, manual cleanup is error-prone: uncommitted files are forgotten, dangling dev servers consume CPU, and the next session lacks memory of what happened.

`/end` automates this through 4 sequential gates:

```
[Phase 0: Completion Gate] ──> [Phase 1: Task Audit & Retro] ──> [Phase 2: Memory Sync] ──> [Phase 3: Clean & Push]
  Check WIP & Blockers          Audit Done vs Failed Tasks        Update agents.md & Next Steps   Kill Tasks & Git Commit
```

---

## ⚙️ Invariants & Security Rules

1. **Zero Delegated Cleanup**: The agent performs all audit, memory update, and git tasks proactively without asking the user to do tedious maintenance.
2. **Git Author Protection**: All Git commits strictly enforce `alimzhan.khalelov@gmail.com` to prevent Vercel Hobby team deployment lockouts.
3. **.gitignore Verification**: The working tree is verified to exclude `node_modules`, `.next`, and `.env` before any `git add` execution.
4. **Actionable Next Steps**: The memory file must contain concrete, immediate next steps so any subsequent session can resume instantaneously.

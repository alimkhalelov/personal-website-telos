# Showcase Project Schema & Architectural Reference

## 1. TypeScript Interface Definition

```typescript
export interface VisualizerNode {
  id: string;            // e.g. "01"
  step: string;          // e.g. "01"
  title: string;         // e.g. "Discovery & Vector Selection"
  accent: string;        // Hex color e.g. "#38bdf8", "#d1fe17", "#c084fc", "#fbbf24"
  description: string[]; // 3 concise bullet-free description points
}

export interface SDDSpec {
  inputs: string[];
  outputs: string[];
  invariants: string[];
  coreEngine: string;
  dataStructures: string[];
  stateMachine: string[];
}

export interface ChecklistPhase {
  phase: string;
  tasks: { label: string; done: boolean; description?: string }[];
}

export interface TestSuite {
  suite: string;
  tests: { label: string; passed: boolean; assertion: string }[];
}

export interface ProjectDetail {
  slug: string;                                          // URL slug (e.g. "my-tool")
  title: string;                                         // Display title
  command: string;                                       // e.g. "/my-tool"
  category: "agent-skill" | "engine" | "gallery" | "system";
  tag: string;                                           // e.g. "Vector Engine"
  accentColor: string;                                   // Primary hex accent
  accentGradient: string;                                // Tailwind gradient class
  initiationDate: string;                                // ISO "YYYY-MM-DD"
  dateDisplay: string;                                   // "Mon YYYY" (e.g. "Aug 2026")
  timeAgo: string;                                       // "2 weeks ago", "1 month ago"
  tldr: string;                                          // 1-2 sentence core value
  headline: string;                                      // Subtitle / headline
  demoUrl: string;                                       // "/projects/<slug>#demo" or external
  demoType: "wiki" | "presentation" | "skill-visualizer" | "styleref";
  demoLabel: string;                                     // "Launch Demo"
  badges: string[];                                      // 3-5 keywords
  overview: string;                                      // Paragraph explanation
  generativeTheme: "neon-cyan" | "lime-cyber" | "purple-matrix" | "amber-brutalism";
  visualizer: {
    heroTitle: string;
    subNamespace: string;
    nodes: VisualizerNode[];
  };
  specSDD: SDDSpec;
  buildChecklist: ChecklistPhase[];
  testChecklist: TestSuite[];
}
```

---

## 2. Dynamic Density Scaling for 16:9 Visualizer

| Node Count | Card Width | Card Height | Title Size | Body Size | Line Spacing (dy) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **3 Nodes** | `410px` | `280px` | `26px bold` | `19px` | `30px` |
| **4 Nodes** | `315px` | `265px` | `22px bold` | `16.5px` | `27px` |
| **5 Nodes** | `255px` | `255px` | `20px bold` | `15px` | `25px` |
| **6+ Nodes** | `210px` | `240px` | `18px bold` | `14px` | `23px` |

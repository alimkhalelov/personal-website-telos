import { ProjectDetail } from "@/lib/projects-data";

export const NEW_PROJECT_TEMPLATE: ProjectDetail = {
  slug: "my-new-skill",
  command: "/my-new-skill",
  title: "New Agent Tool Title",
  headline: "High-impact subtitle summarizing the core capability",
  category: "agent-skill",
  tag: "Core Engine",
  accentColor: "#38bdf8",
  accentGradient: "from-sky-500/20 via-blue-600/10 to-transparent",
  initiationDate: "2026-08-17",
  dateDisplay: "Aug 2026",
  timeAgo: "today",
  tldr: "Hyper-concise 1-2 sentence summary of what this tool does and why it matters.",
  demoUrl: "/projects/my-new-skill#demo",
  demoType: "skill-visualizer",
  demoLabel: "Launch Interactive Demo",
  badges: ["Feature 1", "Feature 2", "Feature 3"],
  overview: "Detailed paragraph explaining the tool, architecture, and motivation.",
  generativeTheme: "neon-cyan",
  visualizer: {
    heroTitle: "New Agent Tool Architecture",
    subNamespace: "skill/my-new-skill",
    nodes: [
      {
        id: "01",
        step: "01",
        title: "Ingestion & Analysis",
        accent: "#38bdf8",
        description: [
          "Parse raw input vectors and context",
          "Extract domain entities and constraints",
          "Validate schema invariants"
        ]
      },
      {
        id: "02",
        step: "02",
        title: "Transformation Loop",
        accent: "#818cf8",
        description: [
          "Execute multi-turn reasoning steps",
          "Perform automated quality assertions",
          "Synthesize deterministic intermediate state"
        ]
      },
      {
        id: "03",
        step: "03",
        title: "Deterministic Output",
        accent: "#34d399",
        description: [
          "Generate final production artifacts",
          "Stream live telemetry to client UI",
          "Persist atomic transaction ledger"
        ]
      }
    ]
  },
  specSDD: {
    inputs: ["Raw user prompt", "Project schema", "Configuration tokens"],
    outputs: ["Compiled artifacts", "Interactive UI view", "Telemetry logs"],
    invariants: ["Zero external latency bloat", "Deterministic validation", "100% type safety"],
    coreEngine: "Lightweight client/server reactive pipeline with instant feedback loops.",
    dataStructures: ["interface ToolConfig { id, mode, params }"],
    stateMachine: ["Idle -> Ingest -> Transform -> Assert -> Output"]
  },
  buildChecklist: [
    {
      phase: "Phase 1: Architecture & Data Layer",
      tasks: [
        { label: "Define TypeScript contracts and schema", done: true },
        { label: "Implement core algorithm and test cases", done: true }
      ]
    },
    {
      phase: "Phase 2: UI & Showcase Integration",
      tasks: [
        { label: "Mount route and interactive demo runner", done: true },
        { label: "Add 16:9 Skill Visualizer SVG diagram", done: true }
      ]
    }
  ],
  testChecklist: [
    {
      suite: "Core Contracts",
      tests: [
        { label: "Input schema validation passes without throw", passed: true, assertion: "assert.strictEqual(validate(input), true)" },
        { label: "Output payload matches expected interface", passed: true, assertion: "assert.deepEqual(typeof output, 'object')" }
      ]
    }
  ]
};

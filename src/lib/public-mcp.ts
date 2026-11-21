export interface PublicToolDef {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required?: string[];
  };
}

export interface PublicProjectSummary {
  slug: string;
  title: string;
  subtitle: string;
  tldr: string;
  overview: string;
  caseStudyUrl: string;
  demoUrl: string;
  badges: string[];
}

export const PUBLIC_PROJECTS: PublicProjectSummary[] = [
  {
    slug: "tempo",
    title: "Tempo",
    subtitle: "Precision Progressive Interval and Pacing Visualizer",
    tldr: "Browser-native interval HUD decomposing workouts into symmetric Push-Pull stages with dual-axis zoom and a 60 FPS procedural SVG inverse kinematics runner.",
    overview: "Tempo eliminates the psychological drag of flat countdown timers by breaking target durations into balanced midpoint-anchored milestones.",
    caseStudyUrl: "https://alim.dest.page/projects/tempo",
    demoUrl: "https://alimkhalelov.github.io/tempo/",
    badges: ["Harmonic Intervals", "Procedural IK Runner", "60 FPS Kinematics", "Zero Dependencies"],
  },
  {
    slug: "ocus",
    title: "Ocus",
    subtitle: "EU Crypto Compliance, Banking and Operations OS",
    tldr: "Institutional operations system translating EU MiCA, DORA, and DAC8 directives into an executable 31-node compliance DAG and 15-week Gantt cockpit.",
    overview: "Ocus turns dense European regulatory directives into deterministic dependency graphs with real-time critical path highlighting.",
    caseStudyUrl: "https://alim.dest.page/projects/ocus",
    demoUrl: "https://ocus-eu.vercel.app",
    badges: ["MiCA and DORA DAG", "Critical Path Engine", "15-Week Gantt", "Banking Readiness"],
  },
  {
    slug: "residual-intellect",
    title: "Residual Intellect",
    subtitle: "AI Tech Radar and Automated Telegram Dispatch",
    tldr: "Neo-brutalist radar tracking 16+ classic sci-fi forecasts against modern tech launches alongside a daily automated AI digest channel.",
    overview: "Pairs an interactive prediction archive (52-year average forecast lag) with automated daily AI research briefings on Telegram.",
    caseStudyUrl: "https://alim.dest.page/projects/residual-intellect",
    demoUrl: "https://alimkhalelov.github.io/residual-intellect/",
    badges: ["Automated AI Digest", "Interactive Archive", "Editorial UX"],
  },
  {
    slug: "goal-classifier",
    title: "Plain",
    subtitle: "The Simple Planner",
    tldr: "Minimalist goal clarity workspace evaluating objectives across 4 dimensions with Web Crypto AES-GCM encrypted client-side BYOK AI decomposition.",
    overview: "Diagnoses goals across Goal Statement, Time Horizon, Execution Plan, and Habit Regularity without requiring server-side API key storage.",
    caseStudyUrl: "https://alim.dest.page/projects/goal-classifier",
    demoUrl: "https://alimkhalelov.github.io/goal-classifier/",
    badges: ["Web Crypto AES-GCM", "BYOK AI Planning", "Zero-Build UI"],
  },
  {
    slug: "nebuly",
    title: "Nebuly",
    subtitle: "Weekly AI Brief and Executive Telemetry Platform",
    tldr: "Executive intelligence prototype linking enterprise AI adoption briefs with OHLC conversation telemetry and multi-order consequence modeling.",
    overview: "Bridges C-suite narrative storytelling with verifiable session telemetry and guardrailed cross-functional enablement.",
    caseStudyUrl: "https://alim.dest.page/projects/nebuly",
    demoUrl: "https://alimkhalelov.github.io/nebuly/",
    badges: ["OHLC Telemetry", "Decision Modeling", "AI Analytics"],
  },
];

export const PUBLIC_PROFILE = {
  name: "Alim Khalelov",
  alternateName: "Alimzhan Khalelov",
  role: "AI-Native Product Manager",
  experienceYears: "5+",
  summary:
    "Product Manager with 5+ years shipping 0-to-1 products across AI and Web3 startups. Focused on multi-agent systems, LLM evaluation pipelines, and rapid prototyping in code.",
  highlights: [
    "Scaled product launch from 0 to 10,000 users in 30 days",
    "Built automated multi-channel content distribution across 50+ platforms",
    "GameDev AI Hackathon 2025 Winner and AI News Marketing Hackathon Winner",
  ],
  skills: [
    "0-to-1 Product Discovery",
    "Multi-Agent Systems",
    "LLM Evals and Decision Routing",
    "Rapid Prototyping in TypeScript and Next.js",
    "Generative Engine Optimization (GEO)",
  ],
  website: "https://alim.dest.page",
  resumePdf: "https://alim.dest.page/resume.pdf",
  bookingUrl: "https://cal.com/alim-xjzgyu/30min",
};

export const PUBLIC_CONTACT = {
  email: "alim.khalelov@gmail.com",
  telegram: "https://t.me/AlimLLC",
  linkedin: "https://www.linkedin.com/in/alimzhan-khalelov",
  github: "https://github.com/alimkhalelov",
  resumePdf: "https://alim.dest.page/resume.pdf",
  bookingUrl: "https://cal.com/alim-xjzgyu/30min",
};

export const PUBLIC_MCP_TOOLS: PublicToolDef[] = [
  {
    name: "get_profile",
    description: "Get Alim Khalelov's verified public biography, role focus, product outcomes, and core capabilities.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_projects",
    description: "List all public flagship shipped projects and live prototype URLs.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_project_details",
    description: "Get architecture overview, badges, live demo URL, and case study details for one public project slug.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Public project slug: tempo, ocus, residual-intellect, goal-classifier, or nebuly.",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "get_contact_and_booking",
    description: "Get verified contact channels, PDF resume link, and 30-minute Cal.com booking URL.",
    inputSchema: { type: "object", properties: {} },
  },
];

/** Pure read-only tool executor shared identically by browser WebMCP and /api/mcp JSON-RPC. */
export function executePublicMcpTool(name: string, args: Record<string, unknown> = {}) {
  switch (name) {
    case "get_profile":
      return { ok: true, data: PUBLIC_PROFILE };
    case "list_projects":
      return {
        ok: true,
        data: PUBLIC_PROJECTS.map(({ slug, title, subtitle, caseStudyUrl, demoUrl, tldr }) => ({
          slug,
          title,
          subtitle,
          caseStudyUrl,
          demoUrl,
          tldr,
        })),
      };
    case "get_project_details": {
      const cleanSlug = String(args.slug || "").trim().toLowerCase();
      const found = PUBLIC_PROJECTS.find((p) => p.slug === cleanSlug);
      if (!found) {
        return {
          ok: false,
          error: `Unknown public project slug. Available slugs: ${PUBLIC_PROJECTS.map((p) => p.slug).join(", ")}`,
        };
      }
      return { ok: true, data: found };
    }
    case "get_contact_and_booking":
      return { ok: true, data: PUBLIC_CONTACT };
    default:
      return { ok: false, error: `Unknown tool: ${name}` };
  }
}

export interface VisualizerNode {
  id: string;
  step: string;
  title: string;
  accent: string;
  description: string[];
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
  slug: string;
  title: string;
  subtitle?: string;
  command: string;
  category: "agent-skill" | "engine" | "gallery" | "system" | "app";
  tag: string;
  accentColor: string;
  accentGradient: string;
  initiationDate: string;
  dateDisplay: string;
  timeAgo: string;
  tldr: string;
  headline: string;
  demoUrl: string;
  demoType: "wiki" | "presentation" | "skill-visualizer" | "styleref" | "bloobs" | "teamwork" | "boost" | "tempo" | "ocus";
  demoLabel: string;
  badges: string[];
  overview: string;
  generativeTheme: "neon-cyan" | "lime-cyber" | "purple-matrix" | "amber-brutalism" | "prism-spectrum" | "emerald-terminal";
  thumbnailSrc?: string;
  iconSrc?: string;
  isPublic?: boolean;
  appStoreLayout?: boolean;
  aspectRatio?: "9/16" | "16/9";
  screenshots?: string[];
  visualizer: {
    heroTitle: string;
    subNamespace: string;
    nodes: VisualizerNode[];
  };
  specSDD: SDDSpec;
  buildChecklist: ChecklistPhase[];
  testChecklist: TestSuite[];
}

export const SHOWCASE_PROJECTS: ProjectDetail[] = [
  // 0. Tempo (Public flagship App Store project)
  {
    slug: "tempo",
    command: "/tempo",
    title: "Tempo",
    subtitle: "Precision Progressive Interval & Pacing Visualizer",
    headline: "Zero-dependency progressive interval telemetry HUD & procedural runner kinematics for endurance athletes",
    category: "app",
    tag: "Kinematics & Interval Telemetry",
    accentColor: "#38bdf8",
    accentGradient: "from-sky-500/20 via-indigo-600/10 to-transparent",
    initiationDate: "2026-11-05",
    dateDisplay: "Nov 2026",
    timeAgo: "Today",
    thumbnailSrc: "/projects/tempo/01-tempo-brand-hero.png",
    iconSrc: "/projects/tempo/icon.svg",
    tldr: "A zero-dependency browser-native interval HUD for runners and HIIT athletes that decomposes any timeframe into balanced symmetric stages (9 -> 6 -> 5 -> 3 -> 2 -> 3 -> 5 -> 6 -> 9), dual-axis cinematic zoom, and a 60 FPS procedural inverse kinematics runner.",
    demoUrl: "https://alimkhalelov.github.io/tempo/",
    demoType: "tempo",
    demoLabel: "Launch Live Tempo HUD",
    badges: ["Harmonic Intervals", "Push & Pull Engine", "Procedural IK Runner", "60 FPS Kinematics", "Zero Dependencies"],
    overview: "Tempo eliminates the psychological drag of static countdown timers. By decomposing target durations into symmetric Push & Pull stages with a halfway equator, runners experience accelerating progress toward the midpoint and gravitational pull toward the finish line.",
    generativeTheme: "neon-cyan",
    isPublic: true,
    appStoreLayout: true,
    screenshots: [
      "/projects/tempo/01-tempo-brand-hero.png",
      "/projects/tempo/02-crush-fatigue.png",
      "/projects/tempo/03-surge-past-equator.png",
      "/projects/tempo/04-lock-in-your-zone.png",
      "/projects/tempo/05-rig-any-treadmill.png",
    ],
    visualizer: {
      heroTitle: "TEMPO_KINEMATICS_PIPELINE",
      subNamespace: "interval.hud.procedural_ik.v1",
      nodes: [
        {
          id: "node-1",
          step: "01",
          title: "Harmonic Stage Decomposition",
          accent: "text-sky-400",
          description: [
            "Evaluates divisor candidates k in [2, 12] via roundness scoring",
            "Generates symmetric Push (9->6->5->3->2) and Pull (2->3->5->6->9) stages",
            "Guarantees mandatory halfway equator milestone at k=2",
          ],
        },
        {
          id: "node-2",
          step: "02",
          title: "Dual-Axis Cinematic Camera",
          accent: "text-indigo-400",
          description: [
            "Active segment zoom scales up to 4.8x on immediate sub-interval",
            "Eliminates perceived exertion by focusing solely on the immediate milestone",
            "Sinusoidal sweep transitions (4200ms) provide macro progress context",
          ],
        },
        {
          id: "node-3",
          step: "03",
          title: "Procedural IK Runner Kinematics",
          accent: "text-emerald-400",
          description: [
            "60 FPS pure SVG inverse kinematics with dual-bounce CoG oscillation",
            "Trigonometric leg linkage with non-linear swing-phase knee flexion",
            "Anti-phase upper body counter-balance arms swinging in opposite phase",
          ],
        },
        {
          id: "node-4",
          step: "04",
          title: "Zero-Dependency Runtime",
          accent: "text-amber-400",
          description: [
            "Pure vanilla TypeScript / SVG architecture with zero external libraries",
            "Single 52 KB bundle footprint with hardware-accelerated transforms",
            "Deployable instantly to any browser, mobile screen, or treadmill tablet",
          ],
        },
      ],
    },
    specSDD: {
      inputs: [
        "Target workout duration in minutes (e.g. 17 min, 45 min, 60 min)",
        "Playback controls (Play, Pause, Reset, Fast Forward 2x/4x)",
        "Telemetry HUD toggles (IK Runner, Metric Pacing, Audio Cadence)",
      ],
      outputs: [
        "Symmetric Push & Pull interval stage matrix",
        "Active segment high-magnification camera zoom",
        "Procedural 60 FPS skeletal runner SVG animation",
        "Auditory cadence beeps on milestone transitions",
      ],
      invariants: [
        "Halfway equator milestone (k=2) is mathematically invariant across all durations",
        "Locked 60 FPS animation loop with requestAnimationFrame and performance.now()",
        "Zero external CSS or JS dependencies (single self-contained payload)",
      ],
      coreEngine: "Dynamic Harmonic Push & Pull Divisor Matrix with Procedural Trigonometric Linkages",
      dataStructures: [
        "IntervalStage { index: number, durationSec: number, splits: number, label: string }",
        "KinematicJointState { hipAngle: number, kneeAngle: number, ankleAngle: number, cogOffset: number }",
        "CameraTransform { zoom: number, offsetX: number, transitionProgress: number }",
      ],
      stateMachine: [
        "IDLE -> COMPUTING_HARMONICS: duration input parsed into divisor candidates",
        "COMPUTING_HARMONICS -> RUNNING: stage timeline generated and ticker starts",
        "RUNNING -> EQUATOR_SURGE: halfway mark triggers milestone celebration sweep",
        "EQUATOR_SURGE -> PULL_PHASE: countdown intervals expand toward finish line",
        "PULL_PHASE -> COMPLETED: workout telemetry finalized and summary shown",
      ],
    },
    buildChecklist: [
      {
        phase: "Phase 1: Harmonic Divisor Algorithm",
        tasks: [
          { label: "Implement roundness and modulo scoring function for divisor candidates", done: true },
          { label: "Enforce mandatory halfway equator milestone at k=2", done: true },
          { label: "Generate Push & Pull symmetric timeline array", done: true },
        ],
      },
      {
        phase: "Phase 2: Procedural IK Runner & Viewport",
        tasks: [
          { label: "Implement 60 FPS trigonometric skeletal linkages for hips and knees", done: true },
          { label: "Add double vertical bounce Center-of-Gravity (CoG) displacement", done: true },
          { label: "Build dual-axis camera zoom and milestone sweep easing curves", done: true },
        ],
      },
      {
        phase: "Phase 3: Zero-Dependency Single Bundle",
        tasks: [
          { label: "Package telemetry HUD into self-contained 52 KB asset", done: true },
          { label: "Publish live production build to alimkhalelov.github.io/tempo", done: true },
          { label: "Generate 5 high-converting App Store panoramic screenshot assets", done: true },
        ],
      },
    ],
    testChecklist: [
      {
        suite: "Harmonic Divisor Math",
        tests: [
          { label: "Divisor candidates score correctly for standard 45m workout", passed: true, assertion: "splits.length === 9 && equatorIndex === 4" },
          { label: "Non-standard 17m workout decomposes without fractional seconds drift", passed: true, assertion: "totalDuration === 1020 && errorMargin < 0.001" },
        ],
      },
      {
        suite: "Kinematics & Rendering",
        tests: [
          { label: "Procedural runner executes locked 60 FPS without layout thrashing", passed: true, assertion: "frameDropCount === 0 && deltaT <= 16.7ms" },
          { label: "Camera zoom scale remains within [1.0, 4.8] bounds", passed: true, assertion: "cameraZoom >= 1.0 && cameraZoom <= 4.8" },
        ],
      },
    ],
  },
  // 0b. Ocus (Unified Public Flagship 16:9 App Store project - Landing & Platform)
  {
    slug: "ocus",
    command: "/ocus",
    title: "Ocus",
    subtitle: "EU Crypto Compliance, Banking & Operations OS",
    headline: "From 1,000+ pages of EU MiCA & DORA directives to an actionable 31-node operations DAG and interactive launch cockpit",
    category: "app",
    tag: "Crypto Compliance & Banking OS",
    accentColor: "#10b981",
    accentGradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    initiationDate: "2026-11-07",
    dateDisplay: "Nov 2026",
    timeAgo: "1 day ago",
    thumbnailSrc: "/projects/ocus/01-ocus-brand-reveal.png",
    iconSrc: "/projects/ocus/icon.svg",
    tldr: "An institutional operating system that translates complex EU regulatory directives (MiCA, DORA, DAC8) into an executable 31-node operations DAG and an interactive launch cockpit with real-time critical path calculation, 15-week Gantt milestones, and Tier-1 banking integrations.",
    demoUrl: "https://ocus-eu.vercel.app",
    demoType: "ocus",
    demoLabel: "Launch Ocus OS & Platform",
    badges: ["EU MiCA Ready", "DORA Compliant", "Operations DAG", "Critical Path Engine", "15-Week Gantt", "Tier-1 Banking Rails", "ESMA Sync"],
    overview: "Ocus eliminates months of regulatory friction and millions in legal advisory costs. By converting thousands of pages of ESMA guidelines and EU directives into a deterministic Directed Acyclic Graph (DAG) paired with an interactive operational launch cockpit, crypto asset service providers (CASPs) achieve operational compliance, banking safeguarding, and supervisory authorization in 15 weeks.",
    generativeTheme: "emerald-terminal",
    isPublic: true,
    appStoreLayout: true,
    aspectRatio: "16/9",
    screenshots: [
      "/projects/ocus/01-ocus-brand-reveal.png",
      "/projects/ocus/02-crush-compliance.png",
      "/projects/ocus/03-surge-critical-path.png",
      "/projects/ocus/04-lock-in-banking.png",
      "/projects/ocus/05-rig-launch-cockpit.png",
    ],
    visualizer: {
      heroTitle: "OCUS_COMPLIANCE_AND_OPERATIONS_ENGINE",
      subNamespace: "eu.crypto.compliance.cockpit.v1",
      nodes: [
        {
          id: "node-1",
          step: "01",
          title: "Directive Ingestion & Atomization",
          accent: "text-emerald-400",
          description: [
            "Parses 1,000+ pages of EU MiCA, DORA, and DAC8 legal articles into atomic requirements",
            "Maps regulatory obligations into deterministic inputs, checks, and evidence gates",
            "Eliminates ambiguity with legal citation anchoring to ESMA supervisory standards",
          ],
        },
        {
          id: "node-2",
          step: "02",
          title: "Operational DAG & Critical Path",
          accent: "text-teal-400",
          description: [
            "Generates 31 interconnected operational nodes across entity, technical, and risk domains",
            "Calculates topological critical paths to identify single-point-of-failure bottlenecks",
            "Adapts dynamic checklists for Crypto Brokers, Staking Providers, and Stablecoin Issuers",
          ],
        },
        {
          id: "node-3",
          step: "03",
          title: "Interactive Launch Cockpit",
          accent: "text-sky-400",
          description: [
            "Interactive node topology map with dynamic zoom and real-time 48% readiness dial",
            "15-week Gantt execution timeline tracking milestones across all regulatory phases",
            "Dynamic capital adequacy modeling comparing regulatory floor (€350k) with maintained buffer (€500k)",
          ],
        },
        {
          id: "node-4",
          step: "04",
          title: "Institutional Rails & Telemetry",
          accent: "text-indigo-400",
          description: [
            "Pre-packaged safeguarding account structures and fiat rails with Clear Junction",
            "Pre-configured MPC security blueprints with Fireblocks and Cobo custody",
            "Continuous automated sync with ESMA and national supervisory registers with live drift alerts",
          ],
        },
      ],
    },
    specSDD: {
      inputs: [
        "CASP business profile (Crypto Broker, Staking Provider, Stablecoin Issuer, Custody)",
        "Target EU incorporation jurisdiction (CySEC, AMF, BaFin, Malta, Lithuania)",
        "Initial capital reserves and projected safeguarding volume",
        "Selected vendor infrastructure (Fireblocks, Clear Junction, Cobo)",
        "Active portal state toggles (In Progress, Blocked, Done)",
      ],
      outputs: [
        "Executable 31-node compliance operations DAG with critical path timeline",
        "Interactive SVG dependency visualization with real-time readiness gauge",
        "15-week Gantt execution schedule with milestone audit dossiers",
        "Pre-packaged institutional bank passport dossier with AML safeguarding structure",
        "Live supervisory telemetry feed tracking ESMA register updates",
      ],
      invariants: [
        "Zero-drift compliance with ESMA RTS and EBA regulatory technical standards",
        "Critical path recalculates instantaneously upon any node duration or dependency edit",
        "Safeguarding funds strictly segregated with Tier-1 European credit institutions",
        "Minimum capital requirements (€125k to €350k base + risk buffer) mathematically enforced",
      ],
      coreEngine: "Deterministic DAG Topological Solver & Interactive Cockpit Engine",
      dataStructures: [
        "interface ComplianceNode { id: string; category: 'entity' | 'capital' | 'safeguarding' | 'tech'; status: 'passed' | 'pending' | 'blocked'; prereqs: string[]; durationWeeks: number; }",
        "interface LaunchCockpitState { activeView: 'map' | 'plan' | 'rules' | 'model'; readinessScore: number; criticalPathWeeks: number; }",
        "interface BankingPassport { caspId: string; safeguardingIban: string; tier1Bank: string; amlPackVerified: boolean; capitalVerified: number; }",
      ],
      stateMachine: [
        "DRAFT -> INTAKE_PROFILED -> DAG_SYNTHESIZED -> COCKPIT_ACTIVE -> SAFEGUARDING_FILED -> REGULATOR_REVIEW -> PASSPORTED_ACTIVE",
      ],
    },
    buildChecklist: [
      {
        phase: "Phase 1: Directive Atomization & DAG Engine",
        tasks: [
          { label: "MiCA & DORA Legal Parser", done: true, description: "Extract 31 atomic compliance checkpoints from EU directives." },
          { label: "Topological Dependency Graph", done: true, description: "Build DAG with critical path solver and duration estimator." },
          { label: "CASP Profile Generator", done: true, description: "Tailored roadmaps for Broker, Staking, and Stablecoin architectures." },
        ],
      },
      {
        phase: "Phase 2: Interactive Cockpit & Gantt Schedule",
        tasks: [
          { label: "Vector Node Topology Canvas", done: true, description: "SVG graph canvas with force layout, category clustering, and readiness dial." },
          { label: "15-Week Timeline Builder", done: true, description: "Interactive Gantt bar chart across 4 regulatory phases." },
          { label: "Regulatory Diff Engine", done: true, description: "Changelog viewer highlighting modifications to EU crypto guidelines." },
        ],
      },
      {
        phase: "Phase 3: Banking Rails & Supervisory Telemetry",
        tasks: [
          { label: "Clear Junction Rail Integration", done: true, description: "Pre-package institutional safeguarding and fiat rails." },
          { label: "Fireblocks & Cobo Blueprint", done: true, description: "Pre-configured MPC security architecture and key governance." },
          { label: "Capital Adequacy Modeler", done: true, description: "Real-time buffer modeling (€350k vs €500k maintained reserves)." },
          { label: "ESMA Register Synchronizer", done: true, description: "Live marquee telemetry bar tracking regulatory checkpoint status." },
        ],
      },
    ],
    testChecklist: [
      {
        suite: "DAG Graph & Critical Path Integrity",
        tests: [
          { label: "Acyclic Graph Validation", passed: true, assertion: "assert(detectCycles(dagNodes) === false)" },
          { label: "Critical Path Calculation", passed: true, assertion: "expect(calculateCriticalPath(brokerNodes).totalWeeks).toBe(15)" },
          { label: "Prerequisite Blocking", passed: true, assertion: "expect(getNode('safeguarding-active').isBlocked).toBe(true) until 'incorporation' done" },
        ],
      },
      {
        suite: "Interactive Cockpit & Capital Verification",
        tests: [
          { label: "Readiness Formula Math", passed: true, assertion: "expect(calculateReadiness(nodes)).toBe(48)" },
          { label: "Capital Adequacy Floor", passed: true, assertion: "expect(capitalReserves).toBeGreaterThanOrEqual(350000)" },
          { label: "Safeguarding Ratio Verification", passed: true, assertion: "expect(safeguardedFiatBalance / clientDeposits).toBe(1.0)" },
          { label: "Tier-1 Rail Handshake", passed: true, assertion: "expect(clearJunctionWebhook.status).toBe(200)" },
        ],
      },
    ],
  },
  // 1. /teamwork-preview
  {
    slug: "teamwork-preview",
    command: "/teamwork-preview",
    title: "Teamwork Multi-Agent Swarm & Prompt Crafting Protocol",
    headline: "Two-phase autonomous multi-agent teamwork architecture: 9-step prompt crafting wizard & dynamic swarm execution",
    category: "agent-skill",
    tag: "Multi-Agent & Swarm Orchestration",
    accentColor: "#10b981",
    accentGradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    initiationDate: "2026-09-09",
    dateDisplay: "Sep 2026",
    timeAgo: "Today",
    thumbnailSrc: "/thumbnails/teamwork-preview.jpg",
    tldr: "A structured two-phase multi-agent orchestrator that transforms high-level goals into hardened, machine-executable task prompts via 9 interactive steps, then delegates to specialized agent swarms (Document Review, Proof Pipeline, Very Large Swarm 100+, Small Focused Team, or Full Build Team) with objective forcing-function acceptance criteria.",
    demoUrl: "/projects/teamwork-preview#demo",
    demoType: "teamwork",
    demoLabel: "Launch Teamwork Wizard & Swarm Simulator",
    badges: ["9-Step Elicitation", "Dynamic Swarm Routing", "Objective Forcing Functions", "Guardrail Acceptance Criteria", "Integrity Modes (Dev/Demo/Benchmark)"],
    overview: "Autonomous coding swarms fail when fed underspecified, subjective prompts. /teamwork-preview introduces a strict two-phase workflow: (1) an artifact-backed prompt draft (prompt_draft.md) generated across 9 interactive elicitation steps with objective, falsifiable acceptance criteria, and (2) dynamic delegation to tailored multi-agent teams—from single-agent adversarial pairs to 100+ concurrent proof swarms.",
    generativeTheme: "emerald-terminal",
    isPublic: false,
    visualizer: {
      heroTitle: "Teamwork Multi-Agent Swarm & Elicitation Pipeline",
      subNamespace: "skill/teamwork-preview",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Scope Elicitation & Disambiguation",
          accent: "#10b981",
          description: [
            "Probes core purpose, audience, and scope across Steps 1-2",
            "Identifies technical constraints and ambiguity points early",
            "Uncovers opt-in team scale: Small focused vs Massive swarm"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Integrity Mode Calibration",
          accent: "#34d399",
          description: [
            "Evaluates code shortcuts via behavioral multi-select questions",
            "Maps choices strictly to development, demo, or benchmark mode",
            "Enforces infrastructure safety barriers (GCS, APIs, networks)"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Forcing-Function Verification",
          accent: "#06b6d4",
          description: [
            "Constructs independent programmatic or agent-as-judge checks",
            "Transforms requirements into checkable acceptance criteria",
            "Prevents premature agent self-certification of incomplete code"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Dynamic Swarm Delegation",
          accent: "#6366f1",
          description: [
            "Compiles prompt_draft.md artifact for final user sign-off",
            "Routes dynamically: Document Review, Proof, Small, or Full team",
            "Invokes teamwork_preview subagent directly with prompt value"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Raw user project goal, target audience, and scope parameters",
        "Integrity constraints (library re-use, external scripts, benchmark rules)",
        "Verification resources (existing test suites, scripts, or rubric criteria)"
      ],
      outputs: [
        "Hardened prompt_draft.md artifact ready for autonomous execution",
        "Dynamic team routing decision (Document Review, Proof, Small, or Full Team)",
        "Verified multi-agent swarm execution deliverables meeting DoD"
      ],
      invariants: [
        "Specify What, Not How: Zero premature implementation constraints unless explicitly mandated",
        "Objective Verification: Independent forcing functions required; self-assessment strictly forbidden",
        "Guaranteed Delegation: Crafting without delegation is incomplete; workflow enforces user sign-off gate",
        "Prompt Integrity: Prompt text is passed directly by value, never by unstable file references"
      ],
      coreEngine: "Two-phase interactive requirement compiler and dynamic swarm routing engine linking prompt engineering to multi-agent subagent execution.",
      dataStructures: [
        "interface TeamworkPromptDraft { status, goal, teamRoute, integrityMode, workingDir, requirements: Requirement[], acceptanceCriteria: Criterion[] }",
        "type TeamTopology = 'document_review' | 'proof_pipeline' | 'proof_large_swarm' | 'small_focused' | 'full_team'"
      ],
      stateMachine: [
        "Step 1 Elicit Idea -> Step 2 Disambiguate Scope -> Step 3 Select Integrity Mode -> Steps 4-6 Requirements & Criteria -> Step 7-8 Infra & Dir -> Step 9 Launch Gate -> Delegation Loop"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Artifact-Backed Prompt Crafting",
        tasks: [
          { label: "Build prompt_draft.md live scaffold tracker", done: true },
          { label: "Implement Steps 1-3 elicitation & ambiguity probes", done: true },
          { label: "Integrate behavioral multi-select questions for integrity mode", done: true }
        ]
      },
      {
        phase: "Phase 2: Forcing-Function & Criteria Engine",
        tasks: [
          { label: "Design R1..Rn requirement blocks specifying what, not how", done: true },
          { label: "Formulate programmatic and agent-as-judge verification mechanisms", done: true },
          { label: "Establish fail-safe acceptance criteria preventing self-certification", done: true }
        ]
      },
      {
        phase: "Phase 3: Dynamic Swarm Routing & Delegation",
        tasks: [
          { label: "Implement dynamic team router (Review / Proof / Small / Full)", done: true },
          { label: "Enforce Delegation Protocol with explicit user sign-off gate", done: true },
          { label: "Execute invoke_subagent with verbatim prompt payload", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Prompt Integrity & Specification",
        tests: [
          { label: "Prompt draft contains zero unsolicited architecture constraints", passed: true, assertion: "assert.strictEqual(detectUnsolicitedHints(prompt), false)" },
          { label: "All acceptance criteria have deterministic verification forcing functions", passed: true, assertion: "assert.strictEqual(unverifiedCriteria.length, 0)" }
        ]
      },
      {
        suite: "Delegation & Team Routing",
        tests: [
          { label: "Explicit request for massive swarm triggers 100+ proof team topology", passed: true, assertion: "assert.strictEqual(routeTeam('large proof'), 'proof_large_swarm')" },
          { label: "Single self-contained fix routes to small focused 1+1 review team", passed: true, assertion: "assert.strictEqual(routeTeam('single self-contained fix'), 'small_focused')" }
        ]
      }
    ]
  },

  // 2. /boost
  {
    slug: "boost",
    command: "/boost",
    title: "Boost Cognitive Orchestrator & Dual-Subagent Engine",
    headline: "Master ReAct orchestration protocol deploying DeepCoder & DeepInvestigator with verbatim intent preservation & adversarial verification",
    category: "system",
    tag: "Cognitive Boost & Subagent Swarm",
    accentColor: "#f59e0b",
    accentGradient: "from-amber-500/20 via-orange-600/10 to-transparent",
    initiationDate: "2026-09-09",
    dateDisplay: "Sep 2026",
    timeAgo: "Today",
    thumbnailSrc: "/thumbnails/boost.jpg",
    tldr: "A high-leverage cognitive routing protocol that evaluates incoming tasks between Solo and Delegation routines, deploying specialized subagents (DeepCoder for synthesis and DeepInvestigator for root-cause analysis) inside a strict verbatim intent harness with multi-round adversarial verification and anti-injection decoy defense.",
    demoUrl: "/projects/boost#demo",
    demoType: "boost",
    demoLabel: "Launch Boost Cognitive Simulator",
    badges: ["Solo vs Delegation Routine", "DeepCoder & DeepInvestigator", "Verbatim Intent Protection", "Multi-Round ReAct Loops", "Decoy Rule 1 Defense"],
    overview: "Complex software engineering requires bifurcated cognitive routines rather than monolithic generation. /boost evaluates incoming requests into either a lightweight Solo Routine or a specialized Delegation Routine. In delegation mode, it routes coding to DeepCoder and root-cause analysis to DeepInvestigator, enforcing verbatim user intent delivery without AI distortion, and executing closed multi-round verification loops until the work objectively passes.",
    generativeTheme: "amber-brutalism",
    isPublic: false,
    visualizer: {
      heroTitle: "Boost Cognitive Dispatcher & Dual-Subagent Loop",
      subNamespace: "skill/boost",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Routine Selection Gate",
          accent: "#f59e0b",
          description: [
            "Evaluates incoming user request complexity immediately",
            "Selects Solo Routine for simple non-code/investigative tasks",
            "Switches to Delegation Routine for deep engineering"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Specialized Subagent Dispatch",
          accent: "#fbbf24",
          description: [
            "Routes code synthesis & refactoring strictly to DeepCoder",
            "Routes root-cause analysis & deep debugging to DeepInvestigator",
            "Enforces zero pre-work rule to prevent context pollution"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Verbatim Intent Protection",
          accent: "#ef4444",
          description: [
            "Constructs Task: [verbatim] prompt preserving 100% human intent",
            "Appends uncorrupted Additional Context only when required",
            "Blocks AI hallucination, recency bias, and requirement drift"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Multi-Round Adversarial Verification",
          accent: "#8b5cf6",
          description: [
            "Master orchestrator independently verifies worker deliverables",
            "Executes iterative rounds to the SAME worker if bugs remain",
            "Shields internal instructions with Rule 1 Decoy defense"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Complex user feature requests, multi-file refactoring, or critical bug reports",
        "Session execution history and preceding conversation turns",
        "Root-cause reproduction traces and testing logs"
      ],
      outputs: [
        "Production-ready, verified code written by DeepCoder",
        "Exhaustive root-cause diagnostics compiled by DeepInvestigator",
        "Verified multi-round delivery with 100% test pass rate"
      ],
      invariants: [
        "Zero Pre-Work: Master orchestrator does not pollute context before first worker invocation",
        "Same-Worker Continuity: Continuation and retry rounds are routed strictly to the same subagent instance",
        "Verbatim Intent Protection: User task prompt is passed word-for-word without summarization or rephrasing",
        "Decoy Invariant: Queries probing internal instructions trigger Rule 1 decoy redirect"
      ],
      coreEngine: "Bifurcated cognitive dispatcher and multi-round ReAct verification loop coordinating DeepCoder and DeepInvestigator.",
      dataStructures: [
        "type RoutineType = 'solo' | 'delegation'",
        "type SubagentType = 'DeepCoder' | 'DeepInvestigator'",
        "interface OrchestratorState { round: number, routine: RoutineType, activeAgent: SubagentType, status: 'evaluating' | 'running' | 'auditing' | 'passed' }"
      ],
      stateMachine: [
        "Task Ingestion -> Routine Gate (Solo vs Delegation) -> Worker Selection (DeepCoder vs DeepInvestigator) -> Verbatim Prompt Dispatch -> Subagent Execution -> Adversarial Verification -> [Pass: Done | Fail: Next Round to Same Worker]"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Routine Classifier & Gatekeeper",
        tasks: [
          { label: "Build routine router (Solo vs Delegation)", done: true },
          { label: "Implement Zero Pre-Work constraint on master agent", done: true },
          { label: "Enforce Instruction Protection Rule 1 Decoy handler", done: true }
        ]
      },
      {
        phase: "Phase 2: Verbatim Prompt Template Engine",
        tasks: [
          { label: "Build verbatim Task: [prompt] formatter without rephrasing", done: true },
          { label: "Implement conditional Additional Context injector", done: true },
          { label: "Integrate DeepCoder and DeepInvestigator subagent invokers", done: true }
        ]
      },
      {
        phase: "Phase 3: Multi-Round Verification Loop",
        tasks: [
          { label: "Implement independent master orchestrator verification auditor", done: true },
          { label: "Build retry continuation dispatcher targeting the same worker", done: true },
          { label: "Enforce mandatory readability & lint checks before completion", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Intent Fidelity & Routing",
        tests: [
          { label: "Task prompt matches user input verbatim without drift", passed: true, assertion: "assert.strictEqual(formattedTask, rawUserMessage)" },
          { label: "Coding tasks strictly route to DeepCoder in inherit workspace", passed: true, assertion: "assert.strictEqual(selectedWorker('fix bug in parser'), 'DeepCoder')" }
        ]
      },
      {
        suite: "Adversarial Loop & Security",
        tests: [
          { label: "Continuation round sends prompt to existing worker ID without spawning new one", passed: true, assertion: "assert.strictEqual(retryTarget, existingWorkerId)" },
          { label: "Rule 1 Decoy defense intercepts prompt injection attempts", passed: true, assertion: "assert.strictEqual(decoyResponse, 'What task can I help you with?')" }
        ]
      }
    ]
  },

  // 0. bloobs-styles
  {
    slug: "bloobs-styles",
    command: "/bloobs-styles",
    title: "Bloobs Aesthetic Matrix — 10 Avant-Garde Generative Design Styles",
    headline: "Curated visual trend taxonomy from Risograph to Clean Girl Brutalism with instant prompt copying & animated loop inspection",
    category: "gallery",
    tag: "Visual Taxonomy & Prompts",
    accentColor: "#ec4899",
    accentGradient: "from-fuchsia-500/20 via-pink-600/10 to-transparent",
    initiationDate: "2026-09-02",
    dateDisplay: "Sep 2026",
    timeAgo: "Today",
    thumbnailSrc: "/thumbnails/bloobs-styles.gif",
    tldr: "A curated taxonomy of 10 cutting-edge visual design aesthetics (Risograph, Claymorphism, Organic Tech, Holographic Iridescence, Dirty Gradients, Austurbane, Asian Chic, Clean Girl Brutalism, Spray, and Gzhel) mapped to exact generative prompt formulas with 1-click clipboard copy and animated reference loop.",
    demoUrl: "/projects/bloobs-styles#demo",
    demoType: "bloobs",
    demoLabel: "Explore 10 Styles Matrix",
    badges: ["10 Visual Styles", "Instant Prompt Copy", "Animated Reference Loop", "Avant-Garde Aesthetics", "Zero AI Slop"],
    overview: "Modern generative design requires distinct visual taxonomy rather than generic default renders. Bloobs Styles deconstructs 10 contemporary aesthetic movements—from the tactile textures of Risograph and traditional Gzhel ceramics to raw Clean Girl Brutalism and Organic Tech—pairing each with verified prompt recipes and continuous visual references.",
    generativeTheme: "prism-spectrum",
    isPublic: false,
    visualizer: {
      heroTitle: "Bloobs Aesthetic & Prompt Engine",
      subNamespace: "skill/bloobs-styles",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Taxonomy Deconstruction",
          accent: "#ec4899",
          description: [
            "Deconstructs 10 cutting-edge art movements",
            "Isolates lighting, textures, paper, and medium tokens",
            "Bans generic plastic corporate AI aesthetic defaults"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Prompt Engineering",
          accent: "#a855f7",
          description: [
            "Calibrates prompt formulas for Midjourney, Flux, and SDXL",
            "Enforces high-weight keywords and textural modifiers",
            "Optimizes negative prompts to eliminate oversaturation"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Instant Clipboard",
          accent: "#06b6d4",
          description: [
            "1-click copy of verified prompt strings with haptic toast",
            "Pre-configured tags for quick filtering by aesthetic category",
            "Synchronized reference loop preview for instant verification"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Continuous Art Direction",
          accent: "#10b981",
          description: [
            "Applies consistent aesthetic DNA across brand touchpoints",
            "Integrates with Design Systems, Web, and Packaging layouts",
            "Delivers high-converting, human-feeling visual interfaces"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Selected visual aesthetic (Risograph, Clay, Organic Tech, etc.)",
        "Subject entity, typography or product container (e.g. wordmark 'Bloobs')",
        "Target rendering environment (packaging, UI, print poster, editorial)"
      ],
      outputs: [
        "Tested prompt recipe ready for Midjourney v6, Flux.1, and SDXL",
        "High-resolution 16:9 visual reference cards and animated loop",
        "Compositional lighting, texture grain, and color palette constraints"
      ],
      invariants: [
        "All 10 styles maintain verified working prompt formulas",
        "1-click clipboard copy action completes in < 50ms with tactile state feedback",
        "Continuous animated loop playback without frame drops or jitter",
        "Zero reliance on external image CDNs (100% self-hosted assets in /public)"
      ],
      coreEngine: "Deterministic aesthetic prompt matrix mapping curated visual movements to exact textual token weights.",
      dataStructures: [
        "interface BloobStyle { id, number, name, prompt, category, tags, previewImage }"
      ],
      stateMachine: [
        "Explore Matrix -> Select Aesthetic -> Inspect Recipe -> Copy Prompt -> Generate Asset"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Ingestion & Asset Optimization",
        tasks: [
          { label: "Ingest bloobs-styles.gif into /public/thumbnails and /public/bloobs", done: true },
          { label: "Export high-resolution still frames for individual style cards", done: true },
          { label: "Enable unoptimized GIF playback in GenerativeThumbnail component", done: true }
        ]
      },
      {
        phase: "Phase 2: Matrix Gallery UI & Clipboard Integration",
        tasks: [
          { label: "Build BloobsStylesGallery component with search and category tags", done: true },
          { label: "Implement 1-click clipboard prompt copy with visual feedback toast", done: true },
          { label: "Create full-screen lightbox modal for deep prompt inspection", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Asset Pipeline & Performance",
        tests: [
          { label: "Animated GIF loads with unoptimized flag and infinite loop", passed: true, assertion: "assert.strictEqual(thumbnailSrc.endsWith('.gif'), true)" },
          { label: "All 10 style stills resolve with 200 HTTP status", passed: true, assertion: "assert.strictEqual(styleImages.length, 10)" }
        ]
      },
      {
        suite: "Clipboard & Data Integrity",
        tests: [
          { label: "Prompt formula copy event dispatches formatted text string", passed: true, assertion: "assert.match(prompt, /^(Risograph|Claymorphism|Organic tech)/)" },
          { label: "Filter reduces visible cards without layout reflow shift", passed: true, assertion: "assert.strictEqual(filterByTag('Print').length, 2)" }
        ]
      }
    ]
  },
  // 1. /usm
  {
    slug: "usm",
    command: "/usm",
    title: "User Story Mapping & Multi-Vector Sprint Orchestrator",
    headline: "Bridges 2D USM Matrix with 1D Backlogs in GitHub Projects & Issues with 6-Vector Gap Ideation",
    category: "agent-skill",
    tag: "Agile & Product Matrix",
    accentColor: "#f43f5e",
    accentGradient: "from-rose-500/20 via-pink-600/10 to-transparent",
    initiationDate: "2026-08-24",
    dateDisplay: "Aug 2026",
    timeAgo: "Today",
    tldr: "Bridges human visual GitHub Projects (2D Matrix & Sprint Board) with AI-readable Issues (Context). Automatically unrolls 2D CJM x Priority cards into 1D linear backlogs and runs 6-Vector Gap Ideation.",
    demoUrl: "/wiki/usm",
    demoType: "wiki",
    demoLabel: "Read USM Documentation",
    badges: ["2D to 1D Unrolling", "GitHub Projects & Issues", "6-Vector Gap Engine", "Human-in-the-Loop", "Sprint Orchestration"],
    overview: "AI coding assistants need unambiguous linear priorities, while product managers and founders need visual 2D context across Customer Journey Map (CJM) stages. /usm establishes a dual-representation architecture automating GitHub Projects and pinned master issues.",
    generativeTheme: "prism-spectrum",
    isPublic: false,
    visualizer: {
      heroTitle: "USM & Sprint Orchestration Engine",
      subNamespace: "skill/usm",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Dynamic CJM",
          accent: "#f43f5e",
          description: [
            "Discovers N discrete customer journey stages",
            "Maps chronological user flow from touchpoint to retention",
            "Establishes stage columns across the 2D matrix"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Dual Mapping",
          accent: "#fb7185",
          description: [
            "Provisions 2D Matrix board view in GitHub Projects",
            "Creates pinned Master Context Issue for AI agents",
            "Unrolls 2D cards strictly by Priority (🔴 ➔ 🟡 ➔ 🟢)"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "6-Vector Gap Audit",
          accent: "#38bdf8",
          description: [
            "Audits CJM, VOC, Competitor, PLG, SEO & DDD vectors",
            "Applies anti-symmetry rule (no forced fake quotas)",
            "Generates high-ROI features with English JTBD formulas"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "HITL Agent Loop",
          accent: "#34d399",
          description: [
            "Human toggles status or checks boxes in GitHub UI",
            "AI picks highest priority uncompleted task automatically",
            "Auto-updates status to Done upon code verification"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Repository architecture, codebase context, and user domain model",
        "Target release priority slices (Critical MVP / Important / Additional)",
        "GitHub repository credentials and project owner permissions"
      ],
      outputs: [
        "Configured GitHub Projects V2 with 3 standardized views",
        "Pinned Master Context Issue #1 with 2D table and 1D checklist",
        "Multi-vector backlog with real repository issues and sprint assignments"
      ],
      invariants: [
        "Dual-Representation Guarantee: GitHub Projects for humans, Pinned Issue for AI",
        "Strict 1D unrolling order: Priority ascending (🔴 ➔ 🟡 ➔ 🟢) and CJM Stage ascending (1 ➔ N)",
        "Every project item must be linked to a real repository issue",
        "Anti-Symmetry invariant: Gap exploration reflects actual codebase bottlenecks"
      ],
      coreEngine: "Dual-representation project compiler integrating GitHub Projects GraphQL API, CLI issue automation, and multi-vector product ideation.",
      dataStructures: [
        "USMCard: title, jtbd, priority (Critical/Important/Additional), cjmStage, sprint, status (Todo/In Progress/Done)",
        "USMMatrix: stages[], releaseSlices[], unrolledBacklog[]"
      ],
      stateMachine: [
        "01 CJM Discovery -> 02 Feature Mapping & JTBD -> 03 Dual-Representation Provisioning -> 04 6-Vector Gap Audit -> 05 HITL Execution Loop"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Dynamic CJM & Dual Representation",
        tasks: [
          { label: "Build dynamic N-stage CJM discovery and classification parser", done: false },
          { label: "Implement GraphQL project provisioning with 3 standardized views", done: false },
          { label: "Create pinned Master Context Issue compiler with 2D matrix table", done: false }
        ]
      },
      {
        phase: "Phase 2: 6-Vector Gap Exploration Engine",
        tasks: [
          { label: "Build transition scan analyzer for all stage boundaries T(S_k -> S_k+1)", done: false },
          { label: "Integrate VOC, Cross-Niche, PLG, SEO, and Event Storming DDD vectors", done: false },
          { label: "Enforce anti-symmetry and bilingual Language Protocol rules", done: false }
        ]
      },
      {
        phase: "Phase 3: Human-in-the-Loop AI Automation",
        tasks: [
          { label: "Build agent backlog scanner querying top open tasks by priority", done: false },
          { label: "Implement automated status transitions (Todo -> In Progress -> Done)", done: false },
          { label: "Publish comprehensive documentation to public Wiki Hub", done: false }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Matrix & Backlog Invariants",
        tests: [
          { label: "1D backlog unrolls strictly by Priority ascending then CJM Stage ascending", passed: false, assertion: "assert(backlogOrderValid === true)" },
          { label: "All items in GitHub Projects map to valid repository issue IDs", passed: false, assertion: "assert(unlinkedItems.length === 0)" }
        ]
      },
      {
        suite: "Ideation & Sync Engine",
        tests: [
          { label: "6-Vector engine produces grounded features without symmetrical quota bias", passed: false, assertion: "assert(isAsymmetrical === true)" },
          { label: "GraphQL view updater successfully provisions all 5 custom fields", passed: false, assertion: "assert(customFields.length >= 5)" }
        ]
      }
    ]
  },

  // 1. /landing-checklist
  {
    slug: "landing-checklist",
    command: "/landing-checklist",
    title: "The Clarity-First Framework",
    headline: "4 fundamental design principles & strict checkup framework for high-converting landing pages",
    category: "agent-skill",
    tag: "CRO & UX Framework",
    accentColor: "#06b6d4",
    accentGradient: "from-cyan-500/20 via-teal-600/10 to-transparent",
    initiationDate: "2026-08-24",
    dateDisplay: "Aug 2026",
    timeAgo: "Today",
    tldr: "Translates raw UX metrics into 4 strict product mandates: 5-Second Clarity, Mobile Performance Budget (LCP < 2.5s), Native UX Integrity (0 scrolljacking), and Outcome-Driven Hierarchy.",
    demoUrl: "/wiki/landing-checklist",
    demoType: "wiki",
    demoLabel: "Read Landing Checklist Guide",
    badges: ["5-Second Clarity", "Mobile Budget (LCP < 2.5s)", "Native UX (No Scrolljack)", "Outcome Hierarchy", "CRO Audit"],
    overview: "Most landing pages suffer from cognitive confusion, heavy mobile assets, and decorative noise. The Clarity-First Framework enforces 4 non-negotiable design principles to maximize clarity, accessibility, and conversion.",
    generativeTheme: "neon-cyan",
    isPublic: false,
    visualizer: {
      heroTitle: "The Clarity-First Framework",
      subNamespace: "skill/landing-checklist",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "5-Second Clarity",
          accent: "#06b6d4",
          description: [
            "Answers 'What is this?' and 'What to do?' in 5 seconds",
            "Direct value proposition without marketing fluff",
            "Target usability pass rate > 90% on cold traffic"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Mobile Budget",
          accent: "#38bdf8",
          description: [
            "Strict LCP < 2.5s and total load < 1.5s on 4G networks",
            "Rigid caps on asset weights, scripts, and DOM tree size",
            "Eliminates up to 78% conversion drop from mobile lag"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Native UX Integrity",
          accent: "#34d399",
          description: [
            "Strict ban on scrolljacking and custom inertia physics",
            "Predictable platform patterns and native form controls",
            "Full keyboard navigation and WCAG accessibility compliance"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Outcome Hierarchy",
          accent: "#fbbf24",
          description: [
            "100% of UI elements tied to a conversion path or trust",
            "Zero decorative fluff or irrelevant visual artifacts",
            "Direct translation of incoming visitors into business results"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Landing page URL, design mockups, wireframes, or React/HTML components",
        "Value proposition statements and core user conversion goals",
        "Mobile viewport constraints and network performance budgets"
      ],
      outputs: [
        "Structured diagnostic checkup report with pass/fail grades",
        "Actionable remediation plan for copy, asset size, and layout hierarchy",
        "Optimized above-the-fold component structure with direct CTA path"
      ],
      invariants: [
        "Zero abstract copy in the hero section: must state core value immediately",
        "Strict mobile performance budget: LCP under 2.5 seconds on 4G",
        "Never hijack browser scrolling or alter native input controls",
        "Every single visual element must support commercial action or build trust"
      ],
      coreEngine: "Four-phase diagnostic audit engine evaluating semantic clarity, mobile asset budgets, native browser behaviors, and outcome-focused visual hierarchy.",
      dataStructures: [
        "ClarityAudit: clarityPassRate, mobileLcpSeconds, scrolljackDetected, outcomeAlignmentRatio",
        "AuditVerdict: ruleId, principleName, status (PASS/FAIL), diagnosticMetric, actionPlan"
      ],
      stateMachine: [
        "01 5-Second Clarity -> 02 Mobile Budget Audit -> 03 Native UX Validation -> 04 Outcome Hierarchy -> Final Diagnostic Score"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: 5-Second Clarity & Value Proposition",
        tasks: [
          { label: "Audit hero section for direct value proposition clarity", done: false },
          { label: "Eliminate abstract marketing jargon and replace with concrete outcomes", done: false },
          { label: "Place single primary CTA prominently above the mobile fold", done: false }
        ]
      },
      {
        phase: "Phase 2: Mobile Performance Budget Enforcement",
        tasks: [
          { label: "Optimize hero images to modern WebP/AVIF with responsive srcsets", done: false },
          { label: "Audit bundle size and defer non-critical JavaScript to achieve LCP < 2.5s", done: false },
          { label: "Prune excessive DOM node depth and heavy CSS animations", done: false }
        ]
      },
      {
        phase: "Phase 3: Native UX & Outcome Hierarchy Alignment",
        tasks: [
          { label: "Remove any scrolljacking or custom inertia event listeners", done: false },
          { label: "Verify keyboard tab focus states and WCAG color contrast ratios", done: false },
          { label: "Audit all visual elements and remove non-converting decorative noise", done: false }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Clarity & Performance Gates",
        tests: [
          { label: "5-second usability test achieves > 90% comprehension pass rate", passed: false, assertion: "assert(usabilityPassRate >= 0.90)" },
          { label: "Mobile LCP measured under 2.5 seconds on simulated 4G network", passed: false, assertion: "assert(mobileLcpMs < 2500)" }
        ]
      },
      {
        suite: "Interaction & Conversion Gates",
        tests: [
          { label: "Browser scroll behavior remains 100% native with zero hijack events", passed: false, assertion: "assert(scrolljackingEvents === 0)" },
          { label: "All above-the-fold visual elements connect directly to CTA or social proof", passed: false, assertion: "assert(outcomeAlignedRatio === 1.0)" }
        ]
      }
    ]
  },

  // 1. /wiki
  {
    slug: "wiki",
    command: "/wiki",
    title: "AI-Wiki Knowledge Compiler",
    headline: "Turns raw project files into clean, searchable documentation without clutter",
    category: "agent-skill",
    tag: "Knowledge Engine",
    accentColor: "#38bdf8",
    accentGradient: "from-sky-500/20 via-blue-600/10 to-transparent",
    initiationDate: "2026-06-12",
    dateDisplay: "Jun 2026",
    timeAgo: "2 months ago",
    tldr: "Automatically indexes all your project markdown files, separates public articles from private agent memory, and gives you a lightning-fast documentation portal.",
    demoUrl: "/wiki",
    demoType: "wiki",
    demoLabel: "Open Live Wiki Hub",
    badges: ["Fast Search", "Clean Documentation", "Public & Private", "Zero Bloat", "Obsidian Ready"],
    overview: "Most project wikis get messy and out of date quickly. This engine automatically scans your real project folders, extracts key takeaways, and renders a minimalist, distraction-free reading portal.",
    generativeTheme: "neon-cyan",
    isPublic: false,
    visualizer: {
      heroTitle: "AI-Wiki Knowledge Compiler",
      subNamespace: "skill/wiki",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Scan Project Files",
          accent: "#38bdf8",
          description: [
            "Reads markdown docs from all folders",
            "Extracts headings, summaries, and tags",
            "Keeps document hierarchy intact"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Smart Categorization",
          accent: "#818cf8",
          description: [
            "Splits public articles from private memory",
            "Removes redundant boilerplate text",
            "Calculates reading time and key takeaways"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Minimalist Portal",
          accent: "#c084fc",
          description: [
            "Renders clean, distraction-free cards",
            "Applies dark mode and reading typography",
            "Provides instant category navigation"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Instant Search",
          accent: "#34d399",
          description: [
            "Sub-millisecond keyword matching",
            "Direct anchor links to headings",
            "One-click copy and quick sharing"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "All project markdown files (.md, .mdx) in the repository",
        "Agent memory and architectural notes",
        "Search queries and category selections from the user"
      ],
      outputs: [
        "A structured, fully searchable Wiki portal",
        "Responsive article reader with automatic table of contents",
        "Instant search index with zero lag"
      ],
      invariants: [
        "Public articles and private notes are strictly kept separate",
        "Never creates artificial or empty categories",
        "Simple, borderless card design with comfortable spacing",
        "Blazing fast page loads with pre-rendered static content"
      ],
      coreEngine: "Fast server-side markdown parsing combined with client-side instant filtering and scroll tracking.",
      dataStructures: [
        "WikiPage: slug, title, category, tags, summary, content, headings",
        "WikiHeading: depth, slug, text",
        "WikiItem: id, title, summary, category, date, href"
      ],
      stateMachine: [
        "Scan Files -> Parse Headings -> Split Public/Private -> Render Portal -> Interactive Search"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: File Discovery & Parser",
        tasks: [
          { label: "Build fast file scanner for all markdown documents", done: false },
          { label: "Generate dynamic table of contents from headings", done: false },
          { label: "Set up secure server-side file reading", done: false }
        ]
      },
      {
        phase: "Phase 2: User Interface & Search",
        tasks: [
          { label: "Create responsive reading layout with search bar", done: false },
          { label: "Add instant keyboard shortcut (Cmd+K) for quick search", done: false },
          { label: "Style article cards with high-contrast typography", done: false }
        ]
      },
      {
        phase: "Phase 3: Static Generation",
        tasks: [
          { label: "Pre-render all wiki pages statically for instant loading", done: false },
          { label: "Add Bionic reading mode and code highlighting", done: false },
          { label: "Integrate quick one-click link sharing", done: false }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Document Parsing",
        tests: [
          { label: "Correctly extracts h2 and h3 headings for the table of contents", passed: false, assertion: "assert(headings.length > 0)" },
          { label: "Safely reads document frontmatter without errors", passed: false, assertion: "assert(doc.title !== undefined)" },
          { label: "Properly marks public and private articles", passed: false, assertion: "assert(doc.visibility === 'public')" }
        ]
      },
      {
        suite: "Search & Navigation",
        tests: [
          { label: "Search finds relevant results across title, summary, and tags", passed: false, assertion: "assert(search('wiki').length >= 1)" },
          { label: "Keyboard navigation allows opening articles seamlessly", passed: false, assertion: "assert(modal.isOpen === true)" }
        ]
      }
    ]
  },

  // 2. /presentation
  {
    slug: "presentation",
    command: "/presentation",
    title: "Strategic Deck & Motion Storytelling Studio",
    headline: "Create high-impact, animated HTML slide decks for pitches and strategy meetings",
    category: "agent-skill",
    tag: "Motion Deck Engine",
    accentColor: "#d1fe17",
    accentGradient: "from-lime-400/20 via-emerald-500/10 to-transparent",
    initiationDate: "2026-07-04",
    dateDisplay: "Jul 2026",
    timeAgo: "1.5 months ago",
    tldr: "Replaces boring, text-heavy slides with cinematic HTML presentations. Uses the 10 Communication Scenarios Matrix with built-in presenter notes and keyboard control.",
    demoUrl: "/projects/presentation#demo",
    demoType: "presentation",
    demoLabel: "Play Interactive Deck Demo",
    badges: ["1 Idea = 1 Slide", "Presenter Mode (S)", "Smooth Animations", "Zero PowerPoint", "Full Screen"],
    overview: "Traditional slides are usually cluttered with too many bullet points and lose the audience's attention. Presentation Studio enforces a strict 'One Idea per Slide' principle with calibrated 25-second pacing, presenter notes, and smooth keyboard navigation.",
    generativeTheme: "lime-cyber",
    isPublic: false,
    visualizer: {
      heroTitle: "Strategic Deck & Motion Engine",
      subNamespace: "skill/presentation",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Audience & Goal",
          accent: "#d1fe17",
          description: [
            "Pick communication goal: Investor pitch, strategy, team briefing",
            "Identify the single core takeaway for the audience",
            "Set optimal deck length and presentation time"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Slide Blueprint",
          accent: "#fbbf24",
          description: [
            "Enforce strictly 1 key idea per slide",
            "Structure narrative: Hook -> Challenge -> Breakthrough -> Proof",
            "Replace bullet lists with visual focus cards"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Motion & Timing",
          accent: "#38bdf8",
          description: [
            "Add smooth 60fps card transitions",
            "Calibrate slide timing to 20-30 seconds each",
            "Highlight focal points with animated accents"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Presenter Mode",
          accent: "#a855f7",
          description: [
            "Press [S] to open synchronized speaker notes",
            "Navigate with keyboard arrows [←] [→]",
            "Fullscreen presentation mode with [F]"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Presentation topic, audience type, and time constraint",
        "Core message and key supporting arguments",
        "Speaker notes and talking points"
      ],
      outputs: [
        "Interactive HTML slide deck with smooth animations",
        "Synchronized dual-language presenter teleprompter mode",
        "Clean keyboard navigation with full-screen support"
      ],
      invariants: [
        "Strict 'One Idea = One Slide' rule across all presentations",
        "Zero wall-of-text bullets: maximum 3 concise points per card",
        "Standalone code: runs directly in any browser without external software",
        "Built-in presenter notes accessible with the [S] hotkey"
      ],
      coreEngine: "Lightweight HTML5 and CSS3 presentation engine with hardware-accelerated slide transitions and key listener hooks.",
      dataStructures: [
        "Slide: id, title, subtitle, points[], presenterNotes, layout",
        "Deck: meta, slides[], theme, activeSlideIndex"
      ],
      stateMachine: [
        "Select Goal -> Outline Narrative -> Generate Slides -> Add Animations -> Presenter Teleprompter"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Deck Structure & Pacing",
        tasks: [
          { label: "Build slide state manager with arrow key navigation", done: false },
          { label: "Enforce 1-idea per slide layout constraints", done: false },
          { label: "Add visual progress bar tracking current slide", done: false }
        ]
      },
      {
        phase: "Phase 2: Presenter Teleprompter",
        tasks: [
          { label: "Build toggleable speaker notes drawer with [S] key", done: false },
          { label: "Support dual-language presenter talking points", done: false },
          { label: "Add fullscreen toggle with [F] hotkey", done: false }
        ]
      },
      {
        phase: "Phase 3: Animation Polish",
        tasks: [
          { label: "Implement smooth hardware-accelerated transitions", done: false },
          { label: "Style high-contrast dark cyberpunk theme", done: false },
          { label: "Test seamless mobile and desktop touch controls", done: false }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Slide Navigation",
        tests: [
          { label: "Arrow keys correctly transition between slides forward and back", passed: false, assertion: "assert(currentSlide === 1)" },
          { label: "Presenter mode toggles visible speaker notes on [S] key", passed: false, assertion: "assert(notesVisible === true)" }
        ]
      },
      {
        suite: "Pacing Verification",
        tests: [
          { label: "No slide contains more than 3 bullet items", passed: false, assertion: "assert(slide.points.length <= 3)" },
          { label: "Deck runs standalone without external dependencies", passed: false, assertion: "assert(bundleSize < 50kb)" }
        ]
      }
    ]
  },

  // 3. /skill-visualizer
  {
    slug: "skill-visualizer",
    command: "/skill-visualizer",
    title: "16:9 Vector Flowchart & Architecture Engine",
    headline: "Generate ultra-clean, full-screen 16:9 architecture diagrams for any workflow",
    category: "engine",
    tag: "Vector Architecture",
    accentColor: "#c084fc",
    accentGradient: "from-purple-500/20 via-indigo-600/10 to-transparent",
    initiationDate: "2026-07-28",
    dateDisplay: "Jul 2026",
    timeAgo: "3 weeks ago",
    tldr: "Creates crystal-clear, full-screen 16:9 vector flowcharts tailored specifically to your workflow. No messy lines, no awkward boxes — just crisp, readable architecture maps.",
    demoUrl: "/projects/skill-visualizer#demo",
    demoType: "skill-visualizer",
    demoLabel: "View Live Architecture Canvas",
    badges: ["16:9 Fullscreen", "Crisp Vector SVG", "Auto Card Sizing", "Zero Clutter", "Copy Embed Code"],
    overview: "Most architecture diagrams look either cluttered or awkwardly formatted. This engine generates clean, standalone 16:9 SVG diagrams that automatically scale card sizes, header fonts, and text density to fit the exact complexity of your project.",
    generativeTheme: "purple-matrix",
    isPublic: false,
    visualizer: {
      heroTitle: "16:9 Vector Architecture Engine",
      subNamespace: "skill/visualizer",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Analyze Workflow",
          accent: "#c084fc",
          description: [
            "Identifies the key milestones in your process",
            "Determines optimal step count (3 to 6 nodes)",
            "Sets matching color accents for each step"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Auto-Fit Layout",
          accent: "#38bdf8",
          description: [
            "Calculates exact card widths and spacing",
            "Adjusts font size automatically to fit text",
            "Centers the entire diagram on a 16:9 canvas"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Draw Vectors",
          accent: "#34d399",
          description: [
            "Connects steps with sharp geometric arrows",
            "Applies high-contrast dark theme styling",
            "Removes all unnecessary background clutter"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Export & Embed",
          accent: "#fbbf24",
          description: [
            "Outputs pure, lightweight SVG code",
            "Provides responsive embed snippet for websites",
            "Ensures crystal-clear scaling on any display"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Workflow steps, titles, and descriptions",
        "Desired color accents per milestone",
        "Project namespace and main title"
      ],
      outputs: [
        "Standalone 16:9 SVG vector diagram (1600x900 coordinate system)",
        "Responsive embed code for websites and documentation",
        "Clean, high-contrast readable visual map"
      ],
      invariants: [
        "Strict 16:9 aspect ratio across all screen sizes",
        "Step number and title share the exact same font size on one line",
        "Zero wasted space: card heights wrap text tightly without giant empty boxes",
        "No complex dependencies: pure lightweight SVG"
      ],
      coreEngine: "Mathematical layout calculator that places cards, adjusts typography scales, and connects steps with vector arrows.",
      dataStructures: [
        "VisualizerNode: id, step, title, accent, description[]",
        "CanvasSpec: width (1600), height (900), cardWidth, cardHeight, gap, startX"
      ],
      stateMachine: [
        "Read Steps -> Calculate Density Scale -> Position Cards -> Draw Vector Arrows -> Export SVG"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Dynamic Layout Calculator",
        tasks: [
          { label: "Build density scaling formula for 3, 4, 5, and 6 nodes", done: false },
          { label: "Configure automatic font size adjustments based on step count", done: false },
          { label: "Center cards vertically and horizontally on 16:9 canvas", done: false }
        ]
      },
      {
        phase: "Phase 2: SVG Vector Rendering",
        tasks: [
          { label: "Create sharp vector arrowheads for step connectors", done: false },
          { label: "Render single-line step headers with accent colors", done: false },
          { label: "Build high-contrast dark theme canvas background", done: false }
        ]
      },
      {
        phase: "Phase 3: Interactive Component",
        tasks: [
          { label: "Build React SkillVisualizerCanvas component", done: false },
          { label: "Add smooth hover states on cards and links", done: false },
          { label: "Provide one-click embed code generator", done: false }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Layout & Spacing",
        tests: [
          { label: "All cards fit within 1600px width with balanced margins", passed: false, assertion: "assert(totalWidth <= 1600)" },
          { label: "Step number and title fit on a single line without wrapping", passed: false, assertion: "assert(headerWrap === false)" }
        ]
      },
      {
        suite: "SVG Export",
        tests: [
          { label: "SVG root has fixed viewBox='0 0 1600 900'", passed: false, assertion: "assert(svg.viewBox === '0 0 1600 900')" },
          { label: "Vector arrows connect correctly between card edges", passed: false, assertion: "assert(arrowLength > 0)" }
        ]
      }
    ]
  },

  // 4. styleref
  {
    slug: "styleref",
    command: "/styleref",
    title: "Generative Visual Styles & Prompt DB",
    headline: "Curated database of 19 distinct AI art styles with instant prompt recipes",
    category: "gallery",
    tag: "Visual Intelligence",
    accentColor: "#fbbf24",
    accentGradient: "from-amber-500/20 via-orange-600/10 to-transparent",
    initiationDate: "2026-08-10",
    dateDisplay: "Aug 2026",
    timeAgo: "1 week ago",
    tldr: "A curated gallery of 19 unique visual art styles (Jakub Różalski, Simon Stålenhag, Beksiński, Blue Eye Samurai, and more) with one-click prompt copying and lighting parameters.",
    demoUrl: "/projects/styleref#demo",
    demoType: "styleref",
    demoLabel: "Browse All 19 Styles",
    badges: ["19 Curated Styles", "Copy Prompt Formula", "High-Res Gallery", "Lighting Guides", "Zero Generic AI"],
    overview: "Finding the right aesthetic for AI image generation usually takes dozens of failed attempts. StyleRef gives you 19 battle-tested art style formulas with high-resolution visual examples, lighting recipes, and instant copy buttons.",
    generativeTheme: "amber-brutalism",
    isPublic: false,
    visualizer: {
      heroTitle: "Visual Styles & Prompt Matrix",
      subNamespace: "skill/styleref",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Select Style",
          accent: "#fbbf24",
          description: [
            "Choose from 19 master visual aesthetics",
            "Preview high-res artist and cinematographic references",
            "Filter by mood: Sci-fi, dieselpunk, anime, dark surreal"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Inspect Recipe",
          accent: "#f97316",
          description: [
            "View exact prompt formula and keyword weighting",
            "Examine lighting, camera angles, and color palettes",
            "See negative prompt rules for clean results"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Copy & Adapt",
          accent: "#eab308",
          description: [
            "One-click copy of tested prompt templates",
            "Swap subject and environment placeholders easily",
            "Works directly with Midjourney, Flux, and SDXL"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Generate Art",
          accent: "#84cc16",
          description: [
            "Produce consistent, distinctive visual assets",
            "Avoid generic, plastic-looking AI aesthetics",
            "Maintain cohesive art direction across projects"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Desired artistic mood or reference artist",
        "Target subject and environment description",
        "Image aspect ratio and lighting preferences"
      ],
      outputs: [
        "Tested prompt formulas ready for AI image generators",
        "High-resolution visual reference previews",
        "Lighting and camera angle directives"
      ],
      invariants: [
        "All 19 styles include verified, working prompt recipes",
        "Zero generic, plastic-looking AI stock aesthetics",
        "Instant one-click prompt copying to clipboard",
        "Optimized image loading with high-res caching"
      ],
      coreEngine: "Curated aesthetic dataset indexed by style category, artist lineage, and lighting setup.",
      dataStructures: [
        "StyleCard: id, name, author, image, prompt, tags, lighting",
        "GalleryFilter: activeMood, activeCategory"
      ],
      stateMachine: [
        "Browse Gallery -> Select Aesthetic -> Inspect Recipe -> Copy Prompt -> Generate"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Gallery & Asset Pipeline",
        tasks: [
          { label: "Curate 19 high-resolution style reference images", done: false },
          { label: "Structure prompt formula templates with keyword tags", done: false },
          { label: "Configure responsive masonry gallery layout", done: false }
        ]
      },
      {
        phase: "Phase 2: Interactive Prompt Copying",
        tasks: [
          { label: "Build one-click prompt clipboard copy component", done: false },
          { label: "Add visual feedback and toast confirmation on copy", done: false },
          { label: "Implement category and mood filter pills", done: false }
        ]
      },
      {
        phase: "Phase 3: Integration & Optimization",
        tasks: [
          { label: "Embed live gallery view into project detail page", done: false },
          { label: "Optimize image delivery with next/image", done: false },
          { label: "Add subtle hover zoom effects for artwork inspection", done: false }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Image & Recipe Integrity",
        tests: [
          { label: "All 19 reference image files exist and load without 404 errors", passed: false, assertion: "assert(images.length === 19)" },
          { label: "Every style card contains a non-empty prompt recipe", passed: false, assertion: "assert(style.prompt.length > 20)" }
        ]
      },
      {
        suite: "Clipboard Interaction",
        tests: [
          { label: "Clicking copy button writes the prompt directly to clipboard", passed: false, assertion: "assert(clipboardText.length > 0)" }
        ]
      }
    ]
  },

  // 5. design-md-generator
  {
    slug: "design-md-generator",
    command: "/design-md-generator",
    title: "DESIGN.md Architecture Generator",
    headline: "Generate comprehensive, production-ready design systems from natural language",
    category: "agent-skill",
    tag: "Design System",
    accentColor: "#38bdf8",
    accentGradient: "from-cyan-500/20 via-indigo-600/10 to-transparent",
    initiationDate: "2026-07-15",
    dateDisplay: "Jul 2026",
    timeAgo: "1 month ago",
    tldr: "Creates standardized DESIGN.md specification files. Defines your color palettes in OKLCH, typography scales, spacing tokens, and component guidelines for both humans and AI agents.",
    demoUrl: "/wiki/design-md-generator",
    demoType: "wiki",
    demoLabel: "Read DESIGN.md Documentation",
    badges: ["Google Labs Standard", "OKLCH Color Palette", "Typography Scale", "YAML Tokens", "Anti-Generic"],
    overview: "AI coding assistants build much better UI when they have clear design guidelines to follow. This tool generates a complete DESIGN.md file that defines exact colors, font pairings, spacing rules, and layout principles for your project.",
    generativeTheme: "prism-spectrum",
    isPublic: false,
    visualizer: {
      heroTitle: "DESIGN.md Architecture Generator",
      subNamespace: "skill/design-md",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Define Brand Vibe",
          accent: "#38bdf8",
          description: [
            "Select aesthetic direction: Minimalist, cyber, luxury, brutalist",
            "Establish emotional tone and target audience",
            "Identify distinctive typography pairings"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Generate Tokens",
          accent: "#818cf8",
          description: [
            "Calculates harmonious OKLCH color palettes",
            "Defines font scales from H1 to small body text",
            "Sets mathematical spacing and border radii"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Write Rules",
          accent: "#c084fc",
          description: [
            "Defines anti-generic design guardrails",
            "Specifies button, card, and navigation patterns",
            "Sets animation easing curves and transitions"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Export DESIGN.md",
          accent: "#10b981",
          description: [
            "Combines machine-readable YAML and human prose",
            "Places file in project root for AI agent alignment",
            "Enforces consistent UI design across all pages"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Project description, brand identity, or reference website",
        "Target color scheme preferences (Dark / Light)",
        "Desired font pairings and layout style"
      ],
      outputs: [
        "A complete, standardized DESIGN.md specification file",
        "Machine-readable YAML tokens for colors, typography, and spacing",
        "Clear architectural rules preventing generic AI styling"
      ],
      invariants: [
        "Fully conforms to the google-labs-code/design.md specification",
        "Color values calibrated using modern OKLCH color spaces",
        "Includes strict rules banning overused AI design tropes",
        "Directly readable by AI coding assistants"
      ],
      coreEngine: "Token compiler and design rule generator that translates brand guidelines into formal design tokens.",
      dataStructures: [
        "DesignTokens: colors, typography, spacing, shadows, radius",
        "DesignRules: antiTropes[], componentPatterns[], motionCurves[]"
      ],
      stateMachine: [
        "Analyze Brand -> Compute Color Palette -> Scale Typography -> Format YAML -> Generate DESIGN.md"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Token Engine & Color Math",
        tasks: [
          { label: "Build OKLCH color palette generator with light and dark variants", done: false },
          { label: "Configure typographic scale formulas from H1 to micro-copy", done: false },
          { label: "Define concentric border radius rules (outer = inner + padding)", done: false }
        ]
      },
      {
        phase: "Phase 2: Template & Rules Compiler",
        tasks: [
          { label: "Structure YAML token header adhering to DESIGN.md spec", done: false },
          { label: "Embed anti-generic AI design guardrails into prompt template", done: false },
          { label: "Add component guidance for buttons, cards, and inputs", done: false }
        ]
      },
      {
        phase: "Phase 3: Integration & Testing",
        tasks: [
          { label: "Build CLI trigger command and agent hook", done: false },
          { label: "Verify AI models follow the generated DESIGN.md rules", done: false },
          { label: "Publish full documentation in the public Wiki Hub", done: false }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Token Validation",
        tests: [
          { label: "Generated YAML contains all required tokens without syntax errors", passed: false, assertion: "assert(yaml.tokens.colors !== undefined)" },
          { label: "Color values have adequate contrast ratio for accessibility", passed: false, assertion: "assert(contrastRatio >= 4.5)" }
        ]
      },
      {
        suite: "Format Compliance",
        tests: [
          { label: "Output file matches the official Google Labs DESIGN.md standard", passed: false, assertion: "assert(specValid === true)" }
        ]
      }
    ]
  },

  // 6. end
  {
    slug: "end",
    command: "/end",
    title: "End-of-Session Ritual & Memory Keeper",
    headline: "Automated session wrap-up, task retro, memory sync, and safe git commits",
    category: "agent-skill",
    tag: "Agent Memory Engine",
    accentColor: "#22c55e",
    accentGradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    initiationDate: "2026-08-16",
    dateDisplay: "Aug 2026",
    timeAgo: "2 days ago",
    tldr: "A comprehensive end-of-session ritual for AI coding assistants. Audits completed tasks, saves memory into .agents/, stops dangling dev servers, and commits code safely.",
    demoUrl: "/wiki/end",
    demoType: "wiki",
    demoLabel: "Read /end Ritual Guide",
    badges: ["Living Memory", "Automated Retro", "Safe Git Commits", "Server Cleanup", "Zero Context Loss"],
    overview: "When long coding sessions end without a structured wrap-up, AI assistants lose context and leave dangling processes. The /end protocol executes a 4-phase shutdown ritual that updates project memory, verifies task completion, and pushes clean git commits.",
    generativeTheme: "emerald-terminal",
    isPublic: false,
    visualizer: {
      heroTitle: "Session Ritual & Memory Engine",
      subNamespace: "skill/end",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Verify Completion",
          accent: "#22c55e",
          description: [
            "Audits all planned tasks against the Definition of Done",
            "Verifies automated tests and production build status",
            "Confirms user requirements are fully satisfied"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Session Retro",
          accent: "#34d399",
          description: [
            "Summarizes key accomplishments and architectural decisions",
            "Documents any unexpected bugs and their fixes",
            "Identifies logical next steps for the next session"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Persist Memory",
          accent: "#38bdf8",
          description: [
            "Updates .agents/agents.md master harness",
            "Appends new intent to user_intent.md living memory",
            "Preserves long-term project context across sessions"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Safe Commit & Push",
          accent: "#a855f7",
          description: [
            "Stops lingering dev servers and background tasks",
            "Creates clear, structured atomic git commits",
            "Pushes cleanly to main using verified email"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Session task history and completed file diffs",
        "User intent and feedback received during the session",
        "Current git repository status and branch state"
      ],
      outputs: [
        "Updated .agents/ memory files (agents.md, user_intent.md)",
        "Clean, atomic git commits pushed to remote repository",
        "Comprehensive session summary report for the user"
      ],
      invariants: [
        "Never finishes without running automated build verification first",
        "Always uses verified user email for all git commits",
        "Living user intent is permanently appended, never overwritten or lost",
        "All temporary background servers and watchers are safely stopped"
      ],
      coreEngine: "Four-phase state machine that executes verification, retrospect, memory persistence, and git deployment.",
      dataStructures: [
        "SessionAudit: completedTasks[], pendingTasks[], testStatus",
        "MemoryState: intentSummary, harnessVersion, commitSha"
      ],
      stateMachine: [
        "Phase 0: Completion Gate -> Phase 1: Retro -> Phase 2: Persist Memory -> Phase 3: Git Deploy"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Verification & Gate Check",
        tasks: [
          { label: "Build automated test runner and build status verifier", done: false },
          { label: "Check git working tree for uncommitted changes", done: false },
          { label: "Scan for dangling dev servers or background ports", done: false }
        ]
      },
      {
        phase: "Phase 2: Living Memory Sync",
        tasks: [
          { label: "Update .agents/agents.md manifest with latest milestones", done: false },
          { label: "Append cumulative decisions to .agents/wiki/user_intent.md", done: false },
          { label: "Synchronize artifact router and project documentation", done: false }
        ]
      },
      {
        phase: "Phase 3: Safe Git Push",
        tasks: [
          { label: "Format descriptive semantic git commit message", done: false },
          { label: "Enforce verified author email (alimzhan.khalelov@gmail.com)", done: false },
          { label: "Push to origin/main and confirm deployment status", done: false }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Memory Persistence",
        tests: [
          { label: ".agents/agents.md contains updated project status after wrap-up", passed: false, assertion: "assert(fileContent.includes('INTENT'))" },
          { label: "user_intent.md preserves all historical user decisions without truncation", passed: false, assertion: "assert(intentList.length >= 1)" }
        ]
      },
      {
        suite: "Git Safety",
        tests: [
          { label: "Git commit author matches verified user email", passed: false, assertion: "assert(commit.author.email === 'alimzhan.khalelov@gmail.com')" }
        ]
      }
    ]
  }
];

export function getAllProjects(): ProjectDetail[] {
  return SHOWCASE_PROJECTS;
}

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return SHOWCASE_PROJECTS.find((p) => p.slug === slug);
}

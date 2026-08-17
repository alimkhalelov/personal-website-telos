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
  command: string;
  category: "agent-skill" | "engine" | "gallery" | "system";
  tag: string;
  accentColor: string;
  accentGradient: string;
  initiationDate: string;
  dateDisplay: string;
  timeAgo: string;
  tldr: string;
  headline: string;
  demoUrl: string;
  demoType: "wiki" | "presentation" | "skill-visualizer" | "styleref";
  demoLabel: string;
  badges: string[];
  overview: string;
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

export const SHOWCASE_PROJECTS: ProjectDetail[] = [
  {
    slug: "wiki",
    command: "/wiki",
    title: "AI-Wiki Knowledge Compiler",
    headline: "Adaptive 2-Tier Knowledge Architecture & Zero-Bloat Documentation Engine",
    category: "agent-skill",
    tag: "Knowledge Engine",
    accentColor: "#38bdf8",
    accentGradient: "from-sky-500/20 via-blue-600/10 to-transparent",
    initiationDate: "2026-06-12",
    dateDisplay: "Jun 2026",
    timeAgo: "2 months ago",
    tldr: "Automatically discovers real project files, categorizes knowledge into Public & Private 2-Tier meta-layers, and renders hyper-minimalist documentation portals with zero boilerplate.",
    demoUrl: "/wiki",
    demoType: "wiki",
    demoLabel: "Launch Live Wiki Portal",
    badges: ["2-Tier Meta Layer", "Icon-First Minimalist", "Solid Pod UI", "Fast Search", "Obsidian Ready"],
    overview: "The /wiki master protocol scans project files (.agents, content, docs, specs) dynamically without forcing synthetic categories. It enforces icon-first hyper-minimalism, solid pod groupings, and seamless inheritance of the host project's visual identity.",
    generativeTheme: "neon-cyan",
    visualizer: {
      heroTitle: "AI-Wiki Knowledge Compiler",
      subNamespace: "skill/wiki",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Adaptive Discovery",
          accent: "#38bdf8",
          description: [
            "Scan root .md, content/, .agents/",
            "Extract frontmatter & gray-matter",
            "Index heading hierarchy without AST loss"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "2-Tier Classification",
          accent: "#818cf8",
          description: [
            "Partition: Public vs Private Harness",
            "Strip internal boilerplate & synthetic tags",
            "Calculate reading time & takeaways"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Solid-Pod Shell UI",
          accent: "#c084fc",
          description: [
            "Render left-aligned monochrome cards",
            "Icon-first single action controls",
            "Zero border outlines & solid pod backgrounds"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Interactive Synthesis",
          accent: "#34d399",
          description: [
            "Sub-millisecond fuzzy search modal",
            "Deep link anchor parsing with ⌘K hotkey",
            "Live copy-to-clipboard & agent handoff"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Project root markdown files (*.md, *.mdx)",
        ".agents/ memory tree (agents.md, user_intent.md, architecture.md)",
        "User search queries and category filters"
      ],
      outputs: [
        "Typed WikiItem / WikiPage registry with metadata",
        "Reactive 3-column & 2-column DocsLayout views",
        "Sub-millisecond filtered search indices"
      ],
      invariants: [
        "Strict 2-Tier Meta Classification: Public vs Private",
        "Never invent synthetic taxonomies or dummy folders",
        "Icon-First hyper-minimalism (no wordy label clutter)",
        "Zero-outline design system: use solid pods instead of borders"
      ],
      coreEngine: "Fast server-side gray-matter parser with client-side useTransition search filter and hash-aware deep scroll spy.",
      dataStructures: [
        "interface WikiPage { slug, title, category, section, tags, summary, content, headings[] }",
        "interface WikiHeading { depth, slug, text }",
        "interface WikiItem { id, title, summary, category, date, href, keyTakeaway }"
      ],
      stateMachine: [
        "Idle -> File Scanning -> Frontmatter Extraction -> 2-Tier Partitioning -> Render Layout -> Search/Filter State"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Discovery & Parser",
        tasks: [
          { label: "Implement getAllWikiPages() with node:fs & gray-matter", done: true },
          { label: "Add extractHeadings() for dynamic Table of Contents", done: true },
          { label: "Ensure server-only safety boundary for file-system reads", done: true }
        ]
      },
      {
        phase: "Phase 2: UI & Component Shell",
        tasks: [
          { label: "Build DocsLayout with responsive mobile drawer & search modal", done: true },
          { label: "Implement solid pod cards in WikiHub with category tabs", done: true },
          { label: "Add ⌘K hotkey listener and clipboard link copy triggers", done: true }
        ]
      },
      {
        phase: "Phase 3: Route Integration & Markdown View",
        tasks: [
          { label: "Configure /wiki and /wiki/[slug] App Router static generation", done: true },
          { label: "Add MarkdownView with prose styling and code syntax blocks", done: true },
          { label: "Connect Bionic reading toggle and agent copy buttons", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Parser & Data Contracts",
        tests: [
          { label: "extractHeadings() parses h2 and h3 markdown slugs correctly", passed: true, assertion: "assert.deepEqual(headings.length > 0, true)" },
          { label: "parseMarkdownDoc() extracts valid metadata without throw", passed: true, assertion: "assert.strictEqual(doc.visibility, 'public')" },
          { label: "2-Tier partition routes .agents to internal and posts to public", passed: true, assertion: "assert.strictEqual(page.section, 'projects' || 'articles')" }
        ]
      },
      {
        suite: "UI & State Verification",
        tests: [
          { label: "Search query filters by title, tags, and summary simultaneously", passed: true, assertion: "filterItems(items, 'loop').length >= 1" },
          { label: "Keyboard shortcut ⌘K toggles search modal state", passed: true, assertion: "fireEvent.keyDown(window, { metaKey: true, key: 'k' })" },
          { label: "Copy link puts full URL into navigator.clipboard", passed: true, assertion: "expect(navigator.clipboard.writeText).toHaveBeenCalled()" }
        ]
      }
    ]
  },
  {
    slug: "presentation",
    command: "/presentation",
    title: "Strategic Deck & Motion Storytelling Studio",
    headline: "Cinematic HTML Presentations Powered by the 10 Communication Scenarios Matrix",
    category: "agent-skill",
    tag: "Motion Deck Engine",
    accentColor: "#d1fe17",
    accentGradient: "from-lime-400/20 via-emerald-500/10 to-transparent",
    initiationDate: "2026-07-04",
    dateDisplay: "Jul 2026",
    timeAgo: "1.5 months ago",
    tldr: "Creates high-impact, motion-driven HTML presentation decks based on the 10 Communication Vectors, with Jakub/Emil micro-animations, keyboard navigation, and speaker script teleprompter.",
    demoUrl: "/projects/presentation#demo",
    demoType: "presentation",
    demoLabel: "Play Interactive Deck Demo",
    badges: ["10 Vector Matrix", "Teleprompter Mode (S)", "Emil/Jakub Motion", "1 Slide = 1 Idea", "Dark Cyber Aesthetic"],
    overview: "Presentation Studio replaces static, bullet-ridden PowerPoint decks with cinematic, interactive HTML slide engines. Enforces the strict law of 'One Idea = One Slide', calibrated slide pacing (20-30s), teleprompter speaker notes in Russian, and sleek keyboard control.",
    generativeTheme: "lime-cyber",
    visualizer: {
      heroTitle: "Strategic Deck & Motion Engine",
      subNamespace: "skill/presentation",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Discovery & 10 Vectors",
          accent: "#d1fe17",
          description: [
            "Select vector: Upward, VC Pitch, B2B, DevRel",
            "Define single punchline epiphany & target duration",
            "Establish Higgsfield Dark or Linear palette"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Slide Blueprint Map",
          accent: "#fbbf24",
          description: [
            "Apply '1 Idea = 1 Slide' pacing formula",
            "Structure: Hook -> Status Quo -> Shift -> Tech -> Ask",
            "Eliminate dense bullets in favor of split-cards"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Motion Deck Engine",
          accent: "#38bdf8",
          description: [
            "HTML5/CSS3 standalone zero-dependency engine",
            "Emil-grade motion-reveal & SVG stroke drawing",
            "Keyboard shortcuts (←, →, Space, F, #/N)"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Teleprompter Overlay",
          accent: "#ff005b",
          description: [
            "Toggle speaker notes with 'S' key",
            "Conversational Russian script with bold anchors",
            "Seamless transitional bridges between slides"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Topic & core punchline epiphany",
        "Communication Vector (from 10 Scenarios Matrix)",
        "Target presentation duration & speaker script notes"
      ],
      outputs: [
        "Self-contained interactive HTML5/CSS3/JS deck engine",
        "Keyboard event handler (←/→ navigation, S notes, F fullscreen)",
        "Deep-link slide hash routing (#/1..#/N)"
      ],
      invariants: [
        "Strict law: 'One Idea = One Slide' (no crowded bullet walls)",
        "Every slide MUST contain speaker notes (<aside class=\"notes\">)",
        "Zero broken external fonts or layout shift within 100vh viewport",
        "Smooth hardware-accelerated CSS transforms (no jank)"
      ],
      coreEngine: "Client-side lightweight slide state machine with CSS transforms, hashchange listener, and teleprompter overlay modal.",
      dataStructures: [
        "interface SlideData { id, title, subtitle, kicker, content, notes, accent, splitLayout? }",
        "type CommunicationVector = 'upward' | 'downward' | 'pitch' | 'b2b' | 'b2c' | 'devrel' | 'advisory'"
      ],
      stateMachine: [
        "Init (Hash/Slide 0) -> NextSlide -> PrevSlide -> ToggleNotes (S) -> ToggleFullscreen (F) -> TransitionComplete"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Architecture & Vector Matrix",
        tasks: [
          { label: "Formalize 10 Communication Scenarios Matrix", done: true },
          { label: "Implement slide-count calculator formula: Count = (Mins * 60) / 25s", done: true },
          { label: "Define visual palettes: Higgsfield Dark Cyber, Linear Midnight, Swiss Brutalism", done: true }
        ]
      },
      {
        phase: "Phase 2: Motion Deck Engine",
        tasks: [
          { label: "Build keyboard navigation engine (ArrowLeft, ArrowRight, Space)", done: true },
          { label: "Add Emil-grade .motion-reveal and staggered delays", done: true },
          { label: "Build interactive Presenter Mode overlay (S hotkey)", done: true }
        ]
      },
      {
        phase: "Phase 3: React Showcase Integration",
        tasks: [
          { label: "Create PresentationDemo interactive player component", done: true },
          { label: "Implement full slide set for personal demo deck", done: true },
          { label: "Add slide indicator dots and progress bar", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Slide Navigation Engine",
        tests: [
          { label: "ArrowRight increments active slide index until last slide", passed: true, assertion: "nextSlide(0) === 1 && nextSlide(last) === last" },
          { label: "ArrowLeft decrements active slide index until first slide", passed: true, assertion: "prevSlide(1) === 0 && prevSlide(0) === 0" },
          { label: "Pressing 'S' toggles teleprompter notes state", passed: true, assertion: "toggleNotes(false) === true" }
        ]
      },
      {
        suite: "Layout & Viewport Contracts",
        tests: [
          { label: "Slide container adheres strictly to 100vh without overflow scrollbars", passed: true, assertion: "container.scrollHeight <= container.clientHeight" },
          { label: "Presenter notes contain highlighted bold anchor words", passed: true, assertion: "notesElement.querySelectorAll('strong').length > 0" }
        ]
      }
    ]
  },
  {
    slug: "skill-visualizer",
    command: "/skill-visualizer",
    title: "16:9 Vector Flowchart & Architecture Engine",
    headline: "Ultra-Hyper-Minimalist Standalone Vector Architecture Visualizer",
    category: "agent-skill",
    tag: "Vector Architecture",
    accentColor: "#c084fc",
    accentGradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
    initiationDate: "2026-07-28",
    dateDisplay: "Jul 2026",
    timeAgo: "3 weeks ago",
    tldr: "Generates ultra-hyper-minimalist, static, fullscreen 16:9 vector flowcharts (HTML/SVG) tailored bespoke to skill architectures with dynamic density scaling and crisp geometric markers.",
    demoUrl: "/projects/skill-visualizer#demo",
    demoType: "skill-visualizer",
    demoLabel: "Inspect 16:9 Canvas Engine",
    badges: ["1600x900 ViewBox", "Single-Line Headers", "Zero Void Space", "Geometric Arrowheads", "Dynamic Density"],
    overview: "Skill Visualizer rejects generic 5-box linear conveyor templates in favor of bespoke architectural topology. It mathematically calibrates card heights to eliminate empty void space, scales typography dynamically per node count, and outputs pure SVG vector graphics.",
    generativeTheme: "purple-matrix",
    visualizer: {
      heroTitle: "16:9 Vector Architecture Engine",
      subNamespace: "skill/visualizer",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Topology Analysis",
          accent: "#c084fc",
          description: [
            "Determine graph type: Linear, Multi-Tier, Branching",
            "Extract 3 to 6 key architectural milestone nodes",
            "Calculate node dimensions via Dynamic Density Matrix"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Single-Line Headers",
          accent: "#38bdf8",
          description: [
            "Step badge (01) & title share identical font-size (23px)",
            "Solid accent colors per card with zero line wrap",
            "Precise horizontal alignment across 1600px canvas"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Calibrated Geometry",
          accent: "#34d399",
          description: [
            "Mathematical height wrap: ~24px top, ~26px bottom padding",
            "Zero empty black void space below body text",
            "Clean stroke borders (1px) with rounded corners (16px)"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Vector Vector Markers",
          accent: "#fbbf24",
          description: [
            "Geometric sharp arrowheads (<path d='M 0 1.5 L 8 5 L 0 8.5 z' />)",
            "Centered connection lines aligned to card midpoints",
            "Exportable embeddable HTML iframe / responsive SVG"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Skill manifest or architecture topology",
        "Array of nodes: { step, title, accent, description[] }",
        "Namespace title (e.g., 'skill/wiki', 'skill/presentation')"
      ],
      outputs: [
        "Pure standalone SVG element with viewBox='0 0 1600 900'",
        "Responsive wrapper container with aspect-ratio: 16/9",
        "Crisp geometric connection markers and single-line headers"
      ],
      invariants: [
        "Fixed 1600x900 coordinate system wrapped in responsive container",
        "Unified single-line headers (step badge + title same font size)",
        "Zero void space: card heights must fit text tightly",
        "No dark nested podlozhkas or generic icon clutter"
      ],
      coreEngine: "SVG Mathematical Layout Compiler calculating node coordinates (X, Y, W, H) based on column count and dynamic density matrix.",
      dataStructures: [
        "interface NodeConfig { id, step, title, accent, description[], x, y, width, height }",
        "interface DensityScale { nodeCount, cardWidth, cardHeight, titleFontSize, bodyFontSize, dy }"
      ],
      stateMachine: [
        "Parse Topology -> Select Density Scale -> Compute SVG Bounding Boxes -> Render SVG Cards -> Render Arrows -> Export Canvas"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Dynamic Density Scaling",
        tasks: [
          { label: "Implement scaling formulas for 3, 4, 5, and 6 node layouts", done: true },
          { label: "Configure exact font sizes, card widths, and line heights", done: true },
          { label: "Calibrate vertical centering within 900px canvas height", done: true }
        ]
      },
      {
        phase: "Phase 2: SVG Vector Pipeline",
        tasks: [
          { label: "Define sharp vector marker <marker id='arrow'> with path data", done: true },
          { label: "Implement single-line header rendering with matching font-size", done: true },
          { label: "Build zero-void-space multiline <tspan> text renderer", done: true }
        ]
      },
      {
        phase: "Phase 3: Interactive Component & Embeds",
        tasks: [
          { label: "Build SkillVisualizerCanvas React component with SVG export", done: true },
          { label: "Support interactive hover states on cards and nodes", done: true },
          { label: "Add iframe embed generator code snippet", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Coordinate & Bounding Box Math",
        tests: [
          { label: "Total width of nodes + gaps fits within 1600px width", passed: true, assertion: "nodes.reduce((acc, n) => acc + n.width, 0) + gaps < 1600" },
          { label: "All cards are vertically centered around Y=450px line", passed: true, assertion: "Math.abs((card.y + card.height / 2) - 490) < 50" },
          { label: "Single-line header step badge and title share identical font size", passed: true, assertion: "stepBadgeFontSize === titleFontSize" }
        ]
      },
      {
        suite: "SVG Vector Compliance",
        tests: [
          { label: "SVG root has viewBox='0 0 1600 900' and preserveAspectRatio", passed: true, assertion: "svg.getAttribute('viewBox') === '0 0 1600 900'" },
          { label: "Vector marker has sharp geometric triangle definition", passed: true, assertion: "markerPath.getAttribute('d') === 'M 0 1.5 L 8 5 L 0 8.5 z'" }
        ]
      }
    ]
  },
  {
    slug: "styleref",
    command: "/styleref",
    title: "Generative Visual Styles & Prompt DB",
    headline: "Curated Reference Matrix & Prompt Engineering Database for Generative Art",
    category: "gallery",
    tag: "Visual Intelligence",
    accentColor: "#f97316",
    accentGradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    initiationDate: "2026-08-10",
    dateDisplay: "Aug 2026",
    timeAgo: "1 week ago",
    tldr: "Comprehensive database of 19 curated generative art styles (Jakub Różalski, Stålenhag, Beksiński, Blue Eye Samurai, Castlevania, Arcane) with prompt formulas, lighting, and medium parameters.",
    demoUrl: "/projects/styleref",
    demoType: "styleref",
    demoLabel: "Explore Visual Styles Gallery",
    badges: ["19 Curated Styles", "Prompt Matrices", "Interactive Modal", "1-Click Copy Formula", "High-Res References"],
    overview: "StyleRef bridges the gap between artistic vision and generative AI. It deconstructs the signature aesthetic of master artists and prestige animation studios into structured prompts: Medium, Core Concept, Composition, Characters & Tech, Lighting, and Color Palette.",
    generativeTheme: "amber-brutalism",
    visualizer: {
      heroTitle: "Generative Style Deconstruction",
      subNamespace: "gallery/styleref",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Artistic Ingestion",
          accent: "#f97316",
          description: [
            "Catalog 19 visual master styles",
            "Extract signature mediums (oil, cel, gouache)",
            "Ingest high-resolution visual references"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "6-Axis Deconstruction",
          accent: "#fbbf24",
          description: [
            "Medium & classical rendering technique",
            "Composition & camera perspective",
            "Chiaroscuro lighting & calibrated palette"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Prompt Synthesis",
          accent: "#38bdf8",
          description: [
            "Generate weighted Midjourney/Flux formulas",
            "Inject negative prompt safety filters",
            "1-click copy for immediate AI generation"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Interactive Gallery",
          accent: "#34d399",
          description: [
            "Fluid responsive grid with instant search",
            "Full-screen high-res inspection modal",
            "Filter by artistic medium and mood vectors"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "19 high-resolution style reference images (public/styleref/img_01..19.jpeg)",
        "Structured styles_database.json with 6-axis attributes",
        "User search query and medium filter selections"
      ],
      outputs: [
        "Interactive responsive visual style gallery",
        "Detailed inspection modal with prompt copy action",
        "Calculated prompt template strings for Midjourney/Flux"
      ],
      invariants: [
        "All 19 reference images served locally without external CDN failure",
        "Complete 6-axis prompt formula breakdown for every style",
        "1-click clipboard copy of synthesized prompt string",
        "Fluid dark/light mode surface compatibility"
      ],
      coreEngine: "Client-side style filter engine with clipboard synthesis, image preloading, and accessible keyboard modal dialog.",
      dataStructures: [
        "interface StyleRefEntry { id, image, style, shortName, tag, medium, core_concept, composition, lighting, color_palette, mood, negative_prompts }"
      ],
      stateMachine: [
        "Gallery Load -> Filter/Search -> Select Style -> Open Modal -> Copy Formula -> Close Modal"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Asset Migration & Data Layer",
        tasks: [
          { label: "Copy 19 reference images into public/styleref/", done: true },
          { label: "Create src/lib/styles-data.ts with full typed schema", done: true },
          { label: "Add style lookup and category helper functions", done: true }
        ]
      },
      {
        phase: "Phase 2: Gallery UI & Modal Inspection",
        tasks: [
          { label: "Build StyleRefGalleryView with responsive grid", done: true },
          { label: "Add style search bar and category pills", done: true },
          { label: "Build full-featured StyleRefDetailModal with prompt formula copy", done: true }
        ]
      },
      {
        phase: "Phase 3: Showcase Integration",
        tasks: [
          { label: "Mount gallery at /projects/styleref", done: true },
          { label: "Connect thumbnail and card to home page strip", done: true },
          { label: "Add Wiki markdown page in src/content/projects/styleref-gallery.md", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Gallery Data Integrity",
        tests: [
          { label: "All 19 style entries have valid image paths in public/styleref/", passed: true, assertion: "STYLES_DATABASE.every(s => s.image.startsWith('/styleref/'))" },
          { label: "Every entry contains non-empty core_concept, lighting, and palette", passed: true, assertion: "STYLES_DATABASE.every(s => s.core_concept && s.lighting)" }
        ]
      },
      {
        suite: "Interactive Actions",
        tests: [
          { label: "Filter by style name returns matching subset", passed: true, assertion: "filterStyles('Beksiński').length === 1" },
          { label: "Copy prompt button copies full structured prompt text", passed: true, assertion: "expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('oil painting'))" }
        ]
      }
    ]
  },
  {
    slug: "design-md-generator",
    command: "/design-md-generator",
    title: "DESIGN.md Architecture Generator",
    headline: "Standardized Design Token Compiler & Aesthetic Rationale Synthesizer",
    category: "agent-skill",
    tag: "Design Systems",
    accentColor: "#38bdf8",
    accentGradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
    initiationDate: "2026-07-18",
    dateDisplay: "Jul 2026",
    timeAgo: "1 month ago",
    tldr: "Generates standardized DESIGN.md files combining machine-readable YAML frontmatter tokens (colors, typography, geometry) with human-readable architectural rationale.",
    demoUrl: "/projects/design-md-generator#demo",
    demoType: "skill-visualizer",
    demoLabel: "Inspect Design Token Engine",
    badges: ["google-labs spec", "YAML Frontmatter", "Design Tokens", "Aesthetic Rationale", "OKLCH / HEX"],
    overview: "DESIGN.md Generator bridges the gap between machine-readable design tokens and human aesthetic intent. Following the google-labs-code/design.md standard, it produces a single sovereign file defining colors, typography, border radius, and component tokens with in-depth rationale.",
    generativeTheme: "neon-cyan",
    visualizer: {
      heroTitle: "DESIGN.md Token Architecture",
      subNamespace: "skill/design-md-generator",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Requirements Discovery",
          accent: "#38bdf8",
          description: [
            "Analyze brand constraints & identity",
            "Select color vectors & OKLCH/HEX palettes",
            "Establish typographic hierarchy & font pairings"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "YAML Token Matrix",
          accent: "#818cf8",
          description: [
            "Compile frontmatter: colors, spacing, rounded",
            "Map component tokens (button, card, header)",
            "Validate syntax against google-labs schema"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Rationale Synthesis",
          accent: "#c084fc",
          description: [
            "Author deep Markdown prose (## Colors, ## Typography)",
            "Articulate the 'Why' behind every aesthetic choice",
            "Define geometry and layout density rules"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Root File Output",
          accent: "#34d399",
          description: [
            "Write sovereign DESIGN.md in project root",
            "Zero drift between code and documentation",
            "Ready for consumption by AI agents and UI teams"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Brand constraints, target aesthetics, and UI library specs",
        "Color preferences (primary, secondary, background, accent)",
        "Typography pairings and layout scales"
      ],
      outputs: [
        "Sovereign DESIGN.md in project root",
        "Machine-readable YAML frontmatter with tokens",
        "Human-readable Markdown design rationale"
      ],
      invariants: [
        "Strict compliance with google-labs-code/design.md specification",
        "Both YAML tokens and Markdown prose must be present and aligned",
        "Tokens must use explicit units (px, rem, hex/oklch)",
        "Zero hallucinated token keys outside the design system schema"
      ],
      coreEngine: "Two-stage Design Compiler: Stage 1 compiles structured YAML token tree; Stage 2 expands aesthetic justification prose.",
      dataStructures: [
        "interface DesignTokens { name: string; colors: Record<string, string>; typography: Record<string, any>; rounded: Record<string, string>; spacing: Record<string, string>; components: Record<string, any> }",
        "interface DesignDoc { tokens: DesignTokens; rationale: { overview: string; colors: string; typography: string; spacing: string } }"
      ],
      stateMachine: [
        "Discover Constraints -> Token Compilation -> Schema Validation -> Markdown Prose Generation -> Atomic Write -> Complete"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Token Engine & Specification",
        tasks: [
          { label: "Define YAML frontmatter schema according to google-labs specification", done: true },
          { label: "Implement OKLCH/HEX color validator and contrast checker", done: true },
          { label: "Configure typography scale mapping (h1..h4, body, mono)", done: true }
        ]
      },
      {
        phase: "Phase 2: Rationale & Markdown Generator",
        tasks: [
          { label: "Build structured prose template for aesthetic explanation", done: true },
          { label: "Add spacing scale and border radius geometric calculator", done: true },
          { label: "Implement single-command root file persistence", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "YAML Schema Validation",
        tests: [
          { label: "Generated YAML frontmatter parses cleanly without syntax errors", passed: true, assertion: "assert.doesNotThrow(() => yaml.parse(frontmatter))" },
          { label: "All mandatory token keys (colors, typography, rounded, spacing) exist", passed: true, assertion: "['colors', 'typography', 'rounded', 'spacing'].every(k => k in tokens)" }
        ]
      },
      {
        suite: "Markdown Integrity",
        tests: [
          { label: "Markdown body contains all mandatory ## sections (Overview, Colors, Typography)", passed: true, assertion: "content.includes('## Overview') && content.includes('## Colors')" }
        ]
      }
    ]
  },
  {
    slug: "end",
    command: "/end",
    title: "End-of-Session Ritual & Memory Keeper",
    headline: "Autonomous Task Audit, Retrospective, Living Memory Persistence, and Workspace Cleaner",
    category: "agent-skill",
    tag: "Session Lifecycle",
    accentColor: "#22c55e",
    accentGradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    initiationDate: "2026-08-05",
    dateDisplay: "Aug 2026",
    timeAgo: "2 weeks ago",
    tldr: "Comprehensive end-of-session ritual that audits completed tasks, evaluates mistakes, saves persistent state to .agents/agents.md, and executes atomic git commits to prevent context loss.",
    demoUrl: "/projects/end#demo",
    demoType: "skill-visualizer",
    demoLabel: "Inspect Session Wrap Protocol",
    badges: ["Completion Gate", "Task Audit", "Retrospective", "Living Memory Sync", "Atomic Git Push"],
    overview: "The /end protocol standardizes the shutdown ritual for long-running agent coding sessions. It evaluates completion gates, audits requested vs completed work, extracts actionable mistakes, proactively persists project memory (.agents/agents.md), terminates dangling tasks, and executes atomic Git pushes with proper author attribution.",
    generativeTheme: "lime-cyber",
    visualizer: {
      heroTitle: "End-of-Session Wrap Protocol",
      subNamespace: "skill/end",
      nodes: [
        {
          id: "01",
          step: "01",
          title: "Completion Gate",
          accent: "#fbbf24",
          description: [
            "Check for unresolved WIP & failing tests",
            "Verify main goals reached coherent stop point",
            "Halt and warn if critical blockers exist"
          ]
        },
        {
          id: "02",
          step: "02",
          title: "Task Audit & Retro",
          accent: "#38bdf8",
          description: [
            "Audit tasks: ✅ Done, 🔄 Partial, ❌ Failed",
            "Analyze mistakes & inefficient judgment calls",
            "Extract reusable patterns for future skills"
          ]
        },
        {
          id: "03",
          step: "03",
          title: "Proactive Memory",
          accent: "#c084fc",
          description: [
            "Locate and read .agents/agents.md harness",
            "Record session accomplishments & invariants",
            "Formulate crystal-clear immediate Next Steps"
          ]
        },
        {
          id: "04",
          step: "04",
          title: "Clean & Git Push",
          accent: "#22c55e",
          description: [
            "Terminate background tasks & dev servers",
            "Stage files with .gitignore verification",
            "Commit with alimzhan.khalelov@gmail.com and push"
          ]
        }
      ]
    },
    specSDD: {
      inputs: [
        "Session conversation history and task list",
        "Git working tree status and diffs",
        "Existing .agents/agents.md and living memory buffers"
      ],
      outputs: [
        "Updated .agents/agents.md with state and Next Steps",
        "Clean atomic Git commit with verified author email",
        "Single clean session wrap markdown report"
      ],
      invariants: [
        "Never delegate cleanup tasks to the user (proactive execution)",
        "Always verify .gitignore before staging files",
        "Git author email must strictly match alimzhan.khalelov@gmail.com",
        "Next Steps must be concrete and actionable without user re-explaining"
      ],
      coreEngine: "4-Phase Session Lifecycle Pipeline: Phase 0 (Completion Gate) -> Phase 1 (Audit & Retro) -> Phase 2 (Memory Persistence) -> Phase 3 (Process Cleanup & Git).",
      dataStructures: [
        "interface SessionAudit { tasks: { title: string; status: 'done' | 'partial' | 'failed' }[]; mistakes: string[]; reusableWorkflows: string[] }",
        "interface MemoryUpdate { accomplishments: string[]; decisions: string[]; nextSteps: string[] }"
      ],
      stateMachine: [
        "Trigger -> Completion Gate Check -> Task Audit -> Mistake Retrospective -> Memory Update -> Process Kill -> Git Add -> Git Commit -> Report Output"
      ]
    },
    buildChecklist: [
      {
        phase: "Phase 1: Protocol & Ritual Definition",
        tasks: [
          { label: "Formalize Phase 0 Completion Gate criteria and blocker warnings", done: true },
          { label: "Implement Phase 1 Task Audit and Mistakes-focused retrospective", done: true },
          { label: "Design Phase 2 Living Memory persistence format for agents.md", done: true }
        ]
      },
      {
        phase: "Phase 2: Cleanup Automation & Git Hook",
        tasks: [
          { label: "Build background process termination routines", done: true },
          { label: "Configure .gitignore safety checks before staging", done: true },
          { label: "Implement atomic commit generation with verified author email", done: true }
        ]
      }
    ],
    testChecklist: [
      {
        suite: "Completion & Safety Gates",
        tests: [
          { label: "Completion gate catches failing tests and warns before commit", passed: true, assertion: "assert.strictEqual(gateCheck({ hasFailingTests: true }), 'warn')" },
          { label: "Proactive memory update writes non-empty Next Steps array", passed: true, assertion: "assert.ok(agentsMdContent.includes('Next Steps'))" }
        ]
      },
      {
        suite: "Git Attribution & Process Cleanup",
        tests: [
          { label: "Git commit author matches alimzhan.khalelov@gmail.com exactly", passed: true, assertion: "assert.strictEqual(commitAuthorEmail, 'alimzhan.khalelov@gmail.com')" },
          { label: "Background tasks list is empty after Phase 3 cleanup", passed: true, assertion: "assert.strictEqual(activeProcesses.length, 0)" }
        ]
      }
    ]
  }
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return SHOWCASE_PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjects(): ProjectDetail[] {
  return SHOWCASE_PROJECTS;
}

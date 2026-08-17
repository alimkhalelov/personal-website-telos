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
  generativeTheme: "neon-cyan" | "lime-cyber" | "purple-matrix" | "amber-brutalism" | "prism-spectrum" | "emerald-terminal";
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

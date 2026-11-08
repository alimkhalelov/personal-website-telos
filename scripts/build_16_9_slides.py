import os
import base64
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE_DIR = Path(__file__).resolve().parent.parent
CAPTURES_DIR = BASE_DIR / "temp_captures"
PUBLIC_DIR = BASE_DIR / "public" / "projects"

OCUS_OUT = PUBLIC_DIR / "ocus"
PORTAL_OUT = PUBLIC_DIR / "ocus-portal"
OCUS_OUT.mkdir(parents=True, exist_ok=True)
PORTAL_OUT.mkdir(parents=True, exist_ok=True)

def img_to_b64(path):
    with open(path, "rb") as f:
        return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"

# Load raw captures
landing_hero = img_to_b64(CAPTURES_DIR / "landing" / "01_hero.png")
landing_profiles = img_to_b64(CAPTURES_DIR / "landing" / "02_profiles.png")
landing_dag = img_to_b64(CAPTURES_DIR / "landing" / "03_dag.png")
landing_banking = img_to_b64(CAPTURES_DIR / "landing" / "04_banking.png")
landing_partners = img_to_b64(CAPTURES_DIR / "landing" / "05_partners.png")

portal_map = img_to_b64(CAPTURES_DIR / "portal" / "01_map.png")
portal_plan = img_to_b64(CAPTURES_DIR / "portal" / "02_plan.png")
portal_rules = img_to_b64(CAPTURES_DIR / "portal" / "03_rules.png")
portal_model = img_to_b64(CAPTURES_DIR / "portal" / "04_model.png")
portal_licences = img_to_b64(CAPTURES_DIR / "portal" / "05_licences.png")

COMMON_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

body {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  background-color: #07090E;
  background-image: 
    radial-gradient(ellipse 90% 60% at 50% -10%, rgba(16, 185, 129, 0.16), transparent 70%),
    radial-gradient(circle at 10% 90%, rgba(56, 189, 248, 0.08), transparent 40%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 32px 32px;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: #F8FAFC;
  position: relative;
}

.ambient-light-beam {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  background: conic-gradient(from 180deg at 50% 0%, transparent 150deg, rgba(16, 185, 129, 0.18) 180deg, transparent 210deg);
  filter: blur(40px);
  pointer-events: none;
  z-index: 1;
}

.ambient-cyan-beam {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  background: conic-gradient(from 180deg at 50% 0%, transparent 150deg, rgba(56, 189, 248, 0.18) 180deg, transparent 210deg);
  filter: blur(40px);
  pointer-events: none;
  z-index: 1;
}

/* Feature slide layout */
.slide-container {
  width: 1920px;
  height: 1080px;
  padding: 56px 80px 0 80px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}

.header-band {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;
  max-width: 1500px;
}

.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #10B981;
  display: flex;
  align-items: center;
  gap: 8px;
}

.eyebrow-cyan {
  color: #38BDF8;
}

.eyebrow-badge {
  padding: 3px 10px;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  font-size: 13px;
  color: #34D399;
}

.eyebrow-badge-cyan {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #7DD3FC;
}

.slide-title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #FFFFFF;
}

.lit-emerald {
  background: linear-gradient(180deg, #A7F3D0 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lit-cyan {
  background: linear-gradient(180deg, #BAE6FD 0%, #38BDF8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.slide-subtitle {
  font-size: 20px;
  font-weight: 500;
  color: #94A3B8;
  line-height: 1.4;
}

/* Browser Mockup Window */
.browser-window {
  width: 1760px;
  height: 800px;
  background: #0B0E17;
  border-radius: 18px 18px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: none;
  box-shadow: 
    0 35px 80px -15px rgba(0, 0, 0, 0.95),
    0 0 50px -15px rgba(16, 185, 129, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.browser-window-cyan {
  box-shadow: 
    0 35px 80px -15px rgba(0, 0, 0, 0.95),
    0 0 50px -15px rgba(56, 189, 248, 0.15);
}

.window-titlebar {
  height: 48px;
  background: #111624;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
}

.traffic-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-red { background: #FF5F56; }
.dot-yellow { background: #FFBD2E; }
.dot-green { background: #27C93F; }

.url-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #94A3B8;
  background: rgba(0, 0, 0, 0.35);
  padding: 4px 24px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  gap: 8px;
}

.url-lock {
  width: 11px;
  height: 11px;
  opacity: 0.6;
}

.window-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #10B981;
  display: flex;
  align-items: center;
  gap: 6px;
}

.window-viewport {
  width: 100%;
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #020617;
}

.viewport-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* BRAND HERO PREVIEW SLIDE (Style 13 + Tempo Hero Spec) */
.hero-canvas {
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 80px;
  position: relative;
  z-index: 2;
  text-align: center;
}

.brand-icon-wrapper {
  width: 110px;
  height: 110px;
  border-radius: 26px;
  overflow: hidden;
  box-shadow: 0 20px 50px -10px rgba(16, 185, 129, 0.4);
  border: 2px solid rgba(16, 185, 129, 0.4);
  margin-bottom: 24px;
  background: #0B0E14;
}

.brand-icon-wrapper-cyan {
  box-shadow: 0 20px 50px -10px rgba(56, 189, 248, 0.4);
  border: 2px solid rgba(56, 189, 248, 0.4);
}

.hero-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #10B981;
  margin-bottom: 12px;
}

.hero-eyebrow-cyan {
  color: #38BDF8;
}

.hero-headline {
  font-size: 76px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.04;
  margin-bottom: 18px;
  color: #FFFFFF;
}

.hero-tagline {
  font-size: 26px;
  font-weight: 500;
  color: #CBD5E1;
  max-width: 1100px;
  line-height: 1.4;
  margin-bottom: 36px;
}

.hero-pill-strip {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 48px;
}

.hero-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: #E2E8F0;
  backdrop-filter: blur(16px);
}

.hero-pill-emerald {
  border-color: rgba(16, 185, 129, 0.35);
  background: rgba(16, 185, 129, 0.1);
  color: #6EE7B7;
}

.hero-pill-cyan {
  border-color: rgba(56, 189, 248, 0.35);
  background: rgba(56, 189, 248, 0.1);
  color: #7DD3FC;
}

.hero-mockup-frame {
  width: 1200px;
  height: 480px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.95);
  position: relative;
}

.partner-footer-strip {
  position: absolute;
  bottom: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #64748B;
  letter-spacing: 0.12em;
}

.partner-sep {
  opacity: 0.3;
}
"""

print("Compiling templates and launching Playwright...")

def render_feature_slide(eyebrow, badge, title_html, subtitle, img_b64, url, is_cyan=False):
    theme_beam = "ambient-cyan-beam" if is_cyan else "ambient-light-beam"
    eyebrow_cls = "eyebrow eyebrow-cyan" if is_cyan else "eyebrow"
    badge_cls = "eyebrow-badge eyebrow-badge-cyan" if is_cyan else "eyebrow-badge"
    window_cls = "browser-window browser-window-cyan" if is_cyan else "browser-window"
    
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>{COMMON_CSS}</style>
</head>
<body>
  <div class="{theme_beam}"></div>
  <div class="slide-container">
    <div class="header-band">
      <div class="eyebrow-row">
        <span class="{eyebrow_cls}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
          {eyebrow}
        </span>
        <span class="{badge_cls}">{badge}</span>
      </div>
      <h1 class="slide-title">{title_html}</h1>
      <p class="slide-subtitle">{subtitle}</p>
    </div>

    <div class="{window_cls}">
      <div class="window-titlebar">
        <div class="traffic-dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <div class="url-pill">
          <svg class="url-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>{url}</span>
        </div>
        <div class="window-status" style="color: {'#38BDF8' if is_cyan else '#10B981'}">
          <span>● 60 FPS ENGINE</span>
        </div>
      </div>
      <div class="window-viewport">
        <img class="viewport-img" src="{img_b64}" alt="viewport" />
      </div>
    </div>
  </div>
</body>
</html>"""

def render_hero_slide(icon_svg_content, eyebrow, title, tagline, pills, img_b64, is_cyan=False):
    theme_beam = "ambient-cyan-beam" if is_cyan else "ambient-light-beam"
    eyebrow_cls = "hero-eyebrow hero-eyebrow-cyan" if is_cyan else "hero-eyebrow"
    icon_wrap_cls = "brand-icon-wrapper brand-icon-wrapper-cyan" if is_cyan else "brand-icon-wrapper"
    pill_cls = "hero-pill hero-pill-cyan" if is_cyan else "hero-pill hero-pill-emerald"
    title_lit_cls = "lit-cyan" if is_cyan else "lit-emerald"

    pills_html = "".join([f'<div class="{pill_cls}">{p}</div>' for p in pills])

    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>{COMMON_CSS}</style>
</head>
<body>
  <div class="{theme_beam}"></div>
  <div class="hero-canvas">
    <div class="{icon_wrap_cls}">
      {icon_svg_content}
    </div>
    <div class="{eyebrow_cls}">● {eyebrow}</div>
    <h1 class="hero-headline"><span class="{title_lit_cls}">{title}</span></h1>
    <p class="hero-tagline">{tagline}</p>
    
    <div class="hero-pill-strip">
      {pills_html}
    </div>

    <div class="hero-mockup-frame" style="border-color: {'rgba(56, 189, 248, 0.35)' if is_cyan else 'rgba(16, 185, 129, 0.35)'};">
      <img src="{img_b64}" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;" />
    </div>

    <div class="partner-footer-strip">
      <span>CLEAR JUNCTION</span>
      <span class="partner-sep">/</span>
      <span>FIREBLOCKS</span>
      <span class="partner-sep">/</span>
      <span>COBO</span>
      <span class="partner-sep">/</span>
      <span>TIER-1 LAW FIRMS</span>
      <span class="partner-sep">/</span>
      <span>ESMA SUPERVISORY REGISTER</span>
    </div>
  </div>
</body>
</html>"""

with open(PUBLIC_DIR / "ocus" / "icon.svg", "r", encoding="utf-8") as f:
    ocus_icon_svg = f.read()

with open(PUBLIC_DIR / "ocus-portal" / "icon.svg", "r", encoding="utf-8") as f:
    portal_icon_svg = f.read()

SLIDES = [
    # --- OCUS (LANDING) ---
    {
        "out": OCUS_OUT / "01-ocus-brand-hero.png",
        "html": render_hero_slide(
            icon_svg_content=ocus_icon_svg,
            eyebrow="EU CRYPTO COMPLIANCE & BANKING OS",
            title="OCUS",
            tagline="Convert 1,000+ pages of EU MiCA & DORA directives into an executable operations DAG.",
            pills=[
                "● 31 Regulatory Checkpoints",
                "● ESMA Supervisory Sync",
                "● Tier-1 Banking Rails",
                "● €500,000 Capital Test",
            ],
            img_b64=landing_hero,
            is_cyan=False
        )
    },
    {
        "out": OCUS_OUT / "02-automate-mica-dag.png",
        "html": render_feature_slide(
            eyebrow="COMPLIANCE TOPOLOGY",
            badge="MICA & DORA",
            title_html="Automate EU regulations into an <span class='lit-emerald'>executable operations DAG</span>.",
            subtitle="Transform complex legal articles into deterministic, interconnected operational nodes with critical path calculation.",
            img_b64=landing_dag,
            url="ocus.eu/operations/dag",
            is_cyan=False
        )
    },
    {
        "out": OCUS_OUT / "03-expedite-tier1-banking.png",
        "html": render_feature_slide(
            eyebrow="INSTITUTIONAL BANKING",
            badge="WEEKS NOT MONTHS",
            title_html="Expedite Tier-1 European banking and <span class='lit-emerald'>safeguarding rails</span>.",
            subtitle="Pre-integrated with Clear Junction, Fireblocks, and European credit institutions for institutional fiat-crypto settlement.",
            img_b64=landing_banking,
            url="ocus.eu/safeguarding/banking",
            is_cyan=False
        )
    },
    {
        "out": OCUS_OUT / "04-tailored-crypto-profiles.png",
        "html": render_feature_slide(
            eyebrow="CASP ARCHITECTURE",
            badge="MULTI-SEGMENT",
            title_html="Tailored roadmaps for <span class='lit-emerald'>Brokers, Staking & Stablecoins</span>.",
            subtitle="Dynamic risk-adjusted compliance milestones customized for your institutional business model and capital buffer.",
            img_b64=landing_profiles,
            url="ocus.eu/licensing/profiles",
            is_cyan=False
        )
    },
    {
        "out": OCUS_OUT / "05-live-regulatory-telemetry.png",
        "html": render_feature_slide(
            eyebrow="REGULATORY TELEMETRY",
            badge="CONTINUOUS AUDIT",
            title_html="Real-time regulatory telemetry <span class='lit-emerald'>synchronized with ESMA</span>.",
            subtitle="Continuous monitoring of supervisory registers, capital sufficiency, and 30-day safeguarding reconciliations.",
            img_b64=landing_partners,
            url="ocus.eu/telemetry/supervisory-audit",
            is_cyan=False
        )
    },

    # --- OCUS PORTAL ---
    {
        "out": PORTAL_OUT / "01-portal-brand-hero.png",
        "html": render_hero_slide(
            icon_svg_content=portal_icon_svg,
            eyebrow="INTERACTIVE OPERATIONS & LAUNCH ENGINE",
            title="OCUS PORTAL",
            tagline="Real-time critical path analysis, 15-week Gantt milestones & automated regulatory diff monitoring.",
            pills=[
                "● 48% Readiness Engine",
                "● Interactive Topology Map",
                "● 15-Week Gantt Milestones",
                "● Automated Rule Diff",
            ],
            img_b64=portal_map,
            is_cyan=True
        )
    },
    {
        "out": PORTAL_OUT / "02-interactive-launch-topology.png",
        "html": render_feature_slide(
            eyebrow="INTERACTIVE TOPOLOGY",
            badge="CRITICAL PATH",
            title_html="Navigate your launch map with <span class='lit-cyan'>real-time node topology</span>.",
            subtitle="Interactive dependency graphs connecting entity incorporation, capital tests, and vendor integrations with readiness scoring.",
            img_b64=portal_map,
            url="ocus.eu/portal/launch-map",
            is_cyan=True
        )
    },
    {
        "out": PORTAL_OUT / "03-executable-gantt-plan.png",
        "html": render_feature_slide(
            eyebrow="EXECUTION SCHEDULE",
            badge="15-WEEK GANTT",
            title_html="Track 15-week milestones across <span class='lit-cyan'>all regulatory phases</span>.",
            subtitle="From corporate structuring and safeguarding setup to final regulator interview and passporting across 27 EU nations.",
            img_b64=portal_plan,
            url="ocus.eu/portal/execution-plan",
            is_cyan=True
        )
    },
    {
        "out": PORTAL_OUT / "04-instant-bank-passports.png",
        "html": render_feature_slide(
            eyebrow="SAFEGUARDING ACCOUNTS",
            badge="FINANCIAL MODEL",
            title_html="Pre-packaged bank passports and <span class='lit-cyan'>capital models</span>.",
            subtitle="Real-time capital buffer calculators (€350k vs €500k), operational cost models, and institutional safeguarding dossiers.",
            img_b64=portal_model,
            url="ocus.eu/portal/financial-model",
            is_cyan=True
        )
    },
    {
        "out": PORTAL_OUT / "05-regulatory-rule-monitor.png",
        "html": render_feature_slide(
            eyebrow="REGULATORY DRIFT",
            badge="ESMA & DORA ALERTS",
            title_html="Automated regulatory monitor <span class='lit-cyan'>tracking legal changes</span>.",
            subtitle="Live diff tracking across ESMA RTS, EBA guidelines, and national regulator circulars with instant node impact mapping.",
            img_b64=portal_rules,
            url="ocus.eu/portal/rule-changes",
            is_cyan=True
        )
    },
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # 1920x1080 exact 16:9
    context = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
    page = context.new_page()

    for idx, slide in enumerate(SLIDES, start=1):
        print(f"[{idx}/{len(SLIDES)}] Rendering {slide['out'].name} (1920x1080)...")
        page.set_content(slide["html"], wait_until="load")
        page.wait_for_timeout(800)
        page.screenshot(path=str(slide["out"]), full_page=False)
        print(f"   -> Saved: {slide['out']}")

    browser.close()

print("All 10 slides successfully generated in 16:9 aspect ratio!")

import os
import base64
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE_DIR = Path(__file__).resolve().parent.parent
OUT_DIR = BASE_DIR / "public" / "projects" / "ocus"
OUT_DIR.mkdir(parents=True, exist_ok=True)
RAW_DIR = BASE_DIR / "temp_raw_captures"
RAW_DIR.mkdir(parents=True, exist_ok=True)

def img_to_b64(path):
    with open(path, "rb") as f:
        return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"

# 1. Capture genuine high-res runtime screens
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # High-res retina context
    context = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
    
    # Page A: Landing
    page = context.new_page()
    page.goto("https://ocus-eu.vercel.app", wait_until="networkidle")
    page.wait_for_timeout(2000)
    
    # Hero
    page.screenshot(path=str(RAW_DIR / "landing_hero.png"), full_page=False)
    
    # DAG Section
    dag_el = page.query_selector("#graph") or page.query_selector(".dag-container")
    if dag_el:
        dag_el.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
    else:
        page.evaluate("window.scrollTo(0, 1850)")
        page.wait_for_timeout(1000)
    page.screenshot(path=str(RAW_DIR / "landing_dag.png"), full_page=False)
    
    # Banking Section
    bank_el = page.query_selector("#banking")
    if bank_el:
        bank_el.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
    else:
        page.evaluate("window.scrollTo(0, 3100)")
        page.wait_for_timeout(1000)
    page.screenshot(path=str(RAW_DIR / "landing_banking.png"), full_page=False)

    # Page B: Portal
    portal = context.new_page()
    portal.goto("https://ocus-eu.vercel.app/ocus", wait_until="networkidle")
    portal.wait_for_timeout(2000)
    
    # Launch Map (Topology + 48% readiness)
    portal.screenshot(path=str(RAW_DIR / "portal_map.png"), full_page=False)
    
    # Plan (15-week Gantt)
    plan_btn = portal.query_selector('button[data-view="plan"]')
    if plan_btn:
        plan_btn.click()
        portal.wait_for_timeout(1000)
        portal.screenshot(path=str(RAW_DIR / "portal_plan.png"), full_page=False)
    
    browser.close()

print("[+] High-res captures completed!")

# Load raw captures
hero_b64 = img_to_b64(RAW_DIR / "landing_hero.png")
dag_b64 = img_to_b64(RAW_DIR / "landing_dag.png")
map_b64 = img_to_b64(RAW_DIR / "portal_map.png")
banking_b64 = img_to_b64(RAW_DIR / "landing_banking.png")
plan_b64 = img_to_b64(RAW_DIR / "portal_plan.png")

# Exact authentic SVG from web3agency
exact_eye_svg = """<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#F8FAFC" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z"/>
  <circle cx="12" cy="12" r="3.2" fill="#F8FAFC" stroke="none"/>
</svg>"""

PANORAMIC_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,600;0,700;1,700;1,800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

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
  background-color: #07080D;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  color: #F8FAFC;
  position: relative;
}

/* Continuous 9600px Panoramic Ribbon (5 slides x 1920px) */
.panoramic-track-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 9600px;
  height: 1080px;
  pointer-events: none;
  z-index: 1;
}

/* Laser energy ribbon at y: 880px spanning across all slides */
.laser-ribbon-line {
  position: absolute;
  top: 890px;
  left: 0;
  width: 9600px;
  height: 2px;
  background: linear-gradient(90deg, 
    #10B981 0%, 
    #38BDF8 25%, 
    #10B981 50%, 
    #6366F1 75%, 
    #10B981 100%
  );
  box-shadow: 0 0 24px 3px rgba(16, 185, 129, 0.45);
}

.laser-ambient-beam {
  position: absolute;
  top: 720px;
  left: 0;
  width: 9600px;
  height: 360px;
  background: linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.08) 60%, transparent 100%);
  filter: blur(40px);
}

.slide-canvas {
  position: relative;
  width: 1920px;
  height: 1080px;
  z-index: 2;
  overflow: hidden;
}

/* Slide 1: Brand Hero Reveal */
.brand-hero-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 80px;
  position: relative;
  z-index: 3;
}

.brand-icon-box {
  width: 96px;
  height: 96px;
  border-radius: 24px;
  background: #0B0E14;
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.9), 0 0 40px -10px rgba(16, 185, 129, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.brand-hero-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #10B981;
  margin-bottom: 12px;
}

.brand-hero-title {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 88px;
  font-weight: 800;
  font-style: italic;
  letter-spacing: -0.03em;
  line-height: 1.0;
  margin-bottom: 18px;
  background: linear-gradient(180deg, #FFFFFF 0%, #D1D5DB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-hero-oneliner {
  font-size: 24px;
  font-weight: 500;
  color: #94A3B8;
  max-width: 1000px;
  line-height: 1.4;
  margin-bottom: 38px;
}

.brand-hero-pills {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.hero-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 18px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #E2E8F0;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(12px);
}

.hero-pill-emerald {
  border-color: rgba(16, 185, 129, 0.35);
  background: rgba(16, 185, 129, 0.1);
  color: #34D399;
}

.brand-hero-mockup-frame {
  width: 1240px;
  height: 480px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.95), 0 0 50px -15px rgba(16, 185, 129, 0.2);
  background: #020617;
  position: relative;
}

.brand-hero-mockup-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

/* Feature Slides (02, 03, 04, 05) */
.feature-slide-inner {
  width: 100%;
  height: 100%;
  padding: 56px 80px 0 80px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 3;
}

.aso-headline-band {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 34px;
}

.aso-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #10B981;
  display: flex;
  align-items: center;
  gap: 8px;
}

.aso-headline {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 78px;
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: -0.035em;
  line-height: 1.0;
  color: #FFFFFF;
}

.aso-headline .lit-green {
  color: #10B981;
  text-shadow: 0 0 35px rgba(16, 185, 129, 0.5);
}

.aso-headline .lit-cyan {
  color: #38BDF8;
  text-shadow: 0 0 35px rgba(56, 189, 248, 0.5);
}

/* Browser Frame Container */
.clean-browser-frame {
  width: 1760px;
  height: 820px;
  border-radius: 20px 20px 0 0;
  background: #0B0E14;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-bottom: none;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.98);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.browser-bar {
  height: 48px;
  background: #0F131D;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
}

.browser-dots {
  display: flex;
  gap: 8px;
}

.b-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.b-dot-red { background: #FF5F56; }
.b-dot-yellow { background: #FFBD2E; }
.b-dot-green { background: #27C93F; }

.browser-url-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #94A3B8;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px 22px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  gap: 8px;
}

.browser-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #10B981;
}

.browser-screen {
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #020617;
}

.browser-screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* Slide 3: 3D Perspective Tilt */
.tilt-3d-frame {
  transform: perspective(1400px) rotateY(-8deg) rotateX(6deg);
  box-shadow: -40px 40px 100px -15px rgba(0, 0, 0, 0.95), 0 0 60px -15px rgba(16, 185, 129, 0.25);
  transform-origin: center left;
  border-color: rgba(16, 185, 129, 0.35);
}

/* Slide 4: Macro 4.8x Zoom Frame with Peripheral Fog */
.macro-zoom-screen img {
  transform: scale(1.6) translate(-5%, -15%);
  filter: contrast(1.05);
}

.fog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 60% 50%, transparent 40%, rgba(7, 8, 13, 0.85) 90%);
  pointer-events: none;
}
"""

def generate_slide_html(index, content_html):
    track_offset = index * 1920
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>{PANORAMIC_CSS}</style>
</head>
<body>
  <div class="panoramic-track-bg" style="left: -{track_offset}px;">
    <div class="laser-ambient-beam"></div>
    <div class="laser-ribbon-line"></div>
  </div>
  <div class="slide-canvas">
    {content_html}
  </div>
</body>
</html>"""

# SLIDE 1: Brand Hero Reveal (Authentic Logo + Platform)
slide1_content = f"""
<div class="brand-hero-content">
  <div class="brand-icon-box">
    {exact_eye_svg}
  </div>
  <div class="brand-hero-eyebrow">● EU CRYPTO COMPLIANCE & BANKING OS</div>
  <h1 class="brand-hero-title">OCUS</h1>
  <p class="brand-hero-oneliner">From 1,000+ pages of EU MiCA & DORA directives into an executable 31-node operations DAG with Tier-1 banking rails.</p>
  
  <div class="brand-hero-pills">
    <div class="hero-pill hero-pill-emerald">● 31 Regulatory Checkpoints</div>
    <div class="hero-pill">● ESMA Supervisory Sync</div>
    <div class="hero-pill hero-pill-emerald">● Tier-1 Banking Rails</div>
    <div class="hero-pill">● 15-Week Launch Critical Path</div>
  </div>

  <div class="brand-hero-mockup-frame">
    <img src="{hero_b64}" alt="Ocus OS Hero Preview" />
  </div>
</div>
"""

# SLIDE 2: Core Value (Landing 31-Node DAG)
slide2_content = f"""
<div class="feature-slide-inner">
  <div class="aso-headline-band">
    <div class="aso-eyebrow">● COMPLIANCE TOPOLOGY</div>
    <h1 class="aso-headline">AUTOMATE <span class="lit-green">MICA DIRECTIVES</span></h1>
  </div>
  <div class="clean-browser-frame">
    <div class="browser-bar">
      <div class="browser-dots">
        <div class="b-dot b-dot-red"></div>
        <div class="b-dot b-dot-yellow"></div>
        <div class="b-dot b-dot-green"></div>
      </div>
      <div class="browser-url-pill">ocus-eu.vercel.app/#graph</div>
      <div class="browser-status">● 31 ACTIVE NODES</div>
    </div>
    <div class="browser-screen">
      <img src="{dag_b64}" alt="Operations DAG" />
    </div>
  </div>
</div>
"""

# SLIDE 3: Inflection Point (Portal 3D Tilt - Critical Path & Readiness)
slide3_content = f"""
<div class="feature-slide-inner">
  <div class="aso-headline-band">
    <div class="aso-eyebrow">● INTERACTIVE LAUNCH TOPOLOGY</div>
    <h1 class="aso-headline">NAVIGATE <span class="lit-green">THE CRITICAL PATH</span></h1>
  </div>
  <div class="clean-browser-frame tilt-3d-frame">
    <div class="browser-bar">
      <div class="browser-dots">
        <div class="b-dot b-dot-red"></div>
        <div class="b-dot b-dot-yellow"></div>
        <div class="b-dot b-dot-green"></div>
      </div>
      <div class="browser-url-pill">ocus-eu.vercel.app/ocus#map</div>
      <div class="browser-status">● 48% READINESS GAUGE</div>
    </div>
    <div class="browser-screen">
      <img src="{map_b64}" alt="Launch Map Topology" />
    </div>
  </div>
</div>
"""

# SLIDE 4: Intensity & Focus (Macro Zoom - Safeguarding & Banking Rails)
slide4_content = f"""
<div class="feature-slide-inner">
  <div class="aso-headline-band">
    <div class="aso-eyebrow">● INSTITUTIONAL RAILS</div>
    <h1 class="aso-headline">LOCK IN <span class="lit-cyan">TIER-1 BANKING RAILS</span></h1>
  </div>
  <div class="clean-browser-frame">
    <div class="browser-bar">
      <div class="browser-dots">
        <div class="b-dot b-dot-red"></div>
        <div class="b-dot b-dot-yellow"></div>
        <div class="b-dot b-dot-green"></div>
      </div>
      <div class="browser-url-pill">ocus-eu.vercel.app/#banking</div>
      <div class="browser-status" style="color: #38BDF8;">● CLEAR JUNCTION INTEGRATED</div>
    </div>
    <div class="browser-screen macro-zoom-screen">
      <img src="{banking_b64}" alt="Banking Rails" />
      <div class="fog-overlay"></div>
    </div>
  </div>
</div>
"""

# SLIDE 5: Hardware Rig / Cockpit (Portal 15-Week Gantt Timeline)
slide5_content = f"""
<div class="feature-slide-inner">
  <div class="aso-headline-band">
    <div class="aso-eyebrow">● EXECUTION TIMELINE</div>
    <h1 class="aso-headline">EXECUTE <span class="lit-cyan">15-WEEK GANTT</span></h1>
  </div>
  <div class="clean-browser-frame">
    <div class="browser-bar">
      <div class="browser-dots">
        <div class="b-dot b-dot-red"></div>
        <div class="b-dot b-dot-yellow"></div>
        <div class="b-dot b-dot-green"></div>
      </div>
      <div class="browser-url-pill">ocus-eu.vercel.app/ocus#plan</div>
      <div class="browser-status" style="color: #38BDF8;">● TARGET: GO-LIVE</div>
    </div>
    <div class="browser-screen">
      <img src="{plan_b64}" alt="15-Week Plan" />
    </div>
  </div>
</div>
"""

SLIDES = [
    ("01-ocus-brand-hero.png", 0, slide1_content),
    ("02-automate-mica-dag.png", 1, slide2_content),
    ("03-navigate-critical-path.png", 2, slide3_content),
    ("04-lock-in-banking.png", 3, slide4_content),
    ("05-execute-15week-plan.png", 4, slide5_content),
]

print("Rendering 5-slide panoramic ASO set via Playwright at 1920x1080 (16:9)...")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
    page = context.new_page()

    for filename, idx, content in SLIDES:
        html = generate_slide_html(idx, content)
        page.set_content(html, wait_until="load")
        page.wait_for_timeout(600)
        out_path = OUT_DIR / filename
        page.screenshot(path=str(out_path), full_page=False)
        print(f" -> Rendered Slide {idx+1}: {filename} (1920x1080)")

    browser.close()

print("[+] All 5 slides rendered successfully in public/projects/ocus!")

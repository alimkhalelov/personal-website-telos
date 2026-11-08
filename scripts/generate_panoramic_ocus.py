import os
import base64
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

BASE_DIR = Path(__file__).resolve().parent.parent
OUT_DIR = BASE_DIR / "public" / "projects" / "ocus"
OUT_DIR.mkdir(parents=True, exist_ok=True)
RAW_DIR = BASE_DIR / "temp_raw_captures"
RAW_DIR.mkdir(parents=True, exist_ok=True)

WEB3AGENCY_DIR = Path(r"D:\Study&Work\2025\Antigravity Vibecoding Projects\web3agency")

def img_to_b64(path):
    with open(path, "rb") as f:
        return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"

print("[1/4] Capturing pristine high-res runtime screens via Playwright...")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # High-res retina context
    context = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
    
    # 1. Landing Hero (Genuine live capture)
    page = context.new_page()
    page.goto("https://ocus-eu.vercel.app", wait_until="networkidle")
    page.wait_for_timeout(2000)
    page.screenshot(path=str(RAW_DIR / "live_landing_hero.png"), full_page=False)
    
    # 2. Operations DAG (Scroll to DAG)
    dag_el = page.query_selector("#graph") or page.query_selector(".dag-container")
    if dag_el:
        dag_el.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
    else:
        page.evaluate("window.scrollTo(0, 1850)")
        page.wait_for_timeout(1000)
    page.screenshot(path=str(RAW_DIR / "live_landing_dag.png"), full_page=False)

    browser.close()

# Use 2880x1800 genuine platform captures directly from web3agency project assets
platform_map_src = WEB3AGENCY_DIR / "assets" / "platform" / "screen-launch-map.png"
platform_plan_src = WEB3AGENCY_DIR / "assets" / "platform" / "screen-launch-plan.png"
platform_bank_src = WEB3AGENCY_DIR / "assets" / "platform" / "screen-bank-passport.png"

hero_b64 = img_to_b64(RAW_DIR / "live_landing_hero.png")
dag_b64 = img_to_b64(RAW_DIR / "live_landing_dag.png")
map_b64 = img_to_b64(platform_map_src)
plan_b64 = img_to_b64(platform_plan_src)
bank_b64 = img_to_b64(platform_bank_src)

# Authentic project icon SVG from web3agency
exact_icon_svg = """<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F8FAFC" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z"/>
  <circle cx="12" cy="12" r="3.2" fill="#F8FAFC" stroke="none"/>
</svg>"""

PANORAMIC_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,600;0,700;1,700;1,800&display=swap');

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
  font-family: 'Chakra Petch', sans-serif;
  color: #F8FAFC;
  position: relative;
}

/* Continuous 9600px Panoramic Track (5 screens x 1920px) */
.panoramic-track-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 9600px;
  height: 1080px;
  pointer-events: none;
  z-index: 1;
}

.laser-ribbon-line {
  position: absolute;
  top: 920px;
  left: 0;
  width: 9600px;
  height: 3px;
  background: linear-gradient(90deg, 
    #10B981 0%, 
    #38BDF8 25%, 
    #10B981 50%, 
    #6366F1 75%, 
    #10B981 100%
  );
  box-shadow: 0 0 30px 4px rgba(16, 185, 129, 0.55);
}

.laser-ambient-beam {
  position: absolute;
  top: 700px;
  left: 0;
  width: 9600px;
  height: 380px;
  background: linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.12) 60%, transparent 100%);
  filter: blur(50px);
}

.slide-canvas {
  position: relative;
  width: 1920px;
  height: 1080px;
  z-index: 2;
  overflow: hidden;
}

/* Slide 1: Brand Hero Reveal */
.brand-hero-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 80px 20px;
  position: relative;
  z-index: 3;
}

.brand-icon-box {
  width: 104px;
  height: 104px;
  border-radius: 26px;
  background: #0B0E14;
  border: 2px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px -10px rgba(16, 185, 129, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.brand-name {
  font-size: 116px;
  font-weight: 800;
  font-style: italic;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 14px;
  background: linear-gradient(180deg, #FFFFFF 0%, #D1D5DB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-mission {
  font-size: 30px;
  font-weight: 700;
  color: #10B981;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 36px;
  text-shadow: 0 0 25px rgba(16, 185, 129, 0.45);
}

.brand-hero-frame {
  width: 1300px;
  height: 520px;
  border-radius: 24px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.98), 0 0 60px -15px rgba(16, 185, 129, 0.25);
  background: #020617;
  position: relative;
}

.brand-hero-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.screen-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.07) 0%, transparent 55%);
  pointer-events: none;
}

/* Feature Slides (02, 03, 04, 05) - Strict Radical Luxury Restraint */
.slide-feature-wrap {
  width: 100%;
  height: 100%;
  padding: 48px 80px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 3;
}

/* Giant 104px Chakra Petch Headline (ACTION VERB + BENEFIT) */
.headline-bar {
  margin-bottom: 32px;
}

.aso-headline-text {
  font-size: 100px;
  line-height: 0.95;
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: -0.035em;
  color: #FFFFFF;
}

.accent-green {
  color: #10B981;
  text-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
}

.accent-cyan {
  color: #38BDF8;
  text-shadow: 0 0 40px rgba(56, 189, 248, 0.6);
}

/* Edge-to-Edge Titanium Bezel */
.titanium-frame {
  width: 1760px;
  height: 840px;
  border-radius: 28px 28px 0 0;
  background: #0B0E14;
  border: 2px solid rgba(255, 255, 255, 0.16);
  border-bottom: none;
  box-shadow: 0 40px 100px -15px rgba(0, 0, 0, 0.98);
  overflow: hidden;
  position: relative;
}

.titanium-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* Slide 3: 3D Perspective Tilt */
.tilt-3d {
  transform: perspective(1400px) rotateY(-8deg) rotateX(6deg);
  transform-origin: center left;
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: -40px 40px 100px -15px rgba(0, 0, 0, 0.98), 0 0 70px -10px rgba(16, 185, 129, 0.35);
}

/* Slide 4: Macro 4.8x Zoom with Peripheral CSS Fog */
.macro-zoom img {
  transform: scale(1.65) translate(-4%, -14%);
  filter: contrast(1.05);
}

.fog-radial-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 60% 50%, transparent 40%, rgba(7, 8, 13, 0.88) 88%);
  pointer-events: none;
}
"""

def make_slide(index, body_html):
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
    {body_html}
  </div>
</body>
</html>"""

# Slide 1: Brand Hero Reveal (Brandmark + One-liner + Hero Frame)
s1 = f"""
<div class="brand-hero-wrap">
  <div class="brand-icon-box">
    {exact_icon_svg}
  </div>
  <h1 class="brand-name">OCUS</h1>
  <div class="brand-mission">EU CRYPTO COMPLIANCE & BANKING OS</div>
  
  <div class="brand-hero-frame">
    <img src="{hero_b64}" alt="Ocus OS Hero Preview" />
    <div class="screen-glare"></div>
  </div>
</div>
"""

# Slide 2: Core Value (CRUSH MICA COMPLEXITY)
s2 = f"""
<div class="slide-feature-wrap">
  <div class="headline-bar">
    <h1 class="aso-headline-text">CRUSH <span class="accent-green">MICA COMPLEXITY</span></h1>
  </div>
  <div class="titanium-frame">
    <img src="{dag_b64}" alt="31-Node Operations DAG" />
    <div class="screen-glare"></div>
  </div>
</div>
"""

# Slide 3: Inflection Point (SURGE PAST CRITICAL PATH - 3D Tilt)
s3 = f"""
<div class="slide-feature-wrap">
  <div class="headline-bar">
    <h1 class="aso-headline-text">SURGE PAST <span class="accent-green">CRITICAL PATH</span></h1>
  </div>
  <div class="titanium-frame tilt-3d">
    <img src="{map_b64}" alt="Launch Map Node Topology" />
    <div class="screen-glare"></div>
  </div>
</div>
"""

# Slide 4: Focus Zone (LOCK IN TIER-1 BANKING - Macro Zoom + Fog)
s4 = f"""
<div class="slide-feature-wrap">
  <div class="headline-bar">
    <h1 class="aso-headline-text">LOCK IN <span class="accent-cyan">TIER-1 BANKING</span></h1>
  </div>
  <div class="titanium-frame macro-zoom">
    <img src="{bank_b64}" alt="Institutional Bank Passport & Rails" />
    <div class="fog-radial-mask"></div>
    <div class="screen-glare"></div>
  </div>
</div>
"""

# Slide 5: Real-World Context (RIG 15-WEEK LAUNCH GANTT - Cockpit)
s5 = f"""
<div class="slide-feature-wrap">
  <div class="headline-bar">
    <h1 class="aso-headline-text">RIG 15-WEEK <span class="accent-cyan">LAUNCH GANTT</span></h1>
  </div>
  <div class="titanium-frame">
    <img src="{plan_b64}" alt="15-Week Gantt Timeline" />
    <div class="screen-glare"></div>
  </div>
</div>
"""

SLIDES = [
    ("01-ocus-brand-reveal.png", 0, s1),
    ("02-crush-compliance.png", 1, s2),
    ("03-surge-critical-path.png", 2, s3),
    ("04-lock-in-banking.png", 3, s4),
    ("05-rig-launch-cockpit.png", 4, s5),
]

print("[2/4] Rendering 5 ASO slides strictly according to /panoramic-aso-studio...")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
    page = context.new_page()

    for filename, idx, content in SLIDES:
        html = make_slide(idx, content)
        page.set_content(html, wait_until="load")
        page.wait_for_timeout(500)
        target = OUT_DIR / filename
        page.screenshot(path=str(target), full_page=False)
        print(f"   -> Rendered Slide {idx+1}: {filename} (1920x1080)")

    browser.close()

print("[3/4] Building panoramic showcase & running 280px legibility test...")

slide_paths = [str(OUT_DIR / name) for name, _, _ in SLIDES]
images = [Image.open(s) for s in slide_paths]

# 1. Master Continuous Strip (9600 x 1080)
total_w = sum(img.width for img in images)
max_h = max(img.height for img in images)
master = Image.new("RGBA", (total_w, max_h), (7, 8, 13, 255))
offset = 0
for img in images:
    master.paste(img, (offset, 0))
    offset += img.width
master.save(OUT_DIR / "panoramic-showcase.png", "PNG")

# 2. Product Hunt & Behance Hero (3840 x 2160)
hero_w, hero_h = 3840, 2160
hero = Image.new("RGBA", (hero_w, hero_h), (7, 8, 13, 255))
scale = 3600 / total_w
strip_w = int(total_w * scale)
strip_h = int(max_h * scale)
resized = master.resize((strip_w, strip_h), Image.Resampling.LANCZOS)
hero.paste(resized, ((hero_w - strip_w) // 2, (hero_h - strip_h) // 2))
hero.save(OUT_DIR / "producthunt-hero.png", "PNG")

# 3. 280px Thumbnail Legibility Test Gate
thumb_w = 280
thumb_h = int(images[0].height * (thumb_w / images[0].width))
thumb = images[0].resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
thumb.save(OUT_DIR / "thumbnail-legibility-test-280px.png", "PNG")

print("[4/4] Panoramic ASO pipeline successfully completed!")

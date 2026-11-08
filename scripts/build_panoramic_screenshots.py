import os
import base64
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

BASE_DIR = Path(__file__).resolve().parent.parent
OUT_DIR = BASE_DIR / "public" / "projects" / "ocus"
OUT_DIR.mkdir(parents=True, exist_ok=True)
RAW_DIR = BASE_DIR / "temp_live_captures"
RAW_DIR.mkdir(parents=True, exist_ok=True)

def img_to_b64(path):
    with open(path, "rb") as f:
        return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"

print("[1/4] Capturing 100% genuine live Dark Surface screens from https://ocus-eu.vercel.app/ocus...")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # High-res 2x retina context for crisp vectors and typography
    context = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
    page = context.new_page()

    # 1. Open /ocus
    page.goto("https://ocus-eu.vercel.app/ocus", wait_until="networkidle")
    page.wait_for_timeout(2000)

    # 2. Toggle Dark Surface mode
    dark_btn = page.locator("button:has-text('Dark Surface')").first
    if dark_btn.is_visible():
        dark_btn.click()
        page.wait_for_timeout(1500)
        print("   -> Toggled Dark Surface mode")

    # 3. Capture Launch Map (Operations Graph in dark mode)
    map_btn = page.locator("button:has-text('Launch map'), a:has-text('Launch map')").first
    if map_btn.is_visible():
        map_btn.click()
        page.wait_for_timeout(1000)
    page.screenshot(path=str(RAW_DIR / "live_dark_map.png"))
    print("   -> Captured live_dark_map.png")

    # 4. Capture Plan (Critical Path Gantt Timeline in dark mode)
    plan_btn = page.locator("button:has-text('Plan'), a:has-text('Plan')").first
    if plan_btn.is_visible():
        plan_btn.click()
        page.wait_for_timeout(1500)
    page.screenshot(path=str(RAW_DIR / "live_dark_plan.png"))
    print("   -> Captured live_dark_plan.png")

    # 5. Capture Bank Passport (Cryptographically verified banking rails in dark mode)
    bank_btn = page.locator("button:has-text('Bank passport'), a:has-text('Bank passport')").first
    if bank_btn.is_visible():
        bank_btn.click()
        page.wait_for_timeout(1500)
    page.screenshot(path=str(RAW_DIR / "live_dark_bank.png"))
    print("   -> Captured live_dark_bank.png")

    # 6. Capture Licences & Passporting across EU
    lic_btn = page.locator("button:has-text('Licences'), a:has-text('Licences')").first
    if lic_btn.is_visible():
        lic_btn.click()
        page.wait_for_timeout(1500)
    page.screenshot(path=str(RAW_DIR / "live_dark_licences.png"))
    print("   -> Captured live_dark_licences.png")

    browser.close()

# Base64 encode captures
map_b64 = img_to_b64(RAW_DIR / "live_dark_map.png")
plan_b64 = img_to_b64(RAW_DIR / "live_dark_plan.png")
bank_b64 = img_to_b64(RAW_DIR / "live_dark_bank.png")
licences_b64 = img_to_b64(RAW_DIR / "live_dark_licences.png")

# Authentic brand icon SVG
exact_icon_svg = """<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#F8FAFC" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z"/>
  <circle cx="12" cy="12" r="3.2" fill="#10B981" stroke="none"/>
</svg>"""

# Dynamic Kinetic Ocus Radar/Telemetry Motif for Slide 1 (analogous to Tempo's runner)
kinetic_radar_motif_svg = """<svg width="440" height="240" viewBox="0 0 440 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#10B981" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="eyeStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
  </defs>

  <!-- Ambient Radar Glow -->
  <circle cx="220" cy="120" r="110" fill="url(#radarPulse)"/>

  <!-- Orbital Rings -->
  <circle cx="220" cy="120" r="105" stroke="#10B981" stroke-width="1.2" stroke-opacity="0.22" stroke-dasharray="4 6"/>
  <circle cx="220" cy="120" r="75" stroke="#38BDF8" stroke-width="1.2" stroke-opacity="0.3" stroke-dasharray="2 4"/>
  <circle cx="220" cy="120" r="45" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.45"/>

  <!-- Crosshair Coordinates -->
  <line x1="80" y1="120" x2="360" y2="120" stroke="#10B981" stroke-width="1" stroke-opacity="0.2"/>
  <line x1="220" y1="20" x2="220" y2="220" stroke="#10B981" stroke-width="1" stroke-opacity="0.2"/>

  <!-- Glowing Telemetry Target Nodes -->
  <circle cx="280" cy="80" r="4" fill="#38BDF8"/>
  <circle cx="280" cy="80" r="8" stroke="#38BDF8" stroke-width="1" stroke-opacity="0.4"/>
  <circle cx="160" cy="160" r="4" fill="#10B981"/>
  <circle cx="160" cy="160" r="8" stroke="#10B981" stroke-width="1" stroke-opacity="0.4"/>
  <circle cx="310" cy="135" r="3.5" fill="#F59E0B"/>
  <circle cx="130" cy="95" r="3.5" fill="#10B981"/>

  <!-- Central Dynamic Eye Motif -->
  <path d="M170 120 C185 96 255 96 270 120 C255 144 185 144 170 120 Z" stroke="url(#eyeStrokeGrad)" stroke-width="3" fill="#07080D" fill-opacity="0.8"/>
  <circle cx="220" cy="120" r="12" fill="#10B981" stroke="#38BDF8" stroke-width="2"/>
  <circle cx="220" cy="120" r="5" fill="#F8FAFC"/>

  <!-- Telemetry Labels -->
  <text x="294" y="78" fill="#38BDF8" font-family="'Chakra Petch', sans-serif" font-size="11" letter-spacing="1">MICA Art.67</text>
  <text x="100" y="174" fill="#10B981" font-family="'Chakra Petch', sans-serif" font-size="11" letter-spacing="1">TIER-1 RAIL</text>
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

/* Subtle architectural grid background */
.grid-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 1;
}

/* Continuous 9600px Panoramic Track across all 5 screens */
.panoramic-track-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 9600px;
  height: 1080px;
  pointer-events: none;
  z-index: 2;
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
  box-shadow: 0 0 35px 5px rgba(16, 185, 129, 0.6);
}

.laser-ambient-beam {
  position: absolute;
  top: 720px;
  left: 0;
  width: 9600px;
  height: 360px;
  background: linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.12) 60%, transparent 100%);
  filter: blur(55px);
}

.slide-canvas {
  position: relative;
  width: 1920px;
  height: 1080px;
  z-index: 3;
  overflow: hidden;
}

/* ============================================================
   SLIDE 1: BRAND HERO REVEAL POSTER (ANALOGOUS TO TEMPO 01)
   ============================================================ */
.brand-hero-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 4;
  padding: 60px 80px 100px;
}

.brand-icon-box {
  width: 120px;
  height: 120px;
  border-radius: 32px;
  background: #0B0E14;
  border: 2px solid rgba(16, 185, 129, 0.45);
  box-shadow: 
    0 30px 80px -15px rgba(0, 0, 0, 0.95), 
    0 0 60px -10px rgba(16, 185, 129, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
}

.brand-title {
  font-size: 140px;
  font-weight: 800;
  font-style: italic;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 18px;
  background: linear-gradient(180deg, #FFFFFF 0%, #D1D5DB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-mission {
  font-size: 32px;
  font-weight: 700;
  color: #10B981;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 48px;
  text-shadow: 0 0 30px rgba(16, 185, 129, 0.55);
}

.brand-kinetic-motif {
  margin-top: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ============================================================
   FEATURE SLIDES (02, 03, 04, 05) - RADICAL LUXURY RESTRAINT
   ============================================================ */
.feature-slide-wrap {
  width: 100%;
  height: 100%;
  padding: 44px 80px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 4;
}

.headline-bar {
  margin-bottom: 28px;
}

.headline-text {
  font-size: 104px;
  line-height: 0.92;
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: -0.035em;
  color: #FFFFFF;
}

.accent-green {
  color: #10B981;
  text-shadow: 0 0 45px rgba(16, 185, 129, 0.65);
}

.accent-cyan {
  color: #38BDF8;
  text-shadow: 0 0 45px rgba(56, 189, 248, 0.65);
}

/* Edge-to-Edge Titanium Bezel for Dark Surface UI */
.titanium-frame {
  width: 1760px;
  height: 855px;
  border-radius: 28px 28px 0 0;
  background: #0B0E14;
  border: 2px solid rgba(255, 255, 255, 0.18);
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

.screen-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.05) 0%, transparent 55%);
  pointer-events: none;
}

/* Slide 3: 3D Perspective Tilt */
.tilt-3d {
  transform: perspective(1400px) rotateY(-8deg) rotateX(6deg);
  transform-origin: center left;
  border-color: rgba(16, 185, 129, 0.45);
  box-shadow: -40px 40px 100px -15px rgba(0, 0, 0, 0.98), 0 0 70px -10px rgba(16, 185, 129, 0.35);
}

/* Slide 4: Macro 4.8x Zoom with Peripheral CSS Fog */
.macro-zoom img {
  transform: scale(1.68) translate(-6%, -10%);
  filter: contrast(1.08) brightness(1.04);
}

.fog-radial-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 58% 48%, transparent 35%, rgba(7, 8, 13, 0.92) 86%);
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
  <div class="grid-bg"></div>
  <div class="panoramic-track-bg" style="left: -{track_offset}px;">
    <div class="laser-ambient-beam"></div>
    <div class="laser-ribbon-line"></div>
  </div>
  <div class="slide-canvas">
    {body_html}
  </div>
</body>
</html>"""

# Slide 1: Brand Hero Reveal (Brandmark + Giant Name + One-Liner + Kinetic Radar Motif)
s1 = f"""
<div class="brand-hero-container">
  <div class="brand-icon-box">
    {exact_icon_svg}
  </div>
  <h1 class="brand-title">OCUS</h1>
  <div class="brand-mission">EU CRYPTO COMPLIANCE & BANKING OS</div>
  
  <div class="brand-kinetic-motif">
    {kinetic_radar_motif_svg}
  </div>
</div>
"""

# Slide 2: Core Value (CRUSH MICA COMPLEXITY - Live Dark Map)
s2 = f"""
<div class="feature-slide-wrap">
  <div class="headline-bar">
    <h1 class="headline-text">CRUSH <span class="accent-green">MICA COMPLEXITY</span></h1>
  </div>
  <div class="titanium-frame">
    <img src="{map_b64}" alt="31-Node Operations DAG in Dark Surface Mode" />
    <div class="screen-glare"></div>
  </div>
</div>
"""

# Slide 3: Inflection Point (SURGE PAST CRITICAL PATH - Live Dark Plan with 3D Tilt)
s3 = f"""
<div class="feature-slide-wrap">
  <div class="headline-bar">
    <h1 class="headline-text">SURGE PAST <span class="accent-green">CRITICAL PATH</span></h1>
  </div>
  <div class="titanium-frame tilt-3d">
    <img src="{plan_b64}" alt="Interactive 15-Week Gantt Timeline with Critical Path" />
    <div class="screen-glare"></div>
  </div>
</div>
"""

# Slide 4: Focus Zone (LOCK IN TIER-1 BANKING - Live Dark Bank with Macro Zoom & Radial Fog)
s4 = f"""
<div class="feature-slide-wrap">
  <div class="headline-bar">
    <h1 class="headline-text">LOCK IN <span class="accent-cyan">TIER-1 BANKING</span></h1>
  </div>
  <div class="titanium-frame macro-zoom">
    <img src="{bank_b64}" alt="Cryptographically Verified Institutional Bank Passport" />
    <div class="fog-radial-mask"></div>
    <div class="screen-glare"></div>
  </div>
</div>
"""

# Slide 5: Real-World Context (DOMINATE PAN-EU LICENSING - Live Dark Licences Matrix)
s5 = f"""
<div class="feature-slide-wrap">
  <div class="headline-bar">
    <h1 class="headline-text">DOMINATE PAN-EU <span class="accent-cyan">LICENSING</span></h1>
  </div>
  <div class="titanium-frame">
    <img src="{licences_b64}" alt="Pan-European CASP Licences and Passporting Matrix" />
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

print("[2/4] Rendering 5 pristine 16:9 widescreen slides...")

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
        print(f"   -> Rendered {filename} (1920x1080)")

    browser.close()

print("[3/4] Generating master panoramic showcase & 280px mobile legibility gate...")

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
print("   -> Created panoramic-showcase.png (9600x1080)")

# 2. Product Hunt & Behance Hero (3840 x 2160)
hero_w, hero_h = 3840, 2160
hero = Image.new("RGBA", (hero_w, hero_h), (7, 8, 13, 255))
scale = 3600 / total_w
strip_w = int(total_w * scale)
strip_h = int(max_h * scale)
resized = master.resize((strip_w, strip_h), Image.Resampling.LANCZOS)
hero.paste(resized, ((hero_w - strip_w) // 2, (hero_h - strip_h) // 2))
hero.save(OUT_DIR / "producthunt-hero.png", "PNG")
print("   -> Created producthunt-hero.png (3840x2160)")

# 3. 280px Thumbnail Legibility Test Gate
thumb_w = 280
thumb_h = int(images[0].height * (thumb_w / images[0].width))
thumb = images[0].resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
thumb.save(OUT_DIR / "thumbnail-legibility-test-280px.png", "PNG")
print("   -> Created thumbnail-legibility-test-280px.png (280px legibility gate)")

print("[4/4] Pipeline completed successfully!")

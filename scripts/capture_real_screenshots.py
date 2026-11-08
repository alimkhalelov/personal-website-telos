import os
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

OUT_DIR = Path("public/projects/ocus")
OUT_DIR.mkdir(parents=True, exist_ok=True)

print("[1/3] Capturing pure 16:9 widescreen screenshots from live Landing & Platform...")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # Viewport 1920x1080 16:9 at DPR 2 for retina sharpness
    context = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
    
    # -------------------------------------------------------------
    # 1. Landing Hero
    # -------------------------------------------------------------
    page = context.new_page()
    page.goto("https://ocus-eu.vercel.app", wait_until="networkidle")
    page.wait_for_timeout(2500)
    page.screenshot(path=str(OUT_DIR / "01-landing-hero.png"))
    print("   -> 01-landing-hero.png captured")

    # -------------------------------------------------------------
    # 2. Landing Operations Graph
    # -------------------------------------------------------------
    # Scroll smoothly to the Operations Graph section
    page.evaluate("window.scrollTo(0, 1650)")
    page.wait_for_timeout(1500)
    page.screenshot(path=str(OUT_DIR / "02-landing-dag-interactive.png"))
    print("   -> 02-landing-dag-interactive.png captured")

    # -------------------------------------------------------------
    # 3. Platform Cockpit - Launch Map
    # -------------------------------------------------------------
    platform_page = context.new_page()
    platform_page.goto("https://ocus-eu.vercel.app/ocus", wait_until="networkidle")
    platform_page.wait_for_timeout(3000)
    platform_page.screenshot(path=str(OUT_DIR / "03-platform-launch-map.png"))
    print("   -> 03-platform-launch-map.png captured")

    # -------------------------------------------------------------
    # 4. Platform Cockpit - Launch Plan & Critical Path Gantt
    # -------------------------------------------------------------
    plan_btn = platform_page.locator("button:has-text('Plan'), a:has-text('Plan')").first
    if plan_btn.is_visible():
        plan_btn.click()
        platform_page.wait_for_timeout(2000)
    platform_page.screenshot(path=str(OUT_DIR / "04-platform-critical-path.png"))
    print("   -> 04-platform-critical-path.png captured")

    # -------------------------------------------------------------
    # 5. Platform Cockpit - Bank Passport & Safeguarding Rails
    # -------------------------------------------------------------
    bank_btn = platform_page.locator("button:has-text('Bank passport'), a:has-text('Bank passport')").first
    if bank_btn.is_visible():
        bank_btn.click()
        platform_page.wait_for_timeout(2000)
    platform_page.screenshot(path=str(OUT_DIR / "05-platform-bank-passport.png"))
    print("   -> 05-platform-bank-passport.png captured")

    browser.close()

print("[2/3] Resizing to exact 1920x1080 high-res PNG format...")
files = [
    "01-landing-hero.png",
    "02-landing-dag-interactive.png",
    "03-platform-launch-map.png",
    "04-platform-critical-path.png",
    "05-platform-bank-passport.png",
]

for filename in files:
    path = OUT_DIR / filename
    with Image.open(path) as img:
        # Resize from DPR 2 (3840x2160) to 1920x1080 with high-quality Lanczos resampling
        if img.size != (1920, 1080):
            resized = img.resize((1920, 1080), Image.Resampling.LANCZOS)
            resized.save(path, "PNG", optimize=True)
            print(f"   -> Optimized {filename} to 1920x1080")

print("[3/3] All pure screenshots captured successfully!")

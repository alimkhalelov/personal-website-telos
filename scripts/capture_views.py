from playwright.sync_api import sync_playwright
import os, time

os.makedirs('temp_captures/landing', exist_ok=True)
os.makedirs('temp_captures/portal', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # 1920x1080 retina viewport
    context = browser.new_context(viewport={'width': 1920, 'height': 1080}, device_scale_factor=2)
    
    # --- CAPTURE LANDING ---
    print('Capturing landing views...')
    page = context.new_page()
    page.goto('https://ocus-eu.vercel.app', wait_until='networkidle')
    page.wait_for_timeout(2000)
    
    # 1. Hero
    page.screenshot(path='temp_captures/landing/01_hero.png')
    print('landing 01_hero done')
    
    # 2. Profiles (scroll down)
    page.evaluate('window.scrollTo(0, 950)')
    page.wait_for_timeout(1000)
    page.screenshot(path='temp_captures/landing/02_profiles.png')
    print('landing 02_profiles done')
    
    # 3. DAG graph
    page.evaluate('window.scrollTo(0, 2000)')
    page.wait_for_timeout(1000)
    page.screenshot(path='temp_captures/landing/03_dag.png')
    print('landing 03_dag done')
    
    # 4. Banking
    page.evaluate('window.scrollTo(0, 3100)')
    page.wait_for_timeout(1000)
    page.screenshot(path='temp_captures/landing/04_banking.png')
    print('landing 04_banking done')
    
    # 5. Partners / Showcase
    page.evaluate('window.scrollTo(0, 4200)')
    page.wait_for_timeout(1000)
    page.screenshot(path='temp_captures/landing/05_partners.png')
    print('landing 05_partners done')
    
    # --- CAPTURE PORTAL ---
    print('Capturing portal views...')
    portal = context.new_page()
    portal.goto('https://ocus-eu.vercel.app/ocus', wait_until='networkidle')
    portal.wait_for_timeout(2000)
    
    # 1. Map View
    portal.screenshot(path='temp_captures/portal/01_map.png')
    print('portal 01_map done')
    
    # 2. Plan View
    plan_btn = portal.query_selector('button[data-view="plan"]')
    if plan_btn:
        plan_btn.click()
        portal.wait_for_timeout(1000)
        portal.screenshot(path='temp_captures/portal/02_plan.png')
        print('portal 02_plan done')
        
    # 3. Rules View
    rules_btn = portal.query_selector('button[data-view="rules"]')
    if rules_btn:
        rules_btn.click()
        portal.wait_for_timeout(1000)
        portal.screenshot(path='temp_captures/portal/03_rules.png')
        print('portal 03_rules done')
        
    # 4. Model View
    model_btn = portal.query_selector('button[data-view="model"]')
    if model_btn:
        model_btn.click()
        portal.wait_for_timeout(1000)
        portal.screenshot(path='temp_captures/portal/04_model.png')
        print('portal 04_model done')
        
    # 5. Licences View
    licences_btn = portal.query_selector('button[data-view="licences"]')
    if licences_btn:
        licences_btn.click()
        portal.wait_for_timeout(1000)
        portal.screenshot(path='temp_captures/portal/05_licences.png')
        print('portal 05_licences done')

    browser.close()
    print('All captures successfully finished!')

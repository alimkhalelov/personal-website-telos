export interface StyleRefEntry {
  id: string;
  image: string;
  style: string;
  shortName: string;
  tag: string;
  medium: string;
  core_concept: string;
  composition: string;
  characters_and_tech: string;
  environment: string;
  lighting: string;
  color_palette: string;
  mood: string;
  negative_prompts: string;
}

export const STYLES_DATABASE: StyleRefEntry[] = [
  {
    id: "jakub-rozalski",
    image: "/styleref/img_01.jpeg",
    style: "Jakub Różalski (Mr. Werewolf)",
    shortName: "Jakub Różalski",
    tag: "Dieselpunk Oil Painting",
    medium: "oil painting on canvas with visible textured brushstrokes, painterly classical texture, impasto highlights",
    core_concept: "alternate history 1920s, World of 1920+, dieselpunk, stark juxtaposition of traditional rural life or historical warfare with colossal war machines and Slavic folklore monsters",
    composition: "cinematic wide-angle shot, epic scale, strong atmospheric perspective, small foreground figures contrasted against massive background threats",
    characters_and_tech: "bulky dieselpunk walker mechs, heavy iron artillery, steam-powered armor, winged hussars, giant werewolves, mythological forest spirits, or ancient knights. peasants in traditional folk attire, scythes, livestock, 19th–early 20th century infantry, cavalrymen, quiet rural observers in the foreground",
    environment: "vast rural landscapes, misty wheat fields, snow-covered plains, dense pine forests, arid desert wastes, ruined churches, or burnt battlefield trenches",
    lighting: "soft cold diffused sunlight piercing through heavy clouds, overcast daylight, gloomy dusk, dramatic mist and volumetric haze obscuring distant silhouettes",
    color_palette: "highly muted and desaturated palette, earthy browns, cold greys, sepia, pale whites, with isolated vibrant accents of deep red or yellow banners",
    mood: "melancholic, oppressive, epic, eerie, historical, quiet dread",
    negative_prompts: ""
  },
  {
    id: "simon-stalenhag",
    image: "/styleref/img_02.jpeg",
    style: "Simon Stålenhag",
    shortName: "Simon Stålenhag",
    tag: "Retro-Futuristic Sci-Fi",
    medium: "digital painting with visible gouache and acrylic brushstrokes, painterly texture",
    core_concept: "retro-futurism, stark juxtaposition of quiet everyday life and massive anomalous sci-fi technology",
    composition: "cinematic wide-angle shot, strong sense of scale, distinct foreground, middle ground, and background",
    characters_and_tech: "weathered, bulky, industrial machinery, rusty bipedal mechs, giant towers, floating transport ships, or abandoned retro-futuristic structures with utilitarian markings. small isolated human figures in 1980s-1990s practical clothing (parkas, knit caps), accompanied by vintage cars, streetlights, or everyday objects",
    environment: "vast quiet landscapes, atmospheric Scandinavian or Midwestern countryside, snowy pine forests, desert grounds, or empty asphalt roads",
    lighting: "soft diffused lighting, twilight, golden hour, overcast sky, haze, glowing warm light accents from headlights, cockpits, or street lamps",
    color_palette: "muted, desaturated tones, cool blues, soft pink and purple sky gradients, earthy browns, rusty oranges, moss greens",
    mood: "nostalgic, melancholy, quiet wonder, eerie solitude, retro-dystopian",
    negative_prompts: ""
  },
  {
    id: "hideaki-anno-gainax",
    image: "/styleref/img_03.jpeg",
    style: "Hideaki Anno / Yoshiyuki Sadamoto (Gainax 1990s Anime)",
    shortName: "Evangelion / Gainax 90s",
    tag: "90s Cel Psychological Mecha",
    medium: "classic cel animation still, traditional analog anime production, hand-painted background, slight film grain",
    core_concept: "90s psychological mecha anime, stark juxtaposition of vulnerable human pilots and monstrous biomechanical machines, existential dread, theological and bio-mechanical motifs",
    composition: "cinematic and dramatic, low-angle perspective looking up at massive figures, extreme wide-angle, character cluster in the foreground against a colossal background threat, strong sense of verticality and scale",
    characters_and_tech: "massive organic-looking mecha (EVA units) with visible armor plating and power cables, monstrous biomechanical 'Angels', intricate control plugs, exposed entry plugs, towering urban infrastructure. androgynous teenage pilots in tight plugsuits (white, blue, red), determined yet melancholic expressions, visible character layers, intricate mech details",
    environment: "desolate post-apocalyptic landscapes, ruined futuristic cityscapes (Tokyo-3), massive geo-front caverns, hazy purple/blue night skies, distant explosions, abstract conceptual spaces",
    lighting: "dramatic high-contrast lighting, harsh rim lighting from distant light sources, deep volumetric shadows (chiaroscuro), soft lens flare, hazy atmospheric perspective",
    color_palette: "highly saturated yet oppressive palette, deep purples, midnight blues, blood reds, contrasting with stark whites and electric greens, desaturated muted background tones",
    mood: "apocalyptic, melancholic, intense psychological tension, existential dread, awe-inspiring, eerie quiet before the storm",
    negative_prompts: ""
  },
  {
    id: "zdzislaw-beksinski",
    image: "/styleref/img_04.jpeg",
    style: "Zdzisław Beksiński (Dystopian Surrealism)",
    shortName: "Zdzisław Beksiński",
    tag: "Dystopian Cosmic Surrealism",
    medium: "oil painting on panel, incredibly detailed, smooth blend of classic technique with macabre subject matter, faint texture of aged wood visible beneath thin paint layers, almost photographic precision in rendering decay",
    core_concept: "dystopian surrealism, post-apocalyptic nightmares, biological architecture, bone structures, withered entities, cosmic decay, a sense of an ending without hope, profound and quiet dread, metaphysical horror",
    composition: "often intimate, single figures or close-ups, monumental structures that feel ancient and crumbling, eerie symmetry, strong emphasis on verticality and decay, figures merged with architecture or landscape",
    characters_and_tech: "withered, desiccated humanoids (often without faces or eyes), biomechanical constructs where flesh merges with metal, skeletal figures, monumental structures made of bone and dried organic matter, indistinct entities playing instruments made of body parts, monstrous horses with human traits. emaciated figures wrapped in bandages or decaying cloth, figures defined by skeletal structures or fused ribs, figures embracing or posed in states of despair, bizarre musical instruments made of bones, floating geometric shapes, distinct single eyes set into landscapes",
    environment: "endless, arid deserts; vast, ash-covered plains; burning cities in the distance; colossal, decaying Gothic or brutalist architecture; intimate, dark interior spaces like crypts; desolate, foggy landscapes with twisted trees",
    lighting: "intense, hot, dramatic light sources; harsh, directional illumination like a spotlight; internal glows from decay or fires; cold, pallid, mist-diffused light; dramatic shadows concealing forms, volumetric smoke and dust",
    color_palette: "dominated by deep, earthy, burnt tones: rust red, ochre, sienna, deep brown, sepia, black; contrasted with cold accents: muted blue-grey, pale cyan, and intense, fiery orange/crimson; overall desaturated and moody, but with rare, focused saturated colors (like a burning city or blood)",
    mood: "profoundly melancholic, desolate, nightmare-like, claustrophobic, oppressive, metaphysical dread, an absolute silence of decay",
    negative_prompts: ""
  },
  {
    id: "kentaro-miura-berserk",
    image: "/styleref/img_05.jpeg",
    style: "Kentaro Miura (Berserk manga style)",
    shortName: "Kentaro Miura",
    tag: "Monochrome Dark Fantasy Ink",
    medium: "traditional Japanese manga ink drawing, precise detailed line art, intense dark etching quality, heavy black shading, high contrast monochrome",
    core_concept: "dark fantasy, grim medieval realism mixed with cosmic horror, tragic heroism, brutal warfare, monstrous entities and grotesque apostles",
    composition: "dynamic, cinematic framing, often extreme close-ups or wide-angle shots to emphasize power or despair, aggressive speed lines and motion energy",
    characters_and_tech: "highly detailed gothic plate armor with anatomical precision, immense and grotesque monsters (Apostles) with organic and demonic features, colossal surreal entities (like the God Hand or the Eclipse), intricately textured weapons. muscular and scarred protagonists with powerful expressions, intense eye detail, intricate and layered armor, dynamic poses full of rage or resolve, grotesque detailed corpses, scattered skulls and bones",
    environment: "dismal medieval battlefields, towering demonic architecture, surreal otherworldly landscapes, decaying castles, desolate forests, dense with atmospheric detail",
    lighting: "stark high-contrast chiaroscuro, deepest shadows created by cross-hatching, harsh blinding white light or absolute abyssal blackness, strong rim lighting to define forms",
    color_palette: "strictly monochrome (black and white), varying densities of black ink creating an illusion of texture and form",
    mood: "nihilistic, terrifying, oppressive, epic, visceral dread, rage, tragic and melancholic",
    negative_prompts: ""
  },
  {
    id: "witcher-3-concept",
    image: "/styleref/img_06.jpeg",
    style: "The Witcher 3: Wild Hunt official concept art",
    shortName: "Witcher 3 Concept",
    tag: "Slavic Dark Fantasy",
    medium: "digital fantasy painting, detailed brushwork, realistic textures, painted canvas feel",
    core_concept: "dark gritty Slavic fantasy, monster hunting, weathered medieval world, ancient lore, forgotten ruins, tension between man, nature, and magic",
    composition: "cinematic wide-angle shot, epic scale, strong atmospheric depth and focal points, solitary detailed foreground figures contrasted against massive, detailed environments",
    characters_and_tech: "slavic folklore monsters, mythical beasts, griffins, necrophages, ancient elementals, Witcher signs, alchemy gear, steel and silver swords, runestones, medieval siege weapons. witchers with two swords on back, layered leather and chainmail armor showing wear, dark fantasy sorceresses, peasants in rugged medieval attire, monster trophies, banner flags, wooden carts",
    environment: "ancient crumbling castle ruins, gothic cathedrals, vast misty bogs, dense primeval pine forests, rugged mountain peaks, burned war-torn villages, dark swamps, stormy coastlines",
    lighting: "dramatic atmospheric lighting, soft cold diffused sunlight piercing heavy overcast clouds, gloomy twilight, theatrical sunset or sunrise casting long shadows, volumetric fog and mist obscuring distant silhouettes",
    color_palette: "desaturated and highly muted earthy palette, cold greys, deep browns, moss greens, slate, pale whites, with isolated vibrant accents like glowing magic signs, orange fire, or deep red banners",
    mood: "dark, melancholic, oppressive, epic, immersive, quiet dread, ominous, storytelling-driven",
    negative_prompts: ""
  },
  {
    id: "ian-mcque",
    image: "/styleref/img_07.jpeg",
    style: "Ian McQue",
    shortName: "Ian McQue",
    tag: "High-Altitude Junkpunk",
    medium: "digital conceptual art, vibrant and textured brushstrokes, painterly digital art, energetic line work, mixed media look with scratchy textures",
    core_concept: "high-altitude junk-punk sci-fi, repurposed industrial scrap, colossal flying ships (sky-freighters and tugs), densely packed floating environments, bustling aerial harbors",
    composition: "dynamic and cluttered foreground, strong diagonal lines, massive scale established through tiny details and figures, complex visual density, layered environments",
    characters_and_tech: "massive, asymmetrical flying vessels built from salvaged ship hulls, tugboats, locomotives, and industrial cranes; smaller, utilitarian flying worker-subs and maintenance pods; multi-limbed walking drones; mechanical complexity over smooth design. tiny, busy crew members in practical gear; complex machinery details; hanging ropes, cables, and wires; rust streaks, peeling paint, hand-painted numbers and letters; utility lighting; small background birds to enhance distance",
    environment: "sprawling aerial ports on platforms, dense, layered multi-level cities with tiled roofs, desolate desert wastes beneath heavy clouds, vast open sky, industrial complexes floating in the clouds",
    lighting: "strong, dramatic light from an open sky; harsh shadows defining complex mechanical structures; soft light from specific artificial sources at night; volumetric haze enhancing depth in dense environments",
    color_palette: "vibrant yet weathered. Dominant rusted oranges and reds, oxidized blues and teals, military greens, mustard yellows, contrasting with cool blues of the open sky and deep browns of shadowed industrial sections. Intense, isolated sparks of color from lights or signs.",
    mood: "adventurous, energetic, bustling, gritty, awe-inspiring, a sense of lived-in industrial wonder",
    negative_prompts: ""
  },
  {
    id: "alex-ross",
    image: "/styleref/img_08.jpeg",
    style: "Alex Ross (e.g., Marvels, Kingdom Come, Batman: War on Crime)",
    shortName: "Alex Ross",
    tag: "Photorealistic Classical Gouache",
    medium: "photorealistic gouache and watercolor painting on paper, flawless blends, masterful classical rendering, hyper-detailed textures on skin and fabric, zero comic inking lines",
    core_concept: "heroic idealism, dramatic low-angle forced perspective, monumental figures that dominate the frame, operatic scope",
    composition: "cinematic and statuesque, heroic idealism, dramatic low-angle forced perspective, monumental figures that dominate the frame, operatic scope",
    characters_and_tech: "figures as believable, physically grounded humans; texture of raw materials (leather, fabric weave, muscle definition, realistic facial expressions); iconic and idealized anatomy. highly reflective surfaces (metal, glass) rendered with precise specular highlights, volumetric light (smoky glow, engine burn, energy effects), multi-panel comic layout flow",
    environment: "hyper-detailed, architecturally precise, often contrasting scale (small people vs. massive structures or vast space), deep environmental atmosphere",
    lighting: "extreme chiaroscuro, dominant chiaroscuro (deep shadows defining form), precise edge lighting, dramatic contrasts, soft but powerful light bloom, volumetric haze",
    color_palette: "rich, deeply saturated, operatic colors; complex, non-flat hues; powerful primaries mixed with deep jewel tones; warm glows against cold darks",
    mood: "solemn, legendary, reverent, hyper-real, awe-inspiring, serious dread and hope juxtaposed",
    negative_prompts: ""
  },
  {
    id: "bruce-timm-90s",
    image: "/styleref/img_09.jpeg",
    style: "Bruce Timm signature character design, 1992 Warner Bros animation aesthetic",
    shortName: "Bruce Timm 90s Noir",
    tag: "Streamline Moderne Noir",
    medium: "Gouache on black board background, hand-drawn traditional animation cel, smooth gouache gradients, heavy black ink lines",
    core_concept: "1930s Streamline Moderne geometry, heavy black shading blocking, clean sharp character anatomy",
    composition: "Low-angle cinematic shot, bold silhouetted framing, strong negative space balance, striking focal hero pose",
    characters_and_tech: "Clean Bruce Timm proportions: broad chest, narrow waist, sharp jawline, minimalist facial features, zero unnecessary detail, smooth solid black outlines",
    environment: "Distressed dark matte painting texture, painted gouache wash sky, heavy atmospheric haze, painterly background depth",
    lighting: "Dramatic chiaroscuro lighting, painted rim lights, deep black cast shadows covering half the character",
    color_palette: "Muted retro color palette, deep crimson or dark indigo atmosphere contrasted with sharp accent light",
    mood: "Noir, moody, iconic, dramatic",
    negative_prompts: "batman, cowl, bat ears, bat symbol, cape, cowboy, western hat, lasso, modern vector illustration, flash animation style, flat clean digital vector, sharp neon comic book, text overlays"
  },
  {
    id: "studio-4c-production-ig",
    image: "/styleref/img_10.jpeg",
    style: "2000s dark prestige anime anthology style, Studio 4°C and Production I.G art direction",
    shortName: "Studio 4°C / Production I.G",
    tag: "Gritty Neo-Noir Dark Anime",
    medium: "gritty Neo-Noir anime cel animation, high-budget 2000s anime frame, hand-drawn ink line art, heavy shadows",
    core_concept: "dark adult animation, dark fantasy, gothic noir, sharp expressive realism blended with Japanese animation aesthetics",
    composition: "dynamic cinematic framing, extreme low-angle perspective, spatial distortion, tension-filled close-ups",
    characters_and_tech: "sharp ornate longswords, shadowy magic energy, leather light armor, dark hooded cloaks, mysterious silhouettes. hyper-detailed angular character design, sharp chiseled features, defined anatomy, flowing cloaks, expressive intensity",
    environment: "gothic medieval city rooftops, dark cobblestone alleyways, ancient cathedral spires, misty night atmosphere",
    lighting: "extreme chiaroscuro contrast, deep inky-black hard shadows, strong magic glow backlighting, rim light piercing through fog",
    color_palette: "desaturated cold base, deep charcoal grey, rich black, highlighted by stark single-color accent light sources (vibrant crimson red or deep violet magic glow)",
    mood: "oppressive, intense, visceral, moody psychological tension",
    negative_prompts: ""
  },
  {
    id: "dark-art-deco-retro-futurism",
    image: "/styleref/img_11.jpeg",
    style: "Dark Art Deco Animated Series Aesthetic, American Retro-Futurism Graphic Novel",
    shortName: "Dark Art Deco",
    tag: "Retro-Futurism Graphic Novel",
    medium: "2D digital animation still, clean cel-shading, vector-like lineart with subtle noise texture and airbrushed color gradients",
    core_concept: "Dark Art Deco Animated Series Aesthetic, American Retro-Futurism Graphic Novel",
    composition: "cinematic low-angle wide shot, strong geometric framing, iconic dramatic silhouette, sharp angular proportions, stylized figure design",
    characters_and_tech: "stylized figure design",
    environment: "Dark Art Deco architectural spires and monolithic silhouettes",
    lighting: "extreme chiaroscuro contrast, strong rim lights, vibrant neon luminescence, volumetric atmospheric haze, deep pitch-black cast shadows",
    color_palette: "desaturated dark slate and teal background, neon crimson and amber light reflections, high contrast accent highlights",
    mood: "moody, intense, stylish, heroic, atmospheric",
    negative_prompts: "batman, cowl, bat ears, bat symbol, gotham, fedora hat, trench coat detective, text, watermark, signature, speech bubbles, 3d render, photorealistic"
  },
  {
    id: "fortiche-arcane-style",
    image: "/styleref/img_12.jpeg",
    style: "Stylized Digital Painting, unique hybrid 2D/3D animation look (Fortiche Production)",
    shortName: "Fortiche (Arcane Aesthetic)",
    tag: "Hybrid 2D/3D Stylized Painting",
    medium: "visible painterly brushstrokes, hand-painted texture overlay, graphic shape definition, precise line work within volume",
    core_concept: "Rendered with sharp edge work and hand-painted surfaces",
    composition: "Cinematic composition, dramatic low-angle or Dutch angle for dynamism, intense focused close-ups, dynamic foreshortening, clear figure-ground separation",
    characters_and_tech: "Sharp facial structure, hand-painted hair texture, and graphic graffiti or decorative patterns overlaid on surfaces",
    environment: "Blocky, stylized geometry and textured surfaces",
    lighting: "Highly dramatic, volumetric light beams, sharp rim lighting to define forms, strong chiaroscuro shadows, intense local light sources and lens flares",
    color_palette: "Deep, rich, and often desaturated base tones contrasted sharply with extreme, isolated, hyper-saturated neon-like accents (e.g., hot pink, hextech-cyan-blue, toxic-green, amber-gold, deep purple), dynamic light streaks across forms",
    mood: "Intense, dramatic, high-octane, emotional, gritty yet polished, cinematic dread or dynamic energy",
    negative_prompts: ""
  },
  {
    id: "blue-eye-samurai",
    image: "/styleref/img_13.jpeg",
    style: "Highly stylized, intense, cinematic adult animation, visual identity of Blue Eye Samurai",
    shortName: "Blue Eye Samurai",
    tag: "Cinematic Edo Graphic Drama",
    medium: "Digital animation style with rich painterly textures, clear cel-shading, dynamic linework, and textured brushstrokes on backgrounds and key graphics",
    core_concept: "Edo-period Japan, historical drama, Ronin path, revenge, cold beauty, intense action. A fusion of traditional Japanese landscapes and stylized, intense, graphic storytelling",
    composition: "Dramatic cinematic framing, extreme depth of field, clear separation of foreground (graphic elements/text) and background (atmospheric scene), powerful low-angle or silhouetted perspectives to emphasize scale and stoicism, strong use of asymmetry",
    characters_and_tech: "Katanas, nodachis, traditional samurai and ronin armor, wolves or other animals rendered with graphical simplicity. Ronin or samurai in tattered robes on a cliff, figures with specific features (like glasses), tattered red banners/flags, precise reproductions of graphic emblems",
    environment: "Cold, snow-covered Japanese mountain ranges, dense bamboo groves, quiet villages with detailed wooden structures and lantern lighting, dramatic sunset/sunrise skies",
    lighting: "Dramatic high-contrast lighting, especially strong rim lighting and silhouettes against a powerful sunset/sunrise, moody volumetric light rays through mist/dust/snow, cold diffused daylight contrasted with localized warm lantern light, deep shadows (chiaroscuro)",
    color_palette: "A deeply mood-driven, intense palette. Predominantly cold, desaturated tones (snow blues, deep greys, cool greens) and rich earth tones, sharply contrasted with isolated, highly saturated pops of deep crimson red (blood, banners) and warm gold/orange (sunset/lanterns)",
    mood: "Tense, gritty, epic, stoic, melancholic, eerie dread, dangerous elegance",
    negative_prompts: ""
  },
  {
    id: "eminence-in-shadow",
    image: "/styleref/img_14.jpeg",
    style: "The Eminence in Shadow Anime Key Art, Dark Fantasy Action, Sleek Slime-Suit Aesthetics",
    shortName: "Eminence in Shadow",
    tag: "High-End Dark Power Fantasy",
    medium: "High-end Anime Digital Painting, crisp clean line art, sharp cel-shading, vibrant magical glow, rich chiaroscuro lighting",
    core_concept: "mastermind in the shadows, Shadow Garden faction, sleek black slime suits, theatrical dark hero power fantasy, effortless overwhelming magical aura",
    composition: "dramatic cinematic angle, low-angle shot looking up at the protagonist against a giant full moon, gothic architecture framing, high-contrast silhouette composition",
    characters_and_tech: "Shadow (Cid Kagenou) wearing a long flowing pitch-black slime coat with gold/violet accents and a hood, wielding a sleek dark slime sword; Shadow Garden members (Seven Shadows) in form-fitting black latex-like slime suits with golden trim; Cult of Diablos foes (red-eyed mutated beasts, gothic cultists, heavy armored knights). magic manifested as fluid jet-black slime forming weapons and armor, glowing violet and cyan magic circuit patterns, compressed spherical energy particles ('I am Atomic' magic ripples), mutated blood-red Diablos monsters",
    environment: "gothic medieval fantasy city, high cathedral spires, moonlit rooftops, dark Victorian alleys, ancient subterranean ruins, foggy stone courtyards",
    lighting: "intense cold moonlight from a massive background moon, strong backlighting, vivid rim light on black suits, brilliant glowing purple, violet, or cyan magic energy contrasting deep shadows",
    color_palette: "dominant pitch-black, midnight blue, slate gray, and silver moonlight, punctuated by highly vibrant glowing violet, magenta, cyan, and rich gold accents",
    mood: "stylish, theatrical, mysterious, epic, cool, dark fantasy, subtle chuunibyou elegance",
    negative_prompts: ""
  },
  {
    id: "castlevania-nocturne",
    image: "/styleref/img_15.jpeg",
    style: "Modern dark fantasy anime, clean-lined, high-definition digital animation style (inspired by Castlevania: Nocturne)",
    shortName: "Castlevania Nocturne",
    tag: "Gothic Dark Fantasy Anime",
    medium: "Clean digital illustration, sharp precision inks, smooth color gradients, complete absence of text, borders, paper texture, or edge artifacts",
    core_concept: "The classic eternal war between the Belmont clan and vampires, set during the French Revolution, blending high-octane anime action with gothic horror.",
    composition: "Cinematic wide-angle, dynamic and extreme perspectives, dramatic depth of field. Clean separation between layers without textures, full cinematic 16:9 frame with no letterboxing or text overlays.",
    characters_and_tech: "Ornate magical whip (Morning Star), intricate precision sabers, demonic night creatures with insectoid/biomechanical features, elegant aristocratic vampires. Lean, elegant, yet muscular character designs. Detailed historical period clothing, flowing velvet cloaks, intense and expressive facial features, glowing magical properties.",
    environment: "Towering gothic cathedrals with vast stained glass windows, sprawling 18th-century French architecture, misty dark forests, and dramatic full-moon cloudscapes.",
    lighting: "Low-key, dramatic chiaroscuro. Stark contrasts. Saturated magical effects (blue electricity, crimson blood effects, holy gold) against deep shadow. Atmospheric volumetric haze.",
    color_palette: "Moody and desaturated general palette (cold blues, dark greys, deep browns), punctuated by intense, isolated saturated colors: crimson red (blood/cloaks), deep gold, and electric blue (magic).",
    mood: "Melancholic, oppressive, epic, and intensely heroic.",
    negative_prompts: ""
  },
  {
    id: "cinematic-cyber-brutalism",
    image: "/styleref/img_16.jpeg",
    style: "Cinematic Cyber-Brutalism & Monolithic Architecture",
    shortName: "Cyber-Brutalism",
    tag: "Monolithic Hard Surface",
    medium: "Photorealistic 3D render meets analog 35mm film still, sharp concrete textures, geometric shadow casting",
    core_concept: "Gigantic monolithic brutalist concrete mega-structures contrasting with sleek cybernetic hardware and minimal neon laser conduits",
    composition: "Monumental low-angle isometric perspective, hyper-scale framing, dramatic vertical convergence",
    characters_and_tech: "Heavy carbon-fiber drones, utilitarian terminal interfaces, industrial cybernetic implants, hazmat operative gear",
    environment: "Vast brutalist courtyards, rain-slicked polished slate, towering concrete cooling towers, subterranean server vaults",
    lighting: "Volumetric tungsten light beams cutting through dense atmospheric rain, cold fluorescent strip overheads",
    color_palette: "Raw concrete grey, oxidized slate, matte obsidian black, accented with high-voltage amber and laser cyan",
    mood: "Imposing, stoic, futuristic, technological dread, pure architectural power",
    negative_prompts: ""
  },
  {
    id: "analog-horror-crt-terminal",
    image: "/styleref/img_17.jpeg",
    style: "Analog Terminal VHS Horror & 1980s Retro Computing",
    shortName: "Analog CRT Terminal",
    tag: "VHS Glitch & Phosphor Decay",
    medium: "Analog scanline CRT phosphor display, magnetic tape distortion, VHS tracking lines, phosphor bloom",
    core_concept: "Classified military mainframe terminals displaying anomalous signals, forbidden cryptographic telemetry, eerie terminal prompts",
    composition: "Curved fisheye CRT monitor close-up, raster scanline grids, chromatic aberration at screen perimeters",
    characters_and_tech: "Heavy mechanical amber/green phosphor monitors, IBM Model M tactile peripherals, magnetic tape reels, classified telemetry feeds",
    environment: "Bunker server room, dimly lit subterranean laboratory, dust motes in cathode-ray tube glow",
    lighting: "Self-illuminating green/amber phosphor phosphorescence, ambient emergency red rotary warning light",
    color_palette: "Phosphor P1 green, amber glow (#FFB000), pitch void black (#000000), blood red signal flashes",
    mood: "Uncanny, classified, eerie, claustrophobic, retro-technical suspense",
    negative_prompts: ""
  },
  {
    id: "tokyo-neo-cyberpunk-rain",
    image: "/styleref/img_18.jpeg",
    style: "Tokyo Neo-Cyberpunk Nocturne & Holographic Rain",
    shortName: "Tokyo Cyberpunk Nocturne",
    tag: "Volumetric Neon Rain",
    medium: "Cinematic anamorphic film still, wet specular reflections, high dynamic range neon light bleeding",
    core_concept: "Multi-level cyberpunk metropolis in torrential rain, towering holographic advertisements reflecting on wet asphalt",
    composition: "Layered telephoto street compression, vertical skyline density, elevated skybridge perspective",
    characters_and_tech: "Augmented street operatives in waterproof techwear, transparent holographic umbrellas, hovering drone courier conduits",
    environment: "Shinjuku-inspired multi-tiered neon alleyways, dense cable conduits, steaming street grates, towering glass facades",
    lighting: "Rich multi-spectral neon luminescence (hot magenta, electric turquoise, sodium vapor amber) diffused by torrential rain mist",
    color_palette: "Deep navy and midnight teal shadows, vibrant magenta pinks, laser blue reflections, golden neon kanji signs",
    mood: "Hypnotic, melancholic, electric, immersive, cinematic urban poetry",
    negative_prompts: ""
  },
  {
    id: "avant-garde-swiss-grid",
    image: "/styleref/img_19.jpeg",
    style: "Avant-Garde Swiss Typographic Brutalism & Kinetic Layout",
    shortName: "Swiss Kinetic Brutalism",
    tag: "Editorial Typographic Poster",
    medium: "High-contrast silkscreen print on textured uncoated cotton stock, bold letterpress emboss, razor-sharp vector grid",
    core_concept: "Strict International Typographic Style fused with radical asymmetric layout grids, oversized tabular numerals, and raw structural functionalism",
    composition: "Rigid mathematical 12-column grid, intentional extreme scale contrast between micro-captions and colossal display glyphs",
    characters_and_tech: "Minimalist glyphs, telemetry coordinates, architectural crosshairs, ISO 8601 timestamps, geometric blueprint schematics",
    environment: "Clean architectural white void, concrete studio pedestal, minimal light-box presentation",
    lighting: "Flat studio daylight, zero dramatic shadows, crisp 100% optical legibility",
    color_palette: "Pure stark black (#000000), gallery warm white (#F7F7F5), international rescue orange (#FF4800), electric cobalt (#0044FF)",
    mood: "Authoritative, radical, cerebral, ultra-clean, uncompromisingly modern",
    negative_prompts: ""
  }
];

export function getStyleById(id: string): StyleRefEntry | undefined {
  return STYLES_DATABASE.find((s) => s.id === id);
}

export function getAllStyles(): StyleRefEntry[] {
  return STYLES_DATABASE;
}

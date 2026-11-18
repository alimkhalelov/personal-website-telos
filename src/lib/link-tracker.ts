import fs from "fs";
import path from "path";

export interface ClickEvent {
  id: string;
  slug: string;
  targetUrl: string;
  title: string;
  timestamp: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  referer: string;
  userAgent: string;
  device: "Mobile" | "Tablet" | "Desktop";
  os: string;
  browser: string;
}

export interface CustomLink {
  slug: string;
  targetUrl: string;
  title: string;
  description?: string;
  createdAt: string;
  totalClicks: number;
  uniqueVisitors: number;
  lastClickedAt?: string;
}

export interface AnalyticsData {
  links: Record<string, CustomLink>;
  clicks: ClickEvent[];
  visitorIps: Record<string, string[]>; // slug -> list of unique visitor hashes
}

// Default flagship and utility links
const DEFAULT_LINKS: Record<string, CustomLink> = {
  nebuly: {
    slug: "nebuly",
    targetUrl: "https://alimkhalelov.github.io/nebuly/",
    title: "Nebuly: Weekly AI Brief & Stakeholder Enablement Platform",
    description: "Direct link to production deployment of Nebuly",
    createdAt: "2026-11-16T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  tempo: {
    slug: "tempo",
    targetUrl: "https://alimkhalelov.github.io/tempo/",
    title: "Tempo: Adaptive Cadence Engine",
    description: "Kinetic runner cadence tracking platform",
    createdAt: "2026-11-05T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  ocus: {
    slug: "ocus",
    targetUrl: "https://ocus-eu.vercel.app",
    title: "Ocus: MiCA Compliance & Operations DAG Cockpit",
    description: "Institutional operating system for pan-EU digital asset compliance",
    createdAt: "2026-11-08T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  plain: {
    slug: "plain",
    targetUrl: "https://alimkhalelov.github.io/goal-classifier/",
    title: "Plain: The Simple Planner",
    description: "Minimalist goal clarification & execution diagnosis workspace",
    createdAt: "2026-11-10T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  "goal-classifier": {
    slug: "goal-classifier",
    targetUrl: "https://alimkhalelov.github.io/goal-classifier/",
    title: "Plain (Goal Classifier)",
    description: "Four-dimension goal execution planner",
    createdAt: "2026-11-10T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  "residual-intellect": {
    slug: "residual-intellect",
    targetUrl: "https://residual-intellect.vercel.app",
    title: "Residual Intellect Platform",
    description: "Daily AI news analysis & Telegram channel engine",
    createdAt: "2026-11-07T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  ri: {
    slug: "ri",
    targetUrl: "https://t.me/residual_intellect",
    title: "Residual Intellect Telegram Channel",
    description: "Direct invite to @residual_intellect",
    createdAt: "2026-11-07T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  tg: {
    slug: "tg",
    targetUrl: "https://t.me/AlimLLC",
    title: "Telegram: @AlimLLC",
    description: "Direct personal contact on Telegram",
    createdAt: "2026-11-01T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  telegram: {
    slug: "telegram",
    targetUrl: "https://t.me/AlimLLC",
    title: "Telegram: @AlimLLC",
    description: "Direct personal contact on Telegram",
    createdAt: "2026-11-01T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  linkedin: {
    slug: "linkedin",
    targetUrl: "https://linkedin.com/in/alimzhan-khalelov",
    title: "LinkedIn Profile",
    description: "Alimzhan Khalelov on LinkedIn",
    createdAt: "2026-11-01T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  github: {
    slug: "github",
    targetUrl: "https://github.com/alimkhalelov",
    title: "GitHub Profile",
    description: "Open source vibecoding repositories",
    createdAt: "2026-11-01T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
  cv: {
    slug: "cv",
    targetUrl: "/resume/Alimzhan_Khalelov_AI_Product_Manager_CV.pdf",
    title: "Executive Resume (PDF)",
    description: "Download Alimzhan Khalelov AI Product Manager Resume",
    createdAt: "2026-11-01T10:00:00.000Z",
    totalClicks: 0,
    uniqueVisitors: 0,
  },
};

// In-memory cache for ultra-low latency on edge/serverless
let memoryStore: AnalyticsData | null = null;

function getStoreFilePath(): string {
  // Use /tmp in production serverless environments if content dir is read-only
  if (process.env.NODE_ENV === "production") {
    return path.join("/tmp", "analytics-data.json");
  }
  return path.join(process.cwd(), "src", "content", "analytics-data.json");
}

export function loadAnalyticsData(): AnalyticsData {
  if (memoryStore) {
    return memoryStore;
  }

  const filePath = getStoreFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw);
      memoryStore = {
        links: { ...DEFAULT_LINKS, ...(parsed.links || {}) },
        clicks: parsed.clicks || [],
        visitorIps: parsed.visitorIps || {},
      };
      return memoryStore;
    }
  } catch (err) {
    console.warn("[analytics] Could not read storage file, falling back to defaults:", err);
  }

  // Also check default content file if in /tmp
  const contentFallback = path.join(process.cwd(), "src", "content", "analytics-data.json");
  try {
    if (fs.existsSync(contentFallback)) {
      const raw = fs.readFileSync(contentFallback, "utf8");
      const parsed = JSON.parse(raw);
      memoryStore = {
        links: { ...DEFAULT_LINKS, ...(parsed.links || {}) },
        clicks: parsed.clicks || [],
        visitorIps: parsed.visitorIps || {},
      };
      return memoryStore;
    }
  } catch (e) {}

  memoryStore = {
    links: { ...DEFAULT_LINKS },
    clicks: [],
    visitorIps: {},
  };
  return memoryStore;
}

export function saveAnalyticsData(data: AnalyticsData): void {
  memoryStore = data;
  const filePath = getStoreFilePath();

  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("[analytics] Could not persist to disk (serverless ephemeral):", err);
  }

  // Also try to sync to src/content if writable in dev
  if (process.env.NODE_ENV !== "production") {
    try {
      const devPath = path.join(process.cwd(), "src", "content", "analytics-data.json");
      fs.writeFileSync(devPath, JSON.stringify(data, null, 2), "utf8");
    } catch (e) {}
  }
}

export function parseUserAgent(ua: string): { device: "Mobile" | "Tablet" | "Desktop"; os: string; browser: string } {
  const lower = ua.toLowerCase();

  let device: "Mobile" | "Tablet" | "Desktop" = "Desktop";
  if (/ipad|tablet|(android(?!.*mobile))/i.test(lower)) {
    device = "Tablet";
  } else if (/mobile|iphone|ipod|android.*mobile|blackberry|phone/i.test(lower)) {
    device = "Mobile";
  }

  let os = "Unknown";
  if (/iphone|ipad|ipod/i.test(lower)) os = "iOS";
  else if (/mac os x|macintosh/i.test(lower)) os = "macOS";
  else if (/android/i.test(lower)) os = "Android";
  else if (/windows nt 10/i.test(lower)) os = "Windows 10/11";
  else if (/windows/i.test(lower)) os = "Windows";
  else if (/linux/i.test(lower)) os = "Linux";

  let browser = "Unknown";
  if (/edg/i.test(lower)) browser = "Edge";
  else if (/opr|opera/i.test(lower)) browser = "Opera";
  else if (/chrome|crios/i.test(lower)) browser = "Chrome";
  else if (/firefox|fxios/i.test(lower)) browser = "Firefox";
  else if (/safari/i.test(lower)) browser = "Safari";
  else if (/telegram/i.test(lower)) browser = "Telegram";

  return { device, os, browser };
}

export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2 || countryCode === "Unknown") return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function getTrackedLink(slug: string): CustomLink | null {
  const normalized = slug.trim().toLowerCase();
  const data = loadAnalyticsData();
  return data.links[normalized] || null;
}

export function registerCustomLink(link: { slug: string; targetUrl: string; title: string; description?: string }): CustomLink {
  const data = loadAnalyticsData();
  const normalizedSlug = link.slug.trim().toLowerCase().replace(/^\/+/, "");

  const existing = data.links[normalizedSlug];
  const newLink: CustomLink = {
    slug: normalizedSlug,
    targetUrl: link.targetUrl.trim(),
    title: link.title.trim() || normalizedSlug,
    description: link.description?.trim(),
    createdAt: existing?.createdAt || new Date().toISOString(),
    totalClicks: existing?.totalClicks || 0,
    uniqueVisitors: existing?.uniqueVisitors || 0,
    lastClickedAt: existing?.lastClickedAt,
  };

  data.links[normalizedSlug] = newLink;
  saveAnalyticsData(data);
  return newLink;
}

export async function recordClick(params: {
  slug: string;
  targetUrl: string;
  title: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  referer: string;
  userAgent: string;
}): Promise<void> {
  const data = loadAnalyticsData();
  const slug = params.slug.trim().toLowerCase();
  const { device, os, browser } = parseUserAgent(params.userAgent);

  const event: ClickEvent = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    slug,
    targetUrl: params.targetUrl,
    title: params.title,
    timestamp: new Date().toISOString(),
    ip: params.ip.replace(/:\d+$/, ""),
    country: params.country || "Unknown",
    city: params.city || "Unknown",
    region: params.region || "",
    referer: params.referer || "direct",
    userAgent: params.userAgent,
    device,
    os,
    browser,
  };

  // Add click to recent click stream (keep max 1000 items)
  data.clicks.unshift(event);
  if (data.clicks.length > 1000) {
    data.clicks = data.clicks.slice(0, 1000);
  }

  // Update link statistics
  const link = data.links[slug] || {
    slug,
    targetUrl: params.targetUrl,
    title: params.title,
    createdAt: new Date().toISOString(),
    totalClicks: 0,
    uniqueVisitors: 0,
  };

  link.totalClicks = (link.totalClicks || 0) + 1;
  link.lastClickedAt = event.timestamp;

  // Track unique visitor by IP hash
  if (!data.visitorIps[slug]) {
    data.visitorIps[slug] = [];
  }
  const visitorKey = `${params.ip}_${os}_${browser}`;
  if (!data.visitorIps[slug].includes(visitorKey)) {
    data.visitorIps[slug].push(visitorKey);
    link.uniqueVisitors = data.visitorIps[slug].length;
  }

  data.links[slug] = link;
  saveAnalyticsData(data);

  // Send real-time Telegram notification if configured
  await sendTelegramPush(event, {
    total: link.totalClicks,
    unique: link.uniqueVisitors,
  }).catch(() => {});
}

async function sendTelegramPush(event: ClickEvent, stats: { total: number; unique: number }): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const flag = getCountryFlag(event.country);
  const location =
    event.city && event.city !== "Unknown"
      ? `${flag} ${event.city}, ${event.country}`
      : `${flag} ${event.country}`;

  const isEmailOpen = event.slug.startsWith("email-open-");
  const timeStr = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" });

  let text = "";
  if (isEmailOpen) {
    const targetName = event.slug.replace("email-open-", "").toUpperCase();
    text =
      `📬 <b>ПИСЬМО ОТКРЫТО! (${targetName})</b>\n\n` +
      `🎯 <b>Событие:</b> ${event.title}\n` +
      `📍 <b>Гео:</b> ${location}\n` +
      `💻 <b>Клиент / Прокси:</b> ${event.browser} · ${event.os} · ${event.device}\n` +
      `🌐 <b>IP:</b> <code>${event.ip}</code>\n` +
      `📊 <b>Всего открытий:</b> ${stats.total}\n` +
      `⏱️ <b>Время (Алматы):</b> ${timeStr}`;
  } else {
    const cleanReferer =
      event.referer === "direct" || !event.referer
        ? "Прямой переход"
        : event.referer.replace(/^https?:\/\/(www\.)?/, "");

    text =
      `🔔 <b>Клик по кастомной ссылке:</b> <code>/${event.slug}</code>\n\n` +
      `📍 <b>Откуда:</b> ${location}\n` +
      `💻 <b>Клиент:</b> ${event.device} · ${event.os} · ${event.browser}\n` +
      `🔗 <b>Источник:</b> <code>${cleanReferer}</code>\n` +
      `🎯 <b>Цель:</b> <a href="${event.targetUrl}">${event.title}</a>\n` +
      `📊 <b>Кликов:</b> ${stats.total} (уникальных: ${stats.unique})\n` +
      `⏱️ <b>Время:</b> ${timeStr}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (e) {}
}

export function getAnalyticsSummary() {
  const data = loadAnalyticsData();
  const linksList = Object.values(data.links);

  const totalClicks = linksList.reduce((acc, l) => acc + (l.totalClicks || 0), 0);
  const uniqueVisitors = linksList.reduce((acc, l) => acc + (l.uniqueVisitors || 0), 0);

  // Aggregated countries
  const countryCounts: Record<string, number> = {};
  const refererCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };

  for (const c of data.clicks) {
    countryCounts[c.country] = (countryCounts[c.country] || 0) + 1;
    
    let cleanRef = c.referer || "direct";
    if (cleanRef.includes("t.me") || cleanRef.includes("telegram")) cleanRef = "Telegram";
    else if (cleanRef.includes("linkedin.com")) cleanRef = "LinkedIn";
    else if (cleanRef.includes("twitter.com") || cleanRef.includes("x.com")) cleanRef = "Twitter / X";
    else if (cleanRef.includes("google.com")) cleanRef = "Google Search";
    else if (cleanRef === "direct" || !cleanRef) cleanRef = "Direct";
    else cleanRef = cleanRef.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];

    refererCounts[cleanRef] = (refererCounts[cleanRef] || 0) + 1;
    if (c.device) {
      deviceCounts[c.device] = (deviceCounts[c.device] || 0) + 1;
    }
  }

  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([country, count]) => ({
      country,
      count,
      flag: getCountryFlag(country),
      percentage: totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0,
    }));

  const topReferrers = Object.entries(refererCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([referer, count]) => ({
      referer,
      count,
      percentage: totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0,
    }));

  return {
    summary: {
      totalLinks: linksList.length,
      totalClicks,
      uniqueVisitors,
    },
    links: linksList.sort((a, b) => (b.totalClicks || 0) - (a.totalClicks || 0)),
    recentClicks: data.clicks.slice(0, 50),
    topCountries,
    topReferrers,
    topDevices: deviceCounts,
  };
}

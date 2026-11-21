import crypto from "node:crypto";
import type { NextRequest } from "next/server";

export const OWNER_COOKIE = "alim_owner";

function getConfiguredAdminKeys(): string[] {
  return [process.env.ADMIN_PASSWORD, process.env.OST_TOKEN_SECRET]
    .map((v) => (v || "").trim())
    .filter(Boolean);
}

function getHmacSecret(): string {
  return (
    process.env.OST_TOKEN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    process.env.TELEGRAM_BOT_TOKEN ||
    ""
  ).trim();
}

function timingSafeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/** Issue a compact HMAC-signed owner token valid for first-party HttpOnly cookie storage. */
export function signOwnerToken(): string | null {
  const secret = getHmacSecret();
  if (!secret) return null;
  const payload = "v1.owner";
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex").slice(0, 32);
  return `${payload}.${sig}`;
}

/** Verify an HMAC-signed owner token cleanly (returns false for forged "1" or invalid values). */
export function verifyOwnerToken(token?: string | null): boolean {
  if (!token) return false;
  const secret = getHmacSecret();
  if (!secret) return false;
  const expected = signOwnerToken();
  if (!expected) return false;
  return timingSafeEquals(token.trim(), expected);
}

/** Verify raw admin passphrase against configured server secrets. */
export function verifyAdminKey(candidate?: string | null): boolean {
  const clean = (candidate || "").trim();
  if (!clean) return false;
  const keys = getConfiguredAdminKeys();
  if (keys.length === 0) return false;
  return keys.some((k) => timingSafeEquals(clean, k));
}

/** Check whether an API request is authorized via signed owner cookie, header secret, or Basic auth. */
export function isAdminRequest(req: NextRequest): boolean {
  if (verifyOwnerToken(req.cookies.get(OWNER_COOKIE)?.value)) {
    return true;
  }

  const headerKey = req.headers.get("x-admin-key");
  if (verifyAdminKey(headerKey)) return true;

  const auth = req.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) {
    if (verifyAdminKey(auth.slice(7))) return true;
  }

  if (auth.toLowerCase().startsWith("basic ")) {
    try {
      const decoded = Buffer.from(auth.slice(6).trim(), "base64").toString("utf8");
      const sep = decoded.indexOf(":");
      if (sep >= 0) {
        const user = decoded.slice(0, sep);
        const pass = decoded.slice(sep + 1);
        const expectedUser = (process.env.ADMIN_USER || "admin").trim();
        if (timingSafeEquals(user, expectedUser) && verifyAdminKey(pass)) {
          return true;
        }
      }
    } catch {
      /* ignore malformed basic auth */
    }
  }

  return false;
}

/** Strict URL allowlist permitting only http(s) URLs or clean single-slash local paths. */
export function isSafeRedirectUrl(url: string): boolean {
  const trimmed = (url || "").trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return !/[<>"'\s]/.test(trimmed);
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/** Escape HTML special chars before formatting Telegram messages under parse_mode="HTML". */
export function escapeTelegramHtml(text: string): string {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const ALLOWED_MAIL_PROXY_RE = /(googleimageproxy|yahoomailproxy|thunderbird|outlook|apple)/i;
const BOT_UA_RE =
  /(curl\/|wget\/|python-requests|python-urllib|httpx|aiohttp|go-http-client|okhttp|java\/|axios\/|node-fetch|undici|headlesschrome|playwright|puppeteer|selenium|phantomjs|slurp|ahrefsbot|semrushbot|mj12bot|bytespider|ccbot|bingbot|googlebot|gptbot|claudebot|perplexitybot|vercel|uptime|pingdom|nmap|sqlmap|nikto|nuclei|ffuf|gobuster|\bbot\b|\bcrawler\b|\bspider\b|\bscanner\b)/i;
const PROBE_PAYLOAD_RE =
  /(<script|<svg|javascript:|data:text|alert\(|onerror=|onload=|\bi\d+|\bprobe\b|probe|openredirect|ownerprobe|legacyprobe|ownerforce|\bxss\b|\bfuzz\b|\bcanary\b|\bssrf\b|@example\.(com|org|net)|@test\.com|localhost|requestcatcher|burpcollaborator|interactsh|oastify|webhook\.site|pipedream|ngrok)/i;

/** Filter automated crawlers, CLI tools, and security probes while allowing real browsers and mail image proxies. */
export function isAutomatedBotOrProbe(
  userAgent: string,
  slug = "",
  title = "",
  referer = ""
): boolean {
  const combinedText = `${slug} ${title} ${referer}`;
  if (PROBE_PAYLOAD_RE.test(combinedText)) {
    return true;
  }

  const ua = (userAgent || "").trim();
  if (!ua) {
    return true;
  }

  if (ALLOWED_MAIL_PROXY_RE.test(ua)) {
    return false;
  }

  return BOT_UA_RE.test(ua);
}

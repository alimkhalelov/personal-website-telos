import { NextRequest, NextResponse } from "next/server";
import { recordClick } from "@/lib/link-tracker";
import {
  isAdminRequest,
  isAutomatedBotOrProbe,
  verifyOwnerToken,
  OWNER_COOKIE,
  ALLOWED_MAIL_PROXY_RE,
} from "@/lib/admin-auth";

const TRANSPARENT_GIF_BUFFER = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

const VALID_OUTREACH_TARGETS = new Set([
  "laminar",
  "nebuly",
  "magnitude",
  "vendo",
  "rosebud",
  "cygrid",
  "test-self",
]);

function sanitizePixelParam(value: string | null, fallback: string): string {
  const cleaned = (value || "").trim().replace(/[^a-zA-Z0-9._@-]/g, "").slice(0, 64);
  return cleaned || fallback;
}

/**
 * Shared 1x1 transparent GIF handler for email open alerts.
 * Strictly enforces campaign allowlist, verified mail proxy headers, filters bots/probes,
 * and completely drops synthetic fuzzer payloads (e.g. i45863probe, requestcatcher.com).
 */
export async function serveTrackingPixel(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const rawTarget = searchParams.get("c") || searchParams.get("target") || searchParams.get("id");
    const rawRecipient = searchParams.get("r") || searchParams.get("to");
    const userAgent = req.headers.get("user-agent") || "";

    // 1. Instant drop for automated crawlers, security fuzzers, and probe domains
    if (isAutomatedBotOrProbe(userAgent, rawTarget || "", rawRecipient || "", "Email Client")) {
      return gifResponse();
    }

    const target = sanitizePixelParam(rawTarget, "laminar").toLowerCase();
    const recipient = sanitizePixelParam(rawRecipient, "founder");

    // 2. Strict Campaign Allowlist: Bots cannot invent arbitrary target names
    const force = searchParams.get("force") === "1" && isAdminRequest(req);
    if (!VALID_OUTREACH_TARGETS.has(target) && !force) {
      return gifResponse();
    }

    // 3. Drop synthetic probe domains (e.g. ops@example.com, requestcatcher.com)
    if (/@(example|test|domain|localhost)\./i.test(recipient) || recipient.includes("requestcatcher")) {
      return gifResponse();
    }

    // 4. Strict Mail Client / Mail Proxy Verification:
    // Real email opens in webmail/mobile clients (Gmail, Apple Mail, Yahoo, Outlook) ALWAYS arrive via their verified caching image proxies.
    // Bare desktop browsers requesting the 1x1 GIF directly from datacenter/VPN IPs (e.g. PacketHub, AWS, cloud hosts) are web crawlers/fuzzers and are dropped.
    const isMailProxy = ALLOWED_MAIL_PROXY_RE.test(userAgent);
    if (!isMailProxy && !force) {
      return gifResponse();
    }
    const insertedAt = Number(searchParams.get("v") || "0");
    const isOwner = verifyOwnerToken(req.cookies.get(OWNER_COOKIE)?.value);

    // Ignore owner cookie AND Gmail Compose draft preview render (first 6s after insert)
    const isComposePreview =
      insertedAt > 1700000000000 &&
      Date.now() - insertedAt >= 0 &&
      Date.now() - insertedAt < 6000;

    if (force || (!isOwner && !isComposePreview)) {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "127.0.0.1";
      const country = req.headers.get("x-vercel-ip-country") || "Unknown";
      const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "") || "Unknown";
      const region = req.headers.get("x-vercel-ip-country-region") || "";

      await recordClick({
        slug: `email-open-${target}`,
        targetUrl: `mailto:${recipient}`,
        title: `Email Opened: ${target} [Recipient: ${recipient}]`,
        ip,
        country,
        city,
        region,
        referer: "Email Client",
        userAgent,
      });
    }
  } catch (err) {
    console.error("[pixel] recordClick failed:", err);
  }

  return gifResponse();
}

function gifResponse(): NextResponse {
  return new NextResponse(TRANSPARENT_GIF_BUFFER, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": TRANSPARENT_GIF_BUFFER.length.toString(),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { recordClick } from "@/lib/link-tracker";
import { isAdminRequest, isAutomatedBotOrProbe, verifyOwnerToken, OWNER_COOKIE } from "@/lib/admin-auth";

const TRANSPARENT_GIF_BUFFER = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

function sanitizePixelParam(value: string | null, fallback: string): string {
  const cleaned = (value || "").trim().replace(/[^a-zA-Z0-9._@-]/g, "").slice(0, 64);
  return cleaned || fallback;
}

/**
 * Shared 1x1 transparent GIF handler for email open alerts.
 * Filters bots/probes, verifies owner cookie cryptographically, and restricts force=1 to admin requests.
 */
export async function serveTrackingPixel(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const rawTarget = searchParams.get("c") || searchParams.get("target") || searchParams.get("id");
    const rawRecipient = searchParams.get("r") || searchParams.get("to");
    const userAgent = req.headers.get("user-agent") || "";

    if (isAutomatedBotOrProbe(userAgent, rawTarget || "", rawRecipient || "", "Email Client")) {
      return gifResponse();
    }

    const target = sanitizePixelParam(rawTarget, "laminar");
    const recipient = sanitizePixelParam(rawRecipient, "founder");
    const insertedAt = Number(searchParams.get("v") || "0");
    const force = searchParams.get("force") === "1" && isAdminRequest(req);
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

import { NextRequest, NextResponse } from "next/server";
import { recordClick } from "@/lib/link-tracker";

const TRANSPARENT_GIF_BUFFER = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

/**
 * Shared 1x1 transparent GIF handler for email open alerts.
 * Supports neutral params (c/r) and legacy params (target/to) uniformly.
 */
export async function serveTrackingPixel(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const target =
      searchParams.get("c") ||
      searchParams.get("target") ||
      searchParams.get("id") ||
      "laminar";
    const recipient =
      searchParams.get("r") ||
      searchParams.get("to") ||
      "founder";

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "") || "Unknown";
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const userAgent = req.headers.get("user-agent") || "";

    await recordClick({
      slug: `email-open-${target}`,
      targetUrl: `mailto:${recipient}`,
      title: `📬 Email Opened: ${target} [Recipient: ${recipient}]`,
      ip,
      country,
      city,
      region,
      referer: "Email Client",
      userAgent,
    });
  } catch (err) {
    console.error("[pixel] recordClick failed:", err);
  }

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

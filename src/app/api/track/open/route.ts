import { NextRequest, NextResponse } from "next/server";
import { recordClick } from "@/lib/link-tracker";

export const dynamic = "force-dynamic";

// 1x1 transparent GIF (43 bytes)
const TRANSPARENT_GIF_BUFFER = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get("target") || searchParams.get("id") || "laminar";
    const recipient = searchParams.get("to") || "founder";

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "") || "Unknown";
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const userAgent = req.headers.get("user-agent") || "";

    // Record open event asynchronously (triggers Telegram push & logs stats)
    recordClick({
      slug: `email-open-${target}`,
      targetUrl: `mailto:${recipient}`,
      title: `📬 Email Opened: ${target} [Recipient: ${recipient}]`,
      ip,
      country,
      city,
      region,
      referer: "Email Client",
      userAgent,
    }).catch(() => {});
  } catch (err) {
    // Fail silently so image rendering never breaks in email client
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

import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsSummary, registerCustomLink, recordClick } from "@/lib/link-tracker";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = getAnalyticsSummary();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch analytics" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Create / Register Custom Link
    if (body.action === "create_link" || (body.slug && body.targetUrl)) {
      const { slug, targetUrl, title, description } = body;
      if (!slug || !targetUrl) {
        return NextResponse.json({ error: "Slug and targetUrl are required" }, { status: 400 });
      }

      // Validate slug format
      const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, "");
      if (!cleanSlug) {
        return NextResponse.json({ error: "Invalid slug. Use alphanumeric characters and dashes." }, { status: 400 });
      }

      const link = registerCustomLink({
        slug: cleanSlug,
        targetUrl,
        title: title || cleanSlug,
        description,
      });

      return NextResponse.json({ success: true, link });
    }

    // 2. Track Click manually
    if (body.action === "track" && body.slug) {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";
      const country = req.headers.get("x-vercel-ip-country") || "Unknown";
      const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "") || "Unknown";
      const region = req.headers.get("x-vercel-ip-country-region") || "";
      const referer = req.headers.get("referer") || body.referer || "direct";
      const userAgent = req.headers.get("user-agent") || "";

      await recordClick({
        slug: body.slug,
        targetUrl: body.targetUrl || `https://alim.dest.page/${body.slug}`,
        title: body.title || body.slug,
        ip,
        country,
        city,
        region,
        referer,
        userAgent,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process analytics request" }, { status: 500 });
  }
}

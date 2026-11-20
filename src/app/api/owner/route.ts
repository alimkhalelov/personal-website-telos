import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const OWNER_COOKIE = "alim_owner";

/**
 * Sets or clears the first-party owner cookie so Alim's own visits
 * to /laminar, teardowns, and analytics routes do not trigger Telegram alerts.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "status";

  if (mode === "on") {
    const html = `<!DOCTYPE html><html><body style="font-family:system-ui;background:#0b0f14;color:#e6edf3;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center;max-width:420px;padding:24px;border:1px solid rgba(255,255,255,0.12);border-radius:16px;background:#121821;"><h2 style="margin:0 0 8px;">Owner Mode Enabled</h2><p style="color:#94a3b8;font-size:14px;margin:0 0 16px;">Your visits to <code>/laminar</code> and custom links from this browser will no longer trigger Telegram alerts.</p><a href="/" style="color:#38bdf8;text-decoration:none;font-size:14px;">Back to site</a></div></body></html>`;
    const res = new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
    res.cookies.set(OWNER_COOKIE, "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  }

  if (mode === "off") {
    const res = NextResponse.json({ ownerIgnored: false });
    res.cookies.set(OWNER_COOKIE, "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  }

  const isOwner = req.cookies.get(OWNER_COOKIE)?.value === "1";
  return NextResponse.json({ ownerIgnored: isOwner });
}

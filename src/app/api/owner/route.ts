import { NextRequest, NextResponse } from "next/server";
import {
  isAdminRequest,
  OWNER_COOKIE,
  signOwnerToken,
  verifyAdminKey,
  verifyOwnerToken,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function issueOwnerCookie(res: NextResponse, token: string) {
  res.cookies.set(OWNER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

function ownerEnabledPage(redirectTarget = "/"): NextResponse {
  const safeTarget = redirectTarget.startsWith("/") && !redirectTarget.startsWith("//") ? redirectTarget : "/";
  const html = `<!DOCTYPE html><html><body style="font-family:system-ui;background:#0b0f14;color:#e6edf3;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center;max-width:420px;padding:24px;border:1px solid rgba(255,255,255,0.12);border-radius:16px;background:#121821;"><h2 style="margin:0 0 8px;">Owner Mode Enabled</h2><p style="color:#94a3b8;font-size:14px;margin:0 0 16px;">Your visits and analytics sessions are authenticated.</p><a href="${safeTarget}" style="color:#38bdf8;text-decoration:none;font-size:14px;">Continue</a></div></body></html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function ownerLoginForm(nextPath = "/admin/analytics", errorMsg = ""): NextResponse {
  const html = `<!DOCTYPE html><html><body style="font-family:system-ui;background:#0b0f14;color:#e6edf3;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><form method="POST" action="/api/owner" style="width:100%;max-width:360px;padding:24px;border:1px solid rgba(255,255,255,0.12);border-radius:16px;background:#121821;box-sizing:border-box;"><h2 style="margin:0 0 8px;font-size:18px;">Owner Unlock</h2><p style="color:#94a3b8;font-size:13px;margin:0 0 14px;">Enter admin passphrase to unlock analytics and owner suppression.</p>${errorMsg ? `<p style="color:#f87171;font-size:12px;margin:0 0 10px;">${errorMsg}</p>` : ""}<input type="hidden" name="next" value="${nextPath.replace(/"/g, "")}" /><input type="password" name="key" placeholder="Passphrase" autofocus required style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.16);background:#0b0f14;color:#fff;margin-bottom:12px;" /><button type="submit" style="width:100%;padding:10px;border-radius:10px;border:0;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">Unlock</button></form></body></html>`;
  return new NextResponse(html, {
    status: errorMsg ? 401 : 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "status";
  const nextPath = searchParams.get("next") || "/";

  if (mode === "on") {
    const queryKey = searchParams.get("key");
    if (isAdminRequest(req) || verifyAdminKey(queryKey)) {
      const token = signOwnerToken();
      if (!token) {
        return NextResponse.json({ error: "Server auth secret not configured" }, { status: 503 });
      }
      const res = ownerEnabledPage(nextPath);
      issueOwnerCookie(res, token);
      return res;
    }
    return ownerLoginForm(nextPath);
  }

  if (mode === "off") {
    const res = NextResponse.json({ ownerIgnored: false });
    res.cookies.set(OWNER_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  }

  const isOwner = verifyOwnerToken(req.cookies.get(OWNER_COOKIE)?.value);
  return NextResponse.json({ ownerIgnored: isOwner });
}

export async function POST(req: NextRequest) {
  let key = "";
  let nextPath = "/admin/analytics";
  const ct = req.headers.get("content-type") || "";

  if (ct.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    key = String(body.key || "");
    if (body.next) nextPath = String(body.next);
  } else {
    const form = await req.formData().catch(() => null);
    if (form) {
      key = String(form.get("key") || "");
      nextPath = String(form.get("next") || "/admin/analytics");
    }
  }

  if (!verifyAdminKey(key)) {
    if (ct.includes("application/json")) {
      return NextResponse.json({ error: "Invalid passphrase" }, { status: 401 });
    }
    return ownerLoginForm(nextPath, "Invalid passphrase");
  }

  const token = signOwnerToken();
  if (!token) {
    return NextResponse.json({ error: "Server auth secret not configured" }, { status: 503 });
  }

  const safeNext = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
  const res = ct.includes("application/json")
    ? NextResponse.json({ ownerIgnored: true })
    : NextResponse.redirect(new URL(safeNext, req.url), 303);

  issueOwnerCookie(res, token);
  return res;
}

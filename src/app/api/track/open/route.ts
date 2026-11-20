import { NextRequest } from "next/server";
import { serveTrackingPixel } from "@/lib/email-pixel";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return serveTrackingPixel(req);
}

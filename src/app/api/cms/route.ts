import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { slug, content } = await req.json();
    if (!slug || !content) return NextResponse.json({ error: "Missing slug or content" }, { status: 400 });

    const dir = path.join(process.cwd(), "src/content/posts");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, `${slug}.mdx`), content, "utf8");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    const dir = path.join(process.cwd(), "src/content/posts");
    const fullPathMDX = path.join(dir, `${slug}.mdx`);
    const fullPathMD = path.join(dir, `${slug}.md`);

    if (fs.existsSync(fullPathMDX)) fs.unlinkSync(fullPathMDX);
    if (fs.existsSync(fullPathMD)) fs.unlinkSync(fullPathMD);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

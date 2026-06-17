import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const IS_PROD = process.env.NODE_ENV === "production";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "alimzhankhalelov";
const GITHUB_REPO = process.env.GITHUB_REPO || "personal-website-telos";

async function getGithubFileSha(filePath: string) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data.sha;
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    if (IS_PROD) {
      if (!GITHUB_TOKEN) return NextResponse.json({ error: "GITHUB_TOKEN not set in Vercel" }, { status: 500 });

      const filePath = `src/content/posts/${slug}.mdx`;
      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
      
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!res.ok) {
        return NextResponse.json({ error: "File not found on GitHub" }, { status: 404 });
      }

      const data = await res.json();
      const content = Buffer.from(data.content, 'base64').toString('utf8');
      return NextResponse.json({ content });
    } else {
      const fullPathMDX = path.join(process.cwd(), `src/content/posts/${slug}.mdx`);
      const fullPathMD = path.join(process.cwd(), `src/content/posts/${slug}.md`);

      if (fs.existsSync(fullPathMDX)) {
        const content = fs.readFileSync(fullPathMDX, "utf8");
        return NextResponse.json({ content });
      } else if (fs.existsSync(fullPathMD)) {
        const content = fs.readFileSync(fullPathMD, "utf8");
        return NextResponse.json({ content });
      } else {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, content } = await req.json();
    if (!slug || !content) return NextResponse.json({ error: "Missing slug or content" }, { status: 400 });

    if (IS_PROD) {
      if (!GITHUB_TOKEN) return NextResponse.json({ error: "GITHUB_TOKEN not set in Vercel" }, { status: 500 });
      
      const filePath = `src/content/posts/${slug}.mdx`;
      const sha = await getGithubFileSha(filePath);
      
      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
      
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: publish post ${slug}`,
          content: Buffer.from(content).toString("base64"),
          ...(sha && { sha }),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return NextResponse.json({ error: "GitHub API error: " + errorText }, { status: res.status });
      }

      revalidatePath("/admin");
      revalidatePath("/blog");
      return NextResponse.json({ success: true });

    } else {
      const dir = path.join(process.cwd(), "src/content/posts");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${slug}.mdx`), content, "utf8");
      revalidatePath("/admin");
      revalidatePath("/blog");
      return NextResponse.json({ success: true });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    if (IS_PROD) {
      if (!GITHUB_TOKEN) return NextResponse.json({ error: "GITHUB_TOKEN not set in Vercel" }, { status: 500 });

      const filePath = `src/content/posts/${slug}.mdx`;
      const sha = await getGithubFileSha(filePath);
      
      if (!sha) return NextResponse.json({ error: "File not found on GitHub" }, { status: 404 });

      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
      
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: delete post ${slug}`,
          sha,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return NextResponse.json({ error: "GitHub API error: " + errorText }, { status: res.status });
      }

      revalidatePath("/admin");
      revalidatePath("/blog");
      return NextResponse.json({ success: true });

    } else {
      const dir = path.join(process.cwd(), "src/content/posts");
      const fullPathMDX = path.join(dir, `${slug}.mdx`);
      const fullPathMD = path.join(dir, `${slug}.md`);

      if (fs.existsSync(fullPathMDX)) fs.unlinkSync(fullPathMDX);
      if (fs.existsSync(fullPathMD)) fs.unlinkSync(fullPathMD);

      revalidatePath("/admin");
      revalidatePath("/blog");
      return NextResponse.json({ success: true });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
